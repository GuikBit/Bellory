"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Users, Zap, Star } from "lucide-react"
import { Button } from "primereact/button"
import Link from "next/link"
import { useRef, useMemo, useEffect, useState } from "react"
import { useTheme } from "@/contexts/HeroThemeContext"
import { themeConfig } from "@/utils/themes"
import Image from "next/image"
import { useInteractionTracker, useConversionTracker } from "@/hooks/tracking"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)
  const { trackClick } = useInteractionTracker()

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Spring configs for smoother animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

  // Parallax transforms for mockup
  const mockupY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 150]),
    springConfig
  )
  const mockupRotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -5]),
    springConfig
  )
  const mockupScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0.9]),
    springConfig
  )
  const mockupOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [1, 0]),
    springConfig
  )

  // Content parallax (moves slower than mockup for depth)
  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 50]),
    springConfig
  )

  // Seleciona o tema atual
  const theme = isDark ? themeConfig.dark : themeConfig.light

  // Set loaded state after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Beneficios com cores dinamicas
  const benefits = useMemo(() => [
    { icon: CheckCircle2, text: "40% menos faltas", colorIndex: 0 },
    { icon: TrendingUp, text: "+35% de faturamento", colorIndex: 1 },
    { icon: Users, text: "Clientes mais fieis", colorIndex: 2 },
    { icon: Zap, text: "Economia de 10h/semana", colorIndex: 3 },
  ], [])

  // Pattern SVG dinamico
  const patternStyle = useMemo(() => ({
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(theme.patternColor)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: parseFloat(theme.patternOpacity),
  }), [theme.patternColor, theme.patternOpacity])

  // Complex entrance animations for mockup
  const mockupContainerVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotateY: -15,
      rotateZ: -5
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.3,
      }
    }
  }

  // Floating animation for mockup
  const floatingAnimation = {
    y: [0, -15, 0],
    rotateZ: [-1, 1, -1],
    transition: {
      duration: 6,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }

  // Glow pulse animation
  const glowAnimation = {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }

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
        {/* Padrao decorativo de fundo */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={patternStyle}
        />

        {/* ====== MOCKUP DO IPHONE - TELAS GRANDES ====== */}
        <motion.div
          ref={mockupRef}
          className="absolute 2xl:left-60 lg:left-10 top-1/2 -translate-y-1/2 hidden lg:block z-20 pointer-events-none"
          style={{
            y: mockupY,
            rotate: mockupRotate,
            scale: mockupScale,
            opacity: mockupOpacity,
          }}
          variants={mockupContainerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Container do mockup com efeitos */}
          <motion.div
            className="relative "
            // animate={isLoaded ? floatingAnimation : {}}
          >
            {/* Glow effect behind mockup */}
            <motion.div
              className="absolute -inset-10 rounded-[60px] blur-3xl"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(224, 122, 98, 0.3) 0%, rgba(212, 175, 55, 0.1) 40%, transparent 70%)"
                  : "radial-gradient(ellipse at center, rgba(219, 111, 87, 0.25) 0%, rgba(139, 61, 53, 0.1) 40%, transparent 70%)"
              }}
              animate={glowAnimation}
            />

            {/* Reflection/shine effect */}
            <motion.div
              className="absolute -top-5 -right-5 w-40 h-40 rounded-full blur-2xl"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 60%)"
                  : "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 60%)"
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1
              }}
            />

            {/* Main mockup image */}
            <Image
              src={isDark ? "/mockup_dark1.webp" : "/mockup_white1.png"}
              alt="Bellory App - Sistema de Agendamentos"
              width={250}
              height={0}
              className={`relative z-0 drop-shadow-2xl !-contrast-140`}
              style={{
                filter: isDark
                  ? "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 20px rgba(224, 122, 98, 0.15))"
                  : "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15)) drop-shadow(0 10px 20px rgba(139, 61, 53, 0.1))"
              }}
              priority
            />

            {/* Subtle screen glow */}
            <motion.div
              className="absolute top-16 left-4 right-4 bottom-16 rounded-[35px] z-0"
              style={{
                background: isDark
                  ? "linear-gradient(145deg, rgba(224, 122, 98, 0.05) 0%, rgba(107, 143, 130, 0.03) 100%)"
                  : "linear-gradient(145deg, rgba(219, 111, 87, 0.03) 0%, rgba(79, 111, 100, 0.02) 100%)"
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </motion.div>
        </motion.div>

        {/* ====== MOCKUP - TELAS MEDIAS (md) ====== */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block lg:hidden z-20 pointer-events-none"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            {/* Simplified glow for md screens */}
            {/* <div
              className="absolute -inset-8 rounded-[50px] blur-2xl opacity-60"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(224, 122, 98, 0.2) 0%, transparent 70%)"
                  : "radial-gradient(ellipse at center, rgba(219, 111, 87, 0.15) 0%, transparent 70%)"
              }}
            /> */}

            {/* Edge fade - LEFT */}
            {/* <div
              className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(to right, #0D0B0A 0%, transparent 100%)"
                  : "linear-gradient(to right, #faf8f6 0%, transparent 100%)"
              }}
            /> */}

            <Image
              src={isDark ? "/mockup_dark1.png" : "/mockup_white1.png"}
              alt="Bellory App"
              width={180}
              height={0}
              className="relative z-0 drop-shadow-xl"
              style={{
                filter: isDark
                  ? "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))"
                  : "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.1))"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Efeito de brilho superior (apenas dark) */}
        {/* {isDark && (
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse at center, rgba(224, 122, 98, 0.08) 0%, transparent 70%)" }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )} */}

        {/* Blobs decorativos com gradientes */}
        <motion.div
          className={`absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl ${theme.blob1}`}
          style={isDark ? themeConfig.dark.blob1Style : undefined}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl ${theme.blob2}`}
          style={isDark ? themeConfig.dark.blob2Style : undefined}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Blob adicional dourado (apenas dark) */}
        {isDark && (
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)" }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        )}

        {/* ====== CONTEUDO PRINCIPAL ====== */}
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          style={{ y: contentY }}
        >
          {/* Offset para compensar o mockup em telas grandes */}
          <div className="max-w-7xl mx-auto md:ml-auto md:mr-0 lg:ml-auto lg:mr-0 md:w-[75%] lg:w-[70%] xl:w-[65%]">

            {/* Headline principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center mb-5 mt-4 "
            >
              <h1 className="font-serif tracking-tight leading-[1.1] text-balance">
                {/* Mobile: menor */}
                <span className={`block text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold ${theme.headlineColor} transition-colors duration-500`}>
                  Transforme seu negócio
                </span>
                <span className={`block text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl  font-bold mt-1 ${theme.gradientText} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]`}>
                  em um império digital
                </span>
              </h1>
            </motion.div>

            {/* Subheadline com proposta de valor */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-center text-base sm:text-lg lg:text-xl text-balance max-w-2xl md:max-w-none mx-auto md:mx-0 mb-6 lg:mb-8 leading-relaxed font-light ${theme.subheadlineColor} transition-colors duration-500`}
            >
              Gestão completa + site personalizado + agente de IA no WhatsApp.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className={`${theme.highlightColor} font-medium transition-colors duration-500`}>
                Tudo em uma única plataforma
              </span>{" "}
              para você focar no que importa: seus clientes.
            </motion.p>

            {/* Beneficios rapidos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-8 lg:mb-10 "
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-md border
                    transition-all duration-300
                    ${theme.benefitCard}
                    ${isDark ? "hover:border-[#E07A62]/40 hover:shadow-[0_0_20px_rgba(224,122,98,0.15)]" : ""}
                  `}
                >
                  <benefit.icon
                    className="w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-300"
                    style={{ color: theme.benefitColors[benefit.colorIndex] }}
                  />
                  <span className={`text-xs lg:text-sm font-medium ${theme.benefitText} transition-colors duration-500`}>
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs principais */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4 mb-10 lg:mb-12"
            >
              <Link href="/cadastro" className="w-full sm:w-auto" onClick={() => trackClick("cta-hero-comece-gratis", "Comece gratis por 14 dias", "hero")}>
                <Button
                  label="Comece grátis por 14 dias"
                  icon={<ArrowRight className="mr-2" size={16} />}
                  iconPos="right"
                  className={`
                    w-full sm:w-auto group relative overflow-hidden
                    border-0 text-sm lg:text-base px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-semibold
                    transition-all duration-300 hover:scale-105
                    ${theme.primaryButton}
                  `}
                />
              </Link>

              <Button
                label="Agende uma demonstração"
                className={`
                  w-full sm:w-auto text-sm lg:text-base px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-semibold
                  transition-all duration-300
                  ${theme.secondaryButton}
                `}
                outlined
                onClick={() => trackClick("cta-hero-agende-demo", "Agende uma demonstracao", "hero")}
              />
            </motion.div>

            {/* Prova social com avaliacao */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`flex flex-col sm:flex-row items-center justify-center  gap-4 lg:gap-6 text-xs lg:text-sm ${theme.socialText} transition-colors duration-500`}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 lg:w-5 lg:h-5 transition-colors duration-300"
                      style={{ fill: theme.starFill, color: theme.starFill }}
                    />
                  ))}
                </div>
                <span className={`font-semibold ${theme.ratingText} transition-colors duration-500`}>
                  4.9/5
                </span>
                <span>127 avaliações</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 lg:w-5 lg:h-5 ${theme.checkIcon} transition-colors duration-300`} />
                <span>Sem cartão de crédito - Cancele quando quiser</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CSS para animacao do gradiente */}
        <style jsx>{`
          @keyframes gradient {
            0%, 100% {
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
