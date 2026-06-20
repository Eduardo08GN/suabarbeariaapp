// Efeitos de pagamento que tocam o banco. O calculo PURO de preco vive em
// lib/pricing.ts (client-safe); aqui ficam as transicoes de estado.

import { prisma } from '@/lib/db'

// re-exporta as funcoes puras pra quem ja importava daqui nao quebrar
export { chargeValue, computeCharge, computeOrder, clampPct, round2 } from '@/lib/pricing'
export type { PriceCtx } from '@/lib/pricing'

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
