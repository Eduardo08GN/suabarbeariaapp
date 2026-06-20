'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { r2Delete, r2KeyFromUrl } from '@/lib/r2'

export interface ProdutoDTO {
  id: string
  name: string
  description: string | null
  price: number
  active: boolean
  imageUrl: string | null
}

export async function listProdutos(): Promise<ProdutoDTO[]> {
  const s = await getSession()
  if (!s?.tenantId) return []
  return prisma.product.findMany({
    where: { tenantId: s.tenantId },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: { id: true, name: true, description: true, price: true, active: true, imageUrl: true },
  })
}

export async function salvarProduto(input: {
  id?: string
  name: string
  price: number
  description?: string
  active?: boolean
  imageUrl?: string | null
}): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Não autorizado' }

  const name = input.name?.trim()
  if (!name) return { error: 'Informe o nome do produto.' }
  const price = Number(input.price)
  if (!(price > 0)) return { error: 'Informe um preço válido.' }

  // imageUrl e Server Action input (o dono controla 100%). So aceita objeto do
  // R2 na pasta DESTE tenant — fecha delete cross-tenant e URL externa
  // (beacon de tracking) no checkout publico. Confiar no .trim() seria furo.
  const prefix = `suabarbearia/produtos/${s.tenantId}/`
  let imageUrl: string | null = null
  const rawImg = input.imageUrl?.trim()
  if (rawImg) {
    const key = r2KeyFromUrl(rawImg)
    if (!key || !key.startsWith(prefix)) return { error: 'Imagem inválida.' }
    imageUrl = rawImg
  }

  const data = {
    name,
    price: Math.round(price * 100) / 100,
    description: input.description?.trim() || null,
    active: input.active ?? true,
    imageUrl,
  }

  if (input.id) {
    // pega a imagem antiga pra limpar o R2 se foi trocada/removida
    const old = await prisma.product.findFirst({
      where: { id: input.id, tenantId: s.tenantId },
      select: { imageUrl: true },
    })
    const r = await prisma.product.updateMany({
      where: { id: input.id, tenantId: s.tenantId },
      data,
    })
    if (r.count === 0) return { error: 'Produto não encontrado.' }
    if (old?.imageUrl && old.imageUrl !== imageUrl) {
      const oldKey = r2KeyFromUrl(old.imageUrl)
      if (oldKey && oldKey.startsWith(prefix)) await r2Delete(oldKey).catch(() => {})
    }
  } else {
    await prisma.product.create({ data: { ...data, tenantId: s.tenantId } })
  }

  revalidatePath('/painel/produtos')
  return { success: true }
}

export async function toggleProduto(id: string): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Não autorizado' }
  const p = await prisma.product.findFirst({
    where: { id, tenantId: s.tenantId },
    select: { active: true },
  })
  if (!p) return { error: 'Produto não encontrado.' }
  await prisma.product.updateMany({
    where: { id, tenantId: s.tenantId },
    data: { active: !p.active },
  })
  revalidatePath('/painel/produtos')
  return { success: true }
}

export async function deletarProduto(id: string): Promise<{ success: true } | { error: string }> {
  const s = await getSession()
  if (!s?.tenantId) return { error: 'Não autorizado' }
  // BookingItem.productId vira null (snapshot de nome/preco preservado), entao
  // apagar um produto nao apaga o historico do que ja foi vendido.
  const p = await prisma.product.findFirst({
    where: { id, tenantId: s.tenantId },
    select: { imageUrl: true },
  })
  await prisma.product.deleteMany({ where: { id, tenantId: s.tenantId } })
  // limpa a imagem no R2 — so apaga key DENTRO da pasta deste tenant
  if (p?.imageUrl) {
    const key = r2KeyFromUrl(p.imageUrl)
    if (key && key.startsWith(`suabarbearia/produtos/${s.tenantId}/`)) {
      await r2Delete(key).catch(() => {})
    }
  }
  revalidatePath('/painel/produtos')
  return { success: true }
}
