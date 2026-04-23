"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Bot, Loader2, RefreshCw, Send, Sparkles } from "lucide-react"
import { useAgenteChat, useAutoScroll } from "./useAgenteChat"
import { ChatMessageBubble } from "./ChatMessageBubble"
import { TypingIndicator } from "./TypingIndicator"
import type { AgenteChatConfig } from "./types"

const DEFAULT_WELCOME =
  "Olá! Eu sou o agente virtual da Bellory.\n\nPode me mandar uma mensagem como se fosse um cliente de verdade — vou te mostrar como identifico, respondo e conduzo para um agendamento.\n\nExperimente!"

const DEFAULT_SUGGESTED = [
  "Quero agendar um corte de cabelo",
  "Quais serviços vocês oferecem?",
  "Qual o preço de uma barba?",
  "Tem horário disponível amanhã?",
]

export function AgenteChat({
  agentName = "Bellory Assistente",
  agentSubtitle = "Online agora",
  welcomeMessage = DEFAULT_WELCOME,
  placeholder = "Digite sua mensagem...",
  suggestedMessages = DEFAULT_SUGGESTED,
  adapter,
}: AgenteChatConfig) {
  const { messages, input, setInput, isLoading, send, reset } = useAgenteChat({
    welcomeMessage,
    adapter,
  })
  const scrollRef = useAutoScroll([messages, isLoading])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const showSuggestions = messages.length <= 1 && suggestedMessages.length > 0

  return (
    <div className="flex flex-col h-full bg-white">
      <div
        className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #128C7E 0%, #075E54 100%)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="relative">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-white/20"
            style={{ background: "linear-gradient(135deg, #db6f57, #8b3d35)" }}
          >
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#075E54]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm truncate">
              {agentName}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[9px] font-bold text-white">IA</span>
            </div>
          </div>
          <span className="text-xs text-[#DCF8C6] font-medium">
            {agentSubtitle}
          </span>
        </div>
        <button
          onClick={reset}
          aria-label="Reiniciar conversa"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          type="button"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#128C7E]/20 scrollbar-track-transparent"
        style={{
          backgroundColor: "#ECE5DD",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23128C7E' fill-opacity='0.05'%3E%3Cpath d='M20 0L40 20 20 40 0 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
        {isLoading && <TypingIndicator />}
      </div>

      {showSuggestions && (
        <div
          className="px-4 py-3 border-t"
          style={{
            backgroundColor: "#F6F1EB",
            borderColor: "rgba(18,140,126,0.12)",
          }}
        >
          <p className="text-[10px] text-[#5a4a42]/60 uppercase tracking-wider font-bold mb-2">
            Experimente perguntar
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedMessages.map((msg) => (
              <button
                key={msg}
                onClick={() => send(msg)}
                disabled={isLoading}
                type="button"
                className="text-xs px-3 py-1.5 rounded-full border border-[#128C7E]/25 text-[#128C7E] bg-white/60 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-colors duration-200 disabled:opacity-50"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className="px-4 py-3 border-t flex-shrink-0"
        style={{
          backgroundColor: "#F6F1EB",
          borderColor: "rgba(18,140,126,0.12)",
        }}
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1 bg-white rounded-xl px-4 py-3 text-sm text-[#2a2420] placeholder-[#5a4a42]/40 border border-[#128C7E]/15 focus:outline-none focus:border-[#25D366]/60 focus:ring-2 focus:ring-[#25D366]/15 transition-all disabled:opacity-50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => send()}
            disabled={!input.trim() || isLoading}
            type="button"
            aria-label="Enviar mensagem"
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            style={{
              background:
                input.trim() && !isLoading
                  ? "linear-gradient(135deg, #25D366, #128C7E)"
                  : "#d8ccc4",
              boxShadow:
                input.trim() && !isLoading
                  ? "0 4px 12px rgba(37,211,102,0.3)"
                  : undefined,
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
