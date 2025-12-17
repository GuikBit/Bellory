"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Users, Zap, Star } from "lucide-react"
import { Button } from "primereact/button"
import { ImageCompareDemo } from "./imageCompareDemo"
import Link from "next/link"
import { useRef } from "react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <>
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      {/* Background com gradiente orgânico */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f6] via-[#e6d9d4]/30 to-[#faf8f6]" />
      
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Blobs decorativos com gradientes */}
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#db6f57]/20 to-[#8b3d35]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-[#4f6f64]/20 to-[#db6f57]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity, scale, y }}
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Badge de destaque */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#db6f57]/10 via-[#8b3d35]/10 to-[#db6f57]/10 border border-[#db6f57]/20 backdrop-blur-sm shadow-lg">
              <Sparkles className="w-5 h-5 text-[#db6f57]" />
              <span className="text-sm font-semibold text-[#8b3d35] tracking-wide">
                Usado por +500 estabelecimentos no Brasil
              </span>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#4f6f64] border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-[#db6f57] border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-[#8b3d35] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                  +
                </div>
              </div>
            </div>
          </motion.div>

          {/* Headline principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] text-balance">
              <span className="text-[#2a2420]">Transforme seu negócio</span>
              <br />
              <span className="bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                em um império digital
              </span>
            </h1>
          </motion.div>

          {/* Subheadline com proposta de valor */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-xl sm:text-2xl text-[#4f6f64] text-balance max-w-4xl mx-auto mb-8 leading-relaxed font-light"
          >
            Gestão completa + site personalizado + agente de IA no WhatsApp.
            <br />
            <span className="text-[#8b3d35] font-medium">Tudo em uma única plataforma</span> para você focar no que importa: seus clientes.
          </motion.p>

          {/* Benefícios rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { icon: CheckCircle2, text: "40% menos faltas", color: "#4f6f64" },
              { icon: TrendingUp, text: "+35% de faturamento", color: "#db6f57" },
              { icon: Users, text: "Clientes mais fiéis", color: "#8b3d35" },
              { icon: Zap, text: "Economia de 10h/semana", color: "#4f6f64" },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-[#d8ccc4]"
              >
                <benefit.icon className="w-5 h-5" style={{ color: benefit.color }} />
                <span className="text-sm font-medium text-[#2a2420]">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs principais */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/cadastro" className="w-full sm:w-auto">
              <Button
                label="Comece grátis por 14 dias"
                icon={<ArrowRight className="ml-2 w-5 h-5" />}
                iconPos="right"
                className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:shadow-xl text-base px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              />
            </Link>
            
            <Button
              label="Agende uma demonstração"
              className="w-full sm:w-auto bg-white text-[#8b3d35] border-2 border-[#8b3d35] hover:bg-[#8b3d35] hover:text-white text-base px-10 py-4 rounded-xl font-semibold transition-all duration-300"
              outlined
            />
          </motion.div>

          {/* Prova social com avaliação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm text-[#4f6f64]"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#db6f57] text-[#db6f57]" />
                ))}
              </div>
              <span className="font-semibold text-[#2a2420]">4.9/5</span>
              <span>• 127 avaliações</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#4f6f64]" />
              <span>Sem cartão de crédito • Cancele quando quiser</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Adicione o CSS para animação do gradiente */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background com gradiente orgânico */}
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >

        
        <div className="max-w-7xl mx-auto">
                {/* Demo visual com comparação de temas */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative"
          >
            {/* Badge flutuante "Personalização Total" */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -left-60 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-[#d8ccc4] max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#db6f57] to-[#8b3d35] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2a2420] mb-1">Personalização Total</h3>
                    <p className="text-sm text-[#4f6f64] leading-relaxed">
                      Escolha o tema perfeito para sua marca. Do masculino moderno ao feminino elegante.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Badge flutuante "Agente de IA" */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute -right-40 top-1/3 z-10 hidden lg:block"
            >
              <div className="bg-gradient-to-br from-[#4f6f64] to-[#3d574f] rounded-2xl p-6 shadow-2xl max-w-xs text-white">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Agente de IA 24/7</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Atendimento automático no WhatsApp. Seus clientes podem agendar a qualquer hora.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <ImageCompareDemo />
          </motion.div>

          {/* Logos de clientes (opcional - adicione logos reais depois) */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 text-center"
          >
            <p className="text-sm font-medium text-[#4f6f64] mb-6 uppercase tracking-wider">
              Confiado por salões, barbearias e clínicas em todo Brasil
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="w-32 h-16 bg-[#d8ccc4] rounded-lg flex items-center justify-center text-[#4f6f64] text-xs font-semibold">
                Logo Cliente 1
              </div>
              <div className="w-32 h-16 bg-[#d8ccc4] rounded-lg flex items-center justify-center text-[#4f6f64] text-xs font-semibold">
                Logo Cliente 2
              </div>
              <div className="w-32 h-16 bg-[#d8ccc4] rounded-lg flex items-center justify-center text-[#4f6f64] text-xs font-semibold">
                Logo Cliente 3
              </div>
              <div className="w-32 h-16 bg-[#d8ccc4] rounded-lg flex items-center justify-center text-[#4f6f64] text-xs font-semibold">
                Logo Cliente 4
              </div>
            </div>
          </motion.div> */}
        </div>
      </motion.div>
    </section>

    </>
  )
}