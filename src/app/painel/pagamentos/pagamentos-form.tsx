'use client'

import { useState, useTransition, useEffect } from 'react'
import { CreditCard, Check, Loader2, Copy, Link2, Star } from 'lucide-react'
import { salvarConfigPagamento, salvarGoogleReview } from '@/actions/pagamentos'

interface InitialConfig {
  hasKey: boolean
  sandbox: boolean
  googleReviewUrl: string | null
  webhookToken: string | null
}

export function PagamentosForm({ initial }: { initial: InitialConfig }) {
  const [apiKey, setApiKey] = useState('')
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  const [reviewUrl, setReviewUrl] = useState(initial.googleReviewUrl ?? '')
  const [reviewPending, startReviewTransition] = useTransition()
  const [reviewStatus, setReviewStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  const [origin, setOrigin] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => setOrigin(window.location.origin), [])

  const webhookUrl =
    initial.webhookToken && origin
      ? `${origin}/api/webhooks/asaas/${initial.webhookToken}`
      : ''

  function salvar() {
    setStatus(null)
    startTransition(async () => {
      const r = await salvarConfigPagamento({ apiKey })
      if ('error' in r) setStatus({ ok: false, msg: r.error })
      else {
        setStatus({ ok: true, msg: 'Configuração salva.' })
        setApiKey('')
      }
    })
  }

  function salvarReview() {
    setReviewStatus(null)
    startReviewTransition(async () => {
      const r = await salvarGoogleReview({ url: reviewUrl })
      if ('error' in r) setReviewStatus({ ok: false, msg: r.error })
      else setReviewStatus({ ok: true, msg: 'Link salvo.' })
    })
  }

  async function copyWebhook() {
    try {
      await navigator.clipboard.writeText(webhookUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // navegador bloqueou; o dono seleciona manualmente
    }
  }

  return (
    <div className="mt-6 space-y-6">
      {/* Conexao Asaas */}
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mb-5 flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              initial.hasKey ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-medium text-[#09090B]">
            {initial.hasKey ? 'Conta conectada' : 'Conta não conectada'}
          </span>
        </div>

        <label htmlFor="asaas-key" className="block text-sm font-medium text-[#3F3F46]">
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
          A chave fica guardada de forma cifrada. Você a encontra no painel da Asaas, em
          Integrações.
        </p>

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

      {/* URL do webhook (so quando conectado) */}
      {webhookUrl && (
        <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="mb-2 flex items-center gap-2">
            <Link2 className="h-4 w-4 text-[#71717A]" />
            <span className="text-sm font-medium text-[#09090B]">URL de notificação</span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-[#71717A]">
            No painel da Asaas, em Integrações, Webhooks, cole esta URL para a confirmação do
            pagamento chegar na hora.
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2.5">
            <span className="flex-1 truncate font-mono text-xs text-[#3F3F46]">{webhookUrl}</span>
            <button
              onClick={copyWebhook}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-[#18181B]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>
      )}

      {/* Avaliacao no Google */}
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mb-2 flex items-center gap-2">
          <Star className="h-4 w-4 text-[#CA8A04]" />
          <span className="text-sm font-medium text-[#09090B]">Avaliação no Google</span>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-[#71717A]">
          Cole o link de avaliação do seu Perfil de Empresa no Google. Ao fim do agendamento, o
          cliente vê um QR code para avaliar.
        </p>
        <input
          type="url"
          value={reviewUrl}
          onChange={(e) => setReviewUrl(e.target.value)}
          placeholder="https://g.page/r/..."
          className="w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#09090B] outline-none transition-colors duration-150 placeholder:text-[#A1A1AA] focus:border-[#18181B]"
        />
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={salvarReview}
            disabled={reviewPending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#27272A] disabled:opacity-50"
          >
            {reviewPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {reviewPending ? 'Salvando' : 'Salvar'}
          </button>
          {reviewStatus && (
            <span
              className={`flex items-center gap-1.5 text-sm ${
                reviewStatus.ok ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {reviewStatus.ok && <Check className="h-4 w-4" />}
              {reviewStatus.msg}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
