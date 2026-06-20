// Backfill idempotente: converte o BarberUnit.schedule (Json, chaves PT/EN)
// existente em linhas WorkShift (dayOfWeek 0..6 + minutos). Roda 1x apos o
// db push da Fase 0. Seguro re-rodar: limpa os shifts do barbeiro+unidade
// antes de recriar. NAO toca em nenhum outro dado.
//   npx tsx prisma/backfill-shifts.ts
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// chave de dia -> Date.getDay() (0=domingo). Aceita PT e EN; dom/sun ja contam.
const DOW: Record<string, number> = {
  dom: 0, sun: 0,
  seg: 1, mon: 1,
  ter: 2, tue: 2,
  qua: 3, wed: 3,
  qui: 4, thu: 4,
  sex: 5, fri: 5,
  sab: 6, sat: 6,
}

function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

async function main() {
  const bus = await prisma.barberUnit.findMany()
  let created = 0
  let limpos = 0

  for (const bu of bus) {
    // idempotencia: zera os shifts deste barbeiro+unidade antes de recriar
    const del = await prisma.workShift.deleteMany({
      where: { barberId: bu.barberId, unitId: bu.unitId },
    })
    limpos += del.count

    const sched = bu.schedule as Record<string, { open?: string; close?: string; start?: string; end?: string }> | null
    if (!sched || typeof sched !== 'object') continue

    for (const [key, val] of Object.entries(sched)) {
      const dow = DOW[key.toLowerCase()]
      const open = val?.open ?? val?.start
      const close = val?.close ?? val?.end
      if (dow === undefined || !open || !close) continue // chave invalida ou dia fechado
      await prisma.workShift.create({
        data: {
          barberId: bu.barberId,
          unitId: bu.unitId,
          dayOfWeek: dow,
          startMin: toMin(open),
          endMin: toMin(close),
        },
      })
      created++
    }
  }

  console.log(`Backfill: ${bus.length} BarberUnit lidos | ${limpos} shifts antigos limpos | ${created} WorkShift criados`)
  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error('Backfill falhou:', e)
  await prisma.$disconnect()
  process.exit(1)
})
