import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      colorPrimary: true,
      colorAccent: true,
      phone: true,
      address: true,
      openingHours: true,
      asaasApiKey: true,
      googleReviewUrl: true,
      bookingMode: true,
      incentivoAtivo: true,
      descontoSinalPct: true,
      descontoTotalPct: true,
    },
  })

  if (!tenant) {
    return NextResponse.json({ error: 'Barbearia nao encontrada.' }, { status: 404 })
  }

  // a chave nunca vaza pro cliente: expoe so o booleano de pagamento ativo.
  // sem Asaas, a politica efetiva e sempre "so agendar".
  const { asaasApiKey, bookingMode, ...rest } = tenant
  const paymentEnabled = !!asaasApiKey
  return NextResponse.json({
    ...rest,
    paymentEnabled,
    bookingMode: paymentEnabled ? bookingMode : 'BOOK_ONLY',
  })
}