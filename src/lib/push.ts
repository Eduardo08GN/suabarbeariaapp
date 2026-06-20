import 'server-only'
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
        barberId: true,
        dateTime: true,
        client: { select: { name: true } },
        service: { select: { name: true } },
        barber: { select: { name: true } },
        tenant: { select: { timezone: true } },
      },
    })
    if (!b) return

    // Donos do tenant (MASTER/TENANT) recebem TODOS os agendamentos; o
    // barbeiro so recebe os DELE — por isso o filtro de role aqui, senao cada
    // profissional ouviria a caixa registradora do salao inteiro.
    const owners = await prisma.user.findMany({
      where: { tenantId: b.tenantId, role: { in: ['MASTER', 'TENANT'] } },
      select: { id: true },
    })
    const barberUser = b.barberId
      ? await prisma.user.findUnique({ where: { barberId: b.barberId }, select: { id: true } })
      : null
    if (owners.length === 0 && !barberUser) return

    const quando = horaLocal(b.dateTime, b.tenant.timezone || 'America/Sao_Paulo')
    const base = {
      title: 'Novo agendamento',
      body: `${b.client.name} - ${b.service.name} com ${b.barber.name} (${quando})`,
      tag: `booking-${bookingId}`,
    }
    // dedupe por usuario: cada superficie abre na propria agenda ao tocar a
    // notificacao, e se um dono tambem fosse barbeiro nao recebe push dobrado
    const targets = new Map<string, string>()
    for (const o of owners) targets.set(o.id, '/painel/agenda')
    if (barberUser) targets.set(barberUser.id, '/pro')
    await Promise.all(
      [...targets].map(([userId, url]) => sendPushToUser(userId, { ...base, url }))
    )
  } catch (e) {
    console.error('notifyNewBooking error:', e)
  }
}
