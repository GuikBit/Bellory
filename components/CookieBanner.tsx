"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, Cookie, Check, Shield, BarChart3, Target } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const STORAGE_KEY = "bellory-cookie-consent-v1"
const EASE_OUT = [0.22, 1, 0.36, 1] as const

export interface CookieConsent {
  essential: true
  analytics: boolean
  marketing: boolean
  timestamp: string
}

type ViewMode = "hidden" | "banner" | "preferences"

export function CookieBanner() {
  const prefersReduced = useReducedMotion()
  const [view, setView] = useState<ViewMode>("hidden")
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        const t = setTimeout(() => setView("banner"), 900)
        return () => clearTimeout(t)
      }
    } catch {
      /* storage indisponível — não bloqueia o usuário */
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const handler = () => setView("preferences")
    window.addEventListener("bellory:open-cookie-preferences", handler)
    return () =>
      window.removeEventListener("bellory:open-cookie-preferences", handler)
  }, [])

  const save = (choice: { analytics: boolean; marketing: boolean }) => {
    const consent: CookieConsent = {
      essential: true,
      analytics: choice.analytics,
      marketing: choice.marketing,
      timestamp: new Date().toISOString(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch {
      /* segue sem storage */
    }
    setView("hidden")
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bellory:consent-updated", { detail: consent })
      )
    }
  }

  const acceptAll = () => save({ analytics: true, marketing: true })
  const onlyEssential = () => save({ analytics: false, marketing: false })
  const saveCustom = () => save({ analytics, marketing })

  return (
    <AnimatePresence>
      {view === "banner" && (
        <motion.div
          key="banner"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[60]"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
        >
          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{
              background:
                "linear-gradient(135deg, #2a2420 0%, #1f1a16 60%, #1a1510 100%)",
              borderColor: "#3d2e28",
              boxShadow:
                "0 30px 60px -20px rgba(42,36,32,0.55), 0 12px 24px -12px rgba(42,36,32,0.3)",
            }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute -top-16 -right-16 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(219,111,87,0.22), transparent 70%)",
              }}
            />

            <div className="relative p-5 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(219,111,87,0.18)",
                    border: "1.5px solid rgba(219,111,87,0.35)",
                  }}
                >
                  <Cookie className="w-5 h-5 text-[#db6f57]" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#db6f57]">
                      Cookies
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white leading-tight">
                    A gente usa cookies.
                  </h3>
                </div>
              </div>

              <p className="text-[13px] text-[#e6d9d4]/75 leading-relaxed mb-5">
                Uns são essenciais pro site rodar, outros nos ajudam a entender
                como você navega e a oferecer ofertas relevantes. Você decide
                o que aceitar — a gente respeita a LGPD em todos os casos.{" "}
                <Link
                  href="/privacidade"
                  className="text-[#db6f57] hover:text-[#e88c76] underline underline-offset-2 font-semibold transition-colors"
                >
                  Ver política de privacidade
                </Link>
              </p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="group/cta relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-[13px] text-white overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                    boxShadow: "0 0 28px rgba(219,111,87,0.35)",
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                  Aceitar todos
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                    }}
                  />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onlyEssential}
                    className="px-4 py-2.5 rounded-lg font-semibold text-[12px] text-[#e6d9d4] bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    Só essenciais
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("preferences")}
                    className="px-4 py-2.5 rounded-lg font-semibold text-[12px] text-[#e6d9d4] bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    Personalizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {view === "preferences" && (
        <>
          <motion.div
            key="pref-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#2a2420]/70 backdrop-blur-sm"
            onClick={() => setView("banner")}
          />
          <motion.div
            key="pref"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:inset-x-auto md:w-full md:max-w-lg z-[70] max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-pref-title"
          >
            <div
              className="relative rounded-3xl overflow-hidden border bg-white"
              style={{
                borderColor: "#e6d9d4",
                boxShadow:
                  "0 40px 80px -24px rgba(42,36,32,0.35), 0 16px 32px -16px rgba(42,36,32,0.18)",
              }}
            >
              <div className="flex items-start justify-between p-6 md:p-7 pb-4 border-b border-[#f0e8e3]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      aria-hidden
                      className="h-px w-6 bg-[#db6f57] opacity-50"
                    />
                    <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#db6f57]">
                      Preferências de cookies
                    </span>
                  </div>
                  <h3
                    id="cookie-pref-title"
                    className="font-serif text-xl md:text-2xl font-bold text-[#2a2420] leading-tight"
                  >
                    Escolha o que a gente pode usar.
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setView("banner")}
                  aria-label="Fechar preferências"
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#5a4a42]/60 hover:bg-[#faf8f6] hover:text-[#2a2420] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 md:p-7 space-y-3">
                <CookieCategory
                  icon={Shield}
                  title="Essenciais"
                  description="Necessários para o site funcionar — login, carrinho, segurança. Não dá pra desligar."
                  enabled
                  locked
                  tone="sage"
                />
                <CookieCategory
                  icon={BarChart3}
                  title="Analytics"
                  description="Entender quais páginas você visita e como. Ajuda a gente a melhorar o que não tá bom."
                  enabled={analytics}
                  onToggle={() => setAnalytics((v) => !v)}
                  tone="accent"
                />
                <CookieCategory
                  icon={Target}
                  title="Marketing"
                  description="Mostrar ofertas relevantes nas redes e evitar propaganda que não tem nada a ver com você."
                  enabled={marketing}
                  onToggle={() => setMarketing((v) => !v)}
                  tone="deep"
                />
              </div>

              <div className="p-6 md:p-7 pt-4 border-t border-[#f0e8e3] bg-[#fafaf8] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={onlyEssential}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-[12px] text-[#5a4a42] bg-white border border-[#e6d9d4] hover:border-[#db6f57]/40 hover:text-[#db6f57] transition-all"
                >
                  Recusar não-essenciais
                </button>
                <button
                  type="button"
                  onClick={saveCustom}
                  className="group/cta relative flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[12px] text-white overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
                    boxShadow: "0 0 20px rgba(219,111,87,0.3)",
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                  Salvar minhas escolhas
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Individual category row with toggle ───
function CookieCategory({
  icon: Icon,
  title,
  description,
  enabled,
  locked,
  onToggle,
  tone,
}: {
  icon: typeof Shield
  title: string
  description: string
  enabled: boolean
  locked?: boolean
  onToggle?: () => void
  tone: "accent" | "sage" | "deep"
}) {
  const colors = {
    accent: "#db6f57",
    sage: "#4f6f64",
    deep: "#8b3d35",
  }[tone]

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl border"
      style={{
        borderColor: "#e6d9d4",
        backgroundColor: enabled ? "rgba(250,248,246,0.8)" : "#ffffff",
      }}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: `${colors}14`,
          border: `1.5px solid ${colors}28`,
        }}
      >
        <Icon className="w-4 h-4" style={{ color: colors }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-[13px] font-bold text-[#2a2420] leading-tight">
            {title}
          </h4>
          <button
            type="button"
            onClick={onToggle}
            disabled={locked}
            aria-label={`${enabled ? "Desativar" : "Ativar"} cookies de ${title}`}
            aria-pressed={enabled}
            className={`relative flex-shrink-0 w-9 h-5 rounded-full transition-colors ${
              locked ? "cursor-not-allowed opacity-80" : "cursor-pointer"
            }`}
            style={{
              backgroundColor: enabled ? colors : "#d8ccc4",
            }}
          >
            <span
              aria-hidden
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
              style={{
                left: enabled ? "calc(100% - 18px)" : "2px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
              }}
            />
          </button>
        </div>
        <p className="text-[12px] text-[#5a4a42]/75 leading-relaxed">
          {description}
        </p>
        {locked && (
          <span className="inline-block mt-1.5 text-[10px] uppercase tracking-wider font-bold text-[#4f6f64]/70">
            Sempre ativo
          </span>
        )}
      </div>
    </div>
  )
}
