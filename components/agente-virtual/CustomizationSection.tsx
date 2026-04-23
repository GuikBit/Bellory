"use client"

import { motion, useInView } from "framer-motion"
import {
  BellRing,
  Hand,
  MessageSquareHeart,
  Palette,
  Timer,
} from "lucide-react"
import { useRef } from "react"

const customFeatures = [
  {
    icon: Palette,
    title: "Personalidade do agente",
    description:
      "Formal, descontraído, caloroso ou direto: você define o jeito de falar e o tom que combina com a marca do seu negócio.",
  },
  {
    icon: Hand,
    title: "Mensagem de saudação",
    description:
      "A primeira mensagem que todo cliente recebe, com o nome do salão, serviços em destaque e a assinatura do seu negócio.",
  },
  {
    icon: MessageSquareHeart,
    title: "Texto de confirmação",
    description:
      "Quando o agendamento fecha, o cliente recebe uma confirmação com todos os detalhes — do seu jeito, com suas palavras.",
  },
  {
    icon: BellRing,
    title: "Lembrete de agendamento",
    description:
      "Uma mensagem carinhosa algumas horas antes do horário, para garantir que o cliente não se esqueça.",
  },
]

const confirmationTimings = ["12h antes", "24h antes", "36h antes", "48h antes"]
const reminderTimings = ["1h antes", "2h antes", "3h antes", "6h antes"]

export function CustomizationSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-[#faf8f6]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23db6f57' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            100% customizável
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.08]">
            O agente fala com{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              a sua voz
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a7d71] leading-relaxed">
            Não é um chatbot genérico. Cada mensagem, cada tom, cada detalhe é
            moldado por você — do "bom dia" até o lembrete final.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
          {customFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                className="bg-white rounded-2xl border border-[#d8ccc4] p-6 hover:-translate-y-0.5 transition-transform duration-300"
                style={{ boxShadow: "0 10px 15px -3px rgba(42,36,32,0.05)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(219,111,87,0.7), rgba(197,90,66,1))",
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#2a2420] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#4f6f64] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="rounded-3xl p-6 md:p-10 border"
            style={{
              background: "linear-gradient(135deg, #ffffff, #f3eeea)",
              borderColor: "#d8ccc4",
              boxShadow: "0 10px 15px -3px rgba(42,36,32,0.05)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#4f6f64]/10 border border-[#4f6f64]/20 flex items-center justify-center">
                <Timer className="w-5 h-5 text-[#4f6f64]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a2420]">
                  Timings configuráveis por você
                </h3>
                <p className="text-sm text-[#4f6f64]">
                  Defina quando o cliente recebe cada tipo de mensagem
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-[#8b3d35] uppercase tracking-wider mb-3">
                  Confirmações
                </p>
                <div className="flex flex-wrap gap-2">
                  {confirmationTimings.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#db6f57]/10 border border-[#db6f57]/30 text-[#8b3d35] text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#4f6f64] mt-3 leading-relaxed">
                  Pergunta se o cliente vai manter o horário. A resposta já
                  atualiza o status no sistema.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#4f6f64] uppercase tracking-wider mb-3">
                  Lembretes
                </p>
                <div className="flex flex-wrap gap-2">
                  {reminderTimings.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4f6f64]/10 border border-[#4f6f64]/30 text-[#4f6f64] text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#4f6f64] mt-3 leading-relaxed">
                  Avisa o cliente de que o horário está chegando, com link para
                  cancelar ou reagendar se precisar.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
