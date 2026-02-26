# Design System Mesclado — Pocket Structure + Sua Paleta

> Estrutura, componentes e padrões do Pocket, agora com a sua paleta de cores.

---

## 1. Mapeamento de Cores: Pocket → Sua Paleta

| Token Pocket | Classe Original | Sua Cor | Classe Nova |
|---|---|---|---|
| **Superfícies** | | | |
| `bg-gray-50` (fundo página) | `bg-gray-50` | `#faf8f6` | `bg-[#faf8f6]` |
| `bg-white` (cards) | `bg-white` | `white` | `bg-white` |
| `bg-gray-900` (seções escuras) | `bg-gray-900` | `#2a2420` | `bg-[#2a2420]` |
| `bg-gray-800` (cards em fundo escuro) | `bg-gray-800` | `#3d2e28` | `bg-[#3d2e28]` |
| `bg-gray-100` (seção pricing) | `bg-gray-100` | `#f0e8e3` | `bg-[#f0e8e3]` |
| `bg-gray-50` (gráficos, áreas sutis) | `bg-gray-50` | `#faf8f6` | `bg-[#faf8f6]` |
| **Textos** | | | |
| `text-gray-900` (títulos) | `text-gray-900` | `#2a2420` | `text-[#2a2420]` |
| `text-gray-700` (corpo) | `text-gray-700` | `#4f6f64` | `text-[#4f6f64]` |
| `text-gray-600` (corpo alt) | `text-gray-600` | `#5a7d71` | `text-[#5a7d71]` |
| `text-gray-500` (muted) | `text-gray-500` | `#99A1AF` | `text-[#99A1AF]` |
| `text-gray-400` (placeholder/dark bg) | `text-gray-400` | `#d8ccc4` | `text-[#d8ccc4]` |
| `text-white` (sobre fundo escuro) | `text-white` | `white` | `text-white` |
| `text-gray-300` (subtexto em dark) | `text-gray-300` | `#e6d9d4` | `text-[#e6d9d4]` |
| **Accent** | | | |
| `bg-cyan-500` (accent principal) | `bg-cyan-500` | `#db6f57` | `bg-[#db6f57]` |
| `bg-cyan-600` (accent hover) | `bg-cyan-600` | `#c55a42` | `bg-[#c55a42]` |
| `text-cyan-500` (texto accent) | `text-cyan-500` | `#db6f57` | `text-[#db6f57]` |
| `text-cyan-600` (tab ativa) | `text-cyan-600` | `#8b3d35` | `text-[#8b3d35]` |
| **Bordas** | | | |
| `border-gray-200` (bordas padrão) | `border-gray-200` | `#d8ccc4` | `border-[#d8ccc4]` |
| `border-gray-300` (botões outline) | `border-gray-300` | `#d8ccc4` | `border-[#d8ccc4]` |
| `border-gray-100` (divisores leves) | `border-gray-100` | `#e6d9d4` | `border-[#e6d9d4]` |
| `border-gray-800` (divisores dark) | `border-gray-800` | `#3d2e28` | `border-[#3d2e28]` |
| **Strokes decorativos** | | | |
| `stroke-gray-300/70` | — | `#d8ccc4` opacity 70% | `stroke-[#d8ccc4]/70` |
| `#D4D4D4` (SVG strokes) | — | `#d8ccc4` | `#d8ccc4` |
| `#A3A3A3` (ícone fills) | — | `#99A1AF` | `#99A1AF` |

---

## 2. Tipografia (sem alterações)

| Papel | Peso | Tamanho | Tracking |
|---|---|---|---|
| Display / H1 | `font-medium` | `text-4xl` | `tracking-tight` |
| Seção / H2 | `font-medium` | `text-3xl` / `sm:text-4xl` | `tracking-tight` |
| Card Title / H3 | `font-semibold` | `text-lg` | default |
| Body Large | `font-normal` | `text-lg` | default |
| Body | `font-normal` | `text-sm` | default |
| Label | `font-semibold` | `text-sm` | default |
| Price | `font-normal` | `text-3xl` | `tracking-tight` |

---

## 3. Componentes Adaptados

### 3.1 Botões

**Primário Solid (accent — gradiente)**
```html
<a class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold
  transition-colors bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white
  hover:shadow-xl active:opacity-80">
  Texto
</a>
```

**Primário Solid (dark)**
```html
<a class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold
  transition-colors bg-[#2a2420] text-white hover:bg-[#3d2e28]
  active:bg-[#2a2420] active:text-white/80">
  Texto
</a>
```

