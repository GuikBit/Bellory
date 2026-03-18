"use client"

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef, useMemo } from "react"

// ─── Types ───
type TransitionVariant = "waves" | "diagonal" | "curve" | "peaks" | "mesh"

interface SectionTransitionProps {
  variant: TransitionVariant
  colorFrom?: string
  colorTo?: string
  accentColor?: string
  flip?: boolean
}

// ─── Main component ───
export function SectionTransition({
  variant,
  colorFrom = "#faf8f6",
  colorTo = "#f3eeea",
  accentColor = "#db6f57",
  flip = false,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  const prefersReduced = useReducedMotion()

  const Variant = VARIANTS[variant]

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{
        height: "clamp(80px, 10vw, 150px)",
        marginTop: "-2px",
        marginBottom: "-2px",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <Variant
        colorFrom={colorFrom}
        colorTo={colorTo}
        accentColor={accentColor}
        isInView={isInView}
        prefersReduced={!!prefersReduced}
        containerRef={ref}
      />
    </div>
  )
}

// ─── Shared variant props ───
interface VariantProps {
  colorFrom: string
  colorTo: string
  accentColor: string
  isInView: boolean
  prefersReduced: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 1: WAVES — Layered organic waves
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WavesTransition({
  colorFrom,
  colorTo,
  accentColor,
  isInView,
  prefersReduced,
  containerRef,
}: VariantProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const wave1X = useTransform(scrollYProgress, [0, 1], [0, -40])
  const wave2X = useTransform(scrollYProgress, [0, 1], [0, 25])
  const wave3X = useTransform(scrollYProgress, [0, 1], [0, -15])

  const waves = useMemo(
    () => [
      {
        d: "M0,80 C120,45 240,95 360,60 C480,25 600,75 720,50 C840,25 960,70 1080,45 C1200,20 1320,65 1440,40 L1440,120 L0,120Z",
        opacity: 0.35,
        x: prefersReduced ? 0 : wave1X,
      },
      {
        d: "M0,70 C160,95 280,35 440,65 C600,95 720,30 880,60 C1040,90 1160,40 1280,55 C1400,70 1440,50 1440,50 L1440,120 L0,120Z",
        opacity: 0.55,
        x: prefersReduced ? 0 : wave2X,
      },
      {
        d: "M0,85 C100,55 220,90 380,65 C540,40 660,80 820,55 C980,30 1100,75 1260,50 C1380,35 1440,60 1440,60 L1440,120 L0,120Z",
        opacity: 1,
        x: prefersReduced ? 0 : wave3X,
      },
    ],
    [prefersReduced, wave1X, wave2X, wave3X]
  )

  return (
    <>
      {/* Gradient background for smooth blend */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${colorFrom} 0%, ${colorFrom} 30%, ${colorTo} 100%)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {waves.map((wave, i) => (
          <motion.path
            key={i}
            d={wave.d}
            fill={colorTo}
            fillOpacity={wave.opacity}
            style={{ x: wave.x }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: prefersReduced ? 0.3 : 0.8,
              delay: prefersReduced ? 0 : i * 0.15,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Accent shimmer line along top wave edge */}
        <motion.path
          d="M0,85 C100,55 220,90 380,65 C540,40 660,80 820,55 C980,30 1100,75 1260,50 C1380,35 1440,60 1440,60"
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 0.2 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: prefersReduced ? 0.5 : 1.8, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: 0.2 },
          }}
        />
      </svg>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 2: DIAGONAL — Angled strip with particles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DIAGONAL_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  cx: (i * 130 + 50) % 1440,
  cy: 20 + Math.sin(i * 1.8) * 40,
  r: 1.5 + (i % 3) * 0.8,
  delay: i * 0.25,
  duration: 3 + (i % 4) * 0.8,
}))

function DiagonalTransition({
  colorFrom,
  colorTo,
  accentColor,
  isInView,
  prefersReduced,
}: VariantProps) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${colorFrom} 0%, ${colorFrom} 20%, ${colorTo} 100%)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main diagonal shape */}
        <motion.polygon
          points="0,40 1440,0 1440,120 0,120"
          fill={colorTo}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient accent strip along the diagonal edge */}
        <defs>
          <linearGradient id="diag-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="30%" stopColor={accentColor} stopOpacity="0.35" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.line
          x1="0"
          y1="40"
          x2="1440"
          y2="0"
          stroke="url(#diag-grad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: prefersReduced ? 0.4 : 1.4,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles along the diagonal */}
        {!prefersReduced &&
          DIAGONAL_PARTICLES.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={accentColor}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 0.4, 0],
                      y: [0, -8, 0],
                      x: [0, 6, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </svg>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 3: CURVE — S-curve with traveling dots
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CURVE_PATH =
  "M0,90 C240,20 360,100 600,50 C840,0 960,80 1200,30 C1320,10 1440,50 1440,50"
const CURVE_FILL_PATH =
  "M0,90 C240,20 360,100 600,50 C840,0 960,80 1200,30 C1320,10 1440,50 1440,50 L1440,120 L0,120Z"

const CURVE_DOTS = [
  { dur: "4.5s", begin: "0s", r: 3 },
  { dur: "5.2s", begin: "1.5s", r: 2.2 },
  { dur: "6s", begin: "3s", r: 2.8 },
]

function CurveTransition({
  colorFrom,
  colorTo,
  accentColor,
  isInView,
  prefersReduced,
}: VariantProps) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${colorFrom} 0%, ${colorFrom} 30%, ${colorTo} 100%)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="curve-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.05" />
            <stop offset="25%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.5" />
            <stop offset="75%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
          </linearGradient>
          <filter id="curve-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="curve-motion-path" d={CURVE_PATH} />
        </defs>

        {/* Fill area below curve */}
        <motion.path
          d={CURVE_FILL_PATH}
          fill={colorTo}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: prefersReduced ? 0.3 : 0.7, ease: "easeOut" }}
        />

        {/* Animated stroke along curve */}
        <motion.path
          d={CURVE_PATH}
          fill="none"
          stroke="url(#curve-stroke-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration: prefersReduced ? 0.5 : 2,
              ease: "easeInOut",
            },
            opacity: { duration: 0.3 },
          }}
        />

        {/* Glow line underneath */}
        <motion.path
          d={CURVE_PATH}
          fill="none"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
          style={{ filter: "url(#curve-glow)" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 0.08 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: prefersReduced ? 0.5 : 2.2, ease: "easeInOut" },
            opacity: { duration: 0.5 },
          }}
        />

        {/* Traveling dots */}
        {!prefersReduced &&
          isInView &&
          CURVE_DOTS.map((dot, i) => (
            <circle key={i} r={dot.r} fill={accentColor} opacity="0.5">
              <animateMotion
                dur={dot.dur}
                begin={dot.begin}
                repeatCount="indefinite"
                fill="freeze"
              >
                <mpath href="#curve-motion-path" />
              </animateMotion>
            </circle>
          ))}
      </svg>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 4: PEAKS — Mountain silhouettes with shimmer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PEAK_LAYERS = [
  {
    d: "M0,120 L0,70 L120,30 L200,60 L320,15 L440,55 L540,25 L660,50 L780,10 L880,45 L1000,20 L1100,50 L1200,8 L1320,40 L1440,18 L1440,120Z",
    opacity: 0.3,
    yOffset: 10,
  },
  {
    d: "M0,120 L0,80 L80,50 L180,75 L280,35 L400,65 L500,30 L620,58 L740,22 L860,55 L960,28 L1080,52 L1180,18 L1300,48 L1440,25 L1440,120Z",
    opacity: 0.6,
    yOffset: 5,
  },
  {
    d: "M0,120 L0,85 L100,58 L220,78 L340,42 L460,70 L560,38 L680,62 L800,30 L920,58 L1020,35 L1140,60 L1240,28 L1360,52 L1440,35 L1440,120Z",
    opacity: 1,
    yOffset: 0,
  },
]

