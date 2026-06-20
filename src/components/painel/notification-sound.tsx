'use client'

import { useEffect } from 'react'
import { isSoundOn } from '@/lib/sound-pref'

// Toca o som de caixa ("cha-ching") quando o service worker avisa de um novo
// agendamento E o painel esta aberto (cenario do tablet no balcao). Push em
// segundo plano usa o som do SO; isso e o complemento de primeiro plano.
export function NotificationSound() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const audio = new Audio('/chaching.mp3')
    audio.preload = 'auto'

    // politica de autoplay: desbloqueia o audio no primeiro toque do usuario
    const unlock = () => {
      audio
        .play()
        .then(() => {
          audio.pause()
          audio.currentTime = 0
        })
        .catch(() => {})
    }
    window.addEventListener('pointerdown', unlock, { once: true })

    const onMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'new-booking' && isSoundOn()) {
        audio.currentTime = 0
        audio.play().catch(() => {})
      }
    }
    navigator.serviceWorker?.addEventListener('message', onMsg)

    return () => {
      window.removeEventListener('pointerdown', unlock)
      navigator.serviceWorker?.removeEventListener('message', onMsg)
    }
  }, [])

  return null
}
