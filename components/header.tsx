"use client"

import { useState } from "react"
import { Menu, X, ArrowRight, Sparkles, LogIn, ChevronDown, Scissors, Sparkle, Building2, Palette, Smartphone, Users, Calendar, MessageSquare, BarChart3, CreditCard, Zap, Bot, Brain, Target, Gift, Crown } from "lucide-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Button } from "primereact/button"
import { useRouter } from 'next/navigation'
import { useInteractionTracker } from "@/hooks/tracking"

const theme = {
  // Header background
  headerBg: "bg-white/90 backdrop-blur-md",
  headerBgTransparent: "bg-transparent",
  headerBorder: "border-[#e6d9d4]/50",
  headerShadow: "shadow-xl",

  // Logo
  logoGradient: "from-[#db6f57] via-[#8b3d35] to-[#db6f57]",

  // Navigation
  navText: "text-[#2a2420]",
  navTextHover: "text-[#db6f57]",
  navUnderline: "from-[#db6f57] to-[#c55a42]",

  // Dropdown
  dropdownBg: "bg-white",
  dropdownBorder: "border-[#e6d9d4]/50",
  dropdownShadow: "0 20px 60px -15px rgba(219, 111, 87, 0.2), 0 10px 20px -10px rgba(0, 0, 0, 0.1)",
  dropdownGradient: "from-[#db6f57]/10 to-transparent",
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

  // Mobile menu
  mobileMenuBg: "bg-white/95 backdrop-blur-xl",
  mobileMenuBorder: "border-[#d8ccc4]",
  mobileItemBg: "hover:bg-[#faf8f6]",

  // Promo bar
  promoBgGradient: "from-[#8b3d35] via-[#db6f57] to-[#8b3d35]",
  promoText: "text-white",
  promoBtnBg: "bg-white",
  promoBtnText: "text-[#8b3d35]",
}

