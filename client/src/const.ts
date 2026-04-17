export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Builds the OAuth portal redirect URL at runtime.
 *
 * Returns null when required env vars are missing so callers can fall back to
 * a graceful message instead of constructing a malformed URL. Doing this at
 * call time (not module load) lets the page still render when OAuth is
 * intentionally disabled in local dev.
 */
export function getLoginUrl(): string {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  if (!oauthPortalUrl || !appId) {
    throw new Error(
      "Login is not configured: missing VITE_OAUTH_PORTAL_URL or VITE_APP_ID"
    );
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
}
