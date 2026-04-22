import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Funcionalidades - Tudo que seu Negócio Precisa",
  description:
    "Conheça todas as funcionalidades do Bellory: agendamento inteligente, IA para WhatsApp, gestão financeira, CRM, presença digital e muito mais. Tudo em uma só plataforma.",
  keywords: [
    "funcionalidades bellory",
    "agendamento online",
    "inteligência artificial salão",
    "gestão financeira barbearia",
    "CRM clientes estética",
    "site para salão",
    "sistema gestão beleza",
    "automação atendimento",
    "agente virtual whatsapp",
    "controle financeiro salão",
  ],
  alternates: {
    canonical: "/funcionalidades",
  },
  openGraph: {
    title: "Funcionalidades do Bellory - Gestão Completa para seu Negócio",
    description:
      "Agendamento, IA, financeiro, CRM, presença digital e gestão administrativa. Descubra como o Bellory transforma seu salão, barbearia ou clínica.",
    url: "https://bellory.com.br/funcionalidades",
    siteName: "Bellory",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/bellory2sfundo.svg",
        width: 1200,
        height: 630,
        alt: "Funcionalidades do Bellory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Funcionalidades do Bellory",
    description:
      "Conheça todas as funcionalidades: agendamento, IA, financeiro, CRM e muito mais.",
    images: ["/bellory2sfundo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FuncionalidadesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
