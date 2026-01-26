"use client"

import { motion, useInView } from "framer-motion"
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
  Zap,
  Heart,
  CheckCircle2,
  ArrowRight,
  Bot,
  Globe,
  ShoppingBag
} from "lucide-react"
import { Card } from "primereact/card"
import { useRef } from "react"
import { useTheme } from "@/contexts/HeroThemeContext"
import { themeConfig } from "@/utils/themes"

// Benefícios principais organizados por problema que resolvem
const benefitSections = [
  {
    category: "Nunca mais perca um cliente",
    tagline: "Reduza faltas em até 40% com automação inteligente",
    color: "#db6f57",
    gradient: "from-[#db6f57]/10 to-[#c55a42]/10",
    borderColor: "border-[#db6f57]/20",
    features: [
      {
        icon: Calendar,
        title: "Agendamento Online 24/7",
        description: "Seus clientes agendam quando quiserem pelo site ou WhatsApp. Nunca perca uma venda por estar fechado.",
        impact: "Aumento de 30% em agendamentos",
        stat: "+30%"
      },
      {
        icon: Bot,
        title: "Agente Virtual no WhatsApp",
        description: "IA que responde instantaneamente, agenda serviços, confirma horários e envia lembretes automáticos.",
        impact: "Responde em menos de 5 segundos",
        stat: "<5s"
      },
      {
        icon: Clock,
        title: "Lembretes Automáticos",
        description: "Confirmações e lembretes por WhatsApp 24h antes. Cliente confirma em 1 clique.",
        impact: "40% menos faltas",
        stat: "-40%"
      }
    ]
  },
  {
    category: "Gestão no piloto automático",
    tagline: "Economize até 10 horas por semana em tarefas administrativas",
    color: "#4f6f64",
    gradient: "from-[#4f6f64]/10 to-[#3d574f]/10",
    borderColor: "border-[#4f6f64]/20",
    features: [
      {
        icon: BarChart3,
        title: "Dashboard Inteligente",
        description: "Métricas em tempo real sobre agendamentos, faturamento, clientes e performance da equipe.",
        impact: "Visão 360º do negócio",
        stat: "Real-time"
      },
      {
        icon: Users,
        title: "Gestão Completa de Clientes",
        description: "Histórico detalhado, preferências, aniversários e programa de fidelidade automático.",
        impact: "50% mais retenção",
        stat: "+50%"
      },
      {
        icon: Briefcase,
        title: "Controle de Equipe",
        description: "Horários, comissões, metas e produtividade. Tudo calculado automaticamente.",
        impact: "Zero erros de comissão",
        stat: "0 erros"
      }
    ]
  },
  {
    category: "Presença digital profissional",
    tagline: "Seu negócio online com site personalizado e e-commerce integrado",
    color: "#8b3d35",
    gradient: "from-[#8b3d35]/10 to-[#a8524a]/10",
    borderColor: "border-[#8b3d35]/20",
    features: [
      {
        icon: Globe,
        title: "Site Personalizado",
        description: "Landing page linda e responsiva com sua identidade visual. Seus clientes te encontram no Google.",
        impact: "SEO otimizado",
        stat: "Top 3"
      },
      {
        icon: ShoppingBag,
        title: "Mini E-commerce",
        description: "Venda produtos online com pagamento integrado. Entrega ou retirada no negócio.",
        impact: "Nova fonte de receita",
        stat: "+35%"
      },
      {
        icon: Scissors,
        title: "Catálogo Digital",
        description: "Seus serviços com fotos, descrições e preços. Cliente escolhe profissional e horário.",
        impact: "Conversão de 60%",
        stat: "60%"
      }
    ]
  },
  {
    category: "Financeiro sob controle",
    tagline: "Saúde financeira em tempo real para decisões inteligentes",
    color: "#db6f57",
    gradient: "from-[#db6f57]/10 to-[#e88c76]/10",
    borderColor: "border-[#db6f57]/20",
    features: [
      {
        icon: DollarSign,
        title: "Controle de Caixa",
        description: "Entradas, saídas, contas a pagar e receber. Relatórios fiscais automáticos.",
        impact: "Compliance total",
        stat: "100%"
      },
      {
        icon: TrendingUp,
        title: "Análises Financeiras",
        description: "Entenda o que dá mais lucro, qual profissional vende mais, horários de pico e muito mais.",
        impact: "Decisões baseadas em dados",
        stat: "Data-driven"
      },
      {
        icon: Shield,
        title: "Comissões Automáticas",
        description: "Sistema calcula comissões de cada profissional automaticamente. Zero disputas.",
        impact: "Transparência total",
        stat: "Auto"
      }
    ]
  }
]

