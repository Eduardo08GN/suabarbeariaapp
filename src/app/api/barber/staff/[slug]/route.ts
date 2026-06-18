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

  const barbers = await prisma.barber.findMany({
    where: { tenantId: tenant.id, active: true },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      nickname: true,
      photoUrl: true,
    },
  })

  return NextResponse.json({ barbers })
}