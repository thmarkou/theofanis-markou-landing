/**
 * Product apps shown on the marketing site.
 *
 * ## Add a new app (Phase C checklist)
 * See DEPLOYMENT.md → “Add a new App Store product”.
 * Short version:
 * 1. Append an entry to `APPS_CATALOG` below (id + slug unique, lowercase).
 * 2. Add EN/DE `workTeaser.apps`, `appProductPages[id]`, `appPrivacyPages[id]` in siteContent.ts.
 * 3. Put screenshots in `client/public/images/<slug>/`.
 * 4. Append product + privacy URLs to `client/public/sitemap.xml`.
 * 5. Update `llm.txt` / `llm-full.txt`.
 * 6. Run `pnpm check` and `pnpm test` (coverage test enforces catalog ↔ copy).
 *
 * ## Go-live (App Store Ready for Sale)
 * 1. Set `status: "live"`.
 * 2. Set `appStoreUrl` to the public apps.apple.com link.
 * 3. Deploy; CTAs appear automatically (see DEPLOYMENT.md).
 */
export type AppStatus = "coming_soon" | "in_review" | "live";

export type AppPlatform = "ios" | "android" | "web";

/**
 * Source of truth for which apps are public on the marketing site.
 * `AppId` is derived from this list — add an entry here first when shipping a new product.
 */
export const APPS_CATALOG = [
  {
    id: "voiceaction",
    slug: "voiceaction",
    status: "in_review",
    platforms: ["ios"],
    // appStoreUrl: "https://apps.apple.com/app/idXXXXXXXX",
  },
  // Example next product (uncomment and fill when ready):
  // {
  //   id: "nextapp",
  //   slug: "nextapp",
  //   status: "coming_soon",
  //   platforms: ["ios"],
  // },
] as const;

export type AppId = (typeof APPS_CATALOG)[number]["id"];

export type AppCatalogEntry = {
  id: AppId;
  slug: string;
  status: AppStatus;
  platforms: readonly AppPlatform[];
  appStoreUrl?: string;
};

/** Runtime catalog typed for optional App Store URL and future entries. */
export const APPS: readonly AppCatalogEntry[] = APPS_CATALOG.map(app => {
  const entry: AppCatalogEntry = {
    id: app.id,
    slug: app.slug,
    status: app.status,
    platforms: [...app.platforms],
  };
  if ("appStoreUrl" in app && typeof app.appStoreUrl === "string") {
    entry.appStoreUrl = app.appStoreUrl;
  }
  return entry;
});

const SLUG_TO_APP = new Map<string, AppCatalogEntry>(
  APPS.map(app => [app.slug, app]),
);

const ID_TO_APP = new Map<AppId, AppCatalogEntry>(
  APPS.map(app => [app.id, app]),
);

export function getAppBySlug(slug: string): AppCatalogEntry | undefined {
  return SLUG_TO_APP.get(slug.toLowerCase());
}

export function getAppById(id: string): AppCatalogEntry | undefined {
  return ID_TO_APP.get(id as AppId);
}

export function isKnownAppSlug(slug: string): boolean {
  return SLUG_TO_APP.has(slug.toLowerCase());
}

export function isAppId(value: string): value is AppId {
  return ID_TO_APP.has(value as AppId);
}

/** True when the app should show App Store download CTAs. */
export function isAppLiveOnStore(app: AppCatalogEntry): boolean {
  return app.status === "live" && Boolean(app.appStoreUrl);
}

/** Conventional public path for product screenshots. */
export function appScreenshotsPublicDir(slug: string): string {
  return `/images/${slug}`;
}
