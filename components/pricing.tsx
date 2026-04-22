"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Crown,
  Gift,
  HelpCircle,
  QrCode,
  Sparkles,
  Star,
  Tag,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useInteractionTracker } from "@/hooks/tracking"
import { useGetPlanos } from "@/service/Querys/Organizacao"

// ═════════════════════════════════════════════════════════════════
// Design tokens
// ═════════════════════════════════════════════════════════════════

/** Mono-terracota progression — aligned with DS warm palette */
const planMeta: Record<
  string,
  { color: string; icon: string; tagline: string; cta: string; popular?: boolean; badge?: string }
> = {
  gratuito: {
    color: "#4f6f64", // sage — "quiet starter"
    icon: "Gift",
    tagline: "Para começar sem custo",
    cta: "Começar grátis",
  },
  basico: {
    color: "#db6f57", // terracota base
    icon: "Zap",
    tagline: "Para quem está começando",
    cta: "Assinar Básico",
  },
  plus: {
    color: "#c55a42", // terracota-hover (middle accent)
    icon: "Sparkles",
    tagline: "Para escalar com IA",
    cta: "Assinar Plus",
    popular: true,
    badge: "Mais popular",
  },
  premium: {
    color: "#6d2a22", // deep rust (top of progression)
    icon: "Crown",
    tagline: "Máximo profissionalismo",
    cta: "Assinar Premium",
  },
}

const iconMap: Record<string, LucideIcon> = { Gift, Zap, Sparkles, Crown, Star }

/** Pix warm green — replaces previous cool emerald to respect DS warm palette */
const PIX_COLOR = "#5a8a6a"

