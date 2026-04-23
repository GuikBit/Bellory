"use client"

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  ArrowRight,
  BarChart,
  Bot,
  Calendar,
  CreditCard,
  Globe,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { useMemo, useState, useRef, useEffect } from "react"
import { useInteractionTracker } from "@/hooks/tracking"
import { PhoneMockups } from "./PhoneMockups"
import { HERO_COLORS } from "./constants"

// ─── Feature cards data ───
// `flow` determines dot direction:
//  - "in"  = card → phone (client/event entering the system)
//  - "out" = phone → card (system broadcasting data outward)
interface FeatureCard {
  id: string
  label: string
  icon: LucideIcon
  color: string
  flow: "in" | "out"
}

const FEATURE_CARDS: FeatureCard[] = [
  { id: "agenda", label: "Agenda Inteligente", icon: Calendar, color: "#db6f57", flow: "in" },
  { id: "site", label: "Site Personalizado", icon: Globe, color: "#8b3d35", flow: "out" },
  { id: "ia", label: "Agente IA WhatsApp", icon: Bot, color: "#4f6f64", flow: "in" },
  { id: "financeiro", label: "Gestão Financeira", icon: CreditCard, color: "#db6f57", flow: "out" },
  { id: "clientes", label: "CRM de Clientes", icon: Users, color: "#8b3d35", flow: "in" },
  { id: "relatorios", label: "Relatórios", icon: BarChart, color: "#4f6f64", flow: "out" },
  { id: "chat", label: "Chat Integrado", icon: MessageCircle, color: "#db6f57", flow: "in" },
  { id: "seguranca", label: "Segurança Total", icon: Shield, color: "#8b3d35", flow: "out" },
]

// Positions computed from container dimensions. The center target is the measured
// top-center of the phone mockup (passed in via ref) — so line endpoints land on
// the actual phone, not on a math midpoint.
function computePositions(
  w: number,
  h: number,
  phoneTarget: { x: number; y: number } | null
) {
  const center = phoneTarget ?? { x: w / 2, y: h * 0.5 }

  // Cards rendered at h * negative_factor appear ABOVE the container top
  // (visible because SVG overflow: visible). This puts them flanking the
  // title / subtitle / CTAs above.
  // Horizontal inset for larger screens: at ≤1440px (14" laptops) it is 0 —
  // positions stay as-is. Beyond that, pull cards inward linearly so they
  // don't drift to the far edges on 24"+ monitors. Clamped at 0.08 (~8% of
  // width) so ultrawides don't overshoot toward the center column.
  const inset = Math.min(Math.max((w - 1440) / 1400, 0), 0.08)

  // Organic, slightly asymmetric placement: each card has its own x offset
  // and uneven vertical step so the column doesn't read as a perfect grid.
  // Left and right sides are intentionally not exact mirrors.
  const cards = [
    // Left side (4 cards)
    { cx: w * (0.045 + inset), cy: h * -0.37 },
    { cx: w * (0.082 + inset), cy: h * -0.185 },
    { cx: w * (0.038 + inset), cy: h * -0.005 },
    { cx: w * (0.072 + inset), cy: h * 0.178 },
    // Right side (4 cards)
    { cx: w * (0.958 - inset), cy: h * -0.345 },
    { cx: w * (0.922 - inset), cy: h * -0.168 },
    { cx: w * (0.965 - inset), cy: h * 0.018 },
    { cx: w * (0.928 - inset), cy: h * 0.192 },
  ]

  // viewBox uses pixel-matched units so measurements from the DOM can be
  // used directly as SVG coordinates (no conversion math).
  return {
    cards,
    center,
    viewBox: `0 0 ${w} ${h}`,
  }
}

function makeCurvePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cp1x = from.x + dx * 0.42
  const cp1y = from.y + dy * 0.08
  const cp2x = from.x + dx * 0.6
  const cp2y = to.y - dy * 0.2
  return `M${from.x},${from.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${to.x},${to.y}`
}

