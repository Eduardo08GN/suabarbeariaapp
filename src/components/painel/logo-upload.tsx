'use client'

import { useRef, useState } from 'react'
import { Store, ImageIcon, Camera, Loader2, Check } from 'lucide-react'
import { ImageCropper } from '@/components/admin/ImageCropper'
import { salvarLogoBarbearia } from '@/actions/perfil'

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(fr.result as string)
    fr.onerror = () => rej(new Error('read'))
    fr.readAsDataURL(file)
  })
}

export function LogoUpload({
  initialLogo,
  name,
}: {
  initialLogo: string | null
  name: string
}) {
  const [logo, setLogo] = useState<string | null>(initialLogo)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite re-selecionar o mesmo arquivo
    if (!file) return
    try {
      setCropSrc(await readAsDataUrl(file))
    } catch {
      // ignora arquivo invalido
    }
  }

  async function onCropped(blob: Blob) {
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append('file', blob, 'logo')
      const res = await fetch('/api/painel/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        await salvarLogoBarbearia(data.url)
        setLogo(data.url)
        setCropSrc(null)
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      }
    } catch {
      // ignora: o dono tenta de novo
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    setBusy(true)
    try {
      await salvarLogoBarbearia(null)
      setLogo(null)
    } catch {
      // ignora
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-1 flex items-center gap-2">
        <Store className="h-4 w-4 text-[#71717A]" />
        <span className="text-sm font-medium text-[#09090B]">Logo da barbearia</span>
      </div>
      <p className="mb-4 text-xs text-[#71717A]">
        Aparece na tela inicial do seu link de agendamento. Imagem quadrada fica melhor.
      </p>

      <div className="flex items-center gap-4">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Enviar logo da barbearia"
          className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F4F4F5] ring-1 ring-inset ring-[#E4E4E7] transition-all hover:ring-[#18181B] cursor-pointer"
        >
          {busy ? (
            <Loader2 className="h-5 w-5 animate-spin text-[#A1A1AA]" />
          ) : logo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={name} className="h-full w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
                <Camera className="h-5 w-5" />
              </span>
            </>
          ) : (
            <div className="flex flex-col items-center gap-0.5 text-[#A1A1AA]">
              <ImageIcon className="h-6 w-6" />
              <span className="text-[10px] font-medium">Logo</span>
            </div>
          )}
        </button>

        <div className="min-w-0">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#27272A] disabled:opacity-50 cursor-pointer"
          >
            <Camera className="h-4 w-4" />
            {logo ? 'Trocar logo' : 'Enviar logo'}
          </button>
          <div className="mt-2 flex items-center gap-3">
            {logo && !busy && (
              <button
                type="button"
                onClick={remove}
                className="text-xs text-[#71717A] transition-colors hover:text-red-600 cursor-pointer"
              >
                Remover
              </button>
            )}
            {saved && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                <Check className="h-3.5 w-3.5" /> Salva
              </span>
            )}
          </div>
        </div>
      </div>

      {cropSrc && (
        <ImageCropper
          src={cropSrc}
          busy={busy}
          onCancel={() => setCropSrc(null)}
          onConfirm={onCropped}
        />
      )}
    </div>
  )
}
