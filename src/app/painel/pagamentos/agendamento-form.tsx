'use client'

import { useState, useTransition } from 'react'
import { CalendarCog, Check, Loader2, Tag, AlertTriangle } from 'lucide-react'
import { salvarConfigAgendamento } from '@/actions/pagamentos'

type BookingMode = 'PAYMENT_REQUIRED' | 'PAYMENT_OPTIONAL' | 'BOOK_ONLY'

interface Initial {
  hasKey: boolean
  bookingMode: BookingMode
  incentivoAtivo: boolean
  descontoSinalPct: number
  descontoTotalPct: number
}

const MODES: { value: BookingMode; label: string; desc: string; needsKey: boolean }[] = [
  { value: 'PAYMENT_REQUIRED', label: 'Pagamento obrigatório', desc: 'Cliente paga sinal ou total para marcar.', needsKey: true },
  { value: 'PAYMENT_OPTIONAL', label: 'Pagamento opcional', desc: 'Cliente escolhe pagar adiantado ou só agendar.', needsKey: true },
  { value: 'BOOK_ONLY', label: 'Só agendar', desc: 'Sem cobrança. O cliente apenas marca o horário.', needsKey: false },
]

const clamp = (n: number) => Math.max(0, Math.min(90, Math.floor(n || 0)))

export function AgendamentoForm({ initial }: { initial: Initial }) {
  const [mode, setMode] = useState<BookingMode>(initial.hasKey ? initial.bookingMode : 'BOOK_ONLY')
  const [incentivo, setIncentivo] = useState(initial.incentivoAtivo)
  const [descTotal, setDescTotal] = useState(String(initial.descontoTotalPct))
  const [descSinal, setDescSinal] = useState(String(initial.descontoSinalPct))
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])

  const incentivoUsavel = initial.hasKey && mode !== 'BOOK_ONLY'

  function salvar() {
    setStatus(null)
    setWarnings([])
    startTransition(async () => {
      const r = await salvarConfigAgendamento({
        bookingMode: mode,
        incentivoAtivo: incentivo,
        descontoSinalPct: clamp(Number(descSinal)),
        descontoTotalPct: clamp(Number(descTotal)),
      })
      if ('error' in r) setStatus({ ok: false, msg: r.error })
      else {
        setStatus({ ok: true, msg: 'Configuração salva.' })
        setWarnings(r.warnings)
      }
    })
  }

  return (
    <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-1 flex items-center gap-2">
        <CalendarCog className="h-4 w-4 text-[#71717A]" />
        <span className="text-sm font-medium text-[#09090B]">Modo de agendamento</span>
      </div>
      <p className="mb-4 text-xs text-[#71717A]">Como o cliente fecha o horário no seu link.</p>

      {!initial.hasKey && (
        <p className="mb-4 rounded-lg bg-[#FAFAFA] px-3.5 py-2.5 text-xs leading-relaxed text-[#71717A]">
          Sem uma conta Asaas conectada, a barbearia funciona em &quot;Só agendar&quot;. Conecte uma
          conta acima para exigir ou oferecer pagamento.
        </p>
      )}

      <div className="space-y-2">
        {MODES.map((m) => {
          const disabled = m.needsKey && !initial.hasKey
          const active = mode === m.value
          return (
            <button
              key={m.value}
              type="button"
              disabled={disabled}
              onClick={() => setMode(m.value)}
              className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                active
                  ? 'border-[#18181B] bg-[#FAFAFA]'
                  : 'border-[#E4E4E7] hover:bg-[#FAFAFA]'
              } ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  active ? 'border-[#18181B]' : 'border-[#A1A1AA]'
                }`}
              >
                {active && <span className="h-2 w-2 rounded-full bg-[#18181B]" />}
              </span>
              <span>
                <span className="block text-sm font-medium text-[#09090B]">{m.label}</span>
                <span className="block text-xs text-[#71717A]">{m.desc}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Sistema de incentivo */}
      <div className="mt-6 border-t border-[#F4F4F5] pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-[#CA8A04]" />
            <span className="text-sm font-medium text-[#09090B]">Sistema de incentivo</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={incentivo}
            disabled={!incentivoUsavel}
            onClick={() => setIncentivo((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              incentivo && incentivoUsavel ? 'bg-[#18181B]' : 'bg-[#D4D4D8]'
            } ${!incentivoUsavel ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                incentivo && incentivoUsavel ? 'left-[1.375rem]' : 'left-0.5'
              }`}
            />
          </button>
        </div>
        <p className="mt-1 text-xs text-[#71717A]">
          Desconto pra quem paga adiantado. Aparece uma tag de % no botão do checkout. O desconto
          incide sobre o total.
        </p>

        {incentivo && incentivoUsavel && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-[#3F3F46]">Pagar total</span>
              <div className="flex items-center rounded-lg border border-[#E4E4E7] bg-white transition-colors focus-within:border-[#18181B]">
                <input
                  type="number"
                  min={0}
                  max={90}
                  value={descTotal}
                  onChange={(e) => setDescTotal(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg bg-transparent py-2.5 pl-3.5 pr-1 text-sm text-[#09090B] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="shrink-0 whitespace-nowrap pr-3 text-sm text-[#A1A1AA]">% off</span>
              </div>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-[#3F3F46]">Pagar sinal</span>
              <div className="flex items-center rounded-lg border border-[#E4E4E7] bg-white transition-colors focus-within:border-[#18181B]">
                <input
                  type="number"
                  min={0}
                  max={90}
                  value={descSinal}
                  onChange={(e) => setDescSinal(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg bg-transparent py-2.5 pl-3.5 pr-1 text-sm text-[#09090B] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="shrink-0 whitespace-nowrap pr-3 text-sm text-[#A1A1AA]">% off</span>
              </div>
            </label>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={salvar}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#27272A] disabled:opacity-50"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? 'Salvando' : 'Salvar'}
        </button>
        {status && (
          <span
            className={`flex items-center gap-1.5 text-sm ${
              status.ok ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {status.ok && <Check className="h-4 w-4" />}
            {status.msg}
          </span>
        )}
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 space-y-2 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3.5">
          {warnings.map((w, i) => (
            <p key={i} className="flex items-start gap-2 text-xs leading-relaxed text-[#92400E]">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {w}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
