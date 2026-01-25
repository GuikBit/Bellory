"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Sparkles, LogIn, ChevronDown, Scissors, Sparkle, Building2, Palette, Smartphone, Users, Calendar, MessageSquare, BarChart3, CreditCard, Zap, Bot, Brain, Target, Gift, Crown, Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "primereact/button"
import { useRouter } from 'next/navigation'
import { useTheme } from "@/contexts/HeroThemeContext"

const headerThemeConfig = {
  light: {
    // Header background
    headerBg: "bg-white/90 backdrop-blur-md",
    headerBgTransparent: "bg-transparent",
    headerBorder: "border-[#e6d9d4]/50",
    headerShadow: "shadow-xl",

    // Logo
    logoGradient: "from-[#db6f57] via-[#8b3d35] to-[#db6f57]",
    logoShimmer: "via-white/40",

    // Navigation
    navText: "text-[#2a2420]",
    navTextHover: "text-[#db6f57]",
    navUnderline: "from-[#db6f57] to-[#c55a42]",

    // Dropdown
    dropdownBg: "bg-white",
    dropdownBorder: "border-[#e6d9d4]/50",
    dropdownShadow: "0 20px 60px -15px rgba(219, 111, 87, 0.2), 0 10px 20px -10px rgba(0, 0, 0, 0.1)",
    dropdownGradient: "from-[#db6f57]/10 to-transparent",
    dropdownItemHover: "hover:border-r-[#db6f57]",
    dropdownItemShimmer: "via-[#db6f57]/5",
    dropdownIconBg: "from-[#db6f57]/70 to-[#c55a42]",
    dropdownIconText: "text-white",
    dropdownTitleText: "text-[#2a2420]",
    dropdownTitleHover: "group-hover:text-[#db6f57]",
    dropdownDescText: "text-[#6b5d57]",
    dropdownArrow: "text-[#db6f57]",
    dropdownBadgeBg: "bg-[#db6f57]",
    dropdownFooterBorder: "border-[#e6d9d4]",
    dropdownFooterText: "text-[#db6f57] hover:text-[#c55a42]",

    // Buttons
    enterBtnBg: "bg-white",
    enterBtnText: "text-[#8b3d35]",
    enterBtnBorder: "border-[#8b3d35]/30",
    enterBtnHoverBorder: "hover:border-[#db6f57]",
    enterBtnHoverText: "hover:text-[#db6f57]",
    enterBtnGlow: "hover:shadow-[0_0_20px_rgba(219,111,87,0.15)]",

    ctaBtnGradient: "from-[#db6f57] via-[#c55a42] to-[#8b3d35]",
    ctaBtnText: "text-white",
    ctaBtnShadow: "shadow-lg hover:shadow-2xl",
    ctaBtnGlow: "hover:shadow-[0_0_30px_rgba(219,111,87,0.4)]",

    // Theme toggle
    toggleBg: "bg-white/90 backdrop-blur-sm",
    toggleBorder: "border-[#e6d9d4]",
    toggleIcon: "text-[#db6f57]",
    toggleHover: "hover:bg-[#faf8f6]",
    toggleText: "text-[#2a2420]",

    // Mobile menu
    mobileMenuBg: "bg-white/95 backdrop-blur-xl",
    mobileMenuBorder: "border-[#d8ccc4]",
    mobileItemBg: "hover:bg-[#faf8f6]",

    // Promo bar
    promoBgGradient: "from-[#8b3d35] via-[#db6f57] to-[#8b3d35]",
    promoText: "text-white",
    promoBtnBg: "bg-white",
    promoBtnText: "text-[#8b3d35]",
  },

  dark: {
    // Header background
    headerBg: "bg-[#0D0B0A]/95 backdrop-blur-md",
    headerBgTransparent: "bg-transparent",
    headerBorder: "border-[#2D2925]/50",
    headerShadow: "shadow-[0_4px_30px_rgba(0,0,0,0.3)]",

    // Logo
    logoGradient: "from-[#E07A62] via-[#D4AF37] to-[#E07A62]",
    logoShimmer: "via-[#D4AF37]/30",

    // Navigation
    navText: "text-[#F5F0EB]",
    navTextHover: "text-[#E07A62]",
    navUnderline: "from-[#E07A62] to-[#D4AF37]",

    // Dropdown
    dropdownBg: "bg-[#1A1715]/98 backdrop-blur-xl",
    dropdownBorder: "border-[#2D2925]",
    dropdownShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(224, 122, 98, 0.1)",
    dropdownGradient: "from-[#E07A62]/10 to-transparent",
    dropdownItemHover: "hover:border-r-[#E07A62]",
    dropdownItemShimmer: "via-[#E07A62]/10",
    dropdownIconBg: "from-[#E07A62] to-[#A8524A]",
    dropdownIconText: "text-white",
    dropdownTitleText: "text-[#F5F0EB]",
    dropdownTitleHover: "group-hover:text-[#E07A62]",
    dropdownDescText: "text-[#B8AEA4]",
    dropdownArrow: "text-[#E07A62]",
    dropdownBadgeBg: "bg-gradient-to-r from-[#db6f57] to-[#E8937E]",
    dropdownFooterBorder: "border-[#2D2925]",
    dropdownFooterText: "text-[#E07A62] hover:text-[#E8937E]",

    // Buttons
    enterBtnBg: "bg-[#1A1715]/80",
    enterBtnText: "text-[#F5F0EB]",
    enterBtnBorder: "border-[#E07A62]/40",
    enterBtnHoverBorder: "hover:border-[#E07A62]",
    enterBtnHoverText: "hover:text-[#E07A62]",
    enterBtnGlow: "hover:shadow-[0_0_25px_rgba(224,122,98,0.2)]",

    ctaBtnGradient: "from-[#E07A62] via-[#DB6F57] to-[#A8524A]",
    ctaBtnText: "text-white",
    ctaBtnShadow: "shadow-lg",
    ctaBtnGlow: "hover:shadow-[0_0_40px_rgba(224,122,98,0.5)]",

    // Theme toggle
    toggleBg: "bg-[#1A1715]/90 backdrop-blur-sm",
    toggleBorder: "border-[#2D2925]",
    toggleIcon: "text-[#E07A62]",
    toggleHover: "hover:bg-[#242120]",
    toggleText: "text-[#F5F0EB]",

    // Mobile menu
    mobileMenuBg: "bg-[#0D0B0A]/98 backdrop-blur-xl",
    mobileMenuBorder: "border-[#2D2925]",
    mobileItemBg: "hover:bg-[#1A1715]",

    // Promo bar
    promoBgGradient: "from-[#1A1715] via-[#E07A62]/20 to-[#1A1715]",
    promoText: "text-[#F5F0EB]",
    promoBtnBg: "bg-gradient-to-r from-[#E07A62] to-[#A8524A]",
    promoBtnText: "text-white",
  }
}

