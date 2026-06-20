export const dynamic = 'force-dynamic'

import { listProdutos } from '@/actions/produtos'
import { ProdutosClient } from './produtos-client'

export default async function ProdutosPage() {
  const produtos = await listProdutos()
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-lg font-semibold text-[#09090B]">Produtos</h1>
      <p className="mt-1 text-sm text-[#71717A]">
        Itens de balcao que aparecem como &quot;Aproveite tambem&quot; no checkout. So aparecem
        para o cliente quando ha uma conta de pagamento conectada.
      </p>
      <ProdutosClient initial={produtos} />
    </div>
  )
}
