'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, ToggleLeft, ToggleRight, X, Loader2 } from 'lucide-react'
import { getServices, createService, updateService, toggleServiceActive } from '@/actions/services'
import { formatCurrency, formatDuration } from '@/lib/utils'

type Service = {
  id: string
  name: string
  category: string
  price: number
  durationMin: number
  active: boolean
  description: string | null
}

const categoryLabels: Record<string, string> = {
  HAIR: 'Cabelo',
  BEARD: 'Barba',
  CHEMISTRY: 'Quimica',
  AESTHETICS: 'Estetica',
  COMBO: 'Combo',
  TREATMENT: 'Tratamento',
}

const categories = ['HAIR', 'BEARD', 'CHEMISTRY', 'AESTHETICS', 'COMBO', 'TREATMENT'] as const

function getTenantIdFromCookie(): string {
  // Read from cookie — middleware injects it, but client reads from decoded JWT
  // For MVP, we read x-tenant-id set in middleware via a meta tag or hardcode
  return ''
}

export default function ServicosPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [tenantId, setTenantId] = useState('')

  // Form state
  const [formName, setFormName] = useState('')
  const [formCategory, setFormCategory] = useState<string>('HAIR')
  const [formPrice, setFormPrice] = useState('')
  const [formDuration, setFormDuration] = useState('')
  const [formDesc, setFormDesc] = useState('')
  const [saving, setSaving] = useState(false)

  const loadServices = useCallback(async (tid: string) => {
    try {
      const data = await getServices(tid)
      setServices(data as Service[])
    } catch {
      // silently fail for MVP
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Get tenantId from meta or fallback
    const meta = document.querySelector('meta[name="x-tenant-id"]')
    const tid = meta?.getAttribute('content') || ''
    setTenantId(tid)
    if (tid) loadServices(tid)
    else setLoading(false)
  }, [loadServices])

  const openCreate = () => {
    setEditing(null)
    setFormName('')
    setFormCategory('HAIR')
    setFormPrice('')
    setFormDuration('')
    setFormDesc('')
    setShowModal(true)
  }

  const openEdit = (svc: Service) => {
    setEditing(svc)
    setFormName(svc.name)
    setFormCategory(svc.category)
    setFormPrice(String(svc.price))
    setFormDuration(String(svc.durationMin))
    setFormDesc(svc.description || '')
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const data = {
        name: formName,
        category: formCategory as 'HAIR',
        price: parseFloat(formPrice),
        durationMin: parseInt(formDuration),
        description: formDesc || undefined,
      }
      if (editing) {
        await updateService(editing.id, data)
      } else {
        await createService(tenantId, data)
      }
      setShowModal(false)
      await loadServices(tenantId)
    } catch {
      // handle error
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (serviceId: string) => {
    try {
      await toggleServiceActive(serviceId)
      await loadServices(tenantId)
    } catch {
      // handle error
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#09090B]">Servicos</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Servico
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F4F4F5]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Nome</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Categoria</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Preco</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Duracao</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-[#71717A] uppercase tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#71717A]">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-[#71717A]">
                    Nenhum servico cadastrado
                  </td>
                </tr>
              ) : (
                services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-[#09090B]">{svc.name}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2.5 py-1 rounded-md bg-[#F4F4F5] text-xs font-medium text-[#71717A]">
                        {categoryLabels[svc.category] || svc.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#09090B]">{formatCurrency(svc.price)}</td>
                    <td className="px-5 py-3.5 text-sm text-[#71717A]">{formatDuration(svc.durationMin)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${svc.active ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                        {svc.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(svc)}
                          className="p-2 rounded-lg text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggle(svc.id)}
                          className="p-2 rounded-lg text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] transition-colors"
                          title={svc.active ? 'Desativar' : 'Ativar'}
                        >
                          {svc.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-[#E4E4E7] shadow-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-[#09090B]">
                  {editing ? 'Editar Servico' : 'Novo Servico'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1 text-[#71717A] hover:text-[#09090B]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">Nome</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                    placeholder="Ex: Corte Degradê"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">Categoria</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{categoryLabels[c]}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#09090B] mb-1.5">Preco (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                      placeholder="45.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#09090B] mb-1.5">Duracao (min)</label>
                    <input
                      type="number"
                      min="5"
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                      placeholder="30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">Descricao (opcional)</label>
                  <input
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                    placeholder="Descricao breve do servico"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#F4F4F5] text-[#18181B] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#E4E4E7] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !formName || !formPrice || !formDuration}
                  className="flex-1 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Salvar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}