"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Users, Zap, Star, Moon, Sun } from "lucide-react"
import { Button } from "primereact/button"
import Link from "next/link"
import { useRef, useState, useMemo } from "react"

// ============================================================================
// CONFIGURAÇÃO DOS TEMAS - Light (Elegante) e Dark (Luxuoso)
// ============================================================================

const themeConfig = {
  light: {
    // Backgrounds
    background: "bg-gradient-to-br from-[#faf8f6] via-[#e6d9d4]/30 to-[#faf8f6]",
    backgroundStyle: { background: "linear-gradient(to bottom right, #faf8f6, rgba(230, 217, 212, 0.3), #faf8f6)" },

    // Blobs decorativos
    blob1: "bg-gradient-to-br from-[#db6f57]/20 to-[#8b3d35]/20",
    blob2: "bg-gradient-to-tr from-[#4f6f64]/20 to-[#db6f57]/20",

    // Pattern de fundo
    patternColor: "#8b3d35",
    patternOpacity: "0.03",

    // Textos
    headlineColor: "text-[#2a2420]",
    gradientText: "bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57]",
    subheadlineColor: "text-[#4f6f64]",
    highlightColor: "text-[#8b3d35]",
    textPrimary: "#2a2420",
    textSecondary: "#4f6f64",
    textTertiary: "#8b3d35",

    // Benefícios
    benefitCard: "bg-white border-[#d8ccc4]",
    benefitText: "text-[#2a2420]",
    benefitColors: ["#4f6f64", "#db6f57", "#8b3d35", "#4f6f64"],

    // Botões
    primaryButton: "bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white hover:shadow-xl",
    secondaryButton: "bg-white text-[#8b3d35] border-2 border-[#8b3d35] hover:bg-[#8b3d35] hover:text-white",

    // Badge
    badge: "bg-gradient-to-r from-[#db6f57]/10 via-[#8b3d35]/10 to-[#db6f57]/10 border-[#db6f57]/20",
    badgeIcon: "text-[#db6f57]",
    badgeText: "text-[#8b3d35]",

    // Prova social
    starFill: "#db6f57",
    ratingText: "text-[#2a2420]",
    socialText: "text-[#4f6f64]",
    checkIcon: "text-[#4f6f64]",

    // Theme toggle
    toggleBg: "bg-white/80 backdrop-blur-sm border-[#d8ccc4]",
    toggleIcon: "text-[#db6f57]",
    toggleHover: "hover:bg-[#faf8f6]",
  },

  dark: {
    // Backgrounds - tons escuros sofisticados
    background: "",
    backgroundStyle: { background: "linear-gradient(180deg, #0D0B0A 0%, #141210 50%, #1A1715 100%)" },

    // Blobs decorativos - com cores vibrantes mas sutis
    blob1: "",
    blob1Style: { background: "linear-gradient(135deg, rgba(224, 122, 98, 0.2) 0%, rgba(168, 82, 74, 0.15) 100%)" },
    blob2: "",
    blob2Style: { background: "linear-gradient(135deg, rgba(107, 143, 130, 0.15) 0%, rgba(224, 122, 98, 0.1) 100%)" },

    // Pattern de fundo
    patternColor: "#E07A62",
    patternOpacity: "0.02",

    // Textos
    headlineColor: "text-[#F5F0EB]",
    gradientText: "bg-gradient-to-r from-[#E07A62] via-[#D4AF37] to-[#E07A62]",
    subheadlineColor: "text-[#B8AEA4]",
    highlightColor: "text-[#E07A62]",
    textPrimary: "#F5F0EB",
    textSecondary: "#B8AEA4",
    textTertiary: "#E07A62",

    // Benefícios
    benefitCard: "bg-[#1A1715]/80 backdrop-blur-sm border-[#2D2925]",
    benefitText: "text-[#F5F0EB]",
    benefitColors: ["#6B8F82", "#E07A62", "#D4AF37", "#6B8F82"],

    // Botões
    primaryButton: "bg-gradient-to-r from-[#E07A62] via-[#DB6F57] to-[#A8524A] text-white hover:shadow-[0_0_30px_rgba(224,122,98,0.4)]",
    secondaryButton: "bg-transparent text-[#E07A62] border-2 border-[#E07A62] hover:bg-[#E07A62]/10 hover:border-[#E8937E]",

    // Badge
    badge: "bg-[#1A1715]/60 backdrop-blur-md border-[#E07A62]/30",
    badgeIcon: "text-[#D4AF37]",
    badgeText: "text-[#E07A62]",

    // Prova social
    starFill: "#D4AF37",
    ratingText: "text-[#F5F0EB]",
    socialText: "text-[#B8AEA4]",
    checkIcon: "text-[#6B8F82]",

    // Theme toggle
    toggleBg: "bg-[#1A1715]/80 backdrop-blur-sm border-[#2D2925]",
    toggleIcon: "text-[#D4AF37]",
    toggleHover: "hover:bg-[#242120]",
  },
}

