"use client"

import { Header } from "@/components/header"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
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
import { useTheme } from "@/contexts/HeroThemeContext"
import { plans } from "@/components/pricing"

// ============================================================================
// CONFIGURAÇÃO DOS TEMAS DO CADASTRO
// ============================================================================

export const cadastroThemeConfig = {
  light: {
    // Backgrounds
    mainBg: "bg-gradient-to-b from-[#faf8f6] to-white",
    cardBg: "bg-white",
    cardBorder: "border-[#d8ccc4]",
    inputBg: "bg-white",

    // Text
    headingColor: "text-[#2a2420]",
    textPrimary: "text-[#2a2420]",
    textSecondary: `text-[#6b5d57]`,
    textMuted: "text-[#6b5d57]",

    // Inputs
    inputBorder: "border-[#d8ccc4]",
    inputFocus: "focus:border-[#db6f57]",

    // Patterns & decorations
    patternColor: "#8b3d35",
    patternOpacity: "0.03",

    // Blobs
    blob1: "bg-gradient-to-br from-[#db6f57]/20 to-[#8b3d35]/20",

    // Section headers
    sectionBg: "bg-[#db6f57]/10",
    sectionIconBg: (color: string) => `bg-${color}/10`,

    // Buttons
    btnSecondaryBg: "bg-white",
    btnSecondaryText: `#B8AEA4`,
    btnSecondaryBorder: "border-[#d8ccc4]",
    btnSecondaryHover: "hover:border-[#4f6f64]",

    // Success screen
    successIconBg: "from-[#5a7a6e] to-[#4f6f64]",

    // Info boxes
    infoBg: "bg-[#4f6f64]/10",
    infoText: "text-[#2a2420]",

    // Plan cards
    planBorder: "border-[#d8ccc4]",
    planBg: "bg-white",
    planSelected: "border-[#4f6f64] bg-[#4f6f64]/5",
    planHover: "hover:border-[#4f6f64]/50",
  },

  dark: {
    // Backgrounds
    mainBg: "bg-gradient-to-b from-[#0D0B0A] to-[#141210]",
    cardBg: "bg-[#1A1715]/95 backdrop-blur-md",
    cardBorder: "border-[#2D2925]",
    inputBg: "bg-[#1A1715]",

    // Text
    headingColor: "text-[#F5F0EB]",
    textPrimary: "text-[#F5F0EB]",
    textSecondary: "text-[#B8AEA4]",
    textMuted: "text-[#7A716A]",

    // Inputs
    inputBorder: "!border-[#2D2925]",
    inputFocus: "focus:border-[#E07A62]",

    // Patterns & decorations
    patternColor: "#E07A62",
    patternOpacity: "0.02",

    // Blobs
    blob1: "bg-gradient-to-br from-[#E07A62]/15 to-[#A8524A]/15",

    // Section headers
    sectionBg: "bg-[#E07A62]/10",
    sectionIconBg: (color: string) => {
      const colorMap: {[key: string]: string} = {
        "#db6f57": "bg-[#E07A62]/20",
        "#4f6f64": "bg-[#6B8F82]/20",
        "#8b3d35": "bg-[#A8524A]/20",
      }
      return colorMap[color] || "bg-[#E07A62]/20"
    },

    // Buttons
    btnSecondaryBg: "bg-[#1A1715]",
    btnSecondaryText: "text-[#B8AEA4]",
    btnSecondaryBorder: "border-[#2D2925]",
    btnSecondaryHover: "hover:border-[#E07A62]",

    // Success screen
    successIconBg: "from-[#6B8F82] to-[#4f6f64]",

    // Info boxes
    infoBg: "bg-[#E07A62]/10",
    infoText: "text-[#F5F0EB]",

    // Plan cards
    planBorder: "border-[#2D2925]",
    planBg: "bg-[#1A1715]",
    planSelected: "border-[#E07A62] bg-[#E07A62]/5",
    planHover: "hover:border-[#E07A62]/50",
  }
}

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
  const { isDark } = useTheme()
  const theme = isDark ? cadastroThemeConfig.dark : cadastroThemeConfig.light
  const searchParams = useSearchParams()

  const [activeStep, setActiveStep] = useState(1)
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

  // Validação CNPJ
  const cnpjValue = watch("cnpj")

  useEffect(() => {
    const cnpjLimpo = cnpjValue?.replace(/\D/g, "") || ""
    
    if (cnpjLimpo.length === 14) {
      validaCNPJ(cnpjLimpo)
        .then((response) => {
          setCnpjFound(true)
          console.log(response)
          // Se dados === false, CNPJ está disponível
          if (response.dados === false) {
            setCnpjValid(true)
            setCnpjError("✓ CNPJ válido e disponível")
          } else {
            // Se dados === true, CNPJ já está cadastrado
            setCnpjValid(false)
            setCnpjError(response.message || "CNPJ já cadastrado no sistema")
          }
        })
        .catch((error) => {
          setCnpjFound(true)
          setCnpjValid(false)
          const errorMessage = error?.response?.data?.message || "Erro ao validar CNPJ"
          setCnpjError(errorMessage)
        })
    } else if (cnpjLimpo.length < 14) {
      setCnpjFound(false)
      setCnpjValid(false)
      setCnpjError("")
    }
  }, [cnpjValue, validaCNPJ])

  // Validação de Email
  const emailValue = watch("email")

  useEffect(() => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    
    if (emailValue && emailRegex.test(emailValue)) {
      const timeoutId = setTimeout(() => {
        validaEmail(emailValue)
          .then((response) => {
            setEmailFound(true)
            
            // Se dados === false, email está disponível
            if (response.dados === false) {
              setEmailValid(true)
              setEmailError("✓ Email disponível")
            } else {
              // Se dados === true, email já está cadastrado
              setEmailValid(false)
              setEmailError(response.message || "Email já cadastrado no sistema")
            }
          })
          .catch((error) => {
            setEmailFound(true)
            setEmailValid(false)
            const errorMessage = error?.response?.data?.message || "Erro ao validar email"
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

  // Validação de Username
  // Validação de Username
  const usernameValue = watch("login")

  useEffect(() => {
    if (usernameValue && usernameValue.length >= 6) {
      const timeoutId = setTimeout(() => {
        validaUsername(usernameValue)
          .then((response) => {
            setUsernameFound(true)
            
            // Se dados === false, username está disponível
            if (response.dados === false) {
              setUsernameValid(true)
              setUsernameError("✓ Username disponível")
            } else {
              // Se dados === true, username já está cadastrado
              setUsernameValid(false)
              setUsernameError(response.message || "Username já cadastrado no sistema")
            }
          })
          .catch((error) => {
            setUsernameFound(true)
            setUsernameValid(false)
            const errorMessage = error?.response?.data?.message || "Erro ao validar username"
            setUsernameError(errorMessage)
          })
      }, 800) // Aumentei para 800ms - melhor UX

      return () => clearTimeout(timeoutId)
    } else if (usernameValue && usernameValue.length < 6) {
      // Limpa validações se tiver menos de 6 caracteres
      setUsernameFound(false)
      setUsernameValid(false)
      setUsernameError("")
    } else {
      // Limpa tudo se vazio
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

  // Efeito para ler parâmetros da URL e pré-selecionar plano e recorrência
  useEffect(() => {
    const planoParam = searchParams.get('plano')
    const recorrenciaParam = searchParams.get('recorrencia')

    // Verifica se o plano passado na URL existe nos planos disponíveis
    if (planoParam) {
      const planoEncontrado = plans.find(p => p.id === planoParam.toLowerCase())
      if (planoEncontrado) {
        setSelectedPlan(planoEncontrado.id)
      }
    }

    // Define a recorrência baseado no parâmetro da URL
    if (recorrenciaParam) {
      setIsAnnual(recorrenciaParam.toLowerCase() === 'anual')
    }
  }, [searchParams])

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (activeStep === 0) {
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
      // CORREÇÃO 1: Salvar os valores do plano no formulário
      setValue("planoId", selectedPlan)
      setValue("plano", isAnnual ? "anual" : "mensal")
      // NÃO fazer validação de campos aqui, apenas verificar se tem plano selecionado
    }
    // CORREÇÃO 2: Remover o else if do step 4 que estava duplicado

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
    const selectedPlanData = plans.find(p => p.id === selectedPlan)
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
        values.publicoAlvo && cnpjValid && cnpjFound && 
        emailValid && emailFound // CORREÇÃO 3: Adicionar validação de email
      )
    } else if (activeStep === 1) {
      const values = getValues()
      return !!(values.cep && values.rua && values.numero && values.bairro && values.cidade && values.estado)
    } else if (activeStep === 2) {
      const values = getValues()
      // CORREÇÃO 4: Adicionar validação de username
      return !!(
        values.login && values.senha && values.confSenha && 
        values.senha === values.confSenha &&
        usernameValid && usernameFound
      )
    } else if (activeStep === 3) {
      return !!getValues("tema")
    } else if (activeStep === 4) {
      return !!selectedPlan
    } else if (activeStep === 5) {
      // CORREÇÃO 5: Step 5 é apenas visualização, sempre válido
      return true
    }
    return true
  }

  // Tela de sucesso
  if (isSubmitted) {
    return (
      <main className={`relative min-h-screen flex items-center justify-center overflow-hidden ${theme.mainBg}`}>
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent(theme.patternColor.replace('#', ''))}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: theme.patternOpacity,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className={`p-12 ${theme.cardBg} border-2 ${theme.cardBorder} rounded-3xl shadow-2xl transition-colors duration-300`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${theme.successIconBg} flex items-center justify-center mx-auto mb-6`}
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h1 className={`font-serif text-4xl font-bold mb-4 ${theme.headingColor} transition-colors duration-300`}>
                Cadastro Realizado!
              </h1>

              <p className={`text-lg  mb-8 leading-relaxed transition-colors duration-300`} style={{color: theme.textSecondary }}>
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
    <main className={`relative min-h-screen flex flex-col justify-center overflow-hidden pt-10 pb-16 ${theme.mainBg} transition-colors duration-300`}>
      <Header isMenu={false} isCadastro={false} />

      {/* Background decorativo */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent(theme.patternColor.replace('#', ''))}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: theme.patternOpacity,
        }}
      />

      {/* Blobs animados */}
      <motion.div
        className={`absolute top-0 right-0 w-96 h-96 ${theme.blob1} rounded-full blur-3xl`}
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
            <h1 className={`font-serif text-4xl md:text-5xl font-bold ${theme.headingColor} mb-4 transition-colors duration-300`}>
              Crie sua conta no Bellory
            </h1>
            <p className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto transition-colors duration-300`}>
              Preencha os dados abaixo para começar a transformar seu negócio
            </p>
          </div>

          <Card className={`md:p-8 p-4 ${theme.cardBg} border-2 ${theme.cardBorder} rounded-3xl shadow-2xl transition-colors duration-300`}>
            
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
                              : `${isDark?"bg-[#e6d9d4]/20":`bg-[#e6d9d4]`}`
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
                            : `${isDark? `bg-[#e6d9d4]/20 ${theme.textSecondary}`:'bg-[#e6d9d4] text-[#4f6f64]'}`
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
                        className={`hidden md:block text-xs mt-3 font-semibold transition-colors duration-300 ${
                          isActive ? theme.textPrimary : theme.textMuted
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
                      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${theme.cardBorder} transition-colors duration-300`}>
                        <div className={`w-12 h-12 rounded-xl bg-[#db6f57]/10 flex items-center justify-center`}>
                          <Building2 className={`w-6 h-6 ${isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${theme.textPrimary} transition-colors duration-300`}>Informações da Empresa</h3>
                          <p className={`text-sm ${theme.textMuted} transition-colors duration-300`}>Dados legais do estabelecimento</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            CNPJ <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                  className={`w-full ${theme.textSecondary} px-4 py-3 border-2 rounded-xl transition-all ${
                                    errors.cnpj 
                                      ? "border-[#d15847]" 
                                      : cnpjValid && cnpjFound
                                      ? isDark?'border-[#5a7a6e]':"border-green-500"
                                      : cnpjFound && !cnpjValid
                                      ? "border-[#d15847]"
                                      : `${theme.inputBorder} ${theme.inputFocus}`
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
                                    <Check className={`w-5 h-5 ${isDark? `text-[#5a7a6e]`:`text-green-500`}`} />
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
                            <small className={`${theme.textSecondary} text-sm mt-1 block flex items-center gap-2`}>
                              <div className="w-3 h-3 border-2 border-[#4f6f64] border-t-transparent rounded-full animate-spin" />
                              Validando CNPJ...
                            </small>
                          )}
                          {cnpjError && cnpjFound && (
                            <small className={`text-sm mt-1 block ${cnpjValid ? `${isDark? `text-[#5a7a6e]`:`text-green-600`}` : "text-[#d15847]"}`}>
                              {cnpjError}
                            </small>
                          )}
                          {errors.cnpj && !cnpjFound && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.cnpj.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Inscrição Estadual
                          </label>
                          <Controller
                            name="inscricaoEstadual"
                            control={control}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Opcional"
                                className={`w-full ${theme.textSecondary} px-4 py-3 border-2 rounded-xl focus:border-[#db6f57] transition-all  ${theme.inputBorder} ${theme.inputFocus}`}
                              />
                            )}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Razão Social <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
                          </label>
                          <Controller
                            name="razaoSocial"
                            control={control}
                            rules={{ required: "Razão Social é obrigatória" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome legal da empresa"
                                className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.razaoSocial ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                }`}
                              />
                            )}
                          />
                          {errors.razaoSocial && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.razaoSocial.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Nome Fantasia <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
                          </label>
                          <Controller
                            name="nomeFantasia"
                            control={control}
                            rules={{ required: "Nome Fantasia é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Como seu negócio é conhecido"
                                className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.nomeFantasia ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                }`}
                              />
                            )}
                          />
                          {errors.nomeFantasia && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.nomeFantasia.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Público Alvo <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                className={`${theme.textSecondary} w-full border-2 rounded-xl transition-all ${theme.inputBg} ${
                                  errors.publicoAlvo ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
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
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Email da Empresa <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                  className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                    errors.email 
                                      ? "border-[#d15847]" 
                                      : emailValid && emailFound
                                      ? isDark?'border-[#5a7a6e]':"border-green-500"
                                      : emailFound && !emailValid
                                      ? "border-[#d15847]"
                                      : `${theme.inputBorder} ${theme.inputFocus}`
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
                                    <Check className={`w-5 h-5 ${isDark? `text-[#5a7a6e]`:`text-green-500`}`} />
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
                            <small className={`${theme.textSecondary} text-sm mt-1 block flex items-center gap-2`}>
                              <div className="w-3 h-3 border-2 border-[#4f6f64] border-t-transparent rounded-full animate-spin" />
                              Validando email...
                            </small>
                          )}
                          {emailError && emailFound && (
                            <small className={`text-sm mt-1 block ${emailValid ? `${isDark? `text-[#5a7a6e]`:`text-green-600`}` : "text-[#d15847]"}`}>
                              {emailError}
                            </small>
                          )}
                          {errors.email && !emailFound && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.email.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Telefone da Empresa <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.telefone ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                }`}
                              />
                            )}
                          />
                          {errors.telefone && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.telefone.message}</small>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Nome do Responsável <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
                          </label>
                          <Controller
                            name="nomeResponsavel"
                            control={control}
                            rules={{ required: "Nome do Responsável é obrigatório" }}
                            render={({ field }) => (
                              <InputText
                                {...field}
                                placeholder="Nome completo do responsável"
                                className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.nomeResponsavel ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                }`}
                              />
                            )}
                          />
                          {errors.nomeResponsavel && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.nomeResponsavel.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Email do Responsável <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.emailResponsavel ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                }`}
                              />
                            )}
                          />
                          {errors.emailResponsavel && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.emailResponsavel.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Telefone do Responsável <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                className={`${theme.textSecondary} w-full px-4 py-3 border-2 rounded-xl transition-all ${
                                  errors.telefoneResponsavel ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
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
                      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${theme.cardBorder} transition-colors duration-300`}>
                        <div className={`w-12 h-12 rounded-xl ${theme.sectionIconBg('#8b3d35')} flex items-center justify-center`}>
                          <KeyRound className={`w-6 h-6 ${isDark ? 'text-[#A8524A]' : 'text-[#8b3d35]'}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${theme.textPrimary} transition-colors duration-300`}>Acesso ao Sistema</h3>
                          <p className={`text-sm ${theme.textSecondary} transition-colors duration-300`}>Crie suas credenciais</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Login/Usuário <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
                          </label>
                          <Controller
                            name="login"
                            control={control}
                            rules={{ 
                              required: "Login é obrigatório",
                              minLength: {
                                value: 6,
                                message: "Mínimo 6 caracteres"
                              },
                              validate: () => {
                                const username = getValues("login")
                                
                                if (!username || username.length < 6) return true // Deixa a validação de minLength cuidar disso
                                if (!usernameFound) return "Aguardando validação do username"
                                if (!usernameValid) return "Username já cadastrado"
                                return true
                              }
                            }}
                            render={({ field }) => (
                              <div className="relative">
                                <InputText
                                  {...field}
                                  placeholder="Escolha um nome de usuário (mínimo 6 caracteres)"
                                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${theme.textSecondary} ${
                                    errors.login
                                      ? "border-[#d15847]"
                                      : usernameValid && usernameFound
                                      ? isDark ? "border-[#5a7a6e]" : "border-green-500"
                                      : usernameFound && !usernameValid
                                      ? "border-[#d15847]"
                                      : `${theme.inputBorder} ${theme.inputFocus}`
                                  }`}
                                  // Removido o disabled para não perder foco
                                />
                                {/* Indicador sempre visível no canto direito */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                  {isPendingUsername && (
                                    <div className={`w-5 h-5 border-2 ${isDark ? 'border-[#A8524A]' : 'border-[#8b3d35]'} border-t-transparent rounded-full animate-spin`} />
                                  )}
                                  {!isPendingUsername && usernameFound && usernameValid && (
                                    <Check className={`w-5 h-5 ${isDark ? 'text-[#5a7a6e]' : 'text-green-500'}`} />
                                  )}
                                  {!isPendingUsername && usernameFound && !usernameValid && (
                                    <X className="w-5 h-5 text-[#d15847]" />
                                  )}
                                </div>
                              </div>
                            )}
                          />
                          {isPendingUsername && (
                            <small className={`${theme.textSecondary} text-sm mt-1 block flex items-center gap-2`}>
                              <div className={`w-3 h-3 border-2 ${isDark ? 'border-[#6B8F82]' : 'border-[#4f6f64]'} border-t-transparent rounded-full animate-spin`} />
                              Validando username...
                            </small>
                          )}
                          {usernameError && usernameFound && !isPendingUsername && (
                            <small className={`text-sm mt-1 block ${usernameValid ? (isDark ? 'text-[#5a7a6e]' : 'text-green-600') : "text-[#d15847]"}`}>
                              {usernameError}
                            </small>
                          )}
                          {errors.login && !usernameFound && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.login.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Senha <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${theme.textSecondary} ${
                                    errors.senha ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                  }`}
                                />
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary} ${isDark ? 'hover:text-[#A8524A]' : 'hover:text-[#8b3d35]'}`}
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {errors.senha && (
                            <small className="text-[#d15847] text-sm mt-1 block">{errors.senha.message}</small>
                          )}
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${theme.textPrimary} mb-2 transition-colors duration-300`}>
                            Confirmar Senha <span className={`${isDark ? 'text-[#E07A62]' : 'text-[#d15847]'}`}>*</span>
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
                                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all ${theme.textSecondary} ${
                                    errors.confSenha ? "border-[#d15847]" : `${theme.inputBorder} ${theme.inputFocus}`
                                  }`}
                                />
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfPassword(!showConfPassword)}
                              className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary} ${isDark ? 'hover:text-[#A8524A]' : 'hover:text-[#8b3d35]'}`}
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
                      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${theme.cardBorder} transition-colors duration-300`}>
                        <div className={`w-12 h-12 rounded-xl ${theme.sectionIconBg('#4f6f64')} flex items-center justify-center`}>
                          <CreditCard className={`w-6 h-6 ${isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${theme.textPrimary} transition-colors duration-300`}>Escolha seu plano</h3>
                          <p className={`text-sm ${theme.textSecondary} transition-colors duration-300`}>Selecione o plano ideal para você</p>
                        </div>
                      </div>

                      <div className={`${theme.infoBg} rounded-2xl p-6 mb-6 transition-colors duration-300`}>
                        <p className={`text-center ${theme.infoText} font-semibold transition-colors duration-300`}>
                          ✅ 14 dias grátis • Sem cartão de crédito • Cancele quando quiser
                        </p>
                      </div>

                      {/* Toggle de período */}
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                        <div className="hidden md:block w-[150px]" />

                        <div className="flex items-center justify-center gap-4">
                          <span className={`font-semibold transition-colors duration-300 ${!isAnnual ? theme.textPrimary : theme.textSecondary}`}>
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

                          <span className={`font-semibold transition-colors duration-300 ${isAnnual ? theme.textPrimary : theme.textSecondary}`}>
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
                        {plans.map((plan) => {
                          const displayPrice = isAnnual ? plan.priceAnnual : plan.price
                          const savings = plan.price > 0 ? ((plan.price - plan.priceAnnual) * 12).toFixed(0) : 0
                          const isSelected = selectedPlan === plan.id
                          const discountPercent = plan.price > 0 ? Math.round(((plan.price - plan.priceAnnual) / plan.price) * 100) : 0
                          const totalAnnual = plan.priceAnnual * 12

                          return (
                            <motion.button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedPlan(plan.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? theme.planSelected + ' shadow-xl'
                                  : theme.planBorder + ' ' + theme.planBg + ' ' + theme.planHover + ' hover:shadow-lg'
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
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                  isSelected
                                    ? (isDark ? 'bg-[#E07A62] border-[#E07A62]' : 'bg-[#4f6f64] border-[#4f6f64]')
                                    : theme.inputBorder
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
                                    <h4 className={`text-xl font-bold ${theme.textPrimary} transition-colors duration-300`}>{plan.name}</h4>
                                    <p className={`text-sm ${theme.textSecondary} transition-colors duration-300`}>{plan.tagline}</p>
                                  </div>
                                </div>

                                {/* Preço */}
                                {/* <div className="mb-4">
                                  <div className="flex items-baseline gap-2">
                                    <span className={`text-3xl font-bold ${theme.textPrimary} transition-colors duration-300`}>
                                      R$ {displayPrice.toFixed(2).replace('.', ',')}
                                    </span>
                                    {plan.price > 0 && (
                                      <span className={`${theme.textSecondary} text-sm transition-colors duration-300`}>/mês</span>
                                    )}
                                  </div>
                                  {isAnnual && Number(savings) > 0 && (
                                    <p className="text-sm font-semibold mt-1" style={{ color: plan.color }}>
                                      💰 Economize R$ {savings}/ano
                                    </p>
                                  )}
                                </div> */}
                                <div className="mb-8 space-y-3">
                                  {/* Preço mensal em destaque */}
                                  {/* Preço original riscado e desconto */}
                                  {isAnnual && plan.price > 0 &&  (
                                    <div className="flex items-center gap-2">
                                      <span className={`text-lg line-through ${theme.textMuted}`}>
                                        R$ {plan.price.toFixed(2).replace('.', ',')}/mês
                                      </span>
                                      <span
                                        className="px-2 py-0.5 text-xs font-bold rounded-full text-white"
                                        style={{ backgroundColor: plan.color }}
                                      >
                                        -{discountPercent}%
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl font-bold ${isDark? `text-[#F5F0EB]`:`text-[#2a2420]`}`} style={{ color: theme.textPrimary }}>
                                      R$ {displayPrice.toFixed(2).replace('.', ',')}
                                    </span>
                                    {plan.price > 0 && (
                                      <span className={`${isDark? `text-[#B8AEA4]`:`text-[#4f6f64]`}`}>/mês</span>
                                    )}
                                  </div>

                                  {/* Informações do plano anual */}
                                  {isAnnual && plan.price > 0 && (
                                    <div className="mt-3 space-y-2">
                                      {/* Preço total anual */}
                                      <div className={`text-sm ${isDark? `text-[#B8AEA4]`:`text-[#4f6f64]`}`} style={{ color: isDark?theme.textSecondary:'text-[#4f6f64]' }}>
                                        <span className={`font-semibold`}>
                                          R$ {totalAnnual.toFixed(2).replace('.', ',')}
                                        </span>
                                        {' '}cobrado anualmente
                                      </div>

                                      {/* Economia total */}
                                      {Number(savings) > 0 && (
                                        <div
                                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                                          style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                                        >
                                          💰 Economize R$ {savings}/ano
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Principais recursos */}
                                <div className="space-y-2">
                                  {plan.features.slice(0, 3).map((feature: any, i: number) => (
                                    feature.included && (
                                      <div key={i} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                                        <span className={`text-sm ${theme.textPrimary} transition-colors duration-300`}>{feature.text}</span>
                                      </div>
                                    )
                                  ))}
                                  {plan.features.length > 3 && (
                                    <p className={`text-xs ${theme.textSecondary} mt-2 transition-colors duration-300`}>
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
                          className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}
                        >
                          <h4 className={`font-bold ${theme.textPrimary} mb-4 transition-colors duration-300`}>
                            Recursos inclusos no plano {plans.find(p => p.id === selectedPlan)?.name}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {plans.find(p => p.id === selectedPlan)?.features.map((feature: any, i: number) => (
                              <div key={i} className="flex items-start gap-2">
                                {feature.included ? (
                                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}`} />
                                ) : (
                                  <X className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-[#3D3630]' : 'text-gray-300'}`} />
                                )}
                                <span className={`text-sm transition-colors duration-300 ${feature.included ? theme.textPrimary : (isDark ? 'text-[#7A716A]' : 'text-gray-400') + ' line-through'}`}>
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className={`text-center text-sm ${theme.textSecondary} mt-6 transition-colors duration-300`}>
                        <p>Você pode começar gratuitamente e adicionar um método de pagamento depois.</p>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Confirmação */}
                  {activeStep === 5 && (
                    <div className="space-y-6">
                      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${theme.cardBorder} transition-colors duration-300`}>
                        <div className={`w-12 h-12 rounded-xl ${theme.sectionIconBg('#8b3d35')} flex items-center justify-center`}>
                          <CheckCircle className={`w-6 h-6 ${isDark ? 'text-[#A8524A]' : 'text-[#8b3d35]'}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${theme.textPrimary} transition-colors duration-300`}>Confirmação de cadastro</h3>
                          <p className={`text-sm ${theme.textSecondary} transition-colors duration-300`}>Revise todas as informações antes de finalizar</p>
                        </div>
                      </div>

                      {/* Empresa */}
                      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.sectionIconBg('#db6f57')} flex items-center justify-center`}>
                            <Building2 className={`w-5 h-5 ${isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}`} />
                          </div>
                          <h4 className={`font-bold ${theme.textPrimary} transition-colors duration-300`}>Informações da Empresa</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>CNPJ</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("cnpj")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Razão Social</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("razaoSocial")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Nome Fantasia</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("nomeFantasia")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Público Alvo</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>
                              {publicoAlvoOptions.find(p => p.code === getValues("publicoAlvo"))?.name}
                            </p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Email</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("email")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Telefone</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("telefone")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Responsável */}
                      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.sectionIconBg('#db6f57')} flex items-center justify-center`}>
                            <User className={`w-5 h-5 ${isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}`} />
                          </div>
                          <h4 className={`font-bold ${theme.textPrimary} transition-colors duration-300`}>Responsável</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Nome</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("nomeResponsavel")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Email</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("emailResponsavel")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Telefone</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("telefoneResponsavel")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Endereço */}
                      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.sectionIconBg('#4f6f64')} flex items-center justify-center`}>
                            <MapPin className={`w-5 h-5 ${isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}`} />
                          </div>
                          <h4 className={`font-bold ${theme.textPrimary} transition-colors duration-300`}>Endereço</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="md:col-span-2">
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Logradouro</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>
                              {getValues("rua")}, {getValues("numero")} {getValues("complemento") && `- ${getValues("complemento")}`}
                            </p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Bairro</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("bairro")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Cidade/Estado</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("cidade")} - {getValues("estado")}</p>
                          </div>
                          <div>
                            <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>CEP</p>
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("cep")}</p>
                          </div>
                        </div>
                      </div>

                      {/* Acesso */}
                      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.sectionIconBg('#8b3d35')} flex items-center justify-center`}>
                            <KeyRound className={`w-5 h-5 ${isDark ? 'text-[#A8524A]' : 'text-[#8b3d35]'}`} />
                          </div>
                          <h4 className={`font-bold ${theme.textPrimary} transition-colors duration-300`}>Acesso</h4>
                        </div>
                        <div className="text-sm">
                          <p className={`${theme.textSecondary} mb-1 transition-colors duration-300`}>Login/Usuário</p>
                          <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>{getValues("login")}</p>
                        </div>
                      </div>

                      {/* Tema */}
                      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.sectionIconBg('#db6f57')} flex items-center justify-center`}>
                            <Palette className={`w-5 h-5 ${isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}`} />
                          </div>
                          <h4 className={`font-bold ${theme.textPrimary} transition-colors duration-300`}>Tema Selecionado</h4>
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
                            <p className={`${theme.textPrimary} font-semibold transition-colors duration-300`}>
                              {themeArray.find(t => t.id === getValues("tema"))?.name}
                            </p>
                            <p className={`text-sm ${theme.textSecondary} capitalize transition-colors duration-300`}>
                              {themeArray.find(t => t.id === getValues("tema"))?.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Plano */}
                      <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 transition-colors duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg ${theme.sectionIconBg('#4f6f64')} flex items-center justify-center`}>
                            <CreditCard className={`w-5 h-5 ${isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}`} />
                          </div>
                          <h4 className={`font-bold ${theme.textPrimary} transition-colors duration-300`}>Plano Selecionado</h4>
                        </div>
                        {selectedPlan && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {plans.find(p => p.id === selectedPlan) && (
                                <>
                                  <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${plans.find(p => p.id === selectedPlan)?.color}20, ${plans.find(p => p.id === selectedPlan)?.color}40)`
                                    }}
                                  >
                                    {(() => {
                                      const SelectedIcon = plans.find(p => p.id === selectedPlan)?.icon;
                                      return SelectedIcon ? (
                                        <SelectedIcon
                                          className="w-6 h-6"
                                          style={{ color: plans.find(p => p.id === selectedPlan)?.color }}
                                        />
                                      ) : null;
                                    })()}
                                  </div>
                                  <div>
                                    <p className={`${theme.textPrimary} font-bold text-lg transition-colors duration-300`}>
                                      {plans.find(p => p.id === selectedPlan)?.name}
                                    </p>
                                    <p className={`text-sm ${theme.textSecondary} transition-colors duration-300`}>
                                      {isAnnual ? "Plano Anual" : "Plano Mensal"}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="text-right">
                              <p className={`text-2xl font-bold ${theme.textPrimary} transition-colors duration-300`}>
                                R$ {(isAnnual
                                  ? plans.find(p => p.id === selectedPlan)?.priceAnnual
                                  : plans.find(p => p.id === selectedPlan)?.price
                                )?.toFixed(2).replace('.', ',')}
                              </p>
                              <p className={`text-sm ${theme.textSecondary} transition-colors duration-300`}>/mês</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={`${theme.infoBg} rounded-2xl p-6 text-center transition-colors duration-300`}>
                        <p className={`${theme.infoText} font-semibold transition-colors duration-300`}>
                          ✅ Ao finalizar, você terá 14 dias grátis para testar todos os recursos!
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Footer com botões */}
              <div className={`flex justify-between items-center pt-8 border-t ${theme.cardBorder} mt-8 transition-colors duration-300`}>
                <Button
                  type="button"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  icon={<ArrowLeft className="mr-2 w-5 h-5" />}
                  label="Voltar"
                  className={`${theme.btnSecondaryBg} ${theme.btnSecondaryText} border-2 ${theme.btnSecondaryBorder} ${theme.btnSecondaryHover} hover:scale-105 transition-all duration-300 px-5 py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
                  outlined
                />

                {activeStep === steps.length - 1 ? (
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