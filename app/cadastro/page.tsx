"use client"

import { Header } from "@/components/header"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { Dropdown } from "primereact/dropdown"
import { useForm, Controller, useWatch } from "react-hook-form"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
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
  Paintbrush,
  Pencil
} from "lucide-react"
import Link from "next/link"
import { themes } from "@/utils/themes"
import { AddressForm } from "@/components/address-form-improved"
import { ThemeSelector } from "@/components/theme-selector-improved"
import { useGetPlanos, useMutationPostOrganizacao, useMutationValidaCNPJ, useMutationValidaEmail, useMutationValidaUsername, useMutationValidarCupom } from "@/service/Querys/Organizacao"
import { consultarCNPJBrasilAPI } from "@/service/API/Organizacao"
import { useTheme } from "@/contexts/HeroThemeContext"
import { useConversionTracker } from "@/hooks/tracking"
import { FormInput, FormSelect, FormPillSelector, FormCheckbox, FormButton } from "@/components/form"

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
    blob2: "bg-gradient-to-br from-[#4f6f64]/15 to-[#5a7d71]/15",

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
    blob2: "bg-gradient-to-br from-[#5a7d71]/12 to-[#4f6f64]/12",

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
  segmento: string

  // Step 2: Endereço
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  latitude?: number
  longitude?: number

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
  const prefersReduced = useReducedMotion()
  const searchParams = useSearchParams()
  const { trackCadastroStarted, trackCadastroStep, trackCadastroCompleted, trackCadastroAbandoned, trackPlanSelected } = useConversionTracker()
  const cadastroTracked = useRef(false)

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
  const [cnpjEnriching, setCnpjEnriching] = useState(false)

  // Checkboxes para reaproveitar contato da empresa no responsável (reduz fricção)
  const [sameEmailAsCompany, setSameEmailAsCompany] = useState(true)
  const [samePhoneAsCompany, setSamePhoneAsCompany] = useState(true)

  const [emailFound, setEmailFound] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [emailValid, setEmailValid] = useState(false)

  // Novos estados para Username
  const [usernameFound, setUsernameFound] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const [usernameValid, setUsernameValid] = useState(false)

  // Cupom
  const [cupomCodigo, setCupomCodigo] = useState("")
  const [cupomValid, setCupomValid] = useState(false)
  const [cupomError, setCupomError] = useState("")
  const [cupomDados, setCupomDados] = useState<any>(null)

  const {mutateAsync: postOrganizacao} = useMutationPostOrganizacao();
  const {mutateAsync: validaCNPJ, isPending} = useMutationValidaCNPJ();
  const {mutateAsync: validaEmail, isPending: isPendingEmail} = useMutationValidaEmail();
  const {mutateAsync: validaUsername, isPending: isPendingUsername} = useMutationValidaUsername();
  const {mutateAsync: validarCupom, isPending: isPendingCupom} = useMutationValidarCupom();

  const { data, isLoading, isError, isSuccess } = useGetPlanos();

  const [plano, setPlano] = useState<any[]>([])

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

  const planIconMap: Record<string, any> = {
    Gift, Zap, Sparkles, Crown,
  }

  const isPromoVigente = (ativa: boolean, preco: any, inicio: string | null, fim: string | null) => {
    if (!ativa || preco == null || preco <= 0) return false
    const now = Date.now()
    if (inicio && now < new Date(inicio).getTime()) return false
    if (fim && now > new Date(fim).getTime()) return false
    return true
  }

  const planMetaMap: Record<
    string,
    { color: string; icon: any; tagline: string; badge?: string }
  > = {
    gratuito: { color: "#5a7d71", icon: Gift, tagline: "Para começar sem custo" },
    basico:   { color: "#db6f57", icon: Zap,  tagline: "Para quem está começando" },
    plus:     { color: "#8b3d35", icon: Sparkles, tagline: "Para escalar com IA", badge: "Mais popular" },
    premium:  { color: "#c19a4a", icon: Crown, tagline: "Máximo profissionalismo" },
  }

  useEffect(()=> {
    if (data && data.success && isSuccess) {
      const transformed = (data.dados ?? [])
        .filter((p: any) => p.active && p.codigo !== "IMPORTED_ASAAS")
        .map((p: any) => {
          const meta =
            planMetaMap[p.codigo] ?? {
              color: "#8b3d35",
              icon: Zap,
              tagline: p.description ?? "",
            }
          const monthlyEqOfAnnual = p.precoAnual && p.precoAnual > 0 ? p.precoAnual / 12 : 0
          return {
            id: p.codigo,
            rawId: p.id,
            name: p.name,
            description: p.description,
            tagline: p.description ?? meta.tagline ?? "",
            color: meta.color,
            icon: meta.icon,
            badge: meta.badge,
            tierOrder: p.tierOrder ?? 0,
            price: p.precoMensal ?? 0,
            yearlyPrice: monthlyEqOfAnnual,
            priceAnnual: monthlyEqOfAnnual,
            yearlyDiscount: p.descontoPercentualAnual ?? 0,
            promoMensalAtiva: isPromoVigente(
              !!p.promoMensalAtiva,
              p.promoMensalPreco,
              p.promoMensalInicio,
              p.promoMensalFim,
            ),
            promoMensalPreco: p.promoMensalPreco ?? null,
            promoMensalTexto: p.promoMensalTexto ?? null,
            promoMensalInicio: p.promoMensalInicio ?? null,
            promoMensalFim: p.promoMensalFim ?? null,
            promoAnualAtiva: isPromoVigente(
              !!p.promoAnualAtiva,
              p.promoAnualPreco,
              p.promoAnualInicio,
              p.promoAnualFim,
            ),
            promoAnualPreco: p.promoAnualPreco ?? null,
            promoAnualTexto: p.promoAnualTexto ?? null,
            promoAnualInicio: p.promoAnualInicio ?? null,
            promoAnualFim: p.promoAnualFim ?? null,
            features: (p.features ?? []).map((f: any) => ({
              text: f.label,
              included: !!f.enabled,
            })),
          }
        })
        .sort((a: any, b: any) => a.tierOrder - b.tierOrder)
      setPlano(transformed);
    }
  },[data, isSuccess])

  useEffect(() => {
    const cnpjLimpo = cnpjValue?.replace(/\D/g, "") || ""
    
    if (cnpjLimpo.length === 14) {
      validaCNPJ(cnpjLimpo)
        .then((response) => {
          setCnpjFound(true)
          // console.log(response)
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

  // Auto-fill via BrasilAPI quando CNPJ for considerado válido pelo backend.
  // Roda só se o usuário ainda não digitou Razão Social manualmente — preserva edição.
  useEffect(() => {
    if (!cnpjValid || !cnpjFound) return
    const cnpjLimpo = cnpjValue?.replace(/\D/g, "") || ""
    if (cnpjLimpo.length !== 14) return

    const razaoAtual = getValues("razaoSocial")
    if (razaoAtual && razaoAtual.trim().length > 0) return

    let cancelled = false
    setCnpjEnriching(true)
    consultarCNPJBrasilAPI(cnpjLimpo)
      .then((dados) => {
        if (cancelled || !dados) return
        // Só preenche campos vazios — usuário sempre pode editar
        if (dados.razaoSocial && !getValues("razaoSocial")) {
          setValue("razaoSocial", dados.razaoSocial, { shouldValidate: true })
        }
        if (dados.nomeFantasia && !getValues("nomeFantasia")) {
          setValue("nomeFantasia", dados.nomeFantasia, { shouldValidate: true })
        }
        if (dados.email && !getValues("email")) {
          setValue("email", dados.email, { shouldValidate: true })
        }
        if (dados.telefone && !getValues("telefone")) {
          setValue("telefone", dados.telefone, { shouldValidate: true })
        }
      })
      .finally(() => {
        if (!cancelled) setCnpjEnriching(false)
      })

    return () => {
      cancelled = true
    }
  }, [cnpjValid, cnpjFound, cnpjValue, getValues, setValue])

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

  const segmentoOptions = [
    { name: 'Barbearia', code: 'BARBEARIA' },
    { name: 'Salão de Beleza', code: 'SALAO_BELEZA' },
    { name: 'Clínica de Estética', code: 'CLINICA_ESTETICA' },
    { name: 'Studio', code: 'STUDIO' },
    { name: 'Nail Designer', code: 'NAIL_DESIGNER' },
    { name: 'Spa', code: 'SPA' },
    { name: 'Massagem', code: 'MASSAGEM' }
  ]

  const handleValidarCupom = () => {
    if (!cupomCodigo.trim() || !selectedPlan) return

    setCupomError("")
    setCupomValid(false)
    setCupomDados(null)

    validarCupom({
      codigoCupom: cupomCodigo.trim().toUpperCase(),
      planoCodigo: selectedPlan,
      cicloCobranca: isAnnual ? "ANUAL" : "MENSAL"
    }).then((response) => {
      if (response.dados?.valid) {
        setCupomValid(true)
        setCupomDados(response.dados)
        setCupomError(response.dados?.message || "Cupom aplicado com sucesso!")
      } else {
        setCupomValid(false)
        setCupomDados(null)
        setCupomError(response.dados?.message || "Cupom inválido ou não aplicável ao plano selecionado")
      }
    }).catch((error) => {
      setCupomValid(false)
      setCupomDados(null)
      setCupomError(error.message || "Erro ao validar cupom")
    })
  }

  const themeArray = Object.values(themes) as Theme[]

  // Watch para validação em tempo real
  useWatch({ control })

  // Efeito para ler parâmetros da URL e pré-selecionar plano e recorrência
  useEffect(() => {
    const planoParam = searchParams.get('plano')
    const recorrenciaParam = searchParams.get('recorrencia')

    // Define a recorrência baseado no parâmetro da URL
    if (recorrenciaParam) {
      setIsAnnual(recorrenciaParam.toLowerCase() === 'anual')
    }

    // Só tenta pré-selecionar o plano depois que a lista foi carregada
    if (planoParam && plano.length > 0 && !selectedPlan) {
      const planoEncontrado = plano.find(p => p.id === planoParam.toLowerCase())
      if (planoEncontrado) {
        setSelectedPlan(planoEncontrado.id)
      }
    }
  }, [searchParams, plano])

  // Rastrear inicio do cadastro
  useEffect(() => {
    if (!cadastroTracked.current) {
      cadastroTracked.current = true
      const planoParam = searchParams.get('plano')
      const recorrenciaParam = searchParams.get('recorrencia')
      // trackCadastroStarted(
      //   planoParam || undefined,
      //   planoParam ? plans.find(p => p.id === planoParam)?.name : undefined,
      //   recorrenciaParam === 'anual' ? 'annual' : 'monthly'
      // )
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Rastrear abandono ao sair da pagina
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isSubmitted && activeStep < 5) {
        trackCadastroAbandoned(activeStep, steps[activeStep]?.label || 'unknown')
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [activeStep, isSubmitted, trackCadastroAbandoned])

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (activeStep === 0) {
      if (!cnpjValid || !cnpjFound) {
        return
      }

      fieldsToValidate = [
        "cnpj", "razaoSocial", "nomeFantasia", "email", "telefone",
        "nomeResponsavel", "publicoAlvo", "segmento"
      ]
      if (!sameEmailAsCompany) fieldsToValidate.push("emailResponsavel")
      if (!samePhoneAsCompany) fieldsToValidate.push("telefoneResponsavel")
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
      trackCadastroStep(activeStep, steps[activeStep]?.label || 'unknown')
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const onSubmit = (data: FormData) => {
    // Guard duro: o cadastro SÓ pode ser efetivado quando o user está no último step
    // e clicou explicitamente em "Finalizar cadastro". Qualquer outro disparo
    // (Enter em input, submit fantasma do form, re-render de animação) é ignorado.
    if (activeStep !== steps.length - 1) {
      return
    }

    const selectedPlanData = plano.find(p => p.id === selectedPlan)
    const selectedThemeData = themeArray.find(t => t.id === data.tema)
    
    // Monta objeto base
    // Inscrição Estadual foi adiada para o onboarding pós-login (campo opcional, payload vazio)
    // Email/Telefone do responsável: se checkbox marcado, copia da empresa para preservar contrato da API
    const finalData: any = {
      cnpj: data.cnpj,
      razaoSocial: data.razaoSocial,
      nomeFantasia: data.nomeFantasia,
      inscricaoEstadual: "",
      email: data.email,
      telefone: data.telefone,
      publicoAlvo: data.publicoAlvo,
      segmento: data.segmento,
      responsavel: {
        nome: data.nomeResponsavel,
        email: sameEmailAsCompany ? data.email : data.emailResponsavel,
        telefone: samePhoneAsCompany ? data.telefone : data.telefoneResponsavel
      },
      endereco: {
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento || "",
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
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
        valor: isAnnual
          ? (selectedPlanData?.promoAnualAtiva && selectedPlanData?.promoAnualPreco > 0
              ? selectedPlanData.promoAnualPreco / 12
              : selectedPlanData?.priceAnnual)
          : (selectedPlanData?.promoMensalAtiva && selectedPlanData?.promoMensalPreco > 0
              ? selectedPlanData.promoMensalPreco
              : selectedPlanData?.price)
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
    
    // console.log("=== DADOS COMPLETOS DO CADASTRO ===")
    console.log(JSON.stringify(finalData))
    // console.log("===================================")
    
    // Aqui você pode fazer a chamada para sua API
    // await api.post('/empresas', finalData)
    
    // setIsSubmitted(true)


    postOrganizacao(finalData).then((response)=>{
      // console.log(response)
      setIsSubmitted(true)
      trackCadastroCompleted(
        selectedPlan,
        plano.find(p => p.id === selectedPlan)?.name,
        isAnnual ? 'annual' : 'monthly'
      )
    }).catch((error)=>{
      console.log(error)
    })
  }

  const isCurrentStepValid = () => {
    if (activeStep === 0) {
      const values = getValues()
      const emailRespOk = sameEmailAsCompany || !!values.emailResponsavel
      const phoneRespOk = samePhoneAsCompany || !!values.telefoneResponsavel
      return !!(
        values.cnpj && values.razaoSocial && values.nomeFantasia &&
        values.email && values.telefone && values.nomeResponsavel &&
        emailRespOk && phoneRespOk &&
        values.publicoAlvo && values.segmento && cnpjValid && cnpjFound &&
        emailValid && emailFound
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
            <div
              className="relative p-12 rounded-3xl border overflow-hidden transition-colors duration-300"
              style={{
                backgroundColor: isDark ? "rgba(26,23,21,0.92)" : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(16px)",
                borderColor: isDark ? "#3d2e28" : "#db6f5728",
                boxShadow: isDark
                  ? "0 30px 60px -20px rgba(0,0,0,0.5), 0 12px 24px -12px rgba(0,0,0,0.3)"
                  : "0 30px 60px -20px rgba(42,36,32,0.16), 0 12px 24px -12px rgba(42,36,32,0.08)",
              }}
            >
              {/* Decorative serif watermark */}
              <span
                aria-hidden
                className="absolute top-4 right-5 font-serif font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(100px, 14vw, 160px)",
                  color: isDark ? "rgba(224,122,98,0.05)" : "rgba(219,111,87,0.07)",
                  letterSpacing: "-0.06em",
                }}
              >
                Oba
              </span>

              <div className="relative">
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
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className={`relative min-h-screen flex flex-col justify-center overflow-hidden pt-10 pb-16 ${theme.mainBg} transition-colors duration-300`}>
      <Header isMenu={true} isCadastro={false}/>

      {/* Background decorativo */}
      <div className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent(theme.patternColor.replace('#', ''))}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: theme.patternOpacity,
        }}
      />

      {/* Blobs animados */}
      <motion.div
        aria-hidden
        className={`absolute top-0 right-0 w-96 h-96 ${theme.blob1} rounded-full blur-3xl pointer-events-none`}
        animate={
          prefersReduced
            ? undefined
            : {
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden
        className={`absolute bottom-0 left-0 w-[480px] h-[480px] ${theme.blob2} rounded-full blur-3xl pointer-events-none`}
        animate={
          prefersReduced
            ? undefined
            : {
                scale: [1, 1.15, 1],
                x: [0, -30, 0],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
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
            <div className="inline-flex items-center gap-3 mb-5">
              <span aria-hidden className="h-px w-10 bg-[#db6f57] opacity-60" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
                Cadastro
                <span className="mx-2 opacity-40">·</span>
                14 dias grátis
              </span>
              <span aria-hidden className="h-px w-10 bg-[#db6f57] opacity-60" />
            </div>
            <h1 className={`font-serif text-4xl md:text-5xl font-bold ${theme.headingColor} mb-4 leading-[1.05] transition-colors duration-300`}>
              Crie sua conta{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #db6f57 0%, #8b3d35 100%)",
                }}
              >
                no Bellory
              </span>
            </h1>
            <p className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto transition-colors duration-300`}>
              Preencha os dados abaixo para começar a transformar seu negócio
            </p>
          </div>

          <div
            className="relative md:p-8 p-4 rounded-3xl border overflow-hidden transition-colors duration-300"
            style={{
              backgroundColor: isDark ? "rgba(26,23,21,0.92)" : "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              borderColor: isDark ? "#3d2e28" : "#db6f5728",
              boxShadow: isDark
                ? "0 30px 60px -20px rgba(0,0,0,0.5), 0 12px 24px -12px rgba(0,0,0,0.3)"
                : "0 30px 60px -20px rgba(42,36,32,0.16), 0 12px 24px -12px rgba(42,36,32,0.08)",
            }}
          >
            {/* Watermark serif decorativo — número do step animado */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`watermark-${activeStep}`}
                aria-hidden
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-2 right-5 md:top-4 md:right-8 font-serif font-black leading-none select-none pointer-events-none tabular-nums"
                style={{
                  fontSize: "clamp(120px, 16vw, 200px)",
                  color: isDark ? "rgba(224,122,98,0.05)" : "rgba(219,111,87,0.06)",
                  letterSpacing: "-0.06em",
                }}
              >
                {String(activeStep + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>

            <div className="relative">
              {/* Stepper Header */}
              <div className="mb-10 md:mb-12">
                {/* Progress feedback row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#db6f57]">
                    Passo {activeStep + 1} de {steps.length}
                  </span>
                  <span
                    className={`text-[11px] tracking-wider font-medium ${
                      isDark ? "text-[#B8AEA4]/70" : "text-[#5a4a42]/55"
                    }`}
                  >
                    {Math.round(((activeStep + 1) / steps.length) * 100)}% completo
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className={`relative h-1 rounded-full overflow-hidden mb-8 md:mb-10 ${
                    isDark ? "bg-[#2D2925]" : "bg-[#e6d9d4]"
                  }`}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(90deg, #db6f57 0%, #c55a42 100%)",
                    }}
                    initial={false}
                    animate={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {!prefersReduced && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                        }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 0.6,
                        }}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Stepper — flexbox-based, no magic numbers */}
                <div className="flex items-start justify-between gap-1 md:gap-2">
                  {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id)
                    const isActive = activeStep === step.id
                    const StepIcon = step.icon
                    const nextCompleted =
                      index < steps.length - 1 &&
                      completedSteps.includes(steps[index].id)

                    return (
                      <div key={step.id} className="flex items-start flex-1 min-w-0 last:flex-none">
                        {/* Icon + label column */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <motion.div
                            animate={{ scale: isActive ? 1.1 : 1 }}
                            className={`relative z-10 md:w-14 md:h-14 w-10 h-10 md:rounded-2xl rounded-lg flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? "bg-gradient-to-br from-[#5a7a6e] to-[#4f6f64] text-white shadow-lg"
                                : isActive
                                ? "border-2 text-white shadow-xl"
                                : `${isDark ? `bg-[#e6d9d4]/20 ${theme.textSecondary}` : "bg-[#e6d9d4] text-[#4f6f64]"}`
                            }`}
                            style={
                              isActive && !isCompleted
                                ? {
                                    background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                                    borderColor: step.color,
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

                          <span
                            className={`hidden md:block text-xs mt-3 font-semibold transition-colors duration-300 text-center ${
                              isActive ? theme.textPrimary : theme.textMuted
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>

                        {/* Connector — flex-grow space between icons */}
                        {index < steps.length - 1 && (
                          <div className="flex-1 flex items-center md:h-14 h-10 px-1 md:px-2 min-w-[8px]">
                            <div
                              className={`w-full h-0.5 md:h-1 rounded-full transition-all duration-500 ${
                                nextCompleted
                                  ? "bg-gradient-to-r from-[#5a7a6e] to-[#4f6f64]"
                                  : isDark
                                  ? "bg-[#2D2925]"
                                  : "bg-[#e6d9d4]"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

            {/* Form Content */}
            <form
              onSubmit={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                // Bloqueia Enter em inputs/selects de disparar submit do form.
                // O submit só pode acontecer via clique explícito no botão "Finalizar cadastro"
                // (que agora é type="button" e chama handleSubmit programaticamente).
                if (e.key !== "Enter") return
                const tag = (e.target as HTMLElement).tagName
                if (tag === "TEXTAREA") return
                e.preventDefault()
              }}
              autoComplete="off"
            >
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
                    <div className="space-y-8">
                      {/* ─── Section header ─── */}
                      <div className="flex items-center gap-3 mb-2 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-xl bg-[#db6f57]/10 flex items-center justify-center">
                          <Building2 className={`w-6 h-6 ${isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}`} />
                        </div>
                        <div>
                          <h3 className={`font-serif text-xl md:text-2xl font-bold ${theme.textPrimary} transition-colors duration-300 leading-tight`}>
                            Informações da empresa
                          </h3>
                          <p className={`text-sm ${theme.textMuted} transition-colors duration-300 mt-0.5`}>
                            Comece pelo CNPJ — a gente preenche o resto pra você.
                          </p>
                        </div>
                      </div>

                      {/* ─── Bloco: Identificação ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Identificação
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                              <FormInput
                                label="CNPJ"
                                mask="99.999.999/9999-99"
                                placeholder="00.000.000/0000-00"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                required
                                isDark={isDark}
                                loading={isPending}
                                loadingMessage="Validando CNPJ..."
                                success={cnpjFound && cnpjValid}
                                successMessage={cnpjEnriching ? "Buscando dados da empresa..." : (cnpjFound && cnpjValid ? cnpjError : undefined)}
                                error={cnpjFound && !cnpjValid ? cnpjError : (errors.cnpj && !cnpjFound ? errors.cnpj.message : undefined)}
                                autoFocus
                              />
                            )}
                          />

                          <Controller
                            name="nomeFantasia"
                            control={control}
                            rules={{ required: "Nome Fantasia é obrigatório" }}
                            render={({ field }) => (
                              <FormInput
                                label="Nome fantasia"
                                placeholder="Como seu negócio é conhecido"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                required
                                isDark={isDark}
                                error={errors.nomeFantasia?.message}
                              />
                            )}
                          />

                          <div className="md:col-span-2">
                            <Controller
                              name="razaoSocial"
                              control={control}
                              rules={{ required: "Razão Social é obrigatória" }}
                              render={({ field }) => (
                                <FormInput
                                  label="Razão social"
                                  placeholder="Nome legal da empresa"
                                  name={field.name}
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  required
                                  isDark={isDark}
                                  loading={cnpjEnriching}
                                  helperText={!field.value && !cnpjEnriching ? "Vai ser preenchido automaticamente quando você digitar o CNPJ." : undefined}
                                  error={errors.razaoSocial?.message}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* ─── Bloco: Categoria ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Categoria do negócio
                          </span>
                        </div>

                        <Controller
                          name="publicoAlvo"
                          control={control}
                          rules={{ required: "Público Alvo é obrigatório" }}
                          render={({ field }) => (
                            <FormPillSelector
                              label="Público alvo"
                              required
                              isDark={isDark}
                              options={publicoAlvoOptions}
                              value={field.value}
                              onChange={field.onChange}
                              error={errors.publicoAlvo?.message}
                            />
                          )}
                        />

                        <Controller
                          name="segmento"
                          control={control}
                          rules={{ required: "Segmento é obrigatório" }}
                          render={({ field }) => (
                            <FormSelect
                              label="Segmento"
                              required
                              isDark={isDark}
                              options={segmentoOptions}
                              optionLabel="name"
                              optionValue="code"
                              placeholder="Selecione o segmento"
                              value={field.value}
                              onChange={(e) => field.onChange(e.value)}
                              error={errors.segmento?.message}
                            />
                          )}
                        />
                      </div>

                      {/* ─── Bloco: Contato da empresa ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Contato da empresa
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                if (!email || !emailRegex.test(email)) return true
                                if (!emailFound) return "Aguardando validação do email"
                                if (!emailValid) return "Email já cadastrado"
                                return true
                              }
                            }}
                            render={({ field }) => (
                              <FormInput
                                label="E-mail da empresa"
                                type="email"
                                placeholder="contato@empresa.com"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                required
                                isDark={isDark}
                                loading={isPendingEmail}
                                loadingMessage="Validando email..."
                                success={emailFound && emailValid}
                                successMessage={emailFound && emailValid ? emailError : undefined}
                                error={emailFound && !emailValid ? emailError : (errors.email && !emailFound ? errors.email.message : undefined)}
                              />
                            )}
                          />

                          <Controller
                            name="telefone"
                            control={control}
                            rules={{ required: "Telefone é obrigatório" }}
                            render={({ field }) => (
                              <FormInput
                                label="Telefone da empresa"
                                mask="(99) 99999-9999"
                                placeholder="(00) 00000-0000"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                required
                                isDark={isDark}
                                error={errors.telefone?.message}
                              />
                            )}
                          />
                        </div>
                      </div>

                      {/* ─── Bloco: Responsável ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Pessoa responsável
                          </span>
                        </div>

                        <Controller
                          name="nomeResponsavel"
                          control={control}
                          rules={{ required: "Nome do Responsável é obrigatório" }}
                          render={({ field }) => (
                            <FormInput
                              label="Nome do responsável"
                              placeholder="Nome completo de quem gerencia"
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              required
                              isDark={isDark}
                              error={errors.nomeResponsavel?.message}
                            />
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormCheckbox
                            label="Mesmo e-mail da empresa"
                            description="Marque se o responsável usa o e-mail informado acima."
                            checked={sameEmailAsCompany}
                            onChange={setSameEmailAsCompany}
                            isDark={isDark}
                          />
                          <FormCheckbox
                            label="Mesmo telefone da empresa"
                            description="Marque se o responsável atende no mesmo número."
                            checked={samePhoneAsCompany}
                            onChange={setSamePhoneAsCompany}
                            isDark={isDark}
                          />
                        </div>

                        <AnimatePresence initial={false}>
                          {(!sameEmailAsCompany || !samePhoneAsCompany) && (
                            <motion.div
                              key="responsavel-extra"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                                {!sameEmailAsCompany && (
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
                                      <FormInput
                                        label="E-mail do responsável"
                                        type="email"
                                        placeholder="responsavel@email.com"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        required
                                        isDark={isDark}
                                        error={errors.emailResponsavel?.message}
                                      />
                                    )}
                                  />
                                )}

                                {!samePhoneAsCompany && (
                                  <Controller
                                    name="telefoneResponsavel"
                                    control={control}
                                    rules={{ required: "Telefone do Responsável é obrigatório" }}
                                    render={({ field }) => (
                                      <FormInput
                                        label="Telefone do responsável"
                                        mask="(99) 99999-9999"
                                        placeholder="(00) 00000-0000"
                                        name={field.name}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        required
                                        isDark={isDark}
                                        error={errors.telefoneResponsavel?.message}
                                      />
                                    )}
                                  />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                    <div className="space-y-8">
                      {/* ─── Section header ─── */}
                      <div className="flex items-center gap-3 mb-2 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-xl bg-[#8b3d35]/10 flex items-center justify-center">
                          <KeyRound className={`w-6 h-6 ${isDark ? 'text-[#A8524A]' : 'text-[#8b3d35]'}`} />
                        </div>
                        <div>
                          <h3 className={`font-serif text-xl md:text-2xl font-bold ${theme.textPrimary} transition-colors duration-300 leading-tight`}>
                            Acesso ao sistema
                          </h3>
                          <p className={`text-sm ${theme.textMuted} transition-colors duration-300 mt-0.5`}>
                            Suas credenciais pra entrar no Bellory.
                          </p>
                        </div>
                      </div>

                      {/* ─── Bloco: Identificação de usuário ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Nome de usuário
                          </span>
                        </div>

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
                              if (!username || username.length < 6) return true
                              if (!usernameFound) return "Aguardando validação do username"
                              if (!usernameValid) return "Username já cadastrado"
                              return true
                            }
                          }}
                          render={({ field }) => (
                            <FormInput
                              label="Login / usuário"
                              placeholder="ex: barbeariadojoao"
                              name={field.name}
                              value={field.value}
                              onBlur={field.onBlur}
                              onChange={(e: any) => field.onChange(e.target.value.toLowerCase())}
                              required
                              isDark={isDark}
                              autoFocus
                              loading={isPendingUsername}
                              loadingMessage="Validando username..."
                              success={usernameFound && usernameValid}
                              successMessage={usernameFound && usernameValid ? usernameError : undefined}
                              error={
                                usernameFound && !usernameValid
                                  ? usernameError
                                  : (errors.login && !usernameFound ? errors.login.message : undefined)
                              }
                              helperText={!field.value ? "Mínimo 6 caracteres · só letras minúsculas e números" : undefined}
                            />
                          )}
                        />
                      </div>

                      {/* ─── Bloco: Senha ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Senha de acesso
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                              <FormInput
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mínimo 6 caracteres"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                required
                                isDark={isDark}
                                showStatusIcon={false}
                                error={errors.senha?.message}
                                endAdornment={
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    className={`transition-colors ${
                                      isDark
                                        ? "text-[#B8AEA4] hover:text-[#E07A62]"
                                        : "text-[#5a4a42]/55 hover:text-[#db6f57]"
                                    }`}
                                  >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                }
                              />
                            )}
                          />

                          <Controller
                            name="confSenha"
                            control={control}
                            rules={{
                              required: "Confirme a senha",
                              validate: (value) =>
                                value === watch("senha") || "As senhas não coincidem"
                            }}
                            render={({ field }) => (
                              <FormInput
                                label="Confirmar senha"
                                type={showConfPassword ? "text" : "password"}
                                placeholder="Digite a senha novamente"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                required
                                isDark={isDark}
                                showStatusIcon={false}
                                error={errors.confSenha?.message}
                                success={
                                  !!field.value &&
                                  !!watch("senha") &&
                                  field.value === watch("senha") &&
                                  !errors.confSenha
                                }
                                successMessage={
                                  !!field.value &&
                                  !!watch("senha") &&
                                  field.value === watch("senha") &&
                                  !errors.confSenha
                                    ? "Senhas conferem"
                                    : undefined
                                }
                                endAdornment={
                                  <button
                                    type="button"
                                    onClick={() => setShowConfPassword(!showConfPassword)}
                                    aria-label={showConfPassword ? "Ocultar senha" : "Mostrar senha"}
                                    className={`transition-colors ${
                                      isDark
                                        ? "text-[#B8AEA4] hover:text-[#E07A62]"
                                        : "text-[#5a4a42]/55 hover:text-[#db6f57]"
                                    }`}
                                  >
                                    {showConfPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                  </button>
                                }
                              />
                            )}
                          />
                        </div>

                        {/* Dica de segurança discreta */}
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
                            className={`text-[12px] leading-relaxed flex items-start gap-2 ${
                              isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/80"
                            }`}
                          >
                            <KeyRound
                              className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                                isDark ? "text-[#E07A62]" : "text-[#db6f57]"
                              }`}
                            />
                            <span>
                              Use uma senha forte — combine letras maiúsculas, minúsculas, números e símbolos.
                              Evite reaproveitar senha de outros lugares.
                            </span>
                          </p>
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
                    <div className="space-y-8">
                      {/* ─── Section header ─── */}
                      <div className="flex items-center gap-3 mb-2 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-xl bg-[#4f6f64]/10 flex items-center justify-center">
                          <CreditCard className={`w-6 h-6 ${isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}`} />
                        </div>
                        <div>
                          <h3 className={`font-serif text-xl md:text-2xl font-bold ${theme.textPrimary} transition-colors duration-300 leading-tight`}>
                            Escolha seu plano
                          </h3>
                          <p className={`text-sm ${theme.textMuted} transition-colors duration-300 mt-0.5`}>
                            Comece grátis. Você só paga depois dos 14 dias se quiser continuar.
                          </p>
                        </div>
                      </div>

                      {/* ─── Bloco: Período de cobrança ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Período de cobrança
                          </span>
                        </div>

                        {/* Tip card warm translúcido */}
                        <div
                          className="rounded-2xl border p-4 backdrop-blur"
                          style={{
                            backgroundColor: isDark ? "rgba(107,143,130,0.08)" : "rgba(79,111,100,0.06)",
                            borderColor: isDark ? "rgba(107,143,130,0.20)" : "rgba(79,111,100,0.20)",
                          }}
                        >
                          <p className={`text-[13px] leading-relaxed flex items-center justify-center gap-2 flex-wrap ${isDark ? 'text-[#F5F0EB]' : 'text-[#2a2420]'} font-medium`}>
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}`} />
                            <span>14 dias grátis</span>
                            <span className={isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/40'}>·</span>
                            <span>Sem cartão de crédito</span>
                            <span className={isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/40'}>·</span>
                            <span>Cancele quando quiser</span>
                          </p>
                        </div>

                        {/* Toggle Mensal/Anual */}
                        <div className="flex items-center justify-center gap-4 pt-2">
                          <span className={`text-[13px] font-semibold transition-colors duration-300 ${!isAnnual ? (isDark ? 'text-[#F5F0EB]' : 'text-[#2a2420]') : (isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/55')}`}>
                            Mensal
                          </span>

                          <button
                            type="button"
                            onClick={() => { setIsAnnual(!isAnnual); setCupomValid(false); setCupomError(""); setCupomDados(null); }}
                            className="relative w-16 h-8 rounded-full transition-colors duration-300"
                            style={{
                              background: isAnnual
                                ? 'linear-gradient(90deg, #db6f57 0%, #c55a42 100%)'
                                : isDark ? '#2D2925' : '#e6d9d4',
                              boxShadow: isAnnual ? '0 4px 12px rgba(219,111,87,0.32)' : 'none',
                            }}
                            aria-label={isAnnual ? "Mudar para Mensal" : "Mudar para Anual"}
                          >
                            <div
                              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300"
                              style={{ transform: isAnnual ? 'translateX(32px)' : 'translateX(0)' }}
                            />
                          </button>

                          <span className={`text-[13px] font-semibold transition-colors duration-300 ${isAnnual ? (isDark ? 'text-[#F5F0EB]' : 'text-[#2a2420]') : (isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/55')}`}>
                            Anual
                          </span>

                          <AnimatePresence initial={false}>
                            {isAnnual && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.85, x: -8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.85, x: -8 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="px-2.5 py-1 text-[11px] font-bold rounded-full text-white"
                                style={{
                                  background: "linear-gradient(135deg, #5a7a6e 0%, #4f6f64 100%)",
                                  boxShadow: "0 4px 10px rgba(79,111,100,0.32)",
                                }}
                              >
                                Economize 20%
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* ─── Bloco: Planos disponíveis ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Planos disponíveis
                          </span>
                        </div>

                      {/* Cards de planos selecionáveis */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plano.map((plan) => {
                          const hasMonthlyPromo =
                            !isAnnual && plan.promoMensalAtiva && plan.promoMensalPreco != null && plan.promoMensalPreco > 0
                          const hasAnnualPromo =
                            isAnnual && plan.promoAnualAtiva && plan.promoAnualPreco != null && plan.promoAnualPreco > 0
                          const basePrice = isAnnual ? plan.yearlyPrice : plan.price
                          const displayPrice = hasMonthlyPromo
                            ? plan.promoMensalPreco
                            : hasAnnualPromo
                              ? plan.promoAnualPreco / 12
                              : basePrice
                          const promoOriginal = hasMonthlyPromo
                            ? plan.price
                            : hasAnnualPromo
                              ? plan.yearlyPrice
                              : null
                          const hasPromo = hasMonthlyPromo || hasAnnualPromo
                          const promoTexto = hasMonthlyPromo ? plan.promoMensalTexto : plan.promoAnualTexto
                          const savings = plan.price > 0 ? ((plan.price - plan.yearlyPrice) * 12).toFixed(0) : 0
                          const isSelected = selectedPlan === plan.id
                          const discountPercent = plan.price > 0 ? Math.round(((plan.price - plan.yearlyPrice) / plan.price) * 100) : 0
                          const totalAnnualOriginal = plan.yearlyPrice * 12
                          const totalAnnual = hasAnnualPromo ? Number(plan.promoAnualPreco) : totalAnnualOriginal
                          const promoAnnualSavings = hasAnnualPromo ? (totalAnnualOriginal - totalAnnual).toFixed(0) : 0

                          return (
                            <motion.button
                              key={plan.id}
                              type="button"
                              onClick={() => { setSelectedPlan(plan.id); setCupomValid(false); setCupomError(""); setCupomDados(null); }}
                              whileHover={{ y: -4, scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className="relative p-6 rounded-2xl border transition-colors duration-300 text-left backdrop-blur"
                              style={{
                                backgroundColor: isSelected
                                  ? (isDark ? "rgba(224,122,98,0.08)" : "rgba(219,111,87,0.05)")
                                  : (isDark ? "rgba(26,23,21,0.6)" : "rgba(255,255,255,0.85)"),
                                borderColor: isSelected
                                  ? (isDark ? "#E07A62" : "#db6f57")
                                  : (isDark ? "#2D2925" : "#e6d9d4"),
                                borderWidth: isSelected ? "1.5px" : "1px",
                                boxShadow: isSelected
                                  ? (isDark
                                      ? "0 16px 36px -10px rgba(224,122,98,0.32), 0 4px 12px -4px rgba(224,122,98,0.18)"
                                      : "0 16px 36px -10px rgba(219,111,87,0.28), 0 4px 12px -4px rgba(219,111,87,0.14)")
                                  : (isDark
                                      ? "0 4px 16px -4px rgba(0,0,0,0.4)"
                                      : "0 4px 16px -4px rgba(42,36,32,0.06)"),
                              }}
                            >
                              {/* Badge popular */}
                              {plan.badge && (
                                <div
                                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-white"
                                  style={{
                                    background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                                    boxShadow: `0 6px 14px ${plan.color}55`,
                                  }}
                                >
                                  {plan.badge}
                                </div>
                              )}

                              {/* Checkbox de seleção */}
                              <div className="absolute top-4 right-4">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                                  style={
                                    isSelected
                                      ? {
                                          background: "linear-gradient(135deg, #db6f57 0%, #c55a42 100%)",
                                          boxShadow: "0 4px 10px rgba(219,111,87,0.35)",
                                        }
                                      : {
                                          border: `1.5px solid ${isDark ? "#2D2925" : "#e6d9d4"}`,
                                        }
                                  }
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                </div>
                              </div>

                              {/* Conteúdo do card */}
                              <div className="pr-8">
                                {/* Ícone e nome */}
                                <div className="flex items-center gap-3 mb-4">
                                  <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
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
                                  {/* Preço original riscado e desconto (aba anual sem promo anual) */}
                                  {isAnnual && plan.price > 0 && !hasAnnualPromo && (
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

                                  {/* Destaque de promoção vigente */}
                                  {hasPromo && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white shadow"
                                        style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)` }}
                                      >
                                        🔥 {promoTexto ?? "Promoção"}
                                      </span>
                                      {promoOriginal != null && (
                                        <span className={`text-sm line-through ${theme.textMuted}`}>
                                          R$ {promoOriginal.toFixed(2).replace('.', ',')}
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  <div className="flex items-baseline gap-2">
                                    {cupomValid && cupomDados && isSelected ? (
                                      <>
                                        <span className={`text-lg line-through ${theme.textMuted}`}>
                                          R$ {cupomDados.originalValue.toFixed(2).replace('.', ',')}
                                        </span>
                                        <span className={`text-4xl font-bold ${isDark ? 'text-[#5a7a6e]' : 'text-[#4f6f64]'}`}>
                                          R$ {cupomDados.finalValue.toFixed(2).replace('.', ',')}
                                        </span>
                                      </>
                                    ) : (
                                      <span className={`text-4xl font-bold ${isDark? `text-[#F5F0EB]`:`text-[#2a2420]`}`} style={{ color: theme.textPrimary }}>
                                        R$ {displayPrice.toFixed(2).replace('.', ',')}
                                      </span>
                                    )}
                                    {plan.price > 0 && (
                                      <span className={`${isDark? `text-[#B8AEA4]`:`text-[#4f6f64]`}`}>/mês</span>
                                    )}
                                  </div>

                                  {/* Informações do plano anual */}
                                  {isAnnual && plan.price > 0 && (
                                    <div className="mt-3 space-y-2">
                                      {/* Preço total anual */}
                                      <div className={`text-sm ${isDark? `text-[#B8AEA4]`:`text-[#4f6f64]`}`} style={{ color: isDark?theme.textSecondary:'text-[#4f6f64]' }}>
                                        {hasAnnualPromo && (
                                          <span className={`line-through ${theme.textMuted} mr-2`}>
                                            R$ {totalAnnualOriginal.toFixed(2).replace('.', ',')}
                                          </span>
                                        )}
                                        <span className={`font-semibold`}>
                                          R$ {totalAnnual.toFixed(2).replace('.', ',')}
                                        </span>
                                        {' '}cobrado anualmente
                                      </div>

                                      {/* Economia total */}
                                      {hasAnnualPromo && Number(promoAnnualSavings) > 0 ? (
                                        <div
                                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                                          style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                                        >
                                          💰 Economize R$ {promoAnnualSavings} com a promo
                                        </div>
                                      ) : Number(savings) > 0 && (
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

                            </motion.button>
                          )
                        })}
                      </div>
                      </div>

                      {/* ─── Bloco: Cupom de desconto ─── */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-2">
                          <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                            Cupom de desconto
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                          <div className="flex-1">
                            <FormInput
                              label="Código do cupom"
                              icon={Gift}
                              placeholder={selectedPlan ? "ex: BELLORY10" : "Selecione um plano primeiro"}
                              value={cupomCodigo}
                              onChange={(e: any) => {
                                setCupomCodigo(e.target.value.toUpperCase())
                                setCupomValid(false)
                                setCupomError("")
                                setCupomDados(null)
                              }}
                              disabled={!selectedPlan}
                              isDark={isDark}
                              loading={isPendingCupom}
                              loadingMessage="Validando cupom..."
                              success={cupomValid}
                              successMessage={cupomValid ? cupomError : undefined}
                              error={!cupomValid && cupomError ? cupomError : undefined}
                              inputClassName="uppercase"
                            />
                          </div>
                          <FormButton
                            type="button"
                            onClick={handleValidarCupom}
                            disabled={!selectedPlan || !cupomCodigo.trim() || isPendingCupom}
                            label={isPendingCupom ? "Aplicando..." : "Aplicar"}
                            variant="primary"
                            size="md"
                            isDark={isDark}
                            loading={isPendingCupom}
                            loadingLabel="Aplicando..."
                          />
                        </div>

                        {/* Detalhe do desconto aplicado */}
                        <AnimatePresence initial={false}>
                          {cupomValid && cupomDados && (
                            <motion.div
                              key="cupom-detalhe"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div
                                className="rounded-2xl border p-5 backdrop-blur"
                                style={{
                                  backgroundColor: isDark ? "rgba(107,143,130,0.10)" : "rgba(79,111,100,0.06)",
                                  borderColor: isDark ? "rgba(107,143,130,0.25)" : "rgba(79,111,100,0.22)",
                                }}
                              >
                                <div className="flex items-center justify-between text-[13px]">
                                  <span className={isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/70"}>
                                    Valor original
                                  </span>
                                  <span className={`${theme.textPrimary} line-through`}>
                                    R$ {cupomDados.originalValue.toFixed(2).replace('.', ',')}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[13px] mt-1.5">
                                  <span className={isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/70"}>
                                    Desconto{" "}
                                    <span className="font-mono">
                                      ({cupomDados.discountType === 'PERCENTAGE'
                                        ? `${cupomDados.percentualDiscount}%`
                                        : `R$ ${cupomDados.discountAmount.toFixed(2).replace('.', ',')}`})
                                    </span>
                                  </span>
                                  <span className={`font-semibold ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}>
                                    − R$ {(cupomDados.originalValue - cupomDados.finalValue).toFixed(2).replace('.', ',')}
                                  </span>
                                </div>
                                <div
                                  className="flex items-center justify-between mt-3 pt-3 border-t"
                                  style={{ borderColor: isDark ? "rgba(107,143,130,0.25)" : "rgba(79,111,100,0.22)" }}
                                >
                                  <span className={`font-bold text-[14px] ${theme.textPrimary}`}>Valor final</span>
                                  <span className={`text-lg font-bold ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}>
                                    R$ {cupomDados.finalValue.toFixed(2).replace('.', ',')}
                                    <span className={`ml-1 text-[12px] font-medium ${isDark ? 'text-[#B8AEA4]' : 'text-[#5a4a42]/65'}`}>
                                      /mês
                                    </span>
                                  </span>
                                </div>
                                <div
                                  className={`mt-4 px-3 py-2 rounded-xl text-[12px] flex items-start gap-2 ${
                                    cupomDados.applicationType === 'RECURRING'
                                      ? isDark ? 'bg-[#4f6f64]/15 text-[#7AB8A4]' : 'bg-[#4f6f64]/8 text-[#4f6f64]'
                                      : isDark ? 'bg-[#db6f57]/15 text-[#E07A62]' : 'bg-[#db6f57]/8 text-[#db6f57]'
                                  }`}
                                >
                                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                  <span className="leading-snug">
                                    {cupomDados.applicationDescription
                                      ? cupomDados.applicationDescription
                                      : cupomDados.applicationType === 'RECURRING'
                                        ? 'Desconto aplicado em todas as cobranças enquanto o cupom estiver vigente.'
                                        : 'Desconto aplicado somente na primeira cobrança.'}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* ─── Bloco: Recursos do plano selecionado ─── */}
                      <AnimatePresence initial={false}>
                        {selectedPlan && (
                          <motion.div
                            key="plano-features"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-5 pt-2">
                              <div className="flex items-center gap-2">
                                <span aria-hidden className="h-px w-8 bg-[#db6f57] opacity-50" />
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                                  Recursos do plano {plano.find(p => p.id === selectedPlan)?.name}
                                </span>
                              </div>

                              <div
                                className="rounded-2xl border p-5 backdrop-blur"
                                style={{
                                  backgroundColor: isDark ? "rgba(26,23,21,0.6)" : "rgba(255,255,255,0.85)",
                                  borderColor: isDark ? "#2D2925" : "#e6d9d4",
                                }}
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {plano.find(p => p.id === selectedPlan)?.features.map((feature: any, i: number) => (
                                    <div key={i} className="flex items-start gap-2">
                                      {feature.included ? (
                                        <Check
                                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}
                                          strokeWidth={2.5}
                                        />
                                      ) : (
                                        <X
                                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-[#3D3630]' : 'text-[#5a4a42]/30'}`}
                                        />
                                      )}
                                      <span className={`text-[13px] leading-snug transition-colors duration-300 ${
                                        feature.included
                                          ? theme.textPrimary
                                          : (isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/45') + ' line-through'
                                      }`}>
                                        {feature.text}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Helper text final */}
                      <p className={`text-center text-[12px] ${isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/55'} transition-colors duration-300 italic`}>
                        Você pode começar gratuitamente e adicionar um método de pagamento depois.
                      </p>
                    </div>
                  )}

                  {/* Step 5: Confirmação */}
                  {activeStep === 5 && (() => {
                    // Helpers locais (puramente de leitura — não alteram estado)
                    const cardBgStyle = {
                      backgroundColor: isDark ? "rgba(26,23,21,0.6)" : "rgba(255,255,255,0.85)",
                      borderColor: isDark ? "#2D2925" : "#e6d9d4",
                    }
                    const labelClass = `text-[10px] uppercase tracking-wider font-bold mb-1 block ${isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/55'}`
                    const valueClass = `text-[14px] font-semibold ${theme.textPrimary} transition-colors duration-300 break-words`

                    const goToStep = (stepIndex: number) => () => setActiveStep(stepIndex)

                    const SectionCard = ({
                      icon: Icon,
                      iconColor,
                      iconBg,
                      title,
                      eyebrow,
                      onEdit,
                      children,
                    }: {
                      icon: any
                      iconColor: string
                      iconBg: string
                      title: string
                      eyebrow: string
                      onEdit: () => void
                      children: React.ReactNode
                    }) => (
                      <div
                        className="relative rounded-2xl border p-6 backdrop-blur transition-colors duration-300"
                        style={cardBgStyle}
                      >
                        <div className="flex items-start justify-between gap-3 mb-5">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                              <Icon className={`w-5 h-5 ${iconColor}`} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span aria-hidden className="h-px w-6 bg-[#db6f57] opacity-50" />
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                                  {eyebrow}
                                </span>
                              </div>
                              <h4 className={`font-serif text-base md:text-lg font-bold leading-tight ${theme.textPrimary} transition-colors duration-300`}>
                                {title}
                              </h4>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={onEdit}
                            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all hover:scale-105 ${
                              isDark
                                ? 'text-[#B8AEA4] bg-[#2D2925]/60 hover:text-[#E07A62] hover:bg-[#E07A62]/10'
                                : 'text-[#5a4a42]/65 bg-[#faf8f6] hover:text-[#db6f57] hover:bg-[#db6f57]/8'
                            }`}
                            aria-label={`Editar ${title}`}
                          >
                            <Pencil className="w-3 h-3" />
                            Editar
                          </button>
                        </div>
                        {children}
                      </div>
                    )

                    const responsavelEmail = sameEmailAsCompany ? getValues("email") : getValues("emailResponsavel")
                    const responsavelTelefone = samePhoneAsCompany ? getValues("telefone") : getValues("telefoneResponsavel")
                    const selectedTheme = themeArray.find(t => t.id === getValues("tema"))
                    const sp = plano.find(p => p.id === selectedPlan)
                    const SelectedPlanIcon = sp?.icon

                    return (
                      <div className="space-y-7">
                        {/* ─── Section header ─── */}
                        <div className="flex items-center gap-3 mb-2 transition-colors duration-300">
                          <div className="w-12 h-12 rounded-xl bg-[#8b3d35]/10 flex items-center justify-center">
                            <CheckCircle className={`w-6 h-6 ${isDark ? 'text-[#A8524A]' : 'text-[#8b3d35]'}`} />
                          </div>
                          <div>
                            <h3 className={`font-serif text-xl md:text-2xl font-bold ${theme.textPrimary} transition-colors duration-300 leading-tight`}>
                              Última conferida
                            </h3>
                            <p className={`text-sm ${theme.textMuted} transition-colors duration-300 mt-0.5`}>
                              Tudo certo? Toca em <strong className={isDark ? 'text-[#F5F0EB]' : 'text-[#2a2420]'}>Editar</strong> em qualquer bloco pra ajustar.
                            </p>
                          </div>
                        </div>

                        {/* ─── Empresa ─── */}
                        <SectionCard
                          icon={Building2}
                          iconColor={isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}
                          iconBg="bg-[#db6f57]/10"
                          eyebrow="Empresa"
                          title="Informações do negócio"
                          onEdit={goToStep(0)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className={labelClass}>CNPJ</span>
                              <span className={`font-mono tabular-nums ${valueClass}`}>{getValues("cnpj")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>Razão social</span>
                              <span className={valueClass}>{getValues("razaoSocial")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>Nome fantasia</span>
                              <span className={valueClass}>{getValues("nomeFantasia")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>Público alvo</span>
                              <span className={valueClass}>
                                {publicoAlvoOptions.find(p => p.code === getValues("publicoAlvo"))?.name}
                              </span>
                            </div>
                            <div>
                              <span className={labelClass}>Segmento</span>
                              <span className={valueClass}>
                                {segmentoOptions.find(s => s.code === getValues("segmento"))?.name}
                              </span>
                            </div>
                            <div>
                              <span className={labelClass}>E-mail</span>
                              <span className={valueClass}>{getValues("email")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>Telefone</span>
                              <span className={`font-mono tabular-nums ${valueClass}`}>{getValues("telefone")}</span>
                            </div>
                          </div>
                        </SectionCard>

                        {/* ─── Responsável ─── */}
                        <SectionCard
                          icon={User}
                          iconColor={isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}
                          iconBg="bg-[#db6f57]/10"
                          eyebrow="Pessoa responsável"
                          title="Quem gerencia"
                          onEdit={goToStep(0)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <span className={labelClass}>Nome</span>
                              <span className={valueClass}>{getValues("nomeResponsavel")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>
                                E-mail
                                {sameEmailAsCompany && (
                                  <span className={`ml-1.5 normal-case tracking-normal text-[9px] font-semibold ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}>
                                    (mesmo da empresa)
                                  </span>
                                )}
                              </span>
                              <span className={valueClass}>{responsavelEmail}</span>
                            </div>
                            <div>
                              <span className={labelClass}>
                                Telefone
                                {samePhoneAsCompany && (
                                  <span className={`ml-1.5 normal-case tracking-normal text-[9px] font-semibold ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}>
                                    (mesmo da empresa)
                                  </span>
                                )}
                              </span>
                              <span className={`font-mono tabular-nums ${valueClass}`}>{responsavelTelefone}</span>
                            </div>
                          </div>
                        </SectionCard>

                        {/* ─── Endereço ─── */}
                        <SectionCard
                          icon={MapPin}
                          iconColor={isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}
                          iconBg="bg-[#4f6f64]/10"
                          eyebrow="Localização"
                          title="Onde fica"
                          onEdit={goToStep(1)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <span className={labelClass}>Logradouro</span>
                              <span className={valueClass}>
                                {getValues("rua")}, {getValues("numero")}
                                {getValues("complemento") && (
                                  <span className={isDark ? 'text-[#B8AEA4]' : 'text-[#5a4a42]/65'}>
                                    {' · '}{getValues("complemento")}
                                  </span>
                                )}
                              </span>
                            </div>
                            <div>
                              <span className={labelClass}>Bairro</span>
                              <span className={valueClass}>{getValues("bairro")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>Cidade / Estado</span>
                              <span className={valueClass}>{getValues("cidade")} · {getValues("estado")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>CEP</span>
                              <span className={`font-mono tabular-nums ${valueClass}`}>{getValues("cep")}</span>
                            </div>
                            {getValues("latitude") && getValues("longitude") && (
                              <div>
                                <span className={labelClass}>Coordenadas</span>
                                <span className={`font-mono tabular-nums ${valueClass} text-[12px]`}>
                                  {Number(getValues("latitude")).toFixed(6)}, {Number(getValues("longitude")).toFixed(6)}
                                </span>
                              </div>
                            )}
                          </div>
                        </SectionCard>

                        {/* ─── Acesso ─── */}
                        <SectionCard
                          icon={KeyRound}
                          iconColor={isDark ? 'text-[#A8524A]' : 'text-[#8b3d35]'}
                          iconBg="bg-[#8b3d35]/10"
                          eyebrow="Acesso ao sistema"
                          title="Suas credenciais"
                          onEdit={goToStep(2)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className={labelClass}>Login / usuário</span>
                              <span className={`font-mono ${valueClass}`}>{getValues("login")}</span>
                            </div>
                            <div>
                              <span className={labelClass}>Senha</span>
                              <span className={`font-mono tabular-nums ${valueClass}`}>••••••••</span>
                            </div>
                          </div>
                        </SectionCard>

                        {/* ─── Tema ─── */}
                        <SectionCard
                          icon={Palette}
                          iconColor={isDark ? 'text-[#E07A62]' : 'text-[#db6f57]'}
                          iconBg="bg-[#db6f57]/10"
                          eyebrow="Identidade visual"
                          title="Tema selecionado"
                          onEdit={goToStep(3)}
                        >
                          {selectedTheme && (
                            <div className="flex flex-wrap items-center gap-5">
                              <div className="flex items-center gap-2">
                                {[
                                  selectedTheme.colors.primary,
                                  selectedTheme.colors.secondary,
                                  selectedTheme.colors.accent,
                                ].map((color, i) => (
                                  <div
                                    key={i}
                                    className="w-9 h-9 rounded-lg"
                                    style={{
                                      backgroundColor: color,
                                      boxShadow: `0 0 0 1.5px ${
                                        isDark ? 'rgba(245,240,235,0.15)' : 'rgba(255,255,255,0.95)'
                                      }, 0 4px 12px rgba(0,0,0,0.10)`,
                                    }}
                                  />
                                ))}
                              </div>
                              <div className="min-w-0">
                                <p className={`font-serif text-[15px] font-bold ${theme.textPrimary} transition-colors duration-300 leading-tight`}>
                                  {selectedTheme.name}
                                </p>
                                <p className={`text-[10px] uppercase tracking-[0.18em] font-bold mt-0.5 ${isDark ? 'text-[#B8AEA4]' : 'text-[#5a4a42]/65'}`}>
                                  Tema {selectedTheme.type}
                                </p>
                              </div>
                            </div>
                          )}
                        </SectionCard>

                        {/* ─── Plano ─── */}
                        <SectionCard
                          icon={CreditCard}
                          iconColor={isDark ? 'text-[#6B8F82]' : 'text-[#4f6f64]'}
                          iconBg="bg-[#4f6f64]/10"
                          eyebrow="Assinatura"
                          title="Plano escolhido"
                          onEdit={goToStep(4)}
                        >
                          {sp && (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex items-center gap-4 min-w-0">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background: `linear-gradient(135deg, ${sp.color}20, ${sp.color}40)`,
                                  }}
                                >
                                  {SelectedPlanIcon && (
                                    <SelectedPlanIcon className="w-6 h-6" style={{ color: sp.color }} />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className={`font-serif text-[17px] font-bold ${theme.textPrimary} transition-colors duration-300 leading-tight`}>
                                    {sp.name}
                                  </p>
                                  <p className={`text-[10px] uppercase tracking-[0.18em] font-bold mt-0.5 ${isDark ? 'text-[#B8AEA4]' : 'text-[#5a4a42]/65'}`}>
                                    {isAnnual ? "Cobrança anual" : "Cobrança mensal"}
                                  </p>
                                  {cupomValid && cupomDados && (
                                    <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full ${isDark ? 'bg-[#4f6f64]/15' : 'bg-[#4f6f64]/10'}`}>
                                      <Gift className={`w-3 h-3 ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`} />
                                      <span className={`font-mono text-[11px] font-bold tracking-wider ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}>
                                        {cupomCodigo}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-left sm:text-right">
                                {cupomValid && cupomDados ? (
                                  <>
                                    <p className={`text-[12px] line-through ${isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/45'}`}>
                                      R$ {cupomDados.originalValue.toFixed(2).replace('.', ',')}
                                    </p>
                                    <p className={`text-2xl font-bold ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'} transition-colors duration-300 leading-none`}>
                                      R$ {cupomDados.finalValue.toFixed(2).replace('.', ',')}
                                      <span className={`ml-1 text-[12px] font-medium ${isDark ? 'text-[#B8AEA4]' : 'text-[#5a4a42]/65'}`}>
                                        /mês
                                      </span>
                                    </p>
                                  </>
                                ) : (() => {
                                  const promoM = !isAnnual && sp.promoMensalAtiva && sp.promoMensalPreco > 0
                                  const promoA = isAnnual && sp.promoAnualAtiva && sp.promoAnualPreco > 0
                                  const valorOriginal = isAnnual ? sp.yearlyPrice : sp.price
                                  const valorFinal = promoM
                                    ? sp.promoMensalPreco
                                    : promoA
                                      ? sp.promoAnualPreco / 12
                                      : valorOriginal
                                  return (
                                    <>
                                      {(promoM || promoA) && (
                                        <p className={`text-[12px] line-through ${isDark ? 'text-[#7A716A]' : 'text-[#5a4a42]/45'}`}>
                                          R$ {valorOriginal?.toFixed(2).replace('.', ',')}
                                        </p>
                                      )}
                                      <p className={`text-2xl font-bold ${theme.textPrimary} transition-colors duration-300 leading-none`}>
                                        R$ {valorFinal?.toFixed(2).replace('.', ',')}
                                        <span className={`ml-1 text-[12px] font-medium ${isDark ? 'text-[#B8AEA4]' : 'text-[#5a4a42]/65'}`}>
                                          /mês
                                        </span>
                                      </p>
                                    </>
                                  )
                                })()}
                              </div>
                            </div>
                          )}

                          {/* Detalhe do cupom aplicado */}
                          {cupomValid && cupomDados && (
                            <div
                              className="mt-5 pt-5 border-t"
                              style={{ borderColor: isDark ? "#2D2925" : "#e6d9d4" }}
                            >
                              <div className="flex items-center justify-between text-[13px]">
                                <span className={isDark ? "text-[#B8AEA4]" : "text-[#5a4a42]/70"}>
                                  Desconto{" "}
                                  <span className="font-mono">
                                    ({cupomDados.discountType === 'PERCENTAGE'
                                      ? `${cupomDados.percentualDiscount}%`
                                      : `R$ ${cupomDados.discountAmount.toFixed(2).replace('.', ',')}`})
                                  </span>
                                </span>
                                <span className={`font-semibold ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`}>
                                  − R$ {(cupomDados.originalValue - cupomDados.finalValue).toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                              <div
                                className={`mt-3 px-3 py-2 rounded-xl text-[12px] flex items-start gap-2 ${
                                  cupomDados.applicationType === 'RECURRING'
                                    ? isDark ? 'bg-[#4f6f64]/15 text-[#7AB8A4]' : 'bg-[#4f6f64]/8 text-[#4f6f64]'
                                    : isDark ? 'bg-[#db6f57]/15 text-[#E07A62]' : 'bg-[#db6f57]/8 text-[#db6f57]'
                                }`}
                              >
                                <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <span className="leading-snug">
                                  {cupomDados.applicationDescription
                                    ? cupomDados.applicationDescription
                                    : cupomDados.applicationType === 'RECURRING'
                                      ? 'Desconto aplicado em todas as cobranças enquanto o cupom estiver vigente.'
                                      : 'Desconto aplicado somente na primeira cobrança.'}
                                </span>
                              </div>
                            </div>
                          )}
                        </SectionCard>

                        {/* Banner final warm sage */}
                        <div
                          className="rounded-2xl border p-5 backdrop-blur"
                          style={{
                            backgroundColor: isDark ? "rgba(107,143,130,0.10)" : "rgba(79,111,100,0.06)",
                            borderColor: isDark ? "rgba(107,143,130,0.25)" : "rgba(79,111,100,0.22)",
                          }}
                        >
                          <p className={`text-[14px] leading-relaxed flex items-center justify-center gap-2.5 flex-wrap text-center font-medium ${isDark ? 'text-[#F5F0EB]' : 'text-[#2a2420]'}`}>
                            <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-[#7AB8A4]' : 'text-[#4f6f64]'}`} />
                            <span>
                              Ao finalizar, você terá <strong>14 dias grátis</strong> pra testar tudo. Sem cartão. Sem pegadinha.
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* Footer com botões */}
              <div className="flex justify-between items-center pt-8 mt-8">
                <FormButton
                  type="button"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  icon={ArrowLeft}
                  iconPosition="left"
                  label="Voltar"
                  variant="secondary"
                  isDark={isDark}
                  showShimmer={false}
                />

                {activeStep === steps.length - 1 ? (
                  <FormButton
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    icon={Check}
                    iconPosition="left"
                    label="Finalizar cadastro"
                    disabled={!isCurrentStepValid()}
                    variant="success"
                    isDark={isDark}
                  />
                ) : (
                  <FormButton
                    type="button"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                    icon={ArrowRight}
                    iconPosition="right"
                    label="Próximo"
                    variant="primary"
                    isDark={isDark}
                  />
                )}
              </div>
            </form>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}