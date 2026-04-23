"use client"

import { motion, useInView } from "framer-motion"
import { CheckCircle2, MessageCircle, Shield } from "lucide-react"
import { useRef } from "react"
import { AgenteChat } from "./chat"

const tryHighlights = [
  "Fale como falaria com sua recepção: sem roteiro",
  "Ele identifica sua intenção nas primeiras mensagens",
  "Responde sobre serviços, preços, horários e agenda",
  "Tudo em português natural, sem parecer robô",
]

export function TryLiveSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      id="experimente"
      className="relative py-20 md:py-28 overflow-hidden bg-[#faf8f6] scroll-mt-24"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f6f64' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,211,102,0.18), rgba(18,140,126,0.14))",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      /> */}
      <motion.div
        className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(219,111,87,0.14), rgba(139,61,53,0.12))",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                Teste ao vivo, como no WhatsApp
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-5 leading-[1.08]">
              Experimente agora.{" "}
              <span className="bg-gradient-to-r from-[#25D366] to-[#128C7E] bg-clip-text text-transparent">
                Sem compromisso.
              </span>
            </h2>

            <p className="text-lg text-[#5a7d71] leading-relaxed mb-7">
              Converse com o agente virtual como se fosse um cliente do seu
              negócio. A experiência é <strong className="text-[#128C7E]">idêntica
              à do WhatsApp</strong> que seus clientes já conhecem — só que
              quem responde é a IA.
            </p>

            <ul className="space-y-3 mb-7">
              {tryHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#2a2420]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="inline-flex items-center gap-2 text-xs text-[#5a7d71]">
              <Shield className="w-4 h-4" />
              Sua conversa é apenas uma demonstração. Nada é enviado a ninguém.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-3xl blur-2xl -z-10"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(37,211,102,0.22), transparent 70%)",
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden border"
              style={{
                borderColor: "rgba(18,140,126,0.25)",
                height: "640px",
                boxShadow:
                  "0 25px 60px rgba(18,140,126,0.18), 0 8px 24px rgba(42,36,32,0.10)",
              }}
            >
              <AgenteChat />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
