import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

interface SubBody {
  subscription?: {
    endpoint?: string
    keys?: { p256dh?: string; auth?: string }
  }
}

export async function POST(request: NextRequest) {
  const s = await getSession()
  if (!s?.userId) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  let body: SubBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'payload invalido' }, { status: 400 })
  }
  const sub = body?.subscription
  if (!sub?.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) {
    return NextResponse.json({ error: 'inscricao invalida' }, { status: 400 })
  }

  // upsert por endpoint (o mesmo dispositivo nao duplica; reassocia ao user atual)
  await prisma.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    create: { userId: s.userId, endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    update: { userId: s.userId, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  const s = await getSession()
  if (!s?.userId) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  const endpoint = request.nextUrl.searchParams.get('endpoint')
  if (endpoint) {
    await prisma.pushSubscription.deleteMany({ where: { endpoint, userId: s.userId } })
  }
  return NextResponse.json({ ok: true })
}
