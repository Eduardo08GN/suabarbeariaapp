import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parse, startOfDay, endOfDay, addMinutes } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tenantSlug, serviceId, barberId, date, time, clientName, clientPhone } = body

    if (!tenantSlug || !serviceId || !barberId || !date || !time || !clientName || !clientPhone) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
    }

    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } })
    if (!tenant) {
      return NextResponse.json({ error: 'Barbearia nao encontrada.' }, { status: 404 })
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { id: true, durationMin: true, price: true, name: true },
    })
    if (!service) {
      return NextResponse.json({ error: 'Servico nao encontrado.' }, { status: 404 })
    }

    const barber = await prisma.barber.findFirst({
      where: { id: barberId, tenantId: tenant.id, active: true },
      select: { id: true, name: true },
    })
    if (!barber) {
      return NextResponse.json({ error: 'Profissional nao encontrado.' }, { status: 404 })
    }

    // Build dateTime from date + time
    const [h, m] = time.split(':').map(Number)
    const dateObj = parse(date, 'yyyy-MM-dd', new Date())
    dateObj.setHours(h, m, 0, 0)

    // Check for double booking
    const bookingEnd = addMinutes(dateObj, service.durationMin)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barberId,
        dateTime: { gte: dateObj, lt: bookingEnd },
        status: { in: ['CONFIRMED', 'PENDING'] },
      },
    })

    if (existingBooking) {
      return NextResponse.json({ error: 'Este horario ja esta ocupado.' }, { status: 409 })
    }

    // Find or create client
    const phoneDigits = clientPhone.replace(/\D/g, '')
    let client = await prisma.client.findFirst({
      where: { phone: phoneDigits, tenantId: tenant.id },
    })

    if (!client) {
      client = await prisma.client.create({
        data: { name: clientName, phone: phoneDigits, tenantId: tenant.id },
      })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        tenantId: tenant.id,
        barberId: barber.id,
        clientId: client.id,
        serviceId: service.id,
        dateTime: dateObj,
        durationMin: service.durationMin,
        price: service.price,
        status: 'CONFIRMED',
      },
      select: {
        id: true,
        dateTime: true,
        status: true,
        service: { select: { name: true } },
        barber: { select: { name: true } },
      },
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}