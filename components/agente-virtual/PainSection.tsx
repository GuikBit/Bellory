"use client"

import { motion, useInView } from "framer-motion"
import {
  AlertTriangle,
  CalendarX,
  MessageSquareWarning,
  PhoneCall,
  ReceiptText,
  UserX,
} from "lucide-react"
import { useRef } from "react"

const pains = [
  {
    icon: MessageSquareWarning,
    title: "Dezenas de mensagens ao mesmo tempo",
    description:
      "Clientes mandando mensagem enquanto você está com a tesoura na mão. Alguém sempre fica esperando.",
  },
  {
    icon: ReceiptText,
    title: "Repetir preço toda hora",
    description:
      "A mesma pergunta sobre valor, horário, endereço e forma de pagamento se repete dez vezes por dia.",
  },
  {
    icon: CalendarX,
    title: "Revisar a agenda a cada 5 minutos",
    description:
      "Abrir o sistema, conferir o horário livre, voltar no WhatsApp, digitar a resposta. E de novo. E de novo.",
  },
  {
    icon: UserX,
    title: "Cliente que some por falta de resposta",
    description:
      "Quando você consegue responder, o cliente já marcou em outro lugar. Cada minuto de atraso é dinheiro perdido.",
  },
  {
    icon: PhoneCall,
    title: "Confirmação manual de cada horário",
    description:
      "Ligações e mensagens individuais no dia anterior para confirmar se o cliente vem. Um trabalho sem fim.",
  },
  {
    icon: AlertTriangle,
    title: "No-show que ninguém avisou",
    description:
      "O horário fica vazio porque o cliente não pôde vir e não teve como avisar de forma rápida.",
  },
]

export function PainSection() {
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            A realidade de quem atende no WhatsApp
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.08]">
            Você conhece{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              essa correria
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a7d71] leading-relaxed">
            O atendimento no WhatsApp é o maior gargalo de quem toca uma
            barbearia, salão ou clínica. A boa notícia: dá pra resolver.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pains.map((pain, index) => {
            const Icon = pain.icon
            return (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                className="group bg-white rounded-2xl border border-[#d8ccc4] p-6 hover:-translate-y-0.5 transition-all duration-300"
                style={{ boxShadow: "0 10px 15px -3px rgba(42,36,32,0.05)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-[#db6f57]/10 border border-[#db6f57]/20 group-hover:rotate-[-8deg] transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#db6f57]" />
                </div>
                <h3 className="text-base font-semibold text-[#2a2420] mb-2 leading-snug">
                  {pain.title}
                </h3>
                <p className="text-sm text-[#4f6f64] leading-relaxed">
                  {pain.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
