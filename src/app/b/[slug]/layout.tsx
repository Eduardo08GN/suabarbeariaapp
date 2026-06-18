import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { BookingSteps } from '@/components/booking/BookingSteps'
import { Scissors } from 'lucide-react'

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
      logoUrl: true,
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
      <header className="sticky top-0 z-50 bg-[--bg-card] border-b border-[--border] backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto w-full">
          {tenant.logoUrl ? (
            <img
              src={tenant.logoUrl}
              alt={tenant.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[--tenant-primary] flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
          )}
          <h1 className="font-bold text-[--text] text-base truncate">
            {tenant.name}
          </h1>
        </div>
      </header>

      {/* Steps indicator */}
      <BookingSteps />

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full">
        {children}
      </main>
    </div>
  )
}