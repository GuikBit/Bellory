"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useMemo, useState } from "react"
import {
  FEATURES,
  FLOATING_CONFIG,
  CARD_SIZE,
  type AnimationPhase,
  type Feature,
} from "./constants"

interface OrbitLayoutProps {
  phase: AnimationPhase
  containerSize: { width: number; height: number }
  radius: number
  isDark: boolean
}

type Point = { x: number; y: number }

// Deterministic "scattered" offsets per card
const SCATTER_OFFSETS = [
  { x: 40, y: -30 },
  { x: -35, y: 45 },
  { x: 50, y: 20 },
  { x: -45, y: -40 },
  { x: 30, y: 50 },
  { x: -50, y: -20 },
]

function getOrbitPosition(
  angle: number,
  radius: number,
  centerX: number,
  centerY: number
): Point {
  const rad = (angle * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(rad),
    y: centerY + radius * Math.sin(rad),
  }
}

// Path from center to card (for SVG line drawing)
function getSvgPath(cx: number, cy: number, tx: number, ty: number): string {
  const mx = (cx + tx) / 2
  const my = (cy + ty) / 2
  const dx = tx - cx
  const dy = ty - cy
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const curvature = 0.15
  const qx = mx + (-dy / len) * len * curvature
  const qy = my + (dx / len) * len * curvature
  return `M ${cx} ${cy} Q ${qx} ${qy} ${tx} ${ty}`
}

// Get bezier control point (same curvature as getSvgPath)
function getControlPoint(cx: number, cy: number, tx: number, ty: number): Point {
  const mx = (cx + tx) / 2
  const my = (cy + ty) / 2
  const dx = tx - cx
  const dy = ty - cy
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const curvature = 0.15
  return {
    x: mx + (-dy / len) * len * curvature,
    y: my + (dx / len) * len * curvature,
  }
}

// ─── Generate pulse path: border loop around card → then bezier to center ───
function generatePulsePath(
  cardPos: Point,
  centerPos: Point,
  controlPt: Point
): { xs: number[]; ys: number[] } {
  const hw = CARD_SIZE.width / 2
  const hh = CARD_SIZE.height / 2

  // Card rectangle edges (absolute coords)
  const l = cardPos.x - hw
  const r = cardPos.x + hw
  const t = cardPos.y - hh
  const b = cardPos.y + hh

  // 8 perimeter waypoints clockwise: TC, TR, RC, BR, BC, BL, LC, TL
  const perimeterAll: Point[] = [
    { x: (l + r) / 2, y: t }, // 0: top-center
    { x: r, y: t },            // 1: top-right
    { x: r, y: (t + b) / 2 }, // 2: right-center
    { x: r, y: b },            // 3: bottom-right
    { x: (l + r) / 2, y: b }, // 4: bottom-center
    { x: l, y: b },            // 5: bottom-left
    { x: l, y: (t + b) / 2 }, // 6: left-center
    { x: l, y: t },            // 7: top-left
  ]

  // Find which edge midpoint faces the center (dot product)
  const dx = centerPos.x - cardPos.x
  const dy = centerPos.y - cardPos.y
  const edgeIndices = [0, 2, 4, 6] // TC, RC, BC, LC
  let bestIdx = 0
  let bestDot = -Infinity
  for (const idx of edgeIndices) {
    const edx = perimeterAll[idx].x - cardPos.x
    const edy = perimeterAll[idx].y - cardPos.y
    const dot = edx * dx + edy * dy
    if (dot > bestDot) {
      bestDot = dot
      bestIdx = idx
    }
  }

  // Build perimeter loop starting and ending at the exit edge
  const perimeter: Point[] = []
  for (let i = 0; i <= 8; i++) {
    perimeter.push(perimeterAll[(bestIdx + i) % 8])
  }

  // Bezier from exit point to center (12 samples)
  const exitPt = perimeterAll[bestIdx]
  const bezier: Point[] = []
  const N = 12
  for (let i = 0; i <= N; i++) {
    const t2 = i / N
    const mt = 1 - t2
    bezier.push({
      x: mt * mt * exitPt.x + 2 * mt * t2 * controlPt.x + t2 * t2 * centerPos.x,
      y: mt * mt * exitPt.y + 2 * mt * t2 * controlPt.y + t2 * t2 * centerPos.y,
    })
  }

  // Combine: perimeter loop + bezier to center
  const all = [...perimeter, ...bezier]
  return {
    xs: all.map((p) => p.x),
    ys: all.map((p) => p.y),
  }
}

