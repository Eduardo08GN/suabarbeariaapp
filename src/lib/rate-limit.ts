// Rate limiter em memoria (janela fixa). O app roda em processo unico
// (standalone no Coolify), entao o Map e compartilhado entre requisicoes desse
// processo. Best-effort: reseta no deploy e nao cruza instancias. Suficiente
// pra frear abuso obvio de endpoints publicos sem depender de Redis.

type Entry = { count: number; reset: number }
const buckets = new Map<string, Entry>()

/** true = permitido; false = estourou o limite na janela. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const e = buckets.get(key)
  if (!e || e.reset <= now) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    // limpeza oportunista pra o Map nao crescer sem limite
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (v.reset <= now) buckets.delete(k)
    }
    return true
  }
  if (e.count >= max) return false
  e.count++
  return true
}

/** IP do cliente a partir dos headers de proxy (Coolify/Traefik). */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}
