"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Sparkles, LogIn, ChevronDown, Scissors, Sparkle, Building2, Palette, Smartphone, Users, Calendar, MessageSquare, BarChart3, CreditCard, Zap, Bot, Brain, Target, Gift, Crown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
          isScrolled 
            ? 'backdrop-blur-[3px] bg-white/90 shadow-lg' 
            : 'bg-transparent '
        }`}
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between md:h-20 h-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-serif font-bold bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent"
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
                      <button className="text-[#2a2420] hover:text-[#db6f57] font-medium transition-colors duration-300 relative group flex items-center gap-1">
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`} />
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#db6f57] group-hover:w-full transition-all duration-300" />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="text-[#2a2420] hover:text-[#db6f57] font-medium transition-colors duration-300 relative group"
                      >
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#db6f57] group-hover:w-full transition-all duration-300" />
                      </a>
                    )}

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {item.hasDropdown && activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white rounded-2xl shadow-2xl border border-[#e6d9d4] p-6"
                        >
                          <div className={`grid gap-3 ${
                            item.key === 'publicoAlvo' ? 'grid-cols-2' : 'grid-cols-1'
                          }`}>
                            {menuData[item.key as keyof typeof menuData]?.items.map((dropdownItem, index) => {
                              const Icon = dropdownItem.icon
                              return (
                                <motion.a
                                  key={index}
                                  href={dropdownItem.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#faf8f6] transition-all duration-300 group"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#db6f57] to-[#c55a42] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-[#2a2420] group-hover:text-[#db6f57] transition-colors">
                                        {dropdownItem.title}
                                      </h4>
                                      {'badge' in dropdownItem && dropdownItem.badge && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#db6f57] text-white font-semibold">
                                          {dropdownItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-[#6b5d57] mt-1">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-[#db6f57] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                                </motion.a>
                              )
                            })}
                          </div>

                          {/* Footer do Dropdown (opcional) */}
                          {item.key === 'planos' && (
                            <div className="mt-4 pt-4 border-t border-[#e6d9d4]">
                              <Link href="/comparar-planos" className="text-sm text-[#db6f57] hover:text-[#c55a42] font-semibold flex items-center justify-center gap-2 group">
                                Ver comparação completa de planos
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            )}
            

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                icon={<LogIn className="mr-2" size={16}/>}
                label="Entrar"
                className="bg-white text-[#8b3d35] border border-[#8b3d35] hover:border-[#db6f57] hover:text-[#db6f57] hover:scale-105 transition-all duration-300 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-lg"
                text
                size="small"
                onClick={() => router.push('https://app.bellory.com.br')}
              />
              {isCadastro && (
                <Link href="/cadastro">
                  <Button
                    label="Começar grátis"
                    icon={<ArrowRight className="mr-2" size={16} />}
                    iconPos="right"
                    className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] border border-[#db6f57] hover:border-[#db6f57] text-white hover:scale-105 transition-all duration-300 px-4 py-1.5 rounded-lg text-sm font-semibold shadow-lg"
                  />
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-12 left-0 right-0 z-40 bg-white border-b border-[#d8ccc4] shadow-2xl lg:hidden overflow-y-auto max-h-[calc(100vh-5rem)]"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-4 mb-6">
                {navItems.map((item, index) => (
                  <div key={item.label}>
                    {item.hasDropdown ? (
                      <div className="border border-[#e6d9d4] rounded-xl p-4 bg-[#faf8f6]">
                        <h3 className="font-semibold text-[#2a2420] mb-3 flex items-center gap-2">
                          {item.label}
                        </h3>
                        <div className="space-y-2">
                          {menuData[item.key as keyof typeof menuData]?.items.map((dropdownItem, idx) => {
                            const Icon = dropdownItem.icon
                            return (
                              <a
                                key={idx}
                                href={dropdownItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-all"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#db6f57] to-[#c55a42] flex items-center justify-center text-white">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-[#2a2420]">{dropdownItem.title}</h4>
                                  <p className="text-xs text-[#6b5d57] mt-0.5">{dropdownItem.description}</p>
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <motion.a
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium text-[#2a2420] hover:text-[#db6f57] py-3 px-4 rounded-xl hover:bg-[#faf8f6] transition-all block"
                      >
                        {item.label}
                      </motion.a>
                    )}
                  </div>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button
                  label="Entrar"
                  className="w-full border-2 border-[#8b3d35] text-[#8b3d35] hover:bg-[#8b3d35] hover:text-white py-3 rounded-xl font-semibold transition-all"
                  outlined
                  onClick={() => router.push('https://app.bellory.com.br')}
                />
                <Link href="/cadastro" className="w-full">
                  <Button
                    label="Começar grátis"
                    icon={<ArrowRight className="mr-2" size={16} />}
                    iconPos="right"
                    className="w-full bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 py-3 rounded-xl font-semibold shadow-lg"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky promo bar (aparece no scroll) */}
      {isMenu && (
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 80 }}
              exit={{ y: -100 }}
              className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#8b3d35] to-[#db6f57] text-white py-2 shadow-lg hidden lg:block"
            >
              <div className="container mx-auto px-4 flex items-center justify-center gap-4 text-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">
                  🎉 Oferta especial: 14 dias grátis + 20% de desconto no plano anual
                </span>
                <Button
                  label="Aproveitar"
                  className="bg-white text-[#8b3d35] border-0 hover:scale-105 transition-all px-4 py-1 rounded-lg font-bold text-xs"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </>
  )
}