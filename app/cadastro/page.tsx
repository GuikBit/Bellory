"use client"

import type React from "react"
import { type JSX, type ReactElement, useEffect, useState } from "react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { Dropdown, type DropdownPassThroughOptions } from "primereact/dropdown"
import { useForm, Controller, type Control, type FieldErrors, type UseFormGetValues, useWatch } from "react-hook-form" // <--- ADICIONADO AQUI
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  MapPin,
  CreditCard,
  CheckCircle2,
  KeyRound,
  EyeOff,
  Eye,
  Check,
  Palette,
  CheckCheck,
  type LucideIcon,
  Scissors,
  Crown,
} from "lucide-react"
import { classNames } from "primereact/utils"
// import { useTheme } from "../global/Theme-context"
import { cn } from "@/lib/utils"
import { themes } from "@/utils/themes"
import { Header } from "@/components/header"

interface FormData {
  // Step 1: Informações Legais
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  inscricaoEstadual: string
  email: string
  telefone: string
  nomeResponsavel: string
  emailResponsavel: string
  telefoneResponsavel: string

  // Step 2: Endereço
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string

  login: string
  senha: string
  confSenha: string

  tema: string // ID do tema selecionado
  planoId: string // ID do plano selecionado

  // Step 3: Cobrança
  plano: string
  formaPagamento: string
  numeroCartao: string
  nomeCartao: string
  validadeCartao: string
  cvv: string
}

function validarSenhaForte(senha: string): boolean {
  // Expressão regular que verifica:
  // - mínimo 6 caracteres
  // - ao menos uma letra maiúscula
  // - ao menos um número
  // - ao menos um caractere especial
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  console.log(regex.test(senha))
  return regex.test(senha)
}

interface Step {
  id: number
  label: string
  icon: LucideIcon
}

const steps: Step[] = [
  { id: 0, label: "Empresa", icon: Building2 },
  { id: 1, label: "Localização", icon: MapPin },
  { id: 2, label: "Acesso", icon: KeyRound },
  { id: 3, label: "Tema", icon: Palette },
  { id: 4, label: "Plano", icon: CreditCard },
  { id: 5, label: "Confirmação", icon: CheckCheck },
]

interface Theme {
  id: string
  name: string
  type: string
  isDark: boolean
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    cardBackground: string
    [key: string]: string
  }
}

interface ThemeSelectorProps {
  themes: Record<string, Theme>
  selectedTheme: Theme | null
  onThemeSelect: (theme: Theme) => void
}

