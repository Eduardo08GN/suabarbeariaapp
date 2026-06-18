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
      logo: true,
      colorPrimary: true,
      colorAccent: true,
    },
  })

  if (!tenant) notFound()

  return (
    <WelcomeScreen
      slug={slug}
      name={tenant.name}
      description={null}
      logo={tenant.logo}
      colorPrimary={tenant.colorPrimary || '#18181B'}
    />
  )
}