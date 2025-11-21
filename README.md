# Portfolio — Editorial Minimalism

Pure text-first design. Massive typography. Zero noise.

## Design Philosophy

**Editorial minimalism:**
- Text as the only design element
- Massive whitespace creates hierarchy
- Pure black and white
- Zero decorative elements
- Content is king

## Features

- 🖤 Monochrome design (dark/light)
- 📝 Text-first approach
- 📐 Responsive typography (clamp)
- ⚡ Zero animations (except hover)
- 🎯 Brutally simple

## Typography Scale

```
Hero:     3rem - 9rem   (48px - 144px)
Section:  2.5rem - 6rem (40px - 96px)
Project:  2.25rem - 4.5rem (36px - 72px)
Body:     1.25rem - 1.875rem (20px - 30px)
```

## Layout Spacing

```
Sections:    128-192px apart
Components:  64-80px apart
Elements:    32-64px apart
```

## Tech Stack

- Next.js 16
- TypeScript
- TailwindCSS
- Inter Variable font

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
app/
├── components/
│   ├── Hero.tsx       # Fullscreen intro
│   ├── Projects.tsx   # Project list
│   ├── About.tsx      # Text blocks
│   ├── TechStack.tsx  # Three columns
│   └── Contact.tsx    # Large links
├── lib/
│   ├── theme-provider.tsx
│   └── projects.ts
└── page.tsx
```

## Customize

### Colors (globals.css)

```css
:root {
  --bg: #ffffff;
  --text: #000000;
  --text-muted: #737373;
}

:root.dark {
  --bg: #000000;
  --text: #ffffff;
  --text-muted: #a3a3a3;
}
```

### Projects (lib/projects.ts)

Edit the `projects` array with your work.

### Screenshots

Add project screenshots to `public/screenshots/`:
- Screenshot: `{project-id}.jpg` (9:16 portrait aspect ratio, displayed on the left side of project)

Screenshots are displayed with low-contrast styling (opacity + grayscale) to maintain minimal aesthetic while providing proof of work.

### Content

All text is directly in components - simple to edit.

## Build

```bash
npm run build
```

Deploy to Vercel for best results.

---

## Design Rules

1. Text is design
2. Whitespace is content
3. Bigger is clearer
4. Less is more
5. Remove if unsure

---

Editorial minimalism. Text-first. Zero bullshit.
