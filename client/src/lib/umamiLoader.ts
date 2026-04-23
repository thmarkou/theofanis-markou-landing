let umamiInjected = false;

/**
 * Loads Umami only after analytics consent. Safe to call multiple times.
 */
export function injectUmamiAfterConsent(): void {
  if (umamiInjected || typeof document === "undefined") return;

  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;

  umamiInjected = true;
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${endpoint}/umami`;
  script.dataset.websiteId = websiteId;
  document.head.appendChild(script);
}
