import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { getGaMeasurementId } from "@/lib/gtag";
import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Sends GA4 virtual page views when the SPA path changes (`/` vs `/de`, 404, etc.).
 * Fires only after the user has accepted analytics (Consent Mode + no auto page_view).
 */
export function GoogleAnalyticsTracker() {
  const [path] = useLocation();
  const { consent } = useCookieConsent();
  const measurementId = getGaMeasurementId();

  useEffect(() => {
    if (consent !== "analytics") return;
    if (!measurementId || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: `${window.location.origin}${path}`,
      page_title: document.title,
    });
  }, [path, measurementId, consent]);

  return null;
}
