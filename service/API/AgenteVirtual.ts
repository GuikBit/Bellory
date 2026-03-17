import axios from "axios"

const api = axios.create({
  baseURL: "https://api.bellory.com.br/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export interface AgentMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface AgentResponse {
  success: boolean
  message: string
  dados: {
    resposta: string
    sessionId?: string
  }
}

export async function sendMessageToAgent(payload: {
  mensagem: string
  sessionId?: string
  nome?: string
}): Promise<AgentResponse> {
  try {
    const response = await api.post<AgentResponse>(
      "/public/agente-virtual/chat",
      JSON.stringify(payload)
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Erro ao enviar mensagem."
      )
    }
    throw new Error("Erro de rede ou inesperado.")
  }
}
