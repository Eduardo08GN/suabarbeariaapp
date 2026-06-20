'use client'

import { useEffect } from 'react'

// Registra o service worker (push + instalabilidade). Silencioso.
export function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])
  return null
}
