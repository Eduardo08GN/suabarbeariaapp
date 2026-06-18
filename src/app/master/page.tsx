export const dynamic = 'force-dynamic'

import { getAllTenants } from '@/actions/tenants'
import { MasterClient } from './master-client'

export default async function MasterPage() {
  const tenants = await getAllTenants()

  const tenantsData = tenants.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    status: t.status,
    bookingsCount: t._count.bookings,
    clientsCount: t._count.clients,
    barbersCount: t._count.barbers,
  }))

  return <MasterClient tenants={tenantsData} />
}