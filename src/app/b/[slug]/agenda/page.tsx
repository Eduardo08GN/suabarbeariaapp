'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { format, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker'
import { cn } from '@/lib/utils'
import { CalendarDays, Loader2 } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

export default function AgendaPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const serviceId = searchParams.get('serviceId')
  const barberId = searchParams.get('barberId')

  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)

  // Carrossel de datas: o card selecionado desliza pro centro, revelando os
  // dias vizinhos dos dois lados (senao o ultimo card visivel trava o acesso
  // aos dias seguintes). Scroll nativo suave, sem mexer no scroll vertical.
  const scrollRef = useRef<HTMLDivElement>(null)
  const dateRefs = useRef<(HTMLButtonElement | null)[]>([])
  const animRef = useRef<number | null>(null)

  const centerDate = useCallback((index: number, smooth = true) => {
    const container = scrollRef.current
    const card = dateRefs.current[index]
    if (!container || !card) return
    // Centralizacao 100% sob nosso controle. NAO usamos scroll suave nativo:
    // scrollTo({behavior:'smooth'}) e inconsistente neste container (medido ao
    // vivo: o scroll suave programatico simplesmente nao move). E offsetLeft
    // seria relativo ao <body> (container nao posicionado), errando ~274px.
    // Aqui: medimos o delta centro-do-card vs centro-do-container pelo
    // getBoundingClientRect (origem-independente) e animamos o scrollLeft via
    // requestAnimationFrame (easeOutCubic), com clamp nas pontas. Deterministico
    // e fluido — clicar num card de borda traz os vizinhos escondidos.
    const cardRect = card.getBoundingClientRect()
    const contRect = container.getBoundingClientRect()
    const delta =
      cardRect.left + cardRect.width / 2 - (contRect.left + contRect.width / 2)
    const max = container.scrollWidth - container.clientWidth
    const start = container.scrollLeft
    const target = Math.max(0, Math.min(max, start + delta))

    if (animRef.current !== null) cancelAnimationFrame(animRef.current)
    if (!smooth || Math.abs(target - start) < 1) {
      container.scrollLeft = target
      return
    }
    const duration = 320
    const ease = (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic
    let t0: number | null = null
    const stepFrame = (now: number) => {
      if (t0 === null) t0 = now
      const p = Math.min(1, (now - t0) / duration)
      container.scrollLeft = start + (target - start) * ease(p)
      if (p < 1) animRef.current = requestAnimationFrame(stepFrame)
      else animRef.current = null
    }
    animRef.current = requestAnimationFrame(stepFrame)
  }, [])

  // cancela uma animacao de centralizacao em voo ao desmontar
  useEffect(() => () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current) }, [])

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i)
    return {
      value: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEE', { locale: ptBR }),
      dayNumber: format(date, 'dd'),
      monthName: format(date, 'MMM', { locale: ptBR }),
      isToday: i === 0,
    }
  })

  const fetchSlots = useCallback(async (date: string) => {
    if (!barberId || !serviceId) return
    setLoading(true)
    setSelectedTime(null)
    try {
      const res = await fetch(
        `/api/barber/slots?barberId=${barberId}&serviceId=${serviceId}&date=${date}&tenantSlug=${slug}`
      )
      const data = await res.json()
      setSlots(data.slots || [])
    } catch {
      setSlots([])
    } finally {
      setLoading(false)
    }
  }, [barberId, serviceId, slug])

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      const firstDate = dates[0].value
      setSelectedDate(firstDate)
      fetchSlots(firstDate)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDateSelect = (date: string, index: number) => {
    setSelectedDate(date)
    fetchSlots(date)
    centerDate(index)
  }

  const handleContinue = () => {
    if (!selectedTime || !selectedDate) return
    router.push(
      `/b/${slug}/confirmar?serviceId=${serviceId}&barberId=${barberId}&date=${selectedDate}&time=${selectedTime}`
    )
  }

  return (
    <motion.div
      className="flex flex-col min-h-dvh"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="px-4 py-6 space-y-6 flex-1 pb-24">
        <div>
          <h2 className="text-xl font-bold text-(--text)">
            Escolha o horário
          </h2>
          <p className="text-sm text-(--text-secondary) mt-1">
            Selecione a data e o horário desejado
          </p>
        </div>

        {/* Date Picker - Horizontal Scroll with snap */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-(--text-secondary)" />
            <h3 className="text-sm font-semibold text-(--text)">Data</h3>
          </div>
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4"
          >
            {dates.map((date, i) => (
              <button
                key={date.value}
                ref={(el) => {
                  dateRefs.current[i] = el
                }}
                onClick={() => handleDateSelect(date.value, i)}
                className={cn(
                  'flex flex-col items-center gap-0.5 min-w-[56px] min-h-[72px] py-2.5 px-2 rounded-xl border text-center transition-all shrink-0',
                  date.value === selectedDate
                    ? 'bg-(--tenant-primary) text-white border-(--tenant-primary) shadow-sm'
                    : 'bg-(--bg-card) border-(--border) text-(--text) active:bg-(--bg-subtle)'
                )}
              >
                <span className="text-[10px] font-medium uppercase">
                  {date.dayName}
                </span>
                <span className="text-lg font-bold leading-none">
                  {date.dayNumber}
                </span>
                <span className="text-[10px] uppercase">{date.monthName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-(--tenant-primary)" />
            </div>
          ) : (
            <TimeSlotPicker
              slots={slots}
              selectedTime={selectedTime}
              onSelect={setSelectedTime}
            />
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 p-4 bg-white/95 backdrop-blur-sm border-t border-(--border) pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedTime}
            className="btn-primary w-full min-h-[48px]"
          >
            Continuar
          </button>
        </div>
      </div>
    </motion.div>
  )
}