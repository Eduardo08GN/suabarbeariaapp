import { prisma } from '@/lib/db'
import {
  parse,
  isBefore,
  isEqual,
  startOfDay,
  endOfDay,
  getDay,
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
  const dayOfWeek = getDay(dateObj)

  // 1. Get service duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { durationMinutes: true },
  })
  if (!service) return []

  const serviceDuration = service.durationMinutes

  // 2. Get tenant opening hours for this day of week
  const openingHours = await prisma.openingHours.findFirst({
    where: { tenantId, dayOfWeek, isOpen: true },
  })
  if (!openingHours) return []

  const openTime = timeToMinutes(openingHours.openTime)
  const closeTime = timeToMinutes(openingHours.closeTime)

  // 3. Get barber schedule override for this day (if any)
  const barberSchedule = await prisma.barberSchedule.findFirst({
    where: { barberId, dayOfWeek },
  })

  const effectiveOpen = barberSchedule
    ? timeToMinutes(barberSchedule.startTime)
    : openTime
  const effectiveClose = barberSchedule
    ? timeToMinutes(barberSchedule.endTime)
    : closeTime

  // 4. Generate all possible slots
  const allSlots: string[] = []
  for (
    let t = effectiveOpen;
    t + serviceDuration <= effectiveClose;
    t += SLOT_INTERVAL
  ) {
    allSlots.push(minutesToTime(t))
  }

  // 5. Fetch existing bookings for this barber on this date
  const dayStart = startOfDay(dateObj)
  const dayEnd = endOfDay(dateObj)

  const bookings = await prisma.booking.findMany({
    where: {
      barberId,
      date: { gte: dayStart, lte: dayEnd },
      status: { in: ['CONFIRMED', 'PENDING'] },
    },
    select: { time: true, durationMinutes: true },
  })

  // 6. Fetch barber blocks for this date
  const blocks = await prisma.barberBlock.findMany({
    where: {
      barberId,
      startTime: { lte: dayEnd },
      endTime: { gte: dayStart },
    },
    select: { startTime: true, endTime: true },
  })

  // 7. Determine slot availability
  const slots: TimeSlot[] = allSlots.map((time) => {
    const slotStart = timeToMinutes(time)
    const slotEnd = slotStart + serviceDuration

    const hasBookingConflict = bookings.some((booking) => {
      const bookingStart = timeToMinutes(booking.time)
      const bookingEnd = bookingStart + booking.durationMinutes
      return slotStart < bookingEnd && slotEnd > bookingStart
    })

    const hasBlockConflict = blocks.some((block) => {
      const blockStartMins =
        block.startTime.getHours() * 60 + block.startTime.getMinutes()
      const blockEndMins =
        block.endTime.getHours() * 60 + block.endTime.getMinutes()
      return slotStart < blockEndMins && slotEnd > blockStartMins
    })

    const slotDateTime = parse(
      `${date} ${time}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    )
    const isPast = isBefore(slotDateTime, new Date()) || isEqual(slotDateTime, new Date())

    return {
      time,
      available: !hasBookingConflict && !hasBlockConflict && !isPast,
    }
  })

  return slots
}