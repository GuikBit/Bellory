# Bellory Design System

**Bellory** is an all-in-one management platform ("sistema de gestão") for beauty salons, barbershops, aesthetic clinics, nail designers, spas and studios in Brazil. This design system powers its **public marketing site / landing page** (bellory.com.br) — the product that captures and converts clients for the Bellory SaaS.

> Tagline: *"Transforme seu negócio em um império digital."*
> Value prop: **Gestão completa + site personalizado + agente de IA no WhatsApp.** Tudo em uma única plataforma.

---

## Products represented

| Product | What it is | Source |
|---|---|---|
| **Bellory (landing page)** | Marketing site — Next.js + Tailwind v4 + Framer Motion + PrimeReact. Hero, features, comparison, pricing, FAQ, contact. | `github.com/GuikBit/Bellory` *(primary source for this DS)* |
| **Bellory-front** | Alt landing in Vite + React | `github.com/GuikBit/Bellory-front` |
| **Bellory-admin / back / docs** | SaaS app, API, docs | `github.com/GuikBit/Bellory-*` *(out of scope here)* |

This design system focuses on the **landing page** (primary marketing surface).

---

## Sources

- **Main repo (landing):** https://github.com/GuikBit/Bellory
  - `app/globals.css` — CSS variables (theme tokens)
  - `design-system-mesclado.md` — mapped Pocket → Bellory palette, full token reference
  - `design-spec-asis.md` — Asis-inspired Hero + Benefits layout spec
  - `components/hero/*`, `components/header.tsx`, `components/footer.tsx`, `components/pricing.tsx`, `components/features-*.tsx`, etc.
  - `app/layout.tsx` — loads Playfair Display + Inter from Google Fonts
  - `public/*` — logos (`bellory2sfundo.svg`, `Bellory_transparente.png`), phone mockups, product screenshots, persona photos
- **Alt landing:** https://github.com/GuikBit/Bellory-front

---

## Brand at a glance

- **Voice:** Portuguese-BR, warm, aspirational, benefit-first. Addresses the reader as **"você"**.
- **Palette:** Warm cream (`#faf8f6`) page · Warm terracotta accent (`#db6f57`) · Deep rust (`#8b3d35`) for strong accents · Warm-dark (`#2a2420`) for inverted sections. Sage-green secondary (`#4f6f64`) for quiet body copy.
- **Type:** **Playfair Display** (display/serif — headings) + **Inter** (sans — body & UI).
- **Signature move:** Serif headline, with the second line a **gradient-text** (terracotta → deep rust → terracotta, animated).

---

## CONTENT FUNDAMENTALS

### Language, tone & voice
- **Language:** Portuguese (Brazil), second person **"você"** and imperative CTAs ("Comece grátis", "Aproveitar", "Agende uma demonstração").
- **Tone:** Aspirational + practical. Speaks to owner-operators: *"para você focar no que importa: seus clientes."* Never corporate-formal; never casual-slangy.
- **Sentence rhythm:** Short declarative headlines (3–6 words per line), one-to-two-sentence sub-copy. Line breaks (`<br>`) are used inside subtitles for cadence and balance.
- **Benefit-first framing:** Features are always re-cast as outcomes. Internal naming ("CRM de clientes", "Agente IA WhatsApp") is kept recognizable, not cryptic.

### Casing
- **Sentence case** for body copy, subtitles, and button labels — *"Comece grátis por 14 dias"*, not "COMECE GRÁTIS".
- **Headlines** use sentence case with a lowercase continuation on the second line ("Transforme seu negócio / em um império digital"). Nothing is uppercase.
- Product/plan names are Title Case: **Plano Profissional**, **Plano Premium**.
- Badges ("Gratis", "Popular") are Title Case, never shouted.

### Specific vocabulary
- **"Império digital"**, **"agente de IA"**, **"agenda inteligente"**, **"gestão completa"** are brand phrases — reuse verbatim.
- CTA verbs: **Comece** (primary), **Agende**, **Aproveitar**, **Ver**, **Entrar**, **Inscrever**.
- Social proof lexicon: *"14 dias grátis"*, *"99.9% uptime"*, *"LGPD 100% Compliance"*, *"SSL Seguro"*.

