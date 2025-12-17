"use client"

import { motion, useInView } from "framer-motion"
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
  ArrowRight
} from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "primereact/button"

// Mensagens do chat mockup
const chatMessages = [
  {
    type: "customer",
    message: "Oi! Queria agendar um corte de cabelo para amanhã",
    time: "14:32"
  },
  {
    type: "bot",
    message: "Olá! 😊 Claro, vou te ajudar! Temos horários disponíveis amanhã:\n\n• 10:00 com João\n• 14:00 com Maria\n• 16:30 com João\n\nQual prefere?",
    time: "14:32"
  },
  {
    type: "customer",
    message: "14:00 com a Maria, por favor",
    time: "14:33"
  },
  {
    type: "bot",
    message: "Perfeito! ✅\n\nAgendamento confirmado:\n📅 Data: 17/12 às 14:00\n✂️ Serviço: Corte de Cabelo\n👤 Profissional: Maria\n💰 Valor: R$ 45,00\n\nVocê receberá uma confirmação por WhatsApp 24h antes. Até lá! 👋",
    time: "14:33"
  }
]

// Casos de uso
const useCases = [
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "Cliente escolhe serviço, profissional e horário sem sair do WhatsApp",
    color: "#db6f57"
  },
  {
    icon: CheckCircle2,
    title: "Confirmação Instantânea",
    description: "Confirmações e lembretes enviados automaticamente 24h antes",
    color: "#4f6f64"
  },
  {
    icon: Users,
    title: "Histórico do Cliente",
    description: "Acessa informações do cliente, serviços anteriores e preferências",
    color: "#8b3d35"
  },
  {
    icon: MessageCircle,
    title: "Consulta de Serviços",
    description: "Responde dúvidas sobre preços, duração e disponibilidade",
    color: "#db6f57"
  },
  {
    icon: Clock,
    title: "Reagendamento Fácil",
    description: "Cliente pode cancelar ou remarcar em segundos, liberando a vaga",
    color: "#4f6f64"
  },
  {
    icon: Sparkles,
    title: "Atendimento Humanizado",
    description: "IA treinada para conversar naturalmente e resolver problemas",
    color: "#8b3d35"
  }
]

// Estatísticas de impacto
const stats = [
  { value: "<5s", label: "Tempo de resposta", icon: Zap },
  { value: "24/7", label: "Disponibilidade", icon: Clock },
  { value: "95%", label: "Taxa de resolução", icon: CheckCircle2 },
  { value: "+60%", label: "Agendamentos online", icon: TrendingUp }
]

export function AIAgentSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeMessage, setActiveMessage] = useState(0)

  // Anima as mensagens do chat
  useState(() => {
    const interval = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % chatMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <section 
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-gradient-to-b from-[#faf8f6] via-[#4f6f64]/5 to-[#faf8f6]"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f6f64' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Blobs animados */}
      <motion.div 
        className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-[#4f6f64]/20 to-[#3d574f]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
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
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#4f6f64]/10 to-[#3d574f]/10 border border-[#4f6f64]/20 mb-8">
            <Bot className="w-6 h-6 text-[#4f6f64]" />
            <span className="font-bold text-[#4f6f64] uppercase tracking-wide text-sm">
              Inteligência Artificial
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#2a2420] leading-[1.1]">
            Seu assistente virtual{" "}
            <span className="bg-gradient-to-r from-[#4f6f64] to-[#3d574f] bg-clip-text text-transparent">
              trabalhando 24/7
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#4f6f64] leading-relaxed mb-8">
            Atenda seus clientes automaticamente pelo WhatsApp.{" "}
            <span className="text-[#8b3d35] font-semibold">
              Agende, confirme e gerencie tudo sem mover um dedo
            </span>.
          </p>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#d8ccc4]"
              >
                <stat.icon className="w-8 h-8 text-[#4f6f64] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#2a2420] mb-1">{stat.value}</div>
                <div className="text-sm text-[#4f6f64]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conteúdo principal - Chat + Casos de uso */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          
          {/* Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Badge flutuante */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white px-6 py-3 rounded-full shadow-xl z-10 font-bold text-sm">
              🔥 Novidade!
            </div>

            {/* Phone mockup */}
            <div className="relative max-w-md mx-auto">
              {/* Frame do celular */}
              <div className="bg-[#2a2420] rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Header do WhatsApp */}
                  <div className="bg-[#075e54] text-white p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Bellory Assistente</div>
                      <div className="text-xs text-white/70">Online</div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="bg-[#ece5dd] p-4 h-[500px] overflow-y-auto">
                    <div className="space-y-3">
                      {chatMessages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.3 }}
                          className={`flex ${msg.type === "customer" ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[75%] rounded-lg p-3 shadow-md ${
                              msg.type === "customer" 
                                ? "bg-[#dcf8c6]" 
                                : "bg-white"
                            }`}
                          >
                            <p className="text-sm text-[#2a2420] whitespace-pre-line leading-relaxed">
                              {msg.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 text-right">{msg.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Input (decorativo) */}
                  <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                      Digite uma mensagem...
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Casos de uso */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a2420] mb-8">
              O que o agente virtual faz por você?
            </h3>

            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#d8ccc4] group hover:-translate-y-1"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ 
                    backgroundColor: `${useCase.color}15`,
                    border: `2px solid ${useCase.color}30`
                  }}
                >
                  <useCase.icon className="w-7 h-7" style={{ color: useCase.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#2a2420] mb-2">{useCase.title}</h4>
                  <p className="text-[#4f6f64] leading-relaxed">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-[#4f6f64] to-[#3d574f] rounded-3xl shadow-2xl">
            <div className="text-left">
              <h4 className="text-2xl font-bold text-white mb-2">
                Quer ver o agente em ação?
              </h4>
              <p className="text-white/80">
                Teste gratuitamente e veja como ele pode transformar seu atendimento
              </p>
            </div>
            <Button
              label="Testar agora"
              icon={<ArrowRight className="ml-2 w-5 h-5" />}
              iconPos="right"
              className="bg-white text-[#4f6f64] border-0 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl font-bold shadow-lg whitespace-nowrap"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}