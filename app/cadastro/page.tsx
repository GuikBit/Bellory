"use client"

import { Header } from "@/components/header"
import { useEffect, useRef, useState } from "react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { Dropdown } from "primereact/dropdown"
import { useForm, Controller, useWatch } from "react-hook-form"
import { motion, AnimatePresence, useInView } from "framer-motion"
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
  ArrowLeft,
  Zap,
  Crown,
  Gift,
  CheckCircle,
  X,
  User,
  Mail,
  Phone,
  FileText,
  MapPinned,
  Lock,
  Paintbrush
} from "lucide-react"
import Link from "next/link"
import { themes } from "@/utils/themes"
import { AddressForm } from "@/components/address-form-improved"
import { ThemeSelector } from "@/components/theme-selector-improved"
import { useMutationPostOrganizacao, useMutationValidaCNPJ, useMutationValidaEmail, useMutationValidaUsername } from "@/service/Querys/Organizacao"

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
  },
  fonts: any,
  borderRadius: any,
  spacing: any,
  shadows: any,
  transitions: any,
  opacity: any,
  zIndex: any,
  breakpoints: any,
  effects: any,
  components: any,
}

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
  publicoAlvo: string

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

  // Step 5: Plano
  planoId: string
  plano: string
  
  // Forma de Pagamento (opcional)
  formaPagamento?: string
  numeroCartao?: string
  nomeCartao?: string
  validadeCartao?: string
  cvv?: string
}

const steps = [
  { id: 0, label: "Empresa", icon: Building2, color: "#db6f57" },
  { id: 1, label: "Localização", icon: MapPin, color: "#4f6f64" },
  { id: 2, label: "Acesso", icon: KeyRound, color: "#8b3d35" },
  { id: 3, label: "Tema", icon: Palette, color: "#db6f57" },
  { id: 4, label: "Plano", icon: CreditCard, color: "#4f6f64" },
  { id: 5, label: "Confirmação", icon: CheckCircle, color: "#8b3d35" },
]

export default function Cadastro() {
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [isAnnual, setIsAnnual] = useState(false)

  const [cnpjFound, setCnpjFound] = useState(false)
  const [cnpjError, setCnpjError] = useState("")
  const [cnpjValid, setCnpjValid] = useState(false)

  const [emailFound, setEmailFound] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [emailValid, setEmailValid] = useState(false)

  // Novos estados para Username
  const [usernameFound, setUsernameFound] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [usernameValid, setUsernameValid] = useState(false)

  const {mutateAsync: postOrganizacao} = useMutationPostOrganizacao();
  const {mutateAsync: validaCNPJ, isPending} = useMutationValidaCNPJ();
  const {mutateAsync: validaEmail, isPending: isPendingEmail} = useMutationValidaEmail();
  const {mutateAsync: validaUsername, isPending: isPendingUsername} = useMutationValidaUsername();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      planoId: "",
      plano: "",
      tema: ""
    },
  })

  const cnpjValue = watch("cnpj")

useEffect(() => {
  const cnpjLimpo = cnpjValue?.replace(/\D/g, "") || ""
  
  if (cnpjLimpo.length === 14) {
    validaCNPJ(cnpjLimpo)
      .then((response) => {
        setCnpjFound(true)
        setCnpjValid(true)
        setCnpjError("✓ CNPJ válido e disponível")
      })
      .catch((error) => {
        setCnpjFound(true)
        setCnpjValid(false)
        const errorMessage = error?.response?.data?.message || "CNPJ inválido ou já cadastrado"
        setCnpjError(errorMessage)
      })
  } else if (cnpjLimpo.length < 14) {
    setCnpjFound(false)
    setCnpjValid(false)
    setCnpjError("")
  }
}, [cnpjValue, validaCNPJ])

const emailValue = watch("email")

useEffect(() => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  
  if (emailValue && emailRegex.test(emailValue)) {
    const timeoutId = setTimeout(() => {
      validaEmail(emailValue)
        .then((response) => {
          setEmailFound(true)
          setEmailValid(true)
          setEmailError("✓ Email disponível")
        })
        .catch((error) => {
          setEmailFound(true)
          setEmailValid(false)
          const errorMessage = error?.response?.data?.message || "Email já cadastrado"
          setEmailError(errorMessage)
        })
    }, 500) // Debounce de 500ms

    return () => clearTimeout(timeoutId)
  } else {
    setEmailFound(false)
    setEmailValid(false)
    setEmailError("")
  }
}, [emailValue, validaEmail])

