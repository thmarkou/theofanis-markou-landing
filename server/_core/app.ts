import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express, { type Express } from "express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerOAuthRoutes } from "./oauth";

/**
 * Vercel sometimes forwards rewritten `/api/*` traffic with a truncated `url`
 * while `originalUrl` still reflects the client path. Without this, routers
 * mounted on `/api/trpc` never run and the platform may return non-JSON.
 */
function headerPath(req: express.Request): string | undefined {
  const tryHeader = (name: string): string | undefined => {
    const v = req.headers[name];
    if (typeof v === "string" && v.includes("/api")) return v;
    const first = Array.isArray(v) ? v[0] : undefined;
    if (typeof first === "string" && first.includes("/api")) return first;
    return undefined;
  };
  return (
    tryHeader("x-invoke-path") ??
    tryHeader("x-vercel-invoke-path") ??
    tryHeader("x-forwarded-uri")
  );
}

/** Path + search suitable for Express `req.url` (leading slash). */
function toUrlPathAndSearch(raw: string): string {
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      const u = new URL(raw);
      return `${u.pathname}${u.search}`;
    }
    const u = new URL(raw, "http://localhost");
    return `${u.pathname}${u.search}`;
  } catch {
    return raw.startsWith("/") ? raw : `/${raw}`;
  }
}

function restoreStrippedApiPath(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  if (req.url.startsWith("/api/")) {
    next();
    return;
  }

  const orig = req.originalUrl;
  if (typeof orig === "string" && orig.startsWith("/api/")) {
    req.url = orig;
    next();
    return;
  }

  const fromHeader = headerPath(req);
  if (fromHeader) {
    const fixed = toUrlPathAndSearch(fromHeader);
    if (fixed.startsWith("/api")) {
      req.url = fixed;
    }
  }
  next();
}

/**
 * Builds the stateless Express application that exposes the OAuth callback
 * and the tRPC API.
 *
 * This factory is intentionally side-effect free and free of any concerns
 * that belong to a specific runtime (Vite HMR, static file serving, port
 * binding, process.listen). That separation lets the same app be reused by:
 *
 *   - the local dev server (`server/_core/index.ts`), which layers Vite
 *     middleware + HTTP listen on top.
 *   - the Vercel serverless entry (`api/index.ts`) uses the Web `fetch` API;
 *     local dev still uses this Express app via `server/_core/index.ts`.
 *
 * Keeping initialization cheap + synchronous is important for serverless
 * cold starts: the app is built once per warmed instance and then reused
 * across subsequent invocations.
 */
export function createApiApp(): Express {
  const app = express();

  app.use(restoreStrippedApiPath);

  // 1MB is generous for the contact form + any tRPC payloads we currently
  // accept. Raising this limit globally invites abuse, so uploads should
  // be gated with route-specific multipart handling if ever reintroduced.
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );

  return app;
}
