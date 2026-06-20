import webpush from 'web-push'
import { prisma } from '@/lib/db'

// Web Push. VAPID nas envs (VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY/VAPID_SUBJECT).
// Sem chaves, push fica desabilitado (no-op) — nao quebra o fluxo de booking.
let configured = false
function ensureConfigured(): boolean {
  if (configured) return true
  const pub = process.env.VAPID_PUBLIC_KEY
  const priv = process.env.VAPID_PRIVATE_KEY
  if (!pub || !priv) return false
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'mailto:admin@suabarbearia.app', pub, priv)
  configured = true
  return true
}

export interface PushPayload {
  title: string
  body: string
  url?: string
  tag?: string
}

/** Envia a notificacao pra todas as inscricoes do usuario; remove as mortas. */
export async function sendPushToUser(userId: string, payload: PushPayload): Promise<void> {
  if (!ensureConfigured()) return
  const subs = await prisma.pushSubscription.findMany({ where: { userId } })
  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          JSON.stringify(payload)
        )
      } catch (e: unknown) {
        const code = (e as { statusCode?: number })?.statusCode
        if (code === 404 || code === 410) {
          await prisma.pushSubscription.delete({ where: { endpoint: s.endpoint } }).catch(() => {})
        }
      }
    })
  )
}

const pad = (n: number) => String(n).padStart(2, '0')
function horaLocal(instant: Date, tz: string): string {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    hourCycle: 'h23',
  })
    .formatToParts(instant)
    .reduce<Record<string, string>>((a, x) => ((a[x.type] = x.value), a), {})
  return `${pad(+p.day)}/${pad(+p.month)} ${p.hour}:${p.minute}`
}

/** Notifica o(s) dono(s) do tenant de um novo agendamento. Fire-and-forget. */
export async function notifyNewBooking(bookingId: string): Promise<void> {
  try {
    if (!ensureConfigured()) return
    const b = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        tenantId: true,
        dateTime: true,
        client: { select: { name: true } },
        service: { select: { name: true } },
        barber: { select: { name: true } },
        tenant: { select: { timezone: true } },
      },
    })
    if (!b) return
    const owners = await prisma.user.findMany({
      where: { tenantId: b.tenantId },
      select: { id: true },
    })
    if (owners.length === 0) return
    const quando = horaLocal(b.dateTime, b.tenant.timezone || 'America/Sao_Paulo')
    const payload: PushPayload = {
      title: 'Novo agendamento',
      body: `${b.client.name} - ${b.service.name} com ${b.barber.name} (${quando})`,
      url: '/painel/agenda',
      tag: `booking-${bookingId}`,
    }
    await Promise.all(owners.map((o) => sendPushToUser(o.id, payload)))
  } catch (e) {
    console.error('notifyNewBooking error:', e)
  }
}
