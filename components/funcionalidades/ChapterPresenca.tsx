"use client"

import { motion } from "framer-motion"
import {
  Globe,
  ShoppingBag,
  Smartphone,
  Palette,
  Search,
  Lock,
  Monitor,
  Tablet,
  Scissors,
} from "lucide-react"
import {
  ChapterMeta,
  ChapterShell,
  FeatureBullet,
  NumeralBackdrop,
  Reveal,
  EASE_OUT,
} from "./shared"

const COLOR = "#4f6f64"
const ACCENT = "#db6f57"

const services = [
  { name: "Corte feminino", price: "R$ 85", time: "45 min" },
  { name: "Progressiva premium", price: "R$ 240", time: "2h" },
  { name: "Hidratação profunda", price: "R$ 120", time: "1h" },
]

function SiteMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
      className="relative"
    >
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[32px] blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,111,100,0.22), transparent 70%)",
        }}
      />

      {/* Browser frame */}
      <motion.div
        initial={{ rotate: -1 }}
        whileInView={{ rotate: -1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl bg-white border overflow-hidden"
        style={{
          borderColor: "#e6d9d4",
          boxShadow:
            "0 30px 60px -20px rgba(42,36,32,0.18), 0 12px 24px -12px rgba(42,36,32,0.08)",
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f0e8e3] bg-[#fafaf8]">
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#db6f57]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#e88c76]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4f6f64]/40" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-[#e6d9d4] min-w-0">
            <Lock className="w-3 h-3 text-[#4f6f64] flex-shrink-0" />
            <span className="text-[10px] md:text-[11px] font-mono text-[#5a4a42]/80 truncate">
              mariasalao.bellory.com.br
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[#5a4a42]/40">
            <Monitor className="w-3.5 h-3.5 text-[#db6f57]" />
            <Tablet className="w-3.5 h-3.5" />
            <Smartphone className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Site content */}
        <div className="relative bg-[#faf8f6]">
          {/* Site nav */}
          <div className="flex items-center justify-between px-5 md:px-7 py-3 border-b border-[#e6d9d4]/50">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center font-serif text-[11px] font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #db6f57 0%, #8b3d35 100%)",
                }}
              >
                M
              </div>
              <span className="font-serif text-sm font-bold text-[#2a2420]">
                Mariá Salão
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#5a4a42]/70 font-medium">
              <span>Serviços</span>
              <span>Equipe</span>
              <span>Contato</span>
              <span
                className="px-2.5 py-1 rounded-md text-white font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, #db6f57, #c55a42)",
                }}
              >
                Agendar
              </span>
            </div>
          </div>

          {/* Hero */}
          <div className="relative px-5 md:px-7 py-6 md:py-8 overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(219,111,87,0.2), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#db6f57]/10 border border-[#db6f57]/20 mb-3">
                <span className="text-[8px] uppercase tracking-wider font-bold text-[#db6f57]">
                  Desde 2018
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2a2420] leading-tight mb-1.5 max-w-xs">
                Seu cabelo, seu
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #db6f57, #8b3d35)",
                  }}
                >
                  momento inteiro.
                </span>
              </h3>
              <p className="text-[10px] text-[#5a4a42]/70 max-w-xs leading-relaxed mb-3">
                Salão boutique na Vila Madalena. Corte, coloração e
                tratamentos com hora marcada e aquele cafezinho.
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(90deg, #db6f57, #8b3d35)",
                    boxShadow: "0 4px 14px rgba(219,111,87,0.3)",
                  }}
                >
                  Agendar online
                </button>
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#2a2420] border border-[#d8ccc4]">
                  Ver serviços
                </button>
              </div>
            </div>
          </div>

          {/* Services grid */}
          <div className="px-5 md:px-7 pb-6 md:pb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#2a2420]">
                Serviços populares
              </span>
              <span className="text-[9px] text-[#5a4a42]/50">
                ver todos →
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {services.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.1,
                    ease: EASE_OUT,
                  }}
                  className="rounded-xl bg-white border border-[#e6d9d4] p-2.5"
                >
                  <div
                    className="aspect-square rounded-lg mb-2 relative overflow-hidden"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #e88c76, #db6f57)"
                          : i === 1
                          ? "linear-gradient(135deg, #d8ccc4, #8b3d35)"
                          : "linear-gradient(135deg, #fff7f4, #db6f57)",
                    }}
                  >
                    <Scissors className="absolute right-1.5 bottom-1.5 w-3 h-3 text-white/80" />
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold text-[#2a2420] leading-tight mb-0.5">
                    {s.name}
                  </div>
                  <div className="flex items-center justify-between text-[8px] md:text-[9px]">
                    <span className="text-[#db6f57] font-bold tabular-nums">
                      {s.price}
                    </span>
                    <span className="text-[#5a4a42]/50">{s.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating mobile preview */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 20, rotate: 6 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
        className="absolute -bottom-8 -right-2 md:-right-6 w-28 md:w-32"
      >
        <div
          className="rounded-[18px] p-1 border"
          style={{
            backgroundColor: "#1a1510",
            borderColor: "#3d2e28",
            boxShadow: "0 24px 40px -12px rgba(42,36,32,0.3)",
          }}
        >
          <div className="relative rounded-[14px] overflow-hidden bg-[#faf8f6]">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-[#1a1510] z-10" />
            <div className="pt-4 px-2 pb-3">
              <div className="flex items-center gap-1 mb-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #db6f57, #8b3d35)",
                  }}
                />
                <span className="font-serif text-[7px] font-bold text-[#2a2420]">
                  Mariá
                </span>
              </div>
              <div
                className="aspect-[3/4] rounded-md mb-1.5"
                style={{
                  background:
                    "linear-gradient(135deg, #e88c76 0%, #8b3d35 100%)",
                }}
              />
              <div className="h-1 bg-[#db6f57]/30 rounded-full mb-1" />
              <div className="h-1 bg-[#d8ccc4] rounded-full mb-1 w-2/3" />
              <div className="h-4 rounded bg-[#db6f57] mt-1.5 flex items-center justify-center">
                <span className="text-[5px] font-bold text-white">
                  Agendar
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating stats badge */}
      <motion.div
        initial={{ opacity: 0, y: -16, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: -4 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
        className="absolute -top-5 -left-2 md:-left-6 bg-white rounded-2xl px-3.5 py-2.5 border border-[#e6d9d4] flex items-center gap-2"
        style={{
          boxShadow: "0 16px 40px -12px rgba(42,36,32,0.18)",
        }}
      >
        <div className="w-7 h-7 rounded-lg bg-[#4f6f64]/15 flex items-center justify-center">
          <Search className="w-3.5 h-3.5 text-[#4f6f64]" />
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#5a4a42]/50 font-semibold leading-tight">
            SEO · Google
          </div>
          <div className="text-[11px] font-bold text-[#2a2420] leading-tight">
            Top 3 em 30 dias
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ChapterPresenca() {
  return (
    <ChapterShell id="presenca" bg="#faf8f6" color={COLOR}>
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,111,100,0.15), transparent 65%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <SiteMockup />
          </div>

          {/* Right: copy */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="absolute -top-16 right-0 hidden md:block">
              <NumeralBackdrop number="05" color={COLOR} />
            </div>

            <div className="relative">
              <Reveal>
                <ChapterMeta
                  number="05"
                  label="Presença Digital"
                  color={COLOR}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-serif text-[38px] sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2a2420] leading-[1.02] mt-6 mb-5">
                  Seu salão
                  <br />
                  no{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${COLOR} 0%, ${ACCENT} 100%)`,
                    }}
                  >
                    Google em 10min.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed mb-10">
                  Site pronto com sua identidade, catálogo de serviços, mini
                  e-commerce e o botão de agendar integrado à sua agenda —
                  publicado no subdomínio Bellory ou no seu domínio próprio.
                </p>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.3}>
                  <FeatureBullet
                    icon={Globe}
                    title="Site com cara de quem investe"
                    description="Templates feitos para salões, barbearias e clínicas. Você troca fotos, cores e texto — o resto a gente cuida (SSL, SEO, hospedagem)."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.4}>
                  <FeatureBullet
                    icon={Palette}
                    title="Catálogo sempre atualizado"
                    description="Atualizou um preço no Bellory? O site atualiza sozinho. Uma fonte só de verdade pra não dar desencontro."
                    color={COLOR}
                  />
                </Reveal>
                <Reveal delay={0.5}>
                  <FeatureBullet
                    icon={ShoppingBag}
                    title="Mini e-commerce integrado"
                    description="Venda produtos online com pagamento Pix e cartão. Estoque e pedidos chegam direto no painel — sem plataforma separada."
                    color={COLOR}
                  />
                </Reveal>
              </div>

              <Reveal delay={0.6}>
                <div className="mt-10 flex items-center gap-4 flex-wrap">
                  {[
                    "SSL incluso",
                    "Domínio próprio",
                    "Mobile-first",
                  ].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border"
                      style={{
                        color: COLOR,
                        borderColor: `${COLOR}30`,
                        backgroundColor: `${COLOR}08`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
