"use client"

import { motion, useInView } from "framer-motion"
import { 
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Check,
  TrendingUp,
  Calendar,
  Users,
  DollarSign
} from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "primereact/button"
import { ImageCompareDemo } from "./imageCompareDemo"

// Screenshots do sistema
const screenshots = [
  {
    title: "Dashboard Completo",
    description: "Visão 360º do seu negócio em tempo real com métricas de agendamentos, faturamento e performance",
    image: "/Dashboard_dark.png",
    module: "Dashboard",
    color: "#db6f57"
  },
  {
    title: "Agenda Inteligente",
    description: "Visualize agendamentos em calendário, horário ou kanban. Arraste e solte para reagendar",
    image: "/dashboard_light.png",
    module: "Agendamentos",
    color: "#4f6f64"
  },
  {
    title: "Gestão de Clientes",
    description: "Histórico completo, preferências, aniversários e programa de fidelidade automático",
    image: "/Dashboard_dark.png",
    module: "Clientes",
    color: "#8b3d35"
  },
  {
    title: "Controle Financeiro",
    description: "Caixa, contas a pagar e receber, comissões e relatórios fiscais em um só lugar",
    image: "/dashboard_light.png",
    module: "Financeiro",
    color: "#db6f57"
  }
]

// Comparação antes vs depois
const beforeAfter = {
  before: {
    title: "Sem o Bellory",
    problems: [
      { icon: X, text: "Agenda de papel bagunçada", color: "#d15847" },
      { icon: X, text: "40% dos clientes não comparecem", color: "#d15847" },
      { icon: X, text: "10h/semana em tarefas manuais", color: "#d15847" },
      { icon: X, text: "Sem controle financeiro real", color: "#d15847" },
      { icon: X, text: "Clientes ligam fora do horário", color: "#d15847" },
      { icon: X, text: "Erros em comissões causam conflitos", color: "#d15847" }
    ]
  },
  after: {
    title: "Com o Bellory",
    benefits: [
      { icon: Check, text: "Tudo organizado digitalmente", color: "#5a7a6e" },
      { icon: Check, text: "Apenas 8% de faltas com lembretes", color: "#5a7a6e" },
      { icon: Check, text: "Automação poupa 10h/semana", color: "#5a7a6e" },
      { icon: Check, text: "Visão completa em tempo real", color: "#5a7a6e" },
      { icon: Check, text: "Agendamento automático 24/7", color: "#5a7a6e" },
      { icon: Check, text: "Cálculo automático de comissões", color: "#5a7a6e" }
    ]
  }
}

export function DemoSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section 
      ref={sectionRef}
      id="demonstracao" 
      className="py-32 relative overflow-hidden bg-gradient-to-b from-[#faf8f6] via-[#e6d9d4]/20 to-[#faf8f6]"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#db6f57]/10 to-[#8b3d35]/10 border border-[#db6f57]/20 mb-8">
            <Monitor className="w-5 h-5 text-[#db6f57]" />
            <span className="font-bold text-[#8b3d35] uppercase tracking-wide text-sm">
              Veja o Bellory em ação
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#2a2420] leading-[1.1]">
            Interface{" "}
            <span className="bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent">
              intuitiva e poderosa
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#4f6f64] leading-relaxed">
            Design moderno e fácil de usar.{" "}
            <span className="text-[#8b3d35] font-semibold">
              Desenvolvido para você economizar tempo
            </span>.
          </p>
        </motion.div>

        {/* Comparação de Temas (já existente do ImageCompareDemo) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-32"
        >
          <ImageCompareDemo />
        </motion.div>

        {/* Carrossel de Screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-6xl mx-auto mb-32"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#d8ccc4] shadow-2xl bg-white">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={screenshots[currentIndex].image}
              alt={screenshots[currentIndex].title}
              className="w-full aspect-video object-cover"
            />
            
            {/* Overlay com informações */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2a2420]/90 to-transparent p-8">
              <div className="max-w-3xl">
                <div 
                  className="inline-block px-4 py-2 rounded-full text-white font-bold text-sm mb-3"
                  style={{ backgroundColor: screenshots[currentIndex].color }}
                >
                  {screenshots[currentIndex].module}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {screenshots[currentIndex].title}
                </h3>
                <p className="text-white/80 text-lg">
                  {screenshots[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Controles de navegação */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#2a2420]" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#2a2420]" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[#db6f57]' 
                    : 'w-2 bg-[#d8ccc4] hover:bg-[#db6f57]/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Antes vs Depois */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#2a2420] mb-4">
              Veja a <span className="text-[#db6f57]">transformação</span>
            </h3>
            <p className="text-xl text-[#4f6f64]">
              Compare como era antes e como fica depois do Bellory
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Antes */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#d8ccc4]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-6 h-6 text-[#d15847]" />
                </div>
                <h4 className="text-2xl font-bold text-[#2a2420]">{beforeAfter.before.title}</h4>
              </div>
              <ul className="space-y-4">
                {beforeAfter.before.problems.map((problem, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <problem.icon 
                      className="w-5 h-5 mt-0.5 flex-shrink-0" 
                      style={{ color: problem.color }} 
                    />
                    <span className="text-[#4f6f64] leading-relaxed">{problem.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Depois */}
            <div className="bg-gradient-to-br from-[#4f6f64] to-[#3d574f] rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">{beforeAfter.after.title}</h4>
              </div>
              <ul className="space-y-4">
                {beforeAfter.after.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <benefit.icon 
                      className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" 
                    />
                    <span className="text-white/90 leading-relaxed">{benefit.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA para demonstração ao vivo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-10 bg-white rounded-3xl shadow-2xl border border-[#d8ccc4]">
            <div className="text-left">
              <h4 className="text-2xl sm:text-3xl font-bold text-[#2a2420] mb-2">
                Quer ver tudo funcionando ao vivo?
              </h4>
              <p className="text-[#4f6f64] text-lg">
                Agende uma demonstração personalizada de 15 minutos
              </p>
            </div>
            <Button
              label="Agendar demo"
              icon={<Play className="mr-2 w-5 h-5" />}
              iconPos="left"
              className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:scale-105 transition-all duration-300 px-10 py-4 rounded-xl font-bold shadow-lg whitespace-nowrap"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}