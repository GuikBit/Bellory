# Design Spec — Asis Website (Hero + Benefits Sections)

Guia completo para replicar fielmente a estrutura e design das seções **Hero** e **Benefits** do site Asis.

---

## 🎨 Tokens de Cores (Design Tokens)

| Token | Valor | Uso |
|---|---|---|
| **Primary (Cyan)** | `rgb(0, 249, 255)` / `#00F9FF` | Acentos, badges, bordas ativas, títulos ativos |
| **Primary 60%** | `rgba(0, 249, 255, 0.6)` | Gradiente de badges |
| **Primary 0%** | `rgba(0, 249, 255, 0)` | Final do gradiente de badges |
| **Background Dark** | `rgb(2, 2, 26)` / `#02021A` | Fundo principal do site |
| **Card BG** | `rgb(28, 28, 49)` / `#1C1C31` | Fundo de cards e tabs ativos |
| **Card BG Transparent** | `rgba(28, 28, 49, 0)` | Tabs inativos |
| **Text Primary (White)** | `rgb(255, 255, 255)` / `#FFFFFF` | Títulos, textos principais |
| **Text Secondary** | `rgb(219, 219, 219)` / `#DBDBDB` | Descrições, subtextos |
| **Neutral 01 30%** | `rgba(255, 255, 255, 0.3)` | Gradiente do círculo de mockup |
| **Neutral 01 10%** | `rgba(255, 255, 255, 0.1)` | Final do gradiente do círculo |
| **Shadow Dark** | `rgba(13, 3, 22, 0.3)` | Sombra dos badges |
| **Card Shadow** | `rgba(0, 0, 0, 0.05)` | Sombra dos cards flutuantes |

---

## 📐 Layout Geral

- **Max-width do container:** `1170px`
- **Padding lateral:** `30px` cada lado (total 60px)
- **Fonte dos títulos:** Sans-serif bold (aparenta ser **Inter** ou **Satoshi**)
- **Alinhamento geral:** Centro (hero), esquerda (tabs)
- **Fundo global:** `#02021A` (azul muito escuro, quase preto)

---

## 1. HERO SECTION

### Estrutura visual

```
┌──────────────────────────────────────────────────────┐
│                   [Canvas 3D / BG]                   │  ← Fundo animado (Three.js r136)
│                                                      │
│              ┌─────── NAVBAR ──────────┐             │
│              │ Logo        Download App│             │
│              └─────────────────────────┘             │
│                                                      │
│           Your AI Companion,                         │  ← H1 - Título principal
│          Always in Your Pocket                       │
│                                                      │
│     Your 24/7 AI companion, ready to                 │  ← Subtítulo (paragraph)
│            simplify your life.                       │
│                                                      │
│        ┌──────────┐  ┌──────────┐                    │  ← Botões CTA
│        │ App Store│  │Google Play│                    │
│        └──────────┘  └──────────┘                    │
│                                                      │
│     ┌─────┐    ┌─────────┐    ┌─────┐               │  ← 3 Mockups
│     │Left │    │ Center  │    │Right│               │
│     │Mock │    │ Mockup  │    │Mock │               │
│     │     │    │(maior)  │    │     │               │
│     └─────┘    └─────────┘    └─────┘               │
│                                                      │
│              [Shadow Gradient]                       │  ← Sombra inferior
└──────────────────────────────────────────────────────┘
```

### 1.1 Navbar

- **Layout:** `flex`, `justify-content: space-between`, `align-items: center`
- **Logo:** SVG "Asis" com ícone estilizado do "A"
- **Botão CTA:** "Download App"
  - `background: #FFFFFF`
  - `color: #000000`
  - `border-radius: 100px` (pill)
  - `padding: ~12px 24px`
  - `font-weight: 600`

### 1.2 Título Principal (H1)

```css
h1 {
  text-align: center;
  color: #FFFFFF;
  font-size: clamp(40px, 6vw, 72px); /* responsivo */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

### 1.3 Subtítulo

```css
.subtitle {
  text-align: center;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}
```

### 1.4 Botões CTA (App Store / Google Play)

```css
.cta-button {
  display: inline-flex;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-radius: 58px;
  padding: 12px 28px;
  gap: 8px;
  transition: opacity 0.2s;
}

