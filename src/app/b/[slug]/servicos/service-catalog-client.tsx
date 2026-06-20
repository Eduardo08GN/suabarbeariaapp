'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ServiceCard } from '@/components/booking/ServiceCard'

interface ServiceItem {
  id: string
  name: string
  description: string | null
  price: number
  durationMin: number
  category: string | null
}

interface Section {
  category: string
  label: string
  services: ServiceItem[]
}

interface ServiceCatalogClientProps {
  slug: string
  sections: Section[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

export function ServiceCatalogClient({
  slug,
  sections,
}: ServiceCatalogClientProps) {
  const router = useRouter()

  const handleSelect = (serviceId: string) => {
    router.push(`/b/${slug}/barbeiro?serviceId=${serviceId}`)
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-(--text)">Escolha o servico</h2>
        <p className="text-sm text-(--text-secondary) mt-1">
          Selecione o servico desejado para continuar
        </p>
      </div>

      {sections.map((section) => (
        <div key={section.category}>
          <h3 className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider mb-3">
            {section.label}
          </h3>
          <motion.div
            className="space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {section.services.map((service) => (
              <motion.div key={service.id} variants={item}>
                <ServiceCard
                  {...service}
                  category={service.category || undefined}
                  onClick={() => handleSelect(service.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}