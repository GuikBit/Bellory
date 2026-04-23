"use client"

import { motion } from "framer-motion"
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
  Shield,
  Award,
  ArrowRight,
  Send,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const footerLinks = {
    produto: [
      { label: "Funcionalidades", href: "/funcionalidades" },
      { label: "Agente Virtual IA", href: "/agente-virtual" },
      { label: "Planos e Preços", href: "/#planos" },
    ],
    empresa: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Contato", href: "/#contato" },
    ],
    recursos: [
      { label: "Central de Ajuda", href: "/ajuda" },
      { label: "Status do Sistema", href: "/status" },
    ],
    legal: [
      { label: "Termos de Uso", href: "/termos" },
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "LGPD", href: "/lgpd" },
    ],
  }

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/bellory",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/bellory",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/bellory",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com/bellory", label: "Twitter" },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer className="relative bg-[#f3eeea] overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter CTA */}
        <div className="pb-14 border-b" style={{ borderColor: "#8b3d3515" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a2420] mb-3">
              Fique por dentro das{" "}
              <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
                novidades
              </span>
            </h3>
            <p className="text-sm text-[#5a4a42]/70 mb-6">
              Receba dicas de gestão, novidades do produto e ofertas exclusivas
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-white rounded-xl border border-[#e6d9d4]/50 text-sm text-[#2a2420] placeholder-[#5a4a42]/60 focus:outline-none focus:border-[#db6f57]/40 focus:ring-2 focus:ring-[#db6f57]/10 transition-all"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                Inscrever
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Links */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              <div className="flex items-center gap-2 text-2xl font-serif font-bold bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
                <img
                  src="/bellory2sfundo.svg"
                  alt="Bellory Logo"
                  className="h-7 w-auto"
                  style={{
                    filter: "drop-shadow(2px 2px 2px #11111130)",
                  }}
                />
                Bellory
              </div>
            </Link>
            <p className="text-sm text-[#5a4a42]/70 mb-5 leading-relaxed max-w-xs">
              Plataforma completa de gestão para salões de beleza, barbearias e
              clínicas de estética.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-xs text-[#5a4a42]/60">
              <a
                href="mailto:contato@bellory.com.br"
                className="flex items-center gap-2 hover:text-[#db6f57] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                contato@bellory.com.br
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 hover:text-[#db6f57] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                (11) 99999-9999
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                São Paulo, SP - Brasil
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-[#2a2420] mb-4 capitalize">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#5a4a42]/60 hover:text-[#db6f57] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security badges */}
        <div
          className="py-6 border-t border-b flex flex-wrap justify-center items-center gap-8"
          style={{ borderColor: "#8b3d3512" }}
        >
          {[
            {
              icon: Shield,
              title: "SSL Seguro",
              sub: "Criptografia 256-bit",
              color: "#4f6f64",
            },
            {
              icon: Award,
              title: "LGPD",
              sub: "100% Compliance",
              color: "#4f6f64",
            },
            {
              icon: Award,
              title: "99.9%",
              sub: "Uptime",
              color: "#4f6f64",
            },
          ].map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.title} className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${badge.color}10`,
                    border: `1px solid ${badge.color}20`,
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: badge.color }}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2a2420]">
                    {badge.title}
                  </div>
                  <div className="text-[10px] text-[#5a4a42]/70">
                    {badge.sub}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom: copyright + socials */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#5a4a42]/70">
            <span>&copy; 2026 Bellory. Todos os direitos reservados.</span>
            <span className="hidden md:inline">&middot;</span>
            <span className="flex items-center gap-1">
              Feito com{" "}
              <Heart className="w-3 h-3 text-[#db6f57] fill-current" /> no
              Brasil
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    backgroundColor: "#2a242008",
                    border: "1px solid #2a242010",
                  }}
                >
                  <Icon className="w-4 h-4 text-[#5a4a42]/50 group-hover:text-[#db6f57] transition-colors" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
