# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product context

Bellory is a SaaS management platform for **barbearias, salões de beleza, clínicas de estética, nail designers e spas** (Brazilian beauty/wellness segment). **This repo is the public marketing landing page** (`bellory.com.br`) whose job is to convert visitors from that segment into trial users.

When writing copy, building sections, or adjusting CTAs, optimize for: communicating the value prop clearly to a non-technical owner-operator, surfacing the hero CTA (`Comece grátis por 14 dias`), and reinforcing the three-pillar story — **gestão completa + site personalizado + agente de IA no WhatsApp**. Copy is Portuguese-BR, informal "você", sentence case, no emoji (see design-system tone notes).

## Commands

```bash
npm run dev      # next dev — local development
npm run build    # next build — production build
npm run start    # next start — serve production build
npm run lint     # next lint
```

No test runner is configured. `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `tsc --noEmit` (or an editor) is the only way to catch type errors pre-deploy — `next build` will not fail on them.

## The design system is the source of truth — always consult it

**Before adjusting, creating, or improving anything visual, read `design-system/project/`** (handoff bundle from Claude Design). Key files:

- `design-system/project/README.md` — brand voice, tone, color motif, animation rules, card anatomy, spacing, iconography. **Read top-to-bottom for any non-trivial UI work.**
- `design-system/project/colors_and_type.css` — all color/type/radius/shadow/spacing tokens as CSS variables. These are the canonical values; `app/globals.css` mirrors them.
- `design-system/project/preview/*.html` — rendered spec cards for each token group (colors, type, spacing, components). Read the HTML/CSS directly; do not screenshot.
- `design-system/project/ui_kits/landing/` — HTML/JSX recreation of the landing; use as pixel reference when implementing a section.
- `design-system-mesclado.md` + `design-spec-asis.md` (repo root) — Pocket→Bellory color mapping and the Asis-inspired hero/benefits spec.

Recurring rules from the DS that are easy to break:
- Warm palette only — terracotta `#db6f57`, deep rust `#8b3d35`, cream `#faf8f6`, warm-dark `#2a2420`, sage `#4f6f64`. **No blue, no cool tones, no rainbow gradients.**
- **Playfair Display** for headlines, **Inter** for body per the DS. ⚠️ `app/layout.tsx` currently loads **Poppins** via `next/font/google` and applies `font-sans antialiased` on `<body>` — there is a divergence between the DS spec and the live font. Confirm with the user before "fixing" either side.
- Framer Motion entrance: `opacity 0→1`, `y: 20–40→0`, `0.6–0.7s ease-out`, staggered 0.1–0.15s. Respect `useReducedMotion`.
- Icons are **Lucide React** only. Never emoji in marketing copy.
- Radius scales with component size: badges `rounded-full`, buttons `rounded-lg/xl`, feature cards `rounded-2xl`, pricing cards `rounded-3xl`.

## Architecture

**Framework:** Next.js 16 (App Router, React 19, Tailwind v4, TypeScript strict). Path alias `@/*` maps to repo root.

**Page composition.** `app/page.tsx` is the landing page: it assembles the full funnel by composing big section components from `components/*` with `<SectionTransition>` SVG dividers between them. The order encodes the sales narrative — Hero → FeaturesInternal → AIAgentSection → Pricing → Contact → Footer. Several components are commented out (`FeaturesInternalOld`, `FeaturesExternal`, `ComparisonSection`, `FinalCTA`) — they are experiments kept in tree, not dead code to delete without asking. Additional routes exist under `app/sobre`, `app/cadastro`, `app/funcionalidades`, `app/agente-virtual`.

**Provider stack (root layout, outer → inner):** `TrackingProvider` → `ThemeProvider` (HeroThemeContext, currently **light mode only** — `toggleTheme` is a no-op) → `ReactQueryProvider` → `PrimeProvider`. Trackers fire via the in-repo `<TrackingSetup />` (see `components/tracking/*` + `docs/TRACKING_BACKEND_SPEC.md` for the expected backend contract). SEO is injected via `<StructuredData />` in `<head>` and extensive `metadata` in `app/layout.tsx` (see `SEO_IMPROVEMENTS.md` for what was implemented and why).

**UI component layers** — this repo mixes three kits, be deliberate about which to reach for:
- `components/ui/*` — shadcn/ui (New York style, Radix under the hood). Configured in `components.json`. Default choice for forms, dialogs, dropdowns, menus.
- PrimeReact — wrapped via `components/PrimeProvider.tsx`. Used where shadcn doesn't fit (data-heavy widgets).
- Bespoke section components at the top of `components/` (e.g. `hero/`, `pricing.tsx`, `features-internal.tsx`, `ai-agent-section.tsx`, `contact.tsx`) — these are the landing sections themselves, styled directly with Tailwind + DS tokens.

**Data layer.** `service/API/*` holds Axios-based API modules (`Organizacao.ts`, `AgenteVirtual.ts`, `tracking/`). `service/Querys/*` wraps them in React Query hooks consumed through `ReactQueryProvider`. `app/api/*` hosts Next.js route handlers for server-side needs (`cupom/validate`, `planos`). `.env` holds backend URLs.

**Styling pipeline.** Tailwind v4 via `@tailwindcss/postcss`. Tokens live in `app/globals.css` (mirror of `design-system/project/colors_and_type.css`). `lib/utils.ts` exports the standard `cn()` helper (clsx + tailwind-merge). Animation libs available: `framer-motion`, `motion`, `gsap`, `tw-animate-css`, `tailwindcss-animate`.

**Other context.**
- `contexts/TrackingContext.tsx` + `components/tracking/*` implement the site's own tracking layer — see `docs/TRACKING_BACKEND_SPEC.md` for the expected backend contract before changing events.
- `utils/themes.ts` holds the `belloryElegante` theme object referenced by `HeroThemeContext`.
- `public/` contains logos (`bellory2sfundo.svg`, `Bellory_transparente.png`), phone mockups, product screenshots, `robots.txt`, `manifest.ts`/`sitemap.ts` companions.
