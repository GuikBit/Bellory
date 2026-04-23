"use client"

import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  Mail,
  Phone,
  Send,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Building2,
  Shield,
  Loader2,
} from "lucide-react"
import { useRef, useState } from "react"
import { useInteractionTracker, useConversionTracker } from "@/hooks/tracking"

// ─── Data ───
const contactMethods = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    subtitle: "Respondemos em média em 4 min",
    value: "(11) 99999-9999",
    link: "https://wa.me/5511999999999",
    color: "#db6f57",
    accent: "#4f6f64",
    featured: true,
    availability: "Online agora",
  },
  {
    id: "email",
    icon: Mail,
    title: "E-mail",
    subtitle: "Para propostas e orçamentos",
    value: "contato@bellory.com.br",
    link: "mailto:contato@bellory.com.br",
    color: "#8b3d35",
    accent: "#8b3d35",
    featured: false,
    availability: "Até 2h úteis",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Telefone",
    subtitle: "Fala com o time direto",
    value: "0800 123 4567",
    link: "tel:08001234567",
    color: "#4f6f64",
    accent: "#4f6f64",
    featured: false,
    availability: "Seg-Sex · 8h às 18h",
  },
]

const businessTypes = [
  "Salão",
  "Barbearia",
  "Clínica de estética",
  "Nail designer",
  "Spa",
  "Outro",
]

const EASE_OUT = [0.22, 1, 0.36, 1] as const

