# Bellory Design System — SKILL.md

Use this when generating assets (landing pages, emails, decks, marketing screenshots) for **Bellory** — the Brazilian SaaS for salon, barbershop, clinic, nail, spa and studio management. Its brand voice is Portuguese-BR, warm, aspirational, benefit-first.

## Load order

1. `colors_and_type.css` — all design tokens + semantic type classes. Import first.
2. `ui_kits/landing/styles.css` + `components.css` — compiled components. Copy what you need.
3. `ui_kits/landing/icons.html` — inline SVG sprite. Fetch-and-inject, then `<svg><use href="#i-calendar"/></svg>`.

## Hard rules

- **Language is Portuguese-BR.** Never English copy, never "nós" as sales subject — always "você".
- **Palette is terracotta + cream + warm dark + sage.** Never blue, purple, neon, or cool tones.
- **Headlines are Playfair Display, 700.** Body is Inter. Code/labels are Geist Mono.
- **Gradient text is always warm:** `--gradient-title` (`#db6f57 → #8b3d35 → #db6f57`), animated.
- **Section rotation:** light cream → dark warm → muted beige → dark warm. Never two of the same adjacent.
- **No emoji in copy.** Lucide icons in gradient tiles instead.
- **Border radii scale with component size:** `8–12px` (inputs/buttons), `16px` (feature cards), `24px` (pricing), `full` (pills/badges).
- **Shadows are warm and restrained:** `--shadow-card` default, `--shadow-lg` on hover, `--shadow-cta` glow on primary CTAs only.

## Signature moves

- Hero H1: two lines, second line wrapped in `.gradient-line` (animated terracotta gradient).
- Primary CTA: 3-stop warm gradient background + white shimmer sweep on hover.
- Feature card icon tile: 48px rounded-lg, gradient terracotta background, white Lucide glyph, rotates `-8deg` on card hover.
- Phone mockup cluster: 3 mockups at `-5° / 0° / +5°`, floating on staggered `floatY` loops.
- Promo bar at top: `--gradient-promo` with shimmer sweep animation.
- Dropdown: white card with 2px top gradient stripe, hover item gets a left 3px gradient bar.

## Copy patterns (verbatim-safe phrases)

- "Transforme seu negócio em um império digital"
- "Gestão completa + site personalizado + agente de IA no WhatsApp"
- "Comece grátis por 14 dias"
- "Agende uma demonstração"
- "para você focar no que importa: seus clientes"
- "Feito com ♥ no Brasil"
- Social proof: "14 dias grátis", "99.9% uptime", "LGPD 100% Compliance"

## When asked for a new page

1. Start from `ui_kits/landing/index.html` as structural reference.
2. Pull `styles.css` + `components.css` + `icons.html`.
3. Pick 3–5 sections, rotate between `.section-light`, `.section-dark`, `.section-muted`.
4. Always open with a sticky header (`.site-header`) and close with the gradient footer.
5. Use real assets from `assets/` (owner portraits, product screenshots, phone mockups, bellory-logo.svg).

## When stuck

- Typography too cool? You're using Inter for a headline — switch to Playfair Display 700.
- Gradient looks wrong? Check it's terracotta-family only (`#db6f57`, `#c55a42`, `#8b3d35`). No blue, no purple.
- Icon looks naked? Put it in a gradient tile (`.icon-tile`) with a Lucide glyph.
- Card feels flat? Add `box-shadow: var(--shadow-card)` default, `var(--shadow-lg)` on hover, `transform: translateY(-2px)` hover.
