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
  Users,
  ChevronRight,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useInteractionTracker } from "@/hooks/tracking"
import { useGetPlanos } from "@/service/Querys/Organizacao"
import Counter from "./Counter"
import GradientText from "./GradientText"
import { AnimatedPrice } from "./AnimatedPrice"

// Mapeamento de nomes de ícones
const iconMap: Record<string, any> = {
  Gift, Zap, Sparkles, Crown, Star, Rocket, Heart, Shield, Diamond, CreditCard,
}

// Metadados visuais por código de plano (a API não retorna cor/ícone)
const planMeta: Record<
  string,
  { color: string; icon: string; tagline: string; cta: string; popular?: boolean; badge?: string }
> = {
  gratuito: {
    color: "#5a7d71",
    icon: "Gift",
    tagline: "Para começar sem custo",
    cta: "Começar grátis",
  },
  basico: {
    color: "#db6f57",
    icon: "Zap",
    tagline: "Para quem está começando",
    cta: "Assinar Básico",
  },
  plus: {
    color: "#8b3d35",
    icon: "Sparkles",
    tagline: "Para escalar com IA",
    cta: "Assinar Plus",
    popular: true,
    badge: "Mais popular",
  },
  premium: {
    color: "#c19a4a",
    icon: "Crown",
    tagline: "Máximo profissionalismo",
    cta: "Assinar Premium",
  },
}

function isPromoVigente(ativa: boolean, preco: any, inicio: string | null, fim: string | null) {
  if (!ativa || preco == null || preco <= 0) return false
  const now = Date.now()
  if (inicio && now < new Date(inicio).getTime()) return false
  if (fim && now > new Date(fim).getTime()) return false
  return true
}

function transformPlan(p: any) {
  const meta =
    planMeta[p.codigo] ?? {
      color: "#8b3d35",
      icon: "Star",
      tagline: p.description ?? "",
      cta: "Assinar",
    }

  const priceAnnualMonthly = p.precoAnual && p.precoAnual > 0 ? p.precoAnual / 12 : 0

  return {
    id: p.codigo,
    rawId: p.id,
    name: p.name,
    description: p.description,
    tagline: p.description ?? meta.tagline ?? "",
    color: meta.color,
    icon: meta.icon,
    popular: meta.popular ?? false,
    cta: meta.cta,
    badge: meta.badge,
    tierOrder: p.tierOrder ?? 0,
    price: p.precoMensal ?? 0,
    priceAnnual: priceAnnualMonthly,
    yearlyPrice: p.precoAnual ?? 0,
    yearlyDiscount: p.descontoPercentualAnual ?? 0,
    promoMensalAtiva: isPromoVigente(
      !!p.promoMensalAtiva,
      p.promoMensalPreco,
      p.promoMensalInicio,
      p.promoMensalFim,
    ),
    promoMensalPreco: p.promoMensalPreco ?? null,
    promoMensalTexto: p.promoMensalTexto ?? null,
    promoMensalInicio: p.promoMensalInicio ?? null,
    promoMensalFim: p.promoMensalFim ?? null,
    promoAnualAtiva: isPromoVigente(
      !!p.promoAnualAtiva,
      p.promoAnualPreco,
      p.promoAnualInicio,
      p.promoAnualFim,
    ),
    promoAnualPreco: p.promoAnualPreco ?? null,
    promoAnualTexto: p.promoAnualTexto ?? null,
    promoAnualInicio: p.promoAnualInicio ?? null,
    promoAnualFim: p.promoAnualFim ?? null,
    features: (p.features ?? []).map((f: any) => ({
      text: f.label,
      included: !!f.enabled,
    })),
  }
}

