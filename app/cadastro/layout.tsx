import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cadastro - Comece Grátis",
  description:
    "Crie sua conta grátis no Bellory e comece a transformar a gestão do seu salão, barbearia ou clínica de estética. Cadastro rápido e fácil em poucos minutos.",
  keywords: [
    "cadastro bellory",
    "criar conta",
    "registro grátis",
    "teste grátis",
    "começar agora",
    "plano gratuito",
    "trial bellory",
    "cadastro salão"
  ],
  alternates: {
    canonical: '/cadastro',
  },
  openGraph: {
    title: "Cadastre-se no Bellory - Comece Grátis Agora",
    description: "Crie sua conta grátis e transforme a gestão do seu salão, barbearia ou clínica de estética com o Bellory.",
    url: 'https://bellory.com.br/cadastro',
    siteName: 'Bellory',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cadastre-se no Bellory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadastre-se no Bellory - Grátis',
    description: 'Comece agora a transformar a gestão do seu negócio',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