const planFAQs = [
  {
    question: "Posso mudar de plano depois?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade a qualquer momento. As mudanças são aplicadas imediatamente.",
  },
  {
    question: "O que acontece após o período gratuito?",
    answer:
      "Após 14 dias, você escolhe se quer continuar. Não cobramos automaticamente — você decide.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim, sem multas ou taxas. Cancele a qualquer momento direto no sistema.",
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

// ═════════════════════════════════════════════════════════════════
// Helpers
// ═════════════════════════════════════════════════════════════════

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

// ═════════════════════════════════════════════════════════════════
// Sub-components
// ═════════════════════════════════════════════════════════════════

/** Editorial price display — R$ small, integer big serif (animated), decimals smaller, /mês subtle */
function PriceDisplay({
  value,
  color,
  size = "md",
}: {
  value: string
  color: string
  size?: "md" | "lg"
}) {
  const [intPart, decPart] = value.split(",")
  const intClass = size === "lg" ? "text-6xl" : "text-5xl"
  const decClass = size === "lg" ? "text-2xl" : "text-xl"

  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-sm text-[#5a4a42]/60 font-semibold self-start mt-1.5 font-sans">
        R$
      </span>
      <div className="relative inline-flex overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={intPart}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`inline-block font-serif font-bold leading-none tracking-tight tabular-nums ${intClass}`}
            style={{ color }}
          >
            {intPart}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={`font-serif font-bold tabular-nums ${decClass}`}
        style={{ color, opacity: 0.7 }}
      >
        ,{decPart}
      </span>
      <span className="text-xs text-[#5a4a42]/60 font-sans ml-1 mb-1.5 self-end">/mês</span>
    </div>
  )
}

/** Feature list item with core/extra hierarchy + subtle check tile */
function FeatureItem({
  feature,
  color,
  isCore,
}: {
  feature: { text: string; included: boolean }
  color: string
  isCore: boolean
}) {
  return (
    <li className="flex items-start gap-2.5">
      {feature.included ? (
        <span
          className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}18` }}
        >
          <Check className="w-2.5 h-2.5" style={{ color }} strokeWidth={3} />
        </span>
      ) : (
        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center bg-[#c8bfb8]/15">
          <X className="w-2.5 h-2.5 text-[#c8bfb8]" strokeWidth={2.5} />
        </span>
      )}
      <span
        className={`text-sm leading-snug ${
          feature.included
            ? isCore
              ? "text-[#2a2420] font-semibold"
              : "text-[#5a4a42]"
            : "text-[#c8bfb8] line-through"
        }`}
      >
        {feature.text}
      </span>
    </li>
  )
}

/** Popular badge — Star icon + gradient pill */
function PopularBadge({ color }: { color: string }) {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
      <span
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-bold text-white rounded-full uppercase tracking-[0.12em] shadow-lg"
        style={{ background: `linear-gradient(135deg, ${color}, #6d2a22)` }}
      >
        <Star className="w-2.5 h-2.5 fill-white" strokeWidth={0} />
        Mais popular
      </span>
    </div>
  )
}

/** CTA button — matches header "Comece grátis" premium style, optional shimmer */
function CtaButton({
  color,
  label,
  withShimmer = false,
}: {
  color: string
  label: string
  withShimmer?: boolean
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group relative w-full py-3 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-md hover:shadow-[0_0_25px_rgba(219,111,87,0.35)] transition-shadow duration-300 cursor-pointer"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
    >
      {withShimmer && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 5.6, ease: "easeOut" }}
          style={{ transform: "skewX(-20deg)" }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  )
}

// ═════════════════════════════════════════════════════════════════
// Free card
// ═════════════════════════════════════════════════════════════════

function FreeCard({ plan }: { plan: any }) {
  const { trackPlanClick } = useInteractionTracker()
  if (!plan) return null
  const Icon = iconMap[plan.icon] ?? Gift

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5ddd6] shadow-lg p-6 sm:p-8 flex flex-col h-full text-[#2a2420] relative hover:shadow-xl hover:border-[#d8ccc4] transition-all duration-300"
    >
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${plan.color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: plan.color }} strokeWidth={2} />
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a2420] leading-none">
            {plan.name}
          </h3>
        </div>
        <p className="text-sm text-[#5a7d71]">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-5">
        <p className="text-sm text-[#5a4a42]/60 mb-3">{plan.description}</p>
        <PriceDisplay value={plan.price.toFixed(2).replace(".", ",")} color={plan.color} />
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features?.map((f: any, i: number) => (
          <FeatureItem key={i} feature={f} color={plan.color} isCore={i < 3} />
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/cadastro?plano=${plan.id}&recorrencia=mensal`}
        onClick={() => trackPlanClick(plan.id, plan.name, "monthly")}
      >
        <CtaButton color={plan.color} label={plan.cta} />
      </Link>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Paid card (with gradient border for popular)
// ═════════════════════════════════════════════════════════════════

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
  const Icon = iconMap[plan.icon] ?? Sparkles

  const cardInner = (
    <div
      className={`bg-white ${
        plan.popular ? "rounded-[14px]" : "rounded-2xl border border-[#e5ddd6]"
      } p-6 sm:p-7 flex flex-col h-full relative`}
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${plan.color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: plan.color }} strokeWidth={2} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2a2420]">{plan.name}</h3>
        </div>
        <p className="text-sm text-[#5a7d71]">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-5">
        {hasPromo && (
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
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

        <PriceDisplay value={price.toFixed(2).replace(".", ",")} color={plan.color} />

        {isAnnual && plan.yearlyPrice > 0 && (
          <p className="text-xs text-[#5a4a42]/60 mt-2 flex flex-wrap items-center gap-x-1 gap-y-1">
            {hasAnnualPromo && (
              <span className="line-through text-[#5a4a42]/40">
                R$ {annualTotalOriginal.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span>
              R$ {annualTotalDisplay.toFixed(2).replace(".", ",")} cobrado anualmente
            </span>
            {!hasAnnualPromo && plan.yearlyDiscount > 0 && (
              <span
                className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
              >
                −{plan.yearlyDiscount.toFixed(0)}%
              </span>
            )}
            {hasAnnualPromo && promoAnnualSavings > 0 && (
              <span
                className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ backgroundColor: `${plan.color}20`, color: plan.color }}
              >
                −R$ {promoAnnualSavings.toFixed(0)}
              </span>
            )}
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-8 flex-1">
        {plan.features?.map((f: any, i: number) => (
          <FeatureItem key={i} feature={f} color={plan.color} isCore={i < 3} />
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/cadastro?plano=${plan.id}&recorrencia=${isAnnual ? "anual" : "mensal"}`}
        onClick={() => trackPlanClick(plan.id, plan.name, isAnnual ? "annual" : "monthly")}
      >
        <CtaButton color={plan.color} label={plan.cta} withShimmer={plan.popular} />
      </Link>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={`relative h-full ${plan.popular ? "lg:scale-[1.04] lg:z-20" : "z-10"}`}
    >
      {plan.popular && <PopularBadge color={plan.color} />}

      {plan.popular ? (
        <div
          className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-[#e88c76] via-[#c55a42] to-[#6d2a22] shadow-[0_20px_60px_-15px_rgba(139,61,53,0.35)] h-full"
        >
          {cardInner}
        </div>
      ) : (
        cardInner
      )}
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Enterprise banner — executive dark warm
// ═════════════════════════════════════════════════════════════════

function EnterpriseBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-4 rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center gap-4 justify-between overflow-hidden relative text-white"
      style={{ background: "linear-gradient(135deg, #2a2420 0%, #1a1510 100%)" }}
    >
      {/* Warm blob */}
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-[#4f6f64]/20 to-[#db6f57]/15 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl bg-gradient-to-tr from-[#db6f57]/10 to-transparent pointer-events-none" />

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-[#8aa69a]" strokeWidth={2} />
        </div>
        <div>
          <p className="font-serif text-base sm:text-lg font-bold leading-tight">
            Rede de salões ou barbearias?
          </p>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-0.5">
            Desconto especial para grupos com múltiplas unidades.
          </p>
        </div>
      </div>

      <Link href="/contato?origem=pricing-enterprise" className="relative z-10">
        <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#2a2420] text-sm font-semibold transition-all duration-300 whitespace-nowrap hover:scale-[1.03] hover:shadow-lg cursor-pointer">
          Falar com especialista
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </Link>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Pix banner — warm sage green
// ═════════════════════════════════════════════════════════════════

function PixBanner() {
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
          borderColor: `${PIX_COLOR}25`,
          boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${PIX_COLOR}15`, border: `1.5px solid ${PIX_COLOR}30` }}
          >
            <QrCode className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: PIX_COLOR }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#2a2420] mb-1">
              Pague com Pix e comece na hora
            </h4>
            <p className="text-sm text-[#5a4a42]/70 leading-relaxed">
              Pagamentos via Pix são confirmados instantaneamente — seu plano é ativado em
              segundos.
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
                style={{ backgroundColor: `${PIX_COLOR}18`, color: PIX_COLOR }}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.text}
              </span>
            ))}
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ backgroundColor: PIX_COLOR }}
        />
      </div>
    </motion.div>
  )
}

// ═════════════════════════════════════════════════════════════════
// FAQ accordion
// ═════════════════════════════════════════════════════════════════

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "#db6f5720",
        boxShadow: "0 1px 3px rgba(42, 36, 32, 0.06), 0 4px 16px rgba(42, 36, 32, 0.04)",
      }}
    >
      {planFAQs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={`${index > 0 ? "border-t border-[#db6f5712]" : ""} transition-colors duration-300`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#db6f5705] transition-colors cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-[#db6f57]/10">
                <HelpCircle className="w-3.5 h-3.5 text-[#db6f57]" strokeWidth={2.4} />
              </span>
              <h4 className="flex-1 text-sm font-semibold text-[#2a2420]">{faq.question}</h4>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 text-[#5a4a42]/50" strokeWidth={2.2} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-xs sm:text-sm text-[#5a4a42]/75 leading-relaxed px-5 pb-4 pl-[60px]">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Toggle — animated pill + savings badge
// ═════════════════════════════════════════════════════════════════

function BillingToggle({
  isAnnual,
  setIsAnnual,
}: {
  isAnnual: boolean
  setIsAnnual: (v: boolean) => void
}) {
  return (
    <div className="flex justify-end">
      <div className="relative">
        <div className="relative inline-flex bg-white rounded-full p-1 border border-[#e5ddd6] shadow-sm">
          {[
            { value: false, label: "Mensal" },
            { value: true, label: "Anual" },
          ].map((option) => {
            const isActive = isAnnual === option.value
            return (
              <button
                key={String(option.value)}
                onClick={() => setIsAnnual(option.value)}
                className="relative px-5 py-2 text-sm rounded-full cursor-pointer z-10 min-w-[80px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="pricingToggleIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#8b3d35] rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 font-semibold transition-colors duration-200 ${
                    isActive ? "text-white" : "text-[#5a4a42]/60 hover:text-[#2a2420]"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Savings badge — slides up from below the toggle */}
        <AnimatePresence>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, x: "-50%", y: 6 }}
              animate={{ opacity: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, x: "-50%", y: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-1/2 mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap pointer-events-none"
              style={{
                color: PIX_COLOR,
                backgroundColor: `${PIX_COLOR}10`,
                borderColor: `${PIX_COLOR}25`,
              }}
            >
              <Sparkles className="w-3 h-3" />
              Economize até 10%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════
// Main
// ═════════════════════════════════════════════════════════════════

export function Pricing() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isAnnual, setIsAnnual] = useState(false)

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
              <div className="flex flex-col lg:col-span-9 gap-4 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 h-full text-[#2a2420] border border-[#e5ddd6] hover:shadow-xl transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2a2420] leading-none">
                    Planos
                  </h3>
                  <BillingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch pt-2">
                  {paidPlans.map((plan) => (
                    <PaidCard key={plan.id} plan={plan} isAnnual={isAnnual} />
                  ))}
                </div>
              </div>
            </div>

            {/* Enterprise banner */}
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
            Perguntas frequentes
          </h3>
          <FaqAccordion />
        </motion.div>
      </div>
    </section>
  )
}