const planFAQs = [
  {
    question: "Posso mudar de plano depois?",
    answer: "Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças são aplicadas imediatamente.",
  },
  {
    question: "O que acontece após o período gratuito?",
    answer: "Após 14 dias, você escolhe se quer continuar. Não cobramos automaticamente - você decide.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, sem multas ou taxas. Cancele a qualquer momento direto no sistema.",
  },
  {
    question: "Há taxa de configuração?",
    answer: "Não! Não cobramos taxa de setup, implementação ou treinamento. Está tudo incluído.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos Pix (com ativação instantânea), cartão de crédito e boleto bancário. Pagamentos via Pix são confirmados na hora.",
  },
]

// ─── FREE CARD ────────────────────────────────────────────────────────────────
function FreeCard({ plan }: { plan: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { trackPlanClick } = useInteractionTracker()

  // Guard AFTER todos os hooks (regra dos hooks do React)
  if (!plan) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col h-full text-[#2a2420] relative"
    >
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-3 justify-start mb-2">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)` }}
          >
            <Gift className="w-5 h-5" style={{ color: plan.color }} />
            
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#2a2420] mb-1">{plan.name}</h3>
        </div>
        <p className="text-sm text-[#5a7d71]">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-4">
        {/* <p className="text-xs uppercase tracking-widest font-semibold text-[#5a4a42]/50 mb-1">
          GRATUITO
        </p> */}
        <p className="text-sm text-[#5a4a42]/60 mb-3">{plan.description}</p>
        <div className="flex items-baseline gap-1">
          <AnimatedPrice value={plan.price.toFixed(2).replace(".", ",")} gradient className="text-4xl font-bold" />
          {/* <span className="text-4xl font-bold text-[#2a2420]">R$</span>1 */}
        </div>
        {/* <p className="text-xs text-[#5a4a42]/60 mt-1">Sem cartão de crédito</p> */}
      </div>

      {/* Divider */}
      {/* <div className="border-t border-[#d8ccc4] mb-6 mt-3" /> */}

      {/* Features */}
      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features?.map((f: any, i: number) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
            ) : (
              <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c8bfb8]" />
            )}
            <span className={`text-sm ${f.included ? "text-[#2a2420]" : "text-[#c8bfb8] line-through"}`}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href={`/cadastro?plano=${plan.id}&recorrencia=mensal`} onClick={() => trackPlanClick(plan.id, plan.name, "monthly")}>
        <button
          className="w-full py-3 text-white rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{ background: plan.color, borderColor: plan.color }}
        >
          {plan.cta}
        </button>
      </Link>
    </motion.div>
  )
}

// ─── PAID PLANS CARD (single card with 3 sub-plans) ──────────────────────────
// function PaidPlansCard({ plans, isAnnual, setIsAnnual }: { plans: any[]; isAnnual: boolean; setIsAnnual: (v: boolean) => void }) {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, amount: 0.1 })
//   const { trackPlanClick } = useInteractionTracker()
//   const [activePlan, setActivePlan] = useState<string | null>(null)

//   useEffect(() => {
//     if (plans.length > 0 && !activePlan) {
//       const popular = plans.find((p) => p.popular)
//       setActivePlan(popular?.id ?? plans[0]?.id)
//     }
//   }, [plans])

//   const selectedPlan = plans.find((p) => p.id === activePlan) ?? plans[0]

//   if (!plans.length || !selectedPlan) return null

//   const getDisplayPrice = (plan: any) => {
//     const hasMonthlyPromo = !isAnnual && plan.promoMensalAtiva && plan.promoMensalPreco > 0
//     if (hasMonthlyPromo) return plan.promoMensalPreco
//     return isAnnual ? plan.priceAnnual : plan.price
//   }

//   const getOriginalPrice = (plan: any) => {
//     if (isAnnual) return plan.price
//     if (!isAnnual && plan.promoMensalAtiva && plan.promoMensalPreco > 0) return plan.price
//     return null
//   }

//   const displayPrice = getDisplayPrice(selectedPlan)
//   const originalPrice = getOriginalPrice(selectedPlan)