### I vs you
- Always **"você"** (informal second person). Never "nós" as subject of sales copy — the brand is the silent partner enabling *your* success.

### Emoji
- **Not used** in marketing copy. No emoji in headers, buttons, nav, dropdowns, or features. Use real Lucide icons instead (always paired with a filled or gradient icon-tile background).

### Vibe
Warm, feminine-leaning-but-unisex, upscale-but-accessible. Think "boutique salon meets SaaS confidence" — the terracotta + cream + serif combination reads premium without being cold or corporate. Copy celebrates the business owner; visuals celebrate the product.

### Concrete examples (verbatim from the site)
- **H1:** "Transforme seu negócio em um império digital"
- **Subtitle:** "Gestão completa + site personalizado + agente de IA no WhatsApp. Tudo em uma única plataforma para você focar no que importa: seus clientes."
- **Primary CTA:** "Comece grátis por 14 dias"
- **Secondary CTA:** "Agende uma demonstração"
- **Promo bar:** "Oferta especial: 14 dias grátis + até 15% de desconto no plano anual"
- **Footer newsletter:** "Fique por dentro das novidades — Receba dicas de gestão, novidades do produto e ofertas exclusivas"
- **Footer sign-off:** "Feito com ♥ no Brasil"

---

## VISUAL FOUNDATIONS

### Color motif
A **warm, earthy palette** anchored on one terracotta accent (`#db6f57`) — never blue, never neon, never cool. The system rotates between **three surface modes**:
1. **Light page** (`#faf8f6` cream) — default hero, features, FAQ, footer-top, reviews
2. **Dark inverted** (`#2a2420` warm near-black) — primary features, CTA block, footer proper (gradient to `#1a1510`)
3. **Muted pricing** (`#f0e8e3` warm beige) — the pricing section only, divided by a top border

### Type motif
**Serif/sans pairing.** Playfair Display for *every* headline gives the brand its editorial, boutique feeling; Inter keeps body & UI clean and readable. The serif H1 frequently has a **gradient second line** animated via `background-position`.

### Backgrounds
- Solid warm surfaces (no photo backgrounds on the landing itself).
- **Decorative SVG dot pattern** at ~3% opacity (a small plus-sign grid) layered over hero and dark sections for subtle texture.
- **Soft blur-xl blobs** (`filter: blur(3xl)`) of `--gradient-blob-accent` and `--gradient-blob-sage` — two per section, positioned top-right and bottom-left. These pulsate gently (`scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3]` on 8–10s loop).
- No hand-drawn illustrations. No repeating photo textures. No heavy image backdrops.