// Card de feature individual
const FeatureCard = ({ feature, color, index, theme }: any) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className={`group relative p-8 h-full ${theme.cardBg} ${theme.cardBgHover} border ${theme.cardBorder} ${theme.borderHover} rounded-2xl transition-all duration-300 ${theme.cardShadowHover} hover:-translate-y-2 overflow-hidden`}>
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-full blur-3xl"
          style={{ backgroundColor: color }}
        />
        
        {/* Ícone */}
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: `${color}15`,
              border: `2px solid ${color}30`
            }}
          >
            <feature.icon 
              className="w-8 h-8 transition-transform duration-300 group-hover:rotate-3" 
              style={{ color }} 
            />
          </div>

          {/* Badge de impacto */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#4f6f64] to-[#3d574f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {feature.stat}
          </div>
        </div>

        {/* Conteúdo */}
        <h3 className={`text-2xl font-bold mb-3 ${theme.headlineColor} group-hover:${theme.highlightColor} transition-colors`} style={{ color: theme.textPrimary }}>
          {feature.title}
        </h3>
        <p className={`${theme.subheadlineColor} leading-relaxed mb-4 text-base`}>
          {feature.description}
        </p>

        {/* Impacto */}
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
          <TrendingUp className="w-4 h-4" />
          <span>{feature.impact}</span>
        </div>

        {/* Linha decorativa no hover */}
        <div 
          className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
          style={{ backgroundColor: color }}
        />
      </Card>
    </motion.div>
  )
}

// Seção de benefícios
const BenefitSection = ({ section, index, theme }: any) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-24 last:mb-0"
    >
      {/* Header da seção */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 shadow-lg"
          style={{
            backgroundColor: `${section.color}15`,
            border: `2px solid ${section.color}30`
          }}
        >
          <CheckCircle2 className="w-5 h-5" style={{ color: section.color }} />
          <span className={`font-bold ${theme.headlineColor} uppercase tracking-wide text-sm`} style={{ color: theme.textPrimary }}>
            {section.category}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`font-serif text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${theme.headlineColor}`}
        >
          {section.tagline}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-24 h-1 mx-auto rounded-full"
          style={{ backgroundColor: section.color }}
        />
      </div>

      {/* Grid de features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {section.features.map((feature: any, idx: number) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            color={section.color}
            index={idx}
            theme={theme}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function FeaturesInternal() {
  const { isDark } = useTheme()
  const theme = isDark ? themeConfig.dark : themeConfig.light

  return (
    <section id="funcionalidades" className={`py-32 relative overflow-hidden ${theme.sectionBg}`}>
      {/* Padrão de fundo */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(theme.patternColor)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: parseFloat(theme.patternOpacity),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header principal */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${theme.badge} border mb-8`}>
            <Zap className={`w-5 h-5 ${theme.badgeIcon}`} />
            <span className={`font-bold ${theme.badgeText} uppercase tracking-wide text-sm`}>
              Funcionalidades que transformam
            </span>
          </div>

          <h2 className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 ${theme.headlineColor} leading-[1.1]`}>
            Foque no que importa:{" "}
            <span className={`${theme.gradientText} bg-clip-text text-transparent`}>
              seus clientes
            </span>
          </h2>

          <p className={`text-xl sm:text-2xl ${theme.subheadlineColor} leading-relaxed`}>
            Deixe a tecnologia cuidar da gestão. Nós automatizamos o chato,{" "}
            <span className={`${theme.highlightColor} font-semibold`}>você cuida do que ama</span>.
          </p>
        </motion.div> */}

        {/* Seções de benefícios */}
        {benefitSections.map((section, index) => (
          <BenefitSection key={section.category} section={section} index={index} theme={theme} />
        ))}

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`text-center mt-24 p-12 rounded-3xl ${isDark ? 'bg-gradient-to-br from-[#E07A62] via-[#DB6F57] to-[#A8524A]' : 'bg-gradient-to-br from-[#db6f57] to-[#8b3d35]'} relative overflow-hidden`}
        >
          {/* Padrão decorativo */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Pronto para transformar seu negócio?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Comece grátis hoje. Sem cartão de crédito. Sem compromisso.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-10 py-5 bg-white ${isDark ? 'text-[#E07A62]' : 'text-[#8b3d35]'} rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300`}
            >
              Teste grátis por 14 dias
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}