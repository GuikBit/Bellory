"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Sparkles, LogIn, ChevronDown, Scissors, Sparkle, Building2, Palette, Smartphone, Users, Calendar, MessageSquare, BarChart3, CreditCard, Zap, Bot, Brain, Target, Gift, Crown } from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "primereact/button"
import { useRouter } from 'next/navigation'
import { Spinner } from "./ui/spinner"

export function Header({isMenu, isCadastro}:{isMenu?:boolean, isCadastro?: boolean}) {
  const [isScrolled, setIsScrolled] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
          description: "Ideal para começar - até 50 agendamentos/mês",
          href: "#planos",
          badge: "Grátis"
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
    { label: "Personalização", href: "#personalizacao" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Planos", key: "planos", hasDropdown: true },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] // easeOutExpo para suavidade premium
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
          isScrolled
            ? 'backdrop-blur-md bg-white/95 shadow-xl border-b border-[#e6d9d4]/50'
            : 'bg-transparent '
        }`}
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between md:h-20 h-12">
            {/* Logo com efeito shimmer animado */}
            <Link href="/" className="flex items-center gap-2 group relative">
              <motion.div
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-2xl font-serif font-bold bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent relative overflow-hidden"
              >
                Bellory
                {/* Efeito shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
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
                        className="text-[#2a2420] hover:text-[#db6f57] font-medium transition-colors duration-300 relative group flex items-center gap-1"
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
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#db6f57] to-[#c55a42]"
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
                        className="text-[#2a2420] hover:text-[#db6f57] font-medium transition-colors duration-300 relative group"
                      >
                        {item.label}
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#db6f57] to-[#c55a42]"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    )}

                    {/* Dropdown Menu com efeitos premium */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.95,
                            filter: "blur(10px)"
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "blur(0px)"
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.98,
                            filter: "blur(5px)"
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[500px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#e6d9d4]/50 p-6 overflow-hidden"
                          style={{
                            boxShadow: "0 20px 60px -15px rgba(219, 111, 87, 0.2), 0 10px 20px -10px rgba(0, 0, 0, 0.1)"
                          }}
                        >
                          {/* Gradiente decorativo de fundo */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#db6f57]/10 to-transparent rounded-full blur-3xl" />

                          <div className={`grid gap-3 relative z-10 ${
                            item.key === 'publicoAlvo' ? 'grid-cols-2' : 'grid-cols-1'
                          }`}>
                            {menuData[item.key as keyof typeof menuData]?.items.map((dropdownItem, index) => {
                              const Icon = dropdownItem.icon
                              return (
                                <motion.a
                                  key={index}
                                  href={dropdownItem.href}
                                  initial={{ opacity: 0, x: -20, y: 10 }}
                                  animate={{ opacity: 1, x: 0, y: 0 }}
                                  transition={{
                                    delay: index * 0.05,
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1]
                                  }}
                                  whileHover={{
                                    scale: 1.02,
                                    y: -4,
                                    transition: { duration: 0.2 }
                                  }}
                                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                                >
                                  {/* Efeito de brilho no hover */}
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#db6f57]/5 to-transparent"
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
                                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#db6f57] to-[#c55a42] flex items-center justify-center text-white shadow-md relative z-10"
                                  >
                                    <Icon className="w-5 h-5" />
                                  </motion.div>

                                  <div className="flex-1 min-w-0 relative z-10">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-[#2a2420] group-hover:text-[#db6f57] transition-colors">
                                        {dropdownItem.title}
                                      </h4>
                                      {'badge' in dropdownItem && dropdownItem.badge && (
                                        <motion.span
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ delay: index * 0.05 + 0.2 }}
                                          whileHover={{ scale: 1.1 }}
                                          className="text-xs px-2 py-0.5 rounded-full bg-[#db6f57] text-white font-semibold shadow-sm"
                                        >
                                          {dropdownItem.badge}
                                        </motion.span>
                                      )}
                                    </div>
                                    <p className="text-sm text-[#6b5d57] mt-1">
                                      {dropdownItem.description}
                                    </p>
                                  </div>

                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0 mt-1 relative z-10"
                                  >
                                    <ArrowRight className="w-4 h-4 text-[#db6f57]" />
                                  </motion.div>
                                </motion.a>
                              )
                            })}
                          </div>

                          {/* Footer do Dropdown com animação */}
                          {item.key === 'planos' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="mt-4 pt-4 border-t border-[#e6d9d4] relative z-10"
                            >
                              <Link href="/comparar-planos" className="text-sm text-[#db6f57] hover:text-[#c55a42] font-semibold flex items-center justify-center gap-2 group">
                                Ver comparação completa de planos
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
            

            {/* Desktop CTAs com animações premium */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  icon={<LogIn className="mr-2" size={16}/>}
                  label="Entrar"
                  className="bg-white text-[#8b3d35] border-2 border-[#8b3d35] hover:border-[#db6f57] hover:text-[#db6f57] transition-all duration-300 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl"
                  text
                  size="small"
                  onClick={() => router.push('https://app.bellory.com.br')}
                />
              </motion.div>
              {isCadastro && (
                <Link href="/cadastro">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-lg"
                  >
                    {/* Efeito de brilho animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      style={{ transform: "skewX(-20deg)" }}
                    />
                    <Button
                      label="Começar grátis"
                      icon={<ArrowRight className="mr-2" size={16} />}
                      iconPos="right"
                      className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] border-0 text-white transition-all duration-300 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-2xl relative z-10"
                    />
                  </motion.div>
                </Link>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e6d9d4] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="text-[#2a2420]" size={18} />
              ) : (
                <Menu className="text-[#2a2420]" size={18}  />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu com animações aprimoradas */}
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
            className="fixed top-12 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#d8ccc4] shadow-2xl lg:hidden overflow-y-auto max-h-[calc(100vh-5rem)]"
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
                    {item.hasDropdown ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="border border-[#e6d9d4] rounded-xl p-4 bg-gradient-to-br from-[#faf8f6] to-white shadow-sm"
                      >
                        <h3 className="font-semibold text-[#2a2420] mb-3 flex items-center gap-2">
                          {item.label}
                        </h3>
                        <div className="space-y-2">
                          {menuData[item.key as keyof typeof menuData]?.items.map((dropdownItem, idx) => {
                            const Icon = dropdownItem.icon
                            return (
                              <motion.a
                                key={idx}
                                href={dropdownItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.08 + idx * 0.05,
                                  duration: 0.3
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-all active:scale-95"
                              >
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#db6f57] to-[#c55a42] flex items-center justify-center text-white shadow-md"
                                >
                                  <Icon className="w-4 h-4" />
                                </motion.div>
                                <div>
                                  <h4 className="font-medium text-sm text-[#2a2420]">{dropdownItem.title}</h4>
                                  <p className="text-xs text-[#6b5d57] mt-0.5">{dropdownItem.description}</p>
                                </div>
                              </motion.a>
                            )
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        whileTap={{ scale: 0.98 }}
                        className="text-lg font-medium text-[#2a2420] hover:text-[#db6f57] py-3 px-4 rounded-xl hover:bg-[#faf8f6] transition-all block"
                      >
                        {item.label}
                      </motion.a>
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
                  <Button
                    label="Entrar"
                    className="w-full border-2 border-[#8b3d35] text-[#8b3d35] hover:bg-[#8b3d35] hover:text-white py-3 rounded-xl font-semibold transition-all"
                    outlined
                    onClick={() => router.push('https://app.bellory.com.br')}
                  />
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
                    <Button
                      label="Começar grátis"
                      icon={<ArrowRight className="mr-2" size={16} />}
                      iconPos="right"
                      className="w-full bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 py-3 rounded-xl font-semibold shadow-lg relative z-10"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky promo bar com animações premium */}
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
              className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#8b3d35] via-[#db6f57] to-[#8b3d35] text-white py-2 shadow-2xl hidden lg:block overflow-hidden"
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
                  🎉 Oferta especial: 14 dias grátis + 20% de desconto no plano anual
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    label="Aproveitar"
                    className="bg-white text-[#8b3d35] border-0 transition-all px-4 py-1 rounded-lg font-bold text-xs shadow-lg hover:shadow-xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </>
  )
}