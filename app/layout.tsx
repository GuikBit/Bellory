import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import './globals.css'; // Mantenha apenas esta importação de CSS
// import './theme.css'

import PrimeProvider from "@/components/PrimeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import { Loader2Icon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import StructuredData from "@/components/structured-data"
import { ThemeProvider } from "@/contexts/HeroThemeContext"
import { TrackingProvider } from "@/contexts/TrackingContext"
import { TrackingSetup } from "@/components/tracking"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bellory.com.br'),
  title: {
    default: "Bellory - Sistema de Gestão para Salões, Barbearias e Clínicas de Estética",
    template: "%s | Bellory"
  },
  description:
    "Plataforma completa de gestão para barbearias, salões de beleza e clínicas de estética. Gerencie agendamentos, clientes, funcionários, serviços e financeiro com personalização total.",
  keywords: [
    "sistema para barbearias",
    "sistema para salões de beleza",
    "software de estética",
    "agenda online",
    "gestão de barbearia",
    "sistema de agendamento",
    "software para salão de beleza",
    "gestão de clínica de estética",
    "agendamento online",
    "sistema para barbershop",
    "ERP para salão",
    "controle financeiro salão",
    "agenda para barbearia",
    "software gestão beleza"
  ],
  authors: [{ name: "Bellory" }],
  creator: "Bellory",
  publisher: "Bellory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "GaRq4KadKmbKwHQPZpC0fR3GvaT80d6nZnKh4KzOgF0",
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bellory - Sistema de Gestão para Salões, Barbearias e Clínicas",
    description: "Transforme a gestão do seu negócio com o Bellory. Agendamentos, clientes, financeiro e muito mais em uma única plataforma.",
    url: 'https://bellory.com.br',
    siteName: 'Bellory',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bellory - Sistema de Gestão para Salões e Barbearias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bellory - Sistema de Gestão para Salões e Barbearias',
    description: 'Transforme a gestão do seu negócio com o Bellory',
    images: ['/og-image.png'],
    creator: '@bellory',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-primary scrollbar-track-background`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased ">
        <Suspense fallback={<Spinner />}>
          <TrackingProvider>
            <TrackingSetup />
            <ThemeProvider>
              <ReactQueryProvider>
                <PrimeProvider>
                  {children}
                </PrimeProvider>
              </ReactQueryProvider>
            </ThemeProvider>
          </TrackingProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
