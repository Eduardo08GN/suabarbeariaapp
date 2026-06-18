'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Users } from 'lucide-react'

type ClientItem = {
  id: string
  name: string
  phone: string
  totalVisits: number
  lastVisit: string
}

export function ClientesClient({ clients }: { clients: ClientItem[] }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return clients
    const q = search.toLowerCase()
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
    )
  }, [clients, search])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#09090B]">Clientes</h1>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou telefone..."
          className="w-full sm:w-80 bg-white border border-[#E4E4E7] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#09090B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] transition-colors"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F4F4F5]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Telefone</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Total Visitas</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Ultima Visita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center">
                    <Users className="w-8 h-8 text-[#D4D4D8] mx-auto mb-2" />
                    <p className="text-sm text-[#71717A]">
                      {search ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-[#09090B]">{client.name}</td>
                    <td className="px-5 py-3.5 text-sm text-[#71717A]">{client.phone}</td>
                    <td className="px-5 py-3.5 text-sm text-[#09090B]">{client.totalVisits}</td>
                    <td className="px-5 py-3.5 text-sm text-[#71717A]">{client.lastVisit}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}