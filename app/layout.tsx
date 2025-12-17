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
  title: "Bellory",
  description:
    "Plataforma completa de gestão para barbearias, salões de beleza e clínicas de estética. Gerencie agendamentos, clientes, funcionários, serviços e financeiro com personalização total.",
  keywords:
    "sistema para barbearias, sistema para salões de beleza, software de estética, agenda online para negócio, gestão de barbearia, sistema de agendamento",
  authors: [{ name: "Bellory" }],
  openGraph: {
    title: "Bellory - Sistema de Gestão para o seu negócio",
    description: "Transforme a gestão do seu negócio com o Bellory",
    type: "website",
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-accent scrollbar-track-transparent`}>
      <body className="font-sans antialiased ">
        <Suspense fallback={<div>Loading...</div>}>
          <ReactQueryProvider>
            <PrimeProvider>
              {children}
            </PrimeProvider>
          </ReactQueryProvider>                  
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
