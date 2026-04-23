"use client"

import { Check } from "lucide-react"

export interface FormCheckboxProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  isDark?: boolean
  containerClassName?: string
  id?: string
}

export function FormCheckbox({
  label,
  description,
  checked,
  onChange,
  isDark,
  containerClassName = "",
  id,
}: FormCheckboxProps) {
  const checkboxBg = checked
    ? "border-[#db6f57]"
    : isDark
    ? "border-[#2D2925] bg-[#1A1715]"
    : "border-[#e6d9d4] bg-[#faf8f6]"

  return (
    <button
      type="button"
      id={id}
      onClick={() => onChange(!checked)}
      className={`group flex items-start gap-3 w-full text-left p-3 rounded-xl border transition-all duration-200 ${
        checked
          ? isDark
            ? "border-[#E07A62]/40 bg-[#E07A62]/8"
            : "border-[#db6f57]/35 bg-[#db6f57]/5"
          : isDark
          ? "border-[#2D2925] bg-[#1A1715]/50 hover:border-[#E07A62]/30"
          : "border-[#e6d9d4] bg-white hover:border-[#db6f57]/30"
      } ${containerClassName}`}
    >
      <span
        className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checkboxBg}`}
        style={
          checked
            ? {
                background:
                  "linear-gradient(135deg, #db6f57 0%, #c55a42 100%)",
                boxShadow: "0 2px 8px rgba(219,111,87,0.3)",
              }
            : undefined
        }
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </span>

      <span className="flex-1 min-w-0">
        <span
          className={`block text-[13px] font-semibold leading-snug ${
            isDark ? "text-[#F5F0EB]" : "text-[#2a2420]"
          }`}
        >
          {label}
        </span>
        {description && (
          <span
            className={`block text-[11px] mt-0.5 leading-snug ${
              isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/60"
            }`}
          >
            {description}
          </span>
        )}
      </span>
    </button>
  )
}
