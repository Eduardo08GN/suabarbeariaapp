'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Scissors,
  Calendar,
  Clock,
  User,
  Loader2,
  AlertCircle,
} from 'lucide-react'

export default function ConfirmarPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string

  const serviceId = searchParams.get('serviceId')
  const barberId = searchParams.get('barberId')
  const date = searchParams.get('date')
  const time = searchParams.get('time')

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [serviceInfo, setServiceInfo] = useState<{ name: string; price: string } | null>(null)
  const [barberInfo, setBarberInfo] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [servicesRes, staffRes] = await Promise.all([
          fetch(`/api/barber/services/${slug}`),
          fetch(`/api/barber/staff/${slug}`),
        ])
        const servicesData = await servicesRes.json()
        const staffData = await staffRes.json()

        const service = servicesData.services?.find(
          (s: { id: string }) => s.id === serviceId
        )
        const barber = staffData.barbers?.find(
          (b: { id: string }) => b.id === barberId
        )

        if (service) {
          setServiceInfo({
            name: service.name,
            price: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(service.price)),
          })
        }
        if (barber) setBarberInfo({ name: barber.name })
      } catch {
        // Silent fail
      }
    }
    fetchInfo()
  }, [slug, serviceId, barberId])

  const formattedDate = date
    ? format(parse(date, 'yyyy-MM-dd', new Date()), "EEEE, d 'de' MMMM", {
        locale: ptBR,
      })
    : ''

  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientPhone(formatPhoneInput(e.target.value))
  }

  const handleSubmit = async () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      setError('Preencha todos os campos')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/barber/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantSlug: slug,
          serviceId,
          barberId,
          date,
          time,
          clientName: clientName.trim(),
          clientPhone: clientPhone.replace(/\D/g, ''),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao confirmar agendamento')
        return
      }

      router.push(`/b/${slug}/sucesso?bookingId=${data.booking.id}`)
    } catch {
      setError('Erro de conexao. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="flex flex-col min-h-dvh"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="px-4 py-6 space-y-6 flex-1 pb-28">
        <div>
          <h2 className="text-xl font-bold text-(--text)">
            Confirme seu agendamento
          </h2>
          <p className="text-sm text-(--text-secondary) mt-1">
            Revise os detalhes e informe seus dados
          </p>
        </div>

        {/* Booking Summary */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Scissors className="w-4 h-4 text-(--tenant-primary) shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-(--text-secondary)">Servico</p>
              <p className="text-sm font-semibold text-(--text) truncate">
                {serviceInfo?.name || 'Carregando...'}
              </p>
            </div>
            {serviceInfo?.price && (
              <span className="text-sm font-bold text-(--tenant-primary)">
                {serviceInfo.price}
              </span>
            )}
          </div>

          <div className="h-px bg-(--border)" />

          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-(--tenant-primary) shrink-0" />
            <div>
              <p className="text-xs text-(--text-secondary)">Profissional</p>
              <p className="text-sm font-semibold text-(--text)">
                {barberInfo?.name || 'Carregando...'}
              </p>
            </div>
          </div>

          <div className="h-px bg-(--border)" />

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-(--tenant-primary) shrink-0" />
            <div>
              <p className="text-xs text-(--text-secondary)">Data</p>
              <p className="text-sm font-semibold text-(--text) capitalize">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="h-px bg-(--border)" />

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-(--tenant-primary) shrink-0" />
            <div>
              <p className="text-xs text-(--text-secondary)">Horario</p>
              <p className="text-sm font-semibold text-(--text)">{time}</p>
            </div>
          </div>
        </div>

        {/* Client Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-(--text) mb-1.5 block">
              Seu nome
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Como podemos te chamar?"
              className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm placeholder:text-(--text-secondary)/50 focus:outline-none focus:ring-2 focus:ring-(--tenant-primary)/20 focus:border-(--tenant-primary) transition-all min-h-[48px]"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-(--text) mb-1.5 block">
              Seu telefone
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              className="w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm placeholder:text-(--text-secondary)/50 focus:outline-none focus:ring-2 focus:ring-(--tenant-primary)/20 focus:border-(--tenant-primary) transition-all min-h-[48px]"
              required
            />
          </div>

          {error && (
            <motion.div
              className="flex items-center gap-2 text-sm text-(--danger) bg-red-50 p-3 rounded-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 p-4 bg-white/95 backdrop-blur-sm border-t border-(--border) pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleSubmit}
            disabled={loading || !clientName.trim() || !clientPhone.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2 min-h-[48px]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirmando...
              </>
            ) : (
              'Confirmar Agendamento'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}