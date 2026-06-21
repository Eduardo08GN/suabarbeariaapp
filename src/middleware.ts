import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = [
  '/login',
  '/b/',
  '/api/barber/',
  '/api/auth/',
  '/api/webhooks/',
  '/api/cron/',
  '/sw.js',
  '/manifest.webmanifest',
  // manifest do /pro: o fetch de manifest NAO manda cookie, entao nao pode
  // ficar atras do gate (senao redireciona pro login e vira HTML invalido).
  // A rota serve uma versao generica quando nao ha sessao.
  '/pro/manifest.webmanifest',
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

// A "casa" de cada papel. Mismatch de rota redireciona pra casa do papel (e
// nao pro login), pra ninguem ficar preso numa tela que nao e dele.
function homeForRole(role: unknown): string {
  if (role === 'MASTER') return '/master'
  if (role === 'BARBER') return '/pro'
  return '/painel'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths: booking PWA, barber API, login
  if (isPublicPath(pathname) || pathname === '/') {
    return NextResponse.next()
  }

  // Protected paths: /painel/*, /master/*, /pro/*
  const token = request.cookies.get('session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-dev-secret-change-me')
    const { payload } = await jwtVerify(token, secret)
    const role = payload.role
    const home = homeForRole(role)

    // casa o prefixo no LIMITE de segmento (/pro mas nao /produtos-publicos),
    // pra um futuro irmao de rota nao herdar a regra sem querer
    const onSegment = (p: string) => pathname === p || pathname.startsWith(p + '/')

    // Master routes: only MASTER role
    if (onSegment('/master') && role !== 'MASTER') {
      return NextResponse.redirect(new URL(home, request.url))
    }

    // Tenant routes: MASTER or TENANT (o dono e a agencia)
    if (onSegment('/painel') && !['MASTER', 'TENANT'].includes(role as string)) {
      return NextResponse.redirect(new URL(home, request.url))
    }

    // Professional routes: only BARBER role (superficie do profissional)
    if (onSegment('/pro') && role !== 'BARBER') {
      return NextResponse.redirect(new URL(home, request.url))
    }

    // Inject user info into headers for downstream use
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId as string)
    requestHeaders.set('x-user-role', role as string)
    if (payload.tenantId) {
      requestHeaders.set('x-tenant-id', payload.tenantId as string)
    }
    if (payload.barberId) {
      requestHeaders.set('x-barber-id', payload.barberId as string)
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  } catch {
    // Invalid token
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('session')
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3)$).*)'],
}
