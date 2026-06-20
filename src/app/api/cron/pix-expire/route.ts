import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { decrypt } from '@/lib/encryption'
import { getPaymentStatus, isPaidStatus, cancelPayment } from '@/lib/asaas'
import { markBookingPaid, expireBooking, chargeValue } from '@/lib/payments'

// Libera horarios reservados cujo PIX nao foi pago dentro da janela. Antes de
// expirar, confere na Asaas: NUNCA expira quando a verdade do pagamento e
// desconhecida (erro/timeout) — deixa pra proxima rodada, pra um pagamento real
// nao perder pra um EXPIRED precipitado. Protegido por CRON_SECRET.
const SAFETY_MARGIN_MS = 2 * 60_000 // folga pra nao colidir com webhook em voo
const ORPHAN_AGE_MS = 60 * 60_000 // PENDING sem prazo ha > 1h = orfao (charge nunca criada)

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const now = Date.now()
  const cutoff = new Date(now - SAFETY_MARGIN_MS)
  const orphanCutoff = new Date(now - ORPHAN_AGE_MS)

  const stale = await prisma.booking.findMany({
    where: {
      paymentStatus: 'PENDING',
      OR: [
        { pixExpiresAt: { lt: cutoff } },
        { pixExpiresAt: null, createdAt: { lt: orphanCutoff } }, // orfaos sem prazo
      ],
    },
    select: {
      id: true,
      price: true,
      paymentMode: true,
      asaasPaymentId: true,
      tenant: { select: { asaasApiKey: true, asaasSandbox: true } },
    },
    take: 200,
  })

  let expired = 0
  let rescued = 0
  let skipped = 0

  for (const b of stale) {
    // orfao sem cobranca: nada a conferir nem cancelar, so liberar
    if (!b.asaasPaymentId || !b.tenant.asaasApiKey) {
      if (await expireBooking(b.id)) expired++
      continue
    }

    let status: string | null
    try {
      const ctx = { apiKey: decrypt(b.tenant.asaasApiKey), sandbox: b.tenant.asaasSandbox }
      status = await getPaymentStatus(ctx, b.asaasPaymentId)

      if (isPaidStatus(status)) {
        if (await markBookingPaid(b.id, chargeValue(b.price, b.paymentMode))) rescued++
        continue
      }
      if (status === null) {
        // verdade desconhecida (404/erro de rede): NAO expira, tenta de novo depois
        skipped++
        continue
      }
      // status real e nao-pago: libera o horario e cancela a cobranca
      if (await expireBooking(b.id)) {
        expired++
        await cancelPayment(ctx, b.asaasPaymentId)
      }
    } catch {
      // erro consultando a Asaas: verdade desconhecida, nao expira
      skipped++
    }
  }

  return NextResponse.json({ checked: stale.length, expired, rescued, skipped })
}
