import { prisma } from '@/lib/db'

/* Motor de disponibilidade — algebra de intervalos em minutos locais.
   Comeca da jornada real do profissional (WorkShift) e SUBTRAI as
   indisponibilidades: ausencias (Unavailability), bloqueios (BarberBlock),
   agendamentos (de qualquer unidade — ocupacao e por PESSOA), passado e lead
   time. Tudo ancorado no fuso do tenant (sem isso, prod em UTC erra a hora).
   Saida compativel com o TimeSlotPicker: { time, available } por horario da
   jornada (indisponiveis vem available:false). */

export interface SlotInput {
  barberId: string
  serviceId: string
  date: string // 'YYYY-MM-DD' (data-calendario no fuso do tenant)
  tenantId: string
  unitId?: string // opcional: se vier, escopa a jornada aquela unidade
  gridMin?: number
  leadMin?: number
}

export interface TimeSlot {
  time: string // 'HH:mm'
  available: boolean
}

const DEFAULT_GRID = 30
const MAX_BOOKING_MIN = 240 // recuo da janela de bookings (cobre o maior servico) p/ pegar evento cruzando meia-noite
const MS_MIN = 60_000
const BUSY: Array<'PENDING' | 'CONFIRMED' | 'IN_PROGRESS'> = [
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
]

type Win = { start: number; end: number } // minutos locais [start, end)

