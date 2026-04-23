"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { defaultWebhookAdapter } from "./webhookClient"
import type { ChatMessage, WebhookAdapter } from "./types"

function timeNow() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

interface UseAgenteChatOptions {
  welcomeMessage?: string
  adapter?: WebhookAdapter
}

export function useAgenteChat({
  welcomeMessage,
  adapter = defaultWebhookAdapter,
}: UseAgenteChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    welcomeMessage
      ? [
          {
            id: makeId(),
            role: "assistant",
            content: welcomeMessage,
            timestamp: timeNow(),
          },
        ]
      : []
  )
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionIdRef = useRef<string | undefined>(undefined)

  const send = useCallback(
    async (text?: string) => {
      const messageText = (text ?? input).trim()
      if (!messageText || isLoading) return

      setError(null)
      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: messageText,
        timestamp: timeNow(),
      }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        const response = await adapter.send({
          mensagem: messageText,
          sessionId: sessionIdRef.current,
        })
        if (response.sessionId) sessionIdRef.current = response.sessionId
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content:
              response.resposta ||
              "Desculpe, não consegui processar agora. Tente novamente.",
            timestamp: timeNow(),
          },
        ])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro inesperado")
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content:
              "Ops! Estou com dificuldades no momento. Tente novamente em alguns instantes.",
            timestamp: timeNow(),
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [adapter, input, isLoading]
  )

  const reset = useCallback(() => {
    sessionIdRef.current = undefined
    setMessages(
      welcomeMessage
        ? [
            {
              id: makeId(),
              role: "assistant",
              content: welcomeMessage,
              timestamp: timeNow(),
            },
          ]
        : []
    )
    setInput("")
    setError(null)
  }, [welcomeMessage])

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    send,
    reset,
  }
}

export function useAutoScroll(
  dependencies: unknown[]
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = el.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
  return ref
}
