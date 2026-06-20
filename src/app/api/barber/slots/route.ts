import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAvailableSlots } from '@/lib/slots'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const barberId = searchParams.get('barberId')
  const serviceId = searchParams.get('serviceId')
  const date = searchParams.get('date')
  const tenantSlug = searchParams.get('tenantSlug')

  if (!barberId || !serviceId || !date || !tenantSlug) {
    return NextResponse.json(
      { error: 'Parâmetros obrigatórios: barberId, serviceId, date, tenantSlug' },
      { status: 400 }
    )
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Formato de data inválido. Use YYYY-MM-DD' },
      { status: 400 }
    )
  }

  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    select: { id: true },
  })

  if (!tenant) {
    return NextResponse.json(
      { error: 'Barbearia não encontrada' },
      { status: 404 }
    )
  }

  const slots = await getAvailableSlots({
    barberId,
    serviceId,
    date,
    tenantId: tenant.id,
  })

  return NextResponse.json({ slots })
}