export function ThemeSelector({ themes, selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  const themeArray = Object.values(themes)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
      {themeArray.map((theme) => {
        const isSelected = selectedTheme?.id === theme.id

        return (
          <button
            key={theme.id}
            onClick={() => onThemeSelect(theme)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-xl",
              isSelected
                ? "border-primary shadow-lg ring-4 ring-primary/20"
                : "dark:border-neutral-700 border-neutral-200 hover:border-primary/50",
            )}
            style={{
              backgroundColor: theme.colors.cardBackground,
            }}
            type="button"
          >
            {/* Selected indicator */}
            {isSelected && (
              <div
                className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full shadow-lg"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              </div>
            )}

            {/* Theme preview header */}
            <div
              className="relative h-24 p-4 transition-all duration-300"
              style={{
                background: theme.colors.backgroundLinear || theme.colors.primary,
              }}
            >
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-white/90" />
                <span className="text-sm font-medium text-white/90">{theme.isDark ? "Escuro" : "Claro"}</span>
              </div>
            </div>

            {/* Theme info */}
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-semibold text-base mb-1" style={{ color: theme.colors.text }}>
                  {theme.name}
                </h4>
                <p className="text-xs capitalize" style={{ color: theme.colors.textSecondary }}>
                  Tipo: {theme.type}
                </p>
              </div>

              {/* Color palette preview */}
              <div className="space-y-2">
                <p className="text-xs font-medium" style={{ color: theme.colors.textSecondary }}>
                  Paleta de cores
                </p>
                <div className="flex gap-2">
                  <div
                    className="h-8 flex-1 rounded-lg border shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.border,
                    }}
                    title="Cor primária"
                  />
                  <div
                    className="h-8 flex-1 rounded-lg border shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: theme.colors.secondary,
                      borderColor: theme.colors.border,
                    }}
                    title="Cor secundária"
                  />
                  <div
                    className="h-8 flex-1 rounded-lg border shadow-sm transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: theme.colors.accent,
                      borderColor: theme.colors.border,
                    }}
                    title="Cor de destaque"
                  />
                </div>
              </div>

              {/* Mini preview card */}
              <div
                className="rounded-lg p-3 border"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                }}
              >
                <div className="h-2 w-3/4 rounded mb-2" style={{ backgroundColor: theme.colors.text, opacity: 0.8 }} />
                <div
                  className="h-2 w-1/2 rounded"
                  style={{ backgroundColor: theme.colors.textSecondary, opacity: 0.6 }}
                />
              </div>
            </div>

            {/* Hover overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

interface PlanoCardProps {
  nome: string
  preco?: number
  icone: JSX.Element
  selecionado: boolean
  onClick: () => void
}

export function PlanoCard({ nome, preco, icone, selecionado, onClick }: PlanoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl px-5 py-4 
        border transition-all duration-300 text-center select-none
        ${
          selecionado
            ? "bg-yellow-600/20 border-yellow-500 shadow-[0_0_10px_rgba(255,200,0,0.2)]"
            : "bg-neutral-700 border-neutral-700 hover:border-yellow-600 hover:bg-neutral-700/60"
        }
      `}
    >
      <div className="text-yellow-500">{icone}</div>
      <span className="text-sm font-semibold text-white tracking-wide">{nome}</span>
      {preco !== undefined && preco > 0 ? (
        <span className="text-xs text-neutral-400">R$ {preco.toFixed(2).replace(".", ",")}/mês</span>
      ) : (
        <span className="text-xs text-neutral-400">Gratuito</span>
      )}
    </motion.div>
  )
}

interface PlanoSelectorProps {
  planos: Plano[]
  selectedPlano: Plano | undefined
  setSelectedPlano: (item: Plano) => void
}
export function PlanoSelector({ planos, selectedPlano, setSelectedPlano }: PlanoSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {planos.map((plano) => (
        <PlanoCard
          key={plano.id}
          nome={plano.nome}
          preco={plano.precoMensal}
          icone={plano.icone}
          selecionado={selectedPlano?.id === plano?.id}
          onClick={() => setSelectedPlano(plano)}
        />
      ))}
    </div>
  )
}
// 1. COMPONENTES MOVIDOS PARA FORA

// StepperHeader
// ----------------------------------------------------------------------

interface StepperHeaderProps {
  activeStep: number
  completedSteps: number[]
  steps: Step[]
}

const StepperHeader: React.FC<StepperHeaderProps> = ({ activeStep, completedSteps, steps }) => {
  return (
    <div className="flex items-center md:px-4 md:my-4 my-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id)
        const isActive = activeStep === step.id
        const StepIcon = step.icon

        // se for o último, não cresce
        const isLast = index === steps.length - 1

        return (
          <div key={step.id} className={`flex items-center ${!isLast ? "flex-1" : "flex-none"}`}>
            <div className="flex flex-col items-center w-auto md:min-w-20">
              <div
                className={classNames(
                  "md:w-12 w-10 md:h-12 h-10 rounded-full flex items-center  justify-center transition-all duration-300",
                  {
                    "bg-green-500 text-white": isCompleted,
                    "bg-primary text-primary-foreground ring-4 ring-primary/20 text-white": isActive && !isCompleted,
                    "dark:bg-neutral-900/60 bg-neutral-100 text-muted-foreground": !isActive && !isCompleted,
                  },
                )}
                style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" size={20} style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }} />
                ) : (
                  <StepIcon
                    className="md:w-6 w-4.5 md:h-6 h-4.5"
                    style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                  />
                )}
              </div>
              <span
                className={classNames(
                  "text-xs mt-2 text-center font-medium transition-colors duration-300 hidden md:block",
                  {
                    "text-green-500": isCompleted,
                    "text-foreground": isActive,
                    "text-muted-foreground": !isActive && !isCompleted,
                  },
                )}
                style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={classNames("h-0.5 mx-2 flex-1 transition-colors md:mb-5 duration-300", {
                  "bg-green-500": isCompleted,
                  "dark:bg-neutral-700 bg-neutral-200": !isCompleted,
                })}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// StepperMain
// ----------------------------------------------------------------------
interface Plano {
  id: string
  nome: string
  descricaoBreve: string
  precoMensal: number
  precoAnual: number
  icone: ReactElement
  destaque: boolean
  beneficios: string[]
  naoIncluido: string[]
  className: string
}
interface StepperMainProps {
  activeStep: number
  direction: "forward" | "backward"
  control: Control<FormData>
  errors: FieldErrors<FormData>
  getValues: UseFormGetValues<FormData>
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  estados: { label: string; value: string }[]
  planos: Plano[]
  formasPagamento: { label: string; value: string }[]
  setValue: any
}

const StepperMain: React.FC<StepperMainProps> = ({
  activeStep,
  direction,
  control,
  errors,
  getValues,
  showPassword,
  setShowPassword,
  estados,
  planos,
  formasPagamento,
  //setValue, // Recebendo setValue
}) => {
  const temaValue = useWatch({ control, name: "tema" })
  const planoIdValue = useWatch({ control, name: "planoId" })

  const slideVariants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? -1000 : 1000,
      opacity: 0,
    }),
  }

  // 2. ESTILOS COPIADOS PARA OS DEMAIS INPUTS
  const baseStyle =
    "w-full py-3 dark:!bg-neutral-700/50 !bg-neutral-100 border rounded-lg dark:text-neutral-300 text-neutral-700 placeholder-neutral-500 transition-all"
  const errorStyle = "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
  const normalStyle =
    "dark:border-neutral-600 border-neutral-300 focus:outline-none focus:ring-2 focus:dark:ring-primary focus:ring-primary focus:border-transparent"

  // Workaround para estilização de Dropdown do PrimeReact com Tailwind
  const dropdownPassThrough: DropdownPassThroughOptions = {
    root: ({ props, state }: { props: any; state: any }) => ({
      className: classNames(
        baseStyle,
        "pr-4", // Dropdowns normais
        { "p-dropdown-open": state.overlayVisible },
        errors[props.name as keyof FormData] ? errorStyle : normalStyle,
      ),
    }),
    input: {
      className: "w-full !p-0 !m-0 border-0 focus:ring-0 focus:shadow-none bg-transparent", // Reseta estilos internos
    },
    trigger: {
      className: "text-neutral-500",
    },
    panel: {
      className: "bg-card border border-border rounded-lg shadow-lg",
    },
    item: {
      className: "hover:bg-primary/10",
    },
  }

  const passwordInputPassThrough = {
    root: ({ props }: { props: { name: string } }) => ({
      className: classNames(
        baseStyle,
        "pr-10", // Estilo específico para senha (espaço para ícone)
        errors[props.name as keyof FormData] ? errorStyle : normalStyle,
      ),
    }),
  }

  return (
    <div className="relative overflow-hidden min-h-[500px] md:px-10 px-2 w-full">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full"
        >
          {/* Dados */}
          {activeStep === 0 && (
            <div>
              <div className="md:py-8 py-2">
                <div
                  className="flex items-center gap-3 md:mb-8 mb-4 px-4"
                  style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                >
                  <div className="text-center w-full">
                    <h3 className="md:text-xl text-lg font-semibold text-foreground pb-1">Dados da Empresa</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">
                      Informações legais do seu estabelecimento
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="cnpj" className="text-sm font-medium text-foreground mb-1 mx-3">
                      CNPJ <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="cnpj"
                      control={control}
                      rules={{ required: "CNPJ é obrigatório" }}
                      render={({ field }) => (
                        <InputMask
                          id="cnpj"
                          {...field}
                          mask="99.999.999/9999-99"
                          placeholder="00.000.000/0000-00"
                          className={classNames(baseStyle, "pr-4", errors.cnpj ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.cnpj && <small className="text-red-500 mx-3">{errors.cnpj.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="inscricaoEstadual" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Inscrição Estadual
                    </label>
                    <Controller
                      name="inscricaoEstadual"
                      control={control}
                      render={({ field }) => (
                        <InputText
                          id="inscricaoEstadual"
                          {...field}
                          placeholder="000.000.000.000"
                          className={classNames(baseStyle, "pr-4", normalStyle)}
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="razaoSocial" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Razão Social <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="razaoSocial"
                      control={control}
                      rules={{ required: "Razão Social é obrigatória" }}
                      render={({ field }) => (
                        <InputText
                          id="razaoSocial"
                          {...field}
                          placeholder="Nome completo da empresa"
                          className={classNames(baseStyle, "pr-4", errors.razaoSocial ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.razaoSocial && <small className="text-red-500 mx-3">{errors.razaoSocial.message}</small>}
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="nomeFantasia" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Nome Fantasia <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="nomeFantasia"
                      control={control}
                      rules={{ required: "Nome Fantasia é obrigatório" }}
                      render={({ field }) => (
                        <InputText
                          id="nomeFantasia"
                          {...field}
                          placeholder="Nome comercial do estabelecimento"
                          className={classNames(baseStyle, "pr-4", errors.nomeFantasia ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.nomeFantasia && <small className="text-red-500 mx-3">{errors.nomeFantasia.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      }}
                      render={({ field }) => (
                        <InputText
                          id="email"
                          {...field}
                          type="email"
                          placeholder="contato@empresa.com"
                          className={classNames(baseStyle, "pr-4", errors.email ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.email && <small className="text-red-500 mx-3">{errors.email.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="telefone" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="telefone"
                      control={control}
                      rules={{ required: "Telefone é obrigatório" }}
                      render={({ field }) => (
                        <InputMask
                          id="telefone"
                          {...field}
                          mask="(99) 99999-9999"
                          placeholder="(00) 00000-0000"
                          className={classNames(baseStyle, "pr-4", errors.telefone ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.telefone && <small className="text-red-500 mx-3">{errors.telefone.message}</small>}
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="nomeResponsavel" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Nome Responsável <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="nomeResponsavel"
                      control={control}
                      rules={{ required: "Nome Responsável é obrigatório" }}
                      render={({ field }) => (
                        <InputText
                          id="nomeResponsavel"
                          {...field}
                          placeholder="Nome do Responsável pelo estabelecimento"
                          className={classNames(baseStyle, "pr-4", errors.nomeResponsavel ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.nomeResponsavel && (
                      <small className="text-red-500 mx-3">{errors.nomeResponsavel.message}</small>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="emailResponsavel" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Email Responsável <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="emailResponsavel"
                      control={control}
                      rules={{
                        required: "Email do Responsável é obrigatório",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido",
                        },
                      }}
                      render={({ field }) => (
                        <InputText
                          id="emailResponsavel"
                          {...field}
                          type="email"
                          placeholder="responsavel@gmail.com"
                          className={classNames(baseStyle, "pr-4", errors.emailResponsavel ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.emailResponsavel && (
                      <small className="text-red-500 mx-3">{errors.emailResponsavel.message}</small>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="telefoneResponsavel" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Telefone Responsável <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="telefoneResponsavel"
                      control={control}
                      rules={{ required: "Telefone do Responsável é obrigatório" }}
                      render={({ field }) => (
                        <InputMask
                          id="telefoneResponsavel"
                          {...field}
                          mask="(99) 99999-9999"
                          placeholder="(00) 00000-0000"
                          className={classNames(
                            baseStyle,
                            "pr-4",
                            errors.telefoneResponsavel ? errorStyle : normalStyle,
                          )}
                        />
                      )}
                    />
                    {errors.telefoneResponsavel && (
                      <small className="text-red-500 mx-3">{errors.telefoneResponsavel.message}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Endereço */}
          {activeStep === 1 && (
            <div>
              <div className="md:py-8 py-2">
                <div
                  className="flex items-center gap-3 md:mb-8 mb-4 px-4"
                  style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                >
                  <div className="text-center w-full">
                    <h3 className="md:text-xl text-lg font-semibold text-foreground pb-1">Localização</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">Endereço do seu estabelecimento</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="cep" className="text-sm font-medium text-foreground mb-1 mx-3">
                      CEP <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="cep"
                      control={control}
                      rules={{ required: "CEP é obrigatório" }}
                      render={({ field }) => (
                        <InputMask
                          id="cep"
                          {...field}
                          mask="99999-999"
                          placeholder="00000-000"
                          className={classNames(baseStyle, "pr-4", errors.cep ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.cep && <small className="text-red-500 mx-3">{errors.cep.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="estado" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Estado <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="estado"
                      control={control}
                      rules={{ required: "Estado é obrigatório" }}
                      render={({ field }) => (
                        <Dropdown
                          id="estado"
                          {...field}
                          options={estados}
                          placeholder="Selecione"
                          pt={dropdownPassThrough}
                          name="estado" // Passando o nome para o PassThrough
                        />
                      )}
                    />
                    {errors.estado && <small className="text-red-500 mx-3">{errors.estado.message}</small>}
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label htmlFor="rua" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Rua <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="rua"
                      control={control}
                      rules={{ required: "Rua é obrigatória" }}
                      render={({ field }) => (
                        <InputText
                          id="rua"
                          {...field}
                          placeholder="Nome da rua"
                          className={classNames(baseStyle, "pr-4", errors.rua ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.rua && <small className="text-red-500 mx-3">{errors.rua.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="numero" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Número <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="numero"
                      control={control}
                      rules={{ required: "Número é obrigatório" }}
                      render={({ field }) => (
                        <InputText
                          id="numero"
                          {...field}
                          placeholder="123"
                          className={classNames(baseStyle, "pr-4", errors.numero ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.numero && <small className="text-red-500 mx-3">{errors.numero.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="complemento" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Complemento
                    </label>
                    <Controller
                      name="complemento"
                      control={control}
                      render={({ field }) => (
                        <InputText
                          id="complemento"
                          {...field}
                          placeholder="Sala, andar, etc."
                          className={classNames(baseStyle, "pr-4", normalStyle)}
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="bairro" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Bairro <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="bairro"
                      control={control}
                      rules={{ required: "Bairro é obrigatório" }}
                      render={({ field }) => (
                        <InputText
                          id="bairro"
                          {...field}
                          placeholder="Nome do bairro"
                          className={classNames(baseStyle, "pr-4", errors.bairro ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.bairro && <small className="text-red-500 mx-3">{errors.bairro.message}</small>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="cidade" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Cidade <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="cidade"
                      control={control}
                      rules={{ required: "Cidade é obrigatória" }}
                      render={({ field }) => (
                        <InputText
                          id="cidade"
                          {...field}
                          placeholder="Nome da cidade"
                          className={classNames(baseStyle, "pr-4", errors.cidade ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.cidade && <small className="text-red-500 mx-3">{errors.cidade.message}</small>}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Acesso */}
          {activeStep === 2 && (
            <div>
              <div className="md:py-8 py-2">
                <div
                  className="flex items-center gap-3 md:mb-8 mb-4 px-4"
                  style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                >
                  <div className="text-center w-full">
                    <h3 className="md:text-xl text-lg font-semibold text-foreground pb-1">Acesso</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">
                      Cadastre o acesso administrativo do seu estabelecimento
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col">
                    <label htmlFor="login" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Login <span className="text-destructive">*</span>
                    </label>
                    <Controller
                      name="login"
                      control={control}
                      rules={{ required: "Login é obrigatório" }}
                      render={({ field }) => (
                        <InputText
                          id="login"
                          {...field}
                          placeholder="login de acesso"
                          className={classNames(baseStyle, "pr-4", errors.login ? errorStyle : normalStyle)}
                        />
                      )}
                    />
                    {errors.login && <small className="text-destructive mx-3">{errors.login.message}</small>}
                  </div>

                  {/* --- CAMPO SENHA --- */}
                  <div className="flex flex-col relative">
                    <label htmlFor="senha" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Senha <span className="text-destructive">*</span>
                    </label>

                    <Controller
                      name="senha"
                      control={control}
                      rules={{
                        required: "Senha é obrigatória",
                        validate: {
                          // Mude para o formato de objeto
                          strength: (value) =>
                            validarSenhaForte(value) ||
                            "A senha deve atender os requisitos: \nPelo menos 6 caracteres,\nUma letra maiúscula,\nUm número,\nE um caractere especial",
                        },
                      }}
                      render={({ field }) => (
                        <div className="relative">
                          <InputText
                            id="senha"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite uma senha forte"
                            pt={passwordInputPassThrough}
                            name="senha"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      )}
                    />

                    {errors.senha && (
                      <small className="text-red-500 text-sm whitespace-pre-line mx-3">{errors.senha.message}</small>
                    )}
                  </div>

                  {/* --- CAMPO CONFIRMAÇÃO DE SENHA --- */}
                  <div className="flex flex-col relative">
                    <label htmlFor="confSenha" className="text-sm font-medium text-foreground mb-1 mx-3">
                      Confirmação da Senha <span className="text-destructive">*</span>
                    </label>

                    <Controller
                      name="confSenha"
                      control={control}
                      rules={{
                        required: "Confirmação de senha é obrigatória", // Mensagem mais específica
                        validate: {
                          // Mude para o formato de objeto
                          // 1. (Opcional) Validar a força aqui também
                          strength: (value) =>
                            validarSenhaForte(value) ||
                            "A senha deve atender os requisitos: \nPelo menos 6 caracteres,\nUma letra maiúscula,\nUm número,\nE um caractere especial",

                          // 2. AQUI ESTÁ A FUNÇÃO DE VALIDAÇÃO DE COINCIDÊNCIA
                          match: (
                            value, // 'value' é o valor de 'confSenha'
                          ) =>
                            value === getValues("senha") || // Compara com o valor de 'senha'
                            "As senhas não coincidem", // Mensagem de erro específica
                        },
                      }}
                      render={({ field }) => (
                        <div className="relative">
                          <InputText
                            id="confSenha"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite a senha novamente" // Placeholder melhor
                            pt={passwordInputPassThrough}
                            name="confSenha"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      )}
                    />

                    {/* O RHF mostrará a mensagem de 'strength' ou 'match', qual falhar primeiro */}
                    {errors.confSenha && (
                      <small className="text-red-500 text-sm whitespace-pre-line mx-3">
                        {errors.confSenha.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Tema */}
          {activeStep === 3 && (
            <div>
              <div className="md:py-8 py-2">
                <div
                  className="flex items-center gap-3 md:mb-8 mb-4 px-4"
                  style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                >
                  <div className="text-center w-full">
                    <h3 className="md:text-xl text-lg font-semibold text-foreground pb-1">Tema</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">
                      Selecione o tema que será usado no sistema <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>

                <Controller
                  name="tema"
                  control={control}
                  rules={{ required: "Selecione um tema para continuar" }}
                  render={({ field }) => (
                    <ThemeSelector
                      themes={themes}
                      selectedTheme={field.value ? themes[field.value as keyof typeof themes] : null}
                      onThemeSelect={(theme) => field.onChange(theme.id)}
                    />
                  )}
                />
                {errors.tema && <small className="text-red-500 mx-3 block mt-2">{errors.tema.message}</small>}

                {/* Preview of selected theme */}
                {temaValue && themes[temaValue as keyof typeof themes] && (
                  <div className="mt-8 rounded-xl border bg-card p-6">
                    <h3 className="text-lg font-semibold mb-2">Tema Selecionado</h3>
                    <p className="text-muted-foreground">
                      {themes[temaValue as keyof typeof themes].name} - {themes[temaValue as keyof typeof themes].type}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Pagamento */}
          {activeStep === 4 && (
            <div>
              <div className="md:py-8 py-2">
                <div
                  className="flex items-center gap-3 md:mb-8 mb-4 px-4"
                  style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                >
                  <div className="text-center w-full">
                    <h3 className="md:text-xl text-lg font-semibold text-foreground pb-1">Plano</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">
                      Escolha seu plano e forma de pagamento <span className="text-red-500">*</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 mb-10">
                  <Controller
                    name="planoId"
                    control={control}
                    rules={{ required: "Selecione um plano para continuar" }}
                    render={({ field }) => (
                      <PlanoSelector
                        planos={planos}
                        selectedPlano={planos.find((p) => String(p.id) === String(planoIdValue))}
                        setSelectedPlano={(plano) => field.onChange(plano.id)}
                      />
                    )}
                  />
                  {errors.planoId && <small className="text-red-500 mx-3 block mt-2">{errors.planoId.message}</small>}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="plano" className="text-sm font-medium text-foreground mb-1 mx-3">
                        Periodicidade <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="plano"
                        control={control}
                        rules={{ required: "Periodicidade é obrigatória" }}
                        render={({ field }) => (
                          <Dropdown
                            id="plano"
                            {...field}
                            options={[
                              { value: "mensal", label: "Mensal" },
                              { value: "anual", label: "Anual" },
                            ]}
                            placeholder="Selecione um plano"
                            pt={dropdownPassThrough}
                            name="plano"
                            style={{ paddingInline: "15px" }}
                          />
                        )}
                      />
                      {errors.plano && <small className="text-red-500 mx-3">{errors.plano.message}</small>}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="formaPagamento" className="text-sm font-medium text-foreground  mb-1 mx-3">
                        Forma de Pagamento <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="formaPagamento"
                        control={control}
                        rules={{ required: "Forma de pagamento é obrigatória" }}
                        render={({ field }) => (
                          <Dropdown
                            id="formaPagamento"
                            {...field}
                            options={formasPagamento}
                            placeholder="Selecione"
                            pt={dropdownPassThrough}
                            name="formaPagamento"
                            style={{ paddingInline: "15px" }}
                          />
                        )}
                      />
                      {errors.formaPagamento && (
                        <small className="text-red-500 mx-3">{errors.formaPagamento.message}</small>
                      )}
                    </div>
                  </div>

                  {getValues("formaPagamento") === "credito" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <label htmlFor="numeroCartao" className="text-sm font-medium text-foreground  mb-1 mx-3">
                          Número do Cartão <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name="numeroCartao"
                          control={control}
                          rules={{
                            required:
                              getValues("formaPagamento") === "credito" ? "Número do cartão é obrigatório" : false,
                            pattern: {
                              value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                              message: "Número do cartão inválido",
                            },
                          }}
                          render={({ field }) => (
                            <InputMask
                              id="numeroCartao"
                              {...field}
                              mask="9999 9999 9999 9999"
                              placeholder="0000 0000 0000 0000"
                              className={classNames(baseStyle, "pr-4", errors.numeroCartao ? errorStyle : normalStyle)}
                            />
                          )}
                        />
                        {errors.numeroCartao && (
                          <small className="text-red-500 mx-3">{errors.numeroCartao.message}</small>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="nomeCartao" className="text-sm font-medium text-foreground  mb-1 mx-3">
                          Nome no Cartão <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name="nomeCartao"
                          control={control}
                          rules={{
                            required:
                              getValues("formaPagamento") === "credito" ? "Nome no cartão é obrigatório" : false,
                          }}
                          render={({ field }) => (
                            <InputText
                              id="nomeCartao"
                              {...field}
                              placeholder="Nome como está no cartão"
                              className={classNames(baseStyle, "pr-4", errors.nomeCartao ? errorStyle : normalStyle)}
                            />
                          )}
                        />
                        {errors.nomeCartao && <small className="text-red-500 mx-3">{errors.nomeCartao.message}</small>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <label htmlFor="validadeCartao" className="text-sm font-medium text-foreground  mb-1 mx-3">
                            Validade <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name="validadeCartao"
                            control={control}
                            rules={{
                              required: getValues("formaPagamento") === "credito" ? "Validade é obrigatória" : false,
                              pattern: {
                                value: /^\d{2}\/\d{2}$/,
                                message: "Validade inválida (use MM/AA)",
                              },
                            }}
                            render={({ field }) => (
                              <InputMask
                                id="validadeCartao"
                                {...field}
                                mask="99/99"
                                placeholder="MM/AA"
                                className={classNames(
                                  baseStyle,
                                  "pr-4",
                                  errors.validadeCartao ? errorStyle : normalStyle,
                                )}
                              />
                            )}
                          />
                          {errors.validadeCartao && (
                            <small className="text-red-500 mx-3">{errors.validadeCartao.message}</small>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="cvv" className="text-sm font-medium text-foreground  mb-1 mx-3">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name="cvv"
                            control={control}
                            rules={{
                              required: getValues("formaPagamento") === "credito" ? "CVV é obrigatório" : false,
                              pattern: {
                                value: /^\d{3}$/,
                                message: "CVV inválido (3 dígitos)",
                              },
                            }}
                            render={({ field }) => (
                              <InputMask
                                id="cvv"
                                {...field}
                                mask="999"
                                placeholder="000"
                                className={classNames(baseStyle, "pr-4", errors.cvv ? errorStyle : normalStyle)}
                              />
                            )}
                          />
                          {errors.cvv && <small className="text-red-500 mx-3">{errors.cvv.message}</small>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Confirmação */}
          {activeStep === 5 && (
            <div>
              <div className="md:py-8 py-2">
                <div
                  className="flex items-center gap-3 md:mb-8 mb-4 px-4"
                  style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
                >
                  <div className="text-center w-full">
                    <h3 className="md:text-xl text-lg font-semibold text-foreground pb-1">Confirmação</h3>
                    <p className="md:text-sm text-xs text-muted-foreground">
                      Confira as principais informações para contratação
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="rounded-xl border bg-card p-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Dados da Empresa
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>CNPJ:</strong> {getValues("cnpj")}
                      </p>
                      <p>
                        <strong>Razão Social:</strong> {getValues("razaoSocial")}
                      </p>
                      <p>
                        <strong>Nome Fantasia:</strong> {getValues("nomeFantasia")}
                      </p>
                      <p>
                        <strong>Email:</strong> {getValues("email")}
                      </p>
                      <p>
                        <strong>Telefone:</strong> {getValues("telefone")}
                      </p>
                      <p>
                        <strong>Responsável:</strong> {getValues("nomeResponsavel")}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Endereço
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>CEP:</strong> {getValues("cep")}
                      </p>
                      <p>
                        <strong>Endereço:</strong> {getValues("rua")}, {getValues("numero")}{" "}
                        {getValues("complemento") && `- ${getValues("complemento")}`}
                      </p>
                      <p>
                        <strong>Bairro:</strong> {getValues("bairro")}
                      </p>
                      <p>
                        <strong>Cidade/Estado:</strong> {getValues("cidade")} - {getValues("estado")}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Tema Selecionado
                    </h4>
                    <div className="space-y-2 text-sm">
                      {temaValue && themes[temaValue as keyof typeof themes] && (
                        <>
                          <p>
                            <strong>Nome:</strong> {themes[temaValue as keyof typeof themes].name}
                          </p>
                          <p>
                            <strong>Tipo:</strong> {themes[temaValue as keyof typeof themes].type}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <div
                              className="h-8 w-16 rounded"
                              style={{ backgroundColor: themes[temaValue as keyof typeof themes].colors.primary }}
                              title="Cor primária"
                            />
                            <div
                              className="h-8 w-16 rounded"
                              style={{ backgroundColor: themes[temaValue as keyof typeof themes].colors.secondary }}
                              title="Cor secundária"
                            />
                            <div
                              className="h-8 w-16 rounded"
                              style={{ backgroundColor: themes[temaValue as keyof typeof themes].colors.accent }}
                              title="Cor de destaque"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border bg-card p-6">
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Plano e Pagamento
                    </h4>
                    <div className="space-y-2 text-sm">
                      {planoIdValue && planos.find((p) => String(p.id) === String(planoIdValue)) && (
                        <>
                          <p>
                            <strong>Plano:</strong> {planos.find((p) => String(p.id) === String(planoIdValue))?.nome}
                          </p>
                          <p>
                            <strong>Periodicidade:</strong> {getValues("plano") === "mensal" ? "Mensal" : "Anual"}
                          </p>
                          <p>
                            <strong>Valor:</strong> R${" "}
                            {getValues("plano") === "mensal"
                              ? planos
                                  .find((p) => String(p.id) === String(planoIdValue))
                                  ?.precoMensal.toFixed(2)
                                  .replace(".", ",")
                              : planos
                                  .find((p) => String(p.id) === String(planoIdValue))
                                  ?.precoAnual.toFixed(2)
                                  .replace(".", ",")}
                            /mês
                          </p>
                          <p>
                            <strong>Forma de Pagamento:</strong>{" "}
                            {formasPagamento.find((f) => f.value === getValues("formaPagamento"))?.label}
                          </p>
                          {getValues("formaPagamento") === "credito" && (
                            <p>
                              <strong>Cartão:</strong> **** **** **** {getValues("numeroCartao")?.slice(-4)}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// StepperFooter
// ----------------------------------------------------------------------
interface StepperFooterProps {
  activeStep: number
  steps: Step[]
  handleBack: () => void
  handleNext: () => void
  isCurrentStepValid: () => boolean
}

const StepperFooter: React.FC<StepperFooterProps> = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  isCurrentStepValid,
}) => {
  const isLastStep = activeStep === steps.length - 1
  const isFirstStep = activeStep === 0

  return (
    <div className="flex justify-between pt-3 border-border">
      <Button
        label="Voltar"
        severity="secondary"
        icon="pi pi-arrow-left"
        onClick={handleBack}
        type="button"
        disabled={isFirstStep}
        className="bg-gray-100 hover:bg-gray-200  text-secondary-foreground rounded-xl border-2 border-gray-300/80 shadow hover:scale-105 transition-all px-6 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        // style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
      />

      {isLastStep ? (
        <Button
          label="Finalizar Cadastro"
          icon="pi pi-check"
          iconPos="right"
          type="submit"
          className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-6 py-3"
        />
      ) : (
        <Button
          label="Próximo"
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={handleNext}
          type="button"
          disabled={!isCurrentStepValid()}
          className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl text-white border-0 shadow hover:scale-105 transition-all px-6 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}
        />
      )}
    </div>
  )
}

// Componente Principal
// ----------------------------------------------------------------------

export default function Cadastro() {
  // const stepperRef = useRef<any>(null) // Este ref não parece estar sendo usado para 'nextCallback' ou 'prevCallback'
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const theme = themes.belloryElegante;

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      plano: "basico",
      formaPagamento: "credito",
      tema: "",
      planoId: "",
    },
  })

  // 2. CHAMAR useWatch
  // Isso força o componente 'Cadastro' a re-renderizar em CADA mudança de valor,
  // o que faz com que 'isCurrentStepValid()' seja chamada novamente.
  useWatch({ control })
  const senhaValue = watch("senha")

  useEffect(() => {
    // Apenas acione a validação se o campo 'confSenha' já foi preenchido
    // Isso evita mostrar um erro antes que o usuário tenha a chance de digitar
    if (getValues("confSenha")) {
      trigger("confSenha")
    }
  }, [senhaValue, trigger, getValues])

  const estados = [
    { label: "São Paulo", value: "SP" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Bahia", value: "BA" },
    { label: "Paraná", value: "PR" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Pernambuco", value: "PE" },
    { label: "Ceará", value: "CE" },
    { label: "Pará", value: "PA" },
    { label: "Santa Catarina", value: "SC" },
  ]
  const planos = [
    {
      id: "gratuito",
      nome: "PLANO GRATUITO",
      descricaoBreve: "Avalie se a nossa solucao faz sentido para o negocio",
      precoMensal: 0.0,
      precoAnual: 0.0, // preço mensal no plano anual
      icone: <Scissors size={28} color="#C0921A" />,
      destaque: false,
      beneficios: [
        "Agendamentos limitados",
        "Agendamentos limitados",
        "Cadastro de clientes limitados",
        "Cadastro de funcionarios limitados",
        "Cadastro de servicos limitados",
        "Acesso a dashboards inteligentes que mostram a evolucao do seu negocio",
      ],
      naoIncluido: ["Produtos exclusivos", "Atendimento VIP", "Serviços premium", "Acesso a eventos exclusivos"],
      className: "scale-90",
    },
    {
      id: "basico",
      nome: "PLANO BASICO",
      descricaoBreve: "Cuidados essenciais para sua beleza",
      precoMensal: 79.9,
      precoAnual: 64.9, // preço mensal no plano anual
      icone: <Scissors size={28} color="#C0921A" />,
      destaque: false,
      beneficios: [
        "2 cortes de cabelo por mês",
        "1 tratamento capilar por mês",
        "10% de desconto em produtos",
        "Agendamento prioritário",
        "Chá ou espumante grátis durante o atendimento",
      ],
      naoIncluido: ["Produtos exclusivos", "Atendimento VIP", "Serviços premium", "Acesso a eventos exclusivos"],
      className: "scale-90",
    },
    {
      id: "plus",
      nome: "PLANO PLUS",
      descricaoBreve: "Experiência completa de beleza e bem-estar",
      precoMensal: 129.9,
      precoAnual: 99.9, // preço mensal no plano anual
      icone: <Scissors size={28} color="#C0921A" />,
      destaque: false,
      beneficios: [
        "Cortes de cabelo ilimitados",
        "2 tratamentos capilares por mês",
        "1 tratamento facial por mês",
        "20% de desconto em produtos",
        "Kit de produtos exclusivos trimestralmente",
        "Agendamento VIP com horários exclusivos",
        "Chá, espumante ou drink especial grátis durante o atendimento",
        "Acesso a eventos exclusivos para membros",
      ],
      naoIncluido: [],
      className: "",
    },
    {
      id: "premium",
      nome: "PLANO PREMIUM",
      descricaoBreve: "Experiência completa de beleza e bem-estar",
      precoMensal: 249.9,
      precoAnual: 199.9,
      icone: <Crown size={28} color="#C0921A" />,
      destaque: true,
      beneficios: [
        "Cortes de cabelo ilimitados",
        "2 tratamentos capilares por mês",
        "1 tratamento facial por mês",
        "20% de desconto em produtos",
        "Kit de produtos exclusivos trimestralmente",
        "Agendamento VIP com horários exclusivos",
        "Chá, espumante ou drink especial grátis durante o atendimento",
        "Acesso a eventos exclusivos para membros",
      ],
      naoIncluido: [],
      className: "",
    },
  ]

  const formasPagamento = [
    { label: "Cartão de Crédito", value: "credito" },
    { label: "Boleto Bancário", value: "boleto" },
    { label: "PIX", value: "pix" },
  ]

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (activeStep === 0) {
      fieldsToValidate = [
        "cnpj",
        "razaoSocial",
        "nomeFantasia",
        "email",
        "telefone",
        "nomeResponsavel",
        "emailResponsavel",
        "telefoneResponsavel",
      ]
    } else if (activeStep === 1) {
      fieldsToValidate = ["cep", "rua", "numero", "bairro", "cidade", "estado"]
    } else if (activeStep === 2) {
      fieldsToValidate = ["login", "senha", "confSenha"]
    } else if (activeStep === 3) {
      fieldsToValidate = ["tema"]
    } else if (activeStep === 4) {
      fieldsToValidate = ["planoId", "plano", "formaPagamento"]

      if (getValues("formaPagamento") === "credito") {
        fieldsToValidate.push("numeroCartao", "nomeCartao", "validadeCartao", "cvv")
      }
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setDirection("forward")
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps([...completedSteps, activeStep])
      }
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    setDirection("backward")
    setActiveStep(activeStep - 1)
  }

  const onSubmit = (data: FormData) => {
    const planoSelecionado = planos.find((p) => p.id === data.planoId)
    const temaSelecionado = themes[data.tema as keyof typeof themes]

    const dadosCompletos = {
      empresa: {
        cnpj: data.cnpj,
        razaoSocial: data.razaoSocial,
        nomeFantasia: data.nomeFantasia,
        inscricaoEstadual: data.inscricaoEstadual,
        email: data.email,
        telefone: data.telefone,
        responsavel: {
          nome: data.nomeResponsavel,
          email: data.emailResponsavel,
          telefone: data.telefoneResponsavel,
        },
      },
      endereco: {
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
      },
      acesso: {
        login: data.login,
        senha: data.senha, // Em produção, nunca envie a senha em texto plano!
      },
      tema: {
        id: data.tema,
        nome: temaSelecionado?.name,
        tipo: temaSelecionado?.type,
        cores: temaSelecionado?.colors,
      },
      plano: {
        id: data.planoId,
        nome: planoSelecionado?.nome,
        periodicidade: data.plano,
        valor: data.plano === "mensal" ? planoSelecionado?.precoMensal : planoSelecionado?.precoAnual,
        formaPagamento: data.formaPagamento,
        ...(data.formaPagamento === "credito" && {
          dadosCartao: {
            numero: data.numeroCartao,
            nome: data.nomeCartao,
            validade: data.validadeCartao,
            cvv: data.cvv, // Em produção, nunca envie o CVV!
          },
        }),
      },
    }

    console.log("[v0] Dados completos do cadastro:", JSON.stringify(dadosCompletos))
    setIsSubmitted(true)
  }

  // Agora, esta função será chamada em CADA renderização (em cada keystroke)
  // porque o 'useWatch' força o componente a renderizar novamente.
  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      const values = getValues()
      return !!(
        values.cnpj &&
        values.razaoSocial &&
        values.nomeFantasia &&
        values.email &&
        values.telefone &&
        values.nomeResponsavel &&
        values.emailResponsavel &&
        values.telefoneResponsavel
      )
    } else if (activeStep === 1) {
      const values = getValues()
      return !!(values.cep && values.rua && values.numero && values.bairro && values.cidade && values.estado)
    } else if (activeStep === 2) {
      const values = getValues()
      return !!(values.login && values.senha && values.confSenha)
    } else if (activeStep === 3) {
      const values = getValues()
      return !!values.tema
    } else if (activeStep === 4) {
      const values = getValues()
      const basicValid = !!(values.planoId && values.plano && values.formaPagamento)

      if (values.formaPagamento === "credito") {
        return basicValid && !!(values.numeroCartao && values.nomeCartao && values.validadeCartao && values.cvv)
      }

      return basicValid
    }
    return true
  }

  if (isSubmitted) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-12 bg-card border border-border shadow-lg">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-accent" />
              </motion.div>

              <h1 className="text-4xl font-serif font-bold mb-4 text-foreground">Cadastro Realizado!</h1>

              <p className="text-lg text-muted-foreground mb-8">
                Seu cadastro foi realizado com sucesso. Em breve você receberá um email com as instruções para acessar
                sua conta.
              </p>

              <Button
                label="Voltar para Home"
                className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-8 py-3 text-base font-medium"
              />
            </Card>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-10"
      style={{ color: theme.colors.text, background: theme.colors.background }}
    >
      {/* <Header /> */}

      <Header />

      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full translate-x-1/2 -translate-y-1/2"
        style={{ background: theme.colors.primary + "40" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full -translate-x-1/2 translate-y-1/2"
        style={{ background: theme.colors.primary + "40" }}
      ></div>

      <div className="container mx-auto px-1 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          <div
            className="p-2 sm:p-8 mt-4 bg-card border border-border shadow-xl rounded-3xl"
            style={{ backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }}
          >
            <div className="text-center md:mb-10 mt-2 md:mt-0" style={{ filter: "drop-shadow(2px 2px 2px #11111140)" }}>
              <h1 className="text-xl md:text-4xl font-bold text-foreground">Cadastro</h1>
              <p className="md:text-lg text-sm text-muted-foreground">
                Complete as informações abaixo para criar sua empresa
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <StepperHeader activeStep={activeStep} completedSteps={completedSteps} steps={steps} />
              <StepperMain
                activeStep={activeStep}
                direction={direction}
                control={control}
                errors={errors}
                getValues={getValues}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                estados={estados}
                planos={planos}
                formasPagamento={formasPagamento}
                setValue={setValue} // Passando setValue
              />
              <StepperFooter
                activeStep={activeStep}
                steps={steps}
                handleBack={handleBack}
                handleNext={handleNext}
                isCurrentStepValid={isCurrentStepValid}
              />
            </form>
          </div>

          <div className="text-center mt-8">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Voltar para Home
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
