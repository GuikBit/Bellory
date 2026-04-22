import { sendMessageToAgent } from "@/service/API/AgenteVirtual"
import type { WebhookAdapter, WebhookRequest, WebhookResponse } from "./types"

export const defaultWebhookAdapter: WebhookAdapter = {
  async send(payload: WebhookRequest): Promise<WebhookResponse> {
    const response = await sendMessageToAgent({
      mensagem: payload.mensagem,
      sessionId: payload.sessionId,
      nome: payload.nome,
    })
    return {
      resposta:
        response.dados?.resposta ||
        "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?",
      sessionId: response.dados?.sessionId,
    }
  },
}

export function createUrlWebhookAdapter(url: string): WebhookAdapter {
  return {
    async send(payload: WebhookRequest): Promise<WebhookResponse> {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Webhook retornou ${res.status}`)
      const data = await res.json()
      return {
        resposta: data.resposta ?? data.message ?? data.reply ?? "",
        sessionId: data.sessionId ?? data.session_id,
      }
    },
  }
}
