/**
 * Product apps shown on the marketing site.
 * Add a new entry here when another app is ready to surface.
 */
export type AppStatus = "coming_soon" | "in_review" | "live";

export type AppCatalogEntry = {
  /** Stable id used in dictionaries / privacy content maps. */
  id: "voiceaction";
  /** URL segment, e.g. /voiceaction/privacy */
  slug: string;
  status: AppStatus;
  platforms: readonly ("ios" | "android" | "web")[];
};

export const APPS_CATALOG: readonly AppCatalogEntry[] = [
  {
    id: "voiceaction",
    slug: "voiceaction",
    status: "in_review",
    platforms: ["ios"],
  },
] as const;
