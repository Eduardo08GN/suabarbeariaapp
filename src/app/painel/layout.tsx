import { headers } from 'next/headers'
import { prisma } from '@/lib/db'
import { PainelShell } from '@/components/painel/painel-shell'

// Server: resolve a logo do tenant (pelo x-tenant-id do middleware) e passa pro
// shell client. Assim o sidebar mostra a marca do dono sem flicker.
export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const tenantId = h.get('x-tenant-id') || ''
  const tenant = tenantId
    ? await prisma.tenant.findUnique({ where: { id: tenantId }, select: { logo: true } })
    : null

  return <PainelShell logo={tenant?.logo ?? null}>{children}</PainelShell>
}
