// Logica de pagamento compartilhada entre checkout, webhook, polling e cron.
// A transicao PENDING->PAID e idempotente por design: um updateMany guardado
// por paymentStatus garante que so a PRIMEIRA confirmacao aplica o efeito,
// nao importa quantos caminhos (webhook + poll + cron) cheguem ao mesmo tempo.

import { prisma } from '@/lib/db'
import type { PaymentMode } from '@/generated/prisma'

/** Valor cobrado conforme o modo: sinal = metade, total = preco cheio. */
export function chargeValue(price: number, mode: PaymentMode | null): number {
  return mode === 'SINAL' ? Math.round((price / 2) * 100) / 100 : price
}

/** Confirma o pagamento de forma atomica e idempotente. Retorna true apenas
    na transicao real (PENDING->PAID); chamadas repetidas retornam false. */
export async function markBookingPaid(
  bookingId: string,
  paidAmount: number
): Promise<boolean> {
  const r = await prisma.booking.updateMany({
    where: { id: bookingId, paymentStatus: 'PENDING' },
    data: { paymentStatus: 'PAID', status: 'CONFIRMED', paidAmount },
  })
  return r.count === 1
}

/** Expira a reserva nao paga e libera o horario (idempotente). */
export async function expireBooking(bookingId: string): Promise<boolean> {
  const r = await prisma.booking.updateMany({
    where: { id: bookingId, paymentStatus: 'PENDING' },
    data: { paymentStatus: 'EXPIRED', status: 'CANCELLED_CLIENT' },
  })
  return r.count === 1
}
