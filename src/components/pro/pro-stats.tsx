import { CalendarDays, CalendarCheck, Wallet } from 'lucide-react'

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

// Metricas do barbeiro logado (so os numeros DELE — escopadas no barberId da
// sessao no servidor). Comissao = servicos do mes x % do barbeiro.
export function ProStats({
  todayCount,
  monthCount,
  monthCommission,
}: {
  todayCount: number
  monthCount: number
  monthCommission: number
}) {
  return (
    <div className="mb-5 grid grid-cols-3 gap-2">
      <Card icon={<CalendarDays className="h-4 w-4 text-[#71717A]" />} label="Hoje" value={String(todayCount)} />
      <Card icon={<CalendarCheck className="h-4 w-4 text-[#71717A]" />} label="No mês" value={String(monthCount)} />
      <Card icon={<Wallet className="h-4 w-4 text-[#71717A]" />} label="Sua comissão" value={brl(monthCommission)} />
    </div>
  )
}

function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-[#E4E4E7] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-1.5 flex items-center gap-1.5">
        {icon}
        <span className="truncate text-[10px] font-medium uppercase tracking-wide text-[#71717A]">{label}</span>
      </div>
      <p className="truncate text-base font-bold text-[#09090B]">{value}</p>
    </div>
  )
}
