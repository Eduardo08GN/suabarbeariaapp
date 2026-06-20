'use server'

import crypto from 'crypto'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { encrypt } from '@/lib/encryption'
import { revalidatePath } from 'next/cache'

/** Estado da config de pagamento do dono (sem expor a chave). */
export async function getConfigPagamento(): Promise<{ hasKey: boolean; sandbox: boolean }> {
  const s = await getSession()
  if (!s?.tenantId) return { hasKey: false, sandbox: false }
  const t = await prisma.tenant.findUnique({
    where: { id: s.tenantId },
    select: { asaasApiKey: true, asaasSandbox: true },
  })
  return { hasKey: !!t?.asaasApiKey, sandbox: !!t?.asaasSandbox }
}

/** Salva a config Asaas da barbearia: cifra a chave nova (se veio) e garante
    um token de webhook por barbearia. A chave nunca volta pro cliente. */
export async function salvarConfigPagamento(input: {
  apiKey: string
}): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Nao autorizado' }

  const key = input.apiKey?.trim()
  if (!key) return { error: 'Informe a chave da Asaas' }
  if (key.length < 20) return { error: 'A chave da Asaas parece invalida' }

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

  // garante um token de webhook (a barbearia pode ter sido criada antes do campo)
  const t = await prisma.tenant.findUnique({
    where: { id: s.tenantId },
    select: { asaasWebhookToken: true },
  })
  if (!t?.asaasWebhookToken) data.asaasWebhookToken = crypto.randomBytes(24).toString('hex')

  await prisma.tenant.update({ where: { id: s.tenantId }, data })
  revalidatePath('/painel/pagamentos')
  return { success: true }
}
