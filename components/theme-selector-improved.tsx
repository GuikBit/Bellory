"use client"

import { Controller } from "react-hook-form"
import { Palette, Check, Moon, Sun, Sparkles, Eye } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { useTheme } from "@/contexts/HeroThemeContext"

// ─────────────────────────────────────────────────────────────────
// ThemePreview — card individual de tema (com preview visual real)
// ─────────────────────────────────────────────────────────────────
const ThemePreview = ({
  theme,
  isSelected,
  isDark,
}: {
  theme: any
  isSelected: boolean
  isDark: boolean
}) => {
  const [showDetails, setShowDetails] = useState(false)
  const prefersReduced = useReducedMotion()

  const cardBg = isSelected
    ? isDark
      ? "rgba(224,122,98,0.08)"
      : "rgba(219,111,87,0.05)"
    : isDark
    ? "rgba(26,23,21,0.6)"
    : "rgba(255,255,255,0.85)"

  const cardBorder = isSelected
    ? isDark
      ? "#E07A62"
      : "#db6f57"
    : isDark
    ? "#2D2925"
    : "#e6d9d4"

  const cardShadow = isSelected
    ? isDark
      ? "0 12px 32px -8px rgba(224,122,98,0.35), 0 4px 12px -4px rgba(224,122,98,0.20)"
      : "0 12px 32px -8px rgba(219,111,87,0.30), 0 4px 12px -4px rgba(219,111,87,0.15)"
    : isDark
    ? "0 4px 16px -4px rgba(0,0,0,0.4)"
    : "0 4px 16px -4px rgba(42,36,32,0.06)"

  const titleColor = isDark ? "#F5F0EB" : "#2a2420"
  const subtleColor = isDark ? "#B8AEA4" : "#5a4a42"
  const dividerColor = isDark ? "#2D2925" : "#e6d9d4"

  return (
    <motion.button
      type="button"
      whileHover={prefersReduced ? undefined : { y: -6, scale: 1.01 }}
      whileTap={prefersReduced ? undefined : { scale: 0.99 }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      className="relative p-5 rounded-2xl border transition-colors duration-300 w-full text-left backdrop-blur"
      style={{
        backgroundColor: cardBg,
        borderColor: cardBorder,
        boxShadow: cardShadow,
        borderWidth: isSelected ? "1.5px" : "1px",
      }}
    >
      {/* Badge de seleção */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={prefersReduced ? false : { scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={prefersReduced ? undefined : { scale: 0, rotate: 180 }}
            className="absolute -top-2.5 -right-2.5 w-9 h-9 rounded-full flex items-center justify-center z-10"
            style={{
              background: "linear-gradient(135deg, #db6f57 0%, #c55a42 100%)",
              boxShadow: "0 8px 16px -4px rgba(219,111,87,0.45)",
            }}
          >
            <Check className="w-4.5 h-4.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header do tema */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <h4
            className="font-serif text-base font-bold leading-tight"
            style={{ color: titleColor }}
          >
            {theme.name}
          </h4>
          {theme.isDark ? (
            <Moon
              className="w-4 h-4 flex-shrink-0"
              style={{ color: isDark ? "#B8AEA4" : "#5a4a42" }}
            />
          ) : (
            <Sun
              className="w-4 h-4 flex-shrink-0"
              style={{ color: isDark ? "#E07A62" : "#db6f57" }}
            />
          )}
        </div>
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-bold"
          style={{ color: isDark ? "#7A716A" : "#5a4a42" }}
        >
          Tema {theme.type}
        </p>
      </div>

      {/* Preview visual real do template */}
      <div
        className="rounded-xl overflow-hidden mb-4 transition-all duration-300"
        style={{
          backgroundColor: theme.colors.background,
          minHeight: "120px",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1">
            <div
              className="h-2 rounded-full w-20 mb-1"
              style={{ backgroundColor: theme.colors.text, opacity: 0.8 }}
            />
            <div
              className="h-1.5 rounded-full w-16"
              style={{ backgroundColor: theme.colors.textSecondary, opacity: 0.5 }}
            />
          </div>
        </div>

        <div
          className="p-3 space-y-2"
          style={{ backgroundColor: theme.colors.cardBackground }}
        >
          <div
            className="h-2 rounded-full w-full"
            style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
          />
          <div
            className="h-2 rounded-full w-4/5"
            style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
          />
          <div
            className="h-2 rounded-full w-3/5"
            style={{ backgroundColor: theme.colors.text, opacity: 0.3 }}
          />
        </div>

        <div className="p-3">
          <div
            className="h-8 rounded-lg flex items-center justify-center"
            style={{
              background: theme.colors.backgroundLinear || theme.colors.primary,
              color: theme.colors.buttonText,
            }}
          >
            <span className="text-xs font-semibold">Botão</span>
          </div>
        </div>
      </div>

      {/* Paleta de cores */}
      <div className="space-y-2">
        <span
          className="text-[10px] uppercase tracking-wider font-bold block"
          style={{ color: isDark ? "#B8AEA4" : "#5a4a42" }}
        >
          Paleta
        </span>
        <div className="flex items-center gap-2">
          {[
            { color: theme.colors.primary, label: "Primária" },
            { color: theme.colors.secondary, label: "Secundária" },
            { color: theme.colors.accent, label: "Destaque" },
            { color: theme.colors.background, label: "Fundo" },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <motion.div
                whileHover={prefersReduced ? undefined : { scale: 1.18 }}
                className="w-7 h-7 rounded-full transition-all"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 0 1.5px ${
                    isDark ? "rgba(245,240,235,0.15)" : "rgba(255,255,255,0.95)"
                  }, 0 2px 6px rgba(0,0,0,0.12)`,
                }}
              />
              <div
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
                style={{
                  backgroundColor: isDark ? "#0D0B0A" : "#2a2420",
                  color: "#F5F0EB",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detalhes expandidos (hover real) */}
      <AnimatePresence initial={false}>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-4 pt-3 space-y-1.5 border-t"
              style={{ borderColor: dividerColor }}
            >
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: subtleColor }}>Fonte título</span>
                <span
                  className="font-semibold"
                  style={{
                    color: titleColor,
                    fontFamily: theme.fonts?.heading,
                  }}
                >
                  Aa Bb
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: subtleColor }}>Fonte corpo</span>
                <span
                  className="font-semibold"
                  style={{
                    color: titleColor,
                    fontFamily: theme.fonts?.body,
                  }}
                >
                  Aa Bb
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ─────────────────────────────────────────────────────────────────
// ThemeSelector — wrapper do step
// ─────────────────────────────────────────────────────────────────
export const ThemeSelector = ({ control, errors, themeArray }: any) => {
  const { isDark } = useTheme()

  const headingColor = isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
  const mutedColor = isDark ? "text-[#7A716A]" : "text-[#5a4a42]/65"
  const lightCount = themeArray.filter((t: any) => !t.isDark).length
  const darkCount = themeArray.filter((t: any) => t.isDark).length

  return (
    <div className="space-y-8">
      {/* ─── Section header ─── */}
      <div className="flex items-center gap-3 mb-2 transition-colors duration-300">
        <div className="w-12 h-12 rounded-xl bg-[#db6f57]/10 flex items-center justify-center">
          <Palette
            className={`w-6 h-6 ${isDark ? "text-[#E07A62]" : "text-[#db6f57]"}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-serif text-xl md:text-2xl font-bold leading-tight ${headingColor} transition-colors duration-300`}
          >
            Escolha seu tema
          </h3>
          <p
            className={`text-sm ${mutedColor} transition-colors duration-300 mt-0.5`}
          >
            A identidade visual da sua loja online.{" "}
            <span className="hidden sm:inline">
              {themeArray.length} opções · {lightCount} claros · {darkCount} escuros.
            </span>
          </p>
        </div>
      </div>

      {/* ─── Bloco: Galeria ─── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
            Identidade visual
          </span>
        </div>

        {/* Tip card warm translúcido */}
        <div
          className="rounded-2xl border p-4 backdrop-blur"
          style={{
            backgroundColor: isDark
              ? "rgba(224,122,98,0.06)"
              : "rgba(219,111,87,0.05)",
            borderColor: isDark
              ? "rgba(224,122,98,0.18)"
              : "rgba(219,111,87,0.18)",
          }}
        >
          <p
            className={`text-[13px] leading-relaxed flex items-start gap-2 ${
              isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
            }`}
          >
            <Eye
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                isDark ? "text-[#E07A62]" : "text-[#db6f57]"
              }`}
            />
            <span>
              Passe o mouse pra ver detalhes de tipografia.
              Você vai poder ajustar tudo depois — cores, fontes, espaçamento — direto na plataforma.
            </span>
          </p>
        </div>

        {/* Grid de temas */}
        <Controller
          name="tema"
          control={control}
          rules={{ required: "Selecione um tema pra continuar" }}
          render={({ field }) => (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {themeArray.map((tema: any, index: number) => (
                <motion.div
                  key={tema.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
                  onClick={() => field.onChange(tema.id)}
                >
                  <ThemePreview
                    theme={tema}
                    isSelected={field.value === tema.id}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        />

        {/* Erro inline */}
        <AnimatePresence initial={false}>
          {errors.tema && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <p
                className="text-[12px] text-[#d15847] font-medium px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "rgba(209,88,71,0.10)",
                  border: "1px solid rgba(209,88,71,0.22)",
                }}
              >
                {errors.tema.message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
