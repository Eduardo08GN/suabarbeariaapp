'use server'

import { prisma } from '@/lib/db'
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns'

export async function getBookingsForDate(tenantId: string, date: Date) {
  if (!tenantId) throw new Error('tenantId is required')

  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)

  return prisma.booking.findMany({
    where: {
      tenantId,
      dateTime: { gte: dayStart, lte: dayEnd },
    },
    include: {
      service: { select: { name: true, category: true } },
      barber: { select: { name: true, nickname: true } },
      client: { select: { name: true, phone: true } },
      items: { where: { kind: 'PRODUCT' }, select: { name: true } },
    },
    orderBy: { dateTime: 'asc' },
  })
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED_CLIENT' | 'CANCELLED_BARBER' | 'NO_SHOW'
) {
  if (!bookingId) throw new Error('bookingId is required')

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  })
}

export async function getBookingStats(tenantId: string) {
  if (!tenantId) throw new Error('tenantId is required')

  const now = new Date()
  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const [todayCount, totalClients, monthRevenue] = await Promise.all([
    prisma.booking.count({
      where: {
        tenantId,
        dateTime: { gte: todayStart, lte: todayEnd },
      },
    }),
    prisma.client.count({
      where: { tenantId },
    }),
    prisma.booking.aggregate({
      where: {
        tenantId,
        dateTime: { gte: monthStart, lte: monthEnd },
        status: { in: ['COMPLETED', 'CONFIRMED', 'IN_PROGRESS'] },
      },
      _sum: { price: true },
    }),
  ])

  return {
    todayCount,
    totalClients,
    monthRevenue: monthRevenue._sum.price ?? 0,
  }
}

export async function getUpcomingBookings(tenantId: string, limit = 5) {
  if (!tenantId) throw new Error('tenantId is required')

  return prisma.booking.findMany({
    where: {
      tenantId,
      dateTime: { gte: new Date() },
      status: { in: ['CONFIRMED', 'PENDING'] },
    },
    include: {
      service: { select: { name: true } },
      barber: { select: { name: true, nickname: true } },
      client: { select: { name: true } },
    },
    orderBy: { dateTime: 'asc' },
    take: limit,
  })
}