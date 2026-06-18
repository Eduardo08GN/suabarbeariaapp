import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: { id: true },
  })

  if (!tenant) {
    return NextResponse.json({ error: 'Barbearia nao encontrada' }, { status: 404 })
  }

  const services = await prisma.service.findMany({
    where: { tenantId: tenant.id, active: true },
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      durationMin: true,
      category: true,
    },
  })

  return NextResponse.json({ services })
}