"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Sparkles, LogIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "primereact/button"
import { useRouter } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Agente IA", href: "#ai-agent" },
    { label: "Personalização", href: "#personalizacao" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Planos", href: "#planos" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
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
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[#2a2420] hover:text-[#db6f57] font-medium transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#db6f57] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                icon={<LogIn className="mr-2" size={16}/>}
                label="Entrar"
                className="bg-transparent text-[#8b3d35] border border-[#8b3d35] hover:border-[#db6f57] hover:text-[#db6f57] hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl font-semibold shadow-lg"
                text
                onClick={() => router.push('https://app.bellory.com.br')}
              />
              <Link href="/cadastro">
                <Button
                  label="Começar grátis"
                  icon={<ArrowRight className="mr-2" size={16} />}
                  iconPos="right"
                  className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl font-semibold shadow-lg"
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#e6d9d4] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#2a2420]" />
              ) : (
                <Menu className="w-6 h-6 text-[#2a2420]" />
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
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-[#d8ccc4] shadow-2xl lg:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-4 mb-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-[#2a2420] hover:text-[#db6f57] py-3 px-4 rounded-xl hover:bg-[#faf8f6] transition-all"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button
                  label="Entrar"
                  className="w-full border-2 border-[#8b3d35] text-[#8b3d35] hover:bg-[#8b3d35] hover:text-white py-3 rounded-xl font-semibold transition-all"
                  outlined
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
    </>
  )
}