//   const getIcon = (iconName: string, color: string) => {
//     const Icon = iconMap[iconName]
//     return Icon ? <Icon className="w-4 h-4" style={{ color }} /> : null
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.1 }}
//       transition={{ duration: 0.6, delay: 0.1 }}
//       className="bg-[#1e1a17] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col h-full text-white relative overflow-hidden"
//       style={{ borderColor: selectedPlan.color + "40" }}
//     >
//       {/* Subtle bg glow */}
//       <div
//         className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
//         style={{ background: `radial-gradient(circle, ${selectedPlan.color}, transparent)` }}
//       />

//       {/* Top row: description + toggle */}
//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10">
//         <div className="max-w-sm">
//           <p className="text-white/70 text-sm leading-relaxed">{selectedPlan.description}</p>
//         </div>

//         {/* Yearly/Monthly toggle */}
//         <div className="inline-flex items-center rounded-full p-1 bg-white/10 border border-white/10 self-start flex-shrink-0">
//           <button
//             onClick={() => setIsAnnual(true)}
//             className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
//             style={{
//               backgroundColor: isAnnual ? "white" : "transparent",
//               color: isAnnual ? "#2a2420" : "rgba(255,255,255,0.5)",
//             }}
//           >
//             Anual
//           </button>
//           <button
//             onClick={() => setIsAnnual(false)}
//             className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
//             style={{
//               backgroundColor: !isAnnual ? "white" : "transparent",
//               color: !isAnnual ? "#2a2420" : "rgba(255,255,255,0.5)",
//             }}
//           >
//             Mensal
//           </button>
//         </div>
//       </div>

//       {/* Plan selector tabs */}
//       <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
//         {plans.map((plan) => {
//           const isActive = activePlan === plan.id
//           const price = getDisplayPrice(plan)
//           return (
//             <button
//               key={plan.id}
//               onClick={() => setActivePlan(plan.id)}
//               className="relative rounded-xl sm:rounded-2xl p-3 sm:p-4 text-left transition-all duration-200 border"
//               style={{
//                 backgroundColor: isActive ? `${plan.color}18` : "rgba(255,255,255,0.04)",
//                 borderColor: isActive ? `${plan.color}60` : "rgba(255,255,255,0.08)",
//               }}
//             >
//               {plan.badge && isActive && (
//                 <span
//                   className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap"
//                   style={{ backgroundColor: plan.color }}
//                 >
//                   {plan.badge}
//                 </span>
//               )}
//               <div className="flex items-center gap-1.5 mb-1.5">
//                 {getIcon(plan.icon, isActive ? plan.color : "rgba(255,255,255,0.4)")}
//                 <span
//                   className="text-xs sm:text-sm font-bold"
//                   style={{ color: isActive ? plan.color : "rgba(255,255,255,0.5)" }}
//                 >
//                   {plan.name.toUpperCase()}
//                 </span>
//               </div>
//               <div className="flex items-baseline gap-0.5">
//                 {originalPrice && isActive && (
//                   <span className="text-[10px] text-white/30 line-through mr-0.5">
//                     R${plan.price.toFixed(0)}
//                   </span>
//                 )}
//                 <span className="text-base sm:text-xl font-bold text-white">
//                   R${price.toFixed(0)}
//                 </span>
//                 <span className="text-[10px] text-white/40">/mês</span>
//               </div>
//               <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 leading-tight hidden sm:block">
//                 {plan.tagline}
//               </p>
//             </button>
//           )
//         })}
//       </div>

