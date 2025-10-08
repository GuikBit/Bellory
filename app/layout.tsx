import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

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
  title: "Bellory - Sistema de Gestão para Barbearias, Salões e Clínicas de Estética",
  description:
    "Plataforma completa de gestão para barbearias, salões de beleza e clínicas de estética. Gerencie agendamentos, clientes, funcionários, serviços e financeiro com personalização total.",
  keywords:
    "sistema para barbearias, sistema para salões de beleza, software de estética, agenda online para salão, gestão de barbearia, sistema de agendamento",
  authors: [{ name: "Bellory" }],
  openGraph: {
    title: "Bellory - Sistema de Gestão para Barbearias e Salões",
    description: "Transforme a gestão do seu negócio com o Bellory",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
