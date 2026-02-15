"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Star,
} from "lucide-react"
import { Button } from "primereact/button"
import Link from "next/link"
import { useRef, useMemo, useEffect, useState, useCallback } from "react"
import { useTheme } from "@/contexts/HeroThemeContext"
import { themeConfig } from "@/utils/themes"
import { useInteractionTracker } from "@/hooks/tracking"
import { OrbitLayout } from "./OrbitLayout"
import {
  FEATURES,
  ANIMATION_PHASES,
  ORBIT_RADII,
  type AnimationPhase,
} from "./constants"

type Viewport = "mobile" | "tablet" | "desktop"

function getViewport(width: number): Viewport {
  if (width < 768) return "mobile"
  if (width < 1024) return "tablet"
  return "desktop"
}

function getOrbitRadius(width: number): number {
  if (width >= 1536) return ORBIT_RADII["2xl"]
  if (width >= 1280) return ORBIT_RADII.xl
  return ORBIT_RADII.lg
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitContainerRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()
  const { trackClick } = useInteractionTracker()
  const prefersReduced = useReducedMotion()

  const [phase, setPhase] = useState<AnimationPhase>("loading")
  const [viewport, setViewport] = useState<Viewport>("desktop")
  const [containerSize, setContainerSize] = useState({ width: 500, height: 700 })

  const theme = isDark ? themeConfig.dark : themeConfig.light

  // ── Viewport & container measurement ──
  useEffect(() => {
    function measure() {
      const w = window.innerWidth
      setViewport(getViewport(w))

      if (orbitContainerRef.current) {
        const rect = orbitContainerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }

    measure()

    const ro = new ResizeObserver(measure)
    if (orbitContainerRef.current) ro.observe(orbitContainerRef.current)
    window.addEventListener("resize", measure)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  // ── Animation phase state machine ──
  useEffect(() => {
    if (prefersReduced) {
      // Skip all animations, show final state
      setPhase("floating")
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    const phases: AnimationPhase[] = [
      "nucleus",
      "scattered",
      "drawing",
      "settling",
      "floating",
    ]

    phases.forEach((p) => {
      timers.push(setTimeout(() => setPhase(p), ANIMATION_PHASES[p]))
    })

    return () => timers.forEach(clearTimeout)
  }, [prefersReduced])

  // ── Pattern SVG ──
  const patternStyle = useMemo(
    () => ({
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(theme.patternColor)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: parseFloat(theme.patternOpacity),
    }),
    [theme.patternColor, theme.patternOpacity]
  )

  // ── Benefits data ──
  const benefits = useMemo(
    () => [
      { icon: CheckCircle2, text: "40% menos faltas", colorIndex: 0 },
      { icon: TrendingUp, text: "+35% de faturamento", colorIndex: 1 },
      { icon: Users, text: "Clientes mais fieis", colorIndex: 2 },
      { icon: Zap, text: "Economia de 10h/semana", colorIndex: 3 },
    ],
    []
  )

  // ── Computed values ──
  const isDesktop = viewport === "desktop"
  const orbitRadius = getOrbitRadius(containerSize.width)

  // Phase booleans for staggered nucleus animations
  const showNucleus =
    phase === "nucleus" ||
    phase === "scattered" ||
    phase === "drawing" ||
    phase === "settling" ||
    phase === "floating"

  return (
    <>
      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20"
        style={theme.backgroundStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={patternStyle}
        />

        {/* Decorative blobs */}
        <motion.div
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl ${theme.blob1}`}
          style={isDark ? themeConfig.dark.blob1Style : undefined}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl ${theme.blob2}`}
          style={isDark ? themeConfig.dark.blob2Style : undefined}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {isDark && (
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        )}

        {/* ====== MAIN CONTENT ====== */}
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          {isDesktop ? (
            // ── DESKTOP: Orbital layout ──
            <div
              ref={orbitContainerRef}
              className="relative w-full"
              style={{ minHeight: "max(600px, 80vh)" }}
            >
              {/* Orbit SVG + Cards */}
              <OrbitLayout
                phase={phase}
                containerSize={containerSize}
                radius={orbitRadius}
                isDark={isDark}
              />

              {/* Nucleus (center) */}
              <div
                className="absolute z-30 flex flex-col items-center"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: 600,
                  width: "100%",
                }}
              >
                {/* Soft organic blur behind text */}
                <div
                  className="absolute inset-0 -z-10 pointer-events-none "
                  style={{
                    background: isDark
                      ? "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(13,11,10,0.6) 0%, rgba(13,11,10,0.3) 40%, transparent 75%)"
                      : "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(250,248,246,0.6) 0%, rgba(250,248,246,0.3) 40%, transparent 75%)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(4px)",
                    maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 70%)",
                  }}
                />
              
                <NucleusContent
                  theme={theme}
                  isDark={isDark}
                  benefits={benefits}
                  trackClick={trackClick}
                  showNucleus={showNucleus}
                  prefersReduced={!!prefersReduced}
                />
              </div>
            </div>
          ) : (
            // ── MOBILE / TABLET: stacked layout ──
            <div className="max-w-4xl mx-auto">
              <NucleusContent
                theme={theme}
                isDark={isDark}
                benefits={benefits}
                trackClick={trackClick}
                showNucleus={true}
                prefersReduced={!!prefersReduced}
              />

              {/* Feature cards grid */}
              {/* <div
                className={`grid gap-3 mt-8 ${
                  viewport === "tablet"
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {FEATURES.map((feature, index) => {
                  const color = isDark ? feature.colorDark : feature.color
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                      }}
                      className={`
                        flex items-center gap-3 rounded-xl border px-4 py-3
                        transition-colors duration-300
                        ${
                          isDark
                            ? "bg-[#1A1715]/80 backdrop-blur-sm border-[#2D2925]"
                            : "bg-white/80 backdrop-blur-sm border-[#d8ccc4]"
                        }
                      `}
                    >
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: isDark
                            ? `${color}20`
                            : `${color}15`,
                        }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
                          }`}
                        >
                          {feature.title}
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-[#B8AEA4]" : "text-[#4f6f64]"
                          }`}
                        >
                          {feature.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div> */}
            </div>
          )}
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
      </motion.section>
    </>
  )
}

// ─── Nucleus Content (shared between desktop center & mobile top) ───
function NucleusContent({
  theme,
  isDark,
  benefits,
  trackClick,
  showNucleus,
  prefersReduced,
}: {
  theme: typeof themeConfig.light
  isDark: boolean
  benefits: { icon: any; text: string; colorIndex: number }[]
  trackClick: (id: string, label?: string, section?: string) => void
  showNucleus: boolean
  prefersReduced: boolean
}) {
  const delay = prefersReduced ? 0 : 0.1

  return (
    <>
      {/* Headline */}
      <motion.div
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={showNucleus ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="text-center mb-5 mt-4"
      >
        <h1 className="font-serif tracking-tight leading-[1.1] text-balance">
          <span
            className={`block text-3xl sm:text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl font-bold ${theme.headlineColor} transition-colors duration-500`}
          >
            Transforme seu negócio
          </span>
          <span
            className={`block text-3xl sm:text-3xl md:text-4xl lg:text-4xl 2xl:text-5xl font-bold mt-1 ${theme.gradientText} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]`}
          >
            em um império digital
          </span>
        </h1>
      </motion.div>

      {/* Subheadline */}
      <motion.p
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={showNucleus ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
        className={`text-center text-base sm:text-lg lg:text-lg text-balance max-w-2xl mx-auto mb-6 leading-relaxed font-light ${theme.subheadlineColor} transition-colors duration-500`}
      >
        Gestão completa + site personalizado + agente de IA no WhatsApp.
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>
        <span
          className={`${theme.highlightColor} font-medium transition-colors duration-500`}
        >
          Tudo em uma única plataforma
        </span>{" "}
        para você focar no que importa: <br/>seus clientes.
      </motion.p>

      {/* Benefits */}
      <motion.div
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={showNucleus ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.text}
            initial={
              prefersReduced
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            animate={showNucleus ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full shadow-md border
              transition-all duration-300
              ${theme.benefitCard}
              ${isDark ? "hover:border-[#E07A62]/40 hover:shadow-[0_0_20px_rgba(224,122,98,0.15)]" : ""}
            `}
          >
            <benefit.icon
              className="w-4 h-4 transition-colors duration-300"
              style={{ color: theme.benefitColors[benefit.colorIndex] }}
            />
            <span
              className={`text-xs font-medium ${theme.benefitText} transition-colors duration-500`}
            >
              {benefit.text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={showNucleus ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
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
            label="Comece grátis por 14 dias"
            icon={<ArrowRight className="mr-2" size={16} />}
            iconPos="right"
            className={`
              w-full sm:w-auto group relative overflow-hidden
              border-0 text-sm px-6 py-3 rounded-xl font-semibold
              transition-all duration-300 hover:scale-105
              ${theme.primaryButton}
            `}
          />
        </Link>

        <Button
          label="Agende uma demonstração"
          className={`
            w-full sm:w-auto text-sm px-6 py-3 rounded-xl font-semibold
            transition-all duration-300
            ${theme.secondaryButton}
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

      {/* Social proof */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={showNucleus ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
        className={`flex flex-col sm:flex-row items-center justify-center gap-4 text-xs ${theme.socialText} transition-colors duration-500`}
      >
        {/* <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 transition-colors duration-300"
                style={{ fill: theme.starFill, color: theme.starFill }}
              />
            ))}
          </div>
          <span
            className={`font-semibold ${theme.ratingText} transition-colors duration-500`}
          >
            4.9/5
          </span>
          <span>127 avaliações</span>
        </div> */}
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-4 h-4 ${theme.checkIcon} transition-colors duration-300`}
          />
          <span>Sem cartão de crédito - Cancele quando quiser</span>
        </div>
      </motion.div>
    </>
  )
}
