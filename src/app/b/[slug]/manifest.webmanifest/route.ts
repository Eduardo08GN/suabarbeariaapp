import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Manifest white-label do app do CLIENTE: cada barbearia instala o SEU app
// (nome, icone e cor proprios), com start_url/scope no seu /b/[slug].
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { name: true, logo: true, colorPrimary: true },
  })
  if (!tenant) return new Response('Not found', { status: 404 })

  const theme = tenant.colorPrimary || '#18181B'
  // icone: logo da barbearia, com fallback no barber pole da plataforma
  const icons = tenant.logo
    ? [
        { src: tenant.logo, sizes: '192x192', type: 'image/png', purpose: 'any' as const },
        { src: tenant.logo, sizes: '512x512', type: 'image/png', purpose: 'any' as const },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' as const },
      ]
    : [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' as const },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' as const },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' as const },
      ]

  const manifest = {
    name: tenant.name,
    short_name: tenant.name.slice(0, 12),
    description: `Agende seu horario na ${tenant.name}`,
    start_url: `/b/${slug}`,
    scope: `/b/${slug}`,
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: theme,
    icons,
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
