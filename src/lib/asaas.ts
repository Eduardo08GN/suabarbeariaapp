// Cliente Asaas (PIX + split). Portado do AsaasProvider do appmestre. A
// cobranca nasce na conta DA BARBEARIA (apiKey do tenant); o repasse de
// ASAAS_PLATFORM_FEE_PERCENT por cento vai pra walletId da agencia
// (ASAAS_PLATFORM_WALLET_ID). Em sandbox o split e pulado (a wallet da
// plataforma so existe em producao).

const PIX_DUE_DATE_DAYS = 3 // o PIX vale pelo expiry do QR; dueDate e quase irrelevante

export type AsaasCtx = { apiKey: string; sandbox: boolean }

function baseUrl(sandbox: boolean): string {
  return sandbox ? 'https://api-sandbox.asaas.com/v3' : 'https://api.asaas.com/v3'
}

function headers(apiKey: string): Record<string, string> {
  return {
    access_token: apiKey,
    'Content-Type': 'application/json',
    'User-Agent': 'suabarbeariaapp',
  }
}

async function safeJson(res: Response, label: string): Promise<any> {
  const text = await res.text()
  if (!text) throw new Error(`Asaas ${label}: resposta vazia (status ${res.status}). Verifique a chave de API.`)
  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Asaas ${label}: JSON invalido (status ${res.status}): ${text.slice(0, 200)}`)
  }
}

const onlyDigits = (s: string | undefined) => (s || '').replace(/\D/g, '')

/** Acha (por CPF) ou cria o cliente na Asaas. Retorna o customerId. */
export async function getOrCreateCustomer(
  ctx: AsaasCtx,
  buyer: { name: string; email?: string; cpfCnpj: string; phone?: string }
): Promise<string> {
  const url = baseUrl(ctx.sandbox)
  const cpf = onlyDigits(buyer.cpfCnpj)

  const lookup = await fetch(`${url}/customers?cpfCnpj=${cpf}`, { headers: headers(ctx.apiKey) })
  if (lookup.status === 401) throw new Error('Chave da Asaas invalida (401).')
  const found = await safeJson(lookup, 'buscar cliente').catch(() => null)
  if (found?.data?.length > 0) return found.data[0].id

  const create = await fetch(`${url}/customers`, {
    method: 'POST',
    headers: headers(ctx.apiKey),
    body: JSON.stringify({
      name: buyer.name,
      email: buyer.email || undefined,
      cpfCnpj: cpf,
      mobilePhone: buyer.phone ? onlyDigits(buyer.phone) : undefined,
    }),
  })
  const c = await safeJson(create, 'criar cliente')
  if (!create.ok) throw new Error(`Asaas criar cliente: ${c.errors?.[0]?.description || JSON.stringify(c)}`)
  return c.id
}

/** Monta o split (percentual) pra walletId da agencia, com guards de seguranca.
    Em producao, config invalida e ruidosa (a agencia perderia a taxa em silencio). */
function buildSplit(sandbox: boolean): Array<{ walletId: string; percentualValue: number }> | undefined {
  if (sandbox) return undefined // a wallet da plataforma so existe em producao
  const walletId = process.env.ASAAS_PLATFORM_WALLET_ID
  const fee = Number(process.env.ASAAS_PLATFORM_FEE_PERCENT || 0)
  if (!walletId || walletId === 'PENDENTE') {
    console.error('[asaas] SPLIT NAO APLICADO: ASAAS_PLATFORM_WALLET_ID ausente ou PENDENTE. A agencia NAO recebera a taxa.')
    return undefined
  }
  if (!(fee > 0) || fee > 50) {
    console.error(`[asaas] SPLIT NAO APLICADO: ASAAS_PLATFORM_FEE_PERCENT invalido (${fee}). A agencia NAO recebera a taxa.`)
    return undefined
  }
  return [{ walletId, percentualValue: fee }]
}

/** Cancela uma cobranca PIX (rollback / expiracao) pra ela nao ser paga atrasada. */
export async function cancelPayment(ctx: AsaasCtx, paymentId: string): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl(ctx.sandbox)}/payments/${paymentId}`, {
      method: 'DELETE',
      headers: headers(ctx.apiKey),
    })
    return res.ok
  } catch {
    return false
  }
}

/** Cria a cobranca PIX na conta da barbearia. Retorna { id, status }. */
export async function createPixPayment(
  ctx: AsaasCtx,
  input: { customerId: string; value: number; externalReference: string; description: string }
): Promise<{ id: string; status: string }> {
  const url = baseUrl(ctx.sandbox)
  const dueDate = new Date(Date.now() + PIX_DUE_DATE_DAYS * 86400000).toISOString().slice(0, 10)
  const split = buildSplit(ctx.sandbox)

  const res = await fetch(`${url}/payments`, {
    method: 'POST',
    headers: headers(ctx.apiKey),
    body: JSON.stringify({
      customer: input.customerId,
      billingType: 'PIX',
      value: Number(input.value.toFixed(2)),
      dueDate,
      description: input.description,
      externalReference: input.externalReference.slice(0, 100),
      ...(split ? { split } : {}),
    }),
  })
  const data = await safeJson(res, 'criar cobranca')
  if (!res.ok) throw new Error(`Asaas cobranca: ${data.errors?.[0]?.description || JSON.stringify(data)}`)
  if (split && (!data.split || data.split.length === 0)) {
    console.warn(`[asaas] split enviado mas nao retornado para ${data.id}; a taxa pode nao ter sido aplicada`)
  }
  return { id: data.id, status: data.status }
}

/** Busca o QR do PIX (2a chamada; a Asaas demora pra gerar). Retry com backoff. */
export async function getPixQrCode(
  ctx: AsaasCtx,
  paymentId: string
): Promise<{ qrCodeUrl: string; copiaECola: string } | null> {
  const url = baseUrl(ctx.sandbox)
  for (let i = 0; i < 4; i++) {
    await new Promise((r) => setTimeout(r, i === 0 ? 1000 : 1000 * 2 ** (i - 1)))
    try {
      const res = await fetch(`${url}/payments/${paymentId}/pixQrCode`, { headers: headers(ctx.apiKey) })
      const text = await res.text()
      if (!text) continue
      let d: any
      try {
        d = JSON.parse(text)
      } catch {
        continue
      }
      if (d.encodedImage) {
        return { qrCodeUrl: `data:image/png;base64,${d.encodedImage}`, copiaECola: d.payload }
      }
      if (d.payload) {
        return {
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(d.payload)}`,
          copiaECola: d.payload,
        }
      }
    } catch {
      // mantem o retry
    }
  }
  return null
}

/** Consulta o status da cobranca (rede de seguranca / polling). */
export async function getPaymentStatus(ctx: AsaasCtx, paymentId: string): Promise<string | null> {
  const url = baseUrl(ctx.sandbox)
  const res = await fetch(`${url}/payments/${paymentId}`, { headers: headers(ctx.apiKey) })
  if (!res.ok) return null
  const d = await safeJson(res, 'status cobranca').catch(() => null)
  return d?.status ?? null
}

/** Status da Asaas que significam pago. */
export function isPaidStatus(status: string | null | undefined): boolean {
  return status === 'RECEIVED' || status === 'CONFIRMED' || status === 'RECEIVED_IN_CASH'
}
