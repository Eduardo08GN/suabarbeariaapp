'use client'

import { motion } from 'framer-motion'
import { Plus, Store, Users, CalendarDays, Scissors } from 'lucide-react'

type TenantItem = {
  id: string
  name: string
  slug: string
  status: string
  bookingsCount: number
  clientsCount: number
  barbersCount: number
}

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  ACTIVE: { label: 'Ativo', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  ONBOARDING: { label: 'Onboarding', bg: 'bg-amber-50', text: 'text-amber-700' },
  PAUSED: { label: 'Pausado', bg: 'bg-zinc-100', text: 'text-zinc-600' },
  CANCELLED: { label: 'Cancelado', bg: 'bg-red-50', text: 'text-red-700' },
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export function MasterClient({ tenants }: { tenants: TenantItem[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#09090B]">Barbearias</h1>
        <button className="flex items-center gap-2 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors">
          <Plus className="w-4 h-4" />
          Nova Barbearia
        </button>
      </div>

      {tenants.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-12 text-center">
          <Store className="w-10 h-10 text-[#D4D4D8] mx-auto mb-3" />
          <p className="text-sm text-[#71717A]">Nenhuma barbearia cadastrada</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {tenants.map((tenant) => {
            const status = statusConfig[tenant.status] || statusConfig.ACTIVE
            return (
              <motion.div
                key={tenant.id}
                variants={item}
                className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#09090B]">{tenant.name}</h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">/{tenant.slug}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E4E4E7]">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    <span className="text-xs text-[#71717A]">{tenant.bookingsCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    <span className="text-xs text-[#71717A]">{tenant.clientsCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    <span className="text-xs text-[#71717A]">{tenant.barbersCount}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}