// ─── Connection line + icon-tile dot travelling the path ───
function ConnectionLine({
  pathD,
  pathId,
  color,
  icon: Icon,
  index,
  isHovered,
  globalHover,
  prefersReduced,
  isInView,
  reversed,
}: {
  pathD: string
  pathId: string
  color: string
  icon: LucideIcon
  index: number
  isHovered: boolean
  globalHover: boolean
  prefersReduced: boolean
  isInView: boolean
  reversed: boolean
}) {
  const active = isHovered || globalHover

  return (
    <g>
      <motion.path
        id={pathId}
        d={pathD}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          strokeWidth: active ? 3 : 1.5,
          opacity: active ? 0.9 : [0.2, 0.4, 0.2],
        }}
        transition={{
          pathLength: {
            duration: 1.8,
            delay: 0.7 + index * 0.12,
            ease: "easeInOut",
          },
          strokeWidth: { duration: 0.35, ease: "easeOut" },
          opacity: active
            ? { duration: 0.3 }
            : {
                duration: 4 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5 + index * 0.15,
              },
        }}
      />

      {active && (
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={9}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          transition={{ duration: 0.35 }}
          style={{ filter: "blur(6px)" }}
        />
      )}

      {/* Icon-tile dot traveling along the path. Direction depends on `reversed`. */}
      {!prefersReduced && isInView && (
        <g>
          <animateMotion
            dur={`${3.4 + index * 0.25}s`}
            begin={`${index * 0.5}s`}
            repeatCount="indefinite"
            keyPoints={reversed ? "1;0" : "0;1"}
            keyTimes="0;1"
            calcMode="linear"
            fill="freeze"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
          <foreignObject
            x={-15}
            y={-15}
            width={30}
            height={30}
            style={{ overflow: "visible" }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "white",
                border: `1.5px solid ${color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: active
                  ? `0 8px 20px ${color}55, 0 0 0 5px ${color}22`
                  : `0 4px 12px ${color}3a, 0 0 0 3px ${color}14`,
                transform: active ? "scale(1.18)" : "scale(1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <Icon size={14} color={color} strokeWidth={2.4} />
            </div>
          </foreignObject>
        </g>
      )}
    </g>
  )
}

// ─── Arrival ripple at the center target (on the phone mockup) ───
function ArrivalRipple({
  cx,
  cy,
  prefersReduced,
  isInView,
  intensify,
}: {
  cx: number
  cy: number
  prefersReduced: boolean
  isInView: boolean
  intensify: boolean
}) {
  if (prefersReduced || !isInView) return null
  const baseMax = intensify ? 68 : 52
  const secondMax = intensify ? 88 : 68
  return (
    <g aria-hidden>
      <motion.circle
        cx={cx}
        cy={cy}
        fill="none"
        stroke="#db6f57"
        strokeWidth={1.5}
        animate={{ r: [18, baseMax, 18], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        fill="none"
        stroke="#8b3d35"
        strokeWidth={1}
        animate={{ r: [14, secondMax, 14], opacity: [0.4, 0, 0.4] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.1,
        }}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        fill="#db6f57"
        animate={{ r: [3, intensify ? 8 : 6, 3], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  )
}

// ─── SVG feature card via foreignObject ───
function FeatureCardSVG({
  card,
  index,
  pos,
  isHovered,
  onHover,
  onLeave,
}: {
  card: FeatureCard
  index: number
  pos: { cx: number; cy: number }
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const prefersReduced = useReducedMotion()
  const cardW = 210
  const cardH = 52
  const Icon = card.icon

  return (
    <motion.foreignObject
      x={pos.cx - cardW / 2}
      y={pos.cy - cardH / 2}
      width={cardW}
      height={cardH}
      className="cursor-pointer"
      style={{ overflow: "visible" }}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: prefersReduced ? 0 : [0, -12, 0],
        x: prefersReduced ? 0 : [0, index % 2 === 0 ? 4 : -4, 0],
      }}
      transition={
        prefersReduced
          ? { duration: 0.4 }
          : {
              opacity: { duration: 0.6, delay: 0.6 + index * 0.12 },
              y: {
                duration: 3.5 + (index % 4) * 0.6,
                delay: index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: 4.5 + (index % 3) * 0.7,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
      }
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          borderRadius: 14,
          background: "rgba(255,255,255,0.95)",
          border: `1.5px solid ${isHovered ? card.color : "rgba(0,0,0,0.08)"}`,
          boxShadow: isHovered
            ? `0 10px 35px ${card.color}30, 0 0 0 1px ${card.color}20`
            : "0 4px 18px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          whiteSpace: "nowrap" as const,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 8,
            background: `${card.color}15`,
            color: card.color,
            flexShrink: 0,
            transition: "transform 0.3s",
            transform: isHovered ? "rotate(-8deg) scale(1.05)" : "none",
          }}
        >
          <Icon size={16} />
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "-0.005em",
            color: isHovered ? card.color : "#2a2420",
            transition: "color 0.3s",
          }}
        >
          {card.label}
        </span>
      </motion.div>
    </motion.foreignObject>
  )
}

// ─── Main Hero ───
export function Hero() {
  const { trackClick } = useInteractionTracker()
  const prefersReduced = useReducedMotion()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mockupHovered, setMockupHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)
  const [containerHeight, setContainerHeight] = useState(640)
  const [phoneTarget, setPhoneTarget] = useState<{ x: number; y: number } | null>(
    null
  )
  const [centerPhoneEl, setCenterPhoneEl] = useState<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: "-120px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const cardsTranslateY = useTransform(scrollYProgress, [0, 1], [0, 120])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Measure container dimensions AND the real position of the center phone.
  // Phone target is captured in pixel coords relative to the container, which
  // matches the SVG viewBox (`0 0 w h`) 1:1 — no conversion math needed.
  useEffect(() => {
    function measure() {
      if (!containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      setContainerWidth(containerRect.width)
      setContainerHeight(containerRect.height || 640)

      if (centerPhoneEl) {
        const phoneRect = centerPhoneEl.getBoundingClientRect()
        // Target: 68% down the phone (just past the middle) — lines land
        // behind the mockup, reinforcing the "converging into the product" feel
        const relX = phoneRect.left + phoneRect.width / 2 - containerRect.left
        const relY =
          phoneRect.top - containerRect.top + phoneRect.height * 0.68
        setPhoneTarget({ x: relX, y: relY })
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    if (centerPhoneEl) ro.observe(centerPhoneEl)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [centerPhoneEl])

  const patternStyle = useMemo(
    () => ({
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }),
    []
  )

  const layout = useMemo(
    () => computePositions(containerWidth, containerHeight, phoneTarget),
    [containerWidth, containerHeight, phoneTarget]
  )

  const paths = useMemo(
    () =>
      FEATURE_CARDS.map((card, i) => {
        const pos = layout.cards[i]
        return {
          id: `conn-${card.id}`,
          d: makeCurvePath({ x: pos.cx, y: pos.cy }, layout.center),
          color: card.color,
        }
      }),
    [layout]
  )

  const initial = (y: number) =>
    prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[calc(100vh-80px)]"
      style={{ background: HERO_COLORS.background }}
      aria-labelledby="hero-heading"
    >
      <div aria-hidden className="absolute inset-0" style={patternStyle} />

      <motion.div
        aria-hidden
        className={`absolute top-140 md:top-20 right-10 w-96 h-96 rounded-full blur-3xl ${HERO_COLORS.blob1}`}
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className={`absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl ${HERO_COLORS.blob2}`}
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-36 lg:pt-40">
        {/* Editorial meta label */}
        <motion.div
          initial={initial(20)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-3">
            <span aria-hidden className="h-px w-8 md:w-10 bg-[#db6f57] opacity-60" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
              Para salões, barbearias, clínicas e spas
            </span>
            <span aria-hidden className="h-px w-8 md:w-10 bg-[#db6f57] opacity-60" />
          </div>
        </motion.div>

        {/* Title — gradient only on "império digital" */}
        <motion.div
          initial={initial(30)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-center mb-5"
        >
          <h1
            id="hero-heading"
            className="font-serif tracking-tight leading-[1.04]"
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2a2420]">
              Transforme seu negócio
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-1 pb-3">
              <span className="text-[#2a2420]">em um </span>
              <span
                className={`bg-gradient-to-r ${HERO_COLORS.titleGradient} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]`}
              >
                império digital
              </span>
              <span className="text-[#2a2420]">.</span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={initial(24)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-center text-base sm:text-lg lg:text-xl text-balance max-w-2xl mx-auto mb-8 leading-relaxed font-light text-[#5a7d71]"
        >
          Gestão completa + site personalizado + agente de IA no WhatsApp.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-[#8b3d35] font-medium">
            Tudo em uma única plataforma
          </span>{" "}
          para você focar no que importa: <br className="hidden sm:block" />
          seus clientes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={initial(24)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <Link
            href="/cadastro"
            onClick={() =>
              trackClick(
                "cta-hero-comece-gratis",
                "Comece gratis por 14 dias",
                "hero"
              )
            }
          >
            <motion.button
              type="button"
              whileHover={prefersReduced ? undefined : { scale: 1.04 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              className="group/cta relative inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-bold text-[13px] md:text-[14px] text-white overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                boxShadow: "0 0 40px rgba(219,111,87,0.35)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              {isMobile ? "Comece agora" : "Comece grátis por 14 dias"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                }}
              />
            </motion.button>
          </Link>

          <Link
            href="/#contato"
            onClick={() =>
              trackClick(
                "cta-hero-agende-demo",
                "Agende uma demonstracao",
                "hero"
              )
            }
          >
            <button
              type="button"
              className="group inline-flex items-center gap-2 px-6 py-3 md:py-3.5 rounded-xl font-semibold text-[13px] md:text-[14px] bg-white text-[#8b3d35] border-2 border-[#8b3d35] hover:bg-[#8b3d35] hover:text-white transition-all duration-300"
            >
              {isMobile ? "Agendar" : "Agende uma demonstração"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </Link>
        </motion.div>

        {/* Trust / proof strip */}
        <motion.div
          initial={initial(16)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-4 text-[11px] font-semibold text-[#5a4a42]/70"
        >
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="w-1 h-1 rounded-full bg-[#db6f57]" />
            500+ negócios ativos
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="w-1 h-1 rounded-full bg-[#db6f57]" />
            4.9/5 avaliação
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="w-1 h-1 rounded-full bg-[#db6f57]" />
            14 dias grátis
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="w-1 h-1 rounded-full bg-[#db6f57]" />
            Sem cartão de crédito
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="w-1 h-1 rounded-full bg-[#db6f57]" />
            LGPD 100%
          </span>
        </motion.div>

        {/* Mockups + feature cards + connection lines */}
        <div className="relative pointer-events-none" ref={containerRef}>
          <svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
            viewBox={layout.viewBox}
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
            role="img"
            aria-label="Ilustração do ecossistema Bellory: funcionalidades conectadas ao aplicativo central"
          >
            <motion.g style={{ translateY: cardsTranslateY }}>
              {paths.map((p, i) => (
                <ConnectionLine
                  key={p.id}
                  pathD={p.d}
                  pathId={p.id}
                  color={p.color}
                  icon={FEATURE_CARDS[i].icon}
                  index={i}
                  isHovered={hoveredCard === FEATURE_CARDS[i].id}
                  globalHover={mockupHovered}
                  prefersReduced={!!prefersReduced}
                  isInView={isInView}
                  reversed={FEATURE_CARDS[i].flow === "out"}
                />
              ))}

              {/* Arrival ripple on the phone target */}
              <ArrivalRipple
                cx={layout.center.x}
                cy={layout.center.y}
                prefersReduced={!!prefersReduced}
                isInView={isInView}
                intensify={mockupHovered}
              />

              <g className="pointer-events-auto">
                {FEATURE_CARDS.map((card, i) => (
                  <FeatureCardSVG
                    key={card.id}
                    card={card}
                    index={i}
                    pos={layout.cards[i]}
                    isHovered={hoveredCard === card.id}
                    onHover={() => setHoveredCard(card.id)}
                    onLeave={() => setHoveredCard(null)}
                  />
                ))}
              </g>
            </motion.g>
          </svg>

          <PhoneMockups
            onHover={() => setMockupHovered(true)}
            onLeave={() => setMockupHovered(false)}
            centerPhoneRef={setCenterPhoneEl}
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-30 md:h-20 z-20"
        style={{
          background:
            "linear-gradient(to top, #FAF8F6 0%, rgba(250,248,246,0.7) 55%, rgba(250,248,246,0) 100%)",
        }}
      />

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  )
}
