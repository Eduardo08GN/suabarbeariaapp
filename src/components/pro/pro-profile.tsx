'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, Loader2 } from 'lucide-react'
import { ImageCropper } from '@/components/admin/ImageCropper'
import { updateMyPhoto } from '@/actions/staff'

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result as string)
    r.onerror = () => rej(new Error('read'))
    r.readAsDataURL(file)
  })
}

// O barbeiro sobe a propria foto-avatar (mesmo cropper/fluxo do painel do dono).
// A foto reflete em todas as superficies que leem Barber.photoUrl — em especial
// a selecao publica de profissional no /b/[slug].
export function ProProfile({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<string | null>(photoUrl)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite re-selecionar o mesmo arquivo depois
    if (!file) return
    setError('')
    try {
      setCropSrc(await readAsDataUrl(file))
    } catch {
      setError('Não foi possível abrir a imagem.')
    }
  }

  async function onCropped(blob: Blob) {
    setCropSrc(null) // fecha o cropper na hora; o upload roda com o avatar em spinner
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', blob, 'avatar')
      const res = await fetch('/api/painel/upload', { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) throw new Error(data.error || 'Falha ao enviar a imagem.')
      await updateMyPhoto(data.url)
      setPhoto(data.url)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao enviar a imagem.')
    } finally {
      setUploading(false)
    }
  }

  const initial = (name || '?').trim().charAt(0).toUpperCase()

  return (
    <div className="mb-5 flex items-center gap-4 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        aria-label="Trocar sua foto"
        className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#F4F4F5] ring-1 ring-inset ring-[#E4E4E7] transition-all hover:ring-[#18181B] disabled:opacity-60"
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center text-lg font-semibold text-[#71717A]">
            {initial}
          </span>
        )}
        <span
          className={`absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity ${
            uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Camera className="h-5 w-5 text-white" />
          )}
        </span>
      </button>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#09090B]">Sua foto</p>
        <p className="text-xs leading-snug text-[#71717A]">
          Aparece pros clientes na hora de escolher o profissional.
        </p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="mt-1.5 text-xs font-medium text-[#18181B] underline-offset-2 hover:underline disabled:opacity-50"
        >
          {photo ? 'Trocar foto' : 'Adicionar foto'}
        </button>
        {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={onPick} className="hidden" />

      {cropSrc && (
        <ImageCropper src={cropSrc} busy={uploading} onCancel={() => setCropSrc(null)} onConfirm={onCropped} />
      )}
    </div>
  )
}
