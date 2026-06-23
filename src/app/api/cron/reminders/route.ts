import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendClientReminderEmail } from '@/lib/notifications'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Lembrete de ~1 dia antes, disparado AO CLIENTE. Pega os agendamentos cujo
// horario cai na janela de 23h-25h a frente (tolerante a drift do agendador) e
// que ainda nao receberam lembrete. reminderSentAt fecha contra duplicidade —
// so marca quando o email e aceito, entao uma falha transitoria tenta de novo na
// proxima rodada (ainda dentro da janela). Protegido por CRON_SECRET, igual ao
// pix-expire. Roda de hora em hora (Coolify Scheduled Task / pinger externo).
const WINDOW_FROM_MS = 23 * 60 * 60_000
const WINDOW_TO_MS = 25 * 60 * 60_000

function quandoLocal(instant: Date, tz: string): string {
  const dia = new Intl.DateTimeFormat('pt-BR', {
    timeZone: tz,
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  }).format(instant)
  const hora = new Intl.DateTimeFormat('pt-BR', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(instant)
  return `${dia} às ${hora}` // ex.: "ter., 25/06 às 14:00"
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const now = Date.now()
  const from = new Date(now + WINDOW_FROM_MS)
  const to = new Date(now + WINDOW_TO_MS)

  const due = await prisma.booking.findMany({
    where: {
      dateTime: { gte: from, lte: to },
      reminderSentAt: null,
      // so agendamentos que ainda vao acontecer; cancelados/no-show/concluidos fora
      status: { notIn: ['CANCELLED_CLIENT', 'CANCELLED_BARBER', 'NO_SHOW', 'COMPLETED'] },
      client: { email: { not: null } },
    },
    select: {
      id: true,
      dateTime: true,
      client: { select: { name: true, email: true } },
      service: { select: { name: true } },
      barber: { select: { name: true } },
      tenant: { select: { name: true, timezone: true, logo: true, colorPrimary: true } },
    },
    take: 300,
  })

  let sent = 0
  let failed = 0

  for (const b of due) {
    if (!b.client.email) continue
    const quando = quandoLocal(b.dateTime, b.tenant.timezone || 'America/Sao_Paulo')
    const ok = await sendClientReminderEmail(
      { email: b.client.email, name: b.client.name },
      {
        clientName: b.client.name,
        serviceName: b.service.name,
        barberName: b.barber.name,
        quando,
        shopName: b.tenant.name,
        logoUrl: b.tenant.logo,
        accent: b.tenant.colorPrimary,
      }
    )
    if (ok) {
      await prisma.booking.update({ where: { id: b.id }, data: { reminderSentAt: new Date() } })
      sent++
    } else {
      failed++
    }
  }

  return NextResponse.json({ due: due.length, sent, failed })
}
