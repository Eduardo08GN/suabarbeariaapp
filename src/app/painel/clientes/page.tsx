export const dynamic = 'force-dynamic'

import { headers } from 'next/headers'
import { prisma } from '@/lib/db'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatPhone } from '@/lib/utils'
import { ClientesClient } from './clientes-client'

async function getTenantId() {
  const h = await headers()
  return h.get('x-tenant-id') || ''
}

export default async function ClientesPage() {
  const tenantId = await getTenantId()

  if (!tenantId) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#71717A] text-sm">Tenant nao identificado.</p>
      </div>
    )
  }

  const clients = await prisma.client.findMany({
    where: { tenantId },
    orderBy: { lastVisit: { sort: 'desc', nulls: 'last' } },
  })

  const clientsData = clients.map((c) => ({
    id: c.id,
    name: c.name,
    phone: formatPhone(c.phone),
    totalVisits: c.totalVisits,
    lastVisit: c.lastVisit
      ? format(new Date(c.lastVisit), "dd/MM/yyyy", { locale: ptBR })
      : 'Nunca',
  }))

  return <ClientesClient clients={clientsData} />
}