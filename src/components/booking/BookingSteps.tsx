'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'

const steps = [
  { label: 'Serviço', path: 'servicos' },
  { label: 'Barbeiro', path: 'barbeiro' },
  { label: 'Horário', path: 'agenda' },
  { label: 'Confirmar', path: 'confirmar' },
]

const SPRING = { type: 'spring', stiffness: 130, damping: 24, mass: 0.7 } as const

// Tailwind v4 nao interpreta `[--var]` como var(); usamos estilo inline com
// var() + fallback pra garantir as cores do tenant.
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
  const reduce = useReducedMotion()

  const currentIndex = steps.findIndex((s) => pathname.includes(`/${s.path}`))
  if (currentIndex === -1) return null

  const progress = currentIndex / (steps.length - 1) // 0..1

  return (
    <div className="border-b" style={{ borderColor: C.border, background: C.card }}>
      <div className="mx-auto w-full max-w-lg px-6 py-3.5">
        <div className="relative">
          {/* linha de progresso (entre o centro do 1o e do ultimo passo) */}
          <div
            className="absolute left-[12.5%] right-[12.5%] top-4 h-[2px] -translate-y-1/2 overflow-hidden rounded-full"
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

          {/* passos numerados (numero sempre visivel) */}
          <div className="relative flex items-start justify-between">
            {steps.map((step, i) => {
              const reached = i <= currentIndex
              const active = i === currentIndex

              return (
                <div
                  key={step.path}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: active ? 1.1 : 1 }}
                    transition={reduce ? { duration: 0 } : SPRING}
                    className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-[background-color,border-color,color,box-shadow] duration-300"
                    style={
                      reached
                        ? {
                            backgroundColor: C.primary,
                            borderColor: 'transparent',
                            color: '#ffffff',
                            // anel limpo no passo atual (offset via sombra dupla, sem blur)
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
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
