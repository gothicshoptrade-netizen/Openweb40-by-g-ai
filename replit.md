# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Интернет для загородной жизни (internet-landing)
- **Path**: `artifacts/internet-landing/`
- **Preview path**: `/`
- **Type**: react-vite (SPA frontend)
- **Description**: High-converting Russian-language landing page for "Openweb40.ru" — rural internet provider in Kaluga region
- **Tech**: React + Vite, Tailwind CSS, Framer Motion, Shadcn/ui, Lucide React, Wouter routing
- **Brand**: "Openweb40.ru", phone: +7 (910) 595-46-68, Telegram: @krisdev13, email: info@openweb40.ru
- **Location**: Калуга и Калужская область
- **AI chat widget**: Real AI assistant via `/api/chat` (SSE streaming, Qwen/Gemma free models via OpenRouter)
- **Vite proxy**: `/api` → `localhost:8080` (api-server) for dev; production uses Replit path routing

### Design System
- **Theme**: Deep purple-navy dark theme
  - Background: #08091A (hsl(237,60%,7%))
  - Primary blue: #3B82F6
  - Accent purple: #8B5CF6
  - Green: #10B981
- **Font**: Inter (Google Fonts, 300-900 weights)
- **Card style**: Glass morphism (`.glass-card`, `.bento-card`) — semi-transparent bg, backdrop blur, purple gradient borders
- **Layout**: Bento grid — sections arranged in CSS grid cards with varying column spans
- **Glow effects**: Purple/blue ambient blur glows, neon badges (`.neon-badge`), gradient text (`.gradient-text`, `.gradient-text-purple`)
- **Hero background**: AI-generated countryside house photo with northern lights (public/hero-bg.png)

### Pages
- `/` — Main landing page (LandingPage.tsx) with bento grid layout
- `/services` — Full services page with 6 service cards
- `/portfolio` — Portfolio with filterable project grid (all/dacha/cottage/village)
- `/blog` — Blog with search and tag filtering, 6 articles
- `/contacts` — Contacts page with form and interactive map visualization

### Landing Page Bento Grid (in order)
1. **Hero** — Full-width photo background (countryside house + aurora), gradient text, stats counter, 2 CTA buttons
2. **Row 1**: Problems (7 cols) + How We Work (5 cols) — side by side bento cards
3. **Row 2**: Solutions — full-width bento card with 3 pricing cards + comparison table toggle
4. **Row 3**: Calculator (5 cols) + Testimonials (7 cols) — side by side bento cards
5. **Row 4**: Blog — full-width bento card with 3 article previews
6. **Row 5**: FAQ (6 cols) + Contact Form (6 cols) — side by side bento cards
7. **Footer** — Full navigation, contacts, socials

### CSS Utilities (index.css)
- `.glass-card` / `.glass-card-blue` / `.glass-card-green` — glass morphism card styles
- `.bento-card` — bento grid card with gradient border, glow, hover effect
- `.neon-badge` / `.neon-badge-blue` — neon pill badge styles
- `.gradient-text` / `.gradient-text-purple` — animated gradient text
- `.text-glow` / `.text-glow-accent` — text shadow glow
- `.box-glow` / `.box-glow-accent` / `.box-glow-green` — box shadow glow
- `.border-glow-purple` / `.border-glow-blue` — border glow effects
- `.bg-grid-white` — subtle grid background pattern
- `.section-py` — section spacing utility

### SEO & PWA
- `index.html` — Full Russian SEO meta tags, Open Graph, Twitter Cards
- JSON-LD structured data: LocalBusiness, FAQPage, OfferCatalog schemas
- `public/manifest.json` — PWA manifest with theme color, icons, categories

### Components
- `src/components/sections/` — All 9 section components
- `src/components/shared/Header.tsx` — Sticky glass-morphism header with mobile menu, smart nav
- `src/components/shared/Footer.tsx` — Full footer with page navigation and social links
- `src/pages/` — LandingPage + 4 additional pages + not-found
