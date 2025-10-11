"use client"

import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card } from "@/components/ui/card"
import { MessageCircle, Mail, Phone } from "lucide-react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"

export function Contact() {
  return (
    <section id="contato" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Comece agora <span className="text-accent">gratuitamente</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Entre em contato e descubra como o Bellory pode transformar seu negócio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-card border border-border/50 shadow-lg rounded-xl">
              <h3 className="text-2xl font-semibold mb-6">Envie uma mensagem</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome completo
                  </label>
                  <InputText id="name" placeholder="Seu nome" className="w-full p-3 border border-border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <InputText
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full p-3 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <InputText
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full p-3 border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <InputTextarea
                    id="message"
                    placeholder="Conte-nos sobre seu negócio..."
                    className="w-full p-3 border border-border rounded-lg"
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  label="Enviar mensagem"
                  className="w-full bg-accent text-accent-foreground border-0 hover:bg-accent/90 p-3 rounded-lg"
                />
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Outras formas de contato</h3>
              <div className="space-y-4">
                <Card className="p-6 bg-card border border-border/50 shadow-md flex items-start gap-4 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground text-sm mb-2">Fale conosco diretamente pelo WhatsApp</p>
                    <Button label="(11) 99999-9999" className="p-0 h-auto text-accent bg-transparent border-0" link />
                  </div>
                </Card>

                <Card className="p-6 bg-card border border-border/50 shadow-md flex items-start gap-4 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">E-mail</h4>
                    <p className="text-muted-foreground text-sm mb-2">Envie um e-mail para nossa equipe</p>
                    <Button
                      label="contato@bellory.com.br"
                      className="p-0 h-auto text-accent bg-transparent border-0"
                      link
                    />
                  </div>
                </Card>

                <Card className="p-6 bg-card border border-border/50 shadow-md flex items-start gap-4 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Telefone</h4>
                    <p className="text-muted-foreground text-sm mb-2">Ligue para nossa central de atendimento</p>
                    <Button label="0800 123 4567" className="p-0 h-auto text-accent bg-transparent border-0" link />
                  </div>
                </Card>
              </div>
            </div>

            <Card className="p-8 bg-accent/5 border border-accent/20 shadow-md rounded-xl">
              <h4 className="font-semibold text-lg mb-3">Teste grátis por 14 dias</h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Experimente todas as funcionalidades do Bellory sem compromisso. Não é necessário cartão de crédito.
              </p>
              <Button
                label="Começar teste grátis"
                className="w-full bg-accent text-accent-foreground border-0 hover:bg-accent/90 p-3 rounded-lg"
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
