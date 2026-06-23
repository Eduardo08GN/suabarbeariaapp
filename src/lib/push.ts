import 'server-only'
import webpush from 'web-push'
import { prisma } from '@/lib/db'
import { sendBookingEmail } from '@/lib/notifications'

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

/** Notifica de um novo agendamento: web push (dono + barbeiro do agendamento) e
    email via Brevo (dono da barbearia + barbeiro do agendamento). Best-effort:
    erro em qualquer canal nao quebra o fluxo de booking/pagamento. */
export async function notifyNewBooking(bookingId: string): Promise<void> {
  try {
    const b = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        tenantId: true,
        barberId: true,
        dateTime: true,
        client: { select: { name: true } },
        service: { select: { name: true } },
        barber: { select: { name: true, notifyEmail: true } },
        tenant: { select: { timezone: true, email: true, name: true, logo: true, colorPrimary: true } },
      },
    })
    if (!b) return

    const quando = horaLocal(b.dateTime, b.tenant.timezone || 'America/Sao_Paulo')

    // --- Web push (so quando VAPID esta configurado) ---
    if (ensureConfigured()) {
      // Donos do tenant (MASTER/TENANT) recebem TODOS os agendamentos; o
      // barbeiro so recebe os DELE — senao cada profissional ouviria a caixa
      // registradora do salao inteiro.
      const owners = await prisma.user.findMany({
        where: { tenantId: b.tenantId, role: { in: ['MASTER', 'TENANT'] } },
        select: { id: true },
      })
      const barberUser = b.barberId
        ? await prisma.user.findUnique({ where: { barberId: b.barberId }, select: { id: true } })
        : null
      if (owners.length > 0 || barberUser) {
        const base = {
          title: 'Novo agendamento',
          body: `${b.client.name} - ${b.service.name} com ${b.barber.name} (${quando})`,
          tag: `booking-${bookingId}`,
        }
        // dedupe por usuario (dono que tambem e barbeiro nao recebe push dobrado)
        const targets = new Map<string, string>()
        for (const o of owners) targets.set(o.id, '/painel/agenda')
        if (barberUser) targets.set(barberUser.id, '/pro')
        await Promise.all([...targets].map(([userId, url]) => sendPushToUser(userId, { ...base, url })))
      }
    }

    // --- Email (Brevo) — dono da barbearia (role TENANT) recebe todos; o
    // barbeiro X recebe os DELE. A agencia (MASTER) NAO recebe email por
    // agendamento, pra nao floodar a inbox dela. ---
    const tenantOwners = await prisma.user.findMany({
      where: { tenantId: b.tenantId, role: 'TENANT' },
      select: { email: true, name: true },
    })
    const seen = new Set<string>()
    const emailTargets: { email: string; name?: string }[] = []
    const addEmail = (email?: string | null, name?: string | null) => {
      const e = email?.trim().toLowerCase()
      if (!e || seen.has(e)) return
      seen.add(e)
      emailTargets.push({ email: e, name: name ?? undefined })
    }
    if (b.tenant.email) addEmail(b.tenant.email, b.tenant.name)
    for (const u of tenantOwners) addEmail(u.email, u.name)
    addEmail(b.barber.notifyEmail, b.barber.name)

    if (emailTargets.length > 0) {
      const info = {
        clientName: b.client.name,
        serviceName: b.service.name,
        barberName: b.barber.name,
        quando,
        shopName: b.tenant.name,
        logoUrl: b.tenant.logo,
        accent: b.tenant.colorPrimary,
      }
      await Promise.all(emailTargets.map((to) => sendBookingEmail(to, info)))
    }
  } catch (e) {
    console.error('notifyNewBooking error:', e)
  }
}
