import 'server-only'
import IORedis from 'ioredis'

// Conexao Redis compartilhada (backing do BullMQ; pode servir cache/rate-limit
// depois). SEM REDIS_URL definido, retorna null e a plataforma cai no caminho
// inline (sem fila) — provisionar o Redis e ligar a variavel ativa a fila sem
// tocar em mais nada. Singleton via global pra sobreviver ao HMR em dev.
const g = globalThis as unknown as { __redis?: IORedis | null; __redisTried?: boolean }

export function getRedis(): IORedis | null {
  if (g.__redisTried) return g.__redis ?? null
  g.__redisTried = true
  const url = process.env.REDIS_URL
  if (!url) {
    g.__redis = null
    return null
  }
  try {
    const conn = new IORedis(url, {
      // exigencias do BullMQ: sem teto de retry por request e sem ready check
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    })
    conn.on('error', (e) => console.error('[redis] erro:', e?.message))
    g.__redis = conn
  } catch (e) {
    console.error('[redis] falha ao conectar:', e)
    g.__redis = null
  }
  return g.__redis ?? null
}

export function isRedisEnabled(): boolean {
  return !!process.env.REDIS_URL
}