//       {/* Selected plan detail */}
//       <div className="flex-1 relative z-10">
//         {/* Price big */}
//         <div className="mb-5">
//           <div className="flex items-baseline gap-2">
//             {originalPrice && (
//               <span className="text-lg text-white/30 line-through">
//                 R${originalPrice.toFixed(2).replace(".", ",")}
//               </span>
//             )}
//             <span className="text-4xl sm:text-5xl font-bold text-white">
//               R${displayPrice.toFixed(2).replace(".", ",")}
//             </span>
//             <span className="text-sm text-white/50">/mês</span>
//             {selectedPlan.promoMensalAtiva && !isAnnual && selectedPlan.promoMensalTexto && (
//               <span
//                 className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
//                 style={{ backgroundColor: selectedPlan.color }}
//               >
//                 {selectedPlan.promoMensalTexto}
//               </span>
//             )}
//           </div>
//           {isAnnual && selectedPlan.price > 0 && (
//             <p className="text-xs text-white/40 mt-1">
//               R${(selectedPlan.priceAnnual * 12).toFixed(2).replace(".", ",")} cobrado anualmente
//               <span
//                 className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold"
//                 style={{ backgroundColor: `${selectedPlan.color}30`, color: selectedPlan.color }}
//               >
//                 -{selectedPlan.yearlyDiscount.toFixed(0)}%
//               </span>
//             </p>
//           )}
//         </div>

