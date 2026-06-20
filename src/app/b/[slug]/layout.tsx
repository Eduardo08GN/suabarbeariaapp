import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { BookingSteps } from '@/components/booking/BookingSteps'

interface TenantLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function TenantLayout({
  children,
  params,
}: TenantLayoutProps) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      colorPrimary: true,
      colorAccent: true,
    },
  })

  if (!tenant) notFound()

  const primaryColor = tenant.colorPrimary || '#18181B'
  const accentColor = tenant.colorAccent || '#18181B'

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        '--tenant-primary': primaryColor,
        '--tenant-accent': accentColor,
      } as React.CSSProperties}
    >
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-(--bg-card) border-b border-(--border) backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto w-full">
          <img
            src={tenant.logo || '/logo_barbearia.webp'}
            alt={tenant.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <h1 className="font-bold text-(--text) text-base truncate">
            {tenant.name}
          </h1>
        </div>
      </header>

      {/* Steps indicator */}
      <Suspense
        fallback={
          <div className="h-[3.6rem] border-b border-(--border) bg-(--bg-card)" />
        }
      >
        <BookingSteps />
      </Suspense>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full">
        {children}
      </main>
    </div>
  )
}