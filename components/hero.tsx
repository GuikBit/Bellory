"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Users, Zap, Star } from "lucide-react"
import { Button } from "primereact/button"
import Link from "next/link"
import { useRef, useMemo } from "react"
import { useTheme } from "@/contexts/HeroThemeContext"
import { themeConfig } from "@/utils/themes"
import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()

  // Seleciona o tema atual
  const theme = isDark ? themeConfig.dark : themeConfig.light

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

  return (
    <>
      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20"
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
        {isDark? (
          <Image
            src="/mockup_dark.png"
            alt="teste"
            width={270}
            height={100}
            className="absolute left-0 2xl:left-30 md:block hidden"
            style={{filter: "drop-shadow(2px 2px 2px #11111140)"}}
            
          />
        ):(
          <Image
            src="/mockup-white.png"
            alt="teste"
            width={270}
            height={100}
            className="absolute left-0 2xl:left-30 md:block hidden"
            style={{filter: "drop-shadow(2px 2px 2px #11111140)"}}
            
          />
        )}
        

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
            
            {/* Headline principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center mb-6 mt-4"
            >
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance">
                <span className={`${theme.headlineColor} transition-colors duration-500`}>
                  Transforme seu negocio
                </span>
                <br />
                <span className={`${theme.gradientText} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]`}>
                  em um imperio digital
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
              Gestao completa + site personalizado + agente de IA no WhatsApp.
              <br />
              <span className={`${theme.highlightColor} font-medium transition-colors duration-500`}>
                Tudo em uma unica plataforma
              </span>{" "}
              para voce focar no que importa: seus clientes.
            </motion.p>

            {/* Beneficios rapidos */}
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
                  label="Comece gratis por 14 dias"
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
                label="Agende uma demonstracao"
                className={`
                  w-full sm:w-auto text-base px-10 py-4 rounded-xl font-semibold
                  transition-all duration-300
                  ${theme.secondaryButton}
                `}
                outlined
              />
            </motion.div>

            {/* Prova social com avaliacao */}
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
                <span>127 avaliacoes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${theme.checkIcon} transition-colors duration-300`} />
                <span>Sem cartao de credito - Cancele quando quiser</span>
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
