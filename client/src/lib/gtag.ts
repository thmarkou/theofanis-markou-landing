/**
 * Google Analytics 4 (gtag.js). Loads when `NEXT_PUBLIC_GA_ID` (preferred) or
 * legacy `VITE_GA_MEASUREMENT_ID` is set at build time (`G-XXXXXXXXXX`).
 *
 * This app is Vite + React (not Next.js); there is no `next/script` — the
 * loader is injected from `main.tsx` via `injectGoogleAnalytics()`.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

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
 * Injects the async gtag loader + initial config. Safe to call once at app startup.
 */
export function injectGoogleAnalytics(): void {
  const id = getGaMeasurementId();
  if (!id || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  // SPA: virtual page views are sent from `GoogleAnalyticsTracker` to avoid duplicates.
  window.gtag("config", id, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}
