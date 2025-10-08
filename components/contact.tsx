"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { MessageCircle, Mail, Phone } from "lucide-react"

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
            <Card className="p-8 bg-card border-border/50">
              <h3 className="text-2xl font-semibold mb-6">Envie uma mensagem</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome completo
                  </label>
                  <Input id="name" placeholder="Seu nome" className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" className="w-full" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefone
                  </label>
                  <Input id="phone" type="tel" placeholder="(00) 00000-0000" className="w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensagem
                  </label>
                  <Textarea id="message" placeholder="Conte-nos sobre seu negócio..." className="w-full min-h-32" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Enviar mensagem
                </Button>
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
                <Card className="p-6 bg-card border-border/50 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">WhatsApp</h4>
                    <p className="text-muted-foreground text-sm mb-2">Fale conosco diretamente pelo WhatsApp</p>
                    <Button variant="link" className="p-0 h-auto text-accent">
                      (11) 99999-9999
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">E-mail</h4>
                    <p className="text-muted-foreground text-sm mb-2">Envie um e-mail para nossa equipe</p>
                    <Button variant="link" className="p-0 h-auto text-accent">
                      contato@bellory.com.br
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border/50 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Telefone</h4>
                    <p className="text-muted-foreground text-sm mb-2">Ligue para nossa central de atendimento</p>
                    <Button variant="link" className="p-0 h-auto text-accent">
                      0800 123 4567
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            <Card className="p-8 bg-accent/5 border-accent/20">
              <h4 className="font-semibold text-lg mb-3">Teste grátis por 14 dias</h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Experimente todas as funcionalidades do Bellory sem compromisso. Não é necessário cartão de crédito.
              </p>
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Começar teste grátis
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
