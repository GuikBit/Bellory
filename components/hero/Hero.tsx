"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  BarChart,
  Bot,
  Calendar,
  CreditCard,
  Globe,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "primereact/button"
import Link from "next/link"
import { useMemo, useState, useRef, useEffect } from "react"
import { useInteractionTracker } from "@/hooks/tracking"
import { PhoneMockups } from "./PhoneMockups"
import { HERO_COLORS } from "./constants"

// ─── Feature cards data ───
interface FeatureCard {
  id: string
  label: string
  icon: LucideIcon
  color: string
}

const FEATURE_CARDS: FeatureCard[] = [
  { id: "agenda", label: "Agenda Inteligente", icon: Calendar, color: "#db6f57" },
  { id: "site", label: "Site Personalizado", icon: Globe, color: "#8b3d35" },
  { id: "ia", label: "Agente IA WhatsApp", icon: Bot, color: "#4f6f64" },
  { id: "financeiro", label: "Gestão Financeira", icon: CreditCard, color: "#db6f57" },
  { id: "clientes", label: "CRM de Clientes", icon: Users, color: "#8b3d35" },
  { id: "relatorios", label: "Relatórios", icon: BarChart, color: "#4f6f64" },
  { id: "chat", label: "Chat Integrado", icon: MessageCircle, color: "#db6f57" },
  { id: "seguranca", label: "Segurança Total", icon: Shield, color: "#8b3d35" },
]

// Dynamic positions computed from container width
// Cards stay at the edges regardless of screen size
function computePositions(w: number) {
  const h = 600
  const center = { x: w / 2, y: h * 0.55 }

  // Left cards: offset from left edge; Right cards: offset from right edge
  // Stagger: alternate between closer/further from edge
  const cards = [
    // Left side (4 cards)
    { cx: w * 0.04, cy: h * -0.65 },
    { cx: w * -0.02, cy: h * -0.45 },
    { cx: w * 0.04, cy: h * -0.25 },
    { cx: w * -0.02, cy: h * -0.05 },
    // Right side (4 cards)
    { cx: w * 0.96, cy: h * -0.65 },
    { cx: w * 1.02, cy: h * -0.45 },
    { cx: w * 0.96, cy: h * -0.25 },
    { cx: w * 1.02, cy: h * -0.05 },
  ]

  return { cards, center, viewBox: `${-w * 0.1} ${-h * 0.2} ${w * 1.2} ${h * 1.2}` }
}

function makeCurvePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const cp1x = from.x + dx * 0.42
  const cp1y = from.y + dy * 0.06
  const cp2x = from.x + dx * 0.58
  const cp2y = to.y - dy * 0.15
  return `M${from.x},${from.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${to.x},${to.y}`
}

