export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { ServiceCatalogClient } from './service-catalog-client'

interface PageProps {
  params: Promise<{ slug: string }>
}

const categoryLabels: Record<string, string> = {
  HAIR: 'Cabelo',
  BEARD: 'Barba',
  CHEMISTRY: 'Quimica',
  AESTHETICS: 'Estetica',
  COMBO: 'Combos',
  TREATMENT: 'Tratamentos',
}

const categoryOrder = ['HAIR', 'BEARD', 'COMBO', 'CHEMISTRY', 'AESTHETICS', 'TREATMENT']

export default async function ServicosPage({ params }: PageProps) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true },
  })

  if (!tenant) notFound()

  const services = await prisma.service.findMany({
    where: { tenantId: tenant.id, active: true },
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      durationMinutes: true,
      category: true,
    },
  })

  // Group by category
  const grouped: Record<string, typeof services> = {}
  for (const service of services) {
    const cat = service.category || 'HAIR'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(service)
  }

  // Sort categories
  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  )

  const sections = sortedCategories.map((cat) => ({
    category: cat,
    label: categoryLabels[cat] || cat,
    services: grouped[cat].map((s) => ({
      ...s,
      price: Number(s.price),
    })),
  }))

  return <ServiceCatalogClient slug={slug} sections={sections} />
}