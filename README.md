# Juanda.dev Portfolio

Personal website and blog built with Next.js App Router and TypeScript.

The project is now fully static-content driven (local data files + MDX), with no app API routes or dashboard backend.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- MDX content via the Next.js MDX compiler
- Three.js / React Three Fiber for interactive visuals

## Features

- Landing page with interactive cards and visual components
- Blog index and static blog post pages from `src/content/posts`
- Static pages for now/setup/gaming/coffee/vault/privacy
- Open Graph and Twitter image routes
- JSON-LD structured data and sitemap/robots generation

## Project Structure

```text
src/
  app/                  # App Router routes, metadata, OG/Twitter images
  components/           # UI and page components
  content/              # MDX content (blog + now page)
  data/                 # Static data sources for sections/pages
  services/             # Server-side data wrappers around local content/data
  lib/                  # Utility helpers and SEO/OG helpers
  constants/            # App constants and SEO config
  types/                # Shared TypeScript types
public/                 # Static assets
```

## Getting Started

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the dev server:

   ```bash
   bun run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build production bundle
- `bun run start` - Start production server
- `bun run lint` - Run Next.js linting
- `bun run format` - Run Prettier formatting
