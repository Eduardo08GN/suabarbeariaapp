import 'server-only'
import { Queue, type ConnectionOptions } from 'bullmq'
import { getRedis } from '@/lib/redis'
import { notifyNewBooking } from '@/lib/push'

// Fila de notificacoes (BullMQ sobre Redis). Entrega confiavel com retry/backoff,
// desacoplada da latencia do request. SEM Redis, enqueue* envia inline na hora —
// o mesmo comportamento de antes, sem nunca quebrar o fluxo de booking/pagamento.
export const NOTIFICATIONS_QUEUE = 'notifications'

const g = globalThis as unknown as { __notifQueue?: Queue | null; __notifQueueTried?: boolean }

function getQueue(): Queue | null {
  if (g.__notifQueueTried) return g.__notifQueue ?? null
  g.__notifQueueTried = true
  const connection = getRedis()
  if (!connection) {
    g.__notifQueue = null
    return null
  }
  g.__notifQueue = new Queue(NOTIFICATIONS_QUEUE, {
    // BullMQ embute a propria copia de ioredis; o cast reconcilia as duas
    // identidades de tipo do mesmo cliente (estrutura identica em runtime).
    connection: connection as unknown as ConnectionOptions,
    defaultJobOptions: {
      attempts: 4,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
    },
  })
  return g.__notifQueue
}

/** Enfileira o aviso de "novo agendamento". Sem Redis -> envia inline (fallback). */
export async function enqueueBookingNotification(bookingId: string): Promise<void> {
  const q = getQueue()
  if (!q) {
    await notifyNewBooking(bookingId)
    return
  }
  try {
    // jobId por booking dedupa enfileiramentos repetidos do mesmo agendamento
    await q.add('booking', { bookingId }, { jobId: `booking:${bookingId}` })
  } catch (e) {
    console.error('[queue] add falhou; enviando inline:', e)
    await notifyNewBooking(bookingId)
  }
}
