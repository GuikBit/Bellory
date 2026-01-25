"use client"

import { motion, useInView } from "framer-motion"
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  Sparkles,
  HeadphonesIcon
} from "lucide-react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useRef, useState } from "react"
import Link from "next/link"
import { useTheme } from "@/contexts/HeroThemeContext"
import { themeConfig } from "@/utils/themes"

export function Contact() {
  const { isDark } = useTheme()
  const theme = isDark ? themeConfig.dark : themeConfig.light
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Implementar lógica de envio
  }

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Resposta em até 5 minutos",
      value: "(11) 99999-9999",
      link: "https://wa.me/5511999999999",
      color: "#25D366",
      available: "Online agora"
    },
    {
      icon: Mail,
      title: "E-mail",
      description: "Resposta em até 24h",
      value: "contato@bellory.com.br",
      link: "mailto:contato@bellory.com.br",
      color: "#db6f57",
      available: "Sempre disponível"
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "Seg-Sex: 8h às 18h",
      value: "0800 123 4567",
      link: "tel:08001234567",
      color: "#4f6f64",
      available: "Horário comercial"
    },
  ]

  const benefits = [
    {
      icon: CheckCircle2,
      text: "Resposta rápida e personalizada"
    },
    {
      icon: CheckCircle2,
      text: "Sem compromisso ou taxas"
    },
    {
      icon: CheckCircle2,
      text: "Suporte durante todo processo"
    },
    {
      icon: CheckCircle2,
      text: "Demonstração personalizada gratuita"
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="contato"
      className={`py-32 relative overflow-hidden ${theme.sectionBgAlt}`}
    >
      {/* Background decorativo */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(theme.patternColor)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: parseFloat(theme.patternOpacity),
        }}
      />

      {/* Blob animado */}
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#4f6f64]/20 to-[#db6f57]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${theme.badge} border mb-8`}>
            <HeadphonesIcon className={`w-5 h-5 ${theme.badgeIcon}`} />
            <span className={`font-bold ${theme.badgeText} uppercase tracking-wide text-sm`}>
              Fale Conosco
            </span>
          </div>

          <h2 className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 ${theme.headlineColor} leading-[1.1]`}>
            Pronto para{" "}
            <span className={`${theme.gradientText} bg-clip-text text-transparent`}>
              começar
            </span>?
          </h2>

          <p className={`text-xl sm:text-2xl ${theme.subheadlineColor} leading-relaxed`}>
            Entre em contato e descubra como o Bellory pode{" "}
            <span className={`${theme.highlightColor} font-semibold`}>
              transformar seu negócio
            </span>
          </p>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className={`p-8 lg:p-10 ${theme.cardBg} border-2 ${theme.cardBorder} shadow-2xl rounded-3xl hover:shadow-3xl transition-all duration-300`}>
              <div className={`flex items-center gap-3 mb-8 pb-6 border-b ${theme.border}`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#db6f57] to-[#c55a42] flex items-center justify-center shadow-lg">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold`} style={{color: theme.textPrimary}}>Envie uma mensagem</h3>
                  <p className={`text-sm `} style={{color: theme.textSecondary}}>Responderemos em breve</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-semibold mb-2`} style={{color: theme.textPrimary}}>
                    Nome completo <span className="text-[#d15847]">*</span>
                  </label>
                  <InputText
                    id="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 border-2 ${theme.inputBorder} rounded-xl ${theme.inputFocus} ${theme.inputBg} ${theme.inputText} transition-all`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className={`block text-sm font-semibold mb-2`} style={{color: theme.textPrimary}}>
                      E-mail <span className="text-[#d15847]">*</span>
                    </label>
                    <InputText
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border-2 ${theme.inputBorder} rounded-xl ${theme.inputFocus} ${theme.inputBg} ${theme.inputText} transition-all`}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={`block text-sm font-semibold mb-2`} style={{color: theme.textPrimary}}>
                      Telefone <span className="text-[#d15847]">*</span>
                    </label>
                    <InputText
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 border-2 ${theme.inputBorder} rounded-xl ${theme.inputFocus} ${theme.inputBg} ${theme.inputText} transition-all`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold mb-2`} style={{color: theme.textPrimary}}>
                    Mensagem <span className="text-[#d15847]">*</span>
                  </label>
                  <InputTextarea
                    id="message"
                    placeholder="Conte-nos sobre seu negócio e como podemos ajudar..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 border-2 ${theme.inputBorder} rounded-xl ${theme.inputFocus} ${theme.inputBg} ${theme.inputText} transition-all resize-none`}
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  label="Enviar mensagem"
                  icon={<Send size={20} className="ml-10" />}
                  iconPos="right"
                  className="w-full bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:scale-105 transition-all py-4 rounded-xl font-bold text-lg shadow-lg"
                />

                <p className={`text-center text-sm`} style={{color: theme.textMuted2}}>
                  Ao enviar, você concorda com nossa política de privacidade
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Informações de contato e CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Métodos de contato */}
            <div>
              <h3 className={`text-2xl font-bold ${theme.headlineColor} mb-6`}>
                Outras formas de contato
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className={`p-6 ${theme.cardBg} ${theme.cardBgHover} border-2 ${theme.cardBorder} ${theme.borderHover} shadow-md ${theme.cardShadowHover} transition-all duration-300 rounded-2xl group hover:-translate-y-1`}>
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md"
                            style={{ 
                              backgroundColor: `${method.color}15`,
                              border: `2px solid ${method.color}30`
                            }}
                          >
                            <method.icon 
                              className="w-7 h-7" 
                              style={{ color: method.color }} 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-bold text-lg`} style={{color: theme.textPrimary}}>{method.title}</h4>
                              <span className="text-xs px-3 py-1 rounded-full bg-[#5a7a6e]/10 text-[#5a7a6e] font-semibold">
                                {method.available}
                              </span>
                            </div>
                            <p className={`text-sm mb-2`} style={{color: theme.textSecondary}}>{method.description}</p>
                            <p 
                              className="font-semibold text-base group-hover:underline"
                              style={{ color: method.color }}
                            >
                              {method.value}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Endereço */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="p-6 bg-gradient-to-br from-[#4f6f64]/5 to-[#4f6f64]/10 border-2 border-[#4f6f64]/20 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#4f6f64]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#2a2420] mb-1">Nosso escritório</h4>
                    <p className="text-[#4f6f64] leading-relaxed">
                      Av. Paulista, 1000 - Conj. 42<br />
                      Bela Vista, São Paulo - SP<br />
                      CEP: 01310-100
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div> */}

            
          </motion.div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center max-w-4xl mx-auto space-y-8"
        >

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Card className={`p-8 ${theme.cardBg} border-2 ${theme.cardBorder} rounded-2xl shadow-lg`}>
                <h4 className={`font-bold text-xl ${theme.textPrimary} mb-6`}>
                  Por que entrar em contato?
                </h4>
                <ul className="space-y-4 mb-6">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <benefit.icon className="w-5 h-5 text-[#5a7a6e] mt-0.5 flex-shrink-0" />
                      <span className={`${theme.textSecondary} leading-relaxed`}>{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Card className="p-8 bg-gradient-to-br from-[#8b3d35] via-[#db6f57] to-[#8b3d35] border-0 shadow-2xl rounded-3xl relative overflow-hidden">
  
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10">
                  <Sparkles className="w-12 h-12 text-white mb-4" />
                  <h4 className="font-bold text-2xl text-white mb-3">
                    Teste grátis por 14 dias
                  </h4>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Experimente todas as funcionalidades do Bellory sem compromisso. 
                    Não é necessário cartão de crédito.
                  </p>
                  <Link href="/cadastro">
                    <Button
                      label="Começar teste grátis"
                      icon={<Sparkles className="ml-2 w-5 h-5" />}
                      iconPos="right"
                      className="w-full bg-white text-[#8b3d35] border-0 hover:scale-105 transition-all py-4 rounded-xl font-bold text-lg shadow-lg"
                    />
                  </Link>
                  <p className="text-center text-white/70 text-sm mt-4">
                    ✓ Sem cartão • ✓ Sem compromisso • ✓ Cancele quando quiser
                  </p>
                </div>
              </Card>
            </motion.div>
        </motion.div> */}
        

        {/* FAQ Rápido */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center max-w-4xl mx-auto"
        >
          <h3 className={`text-2xl font-bold ${theme.headlineColor} mb-6`}>
            Dúvidas Frequentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`p-6 ${theme.cardBg} ${theme.cardBgHover} border ${theme.cardBorder} rounded-2xl shadow-md ${theme.cardShadowHover} transition-all`}>
              <Clock className={`w-8 h-8 ${theme.badgeIcon} mx-auto mb-3`} />
              <h4 className={`font-semibold mb-2`} style={{color: theme.textPrimary}}>Quanto tempo leva?</h4>
              <p className={`text-sm`} style={{color: theme.textSecondary}}>
                Você pode começar em menos de 5 minutos
              </p>
            </Card>

            <Card className={`p-6 ${theme.cardBg} ${theme.cardBgHover} border ${theme.cardBorder} rounded-2xl shadow-md ${theme.cardShadowHover} transition-all`}>
              <CheckCircle2 className={`w-8 h-8 ${theme.badgeIcon} mx-auto mb-3`} />
              <h4 className={`font-semibold mb-2`} style={{color: theme.textPrimary}}>Preciso de cartão?</h4>
              <p className={`text-sm`} style={{color: theme.textSecondary}}>
                Não! Teste grátis sem informar cartão
              </p>
            </Card>

            <Card className={`p-6 ${theme.cardBg} ${theme.cardBgHover} border ${theme.cardBorder} rounded-2xl shadow-md ${theme.cardShadowHover} transition-all`}>
              <HeadphonesIcon className={`w-8 h-8 ${theme.highlightColor} mx-auto mb-3`} />
              <h4 className={`font-semibold mb-2`} style={{color: theme.textPrimary}}>Tem suporte?</h4>
              <p className={`text-sm`} style={{color: theme.textSecondary}}>
                Sim! Suporte completo via WhatsApp
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}