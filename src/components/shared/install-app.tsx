'use client'

import { useEffect, useState } from 'react'
import { Download, Share } from 'lucide-react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function useInstallApp() {
  const [instalado, setInstalado] = useState(false)
  const [ios, setIos] = useState(false)
  const [promptNativo, setPromptNativo] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    setInstalado(window.matchMedia('(display-mode: standalone)').matches)
    setIos(/iPhone|iPad|iPod/.test(navigator.userAgent))

    function captura(e: Event) {
      e.preventDefault()
      setPromptNativo(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', captura)
    return () => window.removeEventListener('beforeinstallprompt', captura)
  }, [])

  async function instalar() {
    if (!promptNativo) return
    await promptNativo.prompt()
    const { outcome } = await promptNativo.userChoice
    if (outcome === 'accepted') setInstalado(true)
    setPromptNativo(null)
  }

  return { instalado, ios, promptNativo, instalar }
}

export function InstallAppButton() {
  const { instalado, ios, promptNativo, instalar } = useInstallApp()

  if (instalado) return null

  if (ios) {
    return (
      <button className="flex items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-4 py-2.5 text-sm font-medium text-[#09090B] transition-colors hover:bg-[#F4F4F5]">
        <Share size={16} />
        Instalar: toque em{' '}
        <span className="font-semibold">Compartilhar</span> e depois{' '}
        <span className="font-semibold">Adicionar a Tela</span>
      </button>
    )
  }

  if (!promptNativo) return null

  return (
    <button
      onClick={instalar}
      className="flex items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-4 py-2.5 text-sm font-medium text-[#09090B] transition-colors hover:bg-[#F4F4F5]"
    >
      <Download size={16} />
      Instalar App
    </button>
  )
}