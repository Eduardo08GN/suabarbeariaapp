'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export interface ProdutoDTO {
  id: string
  name: string
  description: string | null
  price: number
  active: boolean
}

export async function listProdutos(): Promise<ProdutoDTO[]> {
  const s = await getSession()
  if (!s?.tenantId) return []
  return prisma.product.findMany({
    where: { tenantId: s.tenantId },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: { id: true, name: true, description: true, price: true, active: true },
  })
}

export async function salvarProduto(input: {
  id?: string
  name: string
  price: number
  description?: string
  active?: boolean
}): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Nao autorizado' }

  const name = input.name?.trim()
  if (!name) return { error: 'Informe o nome do produto.' }
  const price = Number(input.price)
  if (!(price > 0)) return { error: 'Informe um preco valido.' }

  const data = {
    name,
    price: Math.round(price * 100) / 100,
    description: input.description?.trim() || null,
    active: input.active ?? true,
  }

  if (input.id) {
    // escopa ao tenant: so atualiza se o produto for dele
    const r = await prisma.product.updateMany({
      where: { id: input.id, tenantId: s.tenantId },
      data,
    })
    if (r.count === 0) return { error: 'Produto nao encontrado.' }
  } else {
    await prisma.product.create({ data: { ...data, tenantId: s.tenantId } })
  }

  revalidatePath('/painel/produtos')
  return { success: true }
}

export async function toggleProduto(id: string): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Nao autorizado' }
  const p = await prisma.product.findFirst({
    where: { id, tenantId: s.tenantId },
    select: { active: true },
  })
  if (!p) return { error: 'Produto nao encontrado.' }
  await prisma.product.updateMany({
    where: { id, tenantId: s.tenantId },
    data: { active: !p.active },
  })
  revalidatePath('/painel/produtos')
  return { success: true }
}

export async function deletarProduto(id: string): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Nao autorizado' }
  // BookingItem.productId vira null (snapshot de nome/preco preservado), entao
  // apagar um produto nao apaga o historico do que ja foi vendido.
  await prisma.product.deleteMany({ where: { id, tenantId: s.tenantId } })
  revalidatePath('/painel/produtos')
  return { success: true }
}
