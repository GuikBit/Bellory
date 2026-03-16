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
  Heart,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect, useMemo } from "react"

// ─── Data: 4 quadrants matching the sketch ───
interface FeatureItem {
  icon: LucideIcon
  title: string
  description: string
  stat: string
}

interface Quadrant {
  id: string
  title: string
  tagline: string
  color: string
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  features: FeatureItem[]
}

const quadrants: Quadrant[] = [
  {
    id: "seo",
    title: "SEO & Negócio",
    tagline: "Presença digital profissional",
    color: "#8b3d35",
    position: "top-left",
    features: [
      {
        icon: Globe,
        title: "Site Personalizado",
        description: "Landing page linda e responsiva com sua identidade visual.",
        stat: "Top 3",
      },
      {
        icon: ShoppingBag,
        title: "Mini E-commerce",
        description: "Venda produtos online com pagamento integrado.",
        stat: "+35%",
      },
      {
        icon: Scissors,
        title: "Catálogo Digital",
        description: "Serviços com fotos, descrições e preços atualizados.",
        stat: "60%",
      },
    ],
  },
  {
    id: "automacao",
    title: "Automação Inteligente",
    tagline: "Nunca mais perca um cliente",
    color: "#db6f57",
    position: "top-right",
    features: [
      {
        icon: Calendar,
        title: "Agendamento 24/7",
        description: "Clientes agendam quando quiserem pelo site ou WhatsApp.",
        stat: "+30%",
      },
      {
        icon: Bot,
        title: "Agente Virtual",
        description: "IA que responde, agenda e confirma horários no WhatsApp.",
        stat: "<5s",
      },
      {
        icon: Clock,
        title: "Lembrete Automático",
        description: "Confirmações e lembretes 24h antes. Cliente confirma em 1 clique.",
        stat: "-40%",
      },
    ],
  },
  {
    id: "financeiro",
    title: "Financeiro",
    tagline: "Saúde financeira em tempo real",
    color: "#4f6f64",
    position: "bottom-left",
    features: [
      {
        icon: DollarSign,
        title: "Controle de Caixa",
        description: "Entradas, saídas, contas a pagar e receber automatizados.",
        stat: "100%",
      },
      {
        icon: TrendingUp,
        title: "Análise Financeira",
        description: "Entenda o que dá mais lucro e otimize seus resultados.",
        stat: "Data-driven",
      },
      {
        icon: Shield,
        title: "Comissões Automáticas",
        description: "Comissões calculadas automaticamente. Zero disputas.",
        stat: "Auto",
      },
    ],
  },
  {
    id: "admin",
    title: "Administrativo",
    tagline: "Gestão no piloto automático",
    color: "#db6f57",
    position: "bottom-right",
    features: [
      {
        icon: BarChart3,
        title: "Dashboard Inteligente",
        description: "Métricas em tempo real sobre todo o seu negócio.",
        stat: "Real-time",
      },
      {
        icon: Users,
        title: "Gestão Completa de Clientes",
        description: "Histórico, preferências e fidelidade automática.",
        stat: "+50%",
      },
      {
        icon: Briefcase,
        title: "Controle de Equipe",
        description: "Horários, comissões, metas e produtividade em um só lugar.",
        stat: "0 erros",
      },
    ],
  },
]

// ─── Connection line from card to center ───
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
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isInView
            ? {
                pathLength: 1,
                opacity: prefersReduced ? 0.35 : [0.2, 0.4, 0.2],
              }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 1.5, delay: 0.3 + index * 0.15, ease: "easeInOut" },
          opacity: prefersReduced
            ? { duration: 0.6, delay: 0.5 + index * 0.15 }
            : {
                duration: 4 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2 + index * 0.15,
              },
        }}
      />
      {!prefersReduced && isInView && (
        <circle r={3} fill={color} opacity={0.6}>
          <animateMotion
            dur={`${3 + index * 0.4}s`}
            begin={`${1 + index * 0.3}s`}
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

// ─── Single feature item inside a card ───
function FeatureRow({
  feature,
  color,
  index,
  isInView,
}: {
  feature: FeatureItem
  color: string
  index: number
  isInView: boolean
}) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.12 }}
      className="group/row flex items-start gap-3 py-3 px-3 rounded-xl transition-all duration-300 hover:bg-white/5 cursor-default"
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/row:scale-110"
        style={{
          backgroundColor: `${color}18`,
          border: `1.5px solid ${color}35`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-white leading-tight">
            {feature.title}
          </h4>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              backgroundColor: `${color}20`,
              color,
            }}
          >
            {feature.stat}
          </span>
        </div>
        <p className="text-xs text-[#d8ccc4]/80 mt-0.5 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Quadrant card ───
