# Design System — Portfolio

Kompletní dokumentace design systému pro portfolio aplikaci. Použijte tyto styly pro konzistentní vzhled napříč všemi demo aplikacemi.

---

## Design Filozofie

**Editorial minimalism:**
- Text jako jediný design element
- Masivní whitespace vytváří hierarchii
- Čistá černá a bílá
- Žádné dekorativní prvky
- Obsah je král

**Zásady:**
1. Text je design
2. Whitespace je obsah
3. Větší = jasnější
4. Méně je více
5. Odstraň, pokud si nejsi jistý

---

## Typografie

### Font

**Inter** (Google Fonts)
- Variable font s váhami: 300, 400, 500, 700, 900
- Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Display: `swap`

**CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');

font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

**Nastavení:**
- `line-height`: 1.4 (default), 0.95 (headings), 1.2-1.5 (text blocks)
- `font-weight`: 400 (normal), 500 (medium), 700 (bold), 900 (black)
- `letter-spacing`: `-0.07em` (velké headings), `tight` (standard headings), `normal` (text)
- `-webkit-font-smoothing`: antialiased
- `-moz-osx-font-smoothing`: grayscale

### Typografická škála

#### Hero / Hlavní nadpis
```css
font-size: clamp(2.5rem, 10vw, 7rem);  /* 40px - 112px */
font-weight: 900;
line-height: 0.95;
letter-spacing: -0.07em;
```

#### Sekční nadpisy (H2)
```css
font-size: clamp(2.5rem, 8vw, 6rem);  /* 40px - 96px */
/* Tailwind: text-5xl md:text-6xl */
font-weight: 900;
line-height: 0.95;
letter-spacing: tight;
```

#### Projektové nadpisy (H3)
```css
font-size: clamp(2.25rem, 6vw, 6rem);  /* 36px - 96px */
/* Tailwind: text-4xl md:text-5xl lg:text-6xl */
font-weight: 700;
line-height: 0.95;
letter-spacing: tight;
```

#### Velký text / Subtitle
```css
font-size: clamp(1.25rem, 4vw, 2rem);  /* 20px - 32px */
/* Tailwind: text-xl md:text-2xl */
font-weight: 400;
line-height: 1.5;
```

#### Tělo textu / Popisky
```css
font-size: clamp(0.875rem, 2vw, 1rem);  /* 14px - 16px */
/* Tailwind: text-sm md:text-base */
font-weight: 400;
line-height: 1.5;
font-style: italic; /* pro popisky projektů */
```

#### Odkazy / Navigace
```css
font-size: clamp(1rem, 2vw, 1.25rem);  /* 16px - 20px */
/* Tailwind: text-xl */
font-weight: 500;
```

---

## Barvy

### CSS Proměnné

```css
:root {
  --bg: #ffffff;
  --text: #000000;
  --text-muted: #525252;
}

:root.dark {
  --bg: #000000;
  --text: #ffffff;
  --text-muted: #a3a3a3;
}
```

### Použití

- **Background**: `var(--bg)`
- **Hlavní text**: `var(--text)`
- **Vedlejší text** (muted): `var(--text-muted)`
- **Selection**: `background: var(--text); color: var(--bg);`

### Hex hodnoty

**Light mode:**
- Background: `#ffffff`
- Text: `#000000`
- Text muted: `#525252`

**Dark mode:**
- Background: `#000000`
- Text: `#ffffff`
- Text muted: `#a3a3a3`

---

## Spacing

### Padding sekcí

**Mobile (< 768px):**
```css
padding-left: 24px;
padding-right: 24px;
padding-top: 1.5rem;  /* 24px */
padding-bottom: 1.5rem;  /* 24px */
```

**Desktop (≥ 768px):**
```css
padding-left: 140px;
padding-right: 64px;
padding-top: 2rem;  /* 32px */
padding-bottom: 2rem;  /* 32px */
```

### Margin mezi sekcemi

```css
margin-top: 4rem;  /* 64px mezi projekty */
margin-bottom: 2rem;  /* 32px pod nadpisy */
```

### Gaps