/* Conteúdo interno: ícone SVG da loja (124x32 App Store, 128x31 Google Play) */
```

- **Layout dos botões:** `display: flex; gap: 16px; justify-content: center;`

### 1.5 Mockups (3 telefones)

Esta é a parte central da Hero. São 3 imagens de mockups de celular dispostos lado a lado com o central elevado.

#### Estrutura do container

```css
.mockups-container {
  position: relative;
  width: 100%;
  max-width: 1170px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 40px;
}
```

#### Mockup Esquerdo

```css
.mockup-left {
  position: relative;
  width: calc(50%); /* metade do container */
  aspect-ratio: 1582 / 2530; /* proporção original da imagem */
  z-index: 1;
  /* Animação de entrada: fade-in + slide-up */
  opacity: 1;
  transform: none;
  will-change: transform;
}

.mockup-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

- **Dimensão original da imagem:** 1582 × 2530 px
- **Tamanho renderizado:** `calc(min(100vw - 60px, 1170px) / 2)`

#### Mockup Central (destaque)

```css
.mockup-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* centralizado */
  width: calc(100% / 2.695); /* ~434px em 1170px */
  aspect-ratio: 806 / 1662;
  z-index: 3; /* fica na frente */
}

.mockup-center img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

- **Dimensão original:** 806 × 1662 px
- **Tamanho renderizado:** `calc(min(100vw - 60px, 1170px) / 2.695)`
- **Z-index mais alto** — fica sobre os outros

#### Mockup Direito

```css
.mockup-right {
  position: relative;
  width: calc(50%);
  aspect-ratio: 2026 / 3241;
  z-index: 1;
}
```

- **Dimensão original:** 2026 × 3241 px
- **Tamanho renderizado:** `calc(min(100vw - 60px, 1170px) / 2)`

#### Sombra Central (entre os mockups)

```css
.center-shadow {
  position: absolute;
  /* Gradiente escuro que cria profundidade atrás do mockup central */
  /* Visível entre os 3 mockups */
}
```

#### Sombra Inferior (Line Shadow)

```css
.line-shadow {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Gradiente de sombra que faz transição suave para a próxima seção */
}
```

### 1.6 Background Animado

- **Engine:** Three.js r136
- **Elemento:** `<canvas>` fullscreen atrás do conteúdo
- **Dimensões:** 1905 × 593 px (largura total × altura do hero)
- **Efeito visual:** Partículas/linhas luminosas em tons de ciano sobre fundo escuro (tipo aurora boreal / raios de luz subaquáticos)

### 1.7 Animações de Entrada

Todos os elementos usam `data-framer-appear-id` com:

```css
/* Estado inicial */
opacity: 0;
transform: translateY(20px);

/* Estado final (animado) */
opacity: 1;
transform: none;
will-change: transform;
transition: opacity 0.6s ease, transform 0.6s ease;
```

- **Trigger:** `On Scroll` (elemento `data-framer-name="On Scroll Trigger"`)
- Os mockups aparecem com delay escalonado (esquerdo → centro → direito)

---

## 2. BENEFITS SECTION

### Estrutura visual

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                   ┌──────────┐                       │
│                   │ Benefits │  ← Badge/Pill         │
│                   └──────────┘                       │
│                                                      │
│              Asis for Everyday Life                   │  ← H2
│                                                      │
│        Handle your day-to-day tasks                  │  ← Subtítulo
│              easily with Asis.                       │
│                                                      │
│  ┌─────────────────────┐   ┌───────────────────────┐ │
│  │                     │   │                       │ │
│  │  ● Stay on Track    │   │    ┌───────────┐      │ │
│  │    Quickly schedule  │   │    │  PHONE    │      │ │
│  │    meetings...      │   │    │  MOCKUP   │      │ │
│  │                     │   │    │           │      │ │
│  │  ○ Smooth Emails    │   │    │    +      │      │ │
│  │    Let Asis craft...│   │    │  FLOATING │      │ │
│  │                     │   │    │   CARD    │      │ │
│  │  ○ Voice Control    │   │    └───────────┘      │ │
│  │    Use simple...    │   │                       │ │
│  │                     │   │                       │ │
│  │  ○ Smart Suggestions│   │                       │ │
│  │    Personalized...  │   │                       │ │
│  │                     │   │                       │ │
│  └─────────────────────┘   └───────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 2.1 Badge "Benefits"

```css
.badge-outer {
  display: inline-flex;
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0.6) 0%,   /* Primary 60% */
    rgba(0, 249, 255, 0) 100%     /* Primary 0% */
  );
  border-radius: 100px;
  padding: 1px; /* truque de borda gradiente */
  box-shadow: 0px 16px 28px 0px rgba(13, 3, 22, 0.3);
}

