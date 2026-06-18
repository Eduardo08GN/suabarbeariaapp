export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { BarberSelectionClient } from './barber-selection-client'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ serviceId?: string }>
}

export default async function BarbeiroPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { serviceId } = await searchParams

  if (!serviceId) notFound()

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true },
  })

  if (!tenant) notFound()

  const barbers = await prisma.barber.findMany({
    where: { tenantId: tenant.id, active: true },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      nickname: true,
      photoUrl: true,
    },
  })

  return (
    <BarberSelectionClient
      slug={slug}
      serviceId={serviceId}
      barbers={barbers}
    />
  )
}