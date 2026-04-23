"use client"

import { motion, useReducedMotion } from "framer-motion"
import { LucideIcon } from "lucide-react"

export interface PillOption {
  code: string
  name: string
}

export interface FormPillSelectorProps {
  label: string
  options: PillOption[]
  value?: string
  onChange: (code: string) => void
  error?: string
  required?: boolean
  isDark?: boolean
  icon?: LucideIcon
  helperText?: string
  containerClassName?: string
}

export function FormPillSelector({
  label,
  options,
  value,
  onChange,
  error,
  required,
  isDark,
  icon: Icon,
  helperText,
  containerClassName = "",
}: FormPillSelectorProps) {
  const prefersReduced = useReducedMotion()

  const labelColor = isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/70"
  const requiredColor = isDark ? "text-[#E07A62]" : "text-[#d15847]"
  const helperColor = isDark ? "text-[#7A716A]" : "text-[#5a4a42]/55"

  const inactiveBase = isDark
    ? "text-[#B8AEA4] bg-[#1A1715] border-[#2D2925] hover:border-[#E07A62]/40 hover:text-[#E07A62]"
    : "text-[#5a4a42] bg-white border-[#e6d9d4] hover:border-[#db6f57]/40 hover:text-[#db6f57]"

  return (
    <div className={containerClassName}>
      <label
        className={`block text-[11px] uppercase tracking-wider font-bold mb-2.5 transition-colors ${labelColor}`}
      >
        {Icon && (
          <Icon
            className="w-3 h-3 inline-block -mt-0.5 mr-1.5"
            style={{ color: isDark ? "#E07A62" : "#db6f57" }}
          />
        )}
        {label}
        {required && <span className={`ml-1 ${requiredColor}`}>*</span>}
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.code
          return (
            <motion.button
              key={option.code}
              type="button"
              onClick={() => onChange(option.code)}
              whileHover={prefersReduced ? undefined : { scale: 1.04 }}
              whileTap={prefersReduced ? undefined : { scale: 0.97 }}
              className={`px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 ${
                active ? "text-white shadow-md" : inactiveBase
              }`}
              style={
                active
                  ? {
                      background:
                        "linear-gradient(90deg, #db6f57 0%, #c55a42 100%)",
                      borderColor: "#c55a42",
                      boxShadow: "0 4px 12px rgba(219,111,87,0.28)",
                    }
                  : undefined
              }
            >
              {option.name}
            </motion.button>
          )
        })}
      </div>

      {error && (
        <small className="text-[12px] mt-2 block text-[#d15847] leading-snug">
          {error}
        </small>
      )}

      {!error && helperText && (
        <small className={`text-[11px] mt-2 block leading-snug ${helperColor}`}>
          {helperText}
        </small>
      )}
    </div>
  )
}
