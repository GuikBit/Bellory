"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Bot,
  MessageCircle,
  Clock,
  CheckCircle2,
  Calendar,
  Zap,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Heart,
  Brain,
  Shield,
  BellRing,
  Send,
  type LucideIcon,
  Database,
} from "lucide-react"
import Link from "next/link"
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type RefObject,
} from "react"

// ─── Chat messages ───
interface ChatMessage {
  type: "customer" | "bot"
  message: string
  time: string
}

const chatMessages: ChatMessage[] = [
  {
    type: "customer",
    message: "Oi! Queria agendar um corte para amanhã",
    time: "14:32",
  },
  {
    type: "bot",
    message:
      "Olá! 😊 Temos horários disponíveis amanhã:\n\n• 10:00 — João\n• 14:00 — Maria\n• 16:30 — João\n\nQual prefere?",
    time: "14:32",
  },
  {
    type: "customer",
    message: "14:00 com a Maria!",
    time: "14:33",
  },
  {
    type: "bot",
    message:
      "Perfeito! ✅ Agendado:\n\n📅 17/12 às 14:00\n✂️ Corte de Cabelo\n👤 Maria\n💰 R$ 45,00\n\nLembrete 24h antes. Até lá! 👋",
    time: "14:33",
  },
]

// ─── AI actions linked to message indices ───
interface AIAction {
  icon: LucideIcon
  label: string
  color: string
  messageIndex: number // which message this action relates to
  side: "left" | "right"
  offsetY?: number // extra px offset to stack multiple actions
}

const aiActions: AIAction[] = [
  {
    icon: Brain,
    label: "Entendeu a intenção",
    color: "#8b3d35",
    messageIndex: 0,
    side: "right",
    offsetY: -40,
  },
  {
    icon: Users,
    label: "Identificou cliente",
    color: "#db6f57",
    messageIndex: 0,
    side: "right",
    offsetY: 20,
  },
  {
    icon: Calendar,
    label: "Consultou agenda",
    color: "#4f6f64",
    messageIndex: 1,
    side: "left",
    offsetY: 0,
  },
   {
    icon: CheckCircle2,
    label: "Reservou horário",
    color: "#4f6f64",
    messageIndex: 3,
    side: "left",
    offsetY: -50,
  },
  {
    icon: Brain,
    label: "Entendeu a intenção",
    color: "#8b3d35",
    messageIndex: 2,
    side: "right",
    offsetY: 0,
  },
  {
    icon: BellRing,
    label: "Lembrete agendado",
    color: "#db6f57",
    messageIndex: 3,
    side: "left",
    offsetY: 10,
  },
]

// ─── AI capabilities ───
interface AICapability {
  icon: LucideIcon
  title: string
  description: string
  stat: string
}

interface CapabilityGroup {
  id: string
  title: string
  tagline: string
  color: string
  capabilities: AICapability[]
}

const capabilityGroups: CapabilityGroup[] = [
  {
    id: "atendimento",
    title: "Atendimento Inteligente",
    tagline: "Atenda clientes 24h sem perder nenhuma oportunidade",
    color: "#4f6f64",
    capabilities: [
      {
        icon: MessageCircle,
        title: "Conversação Natural",
        description:
          "IA treinada para conversar como humano, entendendo gírias, áudios e contexto.",
        stat: "NLP",
      },
      {
        icon: Zap,
        title: "Resposta Instantânea",
        description:
          "Tempo de resposta inferior a 5 segundos, 24 horas por dia.",
        stat: "<5s",
      },
      {
        icon: Shield,
        title: "Escalonamento Inteligente",
        description:
          "Identifica quando o cliente precisa de um humano e transfere automaticamente.",
        stat: "Smart",
      },
      {
        icon: Database,
        title: "Base de Conhecimento",
        description: "Coloque informações do seu negócio para respostas precisas e personalizadas.",
        stat: "Custom",
      }
    ],
  },
  {
    id: "automacao",
    title: "Automação Completa",
    tagline: "Deixe a IA cuidar das tarefas repetitivas por você",
    color: "#db6f57",
    capabilities: [
      {
        icon: Calendar,
        title: "Agendamento Autônomo",
        description:
          "Agenda, reagenda e cancela compromissos sem intervenção humana.",
        stat: "Auto",
      },
      {
        icon: CheckCircle2,
        title: "Confirmações Automáticas",
        description:
          "Lembretes e confirmações 24h antes. Reduz faltas em até 40%.",
        stat: "-40%",
      },
      {
        icon: TrendingUp,
        title: "Follow-up Inteligente",
        description:
          "Acompanha clientes inativos e sugere retornos personalizados.",
        stat: "+60%",
      },
    ],
  },
]

