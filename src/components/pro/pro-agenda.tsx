'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, CalendarOff } from 'lucide-react'
import { NotificationToggle } from '@/components/painel/notification-toggle'

type BookingItem = {
  id: string
  time: string
  endTime: string
  clientName: string
  serviceName: string
  status: string
  durationMin: number
  paymentStatus: string
  paymentMode: string | null
  paidAmount: number | null
  price: number
  products: string[]
}

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

// Chip de pagamento: so aparece quando ha cobranca (paymentStatus != NONE).
function paymentChip(b: BookingItem): { label: string; cls: string } | null {
  if (b.paymentStatus === 'PAID') {
    const val = b.paidAmount ?? (b.paymentMode === 'SINAL' ? b.price / 2 : b.price)
    const prefix = b.paymentMode === 'SINAL' && b.products.length === 0 ? 'Sinal pago' : 'Pago'
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
  COMPLETED: { label: 'Concluído', bg: 'bg-blue-50', text: 'text-blue-700' },
  IN_PROGRESS: { label: 'Em andamento', bg: 'bg-blue-50', text: 'text-blue-700' },
  CANCELLED_CLIENT: { label: 'Cancelado', bg: 'bg-red-50', text: 'text-red-700' },
  CANCELLED_BARBER: { label: 'Cancelado', bg: 'bg-red-50', text: 'text-red-700' },
  NO_SHOW: { label: 'Não compareceu', bg: 'bg-zinc-100', text: 'text-zinc-600' },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

export function ProAgenda({
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
    // ancora no meio-dia pra mudar so o dia, sem off-by-one de fuso
    const d = new Date(currentDate + 'T12:00:00')
    d.setDate(d.getDate() + direction)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    router.push(`/pro?date=${yyyy}-${mm}-${dd}`)
  }

  return (
    <div className="space-y-5">
      <NotificationToggle />

      {/* Seletor de data */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigateDate(-1)}
          aria-label="Dia anterior"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E4E4E7] text-[#71717A] transition-colors hover:text-[#09090B] active:bg-[#F4F4F5]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex h-11 flex-1 items-center justify-center rounded-lg bg-white border border-[#E4E4E7] px-3">
          <span className="truncate text-sm font-medium capitalize text-[#09090B]">{dateLabel}</span>
        </div>
        <button
          onClick={() => navigateDate(1)}
          aria-label="Próximo dia"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E4E4E7] text-[#71717A] transition-colors hover:text-[#09090B] active:bg-[#F4F4F5]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="-mt-2 flex justify-end">
        <button
          onClick={() => router.push('/pro')}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#71717A] transition-colors hover:bg-[#F4F4F5] hover:text-[#09090B]"
        >
          Hoje
        </button>
      </div>

      {/* Lista de agendamentos */}
      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-[#E4E4E7] bg-white p-12 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <CalendarOff className="mx-auto mb-3 h-10 w-10 text-[#D4D4D8]" />
          <p className="text-sm text-[#71717A]">Nenhum agendamento neste dia</p>
        </motion.div>
      ) : (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
          {bookings.map((booking) => {
            const status = statusConfig[booking.status] || statusConfig.PENDING
            const chip = paymentChip(booking)
            return (
              <motion.div
                key={booking.id}
                variants={item}
                className="flex items-center gap-4 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <div className="w-16 shrink-0">
                  <p className="text-sm font-semibold text-[#09090B]">{booking.time}</p>
                  <p className="text-xs text-[#A1A1AA]">{booking.endTime}</p>
                </div>

                <div className="h-10 w-px bg-[#E4E4E7]" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#09090B]">{booking.clientName}</p>
                  <p className="truncate text-xs text-[#71717A]">
                    {booking.serviceName} &middot; {booking.durationMin}min
                  </p>
                  {booking.products.length > 0 && (
                    <p className="mt-0.5 truncate text-[11px] text-[#A1A1AA]">
                      Produtos: {booking.products.join(', ')}
                    </p>
                  )}
                  {chip && (
                    <span
                      className={`mt-1.5 inline-block rounded px-2 py-0.5 text-[11px] font-medium ${chip.cls}`}
                    >
                      {chip.label}
                    </span>
                  )}
                </div>

                <span
                  className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${status.bg} ${status.text}`}
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
