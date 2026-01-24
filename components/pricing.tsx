"use client"

import { motion, useInView } from "framer-motion"
import { 
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  Gift,
  ArrowRight,
  HelpCircle,
  Calculator,
  TrendingUp
} from "lucide-react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useRef, useState } from "react"

// Planos
const plans = [
  {
    id: "gratuito",
    name: "Gratuito",
    tagline: "Experimente sem compromisso",
    price: 0,
    priceAnnual: 0,
    icon: Gift,
    color: "#4f6f64",
    gradient: "from-[#4f6f64] to-[#3d574f]",
    popular: false,
    features: [
      { text: "Até 50 agendamentos/mês", included: true },
      { text: "1 usuário", included: true },
      { text: "Cadastro de clientes", included: true },
      { text: "Agendamento manual", included: true },
      { text: "Dashboard básico", included: true },
      { text: "Agendamento online 24/7", included: false },
      { text: "Agente virtual no WhatsApp", included: false },
      { text: "Site personalizado", included: false },
      { text: "E-commerce", included: false },
      { text: "Relatórios avançados", included: false },
    ],
    cta: "Começar grátis",
    badge: null
  },
  {
    id: "basico",
    name: "Básico",
    tagline: "Para começar a crescer",
    price: 79.90,
    priceAnnual: 64.90,
    icon: Zap,
    color: "#db6f57",
    gradient: "from-[#db6f57] to-[#c55a42]",
    popular: false,
    features: [
      { text: "Agendamentos ilimitados", included: true },
      { text: "Até 3 usuários", included: true },
      { text: "Gestão completa de clientes", included: true },
      { text: "Agendamento online 24/7", included: true },
      { text: "Lembretes automáticos", included: true },
      { text: "Dashboard inteligente", included: true },
      { text: "Controle financeiro", included: true },
      { text: "Agente virtual no WhatsApp", included: false },
      { text: "Site personalizado", included: false },
      { text: "E-commerce", included: false },
    ],
    cta: "Experimentar 14 dias grátis",
    badge: null
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "Tudo que você precisa",
    price: 129.90,
    priceAnnual: 99.90,
    icon: Sparkles,
    color: "#8b3d35",
    gradient: "from-[#8b3d35] to-[#a8524a]",
    popular: true,
    features: [
      { text: "Tudo do Básico +", included: true },
      { text: "Usuários ilimitados", included: true },
      { text: "Agente virtual no WhatsApp", included: true },
      { text: "Site personalizado completo", included: true },
      { text: "Mini e-commerce integrado", included: true },
      { text: "Relatórios avançados", included: true },
      { text: "Programa de fidelidade", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Treinamento da equipe", included: true },
      { text: "Domínio personalizado", included: true },
    ],
    cta: "Experimentar 14 dias grátis",
    badge: "🔥 Mais popular"
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Para quem quer o máximo",
    price: 199.90,
    priceAnnual: 159.90,
    icon: Crown,
    color: "#db6f57",
    gradient: "from-[#db6f57] to-[#e88c76]",
    popular: false,
    features: [
      { text: "Tudo do Plus +", included: true },
      { text: "Múltiplas unidades", included: true },
      { text: "API completa", included: true },
      { text: "Integrações personalizadas", included: true },
      { text: "Gerente de conta dedicado", included: true },
      { text: "Suporte 24/7", included: true },
      { text: "Onboarding personalizado", included: true },
      { text: "Customizações sob demanda", included: true },
      { text: "Relatórios personalizados", included: true },
      { text: "SLA garantido", included: true },
    ],
    cta: "Falar com especialista",
    badge: "👑 Premium"
  }
]

// FAQ por plano
const planFAQs = [
  {
    question: "Posso mudar de plano depois?",
    answer: "Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças são aplicadas imediatamente."
  },
  {
    question: "O que acontece após o período gratuito?",
    answer: "Após 14 dias, você escolhe se quer continuar. Não cobramos automaticamente - você decide."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, sem multas ou taxas. Cancele a qualquer momento direto no sistema."
  },
  {
    question: "Há taxa de configuração?",
    answer: "Não! Não cobramos taxa de setup, implementação ou treinamento. Está tudo incluído."
  }
]

// Card de plano
export const PlanCard = ({ plan, isAnnual, index, isCadastro }: any) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  const displayPrice = isAnnual ? plan.priceAnnual : plan.price
  const savings = plan.price > 0 ? ((plan.price - plan.priceAnnual) * 12).toFixed(0) : 0
  const discountPercent = plan.price > 0 ? Math.round(((plan.price - plan.priceAnnual) / plan.price) * 100) : 0
  const totalAnnual = plan.priceAnnual * 12

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${!isCadastro && plan.popular ? 'lg:-mt-6' : ''}`}
    >
      {/* Badge popular */}
      {plan.badge && (
        <div 
          className={`absolute ${!isCadastro && plan.popular? 'group-hover:-top-9':'group-hover:-top-6'}  -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold text-sm text-white shadow-xl z-10 transition-all duration-300`}
          style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)` }}
        >
          {plan.badge}
        </div>
      )}

      <Card 
        className={`h-full p-8 rounded-3xl transition-all duration-300 ${
          plan.popular 
            ? 'bg-white border-2 shadow-2xl scale-100 hover:scale-105' 
            : 'bg-white border border-[#d8ccc4] shadow-lg hover:shadow-2xl hover:-translate-y-2'
        }`}
        style={plan.popular ? { borderColor: plan.color } : {}}
      >
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)`
          }}
        >
          <plan.icon className="w-8 h-8" style={{ color: plan.color }} />
        </div>

        {/* Nome e tagline */}
        <h3 className="text-3xl font-bold text-[#2a2420] mb-2">{plan.name}</h3>
        <p className="text-[#4f6f64] mb-6">{plan.tagline}</p>

        {/* Preço */}
        <div className="mb-8">
          {/* Preço mensal em destaque */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[#2a2420]">
              R$ {displayPrice.toFixed(2).replace('.', ',')}
            </span>
            {plan.price > 0 && (
              <span className="text-[#4f6f64]">/mês</span>
            )}
          </div>

          {/* Informações do plano anual */}
          {isAnnual && plan.price > 0 && (
            <div className="mt-3 space-y-2">
              {/* Preço original riscado e desconto */}
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-400 line-through">
                  R$ {plan.price.toFixed(2).replace('.', ',')}/mês
                </span>
                <span
                  className="px-2 py-0.5 text-xs font-bold rounded-full text-white"
                  style={{ backgroundColor: plan.color }}
                >
                  -{discountPercent}%
                </span>
              </div>

              {/* Preço total anual */}
              <div className="text-sm text-[#4f6f64]">
                <span className="font-semibold text-[#2a2420]">
                  R$ {totalAnnual.toFixed(2).replace('.', ',')}
                </span>
                {' '}cobrado anualmente
              </div>

              {/* Economia total */}
              {Number(savings) > 0 && (
                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                >
                  💰 Economize R$ {savings}/ano
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        {!isCadastro && ( 
          <Button
            label={plan.cta}
            icon={<ArrowRight className="mx-2" size={16} />}
            iconPos="right"
            className={`w-full mb-8 py-3 px-3 rounded-xl font-medium text-base transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-r text-white border-0 hover:scale-105 shadow-lg'
                : 'bg-white border-2 hover:scale-105'
            }`}
            style={plan.popular ? { 
              background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)` 
            } : {
              color: plan.color,
              borderColor: plan.color
            }}
          />
        )}
        

        {/* Features */}
        {!isCadastro && (

          <ul className="space-y-3">
            {plan.features.map((feature: any, i: number) => (
              <li 
                key={i}
                className="flex items-start gap-3"
              >
                {feature.included ? (
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                ) : (
                  <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-300" />
                )}
                <span className={feature.included ? "text-[#2a2420]" : "text-gray-400 line-through"}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        )}
        
      </Card>
    </motion.div>
  )
}

export function Pricing() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(false)
  const [showROI, setShowROI] = useState(false)
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000)

  // Cálculo simplificado de ROI
  const calculateROI = () => {
    const timeSaved = 40 // horas por mês
    const hourlyValue = 50 // valor hora médio
    const noShowReduction = monthlyRevenue * 0.35 // 35% de redução em faltas
    const newCustomers = monthlyRevenue * 0.25 // 25% mais clientes
    
    const totalGain = (timeSaved * hourlyValue) + noShowReduction + newCustomers
    const systemCost = 129.90 // plano Plus
    const roi = ((totalGain - systemCost) / systemCost * 100).toFixed(0)
    
    return {
      timeSaved: (timeSaved * hourlyValue).toFixed(0),
      noShowReduction: noShowReduction.toFixed(0),
      newCustomers: newCustomers.toFixed(0),
      totalGain: totalGain.toFixed(0),
      roi
    }
  }

  const roiData = calculateROI()

  return (
    <section 
      ref={sectionRef}
      id="planos" 
      className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#faf8f6] to-white"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#db6f57]/10 to-[#8b3d35]/10 border border-[#db6f57]/20 mb-8">
            <Crown className="w-5 h-5 text-[#db6f57]" />
            <span className="font-bold text-[#8b3d35] uppercase tracking-wide text-sm">
              Planos e Preços
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#2a2420] leading-[1.1]">
            Escolha o plano{" "}
            <span className="bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent">
              perfeito para você
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#4f6f64] leading-relaxed mb-8">
            Sem surpresas. Sem taxas escondidas.{" "}
            <span className="text-[#8b3d35] font-semibold">
              Cancele quando quiser
            </span>.
          </p>

          {/* Toggle anual/mensal */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-[130px]"></div>
            <span className={`font-semibold ${!isAnnual ? 'text-[#2a2420]' : 'text-[#4f6f64]'}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full transition-colors duration-300"
              style={{ backgroundColor: isAnnual ? '#db6f57' : '#d8ccc4' }}
            >
              <div 
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300"
                style={{ transform: isAnnual ? 'translateX(32px)' : 'translateX(0)' }}
              />
            </button>
            <span className={`font-semibold ${isAnnual ? 'text-[#2a2420]' : 'text-[#4f6f64]'}`}>
              Anual
            </span>
            <div className="w-[130px]">
              {isAnnual && (
                <span className="px-3 py-1 bg-[#5a7a6e] text-white text-sm font-bold rounded-full">
                  Economize 20%
                </span>
              )}
            </div>
            
          </div>
        </motion.div>

        {/* Grid de planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-8xl mx-auto ">
          {plans.map((plan, index) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>

        {/* Calculadora de ROI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <button
            onClick={() => setShowROI(!showROI)}
            className="w-full bg-gradient-to-r from-[#4f6f64] to-[#3d574f] text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calculator className="w-12 h-12" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-1">Calcule seu retorno sobre investimento</h3>
                  <p className="text-white/80">Veja quanto você pode economizar e ganhar com o Bellory</p>
                </div>
              </div>
              <ArrowRight 
                className={`w-6 h-6 transition-transform duration-300 ${showROI ? 'rotate-90' : ''}`} 
              />
            </div>
          </button>

          {showROI && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-3xl p-8 mt-4 shadow-xl border border-[#d8ccc4]"
            >
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                  Qual seu faturamento mensal médio?
                </label>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-3xl font-bold text-[#db6f57] mt-2">
                  R$ {monthlyRevenue.toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#faf8f6] rounded-2xl p-6">
                  <h4 className="font-bold text-[#2a2420] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#5a7a6e]" />
                    Ganhos Mensais
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-[#4f6f64]">Tempo economizado:</span>
                      <span className="font-bold text-[#2a2420]">R$ {roiData.timeSaved}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#4f6f64]">Redução de faltas:</span>
                      <span className="font-bold text-[#2a2420]">R$ {roiData.noShowReduction}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#4f6f64]">Novos clientes:</span>
                      <span className="font-bold text-[#2a2420]">R$ {roiData.newCustomers}</span>
                    </li>
                    <li className="flex justify-between pt-3 border-t border-[#d8ccc4]">
                      <span className="font-bold text-[#2a2420]">Total:</span>
                      <span className="font-bold text-[#5a7a6e]">R$ {roiData.totalGain}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#5a7a6e] to-[#4f6f64] rounded-2xl p-6 text-white">
                  <h4 className="font-bold mb-4">Seu ROI</h4>
                  <div className="text-6xl font-bold mb-2">{roiData.roi}%</div>
                  <p className="text-white/80 mb-4">de retorno sobre investimento</p>
                  <div className="bg-white/20 rounded-xl p-4">
                    <p className="text-sm">
                      Com o plano Plus (R$ 129,90/mês), você pode ganhar até{' '}
                      <span className="font-bold">R$ {(Number(roiData.totalGain) - 129.90).toFixed(0)}/mês</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-[#4f6f64]">
                *Cálculo baseado em médias de clientes reais. Resultados podem variar.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-center text-3xl font-bold text-[#2a2420] mb-8">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            {planFAQs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#d8ccc4]"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-[#db6f57] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg text-[#2a2420] mb-2">{faq.question}</h4>
                    <p className="text-[#4f6f64] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}