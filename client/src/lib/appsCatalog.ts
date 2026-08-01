/**
 * Product apps shown on the marketing site.
 * Add a new entry here when another app is ready to surface.
 *
 * ## Go-live (App Store Ready for Sale)
 * 1. Set `status: "live"`.
 * 2. Set `appStoreUrl` to the public apps.apple.com link (required for CTA + schema).
 * 3. Deploy, then update FAQ / llm copy that still says “Waiting for Review”
 *    (see DEPLOYMENT.md → VoiceAction App Store go-live).
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
  /**
   * Public App Store product URL.
   * Example: https://apps.apple.com/app/voiceaction/idXXXXXXXX
   * Leave unset while Waiting for Review.
   */
  appStoreUrl?: string;
};

export const APPS_CATALOG: readonly AppCatalogEntry[] = [
  {
    id: "voiceaction",
    slug: "voiceaction",
    status: "in_review",
    platforms: ["ios"],
    // appStoreUrl: "https://apps.apple.com/app/idXXXXXXXX",
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

/** True when the app should show App Store download CTAs. */
export function isAppLiveOnStore(app: AppCatalogEntry): boolean {
  return app.status === "live" && Boolean(app.appStoreUrl);
}
