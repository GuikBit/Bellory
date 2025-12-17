"use client"

import { motion, useInView } from "framer-motion"
import { 
  TrendingUp, 
  Clock, 
  Heart, 
  Zap,
  Star,
  Quote,
  Award,
  Users,
  Calendar,
  DollarSign,
  BarChart3
} from "lucide-react"
import { Card } from "primereact/card"
import { Avatar } from "primereact/avatar"
import { useRef } from "react"

// Benefícios principais
const benefits = [
  {
    icon: TrendingUp,
    title: "Aumente seu faturamento",
    description: "Reduza faltas com lembretes automáticos, fidelize clientes com programa de pontos e venda produtos online",
    stat: "+35%",
    statLabel: "de crescimento médio",
    color: "#db6f57"
  },
  {
    icon: Clock,
    title: "Economize tempo",
    description: "Automatize agendamentos, confirmações, cálculo de comissões e relatórios. Foque no que realmente importa",
    stat: "10h/sem",
    statLabel: "economizadas",
    color: "#4f6f64"
  },
  {
    icon: Heart,
    title: "Fidelize clientes",
    description: "Programa de pontos automático, lembretes de aniversário e histórico personalizado criam conexão real",
    stat: "50%",
    statLabel: "mais retenção",
    color: "#8b3d35"
  },
  {
    icon: Zap,
    title: "Decisões inteligentes",
    description: "Dashboards e relatórios detalhados para tomar decisões baseadas em dados reais do seu negócio",
    stat: "100%",
    statLabel: "visibilidade",
    color: "#db6f57"
  },
]

// Depoimentos
const testimonials = [
  {
    name: "Mariana Silva",
    role: "Proprietária",
    business: "Espaço Beleza Premium",
    location: "São Paulo, SP",
    image: "/professional-woman-salon-owner.jpg",
    rating: 5,
    content: "O Bellory transformou completamente a gestão do meu salão. Agora tenho controle total sobre agendamentos e financeiro. O agente virtual no WhatsApp sozinho já vale o investimento - responde clientes 24/7!",
    results: [
      { label: "Faturamento", value: "+42%" },
      { label: "Faltas", value: "-38%" }
    ],
    color: "#db6f57"
  },
  {
    name: "Carlos Mendes",
    role: "Dono",
    business: "Barbearia Moderna",
    location: "Rio de Janeiro, RJ",
    image: "/professional-man-barbershop-owner.jpg",
    rating: 5,
    content: "Desde que implementamos o Bellory, reduzimos as faltas drasticamente e aumentamos nossa receita. A equipe adora o sistema e os clientes adoram poder agendar online a qualquer hora.",
    results: [
      { label: "Novos clientes", value: "+60%" },
      { label: "Tempo economizado", value: "12h/sem" }
    ],
    color: "#4f6f64"
  },
  {
    name: "Ana Paula Costa",
    role: "Gestora",
    business: "Clínica Estética Zen",
    location: "Belo Horizonte, MG",
    image: "/professional-woman-clinic-manager.jpg",
    rating: 5,
    content: "A personalização do site nos ajudou a atrair muito mais clientes. O sistema é intuitivo, minha equipe aprendeu em um dia. Os relatórios financeiros me dão segurança para investir e crescer.",
    results: [
      { label: "Agendamentos online", value: "+85%" },
      { label: "Satisfação", value: "98%" }
    ],
    color: "#8b3d35"
  },
]

// Métricas gerais
const overallMetrics = [
  {
    icon: Users,
    value: "500+",
    label: "Estabelecimentos atendidos",
    color: "#db6f57"
  },
  {
    icon: Calendar,
    value: "50k+",
    label: "Agendamentos por mês",
    color: "#4f6f64"
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Avaliação média",
    color: "#8b3d35"
  },
  {
    icon: BarChart3,
    value: "35%",
    label: "Crescimento médio dos clientes",
    color: "#db6f57"
  }
]

