'use server'

import crypto from 'crypto'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { encrypt } from '@/lib/encryption'
import { revalidatePath } from 'next/cache'
import type { BookingMode } from '@/generated/prisma'
import { computeCharge } from '@/lib/pricing'
import { ASAAS_PIX_MIN } from '@/lib/payment-constants'

const BOOKING_MODES: BookingMode[] = ['PAYMENT_REQUIRED', 'PAYMENT_OPTIONAL', 'BOOK_ONLY']
const clampPct = (p: number) => Math.max(0, Math.min(90, Math.floor(Number(p) || 0)))

/** Estado da config de pagamento do dono (sem expor a chave). */
export async function getConfigPagamento(): Promise<{
  hasKey: boolean
  sandbox: boolean
  googleReviewUrl: string | null
  webhookToken: string | null
}> {
  const s = await getSession()
  if (!s?.tenantId) return { hasKey: false, sandbox: false, googleReviewUrl: null, webhookToken: null }
  const t = await prisma.tenant.findUnique({
    where: { id: s.tenantId },
    select: { asaasApiKey: true, asaasSandbox: true, googleReviewUrl: true, asaasWebhookToken: true },
  })
  return {
    hasKey: !!t?.asaasApiKey,
    sandbox: !!t?.asaasSandbox,
    googleReviewUrl: t?.googleReviewUrl ?? null,
    // o token so importa pro dono montar a URL do webhook; exibido so a ele
    webhookToken: t?.asaasApiKey ? t?.asaasWebhookToken ?? null : null,
  }
}

/** Politica de agendamento + sistema de incentivo (descontos pra pagar adiantado). */
export async function getConfigAgendamento(): Promise<{
  hasKey: boolean
  bookingMode: BookingMode
  incentivoAtivo: boolean
  descontoSinalPct: number
  descontoTotalPct: number
}> {
  const s = await getSession()
  const fallback = {
    hasKey: false,
    bookingMode: 'PAYMENT_REQUIRED' as BookingMode,
    incentivoAtivo: false,
    descontoSinalPct: 0,
    descontoTotalPct: 0,
  }
  if (!s?.tenantId) return fallback
  const t = await prisma.tenant.findUnique({
    where: { id: s.tenantId },
    select: {
      asaasApiKey: true,
      bookingMode: true,
      incentivoAtivo: true,
      descontoSinalPct: true,
      descontoTotalPct: true,
    },
  })
  if (!t) return fallback
  return {
    hasKey: !!t.asaasApiKey,
    bookingMode: t.bookingMode,
    incentivoAtivo: t.incentivoAtivo,
    descontoSinalPct: t.descontoSinalPct,
    descontoTotalPct: t.descontoTotalPct,
  }
}

/** Salva a politica de agendamento e o sistema de incentivo. */
export async function salvarConfigAgendamento(input: {
  bookingMode: string
  incentivoAtivo: boolean
  descontoSinalPct: number
  descontoTotalPct: number
}): Promise<{ success: true; warnings: string[] } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Não autorizado' }

  const mode = BOOKING_MODES.includes(input.bookingMode as BookingMode)
    ? (input.bookingMode as BookingMode)
    : 'PAYMENT_REQUIRED'
  const incentivoAtivo = !!input.incentivoAtivo
  const descontoSinalPct = clampPct(input.descontoSinalPct)
  const descontoTotalPct = clampPct(input.descontoTotalPct)

  await prisma.tenant.update({
    where: { id: s.tenantId },
    data: { bookingMode: mode, incentivoAtivo, descontoSinalPct, descontoTotalPct },
  })

  // avisa (sem bloquear) se a config derruba o PIX de algum servico abaixo do
  // minimo — nesse caso aquele modo de pagamento nem aparece pro cliente.
  const warnings: string[] = []
  if (mode !== 'BOOK_ONLY') {
    const services = await prisma.service.findMany({
      where: { tenantId: s.tenantId, active: true },
      select: { name: true, price: true },
    })
    const ctx = { incentivoAtivo, descontoSinalPct, descontoTotalPct }
    const totalLow = services.filter((sv) => computeCharge(sv.price, 'TOTAL', ctx).value < ASAAS_PIX_MIN)
    const sinalLow = services.filter((sv) => computeCharge(sv.price, 'SINAL', ctx).value < ASAAS_PIX_MIN)
    const names = (arr: { name: string }[]) =>
      arr.slice(0, 5).map((x) => x.name).join(', ') + (arr.length > 5 ? '...' : '')
    if (totalLow.length) {
      warnings.push(
        `O PIX total fica abaixo de R$${ASAAS_PIX_MIN} (cliente não consegue pagar) em: ${names(totalLow)}.`
      )
    } else if (sinalLow.length) {
      warnings.push(
        `No sinal, o PIX de alguns serviços fica abaixo de R$${ASAAS_PIX_MIN}; nesses só a opção de pagar o total aparece: ${names(sinalLow)}.`
      )
    }
  }

  revalidatePath('/painel/pagamentos')
  return { success: true, warnings }
}

