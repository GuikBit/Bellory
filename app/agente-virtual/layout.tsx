import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agente Virtual com IA - Atendimento Inteligente 24/7",
  description:
    "Conheça o agente virtual da Bellory com inteligência artificial. Atenda seus clientes automaticamente pelo WhatsApp, agende horários e responda dúvidas 24 horas por dia.",
  keywords: [
    "agente virtual",
    "inteligência artificial",
    "chatbot whatsapp",
    "atendimento automático",
    "IA para salão",
    "assistente virtual barbearia",
    "agendamento por whatsapp",
    "chatbot beleza",
    "automação atendimento",
    "agente IA bellory",
  ],
  alternates: {
    canonical: "/agente-virtual",
  },
  openGraph: {
    title: "Agente Virtual Bellory - IA que Atende seus Clientes 24/7",
    description:
      "Experimente o agente virtual com inteligência artificial da Bellory. Atendimento automático pelo WhatsApp, agendamentos e muito mais.",
    url: "https://bellory.com.br/agente-virtual",
    siteName: "Bellory",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/bellory2sfundo.svg",
        width: 1200,
        height: 630,
        alt: "Agente Virtual Bellory com Inteligência Artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agente Virtual Bellory - IA 24/7",
    description:
      "Atenda seus clientes automaticamente com inteligência artificial. Teste agora!",
    images: ["/bellory2sfundo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AgenteVirtualLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