// ============================================================================
// COMPONENTE THEME TOGGLE
// ============================================================================

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
  theme: typeof themeConfig.light | typeof themeConfig.dark
}

function ThemeToggle({ isDark, onToggle, theme }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`
        fixed top-24 right-6 z-50
        flex items-center gap-2 px-4 py-3
        rounded-full border shadow-lg
        transition-all duration-300
        ${theme.toggleBg} ${theme.toggleHover}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className={`w-5 h-5 ${theme.toggleIcon}`} />
          ) : (
            <Sun className={`w-5 h-5 ${theme.toggleIcon}`} />
          )}
        </motion.div>
      </AnimatePresence>
      <span className={`text-sm font-medium ${isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"}`}>
        {isDark ? "Dark" : "Light"}
      </span>
    </motion.button>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL HERO
// ============================================================================

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)

  // Seleciona o tema atual
  const theme = isDark ? themeConfig.dark : themeConfig.light

  // Benefícios com cores dinâmicas
  const benefits = useMemo(() => [
    { icon: CheckCircle2, text: "40% menos faltas", colorIndex: 0 },
    { icon: TrendingUp, text: "+35% de faturamento", colorIndex: 1 },
    { icon: Users, text: "Clientes mais fiéis", colorIndex: 2 },
    { icon: Zap, text: "Economia de 10h/semana", colorIndex: 3 },
  ], [])

  // Pattern SVG dinâmico
  const patternStyle = useMemo(() => ({
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(theme.patternColor)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: parseFloat(theme.patternOpacity),
  }), [theme.patternColor, theme.patternOpacity])

  return (
    <>
      {/* Botão de toggle do tema */}
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} theme={theme} />

      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
        style={theme.backgroundStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Padrão decorativo de fundo */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={patternStyle}
        />

        {/* Efeito de brilho superior (apenas dark) */}
        {isDark && (
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
        )}

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

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            {/* Badge de destaque (opcional - descomentado para dark) */}
            {isDark && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-8"
              >
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm shadow-lg ${theme.badge}`}>
                  <Sparkles className={`w-5 h-5 ${theme.badgeIcon}`} />
                  <span className={`text-sm font-semibold tracking-wide ${theme.badgeText}`}>
                    Experimente o tema Dark Luxuoso
                  </span>
                </div>
              </motion.div>
            )}

            {/* Headline principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center mb-6 mt-4"
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] text-balance">
                <span className={`${theme.headlineColor} transition-colors duration-500`}>
                  Transforme seu negócio
                </span>
                <br />
                <span className={`${theme.gradientText} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]`}>
                  em um império digital
                </span>
              </h1>
            </motion.div>

            {/* Subheadline com proposta de valor */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-center text-xl sm:text-2xl text-balance max-w-4xl mx-auto mb-8 leading-relaxed font-light ${theme.subheadlineColor} transition-colors duration-500`}
            >
              Gestão completa + site personalizado + agente de IA no WhatsApp.
              <br />
              <span className={`${theme.highlightColor} font-medium transition-colors duration-500`}>
                Tudo em uma única plataforma
              </span>{" "}
              para você focar no que importa: seus clientes.
            </motion.p>

            {/* Benefícios rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full shadow-md border
                    transition-all duration-300
                    ${theme.benefitCard}
                    ${isDark ? "hover:border-[#E07A62]/40 hover:shadow-[0_0_20px_rgba(224,122,98,0.15)]" : ""}
                  `}
                >
                  <benefit.icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: theme.benefitColors[benefit.colorIndex] }}
                  />
                  <span className={`text-sm font-medium ${theme.benefitText} transition-colors duration-500`}>
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link href="/cadastro" className="w-full sm:w-auto">
                <Button
                  label="Comece grátis por 14 dias"
                  icon={<ArrowRight className="mr-2" size={16} />}
                  iconPos="right"
                  className={`
                    w-full sm:w-auto group relative overflow-hidden
                    border-0 text-base px-10 py-4 rounded-xl font-semibold
                    transition-all duration-300 hover:scale-105
                    ${theme.primaryButton}
                  `}
                />
              </Link>

              <Button
                label="Agende uma demonstração"
                className={`
                  w-full sm:w-auto text-base px-10 py-4 rounded-xl font-semibold
                  transition-all duration-300
                  ${theme.secondaryButton}
                `}
                outlined
              />
            </motion.div>

            {/* Prova social com avaliação */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm ${theme.socialText} transition-colors duration-500`}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ fill: theme.starFill, color: theme.starFill }}
                    />
                  ))}
                </div>
                <span className={`font-semibold ${theme.ratingText} transition-colors duration-500`}>
                  4.9/5
                </span>
                <span>• 127 avaliações</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${theme.checkIcon} transition-colors duration-300`} />
                <span>Sem cartão de crédito • Cancele quando quiser</span>
              </div>
            </motion.div>

            {/* Indicador visual do tema (apenas dark) */}
            {isDark && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-xs font-medium text-[#D4AF37]">
                    Tema Dark Elegante Ativo
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CSS para animação do gradiente */}
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
