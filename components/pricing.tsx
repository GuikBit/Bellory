"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, Scissors, Crown } from "lucide-react"
import { Button } from "primereact/button"

export function Pricing() {
  const [periodo, setPeriodo] = useState<"mensal" | "anual">("mensal")

  const planos = [
    {
      id: "gratuito",
      nome: "PLANO GRATUITO",
      descricaoBreve: "Avalie se a nossa solução faz sentido para o negócio",
      precoMensal: 0.0,
      precoAnual: 0.0,
      icone: <Scissors size={28} className="text-accent" />,
      destaque: false,
      beneficios: [
        "Agendamentos limitados",
        "Cadastro de clientes limitados",
        "Cadastro de funcionários limitados",
        "Cadastro de serviços limitados",
        "Acesso a dashboards inteligentes",
      ],
      naoIncluido: ["Produtos exclusivos", "Atendimento VIP", "Serviços premium", "Acesso a eventos exclusivos"],
    },
    {
      id: "basico",
      nome: "PLANO BÁSICO",
      descricaoBreve: "Cuidados essenciais para sua beleza",
      precoMensal: 79.9,
      precoAnual: 64.9,
      icone: <Scissors size={28} className="text-accent" />,
      destaque: false,
      beneficios: [
        "Agendamentos ilimitados",
        "Cadastro de clientes ilimitados",
        "2 funcionários cadastrados",
        "Serviços ilimitados",
        "Dashboards inteligentes",
        "Suporte por email",
      ],
      naoIncluido: ["Produtos exclusivos", "Atendimento VIP", "Serviços premium", "Acesso a eventos exclusivos"],
    },
    {
      id: "plus",
      nome: "PLANO PLUS",
      descricaoBreve: "Experiência completa de gestão e bem-estar",
      precoMensal: 129.9,
      precoAnual: 99.9,
      icone: <Scissors size={28} className="text-accent" />,
      destaque: false,
      beneficios: [
        "Agendamentos ilimitados",
        "Cadastro de clientes ilimitados",
        "5 funcionários cadastrados",
        "Serviços ilimitados",
        "Dashboards inteligentes avançados",
        "Suporte prioritário",
        "Integração com redes sociais",
        "Relatórios personalizados",
      ],
      naoIncluido: [],
    },
    {
      id: "premium",
      nome: "PLANO PREMIUM",
      descricaoBreve: "Experiência completa com recursos exclusivos",
      precoMensal: 249.9,
      precoAnual: 199.9,
      icone: <Crown size={28} className="text-accent" />,
      destaque: true,
      beneficios: [
        "Tudo do Plano Plus",
        "Funcionários ilimitados",
        "Múltiplas unidades",
        "API personalizada",
        "Suporte VIP 24/7",
        "Consultoria especializada",
        "Treinamento da equipe",
        "Customizações exclusivas",
      ],
      naoIncluido: [],
    },
  ]

  return (
    <section
      id="planos"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-secondary/30"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center mb-6">
            <motion.div
              className="h-px w-16 bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.div
              className="mx-4 w-2 h-2 rounded-full bg-accent"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <motion.div
              className="h-px w-16 bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>

          <motion.h2
            className="text-3xl md:text-5xl font-serif font-normal mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Planos de Assinatura
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-8 leading-relaxed text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Escolha o plano ideal para o seu negócio e tenha acesso a recursos exclusivos para gestão completa
          </motion.p>

          <motion.div
            className="flex items-center justify-center bg-card p-1 gap-2 rounded-full shadow-sm border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* <Button
              // variant={periodo === "mensal" ? "default" : "ghost"}
              size="small"
              className="rounded-full px-6"
              onClick={() => setPeriodo("mensal")}
            >
              Mensal
            </Button> */}
            <Button              
              size="small"
              className={`rounded-full px-4 py-2 border-0 ${periodo == 'mensal'? 'bg-accent text-accent-foreground  hover:bg-accent/90 shadow-2xl ':'text-black bg-accent/10'} `}
              onClick={() => setPeriodo("mensal")}
            >
              <span className={`font-semibold transition-all ${periodo == 'mensal'? 'text-white':'text-black' } `}>Mensal</span>
            </Button>
            <Button              
              size="small"
              className={`rounded-full px-4 py-2 border-0 ${periodo == 'anual'? 'bg-accent text-accent-foreground  hover:bg-accent/90 shadow-2xl ':'text-black bg-accent/10'} `}
              onClick={() => setPeriodo("anual")}
            >
              <span className={`font-semibold transition-all ${periodo == 'anual'? 'text-white':'text-black' } `}>Anual</span>
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
            </Button>

          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mx-auto">
          {planos.map((plano, index) => (
            <motion.div
              key={plano.id}
              className={`rounded-2xl overflow-hidden ${
                plano.destaque
                  ? "bg-card border-2 border-accent shadow-2xl scale-105"
                  : "bg-card border border-border shadow-lg"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {plano.destaque && (
                <div className="bg-accent text-accent-foreground text-center py-2 text-sm font-bold">Mais Popular</div>
              )}

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-accent/10">{plano.icone}</div>
                  <h3 className="text-xl font-serif font-bold ml-3">{plano.nome}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-6">{plano.descricaoBreve}</p>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold font-serif">
                      R$ {periodo === "mensal" ? plano.precoMensal.toFixed(2) : plano.precoAnual.toFixed(2)}
                    </span>
                    <span className="ml-2 text-muted-foreground">/mês</span>
                  </div>
                  {periodo === "anual" && plano.precoAnual > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      Economia de R$ {((plano.precoMensal - plano.precoAnual) * 12).toFixed(2)} ao ano
                    </p>
                  )}
                </div>
                {plano.destaque ?
                  <Button 
                    outlined
                    className="w-full rounded-xl"
                    label={`Assinar ${plano.nome.split(" ")[1]}`}
                  />
                :
                  <Button                
                    className="w-full rounded-xl"
                    label={`Assinar ${plano.nome.split(" ")[1]}`}
                  />
                }
              

                <div className="mt-8">
                  <p className="font-medium text-sm mb-4">O que está incluso:</p>
                  <ul className="space-y-3">
                    {plano.beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <div className="p-1 rounded-full bg-green-100 mr-2 flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-green-600" />
                        </div>
                        <span className="text-muted-foreground">{beneficio}</span>
                      </li>
                    ))}
                  </ul>

                  {plano.naoIncluido && plano.naoIncluido.length > 0 && (
                    <>
                      <p className="font-medium text-sm mt-6 mb-4">Não incluso:</p>
                      <ul className="space-y-3">
                        {plano.naoIncluido.map((item, i) => (
                          <li key={i} className="flex items-start text-sm">
                            <div className="p-1 rounded-full bg-red-100 mr-2 flex-shrink-0 mt-0.5">
                              <X size={12} className="text-red-500" />
                            </div>
                            <span className="text-muted-foreground/60">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-6">
            Todos os planos incluem acesso ao aplicativo móvel e cancelamento a qualquer momento.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
