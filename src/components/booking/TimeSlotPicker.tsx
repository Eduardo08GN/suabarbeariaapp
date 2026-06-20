'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sun, Sunset, Moon } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  selectedTime: string | null
  onSelect: (time: string) => void
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

interface PeriodGroup {
  label: string
  icon: React.ReactNode
  slots: TimeSlot[]
}

export function TimeSlotPicker({
  slots,
  selectedTime,
  onSelect,
}: TimeSlotPickerProps) {
  const periods: PeriodGroup[] = [
    {
      label: 'Manhã',
      icon: <Sun className="w-4 h-4" />,
      slots: slots.filter((s) => timeToMinutes(s.time) < 720),
    },
    {
      label: 'Tarde',
      icon: <Sunset className="w-4 h-4" />,
      slots: slots.filter(
        (s) => timeToMinutes(s.time) >= 720 && timeToMinutes(s.time) < 1080
      ),
    },
    {
      label: 'Noite',
      icon: <Moon className="w-4 h-4" />,
      slots: slots.filter((s) => timeToMinutes(s.time) >= 1080),
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <div className="space-y-5">
      {periods.map(
        (period) =>
          period.slots.length > 0 && (
            <div key={period.label}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-(--text-secondary)">{period.icon}</span>
                <h3 className="text-sm font-semibold text-(--text)">
                  {period.label}
                </h3>
              </div>
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {period.slots.map((slot) => (
                  <motion.button
                    key={slot.time}
                    variants={item}
                    disabled={!slot.available}
                    onClick={() => slot.available && onSelect(slot.time)}
                    className={cn(
                      'py-3 rounded-lg text-sm font-medium transition-all min-h-[44px]',
                      slot.available && slot.time !== selectedTime &&
                        'bg-(--bg-card) border border-(--border) text-(--text) active:bg-(--bg-subtle)',
                      slot.time === selectedTime &&
                        'bg-(--tenant-primary) text-white border border-(--tenant-primary) shadow-sm',
                      !slot.available &&
                        'bg-(--bg-subtle) text-(--text-secondary)/40 cursor-not-allowed line-through'
                    )}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          )
      )}
      {slots.length === 0 && (
        <div className="text-center py-8 text-(--text-secondary) text-sm">
          Nenhum horário disponível neste dia.
        </div>
      )}
    </div>
  )
}