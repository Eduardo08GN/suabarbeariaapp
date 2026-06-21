'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Pencil,
  ToggleLeft,
  ToggleRight,
  X,
  Loader2,
  User,
  KeyRound,
  Trash2,
} from 'lucide-react'
import {
  getBarbers,
  createBarber,
  updateBarber,
  toggleBarberActive,
  criarAcessoBarbeiro,
  removerAcessoBarbeiro,
} from '@/actions/staff'

type Barber = {
  id: string
  name: string
  nickname: string | null
  photoUrl: string | null
  commissionPct: number
  active: boolean
  user: { id: string; email: string } | null
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export default function EquipePage() {
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [loading, setLoading] = useState(true)

  // modal de cadastro/edicao
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Barber | null>(null)
  const [formName, setFormName] = useState('')
  const [formNickname, setFormNickname] = useState('')
  const [formCommission, setFormCommission] = useState('50')
  const [saving, setSaving] = useState(false)

  // modal de acesso (login do profissional)
  const [accessBarber, setAccessBarber] = useState<Barber | null>(null)
  const [accessEmail, setAccessEmail] = useState('')
  const [accessPassword, setAccessPassword] = useState('')
  const [accessSaving, setAccessSaving] = useState(false)
  const [accessRemoving, setAccessRemoving] = useState(false)
  const [accessError, setAccessError] = useState('')

  const loadBarbers = useCallback(async () => {
    try {
      const data = await getBarbers()
      setBarbers(data as Barber[])
    } catch {
      // silently fail for MVP
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBarbers()
  }, [loadBarbers])

  const openCreate = () => {
    setEditing(null)
    setFormName('')
    setFormNickname('')
    setFormCommission('50')
    setShowModal(true)
  }

  const openEdit = (barber: Barber) => {
    setEditing(barber)
    setFormName(barber.name)
    setFormNickname(barber.nickname || '')
    setFormCommission(String(barber.commissionPct))
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const data = {
        name: formName,
        nickname: formNickname || undefined,
        commissionPct: parseFloat(formCommission),
      }
      if (editing) {
        await updateBarber(editing.id, data)
      } else {
        await createBarber(data)
      }
      setShowModal(false)
      await loadBarbers()
    } catch {
      // handle error
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (barberId: string) => {
    try {
      await toggleBarberActive(barberId)
      await loadBarbers()
    } catch {
      // handle error
    }
  }

  const openAccess = (barber: Barber) => {
    setAccessBarber(barber)
    setAccessEmail(barber.user?.email || '')
    setAccessPassword('')
    setAccessError('')
  }

  const handleSaveAccess = async () => {
    if (!accessBarber) return
    setAccessError('')
    setAccessSaving(true)
    try {
      await criarAcessoBarbeiro(accessBarber.id, {
        email: accessEmail,
        password: accessPassword,
      })
      setAccessBarber(null)
      await loadBarbers()
    } catch (e) {
      setAccessError(e instanceof Error ? e.message : 'Não foi possível salvar o acesso.')
    } finally {
      setAccessSaving(false)
    }
  }

  const handleRemoveAccess = async () => {
    if (!accessBarber) return
    setAccessError('')
    setAccessRemoving(true)
    try {
      await removerAcessoBarbeiro(accessBarber.id)
      setAccessBarber(null)
      await loadBarbers()
    } catch (e) {
      setAccessError(e instanceof Error ? e.message : 'Não foi possível remover o acesso.')
    } finally {
      setAccessRemoving(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-[#09090B]">Equipe</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Barbeiro
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-[#71717A]" />
        </div>
      ) : barbers.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-12 text-center">
          <User className="w-10 h-10 text-[#D4D4D8] mx-auto mb-3" />
          <p className="text-sm text-[#71717A]">Nenhum barbeiro cadastrado</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {barbers.map((barber) => (
            <motion.div
              key={barber.id}
              variants={item}
              className="bg-white rounded-xl border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#F4F4F5] flex items-center justify-center shrink-0">
                  {barber.photoUrl ? (
                    <img
                      src={barber.photoUrl}
                      alt={barber.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-[#71717A]">
                      {getInitials(barber.name)}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#09090B] truncate">{barber.name}</p>
                  {barber.nickname && (
                    <p className="text-xs text-[#71717A] truncate">{barber.nickname}</p>
                  )}
                  <p className="text-xs text-[#A1A1AA] mt-1">Comissão: {barber.commissionPct}%</p>
                </div>

                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                    barber.active ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {barber.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>

              {/* Login no app do profissional — eixo separado do status "Ativo"
                  (operacional). Neutro + chave, pra nao competir com o pill verde. */}
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <KeyRound className="w-3.5 h-3.5 shrink-0 text-[#A1A1AA]" />
                {barber.user ? (
                  <span className="truncate text-[#71717A]">
                    Acesso ao app &middot; {barber.user.email}
                  </span>
                ) : (
                  <span className="text-[#A1A1AA]">Sem acesso ao app</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1 mt-4 pt-3 border-t border-[#E4E4E7]">
                <button
                  onClick={() => openEdit(barber)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </button>
                <button
                  onClick={() => openAccess(barber)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Acesso
                </button>
                <button
                  onClick={() => handleToggle(barber.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#71717A] hover:text-[#09090B] hover:bg-[#F4F4F5] transition-colors"
                >
                  {barber.active ? (
                    <><ToggleRight className="w-3.5 h-3.5" /> Desativar</>
                  ) : (
                    <><ToggleLeft className="w-3.5 h-3.5" /> Ativar</>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal de cadastro/edicao */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="form-modal"
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
                  {editing ? 'Editar Barbeiro' : 'Novo Barbeiro'}
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
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">Apelido (opcional)</label>
                  <input
                    value={formNickname}
                    onChange={(e) => setFormNickname(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                    placeholder="Como é conhecido"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">Comissão (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formCommission}
                    onChange={(e) => setFormCommission(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
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
                  disabled={saving || !formName}
                  className="flex-1 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Salvar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de acesso (login do profissional) */}
      <AnimatePresence>
        {accessBarber && (
          <motion.div
            key="access-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
            onClick={() => setAccessBarber(null)}
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
                <h3 className="text-base font-semibold text-[#09090B]">Acesso de {accessBarber.name}</h3>
                <button onClick={() => setAccessBarber(null)} className="p-1 text-[#71717A] hover:text-[#09090B]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#71717A] mb-5">
                Crie o login que o profissional usa pra ver a própria agenda no celular e receber
                aviso de cada novo agendamento.
              </p>

              {accessError && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                  {accessError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">E-mail</label>
                  <input
                    type="email"
                    value={accessEmail}
                    onChange={(e) => setAccessEmail(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#09090B] mb-1.5">
                    {accessBarber.user ? 'Nova senha' : 'Senha'}
                  </label>
                  <input
                    type="password"
                    value={accessPassword}
                    onChange={(e) => setAccessPassword(e.target.value)}
                    className="w-full bg-white border border-[#E4E4E7] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B]"
                    placeholder="Mínimo de 6 caracteres"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {accessBarber.user ? (
                  <button
                    onClick={handleRemoveAccess}
                    disabled={accessRemoving || accessSaving}
                    className="flex items-center justify-center gap-1.5 bg-white border border-[#E4E4E7] text-red-600 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {accessRemoving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Remover
                  </button>
                ) : (
                  <button
                    onClick={() => setAccessBarber(null)}
                    className="flex-1 bg-[#F4F4F5] text-[#18181B] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#E4E4E7] transition-colors"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  onClick={handleSaveAccess}
                  disabled={accessSaving || accessRemoving || !accessEmail || !accessPassword}
                  className="flex-1 bg-[#18181B] text-[#FAFAFA] rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-[#27272A] transition-colors disabled:opacity-50"
                >
                  {accessSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : accessBarber.user ? (
                    'Atualizar'
                  ) : (
                    'Criar acesso'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
