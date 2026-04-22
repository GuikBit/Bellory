"use client"

import { motion, useInView } from "framer-motion"
import {
  Ban,
  Bell,
  CheckCircle2,
  CreditCard,
  MessageSquare,
  RefreshCw,
  UserPlus,
} from "lucide-react"
import { useRef } from "react"

const statusFlow = [
  {
    label: "Cliente confirma o horário",
    from: "Agendado",
    to: "Confirmado",
    icon: CheckCircle2,
    color: "#4f6f64",
    tone: "rgba(79,111,100,0.12)",
  },
  {
    label: "Cliente pede para cancelar",
    from: "Agendado",
    to: "Cancelado",
    icon: Ban,
    color: "#8b3d35",
    tone: "rgba(139,61,53,0.12)",
  },
  {
    label: "Cliente tem imprevisto",
    from: "Agendado",
    to: "Reagendado",
    icon: RefreshCw,
    color: "#db6f57",
    tone: "rgba(219,111,87,0.12)",
  },
]

const managerEvents = [
  { icon: CheckCircle2, label: "Novo agendamento criado" },
  { icon: CreditCard, label: "Pagamento recebido" },
  { icon: UserPlus, label: "Cliente novo cadastrado" },
  { icon: RefreshCw, label: "Agendamento reagendado" },
  { icon: Ban, label: "Cancelamento registrado" },
  { icon: MessageSquare, label: "Mensagem precisa de atenção" },
]

export function AutoFlowSection() {
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f6f64' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            Tudo em sincronia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.08]">
            O agente conversa.{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              O sistema se atualiza sozinho.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a7d71] leading-relaxed">
            Cada resposta do cliente muda o status do agendamento e dispara uma
            notificação para o cliente e para você.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl p-6 md:p-8 bg-white border border-[#d8ccc4]"
            style={{ boxShadow: "0 10px 15px -3px rgba(42,36,32,0.05)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#db6f57]/10 border border-[#db6f57]/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-[#db6f57]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a2420]">
                  Status automático
                </h3>
                <p className="text-sm text-[#4f6f64]">
                  A resposta do cliente vira mudança de status
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {statusFlow.map((flow, index) => {
                const Icon = flow.icon
                return (
                  <motion.div
                    key={flow.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[#e6d9d4] bg-[#faf8f6]/60"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: flow.tone,
                        border: `1.5px solid ${flow.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: flow.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2a2420] mb-1 leading-tight">
                        {flow.label}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#4f6f64]">{flow.from}</span>
                        <span className="text-[#d8ccc4]">→</span>
                        <span
                          className="font-semibold"
                          style={{ color: flow.color }}
                        >
                          {flow.to}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#2a2420] to-[#1a1510] border border-[#3d2e28] text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#db6f57]/20 border border-[#db6f57]/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#db6f57]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Você fica sabendo de tudo
                </h3>
                <p className="text-sm text-[#e6d9d4]">
                  Gestor recebe notificação de cada ação importante
                </p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {managerEvents.map((event, index) => {
                const Icon = event.icon
                return (
                  <motion.li
                    key={event.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + index * 0.06 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(232,217,212,0.12)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-[#db6f57] flex-shrink-0" />
                    <span className="text-sm text-[#e6d9d4]">
                      {event.label}
                    </span>
                  </motion.li>
                )
              })}
            </ul>

            <p className="text-xs text-[#d8ccc4]/70 mt-5 leading-relaxed">
              E o cliente recebe a confirmação do agendamento na hora —
              independente de ter sido feito pelo agente ou pelo site.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