/** Salva o link de avaliacao no Google (usado na pagina de obrigado). */
export async function salvarGoogleReview(input: {
  url: string
}): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Não autorizado' }
  const url = input.url?.trim() || null
  if (url && !/^https?:\/\//i.test(url)) {
    return { error: 'Informe um link válido (começando com https://)' }
  }
  await prisma.tenant.update({ where: { id: s.tenantId }, data: { googleReviewUrl: url } })
  revalidatePath('/painel/pagamentos')
  return { success: true }
}

/** Recebimentos (pagamentos confirmados) da barbearia, com totais. */
export async function getRecebimentos(): Promise<{
  items: Array<{
    id: string
    clientName: string
    serviceName: string
    mode: string | null
    amount: number
    paidAt: string
    dateTime: string
  }>
  totalMonth: number
  countMonth: number
}> {
  const s = await getSession()
  if (!s?.tenantId) return { items: [], totalMonth: 0, countMonth: 0 }

  const paid = await prisma.booking.findMany({
    where: { tenantId: s.tenantId, paymentStatus: 'PAID' },
    select: {
      id: true,
      paymentMode: true,
      paidAmount: true,
      price: true,
      updatedAt: true,
      dateTime: true,
      client: { select: { name: true } },
      service: { select: { name: true } },
    },
    orderBy: { updatedAt: 'desc' },
    take: 60,
  })

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  let totalMonth = 0
  let countMonth = 0

  const items = paid.map((b) => {
    const amount = b.paidAmount ?? (b.paymentMode === 'SINAL' ? b.price / 2 : b.price)
    if (b.updatedAt >= monthStart) {
      totalMonth += amount
      countMonth += 1
    }
    return {
      id: b.id,
      clientName: b.client.name,
      serviceName: b.service.name,
      mode: b.paymentMode,
      amount,
      paidAt: b.updatedAt.toISOString(),
      dateTime: b.dateTime.toISOString(),
    }
  })

  return { items, totalMonth, countMonth }
}

/** Salva a config Asaas da barbearia: cifra a chave nova (se veio) e garante
    um token de webhook por barbearia. A chave nunca volta pro cliente. */
export async function salvarConfigPagamento(input: {
  apiKey: string
}): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Não autorizado' }

  const key = input.apiKey?.trim()
  if (!key) return { error: 'Informe a chave da Asaas' }
  if (key.length < 20) return { error: 'A chave da Asaas parece inválida' }

  const data: {
    asaasApiKey: string
    asaasSandbox: boolean
    asaasWebhookToken?: string
  } = {
    asaasApiKey: encrypt(key),
    // sandbox e detectado pela propria chave (homologacao = prefixo hmlg);
    // o dono nao escolhe modo de teste.
    asaasSandbox: /hmlg|sandbox/i.test(key),
  }

  // garante um token de webhook FORTE. Tokens fracos (cuid do default antigo, ou
  // ausentes) sao rotacionados pra 48 chars hex aleatorios — o token e a unica
  // barreira do webhook.
  const t = await prisma.tenant.findUnique({
    where: { id: s.tenantId },
    select: { asaasWebhookToken: true },
  })
  const strong = (tok: string | null | undefined) => !!tok && /^[a-f0-9]{48}$/.test(tok)
  if (!strong(t?.asaasWebhookToken)) data.asaasWebhookToken = crypto.randomBytes(24).toString('hex')

  await prisma.tenant.update({ where: { id: s.tenantId }, data })
  revalidatePath('/painel/pagamentos')
  return { success: true }
}