// Card de depoimento
const TestimonialCard = ({ testimonial, index }: any) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="relative p-8 h-full bg-white border border-[#d8ccc4] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
        {/* Quote decorativo */}
        <Quote 
          className="absolute top-6 right-6 w-16 h-16 opacity-5" 
          style={{ color: testimonial.color }}
        />

        {/* Header com foto e info */}
        <div className="flex items-start gap-4 mb-6 relative z-10">
          <Avatar 
            image={testimonial.image}
            size="xlarge"
            shape="circle"
            className="border-4 shadow-lg"
            style={{ borderColor: `${testimonial.color}40` }}
          />
          <div className="flex-1">
            <h4 className="font-bold text-lg text-[#2a2420]">{testimonial.name}</h4>
            <p className="text-sm text-[#4f6f64]">{testimonial.role}</p>
            <p className="text-sm font-semibold" style={{ color: testimonial.color }}>
              {testimonial.business}
            </p>
            <p className="text-xs text-[#4f6f64] mt-1">{testimonial.location}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star 
              key={i} 
              className="w-5 h-5 fill-current" 
              style={{ color: testimonial.color }} 
            />
          ))}
        </div>

        {/* Depoimento */}
        <p className="text-[#4f6f64] leading-relaxed mb-6 italic">
          "{testimonial.content}"
        </p>

        {/* Resultados */}
        <div className="flex gap-4 pt-6 border-t border-[#d8ccc4]">
          {testimonial.results.map((result: any, i: number) => (
            <div key={i} className="flex-1 text-center">
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: testimonial.color }}
              >
                {result.value}
              </div>
              <div className="text-xs text-[#4f6f64]">{result.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

export function Benefits() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      id="beneficios" 
      className="py-32 relative overflow-hidden bg-gradient-to-b from-[#faf8f6] via-white to-[#faf8f6]"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23db6f57' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#db6f57]/10 to-[#8b3d35]/10 border border-[#db6f57]/20 mb-8">
            <Award className="w-5 h-5 text-[#db6f57]" />
            <span className="font-bold text-[#8b3d35] uppercase tracking-wide text-sm">
              Resultados Reais
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#2a2420] leading-[1.1]">
            Por que escolher o{" "}
            <span className="bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent">
              Bellory
            </span>?
          </h2>

          <p className="text-xl sm:text-2xl text-[#4f6f64] leading-relaxed">
            Mais de 500 estabelecimentos já transformaram seus negócios.{" "}
            <span className="text-[#8b3d35] font-semibold">
              Veja os resultados que nossos clientes alcançam
            </span>.
          </p>
        </motion.div>

        {/* Métricas gerais */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {overallMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[#d8ccc4] text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ 
                  backgroundColor: `${metric.color}15`,
                  border: `2px solid ${metric.color}30`
                }}
              >
                <metric.icon className="w-8 h-8" style={{ color: metric.color }} />
              </div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: metric.color }}
              >
                {metric.value}
              </div>
              <div className="text-sm text-[#4f6f64]">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="p-8 h-full bg-white border border-[#d8ccc4] rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                  style={{ 
                    backgroundColor: `${benefit.color}15`,
                    border: `2px solid ${benefit.color}30`
                  }}
                >
                  <benefit.icon className="w-8 h-8" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2a2420]">{benefit.title}</h3>
                <p className="text-[#4f6f64] leading-relaxed mb-6">{benefit.description}</p>
                
                {/* Estatística de destaque */}
                <div className="pt-4 border-t border-[#d8ccc4]">
                  <div 
                    className="text-3xl font-bold mb-1"
                    style={{ color: benefit.color }}
                  >
                    {benefit.stat}
                  </div>
                  <div className="text-sm text-[#4f6f64]">{benefit.statLabel}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Depoimentos */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#2a2420] mb-4">
              O que nossos clientes dizem
            </h3>
            <p className="text-xl text-[#4f6f64]">
              Histórias reais de transformação e crescimento
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.name} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </div>
        </div>

        {/* Badge de confiança */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center bg-gradient-to-r from-[#4f6f64]/10 to-[#3d574f]/10 rounded-3xl p-12 border border-[#4f6f64]/20"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4f6f64]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#4f6f64]" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#2a2420]">ISO 27001</div>
                <div className="text-sm text-[#4f6f64]">Certificado</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4f6f64]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#4f6f64]" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#2a2420]">LGPD</div>
                <div className="text-sm text-[#4f6f64]">100% Compliance</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4f6f64]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#4f6f64]" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-[#2a2420]">99.9%</div>
                <div className="text-sm text-[#4f6f64]">Uptime</div>
              </div>
            </div>
          </div>
          <p className="text-[#4f6f64] max-w-2xl mx-auto">
            Seus dados estão seguros conosco. Seguimos os mais altos padrões de segurança e privacidade da indústria.
          </p>
        </motion.div>

      </div>
    </section>
  )
}