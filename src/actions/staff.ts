'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// O tenant SEMPRE vem da sessao, nunca de um id mandado pelo client. Num
// white-label vendido pra varios donos, confiar no client deixaria um dono
// mexer na equipe de outro. Aqui isso fica impossivel.
async function requireTenantId(): Promise<string> {
  const session = await getSession()
  if (!session?.tenantId) throw new Error('Não autorizado')
  return session.tenantId
}

// Confirma que o barbeiro pertence ao tenant da sessao antes de qualquer
// mutacao (edicao, ativacao, acesso). Retorna o nome pra reaproveitar.
async function requireOwnedBarber(barberId: string): Promise<{ tenantId: string; name: string }> {
  const tenantId = await requireTenantId()
  const barber = await prisma.barber.findFirst({
    where: { id: barberId, tenantId },
    select: { name: true },
  })
  if (!barber) throw new Error('Barbeiro não encontrado')
  return { tenantId, name: barber.name }
}

export async function getBarbers() {
  const tenantId = await requireTenantId()
  return prisma.barber.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' },
    include: { user: { select: { id: true, email: true } } },
  })
}

export async function createBarber(data: {
  name: string
  nickname?: string
  photoUrl?: string
  commissionPct?: number
}) {
  const tenantId = await requireTenantId()
  if (!data.name || data.name.trim().length === 0) throw new Error('Nome obrigatório')

  const commissionPct = data.commissionPct ?? 50
  if (commissionPct < 0 || commissionPct > 100) throw new Error('Comissão deve ser entre 0% e 100%')

  return prisma.barber.create({
    data: {
      tenantId,
      name: data.name.trim(),
      nickname: data.nickname?.trim() || null,
      photoUrl: data.photoUrl || null,
      commissionPct,
    },
  })
}

export async function updateBarber(
  barberId: string,
  data: {
    name?: string
    nickname?: string
    photoUrl?: string
    commissionPct?: number
  }
) {
  await requireOwnedBarber(barberId)

  const updateData: Record<string, unknown> = {}
  if (data.name !== undefined) updateData.name = data.name.trim()
  if (data.nickname !== undefined) updateData.nickname = data.nickname?.trim() || null
  if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl || null
  if (data.commissionPct !== undefined) {
    if (data.commissionPct < 0 || data.commissionPct > 100)
      throw new Error('Comissão deve ser entre 0% e 100%')
    updateData.commissionPct = data.commissionPct
  }

  return prisma.barber.update({
    where: { id: barberId },
    data: updateData,
  })
}

export async function toggleBarberActive(barberId: string) {
  await requireOwnedBarber(barberId)

  const barber = await prisma.barber.findUnique({
    where: { id: barberId },
    select: { active: true },
  })
  if (!barber) throw new Error('Barbeiro não encontrado')

  return prisma.barber.update({
    where: { id: barberId },
    data: { active: !barber.active },
  })
}

// Cria (ou atualiza) o login do profissional: um User role BARBER preso 1:1 ao
// Barber, no mesmo tenant. E o que liga a agenda do barbeiro ao app /pro.
export async function criarAcessoBarbeiro(
  barberId: string,
  data: { email: string; password: string }
) {
  const { tenantId, name } = await requireOwnedBarber(barberId)

  const email = data.email.trim().toLowerCase()
  if (!email.includes('@') || email.length < 5) throw new Error('E-mail inválido')
  if (!data.password || data.password.length < 6)
    throw new Error('A senha precisa de pelo menos 6 caracteres')

  const password = await bcrypt.hash(data.password, 10)

  const existing = await prisma.user.findUnique({ where: { barberId }, select: { id: true } })

  // o e-mail nao pode estar em uso por outra conta (a propria conta do
  // barbeiro pode reaproveitar o mesmo e-mail num reset)
  const emailOwner = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  if (emailOwner && emailOwner.id !== existing?.id) throw new Error('Este e-mail já está em uso')

  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { email, password } })
  } else {
    await prisma.user.create({
      data: { email, password, name, role: 'BARBER', tenantId, barberId },
    })
  }
  return { ok: true }
}

// Revoga o acesso: apaga o User BARBER (e as inscricoes de push dele). O Barber
// continua existindo na equipe, so perde o login do app.
export async function removerAcessoBarbeiro(barberId: string) {
  await requireOwnedBarber(barberId)

  const existing = await prisma.user.findUnique({ where: { barberId }, select: { id: true } })
  if (existing) {
    await prisma.pushSubscription.deleteMany({ where: { userId: existing.id } })
    await prisma.user.delete({ where: { id: existing.id } })
  }
  return { ok: true }
}
