"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Bot,
  MessageCircle,
  Brain,
  Shield,
  Check,
  CheckCheck,
  Sparkles,
  Mic,
  Camera,
  Smile,
  Paperclip,
} from "lucide-react"
import {
  ChapterMeta,
  ChapterShell,
  FeatureBullet,
  NumeralBackdrop,
  Reveal,
  EASE_OUT,
} from "./shared"

const COLOR = "#4f6f64"
const ACCENT = "#db6f57"

interface Message {
  from: "client" | "bot"
  text?: string
  time: string
  delay: number
  card?: {
    title: string
    sub: string
    meta: string
  }
  typing?: boolean
}

const conversation: Message[] = [
  {
    from: "client",
    text: "Oi, boa tarde! Consigo marcar um corte pra sexta à tarde? 🙏",
    time: "14:28",
    delay: 0.2,
  },
  {
    from: "bot",
    text: "Olá, Camila! Temos esses horários livres na sexta-feira, 24/04: 14h, 15h30 ou 17h. Algum deles funciona pra você?",
    time: "14:28",
    delay: 0.6,
  },
  {
    from: "client",
    text: "15h30 tá ótimo!",
    time: "14:29",
    delay: 1.0,
  },
  {
    from: "bot",
    text: "Confirmado ✨ Já te envio o lembrete 24h antes.",
    time: "14:29",
    delay: 1.4,
    card: {
      title: "Corte · Paulo Mendes",
      sub: "Sexta, 24/04 · 15h30",
      meta: "Salão Bellory · R. das Flores, 220",
    },
  },
]

