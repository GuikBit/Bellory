"use client"

import { motion } from "framer-motion"
import {
  Users,
  Star,
  Target,
  FileText,
  Gift,
  Heart,
  Phone,
  Mail,
  Cake,
} from "lucide-react"
import {
  ChapterMeta,
  ChapterShell,
  FeatureBullet,
  NumeralBackdrop,
  Reveal,
  EASE_OUT,
} from "./shared"

const COLOR = "#db6f57"
const DEEP = "#8b3d35"

const visitHistory = [
  { date: "18/04", service: "Corte + Hidratação", pro: "Paulo", filled: true },
  { date: "02/04", service: "Escova", pro: "Paulo", filled: true },
  { date: "20/03", service: "Coloração", pro: "Paulo", filled: true },
  { date: "06/03", service: "Hidratação", pro: "Marina", filled: true },
  { date: "22/02", service: "Corte", pro: "Paulo", filled: true },
  { date: "— prox.", service: "A agendar", pro: "", filled: false },
]

const tags = ["Paulo (fav.)", "Manhã", "Café s/ açúcar"]
const notes = ["Gestante · 2º trim.", "Alérgica a amônia"]

function ClientProfileMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1.2 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[32px] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(219,111,87,0.22), transparent 70%)",
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
        {/* Chrome */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0e8e3] bg-[#fafaf8]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#db6f57]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e88c76]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f6f64]/40" />
            </div>
            <span className="text-[11px] text-[#5a4a42]/60 font-medium ml-2">
              CRM · Perfil de cliente
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#5a4a42]/40">
            #CL-02487
          </span>
        </div>

        {/* Header */}
        <div
          className="relative px-5 md:px-6 py-6 border-b border-[#f0e8e3]"
          style={{
            background:
              "linear-gradient(135deg, #fff7f4 0%, #faf8f6 100%)",
          }}
        >
          {/* Crown corner */}
          <div className="absolute top-4 right-4">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background:
                  "linear-gradient(90deg, rgba(219,111,87,0.12), rgba(139,61,53,0.14))",
                color: DEEP,
                border: "1px solid rgba(139,61,53,0.25)",
              }}
            >
              <Star className="w-3 h-3 fill-[#db6f57] stroke-[#db6f57]" />
              Ouro
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-serif text-2xl md:text-3xl font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #db6f57 0%, #8b3d35 100%)",
                }}
              >
                MC
              </div>
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f6f64]" />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2a2420] leading-tight">
                Mariana Costa
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-[#5a4a42]/70 mt-1">
                <span className="font-semibold">Cliente há 2 anos</span>
                <span className="opacity-50">·</span>
                <span>47 visitas</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: "rgba(219,111,87,0.1)",
                      color: "#8b3d35",
                      border: "1px solid rgba(219,111,87,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-[#e6d9d4]/50">
            {[
              { icon: Phone, text: "(11) 9xxxx-2134" },
              { icon: Mail, text: "mariana@...com" },
              { icon: Cake, text: "18 de julho" },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="flex items-center gap-1.5 min-w-0">
                  <Icon className="w-3 h-3 text-[#db6f57] flex-shrink-0" />
                  <span className="text-[10px] text-[#5a4a42]/70 truncate">
                    {c.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="px-5 md:px-6 py-5 border-b border-[#f0e8e3]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#2a2420]">
              Histórico de visitas
            </span>
            <span className="text-[10px] text-[#5a4a42]/50">últimas 5</span>
          </div>
          <div className="relative">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-[#e6d9d4]" />
            <div className="space-y-2.5">
              {visitHistory.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.06,
                    ease: EASE_OUT,
                  }}
                  className="flex items-center gap-3 relative"
                >
                  <span
                    className="relative z-10 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: v.filled ? "#fff" : "#faf8f6",
                      border: `2px solid ${v.filled ? "#db6f57" : "#d8ccc4"}`,
                    }}
                  >
                    {v.filled && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#db6f57]" />
                    )}
                  </span>
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono font-bold text-[#5a4a42]/60 w-14 flex-shrink-0 tabular-nums">
                        {v.date}
                      </span>
                      <span
                        className={`text-[11px] font-semibold truncate ${
                          v.filled ? "text-[#2a2420]" : "text-[#5a4a42]/50 italic"
                        }`}
                      >
                        {v.service}
                      </span>
                    </div>
                    {v.pro && (
                      <span className="text-[10px] text-[#5a4a42]/50 ml-2 flex-shrink-0">
                        · {v.pro}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Loyalty */}
        <div className="px-5 md:px-6 py-5 border-b border-[#f0e8e3] bg-gradient-to-br from-[#fff7f4] to-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gift className="w-3.5 h-3.5 text-[#db6f57]" />
              <span className="text-xs font-bold text-[#2a2420]">
                Fidelidade Bellory
              </span>
            </div>
            <span className="font-serif text-base font-bold text-[#db6f57] tabular-nums">
              1.240 pts
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#f0e8e3] overflow-hidden mb-1.5">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #db6f57, #8b3d35)",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: "82%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.8, ease: EASE_OUT }}
            />
          </div>
          <div className="flex items-center justify-between text-[9px] font-semibold">
            <span className="text-[#5a4a42]/60">Ouro · nível atual</span>
            <span className="text-[#db6f57]">
              Próximo prêmio em 260 pts
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="px-5 md:px-6 py-4 bg-[#fafaf8]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-3 h-3 text-[#5a4a42]/60" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5a4a42]/60">
              Anotações pinadas
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {notes.map((n, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-1 rounded-md font-medium bg-white border border-[#e6d9d4] text-[#5a4a42]/80"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating action badge */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE_OUT }}
        className="absolute -top-5 -left-4 md:-left-6 bg-white rounded-2xl px-3.5 py-2.5 border border-[#e6d9d4] flex items-center gap-2"
        style={{
          boxShadow: "0 16px 40px -12px rgba(42,36,32,0.18)",
        }}
      >
        <div className="w-7 h-7 rounded-lg bg-[#4f6f64]/10 flex items-center justify-center">
          <Target className="w-3.5 h-3.5 text-[#4f6f64]" />
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold leading-tight">
            Reativação
          </div>
          <div className="text-[11px] font-bold text-[#2a2420] leading-tight">
            12 clientes dormentes
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ChapterClientes() {
  return (
    <ChapterShell id="clientes" bg="#f3eeea" color={COLOR}>
      <motion.div
        aria-hidden
        className="absolute -top-16 right-0 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.14), transparent 65%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-16 -left-4 hidden md:block">
              <NumeralBackdrop number="04" color={COLOR} />
            </div>

            <div className="relative">
              <Reveal>
                <ChapterMeta
                  number="04"
                  label="Gestão de Clientes"
                  color={COLOR}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-serif text-[38px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.02] mt-6 mb-5">
                  Cada cliente
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${COLOR} 0%, ${DEEP} 100%)`,
                    }}
                  >
                    uma história.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed mb-10">
                  Quem é, o que prefere, quanto gasta, há quanto tempo não
                  aparece. Um CRM pensado pra você lembrar do aniversário da
                  Mariana e voltar a ouvir o nome dela.
                </p>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.3}>
                  <FeatureBullet
                    icon={Users}
                    title="Ficha completa do cliente"
                    description="Histórico de atendimentos, preferências, alergias, anotações e tudo que você precisa lembrar — tudo no mesmo lugar."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <FeatureBullet
                    icon={Gift}
                    title="Fidelidade automática"
                    description="Pontos por atendimento, níveis Bronze/Prata/Ouro, recompensas configuráveis. O cliente recebe sozinho, você não precisa lembrar."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.5}>
                  <FeatureBullet
                    icon={Target}
                    title="Reativação com 1 clique"
                    description="Sumiu há mais de 60 dias? O Bellory identifica, a IA manda uma mensagem caprichada e traz de volta no piloto automático."
                    color={COLOR}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.6}>
                <div className="mt-10 flex items-center gap-3">
                  <Heart className="w-4 h-4" style={{ color: COLOR }} />
                  <span
                    className="text-[11px] uppercase tracking-wider font-bold"
                    style={{ color: COLOR }}
                  >
                    +38% de retorno médio no 1º trimestre
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: profile */}
          <div className="lg:col-span-7">
            <ClientProfileMockup />
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
