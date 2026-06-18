'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const steps = [
  { label: 'Servico', path: 'servicos' },
  { label: 'Barbeiro', path: 'barbeiro' },
  { label: 'Horario', path: 'agenda' },
  { label: 'Confirmar', path: 'confirmar' },
]

export function BookingSteps() {
  const pathname = usePathname()

  const currentIndex = steps.findIndex((step) =>
    pathname.includes(`/${step.path}`)
  )

  if (currentIndex === -1) return null

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[--bg-card] border-b border-[--border]">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isFuture = index > currentIndex

        return (
          <div key={step.path} className="flex items-center gap-1.5 flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  isCompleted && 'bg-[--tenant-primary] text-white',
                  isCurrent && 'bg-[--tenant-primary] text-white ring-2 ring-[--tenant-primary]/20',
                  isFuture && 'bg-[--bg-subtle] text-[--text-secondary]'
                )}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium leading-none',
                  isCurrent ? 'text-[--text]' : 'text-[--text-secondary]'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-px flex-1 -mt-4',
                  isCompleted ? 'bg-[--tenant-primary]' : 'bg-[--border]'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}