const SHIMMER_POINTS = [
  { x: 320, y: 18, delay: 0 },
  { x: 780, y: 14, delay: 1.2 },
  { x: 1200, y: 12, delay: 2.5 },
  { x: 540, y: 28, delay: 0.8 },
  { x: 1000, y: 22, delay: 1.8 },
]

function PeaksTransition({
  colorFrom,
  colorTo,
  accentColor,
  isInView,
  prefersReduced,
}: VariantProps) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${colorFrom} 0%, ${colorFrom} 25%, ${colorTo} 100%)`,
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {PEAK_LAYERS.map((layer, i) => (
          <motion.path
            key={i}
            d={layer.d}
            fill={colorTo}
            fillOpacity={layer.opacity}
            initial={{ opacity: 0, y: 30 + layer.yOffset }}
            animate={
              isInView
                ? { opacity: 1, y: layer.yOffset }
                : { opacity: 0, y: 30 + layer.yOffset }
            }
            transition={{
              duration: prefersReduced ? 0.3 : 0.7,
              delay: prefersReduced ? 0 : i * 0.12,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Ridge highlight line on the front peaks */}
        <motion.path
          d="M0,85 L100,58 L220,78 L340,42 L460,70 L560,38 L680,62 L800,30 L920,58 L1020,35 L1140,60 L1240,28 L1360,52 L1440,35"
          fill="none"
          stroke={accentColor}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 0.2 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: prefersReduced ? 0.4 : 1.6, ease: "easeInOut" },
            opacity: { duration: 0.4, delay: 0.1 },
          }}
        />

        {/* Shimmer sparkles on peaks */}
        {!prefersReduced &&
          SHIMMER_POINTS.map((pt, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="1.5"
                fill={accentColor}
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.5, 0.5],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 2.5,
                  delay: pt.delay + 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Cross sparkle lines */}
              <motion.line
                x1={pt.x - 4}
                y1={pt.y}
                x2={pt.x + 4}
                y2={pt.y}
                stroke={accentColor}
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: [0, 0.4, 0], scaleX: [0.3, 1, 0.3] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 2.5,
                  delay: pt.delay + 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.line
                x1={pt.x}
                y1={pt.y - 4}
                x2={pt.x}
                y2={pt.y + 4}
                stroke={accentColor}
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: [0, 0.4, 0], scaleY: [0.3, 1, 0.3] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 2.5,
                  delay: pt.delay + 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          ))}
      </svg>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 5: MESH — Gradient blob morph transition
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MeshTransition({
  colorFrom,
  colorTo,
  accentColor,
  isInView,
  prefersReduced,
}: VariantProps) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${colorFrom} 0%, ${colorTo} 100%)`,
        }}
      />

      {/* Animated mesh blobs */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="mesh-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <radialGradient id="mesh-blob-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.14" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh-blob-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4f6f64" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4f6f64" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh-blob-3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b3d35" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8b3d35" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Blob cluster */}
        <motion.ellipse
          cx="360"
          cy="60"
          rx="300"
          ry="60"
          fill="url(#mesh-blob-1)"
          style={{ filter: "url(#mesh-blur)" }}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    cx: [360, 380, 340, 360],
                    ry: [60, 55, 65, 60],
                  }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 0.6 },
            cx: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            ry: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.ellipse
          cx="900"
          cy="50"
          rx="280"
          ry="55"
          fill="url(#mesh-blob-2)"
          style={{ filter: "url(#mesh-blur)" }}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    cx: [900, 920, 880, 900],
                    ry: [55, 60, 50, 55],
                  }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.15 },
            cx: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
            ry: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
          }}
        />

        <motion.ellipse
          cx="1260"
          cy="65"
          rx="240"
          ry="50"
          fill="url(#mesh-blob-3)"
          style={{ filter: "url(#mesh-blur)" }}
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    cx: [1260, 1240, 1280, 1260],
                    ry: [50, 55, 48, 50],
                  }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            cx: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            ry: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          }}
        />

        {/* Soft edge blend to colorTo at bottom */}
        <rect
          x="0"
          y="85"
          width="1440"
          height="35"
          fill={colorTo}
          opacity="0.5"
          style={{ filter: "url(#mesh-blur)" }}
        />
      </svg>
    </>
  )
}

// ─── Variant map ───
const VARIANTS: Record<TransitionVariant, React.FC<VariantProps>> = {
  waves: WavesTransition,
  diagonal: DiagonalTransition,
  curve: CurveTransition,
  peaks: PeaksTransition,
  mesh: MeshTransition,
}
