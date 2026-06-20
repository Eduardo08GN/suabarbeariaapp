'use client'

import { useState, useRef, useTransition } from 'react'
import { Plus, Pencil, Trash2, Loader2, Package, X, ImageIcon, Camera } from 'lucide-react'
import { salvarProduto, toggleProduto, deletarProduto, type ProdutoDTO } from '@/actions/produtos'
import { ImageCropper } from '@/components/admin/ImageCropper'

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(fr.result as string)
    fr.onerror = () => rej(new Error('read'))
    fr.readAsDataURL(file)
  })
}

export function ProdutosClient({ initial }: { initial: ProdutoDTO[] }) {
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [cropSrc, setCropSrc] = useState<string | null>(null) // imagem crua no cropper
  const [uploading, setUploading] = useState(false)
  const [pending, startTransition] = useTransition()
  const [busyRow, setBusyRow] = useState<string | null>(null)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function reset() {
    setEditId(null)
    setName('')
    setPrice('')
    setDescription('')
    setImageUrl(null)
    setError('')
  }

  function startEdit(p: ProdutoDTO) {
    setEditId(p.id)
    setName(p.name)
    setPrice(String(p.price))
    setDescription(p.description ?? '')
    setImageUrl(p.imageUrl)
    setError('')
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite re-selecionar o mesmo arquivo
    if (!file) return
    setError('')
    try {
      setCropSrc(await readAsDataUrl(file))
    } catch {
      setError('Não foi possível abrir a imagem.')
    }
  }

  async function onCropped(blob: Blob) {
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', blob, 'produto')
      const res = await fetch('/api/painel/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setImageUrl(data.url)
        setCropSrc(null)
      } else {
        setError(data.error || 'Falha ao enviar a imagem.')
      }
    } catch {
      setError('Não foi possível enviar a imagem.')
    } finally {
      setUploading(false)
    }
  }

  function salvar() {
    setError('')
    startTransition(async () => {
      const r = await salvarProduto({
        id: editId ?? undefined,
        name,
        price: Number(price.replace(',', '.')),
        description,
        imageUrl,
      })
      if ('error' in r) setError(r.error)
      else reset()
    })
  }

  function onToggle(id: string) {
    setBusyRow(id)
    startTransition(async () => {
      await toggleProduto(id)
      setBusyRow(null)
    })
  }

  function onDelete(id: string) {
    setBusyRow(id)
    startTransition(async () => {
      await deletarProduto(id)
      if (editId === id) reset()
      setBusyRow(null)
    })
  }

  const inputCls =
    'w-full rounded-lg border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#09090B] outline-none transition-colors duration-150 placeholder:text-[#A1A1AA] focus:border-[#18181B]'

  return (
    <div className="mt-6 space-y-6">
      {/* Form de adicionar / editar */}
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="mb-4 text-sm font-medium text-[#09090B]">
          {editId ? 'Editar produto' : 'Novo produto'}
        </p>

        <div className="flex gap-4">
          {/* Foto (placeholder premium, quadrado e arredondado) */}
          <div className="shrink-0">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label="Adicionar foto do produto"
              className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-[#F4F4F5] ring-1 ring-inset ring-[#E4E4E7] transition-all hover:ring-[#18181B]"
            >
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#A1A1AA]" />
              ) : imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
                    <Camera className="h-5 w-5" />
                  </span>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1 text-[#A1A1AA]">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-[10px] font-medium">Foto</span>
                </div>
              )}
            </button>
            {imageUrl && !uploading && (
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="mt-1.5 block w-24 text-center text-[11px] text-[#71717A] transition-colors hover:text-red-600"
              >
                Remover
              </button>
            )}
          </div>

          {/* Campos */}
          <div className="min-w-0 flex-1 space-y-3">
            <div className="grid gap-3 sm:grid-cols-[1fr_130px]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome (ex.: Pomada modeladora)"
                className={inputCls}
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                placeholder="Preço (R$)"
                className={inputCls}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição curta (opcional)"
              className={inputCls}
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={salvar}
            disabled={pending || uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#27272A] disabled:opacity-50"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {editId ? 'Salvar' : 'Adicionar'}
          </button>
          {editId && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#71717A] transition-colors hover:text-[#09090B]"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Lista */}
      {initial.length === 0 ? (
        <div className="rounded-xl border border-[#E4E4E7] bg-white p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <Package className="mx-auto mb-3 h-9 w-9 text-[#D4D4D8]" />
          <p className="text-sm text-[#71717A]">Nenhum produto cadastrado ainda.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {initial.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 p-4 ${i > 0 ? 'border-t border-[#F4F4F5]' : ''} ${
                p.active ? '' : 'opacity-55'
              }`}
            >
              {/* Thumb (placeholder premium quadrado arredondado) */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F4F5] ring-1 ring-inset ring-[#E4E4E7]">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-[#A1A1AA]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#09090B]">{p.name}</p>
                {p.description && <p className="truncate text-xs text-[#71717A]">{p.description}</p>}
              </div>
              <span className="shrink-0 text-sm font-semibold text-[#09090B]">{brl(p.price)}</span>

              <button
                onClick={() => onToggle(p.id)}
                disabled={busyRow === p.id}
                role="switch"
                aria-checked={p.active}
                aria-label={p.active ? 'Ocultar do checkout' : 'Mostrar no checkout'}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  p.active ? 'bg-[#18181B]' : 'bg-[#D4D4D8]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                    p.active ? 'left-[1.125rem]' : 'left-0.5'
                  }`}
                />
              </button>

              <button
                onClick={() => startEdit(p)}
                aria-label="Editar"
                className="shrink-0 p-1.5 text-[#71717A] transition-colors hover:text-[#09090B]"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(p.id)}
                disabled={busyRow === p.id}
                aria-label="Excluir"
                className="shrink-0 p-1.5 text-[#71717A] transition-colors hover:text-red-600"
              >
                {busyRow === p.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {cropSrc && (
        <ImageCropper
          src={cropSrc}
          busy={uploading}
          onCancel={() => setCropSrc(null)}
          onConfirm={onCropped}
        />
      )}
    </div>
  )
}
