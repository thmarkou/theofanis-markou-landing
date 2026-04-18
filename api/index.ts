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
 * Vercel Node entry using the Web `fetch` API (recommended for ESM projects).
 * Express remains the dev server stack in `server/_core/index.ts`.
 */
export default {
  async fetch(request: Request): Promise<Response> {
    const req = normalizeCollapsingApiUrl(request);
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
      });
    }

    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
};
