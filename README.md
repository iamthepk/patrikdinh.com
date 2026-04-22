# Patrik Dinh Portfolio

Personal portfolio website built with Next.js, focused on real-world internal systems, automation, practical software, and case-study-driven presentation.

This repository contains the portfolio site itself, not the source code of the featured products. Some showcased systems are private internal tools, production systems, or business assets, so the portfolio presents them through write-ups, screenshots, interactive previews, and technical summaries instead of public repositories.

## What This Site Includes

- Dark / light theme support
- Fullscreen splash intro
- Editorial-style hero section and project storytelling
- Shared accessible modal layer for case studies, previews, and CV
- Interactive CV modal with code-based CV content
- `/cv` full-page fallback route for the same CV content
- `/cv/print` print-friendly CV route
- Theme-aware thumbnails and favicons
- Custom animated thumbnail for Print Agent
- Vercel Analytics and Speed Insights in production only

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
- Custom CSS files for layout and visual styling
- Framer Motion
- Lucide React
- React Icons
- Vercel Analytics
- Vercel Speed Insights
- Vitest + Testing Library

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
```

## Project Structure

```text
app/
├── components/
│   ├── Hero.tsx                    # Intro section, nav links, CV modal trigger
│   ├── Projects.tsx                # Project list, thumbnails, modals
│   ├── About.tsx                   # Positioning text and personal context
│   ├── CVContent.tsx               # Shared CV content for modal and /cv page
│   ├── Footer.tsx                  # Contact section
│   ├── PrintAgentFlowAnimation.tsx # Custom animated project preview
│   ├── Modal.tsx                   # Shared accessible modal component
│   ├── RichText.tsx                # Structured rich text renderer for project content
│   ├── SplashScreen.tsx            # Intro animation
│   ├── SplashWrapper.tsx           # Splash lifecycle wrapper
│   └── print-agent-flow/           # Print Agent preview config, loop hook and modal
├── cv/
│   ├── page.tsx                    # Full-page CV route
│   └── print/                      # Print-friendly CV route
├── lib/
│   ├── cv-data.ts                  # Structured CV data source
│   ├── projects.ts                 # Project data and case studies
│   ├── rich-text.ts                # Structured inline text helpers
│   ├── tech-icons.tsx              # Icon mapping for homepage tech stack
│   ├── theme.ts                    # Theme utilities and favicon sync
│   └── theme-provider.tsx          # Theme state and persistence
├── globals.css                     # Global tokens and shared styles
├── layout.tsx                      # Root layout, metadata, analytics
└── page.tsx                        # Home page composition

public/
├── favicon-dark.svg
├── favicon-light.svg
└── thumbnails/                     # Project thumbnails and preview assets

tests/                              # Homepage smoke and interaction tests
```

## Content Editing

### Project Data

Edit `app/lib/projects.ts` to update:

- project titles and subtitles
- descriptions and key points
- tech labels
- live URLs
- optional GitHub URLs
- case study content

### CV Content

The CV is now maintained in code.

- `app/lib/cv-data.ts` = CV data source
- `app/components/CVContent.tsx` = shared CV layout
- `app/cv/page.tsx` = full-page CV route
- `app/cv/print/page.tsx` = print-friendly CV route

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

1. An explicit default thumbnail path in `app/lib/projects.ts`
2. Optional explicit `dark` and `light` thumbnail variants in the same project data

If a theme-specific variant is not provided, the UI falls back to the project's default thumbnail.

The Print Agent project is a special case: it uses a custom animated preview instead of a static thumbnail.

## Theme Behavior

The portfolio stores theme preference locally and applies it before hydration to reduce visual flashing. Theme state is also used for:

- favicon switching
- theme-aware project previews

## Analytics Behavior

Vercel Analytics and Speed Insights are both loaded only in production builds.

## Testing

The repository includes a small regression safety net with Vitest and Testing Library:

- homepage smoke coverage
- theme toggle interaction coverage
- modal open / close behavior coverage

## Build

```bash
npm run build
```

Deploying on Vercel is the intended setup.