```css
gap: 0.5rem;  /* 8px - malé mezery */
gap: 1rem;    /* 16px - standardní mezery */
gap: 1.5rem;  /* 24px - větší mezery */
gap: 2rem;    /* 32px - velké mezery */
gap: 3rem;    /* 48px - extra velké mezery */
gap: 4rem;    /* 64px - mezi projekty */
gap: 6rem;    /* 96px - mezi sekcemi */
gap: 8rem;    /* 128px - hero spacing */
```

### Max-width kontejnerů

```css
max-width: 80rem;  /* 1280px - 5xl */
```

---

## Komponenty

### Sekce

```css
.section-padding {
  padding-left: 24px;
  padding-right: 24px;
}

@media (min-width: 768px) {
  .section-padding {
    padding-left: 140px;
    padding-right: 64px;
  }
}

.section-spacing {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

@media (max-width: 767px) {
  .section-spacing {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}
```

### Nadpisy

```css
.heading-spacing {
  margin-top: 0;
  margin-bottom: 2rem;
}

@media (max-width: 767px) {
  .heading-spacing {
    margin-bottom: 1.5rem;
  }
}
```

### Projekty

```css
.project-spacing > * + * {
  margin-top: 4rem;
}

/* Projektový kontejner */
.project-container {
  padding-bottom: 3rem;
  border-bottom: 1px solid;
  border-color: var(--text);
  opacity: 0.1;
}
```

### Odkazy

**Základní styl:**
```css
a {
  color: inherit;
  text-decoration: none;
  transition: opacity 150ms;
}

a:hover {
  opacity: 0.5;
}
```

**Odkazy s ikonami (View/Code):**
```css
.link-with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text);
  transition: opacity 150ms;
  text-decoration: none;
  text-underline-offset: 4px;
}

.link-with-icon:hover {
  opacity: 0.7;
  text-decoration: underline;
}

.link-with-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 150ms;
}

/* View link - ikona se posune */
.link-with-icon:hover svg.external {
  transform: translate(2px, -2px);
}

/* Code link - ikona se zvětší */
.link-with-icon:hover svg.github {
  transform: scale(1.1);
}
```

### Tlačítka

```css
button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 150ms;
}

button:hover {
  opacity: 0.5;
}
```

### Tech ikony

```css
.tech-icon {
  width: 1.5rem;  /* 24px */
  height: 1.5rem;
  color: var(--text);
  cursor: pointer;
}

@media (min-width: 768px) {
  .tech-icon {
    width: 1.75rem;  /* 28px */
    height: 1.75rem;
  }
}

/* Tooltip na hover */
.tech-icon-container {
  position: relative;
}

.tech-icon-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
  z-index: 10;
}

.tech-icon-container:hover .tech-icon-tooltip {
  opacity: 1;
}
```

---

## Hover efekty a Transitions

### Základní hover

```css
/* Opacity hover */
.hover-opacity {
  transition: opacity 150ms;
}

.hover-opacity:hover {
  opacity: 0.5;  /* nebo 0.7 pro jemnější efekt */
}
```

### Transitions

```css
/* Standardní transition */
transition: opacity 150ms;
transition: transform 150ms;
transition: background-color 150ms, color 150ms;

/* Smooth scroll */
scroll-behavior: smooth;
```

---

## Scrollbar

### Webkit (Chrome, Safari, Edge)

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--text);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  opacity: 0.8;
}
```

### Firefox

```css
* {
  scrollbar-width: thin;
  scrollbar-color: var(--text) transparent;
}
```

---

## Selection

```css
::selection {
  background-color: var(--text);
  color: var(--bg);
}
```

---

## Responsive Breakpointy

```css
/* Mobile first */
/* Default: < 768px */

/* Tablet a výš */
@media (min-width: 768px) {
  /* md: */
}

