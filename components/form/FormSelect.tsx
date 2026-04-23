"use client"

import { Dropdown, DropdownProps } from "primereact/dropdown"
import { LucideIcon } from "lucide-react"

export interface FormSelectProps extends Omit<DropdownProps, "className"> {
  label: string
  error?: string
  required?: boolean
  isDark?: boolean
  icon?: LucideIcon
  helperText?: string
  containerClassName?: string
}

/**
 * Replica visualmente os inputs do componente Contact (components/contact.tsx).
 * Usa Dropdown do PrimeReact (necessário para a UX rica de seleção) com !important
 * em todas as classes que conflitam com o tema lara-light-blue carregado em /cadastro.
 *
 * Match com Contact: bg #faf8f6, border 1px #e6d9d4, rounded-xl, text-[14px],
 * focus border #db6f57/50 + ring-4 #db6f57/10, focus bg branco.
 */
export function FormSelect({
  label,
  error,
  required,
  isDark,
  icon: Icon,
  helperText,
  containerClassName = "",
  ...dropdownProps
}: FormSelectProps) {
  // ─── Label (idêntico ao Contact) ───
  const labelClass = isDark
    ? "block text-[11px] uppercase tracking-wider font-bold text-[#B8AEA4] mb-2"
    : "block text-[11px] uppercase tracking-wider font-bold text-[#5a4a42]/70 mb-2"

  // ─── Root do Dropdown (vence o .p-dropdown do PrimeReact) ───
  const rootBaseLight =
    "!w-full !bg-[#faf8f6] !rounded-xl !border !text-[14px] !shadow-none !transition-all focus-within:!ring-4 focus-within:!bg-white"

  const rootBaseDark =
    "!w-full !bg-[#1A1715] !rounded-xl !border !text-[14px] !shadow-none !transition-all focus-within:!ring-4 focus-within:!bg-[#221E1A]"

  const rootStateBorder = error
    ? "!border-[#d15847] focus-within:!border-[#d15847] focus-within:!ring-[#d15847]/10"
    : isDark
    ? "!border-[#2D2925] focus-within:!border-[#E07A62]/60 focus-within:!ring-[#E07A62]/15"
    : "!border-[#e6d9d4] focus-within:!border-[#db6f57]/50 focus-within:!ring-[#db6f57]/10"

  const finalRootClass = `${isDark ? rootBaseDark : rootBaseLight} ${rootStateBorder}`

  return (
    <div className={containerClassName}>
      <label className={labelClass}>
        {Icon && (
          <Icon
            className="w-3 h-3 inline-block -mt-0.5 mr-1.5"
            style={{ color: isDark ? "#E07A62" : "#db6f57" }}
          />
        )}
        {label}
        {required && (
          <span className={`ml-1 ${isDark ? "text-[#E07A62]" : "text-[#d15847]"}`}>
            *
          </span>
        )}
      </label>

      <Dropdown
        {...dropdownProps}
        className={finalRootClass}
        pt={{
          input: {
            className: `!px-4 !py-3 !text-[14px] !bg-transparent !border-0 !shadow-none ${
              isDark
                ? "!text-[#F5F0EB] placeholder:!text-[#B8AEA4]/40"
                : "!text-[#2a2420] placeholder:!text-[#5a4a42]/35"
            }`,
          },
          trigger: {
            className: `!px-3 !w-12 ${
              isDark ? "!text-[#B8AEA4]" : "!text-[#5a4a42]/55"
            }`,
          },
          panel: {
            className: `!border !rounded-xl !shadow-lg !mt-1 !overflow-hidden ${
              isDark
                ? "!bg-[#1A1715] !border-[#2D2925]"
                : "!bg-white !border-[#e6d9d4]"
            }`,
          },
          list: { className: "!py-1" },
          item: ({ context }: any) => ({
            className: `!px-4 !py-3 !text-[14px] !cursor-pointer !transition-colors ${
              context?.selected
                ? isDark
                  ? "!bg-[#E07A62]/15 !text-[#E07A62] !font-semibold"
                  : "!bg-[#db6f57]/10 !text-[#db6f57] !font-semibold"
                : isDark
                ? "!text-[#B8AEA4] hover:!bg-[#2D2925]"
                : "!text-[#2a2420] hover:!bg-[#faf8f6]"
            }`,
          }),
          emptyMessage: {
            className: `!px-4 !py-3 !text-[13px] ${
              isDark ? "!text-[#7A716A]" : "!text-[#5a4a42]/55"
            }`,
          },
        }}
      />

      {error && (
        <small className="text-[12px] mt-1.5 block text-[#d15847] leading-snug">
          {error}
        </small>
      )}

      {!error && helperText && (
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
