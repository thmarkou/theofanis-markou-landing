/**
 * Product apps shown on the marketing site.
 * Add a new entry here when another app is ready to surface.
 */
export type AppStatus = "coming_soon" | "in_review" | "live";

/** Stable ids used in dictionaries / privacy / product content maps. */
export type AppId = "voiceaction";

export type AppCatalogEntry = {
  id: AppId;
  /** URL segment, e.g. /voiceaction and /voiceaction/privacy */
  slug: string;
  status: AppStatus;
  platforms: readonly ("ios" | "android" | "web")[];
  /** Public App Store URL — set when status is `live`. */
  appStoreUrl?: string;
};

export const APPS_CATALOG: readonly AppCatalogEntry[] = [
  {
    id: "voiceaction",
    slug: "voiceaction",
    status: "in_review",
    platforms: ["ios"],
  },
] as const;

const SLUG_TO_APP = new Map(
  APPS_CATALOG.map(app => [app.slug, app] as const),
);

export function getAppBySlug(slug: string): AppCatalogEntry | undefined {
  return SLUG_TO_APP.get(slug.toLowerCase());
}

export function isKnownAppSlug(slug: string): boolean {
  return SLUG_TO_APP.has(slug.toLowerCase());
}
