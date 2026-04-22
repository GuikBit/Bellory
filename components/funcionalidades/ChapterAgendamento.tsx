"use client"

import { motion, useReducedMotion } from "framer-motion"
import { BellRing, Clock, Users, Calendar, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {
  ChapterMeta,
  ChapterShell,
  FeatureBullet,
  NumeralBackdrop,
  Reveal,
  EASE_OUT,
} from "./shared"

const COLOR = "#db6f57"

interface Appointment {
  day: number // 0-5 (Seg..Sáb)
  startRow: number // 1-based from 09:00
  span: number
  service: string
  client: string
  tone: "primary" | "secondary" | "muted"
}

const appointments: Appointment[] = [
  { day: 0, startRow: 1, span: 2, service: "Corte", client: "Ana R.", tone: "primary" },
  { day: 1, startRow: 5, span: 2, service: "Barba", client: "Lucas", tone: "muted" },
  { day: 2, startRow: 1, span: 3, service: "Progressiva", client: "Marina", tone: "primary" },
  { day: 3, startRow: 2, span: 2, service: "Manicure", client: "Júlia", tone: "secondary" },
  { day: 4, startRow: 4, span: 2, service: "Hidratação", client: "Paula", tone: "muted" },
  { day: 5, startRow: 2, span: 3, service: "Corte + Barba", client: "Rodrigo", tone: "primary" },
]

const toneStyles = {
  primary: {
    bg: "#db6f57",
    border: "#c55a42",
    text: "#ffffff",
  },
  secondary: {
    bg: "#e88c76",
    border: "#db6f57",
    text: "#ffffff",
  },
  muted: {
    bg: "#4f6f64",
    border: "#3d5850",
    text: "#ffffff",
  },
} as const

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const dates = [13, 14, 15, 16, 17, 18]
const hours = ["09h", "10h", "11h", "12h", "13h", "14h"]

function CalendarMockup() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
      className="relative"
    >
      {/* Card shadow layer */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[28px] blur-2xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(219,111,87,0.25), transparent 70%)",
        }}
      />

      <div
        className="relative rounded-3xl bg-white border overflow-hidden"
        style={{
          borderColor: "#e6d9d4",
          boxShadow:
            "0 30px 60px -20px rgba(42,36,32,0.18), 0 12px 24px -12px rgba(42,36,32,0.08)",
        }}
      >
        {/* Mockup chrome */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e8e3] bg-[#fafaf8]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#db6f57]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e88c76]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f6f64]/40" />
            </div>
            <span className="text-[11px] text-[#5a4a42]/60 font-medium ml-2">
              Agenda · Bellory
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#5a4a42]/40">
            agenda.bellory
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-[#f0e8e3]">
          <div className="flex items-center gap-3">
            <button
              aria-label="Mês anterior"
              className="w-7 h-7 rounded-lg border border-[#e6d9d4] bg-white hover:bg-[#faf8f6] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#5a4a42]" />
            </button>
            <span className="font-serif text-lg md:text-xl font-bold text-[#2a2420]">
              Maio 2026
            </span>
            <button
              aria-label="Próximo mês"
              className="w-7 h-7 rounded-lg border border-[#e6d9d4] bg-white hover:bg-[#faf8f6] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 text-[#5a4a42]" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#faf8f6] border border-[#e6d9d4]">
              <span className="text-[10px] font-semibold text-[#5a4a42]/70">
                SEMANA
              </span>
            </div>
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-semibold text-xs shadow-sm"
              style={{
                background:
                  "linear-gradient(90deg, #db6f57 0%, #c55a42 100%)",
              }}
            >
              <Plus className="w-3 h-3" />
              Novo
            </button>
          </div>
        </div>

        {/* Week grid */}
        <div className="relative">
          {/* Day header */}
          <div className="grid grid-cols-[48px_repeat(6,1fr)] border-b border-[#f0e8e3]">
            <div />
            {days.map((d, idx) => {
              const isToday = idx === 2
              return (
                <div
                  key={d}
                  className="py-3 text-center border-l border-[#f0e8e3] relative"
                >
                  <div className="text-[10px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold">
                    {d}
                  </div>
                  <div
                    className={`font-serif text-lg md:text-xl font-bold mt-0.5 ${
                      isToday ? "text-[#db6f57]" : "text-[#2a2420]"
                    }`}
                  >
                    {dates[idx]}
                  </div>
                  {isToday && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-[#db6f57]"
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Hour rows */}
          <div className="relative">
            {hours.map((h, hIdx) => (
              <div
                key={h}
                className="grid grid-cols-[48px_repeat(6,1fr)] border-b border-[#f5edea] last:border-b-0"
                style={{ minHeight: 44 }}
              >
                <div className="flex items-start justify-end pr-2 pt-1.5">
                  <span className="text-[10px] font-mono text-[#5a4a42]/40 font-medium">
                    {h}
                  </span>
                </div>
                {days.map((d, dIdx) => (
                  <div
                    key={`${d}-${hIdx}`}
                    className="border-l border-[#f5edea] relative"
                  />
                ))}
              </div>
            ))}

            {/* Appointment blocks absolutely positioned over the grid */}
            <div className="absolute inset-0 grid grid-cols-[48px_repeat(6,1fr)] pointer-events-none">
              <div />
              {days.map((d, dIdx) => {
                const slots = appointments.filter((a) => a.day === dIdx)
                return (
                  <div key={d} className="relative border-l border-transparent">
                    {slots.map((apt, i) => {
                      const top = (apt.startRow - 1) * 44 + 3
                      const height = apt.span * 44 - 6
                      const styles = toneStyles[apt.tone]
                      return (
                        <motion.div
                          key={`${dIdx}-${i}`}
                          initial={{ opacity: 0, scale: 0.9, y: 6 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{
                            duration: 0.45,
                            delay: 0.5 + i * 0.08,
                            ease: EASE_OUT,
                          }}
                          className="absolute left-1 right-1 rounded-lg px-2 py-1.5 pointer-events-auto cursor-default overflow-hidden"
                          style={{
                            top,
                            height,
                            backgroundColor: styles.bg,
                            borderLeft: `3px solid ${styles.border}`,
                            color: styles.text,
                          }}
                        >
                          <div className="text-[10px] font-bold leading-tight truncate">
                            {apt.service}
                          </div>
                          <div className="text-[9px] opacity-80 leading-tight truncate">
                            {apt.client}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            {/* "Now" line indicator */}
            <motion.div
              aria-hidden
              className="absolute left-12 right-0 pointer-events-none"
              style={{ top: 44 * 2 + 20 }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 1, ease: EASE_OUT }}
            >
              <div className="relative h-px bg-[#db6f57]">
                <span className="absolute left-0 -top-[3px] w-[7px] h-[7px] rounded-full bg-[#db6f57] shadow-[0_0_0_3px_rgba(219,111,87,0.2)]" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer: waitlist tag */}
        <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-[#f0e8e3] bg-[#fafaf8]">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-5 h-5 rounded-full bg-[#db6f57] border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                M
              </div>
              <div className="w-5 h-5 rounded-full bg-[#4f6f64] border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                R
              </div>
              <div className="w-5 h-5 rounded-full bg-[#8b3d35] border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                +3
              </div>
            </div>
            <span className="text-[11px] text-[#5a4a42]/70 font-medium">
              <span className="font-bold text-[#db6f57]">5</span> na lista de
              espera
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-[#4f6f64] animate-pulse"
            />
            <span className="text-[10px] text-[#5a4a42]/60 font-medium">
              Sincronizando
            </span>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 3 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 1.1, ease: EASE_OUT }}
        className="absolute -bottom-6 -right-3 md:-right-6 bg-white rounded-2xl px-4 py-3 border border-[#e6d9d4]"
        style={{
          boxShadow: "0 16px 40px -12px rgba(42,36,32,0.18)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#db6f57]/10 flex items-center justify-center">
            <BellRing className="w-4 h-4 text-[#db6f57]" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold">
              Lembrete enviado
            </div>
            <div className="text-[11px] font-bold text-[#2a2420]">
              Ana R. · 24h antes
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ChapterAgendamento() {
  return (
    <ChapterShell id="agendamento" bg="#faf8f6" color={COLOR}>
      <motion.div
        aria-hidden
        className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.14), transparent 65%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: copy + features */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-14 -left-4 hidden md:block">
              <NumeralBackdrop number="01" color={COLOR} />
            </div>

            <div className="relative">
              <Reveal>
                <ChapterMeta number="01" label="Agendamento" color={COLOR} />
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-serif text-[38px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.02] mt-6 mb-5">
                  A agenda que
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${COLOR} 0%, #8b3d35 100%)`,
                    }}
                  >
                    nunca fecha.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed mb-10 max-w-md">
                  Seus clientes marcam horário pelo WhatsApp, pelo seu site ou
                  pelo aplicativo — às 3 da manhã de um domingo, se quiserem.
                  Você só aparece para o atendimento.
                </p>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.3}>
                  <FeatureBullet
                    icon={Calendar}
                    title="Agenda online 24/7"
                    description="Cliente escolhe serviço, profissional e horário a qualquer momento. Sem telefone, sem direct bagunçado."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <FeatureBullet
                    icon={BellRing}
                    title="Lembretes que reduzem faltas"
                    description="Confirmação com 1 toque 24h antes. Quem usa Bellory vê até 40% menos no-shows no primeiro mês."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.5}>
                  <FeatureBullet
                    icon={Users}
                    title="Lista de espera inteligente"
                    description="Quando abre vaga, o próximo da fila é avisado automaticamente. Nenhum horário fica vazio à toa."
                    color={COLOR}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.6}>
                <div className="mt-10 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-[#db6f57]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Economia média: 6h / semana</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: calendar mockup */}
          <div className="lg:col-span-7">
            <CalendarMockup />
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