// ── fuso (Intl, sem dependencia) ──
function localParts(instant: Date, tz: string) {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .formatToParts(instant)
    .reduce<Record<string, string>>((a, x) => {
      a[x.type] = x.value
      return a
    }, {})
  return { y: +p.year, mo: +p.month, d: +p.day, h: +p.hour, mi: +p.minute, s: +p.second }
}
const localMin = (instant: Date, tz: string) => {
  const p = localParts(instant, tz)
  return p.h * 60 + p.mi
}
const pad = (n: number) => String(n).padStart(2, '0')
const localDateKey = (instant: Date, tz: string) => {
  const p = localParts(instant, tz)
  return `${p.y}-${pad(p.mo)}-${pad(p.d)}`
}
function tzOffsetMin(instant: Date, tz: string): number {
  const p = localParts(instant, tz)
  const asUTC = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s)
  return Math.round((asUTC - instant.getTime()) / MS_MIN)
}
// instante UTC da meia-noite local de 'YYYY-MM-DD' no fuso
function localMidnightUtc(dateStr: string, tz: string): Date {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const off = tzOffsetMin(new Date(Date.UTC(y, mo - 1, d, 12)), tz) // meio-dia evita borda de DST
  return new Date(Date.UTC(y, mo - 1, d) - off * MS_MIN)
}
// dia da semana 0..6 (TZ-invariante) de 'YYYY-MM-DD'
function dowOf(dateStr: string): number {
  const [y, mo, d] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(y, mo - 1, d)).getUTCDay()
}
const minToTime = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`

// ── algebra de intervalos ──
function normalize(wins: Win[]): Win[] {
  const xs = wins.filter((w) => w.end > w.start).sort((a, b) => a.start - b.start)
  const out: Win[] = []
  for (const w of xs) {
    const last = out[out.length - 1]
    if (last && w.start <= last.end) last.end = Math.max(last.end, w.end)
    else out.push({ ...w })
  }
  return out
}
function subtract(base: Win[], holes: Win[]): Win[] {
  let cur = normalize(base)
  for (const h of normalize(holes)) {
    const next: Win[] = []
    for (const w of cur) {
      if (h.end <= w.start || h.start >= w.end) {
        next.push(w)
        continue
      }
      if (h.start > w.start) next.push({ start: w.start, end: h.start })
      if (h.end < w.end) next.push({ start: h.end, end: w.end })
    }
    cur = next
  }
  return cur
}
const fitsIn = (free: Win[], t: number, dur: number) =>
  free.some((w) => w.start <= t && t + dur <= w.end)

export async function getAvailableSlots(input: SlotInput): Promise<TimeSlot[]> {
  const { barberId, serviceId, date, tenantId, unitId } = input
  const grid = input.gridMin ?? DEFAULT_GRID

  const [service, tenant, barber] = await Promise.all([
    prisma.service.findUnique({
      where: { id: serviceId },
      select: { durationMin: true, active: true },
    }),
    prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { timezone: true, leadTimeMin: true },
    }),
    prisma.barber.findUnique({ where: { id: barberId }, select: { active: true } }),
  ])
  if (!service || !service.active) return []
  if (!barber || !barber.active) return []
  if (!tenant) return []

  const tz = tenant.timezone || 'America/Sao_Paulo'
  const lead = input.leadMin ?? tenant.leadTimeMin ?? 0
  const dur = service.durationMin
  const dow = dowOf(date)

  // se a unidade veio, exige que o barbeiro atenda nela
  if (unitId) {
    const bu = await prisma.barberUnit.findUnique({
      where: { barberId_unitId: { barberId, unitId } },
      select: { id: true },
    })
    if (!bu) return []
  }

  // 1. jornada base do dia (uniao dos WorkShift; suporta turno quebrado)
  const shifts = await prisma.workShift.findMany({
    where: { barberId, dayOfWeek: dow, ...(unitId ? { unitId } : {}) },
    select: { startMin: true, endMin: true },
  })
  const base = normalize(shifts.map((s) => ({ start: s.startMin, end: s.endMin })))
  if (base.length === 0) return [] // nao trabalha nesse dia

  // janela UTC do dia local. relMin = minutos relativos a meia-noite local;
  // lida com eventos cruzando a meia-noite (a subtract clipa contra a jornada).
  const dayStart = localMidnightUtc(date, tz)
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * MS_MIN)
  const relMin = (i: Date) => Math.round((i.getTime() - dayStart.getTime()) / MS_MIN)

  const [unavs, blocks, bookings] = await Promise.all([
    prisma.unavailability.findMany({
      where: {
        barberId,
        startDate: { lte: dayEnd },
        endDate: { gte: dayStart },
        // com unidade na chamada: globais (null) + as da unidade. Sem unidade
        // (visao agregada do funil): so as globais — uma folga escopada a uma
        // unidade nao pode zerar a disponibilidade nas outras.
        ...(unitId ? { OR: [{ unitId: null }, { unitId }] } : { unitId: null }),
      },
      select: { allDay: true, startMin: true, endMin: true },
    }),
    prisma.barberBlock.findMany({
      where: { barberId, startTime: { lt: dayEnd }, endTime: { gt: dayStart } },
      select: { startTime: true, endTime: true },
    }),
    // ocupacao por PESSOA: bookings do barbeiro em QUALQUER unidade. Recua a
    // janela pelo maior servico pra pegar booking de ontem que fura a meia-noite.
    prisma.booking.findMany({
      where: {
        barberId,
        dateTime: { gte: new Date(dayStart.getTime() - MAX_BOOKING_MIN * MS_MIN), lt: dayEnd },
        status: { in: BUSY },
      },
      select: { dateTime: true, durationMin: true },
    }),
  ])

  const holes: Win[] = []
  // 2. indisponibilidade (dia inteiro -> some do funil; parcial -> corta faixa)
  for (const u of unavs) {
    if (u.allDay) return []
    if (u.startMin != null && u.endMin != null) holes.push({ start: u.startMin, end: u.endMin })
  }
  // 3. bloqueios pontuais (em min relativos; cruzando meia-noite a subtract clipa)
  for (const b of blocks) {
    holes.push({ start: relMin(b.startTime), end: relMin(b.endTime) })
  }
  // 4. agendamentos
  for (const bk of bookings) {
    const s = relMin(bk.dateTime)
    holes.push({ start: s, end: s + bk.durationMin })
  }
  // 5. passado + lead time (so se a data for hoje no fuso)
  const now = new Date()
  const today = localDateKey(now, tz)
  if (date === today) holes.push({ start: -Infinity, end: localMin(now, tz) + lead })
  else if (date < today) return [] // data passada

  const free = subtract(base, holes)

  // candidatos: todos os inicios da jornada (grid), marcando available
  const out: TimeSlot[] = []
  for (const w of base) {
    for (let t = Math.ceil(w.start / grid) * grid; t + dur <= w.end; t += grid) {
      out.push({ time: minToTime(t), available: fitsIn(free, t, dur) })
    }
  }
  return out
}

/** Versao barata: o barbeiro tem ao menos 1 horario livre nesse dia? */
export async function hasAnyAvailability(input: SlotInput): Promise<boolean> {
  const slots = await getAvailableSlots(input)
  return slots.some((s) => s.available)
}

/** Lista de profissionais com disponibilidade real na data (some quem nao tem). */
export async function getAvailableBarbers(input: {
  tenantId: string
  serviceId: string
  date: string
  unitId?: string
}) {
  const { tenantId, serviceId, date, unitId } = input
  const barbers = await prisma.barber.findMany({
    where: {
      tenantId,
      active: true,
      ...(unitId ? { units: { some: { unitId } } } : {}),
    },
    orderBy: { name: 'asc' },
  })
  const ok = await Promise.all(
    barbers.map((b) =>
      hasAnyAvailability({ barberId: b.id, serviceId, date, tenantId, unitId })
    )
  )
  return barbers.filter((_, i) => ok[i])
}
