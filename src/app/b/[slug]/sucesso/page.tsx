'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Home, Share2, Star } from 'lucide-react'

export default function SucessoPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const bookingId = searchParams.get('bookingId')

  const [reviewUrl, setReviewUrl] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetch(`/api/barber/config/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (active && d?.googleReviewUrl) setReviewUrl(d.googleReviewUrl)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [slug])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Agendamento Confirmado',
          text: 'Meu agendamento foi confirmado!',
          url: window.location.href,
        })
      } catch {
        // User cancelled
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
      {/* Animated Checkmark */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-(--success) flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.4,
            }}
          >
            <Check className="w-10 h-10 text-(--success)" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* Celebration particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-(--success)"
            style={{
              top: '50%',
              left: '50%',
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i * 60 * Math.PI) / 180) * 60,
              y: Math.sin((i * 60 * Math.PI) / 180) * 60,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Text */}
      <motion.h2
        className="text-2xl font-bold text-(--text) mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 24 }}
      >
        Agendamento Confirmado!
      </motion.h2>

      <motion.p
        className="text-sm text-(--text-secondary) mb-8 max-w-xs"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 24 }}
      >
        Tudo certo! Estaremos esperando por você. Até breve!
      </motion.p>

      {/* Avalie-nos no Google */}
      {reviewUrl && (
        <motion.div
          className="w-full max-w-xs mb-6 rounded-2xl border border-(--border) bg-(--bg-card) p-5 text-center shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 300, damping: 24 }}
        >
          <div className="mb-3 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-(--warning) text-(--warning)" />
            ))}
          </div>
          <p className="text-sm font-bold text-(--text)">Gostou do atendimento?</p>
          <p className="mt-1 mb-4 text-xs text-(--text-secondary)">
            Sua avaliação no Google ajuda muito. Aponte a câmera ou toque no botão.
          </p>
          <div className="mx-auto mb-4 w-fit rounded-xl border border-(--border) bg-white p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=0&data=${encodeURIComponent(reviewUrl)}`}
              alt="QR para avaliar no Google"
              className="h-36 w-36"
            />
          </div>
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex w-full items-center justify-center gap-2"
          >
            <Star className="h-4 w-4" />
            Avaliar no Google
          </a>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        className="w-full max-w-xs space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Link
          href={`/b/${slug}`}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Voltar ao Início
        </Link>

        {'share' in navigator && (
          <button
            onClick={handleShare}
            className="btn-outline w-full flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        )}
      </motion.div>
    </div>
  )
}