.badge-inner {
  background-color: #02021A; /* mesmo fundo do site */
  border-radius: 100px;
  padding: 8px 20px;
}

.badge-text {
  color: #00F9FF;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
}
```

### 2.2 Título H2

```css
h2 {
  text-align: center;
  color: #FFFFFF;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.2;
  margin-top: 20px;
}
```

### 2.3 Subtítulo

```css
.benefits-subtitle {
  text-align: center;
  color: #FFFFFF; /* ou ligeiramente transparente */
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
}
```

### 2.4 Layout Tabs + Mockup (2 colunas)

```css
.benefits-content {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  margin-top: 48px;
}

.tabs-column {
  flex: 1; /* ~50% */
}

.mockup-column {
  flex: 1; /* ~50% */
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 2.5 Tab Buttons (Lista à esquerda)

São 4 tabs empilhados verticalmente. Cada tab tem:
- **Linha de borda à esquerda** (indicador ativo)
- **Título** (H5, bold)
- **Descrição** (parágrafo)

#### Tab Ativo

```css
.tab-item {
  position: relative;
  width: 100%;
  padding: 0;
}

.tab-border-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 100px;
}

/* ATIVO */
.tab-item.active .tab-border-line {
  background-color: #00F9FF; /* cyan */
}

.tab-item.active .tab-content {
  background-color: #1C1C31; /* card bg visível */
  border-radius: 18px;
  padding: 20px 24px;
}

.tab-item.active .tab-title {
  color: #00F9FF; /* cyan */
}
```

#### Tab Inativo

```css
.tab-item.inactive .tab-border-line {
  background-color: #1C1C31; /* sutil, quase invisível */
  border-radius: 0px;
}

.tab-item.inactive .tab-content {
  background-color: transparent;
  border-radius: 18px;
  padding: 20px 24px;
}

.tab-item.inactive .tab-title {
  color: #FFFFFF; /* branco normal */
}
```

#### Estilos comuns dos tabs

```css
.tab-title {
  font-size: 18px; /* aprox, preset "iGxQVMqes" */
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8px;
}

.tab-description {
  color: #DBDBDB;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
}
```

#### Conteúdo dos 4 Tabs

| # | Título | Descrição |
|---|---|---|
| 1 | **Stay on Track** | Quickly schedule meetings and set reminders. |
| 2 | **Smooth Emails** | Let Asis craft personalized replies in your tone. |
| 3 | **Voice Control** | Use simple commands to get things done hands-free. |
| 4 | **Smart Suggestions** | Personalized recommendations based on your habits. |

### 2.6 Mockup à Direita (Phone + Card Flutuante)

#### Container

```css
.tab-images-container {
  position: relative;
  flex: 1;
}
```

#### Círculo de Fundo

```css
.circle-bg {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 50%; /* círculo perfeito */
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  /* O mockup do phone fica dentro deste círculo */
}
```

- O **container externo** tem `border-bottom-left-radius: 1000px; border-bottom-right-radius: 1000px` — criando um efeito de "meia-lua" na parte inferior.

#### Phone Mockup (dentro do círculo)

```css
.phone-image {
  position: relative;
  width: 100%; /* ocupa o círculo */
  /* Imagem: 2026 × 3241 px */
  /* Tamanho renderizado: max(min(100vw - 60px, 1170px) * 0.4, 1px) */
}

.phone-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

#### Card Flutuante (sobreposto ao phone)

```css
.floating-card {
  position: absolute;
  /* Posicionado sobre o mockup, levemente rotacionado */
  border-radius: 14px;
  box-shadow: -11px -4px 24px 0px rgba(0, 0, 0, 0.05);
  transform: rotate(5.81deg); /* leve inclinação */
  width: 22%; /* calc(min(100vw - 60px, 1170px) * 0.22) */
  aspect-ratio: 1144 / 1282;
  overflow: hidden;
}

.floating-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
}
```

- **Card mostrado no screenshot:** "Schedule Meetings" — um mini calendário
- **Posição:** canto inferior direito do phone mockup
- **Rotação:** `5.81deg`

### 2.7 Comportamento Interativo

- Ao clicar em um tab diferente:
  - O tab antigo perde destaque (borda fica `#1C1C31`, bg fica transparente, título fica branco)
  - O novo tab ganha destaque (borda cyan, bg `#1C1C31`, título cyan)
  - A imagem do phone e o card flutuante **trocam** para refletir o tab selecionado
