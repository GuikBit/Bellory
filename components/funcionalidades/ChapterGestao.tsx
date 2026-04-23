"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Briefcase,
  Scissors,
  Zap,
  TrendingUp,
  Activity,
} from "lucide-react"
import {
  ChapterMeta,
  ChapterShell,
  FeatureBullet,
  NumeralBackdrop,
  Reveal,
  EASE_OUT,
} from "./shared"

const COLOR = "#8b3d35"
const ACCENT = "#db6f57"
const SAGE = "#4f6f64"

const team = [
  {
    name: "Paulo M.",
    role: "Cabelereiro",
    stats: "28 atend. · 72% ocup.",
    commission: "70%",
    color: ACCENT,
    status: true,
  },
  {
    name: "Marina S.",
    role: "Nail Designer",
    stats: "22 atend. · 58% ocup.",
    commission: "55%",
    color: SAGE,
    status: true,
  },
  {
    name: "Lucas O.",
    role: "Barbeiro",
    stats: "14 atend. · 42% ocup.",
    commission: "40%",
    color: COLOR,
    status: false,
  },
]

const automations = [
  {
    title: "WhatsApp de aniversário",
    sub: "Dispara 1 dia antes · 15% off",
    active: true,
  },
  {
    title: "Cobrar feedback após atendimento",
    sub: "Envia 3h depois via WhatsApp",
    active: true,
  },
  {
    title: "Alertar estoque baixo",
    sub: "Quando produto passa de 5 unidades",
    active: true,
  },
  {
    title: "Reativar clientes dormentes",
    sub: "Sem visita há mais de 60 dias",
    active: false,
  },
]

function GestaoMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[32px] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,61,53,0.22), transparent 70%)",
        }}
      />

      {/* Main panel */}
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
              Painel · Operação
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-[#4f6f64] animate-pulse"
            />
            <span className="text-[10px] text-[#5a4a42]/60 font-medium">
              Ao vivo
            </span>
          </div>
        </div>

        {/* Content grid */}
        <div className="p-5 md:p-6 grid grid-cols-6 gap-4">
          {/* KPI strip */}
          <div className="col-span-6 grid grid-cols-3 gap-3">
            {[
              {
                label: "Ocupação",
                value: "87%",
                icon: Activity,
                color: ACCENT,
              },
              {
                label: "Tempo médio",
                value: "52 min",
                icon: Scissors,
                color: SAGE,
              },
              {
                label: "Horas poupadas",
                value: "12h30",
                icon: Zap,
                color: COLOR,
              },
            ].map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: EASE_OUT,
                  }}
                  className="relative rounded-xl border border-[#f0e8e3] bg-[#fafaf8] p-3 overflow-hidden"
                >
                  <div
                    className="absolute -right-2 -top-2 w-10 h-10 rounded-full blur-xl opacity-40"
                    style={{ backgroundColor: kpi.color }}
                  />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold">
                        {kpi.label}
                      </div>
                      <div className="font-serif text-lg md:text-xl font-bold text-[#2a2420] mt-1 tabular-nums">
                        {kpi.value}
                      </div>
                    </div>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${kpi.color}15`,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Team panel */}
          <div className="col-span-6 md:col-span-3 rounded-xl border border-[#f0e8e3] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#2a2420]">
                Equipe hoje
              </span>
              <span className="text-[10px] text-[#5a4a42]/50 font-medium">
                3 ativos · 1 folga
              </span>
            </div>
            <div className="space-y-2.5">
              {team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.08,
                    ease: EASE_OUT,
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#faf8f6] transition-colors"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-full text-[11px] font-bold text-white flex items-center justify-center"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{
                        backgroundColor: m.status ? "#4f6f64" : "#d8ccc4",
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-[#2a2420] leading-tight">
                      {m.name}
                    </div>
                    <div className="text-[9px] text-[#5a4a42]/60 leading-tight">
                      {m.stats}
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                    style={{
                      backgroundColor: `${m.color}12`,
                      color: m.color,
                    }}
                  >
                    {m.commission}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Automations panel */}
          <div className="col-span-6 md:col-span-3 rounded-xl border border-[#f0e8e3] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#db6f57]" />
                <span className="text-xs font-bold text-[#2a2420]">
                  Automações
                </span>
              </div>
              <span className="text-[10px] text-[#5a4a42]/50 font-medium">
                3 de 4 ativas
              </span>
            </div>
            <div className="space-y-2">
              {automations.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + i * 0.06,
                    ease: EASE_OUT,
                  }}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border ${
                    a.active
                      ? "border-[#4f6f64]/15 bg-[#4f6f64]/[0.03]"
                      : "border-[#e6d9d4] bg-[#fafaf8]"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-[10px] font-bold leading-tight ${
                        a.active ? "text-[#2a2420]" : "text-[#5a4a42]/60"
                      }`}
                    >
                      {a.title}
                    </div>
                    <div className="text-[9px] text-[#5a4a42]/55 leading-tight mt-0.5">
                      {a.sub}
                    </div>
                  </div>
                  {/* Toggle */}
                  <div
                    className="flex-shrink-0 w-7 h-4 rounded-full relative transition-colors"
                    style={{
                      backgroundColor: a.active
                        ? "#4f6f64"
                        : "#d8ccc4",
                    }}
                  >
                    <span
                      className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all"
                      style={{
                        left: a.active ? "calc(100% - 14px)" : "2px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating comparison badge */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: 4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 4 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE_OUT }}
        className="absolute -bottom-5 -left-3 md:-left-6 bg-white rounded-2xl px-4 py-3 border border-[#e6d9d4]"
        style={{
          boxShadow: "0 16px 40px -12px rgba(42,36,32,0.18)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #db6f57, #8b3d35)",
            }}
          >
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold leading-tight">
              vs. mês anterior
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-base font-bold text-[#db6f57] tabular-nums">
                +18%
              </span>
              <span className="text-[10px] text-[#5a4a42]/60 font-medium">
                de produtividade
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ChapterGestao() {
  return (
    <ChapterShell id="gestao" bg="#f3eeea" color={COLOR}>
      <motion.div
        aria-hidden
        className="absolute -top-16 -left-16 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,61,53,0.14), transparent 65%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-16 -left-4 hidden md:block">
              <NumeralBackdrop number="06" color={COLOR} />
            </div>

            <div className="relative">
              <Reveal>
                <ChapterMeta
                  number="06"
                  label="Gestão Administrativa"
                  color={COLOR}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-serif text-[38px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.02] mt-6 mb-5">
                  Você toca,
                  <br />
                  o sistema{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${COLOR} 0%, ${ACCENT} 100%)`,
                    }}
                  >
                    afina.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed mb-10">
                  Equipe, metas, automações e alertas inteligentes num painel
                  só. O trabalho repetitivo roda sozinho e sobra tempo pra
                  você decidir o que realmente importa.
                </p>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.3}>
                  <FeatureBullet
                    icon={BarChart3}
                    title="Painel que responde antes da pergunta"
                    description="KPIs ao vivo, ranking de profissionais, ocupação em tempo real e alertas quando algo sai do padrão."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <FeatureBullet
                    icon={Briefcase}
                    title="Time alinhado, sem reunião extra"
                    description="Metas individuais, horário de trabalho, férias e permissões por profissional. Todo mundo sabe o que fazer."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.5}>
                  <FeatureBullet
                    icon={Zap}
                    title="Automações que salvam a semana"
                    description="Aniversário, feedback, estoque, reativação — você ativa um gatilho e o Bellory toca o resto. Economia média: 10h por semana."
                    color={COLOR}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.6}>
                <div className="mt-10 flex items-center gap-3">
                  <Activity className="w-4 h-4" style={{ color: COLOR }} />
                  <span
                    className="text-[11px] uppercase tracking-wider font-bold"
                    style={{ color: COLOR }}
                  >
                    Operação no piloto automático
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: mockup */}
          <div className="lg:col-span-7">
            <GestaoMockup />
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