function PhoneFrame() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
      className="relative mx-auto"
      style={{ maxWidth: 340 }}
    >
      {/* Ambient glow behind phone */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[3.5rem] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,111,100,0.28), transparent 70%)",
        }}
      />

      {/* Phone body */}
      <div
        className="relative rounded-[2.8rem] p-2 border"
        style={{
          backgroundColor: "#1a1510",
          borderColor: "#3d2e28",
          boxShadow:
            "0 40px 80px -24px rgba(42,36,32,0.4), 0 16px 32px -12px rgba(42,36,32,0.2)",
        }}
      >
        {/* Screen */}
        <div className="relative rounded-[2.3rem] overflow-hidden bg-[#ece5dd]">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-[#1a1510] z-30" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5 text-[10px] font-semibold text-[#2a2420]/70 bg-[#ece5dd]">
            <span>14:31</span>
            <div className="flex items-center gap-1">
              <span className="tracking-wider">●●●●</span>
              <span className="ml-1 text-[9px]">76%</span>
            </div>
          </div>

          {/* WA Header */}
          <div
            className="flex items-center gap-3 px-4 py-2.5"
            style={{ backgroundColor: "#075E54" }}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-serif text-sm font-bold text-white ring-2 ring-white/20">
              B
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-white leading-tight truncate">
                Bellory · Assistente
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/70 leading-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fd164]" />
                online
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-white/80" />
          </div>

          {/* Chat bg with subtle WA pattern */}
          <div
            className="relative min-h-[360px] px-3 py-4 space-y-2"
            style={{
              backgroundColor: "#ece5dd",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%234f6f64' fill-opacity='0.04'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  delay: msg.delay,
                  ease: EASE_OUT,
                }}
                className={`flex ${
                  msg.from === "client" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    msg.from === "client"
                      ? "rounded-tr-sm"
                      : "rounded-tl-sm"
                  }`}
                  style={{
                    backgroundColor:
                      msg.from === "client" ? "#dcf8c6" : "#ffffff",
                    boxShadow:
                      "0 1px 1px rgba(0,0,0,0.08), 0 1px 0.5px rgba(0,0,0,0.04)",
                  }}
                >
                  {msg.text && (
                    <p className="text-[12px] leading-[1.35] text-[#2a2420]">
                      {msg.text}
                    </p>
                  )}
                  {msg.card && (
                    <div
                      className="mt-2 rounded-lg p-2.5 border"
                      style={{
                        backgroundColor: "#fff7f4",
                        borderColor: "#f0d4ca",
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className="w-4 h-4 rounded flex items-center justify-center"
                          style={{ backgroundColor: ACCENT }}
                        >
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#db6f57]">
                          Confirmado
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-[#2a2420] leading-tight">
                        {msg.card.title}
                      </div>
                      <div className="text-[10px] text-[#5a4a42] mt-0.5">
                        {msg.card.sub}
                      </div>
                      <div className="text-[9px] text-[#5a4a42]/60 mt-1 pt-1 border-t border-[#f0d4ca]">
                        {msg.card.meta}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[9px] text-[#5a4a42]/50">
                      {msg.time}
                    </span>
                    {msg.from === "client" && (
                      <CheckCheck className="w-3 h-3 text-[#4fc3f7]" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 1.8, ease: EASE_OUT }}
              className="flex justify-start"
            >
              <div
                className="rounded-xl rounded-tl-sm px-3 py-2.5 bg-white flex items-center gap-1"
                style={{
                  boxShadow:
                    "0 1px 1px rgba(0,0,0,0.08), 0 1px 0.5px rgba(0,0,0,0.04)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#4f6f64]/60"
                    animate={
                      prefersReduced
                        ? undefined
                        : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Input bar */}
          <div
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            <div className="flex-1 flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
              <Smile className="w-3.5 h-3.5 text-[#5a4a42]/50" />
              <span className="text-[11px] text-[#5a4a42]/40 flex-1">
                Mensagem
              </span>
              <Paperclip className="w-3.5 h-3.5 text-[#5a4a42]/50" />
              <Camera className="w-3.5 h-3.5 text-[#5a4a42]/50" />
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#075E54" }}
            >
              <Mic className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ChapterIA() {
  return (
    <ChapterShell id="ia" bg="#f3eeea" color={COLOR}>
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,111,100,0.18), transparent 65%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.12), transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: phone */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <PhoneFrame />
          </div>

          {/* Right: copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="absolute -top-16 right-0 hidden md:block">
              <NumeralBackdrop number="02" color={COLOR} />
            </div>

            <div className="relative">
              <Reveal>
                <ChapterMeta
                  number="02"
                  label="Inteligência Artificial"
                  color={COLOR}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-serif text-[38px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.02] mt-6 mb-5">
                  Um funcionário
                  <br />
                  que{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${COLOR} 0%, #3d5850 100%)`,
                    }}
                  >
                    nunca dorme.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed mb-10 max-w-xl">
                  Nosso agente de IA atende pelo WhatsApp, entende áudios e
                  gírias, agenda, reagenda e sabe exatamente quando passar a
                  bola para você. Em português de verdade.
                </p>
              </Reveal>

              <div className="space-y-6 max-w-xl">
                <Reveal delay={0.3}>
                  <FeatureBullet
                    icon={MessageCircle}
                    title="Conversa humana, não robótica"
                    description="Entende contexto, áudios de WhatsApp, gírias regionais. Responde em menos de 5 segundos, 24 horas por dia."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <FeatureBullet
                    icon={Brain}
                    title="Agenda sozinho, do começo ao fim"
                    description="Consulta sua agenda ao vivo, sugere horários, confirma e envia o comprovante — sem você tocar no celular."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.5}>
                  <FeatureBullet
                    icon={Shield}
                    title="Passa a bola na hora certa"
                    description="Quando a conversa é delicada ou complexa, a IA transfere para você com todo o contexto da conversa preservado."
                    color={COLOR}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.6}>
                <div className="mt-10 inline-flex items-center gap-3 px-4 py-2.5 rounded-full border bg-white/70 backdrop-blur-sm"
                  style={{ borderColor: `${COLOR}30` }}
                >
                  <Bot className="w-4 h-4" style={{ color: COLOR }} />
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: COLOR }}
                  >
                    Em média, 72% dos agendamentos sem toque humano
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