//         {/* Features */}
//         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
//           {selectedPlan.features?.map((f: any, i: number) => (
//             <li key={i} className="flex items-start gap-2">
//               {f.included ? (
//                 <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: selectedPlan.color }} />
//               ) : (
//                 <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-white/20" />
//               )}
//               <span className={`text-xs sm:text-sm ${f.included ? "text-white/80" : "text-white/25 line-through"}`}>
//                 {f.text}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* CTA */}
//         <Link
//           href={`/cadastro?plano=${selectedPlan.id}&recorrencia=${isAnnual ? "anual" : "mensal"}`}
//           onClick={() => trackPlanClick(selectedPlan.id, selectedPlan.name, isAnnual ? "annual" : "monthly")}
//         >
//           <button
//             className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
//             style={{ background: `linear-gradient(135deg, ${selectedPlan.color}, ${selectedPlan.color}bb)` }}
//           >
//             {selectedPlan.cta}
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </Link>
//       </div>
//     </motion.div>
//   )
// }
function PaidCard({ plan, isAnnual }: { plan: any; isAnnual: boolean }) {
  const { trackPlanClick } = useInteractionTracker()

  if (!plan) return null

  const hasMonthlyPromo =
    !isAnnual && plan.promoMensalAtiva && plan.promoMensalPreco != null && plan.promoMensalPreco > 0
  const hasAnnualPromo =
    isAnnual && plan.promoAnualAtiva && plan.promoAnualPreco != null && plan.promoAnualPreco > 0
  const basePrice = isAnnual ? plan.priceAnnual : plan.price
  const price = hasMonthlyPromo
    ? plan.promoMensalPreco
    : hasAnnualPromo
      ? plan.promoAnualPreco / 12
      : basePrice
  const originalPrice = hasMonthlyPromo
    ? plan.price
    : hasAnnualPromo
      ? plan.priceAnnual
      : null
  const hasPromo = hasMonthlyPromo || hasAnnualPromo
  const promoTexto = hasMonthlyPromo ? plan.promoMensalTexto : plan.promoAnualTexto
  const annualTotalOriginal = plan.yearlyPrice ?? 0
  const annualTotalDisplay = hasAnnualPromo ? Number(plan.promoAnualPreco) : annualTotalOriginal
  const promoAnnualSavings = hasAnnualPromo ? annualTotalOriginal - annualTotalDisplay : 0
  const Icon = iconMap[plan.icon];


  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={`
        relative rounded-2xl min-w-xs p-6 sm:p-7 flex flex-col h-full
        border transition-all duration-300 z-[999]
        ${plan.popular 
          ? "bg-white shadow-lg scale-[1.04] z-20  border-[#e5ddd6] shadow-primary hover:scale-[1.05]" 
          : "bg-white border-[#e5ddd6] shadow-md hover:shadow-lg hover:scale-[1.01]"
        }
      `}
      style={{ zIndex: plan.popular ? 20 : 10, borderColor: plan.color + "80" }}
    >

      

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)` }}
          >
            {Icon && (
              <Icon className="w-5 h-5" style={{ color: plan.color }} />
            )}
          </div>

          <h3 className="text-2xl font-bold">{plan.name}</h3>
        </div>

        <p className="text-sm text-[#5a7d71]">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-4">
        {hasPromo && (
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow"
              style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` }}
            >
              <Tag className="w-3 h-3" />
              {promoTexto ?? "Promoção"}
            </span>
            {originalPrice != null && (
              <span className="text-sm text-[#5a4a42]/50 line-through">
                R$ {originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
        )}
        <div className="flex items-end gap-1">
          <div className="flex flex-col">
            <AnimatedPrice
              value={price.toFixed(2).replace(".", ",")}
              gradient
              className={`text-4xl font-bold ${plan.popular || hasPromo ? "scale-110" : ""}`}
            />
          </div>
          <span className="text-sm text-[#5a4a42]/60">/mês</span>
        </div>
        {isAnnual && plan.yearlyPrice > 0 && (
          <p className="text-xs text-[#5a4a42]/60 mt-1">
            {hasAnnualPromo && (
              <span className="line-through text-[#5a4a42]/40 mr-1">
                R$ {annualTotalOriginal.toFixed(2).replace(".", ",")}
              </span>
            )}
            R$ {annualTotalDisplay.toFixed(2).replace(".", ",")} cobrado anualmente
            {!hasAnnualPromo && plan.yearlyDiscount > 0 && (
              <span
                className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
              >
                -{plan.yearlyDiscount.toFixed(0)}%
              </span>
            )}
            {hasAnnualPromo && promoAnnualSavings > 0 && (
              <span
                className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
              >
                −R$ {promoAnnualSavings.toFixed(0)}
              </span>
            )}
          </p>
        )}
      </div>

      {/* Features SEMPRE VISÍVEIS */}
      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features?.map((f: any, i: number) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check className="w-4 h-4 mt-0.5" style={{ color: plan.color }} />
            ) : (
              <X className="w-4 h-4 mt-0.5 text-[#c8bfb8]" />
            )}

            <span
              className={`text-sm ${
                f.included
                  ? "text-[#2a2420]"
                  : "text-[#c8bfb8] line-through"
              }`}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md"
            style={{
              background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`
            }}
          >
            Mais popular
          </span>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/cadastro?plano=${plan.id}&recorrencia=${
          isAnnual ? "anual" : "mensal"
        }`}
        onClick={() =>
          trackPlanClick(plan.id, plan.name, isAnnual ? "annual" : "monthly")
        }
      >
        <button
          className={`w-full py-3 rounded-xl font-semibold text-sm text-white transition-all
            ${plan.popular 
              ? "shadow-xl scale-[1.03] hover:scale-[1.06]" 
              : "hover:scale-[1.02]"
            }
          `}
          style={{
            background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
          }}
        >
          {plan.cta}
        </button>
      </Link>
    </motion.div>
  )
}

// ─── ENTERPRISE BANNER ────────────────────────────────────────────────────────
function EnterpriseBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-4 bg-white rounded-2xl sm:rounded-3xl border border-[#d8ccc4] shadow-sm px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-[#4f6f64]" />
        </div>
        <div>
          <p className="font-bold text-[#2a2420] text-sm sm:text-base">Rede de salões ou barbearias?</p>
          <p className="text-xs sm:text-sm text-[#5a4a42]/60">
            Desconto especial para grupos com múltiplas unidades.
          </p>
        </div>
      </div>
      <Link href="/contato?origem=pricing-enterprise">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35] text-white text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-103 ease-in-out hover:from-[#c55a42] hover:to-[#8b3d35]">
          Falar com especialista
          <ChevronRight className="w-4 h-4" />
        </button>
      </Link>
    </motion.div>
  )
}

