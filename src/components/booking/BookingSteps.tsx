'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Serviço', path: 'servicos' },
  { label: 'Barbeiro', path: 'barbeiro' },
  { label: 'Horário', path: 'agenda' },
  { label: 'Confirmar', path: 'confirmar' },
]

const SPRING = { type: 'spring', stiffness: 130, damping: 24, mass: 0.7 } as const

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
          {/* linha de progresso (entre o centro do 1o e do ultimo passo) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-4 h-[2px] -translate-y-1/2 rounded-full bg-[--bg-subtle]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[--tenant-primary] to-[--tenant-accent]"
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
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300',
                      reached
                        ? 'border-transparent bg-[--tenant-primary] text-white'
                        : 'border-[--border] bg-[--bg-card] text-[--text-secondary]',
                      active &&
                        'ring-2 ring-[--tenant-accent] ring-offset-2 ring-offset-[--bg-card]'
                    )}
                  >
                    {i + 1}
                  </motion.div>

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
