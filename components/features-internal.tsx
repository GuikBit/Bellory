"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Calendar,
  Users,
  Briefcase,
  Scissors,
  DollarSign,
  BarChart3,
  Clock,
  TrendingUp,
  Shield,
  Globe,
  ShoppingBag,
  Bot,
  ArrowRight,
  BellRing,
  MessageCircle,
  Brain,
  CreditCard,
  Gift,
  Target,
  Palette,
  Heart,
  Zap,
  Activity,
  Search,
  Sparkles,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect, useMemo } from "react"

// ─── Chapter data — mirrors /funcionalidades exactly ───
interface ChapterFeature {
  icon: LucideIcon
  title: string
}

interface ChapterPreview {
  id: string
  number: string
  label: string
  headlineA: string
  headlineB: string
  color: string
  features: ChapterFeature[]
  proof: { icon: LucideIcon; label: string }
}

const chapters: ChapterPreview[] = [
  {
    id: "agendamento",
    number: "01",
    label: "Agendamento",
    headlineA: "A agenda que",
    headlineB: "nunca fecha.",
    color: "#db6f57",
    features: [
      { icon: Calendar, title: "Agenda online 24/7" },
      { icon: BellRing, title: "Lembretes automáticos" },
      { icon: Users, title: "Lista de espera" },
    ],
    proof: { icon: Clock, label: "Economia de 6h por semana" },
  },
  {
    id: "ia",
    number: "02",
    label: "Inteligência Artificial",
    headlineA: "Um funcionário",
    headlineB: "que nunca dorme.",
    color: "#4f6f64",
    features: [
      { icon: MessageCircle, title: "Conversa humana de verdade" },
      { icon: Brain, title: "Agenda sozinho, do começo ao fim" },
      { icon: Shield, title: "Passa a bola na hora certa" },
    ],
    proof: { icon: Bot, label: "72% dos agendamentos sem você tocar" },
  },
  {
    id: "financeiro",
    number: "03",
    label: "Financeiro",
    headlineA: "Você manda",
    headlineB: "no caixa.",
    color: "#8b3d35",
    features: [
      { icon: DollarSign, title: "Caixa em tempo real" },
      { icon: CreditCard, title: "Comissão sem briga" },
      { icon: TrendingUp, title: "Relatórios que falam" },
    ],
    proof: { icon: BarChart3, label: "Fechamento mensal em 3 cliques" },
  },
  {
    id: "clientes",
    number: "04",
    label: "Clientes",
    headlineA: "Cada cliente,",
    headlineB: "uma história.",
    color: "#db6f57",
    features: [
      { icon: Users, title: "Ficha completa do cliente" },
      { icon: Gift, title: "Fidelidade automática" },
      { icon: Target, title: "Reativação com 1 clique" },
    ],
    proof: { icon: Heart, label: "+38% de retorno no 1º trimestre" },
  },
  {
    id: "presenca",
    number: "05",
    label: "Presença Digital",
    headlineA: "Seu salão no",
    headlineB: "Google em 10min.",
    color: "#4f6f64",
    features: [
      { icon: Globe, title: "Site com cara de quem investe" },
      { icon: Palette, title: "Catálogo sempre atualizado" },
      { icon: ShoppingBag, title: "Mini e-commerce integrado" },
    ],
    proof: { icon: Search, label: "SSL · domínio próprio · mobile-first" },
  },
  {
    id: "gestao",
    number: "06",
    label: "Gestão",
    headlineA: "Você toca,",
    headlineB: "o sistema afina.",
    color: "#8b3d35",
    features: [
      { icon: BarChart3, title: "Painel que responde antes" },
      { icon: Briefcase, title: "Time alinhado, sem reunião" },
      { icon: Zap, title: "Automações que salvam a semana" },
    ],
    proof: { icon: Activity, label: "Operação no piloto automático" },
  },
]

// ─── Connection line from card to center (preserved from original) ───
function ConnectionLine({
  from,
  to,
  color,
  index,
  isInView,
  prefersReduced,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  index: number
  isInView: boolean
  prefersReduced: boolean | null
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cp1x = from.x + dx * 0.5
  const cp1y = from.y
  const cp2x = to.x
  const cp2y = from.y + dy * 0.5
  const d = `M${from.x},${from.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${to.x},${to.y}`
  const pathId = `conn-line-${index}`

  return (
    <g>
      <motion.path
        id={pathId}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="5 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? {
                pathLength: 1,
                opacity: prefersReduced ? 0.25 : [0.18, 0.4, 0.18],
              }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 1.5, delay: 0.3 + index * 0.12, ease: "easeInOut" },
          opacity: prefersReduced
            ? { duration: 0.6, delay: 0.5 + index * 0.12 }
            : {
                duration: 4 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2 + index * 0.12,
              },
        }}
      />
      {!prefersReduced && isInView && (
        <circle r={3.5} fill={color} opacity={0.6}>
          <animateMotion
            dur={`${3 + index * 0.3}s`}
            begin={`${1 + index * 0.25}s`}
            repeatCount="indefinite"
            fill="freeze"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}
    </g>
  )
}

