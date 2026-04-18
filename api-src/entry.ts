import "dotenv/config";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createFetchContext } from "../server/_core/context";
import { handleOAuthCallbackRequest } from "../server/_core/oauth";
import { appRouter } from "../server/routers";

/** vercel.json rewrite sends captured path as `__vp` so one `api` function can run. */
const VERCEL_PATH_QUERY = "__vp";

/**
 * Rebuild `/api/trpc/...` (or `/api/oauth/...`) from `__vp` after edge rewrite.
 * Incoming search params (e.g. tRPC `input`, `batch`) are preserved.
 */
function expandVercelPathRewrite(request: Request): Request {
  const url = new URL(request.url);
  const base = url.pathname.replace(/\/$/, "") || "/";
  if (base !== "/api") {
    return request;
  }

  const raw =
    url.searchParams.get(VERCEL_PATH_QUERY) ?? url.searchParams.get("path") ?? "";
  if (!raw) {
    return request;
  }

  url.searchParams.delete(VERCEL_PATH_QUERY);
  url.searchParams.delete("path");

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    /* use raw */
  }
  const trimmed = decoded.replace(/^\/+/, "").replaceAll("..", "");
  if (!trimmed) {
    return new Request(url.toString(), request);
  }

  url.pathname = `/api/${trimmed}`;
  return new Request(url.toString(), request);
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
    request.method === "GET" &&
    (url.searchParams.has("code") || url.searchParams.has("state"));

  const next = new URL(request.url);
  next.pathname = isOAuth ? "/api/oauth/callback" : "/api/trpc";
  return new Request(next.toString(), request);
}

/**
 * Vercel Node entry using the Web `fetch` API (recommended for ESM projects).
 * Bundled to `api/.vercel-handler.js` and re-exported from `api/index.js`.
 */
export default {
  async fetch(request: Request): Promise<Response> {
    const req = rewriteBareApiPath(
      normalizeCollapsingApiUrl(expandVercelPathRewrite(request)),
    );
    const url = new URL(req.url);

    if (
      req.method === "OPTIONS" &&
      (url.pathname.startsWith("/api/trpc") ||
        url.pathname === "/api/oauth/callback")
    ) {
      return new Response(null, {
        status: 204,
        headers: { Allow: "GET, POST, HEAD, OPTIONS" },
      });
    }

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
