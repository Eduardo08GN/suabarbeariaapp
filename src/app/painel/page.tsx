export const dynamic = 'force-dynamic'

import { headers } from 'next/headers'
import { CalendarDays, Users, DollarSign, Clock } from 'lucide-react'
import { getBookingStats, getUpcomingBookings } from '@/actions/booking'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DashboardClient } from './dashboard-client'
import { NotificationToggle } from '@/components/painel/notification-toggle'

async function getTenantId() {
  const h = await headers()
  return h.get('x-tenant-id') || ''
}

export default async function PainelPage() {
  const tenantId = await getTenantId()

  if (!tenantId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#71717A] text-sm">Tenant nao identificado. Faca login novamente.</p>
      </div>
    )
  }

  const [stats, upcoming] = await Promise.all([
    getBookingStats(tenantId),
    getUpcomingBookings(tenantId),
  ])

  const statCards = [
    {
      label: 'Agendamentos Hoje',
      value: String(stats.todayCount),
      icon: 'calendar' as const,
    },
    {
      label: 'Clientes Total',
      value: String(stats.totalClients),
      icon: 'users' as const,
    },
    {
      label: 'Faturamento do Mes',
      value: formatCurrency(stats.monthRevenue),
      icon: 'dollar' as const,
    },
  ]

  const upcomingData = upcoming.map((b) => ({
    id: b.id,
    time: format(new Date(b.dateTime), 'HH:mm', { locale: ptBR }),
    clientName: b.client.name,
    serviceName: b.service.name,
    barberName: b.barber.nickname || b.barber.name,
  }))

  return (
    <div className="space-y-6">
      <NotificationToggle />
      <DashboardClient stats={statCards} upcoming={upcomingData} />
    </div>
  )
}