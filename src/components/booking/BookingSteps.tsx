'use client'

import { usePathname, useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  { label: 'Serviço', path: 'servicos' },
  { label: 'Barbeiro', path: 'barbeiro' },
  { label: 'Horário', path: 'agenda' },
  { label: 'Confirmar', path: 'confirmar' },
]

const SPRING = { type: 'spring', stiffness: 130, damping: 24, mass: 0.7 } as const

// Tailwind v4 nao interpreta `[--var]` como var(); estilo inline com var()+fallback.
const C = {
  primary: 'var(--tenant-primary, #18181b)',
  accent: 'var(--tenant-accent, #d4a853)',
  card: 'var(--bg-card, #ffffff)',
  subtle: 'var(--bg-subtle, #ececee)',
  border: 'var(--border, #e4e4e7)',
  text: 'var(--text, #09090b)',
  muted: 'var(--text-secondary, #71717a)',
}

export function BookingSteps() {
  const pathname = usePathname()
  const params = useParams()
  const search = useSearchParams()
  const reduce = useReducedMotion()

  const currentIndex = steps.findIndex((s) => pathname.includes(`/${s.path}`))
  if (currentIndex === -1) return null

  const slug = String(params?.slug ?? '')
  const qs = search.toString()
  const progress = currentIndex / (steps.length - 1) // 0..1

  return (
    <div className="border-b" style={{ borderColor: C.border, background: C.card }}>
      <div className="mx-auto w-full max-w-lg px-6 py-3.5">
        <div className="relative">
          {/* linha de progresso (entre o centro do 1o e do ultimo passo) */}
          <div
            className="absolute left-[12.5%] right-[12.5%] top-4 h-[2px] -translate-y-1/2 rounded-full"
            style={{ background: C.subtle }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${C.primary}, ${C.accent})` }}
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={reduce ? { duration: 0 } : SPRING}
            />
          </div>

          {/* passos numerados — concluidos sao clicaveis (voltar) */}
          <div className="relative flex items-start justify-between">
            {steps.map((step, i) => {
              const reached = i <= currentIndex
              const active = i === currentIndex
              const done = i < currentIndex // passo concluido: pode voltar

              const dot = (
                <>
                  <motion.div
                    initial={false}
                    animate={{ scale: active ? 1.1 : 1 }}
                    whileHover={done && !reduce ? { scale: 1.14 } : undefined}
                    transition={reduce ? { duration: 0 } : SPRING}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-[background-color,border-color,color,box-shadow] duration-300"
                    style={
                      reached
                        ? {
                            backgroundColor: C.primary,
                            borderColor: 'transparent',
                            color: '#ffffff',
                            boxShadow: active
                              ? `0 0 0 2px ${C.card}, 0 0 0 4px ${C.accent}`
                              : undefined,
                          }
                        : {
                            backgroundColor: C.card,
                            borderColor: C.border,
                            color: C.muted,
                          }
                    }
                  >
                    {i + 1}
                  </motion.div>
                  <span
                    className="text-[11px] leading-none transition-colors duration-300"
                    style={{
                      color: active ? C.text : C.muted,
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    {step.label}
                  </span>
                </>
              )

              const cls = 'flex flex-1 flex-col items-center gap-1.5'

              return done ? (
                <Link
                  key={step.path}
                  href={`/b/${slug}/${step.path}${qs ? `?${qs}` : ''}`}
                  aria-label={`Voltar para ${step.label}`}
                  className={`${cls} cursor-pointer`}
                >
                  {dot}
                </Link>
              ) : (
                <div key={step.path} className={cls}>
                  {dot}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