/* Desktop */
@media (min-width: 1024px) {
  /* lg: */
}
```

---

## Kompletní CSS Template

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
@import "tailwindcss";

:root {
  --bg: #ffffff;
  --text: #000000;
  --text-muted: #525252;
}

:root.dark {
  --bg: #000000;
  --text: #ffffff;
  --text-muted: #a3a3a3;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow-x: hidden;
  transition: background-color 150ms, color 150ms;
  line-height: 1.4;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--text);
  color: var(--bg);
}

a {
  color: inherit;
  text-decoration: none;
  transition: opacity 150ms;
}

a:hover {
  opacity: 0.5;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 150ms;
}

button:hover {
  opacity: 0.5;
}

.section-padding {
  padding-left: 24px;
  padding-right: 24px;
}

@media (min-width: 768px) {
  .section-padding {
    padding-left: 140px;
    padding-right: 64px;
  }
}

.section-spacing {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

@media (max-width: 767px) {
  .section-spacing {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

.heading-spacing {
  margin-top: 0;
  margin-bottom: 2rem;
}

@media (max-width: 767px) {
  .heading-spacing {
    margin-bottom: 1.5rem;
  }
}

.project-spacing > * + * {
  margin-top: 4rem;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--text);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  opacity: 0.8;
}

* {
  scrollbar-width: thin;
  scrollbar-color: var(--text) transparent;
}
```

---

## Tailwind Utility Classes

Pokud používáte Tailwind, použijte tyto třídy:

### Typografie

```html
<!-- Hero -->
<h1 class="text-[clamp(2.5rem,10vw,7rem)] font-black leading-[0.95] tracking-tight">

<!-- Sekční nadpis -->
<h2 class="text-5xl md:text-6xl font-black tracking-tight">

<!-- Projektový nadpis -->
<h3 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">

<!-- Subtitle -->
<p class="text-xl md:text-2xl font-normal leading-[1.5]">

<!-- Popisek -->
<p class="text-sm md:text-base font-normal italic leading-[1.5]">

<!-- Odkaz -->
<a class="text-xl font-medium">
```

### Spacing

```html
<!-- Sekce -->
<section class="section-padding section-spacing">

<!-- Nadpis -->
<h2 class="heading-spacing">

<!-- Projekty -->
<div class="project-spacing">

<!-- Gaps -->
<div class="flex gap-4">  <!-- 16px -->
<div class="flex gap-8">  <!-- 32px -->
```

### Barvy

```html
<div style="color: var(--text)">
<div style="color: var(--text-muted)">
<div style="background: var(--bg)">
```

---

## Příklad použití v React/Next.js

```tsx
// globals.css
import './globals.css';

// layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

// Komponenta
export default function ProjectCard() {
  return (
    <section className="section-padding section-spacing">
      <div className="max-w-5xl">
        <h2
          className="text-5xl md:text-6xl font-black tracking-tight heading-spacing"
          style={{ color: 'var(--text)' }}
        >
          Work
        </h2>
        
        <div className="project-spacing">
          <div
            className="pb-12 border-b border-opacity-10"
            style={{
              borderColor: 'var(--text)',
              paddingBottom: '3rem',
            }}
          >
            <h3
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ color: 'var(--text)', marginBottom: '1.5rem' }}
            >
              Project Title
            </h3>
            
            <p
              className="text-xl md:text-2xl font-normal leading-[1.5] max-w-3xl"
              style={{ color: 'var(--text)', marginBottom: '1.5rem' }}
            >
              Project subtitle
            </p>
            
            <div
              className="text-sm md:text-base font-normal italic leading-[1.5] max-w-3xl"
              style={{ color: 'var(--text)', marginBottom: '2rem' }}
            >
              Project description
            </div>
            
            <div className="flex gap-8 text-xl font-medium">
              <a
                href="#"
                className="group flex items-center gap-2 transition-opacity hover:opacity-70 underline-offset-4 hover:underline"
                style={{ color: 'var(--text)' }}
              >
                <span>View</span>
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Kontrolní seznam pro implementaci

- [ ] Inter font nainstalován a načten
- [ ] CSS proměnné pro barvy nastaveny
- [ ] Dark mode podpora (pokud je potřeba)
- [ ] Section padding a spacing třídy
- [ ] Typografická škála implementována
- [ ] Hover efekty na odkazech
- [ ] Scrollbar styling
- [ ] Selection styling
- [ ] Responsive breakpointy
- [ ] Max-width kontejnery (max-w-5xl)

---

**Poznámka:** Tento design system je minimalistický a text-first. Držte se těchto pravidel pro konzistentní vzhled napříč všemi aplikacemi.

