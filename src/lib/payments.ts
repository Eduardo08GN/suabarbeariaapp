// Logica de pagamento compartilhada entre checkout, webhook, polling e cron.
// A transicao PENDING->PAID e idempotente por design: um updateMany guardado
// por paymentStatus garante que so a PRIMEIRA confirmacao aplica o efeito,
// nao importa quantos caminhos (webhook + poll + cron) cheguem ao mesmo tempo.

import { prisma } from '@/lib/db'
import type { PaymentMode } from '@/generated/prisma'

const round2 = (n: number) => Math.round(n * 100) / 100
/** Clampa o desconto em 0..90% (acima disso o PIX cairia abaixo do minimo). */
export const clampPct = (p: number) => Math.max(0, Math.min(90, Math.floor(p || 0)))

/** Valor cobrado conforme o modo, SEM desconto: sinal = metade, total = cheio.
    Fallback de compatibilidade pra bookings antigos sem chargeAmount. */
export function chargeValue(price: number, mode: PaymentMode | null): number {
  return mode === 'SINAL' ? round2(price / 2) : round2(price)
}

export interface PriceCtx {
  incentivoAtivo: boolean
  descontoSinalPct: number
  descontoTotalPct: number
}

/** Valor a cobrar no PIX conforme modo + incentivo. O desconto incide sobre o
    TOTAL; no sinal, paga 50% do total ja descontado. Retorna o valor cobrado,
    o % aplicado e o valor cheio (sem desconto) pra exibir riscado. */
export function computeCharge(
  price: number,
  mode: PaymentMode,
  ctx: PriceCtx
): { value: number; discountPct: number; fullValue: number } {
  const isSinal = mode === 'SINAL'
  const fullValue = round2(isSinal ? price / 2 : price)
  const pct = ctx.incentivoAtivo ? clampPct(isSinal ? ctx.descontoSinalPct : ctx.descontoTotalPct) : 0
  const discountedTotal = price * (1 - pct / 100)
  const value = round2(isSinal ? discountedTotal / 2 : discountedTotal)
  return { value, discountPct: pct, fullValue }
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
