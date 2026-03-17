"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import {
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  Brain,
  Calendar,
  Users,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Heart,
  Database,
  TrendingUp,
  BellRing,
  Loader2,
  type LucideIcon,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect, useCallback } from "react"
import {
  sendMessageToAgent,
  type AgentMessage,
} from "@/service/API/AgenteVirtual"

// ─── AI capabilities showcase data ───
const aiCapabilities = [
  {
    icon: MessageCircle,
    title: "Linguagem Natural",
    description: "Conversa como humano, entende gírias e contexto",
    color: "#4f6f64",
  },
  {
    icon: Calendar,
    title: "Agendamento Autônomo",
    description: "Agenda, reagenda e cancela sem intervenção",
    color: "#db6f57",
  },
  {
    icon: Brain,
    title: "Aprendizado Contínuo",
    description: "Melhora a cada interação com seus clientes",
    color: "#8b3d35",
  },
  {
    icon: Database,
    title: "Base de Conhecimento",
    description: "Respostas precisas sobre seu negócio",
    color: "#4f6f64",
  },
  {
    icon: Shield,
    title: "Escalonamento Inteligente",
    description: "Transfere para humano quando necessário",
    color: "#db6f57",
  },
  {
    icon: BellRing,
    title: "Lembretes Automáticos",
    description: "Confirmações e follow-up sem esforço",
    color: "#8b3d35",
  },
]

const stats = [
  { value: "<5s", label: "Tempo de resposta", icon: Zap, color: "#db6f57" },
  { value: "24/7", label: "Disponibilidade", icon: Clock, color: "#4f6f64" },
  {
    value: "95%",
    label: "Taxa de resolução",
    icon: CheckCircle2,
    color: "#8b3d35",
  },
  {
    value: "+60%",
    label: "Mais agendamentos",
    icon: TrendingUp,
    color: "#db6f57",
  },
]

const suggestedMessages = [
  "Quero agendar um corte de cabelo",
  "Quais serviços vocês oferecem?",
  "Qual o preço de uma barba?",
  "Tem horário disponível amanhã?",
]

