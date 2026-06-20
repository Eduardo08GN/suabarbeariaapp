'use client'

import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { Loader2, ZoomIn, ZoomOut, Crop } from 'lucide-react'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = () => res(img)
    img.onerror = () => rej(new Error('img'))
    img.src = src
  })
}

// Corta o quadrado escolhido e devolve um WebP (fallback JPEG) de no max 800px.
async function getCroppedBlob(src: string, area: Area): Promise<Blob> {
  const img = await loadImage(src)
  const out = Math.min(800, Math.round(area.width))
  const canvas = document.createElement('canvas')
  canvas.width = out
  canvas.height = out
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, out, out)
  const webp = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/webp', 0.82))
  return webp ?? (await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), 'image/jpeg', 0.85)))
}

interface Props {
  src: string
  busy?: boolean
  onCancel: () => void
  onConfirm: (blob: Blob) => void
}

export function ImageCropper({ src, busy, onCancel, onConfirm }: Props) {
  const [mounted, setMounted] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [area, setArea] = useState<Area | null>(null)
  const [working, setWorking] = useState(false)

  useEffect(() => setMounted(true), [])
  const onComplete = useCallback((_: Area, pixels: Area) => setArea(pixels), [])

  async function confirm() {
    if (!area) return
    setWorking(true)
    try {
      const blob = await getCroppedBlob(src, area)
      onConfirm(blob)
    } finally {
      setWorking(false)
    }
  }

  if (!mounted) return null
  const loading = working || busy

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={loading ? undefined : onCancel} />
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="px-5 pt-5 pb-3">
          <p className="text-sm font-semibold text-[#09090B]">Ajustar foto</p>
          <p className="text-xs text-[#71717A]">Arraste para posicionar e use o zoom.</p>
        </div>

        {/* Area do cropper (quadrada, cantos arredondados) */}
        <div className="px-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#18181B]">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onComplete}
            />
          </div>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-3 px-5 pt-4">
          <ZoomOut className="h-4 w-4 shrink-0 text-[#A1A1AA]" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[#E4E4E7] accent-[#18181B]"
          />
          <ZoomIn className="h-4 w-4 shrink-0 text-[#A1A1AA]" />
        </div>

        {/* Acoes */}
        <div className="flex items-center justify-end gap-2 px-5 py-5">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#71717A] transition-colors hover:text-[#09090B] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={confirm}
            disabled={loading || !area}
            className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#27272A] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crop className="h-4 w-4" />}
            Cortar e usar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
