export const dynamic = 'force-dynamic'

import { getConfigPagamento } from '@/actions/pagamentos'
import { PagamentosForm } from './pagamentos-form'

export default async function PagamentosPage() {
  const initial = await getConfigPagamento()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-[#09090B]">Pagamentos</h1>
      <p className="mt-1 text-sm text-[#71717A]">
        Conecte sua conta Asaas para receber por PIX direto nos agendamentos.
      </p>
      <PagamentosForm initial={initial} />
    </div>
  )
}
