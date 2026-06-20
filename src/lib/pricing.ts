// Calculo de preco do pedido. Modulo PURO e client-safe (sem prisma), pra o
// front (etapa 4) e o back (checkout) usarem a MESMA conta e nunca divergirem
// — a licao que a revisao adversarial bateu nas features anteriores.
//
// Regras (decididas com o Eduardo):
// - Cupom e incentivo (sinal/total) incidem SO sobre o servico.
// - Produtos (order bump) entram pelo preco CHEIO, sempre no PIX.
// - PIX = servico (com desconto, conforme o modo) + produtos.

import { ASAAS_PIX_MIN } from './payment-constants'

export const round2 = (n: number) => Math.round(n * 100) / 100
/** Clampa o desconto em 0..90% (acima disso o PIX cairia abaixo do minimo). */
export const clampPct = (p: number) => Math.max(0, Math.min(90, Math.floor(p || 0)))

export type ChargeMode = 'SINAL' | 'TOTAL'

export interface PriceCtx {
  incentivoAtivo: boolean
  descontoSinalPct: number
  descontoTotalPct: number
}

/** Valor cobrado conforme o modo, SEM desconto: sinal = metade, total = cheio.
    Fallback de compatibilidade pra bookings antigos sem chargeAmount. */
export function chargeValue(price: number, mode: ChargeMode | null): number {
  return mode === 'SINAL' ? round2(price / 2) : round2(price)
}

/** Servico cobrado no PIX conforme modo + incentivo. value = cobrado,
    fullValue = cheio (sinal=metade) pra exibir riscado, discountPct = % aplicado. */
export function computeCharge(
  price: number,
  mode: ChargeMode,
  ctx: PriceCtx
): { value: number; discountPct: number; fullValue: number } {
  const isSinal = mode === 'SINAL'
  const fullValue = round2(isSinal ? price / 2 : price)
  const pct = ctx.incentivoAtivo ? clampPct(isSinal ? ctx.descontoSinalPct : ctx.descontoTotalPct) : 0
  const discountedTotal = price * (1 - pct / 100)
  const value = round2(isSinal ? discountedTotal / 2 : discountedTotal)
  return { value, discountPct: pct, fullValue }
}

export interface OrderInput {
  servicePrice: number
  mode: ChargeMode | 'NONE' // NONE = so agendar (servico nao cobrado)
  incentivo: PriceCtx
  productsTotal: number // soma dos produtos selecionados (preco cheio)
}

export interface OrderResult {
  serviceCharge: number // servico no PIX (0 se NONE; metade se SINAL)
  serviceFull: number // servico cheio (sinal = metade) p/ exibir riscado
  serviceDiscountPct: number
  productsTotal: number
  pixValue: number // serviceCharge + produtos = o que vai pro Asaas
  orderTotal: number // valor total do pedido (servico devido + produtos)
  inPersonValue: number // o que fica pra pagar no balcao (orderTotal - pixValue)
  belowMin: boolean // pixValue > 0 porem < ASAAS_PIX_MIN (PIX recusaria)
}

/** Pedido completo (servico + produtos). Fonte unica do valor do PIX e do total.
    NONE = "so agendar": o servico nao vai pro PIX, mas e devido no balcao (preco
    cheio). Produtos sempre vao pelo preco cheio no PIX. */
export function computeOrder(input: OrderInput): OrderResult {
  const { servicePrice, mode, incentivo, productsTotal } = input
  const prods = round2(productsTotal)

  let serviceCharge = 0
  let serviceFull = 0
  let serviceDiscountPct = 0
  let serviceOwed = round2(servicePrice) // NONE: servico cheio, devido no balcao
  if (mode !== 'NONE') {
    const c = computeCharge(servicePrice, mode, incentivo)
    serviceCharge = c.value
    serviceFull = c.fullValue
    serviceDiscountPct = c.discountPct
    // servico devido (com desconto, sem o /2 do sinal): sinal paga metade agora
    serviceOwed = round2(c.value * (mode === 'SINAL' ? 2 : 1))
  }

  const pixValue = round2(serviceCharge + prods)
  const orderTotal = round2(serviceOwed + prods)
  return {
    serviceCharge,
    serviceFull,
    serviceDiscountPct,
    productsTotal: prods,
    pixValue,
    orderTotal,
    inPersonValue: round2(orderTotal - pixValue),
    belowMin: pixValue > 0 && pixValue < ASAAS_PIX_MIN,
  }
}
