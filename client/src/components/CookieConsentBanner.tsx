import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { languageFromPathname, privacyPathForLanguage } from "@/lib/site";
import { content } from "@/lib/siteContent";
import { Link, useLocation } from "wouter";

/**
 * EU-style choice: necessary by default; analytics only after explicit opt-in.
 */
export function CookieConsentBanner() {
  const [path] = useLocation();
  const { consent, acceptAnalytics, rejectOptional } = useCookieConsent();
  const lang = languageFromPathname(path);
  const copy = content[lang].cookieConsent;
  const privacyHref = privacyPathForLanguage(lang);

  if (consent !== "pending") return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="pointer-events-auto max-w-2xl border border-white/12 bg-background/95 px-5 py-5 shadow-2xl backdrop-blur-md md:px-8 md:py-6">
        <h2
          id="cookie-consent-title"
          className="text-xs font-medium tracking-[0.22em] text-white/52 uppercase"
        >
          Cookies
        </h2>
        <p
          id="cookie-consent-desc"
          className="mt-3 text-sm leading-relaxed text-white/78"
        >
          {copy.message}{" "}
          <Link
            href={privacyHref}
            className="text-foreground underline decoration-white/28 underline-offset-4 transition-colors hover:decoration-white/50"
          >
            {copy.learnMore}
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            className="min-h-11 bg-foreground px-5 py-2.5 text-xs font-medium tracking-[0.18em] text-background uppercase transition-opacity hover:opacity-92"
            onClick={acceptAnalytics}
          >
            {copy.accept}
          </button>
          <button
            type="button"
            className="min-h-11 border border-white/22 bg-transparent px-5 py-2.5 text-xs font-medium tracking-[0.18em] text-white/88 uppercase transition-colors hover:border-white/40 hover:text-white"
            onClick={rejectOptional}
          >
            {copy.reject}
          </button>
        </div>
      </div>
    </div>
  );
}
