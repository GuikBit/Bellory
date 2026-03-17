"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  Clock,
  CheckCircle2,
  HeadphonesIcon,
} from "lucide-react"
import { useRef, useState } from "react"
import { useInteractionTracker, useConversionTracker } from "@/hooks/tracking"

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Resposta em até 5 minutos",
    value: "(11) 99999-9999",
    link: "https://wa.me/5511999999999",
    color: "#25D366",
    available: "Online agora",
  },
  {
    icon: Mail,
    title: "E-mail",
    description: "Resposta em até 24h",
    value: "contato@bellory.com.br",
    link: "mailto:contato@bellory.com.br",
    color: "#db6f57",
    available: "Sempre disponível",
  },
  {
    icon: Phone,
    title: "Telefone",
    description: "Seg-Sex: 8h às 18h",
    value: "0800 123 4567",
    link: "tel:08001234567",
    color: "#4f6f64",
    available: "Horário comercial",
  },
]

const quickFAQ = [
  {
    icon: Clock,
    title: "Quanto tempo leva?",
    answer: "Você pode começar em menos de 5 minutos",
  },
  {
    icon: CheckCircle2,
    title: "Preciso de cartão?",
    answer: "Não! Teste grátis sem informar cartão",
  },
  {
    icon: HeadphonesIcon,
    title: "Tem suporte?",
    answer: "Sim! Suporte completo via WhatsApp",
  },
]

export function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()
  const { trackFormStart, trackFormSubmit, trackInteraction } =
    useInteractionTracker()
  const { trackContactFormSubmitted } = useConversionTracker()
  const formStarted = useRef(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleFormFocus = () => {
    if (!formStarted.current) {
      formStarted.current = true
      trackFormStart("contact-form", "contato")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackFormSubmit("contact-form", "contato")
    trackContactFormSubmitted()
  }

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 md:py-32 relative overflow-hidden bg-[#faf8f6]"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23db6f57' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#db6f57]/[0.06] to-[#8b3d35]/[0.04] rounded-full blur-3xl"
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#4f6f64]/[0.06] to-[#db6f57]/[0.04] rounded-full blur-3xl"
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#db6f57]/[0.08] border border-[#db6f57]/20 mb-6">
            <HeadphonesIcon className="w-4 h-4 text-[#db6f57]" />
            <span className="text-xs font-bold text-[#db6f57] uppercase tracking-wider">
              Fale Conosco
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.1]">
            Pronto para{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              começar
            </span>
            ?
          </h2>

          <p className="text-base sm:text-lg text-[#5a4a42]/70 leading-relaxed max-w-2xl mx-auto">
            Entre em contato e descubra como o Bellory pode transformar seu
            negócio
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative"
          >
            <div
              className="relative rounded-3xl border overflow-hidden h-full"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                borderColor: "#db6f5720",
                boxShadow:
                  "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
              }}
            >
              {/* Card header */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "#db6f5712",
                      border: "1.5px solid #db6f5725",
                    }}
                  >
                    <Send className="w-5 h-5 text-[#db6f57]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2a2420]">
                      Envie uma mensagem
                    </h3>
                    <p className="text-xs text-[#5a4a42]/60">
                      Responderemos em breve
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 sm:mx-8">
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right, #db6f5730, transparent)",
                  }}
                />
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                onFocus={handleFormFocus}
                className="px-6 sm:px-8 py-6 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-1.5 text-[#2a2420]"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4]/50 text-sm text-[#2a2420] placeholder-[#5a4a42]/40 focus:outline-none focus:border-[#db6f57]/40 focus:ring-2 focus:ring-[#db6f57]/10 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-1.5 text-[#2a2420]"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4]/50 text-sm text-[#2a2420] placeholder-[#5a4a42]/40 focus:outline-none focus:border-[#db6f57]/40 focus:ring-2 focus:ring-[#db6f57]/10 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold mb-1.5 text-[#2a2420]"
                    >
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4]/50 text-sm text-[#2a2420] placeholder-[#5a4a42]/40 focus:outline-none focus:border-[#db6f57]/40 focus:ring-2 focus:ring-[#db6f57]/10 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-1.5 text-[#2a2420]"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    placeholder="Conte-nos sobre seu negócio..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4]/50 text-sm text-[#2a2420] placeholder-[#5a4a42]/40 focus:outline-none focus:border-[#db6f57]/40 focus:ring-2 focus:ring-[#db6f57]/10 transition-all resize-none"
                    rows={4}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
                >
                  Enviar mensagem
                  <Send className="w-4 h-4" />
                </motion.button>

                <p className="text-center text-[10px] text-[#5a4a42]/40">
                  Ao enviar, você concorda com nossa política de privacidade
                </p>
              </form>
            </div>
          </motion.div>

          {/* Right side: contact methods + FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6"
          >
            {/* Contact methods */}
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() =>
                    trackInteraction(
                      "contact_method_click",
                      `contact-${method.title.toLowerCase()}`,
                      {
                        elementLabel: method.title,
                        section: "contato",
                      }
                    )
                  }
                  className="group block rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl p-5"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderColor: `${method.color}20`,
                    boxShadow:
                      "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{
                      background: `radial-gradient(ellipse at center, ${method.color}06 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative flex items-center gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${method.color}12`,
                        border: `1.5px solid ${method.color}25`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: method.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#2a2420]">
                          {method.title}
                        </h4>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: `${method.color}15`,
                            color: method.color,
                          }}
                        >
                          {method.available}
                        </span>
                      </div>
                      <p className="text-xs text-[#5a4a42]/60 mb-0.5">
                        {method.description}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: method.color }}
                      >
                        {method.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
                    style={{ backgroundColor: method.color }}
                  />
                </motion.a>
              )
            })}

            {/* Quick FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="rounded-3xl border overflow-hidden divide-y"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                borderColor: "#4f6f6420",
                boxShadow:
                  "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
              }}
            >
              {quickFAQ.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 px-5 py-4"
                    style={{ borderColor: "#4f6f6412" }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{
                        backgroundColor: "#4f6f6412",
                      }}
                    >
                      <Icon className="w-4 h-4 text-[#4f6f64]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2a2420]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#5a4a42]/60">{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
