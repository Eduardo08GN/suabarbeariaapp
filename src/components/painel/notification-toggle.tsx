'use client'

import { useEffect, useState } from 'react'
import { Bell, BellOff, Check, Loader2 } from 'lucide-react'

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(b64)
  const arr = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i)
  return arr
}

type State = 'checking' | 'unsupported' | 'denied' | 'off' | 'on' | 'loading'

export function NotificationToggle() {
  const [state, setState] = useState<State>('checking')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !VAPID_PUBLIC) {
      setState('unsupported')
      return
    }
    if (Notification.permission === 'denied') {
      setState('denied')
      return
    }
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setState(sub ? 'on' : 'off'))
      .catch(() => setState('off'))
  }, [])

  async function enable() {
    setState('loading')
    try {
      const perm = await Notification.requestPermission()
      if (perm !== 'granted') {
        setState(perm === 'denied' ? 'denied' : 'off')
        return
      }
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC) as BufferSource,
      })
      const res = await fetch('/api/painel/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      })
      setState(res.ok ? 'on' : 'off')
    } catch {
      setState('off')
    }
  }

  if (state === 'checking' || state === 'unsupported') return null

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5] text-[#18181B]">
          {state === 'on' ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#09090B]">Notificacoes de agendamento</p>
          <p className="text-xs text-[#71717A]">
            {state === 'on'
              ? 'Voce recebe um aviso a cada novo agendamento neste aparelho.'
              : state === 'denied'
                ? 'Permissao bloqueada. Libere notificacoes para este site nas configuracoes do navegador.'
                : 'Receba um aviso na hora que cair um agendamento.'}
          </p>
        </div>
        {state === 'on' ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700">
            <Check className="h-3.5 w-3.5" />
            Ativas
          </span>
        ) : state === 'denied' ? null : (
          <button
            onClick={enable}
            disabled={state === 'loading'}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#18181B] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#27272A] disabled:opacity-50"
          >
            {state === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
            Ativar
          </button>
        )}
      </div>
    </div>
  )
}
