import 'server-only'
import { Worker, type ConnectionOptions } from 'bullmq'
import { getRedis } from '@/lib/redis'
import { notifyNewBooking } from '@/lib/push'
import { NOTIFICATIONS_QUEUE } from '@/lib/queue'

// Worker BullMQ que consome a fila de notificacoes. Roda dentro do processo do
// servidor Next (iniciado pelo instrumentation.ts no runtime nodejs). Sem Redis,
// nao sobe — o caminho inline cobre. Erros de job sao logados; o BullMQ aplica o
// retry/backoff definido na fila.
const g = globalThis as unknown as { __notifWorker?: Worker }

export function startNotificationWorker(): void {
  if (g.__notifWorker) return
  const connection = getRedis()
  if (!connection) return

  const worker = new Worker(
    NOTIFICATIONS_QUEUE,
    async (job) => {
      if (job.name === 'booking') {
        await notifyNewBooking(job.data.bookingId as string)
      }
    },
    // cast: ver nota em queue.ts (ioredis duplicado pelo bullmq)
    { connection: connection as unknown as ConnectionOptions, concurrency: 5 }
  )
  worker.on('failed', (job, err) =>
    console.error(`[worker] job ${job?.id} falhou:`, err?.message)
  )
  worker.on('error', (err) => console.error('[worker] erro:', err?.message))
  g.__notifWorker = worker
  console.log('[worker] fila de notificacoes ativa')
}
