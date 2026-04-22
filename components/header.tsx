"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Building2,
  Calendar,
  ChevronDown,
  Crown,
  CreditCard,
  Gift,
  LogIn,
  Menu,
  MessageCircle,
  MessageSquare,
  Palette,
  Scissors,
  Smartphone,
  Sparkle,
  Sparkles,
  TrendingUp,
  Users,
  UsersRound,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useInteractionTracker } from "@/hooks/tracking"

// ═════════════════════════════════════════════════════════════════
// Data
// ═════════════════════════════════════════════════════════════════

interface DropdownItem {
  icon: LucideIcon
  title: string
  description: string
  href: string
  badge?: string
}

interface PlanoItem extends DropdownItem {
  forWho: string
}

const publicoAlvoItems: DropdownItem[] = [
  {
    icon: Scissors,
    title: "Salões de beleza",
    description: "Gestão completa para espaços multiprofissionais",
    href: "#saloes",
  },
  {
    icon: Scissors,
    title: "Barbearias",
    description: "Agenda e atendimento moderno no WhatsApp",
    href: "#barbearias",
  },
  {
    icon: Sparkle,
    title: "Clínicas de estética",
    description: "Controle de procedimentos e prontuários",
    href: "#estetica",
  },
  {
    icon: Palette,
    title: "Nail designers",
    description: "Ideal para autônomas e studios de unhas",
    href: "#nails",
  },
  {
    icon: Building2,
    title: "Studios compartilhados",
    description: "Agenda por profissional e divisão financeira",
    href: "#studios",
  },
  {
    icon: Sparkle,
    title: "Spas & massagens",
    description: "Gestão para ambientes de relaxamento",
    href: "#spas",
  },
]

const planosItems: PlanoItem[] = [
  {
    icon: Gift,
    title: "Gratuito",
    description: "Pra testar sem compromisso",
    forWho: "Profissionais começando",
    href: "/#planos",
  },
  {
    icon: Zap,
    title: "Básico",
    description: "O essencial para crescer",
    forWho: "Negócios em expansão",
    href: "/#planos",
  },
  {
    icon: Sparkles,
    title: "Profissional",
    description: "Gestão completa + agente IA",
    forWho: "Estabelecimentos consolidados",
    href: "/#planos",
    badge: "Popular",
  },
  {
    icon: Crown,
    title: "Premium",
    description: "Personalização e suporte VIP",
    forWho: "Redes e equipes grandes",
    href: "/#planos",
  },
]

const solucoesCategories = [
  {
    label: "Gestão",
    items: [
      { icon: Calendar, title: "Agenda inteligente", description: "24/7, online e offline", href: "/#funcionalidades" },
      { icon: Users, title: "CRM de clientes", description: "Histórico e preferências", href: "/#funcionalidades" },
      { icon: CreditCard, title: "Financeiro", description: "Fluxo de caixa e comissões", href: "/#funcionalidades" },
      { icon: UsersRound, title: "Gestão de equipe", description: "Agenda individual e bloqueios", href: "/#funcionalidades" },
    ],
  },
  {
    label: "Crescimento",
    items: [
      { icon: BarChart3, title: "Relatórios & métricas", description: "Dados pra decisões certeiras", href: "/#funcionalidades" },
      { icon: MessageSquare, title: "Marketing automático", description: "Campanhas e lembretes", href: "/#funcionalidades" },
      { icon: TrendingUp, title: "Fidelização", description: "Programas de recompensa", href: "/#funcionalidades" },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { icon: Bot, title: "Agente IA", description: "Assistente no seu WhatsApp", href: "/#ai-agent", badge: "Novo" },
      { icon: Bell, title: "Notificações smart", description: "Lembretes automáticos", href: "/#funcionalidades" },
      { icon: Smartphone, title: "App para clientes", description: "Experiência mobile completa", href: "/#funcionalidades" },
    ],
  },
] as const

