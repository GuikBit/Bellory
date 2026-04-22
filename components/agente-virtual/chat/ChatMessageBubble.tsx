"use client"

import { motion } from "framer-motion"
import { Bot, CheckCheck, Sparkles, User } from "lucide-react"
import type { ChatMessage } from "./types"

export function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-end gap-2 max-w-[85%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: isUser ? "rgba(37,211,102,0.12)" : "#db6f5715",
            border: `1.5px solid ${isUser ? "rgba(37,211,102,0.4)" : "#db6f5725"}`,
          }}
        >
          {isUser ? (
            <User className="w-4 h-4 text-[#128C7E]" />
          ) : (
            <Bot className="w-4 h-4 text-[#db6f57]" />
          )}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "text-white rounded-br-sm"
              : "bg-white text-[#2a2420] rounded-bl-sm border border-[#e6d9d4]/30"
          }`}
          style={
            isUser
              ? {
                  background:
                    "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                }
              : undefined
          }
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
                isUser ? "text-white/70" : "text-[#5a4a42]/40"
              }`}
            >
              {message.timestamp}
            </span>
            {isUser ? (
              <CheckCheck className="w-3 h-3 text-white/80" />
            ) : (
              <Sparkles className="w-3 h-3 text-[#db6f57]/50" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
