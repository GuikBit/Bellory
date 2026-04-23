"use client"

import { motion, useInView } from "framer-motion"
import {
  Brain,
  CalendarCheck2,
  MessageCircle,
  Sparkles,
  UserCheck,
} from "lucide-react"
import { useRef } from "react"

const TERRACOTTA = {
  gradient:
    "linear-gradient(135deg, rgba(219,111,87,0.9), rgba(139,61,53,0.9))",
  border: "rgba(232,140,118,0.5)",
  shadow: "0 10px 30px rgba(219,111,87,0.25)",
  numberColor: "#8b3d35",
  detailColor: "#db6f57",
}

const WHATSAPP = {
  gradient:
    "linear-gradient(135deg, rgba(37,211,102,0.95), rgba(18,140,126,0.95))",
  border: "rgba(37,211,102,0.5)",
  shadow: "0 10px 30px rgba(37,211,102,0.25)",
  numberColor: "#075E54",
  detailColor: "#25D366",
}

const steps = [
  {
    icon: MessageCircle,
    title: "Cliente manda mensagem no seu WhatsApp",
    description:
      "O agente está conectado ao WhatsApp do seu negócio. Toda mensagem que chega passa por ele, sem mudar o número que seu cliente já conhece.",
    detail: "Integração direta ao WhatsApp do estabelecimento",
    palette: WHATSAPP,
  },
  {
    icon: UserCheck,
    title: "Identifica o cliente pelo número",
    description:
      "Se já é cliente, o agente puxa o histórico de agendamentos, nome e preferências. Se é novo, inicia um cadastro leve no meio da conversa.",
    detail: "Cliente novo ou recorrente: reconhecido automaticamente",
    palette: TERRACOTTA,
  },
  {
    icon: Brain,
    title: "Entende a intenção nas primeiras mensagens",
    description:
      "Quer agendar? Quer cancelar? Quer saber preço? O agente identifica o caminho certo logo nas primeiras trocas de mensagem e segue com o cliente.",
    detail: "Agendar, confirmar, cancelar, reagendar ou tirar dúvida",
    palette: TERRACOTTA,
  },
  {
    icon: CalendarCheck2,
    title: "Conduz até o agendamento",
    description:
      "Checa a agenda real, sugere horários disponíveis, confirma o serviço e fecha o agendamento dentro do sistema — sem você precisar olhar.",
    detail: "Agendamento fechado dentro do seu sistema Bellory",
    palette: TERRACOTTA,
  },
  {
    icon: Sparkles,
    title: "Faz o acompanhamento no WhatsApp",
    description:
      "Confirmações antes do horário, lembretes na hora certa e reagendamento caso o cliente tenha algum imprevisto. Tudo pelo mesmo WhatsApp, sem intervenção manual.",
    detail: "Confirmação, lembrete e reagendamento automáticos",
    palette: WHATSAPP,
  },
]

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-[#2a2420]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* <motion.div
        className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(219,111,87,0.25), rgba(139,61,53,0.15))",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-bold text-[#db6f57] uppercase tracking-wider mb-4">
            Como funciona, na prática
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.08]">
            Do <em className="not-italic">“oi, tudo bem?”</em> até o{" "}
            <span className="bg-gradient-to-r from-[#db6f57] via-[#e88c76] to-[#db6f57] bg-clip-text text-transparent">
              horário agendado
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#e6d9d4] leading-relaxed">
            Cinco etapas que acontecem sozinhas, em segundos, enquanto você está
            ocupado com o cliente à sua frente.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-[27px] top-4 bottom-4 w-px md:left-[31px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(37,211,102,0.6) 0%, rgba(219,111,87,0.5) 50%, rgba(37,211,102,0.6) 100%)",
            }}
          />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex gap-5 md:gap-6"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border relative z-10"
                      style={{
                        background: step.palette.gradient,
                        borderColor: step.palette.border,
                        boxShadow: step.palette.shadow,
                      }}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold z-20 border border-[#e6d9d4]"
                      style={{ color: step.palette.numberColor }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div
                    className="flex-1 rounded-2xl p-5 md:p-6 border"
                    style={{
                      backgroundColor: "rgba(61,46,40,0.6)",
                      borderColor: "rgba(232,217,212,0.12)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#e6d9d4] leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-2 text-xs font-medium"
                      style={{ color: step.palette.detailColor }}
                    >
                      <Sparkles className="w-3 h-3" />
                      {step.detail}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