const navItems = [
  { label: "Soluções", href: "/#funcionalidades", key: "funcionalidades", hasDropdown: true },
  { label: "Agente IA", href: "/agente-virtual", key: "agenteIA", hasDropdown: false },
  { label: "Público-alvo", key: "publicoAlvo", hasDropdown: true },
  { label: "Planos", key: "planos", hasDropdown: true },
  { label: "Sobre", href: "/sobre", key: "sobre", hasDropdown: false },
] as const

// ═════════════════════════════════════════════════════════════════
// Motion variants
// ═════════════════════════════════════════════════════════════════

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.99,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeInOut" as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -14, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 340, damping: 26 },
  },
  exit: { opacity: 0, x: -8, filter: "blur(2px)", transition: { duration: 0.12 } },
}

const topLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const, delay: 0.08 } },
  exit: { scaleX: 0, opacity: 0, transition: { duration: 0.15 } },
}

// ═════════════════════════════════════════════════════════════════
// Sub-components
// ═════════════════════════════════════════════════════════════════

/** Clean horizontal dropdown row — icon beside text, description clamped to 1 line */
function DropdownRow({
  item,
  onClick,
}: {
  item: DropdownItem
  onClick?: () => void
}) {
  const Icon = item.icon
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      variants={itemVariants}
      className="group relative flex items-start gap-3 px-2.5 py-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[#db6f57]/[0.06]"
    >
      {/* Soft tint icon tile */}
      <span className="flex-shrink-0 w-8 h-8 rounded-md bg-[#db6f57]/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-[#db6f57]/15 mt-0.5">
        <Icon className="w-4 h-4 text-[#db6f57]" strokeWidth={2} />
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[13px] font-semibold text-[#2a2420] group-hover:text-[#8b3d35] transition-colors leading-tight">
            {item.title}
          </span>
          {item.badge && (
            <span className="flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#db6f57] to-[#8b3d35] text-white font-bold leading-none uppercase tracking-wider">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#8a7d75] leading-snug mt-0.5 line-clamp-1">
          {item.description}
        </p>
      </div>
    </motion.a>
  )
}

/** Plano card — horizontal with richer content (title + desc + forWho tagline) */
function PlanoRow({ plan, onClick }: { plan: PlanoItem; onClick?: () => void }) {
  const Icon = plan.icon
  return (
    <motion.a
      href={plan.href}
      onClick={onClick}
      variants={itemVariants}
      className="group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer border border-[#e6d9d4]/60 transition-all duration-300 hover:border-[#db6f57]/40 hover:bg-[#db6f57]/[0.04] hover:shadow-[0_8px_20px_-10px_rgba(219,111,87,0.25)]"
    >
      {/* Soft tint icon tile */}
      <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#db6f57]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#db6f57]/20">
        <Icon className="w-[18px] h-[18px] text-[#db6f57]" strokeWidth={2} />
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13.5px] font-semibold text-[#2a2420] group-hover:text-[#8b3d35] transition-colors truncate">
            Plano {plan.title}
          </span>
          {plan.badge && (
            <span className="flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#db6f57] to-[#8b3d35] text-white font-bold leading-none uppercase tracking-wider">
              {plan.badge}
            </span>
          )}
        </div>
        <p className="text-[11.5px] text-[#6b5d57] leading-snug mt-0.5 line-clamp-1">
          {plan.description}
        </p>
        <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-[#db6f57]/80 mt-1.5">
          {plan.forWho}
        </span>
      </div>
    </motion.a>
  )
}

/** Entrar — ghost button, minimal corporate */
function EntrarButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#8b3d35] bg-white border-[1.5px] border-[#8b3d35]/25 transition-all duration-300 hover:border-[#8b3d35] hover:bg-[#8b3d35]/[0.04] hover:shadow-[0_0_20px_rgba(219,111,87,0.15)]"
    >
      <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      <span>Entrar</span>
    </motion.button>
  )
}

/** Comece grátis — gradient-border premium CTA */
function ComeceGratisButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="relative"
    >
      {/* Gradient border wrapper */}
      <div className="relative rounded-xl bg-gradient-to-r from-[#e88c76] via-[#db6f57] to-[#8b3d35] p-[1.5px] shadow-lg hover:shadow-[0_0_30px_rgba(219,111,87,0.45)] transition-shadow duration-300">
        <button
          onClick={onClick}
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-[#db6f57] to-[#c55a42] overflow-hidden"
        >
          {/* Shimmer sweep — subtle, every 7s */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 5.6, ease: "easeOut" }}
            style={{ transform: "skewX(-20deg)" }}
          />
          <span className="relative z-10">Comece grátis</span>
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Header
// ═════════════════════════════════════════════════════════════════

export function Header({ isMenu, isCadastro }: { isMenu?: boolean; isCadastro?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [promoDismissed, setPromoDismissed] = useState(true) // start true to avoid flash before localStorage reads

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

  // Promo dismiss — 7d cookie-ish via localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bellory_promo_dismissed_until")
      if (stored && Number(stored) > Date.now()) {
        setPromoDismissed(true)
      } else {
        setPromoDismissed(false)
      }
    } catch {
      setPromoDismissed(false)
    }
  }, [])

  const dismissPromo = () => {
    const until = Date.now() + 7 * 24 * 60 * 60 * 1000
    try {
      localStorage.setItem("bellory_promo_dismissed_until", String(until))
    } catch {}
    setPromoDismissed(true)
    trackInteraction("promoBarDismiss", "promo-bar-dismiss", {
      elementLabel: "Dismiss promo bar",
      section: "promo-bar",
    })
  }

  const handleLogin = () => {
    trackClick("btn-header-entrar", "Entrar", "header")
    router.push("https://app.bellory.com.br")
  }

  const handleCadastro = () => {
    trackClick("cta-header-comece-gratis", "Comece gratis", "header")
    router.push("/cadastro")
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? "-100%" : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-500 px-2 sm:px-6 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_8px_28px_-12px_rgba(42,36,32,0.12)] border-b border-[#e6d9d4]/60"
            : "bg-transparent"
        } ${isMobileMenuOpen ? "bg-white" : ""}`}
      >
        <div className="container mx-auto">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ${
              isScrolled ? "md:h-16 h-12" : "md:h-[72px] h-12"
            }`}
          >
            {/* ═══ Logo ═══ */}
            <Link href="/" className="flex items-center gap-2 group relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center gap-1.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bellory2sfundo.svg"
                  alt="Bellory"
                  className={`w-auto transition-[height] duration-300 ${
                    isScrolled ? "h-6" : "h-7"
                  }`}
                />
                <span
                  className={`font-serif font-bold bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-header transition-[font-size] duration-300 ${
                    isScrolled ? "text-xl" : "text-2xl"
                  }`}
                >
                  Bellory
                </span>
              </motion.div>
            </Link>

            {/* ═══ Desktop Nav ═══ */}
            {isMenu && (
              <nav className="hidden lg:flex items-center gap-7">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.hasDropdown ? (
                      <motion.button
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.2 }}
                        className="relative group flex items-center gap-1.5 text-[#2a2420] hover:text-[#db6f57] font-medium text-[15px] transition-colors duration-300"
                      >
                        {item.label}
                        <motion.div
                          animate={{ rotate: activeDropdown === item.key ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronDown size={15} />
                        </motion.div>
                        <motion.span
                          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#db6f57] to-[#8b3d35] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: activeDropdown === item.key ? "100%" : 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    ) : (
                      <Link href={"href" in item ? item.href : "/"}>
                        <motion.span
                          whileHover={{ y: -1 }}
                          transition={{ duration: 0.2 }}
                          className="relative group block text-[#2a2420] hover:text-[#db6f57] font-medium text-[15px] transition-colors duration-300"
                        >
                          {item.label}
                          <motion.span
                            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#db6f57] to-[#8b3d35] rounded-full"
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
                      </Link>
                    )}

                    {/* ─── Dropdowns ─── */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && (
                        <>
                          {/* Mega-menu: Soluções */}
                          {item.key === "funcionalidades" && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute top-full left-0 xl:-translate-x-10 mt-4 w-[calc(100vw-2rem)] max-w-[900px] bg-white rounded-2xl border border-[#e6d9d4]/60 overflow-hidden"
                              style={{
                                boxShadow:
                                  "0 25px 80px -15px rgba(219, 111, 87, 0.22), 0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                                transformOrigin: "top left",
                              }}
                            >
                              <motion.div
                                variants={topLineVariants}
                                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35]"
                                style={{ transformOrigin: "left center" }}
                              />

                              <div className="flex flex-col xl:flex-row relative z-10">
                                {/* Categories */}
                                <div className="flex-1 p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-5">
                                  {solucoesCategories.map((cat) => (
                                    <motion.div key={cat.label} variants={itemVariants}>
                                      <span className="block font-serif text-[11px] font-bold uppercase tracking-[0.14em] text-[#db6f57] mb-2 px-3">
                                        {cat.label}
                                      </span>
                                      <div className="flex flex-col gap-0.5">
                                        {cat.items.map((it) => (
                                          <DropdownRow key={it.title} item={it as DropdownItem} />
                                        ))}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Side preview — Agente IA */}
                                <motion.div
                                  variants={itemVariants}
                                  className="xl:w-[280px] relative overflow-hidden bg-gradient-to-br from-[#2a2420] to-[#1a1510] p-6 flex flex-col justify-between"
                                >
                                  {/* Decorative blobs */}
                                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#db6f57]/20 to-transparent blur-2xl" />
                                  <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-tr from-[#4f6f64]/15 to-transparent blur-2xl" />

                                  {/* Top: icon + status */}
                                  <div className="relative">
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#db6f57] to-[#8b3d35] flex items-center justify-center shadow-lg">
                                        <Bot className="w-5 h-5 text-white" />
                                        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#25D366] border-2 border-[#2a2420] flex items-center justify-center">
                                          <MessageCircle className="w-2 h-2 text-white" />
                                        </span>
                                      </div>
                                      <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 px-2 py-1 rounded-full border border-[#25D366]/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                                        Ao vivo
                                      </span>
                                    </div>

                                    <h4 className="font-serif text-white text-lg font-bold leading-tight mb-2">
                                      Agente IA no WhatsApp
                                    </h4>
                                    <p className="text-white/65 text-[12px] leading-relaxed">
                                      Atende, agenda e confirma sozinho — enquanto você cuida dos seus clientes.
                                    </p>

                                    {/* Mini chat preview */}
                                    <div className="mt-4 space-y-1.5">
                                      <div className="bg-white/[0.06] border border-white/10 rounded-lg rounded-tl-sm px-2.5 py-1.5 w-[85%]">
                                        <p className="text-[10px] text-white/75">Queria agendar amanhã às 14h</p>
                                      </div>
                                      <div className="bg-gradient-to-r from-[#db6f57]/25 to-[#8b3d35]/25 border border-[#db6f57]/30 rounded-lg rounded-tr-sm px-2.5 py-1.5 w-[85%] ml-auto">
                                        <p className="text-[10px] text-white">Fechado. Confirmei no sistema ✨</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* CTA */}
                                  <Link
                                    href="/agente-virtual"
                                    onClick={() => trackClick("header-mega-agente-ia", "Ver demo ao vivo", "header-dropdown")}
                                    className="relative mt-5 inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white text-[#2a2420] font-semibold text-[12px] transition-all duration-300 hover:bg-[#db6f57] hover:text-white group/cta"
                                  >
                                    <span>Ver demo ao vivo</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                                  </Link>
                                </motion.div>
                              </div>

                              {/* Footer */}
                              <motion.div
                                variants={itemVariants}
                                className="px-6 py-3 border-t border-[#e6d9d4] bg-[#faf8f6] relative z-10 flex items-center justify-between"
                              >
                                <span className="text-[12px] text-[#6b5d57]">
                                  Conheça todas as funcionalidades da plataforma
                                </span>
                                <Link
                                  href="/#funcionalidades"
                                  className="text-[12px] text-[#db6f57] hover:text-[#8b3d35] font-semibold flex items-center gap-1.5 group/f transition-colors"
                                >
                                  Ver todas
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/f:translate-x-0.5" />
                                </Link>
                              </motion.div>
                            </motion.div>
                          )}

                          {/* Público-alvo — 3x2 grid */}
                          {item.key === "publicoAlvo" && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-white rounded-2xl border border-[#e6d9d4]/60 overflow-hidden"
                              style={{
                                boxShadow:
                                  "0 25px 80px -15px rgba(219, 111, 87, 0.22), 0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                                transformOrigin: "top center",
                              }}
                            >
                              <motion.div
                                variants={topLineVariants}
                                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35]"
                                style={{ transformOrigin: "left center" }}
                              />

                              <div className="p-5 grid grid-cols-3 gap-3 relative z-10">
                                {publicoAlvoItems.map((it) => (
                                  <DropdownRow key={it.title} item={it} />
                                ))}
                              </div>

                              <motion.div
                                variants={itemVariants}
                                className="px-6 py-3 border-t border-[#e6d9d4] bg-[#faf8f6] flex items-center justify-between"
                              >
                                <span className="text-[12px] text-[#6b5d57]">
                                  Uma plataforma para cada tipo de beleza
                                </span>
                                <Link
                                  href="/#publicoAlvo"
                                  className="text-[12px] text-[#db6f57] hover:text-[#8b3d35] font-semibold flex items-center gap-1.5 group/f transition-colors"
                                >
                                  Ver todos
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/f:translate-x-0.5" />
                                </Link>
                              </motion.div>
                            </motion.div>
                          )}

                          {/* Planos — mini-cards */}
                          {item.key === "planos" && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[580px] bg-white rounded-2xl border border-[#e6d9d4]/60 overflow-hidden"
                              style={{
                                boxShadow:
                                  "0 25px 80px -15px rgba(219, 111, 87, 0.22), 0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                                transformOrigin: "top center",
                              }}
                            >
                              <motion.div
                                variants={topLineVariants}
                                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35]"
                                style={{ transformOrigin: "left center" }}
                              />

                              <div className="p-5 relative z-10">
                                <div className="mb-3 px-1">
                                  <span className="block font-serif text-[11px] font-bold uppercase tracking-[0.14em] text-[#db6f57]">
                                    Escolha seu plano
                                  </span>
                                  <p className="text-[12px] text-[#6b5d57] mt-0.5">
                                    Do gratuito ao premium — sem complicação.
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  {planosItems.map((p) => (
                                    <PlanoRow key={p.title} plan={p} />
                                  ))}
                                </div>
                              </div>

                              <motion.div
                                variants={itemVariants}
                                className="px-6 py-3 border-t border-[#e6d9d4] bg-[#faf8f6] flex items-center justify-between"
                              >
                                <span className="text-[12px] text-[#6b5d57]">
                                  Compare lado a lado e escolha o seu
                                </span>
                                <Link
                                  href="/#planos"
                                  className="text-[12px] text-[#db6f57] hover:text-[#8b3d35] font-semibold flex items-center gap-1.5 group/f transition-colors"
                                >
                                  Comparar planos
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/f:translate-x-0.5" />
                                </Link>
                              </motion.div>
                            </motion.div>
                          )}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            )}

            {/* ═══ Desktop CTAs ═══ */}
            <div className="hidden lg:flex items-center gap-3">
              <EntrarButton onClick={handleLogin} />
              {isCadastro && <ComeceGratisButton onClick={handleCadastro} />}
            </div>

            {/* ═══ Mobile toggle ═══ */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-[#e6d9d4]"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="text-[#2a2420]" size={20} />
                ) : (
                  <Menu className="text-[#2a2420]" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ═══════════ Mobile Menu ═══════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-12 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#d8ccc4] shadow-2xl lg:hidden overflow-y-auto max-h-[calc(100vh-3rem)]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="container mx-auto px-4 py-6"
            >
              <nav className="flex flex-col gap-2 mb-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileSubmenu(mobileSubmenu === item.key ? null : item.key)
                          }
                          className="text-lg font-medium text-[#2a2420] py-3 px-4 rounded-xl hover:bg-[#faf8f6] transition-all w-full text-left flex items-center justify-between"
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
                              <div className="pl-3 py-2 flex flex-col gap-1">
                                {item.key === "funcionalidades" &&
                                  solucoesCategories.map((cat) => (
                                    <div key={cat.label}>
                                      <span className="block font-serif text-[11px] font-bold uppercase tracking-[0.14em] text-[#db6f57] px-3 pt-2 pb-1">
                                        {cat.label}
                                      </span>
                                      {cat.items.map((it) => (
                                        <DropdownRow
                                          key={it.title}
                                          item={it as DropdownItem}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                        />
                                      ))}
                                    </div>
                                  ))}

                                {item.key === "publicoAlvo" &&
                                  publicoAlvoItems.map((it) => (
                                    <DropdownRow
                                      key={it.title}
                                      item={it}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    />
                                  ))}

                                {item.key === "planos" &&
                                  planosItems.map((p) => (
                                    <PlanoRow
                                      key={p.title}
                                      plan={p}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    />
                                  ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={"href" in item ? item.href : "/"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium text-[#2a2420] py-3 px-4 rounded-xl hover:bg-[#faf8f6] transition-all block"
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
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleLogin()
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-[#8b3d35] bg-white border-[1.5px] border-[#8b3d35]/25 hover:border-[#8b3d35] hover:bg-[#8b3d35]/[0.04] transition-all"
                >
                  <LogIn size={16} />
                  <span>Entrar</span>
                </button>

                {isCadastro && (
                  <Link
                    href="/cadastro"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <div className="relative rounded-xl bg-gradient-to-r from-[#e88c76] via-[#db6f57] to-[#8b3d35] p-[1.5px] shadow-lg">
                      <div className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-[10px] font-semibold text-sm text-white bg-gradient-to-r from-[#db6f57] to-[#c55a42]">
                        <span>Comece grátis</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ Sticky Promo Bar ═══════════ */}
      {isMenu && (
        <AnimatePresence>
          {isScrolled && !hidden && !promoDismissed && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 64, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#8b3d35] via-[#c55a42] to-[#8b3d35] text-white py-2 shadow-lg hidden lg:block overflow-hidden"
              style={{ backgroundSize: "200% 100%" }}
            >
              {/* Shine sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />

              <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-sm relative z-10">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>

                <span className="font-medium text-[13px]">
                  Oferta especial: 14 dias grátis + até 10% de desconto no plano anual
                </span>

                <Link
                  href="/cadastro?recorrencia=anual"
                  onClick={() =>
                    trackInteraction("promoBarClick", "promo-bar-aproveitar", {
                      elementLabel: "Aproveitar oferta anual",
                      section: "promo-bar",
                    })
                  }
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white text-[#8b3d35] px-4 py-1 rounded-lg font-bold text-xs shadow-md hover:shadow-lg transition-shadow"
                  >
                    Aproveitar
                  </motion.button>
                </Link>

                <button
                  onClick={dismissPromo}
                  aria-label="Fechar promoção"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Scoped keyframes */}
      <style jsx global>{`
        @keyframes gradient-header {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-header {
          animation: gradient-header 8s ease infinite;
        }
      `}</style>
    </>
  )
}