// ─── PIX BANNER ───────────────────────────────────────────────────────────────
function PixBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl border p-5 sm:p-7 group"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderColor: "#10b98120",
          boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#10b98112", border: "1.5px solid #10b98125" }}
          >
            <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#2a2420] mb-1">
              Pague com Pix e comece na hora
            </h4>
            <p className="text-sm text-[#5a4a42]/70 leading-relaxed">
              Pagamentos via Pix são confirmados instantaneamente — seu plano é ativado em segundos.
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            {[
              { icon: BadgeCheck, text: "Ativação imediata" },
              { icon: Clock, text: "Sem espera" },
            ].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: "#10b98115", color: "#10b981" }}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.text}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 bg-emerald-500" />
      </div>
    </motion.div>
  )
}

// ─── MAIN PRICING COMPONENT ───────────────────────────────────────────────────
export function Pricing() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(false)
  const { trackInteraction } = useInteractionTracker()

  const { data, isLoading, isSuccess } = useGetPlanos()
  const [planos, setPlanos] = useState<any[]>([])

  useEffect(() => {
    if (data && data.success && isSuccess) {
      const transformed = (data.dados ?? [])
        .filter((p: any) => p.active && p.codigo !== "IMPORTED_ASAAS")
        .map(transformPlan)
        .sort((a: any, b: any) => a.tierOrder - b.tierOrder)
      setPlanos(transformed)
    }
  }, [data, isSuccess])

  const freePlan = planos.find((p) => p.id === "gratuito")
  const paidPlans = planos.filter((p) => p.id !== "gratuito")

  // console.log("planos do sistema: ",freePlan, paidPlans, planos)

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-16"
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

          <p className="text-base sm:text-lg text-[#5a4a42]/70 leading-relaxed max-w-2xl mx-auto">
            Sem surpresas. Sem taxas escondidas.{" "}
            <span className="text-[#8b3d35] font-semibold">Cancele quando quiser</span>.
          </p>
        </motion.div>

        {/* ── Main layout: Free card + Paid card ── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#db6f57] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-8xl mx-auto">
              {/* Left: Free */}
              <div className="flex flex-col lg:col-span-3 gap-4">
                <FreeCard plan={freePlan} />
              </div>

              {/* Right: Paid plans */}
              <div className="flex flex-col lg:col-span-9 gap-4 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col h-full text-[#2a2420] border border-[#e5ddd6] hover:shadow-xl transition-all"> 
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#2a2420] mb-1">Planos</h3>
                  </div>
                  <div className="inline-flex bg-white rounded-full p-1 border border-[#e5ddd6] shadow">
                    <button
                      onClick={() => setIsAnnual(false)}
                      className={`px-4 py-2 text-sm rounded-full ${
                        !isAnnual ? "bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35] font-semibold text-white" : "text-gray-500"
                      }`}
                    >
                      Mensal
                    </button>

                    <button
                      onClick={() => setIsAnnual(true)}
                      className={`px-4 py-2 text-sm rounded-full ${
                        isAnnual ? "bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35] font-semibold text-white" : "text-gray-500"
                      }`}
                    >
                      Anual 
                      {/* <span className="text-xs font-normal"> 10% OFF</span> */}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                  {paidPlans.map((plan) => (
                    <PaidCard key={plan.id} plan={plan} isAnnual={isAnnual} />
                  ))}
                </div>
              </div>
            </div>

            {/* Enterprise banner — full width under both cards */}
            <div className="max-w-8xl mx-auto">
              <EnterpriseBanner />
            </div>
          </>
        )}

        {/* Pix Banner */}
        <div className="mt-14">
          <PixBanner />
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
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
                  <h4 className="text-sm font-semibold text-[#2a2420] mb-0.5">{faq.question}</h4>
                  <p className="text-xs text-[#5a4a42]/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}