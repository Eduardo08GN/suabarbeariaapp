import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// O cookie de sessao e httpOnly, entao o JS do cliente nao consegue apaga-lo:
// o logout PRECISA ser server-side, senao o token continua valido por 7 dias.
export async function POST() {
  const c = await cookies()
  // path explicito: o login setou o cookie em path '/', e a remocao SO casa se
  // name+path baterem. Sem o path, alguns runtimes emitem Set-Cookie sem Path
  // (default-path '/api/auth') e o cookie de '/' sobreviveria.
  c.delete({ name: 'session', path: '/' })
  return NextResponse.json({ ok: true })
}
