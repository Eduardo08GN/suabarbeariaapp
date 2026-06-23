'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

// Marca da barbearia. O dono (TENANT) — ou a agencia (MASTER) — edita a logo da
// PROPRIA barbearia. O tenantId vem SEMPRE da sessao, nunca de um id do client,
// pra um dono nao conseguir trocar a marca de outro.
export async function salvarLogoBarbearia(logo: string | null) {
  const session = await getSession()
  if (!session?.tenantId || !['MASTER', 'TENANT'].includes(session.role)) {
    throw new Error('Não autorizado')
  }
  await prisma.tenant.update({
    where: { id: session.tenantId },
    data: { logo: logo || null },
  })
  revalidatePath('/painel')
  return { ok: true }
}
