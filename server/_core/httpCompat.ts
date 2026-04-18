import type { Request as ExpressRequest } from "express";

function isWebRequest(req: ExpressRequest | Request): req is Request {
  return typeof Request !== "undefined" && req instanceof Request;
}

export function getCookieHeader(
  req: ExpressRequest | Request
): string | undefined {
  if (isWebRequest(req)) {
    return req.headers.get("cookie") ?? undefined;
  }
  return req.headers.cookie;
}

export function getUserAgent(req: ExpressRequest | Request): string | null {
  if (isWebRequest(req)) {
    return req.headers.get("user-agent");
  }
  const v = req.headers["user-agent"];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0] ?? null;
  return null;
}
