"use client"

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion"
import {
  Plus,
  Minus,
  Zap,
  Database,
  Wifi,
  Users,
  Headphones,
  MessageCircle,
  CreditCard,
  Bot,
  Smartphone,
  Shield,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface FAQ {
  category: string
  icon: LucideIcon
  color: string
  q: string
  a: string
}

const faqs: FAQ[] = [
  {
    category: "Implantação",
    icon: Zap,
    color: "#db6f57",
    q: "Quanto tempo leva para eu começar a usar de verdade?",
    a: "Cinco minutos pra criar a conta e já estar agendando. Configurar a operação inteira — equipe, serviços, horários, WhatsApp — leva entre 1 e 3 horas, dependendo do tamanho do negócio. A gente acompanha cada passo via WhatsApp até tudo estar rodando.",
  },
  {
    category: "Técnico",
    icon: Smartphone,
    color: "#4f6f64",
    q: "Preciso comprar algum equipamento especial?",
    a: "Nada. Qualquer celular, tablet ou computador com internet funciona. Nenhum software pra instalar, nenhum servidor na recepção. Você acessa pelo navegador ou pelo app do Bellory (Android e iOS) e pronto.",
  },
  {
    category: "Migração",
    icon: Database,
    color: "#8b3d35",
    q: "E se eu já uso outro sistema? Meus dados vêm junto?",
    a: "A gente importa sua base de clientes, histórico de atendimentos e agenda dos sistemas mais comuns do mercado — Trinks, Vaypol, Agenda+, Salon Pro — ou de planilhas Excel. Até do caderninho, se você quiser digitalizar. Sem custo e sem perder nada.",
  },
  {
    category: "Técnico",
    icon: Wifi,
    color: "#4f6f64",
    q: "E se a internet cair no meio de um atendimento?",
    a: "O app continua funcionando offline pras ações essenciais — ver a agenda, anotar o atendimento, marcar pagamento. Assim que a conexão voltar, tudo sincroniza sozinho. Ninguém fica na mão.",
  },
  {
    category: "Planos",
    icon: Users,
    color: "#db6f57",
    q: "Quantos profissionais e clientes eu posso cadastrar?",
    a: "No plano gratuito: 1 profissional, clientes ilimitados. Nos planos pagos: todos os profissionais e clientes que precisar, sem limite e sem cobrança por usuário extra. Você paga pelo plano, não pelo tamanho da equipe.",
  },
  {
    category: "Suporte",
    icon: Headphones,
    color: "#8b3d35",
    q: "Como funciona o suporte no dia-a-dia?",
    a: "Suporte humano via WhatsApp em horário comercial (seg-sex, 8h às 18h) para todos os planos, com resposta média em 4 minutos. Plano Premium tem suporte prioritário 7 dias por semana, inclusive em feriado e fim de semana.",
  },
  {
    category: "IA",
    icon: MessageCircle,
    color: "#db6f57",
    q: "O WhatsApp do agente precisa ser o mesmo do meu negócio?",
    a: "Pode ser o mesmo (via WhatsApp Business API oficial) ou um número novo dedicado ao agente — você escolhe. Se usar o seu número, o agente responde em nome do salão e mantém o histórico no mesmo chat. Nenhum cliente percebe a transição.",
  },
  {
    category: "Comercial",
    icon: CreditCard,
    color: "#4f6f64",
    q: "E se eu quiser cancelar depois?",
    a: "Cancelamento em 1 clique dentro do painel, sem multa e sem letra miúda. Se cancelar no meio do mês, cobramos só os dias usados. Você baixa seus dados em Excel antes de sair — o que é seu fica com você.",
  },
  {
    category: "IA",
    icon: Bot,
    color: "#8b3d35",
    q: "A IA precisa de algum treinamento antes de começar?",
    a: "Não. Ela já vem sabendo como funciona um salão, barbearia, clínica, nail designer ou spa. Você informa seus serviços, preços e horários e ela aprende o resto conversando. Pra casos bem específicos, dá pra alimentar uma base de conhecimento personalizada.",
  },
  {
    category: "LGPD",
    icon: Shield,
    color: "#db6f57",
    q: "Meus dados e dos meus clientes estão seguros?",
    a: "Sim. Hospedagem no Brasil, criptografia AES-256 em repouso e em trânsito, backups diários e compliance total com a LGPD. A gente nunca vende, aluga ou compartilha informações com terceiros. Seu dado é seu — a gente só guarda bem.",
  },
]

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = faq.icon
  const prefersReduced = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.04,
        ease: EASE_OUT,
      }}
      className="relative rounded-2xl border overflow-hidden transition-colors"
      style={{
        backgroundColor: isOpen ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
        borderColor: isOpen ? `${faq.color}35` : "#e6d9d4",
        backdropFilter: "blur(10px)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left px-5 md:px-6 py-5 flex items-start gap-4 group"
      >
        <div
          className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-rotate-6"
          style={{
            backgroundColor: `${faq.color}14`,
            border: `1.5px solid ${faq.color}28`,
          }}
        >
          <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" style={{ color: faq.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-[10px] uppercase tracking-[0.24em] font-bold mb-1"
            style={{ color: faq.color }}
          >
            {faq.category}
          </div>
          <h3 className="font-serif text-[17px] md:text-lg font-bold text-[#2a2420] leading-snug pr-2">
            {faq.q}
          </h3>
        </div>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? faq.color : `${faq.color}14`,
            color: isOpen ? "#ffffff" : faq.color,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              prefersReduced ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 pl-[70px] md:pl-[76px]">
              <div
                className="h-px mb-4"
                style={{
                  background: `linear-gradient(to right, ${faq.color}30, transparent)`,
                }}
              />
              <p className="text-[14px] md:text-[15px] text-[#5a4a42] leading-[1.75]">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-full transition-all"
          style={{ backgroundColor: faq.color, opacity: 0.6 }}
        />
      )}
    </motion.article>
  )
}

export function ProductFAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const prefersReduced = useReducedMotion()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section
      ref={sectionRef}
      id="perguntas"
      className="py-24 md:py-32 relative overflow-hidden bg-[#faf8f6]"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-32 right-0 w-[460px] h-[460px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.14), transparent 65%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -left-12 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,111,100,0.12), transparent 65%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.18, 1], opacity: [0.4, 0.75, 0.4] }
        }
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center mb-14 md:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-10 bg-[#db6f57] opacity-60" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
              Perguntas
              <span className="mx-2 opacity-40">·</span>
              respostas sem enrolação
            </span>
            <span aria-hidden className="h-px w-10 bg-[#db6f57] opacity-60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold tracking-tight text-[#2a2420] leading-[1.04] mb-5">
            A gente ouve isso aqui{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #db6f57 0%, #8b3d35 50%, #db6f57 100%)",
                backgroundSize: "200% auto",
              }}
            >
              todo dia.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed font-light">
            Dez perguntas que a gente escuta semana sim, semana também. Se a
            sua não tá aqui, é só mandar um oi.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              index={idx}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center flex-wrap gap-3 justify-center">
            <span className="text-[14px] md:text-[15px] text-[#5a4a42]/75 font-light">
              Não achou a sua?
            </span>
            <Link
              href="/#contato"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2a2420] text-white text-[12px] font-bold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                boxShadow: "0 12px 32px -12px rgba(42,36,32,0.35)",
              }}
            >
              <span className="text-[#db6f57]">Manda um oi</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
