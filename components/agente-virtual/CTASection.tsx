"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight, Bot, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#2a2420] to-[#1a1510]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* <motion.div
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(219,111,87,0.3), rgba(139,61,53,0.2))",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-0 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,211,102,0.22), rgba(18,140,126,0.18))",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      /> */}

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(37,211,102,0.12)",
              borderColor: "rgba(37,211,102,0.35)",
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
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Pronto para começar?
            </span>
          </div>

          <div
            className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #db6f57, #8b3d35)" }}
          >
            <Bot className="w-9 h-9 md:w-11 md:h-11 text-white" />
            <span
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#2a2420]"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
              }}
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1.08]">
            Pare de responder WhatsApp.{" "}
            <span className="bg-gradient-to-r from-[#db6f57] via-[#e88c76] to-[#db6f57] bg-clip-text text-transparent">
              Comece a atender clientes.
            </span>
          </h2>

          <p className="text-lg text-[#e6d9d4] mb-4 max-w-2xl mx-auto leading-relaxed">
            14 dias grátis para ver o agente virtual em ação no WhatsApp do seu
            negócio. Sem cartão de crédito, sem compromisso.
          </p>

          <p className="inline-flex items-center gap-2 text-sm font-medium mb-10 px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(37,211,102,0.10)", color: "#25D366" }}>
            <MessageCircle className="w-4 h-4" />
            Funciona no WhatsApp que seus clientes já usam
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cadastro">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-[0_0_30px_rgba(219,111,87,0.4)] transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                }}
              >
                Comece grátis por 14 dias
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <a
              href="#experimente"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
            >
              Testar o agente antes
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
