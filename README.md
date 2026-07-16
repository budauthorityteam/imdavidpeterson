# imdavidpeterson.com

Personal hub for David Peterson — operator, builder, founder of BudAuthority, podcast host, and selective advisor. Single-page React app (Vite + React 19 + Tailwind 4).

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — TypeScript typecheck (`tsc --noEmit`)

## Editing content

- **Identity & links** (email, social profiles, agency, real-estate link) live in one place: `PROFILE` in [`src/data.ts`](src/data.ts). Replace the `-placeholder` URLs with the real ones.
- **Track record, timeline, services, media** — the rest of `src/data.ts` and the per-view components in `src/components/`.
- **SEO metadata** — static `<title>`, meta description, Open Graph/Twitter tags, and JSON-LD structured data live in [`index.html`](index.html). Per-view titles/descriptions are synced at runtime in `src/App.tsx`.

## SEO assets

Served from `public/` at the site root:

- `robots.txt` — allows all crawlers incl. AI/answer engines; points to the sitemap
- `sitemap.xml`
- `site.webmanifest`, `favicon.svg`, `favicon-96.png`, `apple-touch-icon.png`
- `og-image.png` — 1200×630 social share card

> **Before launch:** confirm the canonical domain (`https://imdavidpeterson.com`) in `index.html`, `sitemap.xml`, `robots.txt`, and `PROFILE.siteUrl`. If it changes, update all four.
