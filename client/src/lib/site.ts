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

export function languageFromPathname(pathname: string): "en" | "de" {
  const pathOnly = pathname.split("#")[0]?.split("?")[0] ?? "/";
  const normalized = pathOnly.replace(/\/$/, "") || "/";
  return normalized === PATH_DE ? "de" : "en";
}
