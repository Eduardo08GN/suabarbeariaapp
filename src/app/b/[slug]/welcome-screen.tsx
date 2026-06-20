'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { InstallAppButton } from '@/components/shared/install-app'

interface WelcomeScreenProps {
  slug: string
  name: string
  description: string | null
  logo: string | null
  colorPrimary: string
}

export function WelcomeScreen({
  slug,
  name,
  description,
  logo,
  colorPrimary,
}: WelcomeScreenProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 relative overflow-hidden -mt-14">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${colorPrimary}, transparent 70%)`,
        }}
      />

      <motion.div
        className="flex flex-col items-center text-center z-10 w-full max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo — the star of the show */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: 0.1,
          }}
          className="mb-8"
        >
          <img
            src={logo || '/logo_barbearia.webp'}
            alt={name}
            className="w-32 h-32 rounded-3xl object-cover shadow-lg"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-3xl font-bold text-(--text) mb-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 24 }}
        >
          {name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-base text-(--text-secondary) mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 24 }}
        >
          {description || 'Agende seu horario'}
        </motion.p>

        {/* CTA Button — min 44px touch target */}
        <motion.button
          onClick={() => router.push(`/b/${slug}/servicos`)}
          className="btn-primary w-full text-base py-4 rounded-xl font-semibold tracking-wide min-h-[48px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 24 }}
          whileTap={{ scale: 0.97 }}
        >
          Agendar Agora
        </motion.button>

        {/* Install PWA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <InstallAppButton />
        </motion.div>
      </motion.div>
    </div>
  )
}