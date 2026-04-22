"use client"

import {
  Shield,
  FileText,
  Download,
  Trash2,
  Pencil,
  Eye,
  XCircle,
  Share2,
  Cookie,
  Mail,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import {
  LegalShell,
  LegalSection,
  LegalText,
  LegalList,
  LegalListItem,
  LegalCallout,
  LegalStrong,
  LegalLink,
  type TOCItem,
  type RelatedPolicy,
} from "@/components/legal/LegalShell"

const toc: TOCItem[] = [
  { id: "introducao", label: "O que é esta central" },
  { id: "direitos", label: "Seus direitos" },
  { id: "cookies", label: "Preferências de cookies" },
  { id: "como-solicitar", label: "Como solicitar" },
  { id: "dpo", label: "Encarregado (DPO)" },
  { id: "anpd", label: "ANPD" },
]

const related: RelatedPolicy[] = [
  {
    href: "/privacidade",
    label: "Política de Privacidade",
    description:
      "O documento completo com tudo que é coletado e por quê.",
  },
  {
    href: "/termos",
    label: "Termos de Uso",
    description:
      "As regras combinadas entre você e a plataforma.",
  },
]

interface RightItem {
  icon: LucideIcon
  title: string
  description: string
  action: string
  color: string
}

const rights: RightItem[] = [
  {
    icon: Eye,
    title: "Confirmação e acesso",
    description:
      "Saber quais dados pessoais seus estão sob nossa guarda e receber uma cópia completa.",
    action: "Solicitar acesso",
    color: "#db6f57",
  },
  {
    icon: Pencil,
    title: "Correção",
    description:
      "Pedir a atualização de dados incompletos, incorretos ou desatualizados.",
    action: "Corrigir dados",
    color: "#4f6f64",
  },
  {
    icon: Download,
    title: "Portabilidade",
    description:
      "Receber seus dados em formato estruturado (JSON ou Excel) para levar a outro serviço.",
    action: "Exportar dados",
    color: "#8b3d35",
  },
  {
    icon: Trash2,
    title: "Exclusão",
    description:
      "Solicitar o apagamento dos seus dados, exceto os que lei exige manter (fiscais, por exemplo).",
    action: "Apagar dados",
    color: "#db6f57",
  },
  {
    icon: XCircle,
    title: "Revogação de consentimento",
    description:
      "Retirar a autorização para tratamentos que dependem dela, como marketing.",
    action: "Revogar consentimento",
    color: "#4f6f64",
  },
  {
    icon: Share2,
    title: "Informação sobre compartilhamento",
    description:
      "Saber com quais terceiros seus dados foram ou podem ser compartilhados.",
    action: "Pedir relatório",
    color: "#8b3d35",
  },
]

function RightCard({ right }: { right: RightItem }) {
  const Icon = right.icon
  const subject = encodeURIComponent(`Solicitação LGPD — ${right.title}`)
  const body = encodeURIComponent(
    `Olá, equipe Bellory.\n\nGostaria de exercer meu direito de ${right.title.toLowerCase()} nos termos da LGPD.\n\nNome completo:\nE-mail cadastrado:\nCPF/CNPJ:\nMotivo da solicitação (opcional):\n\nObrigado(a).`
  )

  return (
    <article
      className="relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 bg-white/80 backdrop-blur-sm"
      style={{
        borderColor: `${right.color}28`,
        boxShadow:
          "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
      }}
    >
      <div className="p-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
          style={{
            backgroundColor: `${right.color}14`,
            border: `1.5px solid ${right.color}28`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: right.color }} />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#2a2420] leading-tight mb-2">
          {right.title}
        </h3>
        <p className="text-[13px] text-[#5a4a42]/75 leading-relaxed mb-4">
          {right.description}
        </p>
        <a
          href={`mailto:dpo@bellory.com.br?subject=${subject}&body=${body}`}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold transition-colors"
          style={{ color: right.color }}
        >
          {right.action}
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full opacity-30"
        style={{ backgroundColor: right.color }}
      />
    </article>
  )
}

function CookiePreferencesButton() {
  const open = () => {
    if (typeof window !== "undefined") {
      // Força reabrir o banner apagando o registro — solução mais robusta
      // que depender de um listener externo
      try {
        localStorage.removeItem("bellory-cookie-consent-v1")
      } catch {
        /* ignora */
      }
      window.location.reload()
    }
  }

  return (
    <button
      type="button"
      onClick={open}
      className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2a2420] text-white font-bold text-[13px] transition-all duration-300 hover:-translate-y-0.5"
      style={{
        boxShadow:
          "0 12px 32px -12px rgba(42,36,32,0.35), 0 4px 12px -4px rgba(42,36,32,0.15)",
      }}
    >
      <Cookie className="w-4 h-4 text-[#db6f57]" />
      Gerenciar preferências de cookies
      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  )
}

