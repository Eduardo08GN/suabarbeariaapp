'use server'

import { prisma } from '@/lib/db'

export async function getAllTenants() {
  return prisma.tenant.findMany({
    include: {
      _count: {
        select: {
          bookings: true,
          clients: true,
          barbers: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createTenant(data: {
  name: string
  slug: string
  phone?: string
  email?: string
}) {
  if (!data.name || data.name.trim().length === 0) throw new Error('Nome obrigatorio')
  if (!data.slug || data.slug.trim().length === 0) throw new Error('Slug obrigatorio')

  const slugClean = data.slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')

  const existing = await prisma.tenant.findUnique({ where: { slug: slugClean } })
  if (existing) throw new Error('Slug ja esta em uso')

  return prisma.tenant.create({
    data: {
      name: data.name.trim(),
      slug: slugClean,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
    },
  })
}