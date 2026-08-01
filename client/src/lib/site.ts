/**
 * Canonical site origin and locale paths. Keep in sync with `index.html`,
 * `robots.txt`, `sitemap.xml`, and static `llm*.txt` when the production
 * domain changes.
 */
export const SITE_ORIGIN = "https://theofanis-markou.vercel.app";

/** English (default) — trailing slash optional in links; path is `/`. */
export const PATH_EN = "/";

/** German locale route for hreflang and sitemap. */
export const PATH_DE = "/de";

export function pathForLanguage(lang: "en" | "de"): typeof PATH_EN | typeof PATH_DE {
  return lang === "de" ? PATH_DE : PATH_EN;
}

export function canonicalUrlForLanguage(lang: "en" | "de"): string {
  return `${SITE_ORIGIN}${pathForLanguage(lang)}`;
}

/** Localized privacy policy path (separate from the marketing home route). */
export function privacyPathForLanguage(lang: "en" | "de"): string {
  return lang === "de" ? `${PATH_DE}/privacy` : "/privacy";
}

export function canonicalPrivacyUrl(lang: "en" | "de"): string {
  return `${SITE_ORIGIN}${privacyPathForLanguage(lang)}`;
}

/** Product marketing path, e.g. /voiceaction */
export function appProductPathForLanguage(
  slug: string,
  lang: "en" | "de",
): string {
  return lang === "de" ? `${PATH_DE}/${slug}` : `/${slug}`;
}

export function canonicalAppProductUrl(
  slug: string,
  lang: "en" | "de",
): string {
  return `${SITE_ORIGIN}${appProductPathForLanguage(slug, lang)}`;
}

/** Product app privacy path, e.g. /voiceaction/privacy */
export function appPrivacyPathForLanguage(
  slug: string,
  lang: "en" | "de",
): string {
  return lang === "de" ? `${PATH_DE}/${slug}/privacy` : `/${slug}/privacy`;
}

export function canonicalAppPrivacyUrl(
  slug: string,
  lang: "en" | "de",
): string {
  return `${SITE_ORIGIN}${appPrivacyPathForLanguage(slug, lang)}`;
}

export function languageFromPathname(pathname: string): "en" | "de" {
  const pathOnly = pathname.split("#")[0]?.split("?")[0] ?? "/";
  const normalized = pathOnly.replace(/\/$/, "") || "/";
  if (normalized === PATH_DE || normalized.startsWith(`${PATH_DE}/`)) {
    return "de";
  }
  return "en";
}
