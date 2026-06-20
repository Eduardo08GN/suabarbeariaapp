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
  Wallet,
  CalendarCheck,
  Plus,
  Check,
} from 'lucide-react'
import { PaymentModal, type CheckoutData } from '@/components/booking/PaymentModal'
import { computeOrder } from '@/lib/pricing'

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

type BookingMode = 'PAYMENT_REQUIRED' | 'PAYMENT_OPTIONAL' | 'BOOK_ONLY'
interface ProductDTO { id: string; name: string; description: string | null; price: number }

interface Config {
  paymentEnabled: boolean
  bookingMode: BookingMode
  incentivoAtivo: boolean
  descontoSinalPct: number
  descontoTotalPct: number
  products: ProductDTO[]
}

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
  const [clientEmail, setClientEmail] = useState('')
  const [clientCpf, setClientCpf] = useState('')
  const [loadingMode, setLoadingMode] = useState<'SINAL' | 'TOTAL' | 'NONE' | null>(null)
  const [error, setError] = useState('')
  const [config, setConfig] = useState<Config>({
    paymentEnabled: false,
    bookingMode: 'BOOK_ONLY',
    incentivoAtivo: false,
    descontoSinalPct: 0,
    descontoTotalPct: 0,
    products: [],
  })
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [serviceInfo, setServiceInfo] = useState<{ name: string; price: number } | null>(null)
  const [barberInfo, setBarberInfo] = useState<{ name: string } | null>(null)
  const [checkout, setCheckout] = useState<CheckoutData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [servicesRes, staffRes, configRes] = await Promise.all([
          fetch(`/api/barber/services/${slug}`),
          fetch(`/api/barber/staff/${slug}`),
          fetch(`/api/barber/config/${slug}`),
        ])
        const servicesData = await servicesRes.json()
        const staffData = await staffRes.json()
        const c = await configRes.json()

        const service = servicesData.services?.find((s: { id: string }) => s.id === serviceId)
        const barber = staffData.barbers?.find((b: { id: string }) => b.id === barberId)

        if (service) setServiceInfo({ name: service.name, price: Number(service.price) })
        if (barber) setBarberInfo({ name: barber.name })
        setConfig({
          paymentEnabled: !!c?.paymentEnabled,
          bookingMode: (c?.bookingMode as BookingMode) || 'BOOK_ONLY',
          incentivoAtivo: !!c?.incentivoAtivo,
          descontoSinalPct: Number(c?.descontoSinalPct) || 0,
          descontoTotalPct: Number(c?.descontoTotalPct) || 0,
          products: Array.isArray(c?.products) ? c.products : [],
        })
      } catch {
        // Silent fail
      }
    }
    fetchInfo()
  }, [slug, serviceId, barberId])

  const formattedDate = date
    ? format(parse(date, 'yyyy-MM-dd', new Date()), "EEEE, d 'de' MMMM", { locale: ptBR })
    : ''

  const formatPhoneInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const formatCpfInput = (value: string) => {
    const d = value.replace(/\D/g, '').slice(0, 11)
    if (d.length <= 3) return d
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
  }

  const price = serviceInfo?.price ?? 0

  const canPay = config.paymentEnabled && config.bookingMode !== 'BOOK_ONLY'

  // produtos (order bump): so dao pra adicionar quando ha como cobrar (canPay)
  const selectedProducts = config.products.filter((p) => selectedIds.includes(p.id))
  const productsTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0)
  const toggleProduct = (id: string) =>
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))

  // pedido por modo (servico com desconto + produtos cheios). Fonte unica:
  // computeOrder, o MESMO usado no servidor — front e back nunca divergem.
  const incentivo = {
    incentivoAtivo: config.incentivoAtivo,
    descontoSinalPct: config.descontoSinalPct,
    descontoTotalPct: config.descontoTotalPct,
  }
  const order = (mode: 'SINAL' | 'TOTAL') =>
    computeOrder({ servicePrice: price, mode, incentivo, productsTotal })

  const t = order('TOTAL')
  const s = order('SINAL')
  const loaded = !!serviceInfo
  const totalViable = canPay && loaded && !t.belowMin
  const sinalViable = canPay && loaded && !s.belowMin
  // "agendar sem pagar" so quando nao ha produto no carrinho (produto exige PIX)
  const showFree =
    (config.bookingMode === 'BOOK_ONLY' || config.bookingMode === 'PAYMENT_OPTIONAL') &&
    selectedProducts.length === 0
  // travado: exige pagar mas nenhum modo alcanca o minimo do PIX
  const lockedOut = canPay && loaded && !totalViable && !sinalViable && !showFree

  const baseValid = clientName.trim().length > 0 && clientPhone.replace(/\D/g, '').length >= 10
  const cpfValid = clientCpf.replace(/\D/g, '').length === 11
  const busy = loadingMode !== null

  const submit = async (mode: 'SINAL' | 'TOTAL' | 'NONE') => {
    setError('')
    if (!baseValid) {
      setError('Preencha nome e telefone.')
      return
    }
    if (mode !== 'NONE' && !cpfValid) {
      setError('Informe um CPF valido para o pagamento.')
      return
    }

    setLoadingMode(mode)
    try {
      const res = await fetch('/api/barber/checkout', {
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
          clientEmail: clientEmail.trim() || undefined,
          clientCpf: clientCpf.replace(/\D/g, ''),
          paymentMode: mode === 'NONE' ? undefined : mode,
          productIds: selectedIds,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Erro ao processar. Tente novamente.')
        return
      }

      if (data.paid) {
        setCheckout({
          bookingId: data.bookingId,
          value: data.value,
          mode: data.mode,
          qrCodeUrl: data.qrCodeUrl,
          copiaECola: data.copiaECola,
          expiresAt: data.expiresAt,
        })
        setModalOpen(true)
      } else {
        router.push(`/b/${slug}/sucesso?bookingId=${data.bookingId}`)
      }
    } catch {
      setError('Erro de conexao. Tente novamente.')
    } finally {
      setLoadingMode(null)
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-(--border) bg-(--bg-card) text-(--text) text-sm placeholder:text-(--text-secondary)/50 focus:outline-none focus:ring-2 focus:ring-(--tenant-primary)/20 focus:border-(--tenant-primary) transition-all min-h-[48px]'

  return (
    <motion.div
      className="flex flex-col min-h-dvh"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="px-4 py-6 space-y-6 flex-1 pb-44">
        <div>
          <h2 className="text-xl font-bold text-(--text)">Confirme seu agendamento</h2>
          <p className="text-sm text-(--text-secondary) mt-1">
            {canPay
              ? 'Revise os detalhes, informe seus dados e finalize'
              : 'Revise os detalhes e informe seus dados'}
          </p>
        </div>

        {/* Resumo */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Scissors className="w-4 h-4 text-(--tenant-primary) shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-(--text-secondary)">Servico</p>
              <p className="text-sm font-semibold text-(--text) truncate">
                {serviceInfo?.name || 'Carregando...'}
              </p>
            </div>
            {serviceInfo && (
              <span className="text-sm font-bold text-(--tenant-primary)">{brl(price)}</span>
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
              <p className="text-sm font-semibold text-(--text) capitalize">{formattedDate}</p>
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

        {/* Aproveite tambem (order bump) */}
        {canPay && config.products.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-(--text) mb-3">Aproveite tambem</h3>
            <div className="space-y-2">
              {config.products.map((p) => {
                const on = selectedIds.includes(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      on
                        ? 'border-(--tenant-primary) bg-(--tenant-primary)/5'
                        : 'border-(--border) bg-(--bg-card) active:bg-(--bg-subtle)'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-(--text) truncate">{p.name}</p>
                      {p.description && (
                        <p className="text-xs text-(--text-secondary) truncate">{p.description}</p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-(--text) shrink-0">{brl(p.price)}</span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                        on ? 'bg-(--tenant-primary) text-white' : 'bg-(--bg-subtle) text-(--text-secondary)'
                      }`}
                    >
                      {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Formulario */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-(--text) mb-1.5 block">Seu nome</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Como podemos te chamar?"
              className={inputCls}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-(--text) mb-1.5 block">Seu telefone</label>
            <input
              type="tel"
              inputMode="numeric"
              value={clientPhone}
              onChange={(e) => setClientPhone(formatPhoneInput(e.target.value))}
              placeholder="(00) 00000-0000"
              className={inputCls}
            />
          </div>

          {canPay && (
            <>
              <div>
                <label className="text-sm font-medium text-(--text) mb-1.5 block">
                  E-mail <span className="text-(--text-secondary) font-normal">(opcional)</span>
                </label>
                <input
                  type="email"
                  inputMode="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-(--text) mb-1.5 block">CPF</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={clientCpf}
                  onChange={(e) => setClientCpf(formatCpfInput(e.target.value))}
                  placeholder="000.000.000-00"
                  className={inputCls}
                />
                <p className="mt-1 text-[11px] text-(--text-secondary)">
                  Necessario apenas para o pagamento via PIX.
                </p>
              </div>
            </>
          )}

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

      {/* Barra inferior fixa */}
      <div className="fixed inset-x-0 bottom-0 p-4 bg-white/95 backdrop-blur-sm border-t border-(--border) pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto space-y-2.5">
          {totalViable && (
            <button
              onClick={() => submit('TOTAL')}
              disabled={busy || !baseValid || !cpfValid}
              className="btn-primary w-full flex items-center justify-center gap-2 min-h-[52px] text-base relative"
            >
              {loadingMode === 'TOTAL' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wallet className="w-4 h-4" />
              )}
              <span>Pagar total {brl(t.pixValue)}</span>
              {t.serviceDiscountPct > 0 && (
                <>
                  {selectedProducts.length === 0 && (
                    <span className="text-xs line-through text-white/55">{brl(t.serviceFull)}</span>
                  )}
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold">
                    {t.serviceDiscountPct}% OFF
                  </span>
                </>
              )}
            </button>
          )}

          {sinalViable && (
            <button
              onClick={() => submit('SINAL')}
              disabled={busy || !baseValid || !cpfValid}
              className="btn-outline w-full flex items-center justify-center gap-2 min-h-[48px]"
            >
              {loadingMode === 'SINAL' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Pagar sinal de 50% {brl(s.pixValue)}</span>
              {s.serviceDiscountPct > 0 && (
                <span className="rounded-full bg-(--tenant-primary)/10 px-2 py-0.5 text-[11px] font-bold text-(--tenant-primary)">
                  {s.serviceDiscountPct}% OFF
                </span>
              )}
            </button>
          )}

          {showFree && (
            <button
              onClick={() => submit('NONE')}
              disabled={busy || !baseValid}
              className={`${
                totalViable || sinalViable ? 'btn-outline' : 'btn-primary'
              } w-full flex items-center justify-center gap-2 min-h-[48px]`}
            >
              {loadingMode === 'NONE' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CalendarCheck className="w-4 h-4" />
              )}
              {totalViable || sinalViable ? 'Agendar sem pagar agora' : 'Confirmar Agendamento'}
            </button>
          )}

          {lockedOut && (
            <p className="flex items-center justify-center gap-2 rounded-lg bg-(--bg-subtle) px-3 py-3 text-center text-xs text-(--text-secondary)">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {selectedProducts.length > 0
                ? 'Este item deixa o total abaixo do minimo do PIX. Remova o item para continuar.'
                : 'Pagamento indisponivel para este valor. Fale com a barbearia.'}
            </p>
          )}
        </div>
      </div>

      <PaymentModal
        open={modalOpen}
        data={checkout}
        slug={slug}
        onClose={() => setModalOpen(false)}
      />
    </motion.div>
  )
}
