import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { prisma } from '@/lib/db'
import { PainelShell } from '@/components/painel/painel-shell'

async function getTenant() {
  const h = await headers()
  const tenantId = h.get('x-tenant-id') || ''
  if (!tenantId) return null
  return prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { slug: true, name: true, logo: true },
  })
}

// manifest dinamico por tenant (id unico por barbearia). O slug vai na URL do
// manifest (?t=slug) pra ser per-tenant SEM depender de cookie no fetch do
// manifest — igual o app do cliente ja faz pelo /b/[slug]. Cada dono instala o
// app DELE, separado dos outros (Belem != RS).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTenant()
  const manifest = t ? `/painel/manifest.webmanifest?t=${t.slug}` : '/painel/manifest.webmanifest'
  const title = t?.name || 'SuaBarbeariaApp'
  return {
    title,
    manifest,
    appleWebApp: { capable: true, statusBarStyle: 'default', title },
  }
}

// Server: resolve a logo do tenant (pelo x-tenant-id do middleware) e passa pro
// shell client. Assim o sidebar mostra a marca do dono sem flicker.
export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const t = await getTenant()
  return <PainelShell logo={t?.logo ?? null}>{children}</PainelShell>
}
