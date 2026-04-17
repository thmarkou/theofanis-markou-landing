import type { CookieOptions, Request } from "express";

function isSecureRequest(req: Request): boolean {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
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
  req: Request
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  const secure = isSecureRequest(req);

  return {
    httpOnly: true,
    path: "/",
    sameSite: secure ? "none" : "lax",
    secure,
  };
}
