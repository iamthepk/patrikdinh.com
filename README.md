# Patrik Dinh Portfolio

Personal portfolio website for showcasing selected full-stack and AI projects through focused case studies, interactive previews, and concise product storytelling.

This repository contains the portfolio site itself, not the source code of the featured products. Some showcased systems are private internal tools, production systems, or client/business assets, so the portfolio presents them through write-ups, screenshots, live demos where possible, and technical summaries instead of public repositories.

## What This Site Includes

- Monochrome visual direction with dark/light theme support
- Fullscreen splash intro
- Editorial-style hero section and project storytelling
- Animated project blocks with responsive layouts
- Case study modal for each featured project
- Custom animated thumbnail for the Print Agent project
- Theme-aware thumbnails and favicons
- Vercel Analytics and geo-gated Speed Insights loading

## Featured Project Policy

The products presented on the site are real projects, but their source code is not automatically public.

- Internal business systems stay private
- Client or operational tooling stays private
- Live demos are linked only where sharing is safe
- GitHub links are shown only for projects that are intentionally public

If you are reviewing the portfolio, the main signal is the quality of the case studies and the scope of the shipped work, not the number of open-source repositories.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Custom CSS modules/files for layout and visual styling
- Framer Motion
- Lucide React
- React Icons
- Vercel Analytics
- Vercel Speed Insights

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
app/
├── components/
│   ├── Hero.tsx                    # Intro section and theme toggle
│   ├── Projects.tsx                # Project list, thumbnails, modals
│   ├── About.tsx                   # Positioning text and tech stack
│   ├── Footer.tsx                  # Contact section
│   ├── PrintAgentFlowAnimation.tsx # Custom animated project preview
│   ├── SplashScreen.tsx            # Intro animation
│   └── SplashWrapper.tsx           # Splash lifecycle wrapper
├── lib/
│   ├── projects.ts                 # Project data and case studies
│   ├── tech-icons.tsx              # Icon mapping for tech badges
│   └── theme-provider.tsx          # Theme state and persistence
├── globals.css                     # Global tokens and shared styles
├── layout.tsx                      # Root layout, metadata, analytics
└── page.tsx                        # Home page composition

middleware.ts                       # EU detection cookie for insights loading
public/
└── thumbnails/                     # Project thumbnails and preview assets
```

## Content Editing

### Project Data

Edit [app/lib/projects.ts](app/lib/projects.ts) to update:

- project titles and subtitles
- descriptions and key points
- tech labels
- live URLs
- optional GitHub URLs
- case study content

### Page Copy

Edit these files for top-level site copy:

- `app/components/Hero.tsx`
- `app/components/About.tsx`
- `app/components/Footer.tsx`

### Visual Styling

Shared theme tokens and spacing live in:

- `app/globals.css`
- `app/components/Hero.css`
- `app/components/Projects.css`

## Thumbnails and Assets

Project thumbnails live in `public/thumbnails/`.

The project preview logic supports two modes:

1. A base thumbnail such as `project-name.webp`
2. Theme-specific thumbnails such as `project-name-dark.webp` and `project-name-light.webp`

If theme-specific files exist, the UI will use them automatically. If not, it falls back to the base file.

The Print Agent project is a special case: it uses a custom animated preview instead of a static thumbnail.

## Theme Behavior

The portfolio stores theme preference locally and applies it before hydration to reduce visual flashing. Theme state is also used for:

- favicon switching
- theme-aware project previews
- outbound preview synchronization for linked live demos

## Analytics Behavior

Vercel Analytics loads globally.

Speed Insights is loaded conditionally based on the `si_eu` cookie set by `middleware.ts`, which uses Vercel geo headers to decide whether the visitor is from an EU/EEA-related country list used in this project.

## Build

```bash
npm run build
```

Deploying on Vercel is the intended setup.
