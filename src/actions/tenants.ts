'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// So o MASTER (a agencia) gerencia barbearias. Server action e endpoint POST
// aberto a qualquer logado — sem este gate, um tenant/barbeiro listaria todas
// as barbearias ou criaria novas.
async function requireMaster() {
  const session = await getSession()
  if (session?.role !== 'MASTER') throw new Error('Não autorizado')
}

export async function getAllTenants() {
  await requireMaster()
  return prisma.tenant.findMany({
    include: {
      _count: {
        select: {
          bookings: true,
          clients: true,
          barbers: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

const ACCENTS: Record<string, string> = {
  á: 'a', à: 'a', â: 'a', ã: 'a', ä: 'a',
  é: 'e', è: 'e', ê: 'e', ë: 'e',
  í: 'i', ì: 'i', î: 'i', ï: 'i',
  ó: 'o', ò: 'o', ô: 'o', õ: 'o', ö: 'o',
  ú: 'u', ù: 'u', û: 'u', ü: 'u',
  ç: 'c', ñ: 'n',
}

function slugify(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .split('')
    .map((c) => ACCENTS[c] ?? c)
    .join('')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Cria uma barbearia COMPLETA numa transacao: o tenant, uma unidade principal e
// o login do dono (User role TENANT). Sem o login, a barbearia nova nao teria
// como acessar o /painel.
export async function createBarbearia(data: {
  name: string
  slug: string
  ownerEmail: string
  ownerPassword: string
  phone?: string
}) {
  await requireMaster()

  const name = data.name?.trim()
  if (!name) throw new Error('Informe o nome da barbearia')

  const slug = slugify(data.slug || data.name)
  if (!slug) throw new Error('Informe um endereço (slug) válido')

  const email = data.ownerEmail.trim().toLowerCase()
  if (!email.includes('@') || email.length < 5) throw new Error('E-mail do dono inválido')
  if (!data.ownerPassword || data.ownerPassword.length < 6)
    throw new Error('A senha do dono precisa de pelo menos 6 caracteres')

  const [slugTaken, emailTaken] = await Promise.all([
    prisma.tenant.findUnique({ where: { slug }, select: { id: true } }),
    prisma.user.findUnique({ where: { email }, select: { id: true } }),
  ])
  if (slugTaken) throw new Error('Esse endereço (slug) já está em uso')
  if (emailTaken) throw new Error('Esse e-mail já está em uso')

  const password = await bcrypt.hash(data.ownerPassword, 10)

  try {
    await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: { name, slug, phone: data.phone?.trim() || null, email },
      })
      await tx.unit.create({
        data: { tenantId: tenant.id, name: 'Unidade principal', slug: 'principal' },
      })
      await tx.user.create({
        data: { email, password, name, role: 'TENANT', tenantId: tenant.id },
      })
    })
  } catch (e: unknown) {
    // corrida na unicidade (slug/email) que o pre-check nao pegou
    if ((e as { code?: string })?.code === 'P2002')
      throw new Error('Esse slug ou e-mail acabou de ser usado. Tente outro.')
    throw e
  }

  return { ok: true, slug }
}

// Exclui a barbearia e TUDO dela: primeiro os usuarios (dono/barbeiros) e suas
// inscricoes de push, depois o tenant — que cascateia unidades, servicos,
// barbeiros, agendamentos e clientes. Acao destrutiva, sem volta, so MASTER.
export async function deleteBarbearia(tenantId: string) {
  await requireMaster()
  if (!tenantId) throw new Error('Barbearia inválida')

  await prisma.$transaction(async (tx) => {
    const users = await tx.user.findMany({ where: { tenantId }, select: { id: true } })
    const ids = users.map((u) => u.id)
    if (ids.length > 0) {
      await tx.pushSubscription.deleteMany({ where: { userId: { in: ids } } })
      await tx.user.deleteMany({ where: { tenantId } })
    }
    await tx.tenant.delete({ where: { id: tenantId } })
  })

  return { ok: true }
}
