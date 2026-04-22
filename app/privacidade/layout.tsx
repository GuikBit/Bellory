import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como o Bellory coleta, usa e protege os seus dados e os dos seus clientes. Conformidade total com a LGPD.",
  alternates: {
    canonical: "/privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacidadeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
