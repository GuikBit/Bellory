"use client";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Crown, Flower, Scissors, X } from "lucide-react"
import { useState } from "react"


export function Planos() {
  const [periodo, setPeriodo] = useState<"mensal" | "anual">("mensal");

  const planos = [
    {
      id: "gratuito",
      nome: "PLANO GRATUITO",
      descricaoBreve: "Avalie se a nossa solucao faz sentido para o negocio",
      precoMensal: 0.00,
      precoAnual: 0.00, // preço mensal no plano anual
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
      naoIncluido: [
        "Produtos exclusivos",
        "Atendimento VIP",
        "Serviços premium",
        "Acesso a eventos exclusivos",
      ],
      className: "scale-90"
    },
    {
      id: "basico",
      nome: "PLANO BASICO",
      descricaoBreve: "Cuidados essenciais para sua beleza",
      precoMensal: 79.90,
      precoAnual: 64.90, // preço mensal no plano anual
      icone: <Scissors size={28} color="#C0921A" />,
      destaque: false,
      beneficios: [
        "2 cortes de cabelo por mês",
        "1 tratamento capilar por mês",
        "10% de desconto em produtos",
        "Agendamento prioritário",
        "Chá ou espumante grátis durante o atendimento",
      ],
      naoIncluido: [
        "Produtos exclusivos",
        "Atendimento VIP",
        "Serviços premium",
        "Acesso a eventos exclusivos",
      ],
      className: "scale-90"
    },
    {
      id: "plus",
      nome: "PLANO PLUS",
      descricaoBreve: "Experiência completa de beleza e bem-estar",
      precoMensal: 129.90,
      precoAnual: 99.90, // preço mensal no plano anual
      icone: <Scissors size={28}  color="#C0921A"  />,
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
      className: ""
    },
    {
      id: "premium",
      nome: "PLANO PREMIUM",
      descricaoBreve: "Experiência completa de beleza e bem-estar",
      precoMensal: 249.90,
      precoAnual: 199.90,
      icone: <Crown size={28}  color="#C0921A"  />,
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
      className: ""
    },
  ];
  
  return(
    <section id="planos" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-[1px] w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
              style={{ top: `${i * 10}%`, left: 0, transform: `rotate(${i * 3}deg)` }}
            ></div>
          ))}
        </div>
      {/* Padrão floral sutil */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center justify-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center mb-3">
              <motion.div
                  className="h-px w-16"
                  style={{ backgroundColor: '#C0921A' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
              ></motion.div>
              <motion.div
                  animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                  }}
                  transition={{
                      rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                  }}
              >
                  {/* <Flower className="mx-4" size={24} 
                  style={{ backgroundColor: "transparent" }}
                  /> */}
              </motion.div>
              <motion.div
                  className="h-px w-16"
                  style={{ backgroundColor: '#C0921A' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </div>
            <motion.h2
              className="text-3xl md:text-4xl font-normal mb-6"
              // style={{
              //   color: theme.colors.text,
              //   fontFamily: theme.fonts.heading,
              // }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Planos de assinaturas
            </motion.h2>
          </div>        

          <motion.p
            className="text-lg mb-6 leading-relaxed italic"
            // style={{
            //   color: currentTheme.colors.textSecondary,
            //   fontFamily: currentTheme.fonts.body,
            // }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Assine um de nossos planos e tenha acesso a benefícios exclusivos, economize em serviços e eleve sua
            experiência de beleza e bem-estar.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center mb-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        > 
          <div className="flex items-center justify-center bg-white p-1 gap-4 rounded-full mb-8 shadow-sm borde" 
           style={{ borderColor: '#C0921A' }}
          >

            {periodo === "mensal" ? (
              // <BarbeariaButton rounded="full" size="sm" onClick={() => setPeriodo("mensal")}>Mensal</BarbeariaButton>
              <Button variant="default" size="lg" rounded="full" onClick={() => setPeriodo("mensal")} className="cursor-pointer">
                Mensal
              </Button>
            ):(
              // <BarbeariaButton variant="ghost" rounded="full" size="sm" onClick={() => setPeriodo("mensal")}>Mensal</BarbeariaButton>
            <Button variant="secondary" size="lg" rounded="full" onClick={() => setPeriodo("mensal")} className="cursor-pointer">
              Mensal
            </Button>
            )}

            {periodo === "anual" ? (
              // <BarbeariaButton  rounded="full" size="sm" onClick={() => setPeriodo("anual")}>
              //   Anual
              //   <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
              // </BarbeariaButton>
            <Button variant="default" size="lg" rounded="full" onClick={() => setPeriodo("anual")} className="cursor-pointer ">
              Anual
              <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full" >-20%</span>
            </Button>
            ):(
              // <BarbeariaButton variant="ghost" rounded="full" size="sm" onClick={() => setPeriodo("anual")}>
              //   Anual
              //   <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
              // </BarbeariaButton>
            <Button variant="secondary" size="lg" rounded="full" onClick={() => setPeriodo("anual")} className="cursor-pointer">
              Anual
              <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
            </Button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto">
          {planos.map((plano, index) => (
            <motion.div
              key={plano.id}
              className={`rounded-2xl overflow-hidden ${
                plano.destaque
                  ? "bg-white border-2 shadow-xl"
                  : "bg-white border shadow-lg scale-95"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              // style={{ borderColor: currentTheme.colors.primary, fontFamily: currentTheme.fonts.heading }}
            >
              {plano.destaque && (
                <div className=" text-white text-center py-1 text-sm font-bold" 
                style={{ backgroundColor:'#C0921A'}}
                >
                  Mais Popular
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full" 
                  // style={{ backgroundColor: currentTheme.colors.primary+'30' }}
                  >
                    {plano.icone}
                  </div>
                  <h3 className="text-2xl font-bold ml-3" 
                  // style={{ fontFamily: currentTheme.fonts.heading, color: currentTheme.colors.text }}
                  >
                    {plano.nome}
                  </h3>
                </div>

                <p className=" mb-6" 
                  // style={{ fontFamily: currentTheme.fonts.body, color: currentTheme.colors.textSecondary }}
                  >
                  {plano.descricaoBreve}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold" 
                      // style={{ fontFamily: currentTheme.fonts.heading, color: currentTheme.colors.text }}
                      >
                      R$ {periodo === "mensal" ? plano.precoMensal.toFixed(2) : plano.precoAnual.toFixed(2)}
                    </span>
                    <span className="ml-2" 
                    // style={{ fontFamily: currentTheme.fonts.body, color: currentTheme.colors.primary }}
                    >/mês</span>
                  </div>
                  {periodo === "anual" && (
                    <p className=" text-sm mt-1" 
                    // style={{ fontFamily: currentTheme.fonts.body, color: currentTheme.colors.online }}
                    >
                      Economia de R$ {((plano.precoMensal - plano.precoAnual) * 12).toFixed(2)} ao ano
                    </p>
                  )}
                </div>

                {plano.destaque ? (
                  // <BarbeariaButton fullWidth variant="primary" leftIcon={<CreditCard />}>
                  //   Assinar {plano.nome}
                  // </BarbeariaButton>
                  <Button variant="default" size="lg" className="w-full" rounded="full">
                    Assinar {plano.nome}
                    <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
                  </Button>
                ):(
                  // <BarbeariaButton fullWidth variant="outline" leftIcon={<CreditCard />}>
                  //   Assinar {plano.nome}
                  // </BarbeariaButton>
                  <Button variant="secondary" size="lg" className="w-full" rounded="full">
                    Assinar {plano.nome}
                    <span className="ml-1 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">-20%</span>
                  </Button>
                )}

                <div className="mt-8">
                  <p className="font-medium mb-4" 
                  // style={{ fontFamily: currentTheme.fonts.heading, color: currentTheme.colors.text }}
                  >
                    O que está incluso:
                  </p>
                  <ul className="space-y-3">
                    {plano.beneficios.map((beneficio, i) => (
                      <li key={i} className="flex items-start">
                        <div className="p-1 rounded-full bg-green-100 mr-2 flex-shrink-0 mt-0.5">
                          <Check size={14} className="text-green-600" />
                        </div>
                        <span className="" 
                          // style={{ fontFamily: currentTheme.fonts.body, color: currentTheme.colors.textSecondary }}
                          >
                          {beneficio}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plano.naoIncluido && plano.naoIncluido.length > 0 && (
                    <>
                      <p className="font-medium mt-6 mb-4" 
                      // style={{ fontFamily: currentTheme.fonts.heading, color: currentTheme.colors.text  }}
                      >
                        Não incluso:
                      </p>
                      <ul className="space-y-3">
                        {plano.naoIncluido.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <div className="p-1 rounded-full bg-red-100 mr-2 flex-shrink-0 mt-0.5">
                              <X size={14} className="text-red-500" />
                            </div>
                            <span className="text-rose-800/60" 
                            // style={{ fontFamily: currentTheme.fonts.body }}
                            >
                              {item}
                            </span>
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

        <div className="text-center mt-12">
          <p className=" mb-6">
            Todos os planos incluem acesso ao aplicativo móvel e cancelamento a qualquer momento.
          </p>
        </div>
        <div className="mt-16 text-center">
          <Button >
            Ver todos os detalhes dos planos
          </Button>
        </div>
      </div>
    </section>
  )
}