export function Header({isMenu, isCadastro}:{isMenu?:boolean, isCadastro?: boolean}) {
  const [isScrolled, setIsScrolled] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const { isDark, toggleTheme } = useTheme()
  const theme = isDark ? headerThemeConfig.dark : headerThemeConfig.light

  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dados dos menus dropdown
  const menuData = {
    funcionalidades: {
      items: [
        {
          icon: Calendar,
          title: "Agenda Online",
          description: "Agendamento 24/7 para seus clientes",
          href: "#agenda"
        },
        {
          icon: MessageSquare,
          title: "WhatsApp Integrado",
          description: "Comunicacao direta e automatica",
          href: "#whatsapp"
        },
        {
          icon: BarChart3,
          title: "Relatorios Inteligentes",
          description: "Analises e insights do seu negocio",
          href: "#relatorios"
        },
        {
          icon: CreditCard,
          title: "Gestao Financeira",
          description: "Controle completo de pagamentos",
          href: "#financeiro"
        },
        {
          icon: Users,
          title: "Gestao de Clientes",
          description: "Historico e preferencias organizados",
          href: "#clientes"
        },
        {
          icon: Zap,
          title: "Automacoes",
          description: "Lembretes e confirmacoes automaticas",
          href: "#automacoes"
        },
        {
          icon: Palette,
          title: "Personalizacao",
          description: "Personalise o tema do site externo",
          href: "#personalizacao"
        }

      ]
    },
    agenteIA: {
      items: [
        {
          icon: Bot,
          title: "Assistente Virtual 24/7",
          description: "Atendimento automatico inteligente",
          href: "#assistente"
        },
        {
          icon: Brain,
          title: "Recomendacoes Personalizadas",
          description: "Sugestoes baseadas em historico",
          href: "#recomendacoes"
        },
        {
          icon: Target,
          title: "Otimizacao de Agenda",
          description: "IA que organiza seus horarios",
          href: "#otimizacao"
        }
      ]
    },
    publicoAlvo: {
      items: [
        {
          icon: Scissors,
          title: "Saloes de Beleza",
          description: "Solucao completa para saloes",
          href: "#saloes"
        },
        {
          icon: Scissors,
          title: "Barbearias",
          description: "Gestao moderna para barbeiros",
          href: "#barbearias"
        },
        {
          icon: Sparkle,
          title: "Clinicas de Estetica",
          description: "Controle profissional de procedimentos",
          href: "#estetica"
        },
        {
          icon: Building2,
          title: "Studios",
          description: "Perfeito para espacos compartilhados",
          href: "#studios"
        },
        {
          icon: Palette,
          title: "Nail Designers",
          description: "Especializado em design de unhas",
          href: "#nails"
        },
        {
          icon: Sparkle,
          title: "Spas & Massagens",
          description: "Gestao para ambientes de relaxamento",
          href: "#spas"
        }
      ]
    },
    planos: {
      items: [
        {
          icon: Gift,
          title: "Plano Gratuito",
          description: "Ideal para comecar",
          href: "#planos",
          badge: "Gratis"
        },
        {
          icon: Zap,
          title: "Plano Basico",
          description: "Para comecar a crescer",
          href: "#planos",
        },
        {
          icon: Sparkles,
          title: "Plano Profissional",
          description: "O plano que voce precisa",
          href: "#planos",
          badge: "Popular"
        },
        {
          icon: Crown,
          title: "Plano Premium",
          description: "Solucao completa para estabelecimentos",
          href: "#planos"
        }
      ]
    }
  }

  const navItems = [
    { label: "Funcionalidades",  href:'#funcionalidades', key: "funcionalidades", hasDropdown: true },
    { label: "Agente IA", href: "#ai-agent", key: "agenteIA", hasDropdown: true },
    { label: "Publico-Alvo", key: "publicoAlvo", hasDropdown: true },
    // { label: "Personalizacao", href: "#personalizacao" },
    // { label: "Beneficios", href: "#beneficios" },
    { label: "Planos", key: "planos", hasDropdown: true },
    { label: "Sobre nos", key: "sobre"}
  ]

  // Animacoes do dropdown com efeito cascata
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    }
  }

  // Animacao de cada item do dropdown - cascata vertical
  const dropdownItemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      x: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      }
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? `md:${theme.headerBg} ${theme.headerShadow} md:${theme.headerBorder}`
            : theme.headerBgTransparent
          }
          ${isMobileMenuOpen ? (isDark ? 'bg-[#0D0B0A]' : 'bg-white') : 'bg-transparent'}
        `}
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between md:h-20 h-12">
            {/* Logo com efeito shimmer animado */}
            <Link href="/" className="flex items-center gap-2 group relative">
              <motion.div
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`text-2xl font-serif font-bold bg-gradient-to-r ${theme.logoGradient} bg-clip-text text-transparent relative overflow-hidden`}
              >
                Bellory
                {/* Efeito shimmer */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme.logoShimmer} to-transparent`}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut"
                  }}
                  style={{
                    transform: "skewX(-20deg)",
                    filter: "blur(2px)"
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            {isMenu && (
              <nav className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.hasDropdown ? (
                      <motion.button
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`${theme.navText} hover:${theme.navTextHover} font-medium transition-colors duration-300 relative group flex items-center gap-3`}
                      >
                        {item.label}
                        <motion.div
                          animate={{
                            rotate: activeDropdown === item.key ? 180 : 0,
                            scale: activeDropdown === item.key ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                        <motion.span
                          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${theme.navUnderline}`}
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    ) : (
                      <motion.a
                        href={item.href}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`${theme.navText} hover:${theme.navTextHover} font-medium transition-colors duration-300 relative group`}
                      >
                        {item.label}
                        <motion.span
                          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${theme.navUnderline}`}
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    )}

                    {/* Dropdown Menu com animacao cascata */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] ${theme.dropdownBg} rounded-2xl border ${theme.dropdownBorder} p-6 overflow-hidden`}
                          style={{
                            boxShadow: theme.dropdownShadow
                          }}
                        >
                          {/* Gradiente decorativo de fundo */}
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${theme.dropdownGradient} rounded-full blur-3xl`} />

                          {/* Efeito de brilho superior para dark mode */}
                          {isDark && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#E07A62]/30 to-transparent blur-sm" />
                          )}

                          <div className="grid gap-2 relative z-10">
                            {menuData[item.key as keyof typeof menuData]?.items.map((dropdownItem, index) => {
                              const Icon = dropdownItem.icon
                              return (
                                <motion.a
                                  key={index}
                                  href={dropdownItem.href}
                                  variants={dropdownItemVariants}
                                  whileHover={{
                                    scale: 1.02,
                                    x: 4,
                                    transition: { duration: 0.2 }
                                  }}
                                  className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden border-r-0 ${theme.dropdownItemHover} hover:border-r-4`}
                                >
                                  {/* Efeito de brilho no hover */}
                                  <motion.div
                                    className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme.dropdownItemShimmer} to-transparent`}
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                  />

                                  <motion.div
                                    whileHover={{
                                      rotate: [0, -10, 10, 0],
                                      scale: 1.15
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${theme.dropdownIconBg} flex items-center justify-center ${theme.dropdownIconText} shadow-lg relative z-10`}
                                  >
                                    <Icon className="w-5 h-5" />
                                  </motion.div>

                                  <div className="flex-1 min-w-0 relative z-10">
                                    <div className="flex items-center gap-2">
                                      <h5 className={`font-semibold ${theme.dropdownTitleText} ${theme.dropdownTitleHover} transition-colors`}>
                                        {dropdownItem.title}
                                      </h5>
                                      {'badge' in dropdownItem && dropdownItem.badge && (
                                        <motion.span
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ delay: index * 0.05 + 0.2 }}
                                          whileHover={{ scale: 1.1 }}
                                          className={`text-xs px-2 py-0.5 rounded-full ${theme.dropdownBadgeBg} text-white font-semibold shadow-sm`}
                                        >
                                          {dropdownItem.badge}
                                        </motion.span>
                                      )}
                                    </div>
                                    <p className={`text-xs ${theme.dropdownDescText}`}>
                                      {dropdownItem.description}
                                    </p>
                                  </div>

                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0 mt-1 relative z-10"
                                  >
                                    <ArrowRight className={`w-4 h-4 ${theme.dropdownArrow}`} />
                                  </motion.div>
                                </motion.a>
                              )
                            })}
                          </div>

                          {/* Footer do Dropdown com animacao */}
                          {item.key === 'planos' && (
                            <motion.div
                              variants={dropdownItemVariants}
                              className={`mt-4 pt-3 border-t ${theme.dropdownFooterBorder} relative z-10`}
                            >
                              <Link href="/comparar-planos" className={`text-sm ${theme.dropdownFooterText} font-semibold flex items-center justify-center gap-2 group`}>
                                Ver comparacao completa de planos
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.div>
                              </Link>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            )}


            {/* Desktop CTAs com botoes sofisticados */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                className={`
                  flex items-center gap-2 px-3 py-3
                  rounded-xl border-2 cursor-pointer
                  transition-all duration-300
                  ${theme.toggleBg} ${theme.toggleBorder} ${theme.toggleHover}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Moon className={`w-4 h-4 ${theme.toggleIcon}`} />
                    ) : (
                      <Sun className={`w-4 h-4 ${theme.toggleIcon}`} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Botao Entrar - Sofisticado */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => router.push('https://app.bellory.com.br')}
                  className={`
                    relative group flex items-center gap-2 px-5 py-2.5 rounded-xl
                    font-semibold text-sm cursor-pointer
                    border-2 transition-all duration-300
                    ${theme.enterBtnBg} ${theme.enterBtnText} ${theme.enterBtnBorder}
                    ${theme.enterBtnHoverBorder} ${theme.enterBtnHoverText} ${theme.enterBtnGlow}
                  `}
                >
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-[-2px]" />
                  <span>Entrar</span>

                  {/* Linha decorativa inferior */}
                  <motion.span
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r ${theme.navUnderline} rounded-full`}
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              </motion.div>

              {/* Botao Cadastro/Comece Gratis - Premium */}
              {isCadastro && (
                <Link href="/cadastro">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="relative group"
                  >
                    <button
                      className={`
                        relative flex items-center gap-2 px-6 py-2.5 rounded-xl
                        font-semibold text-sm cursor-pointer
                        bg-gradient-to-r ${theme.ctaBtnGradient}
                        ${theme.ctaBtnText} ${theme.ctaBtnShadow}
                        transition-all duration-300
                        ${theme.ctaBtnGlow}
                        overflow-hidden
                      `}
                    >
                      {/* Efeito de brilho animado */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        style={{ transform: "skewX(-20deg)" }}
                      />

                      {/* Borda brilhante para dark mode */}
                      {isDark && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-[#D4AF37]/30"
                          animate={{
                            borderColor: ["rgba(212, 175, 55, 0.3)", "rgba(212, 175, 55, 0.6)", "rgba(212, 175, 55, 0.3)"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}

                      <span className="relative z-10">Comece gratis</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />

                      {/* Icone de sparkle decorativo */}
                      <motion.div
                        className="absolute top-1 right-2"
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        <Sparkles className={`w-3 h-3 ${isDark ? 'text-[#D4AF37]' : 'text-white/80'}`} />
                      </motion.div>
                    </button>
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Theme Toggle Mobile */}
              <motion.button
                onClick={toggleTheme}
                className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-lg transition-colors
                  ${isDark ? 'hover:bg-[#1A1715]' : 'hover:bg-[#e6d9d4]'}
                `}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? (
                  <Moon className="w-4 h-4 text-[#D4AF37]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#db6f57]" />
                )}
              </motion.button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isDark ? 'hover:bg-[#1A1715]' : 'hover:bg-[#e6d9d4]'}`}
              >
                {isMobileMenuOpen ? (
                  <X className={isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"} size={18} />
                ) : (
                  <Menu className={isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"} size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu com animacoes aprimoradas */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={`fixed top-12 left-0 right-0 z-40 ${theme.mobileMenuBg} border-b ${theme.mobileMenuBorder} shadow-2xl lg:hidden overflow-y-auto max-h-[calc(100vh-5rem)]`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="container mx-auto px-4 py-6"
            >
              <nav className="flex flex-col gap-4 mb-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <motion.a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileTap={{ scale: 0.98 }}
                      className={`text-lg font-medium ${theme.navText} py-3 px-4 rounded-xl ${theme.mobileItemBg} transition-all block`}
                    >
                      {item.label}
                    </motion.a>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3"
              >
                <motion.div whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={() => router.push('https://app.bellory.com.br')}
                    className={`
                      w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                      font-semibold border-2 transition-all
                      ${theme.enterBtnBg} ${theme.enterBtnText} ${theme.enterBtnBorder}
                      ${theme.enterBtnHoverBorder} ${theme.enterBtnHoverText}
                    `}
                  >
                    <LogIn size={16} />
                    <span>Entrar</span>
                  </button>
                </motion.div>
                <Link href="/cadastro" className="w-full">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      style={{ transform: "skewX(-20deg)" }}
                    />
                    <button
                      className={`
                        w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl
                        font-semibold text-sm
                        bg-gradient-to-r ${theme.ctaBtnGradient}
                        ${theme.ctaBtnText} ${theme.ctaBtnShadow}
                        transition-all duration-300
                        relative z-10
                      `}
                    >
                      <span>Comece gratis</span>
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky promo bar com animacoes premium */}
      {isMenu && (
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 80, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-r ${theme.promoBgGradient} ${theme.promoText} py-2 shadow-2xl hidden lg:block overflow-hidden`}
              style={{
                backgroundSize: "200% 100%"
              }}
            >
              {/* Efeito de brilho de fundo animado */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r from-transparent ${isDark ? 'via-[#E07A62]/10' : 'via-white/10'} to-transparent`}
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-sm relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>

                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold"
                >
                  Oferta especial: 14 dias gratis + até 15% de desconto no plano anual
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/cadastro?recorrencia=anual">
                    <Button
                      label="Aproveitar"
                      className={`${theme.promoBtnBg} ${theme.promoBtnText} border-0 transition-all px-4 py-1 rounded-lg font-bold text-xs shadow-lg hover:shadow-xl`}
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </>
  )
}
