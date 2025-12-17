"use client"

import { Header } from "@/components/header"
import { useState } from "react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { Dropdown } from "primereact/dropdown"
import { useForm, Controller, useWatch } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Building2, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  KeyRound, 
  Eye,
  EyeOff,
  Check,
  Palette,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface FormData {
  // Step 1: Informações da Empresa
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

  // Step 3: Acesso
  login: string
  senha: string
  confSenha: string

  // Step 4: Tema
  tema: string

  // Step 5: Pagamento
  planoId: string
  plano: string
  formaPagamento: string
  numeroCartao: string
  nomeCartao: string
  validadeCartao: string
  cvv: string
}

const steps = [
  { id: 0, label: "Empresa", icon: Building2, color: "#db6f57" },
  { id: 1, label: "Localização", icon: MapPin, color: "#4f6f64" },
  { id: 2, label: "Acesso", icon: KeyRound, color: "#8b3d35" },
  { id: 3, label: "Tema", icon: Palette, color: "#db6f57" },
  { id: 4, label: "Pagamento", icon: CreditCard, color: "#4f6f64" },
]

export default function Cadastro() {
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      planoId: "3",
      plano: "mensal",
      formaPagamento: "credito",
      tema: "feminine"
    },
  })

  // Watch para validação em tempo real
  useWatch({ control })

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
      id: "1",
      nome: "Gratuito",
      precoMensal: 0,
      precoAnual: 0,
    },
    {
      id: "2",
      nome: "Básico",
      precoMensal: 79.90,
      precoAnual: 64.90,
    },
    {
      id: "3",
      nome: "Plus",
      precoMensal: 129.90,
      precoAnual: 99.90,
    },
    {
      id: "4",
      nome: "Premium",
      precoMensal: 199.90,
      precoAnual: 159.90,
    },
  ]

  const formasPagamento = [
    { label: "Cartão de Crédito", value: "credito" },
    { label: "Boleto Bancário", value: "boleto" },
    { label: "PIX", value: "pix" },
  ]

  const temas = [
    { label: "Elegância Feminina", value: "feminine" },
    { label: "Masculino Moderno", value: "masculine" },
    { label: "Natural & Zen", value: "natural" },
  ]

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (activeStep === 0) {
      fieldsToValidate = [
        "cnpj", "razaoSocial", "nomeFantasia", "email", "telefone",
        "nomeResponsavel", "emailResponsavel", "telefoneResponsavel"
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
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps([...completedSteps, activeStep])
      }
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const onSubmit = (data: FormData) => {
    console.log("Cadastro:", data)
    setIsSubmitted(true)
  }

  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      const values = getValues()
      return !!(
        values.cnpj && values.razaoSocial && values.nomeFantasia &&
        values.email && values.telefone && values.nomeResponsavel &&
        values.emailResponsavel && values.telefoneResponsavel
      )
    } else if (activeStep === 1) {
      const values = getValues()
      return !!(values.cep && values.rua && values.numero && values.bairro && values.cidade && values.estado)
    } else if (activeStep === 2) {
      const values = getValues()
      return !!(values.login && values.senha && values.confSenha && values.senha === values.confSenha)
    } else if (activeStep === 3) {
      return !!getValues("tema")
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

  // Tela de sucesso
  if (isSubmitted) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf8f6] to-white">
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23db6f57' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-12 bg-white border-2 border-[#d8ccc4] rounded-3xl shadow-2xl">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5a7a6e] to-[#4f6f64] flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h1 className="font-serif text-4xl font-bold mb-4 text-[#2a2420]">
                Cadastro Realizado!
              </h1>

              <p className="text-lg text-[#4f6f64] mb-8 leading-relaxed">
                Seu cadastro foi realizado com sucesso!<br />
                Em breve você receberá um email com as instruções para acessar sua conta.
              </p>

              <Link href="/">
                <Button
                  label="Voltar para Home"
                  icon={<ArrowRight className="mr-2" size={16} />}
                  iconPos="right"
                  className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:scale-105 transition-all px-10 py-4 rounded-xl font-bold shadow-lg"
                />
              </Link>
            </Card>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-10 pb-16 bg-gradient-to-b from-[#faf8f6] to-white">
      {/* <Header /> */}

      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Blobs animados */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#db6f57]/20 to-[#8b3d35]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header do cadastro */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#db6f57]/10 to-[#8b3d35]/10 border border-[#db6f57]/20 mb-6"
            >
              <Sparkles className="w-5 h-5 text-[#db6f57]" />
              <span className="font-bold text-[#8b3d35] text-sm uppercase tracking-wide">
                Comece Gratuitamente
              </span>
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2a2420] mb-4">
              Crie sua conta no Bellory
            </h1>
            <p className="text-lg text-[#4f6f64] max-w-2xl mx-auto">
              Preencha os dados abaixo para começar a transformar seu negócio
            </p>
          </div>

          <Card className="p-8 bg-white border-2 border-[#d8ccc4] rounded-3xl shadow-2xl">
            
            {/* Stepper Header */}
            <div className="mb-12">
              <div className="flex items-center justify-between px-4">
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.includes(step.id)
                  const isActive = activeStep === step.id
                  const StepIcon = step.icon

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.1 : 1,
                          }}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isCompleted
                              ? "bg-gradient-to-br from-[#5a7a6e] to-[#4f6f64] text-white shadow-lg"
                              : isActive
                              ? "border-2 text-white shadow-xl"
                              : "bg-[#e6d9d4] text-[#4f6f64]"
                          }`}
                          style={isActive && !isCompleted ? {
                            background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                            borderColor: step.color
                          } : {}}
                        >
                          {isCompleted ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-6 h-6" />
                          )}
                        </motion.div>
                        <span className={`hidden md:block text-xs mt-3 font-semibold transition-colors ${
                          isActive ? "text-[#2a2420]" : "text-[#4f6f64]"
                        }`}>
                          {step.label}
                        </span>
                      </div>

                      {index < steps.length - 1 && (
                        <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                          isCompleted ? "bg-gradient-to-r from-[#5a7a6e] to-[#4f6f64]" : "bg-[#e6d9d4]"
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[400px]"
                >
                  {/* Step 0: Empresa */}
                  {activeStep === 0 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#db6f57]/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-[#db6f57]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Informações da Empresa</h3>
                          <p className="text-sm text-[#4f6f64]">Dados legais do estabelecimento</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            CNPJ <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="cnpj"
                            control={control}
                            rules={{ required: "CNPJ é obrigatório" }}
                            render={({ field }) => (
                              <InputMask
                                {...field}
                                mask="99.999.999/9999-99"
                                placeholder="00.000.000/0000-00"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.cnpj ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.cnpj && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.cnpj.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Inscrição Estadual
                          </label>
                          <Controller
                            name="inscricaoEstadual"
                            control={control}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Opcional"
                                className="w-full px-4 py-3 border-2 border-[#d8ccc4] rounded-xl focus:border-[#db6f57] transition-all"
                              />
                            )}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Razão Social <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="razaoSocial"
                            control={control}
                            rules={{ required: "Razão Social é obrigatória" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome legal da empresa"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.razaoSocial ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.razaoSocial && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.razaoSocial.message}</small>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Nome Fantasia <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="nomeFantasia"
                            control={control}
                            rules={{ required: "Nome Fantasia é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Como seu negócio é conhecido"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.nomeFantasia ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.nomeFantasia && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.nomeFantasia.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Email da Empresa <span className="text-[#d15847]">*</span>
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
                                {...field}
                                type="email"
                                placeholder="contato@empresa.com"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.email ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.email && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.email.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Telefone da Empresa <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="telefone"
                            control={control}
                            rules={{ required: "Telefone é obrigatório" }}
                            render={({ field }) => (
                              <InputMask
                                {...field}
                                mask="(99) 99999-9999"
                                placeholder="(00) 00000-0000"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.telefone ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.telefone && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.telefone.message}</small>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Nome do Responsável <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="nomeResponsavel"
                            control={control}
                            rules={{ required: "Nome do Responsável é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome completo do responsável"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.nomeResponsavel ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.nomeResponsavel && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.nomeResponsavel.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Email do Responsável <span className="text-[#d15847]">*</span>
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
                                {...field}
                                type="email"
                                placeholder="responsavel@email.com"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.emailResponsavel ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.emailResponsavel && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.emailResponsavel.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Telefone do Responsável <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="telefoneResponsavel"
                            control={control}
                            rules={{ required: "Telefone do Responsável é obrigatório" }}
                            render={({ field }) => (
                              <InputMask
                                {...field}
                                mask="(99) 99999-9999"
                                placeholder="(00) 00000-0000"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.telefoneResponsavel ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                              />
                            )}
                          />
                          {errors.telefoneResponsavel && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.telefoneResponsavel.message}</small>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Endereço */}
                  {activeStep === 1 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-[#4f6f64]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Localização</h3>
                          <p className="text-sm text-[#4f6f64]">Endereço do estabelecimento</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            CEP <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="cep"
                            control={control}
                            rules={{ required: "CEP é obrigatório" }}
                            render={({ field }) => (
                              <InputMask
                                {...field}
                                mask="99999-999"
                                placeholder="00000-000"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.cep ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#4f6f64]"
                                }`}
                              />
                            )}
                          />
                          {errors.cep && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.cep.message}</small>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Rua <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="rua"
                            control={control}
                            rules={{ required: "Rua é obrigatória" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome da rua"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.rua ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#4f6f64]"
                                }`}
                              />
                            )}
                          />
                          {errors.rua && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.rua.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Número <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="numero"
                            control={control}
                            rules={{ required: "Número é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="000"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.numero ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#4f6f64]"
                                }`}
                              />
                            )}
                          />
                          {errors.numero && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.numero.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Complemento
                          </label>
                          <Controller
                            name="complemento"
                            control={control}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Opcional"
                                className="w-full px-4 py-3 border-2 border-[#d8ccc4] rounded-xl focus:border-[#4f6f64] transition-all"
                              />
                            )}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Bairro <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="bairro"
                            control={control}
                            rules={{ required: "Bairro é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome do bairro"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.bairro ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#4f6f64]"
                                }`}
                              />
                            )}
                          />
                          {errors.bairro && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.bairro.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Cidade <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="cidade"
                            control={control}
                            rules={{ required: "Cidade é obrigatória" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome da cidade"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.cidade ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#4f6f64]"
                                }`}
                              />
                            )}
                          />
                          {errors.cidade && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.cidade.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Estado <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="estado"
                            control={control}
                            rules={{ required: "Estado é obrigatório" }}
                            render={({ field }) => (
                              <Dropdown
                                {...field}
                                options={estados}
                                placeholder="Selecione"
                                className={`w-full ${errors.estado ? "border-[#d15847]" : ""}`}
                              />
                            )}
                          />
                          {errors.estado && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.estado.message}</small>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Acesso */}
                  {activeStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#8b3d35]/10 flex items-center justify-center">
                          <KeyRound className="w-6 h-6 text-[#8b3d35]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Acesso ao Sistema</h3>
                          <p className="text-sm text-[#4f6f64]">Crie suas credenciais</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Login/Usuário <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="login"
                            control={control}
                            rules={{ required: "Login é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Escolha um nome de usuário"
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.login ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#8b3d35]"
                                }`}
                              />
                            )}
                          />
                          {errors.login && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.login.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Senha <span className="text-[#d15847]">*</span>
                          </label>
                          <div className="relative">
                            <Controller
                              name="senha"
                              control={control}
                              rules={{
                                required: "Senha é obrigatória",
                                minLength: {
                                  value: 6,
                                  message: "Mínimo 6 caracteres"
                                }
                              }}
                              render={({ field }) => (
                                <InputText
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Mínimo 6 caracteres"
                                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${
                                    errors.senha ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#8b3d35]"
                                  }`}
                                />
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f6f64] hover:text-[#8b3d35]"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {errors.senha && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.senha.message}</small>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-[#2a2420] mb-2">
                            Confirmar Senha <span className="text-[#d15847]">*</span>
                          </label>
                          <div className="relative">
                            <Controller
                              name="confSenha"
                              control={control}
                              rules={{
                                required: "Confirme a senha",
                                validate: (value) =>
                                  value === watch("senha") || "As senhas não coincidem"
                              }}
                              render={({ field }) => (
                                <InputText
                                  {...field}
                                  type={showConfPassword ? "text" : "password"}
                                  placeholder="Digite a senha novamente"
                                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${
                                    errors.confSenha ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#8b3d35]"
                                  }`}
                                />
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfPassword(!showConfPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f6f64] hover:text-[#8b3d35]"
                            >
                              {showConfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {errors.confSenha && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.confSenha.message}</small>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Tema */}
                  {activeStep === 3 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#db6f57]/10 flex items-center justify-center">
                          <Palette className="w-6 h-6 text-[#db6f57]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Escolha seu Tema</h3>
                          <p className="text-sm text-[#4f6f64]">Personalize a identidade visual</p>
                        </div>
                      </div>

                      <Controller
                        name="tema"
                        control={control}
                        rules={{ required: "Selecione um tema" }}
                        render={({ field }) => (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {temas.map((tema) => (
                              <button
                                key={tema.value}
                                type="button"
                                onClick={() => field.onChange(tema.value)}
                                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                                  field.value === tema.value
                                    ? "border-[#db6f57] bg-[#db6f57]/10 shadow-lg"
                                    : "border-[#d8ccc4] hover:border-[#db6f57]/50"
                                }`}
                              >
                                <div className="text-center">
                                  <h4 className="font-bold text-lg text-[#2a2420] mb-2">{tema.label}</h4>
                                  {field.value === tema.value && (
                                    <Check className="w-6 h-6 text-[#db6f57] mx-auto" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      />
                      {errors.tema && (
                        <small className="text-[#d15847] text-sm mt-2 block text-center">{errors.tema.message}</small>
                      )}
                    </div>
                  )}

                  {/* Step 4: Pagamento */}
                  {activeStep === 4 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-[#4f6f64]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Informações de Pagamento</h3>
                          <p className="text-sm text-[#4f6f64]">Escolha seu plano</p>
                        </div>
                      </div>

                      <div className="bg-[#4f6f64]/10 rounded-2xl p-6 mb-6">
                        <p className="text-center text-[#2a2420] font-semibold">
                          ✅ 14 dias grátis • Sem cartão de crédito • Cancele quando quiser
                        </p>
                      </div>

                      <div className="text-center text-sm text-[#4f6f64]">
                        <p>Você pode começar gratuitamente e adicionar um método de pagamento depois.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Footer com botões */}
              <div className="flex justify-between items-center pt-8 border-t border-[#d8ccc4] mt-8">
                <Button
                  type="button"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  icon={<ArrowLeft className="mr-2 w-5 h-5" />}
                  label="Voltar"
                  className="bg-white text-[#4f6f64] border-2 border-[#d8ccc4] hover:border-[#4f6f64] hover:scale-105 transition-all px-8 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  outlined
                />

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    icon={<Check className="mr-2 w-5 h-5" />}
                    label="Finalizar Cadastro"
                    disabled={!isCurrentStepValid()}
                    className="bg-gradient-to-r from-[#5a7a6e] to-[#4f6f64] text-white border-0 hover:scale-105 transition-all px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    icon={<ArrowRight className="mr-2" size={16} />}
                    iconPos="right"
                    label="Próximo"
                    className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 hover:scale-105 transition-all px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
              </div>
            </form>
          </Card>

          <div className="text-center mt-8">
            <Link href="/" className="text-[#4f6f64] hover:text-[#db6f57] transition-colors font-medium">
              ← Voltar para Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}