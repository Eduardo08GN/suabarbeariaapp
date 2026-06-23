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
  let manifest = '/pro/manifest.webmanifest'
  if (session?.tenantId) {
    const t = await prisma.tenant.findUnique({
      where: { id: session.tenantId },
      select: { name: true, slug: true },
    })
    if (t) {
      title = `${t.name} · Equipe`
      // slug na URL do manifest -> per-tenant sem depender de cookie no fetch
      manifest = `/pro/manifest.webmanifest?t=${t.slug}`
    }
  }
  return {
    title,
    manifest,
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

  // valida pelo User (nao so pelo Barber): se o dono revogou o acesso, o User
  // some e o barbeiro cai fora na hora, mesmo com o JWT ainda valido (7 dias).
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      barberId: true,
      barber: { select: { name: true, nickname: true, tenant: { select: { name: true, logo: true } } } },
    },
  })
  if (!user || !user.barber || user.barberId !== session.barberId) redirect('/login')

  const firstName = (user.barber.nickname || user.barber.name).split(' ')[0]

  return (
    <div className="min-h-dvh bg-[#FAFAFA]">
      <NotificationSound />
      <ProHeader shopName={user.barber.tenant.name} barberName={firstName} logo={user.barber.tenant.logo} />
      <main className="mx-auto w-full max-w-lg px-4 py-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </main>
    </div>
  )
}
