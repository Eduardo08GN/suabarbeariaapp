'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns'

// O tenant SEMPRE sai da sessao. Estas server actions sao endpoints POST que
// qualquer usuario logado pode chamar direto com argumentos arbitrarios — por
// isso nenhum id vindo do client e confiavel. O tenant (e o barbeiro, no /pro)
// vem do token verificado, fechando IDOR cross-tenant.
async function requireTenantId(): Promise<string> {
  const session = await getSession()
  if (!session?.tenantId) throw new Error('Não autorizado')
  return session.tenantId
}

export async function getBookingsForDate(_tenantId: string, date: Date) {
  const tenantId = await requireTenantId()

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

// Agenda do PROFISSIONAL (superficie /pro): tenant e barberId saem da sessao do
// barbeiro logado, nunca de argumento — um barbeiro nao ve a agenda de outro.
export async function getBookingsForBarberDate(_tenantId: string, _barberId: string, date: Date) {
  const session = await getSession()
  if (!session?.tenantId || !session.barberId) throw new Error('Não autorizado')

  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)

  return prisma.booking.findMany({
    where: {
      tenantId: session.tenantId,
      barberId: session.barberId,
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
  const tenantId = await requireTenantId()
  if (!bookingId) throw new Error('Não autorizado')

  // confirma que o agendamento e do tenant da sessao antes de alterar
  const owned = await prisma.booking.findFirst({
    where: { id: bookingId, tenantId },
    select: { id: true },
  })
  if (!owned) throw new Error('Agendamento não encontrado')

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  })
}

export async function getBookingStats(_tenantId: string) {
  const tenantId = await requireTenantId()

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
      // servico + produtos (order bump), pra a receita extra aparecer
      _sum: { price: true, itemsTotal: true },
    }),
  ])

  return {
    todayCount,
    totalClients,
    monthRevenue: (monthRevenue._sum.price ?? 0) + (monthRevenue._sum.itemsTotal ?? 0),
  }
}

export async function getUpcomingBookings(_tenantId: string, limit = 5) {
  const tenantId = await requireTenantId()

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
