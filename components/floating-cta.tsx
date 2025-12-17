"use client"

import { motion, useInView } from "framer-motion"
import { 
  ArrowRight, 
  Check,
  Sparkles,
  Clock,
  Shield,
  TrendingUp
} from "lucide-react"
import { Button } from "primereact/button"
import Link from "next/link"
import { useRef } from "react"

const urgencyFeatures = [
  {
    icon: Check,
    text: "Sem cartão de crédito"
  },
  {
    icon: Check,
    text: "14 dias grátis"
  },
  {
    icon: Check,
    text: "Cancele quando quiser"
  },
  {
    icon: Check,
    text: "Suporte incluído"
  }
]

const quickWins = [
  {
    icon: Clock,
    title: "5 minutos",
    description: "Para começar"
  },
  {
    icon: TrendingUp,
    title: "1 dia",
    description: "Para ver resultados"
  },
  {
    icon: Shield,
    title: "0 risco",
    description: "Garantia total"
  }
]

export function FinalCTA() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-gradient-to-br from-[#2a2420] via-[#4f6f64] to-[#2a2420]"
    >
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Blobs animados */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#db6f57]/30 to-[#8b3d35]/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#4f6f64]/30 to-[#db6f57]/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-[#db6f57]" />
            <span className="text-white font-bold uppercase tracking-wide text-sm">
              Oferta Especial - Tempo Limitado
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
          >
            Pronto para transformar{" "}
            <span className="bg-gradient-to-r from-[#db6f57] via-[#e88c76] to-[#db6f57] bg-clip-text text-transparent">
              seu salão
            </span>?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Junte-se a mais de <span className="text-white font-bold">500 estabelecimentos</span> que já automatizaram sua gestão e{" "}
            <span className="text-[#db6f57] font-bold">aumentaram o faturamento em até 35%</span>
          </motion.p>

          {/* Quick wins */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
          >
            {quickWins.map((win, index) => (
              <div 
                key={win.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-[#db6f57]/20 flex items-center justify-center mx-auto mb-4">
                  <win.icon className="w-6 h-6 text-[#db6f57]" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{win.title}</div>
                <div className="text-sm text-white/70">{win.description}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/cadastro" className="w-full sm:w-auto">
              <Button
                label="Começar grátis agora"
                icon={<ArrowRight className="ml-3 w-6 h-6" />}
                iconPos="right"
                className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:shadow-2xl text-lg px-12 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-110"
              />
            </Link>
            <Button
              label="Falar com especialista"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white hover:text-[#2a2420] text-lg px-12 py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
              outlined
            />
          </motion.div>

          {/* Urgency features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 text-white/80"
          >
            {urgencyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className="w-5 h-5 text-[#5a7a6e]" />
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Testemunho rápido */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-6 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#db6f57] to-[#8b3d35] flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">MS</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-lg">Mariana Silva</div>
                <div className="text-white/60">Espaço Beleza Premium • São Paulo, SP</div>
              </div>
            </div>
            <p className="text-white/80 text-lg italic leading-relaxed">
              "Em 3 meses com o Bellory, aumentamos nosso faturamento em 42% e economizamos mais de 10 horas por semana. O agente virtual no WhatsApp sozinho já vale o investimento!"
            </p>
            <div className="flex gap-4 mt-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5a7a6e]">+42%</div>
                <div className="text-sm text-white/60">Faturamento</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5a7a6e]">10h/sem</div>
                <div className="text-sm text-white/60">Economizadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5a7a6e]">-38%</div>
                <div className="text-sm text-white/60">Faltas</div>
              </div>
            </div>
          </motion.div>

          {/* Urgência final */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 text-white/60 text-sm"
          >
            <p>⏰ Promoção válida apenas para os <span className="text-[#db6f57] font-bold">primeiros 50 cadastros</span> deste mês</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}