'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BarberCardProps {
  id: string
  name: string
  nickname?: string | null
  photoUrl?: string | null
  onClick?: () => void
  selected?: boolean
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function BarberCard({
  name,
  nickname,
  photoUrl,
  onClick,
  selected,
}: BarberCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'card p-4 w-full flex items-center gap-4 group transition-colors',
        selected && 'ring-2 ring-(--tenant-primary) border-(--tenant-primary)'
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-(--bg-subtle) flex items-center justify-center text-sm font-bold text-(--text-secondary)">
          {getInitials(name)}
        </div>
      )}
      <div className="text-left flex-1 min-w-0">
        <h3 className="font-semibold text-(--text) text-sm truncate">
          {name}
        </h3>
        {nickname && (
          <p className="text-xs text-(--text-secondary) truncate">
            {nickname}
          </p>
        )}
      </div>
    </motion.button>
  )
}