import { useEffect } from "react";
import { useLocation } from "wouter";
import { getGaMeasurementId } from "@/lib/gtag";

/**
 * Sends GA4 virtual page views when the SPA path changes (`/` vs `/de`, 404, etc.).
 */
export function GoogleAnalyticsTracker() {
  const [path] = useLocation();
  const measurementId = getGaMeasurementId();

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: `${window.location.origin}${path}`,
      page_title: document.title,
    });
  }, [path, measurementId]);

  return null;
}
