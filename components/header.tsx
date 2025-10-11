"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "primereact/button"
import CardNav from "./cardNav"


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Personalização", href: "#personalizacao" },
    // { label: "Demonstração", href: "#demonstracao" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Planos", href: "#planos" },
    { label: "Contato", href: "#contato" },
  ]


  const items: any = [
    {
      label: "Personalização",
      bgColor: "#f1f1f1",
      textColor: "#0D0716",
      links: [
        { label: "Personalização", ariaLabel: "Personalização Total" },
        { label: "Site Profissional", ariaLabel: "Site Profissional" },
        { label: "Mini E-commerce", ariaLabel: "Mini E-commerce" }
      ]
    },
    {
      label: "Funcionalidades", 
      bgColor: "#f4f8f1",
      textColor: "#0D0716",
      links: [
        { label: "Agendamentos inteligentes", ariaLabel: "Featured Projects", href: "#funcionalidades" },
        { label: "Controle de Funcionários", ariaLabel: "Project Case Studies", href: "#funcionalidades" },
        { label: "Catálogo de Serviços", ariaLabel: "Project Case Studies", href: "#funcionalidades" },
        { label: "Gestão de Clientes", ariaLabel: "Project Case Studies", href: "#funcionalidades" }
      ]
    },
    {
      label: "Planos",
      bgColor: "#f8f8f1",
      textColor: "#0D0716",
      links: [
        { label: "Gratuito", ariaLabel: "Email us", href: "#planos"  },
        { label: "Básico", ariaLabel: "Email us", href: "#planos"  },
        { label: "Plus", ariaLabel: "Twitter", href: "#planos" },
        { label: "Premium", ariaLabel: "LinkedIn", href: "#planos" }
      ]
    },
    {
      label: "Contatos",
      bgColor: "#f0f8f4",
      textColor: "#0D0716",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
  ];
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
    >
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Bellory</h1>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center gap-4"
          >
            <Button label="Entrar" outlined className="bg-transparent text-foreground rounded-lg hover:bg-secondary" text />
            <Button
              label="Teste Grátis"
              className="bg-accent text-accent-foreground border-0 hover:bg-accent/90 rounded-lg px-6 cursor-pointer"
            />
          </motion.div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>


      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">

              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence> */}

      <CardNav
        // logo="/Bellory_transparente.png"
        title="Bellory"
        logoAlt="Company Logo"
        items={items}
        baseColor="#ffffff"
        menuColor="#DB6F57"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </motion.header>
    
  )
}
