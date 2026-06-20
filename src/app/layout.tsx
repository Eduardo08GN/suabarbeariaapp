export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { SWRegister } from '@/components/shared/sw-register'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SuaBarbeariaApp',
  description: 'Agende seu horário na barbearia',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SuaBarbeariaApp',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#18181B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} h-full`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-dvh flex flex-col font-sans antialiased">
        <SWRegister />
        {children}
      </body>
    </html>
  )
}