// ─── Energy Pulse: loops card border then travels to center ───
function EnergyPulse({
  cardPos,
  centerPos,
  controlPoint,
  color,
  isDark,
  duration,
  delay,
}: {
  cardPos: Point
  centerPos: Point
  controlPoint: Point
  color: string
  isDark: boolean
  duration: number
  delay: number
}) {
  const { xs, ys } = useMemo(
    () => generatePulsePath(cardPos, centerPos, controlPoint),
    [cardPos, centerPos, controlPoint]
  )

  // Total keyframes count
  const total = xs.length
  // Build opacity: visible during border + travel, fade at start/end
  const opacityKeys = xs.map((_, i) => {
    if (i === 0) return 0
    if (i <= 2) return 0.9
    if (i >= total - 2) return 0
    return 1
  })

  // Size shrinks as it approaches center
  const sizeKeys = xs.map((_, i) => {
    if (i < 9) return 1 // during border loop
    const progress = (i - 9) / (total - 9)
    return 1 - progress * 0.5 // shrink to 50% at center
  })

  const dotSize = isDark ? 10 : 8

  return (
    <>
      {/* Main pulse dot */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: color,
          zIndex: 25,
        }}
        animate={{
          left: xs,
          top: ys,
          opacity: opacityKeys,
          scale: sizeKeys,
        }}
        transition={{
          duration,
          delay,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      {/* Glow trail behind the pulse */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: dotSize * 3,
          height: dotSize * 3,
          marginLeft: (-dotSize * 3) / 2,
          marginTop: (-dotSize * 3) / 2,
          background: `radial-gradient(circle, ${color}60 0%, ${color}00 70%)`,
          filter: isDark ? "blur(4px)" : "blur(3px)",
          zIndex: 24,
        }}
        animate={{
          left: xs,
          top: ys,
          opacity: opacityKeys.map((o) => o * 0.6),
          scale: sizeKeys,
        }}
        transition={{
          duration,
          delay,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </>
  )
}

// ─── Card Component ───
function OrbitCard({
  feature,
  finalPos,
  scatteredPos,
  phase,
  index,
  isDark,
  onHover,
}: {
  feature: Feature
  finalPos: Point
  scatteredPos: Point
  phase: AnimationPhase
  index: number
  isDark: boolean
  onHover: (idx: number | null) => void
}) {
  const prefersReduced = useReducedMotion()

  const isVisible =
    phase === "scattered" ||
    phase === "drawing" ||
    phase === "settling" ||
    phase === "floating"

  const isSettled = phase === "settling" || phase === "floating"
  const isFloating = phase === "floating"

  const targetX = isSettled ? finalPos.x : scatteredPos.x
  const targetY = isSettled ? finalPos.y : scatteredPos.y

  const color = isDark ? feature.colorDark : feature.color
  const Icon = feature.icon

  return (
    <motion.div
      className="absolute z-20"
      style={{
        width: CARD_SIZE.width,
        height: CARD_SIZE.height,
        left: -CARD_SIZE.width / 2,
        top: -CARD_SIZE.height / 2,
      }}
      initial={{ opacity: 0, scale: 0.8, x: scatteredPos.x, y: scatteredPos.y }}
      animate={
        isVisible
          ? { opacity: 1, scale: 1, x: targetX, y: targetY }
          : { opacity: 0, scale: 0.8, x: scatteredPos.x, y: scatteredPos.y }
      }
      transition={
        isSettled
          ? { type: "spring", stiffness: 120, damping: 20, delay: index * 0.08 }
          : { duration: 0.4, delay: index * 0.1, ease: "easeOut" }
      }
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      whileHover={
        prefersReduced
          ? {}
          : { scale: 1.08, y: targetY - 4, transition: { duration: 0.2 } }
      }
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={
          isSettled && !prefersReduced
            ? {
                y: [0, FLOATING_CONFIG.y.values[1], 0],
                rotateZ: FLOATING_CONFIG.rotate.values,
              }
            : {}
        }
        transition={
          isSettled
            ? {
                y: {
                  duration: FLOATING_CONFIG.y.duration + index * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop" as const,
                },
                rotateZ: {
                  duration: FLOATING_CONFIG.rotate.duration + index * 0.3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop" as const,
                },
              }
            : {}
        }
        className="relative w-full h-full"
      >
        {/* Card body */}
        <div
          className={`
            w-full h-full rounded-xl border px-3 py-2.5 flex items-center gap-3
            cursor-default select-none transition-colors duration-300
            ${
              isDark
                ? "bg-[#1A1715]/80 backdrop-blur-sm border-[#2D2925] hover:border-opacity-60"
                : "bg-white/80 backdrop-blur-sm border-[#d8ccc4] hover:border-opacity-60"
            }
          `}
          style={{
            boxShadow: isDark
              ? `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(45,41,37,0.5)`
              : `0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(216,204,196,0.5)`,
          }}
        >
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: isDark ? `${color}20` : `${color}15` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
          <div className="min-w-0">
            <p
              className={`text-xs font-semibold leading-tight truncate ${
                isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
              }`}
            >
              {feature.title}
            </p>
            <p
              className={`text-[10px] leading-tight truncate mt-0.5 ${
                isDark ? "text-[#B8AEA4]" : "text-[#4f6f64]"
              }`}
            >
              {feature.subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main OrbitLayout ───
export function OrbitLayout({
  phase,
  containerSize,
  radius,
  isDark,
}: OrbitLayoutProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()

  const centerX = containerSize.width / 2
  const centerY = containerSize.height / 2

  const positions = useMemo(() => {
    return FEATURES.map((feature, i) => {
      const final = getOrbitPosition(feature.angle, radius, centerX, centerY)
      const scattered = {
        x: final.x + SCATTER_OFFSETS[i].x,
        y: final.y + SCATTER_OFFSETS[i].y,
      }
      return { final, scattered }
    })
  }, [radius, centerX, centerY])

  // SVG paths center → card (for line drawing)
  const paths = useMemo(() => {
    return positions.map((pos) =>
      getSvgPath(centerX, centerY, pos.final.x, pos.final.y)
    )
  }, [positions, centerX, centerY])

  // Control points for bezier (for pulse path calculation)
  const controlPoints = useMemo(() => {
    return positions.map((pos) =>
      getControlPoint(centerX, centerY, pos.final.x, pos.final.y)
    )
  }, [positions, centerX, centerY])

  const showLines =
    phase === "drawing" || phase === "settling" || phase === "floating"
  const showPulses = phase === "floating"

  return (
    <div
      className="absolute inset-0"
      style={{ width: containerSize.width, height: containerSize.height }}
    >
      {/* SVG overlay for connection lines */}
      <svg
        className="absolute inset-0 z-10 pointer-events-none"
        width={containerSize.width}
        height={containerSize.height}
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      >
        {isDark && (
          <defs>
            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Connection lines */}
        {paths.map((d, i) => {
          const feature = FEATURES[i]
          const color = isDark ? feature.colorDark : feature.color
          const isHovered = hoveredCard === i
          const baseOpacity = isDark ? 0.3 : 0.2
          const opacity = isHovered ? (isDark ? 0.7 : 0.5) : baseOpacity

          return (
            <motion.path
              key={feature.id}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={isHovered ? 2 : 1.5}
              strokeOpacity={showLines ? opacity : 0}
              filter={isDark ? "url(#line-glow)" : undefined}
              initial={{ pathLength: 0 }}
              animate={
                showLines
                  ? { pathLength: 1, strokeOpacity: opacity }
                  : { pathLength: 0, strokeOpacity: 0 }
              }
              transition={{
                pathLength: {
                  duration: 1.0,
                  delay: i * 0.12,
                  ease: "easeInOut",
                },
                strokeOpacity: { duration: 0.3 },
              }}
            />
          )
        })}
      </svg>

      {/* Energy pulses: loop card border → travel to center */}
      {showPulses &&
        !prefersReduced &&
        FEATURES.map((feature, i) => {
          const color = isDark ? feature.colorDark : feature.color
          return (
            <EnergyPulse
              key={`pulse-${feature.id}`}
              cardPos={positions[i].final}
              centerPos={{ x: centerX, y: centerY }}
              controlPoint={controlPoints[i]}
              color={color}
              isDark={isDark}
              duration={4 + i * 0.3}
              delay={i * 0.6}
            />
          )
        })}

      {/* Orbital cards */}
      {FEATURES.map((feature, i) => (
        <OrbitCard
          key={feature.id}
          feature={feature}
          finalPos={positions[i].final}
          scatteredPos={positions[i].scattered}
          phase={phase}
          index={i}
          isDark={isDark}
          onHover={setHoveredCard}
        />
      ))}
    </div>
  )
}