**Primário Solid (accent com overlay hover)**
```html
<a class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold
  transition-colors relative overflow-hidden bg-[#db6f57] text-white
  before:absolute before:inset-0 active:before:bg-transparent
  hover:before:bg-white/10 active:bg-[#c55a42] active:text-white/80
  before:transition-colors">
  Texto
</a>
```

**Outline (secundário)**
```html
<a class="inline-flex justify-center rounded-lg border
  py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
  text-sm transition-colors border-[#d8ccc4] text-[#4f6f64]
  hover:border-[#db6f57]/30 active:bg-[#faf8f6] active:text-[#4f6f64]/80">
  Texto
</a>
```

**Outline (com cor forte — estilo do seu secondaryButton)**
```html
<a class="inline-flex justify-center rounded-lg border-2
  py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
  text-sm font-semibold transition-colors border-[#8b3d35] text-[#8b3d35]
  hover:bg-[#8b3d35] hover:text-white">
  Texto
</a>
```

---

### 3.2 Cards de Pricing

**Card padrão (light)**
```html
<section class="flex flex-col overflow-hidden rounded-3xl p-6
  shadow-lg shadow-[#2a2420]/5 bg-white border border-[#d8ccc4]">
  <!-- Conteúdo -->
</section>
```

**Card destacado (dark)**
```html
<section class="flex flex-col overflow-hidden rounded-3xl p-6
  shadow-lg shadow-[#2a2420]/5 bg-[#2a2420]">
  <!-- text-white, text-[#e6d9d4], text-[#d8ccc4] -->
</section>
```

**Ícone de check na lista de features**
```html
<!-- Versão light -->
<svg class="h-6 w-6 flex-none text-[#db6f57]">...</svg>

<!-- Versão dark (card destacado) -->
<svg class="h-6 w-6 flex-none text-white">...</svg>
```

**Divisores na lista**
```html
<!-- Light card -->
<ul class="-my-2 divide-y text-sm divide-[#e6d9d4] text-[#4f6f64]">

<!-- Dark card -->
<ul class="-my-2 divide-y text-sm divide-[#3d2e28] text-[#e6d9d4]">
```

---

### 3.3 Cards de Feature (secundários)

```html
<li class="rounded-2xl border border-[#d8ccc4] p-8 bg-white">
  <svg class="h-8 w-8"><!-- ícone com fills #99A1AF e #2a2420 --></svg>
  <h3 class="mt-6 font-semibold text-[#2a2420]">Título</h3>
  <p class="mt-2 text-[#4f6f64]">Descrição</p>
</li>
```

---

### 3.4 Navbar

```html
<nav>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50
    flex justify-between py-8">

    <!-- Logo -->
    <a aria-label="Home" href="/">...</a>

    <!-- Links -->
    <a class="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm
      text-[#4f6f64] transition-colors delay-150
      hover:text-[#2a2420] hover:delay-0" href="/#features">
      Features
    </a>

    <!-- CTAs -->
    <a class="inline-flex justify-center rounded-lg border
      py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
      text-sm transition-colors border-[#d8ccc4] text-[#4f6f64]
      hover:border-[#db6f57]/30 active:bg-[#faf8f6]">
      Log in
    </a>
    <a class="inline-flex justify-center rounded-lg py-2 px-3
      text-sm font-semibold transition-colors bg-[#2a2420] text-white
      hover:bg-[#3d2e28]">
      Download
    </a>
  </div>
</nav>
```

---

### 3.5 Badge

```html
<div class="inline-flex items-center rounded-full px-3 py-1
  bg-gradient-to-r from-[#db6f57]/10 via-[#8b3d35]/10 to-[#db6f57]/10
  border border-[#db6f57]/20">
  <span class="text-[#db6f57]"><!-- ícone --></span>
  <span class="text-sm font-semibold text-[#8b3d35]">Texto do badge</span>
</div>
```

---

### 3.6 Input + Newsletter

```html
<input type="email"
  class="block w-full appearance-none rounded-lg border border-[#d8ccc4]
  bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)]
  text-[#2a2420] placeholder:text-[#4f6f64]/50
  focus:border-[#db6f57] focus:outline-hidden focus:ring-[#db6f57]
  sm:text-sm" />

<button class="inline-flex justify-center rounded-lg py-2 px-3
  text-sm font-semibold transition-colors relative overflow-hidden
  bg-[#db6f57] text-white before:absolute before:inset-0
  hover:before:bg-white/10 active:bg-[#c55a42]
  before:transition-colors ml-4 flex-none">
  Join newsletter
</button>
```

