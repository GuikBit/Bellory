"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-end gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "#db6f5715",
            border: "1.5px solid #db6f5725",
          }}
        >
          <Bot className="w-4 h-4 text-[#db6f57]" />
        </div>
        <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-[#e6d9d4]/30">
          <div className="flex gap-1.5">
            {[0, 0.15, 0.3].map((delay) => (
              <motion.div
                key={delay}
                className="w-2 h-2 rounded-full bg-[#25D366]/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
