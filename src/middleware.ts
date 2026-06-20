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
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths: booking PWA, barber API, login
  if (isPublicPath(pathname) || pathname === '/') {
    return NextResponse.next()
  }

  // Protected paths: /painel/*, /master/*
  const token = request.cookies.get('session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-dev-secret-change-me')
    const { payload } = await jwtVerify(token, secret)

    // Master routes: only MASTER role
    if (pathname.startsWith('/master') && payload.role !== 'MASTER') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Tenant routes: MASTER or TENANT
    if (pathname.startsWith('/painel') && !['MASTER', 'TENANT'].includes(payload.role as string)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Inject user info into headers for downstream use
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId as string)
    requestHeaders.set('x-user-role', payload.role as string)
    if (payload.tenantId) {
      requestHeaders.set('x-tenant-id', payload.tenantId as string)
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
