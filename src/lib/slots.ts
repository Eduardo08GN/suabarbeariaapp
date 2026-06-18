import { prisma } from '@/lib/db'
import {
  parse,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns'

export interface SlotInput {
  barberId: string
  serviceId: string
  date: string // 'YYYY-MM-DD'
  tenantId: string
}

export interface TimeSlot {
  time: string // 'HH:mm'
  available: boolean
}

const SLOT_INTERVAL = 30

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export async function getAvailableSlots(input: SlotInput): Promise<TimeSlot[]> {
  const { barberId, serviceId, date, tenantId } = input
  const dateObj = parse(date, 'yyyy-MM-dd', new Date())

  // 1. Get service duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { durationMin: true },
  })
  if (!service) return []

  const serviceDuration = service.durationMin

  // 2. Use tenant openingHours JSON field (or default 09-20)
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { openingHours: true },
  })

  const defaultOpen = 9 * 60  // 09:00
  const defaultClose = 20 * 60 // 20:00
  let openTime = defaultOpen
  let closeTime = defaultClose

  if (tenant?.openingHours && typeof tenant.openingHours === 'object') {
    const hours = tenant.openingHours as Record<string, { open: string; close: string }>
    const dayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dateObj.getDay()]
    if (hours[dayKey]) {
      openTime = timeToMinutes(hours[dayKey].open)
      closeTime = timeToMinutes(hours[dayKey].close)
    }
  }

  // 3. Generate all possible slots
  const allSlots: string[] = []
  for (let t = openTime; t + serviceDuration <= closeTime; t += SLOT_INTERVAL) {
    allSlots.push(minutesToTime(t))
  }

  // 4. Fetch existing bookings for this barber on this date
  const dayStart = startOfDay(dateObj)
  const dayEnd = endOfDay(dateObj)

  const bookings = await prisma.booking.findMany({
    where: {
      barberId,
      dateTime: { gte: dayStart, lte: dayEnd },
      status: { in: ['CONFIRMED', 'PENDING'] },
    },
    select: { dateTime: true, durationMin: true },
  })

  // 5. Fetch barber blocks for this date
  const blocks = await prisma.barberBlock.findMany({
    where: {
      barberId,
      startTime: { lte: dayEnd },
      endTime: { gte: dayStart },
    },
    select: { startTime: true, endTime: true },
  })

  // 6. Determine slot availability
  const slots: TimeSlot[] = allSlots.map((time) => {
    const slotStart = timeToMinutes(time)
    const slotEnd = slotStart + serviceDuration

    const hasBookingConflict = bookings.some((booking) => {
      const bookingStart = booking.dateTime.getHours() * 60 + booking.dateTime.getMinutes()
      const bookingEnd = bookingStart + booking.durationMin
      return slotStart < bookingEnd && slotEnd > bookingStart
    })

    const hasBlockConflict = blocks.some((block) => {
      const blockStartMins = block.startTime.getHours() * 60 + block.startTime.getMinutes()
      const blockEndMins = block.endTime.getHours() * 60 + block.endTime.getMinutes()
      return slotStart < blockEndMins && slotEnd > blockStartMins
    })

    const slotDateTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date())
    const isPast = isBefore(slotDateTime, new Date())

    return {
      time,
      available: !hasBookingConflict && !hasBlockConflict && !isPast,
    }
  })

  return slots
}