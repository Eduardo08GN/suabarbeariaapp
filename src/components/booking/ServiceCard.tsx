'use client'

import { motion } from 'framer-motion'
import { formatCurrency, formatDuration } from '@/lib/utils'
import { Clock, ChevronRight } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  HAIR: 'Cabelo',
  BEARD: 'Barba',
  CHEMISTRY: 'Quimica',
  AESTHETICS: 'Estetica',
  COMBO: 'Combos',
  TREATMENT: 'Tratamentos',
}

interface ServiceCardProps {
  id: string
  name: string
  description?: string | null
  price: number
  durationMin: number
  category?: string
  onClick?: () => void
}

export function ServiceCard({
  name,
  description,
  price,
  durationMin,
  category,
  onClick,
}: ServiceCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="card p-4 w-full text-left flex items-center gap-4 group"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-[--text] text-sm truncate">
            {name}
          </h3>
          {category && categoryLabels[category] && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[--bg-subtle] text-[--text-secondary] shrink-0">
              {categoryLabels[category]}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-[--text-secondary] line-clamp-2 mb-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-[--tenant-primary]">
            {formatCurrency(price)}
          </span>
          <span className="flex items-center gap-1 text-xs text-[--text-secondary]">
            <Clock className="w-3 h-3" />
            {formatDuration(durationMin)}
          </span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-[--text-secondary] group-hover:text-[--tenant-primary] transition-colors shrink-0" />
    </motion.button>
  )
}