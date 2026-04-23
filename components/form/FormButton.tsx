"use client"

import { ReactNode, forwardRef } from "react"
import { motion, useReducedMotion, HTMLMotionProps } from "framer-motion"
import { Loader2, LucideIcon } from "lucide-react"

export type FormButtonVariant = "primary" | "secondary" | "success"
export type FormButtonSize = "sm" | "md" | "lg"

export interface FormButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  label: string
  variant?: FormButtonVariant
  size?: FormButtonSize
  icon?: LucideIcon
  iconPosition?: "left" | "right"
  loading?: boolean
  loadingLabel?: string
  isDark?: boolean
  fullWidth?: boolean
  showShimmer?: boolean
}

/**
 * Botão no padrão visual do Contact (components/contact.tsx:692-731):
 * - primary: gradient terracotta 3-stop + glow rosado + shimmer sweep no hover
 * - secondary: outline neutro warm, hover vira terracotta
 * - success: gradient sage 3-stop + glow esverdeado (para CTAs de finalização)
 *
 * Animação Framer Motion com whileHover/whileTap, respeita useReducedMotion.
 */
export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
  function FormButton(
    {
      label,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "right",
      loading,
      loadingLabel = "Carregando...",
      isDark,
      fullWidth,
      showShimmer = true,
      disabled,
      className = "",
      style,
      ...motionProps
    },
    ref
  ) {
    const prefersReduced = useReducedMotion()
    const isDisabled = disabled || loading

    // ─── Sizes ───
    const sizeClasses: Record<FormButtonSize, string> = {
      sm: "px-4 py-2 text-[12px] gap-2",
      md: "px-7 py-3.5 text-[14px] gap-2.5",
      lg: "px-8 py-4 text-[15px] gap-3",
    }

    const iconSizeClasses: Record<FormButtonSize, string> = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }

    // ─── Variant: primary (gradient terracotta) ───
    const primaryBase =
      "text-white border-0 shadow-xl overflow-hidden font-bold"
    const primaryStyle = {
      background:
        "linear-gradient(90deg, #db6f57 0%, #c55a42 50%, #8b3d35 100%)",
      boxShadow: "0 0 32px rgba(219,111,87,0.35)",
    }

    // ─── Variant: success (gradient sage) ───
    const successBase =
      "text-white border-0 shadow-xl overflow-hidden font-bold"
    const successStyle = {
      background:
        "linear-gradient(90deg, #5a7a6e 0%, #4f6f64 50%, #3d5a51 100%)",
      boxShadow: "0 0 32px rgba(79,111,100,0.35)",
    }

    // ─── Variant: secondary (outline warm) ───
    const secondaryBase = isDark
      ? "bg-[#1A1715] text-[#B8AEA4] border border-[#2D2925] hover:border-[#E07A62]/50 hover:text-[#E07A62] hover:bg-[#221E1A] font-semibold"
      : "bg-white text-[#5a4a42] border border-[#e6d9d4] hover:border-[#db6f57]/45 hover:text-[#db6f57] hover:bg-[#faf8f6] font-semibold"

    const variantBase =
      variant === "primary"
        ? primaryBase
        : variant === "success"
        ? successBase
        : secondaryBase

    const variantStyle =
      variant === "primary"
        ? primaryStyle
        : variant === "success"
        ? successStyle
        : undefined

    const shimmerColor =
      variant === "secondary"
        ? "rgba(219,111,87,0.10)"
        : "rgba(255,255,255,0.22)"

    const finalClass = `group/btn relative inline-flex items-center justify-center rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
      sizeClasses[size]
    } ${variantBase} ${fullWidth ? "w-full" : ""} ${className}`

    return (
      <motion.button
        ref={ref}
        whileHover={prefersReduced || isDisabled ? undefined : { scale: 1.03 }}
        whileTap={prefersReduced || isDisabled ? undefined : { scale: 0.97 }}
        disabled={isDisabled}
        className={finalClass}
        style={{ ...variantStyle, ...style }}
        {...motionProps}
      >
        {loading ? (
          <>
            <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
            {loadingLabel}
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon
                className={`${iconSizeClasses[size]} transition-transform duration-300 group-hover/btn:-translate-x-0.5`}
              />
            )}
            <span className="relative z-10">{label}</span>
            {Icon && iconPosition === "right" && (
              <Icon
                className={`${iconSizeClasses[size]} transition-transform duration-300 group-hover/btn:translate-x-0.5`}
              />
            )}
          </>
        )}

        {/* Shimmer sweep — só nas variantes com fundo gradient ou no secondary com hover suave */}
        {showShimmer && !isDisabled && (
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
            }}
          />
        )}
      </motion.button>
    )
  }
)
