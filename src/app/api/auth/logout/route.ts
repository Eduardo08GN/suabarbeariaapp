import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// O cookie de sessao e httpOnly, entao o JS do cliente nao consegue apaga-lo:
// o logout PRECISA ser server-side, senao o token continua valido por 7 dias.
export async function POST() {
  const c = await cookies()
  c.delete('session')
  return NextResponse.json({ ok: true })
}
