# Bellory Landing Page — UI Kit

Full marketing-site recreation of **bellory.com.br** built from the Bellory design system tokens.

## What's here

- `index.html` — main landing page (single file composition)
- `styles.css` — base reset, buttons, badges, inputs, feature/pricing cards, animations
- `components.css` — header, promo bar, hero, sections, pricing grid, comparison table, FAQ, testimonials, CTA block, footer
- `icons.html` — inline SVG sprite (Lucide-style icons, loaded into each page)

## Composition

1. Promo bar — animated shimmer gradient
2. Sticky glass header (dropdowns on Funcionalidades + Agente IA)
3. Hero with 3-phone mockup cluster, gradient second-line headline
4. Features grid (light) — 6 feature cards in gradient icon tiles
5. Dark IA section — 3 dark feature cards, sage accent on terracotta ground
6. Comparison table — Bellory vs. agenda-only vs. generic site-builder
7. Pricing (muted cream section) — 3 tiers, middle highlight in dark
8. Testimonials — 3 owner portraits with 5-star reviews
9. FAQ — native `<details>` with chevron rotation
10. CTA block — dark card on light section with blobs
11. Footer — dark gradient with newsletter + socials + "Feito com ♥ no Brasil"

## Conventions followed (from design system)

- Serif headlines (Playfair Display), sans body/UI (Inter)
- Gradient second line on H1 (animated `background-position`)
- Terracotta `#db6f57` accent everywhere; sage only in dark contexts
- Warm, earthy surfaces: cream → muted → dark rotation between sections
- All icons live in a single inline SVG sprite (`<use href="#i-*">`)
- No emoji; copy in Portuguese (pt-BR), second-person "você"
- Entrance animations with `@keyframes fadeUp`; ambient float on mockups; shimmer sweep on primary CTA
