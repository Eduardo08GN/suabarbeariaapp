'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, CalendarOff } from 'lucide-react'

type BookingItem = {
  id: string
  time: string
  endTime: string
  clientName: string
  serviceName: string
  barberName: string
  status: string
  durationMin: number
  paymentStatus: string
  paymentMode: string | null
  paidAmount: number | null
  price: number
}

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

// Chip de pagamento: so aparece quando ha cobranca (paymentStatus != NONE).
function paymentChip(b: BookingItem): { label: string; cls: string } | null {
  if (b.paymentStatus === 'PAID') {
    const val = b.paidAmount ?? (b.paymentMode === 'SINAL' ? b.price / 2 : b.price)
    const prefix = b.paymentMode === 'SINAL' ? 'Sinal pago' : 'Pago'
    return { label: `${prefix} ${brl(val)}`, cls: 'bg-emerald-50 text-emerald-700' }
  }
  if (b.paymentStatus === 'PENDING') {
    return { label: 'Aguardando PIX', cls: 'bg-amber-50 text-amber-700' }
  }
  if (b.paymentStatus === 'EXPIRED') {
    return { label: 'PIX expirado', cls: 'bg-zinc-100 text-zinc-600' }
  }
  return null
}

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  CONFIRMED: { label: 'Confirmado', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  PENDING: { label: 'Pendente', bg: 'bg-amber-50', text: 'text-amber-700' },
  COMPLETED: { label: 'Concluido', bg: 'bg-blue-50', text: 'text-blue-700' },
  IN_PROGRESS: { label: 'Em andamento', bg: 'bg-blue-50', text: 'text-blue-700' },
  CANCELLED_CLIENT: { label: 'Cancelado', bg: 'bg-red-50', text: 'text-red-700' },
  CANCELLED_BARBER: { label: 'Cancelado', bg: 'bg-red-50', text: 'text-red-700' },
  NO_SHOW: { label: 'Nao compareceu', bg: 'bg-zinc-100', text: 'text-zinc-600' },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

export function AgendaClient({
  bookings,
  dateLabel,
  currentDate,
}: {
  bookings: BookingItem[]
  dateLabel: string
  currentDate: string
}) {
  const router = useRouter()

  const navigateDate = (direction: number) => {
    const d = new Date(currentDate + 'T12:00:00')
    d.setDate(d.getDate() + direction)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    router.push(`/painel/agenda?date=${yyyy}-${mm}-${dd}`)
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-[#09090B] mb-6">Agenda</h1>

      {/* Date selector */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 rounded-lg bg-[#F4F4F5] text-[#71717A] hover:text-[#09090B] hover:bg-[#E4E4E7] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E4E4E7]">
          <Calendar className="w-4 h-4 text-[#71717A]" />
          <span className="text-sm font-medium text-[#09090B] capitalize">{dateLabel}</span>
        </div>
        <button
          onClick={() => navigateDate(1)}
          className="p-2 rounded-lg bg-[#F4F4F5] text-[#71717A] hover:text-[#09090B] hover:bg-[#E4E4E7] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => router.push('/painel/agenda')}
          className="ml-2 text-xs font-medium text-[#71717A] hover:text-[#09090B] transition-colors px-3 py-2 rounded-lg bg-[#F4F4F5]"
        >
          Hoje
        </button>
      </div>

      {/* Timeline */}
      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-12 text-center"
        >
          <CalendarOff className="w-10 h-10 text-[#D4D4D8] mx-auto mb-3" />
          <p className="text-sm text-[#71717A]">Nenhum agendamento para hoje</p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          {bookings.map((booking) => {
            const status = statusConfig[booking.status] || statusConfig.PENDING
            return (
              <motion.div
                key={booking.id}
                variants={item}
                className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4 flex items-center gap-4"
              >
                {/* Time */}
                <div className="w-20 shrink-0">
                  <p className="text-sm font-semibold text-[#09090B]">{booking.time}</p>
                  <p className="text-xs text-[#A1A1AA]">{booking.endTime}</p>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-[#E4E4E7]" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#09090B] truncate">
                    {booking.clientName}
                  </p>
                  <p className="text-xs text-[#71717A] truncate">
                    {booking.serviceName} &middot; {booking.barberName} &middot; {booking.durationMin}min
                  </p>
                  {(() => {
                    const chip = paymentChip(booking)
                    return chip ? (
                      <span
                        className={`mt-1.5 inline-block px-2 py-0.5 rounded text-[11px] font-medium ${chip.cls}`}
                      >
                        {chip.label}
                      </span>
                    ) : null
                  })()}
                </div>

                {/* Status badge */}
                <span
                  className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.text}`}
                >
                  {status.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}