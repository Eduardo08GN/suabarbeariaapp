import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { addMinutes } from 'date-fns'
import { decrypt } from '@/lib/encryption'
import {
  getOrCreateCustomer,
  createPixPayment,
  getPixQrCode,
  cancelPayment,
  type AsaasCtx,
} from '@/lib/asaas'
import { expireBooking } from '@/lib/payments'
import { computeOrder } from '@/lib/pricing'
import { getAvailableSlots, instantFromLocal } from '@/lib/slots'
import { rateLimit, clientIp } from '@/lib/rate-limit'
import { ASAAS_PIX_MIN } from '@/lib/payment-constants'

const PIX_WINDOW_MIN = 30 // janela pra pagar o PIX antes do horario ser liberado
const MAX_ACTIVE_PER_CLIENT = 5 // teto de agendamentos futuros ativos por cliente
const MAX_BOOKING_MIN = 240 // recuo da janela ao checar overlap (cobre o maior servico)
const BUSY = ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] as const

export async function POST(request: NextRequest) {
  try {
    // freio de abuso por IP (DoS de slots num endpoint publico)
    if (!rateLimit(`checkout:${clientIp(request)}`, 12, 60_000)) {
      return NextResponse.json({ error: 'Muitas tentativas. Aguarde um instante.' }, { status: 429 })
    }

    const body = await request.json()
    const {
      tenantSlug, serviceId, barberId, date, time,
      clientName, clientPhone, clientEmail, clientCpf, paymentMode,
    } = body

    if (!tenantSlug || !serviceId || !barberId || !date || !time || !clientName || !clientPhone) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
    }
    const timeNorm = String(time).slice(0, 5)
    // valida o formato igual a rota de slots (evita rollover de data tipo 2026-13-40)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date)) || !/^\d{2}:\d{2}$/.test(timeNorm)) {
      return NextResponse.json({ error: 'Data ou horario invalidos.' }, { status: 400 })
    }

    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } })
    if (!tenant) return NextResponse.json({ error: 'Barbearia nao encontrada.' }, { status: 404 })

    const service = await prisma.service.findFirst({
      where: { id: serviceId, tenantId: tenant.id, active: true },
      select: { id: true, durationMin: true, price: true, name: true },
    })
    if (!service) return NextResponse.json({ error: 'Servico nao encontrado.' }, { status: 404 })

    const barber = await prisma.barber.findFirst({
      where: { id: barberId, tenantId: tenant.id, active: true },
      select: { id: true, name: true },
    })
    if (!barber) return NextResponse.json({ error: 'Profissional nao encontrado.' }, { status: 404 })

    // instante no fuso do tenant — coerente com o motor de slots (project_fuso_horario_utc)
    const tz = tenant.timezone || 'America/Sao_Paulo'
    const dateObj = instantFromLocal(date, timeNorm, tz)
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: 'Data ou horario invalidos.' }, { status: 400 })
    }

    const phoneDigits = String(clientPhone).replace(/\D/g, '')
    const cpfDigits = String(clientCpf || '').replace(/\D/g, '')
    const hasAsaas = !!tenant.asaasApiKey

    // modo pedido vs politica da barbearia. Sem Asaas a barbearia e sempre
    // "so agendar", entao qualquer pedido de pagamento e recusado.
    const reqMode: 'SINAL' | 'TOTAL' | 'NONE' =
      paymentMode === 'SINAL' ? 'SINAL' : paymentMode === 'TOTAL' ? 'TOTAL' : 'NONE'
    const policy = hasAsaas ? tenant.bookingMode : 'BOOK_ONLY'

    if (reqMode === 'NONE') {
      if (policy === 'PAYMENT_REQUIRED') {
        return NextResponse.json({ error: 'Esta barbearia exige pagamento para agendar.' }, { status: 400 })
      }
    } else if (!hasAsaas || policy === 'BOOK_ONLY') {
      return NextResponse.json({ error: 'Pagamento indisponivel para esta barbearia.' }, { status: 400 })
    }

    // produtos (order bump). So existem quando ha Asaas pra cobrar; valida cada
    // um (ativo, do tenant) — nunca confiar no preco que veio do front.
    const rawProductIds: string[] = Array.isArray(body.productIds)
      ? body.productIds.filter((x: unknown) => typeof x === 'string').slice(0, 20)
      : []
    let products: { id: string; name: string; price: number }[] = []
    if (hasAsaas && rawProductIds.length) {
      products = await prisma.product.findMany({
        where: { id: { in: rawProductIds }, tenantId: tenant.id, active: true, isOrderBump: true },
        select: { id: true, name: true, price: true },
      })
    }
    const productsTotal = products.reduce((sum, p) => sum + p.price, 0)

    // pedido completo (servico + produtos). value = o que vai pro PIX.
    const order = computeOrder({
      servicePrice: service.price,
      mode: reqMode,
      incentivo: {
        incentivoAtivo: tenant.incentivoAtivo,
        descontoSinalPct: tenant.descontoSinalPct,
        descontoTotalPct: tenant.descontoTotalPct,
      },
      productsTotal,
    })
    const value = order.pixValue
    const willCharge = value > 0 // paga via PIX (servico e/ou produtos)

    if (willCharge) {
      if (cpfDigits.length !== 11) {
        return NextResponse.json({ error: 'Informe um CPF valido para o pagamento.' }, { status: 400 })
      }
      if (value < ASAAS_PIX_MIN) {
        return NextResponse.json(
          { error: `O valor minimo para pagamento via PIX e R$ ${ASAAS_PIX_MIN},00.` },
          { status: 400 }
        )
      }
    }

    // cliente da barbearia (upsert por telefone)
    let client = await prisma.client.findUnique({
      where: { tenantId_phone: { tenantId: tenant.id, phone: phoneDigits } },
    })
    if (!client) {
      client = await prisma.client.create({
        data: { name: clientName, phone: phoneDigits, email: clientEmail || null, tenantId: tenant.id },
      })
    } else if (clientEmail && !client.email) {
      await prisma.client.update({ where: { id: client.id }, data: { email: clientEmail } })
    }

    // teto de agendamentos futuros ativos por cliente (anti-spam por telefone)
    const activeCount = await prisma.booking.count({
      where: {
        tenantId: tenant.id,
        clientId: client.id,
        status: { in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] },
        dateTime: { gte: new Date() },
      },
    })
    if (activeCount >= MAX_ACTIVE_PER_CLIENT) {
      return NextResponse.json(
        { error: 'Voce ja tem varios agendamentos ativos. Conclua ou cancele antes de marcar outro.' },
        { status: 429 }
      )
    }

    // ---- gate de disponibilidade (fora da transacao) ----
    // Reusa o MESMO motor do front: valida jornada, indisponibilidade, lead time,
    // passado E overlap de bookings — identico ao que o cliente viu. Otimista.
    const slots = await getAvailableSlots({
      barberId,
      serviceId: service.id,
      date,
      tenantId: tenant.id,
    })
    if (!slots.find((s) => s.time === timeNorm)?.available) {
      return NextResponse.json(
        { error: 'Este horario nao esta mais disponivel. Escolha outro.' },
        { status: 409 }
      )
    }

    // ---- reserva atomica do horario ----
    // Lock POR BARBEIRO serializa as reservas dele; dentro do lock, uma checagem
    // BARATA de overlap de bookings (via tx, intervalo real) fecha a corrida sem
    // rodar o motor inteiro sob o lock (evita prender 2 conexoes por checkout).
    const newStart = dateObj.getTime()
    const newEnd = newStart + service.durationMin * 60_000
    let booking: { id: string }
    try {
      booking = await prisma.$transaction(async (tx) => {
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${barberId}), hashtext(${tenant.id}))`

        const existing = await tx.booking.findMany({
          where: {
            barberId,
            status: { in: [...BUSY] },
            dateTime: { gte: new Date(newStart - MAX_BOOKING_MIN * 60_000), lt: new Date(newEnd) },
          },
          select: { dateTime: true, durationMin: true },
        })
        const overlap = existing.some((e) => {
          const es = e.dateTime.getTime()
          return es < newEnd && es + e.durationMin * 60_000 > newStart
        })
        if (overlap) throw new Error('SLOT_TAKEN')

        const created = await tx.booking.create({
          data: {
            tenantId: tenant.id,
            barberId: barber.id,
            clientId: client!.id,
            serviceId: service.id,
            dateTime: dateObj,
            durationMin: service.durationMin,
            price: service.price,
            status: willCharge ? 'PENDING' : 'CONFIRMED',
            paymentStatus: willCharge ? 'PENDING' : 'NONE',
            // paymentMode descreve o pagamento do SERVICO (sinal/total); produto
            // sozinho na rota gratis fica com mode null.
            paymentMode: reqMode === 'NONE' ? null : reqMode,
            chargeAmount: willCharge ? value : null,
            itemsTotal: order.productsTotal,
            orderTotal: order.orderTotal,
            // prazo ja na criacao: se a Asaas (fora da txn) nunca completar, o
            // cron ainda expira a reserva (sem isso vira ghost permanente)
            pixExpiresAt: willCharge ? addMinutes(new Date(), PIX_WINDOW_MIN) : null,
          },
          select: { id: true },
        })
        // itens do pedido (snapshot): o servico + cada produto adquirido
        await tx.bookingItem.createMany({
          data: [
            {
              bookingId: created.id,
              kind: 'SERVICE',
              refId: service.id,
              name: service.name,
              unitPrice: service.price,
            },
            ...products.map((p) => ({
              bookingId: created.id,
              kind: 'PRODUCT' as const,
              refId: p.id,
              productId: p.id,
              name: p.name,
              unitPrice: p.price,
            })),
          ],
        })
        return created
      }, { timeout: 12_000, maxWait: 6_000 })
    } catch (e) {
      if (e instanceof Error && e.message === 'SLOT_TAKEN') {
        return NextResponse.json(
          { error: 'Este horario acabou de ser reservado. Escolha outro.' },
          { status: 409 }
        )
      }
      throw e
    }

    // ---- sem cobranca (so agendar): agendamento direto ----
    if (!willCharge) {
      return NextResponse.json({ paid: false, bookingId: booking.id }, { status: 201 })
    }

    // ---- com pagamento: gera o PIX (fora da transacao) ----
    let ctx: AsaasCtx | null = null
    let paymentId: string | null = null
    try {
      ctx = { apiKey: decrypt(tenant.asaasApiKey!), sandbox: tenant.asaasSandbox }
      const customerId = await getOrCreateCustomer(ctx, {
        name: clientName, email: clientEmail || undefined, cpfCnpj: cpfDigits, phone: phoneDigits,
      })
      const payment = await createPixPayment(ctx, {
        customerId,
        value,
        externalReference: booking.id,
        description: `${service.name} | ${barber.name} | ${tenant.name}`,
      })
      paymentId = payment.id
      // grava o id JA: garante que o webhook consiga casar mesmo se o QR falhar
      await prisma.booking.update({ where: { id: booking.id }, data: { asaasPaymentId: payment.id } })

      const qr = await getPixQrCode(ctx, payment.id)
      if (!qr) throw new Error('Nao foi possivel gerar o QR do PIX.')

      await prisma.booking.update({ where: { id: booking.id }, data: { pixCopiaECola: qr.copiaECola } })

      return NextResponse.json(
        {
          paid: true,
          bookingId: booking.id,
          paymentId: payment.id,
          value,
          mode: reqMode === 'SINAL' ? 'SINAL' : 'TOTAL',
          qrCodeUrl: qr.qrCodeUrl,
          copiaECola: qr.copiaECola,
          expiresAt: addMinutes(new Date(), PIX_WINDOW_MIN).toISOString(),
        },
        { status: 201 }
      )
    } catch (err) {
      // rollback seguro: libera o horario SO se ainda nao foi pago (guarda por
      // PENDING), e so entao cancela a cobranca pra nao deixar charge orfa.
      const released = await expireBooking(booking.id)
      if (released && ctx && paymentId) {
        await cancelPayment(ctx, paymentId)
      }
      console.error('checkout asaas error:', err)
      const msg = err instanceof Error ? err.message : 'Falha ao gerar o pagamento.'
      return NextResponse.json({ error: msg }, { status: 502 })
    }
  } catch (error) {
    console.error('checkout error:', error)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
