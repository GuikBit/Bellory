"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { EASE_OUT } from "./shared"

export function FeaturesCTA() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2a2420] via-[#2a2420] to-[#1a1510] py-24 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23db6f57' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.25) 0%, transparent 70%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,61,53,0.3) 0%, transparent 70%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[#db6f57] opacity-70" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
              Fim do índice
              <span className="mx-2 opacity-50">·</span>
              começo do seu
            </span>
            <span className="h-px w-10 bg-[#db6f57] opacity-70" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.02] tracking-tight mb-6">
            Pronto para virar
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #db6f57 0%, #e88c76 50%, #db6f57 100%)",
                backgroundSize: "200% auto",
              }}
            >
              a página?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#e6d9d4]/80 leading-relaxed max-w-2xl mx-auto font-light mb-10">
            14 dias grátis para conhecer tudo de perto. Sem cartão, sem
            compromisso — você decide se faz sentido.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/cadastro">
              <motion.button
                whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[15px] text-white overflow-hidden shadow-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                  boxShadow: "0 0 40px rgba(219,111,87,0.35)",
                }}
              >
                <Sparkles className="w-4 h-4" />
                Comece grátis por 14 dias
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  }}
                />
              </motion.button>
            </Link>
            <Link
              href="/agente-virtual"
              className="group inline-flex items-center gap-2 text-[#e6d9d4]/80 hover:text-white transition-colors font-medium text-[15px]"
            >
              Ver o agente de IA em ação
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-[#e6d9d4]/60 font-medium">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#db6f57]" />
              Sem cartão de crédito
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#db6f57]" />
              Setup em minutos
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#db6f57]" />
              Suporte em português
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#db6f57]" />
              LGPD 100%
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