### Imagery treatment
Product **phone mockups** (3 in hero: left, center elevated, right, each rotated −5° / 0° / +5°). Real product screenshots for feature sections (agenda, dashboard, kanban, customer profile — all in the product's light theme). Persona photos (salon owner, barber, clinic manager) are warm-lit, neutral-background, professional portraits. Imagery is **warm-toned** overall, never desaturated, never B&W, no grain.

### Animation
- **Framer Motion** everywhere on the landing; **GSAP** available.
- **Entrance:** `opacity: 0 → 1`, `y: 20–40 → 0`, duration `0.6–0.7s`, `ease: easeOut`, staggered 0.1–0.15s between siblings.
- **Ambient loops:** floating cards `y: [0, -12, 0]` over 3.5–5.5s; blob breathe 8–10s; gradient text `background-position` 8s linear infinite.
- **Hover:** `whileHover={{ y: -2, scale: 1.03 }}` with `spring { stiffness: 300-400, damping: 18-25 }`.
- **Dropdowns:** scale + filter blur (`blur(8px) → 0`) + staggered children sliding in `x: -20 → 0`. Exit is a reverse of the same.
- `prefers-reduced-motion` is respected (via `useReducedMotion`).

### Hover states
- **Links/nav:** text darkens `#4f6f64 → #2a2420` or accents to `#db6f57`; an underline (`h-0.5` gradient `#db6f57 → #c55a42`) sweeps in from 0 width to 100%.
- **Primary gradient CTA:** scale 1.05, shadow intensifies to `shadow-xl` + `hover:shadow-[0_0_30px_rgba(219,111,87,0.4)]`, plus a shimmer sweep (white/20 gradient) every 3s.
- **Secondary outline:** `border-[#8b3d35]` inverts to fill — `hover:bg-[#8b3d35] hover:text-white`.
- **Cards:** lift `y: -2` + shadow upgrade; hover icon-tile rotates slightly (`rotate: -8deg`).

### Press states
- Buttons: `whileTap={{ scale: 0.97-0.98 }}`, `active:opacity-80` or `active:bg-<darker>`.
- Accent primary press: `active:bg-[#c55a42]` + `active:text-white/80`.

### Borders
- Default: `1px solid #d8ccc4` (warm taupe).
- Light divisor: `1px solid #e6d9d4`.
- On dark: `1px solid #3d2e28`.
- "Gradient border" trick on badges: outer gradient `#db6f57/60 → 0%`, 1px padding, inner bg same as section.

### Shadow system
| Use | Value |
|---|---|
| Card default | `0 10px 15px -3px rgba(42,36,32,0.05)` |
| Card hover | `0 25px 50px -12px rgba(42,36,32,0.1)` |
| Phone mockup | `shadow-2xl` (~25-50px blur) |
| Primary CTA hover glow | `0 0 30px rgba(219,111,87,0.4)` |
| Dropdown | `0 20px 60px -15px rgba(219,111,87,0.2), 0 10px 20px -10px rgba(0,0,0,0.1)` |
| Button outline hover glow | `0 0 20px rgba(219,111,87,0.15)` |

### Gradients — everywhere, but always warm
Signature gradients (see `colors_and_type.css`):
- `--gradient-accent` — 2-stop (`#db6f57 → #c55a42`): filled buttons, tab overlays
- `--gradient-title` — 3-stop animated (`#db6f57 → #8b3d35 → #db6f57`): hero H1 second line, logo wordmark
- `--gradient-cta` — 3-stop (`#db6f57 → #c55a42 → #8b3d35`): header "Comece grátis"
- `--gradient-footer` — dark vertical (`#2a2420 → #1a1510`)
- Blob gradients (accent + sage) at 20% opacity, blurred 3xl

**No bluish-purple gradients. No rainbow. No cool tones.**

### Transparency & blur
- Header: `bg-white/90` + `backdrop-blur-md`; promo bar solid gradient.
- Mobile menu: `bg-white/95` + `backdrop-blur-xl`.
- Dropdown shimmer: `bg-gradient-to-r from-transparent via-[#db6f57]/5 to-transparent` swept across.
- Decorative blobs rely on `blur-3xl` not backdrop-filter.

### Corner radius — scale by component size
| Element | Radius |
|---|---|
| Tiny chips, badges, pills, nav underlines | `rounded-full` |
| Buttons, inputs, nav items, icon tiles | `rounded-lg` (8px) / `rounded-xl` (12px for CTAs) |
| Feature cards, tabs, dropdowns | `rounded-2xl` (16px) |
| Pricing cards | `rounded-3xl` (24px) |

### Card anatomy
- **Feature card (light):** `bg-white`, `border: 1px solid #d8ccc4`, `rounded-2xl`, `p-8`, 32×32 icon (no tile — just colored Lucide), `h3 mt-6 font-semibold`, `p mt-2 text-[#4f6f64]`, `shadow` minimal.
- **Pricing card (default):** `bg-white`, `rounded-3xl`, `p-6`, `shadow-lg shadow-[#2a2420]/5`, `border border-[#d8ccc4]`.
- **Pricing card (highlight):** `bg-[#2a2420]` (swap colors — white title, `#e6d9d4` body, white check icons, `#db6f57` accent button).
- **Dropdown menu item:** icon tile `40×40 rounded-xl bg-gradient-to-br from-[#db6f57]/70 to-[#c55a42]` with white icon, left border `3px rounded-full` gradient appears on hover, row background fades to `rgba(219,111,87,0.06)`.

### Layout rules & grid
- Container: `max-w-7xl` (1280px) with `mx-auto px-4 sm:px-6 lg:px-8`.
- Section vertical rhythm: `py-20 sm:py-32`.
- Hero: extra top padding `pt-25 md:pt-40 lg:pt-44` to clear fixed header.
- Features grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
- Pricing: `grid grid-cols-1 lg:grid-cols-3 gap-8`.
- Fixed header (h-20), optional sticky promo bar slides in below when scrolled.

### Iconography attitude
See `ICONOGRAPHY` section below.

---

## ICONOGRAPHY

### The set
**Lucide React** (`lucide-react@^0.577.0`) is the single source for UI icons. Stroke-based, 2px default weight, rounded line caps — same look across header, features, footer, dropdowns. Core icons observed in the codebase include:
`Calendar, Users, Bot, Brain, Sparkles, Sparkle, Shield, Award, ArrowRight, ChevronDown, Menu, X, LogIn, MessageCircle, MessageSquare, BarChart, BarChart3, CreditCard, Globe, Scissors, Palette, Smartphone, Building2, Zap, Target, Gift, Crown, Heart, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter`.

### Sizes
- Inline with text: `16px` (`w-4 h-4`)
- Nav / dropdown arrows: `16-20px`
- Feature card icon: `20px` inside a 35×35 tile, or `32px` freestanding
- Dropdown icon tile: `40×40 rounded-xl` gradient background with `20px` white icon

### How icons are styled
- **In a "tile"** — 90% of appearances: a square rounded tile (`rounded-xl` or `rounded-lg`), filled with either `bg-gradient-to-br from-[#db6f57]/70 to-[#c55a42]` (white icon) or `bg-[color]15` tint (colored icon).
- **Free-standing** on cards: `text-[#db6f57]` (terracotta) or `text-[#2a2420]` (neutral dark). Check marks in lists use `text-[#db6f57]` on light, `text-white` on dark.
- **In dark sections**: tiles use `bg-white/10` with `text-[#5a7a6e]` (sage) — sage as a soft contrast against terracotta.

### Loading approach
This design system uses Lucide via **CDN** in static HTML (`lucide@latest` UMD). In a real Bellory app the dependency is the NPM package. Substitution: **exactly matches the production set** — no substitution flagged.

### Emoji / Unicode icons
**Not used.** No emoji in copy, no unicode symbols as icons. The one exception: Heart `♥` character appears in the code but is rendered via `<Heart />` (Lucide) not as text.

### SVG vs PNG vs font
- Logo assets are **SVG** (`bellory2sfundo.svg`, `bellory.svg`, `bellory2.svg`) plus a transparent PNG for raster needs.
- UI icons: **inline SVG** via Lucide components.
- Product screenshots (agenda, dashboard, kanban, customer profile, phone mockups) are **PNG** (light theme versions copied into `assets/`).
- No icon font.

---

## Font substitutions

None for UI. Playfair Display, Inter, and Geist Mono are all loaded from Google Fonts — same as production (`app/layout.tsx` uses Next.js `next/font/google` to load `Playfair_Display` + `Inter`; Geist Mono comes from `geist` npm package — swapped to Google Fonts equivalent here).

⚠️ **Flag:** `Geist Mono` in the real app is loaded via the `geist` npm package. In this design system it's pulled from Google Fonts, which exposes the same font with the same metrics. No visual difference expected — flagging only for completeness. **Ask the user** to provide the original `geist` font files if pixel parity matters.

---

## Index — what lives where

```
Bellory Design System/
├── README.md                ← you are here
├── SKILL.md                 ← for Claude Code / skill invocation
├── colors_and_type.css      ← tokens + semantic type classes
├── assets/                  ← logos, mockups, screenshots, persona photos
│   ├── bellory-logo.svg, bellory-wordmark.svg, bellory-alt.svg
│   ├── bellory-transparent.png
│   ├── mockup-white.png, mockup-white1.png
│   ├── dashboard-light.png, agenda-light.png, agenda-kanban-light.png
│   ├── customer-profile.jpg
│   ├── owner-salon.jpg, owner-barbershop.jpg, owner-clinic.jpg
│   └── salon-website-light.jpg, barbershop-website-dark.jpg
├── preview/                 ← cards displayed in the Design System tab
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── landing/             ← Bellory marketing site recreation
        ├── index.html
        ├── Header.jsx, Hero.jsx, Features.jsx, Pricing.jsx, Footer.jsx, ...
        └── README.md
```
