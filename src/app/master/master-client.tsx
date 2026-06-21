'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Store, Users, CalendarDays, Scissors, X, Loader2 } from 'lucide-react'
import { createBarbearia } from '@/actions/tenants'

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

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-/, '')
}

const inputCls =
  'mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#09090B] outline-none transition-colors placeholder:text-[#A1A1AA] focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]'

export function MasterClient({ tenants }: { tenants: TenantItem[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function openModal() {
    setName('')
    setSlug('')
    setSlugEdited(false)
    setEmail('')
    setPassword('')
    setError('')
    setOpen(true)
  }

  function onName(v: string) {
    setName(v)
    if (!slugEdited) setSlug(slugify(v))
  }

  async function handleCreate() {
    setError('')
    setSaving(true)
    try {
      await createBarbearia({ name, slug, ownerEmail: email, ownerPassword: password })
      setOpen(false)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível criar a barbearia.')
    } finally {
      setSaving(false)
    }
  }

  const canSave = name.trim() && slug.trim() && email.trim() && password.trim() && !saving

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#09090B]">Barbearias</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors"
        >
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

      {/* Modal: nova barbearia */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nova-barbearia"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
            onClick={() => !saving && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-[#E4E4E7] shadow-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-semibold text-[#09090B]">Nova barbearia</h3>
                <button onClick={() => setOpen(false)} className="p-1 text-[#71717A] hover:text-[#09090B]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#71717A] mb-5">
                Cria a barbearia e o login do dono. Ele entra no painel e configura o resto.
              </p>

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#09090B]">Nome da barbearia</label>
                  <input
                    value={name}
                    onChange={(e) => onName(e.target.value)}
                    placeholder="Barbearia do João"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#09090B]">Endereço</label>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlugEdited(true)
                      setSlug(slugify(e.target.value))
                    }}
                    placeholder="barbearia-do-joao"
                    className={inputCls}
                  />
                  <p className="mt-1.5 truncate text-xs text-[#A1A1AA]">
                    barbearia.appkash.com.br/b/{slug || 'endereco'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#09090B]">E-mail do dono</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dono@email.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#09090B]">Senha do dono</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo de 6 caracteres"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-[#F4F4F5] text-[#18181B] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#E4E4E7] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!canSave}
                  className="flex-1 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Criar barbearia'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
