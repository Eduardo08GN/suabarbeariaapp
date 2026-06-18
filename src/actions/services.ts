'use server'

import { prisma } from '@/lib/db'

export async function getServices(tenantId: string) {
  if (!tenantId) throw new Error('tenantId is required')

  return prisma.service.findMany({
    where: { tenantId },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  })
}

export async function createService(
  tenantId: string,
  data: {
    name: string
    category: 'HAIR' | 'BEARD' | 'CHEMISTRY' | 'AESTHETICS' | 'COMBO' | 'TREATMENT'
    price: number
    durationMin: number
    description?: string
  }
) {
  if (!tenantId) throw new Error('tenantId is required')
  if (!data.name || data.name.trim().length === 0) throw new Error('Nome obrigatorio')
  if (data.price < 0) throw new Error('Preco deve ser positivo')
  if (data.durationMin < 5) throw new Error('Duracao minima: 5 minutos')

  return prisma.service.create({
    data: {
      tenantId,
      name: data.name.trim(),
      category: data.category,
      price: data.price,
      durationMin: data.durationMin,
      description: data.description?.trim() || null,
    },
  })
}

export async function updateService(
  serviceId: string,
  data: {
    name?: string
    category?: 'HAIR' | 'BEARD' | 'CHEMISTRY' | 'AESTHETICS' | 'COMBO' | 'TREATMENT'
    price?: number
    durationMin?: number
    description?: string
  }
) {
  if (!serviceId) throw new Error('serviceId is required')

  const updateData: Record<string, unknown> = {}
  if (data.name !== undefined) updateData.name = data.name.trim()
  if (data.category !== undefined) updateData.category = data.category
  if (data.price !== undefined) {
    if (data.price < 0) throw new Error('Preco deve ser positivo')
    updateData.price = data.price
  }
  if (data.durationMin !== undefined) {
    if (data.durationMin < 5) throw new Error('Duracao minima: 5 minutos')
    updateData.durationMin = data.durationMin
  }
  if (data.description !== undefined) updateData.description = data.description?.trim() || null

  return prisma.service.update({
    where: { id: serviceId },
    data: updateData,
  })
}

export async function toggleServiceActive(serviceId: string) {
  if (!serviceId) throw new Error('serviceId is required')

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { active: true },
  })
  if (!service) throw new Error('Servico nao encontrado')

  return prisma.service.update({
    where: { id: serviceId },
    data: { active: !service.active },
  })
}