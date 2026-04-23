"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  DollarSign,
  PieChart,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Download,
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

const kpis = [
  {
    label: "Faturamento",
    value: "R$ 28.450",
    delta: "+12,4%",
    sub: "vs. março",
  },
  {
    label: "Atendimentos",
    value: "342",
    delta: "+8,1%",
    sub: "342 concluídos",
  },
  {
    label: "Ticket médio",
    value: "R$ 83,20",
    delta: "+4,3%",
    sub: "por atendimento",
  },
]

const chartData = [
  { label: "Sem 1", v: 38 },
  { label: "Sem 2", v: 52 },
  { label: "Sem 3", v: 44 },
  { label: "Sem 4", v: 68 },
  { label: "Sem 5", v: 72 },
  { label: "Sem 6", v: 58 },
  { label: "Sem 7", v: 84 },
]

const commissions = [
  { name: "Paulo Mendes", role: "Cabelereiro", value: 4820, pct: 72 },
  { name: "Marina Silva", role: "Nail Designer", value: 3290, pct: 54 },
  { name: "Lucas Oliveira", role: "Barbeiro", value: 2140, pct: 38 },
]

function DashboardMockup() {
  const prefersReduced = useReducedMotion()
  const chartMax = Math.max(...chartData.map((d) => d.v))
  const chartHeight = 120
  const chartWidth = 320
  const points = chartData
    .map((d, i) => {
      const x = (i / (chartData.length - 1)) * chartWidth
      const y = chartHeight - (d.v / 100) * chartHeight
      return `${x},${y}`
    })
    .join(" ")

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
        className="absolute -inset-4 rounded-[32px] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,61,53,0.22), transparent 70%)",
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
              Financeiro · Abril 2026
            </span>
          </div>
          <button className="inline-flex items-center gap-1.5 text-[10px] text-[#5a4a42]/70 font-semibold hover:text-[#db6f57] transition-colors">
            <Download className="w-3 h-3" />
            Exportar
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 space-y-5">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold mb-1">
                Painel executivo
              </div>
              <div className="font-serif text-xl font-bold text-[#2a2420]">
                Abril 2026
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold">
              {["Visão geral", "Comissões", "Fluxo"].map((t, idx) => (
                <button
                  key={t}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    idx === 0
                      ? "bg-[#2a2420] text-white"
                      : "text-[#5a4a42]/60 hover:bg-[#faf8f6]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2.5 md:gap-3">
            {kpis.map((kpi, i) => (
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
                className="rounded-xl border border-[#f0e8e3] bg-[#fafaf8] p-3"
              >
                <div className="text-[9px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold">
                  {kpi.label}
                </div>
                <div className="font-serif text-lg md:text-xl font-bold text-[#2a2420] mt-1 leading-tight tabular-nums">
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(79,111,100,0.12)",
                      color: "#4f6f64",
                    }}
                  >
                    <ArrowUpRight className="w-2.5 h-2.5" />
                    {kpi.delta}
                  </span>
                  <span className="text-[9px] text-[#5a4a42]/50">
                    {kpi.sub}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-[#f0e8e3] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#2a2420]">
                Receita semanal
              </span>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1 text-[#5a4a42]/70">
                  <span className="w-2 h-2 rounded-sm bg-[#db6f57]" />
                  2026
                </span>
                <span className="flex items-center gap-1 text-[#5a4a42]/40">
                  <span className="w-2 h-2 rounded-sm bg-[#d8ccc4]" />
                  2025
                </span>
              </div>
            </div>

            <div className="relative" style={{ height: chartHeight }}>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="revGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={ACCENT} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    x2={chartWidth}
                    y1={(chartHeight / 3) * i}
                    y2={(chartHeight / 3) * i}
                    stroke="#f0e8e3"
                    strokeDasharray="2 4"
                  />
                ))}
                {/* Area fill */}
                <motion.polyline
                  fill="url(#revGradient)"
                  stroke="none"
                  points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                {/* Line */}
                <motion.polyline
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1.4,
                    delay: 0.4,
                    ease: EASE_OUT,
                  }}
                />
                {/* Dots */}
                {chartData.map((d, i) => {
                  const x = (i / (chartData.length - 1)) * chartWidth
                  const y = chartHeight - (d.v / 100) * chartHeight
                  const isLast = i === chartData.length - 1
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isLast ? 5 : 3}
                      fill="white"
                      stroke={ACCENT}
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.3,
                        delay: 0.6 + i * 0.08,
                      }}
                    />
                  )
                })}
              </svg>
            </div>
            <div className="flex items-center justify-between mt-2 text-[9px] text-[#5a4a42]/40 font-medium">
              {chartData.map((d) => (
                <span key={d.label}>{d.label}</span>
              ))}
            </div>
          </div>

          {/* Commissions */}
          <div className="rounded-xl border border-[#f0e8e3] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#2a2420]">
                Comissões · top 3
              </span>
              <span className="text-[10px] text-[#5a4a42]/50 font-medium">
                Fechamento automático em 8 dias
              </span>
            </div>
            <div className="space-y-2.5">
              {commissions.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.1,
                    ease: EASE_OUT,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                        style={{
                          backgroundColor: i === 0 ? ACCENT : i === 1 ? "#4f6f64" : "#8b3d35",
                        }}
                      >
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#2a2420] leading-tight">
                          {c.name}
                        </div>
                        <div className="text-[9px] text-[#5a4a42]/60 leading-tight">
                          {c.role}
                        </div>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-bold text-[#2a2420] tabular-nums">
                      R$ {c.value.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#f0e8e3] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT}, ${COLOR})`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.pct}%` }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.9,
                        delay: 1 + i * 0.1,
                        ease: EASE_OUT,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ChapterFinanceiro() {
  return (
    <ChapterShell id="financeiro" bg="#faf8f6" color={COLOR}>
      <motion.div
        aria-hidden
        className="absolute top-20 -left-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,61,53,0.14), transparent 65%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: dashboard */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <DashboardMockup />
          </div>

          {/* Right: copy */}
          <div className="lg:col-span-5 relative lg:pt-8">
            <div className="absolute -top-20 right-0 hidden md:block">
              <NumeralBackdrop number="03" color={COLOR} />
            </div>

            <div className="relative">
              <Reveal>
                <ChapterMeta
                  number="03"
                  label="Gestão Financeira"
                  color={COLOR}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-serif text-[38px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.02] mt-6 mb-5">
                  Você manda
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${COLOR} 0%, ${ACCENT} 100%)`,
                    }}
                  >
                    no caixa.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed mb-10">
                  Receita por profissional, margem por serviço, comissões
                  calculadas sozinhas. Chega de anotar no caderno e fechar o
                  mês rezando pra dar certo.
                </p>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.3}>
                  <FeatureBullet
                    icon={DollarSign}
                    title="Caixa em tempo real"
                    description="Cada atendimento entra sozinho no caixa. Contas a pagar, receber e conciliação bancária tudo no mesmo painel."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <FeatureBullet
                    icon={CreditCard}
                    title="Comissão sem briga"
                    description="Percentual configurável por serviço e profissional. O sistema calcula, você só aprova. Zero disputa no fim do mês."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.5}>
                  <FeatureBullet
                    icon={TrendingUp}
                    title="Relatórios que falam"
                    description="Saiba qual serviço dá mais lucro, qual profissional tem maior ticket médio, onde você está perdendo dinheiro."
                    color={COLOR}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.6}>
                <div className="mt-10 flex items-center gap-3">
                  <PieChart className="w-4 h-4" style={{ color: COLOR }} />
                  <span
                    className="text-[11px] uppercase tracking-wider font-bold"
                    style={{ color: COLOR }}
                  >
                    Fechamento mensal em 3 cliques
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
