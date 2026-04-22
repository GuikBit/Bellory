"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturesHero } from "@/components/funcionalidades/FeaturesHero"
import { FeaturesCTA } from "@/components/funcionalidades/FeaturesCTA"
import { ChapterAgendamento } from "@/components/funcionalidades/ChapterAgendamento"
import { ChapterIA } from "@/components/funcionalidades/ChapterIA"
import { ChapterFinanceiro } from "@/components/funcionalidades/ChapterFinanceiro"
import { ChapterClientes } from "@/components/funcionalidades/ChapterClientes"
import { ChapterPresenca } from "@/components/funcionalidades/ChapterPresenca"
import { ChapterGestao } from "@/components/funcionalidades/ChapterGestao"
import { ChapterDots, type ChapterIndexItem } from "@/components/funcionalidades/shared"
import { SectionTransition } from "@/components/section-transitions"

const chapters: ChapterIndexItem[] = [
  { id: "agendamento", number: "01", label: "Agendamento", color: "#db6f57" },
  { id: "ia", number: "02", label: "Inteligência Artificial", color: "#4f6f64" },
  { id: "financeiro", number: "03", label: "Financeiro", color: "#8b3d35" },
  { id: "clientes", number: "04", label: "Clientes", color: "#db6f57" },
  { id: "presenca", number: "05", label: "Presença Digital", color: "#4f6f64" },
  { id: "gestao", number: "06", label: "Gestão", color: "#8b3d35" },
]

export default function FuncionalidadesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf8f6]">
      <Header isMenu={true} isCadastro={true} />
      <ChapterDots chapters={chapters} />

      <FeaturesHero chapters={chapters} />
      <ChapterAgendamento />
      <ChapterIA />
      <ChapterFinanceiro />
      <ChapterClientes />
      <ChapterPresenca />
      <ChapterGestao />
      <FeaturesCTA />

      <SectionTransition variant="peaks" colorFrom="#1B1611" colorTo="#F3EEEA" accentColor="#db6f57" />
      
      <Footer />
    </main>
  )
}
