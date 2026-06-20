import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSession } from '@/lib/auth'
import { r2Put } from '@/lib/r2'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const MAX_BYTES = 4 * 1024 * 1024 // 4MB (o cliente ja comprime; isso e teto de seguranca)

// Detecta o tipo real pelos magic bytes (nao confia no Content-Type declarado).
function sniff(buf: Buffer): { ext: string; mime: string } | null {
  if (buf.length < 12) return null
  // WEBP: "RIFF"...."WEBP"
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP')
    return { ext: 'webp', mime: 'image/webp' }
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ext: 'jpg', mime: 'image/jpeg' }
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
    return { ext: 'png', mime: 'image/png' }
  return null
}

export async function POST(request: NextRequest) {
  const s = await getSession()
  if (!s?.tenantId) return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })

  // freio de abuso/custo: endpoint autenticado que escreve em storage pago
  if (!rateLimit(`upload:${s.tenantId}`, 30, 60_000)) {
    return NextResponse.json({ error: 'Muitos envios. Aguarde um instante.' }, { status: 429 })
  }
  // teto antecipado por content-length, antes de bufferizar o corpo
  if (Number(request.headers.get('content-length') || 0) > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Imagem muito grande (max 4MB).' }, { status: 413 })
  }

  let file: File | null = null
  try {
    const form = await request.formData()
    const f = form.get('file')
    if (f instanceof File) file = f
  } catch {
    return NextResponse.json({ error: 'Envio invalido.' }, { status: 400 })
  }
  if (!file) return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Imagem muito grande (max 4MB).' }, { status: 413 })
  }

  const buf = Buffer.from(await file.arrayBuffer())
  const kind = sniff(buf)
  if (!kind) {
    return NextResponse.json({ error: 'Arquivo nao e uma imagem valida.' }, { status: 400 })
  }

  const key = `suabarbearia/produtos/${s.tenantId}/${crypto.randomBytes(10).toString('hex')}.${kind.ext}`
  try {
    const url = await r2Put(key, buf, kind.mime)
    return NextResponse.json({ url })
  } catch (e) {
    console.error('upload r2 error:', e)
    return NextResponse.json({ error: 'Falha ao enviar a imagem.' }, { status: 502 })
  }
}
