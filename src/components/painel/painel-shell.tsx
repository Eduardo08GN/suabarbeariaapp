'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Package,
  Users,
  Contact,
  CreditCard,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { NotificationSound } from '@/components/painel/notification-sound'

const navItems = [
  { href: '/painel', label: 'Painel', icon: LayoutDashboard },
  { href: '/painel/agenda', label: 'Agenda', icon: Calendar },
  { href: '/painel/servicos', label: 'Serviços', icon: Scissors },
  { href: '/painel/produtos', label: 'Produtos', icon: Package },
  { href: '/painel/equipe', label: 'Equipe', icon: Users },
  { href: '/painel/clientes', label: 'Clientes', icon: Contact },
  { href: '/painel/pagamentos', label: 'Pagamentos', icon: CreditCard },
]

export function PainelShell({
  logo,
  children,
}: {
  logo: string | null
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const active = (href: string) => {
    if (href === '/painel') return pathname === '/painel'
    return pathname.startsWith(href)
  }

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
      <NotificationSound />
      {/* === MOBILE HEADER (< lg) === */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#E4E4E7] bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="w-7 h-7 rounded-lg object-cover" />
          ) : (
            <div className="w-7 h-7 bg-[#18181B] rounded-lg flex items-center justify-center">
              <Scissors className="w-3.5 h-3.5 text-[#FAFAFA]" />
            </div>
          )}
          <span className="text-sm font-semibold text-[#09090B]">Painel do Administrador</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-[#71717A] hover:text-[#09090B]"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* === MOBILE BOTTOM TAB BAR (< lg) === */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-[#E4E4E7] bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] ${
                isActive ? 'text-[#18181B]' : 'text-[#A1A1AA]'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* === DESKTOP SIDEBAR (>= lg) === */}
      <aside className="fixed top-0 left-0 z-50 h-full w-[240px] bg-white border-r border-[#E4E4E7] flex-col hidden lg:flex">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[#E4E4E7]">
          <div className="flex items-center gap-3">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div className="w-8 h-8 bg-[#18181B] rounded-lg flex items-center justify-center">
                <Scissors className="w-4 h-4 text-[#FAFAFA]" />
              </div>
            )}
            <span className="font-semibold text-[#09090B] text-sm">Painel do Administrador</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F4F4F5] text-[#18181B]'
                    : 'text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#09090B]'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#E4E4E7]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#09090B] transition-colors w-full"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Sair
          </button>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <div className="lg:pl-[240px]">
        {/* Desktop TopBar (logout fica so na sidebar, evita "Sair" duplicado) */}
        <header className="h-16 bg-white border-b border-[#E4E4E7] items-center px-6 sticky top-0 z-30 hidden lg:flex">
          <h2 className="text-sm font-semibold text-[#09090B]">Painel</h2>
        </header>

        {/* Page content — pb-20 on mobile for bottom tab bar clearance */}
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">{children}</main>
      </div>
    </div>
  )
}
