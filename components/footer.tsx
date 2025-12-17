"use client"

import { motion } from "framer-motion"
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  Award,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const footerLinks = {
    produto: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Agente Virtual IA", href: "#ai-agent" },
      { label: "Personalização", href: "#personalizacao" },
      { label: "Planos e Preços", href: "#planos" },
      { label: "Demonstração", href: "#demonstracao" },
    ],
    empresa: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Casos de sucesso", href: "#beneficios" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Contato", href: "#contato" },
    ],
    recursos: [
      { label: "Central de Ajuda", href: "/ajuda" },
      { label: "Status do Sistema", href: "/status" },
      { label: "API & Integrações", href: "/api" },
      { label: "Changelog", href: "/novidades" },
      { label: "Webinars", href: "/webinars" },
    ],
    legal: [
      { label: "Termos de Uso", href: "/termos" },
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "LGPD", href: "/lgpd" },
      { label: "Segurança", href: "/seguranca" },
    ]
  }

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/bellory", label: "Instagram", color: "#E4405F" },
    { icon: Facebook, href: "https://facebook.com/bellory", label: "Facebook", color: "#1877F2" },
    { icon: Linkedin, href: "https://linkedin.com/company/bellory", label: "LinkedIn", color: "#0A66C2" },
    { icon: Twitter, href: "https://twitter.com/bellory", label: "Twitter", color: "#1DA1F2" },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de newsletter
    console.log("Newsletter:", email)
    setEmail("")
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#2a2420] to-[#1a1510] text-white overflow-hidden">
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CTA Newsletter */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Fique por dentro das{" "}
                <span className="bg-gradient-to-r from-[#db6f57] to-[#e88c76] bg-clip-text text-transparent">
                  novidades
                </span>
              </h3>
              <p className="text-white/70 text-lg mb-8">
                Receba dicas de gestão, novidades do produto e ofertas exclusivas
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <InputText
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  required
                />
                <Button
                  type="submit"
                  label="Inscrever"
                  icon={<ArrowRight className="mr-2" size={16} />}
                  iconPos="right"
                  className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:scale-105 transition-all px-8 py-4 rounded-xl font-bold shadow-lg whitespace-nowrap"
                />
              </form>
            </motion.div>
          </div>
        </div>

        {/* Links principais */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Coluna da marca */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-[#db6f57] to-[#e88c76] bg-clip-text text-transparent">
                Bellory
              </div>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              Plataforma completa de gestão para salões de beleza, barbearias e clínicas de estética. 
              Simplifique sua gestão e foque no que importa.
            </p>
            
            {/* Contato */}
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contato@bellory.com.br" className="hover:text-[#db6f57] transition-colors">
                  contato@bellory.com.br
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+5511999999999" className="hover:text-[#db6f57] transition-colors">
                  (11) 99999-9999
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Links - Produto */}
          <div>
            <h4 className="font-bold text-white mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#db6f57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Empresa */}
          <div>
            <h4 className="font-bold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#db6f57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Recursos */}
          <div>
            <h4 className="font-bold text-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#db6f57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#db6f57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Badges de segurança e certificações */}
        <div className="py-8 border-t border-b border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#5a7a6e]" />
              </div>
              <div>
                <div className="font-bold text-sm">SSL Seguro</div>
                <div className="text-xs text-white/60">Criptografia 256-bit</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#5a7a6e]" />
              </div>
              <div>
                <div className="font-bold text-sm">LGPD</div>
                <div className="text-xs text-white/60">100% Compliance</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#5a7a6e]" />
              </div>
              <div>
                <div className="font-bold text-sm">ISO 27001</div>
                <div className="text-xs text-white/60">Certificado</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#5a7a6e]" />
              </div>
              <div>
                <div className="font-bold text-sm">99.9%</div>
                <div className="text-xs text-white/60">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Redes sociais e copyright */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>© 2025 Bellory. Todos os direitos reservados.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-[#db6f57] fill-current" /> no Brasil
            </span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label={social.label}
              >
                <social.icon 
                  className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" 
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}