function QuadrantCard({
  quadrant,
  index,
  isInView,
}: {
  quadrant: Quadrant
  index: number
  isInView: boolean
}) {
  const directionX = quadrant.position.includes("left") ? -60 : 60
  const directionY = quadrant.position.includes("top") ? -40 : 40

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
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
        style={{
          backgroundColor: "#3d2e28",
          borderColor: `${quadrant.color}25`,
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at center, ${quadrant.color}08 0%, transparent 70%)`,
          }}
        />

        {/* Card header */}
        <div className="relative px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: quadrant.color }}
            />
            <h3
              className="text-base font-bold uppercase tracking-wider"
              style={{ color: quadrant.color }}
            >
              {quadrant.title}
            </h3>
          </div>
          <p className="text-xs text-[#d8ccc4]/60 pl-5">
            {quadrant.tagline}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-5">
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right, ${quadrant.color}40, transparent)`,
            }}
          />
        </div>

        {/* Features list */}
        <div className="relative px-2 pb-4 pt-1">
          {quadrant.features.map((feature, idx) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              color={quadrant.color}
              index={idx}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className="h-0.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ backgroundColor: quadrant.color }}
        />
      </div>
    </motion.div>
  )
}

// ─── Center logo with pulse ───
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
      {/* Outer pulse ring */}
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
        style={{
          border: "2px solid rgba(219, 111, 87, 0.15)",
        }}
        animate={
          isInView
            ? {
                scale: [1, 1.25, 1],
                opacity: [0.4, 0, 0.4],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Second pulse ring */}
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full"
        style={{
          border: "2px solid rgba(79, 111, 100, 0.15)",
        }}
        animate={
          isInView
            ? {
                scale: [1, 1.4, 1],
                opacity: [0.3, 0, 0.3],
              }
            : {}
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* Main circle */}
      <div
        className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #3d2e28 0%, #2a2420 50%, #3d2e28 100%)",
          border: "2px solid rgba(219, 111, 87, 0.3)",
          boxShadow: "0 0 60px rgba(219, 111, 87, 0.15), 0 0 120px rgba(79, 111, 100, 0.08)",
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

// ─── SVG connector lines layer ───
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

  // Card center positions (approximate centers of each quadrant)
  const cardCenters = useMemo(() => {
    // Grid: 2 cols with gap, logo in center
    // top-left, top-right, bottom-left, bottom-right
    const colW = w * 0.42
    const rowH = h * 0.42
    return [
      { x: colW * 0.5, y: rowH * 0.5 },                    // top-left
      { x: w - colW * 0.5, y: rowH * 0.5 },                // top-right
      { x: colW * 0.5, y: h - rowH * 0.5 },                // bottom-left
      { x: w - colW * 0.5, y: h - rowH * 0.5 },            // bottom-right
    ]
  }, [w, h])

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
          color={quadrants[i].color}
          index={i}
          isInView={isInView}
          prefersReduced={prefersReduced}
        />
      ))}
    </svg>
  )
}

// ─── Main component ───
export function FeaturesInternal() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()
  const [containerSize, setContainerSize] = useState({ w: 1000, h: 700 })

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

  return (
    <section
      id="funcionalidades"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-[#2a2420]"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            Tudo que você precisa,{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              em um só lugar
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#d8ccc4]/80 leading-relaxed">
            Quatro pilares que transformam a gestão do seu negócio
          </p>
        </motion.div>

        {/* ─── Cross layout grid ─── */}
        <div ref={gridRef} className="relative max-w-6xl mx-auto">
          {/* SVG connection lines (desktop only) */}
          <div className="hidden lg:block">
            <ConnectorLines
              isInView={isInView}
              containerSize={containerSize}
              prefersReduced={prefersReduced}
            />
          </div>

          {/* Grid: 2x2 with logo in center */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16">
            {/* Top-left: SEO Negócio */}
            <QuadrantCard quadrant={quadrants[0]} index={0} isInView={isInView} />

            {/* Top-right: Automação Inteligente */}
            <QuadrantCard quadrant={quadrants[1]} index={1} isInView={isInView} />

            {/* Center logo - positioned absolutely on desktop */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-center z-20 pointer-events-none">
              <CenterLogo isInView={isInView} />
            </div>

            {/* Center logo for mobile - shown between rows */}
            <div className="flex lg:hidden items-center justify-center py-6">
              <CenterLogo isInView={isInView} />
            </div>

            {/* Bottom-left: Financeiro */}
            <QuadrantCard quadrant={quadrants[2]} index={2} isInView={isInView} />

            {/* Bottom-right: Administrativo */}
            <QuadrantCard quadrant={quadrants[3]} index={3} isInView={isInView} />
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 md:mt-24 p-10 md:p-12 rounded-3xl bg-gradient-to-br from-[#db6f57] to-[#8b3d35] relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative z-10">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-6" />
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
              Pronto para transformar seu negócio?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Comece grátis hoje. Sem cartão de crédito. Sem compromisso.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-[#8b3d35] rounded-xl font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Teste grátis por 14 dias
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