---

### 3.7 Toggle de Pricing

```html
<!-- Opção inativa -->
<span class="cursor-pointer border border-[#d8ccc4]
  px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)]
  text-sm text-[#4f6f64] transition-colors hover:border-[#db6f57]/30
  rounded-l-lg">
  Monthly
</span>

<!-- Overlay ativo -->
<div class="pointer-events-none absolute inset-0 z-10 grid grid-cols-2
  overflow-hidden rounded-lg bg-[#db6f57] transition-all duration-300
  [clip-path:inset(0_50%_0_0)]">
  <div class="py-2 text-center text-sm font-semibold text-white">Monthly</div>
  <div class="py-2 text-center text-sm font-semibold text-white">Annually</div>
</div>
```

---

## 4. Padrão de Seções com Sua Paleta

| Seção | Fundo | Borda superior |
|---|---|---|
| Hero | `bg-[#faf8f6]` ou gradiente `from-[#faf8f6] via-[#e6d9d4]/30 to-[#faf8f6]` | — |
| Features primárias | `bg-[#2a2420]` | — |
| Features secundárias | `bg-[#faf8f6]` | — |
| CTA | `bg-[#2a2420]` | — |
| Reviews | `bg-[#faf8f6]` | — |
| Pricing | `bg-[#f0e8e3]` | `border-t border-[#d8ccc4]` |
| FAQs | `bg-[#faf8f6]` | `border-t border-[#d8ccc4]` |
| Footer | `bg-[#faf8f6]` | `border-t border-[#d8ccc4]` |

---

## 5. Efeitos Decorativos Adaptados

### Spinning circles (SVG strokes)
```html
<!-- Stroke principal -->
<path stroke="#d8ccc4" stroke-opacity="0.7" .../>

<!-- Gradiente accent no arco -->
<linearGradient>
  <stop stop-color="#db6f57"/>
  <stop offset="1" stop-color="#db6f57" stop-opacity="0"/>
</linearGradient>
```

### Máscaras (sem mudança — são gradientes de white→transparent)
```
mask-[linear-gradient(to_bottom,white_20%,transparent_75%)]
mask-[linear-gradient(to_bottom,white_60%,transparent)]
```

### Fade-out de reviews
```html
<div class="pointer-events-none absolute inset-x-0 top-0 h-32
  bg-linear-to-b from-[#faf8f6]"></div>
<div class="pointer-events-none absolute inset-x-0 bottom-0 h-32
  bg-linear-to-t from-[#faf8f6]"></div>
```

### Sombras
| Uso | Classe |
|---|---|
| Cards de pricing | `shadow-lg shadow-[#2a2420]/5` |
| Phone mockup | `shadow-2xl` |
| Botão primário hover | `hover:shadow-xl` |

---

## 6. Seções Dark — Texto sobre `bg-[#2a2420]`

| Elemento | Classe |
|---|---|
| Título H2 | `text-white` |
| Subtítulo / descrição | `text-[#d8ccc4]` |
| Texto secundário | `text-[#99A1AF]` |
| Texto muted (features) | `text-[#e6d9d4]` |
| Links / destaques | `text-[#db6f57]` |
| Card background | `bg-[#3d2e28]` |
| Card hover | `hover:bg-[#3d2e28]/30` |
| Ícone check | `text-white` |
| Divisores | `divide-[#3d2e28]` |

---

## 7. Cores de Ícones

| Contexto | Cor original | Sua cor |
|---|---|---|
| Circle fill decorativo | `#A3A3A3` opacity 0.2 | `#99A1AF` opacity 0.2 |
| Ícone path principal | `#171717` | `#2a2420` |
| Ícone path secundário | `#737373` | `#4f6f64` |
| Check em lista (light) | `text-cyan-500` | `text-[#db6f57]` |
| Check em lista (dark) | `text-white` | `text-white` |

---

## 8. Referência Rápida — Tokens Completos

