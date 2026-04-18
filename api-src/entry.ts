import "dotenv/config";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createFetchContext } from "../server/_core/context";
import { handleOAuthCallbackRequest } from "../server/_core/oauth";
import { appRouter } from "../server/routers";

/**
 * tRPC only enables `allowMethodOverride` when `req.method === "POST"` (strict).
 * Some runtimes pass lowercase verbs, which disables override and yields 405 on queries.
 */
function withUppercaseMethod(request: Request): Request {
  const upper = request.method.toUpperCase();
  if (upper === request.method) {
    return request;
  }

  const init: RequestInit = {
    method: upper,
    headers: request.headers,
    signal: request.signal,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    integrity: request.integrity,
    keepalive: request.keepalive,
    cache: request.cache,
    credentials: request.credentials,
    mode: request.mode,
  };

  if (upper !== "GET" && upper !== "HEAD") {
    init.body = request.body;
    // Required when cloning a streaming body in Node's fetch (undici).
    Object.assign(init, { duplex: "half" as const });
  }

  return new Request(request.url, init);
}

/**
 * Rewrite destination `/api/index.js` may appear as the pathname; map to `/api`
 * so `normalizeCollapsingApiUrl` / `rewriteBareApiPath` can run.
 */
function normalizeFunctionEntryPathname(request: Request): Request {
  const url = new URL(request.url);
  const p = url.pathname.replace(/\/$/, "") || "/";
  if (p !== "/api/index.js" && !p.endsWith("/api/index.js")) {
    return request;
  }
  const next = new URL(request.url);
  next.pathname = "/api";
  return new Request(next.toString(), request);
}

/**
 * After a same-app rewrite to `/api`, the `Request` URL can be collapsed while
 * procedure paths still need the real `/api/trpc/...` URL for tRPC routing.
 */
function normalizeCollapsingApiUrl(request: Request): Request {
  const url = new URL(request.url);
  const path = url.pathname;
  const collapsed = path === "/api" || path === "/api/";
  if (!collapsed) {
    return request;
  }

  const raw =
    request.headers.get("x-invoke-path") ??
    request.headers.get("x-vercel-invoke-path") ??
    request.headers.get("x-forwarded-uri") ??
    "";
  if (!raw.includes("api")) {
    return request;
  }

  try {
    const nextPath = raw.startsWith("http") ? new URL(raw) : new URL(raw, url.origin);
    const next = new URL(`${nextPath.pathname}${nextPath.search}`, url.origin);
    return new Request(next.toString(), request);
  } catch {
    return request;
  }
}

/**
 * Vercel may leave pathname as `/api` while keeping the query (GET tRPC) or
 * body (POST). Map to the real routes without dropping search params.
 */
function rewriteBareApiPath(request: Request): Request {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";
  if (path !== "/api") {
    return request;
  }

  const isOAuth =
    request.method.toUpperCase() === "GET" &&
    (url.searchParams.has("code") || url.searchParams.has("state"));

  const next = new URL(request.url);
  next.pathname = isOAuth ? "/api/oauth/callback" : "/api/trpc";
  return new Request(next.toString(), request);
}

async function handleApi(request: Request): Promise<Response> {
  const req = rewriteBareApiPath(
    normalizeCollapsingApiUrl(
      normalizeFunctionEntryPathname(withUppercaseMethod(request)),
    ),
  );
  const url = new URL(req.url);
  const method = req.method.toUpperCase();

  if (
    method === "OPTIONS" &&
    (url.pathname.startsWith("/api/trpc") ||
      url.pathname === "/api/oauth/callback")
  ) {
    return new Response(null, {
      status: 204,
      headers: { Allow: "GET, POST, HEAD, OPTIONS" },
    });
  }

  if (url.pathname === "/api/oauth/callback" && method === "GET") {
    return handleOAuthCallbackRequest(req);
  }

  if (url.pathname.startsWith("/api/trpc")) {
    return fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: createFetchContext,
      /**
       * Required when the client uses `methodOverride: "POST"` (queries as
       * POST). Without this, tRPC returns METHOD_NOT_SUPPORTED (HTTP 405).
       */
      allowMethodOverride: true,
    });
  }

  return new Response("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Vercel Node entry using the Web `fetch` API (recommended for ESM projects).
 * Bundled to `api/index.js` by `pnpm build:api`. `vercel.json` rewrites
 * `/api/:path*` → `/api/index.js` so the function file is a concrete destination.
 *
 * Named verb exports: some Fluid / experimental backends only wire methods that
 * exist as exports; default `{ fetch }` alone can yield 405 with an empty body.
 */
export default { fetch: handleApi };
export const GET = handleApi;
export const POST = handleApi;
export const HEAD = handleApi;
export const OPTIONS = handleApi;
export const PUT = handleApi;
export const PATCH = handleApi;
export const DELETE = handleApi;
