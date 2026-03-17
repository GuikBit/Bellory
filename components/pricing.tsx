"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
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
  TrendingUp,
  QrCode,
  BadgeCheck,
  Shield,
  Clock,
  Star,
  Rocket,
  Heart,
  Diamond,
  CreditCard,
  Tag,
} from "lucide-react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useInteractionTracker, useConversionTracker } from "@/hooks/tracking"
import { useGetPlanos } from "@/service/Querys/Organizacao"

// Mapeamento de nomes de ícones (string da API) para componentes Lucide
const iconMap: Record<string, any> = {
  Gift,
  Zap,
  Sparkles,
  Crown,
  Star,
  Rocket,
  Heart,
  Shield,
  Diamond,
  CreditCard,
}

// FAQ
const planFAQs = [
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças são aplicadas imediatamente.",
  },
  {
    question: "O que acontece após o período gratuito?",
    answer:
      "Após 14 dias, você escolhe se quer continuar. Não cobramos automaticamente - você decide.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim, sem multas ou taxas. Cancele a qualquer momento direto no sistema.",
  },
  {
    question: "Há taxa de configuração?",
    answer:
      "Não! Não cobramos taxa de setup, implementação ou treinamento. Está tudo incluído.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos Pix (com ativação instantânea), cartão de crédito e boleto bancário. Pagamentos via Pix são confirmados na hora.",
  },
]

