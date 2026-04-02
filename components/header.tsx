"use client"

import { useState } from "react"
import { Menu, X, ArrowRight, Sparkles, LogIn, ChevronDown, Scissors, Sparkle, Building2, Palette, Smartphone, Users, Calendar, MessageSquare, BarChart3, CreditCard, Zap, Bot, Brain, Target, Gift, Crown, Clock, Bell, Star, TrendingUp, Shield, Layers, UsersRound } from "lucide-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Button } from "primereact/button"
import { useRouter } from 'next/navigation'
import { useInteractionTracker } from "@/hooks/tracking"
import StarBorder from "./StarBorder"

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
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)

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
    },
    funcionalidades: {
      categories: [
        {
          label: "Gestão",
          items: [
            { icon: Calendar, title: "Agendamento Online", description: "Agenda inteligente 24/7", href: "/#funcionalidades" },
            { icon: Users, title: "Gestão de Clientes", description: "CRM completo para seu negócio", href: "/#funcionalidades" },
            { icon: CreditCard, title: "Controle Financeiro", description: "Fluxo de caixa e relatórios", href: "/#funcionalidades" },
            { icon: UsersRound, title: "Gestão de Equipe", description: "Agenda individual e bloqueios", href: "/#funcionalidades" },
          ]
        },
        {
          label: "Crescimento",
          items: [
            { icon: BarChart3, title: "Relatórios & Métricas", description: "Dados para decisões certeiras", href: "/#funcionalidades" },
            { icon: MessageSquare, title: "Marketing Automático", description: "Campanhas e lembretes", href: "/#funcionalidades" },
            { icon: TrendingUp, title: "Fidelização", description: "Programas de recompensas", href: "/#funcionalidades" },
          ]
        },
        {
          label: "Inteligência",
          items: [
            { icon: Bot, title: "Agente IA", description: "Assistente virtual inteligente", href: "/#ai-agent", badge: "Novo" },
            { icon: Bell, title: "Notificações Smart", description: "Lembretes automáticos", href: "/#funcionalidades" },
            { icon: Smartphone, title: "App para Clientes", description: "Experiência mobile completa", href: "/#funcionalidades" },
          ]
        }
      ],
      highlight: {
        icon: Sparkles,
        title: "Conheça o Agente IA",
        description: "Automatize atendimentos, agendamentos e muito mais com inteligência artificial.",
        href: "/#ai-agent",
        cta: "Saiba mais"
      }
    }
  }

  const navItems = [
    { label: "Nossas Soluções", href: "/#funcionalidades", key: "funcionalidades", hasDropdown: true },
    { label: "Agente IA", href: "/#ai-agent", key: "agenteIA" },
    { label: "Público-Alvo", key: "publicoAlvo", hasDropdown: true },
    { label: "Planos", key: "planos", hasDropdown: true },
    { label: "Sobre nós", href: "/sobre", key: "sobre" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-2 sm:px-6 ${
          isScrolled
            ? `${theme.headerBg} ${theme.headerShadow} ${theme.headerBorder}`
            : theme.headerBgTransparent
          }
          ${isMobileMenuOpen ? 'bg-white' : ''}
        `}
      >
        <div className="container mx-auto  ">
          <div className="flex items-center justify-between md:h-20 h-12">
            {/* Logo */}
            <div className="flex items-center gap-2" >              
              <Link href="/" className="flex items-center gap-2 group relative">                
                <motion.div
                  whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`flex items-center gap-2 text-2xl font-serif font-bold bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent`}
                >
                  <img src="/bellory2sfundo.svg" alt="Bellory Logo" className="h-7 w-auto" style={{filter: "drop-shadow(2px 2px 2px #11111130)"}} />
                  Bellory
                </motion.div>
              </Link>
            </div>

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
                          <ChevronDown size={16} />
                        </motion.div>
                        <motion.span
                          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${theme.navUnderline}`}
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    ) : (
                      <Link href={item.href || "/"}>
                        <motion.span
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`${theme.navText} hover:${theme.navTextHover} font-medium transition-colors duration-300 relative group block`}
                        >
                          {item.label}
                          <motion.span
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${theme.navUnderline}`}
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
                      </Link>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && item.key === 'funcionalidades' && (
                        /* ===== MEGA MENU - Funcionalidades ===== */
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute top-full right-0 xl:left-3/3 xl:-translate-x-1/2 mt-4 w-[calc(100vw-2rem)] max-w-[980px] ${theme.dropdownBg} rounded-2xl border ${theme.dropdownBorder} overflow-hidden`}
                          style={{
                            boxShadow: "0 25px 80px -15px rgba(219, 111, 87, 0.25), 0 15px 30px -10px rgba(0, 0, 0, 0.12)",
                            transformOrigin: "top center",
                          }}
                        >
                          {/* Linha decorativa animada no topo */}
                          <motion.div
                            variants={topLineVariants}
                            className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35]"
                            style={{ transformOrigin: "left center" }}
                          />

                          {/* Shimmer sweep */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#db6f57]/5 to-transparent pointer-events-none"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          />

                          <div className="flex flex-col xl:flex-row relative z-10">
                            {/* Colunas de categorias */}
                            <div className="flex-1 p-4 xl:p-4 grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-0">
                              {menuData.funcionalidades.categories.map((category, catIdx) => (
                                <motion.div
                                  key={catIdx}
                                  variants={dropdownItemVariants}
                                  className=""
                                >
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#db6f57]/70 mb-3 block px-1 ">
                                    {category.label}
                                  </span>
                                  <div className="flex flex-col gap-2.5">
                                    {category.items.map((feat, featIdx) => {
                                      const FeatIcon = feat.icon
                                      return (
                                        <motion.a
                                          key={featIdx}
                                          href={feat.href}
                                          whileHover={{
                                            x: 4,
                                            backgroundColor: "rgba(219, 111, 87, 0.06)",
                                            transition: { type: "spring", stiffness: 400, damping: 25 }
                                          }}
                                          className="flex items-center gap-3 p-1 rounded-xl group cursor-pointer"
                                        >
                                          <div className={`rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-6`}>
                                            <FeatIcon size={16} color="#db6f57"/>
                                          </div>
                                          <div className="min-w-0">
                                            <div className="flex items-center gap-1.5">
                                              <span className={`text-[13px] font-semibold ${theme.dropdownTitleText} group-hover:text-[#db6f57] transition-colors`}>
                                                {feat.title}
                                              </span>
                                              {'badge' in feat && feat.badge && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#db6f57] text-white font-bold leading-none">
                                                  {feat.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className={`text-[11px] ${theme.dropdownDescText} leading-tight`}>
                                              {feat.description}
                                            </p>
                                          </div>
                                        </motion.a>
                                      )
                                    })}
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* Painel destaque lateral */}
                            <motion.div
                              variants={dropdownItemVariants}
                              className="xl:w-[180px] bg-gradient-to-br from-[#8b3d35] to-[#db6f57] p-4 xl:p-4 flex xl:flex-col items-center xl:items-start gap-4 xl:gap-0 justify-between relative overflow-hidden"
                            >
                              {/* Decorative circles */}
                              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
                              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5 blur-lg" />

                              <div className="relative z-10">
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                                  className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
                                >
                                  <Sparkles size={16} className="text-white" />
                                </motion.div>
                                <h4 className="text-white font-bold text-sm mb-2 leading-tight">
                                  {menuData.funcionalidades.highlight.title}
                                </h4>
                                <p className="text-white/80 text-[11px] leading-relaxed">
                                  {menuData.funcionalidades.highlight.description}
                                </p>
                              </div>

                              <Link
                                href={menuData.funcionalidades.highlight.href}
                                className="relative z-10 mt-4 flex items-center gap-2 text-white text-sm font-semibold group/cta"
                              >
                                <span className="border-b border-white/40 text-xs group-hover/cta:border-white transition-colors">
                                  {menuData.funcionalidades.highlight.cta}
                                </span>
                                <motion.div
                                  whileHover={{ x: 4 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                  <ArrowRight size={12} />
                                </motion.div>
                              </Link>
                            </motion.div>
                          </div>

                          {/* Footer do mega menu */}
                          <motion.div
                            variants={dropdownItemVariants}
                            className={`px-6 py-3 border-t ${theme.dropdownFooterBorder} bg-[#faf8f6] relative z-10 flex items-center justify-between`}
                          >
                            <span className="text-xs text-[#6b5d57]">
                              Conheça as funcionalidades de cada plano
                            </span>
                            <Link href="/#funcionalidades" className={`text-xs ${theme.dropdownFooterText} font-semibold flex items-center gap-2 group`}>
                              Ver todas
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              >
                                <ArrowRight size={16} />
                              </motion.div>
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}

                      {item.hasDropdown && activeDropdown === item.key && item.key !== 'funcionalidades' && (
                        /* ===== DROPDOWN PADRÃO (mesma identidade do mega menu) ===== */
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 ${item.key === 'publicoAlvo' ? 'w-[590px]' : 'w-[340px]'} ${theme.dropdownBg} rounded-2xl border ${theme.dropdownBorder} overflow-hidden`}
                          style={{
                            boxShadow: "0 25px 80px -15px rgba(219, 111, 87, 0.25), 0 15px 30px -10px rgba(0, 0, 0, 0.12)",
                            transformOrigin: "top center",
                          }}
                        >
                          {/* Linha decorativa animada no topo */}
                          <motion.div
                            variants={topLineVariants}
                            className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35]"
                            style={{ transformOrigin: "left center" }}
                          />

                          {/* Shimmer sweep */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#db6f57]/5 to-transparent pointer-events-none"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          />

                          <div className={`p-4 ${item.key === 'publicoAlvo' ? 'grid grid-cols-2 gap-x-4 gap-y-1' : 'flex flex-col gap-1'} relative z-10`}>
                            {menuData[item.key as keyof typeof menuData] && 'items' in menuData[item.key as keyof typeof menuData] && (menuData[item.key as keyof typeof menuData] as { items: Array<{ icon: any; title: string; description: string; href: string; badge?: string }> }).items.map((dropdownItem, index) => {
                              const Icon = dropdownItem.icon
                              return (
                                <motion.a
                                  key={index}
                                  href={dropdownItem.href}
                                  variants={dropdownItemVariants}
                                  whileHover={{
                                    x: 4,
                                    backgroundColor: "rgba(219, 111, 87, 0.06)",
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                  }}
                                  className="flex items-center gap-3 p-1 rounded-xl group cursor-pointer"
                                >
                                  <div className="rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-6">
                                    <Icon size={16} color="#db6f57" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`text-[13px] font-semibold ${theme.dropdownTitleText} group-hover:text-[#db6f57] transition-colors`}>
                                        {dropdownItem.title}
                                      </span>
                                      {'badge' in dropdownItem && dropdownItem.badge && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#db6f57] text-white font-bold leading-none">
                                          {dropdownItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-[11px] ${theme.dropdownDescText} leading-tight`}>
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </motion.a>
                              )
                            })}
                          </div>

                          {/* Footer do Dropdown */}
                          <motion.div
                            variants={dropdownItemVariants}
                            className={`px-6 py-3 border-t ${theme.dropdownFooterBorder} bg-[#faf8f6] relative z-10 flex items-center justify-between`}
                          >
                            
                            <Link
                              href={item.key === 'planos' ? '/#planos' : '/#publicoAlvo'}
                              className={`text-xs ${theme.dropdownFooterText} font-semibold flex items-center gap-2 group`}
                            >
                              <span className="text-xs text-[#6b5d57]">
                                {item.key === 'planos' ? 'Compare os planos e escolha o melhor' : 'Soluções para cada tipo de negócio'}
                              </span>
                              <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              >
                                <ArrowRight size={16} />
                              </motion.div>
                            </Link>
                          </motion.div>
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
                {/* <button
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

                  <motion.span
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r ${theme.navUnderline} rounded-full`}
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.3 }}
                  />
                </button> */}
                <StarBorder
                  as="button"
                  className="bg-transparent cursor-pointer"
                  color="#db6f57"
                  speed="5s"
                  thickness={2}
                  onClick={() => { trackClick("btn-header-entrar", "Entrar", "header"); router.push('https://app.bellory.com.br') }}
                > 
                  <div className="flex items-center gap-2 bg-white py-[6px] px-[20px] text-center text-[14px] rounded-[12px] font-semibold bg-gradient-to-b from-white to-gray-white border-2 border-[#8b3d35]/30 text-[#8b3d35]">
                    <LogIn size={18} className="transition-transform group-hover:translate-x-[-2px]" />
                    <span>Entrar</span>
                  </div>
                </StarBorder>
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
                    <StarBorder
                      as="button"
                      className="bg-transparent cursor-pointer relative"
                      color="#db6f57"
                      speed="5s"
                      thickness={0}
                      onClick={() => { trackClick("btn-header-entrar", "Entrar", "header"); router.push('https://app.bellory.com.br') }}
                    >
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
                      <div className={`  flex items-center gap-2 
                        py-[8px] px-[20px] text-center text-[14px] rounded-[12px] font-semibold 
                        relative text-sm cursor-pointer
                        bg-gradient-to-r ${theme.ctaBtnGradient}
                        ${theme.ctaBtnText} ${theme.ctaBtnShadow}
                        transition-all duration-300
                        ${theme.ctaBtnGlow}
                        `
                        }>
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
                      </div>
                    </StarBorder>
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
              <nav className="flex flex-col gap-2 mb-6">
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
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setMobileSubmenu(mobileSubmenu === item.key ? null : item.key)}
                          className={`text-lg font-medium ${theme.navText} py-3 px-4 rounded-xl ${theme.mobileItemBg} transition-all w-full text-left flex items-center justify-between`}
                        >
                          {item.label}
                          <motion.div
                            animate={{ rotate: mobileSubmenu === item.key ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-[#6b5d57]" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileSubmenu === item.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 flex flex-col gap-1">
                                {/* Funcionalidades - categorias */}
                                {item.key === 'funcionalidades' && menuData.funcionalidades.categories.map((category, catIdx) => (
                                  <div key={catIdx}>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#db6f57]/70 px-3 pt-2 pb-1 block">
                                      {category.label}
                                    </span>
                                    {category.items.map((feat, featIdx) => {
                                      const FeatIcon = feat.icon
                                      return (
                                        <Link
                                          key={featIdx}
                                          href={feat.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#faf8f6] transition-colors"
                                        >
                                          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${theme.dropdownIconBg} flex items-center justify-center text-white flex-shrink-0`}>
                                            <FeatIcon className="w-3.5 h-3.5" />
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-sm font-medium text-[#2a2420]">{feat.title}</span>
                                              {'badge' in feat && feat.badge && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#db6f57] text-white font-bold">{feat.badge}</span>
                                              )}
                                            </div>
                                            <p className="text-[11px] text-[#6b5d57]">{feat.description}</p>
                                          </div>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                ))}

                                {/* Outros dropdowns (publicoAlvo, planos) */}
                                {item.key !== 'funcionalidades' && menuData[item.key as keyof typeof menuData] && 'items' in menuData[item.key as keyof typeof menuData] && (menuData[item.key as keyof typeof menuData] as { items: Array<{ icon: any; title: string; description: string; href: string; badge?: string }> }).items.map((subItem, subIdx) => {
                                  const SubIcon = subItem.icon
                                  return (
                                    <Link
                                      key={subIdx}
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[#faf8f6] transition-colors"
                                    >
                                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${theme.dropdownIconBg} flex items-center justify-center text-white flex-shrink-0`}>
                                        <SubIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-sm font-medium text-[#2a2420]">{subItem.title}</span>
                                          {'badge' in subItem && subItem.badge && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#db6f57] text-white font-bold">{subItem.badge}</span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-[#6b5d57]">{subItem.description}</p>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "/"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium ${theme.navText} py-3 px-4 rounded-xl ${theme.mobileItemBg} transition-all block`}
                      >
                        {item.label}
                      </Link>
                    )}
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
                  Oferta especial: 14 dias gratis + até 10% de desconto no plano anual
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
