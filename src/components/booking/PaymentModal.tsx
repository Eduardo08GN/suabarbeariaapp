'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check, Loader2, QrCode, Clock, ShieldCheck } from 'lucide-react'

export interface CheckoutData {
  bookingId: string
  value: number
  mode: 'SINAL' | 'TOTAL'
  qrCodeUrl: string | null
  copiaECola: string | null
  expiresAt: string
}

interface PaymentModalProps {
  open: boolean
  data: CheckoutData | null
  slug: string
  onClose: () => void
}

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

function mmss(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const mm = String(Math.floor(total / 60)).padStart(2, '0')
  const ss = String(total % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function PaymentModal({ open, data, slug, onClose }: PaymentModalProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<'PENDING' | 'PAID' | 'EXPIRED'>('PENDING')
  const [copied, setCopied] = useState(false)
  const [remaining, setRemaining] = useState<number>(0)

  useEffect(() => setMounted(true), [])

  // reseta ao abrir um novo PIX
  useEffect(() => {
    if (open && data) {
      setStatus('PENDING')
      setCopied(false)
      setRemaining(new Date(data.expiresAt).getTime() - Date.now())
    }
  }, [open, data])

  // contador regressivo
  useEffect(() => {
    if (!open || !data || status !== 'PENDING') return
    const id = setInterval(() => {
      const r = new Date(data.expiresAt).getTime() - Date.now()
      setRemaining(r)
      if (r <= 0) setStatus('EXPIRED')
    }, 1000)
    return () => clearInterval(id)
  }, [open, data, status])

  // polling do status do pagamento
  useEffect(() => {
    if (!open || !data || status !== 'PENDING') return
    let active = true
    const check = async () => {
      try {
        const res = await fetch(
          `/api/barber/payment-status?bookingId=${data.bookingId}&tenantSlug=${encodeURIComponent(slug)}`
        )
        const json = await res.json()
        if (!active) return
        if (json.status === 'PAID') {
          setStatus('PAID')
          setTimeout(() => {
            router.push(`/b/${slug}/sucesso?bookingId=${data.bookingId}`)
          }, 1100)
        } else if (json.status === 'EXPIRED') {
          setStatus('EXPIRED')
        }
      } catch {
        // mantem o polling
      }
    }
    check()
    const id = setInterval(check, 3500)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [open, data, status, router, slug])

  const copy = useCallback(async () => {
    if (!data?.copiaECola) return
    try {
      await navigator.clipboard.writeText(data.copiaECola)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // alguns navegadores bloqueiam; o usuario seleciona manualmente
    }
  }, [data])

  if (!mounted || !data) return null

  const modeLabel = data.mode === 'SINAL' ? 'Sinal (50%)' : 'Pagamento total'

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay com blur */}
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={status === 'PENDING' ? undefined : onClose}
          />

          <motion.div
            className="relative w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-(--border) bg-(--bg-card) shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--tenant-primary)">
                  <QrCode className="h-4 w-4 text-white" />
                </span>
                <div>
                  <p className="text-sm font-bold text-(--text) leading-tight">Pagamento PIX</p>
                  <p className="text-[11px] text-(--text-secondary) leading-tight">{modeLabel}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-8 w-8 items-center justify-center rounded-full text-(--text-secondary) hover:bg-(--bg-subtle) transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {status === 'PAID' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16 }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--success)"
                  >
                    <Check className="h-8 w-8 text-white" strokeWidth={3} />
                  </motion.div>
                  <p className="text-lg font-bold text-(--text)">Pagamento confirmado</p>
                  <p className="mt-1 text-sm text-(--text-secondary)">Levando voce ao seu agendamento...</p>
                </div>
              ) : status === 'EXPIRED' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--bg-subtle)">
                    <Clock className="h-7 w-7 text-(--text-secondary)" />
                  </div>
                  <p className="text-lg font-bold text-(--text)">O tempo do PIX acabou</p>
                  <p className="mt-1 mb-5 text-sm text-(--text-secondary)">
                    O horario foi liberado. Faca o agendamento de novo para gerar um novo codigo.
                  </p>
                  <button onClick={onClose} className="btn-primary w-full min-h-[48px]">
                    Voltar
                  </button>
                </div>
              ) : (
                <>
                  {/* valor */}
                  <div className="mb-4 flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-(--text)">
                      {brl(data.value)}
                    </span>
                  </div>

                  {/* QR */}
                  <div className="mx-auto mb-4 w-fit rounded-2xl border border-(--border) bg-white p-3">
                    {data.qrCodeUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={data.qrCodeUrl}
                        alt="QR Code PIX"
                        className="h-52 w-52 object-contain"
                      />
                    ) : (
                      <div className="flex h-52 w-52 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-(--text-secondary)" />
                      </div>
                    )}
                  </div>

                  {/* copia e cola */}
                  {data.copiaECola && (
                    <button
                      onClick={copy}
                      className="mb-4 flex w-full items-center gap-2 rounded-xl border border-(--border) bg-(--bg-subtle) px-3 py-3 text-left transition-colors hover:bg-(--border)/40"
                    >
                      <span className="flex-1 truncate font-mono text-xs text-(--text-secondary)">
                        {data.copiaECola}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-(--tenant-primary)">
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? 'Copiado' : 'Copiar'}
                      </span>
                    </button>
                  )}

                  {/* status + contador */}
                  <div className="flex items-center justify-center gap-2 text-sm text-(--text-secondary)">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Aguardando pagamento</span>
                    <span className="text-(--border)">|</span>
                    <span className="tabular-nums font-medium text-(--text)">{mmss(remaining)}</span>
                  </div>

                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-(--text-secondary)">
                    <ShieldCheck className="h-3 w-3" />
                    Abra o app do seu banco, escolha PIX e leia o codigo
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(content, document.body)
}
