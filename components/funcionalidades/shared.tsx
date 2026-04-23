"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type LucideIcon } from "lucide-react"
import { type ReactNode } from "react"

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export interface ChapterIndexItem {
  id: string
  number: string
  label: string
  color: string
}

export function ChapterMeta({
  number,
  label,
  color,
}: {
  number: string
  label: string
  color: string
}) {
  return (
    <div className="inline-flex items-center gap-3">
      <span
        aria-hidden
        className="h-px w-8 md:w-12"
        style={{ backgroundColor: color, opacity: 0.5 }}
      />
      <span
        className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-semibold"
        style={{ color }}
      >
        Capítulo {number}
        <span className="mx-2 opacity-40">·</span>
        {label}
      </span>
    </div>
  )
}

export function NumeralBackdrop({
  number,
  color,
  size = "clamp(140px, 22vw, 280px)",
  className = "",
}: {
  number: string
  color: string
  size?: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`font-serif font-black leading-none tabular-nums select-none pointer-events-none ${className}`}
      style={{
        fontSize: size,
        color: `${color}14`,
        letterSpacing: "-0.06em",
      }}
    >
      {number}
    </span>
  )
}

export function ChapterNumeralInline({
  number,
  color,
}: {
  number: string
  color: string
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span
        className="font-serif font-bold leading-none tabular-nums"
        style={{
          fontSize: "clamp(56px, 8vw, 96px)",
          color,
          letterSpacing: "-0.04em",
        }}
      >
        {number}
      </span>
      <span
        className="h-px flex-1"
        style={{ backgroundColor: color, opacity: 0.25 }}
      />
    </div>
  )
}

export function FeatureBullet({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: LucideIcon
  title: string
  description: string
  color: string
}) {
  return (
    <div className="flex gap-4 group">
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105"
        style={{
          backgroundColor: `${color}12`,
          border: `1.5px solid ${color}28`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="flex-1 pt-0.5 min-w-0">
        <h4 className="font-serif text-lg md:text-xl font-bold text-[#2a2420] leading-snug mb-1.5">
          {title}
        </h4>
        <p className="text-sm md:text-[15px] text-[#5a4a42]/75 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
  once = true,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  const prefersReduced = useReducedMotion()
  const initial = prefersReduced ? { opacity: 0 } : { opacity: 0, y }
  const animate = prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ChapterShell({
  id,
  bg = "#faf8f6",
  color,
  children,
}: {
  id: string
  bg?: string
  color: string
  children: ReactNode
}) {
  const hex = color.replace("#", "")
  return (
    <section
      id={id}
      className="relative overflow-hidden py-24 md:py-36 scroll-mt-20"
      style={{ backgroundColor: bg }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${hex}' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </section>
  )
}

export function ChapterDots({ chapters }: { chapters: ChapterIndexItem[] }) {
  return (
    <nav
      aria-label="Capítulos"
      className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-3.5"
    >
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Capítulo ${c.number}: ${c.label}`}
        >
          <span
            className="font-serif text-[11px] font-bold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md border shadow-sm"
            style={{
              color: c.color,
              borderColor: `${c.color}30`,
            }}
          >
            {c.number} · {c.label}
          </span>
          <span
            className="w-2 h-2 rounded-full border-2 transition-all duration-300 group-hover:scale-150"
            style={{
              borderColor: c.color,
              backgroundColor: `${c.color}35`,
            }}
          />
        </a>
      ))}
    </nav>
  )
}
