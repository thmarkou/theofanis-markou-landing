# Deployment — Vercel

This app is deployed as a **Vite static site + a single Express serverless function** on Vercel. The frontend is served from the CDN; `/api/*` is rewritten to `/api` and handled by `api/index.ts` (Express restores the real path for tRPC).

## Project structure touching deploy

| Path                   | Role on Vercel                                                 |
| ---------------------- | -------------------------------------------------------------- |
| `client/`              | Vite root. Built to `dist/public/`, served by the CDN.         |
| `api/index.ts`         | Serverless function entry — exports the Express app directly.  |
| `server/_core/app.ts`  | Factory that builds the Express app (tRPC + OAuth, no listen). |
| `server/_core/index.ts`| Local dev entry. **Not invoked on Vercel.**                    |
| `vercel.json`          | Build command, output dir, SPA rewrites, CDN cache headers.    |

## First-time setup

1. Push the repo to GitHub.
2. On https://vercel.com → **Add New Project** → import the repo.
3. Leave framework preset as **Other** (our `vercel.json` controls the build).
4. Set environment variables (see below), then **Deploy**.
5. Vercel assigns a free subdomain (this project uses `https://theofanis-markou.vercel.app/` as the canonical URL in `client/index.html`; update that file when you add a custom domain).

## Environment variables (Vercel → Project → Settings → Environment Variables)

Required in **Production** and **Preview**:

| Variable             | Notes                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| `JWT_SECRET`         | 32+ char random string. Rotate yearly.                                |
| `DATABASE_URL`       | MySQL connection string. Provider must accept TCP from Vercel IPs.    |

Optional (if enabling OAuth / analytics):

| Variable                      | Notes                                                 |
| ----------------------------- | ----------------------------------------------------- |
| `VITE_APP_ID`                 | Manus app id. Client-side, prefixed `VITE_`.          |
| `VITE_OAUTH_PORTAL_URL`       | OAuth portal URL. Client-side.                        |
| `OAUTH_SERVER_URL`            | OAuth server base URL. Server-side.                   |
| `BUILT_IN_FORGE_API_URL`      | Used by `notifyOwner`.                                |
| `BUILT_IN_FORGE_API_KEY`      | Used by `notifyOwner`.                                |
| `OWNER_OPEN_ID`               | Target recipient for contact notifications.           |
| `VITE_ANALYTICS_ENDPOINT`     | Umami endpoint. Injected at runtime from `main.tsx`.  |
| `VITE_ANALYTICS_WEBSITE_ID`   | Umami website id.                                     |
| `NEXT_PUBLIC_GA_ID`           | **Google Analytics 4** measurement ID (`G-XXXXXXXXXX`). Preferred name; enables `gtag.js` in `client/src/lib/gtag.ts` + SPA page views in `GoogleAnalyticsTracker.tsx`. Redeploy after setting. |
| `VITE_GA_MEASUREMENT_ID`      | Legacy alias for GA4 ID if `NEXT_PUBLIC_GA_ID` is unset. |

`NODE_ENV` is managed by Vercel — do not set it manually.

### Google Analytics 4 (traffic like the GA dashboard)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) (or use an existing one).
2. **Admin → Data streams → Web** → add stream URL `https://theofanis-markou.vercel.app` → copy the **Measurement ID** (`G-…`).
3. In Vercel → Environment Variables → add `NEXT_PUBLIC_GA_ID` = that ID (Production + Preview if you want). (`VITE_GA_MEASUREMENT_ID` still works as a fallback.)
4. **Redeploy** — Vite bakes `VITE_*` into the client bundle at build time.
5. In GA4 → **Reports → Realtime** you should see hits within a few minutes.

You can use **Umami** and **GA4** together; leave either unset if you do not need it.

### Cloudflare Web Analytics

That product expects traffic through **Cloudflare** (or their standalone beacon). This project is hosted on **Vercel**; for a GA-like dashboard here, **GA4** (above) or **Vercel Analytics** in the Vercel dashboard are the straightforward options.

## Database note

`mysql2` opens raw TCP connections and **requires a MySQL host reachable from Vercel's function runtime**. Any of these work:

- PlanetScale with `?ssl={"rejectUnauthorized":true}` in `DATABASE_URL`.
- A managed MySQL (DigitalOcean, AWS RDS, Railway) with a public endpoint + TLS.

Free/hobby databases inside private VPCs will not work unless fronted by Vercel Postgres / Hyperdrive equivalents.

## SEO checklist (after deploy)

1. **Google Search Console** — Add property for `https://theofanis-markou.vercel.app`, verify, submit `sitemap.xml` (`https://theofanis-markou.vercel.app/sitemap.xml`).
2. **Bing Webmaster Tools** — Optional: same sitemap URL.
3. **Custom domain** — When you connect one, update `client/index.html` (canonical, `hreflang`, JSON-LD `@id`/`url`/`image`), `client/public/robots.txt`, `sitemap.xml`, `client/src/lib/site.ts` (`SITE_ORIGIN`), and `llm*.txt` in one pass.

Static files served from `client/public/`: `robots.txt`, `sitemap.xml`, `og-image.png`, `llm.txt`, `llm-full.txt`.

## Build settings (already encoded in `vercel.json`)

- **Build command**: `pnpm build` → runs `vite build` only.
- **Output directory**: `dist/public`.
- **Install command**: `pnpm install --frozen-lockfile`.
- **API rewrite**: `/api/*` → `/api` so one function serves tRPC + OAuth; Express middleware restores the path.
- **SPA fallback**: every non-`/api/*` request that doesn't match a static file is rewritten to `/index.html`.
- **Cache headers**: `/assets/*` → 1 year immutable; `/favicon.svg` → 1 day.

## Local verification before pushing

```bash
pnpm check          # TypeScript
pnpm test           # Vitest
pnpm build          # Produces dist/public/
pnpm analyze        # Opens dist/bundle-stats.html for inspection
```

To run the serverless function locally exactly as Vercel will:

```bash
pnpm dlx vercel dev
```