// ─── Compact feature row inside a chapter card ───
function CompactFeatureRow({
  icon: Icon,
  title,
  color,
  index,
  isInView,
}: {
  icon: LucideIcon
  title: string
  color: string
  index: number
  isInView: boolean
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ duration: 0.45, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 group/row"
    >
      <span
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/row:-rotate-6"
        style={{
          backgroundColor: `${color}12`,
          border: `1.5px solid ${color}25`,
        }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} />
      </span>
      <span className="text-[13px] md:text-[13.5px] font-semibold text-[#2a2420] leading-tight">
        {title}
      </span>
    </motion.li>
  )
}

// ─── Chapter preview card ───
function ChapterCard({
  chapter,
  index,
  isInView,
  position,
}: {
  chapter: ChapterPreview
  index: number
  isInView: boolean
  position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
}) {
  const ProofIcon = chapter.proof.icon
  const directionX = position.includes("left") ? -40 : position.includes("right") ? 40 : 0
  const directionY = position.includes("top") ? -30 : 30

  return (
    <motion.div
      initial={{ opacity: 0, x: directionX, y: directionY }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: directionX, y: directionY }
      }
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-full"
    >
      <Link href={`/funcionalidades#${chapter.id}`} className="block h-full">
        <article
          className="relative rounded-3xl border overflow-hidden transition-all duration-500 group-hover:-translate-y-1 h-full flex flex-col"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(12px)",
            borderColor: `${chapter.color}25`,
            boxShadow:
              "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at top right, ${chapter.color}10 0%, transparent 70%)`,
            }}
          />

          {/* Giant numeral backdrop */}
          <span
            aria-hidden
            className="absolute top-3 right-4 font-serif font-black leading-none tabular-nums select-none pointer-events-none"
            style={{
              fontSize: "clamp(64px, 8vw, 92px)",
              color: `${chapter.color}12`,
              letterSpacing: "-0.05em",
            }}
          >
            {chapter.number}
          </span>

          <div className="relative p-5 md:p-6 flex flex-col flex-1 z-10">
            {/* Meta label */}
            <div className="flex items-center gap-2.5 mb-4">
              <span
                aria-hidden
                className="h-px w-6"
                style={{ backgroundColor: chapter.color, opacity: 0.5 }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.28em] font-bold"
                style={{ color: chapter.color }}
              >
                Capítulo {chapter.number}
              </span>
            </div>

            {/* Serif headline */}
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2a2420] leading-[1.08] mb-2">
              {chapter.headlineA}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${chapter.color} 0%, #8b3d35 100%)`,
                }}
              >
                {chapter.headlineB}
              </span>
            </h3>

            {/* Label tagline under heading */}
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#5a4a42]/70 mb-5">
              {chapter.label}
            </p>

            {/* Feature list */}
            <ul className="space-y-2.5 mb-5 flex-1">
              {chapter.features.map((f, i) => (
                <CompactFeatureRow
                  key={f.title}
                  icon={f.icon}
                  title={f.title}
                  color={chapter.color}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </ul>

            {/* Proof + CTA */}
            <div
              className="pt-4 border-t"
              style={{ borderColor: `${chapter.color}18` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ProofIcon
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: chapter.color }}
                />
                <span
                  className="text-[11px] font-bold uppercase tracking-wider leading-tight"
                  style={{ color: chapter.color }}
                >
                  {chapter.proof.label}
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-all group-hover:gap-2"
                style={{ color: chapter.color }}
              >
                Ler capítulo
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* Bottom accent sweep */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
            style={{ backgroundColor: chapter.color }}
          />
        </article>
      </Link>
    </motion.div>
  )
}

// ─── Center logo with pulse rings (preserved) ───
function CenterLogo({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.5 }
      }
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
        style={{
          border: "2px solid rgba(219, 111, 87, 0.15)",
        }}
        animate={
          isInView
            ? { scale: [1, 1.25, 1], opacity: [0.45, 0, 0.45] }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
        style={{
          border: "2px solid rgba(79, 111, 100, 0.15)",
        }}
        animate={
          isInView
            ? { scale: [1, 1.4, 1], opacity: [0.35, 0, 0.35] }
            : {}
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />
      <motion.div
        className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full"
        style={{
          border: "1.5px solid rgba(139, 61, 53, 0.1)",
        }}
        animate={
          isInView
            ? { scale: [1, 1.55, 1], opacity: [0.3, 0, 0.3] }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <div
        className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #f3eeea 50%, #ffffff 100%)",
          border: "2px solid rgba(219, 111, 87, 0.25)",
          boxShadow:
            "0 10px 40px rgba(139, 61, 53, 0.12), 0 2px 12px rgba(42, 36, 32, 0.06)",
        }}
      >
        <Image
          src="/bellory2sfundo.svg"
          alt="Bellory"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>
    </motion.div>
  )
}