```typescript
const designSystem = {
  // === SUPERFÍCIES ===
  surface: {
    page: '#faf8f6',
    card: '#ffffff',
    dark: '#2a2420',
    darkAlt: '#3d2e28',
    pricingBg: '#f0e8e3',
    muted: '#faf8f6',
  },

  // === ACCENT ===
  accent: {
    primary: '#db6f57',      // botões, checks, links, badges
    primaryHover: '#c55a42',  // hover states
    secondary: '#8b3d35',     // texto accent forte, tab ativa
    gradient: 'from-[#db6f57] to-[#c55a42]',
  },

  // === TEXTO ===
  text: {
    primary: '#2a2420',       // títulos, texto principal
    secondary: '#4f6f64',     // corpo, descrições
    secondaryAlt: '#5a7d71',  // corpo alternativo
    muted: '#99A1AF',         // labels, captions
    onDark: '#ffffff',
    onDarkSecondary: '#d8ccc4',
    onDarkTertiary: '#e6d9d4',
    placeholder: 'rgba(79, 111, 100, 0.5)', // #4f6f64/50
  },

  // === BORDAS ===
  border: {
    default: '#d8ccc4',
    light: '#e6d9d4',
    dark: '#3d2e28',
    accentHover: 'rgba(219, 111, 87, 0.3)', // #db6f57/30
  },

  // === ÍCONES ===
  icon: {
    decorativeCircle: 'rgba(153, 161, 175, 0.2)',
    primary: '#2a2420',
    secondary: '#4f6f64',
    accent: '#db6f57',
    star: '#db6f57',
  },

  // === SOMBRAS ===
  shadow: {
    card: '0 10px 15px -3px rgba(42, 36, 32, 0.05)',
    cardHover: '0 25px 50px -12px rgba(42, 36, 32, 0.1)',
  },

  // === SVG DECORATIVOS ===
  decorative: {
    stroke: '#d8ccc4',
    strokeOpacity: 0.7,
    gradientStart: '#db6f57',
    gradientEnd: 'rgba(219, 111, 87, 0)',
    blob1: 'from-[#db6f57]/20 to-[#8b3d35]/20',
    blob2: 'from-[#4f6f64]/20 to-[#db6f57]/20',
  },
};
```

---

## 9. Espaçamento e Layout (sem alterações do Pocket)

```
Container:          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Seção padrão:       py-20 sm:py-32
Hero:               py-20 sm:py-32 lg:pb-32 xl:pb-36
CTA:                py-20 sm:py-28
Hero grid:          lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20
Features grid:      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6
Pricing grid:       grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10
FAQ grid:           grid grid-cols-1 lg:grid-cols-3 gap-8
```

### Border Radius
| Componente | Radius |
|---|---|
| Botões, inputs | `rounded-lg` |
| Feature cards | `rounded-2xl` |
| Pricing cards | `rounded-3xl` |
| Badges | `rounded-full` |

---

## 10. Resumo Visual

```
┌─────────────────────────────────────────┐
│  NAVBAR  bg-[#faf8f6]                   │
│  links: text-[#4f6f64]                  │
│  CTA: bg-[#2a2420] text-white           │
├─────────────────────────────────────────┤
│  HERO  bg-[#faf8f6]                     │
│  H1: text-[#2a2420] text-4xl            │
│  Body: text-[#5a7d71] text-lg           │
│  CTA: bg-gradient #db6f57→#c55a42       │
├─────────────────────────────────────────┤
│  FEATURES  bg-[#2a2420]                 │
│  H2: text-white                         │
│  Body: text-[#d8ccc4]                   │
│  Accent: text-[#db6f57]                 │
├─────────────────────────────────────────┤
│  SECONDARY FEATURES  bg-[#faf8f6]       │
│  Cards: bg-white border-[#d8ccc4]       │
│  H3: text-[#2a2420]                     │
│  Body: text-[#4f6f64]                   │
├─────────────────────────────────────────┤
│  CTA  bg-[#2a2420]                      │
│  H2: text-white                         │
│  Body: text-[#e6d9d4]                   │
│  Button: bg-white text-[#2a2420]        │
├─────────────────────────────────────────┤
│  PRICING  bg-[#f0e8e3]                  │
│  border-t border-[#d8ccc4]              │
│  Highlight card: bg-[#2a2420]           │
│  Accent button: bg-[#db6f57]            │
├─────────────────────────────────────────┤
│  FAQ  bg-[#faf8f6]                      │
│  border-t border-[#d8ccc4]              │
│  H3: text-[#2a2420]                     │
│  Body: text-[#4f6f64]                   │
├─────────────────────────────────────────┤
│  FOOTER  bg-[#faf8f6]                   │
│  border-t border-[#d8ccc4]              │
│  Input focus: border-[#db6f57]          │
│  Newsletter btn: bg-[#db6f57]           │
└─────────────────────────────────────────┘
```
