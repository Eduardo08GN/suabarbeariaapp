'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Scissors } from 'lucide-react'
import Image from 'next/image'

export default function MasterLayout({ children }: { children: React.ReactNode }) {
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
    <div className="min-h-dvh bg-[#FAFAFA]">
      {/* TopBar */}
      <header className="h-14 bg-[#18181B] flex items-center px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
            <Scissors className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">
            SuaBarbeariaApp
          </span>
          <span className="text-xs text-white/50 hidden sm:inline">Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </header>

      {/* Content */}
      <main className="p-4 lg:p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  )
}