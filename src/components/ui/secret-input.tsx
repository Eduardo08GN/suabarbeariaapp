'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

/**
 * Input de campo secreto: mascarado por bolinhas (type=password) com um olhinho
 * pra revelar/ocultar o que foi digitado. Repassa qualquer prop e className do
 * input, então herda o estilo do campo onde é usado. O padding-direito é forçado
 * via style inline pra o texto nunca passar por baixo do olhinho.
 */
export function SecretInput({
  className = '',
  style,
  ...props
}: React.ComponentProps<'input'>) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative w-full">
      <input
        {...props}
        type={show ? 'text' : 'password'}
        className={className}
        style={{ paddingRight: '2.5rem', ...style }}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label={show ? 'Ocultar' : 'Mostrar'}
        onClick={() => setShow((s) => !s)}
        className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-[#A1A1AA] transition-colors hover:text-[#52525B] cursor-pointer"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}
