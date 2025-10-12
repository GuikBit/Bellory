"use client"

import { Header } from "@/components/header"
import { useRef, useState } from "react"
import { Stepper } from "primereact/stepper"
import { StepperPanel } from "primereact/stepperpanel"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask"
import { Dropdown } from "primereact/dropdown"
import { useForm, Controller } from "react-hook-form"
import { motion } from "framer-motion"
import { Building2, MapPin, CreditCard, CheckCircle2, KeyRound, EyeOff, Eye } from "lucide-react"
import Link from "next/link"
import { Password } from "primereact/password"
import { classNames } from "primereact/utils"

interface FormData {
  // Step 1: Informações Legais
  cnpj: string
  razaoSocial: string
  nomeFantasia: string
  inscricaoEstadual: string
  email: string
  telefone: string
  nomeResponsavel: string;
  emailResponsavel: string;
  telefoneResponsavel: string;

  // Step 2: Endereço
  cep: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string

  login: string;
  senha: string;
  confSenha: string;

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
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(senha);
}

export default function Cadastro() {
  const stepperRef = useRef<any>(null)
  const [activeStep, setActiveStep] = useState(2)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      plano: "basico",
      formaPagamento: "credito",
    },
  })

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
    { label: "Gratuito - R$ 0,00/mês", value: "gratuito" },
    { label: "Básico - R$ 79,90/mês", value: "basico" },
    { label: "Plus - R$ 129,90/mês", value: "plus" },
    { label: "Premium - R$ 249,90/mês", value: "premium" },
  ]

  const formasPagamento = [
    { label: "Cartão de Crédito", value: "credito" },
    { label: "Boleto Bancário", value: "boleto" },
    { label: "PIX", value: "pix" },
  ]

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = []

    if (activeStep === 0) {
      fieldsToValidate = ["cnpj", "razaoSocial", "nomeFantasia", "email", "telefone", "nomeResponsavel", "emailResponsavel","telefoneResponsavel"]
    } else if (activeStep === 1) {
      fieldsToValidate = ["cep", "rua", "numero", "bairro", "cidade", "estado"]
    }else if (activeStep === 2) {
      fieldsToValidate = ["login", "senha"]
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      stepperRef.current?.nextCallback()
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    stepperRef.current?.prevCallback()
    setActiveStep(activeStep - 1)
  }

  const onSubmit = (data: FormData) => {
    console.log("[v0] Form submitted:", data)
    setIsSubmitted(true)
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

              <Link href="/">
                <Button
                  label="Voltar para Home"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-8 py-3 text-base font-medium"
                />
              </Link>
            </Card>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen flex justify-center overflow-hidden pt-32 pb-20">
      <Header />

      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-foreground">Cadastro</h1>
            <p className="text-lg text-muted-foreground">Complete as informações abaixo para criar sua conta</p>
          </div>

          <Card className="p-6 sm:p-8 bg-card border border-border shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stepper ref={stepperRef} linear headerPosition="top" activeStep={activeStep} className="bellory-stepper">
                {/* Step 1: Informações Legais */}
                <StepperPanel header="Informações Legais">
                  <div className="py-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Dados da Empresa</h3>
                        <p className="text-sm text-muted-foreground">Informações legais do seu estabelecimento</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cnpj" className="text-sm font-medium text-foreground">
                          CNPJ <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.cnpj ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.cnpj && <small className="text-destructive">{errors.cnpj.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="inscricaoEstadual" className="text-sm font-medium text-foreground">
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
                              className="w-full p-3 border border-border rounded-lg"
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="razaoSocial" className="text-sm font-medium text-foreground">
                          Razão Social <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.razaoSocial ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.razaoSocial && <small className="text-destructive">{errors.razaoSocial.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="nomeFantasia" className="text-sm font-medium text-foreground">
                          Nome Fantasia <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.nomeFantasia ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.nomeFantasia && (
                          <small className="text-destructive">{errors.nomeFantasia.message}</small>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.email ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.email && <small className="text-destructive">{errors.email.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="telefone" className="text-sm font-medium text-foreground">
                          Telefone <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.telefone ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.telefone && <small className="text-destructive">{errors.telefone.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="nomeFantasia" className="text-sm font-medium text-foreground">
                          Nome Responsável <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.nomeResponsavel ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.nomeResponsavel && (
                          <small className="text-destructive">{errors.nomeResponsavel.message}</small>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="emailResponsavel" className="text-sm font-medium text-foreground">
                          Email Responsável <span className="text-destructive">*</span>
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
                              id="email"
                              {...field}
                              type="email"
                              placeholder="responsavel@gmail.com"
                              className={`w-full p-3 border rounded-lg ${errors.email ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.emailResponsavel && <small className="text-destructive">{errors.emailResponsavel.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="telefone" className="text-sm font-medium text-foreground">
                          Telefone Responsável <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.telefone ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.telefoneResponsavel && <small className="text-destructive">{errors.telefoneResponsavel.message}</small>}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-border">
                    <Button
                      label="Próximo"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      onClick={handleNext}
                      type="button"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-6 py-3"
                    />
                  </div>
                </StepperPanel>

                {/* Step 2: Endereço */}
                <StepperPanel header="Endereço">
                  <div className="py-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Localização</h3>
                        <p className="text-sm text-muted-foreground">Endereço do seu estabelecimento</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cep" className="text-sm font-medium text-foreground">
                          CEP <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.cep ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.cep && <small className="text-destructive">{errors.cep.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="estado" className="text-sm font-medium text-foreground">
                          Estado <span className="text-destructive">*</span>
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
                              className={`w-full ${errors.estado ? "border-destructive" : ""}`}
                            />
                          )}
                        />
                        {errors.estado && <small className="text-destructive">{errors.estado.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label htmlFor="rua" className="text-sm font-medium text-foreground">
                          Rua <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.rua ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.rua && <small className="text-destructive">{errors.rua.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="numero" className="text-sm font-medium text-foreground">
                          Número <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.numero ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.numero && <small className="text-destructive">{errors.numero.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="complemento" className="text-sm font-medium text-foreground">
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
                              className="w-full p-3 border border-border rounded-lg"
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="bairro" className="text-sm font-medium text-foreground">
                          Bairro <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.bairro ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.bairro && <small className="text-destructive">{errors.bairro.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="cidade" className="text-sm font-medium text-foreground">
                          Cidade <span className="text-destructive">*</span>
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
                              className={`w-full p-3 border rounded-lg ${errors.cidade ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.cidade && <small className="text-destructive">{errors.cidade.message}</small>}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-border">
                    <Button
                      label="Voltar"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      onClick={handleBack}
                      type="button"
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-0 px-6 py-3"
                    />
                    <Button
                      label="Próximo"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      onClick={handleNext}
                      type="button"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-6 py-3"
                    />
                  </div>
                </StepperPanel>

                <StepperPanel header="Acesso">
                  <div className="py-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <KeyRound className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Acesso</h3>
                        <p className="text-sm text-muted-foreground">Cadastre o acesso administrativo do seu estabelecimento</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div className="flex flex-col gap-2">
                        <label htmlFor="login" className="text-sm font-medium text-foreground">
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
                              className={`w-full p-3 border rounded-lg ${errors.login ? "border-destructive" : "border-border"}`}
                            />
                          )}
                        />
                        {errors.login && <small className="text-destructive">{errors.login.message}</small>}
                      </div>

                      <div className="flex flex-col gap-2 relative">
                        <label htmlFor="senha" className="text-sm font-medium text-foreground">
                          Senha <span className="text-destructive">*</span>
                        </label>

                        <Controller
                          name="senha"
                          control={control}
                          rules={{
                            required: "Senha é obrigatória",
                            validate: (value) =>
                              validarSenhaForte(value) ||
                              "A senha deve atender os requisitos: \nPelo menos 6 caracteres,\nUma letra maiúscula,\nUm número,\nE um caractere especial",
                          }}
                          render={({ field }) => (
                            <div className="relative">
                              <InputText
                                id="senha"
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite uma senha forte"
                                className={classNames(
                                  "w-full p-3 pr-10 border rounded-lg transition-colors",
                                  {
                                    "border-destructive": errors.senha,
                                    "border-border": !errors.senha,
                                  }
                                )}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                              >
                                {showPassword ? (
                                  <EyeOff size={18} />
                                ) : (
                                  <Eye size={18} />
                                )}
                              </button>
                            </div>
                          )}
                        />

                        {errors.senha && (
                          <small className="text-destructive text-sm whitespace-pre-line">
                            {errors.senha.message}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-border">
                    <Button
                      label="Voltar"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      onClick={handleBack}
                      type="button"
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-0 px-6 py-3"
                    />
                    <Button
                      label="Próximo"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      onClick={handleNext}
                      type="button"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-6 py-3"
                    />
                  </div>
                </StepperPanel>

                <StepperPanel header="Tema">

                </StepperPanel>

                {/* Step 3: Cobrança */}
                <StepperPanel header="Cobrança">
                  <div className="py-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Pagamento</h3>
                        <p className="text-sm text-muted-foreground">Escolha seu plano e forma de pagamento</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="plano" className="text-sm font-medium text-foreground">
                          Plano <span className="text-destructive">*</span>
                        </label>
                        <Controller
                          name="plano"
                          control={control}
                          rules={{ required: "Plano é obrigatório" }}
                          render={({ field }) => (
                            <Dropdown
                              id="plano"
                              {...field}
                              options={planos}
                              placeholder="Selecione um plano"
                              className="w-full"
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="formaPagamento" className="text-sm font-medium text-foreground">
                          Forma de Pagamento <span className="text-destructive">*</span>
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
                              className="w-full"
                            />
                          )}
                        />
                      </div>

                      {getValues("formaPagamento") === "credito" && (
                        <>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="numeroCartao" className="text-sm font-medium text-foreground">
                              Número do Cartão
                            </label>
                            <Controller
                              name="numeroCartao"
                              control={control}
                              render={({ field }) => (
                                <InputMask
                                  id="numeroCartao"
                                  {...field}
                                  mask="9999 9999 9999 9999"
                                  placeholder="0000 0000 0000 0000"
                                  className="w-full p-3 border border-border rounded-lg"
                                />
                              )}
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="nomeCartao" className="text-sm font-medium text-foreground">
                              Nome no Cartão
                            </label>
                            <Controller
                              name="nomeCartao"
                              control={control}
                              render={({ field }) => (
                                <InputText
                                  id="nomeCartao"
                                  {...field}
                                  placeholder="Nome como está no cartão"
                                  className="w-full p-3 border border-border rounded-lg"
                                />
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="validadeCartao" className="text-sm font-medium text-foreground">
                                Validade
                              </label>
                              <Controller
                                name="validadeCartao"
                                control={control}
                                render={({ field }) => (
                                  <InputMask
                                    id="validadeCartao"
                                    {...field}
                                    mask="99/99"
                                    placeholder="MM/AA"
                                    className="w-full p-3 border border-border rounded-lg"
                                  />
                                )}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="cvv" className="text-sm font-medium text-foreground">
                                CVV
                              </label>
                              <Controller
                                name="cvv"
                                control={control}
                                render={({ field }) => (
                                  <InputMask
                                    id="cvv"
                                    {...field}
                                    mask="999"
                                    placeholder="000"
                                    className="w-full p-3 border border-border rounded-lg"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-6 border-t border-border">
                    <Button
                      label="Voltar"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      onClick={handleBack}
                      type="button"
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-0 px-6 py-3"
                    />
                    <Button
                      label="Finalizar Cadastro"
                      icon="pi pi-check"
                      iconPos="right"
                      type="submit"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 px-6 py-3"
                    />
                  </div>
                </StepperPanel>
              </Stepper>
            </form>
          </Card>

          <div className="text-center mt-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Voltar para Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
