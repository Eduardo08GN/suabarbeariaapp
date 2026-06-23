// Efeitos de pagamento que tocam o banco. O calculo PURO de preco vive em
// lib/pricing.ts (client-safe); aqui ficam as transicoes de estado.

import 'server-only'
import { prisma } from '@/lib/db'
import { enqueueBookingNotification } from '@/lib/queue'

// As funcoes PURAS de preco vivem em @/lib/pricing (client-safe). Aqui ficam so
// os efeitos de banco — server-only pra nao vazar prisma/web-push pro cliente.

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
  if (r.count === 1) {
    // so na transicao real (idempotente): enfileira o aviso (fallback inline)
    void enqueueBookingNotification(bookingId)
    return true
  }
  return false
}

/** Expira a reserva nao paga e libera o horario (idempotente). */
export async function expireBooking(bookingId: string): Promise<boolean> {
  const r = await prisma.booking.updateMany({
    where: { id: bookingId, paymentStatus: 'PENDING' },
    data: { paymentStatus: 'EXPIRED', status: 'CANCELLED_CLIENT' },
  })
  return r.count === 1
}
