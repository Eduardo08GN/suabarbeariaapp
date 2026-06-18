'use server'

import { prisma } from '@/lib/db'

export async function getBarbers(tenantId: string) {
  if (!tenantId) throw new Error('tenantId is required')

  return prisma.barber.findMany({
    where: { tenantId },
    orderBy: { name: 'asc' },
  })
}

export async function createBarber(
  tenantId: string,
  data: {
    name: string
    nickname?: string
    photoUrl?: string
    commissionPct?: number
  }
) {
  if (!tenantId) throw new Error('tenantId is required')
  if (!data.name || data.name.trim().length === 0) throw new Error('Nome obrigatorio')

  const commissionPct = data.commissionPct ?? 50
  if (commissionPct < 0 || commissionPct > 100) throw new Error('Comissao deve ser entre 0% e 100%')

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
  if (!barberId) throw new Error('barberId is required')

  const updateData: Record<string, unknown> = {}
  if (data.name !== undefined) updateData.name = data.name.trim()
  if (data.nickname !== undefined) updateData.nickname = data.nickname?.trim() || null
  if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl || null
  if (data.commissionPct !== undefined) {
    if (data.commissionPct < 0 || data.commissionPct > 100) throw new Error('Comissao deve ser entre 0% e 100%')
    updateData.commissionPct = data.commissionPct
  }

  return prisma.barber.update({
    where: { id: barberId },
    data: updateData,
  })
}

export async function toggleBarberActive(barberId: string) {
  if (!barberId) throw new Error('barberId is required')

  const barber = await prisma.barber.findUnique({
    where: { id: barberId },
    select: { active: true },
  })
  if (!barber) throw new Error('Barbeiro nao encontrado')

  return prisma.barber.update({
    where: { id: barberId },
    data: { active: !barber.active },
  })
}