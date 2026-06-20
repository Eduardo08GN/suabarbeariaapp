import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Manifest do app do PROFISSIONAL, branded com a barbearia do barbeiro logado
// (depende da sessao, por isso force-dynamic e Cache-Control private).
export async function GET() {
  const session = await getSession()

  let name = 'Equipe · SuaBarbeariaApp'
  let theme = '#18181B'
  let logo: string | null = null

  if (session?.tenantId) {
    const t = await prisma.tenant.findUnique({
      where: { id: session.tenantId },
      select: { name: true, colorPrimary: true, logo: true },
    })
    if (t) {
      name = `${t.name} · Equipe`
      theme = t.colorPrimary || theme
      logo = t.logo
    }
  }

  const icons = logo
    ? [
        { src: logo, sizes: '192x192', type: 'image/png', purpose: 'any' as const },
        { src: logo, sizes: '512x512', type: 'image/png', purpose: 'any' as const },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' as const },
      ]
    : [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' as const },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' as const },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' as const },
      ]

  const manifest = {
    name,
    short_name: 'Equipe',
    description: 'Sua agenda do dia e aviso na hora de cada novo agendamento.',
    start_url: '/pro',
    scope: '/pro',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: theme,
    icons,
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      // depende da sessao (branding por tenant); nao guardar em cache compartilhado
      'Cache-Control': 'private, no-store',
    },
  })
}
