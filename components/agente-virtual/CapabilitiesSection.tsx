"use client"

import { motion, useInView } from "framer-motion"
import {
  CalendarClock,
  CalendarPlus,
  CalendarX,
  CheckCircle2,
  History,
  RefreshCw,
  Search,
  UserSearch,
} from "lucide-react"
import { useRef } from "react"

const capabilities = [
  {
    icon: UserSearch,
    title: "Identifica o cliente",
    description:
      "Pelo número do WhatsApp, reconhece quem está falando em segundos.",
  },
  {
    icon: History,
    title: "Busca histórico",
    description:
      "Puxa agendamentos anteriores, serviços preferidos e profissional favorito.",
  },
  {
    icon: Search,
    title: "Detecta intenção",
    description:
      "Nas primeiras mensagens entende se é agendamento, dúvida ou cancelamento.",
  },
  {
    icon: CalendarPlus,
    title: "Realiza agendamento",
    description:
      "Consulta a agenda real, sugere horários e fecha o agendamento pelo cliente.",
  },
  {
    icon: CheckCircle2,
    title: "Confirma agendamento",
    description:
      "Envia mensagem antes do horário e atualiza o status conforme a resposta.",
  },
  {
    icon: CalendarClock,
    title: "Lembra o cliente",
    description:
      "Manda um lembrete na hora certa para evitar esquecimentos e no-show.",
  },
  {
    icon: RefreshCw,
    title: "Reagenda quando preciso",
    description:
      "Se o cliente tem imprevisto, o agente encontra um novo horário que funciona.",
  },
  {
    icon: CalendarX,
    title: "Cancela com respeito",
    description:
      "Processa cancelamentos educadamente e libera o horário na sua agenda.",
  },
]

export function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-[#f3eeea]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f6f64' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-bold text-[#8b3d35] uppercase tracking-wider mb-4">
            O que o agente faz por você
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.08]">
            Oito superpoderes.{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              Um só agente.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a7d71] leading-relaxed">
            Tudo acontece em background, enquanto você toca o seu negócio.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.06 }}
                className="group bg-white rounded-2xl border border-[#d8ccc4] p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                style={{ boxShadow: "0 10px 15px -3px rgba(42,36,32,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-[#db6f57]/10 border border-[#db6f57]/20 group-hover:rotate-[-8deg] transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#db6f57]" />
                </div>
                <h3 className="text-sm font-semibold text-[#2a2420] mb-1.5 leading-snug">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#4f6f64] leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
