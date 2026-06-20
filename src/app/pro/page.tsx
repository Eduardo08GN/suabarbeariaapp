export const dynamic = 'force-dynamic'

import { getSession } from '@/lib/auth'
import { getBookingsForBarberDate } from '@/actions/booking'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ProAgenda } from '@/components/pro/pro-agenda'

export default async function ProPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>
}) {
  const session = await getSession()
  // o layout ja redireciona; aqui e so a guarda de tipo pra TS
  if (!session?.tenantId || !session.barberId) return null

  const params = await searchParams
  const selectedDate = params.date ? new Date(params.date) : new Date()

  const bookings = await getBookingsForBarberDate(session.tenantId, session.barberId, selectedDate)

  const bookingsData = bookings.map((b) => ({
    id: b.id,
    time: format(new Date(b.dateTime), 'HH:mm'),
    endTime: format(new Date(new Date(b.dateTime).getTime() + b.durationMin * 60000), 'HH:mm'),
    clientName: b.client.name,
    serviceName: b.service.name,
    status: b.status,
    durationMin: b.durationMin,
    paymentStatus: b.paymentStatus,
    paymentMode: b.paymentMode,
    paidAmount: b.paidAmount,
    price: b.price,
    products: b.items.map((i) => i.name),
  }))

  const dateLabel = format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })

  return (
    <ProAgenda
      bookings={bookingsData}
      dateLabel={dateLabel}
      currentDate={format(selectedDate, 'yyyy-MM-dd')}
    />
  )
}
