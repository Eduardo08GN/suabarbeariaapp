// Hotfix idempotente: adiciona Booking.reminderSentAt no banco caso falte.
// Coluna nullable -> ADD COLUMN e instantaneo no Postgres (sem rewrite/lock de
// tabela). Resolve o 500 do /painel apos o deploy que regenerou o client com a
// coluna antes do schema chegar no banco.
const { PrismaClient } = require('../src/generated/prisma')
const prisma = new PrismaClient()
;(async () => {
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "reminderSentAt" TIMESTAMP(3)'
  )
  const r = await prisma.$queryRawUnsafe(
    `SELECT column_name FROM information_schema.columns WHERE table_name='Booking' AND column_name='reminderSentAt'`
  )
  console.log(r.length ? 'OK: coluna reminderSentAt presente' : 'FALHOU: coluna ausente')
  await prisma.$disconnect()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
