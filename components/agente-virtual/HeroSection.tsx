"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  Clock,
  MessageCircle,
  Shield,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const reduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#faf8f6]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23db6f57' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{
          background:
            // "linear-gradient(135deg, rgba(219,111,87,0.20), rgba(139,61,53,0.20))",
            "linear-gradient(135deg, rgba(37,211,102,0.18), rgba(18,140,126,0.16))",
        }}
        animate={
          reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* <motion.div
        className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,211,102,0.18), rgba(18,140,126,0.16))",
        }}
        animate={
          reduced ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      /> */}

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
            style={{
              backgroundColor: "rgba(37,211,102,0.10)",
              borderColor: "rgba(37,211,102,0.30)",
            }}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
              }}
            >
              <MessageCircle className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider">
              Agente de IA no WhatsApp
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] mb-6 leading-[1.08]">
            O{" "}
            <span className="bg-gradient-to-r from-[#25D366] to-[#128C7E] bg-clip-text text-transparent">
              WhatsApp
            </span>{" "}
            do seu negócio,{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent"
              style={{ backgroundSize: "200% auto" }}
              animate={reduced ? {} : { backgroundPosition: ["0% 50%", "200% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              finalmente no controle
            </motion.span>
          </h1>

          <p className="text-lg sm:text-xl text-[#5a7d71] leading-relaxed mb-8 max-w-2xl mx-auto">
            Enquanto você atende um cliente na cadeira, o agente virtual da
            Bellory responde, identifica, agenda, confirma e lembra — tudo pelo{" "}
            <strong className="text-[#2a2420]">seu próprio WhatsApp</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <a
              href="#experimente"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-[0_0_30px_rgba(219,111,87,0.4)] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Converse com o agente agora
            </a>
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-[#8b3d35] text-[#8b3d35] hover:bg-[#8b3d35] hover:text-white transition-colors duration-300"
            >
              Começar grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#5a7d71]">
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#db6f57]" />
              Responde em menos de 5s
            </span>
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Direto no seu WhatsApp, 24/7
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#db6f57]" />
              Conversa segura
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
