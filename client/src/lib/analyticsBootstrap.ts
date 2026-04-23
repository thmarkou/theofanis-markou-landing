import { grantAnalyticsConsentAndLoadGa } from "./gtag";
import {
  readStoredCookieConsent,
  type CookieConsentChoice,
} from "./cookieConsentStorage";
import { injectUmamiAfterConsent } from "./umamiLoader";

/**
 * Run synchronously from `main.tsx` before React mounts: consent defaults +
 * load GA/Umami only if the user already accepted in a prior visit.
 */
export function bootstrapAnalyticsFromStorage(): CookieConsentChoice {
  const choice = readStoredCookieConsent();
  if (choice === "analytics") {
    grantAnalyticsConsentAndLoadGa();
    injectUmamiAfterConsent();
  }
  return choice;
}
