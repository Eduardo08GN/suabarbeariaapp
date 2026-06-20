export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from 'next'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NotificationSound } from '@/components/painel/notification-sound'
import { ProHeader } from '@/components/pro/pro-header'

// Superficie do PROFISSIONAL (white-label). PWA proprio, escopo /pro, so role
// BARBER entra (o middleware ja barra, isso aqui e a guarda de fundo).
export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession()
  let title = 'Equipe · SuaBarbeariaApp'
  if (session?.tenantId) {
    const t = await prisma.tenant.findUnique({
      where: { id: session.tenantId },
      select: { name: true },
    })
    if (t) title = `${t.name} · Equipe`
  }
  return {
    title,
    manifest: '/pro/manifest.webmanifest',
    appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Equipe' },
    other: { 'mobile-web-app-capable': 'yes' },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#18181B',
}

export default async function ProLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session || session.role !== 'BARBER' || !session.barberId) {
    redirect('/login')
  }

  const barber = await prisma.barber.findUnique({
    where: { id: session.barberId },
    select: { name: true, nickname: true, tenant: { select: { name: true } } },
  })
  if (!barber) redirect('/login')

  const firstName = (barber.nickname || barber.name).split(' ')[0]

  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      <NotificationSound />
      <ProHeader shopName={barber.tenant.name} barberName={firstName} />
      <main className="mx-auto w-full max-w-lg px-4 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </main>
    </div>
  )
}