// ─── Typing indicator ───
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-end gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#4f6f6415", border: "1.5px solid #4f6f6425" }}
        >
          <Bot className="w-4 h-4 text-[#4f6f64]" />
        </div>
        <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-[#e6d9d4]/30">
          <div className="flex gap-1.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#4f6f64]/40"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#4f6f64]/40"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#4f6f64]/40"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Chat message bubble ───
function ChatMessageBubble({
  message,
  index,
}: {
  message: AgentMessage
  index: number
}) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: isUser ? "#db6f5715" : "#4f6f6415",
            border: `1.5px solid ${isUser ? "#db6f57" : "#4f6f64"}25`,
          }}
        >
          {isUser ? (
            <User className="w-4 h-4 text-[#db6f57]" />
          ) : (
            <Bot className="w-4 h-4 text-[#4f6f64]" />
          )}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "bg-gradient-to-br from-[#db6f57] to-[#c55a42] text-white rounded-br-sm"
              : "bg-white text-[#2a2420] rounded-bl-sm border border-[#e6d9d4]/30"
          }`}
        >
          <p className="text-sm whitespace-pre-line leading-relaxed">
            {message.content}
          </p>
          <div
            className={`flex items-center gap-1 mt-1 ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`text-[10px] ${
                isUser ? "text-white/60" : "text-[#5a4a42]/40"
              }`}
            >
              {message.timestamp}
            </span>
            {!isUser && (
              <Sparkles className="w-3 h-3 text-[#4f6f64]/40" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Live chat component ───
function LiveChat() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      role: "assistant",
      content:
        "Olá! 👋 Sou o assistente virtual da Bellory.\n\nEstou aqui para te mostrar como posso ajudar seu negócio. Pode me perguntar sobre agendamentos, serviços, preços ou qualquer dúvida!\n\nComo posso te ajudar?",
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | undefined>()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    const container = chatContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    const now = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    // Add user message
    const userMessage: AgentMessage = {
      role: "user",
      content: messageText,
      timestamp: now,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await sendMessageToAgent({
        mensagem: messageText,
        sessionId,
      })

      if (response.dados?.sessionId) {
        setSessionId(response.dados.sessionId)
      }

      const botMessage: AgentMessage = {
        role: "assistant",
        content:
          response.dados?.resposta ||
          "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch {
      const errorMessage: AgentMessage = {
        role: "assistant",
        content:
          "Ops! Parece que estou com dificuldades no momento. Tente novamente em alguns instantes. 😊",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
        style={{ borderColor: "#e6d9d4" }}
      >
        <div className="relative">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #4f6f64, #3d574f)",
            }}
          >
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#2a2420] text-sm">
              Bellory Assistente
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4f6f64]/10">
              <Sparkles className="w-3 h-3 text-[#4f6f64]" />
              <span className="text-[9px] font-bold text-[#4f6f64]">IA</span>
            </div>
          </div>
          <span className="text-xs text-green-600 font-medium">
            Online agora
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#d8ccc4] scrollbar-track-transparent"
        style={{
          backgroundColor: "#faf8f6",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f6f64' fill-opacity='0.02'%3E%3Cpath d='M20 0L40 20 20 40 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessageBubble key={index} message={msg} index={index} />
          ))}
        </AnimatePresence>

        {isLoading && <TypingIndicator />}
      </div>

      {/* Suggested messages */}
      {messages.length <= 1 && (
        <div className="px-4 py-3 border-t border-[#e6d9d4]/50 bg-[#faf8f6]">
          <p className="text-[10px] text-[#5a4a42]/50 uppercase tracking-wider font-bold mb-2">
            Experimente perguntar
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedMessages.map((msg) => (
              <button
                key={msg}
                onClick={() => handleSend(msg)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full border border-[#db6f57]/20 text-[#db6f57] hover:bg-[#db6f57]/5 transition-colors duration-200 disabled:opacity-50"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="px-4 py-3 border-t border-[#e6d9d4] bg-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1 bg-[#faf8f6] rounded-xl px-4 py-3 text-sm text-[#2a2420] placeholder-[#5a4a42]/40 border border-[#e6d9d4]/50 focus:outline-none focus:border-[#4f6f64]/40 focus:ring-2 focus:ring-[#4f6f64]/10 transition-all disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: input.trim() && !isLoading
                ? "linear-gradient(135deg, #4f6f64, #3d574f)"
                : "#e6d9d4",
            }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ─── Capability card ───
function CapabilityPill({
  cap,
  index,
  isInView,
}: {
  cap: (typeof aiCapabilities)[number]
  index: number
  isInView: boolean
}) {
  const Icon = cap.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
      className="group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg p-5"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        borderColor: `${cap.color}20`,
        boxShadow:
          "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at center, ${cap.color}06 0%, transparent 70%)`,
        }}
      />
      <div className="relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${cap.color}12`,
            border: `1.5px solid ${cap.color}25`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: cap.color }} />
        </div>
        <h4 className="text-sm font-bold text-[#2a2420] mb-1">
          {cap.title}
        </h4>
        <p className="text-xs text-[#5a4a42]/70 leading-relaxed">
          {cap.description}
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
        style={{ backgroundColor: cap.color }}
      />
    </motion.div>
  )
}

// ─── How it works step ───
const howItWorks = [
  {
    step: "01",
    title: "Cliente envia mensagem",
    description: "Pelo WhatsApp, site ou qualquer canal integrado",
    icon: MessageCircle,
    color: "#db6f57",
  },
  {
    step: "02",
    title: "IA analisa a intenção",
    description: "Processamento de linguagem natural em tempo real",
    icon: Brain,
    color: "#4f6f64",
  },
  {
    step: "03",
    title: "Executa a ação",
    description: "Agenda, responde, confirma ou escala para humano",
    icon: Zap,
    color: "#8b3d35",
  },
  {
    step: "04",
    title: "Aprende e melhora",
    description: "Cada interação torna o agente mais inteligente",
    icon: TrendingUp,
    color: "#db6f57",
  },
]

// ─── Main page ───
export default function AgenteVirtual() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header isMenu={true} isCadastro={true} />

      {/* ─── Hero + Live Chat ─── */}
      <section
        ref={sectionRef}
        className="relative pt-28 pb-16 md:pt-22 md:pb-24 overflow-hidden bg-[#faf8f6]"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f6f64' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#4f6f64]/[0.06] to-[#3d574f]/[0.04] rounded-full blur-3xl"
          animate={
            prefersReduced
              ? {}
              : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#db6f57]/[0.06] to-[#8b3d35]/[0.04] rounded-full blur-3xl"
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Hero text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pt-4 lg:pt-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f6f64]/[0.08] border border-[#4f6f64]/20 mb-6">
                <Bot className="w-4 h-4 text-[#4f6f64]" />
                <span className="text-xs font-bold text-[#4f6f64] uppercase tracking-wider">
                  Agente Virtual com IA
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] mb-6 leading-[1.1]">
                Converse com nosso{" "}
                <span className="bg-gradient-to-r from-[#4f6f64] to-[#3d574f] bg-clip-text text-transparent">
                  agente inteligente
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#5a4a42]/70 leading-relaxed mb-8">
                Experimente agora mesmo como a inteligência artificial da Bellory
                atende seus clientes. Envie uma mensagem e veja a mágica
                acontecer em tempo real.
              </p>

              {/* Stats mini */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(12px)",
                        borderColor: `${stat.color}20`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: stat.color }}
                      />
                      <div>
                        <div
                          className="text-lg font-bold leading-tight"
                          style={{ color: stat.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-[#5a4a42]/60">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <p className="text-sm text-[#5a4a42]/50 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Conversa segura e sem compromisso
              </p>
            </motion.div>

            {/* Right: Live chat */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl border"
                style={{
                  borderColor: "#4f6f6420",
                  height: "620px",
                  boxShadow:
                    "0 25px 60px rgba(42,36,32,0.12), 0 8px 24px rgba(42,36,32,0.08)",
                }}
              >
                {/* Glow behind */}
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl -z-10"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(79,111,100,0.1), transparent 70%)",
                  }}
                />

                <LiveChat />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <HowItWorksSection />

      {/* ─── Capabilities grid ─── */}
      <CapabilitiesSection />

      {/* ─── CTA ─── */}
      <CTASection />

      <Footer />
    </main>
  )
}