- Cada tab tem sua própria imagem de phone + card associados
- **Transição suave:** `opacity` + `transform` com `will-change: transform`

### 2.8 Animação de Entrada da Seção

```css
/* Toda a seção anima ao entrar no viewport */
.benefits-content {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.benefits-content.visible {
  opacity: 1;
  transform: none;
}
```

---

## 3. RESPONSIVIDADE

### Breakpoints observados

O código usa classes `hidden-1r35tq2` e `hidden-xcdyr1` para ocultar elementos em diferentes breakpoints, indicando pelo menos 3 variantes:

| Breakpoint | Comportamento |
|---|---|
| **Desktop** (>1024px) | Layout completo: 3 mockups na hero, tabs lado a lado com mockup |
| **Tablet** (~768-1024px) | Mockup central pode ser ocultado, tabs empilhados |
| **Mobile** (<768px) | Layout single-column, mockups empilhados ou apenas 1 |

### Hero - Mobile

- Título reduz via `clamp()`
- Botões empilham verticalmente
- Apenas 1 mockup central (os laterais são ocultados via `hidden-*`)

### Benefits - Mobile

- Tabs ficam full-width acima do mockup
- Mockup aparece abaixo dos tabs
- Layout muda de `flex-row` para `flex-column`

---

## 4. ASSETS NECESSÁRIOS

### Imagens

| Asset | Dimensões | Uso |
|---|---|---|
| Phone mockup esquerdo | 1582 × 2530 | Hero - mockup esquerdo |
| Phone mockup central | 806 × 1662 | Hero - mockup central (destaque) |
| Phone mockup direito | 2026 × 3241 | Hero - mockup direito |
| Phone mockup tab 1 | 2026 × 3241 | Benefits - "Stay on Track" |
| Card flutuante tab 1 | 1144 × 1282 | Benefits - card "Schedule Meetings" |
| App Store badge | 124 × 32 (SVG) | Botão CTA |
| Google Play badge | 128 × 31 (SVG) | Botão CTA |

### Ícones / SVGs

- Logo "Asis" (SVG)
- Badges das lojas (SVG)

---

## 5. RESUMO TÉCNICO PARA IMPLEMENTAÇÃO

### Stack sugerida

- **Framework:** React / Next.js / HTML puro
- **Animações:** Framer Motion (original usa Framer) ou CSS `IntersectionObserver`
- **3D Background:** Three.js r136 (canvas) — opcional, pode substituir por gradiente animado CSS
- **CSS:** Tailwind CSS ou CSS Modules

### Checklist de implementação

- [ ] Configurar tokens de cores como CSS variables
- [ ] Hero: container centralizado com max-width 1170px
- [ ] Hero: H1 + subtítulo + botões CTA centralizados
- [ ] Hero: 3 mockups com posicionamento relativo/absoluto, central elevado
- [ ] Hero: background animado ou gradiente
- [ ] Hero: sombra inferior para transição suave
- [ ] Benefits: badge com borda gradiente (truque do padding 1px)
- [ ] Benefits: H2 + subtítulo centralizados
- [ ] Benefits: grid 2 colunas (tabs esquerda, mockup direita)
- [ ] Benefits: 4 tabs com estado ativo/inativo
- [ ] Benefits: troca de imagem ao clicar no tab
- [ ] Benefits: círculo gradiente como fundo do mockup
- [ ] Benefits: card flutuante rotacionado sobre o mockup
- [ ] Animações de scroll (fade-in + translate)
- [ ] Responsividade (3 breakpoints)
