// Hook de inicializacao do Next (roda uma vez no boot do servidor). Sobe o
// worker BullMQ so no runtime nodejs e so quando ha REDIS_URL — protegido por
// try/catch pra NUNCA derrubar o boot do servidor se o Redis estiver fora.
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  try {
    const { startNotificationWorker } = await import('@/lib/worker')
    startNotificationWorker()
  } catch (e) {
    console.error('[instrumentation] worker nao iniciou:', e)
  }
}
