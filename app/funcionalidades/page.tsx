"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion, useInView, useReducedMotion } from "framer-motion"
import {
  Calendar,
  Users,
  Briefcase,
  Scissors,
  DollarSign,
  BarChart3,
  Clock,
  TrendingUp,
  Shield,
  Globe,
  ShoppingBag,
  Bot,
  ArrowRight,
  Zap,
  MessageCircle,
  CheckCircle2,
  BellRing,
  Brain,
  Database,
  Smartphone,
  Palette,
  Star,
  CreditCard,
  FileText,
  PieChart,
  Target,
  Heart,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

// ─── Feature category data ───
interface Feature {
  icon: LucideIcon
  title: string
  description: string
  details: string[]
}

interface FeatureCategory {
  id: string
  title: string
  tagline: string
  description: string
  color: string
  icon: LucideIcon
  features: Feature[]
}

const categories: FeatureCategory[] = [
  {
    id: "agendamento",
    title: "Agendamento Inteligente",
    tagline: "Nunca mais perca um cliente por falta de organização",
    description:
      "Sistema completo de agendamentos online que funciona 24 horas. Seus clientes agendam pelo site, WhatsApp ou app — e você só precisa aparecer.",
    color: "#db6f57",
    icon: Calendar,
    features: [
      {
        icon: Calendar,
        title: "Agenda Online 24/7",
        description:
          "Seus clientes escolhem data, horário e profissional a qualquer momento.",
        details: [
          "Calendário visual por profissional",
          "Bloqueio automático de horários ocupados",
          "Suporte a múltiplos serviços simultâneos",
          "Agendamento recorrente para clientes fiéis",
        ],
      },
      {
        icon: BellRing,
        title: "Lembretes Automáticos",
        description:
          "Confirmações e lembretes enviados 24h antes via WhatsApp.",
        details: [
          "Confirmação com 1 clique pelo WhatsApp",
          "Lembrete personalizado por serviço",
          "Redução de até 40% nas faltas",
          "Reagendamento fácil em caso de cancelamento",
        ],
      },
      {
        icon: Clock,
        title: "Gestão de Horários",
        description:
          "Controle completo dos horários de cada profissional da equipe.",
        details: [
          "Definição de horário de trabalho por dia",
          "Intervalos e pausas configuráveis",
          "Férias e folgas programadas",
          "Visualização por dia, semana ou mês",
        ],
      },
      {
        icon: Users,
        title: "Lista de Espera",
        description:
          "Quando não há vaga, o cliente entra na lista e é avisado automaticamente.",
        details: [
          "Notificação automática quando abre vaga",
          "Prioridade configurável",
          "Conversão automática para agendamento",
          "Histórico de espera por cliente",
        ],
      },
    ],
  },
  {
    id: "ia",
    title: "Inteligência Artificial",
    tagline: "Seu assistente virtual que nunca dorme",
    description:
      "Um agente de IA que atende seus clientes pelo WhatsApp, agenda horários, responde dúvidas e faz follow-up — tudo automaticamente.",
    color: "#4f6f64",
    icon: Bot,
    features: [
      {
        icon: MessageCircle,
        title: "Atendimento por WhatsApp",
        description:
          "IA treinada para conversar naturalmente e resolver demandas.",
        details: [
          "Conversação natural em português",
          "Entende gírias, áudios e contexto",
          "Resposta em menos de 5 segundos",
          "Disponível 24 horas por dia",
        ],
      },
      {
        icon: Brain,
        title: "Agendamento Autônomo",
        description:
          "O agente agenda, reagenda e cancela compromissos sem você precisar intervir.",
        details: [
          "Consulta agenda em tempo real",
          "Sugere horários disponíveis",
          "Confirma e envia comprovante",
          "Gerencia cancelamentos automaticamente",
        ],
      },
      {
        icon: Database,
        title: "Base de Conhecimento",
        description:
          "Alimente o agente com informações do seu negócio para respostas precisas.",
        details: [
          "Catálogo de serviços e preços",
          "Regras e políticas do estabelecimento",
          "FAQ personalizado",
          "Atualização em tempo real",
        ],
      },
      {
        icon: Shield,
        title: "Escalonamento Inteligente",
        description:
          "Quando a IA não consegue resolver, transfere para um humano.",
        details: [
          "Detecção automática de complexidade",
          "Transferência para WhatsApp do profissional",
          "Contexto completo da conversa é mantido",
          "Métricas de resolução por tipo",
        ],
      },
    ],
  },
  {
    id: "financeiro",
    title: "Gestão Financeira",
    tagline: "Saúde financeira em tempo real para decisões inteligentes",
    description:
      "Controle completo das suas finanças: caixa, comissões, relatórios e análises — tudo automatizado para você focar no que importa.",
    color: "#8b3d35",
    icon: DollarSign,
    features: [
      {
        icon: DollarSign,
        title: "Controle de Caixa",
        description:
          "Entradas, saídas, contas a pagar e receber em um só lugar.",
        details: [
          "Registro automático por atendimento",
          "Categorização de receitas e despesas",
          "Contas a pagar com alertas de vencimento",
          "Conciliação bancária simplificada",
        ],
      },
      {
        icon: PieChart,
        title: "Relatórios Financeiros",
        description:
          "Dashboards visuais para entender a saúde do seu negócio.",
        details: [
          "Faturamento por período e profissional",
          "Lucro líquido em tempo real",
          "Comparativo mensal e anual",
          "Exportação em PDF e Excel",
        ],
      },
      {
        icon: CreditCard,
        title: "Comissões Automáticas",
        description:
          "Comissões calculadas automaticamente por serviço e profissional.",
        details: [
          "Percentual configurável por serviço",
          "Cálculo automático por atendimento",
          "Relatório de comissões por período",
          "Zero disputas com a equipe",
        ],
      },
      {
        icon: TrendingUp,
        title: "Análise de Lucratividade",
        description:
          "Saiba exatamente quais serviços e profissionais geram mais lucro.",
        details: [
          "Margem de lucro por serviço",
          "Ranking de profissionais por faturamento",
          "Análise de tendências e sazonalidade",
          "Sugestões de otimização via IA",
        ],
      },
    ],
  },
  {
    id: "clientes",
    title: "Gestão de Clientes",
    tagline: "Conheça e fidelize cada cliente automaticamente",
    description:
      "CRM completo e inteligente: histórico de atendimentos, preferências, fidelização e campanhas personalizadas para cada cliente.",
    color: "#db6f57",
    icon: Heart,
    features: [
      {
        icon: Users,
        title: "Cadastro Completo",
        description:
          "Perfil detalhado de cada cliente com histórico e preferências.",
        details: [
          "Dados pessoais e contato",
          "Histórico completo de atendimentos",
          "Preferências de serviço e profissional",
          "Notas e observações por atendimento",
        ],
      },
      {
        icon: Star,
        title: "Programa de Fidelidade",
        description:
          "Sistema de pontos e recompensas para manter seus clientes voltando.",
        details: [
          "Pontos por atendimento ou valor gasto",
          "Recompensas personalizáveis",
          "Níveis de fidelidade (Bronze, Prata, Ouro)",
          "Notificação automática de resgate",
        ],
      },
      {
        icon: Target,
        title: "Follow-up Inteligente",
        description:
          "Ativação automática de clientes inativos com mensagens personalizadas.",
        details: [
          "Detecção de inatividade por período",
          "Mensagens de retorno via WhatsApp",
          "Ofertas exclusivas para reativação",
          "Métricas de taxa de retorno",
        ],
      },
      {
        icon: FileText,
        title: "Anamnese Digital",
        description:
          "Fichas de avaliação digital para serviços especializados.",
        details: [
          "Formulários personalizáveis",
          "Histórico de anamneses por cliente",
          "Fotos de antes e depois",
          "Assinatura digital do cliente",
        ],
      },
    ],
  },
  {
    id: "presenca",
    title: "Presença Digital",
    tagline: "Presença profissional online para atrair mais clientes",
    description:
      "Seu negócio com site profissional, catálogo digital e mini e-commerce — tudo integrado ao sistema.",
    color: "#4f6f64",
    icon: Globe,
    features: [
      {
        icon: Globe,
        title: "Site Personalizado",
        description:
          "Landing page profissional e responsiva com sua identidade visual.",
        details: [
          "Templates modernos para o seu segmento",
          "Logo, cores e fontes personalizáveis",
          "SEO otimizado para Google",
          "Domínio próprio ou subdomínio Bellory",
        ],
      },
      {
        icon: Palette,
        title: "Catálogo de Serviços",
        description:
          "Serviços com fotos, descrições e preços sempre atualizados.",
        details: [
          "Fotos em alta qualidade",
          "Categorização por tipo de serviço",
          "Preços e duração estimada",
          "Link direto para agendar",
        ],
      },
      {
        icon: ShoppingBag,
        title: "Mini E-commerce",
        description:
          "Venda produtos online com pagamento integrado.",
        details: [
          "Catálogo de produtos com fotos",
          "Carrinho de compras",
          "Pagamento via Pix e cartão",
          "Controle de estoque automático",
        ],
      },
      {
        icon: Smartphone,
        title: "App para Clientes",
        description:
          "Aplicativo para seus clientes agendarem e acompanharem tudo.",
        details: [
          "Agendamento direto pelo app",
          "Notificações push de lembretes",
          "Histórico de atendimentos",
          "Programa de fidelidade integrado",
        ],
      },
    ],
  },
  {
    id: "gestao",
    title: "Gestão Administrativa",
    tagline: "Gestão no piloto automático, economize até 10h por semana",
    description:
      "Dashboard inteligente, controle de equipe, metas e métricas em tempo real para tomar as melhores decisões.",
    color: "#8b3d35",
    icon: BarChart3,
    features: [
      {
        icon: BarChart3,
        title: "Dashboard Inteligente",
        description:
          "Todas as métricas do seu negócio em um painel visual e em tempo real.",
        details: [
          "KPIs de faturamento e agendamentos",
          "Gráficos de ocupação por profissional",
          "Alertas inteligentes de oportunidades",
          "Comparativo com períodos anteriores",
        ],
      },
      {
        icon: Briefcase,
        title: "Controle de Equipe",
        description:
          "Horários, comissões, metas e produtividade em um só lugar.",
        details: [
          "Perfil individual por profissional",
          "Metas com acompanhamento visual",
          "Ranking de produtividade",
          "Gestão de permissões e acessos",
        ],
      },
      {
        icon: Scissors,
        title: "Gestão de Serviços",
        description:
          "Catálogo completo com duração, preços e regras por serviço.",
        details: [
          "Duração estimada por serviço",
          "Preço fixo ou variável",
          "Serviços vinculados a profissionais",
          "Pacotes e combos de serviços",
        ],
      },
      {
        icon: Zap,
        title: "Automações",
        description:
          "Crie fluxos automatizados para tarefas repetitivas.",
        details: [
          "Mensagens automáticas pós-atendimento",
          "Relatórios enviados por e-mail",
          "Alertas de estoque baixo",
          "Backup automático de dados",
        ],
      },
    ],
  },
]

// ─── Hero section ───
function FeaturesHero({ isInView }: { isInView: boolean }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#faf8f6]">
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#db6f57]/[0.06] to-[#8b3d35]/[0.04] rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#4f6f64]/[0.06] to-[#db6f57]/[0.04] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#db6f57]/[0.08] border border-[#db6f57]/20 mb-6">
            <Zap className="w-4 h-4 text-[#db6f57]" />
            <span className="text-xs font-bold text-[#db6f57] uppercase tracking-wider">
              Funcionalidades Completas
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] mb-6 leading-[1.1]">
            Tudo que seu negócio precisa,{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              em uma só plataforma
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#5a4a42]/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Do agendamento à gestão financeira, da inteligência artificial à
            presença digital. Conheça cada funcionalidade em detalhe.
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => {
              const Icon = cat.icon
              return (
                <motion.a
                  key={cat.id}
                  href={`#${cat.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    borderColor: `${cat.color}20`,
                  }}
                >
                  <Icon
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: cat.color }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: cat.color }}
                  >
                    {cat.title}
                  </span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Feature detail card ───
function FeatureDetailCard({
  feature,
  color,
  index,
  isInView,
}: {
  feature: Feature
  color: string
  index: number
  isInView: boolean
}) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className="relative rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl h-full"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderColor: `${color}20`,
          boxShadow:
            "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${color}06 0%, transparent 70%)`,
          }}
        />

        <div className="relative p-6">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${color}12`,
              border: `1.5px solid ${color}25`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>

          {/* Title & description */}
          <h4 className="text-lg font-bold text-[#2a2420] mb-2">
            {feature.title}
          </h4>
          <p className="text-sm text-[#5a4a42]/70 leading-relaxed mb-4">
            {feature.description}
          </p>

          {/* Detail list */}
          <ul className="space-y-2">
            {feature.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color }}
                />
                <span className="text-sm text-[#5a4a42]/80">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-0.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  )
}

// ─── Feature category section ───
function CategorySection({
  category,
  index,
  reversed,
}: {
  category: FeatureCategory
  index: number
  reversed: boolean
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const CategoryIcon = category.icon
  const isEven = index % 2 === 0

  return (
    <section
      id={category.id}
      ref={sectionRef}
      className={`py-20 md:py-28 relative overflow-hidden ${
        isEven ? "bg-[#faf8f6]" : "bg-[#f3eeea]"
      }`}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${category.color.slice(1)}' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative blob */}
      <motion.div
        className={`absolute w-[400px] h-[400px] rounded-full blur-3xl ${
          reversed ? "-left-20 top-20" : "-right-20 bottom-20"
        }`}
        style={{
          background: `radial-gradient(ellipse, ${category.color}08, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Category header */}
        <div
          className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-14 md:mb-18 ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={reversed ? "lg:order-2" : ""}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{
                backgroundColor: `${category.color}0a`,
                border: `1px solid ${category.color}20`,
              }}
            >
              <CategoryIcon
                className="w-4 h-4"
                style={{ color: category.color }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: category.color }}
              >
                {category.title}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.1]">
              {category.tagline.split(",")[0]}
              {category.tagline.includes(",") && (
                <>
                  ,{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${category.color}, ${category.color}cc)`,
                    }}
                  >
                    {category.tagline.split(",").slice(1).join(",")}
                  </span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#5a4a42]/70 leading-relaxed">
              {category.description}
            </p>
          </motion.div>

          {/* Stats / highlight card */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`grid grid-cols-2 gap-4 ${
              reversed ? "lg:order-1" : ""
            }`}
          >
            {category.features.slice(0, 4).map((feat, idx) => {
              const FIcon = feat.icon
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    borderColor: `${category.color}20`,
                  }}
                >
                  <FIcon
                    className="w-6 h-6 mx-auto mb-2"
                    style={{ color: category.color }}
                  />
                  <span className="text-sm font-semibold text-[#2a2420] leading-tight block">
                    {feat.title}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Feature detail cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.features.map((feature, idx) => (
            <FeatureDetailCard
              key={feature.title}
              feature={feature}
              color={category.color}
              index={idx}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA section ───
function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center p-12 md:p-16 bg-gradient-to-br from-[#db6f57] to-[#8b3d35] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Heart className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-6" />
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Pronto para transformar seu negócio?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Comece grátis hoje. Sem cartão de crédito. Sem compromisso.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/cadastro">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#8b3d35] rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Teste grátis por 14 dias
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link
            href="/#funcionalidades"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
          >
            Voltar para a home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// ─── Page ───
export default function Funcionalidades() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <main className="min-h-screen overflow-x-hidden" ref={heroRef}>
      <Header isMenu={true} isCadastro={true} />
      <FeaturesHero isInView={isHeroInView} />

      {categories.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          index={index}
          reversed={index % 2 !== 0}
        />
      ))}

      <CTASection />
      <Footer />
    </main>
  )
}
