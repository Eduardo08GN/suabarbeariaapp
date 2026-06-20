import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isPaidStatus } from '@/lib/asaas'
import { markBookingPaid, chargeValue } from '@/lib/payments'

// Webhook da Asaas. A URL carrega o token por barbearia
// (/api/webhooks/asaas/<token>), que identifica o tenant. Cada barbearia
// configura essa URL no painel da propria conta Asaas.
//
// Idempotencia: a confirmacao passa por markBookingPaid (updateMany guardado
// por status), entao reentregas do mesmo evento nao reaplicam nada.

const PAID_EVENTS = ['PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED', 'PAYMENT_RECEIVED_IN_CASH']

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const tenant = await prisma.tenant.findFirst({
    where: { asaasWebhookToken: token },
    select: { id: true },
  })
  if (!tenant) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  let body: { event?: string; payment?: { id?: string; status?: string; externalReference?: string } }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 })
  }

  const event = body?.event
  const paymentId = body?.payment?.id
  const externalRef = body?.payment?.externalReference // = booking.id no checkout
  if (!paymentId) return NextResponse.json({ received: true })

  // 1) casa pelo id da cobranca; 2) fallback pelo externalReference (booking.id),
  // que cobre o caso raro de crash entre criar a cobranca e gravar o asaasPaymentId
  // (senao o dinheiro entraria sem casar com nenhum agendamento, em silencio).
  let booking = await prisma.booking.findFirst({
    where: { asaasPaymentId: paymentId, tenantId: tenant.id },
    select: { id: true, price: true, paymentMode: true, asaasPaymentId: true },
  })
  if (!booking && externalRef) {
    booking = await prisma.booking.findFirst({
      where: { id: externalRef, tenantId: tenant.id },
      select: { id: true, price: true, paymentMode: true, asaasPaymentId: true },
    })
    // backfill do id que nunca chegou a ser gravado
    if (booking && !booking.asaasPaymentId) {
      await prisma.booking.update({ where: { id: booking.id }, data: { asaasPaymentId: paymentId } })
    }
  }
  if (!booking) return NextResponse.json({ received: true }) // pagamento de outra origem

  const isPaid = (event && PAID_EVENTS.includes(event)) || isPaidStatus(body?.payment?.status)
  if (isPaid) {
    const applied = await markBookingPaid(booking.id, chargeValue(booking.price, booking.paymentMode))
    if (!applied) {
      // re-le o estado atual (pode ter virado EXPIRED no mesmo instante pelo cron)
      const fresh = await prisma.booking.findUnique({
        where: { id: booking.id },
        select: { paymentStatus: true },
      })
      if (fresh?.paymentStatus === 'EXPIRED') {
        // pagamento caiu DEPOIS do horario ter sido liberado: dinheiro entrou sem
        // vaga. Nao silenciar — exige estorno manual na conta da barbearia.
        console.error(
          `[asaas-webhook] PAGAMENTO APOS EXPIRACAO booking=${booking.id} payment=${paymentId} tenant=${tenant.id}. Estorno manual necessario.`
        )
      }
    }
    return NextResponse.json({ received: true, applied })
  }

  return NextResponse.json({ received: true })
}
