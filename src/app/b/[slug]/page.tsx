export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { WelcomeScreen } from './welcome-screen'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BookingHome({ params }: PageProps) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      description: true,
      logoUrl: true,
      colorPrimary: true,
      colorAccent: true,
    },
  })

  if (!tenant) notFound()

  return (
    <WelcomeScreen
      slug={slug}
      name={tenant.name}
      description={tenant.description}
      logoUrl={tenant.logoUrl}
      colorPrimary={tenant.colorPrimary || '#18181B'}
    />
  )
}