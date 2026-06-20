'use client'

import { useState, useTransition } from 'react'
import { CreditCard, Check, Loader2 } from 'lucide-react'
import { salvarConfigPagamento } from '@/actions/pagamentos'

export function PagamentosForm({
  initial,
}: {
  initial: { hasKey: boolean; sandbox: boolean }
}) {
  const [apiKey, setApiKey] = useState('')
  const [sandbox, setSandbox] = useState(initial.sandbox)
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  function salvar() {
    setStatus(null)
    startTransition(async () => {
      const r = await salvarConfigPagamento({ apiKey, sandbox })
      if ('error' in r) {
        setStatus({ ok: false, msg: r.error })
      } else {
        setStatus({ ok: true, msg: 'Configuracao salva.' })
        setApiKey('')
      }
    })
  }

  return (
    <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            initial.hasKey
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-zinc-100 text-zinc-500'
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-medium text-[#09090B]">
          {initial.hasKey ? 'Conta conectada' : 'Conta nao conectada'}
        </span>
      </div>

      <label
        htmlFor="asaas-key"
        className="block text-sm font-medium text-[#3F3F46]"
      >
        Chave de API da Asaas
      </label>
      <input
        id="asaas-key"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder={
          initial.hasKey
            ? 'Chave configurada. Cole uma nova para trocar.'
            : 'Cole a chave de API da sua conta Asaas'
        }
        className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#09090B] outline-none transition-colors duration-150 placeholder:text-[#A1A1AA] focus:border-[#18181B]"
      />
      <p className="mt-1.5 text-xs text-[#A1A1AA]">
        A chave fica guardada de forma cifrada. Voce a encontra no painel da
        Asaas, em Integracoes.
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span>
          <span className="block text-sm font-medium text-[#3F3F46]">
            Modo de teste
          </span>
          <span className="block text-xs text-[#A1A1AA]">
            Use uma chave de sandbox para testar sem cobrar de verdade.
          </span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={sandbox}
          onClick={() => setSandbox(!sandbox)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
            sandbox ? 'bg-[#18181B]' : 'bg-[#D4D4D8]'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              sandbox ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <p className="mt-4 rounded-lg bg-[#FAFAFA] px-3.5 py-2.5 text-xs leading-relaxed text-[#71717A]">
        A plataforma retem uma taxa de 2 por cento sobre cada pagamento recebido.
      </p>

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
    </div>
  )
}
