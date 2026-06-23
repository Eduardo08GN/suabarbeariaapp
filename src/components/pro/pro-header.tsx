'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Scissors } from 'lucide-react'

export function ProHeader({
  shopName,
  barberName,
  logo,
}: {
  shopName: string
  barberName: string
  logo?: string | null
}) {
  const router = useRouter()

  const handleLogout = async () => {
    // logout real: o cookie e httpOnly, so o servidor consegue apaga-lo
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // mesmo se a chamada falhar, leva pro login
    }
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#E4E4E7] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-lg items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-8 w-8 shrink-0 rounded-lg object-cover" />
          ) : (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#18181B]">
              <Scissors className="h-4 w-4 text-[#FAFAFA]" />
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-[#09090B]">{shopName}</p>
            <p className="truncate text-xs leading-tight text-[#71717A]">Olá, {barberName}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          aria-label="Sair"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#71717A] transition-colors hover:bg-[#F4F4F5] hover:text-[#09090B]"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
