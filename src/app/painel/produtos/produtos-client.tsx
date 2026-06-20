'use client'

import { useState, useTransition } from 'react'
import { Plus, Pencil, Trash2, Check, Loader2, Package, X } from 'lucide-react'
import { salvarProduto, toggleProduto, deletarProduto, type ProdutoDTO } from '@/actions/produtos'

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

export function ProdutosClient({ initial }: { initial: ProdutoDTO[] }) {
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [pending, startTransition] = useTransition()
  const [busyRow, setBusyRow] = useState<string | null>(null)
  const [error, setError] = useState('')

  function reset() {
    setEditId(null)
    setName('')
    setPrice('')
    setDescription('')
    setError('')
  }

  function startEdit(p: ProdutoDTO) {
    setEditId(p.id)
    setName(p.name)
    setPrice(String(p.price))
    setDescription(p.description ?? '')
    setError('')
  }

  function salvar() {
    setError('')
    startTransition(async () => {
      const r = await salvarProduto({
        id: editId ?? undefined,
        name,
        price: Number(price.replace(',', '.')),
        description,
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
        <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
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
            placeholder="Preco (R$)"
            className={inputCls}
          />
        </div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descricao curta (opcional)"
          className={`${inputCls} mt-3`}
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={salvar}
            disabled={pending}
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
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#09090B]">{p.name}</p>
                {p.description && (
                  <p className="truncate text-xs text-[#71717A]">{p.description}</p>
                )}
              </div>
              <span className="shrink-0 text-sm font-semibold text-[#09090B]">{brl(p.price)}</span>

              {/* Toggle ativo (sem borda no controle) */}
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
    </div>
  )
}
