"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { EASE_OUT, type ChapterIndexItem } from "./shared"

export function FeaturesHero({ chapters }: { chapters: ChapterIndexItem[] }) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#faf8f6]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-20 w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(219,111,87,0.18) 0%, rgba(139,61,53,0.08) 40%, transparent 70%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-24 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(79,111,100,0.14) 0%, rgba(219,111,87,0.05) 50%, transparent 70%)",
        }}
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left: editorial heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span
                aria-hidden
                className="h-px w-12 bg-[#db6f57] opacity-60"
              />
              <span className="text-[11px] uppercase tracking-[0.32em] font-semibold text-[#db6f57]">
                Funcionalidades
                <span className="mx-2 opacity-40">·</span>
                06 capítulos
              </span>
            </div>

            <h1 className="font-serif text-[40px] sm:text-6xl lg:text-7xl xl:text-[84px] font-bold tracking-tight text-[#2a2420] leading-[0.98] mb-8">
              Um sistema.
              <br />
              Seis capítulos de{" "}
              <span className="relative inline-block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #db6f57 0%, #8b3d35 50%, #db6f57 100%)",
                    backgroundSize: "200% auto",
                  }}
                >
                  cuidado
                </span>
                <motion.span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #db6f57 0%, #8b3d35 100%)",
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4,
                    ease: EASE_OUT,
                  }}
                />
              </span>
              <br />
              com o seu negócio.
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-[#5a4a42]/75 leading-relaxed max-w-2xl font-light">
              Agendamento, IA, financeiro, clientes, presença digital e gestão —
              cada um pensado para o dia-a-dia de quem toca o próprio salão,
              barbearia ou clínica. Leia na ordem ou pule direto para o que te
              interessa.
            </p>
          </motion.div>

          {/* Right: numbered index */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
            className="lg:col-span-4"
          >
            <div className="border-t border-[#d8ccc4]">
              {chapters.map((c, idx) => (
                <motion.a
                  key={c.id}
                  href={`#${c.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + idx * 0.06,
                    ease: EASE_OUT,
                  }}
                  className="group flex items-center justify-between py-3 md:py-3.5 border-b border-[#d8ccc4] transition-colors hover:border-transparent relative"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: c.color }}
                  />
                  <div className="flex items-center gap-4">
                    <span
                      className="font-serif text-base font-bold tabular-nums opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ color: c.color }}
                    >
                      {c.number}
                    </span>
                    <span className="text-[15px] font-semibold text-[#2a2420] group-hover:text-[#2a2420] transition-colors">
                      {c.label}
                    </span>
                  </div>
                  <ArrowDown
                    className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    style={{ color: c.color }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