// ─── How it works section ───
function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden bg-[#f3eeea]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.1]">
            Como o agente{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              funciona
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a4a42]/70 max-w-2xl mx-auto">
            Em 4 passos simples, seu atendimento se transforma completamente
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {howItWorks.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative text-center"
              >
                <div
                  className="relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl p-6 h-full"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderColor: `${step.color}20`,
                    boxShadow:
                      "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{
                      background: `radial-gradient(ellipse at center, ${step.color}06 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    {/* Step number */}
                    <span
                      className="text-5xl font-bold opacity-10 absolute -top-2 -left-1"
                      style={{ color: step.color }}
                    >
                      {step.step}
                    </span>

                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${step.color}12`,
                        border: `1.5px solid ${step.color}25`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{ color: step.color }}
                      />
                    </div>

                    <h3 className="text-base font-bold text-[#2a2420] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5a4a42]/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
                    style={{ backgroundColor: step.color }}
                  />
                </div>

                {/* Connector arrow (not on last item) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[#d8ccc4]" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Capabilities section ───
function CapabilitiesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden bg-[#faf8f6]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f6f64' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#4f6f64]/[0.06] to-[#3d574f]/[0.04] rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.1]">
            Superpoderes do{" "}
            <span className="bg-gradient-to-r from-[#4f6f64] to-[#3d574f] bg-clip-text text-transparent">
              agente virtual
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a4a42]/70 max-w-2xl mx-auto">
            Cada capacidade foi projetada para transformar o atendimento do seu
            negócio
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {aiCapabilities.map((cap, index) => (
            <CapabilityPill
              key={cap.title}
              cap={cap}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA section ───
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center p-12 md:p-16 bg-gradient-to-br from-[#4f6f64] to-[#3d574f] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Bot className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-6" />
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Quer esse agente no seu negócio?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Comece grátis hoje e tenha um assistente inteligente atendendo seus
          clientes 24 horas por dia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/cadastro">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#4f6f64] rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Começar grátis
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link
            href="/#funcionalidades"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
          >
            Ver todas as funcionalidades
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
