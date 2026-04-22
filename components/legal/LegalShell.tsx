"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export interface TOCItem {
  id: string
  label: string
}

export interface RelatedPolicy {
  href: string
  label: string
  description: string
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const

// ─── Main shell with header, hero, content + TOC, related policies, footer ───
export function LegalShell({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  toc,
  children,
  relatedPolicies = [],
}: {
  eyebrow: string
  title: string
  subtitle: string
  lastUpdated: string
  toc: TOCItem[]
  children: ReactNode
  relatedPolicies?: RelatedPolicy[]
}) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "")
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const headings = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[]
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-120px 0% -70% 0%", threshold: 0 }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [toc])

  return (
    <main className="min-h-screen bg-[#faf8f6]">
      <Header isMenu={true} isCadastro={true} />

      {/* Hero */}
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-14 overflow-hidden bg-[#faf8f6]">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <motion.div
          aria-hidden
          className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(219,111,87,0.12), transparent 65%)",
          }}
          animate={
            prefersReduced
              ? undefined
              : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#5a4a42]/70 hover:text-[#db6f57] font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para bellory.com.br
            </Link>

            <div className="inline-flex items-center gap-3 mb-6">
              <span
                aria-hidden
                className="h-px w-10 bg-[#db6f57] opacity-60"
              />
              <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#db6f57]">
                {eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-[36px] sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#2a2420] leading-[1.04] mb-5">
              {title}
            </h1>
            <p className="text-base md:text-lg text-[#5a4a42]/75 leading-relaxed max-w-2xl font-light mb-6">
              {subtitle}
            </p>
            <div className="flex items-center gap-2.5 text-[12px] text-[#5a4a42]/60 font-medium">
              <span
                aria-hidden
                className="w-1.5 h-1.5 rounded-full bg-[#4f6f64]"
              />
              Última atualização em{" "}
              <span className="font-semibold text-[#2a2420]">
                {lastUpdated}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="pb-20 md:pb-28 bg-[#faf8f6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_220px] gap-10 lg:gap-14 relative">
            <article className="min-w-0">{children}</article>

            {/* Sticky TOC desktop */}
            <nav
              aria-label="Índice da página"
              className="hidden lg:block relative"
            >
              <div className="sticky top-28 space-y-0.5">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    aria-hidden
                    className="h-px w-6 bg-[#db6f57] opacity-50"
                  />
                  <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#db6f57]">
                    Índice
                  </span>
                </div>
                {toc.map((item) => {
                  const active = activeId === item.id
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block pl-3 py-1.5 text-[13px] leading-snug border-l-2 transition-all duration-200 ${
                        active
                          ? "text-[#db6f57] font-bold border-[#db6f57]"
                          : "text-[#5a4a42]/65 border-[#e6d9d4] hover:text-[#2a2420] hover:border-[#db6f57]/40"
                      }`}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Related policies */}
          {relatedPolicies.length > 0 && (
            <div className="mt-20 md:mt-28 pt-10 md:pt-14 border-t border-[#e6d9d4]">
              <div className="flex items-center gap-3 mb-6">
                <span
                  aria-hidden
                  className="h-px w-8 bg-[#db6f57] opacity-50"
                />
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#db6f57]">
                  Leia também
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPolicies.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group rounded-2xl border border-[#e6d9d4] bg-white/70 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#db6f57]/30 hover:shadow-md"
                  >
                    <h3 className="font-serif text-lg font-bold text-[#2a2420] mb-1 leading-tight">
                      {p.label}
                    </h3>
                    <p className="text-[13px] text-[#5a4a42]/70 leading-relaxed mb-3">
                      {p.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-[#db6f57]">
                      Ler documento
                      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ─── Section with numbered serif title ───
export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mb-12 md:mb-14 scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-serif text-sm md:text-base font-bold tabular-nums text-[#db6f57]/70 flex-shrink-0">
          {number}
        </span>
        <h2 className="font-serif text-2xl md:text-[28px] font-bold text-[#2a2420] leading-tight">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-9 space-y-4">{children}</div>
    </section>
  )
}

// ─── Styled paragraph ───
export function LegalText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[15px] md:text-base text-[#5a4a42] leading-[1.75]">
      {children}
    </p>
  )
}

// ─── Sub-heading inside a section ───
export function LegalSubtitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-lg md:text-xl font-bold text-[#2a2420] leading-snug mt-6 mb-2">
      {children}
    </h3>
  )
}

// ─── Styled list with em-dash bullets ───
export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="space-y-2.5 my-3">{children}</ul>
}

export function LegalListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] md:text-base text-[#5a4a42] leading-relaxed">
      <span
        aria-hidden
        className="text-[#db6f57] font-bold mt-0.5 flex-shrink-0"
      >
        —
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  )
}

// ─── Callout / highlight box ───
export function LegalCallout({
  icon: Icon,
  title,
  children,
  tone = "accent",
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
  tone?: "accent" | "sage" | "deep"
}) {
  const colors = {
    accent: { fg: "#db6f57", bg: "#fff7f4", border: "#f0d4ca" },
    sage: { fg: "#4f6f64", bg: "#eff4f2", border: "#cde0d8" },
    deep: { fg: "#8b3d35", bg: "#fbeeec", border: "#e9c7c1" },
  }[tone]

  return (
    <aside
      className="my-6 rounded-2xl border p-5 md:p-6"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${colors.fg}15`,
            border: `1.5px solid ${colors.fg}30`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: colors.fg }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className="font-serif text-base font-bold leading-tight mb-2"
            style={{ color: colors.fg }}
          >
            {title}
          </h4>
          <div className="text-[14px] md:text-[15px] text-[#2a2420]/85 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Inline emphasis ───
export function LegalStrong({ children }: { children: ReactNode }) {
  return <strong className="text-[#2a2420] font-bold">{children}</strong>
}

// ─── Internal link styled for prose ───
export function LegalLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: ReactNode
  external?: boolean
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#db6f57] hover:text-[#8b3d35] underline underline-offset-2 font-semibold transition-colors"
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className="text-[#db6f57] hover:text-[#8b3d35] underline underline-offset-2 font-semibold transition-colors"
    >
      {children}
    </Link>
  )
}
