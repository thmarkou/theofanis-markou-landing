/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ID?: string;
  readonly VITE_OAUTH_PORTAL_URL?: string;
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  readonly VITE_ANALYTICS_WEBSITE_ID?: string;
  /** Google Analytics 4 measurement ID (legacy; prefer `NEXT_PUBLIC_GA_ID`). */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX (Next.js-style name). */
  readonly NEXT_PUBLIC_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
