"use client"

import { ReactNode, forwardRef } from "react"
import { InputMask } from "primereact/inputmask"
import { Check, X, LucideIcon } from "lucide-react"

export interface FormInputProps {
  label: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  type?: "text" | "email" | "password" | "tel"
  mask?: string
  error?: string
  successMessage?: string
  loading?: boolean
  loadingMessage?: string
  success?: boolean
  showStatusIcon?: boolean
  disabled?: boolean
  required?: boolean
  icon?: LucideIcon
  helperText?: string
  isDark?: boolean
  autoFocus?: boolean
  endAdornment?: ReactNode
  id?: string
  inputClassName?: string
  containerClassName?: string
  autoComplete?: string
  maxLength?: number
}

/**
 * Replica fielmente os inputs do componente Contact (components/contact.tsx).
 * Light mode: classes idênticas ao Contact. Dark mode: equivalentes para o tema escuro do cadastro.
 * Usa <input> HTML nativo (sem PrimeReact) quando não há máscara para evitar estilos default conflitantes.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      label,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      type = "text",
      mask,
      error,
      successMessage,
      loading,
      loadingMessage,
      success,
      showStatusIcon = true,
      disabled,
      required,
      icon: Icon,
      helperText,
      isDark,
      autoFocus,
      endAdornment,
      id,
      inputClassName = "",
      containerClassName = "",
      autoComplete,
      maxLength,
    },
    ref
  ) {
    const inputId = id || name

    // ─── Label (idêntico ao Contact, com variante dark) ───
    const labelClass = isDark
      ? "block text-[11px] uppercase tracking-wider font-bold text-[#B8AEA4] mb-2"
      : "block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2"

    // ─── Input base nativo (cópia exata do Contact, com variante dark) ───
    const inputBaseLight =
      "w-full px-4 py-3 bg-[#faf8f6] rounded-xl border text-[14px] text-[#2a2420] placeholder:text-[#5a4a42]/35 focus:outline-none focus:ring-4 focus:bg-white transition-all"

    const inputBaseDark =
      "w-full px-4 py-3 bg-[#1A1715] rounded-xl border text-[14px] text-[#F5F0EB] placeholder:text-[#B8AEA4]/40 focus:outline-none focus:ring-4 focus:bg-[#221E1A] transition-all"

    const inputBase = isDark ? inputBaseDark : inputBaseLight

    // ─── Border state (mantém a paleta do Contact: #e6d9d4 default, #db6f57/50 focus) ───
    const stateBorder = error
      ? "border-[#d15847] focus:border-[#d15847] focus:ring-[#d15847]/10"
      : success
      ? isDark
        ? "border-[#5a7a6e] focus:border-[#5a7a6e] focus:ring-[#5a7a6e]/15"
        : "border-[#5a7a6e] focus:border-[#5a7a6e] focus:ring-[#5a7a6e]/10"
      : isDark
      ? "border-[#2D2925] focus:border-[#E07A62]/60 focus:ring-[#E07A62]/15"
      : "border-[#e6d9d4] focus:border-[#db6f57]/50 focus:ring-[#db6f57]/10"

    const finalInputClass = `${inputBase} ${stateBorder} ${
      disabled || loading ? "opacity-70 cursor-not-allowed" : ""
    } ${inputClassName}`

    // ─── PrimeReact InputMask precisa de !important para vencer o tema lara-light-blue ───
    const maskBaseLight =
      "!w-full !px-4 !py-3 !bg-[#faf8f6] !rounded-xl !border !text-[14px] !text-[#2a2420] placeholder:!text-[#5a4a42]/35 focus:!outline-none focus:!ring-4 focus:!bg-white !transition-all !shadow-none"

    const maskBaseDark =
      "!w-full !px-4 !py-3 !bg-[#1A1715] !rounded-xl !border !text-[14px] !text-[#F5F0EB] placeholder:!text-[#B8AEA4]/40 focus:!outline-none focus:!ring-4 focus:!bg-[#221E1A] !transition-all !shadow-none"

    const maskStateBorder = error
      ? "!border-[#d15847] focus:!border-[#d15847] focus:!ring-[#d15847]/10"
      : success
      ? isDark
        ? "!border-[#5a7a6e] focus:!border-[#5a7a6e] focus:!ring-[#5a7a6e]/15"
        : "!border-[#5a7a6e] focus:!border-[#5a7a6e] focus:!ring-[#5a7a6e]/10"
      : isDark
      ? "!border-[#2D2925] focus:!border-[#E07A62]/60 focus:!ring-[#E07A62]/15"
      : "!border-[#e6d9d4] focus:!border-[#db6f57]/50 focus:!ring-[#db6f57]/10"

    const finalMaskClass = `${isDark ? maskBaseDark : maskBaseLight} ${maskStateBorder} ${
      disabled || loading ? "!opacity-70 !cursor-not-allowed" : ""
    } ${inputClassName}`

    const showCheck = showStatusIcon && success && !loading
    const showX = showStatusIcon && error && !loading && !success
    const hasRightSlot = loading || showCheck || showX || !!endAdornment

    // PrimeReact InputMask aceita className mas ainda aplica .p-inputtext / .p-inputmask base.
    // Como o Contact não usa InputMask, aceitamos isso só para campos com máscara (CNPJ, telefone)
    // e neutralizamos via className adicional quando necessário.
    const requiredAsterisk = required ? (
      <span className={`ml-1 ${isDark ? "text-[#E07A62]" : "text-[#d15847]"}`}>*</span>
    ) : null

    return (
      <div className={containerClassName}>
        <label htmlFor={inputId} className={labelClass}>
          {Icon && (
            <Icon
              className="w-3 h-3 inline-block -mt-0.5 mr-1.5"
              style={{ color: isDark ? "#E07A62" : "#db6f57" }}
            />
          )}
          {label}
          {requiredAsterisk}
        </label>

        <div className="relative">
          {mask ? (
            <InputMask
              id={inputId}
              name={name}
              mask={mask}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled || loading}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              className={finalMaskClass}
            />
          ) : (
            <input
              ref={ref}
              id={inputId}
              name={name}
              type={type}
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled || loading}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              maxLength={maxLength}
              required={required}
              className={finalInputClass}
            />
          )}

          {hasRightSlot && (
            <div
              className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center ${
                endAdornment ? "gap-2" : "pointer-events-none"
              }`}
            >
              {loading && (
                <div
                  className="w-5 h-5 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: isDark ? "#E07A62" : "#db6f57",
                    borderTopColor: "transparent",
                  }}
                />
              )}
              {showCheck && (
                <Check
                  className="w-5 h-5"
                  style={{ color: isDark ? "#7AB8A4" : "#5a7a6e" }}
                />
              )}
              {showX && <X className="w-5 h-5 text-[#d15847]" />}
              {endAdornment}
            </div>
          )}
        </div>

        {/* Loading helper */}
        {loading && loadingMessage && (
          <small
            className={`text-[12px] mt-1.5 flex items-center gap-2 ${
              isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/65"
            }`}
          >
            <span
              className="w-3 h-3 border-2 rounded-full animate-spin"
              style={{
                borderColor: isDark ? "#E07A62" : "#4f6f64",
                borderTopColor: "transparent",
              }}
            />
            {loadingMessage}
          </small>
        )}

        {/* Error message */}
        {!loading && error && (
          <small className="text-[12px] mt-1.5 block text-[#d15847] leading-snug">
            {error}
          </small>
        )}

        {/* Success message */}
        {!loading && !error && success && successMessage && (
          <small
            className={`text-[12px] mt-1.5 block leading-snug ${
              isDark ? "text-[#7AB8A4]" : "text-[#5a7a6e]"
            }`}
          >
            {successMessage}
          </small>
        )}

        {/* Helper text */}
        {!loading && !error && !(success && successMessage) && helperText && (
          <small
            className={`text-[11px] mt-1.5 block leading-snug ${
              isDark ? "text-[#7A716A]" : "text-[#5a4a42]/55"
            }`}
          >
            {helperText}
          </small>
        )}
      </div>
    )
  }
)
