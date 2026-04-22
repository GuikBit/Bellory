import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Regras de uso da plataforma Bellory: cadastro, planos, pagamento, cancelamento e responsabilidades.",
  alternates: {
    canonical: "/termos",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
