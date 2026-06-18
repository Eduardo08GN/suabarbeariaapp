'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Users, DollarSign, Clock } from 'lucide-react'

type StatCard = {
  label: string
  value: string
  icon: 'calendar' | 'users' | 'dollar'
}

type UpcomingBooking = {
  id: string
  time: string
  clientName: string
  serviceName: string
  barberName: string
}

const iconMap = {
  calendar: CalendarDays,
  users: Users,
  dollar: DollarSign,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function DashboardClient({
  stats,
  upcoming,
}: {
  stats: StatCard[]
  upcoming: UpcomingBooking[]
}) {
  return (
    <div>
      <h1 className="text-lg font-semibold text-[#09090B] mb-6">Dashboard</h1>

      {/* Stat cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon]
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#F4F4F5] flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-[#71717A]" />
                </div>
                <span className="text-xs font-medium text-[#71717A] uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#09090B]">{stat.value}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Upcoming bookings */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      >
        <div className="px-5 py-4 border-b border-[#E4E4E7]">
          <h2 className="text-sm font-semibold text-[#09090B] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#71717A]" />
            Proximos Agendamentos
          </h2>
        </div>
        <div className="divide-y divide-[#E4E4E7]">
          {upcoming.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-[#71717A]">
              Nenhum agendamento proximo
            </div>
          ) : (
            upcoming.map((booking) => (
              <div key={booking.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="w-12 text-sm font-semibold text-[#18181B]">
                  {booking.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#09090B] truncate">
                    {booking.clientName}
                  </p>
                  <p className="text-xs text-[#71717A] truncate">
                    {booking.serviceName} &middot; {booking.barberName}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}