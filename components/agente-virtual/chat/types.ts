export type ChatRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: string
}

export interface WebhookRequest {
  mensagem: string
  sessionId?: string
  nome?: string
}

export interface WebhookResponse {
  resposta: string
  sessionId?: string
}

export interface WebhookAdapter {
  send: (payload: WebhookRequest) => Promise<WebhookResponse>
}

export interface AgenteChatConfig {
  agentName?: string
  agentSubtitle?: string
  welcomeMessage?: string
  placeholder?: string
  suggestedMessages?: string[]
  adapter?: WebhookAdapter
}
