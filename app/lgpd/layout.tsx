import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Central de Privacidade · LGPD",
  description:
    "Central de Privacidade do Bellory: exerça seus direitos como titular de dados de forma simples, direta e em português.",
  alternates: {
    canonical: "/lgpd",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LgpdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