export default function LgpdPage() {
  return (
    <LegalShell
      eyebrow="Central de Privacidade"
      title="Seus dados, seus direitos."
      subtitle="A LGPD garante que você mande nas suas informações. Aqui você exerce cada direito em poucos cliques — sem burocracia, sem ligação, sem formulário gigante."
      lastUpdated="22 de abril de 2026"
      toc={toc}
      relatedPolicies={related}
    >
      <LegalCallout icon={Shield} title="Resposta em até 15 dias úteis" tone="sage">
        <p>
          Toda solicitação enviada para{" "}
          <LegalLink href="mailto:dpo@bellory.com.br" external>
            dpo@bellory.com.br
          </LegalLink>{" "}
          é respondida pelo nosso Encarregado dentro do prazo previsto em lei.
          Nenhuma taxa, nenhuma exigência desnecessária.
        </p>
      </LegalCallout>

      <LegalSection
        id="introducao"
        number="00"
        title="O que é esta central"
      >
        <LegalText>
          Esta é a página onde você exerce, de forma prática, todos os
          direitos garantidos pela <LegalStrong>Lei Geral de Proteção de
          Dados</LegalStrong> (Lei 13.709/2018). Cada botão abaixo abre um
          e-mail pronto para o nosso Encarregado (DPO) com o que ele precisa
          saber para cuidar da sua solicitação.
        </LegalText>
        <LegalText>
          Para entender o que a gente coleta e por que, leia a{" "}
          <LegalLink href="/privacidade">Política de Privacidade</LegalLink>{" "}
          completa.
        </LegalText>
      </LegalSection>

      <LegalSection id="direitos" number="01" title="Seus direitos — escolha o que quer fazer">
        <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
          {rights.map((r) => (
            <RightCard key={r.title} right={r} />
          ))}
        </div>
        <LegalText>
          Há mais direitos garantidos pela LGPD (oposição a tratamentos
          baseados em legítimo interesse, revisão de decisões automatizadas,
          entre outros). Se o seu caso não se encaixa em nenhum dos cartões
          acima, escreva diretamente para{" "}
          <LegalLink href="mailto:dpo@bellory.com.br" external>
            dpo@bellory.com.br
          </LegalLink>
          .
        </LegalText>
      </LegalSection>

      <LegalSection
        id="cookies"
        number="02"
        title="Preferências de cookies"
      >
        <LegalText>
          Na primeira visita ao site, você escolheu quais categorias de
          cookies a gente pode usar. Para rever ou mudar essa escolha a
          qualquer momento:
        </LegalText>
        <div className="my-6">
          <CookiePreferencesButton />
        </div>
        <LegalText>
          Os detalhes sobre cada categoria (essenciais, analytics, marketing)
          estão na seção 06 da{" "}
          <LegalLink href="/privacidade#cookies">Política de Privacidade</LegalLink>.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="como-solicitar"
        number="03"
        title="Como funciona o processo"
      >
        <LegalList>
          <LegalListItem>
            <LegalStrong>Você envia:</LegalStrong> clique no direito desejado
            acima ou escreva direto para{" "}
            <LegalLink href="mailto:dpo@bellory.com.br" external>
              dpo@bellory.com.br
            </LegalLink>{" "}
            informando nome, e-mail cadastrado e CPF/CNPJ.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>A gente confirma:</LegalStrong> o recebimento em até
            2 dias úteis, informando o próximo passo.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Validação:</LegalStrong> em alguns casos (como
            portabilidade e exclusão), precisamos confirmar que você é mesmo
            o titular. Isso é feito por meio seguro — nunca pedimos senha.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Conclusão:</LegalStrong> atendemos a solicitação em
            até 15 dias úteis, com confirmação por e-mail. Se houver motivo
            legal para não atender algum pedido, explicamos claramente.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="dpo" number="04" title="Nosso Encarregado (DPO)">
        <LegalCallout icon={Mail} title="Canal direto" tone="accent">
          <p>
            <LegalStrong>E-mail:</LegalStrong>{" "}
            <LegalLink href="mailto:dpo@bellory.com.br" external>
              dpo@bellory.com.br
            </LegalLink>
          </p>
          <p>
            <LegalStrong>Horário de resposta:</LegalStrong> dias úteis, das 9h
            às 18h (Brasília).
          </p>
          <p>
            <LegalStrong>Prazo oficial:</LegalStrong> até 15 dias úteis da
            confirmação de recebimento.
          </p>
          <p>
            O Encarregado é a pessoa responsável por conduzir a sua
            solicitação com imparcialidade e em conformidade com a LGPD.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection
        id="anpd"
        number="05"
        title="Se não ficar satisfeito"
      >
        <LegalText>
          Caso você não concorde com a resposta ou sinta que seus direitos
          não foram respeitados, é seu direito procurar a{" "}
          <LegalStrong>
            Autoridade Nacional de Proteção de Dados (ANPD)
          </LegalStrong>
          , o órgão federal que fiscaliza a LGPD.
        </LegalText>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Site:</LegalStrong>{" "}
            <LegalLink href="https://www.gov.br/anpd" external>
              gov.br/anpd
            </LegalLink>
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Canal de petições:</LegalStrong> disponível no
            próprio site da ANPD.
          </LegalListItem>
        </LegalList>
        <LegalText>
          Antes de recorrer à ANPD, tente resolver conosco — em mais de 95%
          dos casos chegamos a uma solução rápida no próprio canal do DPO.
        </LegalText>
      </LegalSection>
    </LegalShell>
  )
}
