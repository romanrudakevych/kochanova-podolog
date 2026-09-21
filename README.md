# Podolog Kochanova

> Marketing and booking site for a podiatry clinic in Prague — a bilingual (CS/RU) React SPA with build-time SEO prerendering.

**Live site: [podolog-kochanova.cz](https://podolog-kochanova.cz/)**

<a href="https://podolog-kochanova.cz/"><img src="/docs/screenshot.png" alt="Homepage of podolog-kochanova.cz" /></a>

## Features

- [x] Landing page with hero, services, stats, about, certificates, and contact sections
- [x] 12 dedicated treatment pages (ingrown nails, warts, corns, nail fungus, nail braces, tamponade, occlusion, pedicures, …)
- [x] Online booking through an embedded [Noona](https://noona.app/) widget, with a dedicated success page
- [x] Czech / Russian localisation with automatic locale detection and a language switcher
- [x] Build-time SEO prerendering: per-route `<title>`, meta, Open Graph, canonical URLs and JSON-LD
- [x] Auto-generated `sitemap.xml`, `robots.txt`, and a real `404.html` (unknown URLs are not served a 200 homepage copy)
- [x] Static route folders (`/zarostly-nehet-praha/index.html`, …) so crawlers get full HTML without JavaScript
- [x] GDPR cookie consent banner with granular analytical / marketing categories
- [x] Google Analytics 4 with [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent) (defaults denied) and optional Meta Pixel, loaded only after opt-in
- [x] Legal pages: cookie policy and privacy policy
- [x] Accessibility: skip-to-content link, breadcrumbs, `<html lang>` synced with the active locale
- [x] Performance-tuned: responsive preloaded hero image, route-level code splitting, manual vendor chunks, and analytics kept off the critical path (see [Lighthouse](#lighthouse))
- [x] Unit tests for consent storage, tag injection, and SEO helpers (Vitest + Testing Library)

Podolog Kochanova uses the following technologies:

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) with [SWC](https://swc.rs/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- [React Router 6](https://reactrouter.com/)
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) icons, [Sonner](https://sonner.emilkowal.ski/) toasts
- A custom Vite plugin (`vite-plugin-seo.ts`) for prerendering, sitemap, robots, and gtag injection
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for testing

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (a `bun.lock` is also committed if you prefer [Bun](https://bun.sh/))

### `.env` File

Copy `.env.example` to `.env` and fill in the variables:

```bash
# Canonical site origin used in sitemap.xml, robots.txt and Open Graph URLs.
# Trailing slash is optional; the build strips it.
VITE_SITE_URL=https://podolog-kochanova.cz

# Optional. Baked into production HTML as gtag.js (Consent Mode defaults to denied).
# Hits are stored only after the visitor allows analytical cookies.
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional. Loaded only after the visitor allows marketing cookies.
VITE_META_PIXEL_ID=
```

- `VITE_SITE_URL` — required for correct canonical/OG URLs and a valid sitemap. Without it the build still succeeds, but absolute URLs are omitted.
- `VITE_GA_MEASUREMENT_ID` — GA4 measurement ID. Injected only in production builds.
- `VITE_META_PIXEL_ID` — Meta Pixel ID. The script is injected client-side, and only after marketing consent.

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

### Other Scripts

```bash
npm run build      # production build (prerender + sitemap + robots + gtag)
npm run build:dev  # build with development mode settings
npm run preview    # serve dist/ with prerendered routes and real 404s
npm run lint       # run ESLint
npm test           # run Vitest once
npm run test:watch # run Vitest in watch mode
```

## Lighthouse

![Lighthouse scores](/docs/lighthouse.png)

Measured with Lighthouse 12 against a production build served over gzip with realistic latency. Accessibility was out of scope for that run, so it is not reported here.

| Category       | Desktop | Mobile |
| -------------- | ------- | ------ |
| Performance    | 100     | 98     |
| Best Practices | 100     | 100    |
| SEO            | 100     | 100    |

Mobile Core Web Vitals: **FCP 1.0s · Speed Index 1.0s · LCP 2.3s · TBT 0ms · CLS 0**.

> Do not measure with `npm run preview` on localhost. `vite preview` serves uncompressed, and Lighthouse's default simulated (Lantern) throttling is pathologically pessimistic against a zero-latency loopback — it reported Performance ~84 with FCP 2.7s where the *observed* FCP was 60ms. Use `--throttling-method=devtools`, a gzipping server with a small artificial latency, or Google's PageSpeed Insights against the deployed site.

### Deployment

The build output in `dist/` is a plain static site: one folder per route with its own prerendered `index.html`, plus `sitemap.xml`, `robots.txt`, and `404.html`. It can be hosted on any static host. `public/_redirects` configures the Netlify-style fallback so unknown URLs return a real 404 instead of the homepage.

The production deployment is live at [https://podolog-kochanova.cz/](https://podolog-kochanova.cz/).

## Project Structure

```
src/
  pages/        one component per route (home, treatments, reservation, legal, 404)
  components/   page sections (hero, services, contact, …) and shared UI
    ui/         shadcn/ui primitives
  seo/          route table, head helpers, JSON-LD builders, site constants
  consent/      cookie-consent context, storage, and gated tracking scripts
  i18n/         i18next setup, locale detection, cs/ru message catalogues
  hooks/        small React hooks (mobile breakpoint, toast, count-up)
  lib/          utilities
  assets/       optimised WebP imagery
public/         favicon, hero images, robots source, _redirects
vite-plugin-seo.ts  prerendering, sitemap/robots generation, gtag injection
```

`src/seo/routes.ts` is the single source of truth for routes: it drives the router, the navigation labels, breadcrumbs, related-service links, JSON-LD, the prerenderer, and the sitemap. Add a route there first.

## License

No license file is currently included in this repository. Add a `LICENSE` file (e.g. MIT) if you intend to open-source this project.
