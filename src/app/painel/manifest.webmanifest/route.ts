import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Manifest do painel do DONO, branded com a barbearia dele e com um `id` UNICO
// por tenant. E o id que faz o navegador instalar um app SEPARADO por barbearia
// (a barbearia de Belem e a do RS viram apps distintos, nao um app compartilhado).
export async function GET() {
  const session = await getSession()

  let name = 'SuaBarbeariaApp'
  let short = 'SuaBarbearia'
  let theme = '#18181B'
  let logo: string | null = null
  let slug: string | null = null

  if (session?.tenantId) {
    const t = await prisma.tenant.findUnique({
      where: { id: session.tenantId },
      select: { name: true, colorPrimary: true, logo: true, slug: true },
    })
    if (t) {
      name = t.name
      short = t.name.slice(0, 12)
      theme = t.colorPrimary || theme
      logo = t.logo
      slug = t.slug
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
    // id UNICO por barbearia: cada dono instala o SEU app, separado dos outros
    id: slug ? `/painel/${slug}` : '/painel',
    name,
    short_name: short,
    description: `Gestão da ${name}`,
    start_url: '/painel',
    scope: '/painel',
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