// ─── Connector lines — 6 points radiating to center ───
function ConnectorLines({
  isInView,
  containerSize,
  prefersReduced,
}: {
  isInView: boolean
  containerSize: { w: number; h: number }
  prefersReduced: boolean | null
}) {
  const { w, h } = containerSize
  const cx = w / 2
  const cy = h / 2

  // 3 columns × 2 rows — card centers computed as proportions of container
  const cardCenters = useMemo(() => {
    const colW = w / 3
    const rowOffset = h * 0.22
    const rowYTop = cy - rowOffset
    const rowYBottom = cy + rowOffset
    return [
      { x: colW * 0.5, y: rowYTop },
      { x: colW * 1.5, y: rowYTop },
      { x: colW * 2.5, y: rowYTop },
      { x: colW * 0.5, y: rowYBottom },
      { x: colW * 1.5, y: rowYBottom },
      { x: colW * 2.5, y: rowYBottom },
    ]
  }, [w, h, cy])

  const center = { x: cx, y: cy }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      {cardCenters.map((from, i) => (
        <ConnectionLine
          key={i}
          from={from}
          to={center}
          color={chapters[i].color}
          index={i}
          isInView={isInView}
          prefersReduced={prefersReduced}
        />
      ))}
    </svg>
  )
}

// ─── All-features CTA card — warm-dark editorial, mini TOC of 6 chapters ───
function AllFeaturesCard({
  isInView,
  prefersReduced,
}: {
  isInView: boolean
  prefersReduced: boolean | null
}) {
  const tocTiles = chapters.map((c, i) => {
    const icons: LucideIcon[] = [Calendar, Bot, DollarSign, Heart, Globe, BarChart3]
    return {
      id: c.id,
      number: c.number,
      label: c.label,
      color: c.color,
      icon: icons[i],
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20 md:mt-28 max-w-6xl mx-auto"
    >
      <div
        className="relative rounded-[28px] md:rounded-[36px] overflow-hidden border"
        style={{
          background:
            "linear-gradient(135deg, #2a2420 0%, #1f1a16 55%, #1a1510 100%)",
          borderColor: "#3d2e28",
          boxShadow:
            "0 40px 80px -24px rgba(42,36,32,0.45), 0 16px 32px -16px rgba(42,36,32,0.25)",
        }}
      >
        {/* Dot pattern overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23db6f57' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient glows */}
        <motion.div
          aria-hidden
          className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(219,111,87,0.22), transparent 65%)",
          }}
          animate={
            prefersReduced
              ? undefined
              : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-40 -left-16 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(139,61,53,0.28), transparent 65%)",
          }}
          animate={
            prefersReduced
              ? undefined
              : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
          }
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Giant background numeral — editorial watermark */}
        <span
          aria-hidden
          className="absolute -top-6 md:-top-10 right-4 md:right-8 font-serif font-black leading-none tabular-nums select-none pointer-events-none"
          style={{
            fontSize: "clamp(120px, 22vw, 240px)",
            color: "rgba(219,111,87,0.08)",
            letterSpacing: "-0.06em",
          }}
        >
          06
        </span>

        <div className="relative grid lg:grid-cols-12 gap-8 md:gap-10 p-7 md:p-10 lg:p-14">
          {/* Left: copy + CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <span aria-hidden className="h-px w-8 md:w-10 bg-[#db6f57] opacity-70" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                Manual completo
                <span className="mx-2 opacity-50">·</span>
                30+ funcionalidades
              </span>
            </div>

            <h3 className="font-serif text-[30px] sm:text-4xl lg:text-5xl xl:text-[54px] font-bold text-white leading-[1.04] tracking-tight mb-5">
              Cada peça do sistema,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #db6f57 0%, #e88c76 45%, #db6f57 100%)",
                  backgroundSize: "200% auto",
                }}
              >
                em detalhe.
              </span>
            </h3>

            <p className="text-[15px] md:text-base lg:text-lg text-[#e6d9d4]/75 leading-relaxed font-light max-w-xl mb-8">
              Um tour pelos seis capítulos do Bellory com mockups reais,
              exemplos em português e proof-points de quem já usa. Leia do
              começo ao fim ou pule direto para o que te interessa.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <Link href="/funcionalidades">
                <motion.span
                  whileHover={prefersReduced ? undefined : { scale: 1.035 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                  className="group/cta relative inline-flex items-center gap-2.5 px-6 md:px-7 py-3.5 md:py-4 rounded-xl font-bold text-[14px] md:text-[15px] text-white overflow-hidden shadow-2xl cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                    boxShadow: "0 0 40px rgba(219,111,87,0.35)",
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Ler o manual completo
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                    }}
                  />
                </motion.span>
              </Link>
              <Link
                href="/cadastro"
                className="group inline-flex items-center gap-2 text-[#e6d9d4]/80 hover:text-white transition-colors font-semibold text-[14px]"
              >
                Ou teste 14 dias grátis
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] md:text-[12px] text-[#e6d9d4]/75 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#db6f57]" />
                Mockups reais
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#db6f57]" />
                Sem cadastro pra ler
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#db6f57]" />
                8 min de leitura
              </span>
            </div>
          </div>

          {/* Right: mini TOC of 6 chapters */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-4 lg:justify-end">
              <LayoutGrid className="w-3.5 h-3.5 text-[#e6d9d4]/75" />
              <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#e6d9d4]/75">
                Índice · pule direto
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-2.5">
              {tocTiles.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: 1.1 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/funcionalidades#${t.id}`}
                      className="group/tile relative block rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 h-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: `1px solid ${t.color}30`,
                      }}
                    >
                      {/* Hover glow */}
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(ellipse at top right, ${t.color}22, transparent 70%)`,
                        }}
                      />

                      <div className="relative p-3 md:p-3.5">
                        <div className="flex items-start justify-between mb-2">
                          <span
                            aria-hidden
                            className="font-serif text-xl md:text-2xl font-black leading-none tabular-nums"
                            style={{ color: t.color, letterSpacing: "-0.04em" }}
                          >
                            {t.number}
                          </span>
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/tile:-rotate-6"
                            style={{
                              backgroundColor: `${t.color}18`,
                              border: `1px solid ${t.color}30`,
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: t.color }} />
                          </span>
                        </div>
                        <div className="text-[11px] md:text-[12px] font-bold text-white leading-tight mb-0.5">
                          {t.label}
                        </div>
                        <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-semibold text-[#e6d9d4]/70 group-hover/tile:text-[#e6d9d4]/90 transition-colors">
                          <span>ler</span>
                          <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover/tile:translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom accent sweep */}
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover/tile:w-full transition-all duration-700"
                        style={{ backgroundColor: t.color }}
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main component ───
export function FeaturesInternal() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()
  const [containerSize, setContainerSize] = useState({ w: 1200, h: 900 })

  useEffect(() => {
    function measure() {
      if (gridRef.current) {
        setContainerSize({
          w: gridRef.current.offsetWidth,
          h: gridRef.current.offsetHeight,
        })
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (gridRef.current) ro.observe(gridRef.current)
    return () => ro.disconnect()
  }, [])

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ] as const

  return (
    <section
      id="funcionalidades"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-[#f3eeea]"
    >
      {/* Dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.14), transparent 65%)",
        }}
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-[440px] h-[440px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,111,100,0.12), transparent 65%)",
        }}
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Editorial section header — aligned with /funcionalidades voice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span
              aria-hidden
              className="h-px w-10 bg-[#db6f57] opacity-60"
            />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
              Funcionalidades
              <span className="mx-2 opacity-40">·</span>
              06 capítulos
            </span>
            <span
              aria-hidden
              className="h-px w-10 bg-[#db6f57] opacity-60"
            />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.04] mb-5">
            Seis capítulos.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #db6f57 0%, #8b3d35 50%, #db6f57 100%)",
                backgroundSize: "200% auto",
              }}
            >
              Um único sistema.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a4a42]/70 leading-relaxed font-light">
            Da agenda ao financeiro, da IA no WhatsApp à presença digital —
            tudo interligado em volta do mesmo lugar. O seu.
          </p>
        </motion.div>

        {/* Grid 3×2 with center logo */}
        <div ref={gridRef} className="relative">
          {/* SVG connectors — desktop only */}
          <div className="hidden lg:block">
            <ConnectorLines
              isInView={isInView}
              containerSize={containerSize}
              prefersReduced={prefersReduced}
            />
          </div>

          {/* Center logo — desktop absolute */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center z-20 pointer-events-none">
            <CenterLogo isInView={isInView} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-x-12 lg:gap-y-64 relative">
            {chapters.map((chapter, idx) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                index={idx}
                isInView={isInView}
                position={positions[idx]}
              />
            ))}
          </div>

          {/* Mobile/tablet center logo between rows */}
          <div className="flex lg:hidden items-center justify-center py-10">
            <CenterLogo isInView={isInView} />
          </div>
        </div>

        {/* Bottom CTA card — editorial "last page of the manual" */}
        <AllFeaturesCard isInView={isInView} prefersReduced={prefersReduced} />
      </div>
    </section>
  )
}
