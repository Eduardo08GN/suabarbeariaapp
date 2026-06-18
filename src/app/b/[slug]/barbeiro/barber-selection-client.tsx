'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BarberCard } from '@/components/booking/BarberCard'
import { Shuffle } from 'lucide-react'

interface Barber {
  id: string
  name: string
  nickname: string | null
  photoUrl: string | null
}

interface BarberSelectionClientProps {
  slug: string
  serviceId: string
  barbers: Barber[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

export function BarberSelectionClient({
  slug,
  serviceId,
  barbers,
}: BarberSelectionClientProps) {
  const router = useRouter()

  const handleSelect = (barberId: string) => {
    router.push(
      `/b/${slug}/agenda?serviceId=${serviceId}&barberId=${barberId}`
    )
  }

  const handleAny = () => {
    // Pick a random barber for "any professional"
    const randomBarber = barbers[Math.floor(Math.random() * barbers.length)]
    if (randomBarber) {
      handleSelect(randomBarber.id)
    }
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[--text]">
          Escolha o profissional
        </h2>
        <p className="text-sm text-[--text-secondary] mt-1">
          Selecione quem vai te atender
        </p>
      </div>

      <motion.div
        className="space-y-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Any professional option */}
        <motion.div variants={item}>
          <motion.button
            onClick={handleAny}
            className="card p-4 w-full flex items-center gap-4 group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="w-12 h-12 rounded-full bg-[--tenant-primary]/10 flex items-center justify-center">
              <Shuffle className="w-5 h-5 text-[--tenant-primary]" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-[--text] text-sm">
                Qualquer Profissional
              </h3>
              <p className="text-xs text-[--text-secondary]">
                Sem preferencia
              </p>
            </div>
          </motion.button>
        </motion.div>

        {/* Barber list */}
        {barbers.map((barber) => (
          <motion.div key={barber.id} variants={item}>
            <BarberCard
              {...barber}
              onClick={() => handleSelect(barber.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}