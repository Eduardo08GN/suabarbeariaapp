export const dynamic = 'force-dynamic'

import { getConfigPagamento, getRecebimentos, getConfigAgendamento } from '@/actions/pagamentos'
import { PagamentosForm } from './pagamentos-form'
import { AgendamentoForm } from './agendamento-form'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Wallet } from 'lucide-react'

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

export default async function PagamentosPage() {
  const [initial, recebimentos, agendamento] = await Promise.all([
    getConfigPagamento(),
    getRecebimentos(),
    getConfigAgendamento(),
  ])

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-[#09090B]">Pagamentos</h1>
      <p className="mt-1 text-sm text-[#71717A]">
        Conecte sua conta Asaas para receber por PIX direto nos agendamentos.
      </p>

      <PagamentosForm initial={initial} />

      <AgendamentoForm initial={agendamento} />

      {/* Recebimentos */}
      <div className="mt-6 rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Wallet className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium text-[#09090B]">Recebimentos</span>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-[#09090B]">{brl(recebimentos.totalMonth)}</p>
            <p className="text-[11px] text-[#A1A1AA]">
              {recebimentos.countMonth} no mês
            </p>
          </div>
        </div>

        {recebimentos.items.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#A1A1AA]">
            Nenhum pagamento recebido ainda.
          </p>
        ) : (
          <ul className="divide-y divide-[#F4F4F5]">
            {recebimentos.items.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#09090B]">{r.clientName}</p>
                  <p className="truncate text-xs text-[#71717A]">
                    {r.serviceName}
                    {r.mode === 'SINAL' ? ' · sinal' : ''} ·{' '}
                    {format(new Date(r.paidAt), "dd 'de' MMM, HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-emerald-700">
                  {brl(r.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