// Card de plano
export const PlanCard = ({ plan, isAnnual, index, isCadastro }: any) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const { trackPlanClick } = useInteractionTracker()

  const hasMonthlyPromo = !isAnnual && plan.promoMensalAtiva && plan.promoMensalPreco > 0
  const displayPrice = hasMonthlyPromo
    ? plan.promoMensalPreco
    : isAnnual
      ? plan.priceAnnual
      : plan.price
  const savings =
    plan.price > 0
      ? ((plan.price - plan.priceAnnual) * 12).toFixed(0)
      : 0
  const discountPercent =
    plan.price > 0
      ? Math.round(((plan.price - plan.priceAnnual) / plan.price) * 100)
      : 0
  const promoDiscountPercent =
    hasMonthlyPromo && plan.price > 0
      ? Math.round(((plan.price - plan.promoMensalPreco) / plan.price) * 100)
      : 0
  const totalAnnual = plan.priceAnnual * 12

  const getIcone = (iconName: string, color: string) => {
    const IconComponent = iconMap[iconName]
    if (!IconComponent) return null
    return <IconComponent className="w-8 h-8" style={{ color }} />
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group ${
        !isCadastro && plan.popular ? "" : ""
      }`}
    >
      {/* Badge popular */}
      {plan.badge && (
        <div
          className={`absolute ${
            !isCadastro && plan.popular
              ? "group-hover:-top-14 -top-9"
              : "group-hover:-top-6 -top-4"
          }  left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold text-sm text-white shadow-xl z-10 transition-all duration-300`}
          style={{
            background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
          }}
        >
          {plan.badge}
        </div>
      )}

      <Card
        className={`h-full p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          plan.popular
            ? `bg-white border-2 hover:shadow-xl lg:scale-105 lg:hover:scale-110`
            : `bg-white border border-[#d8ccc4] shadow-lg shadow-[#2a2420]/5 hover:shadow-xl hover:-translate-y-2`
        }`}
        style={plan.popular ? { borderColor: plan.color } : {}}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)`,
          }}
        >
          {getIcone(plan.icon, plan.color)}
        </div>

        {/* Nome e tagline */}
        <h3 className="text-2xl sm:text-3xl font-bold text-[#2a2420] mb-1 sm:mb-2">
          {plan.name}
        </h3>
        <p className="text-sm sm:text-base text-[#5a7d71] mb-4 sm:mb-6">{plan.tagline}</p>

        {/* Preço */}
        <div className="mb-6 sm:mb-8">
          {/* Badge de promoção mensal */}
          {hasMonthlyPromo && plan.promoMensalTexto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              className="mb-3"
            >
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg animate-pulse"
                style={{
                  background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                }}
              >
                <Tag className="w-3.5 h-3.5" />
                {plan.promoMensalTexto}
              </span>
            </motion.div>
          )}

          {/* Preço original riscado (promo mensal) */}
          {hasMonthlyPromo && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base sm:text-lg text-gray-400 line-through">
                R$ {plan.price.toFixed(2).replace(".", ",")}
              </span>
              <span
                className="px-2 py-0.5 text-xs font-bold rounded-full text-white"
                style={{ backgroundColor: plan.color }}
              >
                -{promoDiscountPercent}%
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-1 sm:gap-2">
            <span
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
                hasMonthlyPromo ? "text-[#db6f57]" : "text-[#2a2420]"
              }`}
            >
              R$ {displayPrice.toFixed(2).replace(".", ",")}
            </span>
            {plan.price > 0 && (
              <span className="text-sm sm:text-base text-[#5a7d71]">/mês</span>
            )}
          </div>

          {/* Info anual */}
          {isAnnual && plan.price > 0 && (
            <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg text-gray-400 line-through">
                  R$ {plan.price.toFixed(2).replace(".", ",")}/mês
                </span>
                <span
                  className="px-2 py-0.5 text-xs font-bold rounded-full text-white"
                  style={{ backgroundColor: plan.color }}
                >
                  -{discountPercent}%
                </span>
              </div>
              <div className="text-sm text-[#5a7d71]">
                <span className="font-semibold text-[#2a2420]">
                  R$ {totalAnnual.toFixed(2).replace(".", ",")}
                </span>{" "}
                cobrado anualmente
              </div>
              {Number(savings) > 0 && (
                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${plan.color}15`,
                    color: plan.color,
                  }}
                >
                  💰 Economize R$ {savings}/ano
                </div>
              )}
            </div>
          )}

          {/* Mensal — info de flexibilidade (sutil) */}
          {!isAnnual && plan.price > 0 && !hasMonthlyPromo && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#5a7a6e] font-medium">
                <Shield className="w-4 h-4" />
                Sem compromisso — cancele quando quiser
              </span>
            </div>
          )}

          {/* Mensal com promo — info de economia */}
          {hasMonthlyPromo && plan.price > 0 && (
            <div className="mt-3">
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: plan.color }}
              >
                💰 Economize R${" "}
                {(plan.price - plan.promoMensalPreco)
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                por mês
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        {!isCadastro && (
          <Link
            href={`/cadastro?plano=${plan.id}&recorrencia=${
              isAnnual ? "anual" : "mensal"
            }`}
            onClick={() =>
              trackPlanClick(
                plan.id,
                plan.name,
                isAnnual ? "annual" : "monthly"
              )
            }
          >
            <Button
              label={plan.cta}
              icon={<ArrowRight className="mx-1 sm:mx-2" size={14} />}
              iconPos="right"
              className={`w-full mb-6 sm:mb-8 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-r text-white border-0 hover:scale-105 shadow-lg"
                  : " border-2 hover:scale-105"
              }`}
              style={
                plan.popular
                  ? {
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                    }
                  : {
                      color: plan.color,
                      borderColor: plan.color,
                      background: "white",
                    }
              }
            />
          </Link>
        )}

        {/* Features */}
        {!isCadastro && (
          <ul className="space-y-2.5 sm:space-y-3">
            {plan.features.map((feature: any, i: number) => (
              <li key={i} className="flex items-start gap-2 sm:gap-3">
                {feature.included ? (
                  <Check
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0"
                    style={{ color: plan.color }}
                  />
                ) : (
                  <X className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-[#99A1AF]" />
                )}
                <span
                  className={`text-sm sm:text-base ${
                    feature.included
                      ? "text-[#2a2420]"
                      : "text-[#99A1AF] line-through"
                  }`}
                >
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
  const prefersReduced = useReducedMotion()
  const [isAnnual, setIsAnnual] = useState(false)
  const [showROI, setShowROI] = useState(false)
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000)
  const { trackInteraction } = useInteractionTracker()

  const { data, isLoading, isError, isSuccess } = useGetPlanos();

  const [planos, setPlanos] = useState<any>([]);

  useEffect(()=> {
    if (data && data.success && isSuccess) {
      const transformed = data.dados.map((plan: any) => ({
        ...plan,
        priceAnnual: plan.yearlyPrice > 0 ? plan.yearlyPrice / 12 : 0,
      }))
      setPlanos(transformed);
    }
  },[data, isSuccess])

  const calculateROI = () => {
    const timeSaved = 40
    const hourlyValue = 50
    const noShowReduction = monthlyRevenue * 0.35
    const newCustomers = monthlyRevenue * 0.25

    const totalGain = timeSaved * hourlyValue + noShowReduction + newCustomers
    const systemCost = 139.9
    const roi = ((totalGain - systemCost) / systemCost * 100).toFixed(0)

    return {
      timeSaved: (timeSaved * hourlyValue).toFixed(0),
      noShowReduction: noShowReduction.toFixed(0),
      newCustomers: newCustomers.toFixed(0),
      totalGain: totalGain.toFixed(0),
      roi,
    }
  }

  const roiData = calculateROI()

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="py-24 md:py-32 relative overflow-hidden bg-[#f3eeea]"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#db6f57]/[0.06] to-[#8b3d35]/[0.04] rounded-full blur-3xl"
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-[#4f6f64]/[0.06] to-[#db6f57]/[0.04] rounded-full blur-3xl"
        animate={
          prefersReduced
            ? {}
            : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b3d35]/[0.08] border border-[#8b3d35]/20 mb-6">
            <Crown className="w-4 h-4 text-[#db6f57]" />
            <span className="text-xs font-bold text-[#8b3d35] uppercase tracking-wider">
              Planos e Preços
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2a2420] mb-4 leading-[1.1]">
            Escolha o plano{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent">
              perfeito para você
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#5a4a42]/70 leading-relaxed max-w-2xl mx-auto mb-8">
            Sem surpresas. Sem taxas escondidas.{" "}
            <span className="text-[#8b3d35] font-semibold">
              Cancele quando quiser
            </span>
            .
          </p>

          {/* Toggle mensal/anual */}
          <div className="inline-flex items-center rounded-full p-1 border"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "#2a242015",
              boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
            }}
          >
            <button
              onClick={() => {
                if (isAnnual) {
                  setIsAnnual(false)
                  trackInteraction("plan_toggle_monthly", "pricing-billing-toggle", { section: "pricing" })
                }
              }}
              className="relative px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: !isAnnual ? "#4f6f64" : "transparent",
                color: !isAnnual ? "#ffffff" : "#5a4a42aa",
              }}
            >
              Mensal
            </button>
            <button
              onClick={() => {
                if (!isAnnual) {
                  setIsAnnual(true)
                  trackInteraction("plan_toggle_annual", "pricing-billing-toggle", { section: "pricing" })
                }
              }}
              className="relative flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: isAnnual ? "#db6f57" : "transparent",
                color: isAnnual ? "#ffffff" : "#5a4a42aa",
              }}
            >
              Anual
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isAnnual ? "rgba(255,255,255,0.25)" : "#db6f5715",
                  color: isAnnual ? "#ffffff" : "#db6f57",
                }}
              >
                Até -10%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Grid de planos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-14 max-w-8xl mx-auto">
          {planos && planos.map((plan: any, index: number) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>

        {/* ===== BANNER PIX ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div
            className="relative overflow-hidden rounded-3xl border p-5 sm:p-7"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "#10b98120",
              boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, #10b98106 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#10b98112",
                  border: "1.5px solid #10b98125",
                }}
              >
                <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-bold text-[#2a2420] mb-1">
                  Pague com Pix e comece na hora
                </h4>
                <p className="text-sm text-[#5a4a42]/70 leading-relaxed">
                  Pagamentos via Pix são confirmados instantaneamente — seu
                  plano é ativado em segundos.
                </p>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                {[
                  { icon: Zap, text: "Ativação imediata" },
                  { icon: BadgeCheck, text: "Confirmação garantida" },
                  { icon: Clock, text: "Sem espera" },
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: "#10b98115",
                      color: "#10b981",
                    }}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 bg-emerald-500"
            />
          </div>
        </motion.div>

        {/* Calculadora de ROI */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <button
            onClick={() => {
              const next = !showROI
              setShowROI(next)
              if (next)
                trackInteraction(
                  "roi_calculator_open",
                  "roi-calculator",
                  { section: "pricing" }
                )
            }}
            className="w-full bg-gradient-to-r from-[#4f6f64] to-[#3d574f] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <Calculator className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1">
                    Calcule seu retorno sobre investimento
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm lg:text-base">
                    Veja quanto você pode economizar e ganhar com o Bellory
                  </p>
                </div>
              </div>
              <ArrowRight
                className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 ${
                  showROI ? "rotate-90" : ""
                }`}
              />
            </div>
          </button>

          {showROI && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mt-4 border"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                borderColor: "#4f6f6420",
                boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
              }}
            >
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-[#2a2420]">
                  Qual seu faturamento mensal médio?
                </label>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={monthlyRevenue}
                  onChange={(e) =>
                    setMonthlyRevenue(Number(e.target.value))
                  }
                  className="w-full"
                />
                <div className="text-center text-2xl sm:text-3xl font-bold text-[#db6f57] mt-2">
                  R$ {monthlyRevenue.toLocaleString("pt-BR")}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div
                  className="rounded-2xl border p-4 sm:p-6"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    borderColor: "#4f6f6420",
                  }}
                >
                  <h4 className="font-bold text-[#2a2420] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#4f6f64]" />
                    Ganhos Mensais
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-[#5a4a42]/70">Tempo economizado:</span>
                      <span className="font-bold text-[#2a2420]">R$ {roiData.timeSaved}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#5a4a42]/70">Redução de faltas:</span>
                      <span className="font-bold text-[#2a2420]">R$ {roiData.noShowReduction}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-[#5a4a42]/70">Novos clientes:</span>
                      <span className="font-bold text-[#2a2420]">R$ {roiData.newCustomers}</span>
                    </li>
                    <li className="flex justify-between pt-3" style={{ borderTop: "1px solid #4f6f6420" }}>
                      <span className="font-bold text-[#2a2420]">Total:</span>
                      <span className="font-bold text-[#4f6f64]">R$ {roiData.totalGain}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#4f6f64] to-[#3d574f] rounded-2xl p-4 sm:p-6 text-white">
                  <h4 className="font-bold mb-3 sm:mb-4">Seu ROI</h4>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                    {roiData.roi}%
                  </div>
                  <p className="text-white/80 mb-3 sm:mb-4 text-sm sm:text-base">
                    de retorno sobre investimento
                  </p>
                  <div className="bg-white/15 rounded-xl p-3 sm:p-4">
                    <p className="text-sm">
                      Com o plano Plus (R$ 139,90/mês), você pode ganhar até{" "}
                      <span className="font-bold">
                        R$ {(Number(roiData.totalGain) - 139.9).toFixed(0)}/mês
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-[#5a4a42]/50">
                *Cálculo baseado em médias de clientes reais. Resultados podem variar.
              </p>
            </motion.div>
          )}
        </motion.div> */}

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-serif text-center text-2xl sm:text-3xl font-bold text-[#2a2420] mb-6">
            Perguntas Frequentes
          </h3>
          <div
            className="rounded-2xl border divide-y overflow-hidden"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "#db6f5720",
              boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
            }}
          >
            {planFAQs.map((faq, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-5 py-4 transition-colors duration-300 hover:bg-[#db6f5704]"
                style={{ borderColor: "#db6f5712" }}
              >
                <HelpCircle className="w-4 h-4 text-[#db6f57] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#2a2420] mb-0.5">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-[#5a4a42]/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}