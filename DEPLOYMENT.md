# Deployment — Vercel

This app is deployed as a **Vite static site + a single Express serverless function** on Vercel. The frontend is served from the CDN; `/api/*` hits the Node.js function in `api/index.ts`.

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
5. Vercel assigns a free subdomain, e.g. `theofanis-markou-landing.vercel.app`.

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

`NODE_ENV` is managed by Vercel — do not set it manually.

## Database note

`mysql2` opens raw TCP connections and **requires a MySQL host reachable from Vercel's function runtime**. Any of these work:

- PlanetScale with `?ssl={"rejectUnauthorized":true}` in `DATABASE_URL`.
- A managed MySQL (DigitalOcean, AWS RDS, Railway) with a public endpoint + TLS.

Free/hobby databases inside private VPCs will not work unless fronted by Vercel Postgres / Hyperdrive equivalents.

## Build settings (already encoded in `vercel.json`)

- **Build command**: `pnpm build` → runs `vite build` only.
- **Output directory**: `dist/public`.
- **Install command**: `pnpm install --frozen-lockfile`.
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
