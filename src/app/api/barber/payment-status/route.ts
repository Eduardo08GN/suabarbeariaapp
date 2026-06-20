import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { decrypt } from '@/lib/encryption'
import { getPaymentStatus, isPaidStatus } from '@/lib/asaas'
import { markBookingPaid } from '@/lib/payments'
import { chargeValue } from '@/lib/pricing'
import { rateLimit, clientIp } from '@/lib/rate-limit'

// Polling do front enquanto o modal PIX esta aberto. O webhook e o caminho
// primario; aqui e a rede de seguranca. Escopado por tenant (evita IDOR) e so
// chama a Asaas quando faz sentido (PENDING + dentro do prazo) pra nao virar
// amplificador da API da barbearia.
export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('bookingId')
  const tenantSlug = request.nextUrl.searchParams.get('tenantSlug')
  if (!bookingId || !tenantSlug) {
    return NextResponse.json({ error: 'Parametros obrigatorios.' }, { status: 400 })
  }

  if (!rateLimit(`paystatus:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json({ error: 'Muitas consultas.' }, { status: 429 })
  }

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, tenant: { slug: tenantSlug } },
    select: {
      id: true,
      paymentStatus: true,
      price: true,
      paymentMode: true,
      chargeAmount: true,
      asaasPaymentId: true,
      pixExpiresAt: true,
      tenant: { select: { asaasApiKey: true, asaasSandbox: true } },
    },
  })
  if (!booking) {
    return NextResponse.json({ error: 'Agendamento nao encontrado.' }, { status: 404 })
  }

  if (booking.paymentStatus === 'PAID') return NextResponse.json({ status: 'PAID' })
  if (booking.paymentStatus === 'EXPIRED') return NextResponse.json({ status: 'EXPIRED' })

  const expired = !!booking.pixExpiresAt && booking.pixExpiresAt.getTime() < Date.now()

  // so consulta a Asaas se ainda faz sentido (PENDING e dentro do prazo)
  if (booking.paymentStatus === 'PENDING' && !expired && booking.asaasPaymentId && booking.tenant.asaasApiKey) {
    try {
      const ctx = { apiKey: decrypt(booking.tenant.asaasApiKey), sandbox: booking.tenant.asaasSandbox }
      const st = await getPaymentStatus(ctx, booking.asaasPaymentId)
      if (isPaidStatus(st)) {
        const paidValue = booking.chargeAmount ?? chargeValue(booking.price, booking.paymentMode)
        await markBookingPaid(booking.id, paidValue)
        return NextResponse.json({ status: 'PAID' })
      }
    } catch {
      // ignora; segue PENDING (o webhook ainda pode chegar)
    }
  }

  return NextResponse.json({ status: 'PENDING', expired })
}
