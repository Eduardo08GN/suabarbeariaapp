export const dynamic = 'force-dynamic'

import { headers } from 'next/headers'
import { getBookingsForDate } from '@/actions/booking'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AgendaClient } from './agenda-client'

async function getTenantId() {
  const h = await headers()
  return h.get('x-tenant-id') || ''
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const tenantId = await getTenantId()
  const params = await searchParams
  const selectedDate = params.date ? new Date(params.date) : new Date()

  if (!tenantId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#71717A] text-sm">Tenant nao identificado.</p>
      </div>
    )
  }

  const bookings = await getBookingsForDate(tenantId, selectedDate)

  const bookingsData = bookings.map((b) => ({
    id: b.id,
    time: format(new Date(b.dateTime), 'HH:mm'),
    endTime: format(
      new Date(new Date(b.dateTime).getTime() + b.durationMin * 60000),
      'HH:mm'
    ),
    clientName: b.client.name,
    serviceName: b.service.name,
    barberName: b.barber.nickname || b.barber.name,
    status: b.status,
    durationMin: b.durationMin,
  }))

  const dateStr = format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })

  return (
    <AgendaClient
      bookings={bookingsData}
      dateLabel={dateStr}
      currentDate={format(selectedDate, 'yyyy-MM-dd')}
    />
  )
}