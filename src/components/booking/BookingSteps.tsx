'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Serviço', path: 'servicos' },
  { label: 'Barbeiro', path: 'barbeiro' },
  { label: 'Horário', path: 'agenda' },
  { label: 'Confirmar', path: 'confirmar' },
]

const SPRING = { type: 'spring', stiffness: 130, damping: 22, mass: 0.7 } as const

export function BookingSteps() {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  const currentIndex = steps.findIndex((s) => pathname.includes(`/${s.path}`))
  if (currentIndex === -1) return null

  const progress = currentIndex / (steps.length - 1) // 0..1

  return (
    <div className="border-b border-[--border] bg-[--bg-card]">
      <div className="mx-auto w-full max-w-lg px-6 py-3.5">
        <div className="relative">
          {/* trilho de fundo (entre o centro do 1o e do ultimo passo) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-4 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-[--bg-subtle]">
            {/* preenchimento animado */}
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-[--tenant-primary] to-[--tenant-accent]"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={reduce ? { duration: 0 } : SPRING}
            >
              {/* brilho premium percorrendo a parte preenchida */}
              {!reduce && progress > 0 && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['0%', '450%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: 'easeInOut',
                    repeatDelay: 0.8,
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* passos */}
          <div className="relative flex items-start justify-between">
            {steps.map((step, i) => {
              const done = i < currentIndex
              const active = i === currentIndex

              return (
                <div
                  key={step.path}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    {/* ping de radar no passo atual */}
                    {active && !reduce && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-[--tenant-accent]"
                        animate={{ scale: [1, 1.95], opacity: [0.4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                      />
                    )}

                    <motion.div
                      initial={false}
                      animate={{ scale: active ? 1.08 : 1 }}
                      transition={reduce ? { duration: 0 } : SPRING}
                      className={cn(
                        'relative flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300',
                        done && 'border-transparent bg-[--tenant-primary] text-white',
                        active &&
                          'border-[--tenant-accent] bg-[--bg-card] text-[--tenant-primary] shadow-[0_2px_12px_-3px_var(--tenant-accent)]',
                        !done &&
                          !active &&
                          'border-[--border] bg-[--bg-card] text-[--text-secondary]'
                      )}
                    >
                      {done ? (
                        <motion.span
                          initial={reduce ? false : { scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        >
                          <Check className="h-4 w-4" strokeWidth={2.75} />
                        </motion.span>
                      ) : (
                        i + 1
                      )}
                    </motion.div>
                  </div>

                  <span
                    className={cn(
                      'text-[11px] leading-none transition-colors duration-300',
                      active
                        ? 'font-semibold text-[--text]'
                        : 'font-medium text-[--text-secondary]'
                    )}
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