export function Header({isMenu, isCadastro}:{isMenu?:boolean, isCadastro?: boolean}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const { trackClick, trackInteraction } = useInteractionTracker()

  const router = useRouter()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setIsScrolled(current > 20)
    if (current > previous && current > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

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
          description: "Comunicação direta e automática",
          href: "#whatsapp"
        },
        {
          icon: BarChart3,
          title: "Relatórios Inteligentes",
          description: "Análises e insights do seu negócio",
          href: "#relatorios"
        },
        {
          icon: CreditCard,
          title: "Gestão Financeira",
          description: "Controle completo de pagamentos",
          href: "#financeiro"
        },
        {
          icon: Users,
          title: "Gestão de Clientes",
          description: "Histórico e preferências organizados",
          href: "#clientes"
        },
        {
          icon: Zap,
          title: "Automações",
          description: "Lembretes e confirmações automáticas",
          href: "#automacoes"
        },
        {
          icon: Palette,
          title: "Personalização",
          description: "Personalize o tema do site externo",
          href: "#personalizacao"
        }

      ]
    },
    agenteIA: {
      items: [
        {
          icon: Bot,
          title: "Assistente Virtual 24/7",
          description: "Atendimento automático inteligente",
          href: "#assistente"
        },
        {
          icon: Brain,
          title: "Recomendações Personalizadas",
          description: "Sugestões baseadas em histórico",
          href: "#recomendacoes"
        },
        {
          icon: Target,
          title: "Otimização de Agenda",
          description: "IA que organiza seus horários",
          href: "#otimizacao"
        }
      ]
    },
    publicoAlvo: {
      items: [
        {
          icon: Scissors,
          title: "Salões de Beleza",
          description: "Solução completa para salões",
          href: "#saloes"
        },
        {
          icon: Scissors,
          title: "Barbearias",
          description: "Gestão moderna para barbeiros",
          href: "#barbearias"
        },
        {
          icon: Sparkle,
          title: "Clínicas de Estética",
          description: "Controle profissional de procedimentos",
          href: "#estetica"
        },
        {
          icon: Building2,
          title: "Studios",
          description: "Perfeito para espaços compartilhados",
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
          description: "Gestão para ambientes de relaxamento",
          href: "#spas"
        }
      ]
    },
    planos: {
      items: [
        {
          icon: Gift,
          title: "Plano Gratuito",
          description: "Ideal para começar",
          href: "#planos",
          badge: "Gratis"
        },
        {
          icon: Zap,
          title: "Plano Básico",
          description: "Para começar a crescer",
          href: "#planos",
        },
        {
          icon: Sparkles,
          title: "Plano Profissional",
          description: "O plano que você precisa",
          href: "#planos",
          badge: "Popular"
        },
        {
          icon: Crown,
          title: "Plano Premium",
          description: "Solução completa para estabelecimentos",
          href: "#planos"
        }
      ]
    }
  }

  const navItems = [
    { label: "Funcionalidades",  href:'#funcionalidades', key: "funcionalidades", hasDropdown: true },
    { label: "Agente IA", href: "#ai-agent", key: "agenteIA", hasDropdown: true },
    { label: "Público-Alvo", key: "publicoAlvo", hasDropdown: true },
    { label: "Planos", key: "planos", hasDropdown: true },
    { label: "Sobre nós", key: "sobre"}
  ]

  // Animacoes do dropdown - container principal
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -8,
      scale: 0.96,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        staggerChildren: 0.06,
        delayChildren: 0.08,
        filter: { duration: 0.3 },
      }
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.98,
      filter: "blur(6px)",
      transition: {
        duration: 0.25,
        ease: "easeInOut" as const,
        staggerChildren: 0.03,
        staggerDirection: -1,
        filter: { duration: 0.15 },
      }
    }
  }

  // Animacao de cada item do dropdown - slide lateral com blur
  const dropdownItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
        mass: 0.8,
        filter: { duration: 0.3, ease: "easeOut" as const },
      }
    },
    exit: {
      opacity: 0,
      x: -12,
      filter: "blur(3px)",
      transition: {
        duration: 0.15,
        ease: "easeIn" as const,
      }
    }
  }

  // Animacao da linha decorativa no topo do dropdown
  const topLineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        delay: 0.1,
      }
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? "-100%" : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 ${
          isScrolled
            ? `md:${theme.headerBg} ${theme.headerShadow} md:${theme.headerBorder}`
            : theme.headerBgTransparent
          }
          ${isMobileMenuOpen ? 'bg-white' : 'bg-transparent'}
        `}
      >
        <div className="container mx-auto  ">
          <div className="flex items-center justify-between md:h-20 h-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group relative">
              <motion.div
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`text-2xl font-serif font-bold bg-gradient-to-r ${theme.logoGradient} bg-clip-text text-transparent relative overflow-hidden`}
              >
                Bellory
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

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] ${theme.dropdownBg} rounded-2xl border ${theme.dropdownBorder} p-6 overflow-hidden`}
                          style={{
                            boxShadow: theme.dropdownShadow,
                            transformOrigin: "top center",
                          }}
                        >
                          {/* Linha decorativa animada no topo */}
                          <motion.div
                            variants={topLineVariants}
                            className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${theme.navUnderline}`}
                            style={{ transformOrigin: "left center" }}
                          />

                          {/* Gradiente decorativo de fundo */}
                          <motion.div
                            className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${theme.dropdownGradient} rounded-full blur-3xl`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                          />

                          {/* Shimmer sweep de entrada */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#db6f57]/5 to-transparent pointer-events-none"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          />

                          <div className="grid gap-1 relative z-10">
                            {menuData[item.key as keyof typeof menuData]?.items.map((dropdownItem, index) => {
                              const Icon = dropdownItem.icon
                              return (
                                <motion.a
                                  key={index}
                                  href={dropdownItem.href}
                                  variants={dropdownItemVariants}
                                  whileHover={{
                                    x: 6,
                                    backgroundColor: "rgba(219, 111, 87, 0.06)",
                                    transition: {
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 25,
                                    }
                                  }}
                                  className="flex items-start gap-4 p-3 rounded-xl group relative overflow-hidden cursor-pointer"
                                >
                                  {/* Borda lateral animada no hover */}
                                  <motion.div
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-gradient-to-b ${theme.navUnderline}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    whileHover={{ height: "60%", opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  />

                                  <motion.div
                                    whileHover={{
                                      scale: 1.12,
                                      rotate: -8,
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
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
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 15,
                                            delay: index * 0.06 + 0.3,
                                          }}
                                          whileHover={{ scale: 1.15 }}
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
                                    className="flex-shrink-0 mt-1 relative z-10"
                                    initial={{ opacity: 0, x: -8 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  >
                                    <ArrowRight className={`w-4 h-4 ${theme.dropdownArrow}`} />
                                  </motion.div>
                                </motion.a>
                              )
                            })}
                          </div>

                          {/* Footer do Dropdown */}
                          {item.key === 'planos' && (
                            <motion.div
                              variants={dropdownItemVariants}
                              className={`mt-4 pt-3 border-t ${theme.dropdownFooterBorder} relative z-10`}
                            >
                              <Link href="/comparar-planos" className={`text-sm ${theme.dropdownFooterText} font-semibold flex items-center justify-center gap-2 group`}>
                                Ver comparacao completa de planos
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
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


            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Botao Entrar */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => { trackClick("btn-header-entrar", "Entrar", "header"); router.push('https://app.bellory.com.br') }}
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

              {/* Botao Cadastro/Comece Gratis */}
              {isCadastro && (
                <Link href="/cadastro" onClick={() => trackClick("cta-header-comece-gratis", "Comece gratis", "header")}>
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
                        <Sparkles className="w-3 h-3 text-white/80" />
                      </motion.div>
                    </button>
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[#e6d9d4]"
              >
                {isMobileMenuOpen ? (
                  <X className="text-[#2a2420]" size={18} />
                ) : (
                  <Menu className="text-[#2a2420]" size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
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
                      <span>Comece grátis</span>
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky promo bar */}
      {isMenu && (
        <AnimatePresence>
          {isScrolled && !hidden && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 80, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-r ${theme.promoBgGradient} ${theme.promoText} py-2 shadow-2xl hidden lg:block overflow-hidden`}
              style={{
                backgroundSize: "200% 100%"
              }}
            >
              {/* Efeito de brilho de fundo animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
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
                  <Link href="/cadastro?recorrencia=anual" onClick={() => trackInteraction("promo_bar_click", "promo-bar-aproveitar", { elementLabel: "Aproveitar oferta anual", section: "promo-bar" })}>
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
