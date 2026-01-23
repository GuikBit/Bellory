import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Bellory, a plataforma completa de gestão para salões, barbearias e clínicas de estética. Nossa história, valores, missão e visão de transformar o mercado da beleza.",
  keywords: [
    "sobre bellory",
    "quem somos",
    "história bellory",
    "valores empresa",
    "missão bellory",
    "visão bellory",
    "equipe bellory",
    "empresa de software para salões"
  ],
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: "Sobre a Bellory - Nossa História e Valores",
    description: "Conheça a história da Bellory e como estamos transformando a gestão de salões, barbearias e clínicas de estética no Brasil.",
    url: 'https://bellory.com.br/sobre',
    siteName: 'Bellory',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sobre a Bellory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre a Bellory - Nossa História',
    description: 'Conheça a história da Bellory e como transformamos a gestão de salões e barbearias',
    images: ['/og-image.png'],
  },
}

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