// ─── SVG connection line with pulse + breathing ───
function ConnectionLine({
  pathD,
  pathId,
  color,
  index,
  isHovered,
  prefersReduced,
}: {
  pathD: string
  pathId: string
  color: string
  index: number
  isHovered: boolean
  prefersReduced: boolean
}) {
  return (
    <g>
      {/* Main line — draws in, then gently "breathes" opacity */}
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
          strokeWidth: isHovered ? 3 : 1.5,
          opacity: isHovered ? 0.85 : [0.2, 0.35, 0.2],
        }}
        transition={{
          pathLength: { duration: 1.8, delay: 0.7 + index * 0.12, ease: "easeInOut" },
          strokeWidth: { duration: 0.4, ease: "easeOut" },
          opacity: isHovered
            ? { duration: 0.3 }
            : { duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: 1.5 + index * 0.15 },
        }}
      />

      {/* Glow on hover */}
      {isHovered && (
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 0.4 }}
          style={{ filter: "blur(6px)" }}
        />
      )}

      {/* Pulse dot traveling along path */}
      {!prefersReduced && (
        <circle
          r={isHovered ? 5 : 3}
          fill={color}
          opacity={isHovered ? 0.9 : 0.5}
          style={{ transition: "r 0.3s, opacity 0.3s" } as React.CSSProperties}
        >
          <animateMotion
            dur={`${3.5 + index * 0.3}s`}
            begin={`${index * 0.5}s`}
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
  const cardW = 250
  const cardH = 60
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
          gap: 10,
          padding: "9px 15px",
          borderRadius: 16,
          background: isHovered
            ? `rgba(255,255,255,0.95)`
            : "rgba(255,255,255,0.95)",
          border: `2px solid ${isHovered ? card.color : "rgba(0,0,0,0.08)"}`,
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
            width: 35,
            height: 35,
            borderRadius: 10,
            background: `${card.color}15`,
            color: card.color,
            flexShrink: 0,
          }}
        >
          <Icon size={20} />
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
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
  const [isMobile, setIsMobile] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-linked: cards slide down 120 SVG units (20% of h=600) as hero scrolls out
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

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const patternStyle = useMemo(
    () => ({
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }),
    []
  )

  const layout = useMemo(() => computePositions(containerWidth), [containerWidth])

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
      className="relative overflow-hidden"
      style={{ background: HERO_COLORS.background }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0" style={patternStyle} />

      {/* Decorative blobs */}
      <motion.div
        className={`absolute top-140 md:top-20 right-10 w-96 h-96 rounded-full blur-3xl ${HERO_COLORS.blob1}`}
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
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

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-25 md:pt-40 lg:pt-44">
        {/* Title */}
        <motion.div
          initial={initial(40)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-center mb-5"
        >
          <h1 className="font-serif tracking-tight leading-[1.08]">
            <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2a2420]">
              Transforme seu negócio
            </span>
            <span
              className={`block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-1 bg-gradient-to-r ${HERO_COLORS.titleGradient} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]`}
            >
              em um império digital
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={initial(30)}
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
          para você focar no que importa: <br />
          seus clientes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={initial(30)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-3 mb-6"
        >
          <Link
            href="/cadastro"
            className="w-full sm:w-auto"
            onClick={() =>
              trackClick(
                "cta-hero-comece-gratis",
                "Comece gratis por 14 dias",
                "hero"
              )
            }
          >
            <Button
              label={isMobile ? "Comece agora" : "Comece grátis por 14 dias"}
              icon={<ArrowRight className="mr-2" size={16} />}
              iconPos="right"
              className={`
                w-full sm:w-auto group relative overflow-hidden
                border-0 text-xs md:text-sm px-6 py-3 rounded-xl font-semibold
                transition-all duration-300 hover:scale-105
                bg-gradient-to-r ${HERO_COLORS.ctaPrimary} text-white hover:shadow-xl
              `}
            />
          </Link>

          <Button
            label={isMobile ? "Agendar" : "Agende uma demonstração"}
            className={`
              w-full sm:w-auto text-xs md:text-sm px-6 py-3 rounded-xl font-semibold
              transition-all duration-300
              ${HERO_COLORS.ctaSecondary.base}
            `}
            outlined
            onClick={() =>
              trackClick(
                "cta-hero-agende-demo",
                "Agende uma demonstracao",
                "hero"
              )
            }
          />
        </motion.div>

        {/* Mockups + Feature cards with connection lines */}
        <div className="relative pointer-events-none" ref={containerRef}>
          {/* SVG layer: lines + feature cards (desktop only) */}
          <svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
            viewBox={layout.viewBox}
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            {/* All cards + lines move down with scroll */}
            <motion.g style={{ translateY: cardsTranslateY }}>
              {/* Connection lines */}
              {paths.map((p, i) => (
                <ConnectionLine
                  key={p.id}
                  pathD={p.d}
                  pathId={p.id}
                  color={p.color}
                  index={i}
                  isHovered={hoveredCard === FEATURE_CARDS[i].id}
                  prefersReduced={!!prefersReduced}
                />
              ))}

              {/* Feature cards */}
              <g className="pointer-events-auto">
                {FEATURE_CARDS.map((card, i) => (
                  <FeatureCardSVG
                    key={card.id}
                    card={card}
                    index={i}
                    pos={layout.cards[i]}
                    isHovered={hoveredCard === card.id}
                    onHover={() => setHoveredCard(null)}
                    onLeave={() => setHoveredCard(null)}
                  />
                ))}
              </g>
            </motion.g>
          </svg>

          {/* Phone mockups (HTML layer, centered) */}
          <PhoneMockups />
        </div>
      </div>

      {/* CSS for gradient animation */}
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
