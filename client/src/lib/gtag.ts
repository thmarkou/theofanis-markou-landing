/**
 * Google Analytics 4 with Consent Mode v2 (EU). The gtag.js script loads only
 * after the user accepts analytics in `CookieConsentBanner`.
 *
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let consentDefaultPushed = false;
let gaLibraryLoaded = false;

function normalizeMeasurementId(raw: string | undefined): string | undefined {
  if (typeof raw !== "string") return undefined;
  const id = raw.trim();
  return id.startsWith("G-") && id.length > 4 ? id : undefined;
}

export function getGaMeasurementId(): string | undefined {
  return (
    normalizeMeasurementId(import.meta.env.NEXT_PUBLIC_GA_ID) ??
    normalizeMeasurementId(import.meta.env.VITE_GA_MEASUREMENT_ID)
  );
}

/**
 * Defines `gtag` + `dataLayer` and sets default consent to denied before any
 * Google tag loads. Call once on app startup.
 */
export function ensureGtagConsentDefault(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // Match Google's official snippet exactly (`dataLayer.push(arguments)`).
    // Some tag processors expect an Arguments-like payload, not a plain array.
    window.dataLayer!.push(arguments);
  };

  if (consentDefaultPushed) return;
  consentDefaultPushed = true;

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
}

/**
 * Grants analytics storage and loads gtag.js + GA4 config (no automatic page_view).
 */
export function grantAnalyticsConsentAndLoadGa(): void {
  const id = getGaMeasurementId();
  if (!id || typeof window === "undefined") return;

  ensureGtagConsentDefault();

  window.gtag!("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (gaLibraryLoaded) {
    window.gtag!("config", id, { send_page_view: false });
    return;
  }

  gaLibraryLoaded = true;
  window.gtag!("js", new Date());
  window.gtag!("config", id, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}