// ─── Stats ───
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

// ─── Chat bubble ───
function ChatBubble({
  msg,
  index,
  isInView,
  bubbleRef,
}: {
  msg: ChatMessage
  index: number
  isInView: boolean
  bubbleRef: RefObject<HTMLDivElement | null>
}) {
  const isCustomer = msg.type === "customer"

  return (
    <motion.div
      ref={bubbleRef}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.35 }}
      className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
          isCustomer
            ? "bg-[#dcf8c6] rounded-tr-sm"
            : "bg-white rounded-tl-sm"
        }`}
      >
        <p className="text-[13px] text-[#2a2420] whitespace-pre-line leading-relaxed">
          {msg.message}
        </p>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[10px] text-[#5a4a42]/50">{msg.time}</span>
          {isCustomer && (
            <CheckCircle2 className="w-3 h-3 text-[#4fc3f7]" />
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Floating AI action card (outside phone) ───
function FloatingAIAction({
  action,
  topOffset,
  visible,
  index,
  isInView,
}: {
  action: AIAction
  topOffset: number
  visible: boolean
  index: number
  isInView: boolean
}) {
  const Icon = action.icon
  const isLeft = action.side === "left"

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20, scale: 0.85 }}
      animate={
        isInView && visible
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: isLeft ? -20 : 20, scale: 0.85 }
      }
      transition={{
        duration: 0.4,
        delay: isInView ? 0.8 + index * 0.2 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`absolute z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg pointer-events-none ${
        isLeft ? "right-full mr-4" : "left-full ml-4"
      }`}
      style={{
        top: topOffset,
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        border: `1.5px solid ${action.color}25`,
        transition: "top 0.3s ease-out",
      }}
    >
      {/* Connecting line */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-px w-4 ${
          isLeft ? "-right-4" : "-left-4"
        }`}
        style={{
          background: `linear-gradient(${isLeft ? "to right" : "to left"}, ${action.color}40, ${action.color}10)`,
        }}
      />
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${action.color}12` }}
      >
        <Icon className="w-4 h-4" style={{ color: action.color }} />
      </div>
      <span
        className="text-xs font-semibold whitespace-nowrap"
        style={{ color: action.color }}
      >
        {action.label}
      </span>
    </motion.div>
  )
}

// ─── Capability card ───
function CapabilityCard({
  group,
  index,
  isInView,
}: {
  group: CapabilityGroup
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.3 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className="relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderColor: `${group.color}20`
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${group.color}06 0%, transparent 70%)`,
          }}
        />

        {/* Card header */}
        <div className="relative px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: group.color }}
            />
            <h3
              className="text-base font-bold uppercase tracking-wider"
              style={{ color: group.color }}
            >
              {group.title}
            </h3>
          </div>
          <p className="text-sm text-[#5a4a42] pl-5">{group.tagline}</p>
        </div>

        {/* Divider */}
        <div className="mx-5">
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right, ${group.color}30, transparent)`,
            }}
          />
        </div>

        {/* Capabilities */}
        <div className="relative px-2 pb-4 pt-1">
          {group.capabilities.map((cap, idx) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.12 }}
                className="group/row flex items-start gap-3 py-3 px-3 rounded-xl transition-all duration-300 hover:bg-[#2a2420]/[0.03] cursor-default"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/row:scale-110"
                  style={{
                    backgroundColor: `${group.color}12`,
                    border: `1.5px solid ${group.color}25`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: group.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-[#2a2420] leading-tight">
                      {cap.title}
                    </h4>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: `${group.color}15`,
                        color: group.color,
                      }}
                    >
                      {cap.stat}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a4a42]/70 mt-0.5 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom accent line */}
        <div
          className="h-0.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ backgroundColor: group.color }}
        />
      </div>
    </motion.div>
  )
}

// ─── Phone mockup with synced floating actions ───
function PhoneMockup({ isInView }: { isInView: boolean }) {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const phoneWrapperRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [actionPositions, setActionPositions] = useState<
    { top: number; visible: boolean }[]
  >(aiActions.map(() => ({ top: 0, visible: false })))

  const updatePositions = useCallback(() => {
    const chat = chatContainerRef.current
    const phone = phoneWrapperRef.current
    if (!chat || !phone) return

    const phoneRect = phone.getBoundingClientRect()
    const chatRect = chat.getBoundingClientRect()

    const newPositions = aiActions.map((action) => {
      const msgEl = messageRefs.current[action.messageIndex]
      if (!msgEl) return { top: 0, visible: false }

      const msgRect = msgEl.getBoundingClientRect()
      // Position relative to the phone wrapper
      const top =
        msgRect.top - phoneRect.top + msgRect.height / 2 - 16 + (action.offsetY || 0)

      // Check if the message is visible within the chat scroll area
      const msgTop = msgRect.top
      const msgBottom = msgRect.bottom
      const visible =
        msgBottom > chatRect.top + 10 && msgTop < chatRect.bottom - 10

      return { top, visible }
    })

    setActionPositions(newPositions)
  }, [])

  useEffect(() => {
    const chat = chatContainerRef.current
    if (!chat) return

    updatePositions()
    chat.addEventListener("scroll", updatePositions, { passive: true })
    window.addEventListener("resize", updatePositions)

    // Also update on a small delay after animations
    const timer = setTimeout(updatePositions, 1500)

    return () => {
      chat.removeEventListener("scroll", updatePositions)
      window.removeEventListener("resize", updatePositions)
      clearTimeout(timer)
    }
  }, [updatePositions, isInView])

  // Recalc when section becomes visible
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(updatePositions, 800)
      return () => clearTimeout(timer)
    }
  }, [isInView, updatePositions])

  return (
    <div ref={phoneWrapperRef} className="relative">
      {/* Floating AI actions — positioned outside phone */}
      {aiActions.map((action, index) => (
        <FloatingAIAction
          key={action.label}
          action={action}
          topOffset={actionPositions[index].top}
          visible={actionPositions[index].visible}
          index={index}
          isInView={isInView}
        />
      ))}

      {/* Phone frame — 9:19.5 ratio */}
      <div
        className="relative w-[320px] sm:w-[340px]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        {/* Glow behind phone */}
        <div
          className="absolute inset-4 rounded-[3rem] blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(79,111,100,0.12), transparent 70%)",
          }}
        />

        <div
          className="relative rounded-[2.5rem] p-[10px] shadow-2xl h-full flex flex-col"
          style={{
            backgroundColor: "#1a1a1a",
            boxShadow:
              "0 25px 60px rgba(42,36,32,0.2), 0 8px 24px rgba(42,36,32,0.1)",
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-[22px] bg-[#000] rounded-full z-30" />

          <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col h-full">
            {/* WhatsApp header */}
            <div className="bg-[#075e54] text-white px-3 py-2.5 flex items-center gap-2.5 pt-8 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[13px] leading-tight">
                  Bellory Assistente
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[9px] text-white/70">
                    Online agora
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10">
                <Sparkles className="w-3 h-3 text-white/70" />
                <span className="text-[8px] text-white/60 font-bold">IA</span>
              </div>
            </div>

            {/* Chat area — scrollable */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-2.5 space-y-2 scrollbar-none"
              style={{
                backgroundColor: "#ece5dd",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.02'%3E%3Cpath d='M20 0L40 20 20 40 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {/* Date separator */}
              <div className="flex justify-center mb-1">
                <span className="bg-white/80 text-[9px] text-[#5a4a42]/60 px-2.5 py-0.5 rounded-full shadow-sm">
                  Hoje
                </span>
              </div>

              {chatMessages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  msg={msg}
                  index={index}
                  isInView={isInView}
                  bubbleRef={
                    {
                      get current() {
                        return messageRefs.current[index]
                      },
                      set current(el) {
                        messageRefs.current[index] = el
                      },
                    } as RefObject<HTMLDivElement | null>
                  }
                />
              ))}

              {/* Typing indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: [0, 1, 0] } : {}}
                transition={{
                  duration: 2,
                  delay: 4,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
                className="flex justify-start"
              >
                <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#5a4a42]/30 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#5a4a42]/30 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#5a4a42]/30 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input bar */}
            <div className="bg-[#f0f0f0] px-2.5 py-2 flex items-center gap-2 flex-shrink-0">
              <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-gray-400 shadow-sm">
                Digite uma mensagem...
              </div>
              <div className="w-8 h-8 rounded-full bg-[#075e54] flex items-center justify-center shadow-sm">
                <Send className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center py-1.5 bg-white flex-shrink-0">
              <div className="w-24 h-1 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───
export function AIAgentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()

  return (
    <>
      <section
        id="ai-agent"
        ref={sectionRef}
        className="py-24 md:py-32 relative overflow-hidden bg-[#faf8f6]"
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
          className="absolute top-110 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#4f6f64]/[0.06] to-[#3d574f]/[0.04] rounded-full blur-3xl"
          animate={
            prefersReduced
              ? {}
              : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#db6f57]/[0.06] to-[#8b3d35]/[0.04] rounded-full blur-3xl"
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
          {/* ─── Section header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f6f64]/[0.08] border border-[#4f6f64]/20 mb-6">
              <Bot className="w-4 h-4 text-[#4f6f64]" />
              <span className="text-xs font-bold text-[#4f6f64] uppercase tracking-wider">
                Inteligência Artificial
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.1]">
              Seu assistente virtual{" "}
              <span className="bg-gradient-to-r from-[#4f6f64] to-[#3d574f] bg-clip-text text-transparent">
                trabalhando 24/7
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#5a4a42]/70 leading-relaxed max-w-2xl mx-auto">
              Atenda seus clientes automaticamente pelo WhatsApp. Agende,
              confirme e gerencie sem mover um dedo.
            </p>
          </motion.div>

          {/* ─── Stats row ─── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 md:mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg text-center py-5 px-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(12px)",
                    borderColor: `${stat.color}20`,
                    boxShadow:
                      "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
                  }}
                >
                  <Icon
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: stat.color }}
                  />
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#5a4a42]/70">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>

          {/* ─── Main content: Mockup + Capabilities ─── */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
            {/* Phone mockup with synced floating actions */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -40 }
              }
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-2 relative flex justify-center"
            >
              <PhoneMockup isInView={isInView} />
            </motion.div>

            {/* Capability cards */}
            <div className="lg:col-span-3 space-y-6 md:ml-30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-5 flex items-center justify-center gap-2"
              >
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a2420]">
                  O que a{" "}
                  <span className="bg-gradient-to-r from-[#4f6f64] to-[#3d574f] bg-clip-text text-transparent">
                    IA
                  </span>{" "}
                  faz por você?
                </h3>
              </motion.div>

              {capabilityGroups.map((group, index) => (
                <CapabilityCard
                  key={group.id}
                  group={group}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-30 px-4 relative z-10"
        >
          <Link
            href="/agente-virtual"
            className="group/cta block w-full max-w-4xl mx-auto bg-gradient-to-r from-[#4f6f64] to-[#3d574f] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1">
                      Teste o agente inteligente agora mesmo
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm lg:text-base">
                      Veja como a IA pode transformar seu atendimento. Sem compromisso!
                    </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </div>
          </Link>
        </motion.div>
      </section>

      
      

      {/* ─── CTA final ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center p-10 md:p-12 bg-gradient-to-br from-[#db6f57] to-[#8b3d35] relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10">
          <Heart className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-6" />
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4">
            Pronto para transformar seu negócio?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Comece grátis hoje. Sem cartão de crédito. Sem compromisso.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-[#8b3d35] rounded-xl font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            Teste grátis por 14 dias
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
