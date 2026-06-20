import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

interface SubBody {
  subscription?: {
    endpoint?: string
    keys?: { p256dh?: string; auth?: string }
  }
}

export async function POST(request: NextRequest) {
  const s = await getSession()
  if (!s?.userId) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  if (!rateLimit(`push-sub:${s.userId}`, 20, 60_000)) {
    return NextResponse.json({ error: 'Muitas tentativas.' }, { status: 429 })
  }

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

  // escrita SEGURA por dono: atualiza so se o endpoint ja e deste usuario; senao
  // cria. Se o endpoint pertence a OUTRO usuario (P2002 no unique), recusa — nao
  // rouba a inscricao (fecha o IDOR/sequestro de push entre tenants). Um endpoint
  // so e produzido pelo push manager do proprio navegador, entao pertence a 1 user.
  const updated = await prisma.pushSubscription.updateMany({
    where: { endpoint: sub.endpoint, userId: s.userId },
    data: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
  })
  if (updated.count === 0) {
    try {
      await prisma.pushSubscription.create({
        data: { userId: s.userId, endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
      })
    } catch {
      return NextResponse.json({ error: 'inscricao em uso' }, { status: 409 })
    }
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest) {
  const s = await getSession()
  if (!s?.userId) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  if (!rateLimit(`push-sub:${s.userId}`, 20, 60_000)) {
    return NextResponse.json({ error: 'Muitas tentativas.' }, { status: 429 })
  }
  const endpoint = request.nextUrl.searchParams.get('endpoint')
  if (endpoint) {
    await prisma.pushSubscription.deleteMany({ where: { endpoint, userId: s.userId } })
  }
  return NextResponse.json({ ok: true })
}
