/** localStorage key — bump suffix if consent categories / wording change materially. */
export const COOKIE_CONSENT_STORAGE_KEY = "tm-cookie-consent-v1";

export type CookieConsentChoice = "pending" | "necessary" | "analytics";

export function readStoredCookieConsent(): CookieConsentChoice {
  if (typeof window === "undefined") return "pending";
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (raw === "necessary" || raw === "analytics") return raw;
  } catch {
    /* private mode, etc. */
  }
  return "pending";
}

export function writeStoredCookieConsent(choice: Exclude<CookieConsentChoice, "pending">): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
  } catch {
    /* ignore */
  }
}

export function hasAnalyticsConsent(): boolean {
  return readStoredCookieConsent() === "analytics";
}
