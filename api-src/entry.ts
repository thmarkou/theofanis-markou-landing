import "dotenv/config";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createFetchContext } from "../server/_core/context";
import { handleOAuthCallbackRequest } from "../server/_core/oauth";
import { appRouter } from "../server/routers";

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
    request.method === "GET" &&
    (url.searchParams.has("code") || url.searchParams.has("state"));

  const next = new URL(request.url);
  next.pathname = isOAuth ? "/api/oauth/callback" : "/api/trpc";
  return new Request(next.toString(), request);
}

/**
 * Vercel Node entry using the Web `fetch` API (recommended for ESM projects).
 * Bundled to `api/.vercel-handler.js` and re-exported from `api/index.js`,
 * `api/trpc/[trpc].js`, and `api/oauth/callback.js` so URLs keep full pathnames.
 */
export default {
  async fetch(request: Request): Promise<Response> {
    const req = rewriteBareApiPath(normalizeCollapsingApiUrl(request));
    const url = new URL(req.url);

    if (url.pathname === "/api/oauth/callback" && req.method === "GET") {
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
  },
};