type SubmitStatus = "idle" | "submitting" | "success" | "error"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
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
    businessType: "",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")

  const handleFormFocus = () => {
    if (!formStarted.current) {
      formStarted.current = true
      trackFormStart("contact-form", "contato")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitStatus === "submitting") return

    setSubmitStatus("submitting")
    trackFormSubmit("contact-form", "contato")

    try {
      // TODO: Quando a API de contato estiver pronta, ligar aqui.
      // const res = await fetch("/api/contato", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...formData,
      //     source: "landing/contato",
      //     submittedAt: new Date().toISOString(),
      //   }),
      // })
      // if (!res.ok) throw new Error("Falha ao enviar contato")

      // Placeholder até a API existir — preserva a experiência do usuário
      await new Promise((r) => setTimeout(r, 900))

      trackContactFormSubmitted()
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        message: "",
      })
    } catch {
      setSubmitStatus("error")
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 md:py-32 relative overflow-hidden bg-[#faf8f6]"
    >
      {/* Dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.14), transparent 65%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-20 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,111,100,0.14), transparent 65%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }
        }
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* ─── Section header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span
              aria-hidden
              className="h-px w-10 bg-[#db6f57] opacity-60"
            />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
              Contato
              <span className="mx-2 opacity-40">·</span>
              fala com a gente
            </span>
            <span
              aria-hidden
              className="h-px w-10 bg-[#db6f57] opacity-60"
            />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.04] mb-5">
            A gente responde{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #db6f57 0%, #8b3d35 50%, #db6f57 100%)",
                backgroundSize: "200% auto",
              }}
            >
              antes de você fechar a aba.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a4a42]/75 leading-relaxed font-light">
            Dúvida sobre funcionalidade, orçamento especial, quer ver o sistema
            rodando? Fala com a gente. Sem script pronto, sem robô, sem
            vendedor insistente — só o time querendo entender seu caso.
          </p>
        </motion.div>

        {/* ─── Content grid ─── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT: shortcuts + social proof */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-px w-8 bg-[#db6f57] opacity-50"
              />
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                Atalhos
              </span>
            </div>

            {/* Contact method cards */}
            <div className="space-y-3">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <motion.a
                    key={method.id}
                    href={method.link}
                    target={method.id === "whatsapp" ? "_blank" : undefined}
                    rel={method.id === "whatsapp" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.08,
                      ease: EASE_OUT,
                    }}
                    onClick={() =>
                      trackInteraction(
                        "contact_method_click",
                        `contact-${method.id}`,
                        {
                          elementLabel: method.title,
                          section: "contato",
                        }
                      )
                    }
                    className="group relative block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: method.featured
                        ? "#2a2420"
                        : "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(12px)",
                      borderColor: method.featured
                        ? "#3d2e28"
                        : `${method.color}28`,
                      boxShadow: method.featured
                        ? "0 20px 40px -16px rgba(42,36,32,0.25), 0 8px 16px -8px rgba(42,36,32,0.12)"
                        : "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
                    }}
                  >
                    {/* Featured glow */}
                    {method.featured && (
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-60"
                        style={{
                          background:
                            "radial-gradient(ellipse at top right, rgba(219,111,87,0.2), transparent 60%)",
                        }}
                      />
                    )}

                    <div className="relative p-4 md:p-5 flex items-center gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105"
                        style={{
                          backgroundColor: method.featured
                            ? "rgba(219,111,87,0.18)"
                            : `${method.color}14`,
                          border: method.featured
                            ? "1.5px solid rgba(219,111,87,0.35)"
                            : `1.5px solid ${method.color}28`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5 md:w-5.5 md:h-5.5"
                          style={{
                            color: method.featured ? "#db6f57" : method.color,
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4
                            className="font-serif text-lg font-bold leading-tight"
                            style={{
                              color: method.featured ? "#ffffff" : "#2a2420",
                            }}
                          >
                            {method.title}
                          </h4>
                          {method.id === "whatsapp" && (
                            <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-[#4f6f64] bg-[#4f6f64]/15 px-1.5 py-0.5 rounded-full">
                              <span
                                aria-hidden
                                className="w-1.5 h-1.5 rounded-full bg-[#4f6f64] animate-pulse"
                              />
                              {method.availability}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[12px] leading-tight mb-1"
                          style={{
                            color: method.featured
                              ? "rgba(230,217,212,0.7)"
                              : "rgba(90,74,66,0.65)",
                          }}
                        >
                          {method.subtitle}
                        </p>
                        <p
                          className="text-[13px] md:text-[14px] font-semibold font-mono tabular-nums"
                          style={{
                            color: method.featured ? "#db6f57" : method.color,
                          }}
                        >
                          {method.value}
                        </p>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        style={{
                          color: method.featured
                            ? "rgba(230,217,212,0.5)"
                            : "rgba(90,74,66,0.45)",
                        }}
                      />
                    </div>

                    {/* Bottom accent sweep */}
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
                      style={{ backgroundColor: method.color }}
                    />
                  </motion.a>
                )
              })}
            </div>

            {/* Testimonial snippet — social proof that intrigues */}
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.65, ease: EASE_OUT }}
              className="relative rounded-2xl border bg-white/60 backdrop-blur p-5 overflow-hidden"
              style={{
                borderColor: "#e6d9d4",
              }}
            >
              <Quote
                aria-hidden
                className="absolute top-3 right-4 w-8 h-8 text-[#db6f57]/12"
              />
              <blockquote className="relative">
                <p className="font-serif text-[15px] md:text-base leading-snug text-[#2a2420] italic mb-3 pr-8">
                  &ldquo;Mandei o oi num domingo à noite. Segunda de manhã
                  eu já tava rodando o sistema na barbearia.&rdquo;
                </p>
                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #db6f57 0%, #8b3d35 100%)",
                    }}
                  >
                    RC
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#2a2420] leading-tight">
                      Rodrigo Camargo
                    </div>
                    <div className="text-[10px] text-[#5a4a42]/60 leading-tight">
                      Barbearia Centro · São Paulo
                    </div>
                  </div>
                </figcaption>
              </blockquote>
            </motion.figure>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.75, ease: EASE_OUT }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#5a4a42]/60 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-[#4f6f64]" />
                Dados protegidos · LGPD
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#4f6f64]" />
                Sem spam, palavra
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#4f6f64]" />
                Resposta humana
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <div
              className="relative rounded-3xl border overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(16px)",
                borderColor: "#db6f5728",
                boxShadow:
                  "0 30px 60px -20px rgba(42,36,32,0.16), 0 12px 24px -12px rgba(42,36,32,0.08)",
              }}
            >
              {/* Decorative serif watermark */}
              <span
                aria-hidden
                className="absolute top-4 right-5 font-serif font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(100px, 14vw, 160px)",
                  color: "rgba(219,111,87,0.07)",
                  letterSpacing: "-0.06em",
                }}
              >
                Oi
              </span>

              <div className="relative p-6 md:p-8 lg:p-10">
                {/* Form header */}
                <div className="mb-7 md:mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      aria-hidden
                      className="h-px w-8 bg-[#db6f57] opacity-50"
                    />
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                      Escreva pra gente
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-[34px] font-bold text-[#2a2420] leading-[1.08]">
                    Conta rapidinho
                    <br />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #db6f57 0%, #8b3d35 100%)",
                      }}
                    >
                      sobre o seu negócio.
                    </span>
                  </h3>
                </div>

                {/* Form OR success state */}
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="py-10 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
                        className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #db6f57 0%, #8b3d35 100%)",
                          boxShadow: "0 12px 32px -8px rgba(219,111,87,0.45)",
                        }}
                      >
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#2a2420] mb-3 leading-tight">
                        Recado recebido.
                      </h4>
                      <p className="text-[15px] text-[#5a4a42]/75 leading-relaxed max-w-md mx-auto mb-6">
                        Em até 4 minutos alguém do time vai responder no seu
                        WhatsApp ou e-mail. Pode ficar tranquilo — não é robô,
                        é gente.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitStatus("idle")}
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#db6f57] hover:text-[#8b3d35] transition-colors"
                      >
                        Enviar outro recado
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      onFocus={handleFormFocus}
                      className="space-y-5"
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2"
                        >
                          Seu nome
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Como a gente te chama?"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4] text-[14px] text-[#2a2420] placeholder:text-[#5a4a42]/35 focus:outline-none focus:border-[#db6f57]/50 focus:ring-4 focus:ring-[#db6f57]/10 focus:bg-white transition-all"
                          required
                        />
                      </div>

                      {/* Email + phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2"
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
                            className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4] text-[14px] text-[#2a2420] placeholder:text-[#5a4a42]/35 focus:outline-none focus:border-[#db6f57]/50 focus:ring-4 focus:ring-[#db6f57]/10 focus:bg-white transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2"
                          >
                            WhatsApp
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4] text-[14px] text-[#2a2420] placeholder:text-[#5a4a42]/35 focus:outline-none focus:border-[#db6f57]/50 focus:ring-4 focus:ring-[#db6f57]/10 focus:bg-white transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Business type pills */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2">
                          <Building2 className="w-3 h-3 inline-block -mt-0.5 mr-1 text-[#db6f57]" />
                          Seu negócio é
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {businessTypes.map((type) => {
                            const active = formData.businessType === type
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    businessType: type,
                                  })
                                }
                                className={`px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 ${
                                  active
                                    ? "text-white shadow-md"
                                    : "text-[#5a4a42] bg-white hover:border-[#db6f57]/40 hover:text-[#db6f57]"
                                }`}
                                style={
                                  active
                                    ? {
                                        background:
                                          "linear-gradient(90deg, #db6f57 0%, #c55a42 100%)",
                                        borderColor: "#c55a42",
                                        boxShadow:
                                          "0 4px 12px rgba(219,111,87,0.28)",
                                      }
                                    : {
                                        borderColor: "#e6d9d4",
                                      }
                                }
                              >
                                {type}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2"
                        >
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          placeholder="Dúvida, interesse, orçamento especial... conta o que tá na cabeça."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 bg-[#faf8f6] rounded-xl border border-[#e6d9d4] text-[14px] text-[#2a2420] placeholder:text-[#5a4a42]/35 focus:outline-none focus:border-[#db6f57]/50 focus:ring-4 focus:ring-[#db6f57]/10 focus:bg-white transition-all resize-none"
                          rows={4}
                          required
                        />
                      </div>

                      {/* Error state */}
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-2 p-3 rounded-lg bg-[#d15847]/10 border border-[#d15847]/25"
                        >
                          <span className="text-[12px] text-[#d15847] font-medium leading-snug">
                            Algo deu errado no envio. Tenta de novo ou fala com
                            a gente direto no WhatsApp.
                          </span>
                        </motion.div>
                      )}

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                        <motion.button
                          type="submit"
                          disabled={submitStatus === "submitting"}
                          whileHover={
                            prefersReduced || submitStatus === "submitting"
                              ? undefined
                              : { scale: 1.03 }
                          }
                          whileTap={
                            prefersReduced || submitStatus === "submitting"
                              ? undefined
                              : { scale: 0.97 }
                          }
                          className="group/btn relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-[14px] text-white overflow-hidden shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{
                            background:
                              "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                            boxShadow: "0 0 32px rgba(219,111,87,0.35)",
                          }}
                        >
                          {submitStatus === "submitting" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              Enviar recado
                              <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                            </>
                          )}
                          <span
                            aria-hidden
                            className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                            }}
                          />
                        </motion.button>
                        <p className="text-[11px] text-[#5a4a42]/55 leading-snug max-w-xs">
                          Ao enviar, você concorda com a nossa{" "}
                          <a
                            href="#"
                            className="underline underline-offset-2 text-[#db6f57] hover:text-[#8b3d35]"
                          >
                            política de privacidade
                          </a>
                          .
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
