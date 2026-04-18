import type { CookieOptions, Request as ExpressRequest } from "express";

function isSecureExpressRequest(req: ExpressRequest): boolean {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

function isSecureWebRequest(req: Request): boolean {
  const u = new URL(req.url);
  if (u.protocol === "https:") return true;
  const forwarded = req.headers.get("x-forwarded-proto");
  if (!forwarded) return false;
  return forwarded.split(",").some(p => p.trim().toLowerCase() === "https");
}

/**
 * Session cookie options.
 *
 * - Behind HTTPS (prod / staging) we need `sameSite: "none"` so the cookie
 *   survives the OAuth cross-origin redirect, paired with `secure: true`.
 * - In local dev over HTTP, browsers reject `sameSite=none` without `secure`,
 *   so we downgrade to `"lax"` which keeps the cookie usable for same-site
 *   navigations like the OAuth callback returning to localhost.
 */
export function getSessionCookieOptions(
  req: ExpressRequest
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  const secure = isSecureExpressRequest(req);

  return {
    httpOnly: true,
    path: "/",
    sameSite: secure ? "none" : "lax",
    secure,
  };
}

/** Shared by Express and Vercel `fetch` handlers (OAuth + tRPC logout). */
export function getSessionCookieOptionsUnified(
  req: ExpressRequest | Request
): Pick<
  CookieOptions,
  "domain" | "httpOnly" | "path" | "sameSite" | "secure"
> {
  const secure =
    typeof Request !== "undefined" && req instanceof Request
      ? isSecureWebRequest(req)
      : isSecureExpressRequest(req as ExpressRequest);

  return {
    httpOnly: true,
    path: "/",
    sameSite: secure ? "none" : "lax",
    secure,
  };
}

function buildSetCookieHeader(
  name: string,
  value: string,
  opts: ReturnType<typeof getSessionCookieOptionsUnified>,
  maxAgeSec: number | undefined,
  expires?: Date
): string {
  const segments = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${opts.path ?? "/"}`,
  ];
  if (opts.httpOnly) segments.push("HttpOnly");
  if (opts.secure) segments.push("Secure");
  segments.push(`SameSite=${opts.sameSite === "none" ? "None" : "Lax"}`);
  if (opts.domain) segments.push(`Domain=${opts.domain}`);
  if (maxAgeSec !== undefined) segments.push(`Max-Age=${maxAgeSec}`);
  if (expires) segments.push(`Expires=${expires.toUTCString()}`);
  return segments.join("; ");
}

export function appendSetSessionCookie(
  headers: Headers,
  name: string,
  value: string,
  req: ExpressRequest | Request,
  maxAgeMs: number
): void {
  const opts = getSessionCookieOptionsUnified(req);
  headers.append(
    "Set-Cookie",
    buildSetCookieHeader(name, value, opts, Math.floor(maxAgeMs / 1000))
  );
}

export function appendClearSessionCookie(
  headers: Headers,
  name: string,
  req: ExpressRequest | Request
): void {
  const opts = getSessionCookieOptionsUnified(req);
  headers.append(
    "Set-Cookie",
    buildSetCookieHeader(name, "", opts, 0, new Date(0))
  );
}