// Nova validação de Username
const usernameValue = watch("login")

useEffect(() => {
  if (usernameValue && usernameValue.length >= 3) {
    const timeoutId = setTimeout(() => {
      validaUsername(usernameValue)
        .then((response) => {
          setUsernameFound(true)
          setUsernameValid(true)
          setUsernameError("✓ Username disponível")
        })
        .catch((error) => {
          setUsernameFound(true)
          setUsernameValid(false)
          const errorMessage = error?.response?.data?.message || "Username já cadastrado"
          setUsernameError(errorMessage)
        })
    }, 500) // Debounce de 500ms

    return () => clearTimeout(timeoutId)
  } else {
    setUsernameFound(false)
    setUsernameValid(false)
    setUsernameError("")
  }
}, [usernameValue, validaUsername])

  const publicoAlvoOptions = [
    { name: 'Masculino', code: 'M' },
    { name: 'Feminino', code: 'F' },
    { name: 'Unissex', code: 'U' }
  ]

  const themeArray = Object.values(themes) as Theme[]

  // Watch para validação em tempo real
  useWatch({ control })

  const planos = [
    {
      id: "gratuito",
      name: "Gratuito",
      tagline: "Experimente sem compromisso",
      price: 0,
      priceAnnual: 0,
      icon: Gift,
      color: "#4f6f64",
      gradient: "from-[#4f6f64] to-[#3d574f]",
      popular: false,
      features: [
        { text: "Até 50 agendamentos/mês", included: true },
        { text: "1 usuário", included: true },
        { text: "Cadastro de clientes", included: true },
        { text: "Agendamento manual", included: true },
        { text: "Dashboard básico", included: true },
        { text: "Agendamento online 24/7", included: false },
        { text: "Agente virtual no WhatsApp", included: false },
        { text: "Site personalizado", included: false },
      ],
      cta: "Começar grátis",
      badge: null
    },
    {
      id: "basico",
      name: "Básico",
      tagline: "Para começar a crescer",
      price: 79.90,
      priceAnnual: 64.90,
      icon: Zap,
      color: "#db6f57",
      gradient: "from-[#db6f57] to-[#c55a42]",
      popular: false,
      features: [
        { text: "Agendamentos ilimitados", included: true },
        { text: "Até 3 usuários", included: true },
        { text: "Gestão completa de clientes", included: true },
        { text: "Agendamento online 24/7", included: true },
        { text: "Lembretes automáticos", included: true },
        { text: "Dashboard inteligente", included: true },
        { text: "Controle financeiro", included: true },
        { text: "Agente virtual no WhatsApp", included: false },
      ],
      cta: "Experimentar 14 dias grátis",
      badge: null
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "Tudo que você precisa",
      price: 129.90,
      priceAnnual: 99.90,
      icon: Sparkles,
      color: "#8b3d35",
      gradient: "from-[#8b3d35] to-[#a8524a]",
      popular: true,
      features: [
        { text: "Tudo do Básico +", included: true },
        { text: "Usuários ilimitados", included: true },
        { text: "Agente virtual no WhatsApp", included: true },
        { text: "Site personalizado completo", included: true },
        { text: "Mini e-commerce integrado", included: true },
        { text: "Relatórios avançados", included: true },
        { text: "Programa de fidelidade", included: true },
        { text: "Suporte prioritário", included: true },
      ],
      cta: "Experimentar 14 dias grátis",
      badge: "🔥 Mais popular"
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "Para quem quer o máximo",
      price: 199.90,
      priceAnnual: 159.90,
      icon: Crown,
      color: "#db6f57",
      gradient: "from-[#db6f57] to-[#e88c76]",
      popular: false,
      features: [
        { text: "Tudo do Plus +", included: true },
        { text: "Múltiplas unidades", included: true },
        { text: "API completa", included: true },
        { text: "Integrações personalizadas", included: true },
        { text: "Gerente de conta dedicado", included: true },
        { text: "Suporte 24/7", included: true },
        { text: "Onboarding personalizado", included: true },
        { text: "Customizações sob demanda", included: true },
      ],
      cta: "Falar com especialista",
      badge: "👑 Premium"
    }
  ]

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (activeStep === 0) {
      // Verifica se o CNPJ foi validado antes de prosseguir
      if (!cnpjValid || !cnpjFound) {
        return
      }
      
      fieldsToValidate = [
        "cnpj", "razaoSocial", "nomeFantasia", "email", "telefone",
        "nomeResponsavel", "emailResponsavel", "telefoneResponsavel", "publicoAlvo"
      ]
    } else if (activeStep === 1) {
      fieldsToValidate = ["cep", "rua", "numero", "bairro", "cidade", "estado"]
    } else if (activeStep === 2) {
      fieldsToValidate = ["login", "senha", "confSenha"]
    } else if (activeStep === 3) {
      if (!getValues("tema")) {
        return
      }
    } else if (activeStep === 4) {
      if (!selectedPlan) {
        return
      }
      setValue("planoId", selectedPlan)
      setValue("plano", isAnnual ? "anual" : "mensal")
    }

    const isValid = fieldsToValidate.length === 0 || await trigger(fieldsToValidate)

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
    const selectedPlanData = planos.find(p => p.id === selectedPlan)
    const selectedThemeData = themeArray.find(t => t.id === data.tema)
    
    // Monta objeto base
    const finalData: any = {
      cnpj: data.cnpj,
      razaoSocial: data.razaoSocial,
      nomeFantasia: data.nomeFantasia,
      inscricaoEstadual: data.inscricaoEstadual || "",
      email: data.email,
      telefone: data.telefone,
      publicoAlvo: data.publicoAlvo,
      responsavel: {
        nome: data.nomeResponsavel,
        email: data.emailResponsavel,
        telefone: data.telefoneResponsavel
      },
      endereco: {
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento || "",
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado
      },
      acesso: {
        login: data.login,
        senha: data.senha
      },
      tema: {
        id: selectedThemeData?.id || "",
        nome: selectedThemeData?.name || "",
        tipo: selectedThemeData?.type || "",
        cores: selectedThemeData?.colors || {},
        ...(selectedThemeData?.fonts && { fonts: selectedThemeData.fonts }),
        ...(selectedThemeData?.borderRadius && { borderRadius: selectedThemeData.borderRadius }),
        ...(selectedThemeData?.shadows && { shadows: selectedThemeData.shadows })
      },
      plano: {
        id: selectedPlanData?.id || "",
        nome: selectedPlanData?.name.toUpperCase() || "",
        periodicidade: isAnnual ? "anual" : "mensal",
        valor: isAnnual ? selectedPlanData?.priceAnnual : selectedPlanData?.price
      }
    }

    // Adiciona dados de pagamento se existirem
    if (data.formaPagamento) {
      finalData.plano.formaPagamento = data.formaPagamento
      
      if (data.formaPagamento === "credito" && data.numeroCartao) {
        finalData.plano.dadosCartao = {
          numero: data.numeroCartao,
          nome: data.nomeCartao || "",
          validade: data.validadeCartao || "",
          cvv: data.cvv || ""
        }
      }
    }
    
    console.log("=== DADOS COMPLETOS DO CADASTRO ===")
    console.log(JSON.stringify(finalData, null, 2))
    console.log("===================================")
    
    // Aqui você pode fazer a chamada para sua API
    // await api.post('/empresas', finalData)
    
    // setIsSubmitted(true)


    postOrganizacao(finalData).then((response)=>{
      console.log(response)
      setIsSubmitted(true)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      const values = getValues()
      return !!(
        values.cnpj && values.razaoSocial && values.nomeFantasia &&
        values.email && values.telefone && values.nomeResponsavel &&
        values.emailResponsavel && values.telefoneResponsavel && 
        values.publicoAlvo && cnpjValid && cnpjFound
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
      return !!selectedPlan
    } else if (activeStep === 5) {
      return true
    }
    return true
  }

  // Tela de sucesso
  if (isSubmitted) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf8f6] to-white">
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
      <Header isMenu={false} isCadastro={false} />

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
          <div className="text-center mb-12 mt-20">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2a2420] mb-4">
              Crie sua conta no Bellory
            </h1>
            <p className="text-lg text-[#4f6f64] max-w-2xl mx-auto">
              Preencha os dados abaixo para começar a transformar seu negócio
            </p>
          </div>

          <Card className="md:p-8 p-4 bg-white border-2 border-[#d8ccc4] rounded-3xl shadow-2xl">
            
            {/* Stepper Header */}
            <div className="mb-12">
              <div
                className="grid items-center justify-center"
                style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
              >
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.includes(step.id)
                  const isActive = activeStep === step.id
                  const StepIcon = step.icon
                  
                  return (
                    <div key={step.id} className="relative flex flex-col items-center">
      
                      {/* Linha */}
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute top-5 md:top-7 md:left-4/5 left-10/11 md:w-4/11 w-2/12 h-1 rounded-full transition-all duration-300 ${
                            isCompleted
                              ? "bg-gradient-to-r from-[#5a7a6e] to-[#4f6f64]"
                              : "bg-[#e6d9d4]"
                          }`}
                        />
                      )}

                      {/* Ícone */}
                      <motion.div
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        className={`relative z-10 md:w-14 md:h-14 w-10 h-10 md:rounded-2xl rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-gradient-to-br from-[#5a7a6e] to-[#4f6f64] text-white shadow-lg"
                            : isActive
                            ? "border-2 text-white shadow-xl"
                            : "bg-[#e6d9d4] text-[#4f6f64]"
                        }`}
                        style={
                          isActive && !isCompleted
                            ? {
                                background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                                borderColor: step.color
                              }
                            : {}
                        }
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <StepIcon className="w-6 h-6" />
                        )}
                      </motion.div>

                      {/* Label */}
                      <span
                        className={`hidden md:block text-xs mt-3 font-semibold transition-colors ${
                          isActive ? "text-[#2a2420]" : "text-[#4f6f64]"
                        }`}
                      >
                        {step.label}
                      </span>
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
                            rules={{ 
                              required: "CNPJ é obrigatório",
                              validate: () => {
                                if (!cnpjFound) return "Aguardando validação do CNPJ"
                                if (!cnpjValid) return "CNPJ inválido ou já cadastrado"
                                return true
                              }
                            }}
                            render={({ field }) => (
                              <div className="relative">
                                <InputMask
                                  {...field}
                                  mask="99.999.999/9999-99"
                                  placeholder="00.000.000/0000-00"
                                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                    errors.cnpj 
                                      ? "border-[#d15847]" 
                                      : cnpjValid && cnpjFound
                                      ? "border-green-500"
                                      : cnpjFound && !cnpjValid
                                      ? "border-[#d15847]"
                                      : "border-[#d8ccc4] focus:border-[#db6f57]"
                                  }`}
                                  disabled={isPending}
                                />
                                {isPending && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="w-5 h-5 border-2 border-[#db6f57] border-t-transparent rounded-full animate-spin" />
                                  </div>
                                )}
                                {cnpjFound && cnpjValid && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Check className="w-5 h-5 text-green-500" />
                                  </div>
                                )}
                                {cnpjFound && !cnpjValid && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <X className="w-5 h-5 text-[#d15847]" />
                                  </div>
                                )}
                              </div>
                            )}
                          />
                          {isPending && (
                            <small className="text-[#4f6f64] text-sm mt-1 block flex items-center gap-2">
                              <div className="w-3 h-3 border-2 border-[#4f6f64] border-t-transparent rounded-full animate-spin" />
                              Validando CNPJ...
                            </small>
                          )}
                          {cnpjError && cnpjFound && (
                            <small className={`text-sm mt-1 block ${cnpjValid ? "text-green-600" : "text-[#d15847]"}`}>
                              {cnpjError}
                            </small>
                          )}
                          {errors.cnpj && !cnpjFound && (
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

                        <div>
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
                            Público Alvo <span className="text-[#d15847]">*</span>
                          </label>
                          <Controller
                            name="publicoAlvo"
                            control={control}
                            rules={{ required: "Público Alvo é obrigatório" }}
                            render={({ field }) => (
                              <Dropdown
                                {...field}
                                options={publicoAlvoOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Selecione o público alvo"
                                className={`w-full border-2 rounded-xl transition-all ${
                                  errors.publicoAlvo ? "border-[#d15847]" : "border-[#d8ccc4] focus:border-[#db6f57]"
                                }`}
                                pt={{
                                  input: { className: "px-4 py-3" }
                                }}
                              />
                            )}
                          />
                          {errors.publicoAlvo && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.publicoAlvo.message}</small>
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
                              validate: () => {
                                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                const email = getValues("email")
                                
                                if (!email || !emailRegex.test(email)) return true // Deixa a validação de pattern cuidar disso
                                if (!emailFound) return "Aguardando validação do email"
                                if (!emailValid) return "Email já cadastrado"
                                return true
                              }
                            }}
                            render={({ field }) => (
                              <div className="relative">
                                <InputText
                                  {...field}
                                  type="email"
                                  placeholder="contato@empresa.com"
                                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                    errors.email 
                                      ? "border-[#d15847]" 
                                      : emailValid && emailFound
                                      ? "border-green-500"
                                      : emailFound && !emailValid
                                      ? "border-[#d15847]"
                                      : "border-[#d8ccc4] focus:border-[#db6f57]"
                                  }`}
                                  disabled={isPendingEmail}
                                />
                                {isPendingEmail && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="w-5 h-5 border-2 border-[#db6f57] border-t-transparent rounded-full animate-spin" />
                                  </div>
                                )}
                                {emailFound && emailValid && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Check className="w-5 h-5 text-green-500" />
                                  </div>
                                )}
                                {emailFound && !emailValid && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <X className="w-5 h-5 text-[#d15847]" />
                                  </div>
                                )}
                              </div>
                            )}
                          />
                          {isPendingEmail && (
                            <small className="text-[#4f6f64] text-sm mt-1 block flex items-center gap-2">
                              <div className="w-3 h-3 border-2 border-[#4f6f64] border-t-transparent rounded-full animate-spin" />
                              Validando email...
                            </small>
                          )}
                          {emailError && emailFound && (
                            <small className={`text-sm mt-1 block ${emailValid ? "text-green-600" : "text-[#d15847]"}`}>
                              {emailError}
                            </small>
                          )}
                          {errors.email && !emailFound && (
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
                    <AddressForm
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      watch={watch}
                    />
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
                            rules={{ 
                              required: "Login é obrigatório",
                              minLength: {
                                value: 3,
                                message: "Mínimo 3 caracteres"
                              },
                              validate: () => {
                                const username = getValues("login")
                                
                                if (!username || username.length < 3) return true // Deixa a validação de minLength cuidar disso
                                if (!usernameFound) return "Aguardando validação do username"
                                if (!usernameValid) return "Username já cadastrado"
                                return true
                              }
                            }}
                            render={({ field }) => (
                              <div className="relative">
                                <InputText
                                  {...field}
                                  placeholder="Escolha um nome de usuário"
                                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                    errors.login 
                                      ? "border-[#d15847]" 
                                      : usernameValid && usernameFound
                                      ? "border-green-500"
                                      : usernameFound && !usernameValid
                                      ? "border-[#d15847]"
                                      : "border-[#d8ccc4] focus:border-[#8b3d35]"
                                  }`}
                                  disabled={isPendingUsername}
                                />
                                {isPendingUsername && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <div className="w-5 h-5 border-2 border-[#8b3d35] border-t-transparent rounded-full animate-spin" />
                                  </div>
                                )}
                                {usernameFound && usernameValid && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Check className="w-5 h-5 text-green-500" />
                                  </div>
                                )}
                                {usernameFound && !usernameValid && (
                                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <X className="w-5 h-5 text-[#d15847]" />
                                  </div>
                                )}
                              </div>
                            )}
                          />
                          {isPendingUsername && (
                            <small className="text-[#4f6f64] text-sm mt-1 block flex items-center gap-2">
                              <div className="w-3 h-3 border-2 border-[#4f6f64] border-t-transparent rounded-full animate-spin" />
                              Validando username...
                            </small>
                          )}
                          {usernameError && usernameFound && (
                            <small className={`text-sm mt-1 block ${usernameValid ? "text-green-600" : "text-[#d15847]"}`}>
                              {usernameError}
                            </small>
                          )}
                          {errors.login && !usernameFound && (
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
                    <ThemeSelector
                      control={control}
                      errors={errors}
                      themeArray={themeArray}
                    />
                  )}

                  {/* Step 4: Plano */}
                  {activeStep === 4 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-[#4f6f64]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Escolha seu plano</h3>
                          <p className="text-sm text-[#4f6f64]">Selecione o plano ideal para você</p>
                        </div>
                      </div>

                      <div className="bg-[#4f6f64]/10 rounded-2xl p-6 mb-6">
                        <p className="text-center text-[#2a2420] font-semibold">
                          ✅ 14 dias grátis • Sem cartão de crédito • Cancele quando quiser
                        </p>
                      </div>

                      {/* Toggle de período */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                        <div className="hidden md:block w-[150px]" />
                        
                        <div className="flex items-center justify-center gap-4">
                          <span className={`font-semibold transition-colors ${!isAnnual ? 'text-[#2a2420]' : 'text-[#4f6f64]'}`}>
                            Mensal
                          </span>

                          <button
                            type="button"
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="relative w-16 h-8 rounded-full transition-colors duration-300"
                            style={{ backgroundColor: isAnnual ? '#4f6f64' : '#d8ccc4' }}
                          >
                            <div 
                              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300"
                              style={{ transform: isAnnual ? 'translateX(32px)' : 'translateX(0)' }}
                            />
                          </button>

                          <span className={`font-semibold transition-colors ${isAnnual ? 'text-[#2a2420]' : 'text-[#4f6f64]'}`}>
                            Anual
                          </span>
                        </div>

                        <div className="w-full md:w-[150px] flex items-center justify-center">
                          {isAnnual && (
                            <motion.span 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-3 py-1 bg-[#5a7a6e] text-white text-sm font-bold rounded-full"
                            >
                              Economize 20%
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* Cards de planos selecionáveis */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {planos.map((plan) => {
                          const displayPrice = isAnnual ? plan.priceAnnual : plan.price
                          const savings = plan.price > 0 ? ((plan.price - plan.priceAnnual) * 12).toFixed(0) : 0
                          const isSelected = selectedPlan === plan.id

                          return (
                            <motion.button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedPlan(plan.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? 'border-[#4f6f64] bg-[#4f6f64]/5 shadow-xl'
                                  : 'border-[#d8ccc4] bg-white hover:border-[#4f6f64]/50 hover:shadow-lg'
                              }`}
                            >
                              {/* Badge popular */}
                              {plan.badge && (
                                <div 
                                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                                  style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)` }}
                                >
                                  {plan.badge}
                                </div>
                              )}

                              {/* Checkbox de seleção */}
                              <div className="absolute top-4 right-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-[#4f6f64] border-[#4f6f64]' 
                                    : 'border-[#d8ccc4]'
                                }`}>
                                  {isSelected && <Check className="w-4 h-4 text-white" />}
                                </div>
                              </div>

                              {/* Conteúdo do card */}
                              <div className="pr-8">
                                {/* Ícone e nome */}
                                <div className="flex items-center gap-3 mb-4">
                                  <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}40)`
                                    }}
                                  >
                                    <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-[#2a2420]">{plan.name}</h4>
                                    <p className="text-sm text-[#4f6f64]">{plan.tagline}</p>
                                  </div>
                                </div>

                                {/* Preço */}
                                <div className="mb-4">
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#2a2420]">
                                      R$ {displayPrice.toFixed(2).replace('.', ',')}
                                    </span>
                                    {plan.price > 0 && (
                                      <span className="text-[#4f6f64] text-sm">/mês</span>
                                    )}
                                  </div>
                                  {isAnnual && Number(savings) > 0 && (
                                    <p className="text-sm font-semibold mt-1" style={{ color: plan.color }}>
                                      💰 Economize R$ {savings}/ano
                                    </p>
                                  )}
                                </div>

                                {/* Principais recursos */}
                                <div className="space-y-2">
                                  {plan.features.slice(0, 3).map((feature: any, i: number) => (
                                    feature.included && (
                                      <div key={i} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                                        <span className="text-sm text-[#2a2420]">{feature.text}</span>
                                      </div>
                                    )
                                  ))}
                                  {plan.features.length > 3 && (
                                    <p className="text-xs text-[#4f6f64] mt-2">
                                      + {plan.features.length - 3} recursos adicionais
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Indicador de seleção */}
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute inset-0 rounded-2xl pointer-events-none"
                                  style={{
                                    boxShadow: `0 0 0 3px ${plan.color}20`
                                  }}
                                />
                              )}
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* Detalhes do plano selecionado */}
                      {selectedPlan && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white border border-[#d8ccc4] rounded-2xl p-6"
                        >
                          <h4 className="font-bold text-[#2a2420] mb-4">
                            Recursos inclusos no plano {planos.find(p => p.id === selectedPlan)?.name}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {planos.find(p => p.id === selectedPlan)?.features.map((feature: any, i: number) => (
                              <div key={i} className="flex items-start gap-2">
                                {feature.included ? (
                                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4f6f64]" />
                                ) : (
                                  <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-300" />
                                )}
                                <span className={`text-sm ${feature.included ? 'text-[#2a2420]' : 'text-gray-400 line-through'}`}>
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="text-center text-sm text-[#4f6f64] mt-6">
                        <p>Você pode começar gratuitamente e adicionar um método de pagamento depois.</p>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Confirmação */}
                  {activeStep === 5 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#d8ccc4]">
                        <div className="w-12 h-12 rounded-xl bg-[#8b3d35]/10 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-[#8b3d35]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#2a2420]">Confirmação de cadastro</h3>
                          <p className="text-sm text-[#4f6f64]">Revise todas as informações antes de finalizar</p>
                        </div>
                      </div>

                      {/* Empresa */}
                      <div className="bg-white border border-[#d8ccc4] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-[#db6f57]/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-[#db6f57]" />
                          </div>
                          <h4 className="font-bold text-[#2a2420]">Informações da Empresa</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-[#4f6f64] mb-1">CNPJ</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("cnpj")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Razão Social</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("razaoSocial")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Nome Fantasia</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("nomeFantasia")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Público Alvo</p>
                            <p className="text-[#2a2420] font-semibold">
                              {publicoAlvoOptions.find(p => p.code === getValues("publicoAlvo"))?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Email</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("email")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Telefone</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("telefone")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Responsável */}
                      <div className="bg-white border border-[#d8ccc4] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-[#db6f57]/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-[#db6f57]" />
                          </div>
                          <h4 className="font-bold text-[#2a2420]">Responsável</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-[#4f6f64] mb-1">Nome</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("nomeResponsavel")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Email</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("emailResponsavel")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Telefone</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("telefoneResponsavel")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Endereço */}
                      <div className="bg-white border border-[#d8ccc4] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-[#4f6f64]/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#4f6f64]" />
                          </div>
                          <h4 className="font-bold text-[#2a2420]">Endereço</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="md:col-span-2">
                            <p className="text-[#4f6f64] mb-1">Logradouro</p>
                            <p className="text-[#2a2420] font-semibold">
                              {getValues("rua")}, {getValues("numero")} {getValues("complemento") && `- ${getValues("complemento")}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Bairro</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("bairro")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">Cidade/Estado</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("cidade")} - {getValues("estado")}</p>
                          </div>
                          <div>
                            <p className="text-[#4f6f64] mb-1">CEP</p>
                            <p className="text-[#2a2420] font-semibold">{getValues("cep")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Acesso */}
                      <div className="bg-white border border-[#d8ccc4] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-[#8b3d35]/10 flex items-center justify-center">
                            <KeyRound className="w-5 h-5 text-[#8b3d35]" />
                          </div>
                          <h4 className="font-bold text-[#2a2420]">Acesso</h4>
                        </div>
                        <div className="text-sm">
                          <p className="text-[#4f6f64] mb-1">Login/Usuário</p>
                          <p className="text-[#2a2420] font-semibold">{getValues("login")}</p>
                        </div>
                      </div>

                      {/* Tema */}
                      <div className="bg-white border border-[#d8ccc4] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-[#db6f57]/10 flex items-center justify-center">
                            <Palette className="w-5 h-5 text-[#db6f57]" />
                          </div>
                          <h4 className="font-bold text-[#2a2420]">Tema Selecionado</h4>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            {themeArray.find(t => t.id === getValues("tema")) && (
                              <>
                                <div
                                  className="w-10 h-10 rounded-lg shadow-md"
                                  style={{ backgroundColor: themeArray.find(t => t.id === getValues("tema"))?.colors.primary }}
                                />
                                <div
                                  className="w-10 h-10 rounded-lg shadow-md"
                                  style={{ backgroundColor: themeArray.find(t => t.id === getValues("tema"))?.colors.secondary }}
                                />
                                <div
                                  className="w-10 h-10 rounded-lg shadow-md"
                                  style={{ backgroundColor: themeArray.find(t => t.id === getValues("tema"))?.colors.accent }}
                                />
                              </>
                            )}
                          </div>
                          <div>
                            <p className="text-[#2a2420] font-semibold">
                              {themeArray.find(t => t.id === getValues("tema"))?.name}
                            </p>
                            <p className="text-sm text-[#4f6f64] capitalize">
                              {themeArray.find(t => t.id === getValues("tema"))?.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Plano */}
                      <div className="bg-white border border-[#d8ccc4] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-[#4f6f64]/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-[#4f6f64]" />
                          </div>
                          <h4 className="font-bold text-[#2a2420]">Plano Selecionado</h4>
                        </div>
                        {selectedPlan && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {planos.find(p => p.id === selectedPlan) && (
                                <>
                                  <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${planos.find(p => p.id === selectedPlan)?.color}20, ${planos.find(p => p.id === selectedPlan)?.color}40)`
                                    }}
                                  >
                                    {(() => {
                                      const SelectedIcon = planos.find(p => p.id === selectedPlan)?.icon;
                                      return SelectedIcon ? (
                                        <SelectedIcon
                                          className="w-6 h-6"
                                          style={{ color: planos.find(p => p.id === selectedPlan)?.color }}
                                        />
                                      ) : null;
                                    })()}
                                  </div>
                                  <div>
                                    <p className="text-[#2a2420] font-bold text-lg">
                                      {planos.find(p => p.id === selectedPlan)?.name}
                                    </p>
                                    <p className="text-sm text-[#4f6f64]">
                                      {isAnnual ? "Plano Anual" : "Plano Mensal"}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-[#2a2420]">
                                R$ {(isAnnual 
                                  ? planos.find(p => p.id === selectedPlan)?.priceAnnual 
                                  : planos.find(p => p.id === selectedPlan)?.price
                                )?.toFixed(2).replace('.', ',')}
                              </p>
                              <p className="text-sm text-[#4f6f64]">/mês</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-[#4f6f64]/10 rounded-2xl p-6 text-center">
                        <p className="text-[#2a2420] font-semibold">
                          ✅ Ao finalizar, você terá 14 dias grátis para testar todos os recursos!
                        </p>
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
                  className="bg-white text-[#4f6f64] border-2 border-[#d8ccc4] hover:border-[#4f6f64] hover:scale-105 transition-all px-5 py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  outlined
                />

                {activeStep === steps.length  ? (
                  <Button
                    type="submit"
                    icon={<Check className="mr-2"size={18} />}
                    label="Finalizar Cadastro"
                    disabled={!isCurrentStepValid()}
                    className="bg-gradient-to-r from-[#5a7a6e] to-[#4f6f64] text-white border-0 hover:scale-105 transition-all px-5 py-2 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    icon={<ArrowRight className="mr-2" size={18} />}
                    iconPos="right"
                    label="Próximo"
                    style={{ 
                      background: `linear-gradient(135deg, ${steps[activeStep].color}, ${steps[activeStep].color}dd)` 
                    }}
                    className="text-white border-0 hover:scale-105 transition-all px-5 py-2 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                )}
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}