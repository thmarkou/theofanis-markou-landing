import { grantAnalyticsConsentAndLoadGa } from "@/lib/gtag";
import { injectUmamiAfterConsent } from "@/lib/umamiLoader";
import {
  readStoredCookieConsent,
  writeStoredCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookieConsentStorage";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface CookieConsentContextValue {
  consent: CookieConsentChoice;
  acceptAnalytics: () => void;
  rejectOptional: () => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextValue | undefined
>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentChoice>(() =>
    readStoredCookieConsent()
  );

  const acceptAnalytics = useCallback(() => {
    writeStoredCookieConsent("analytics");
    grantAnalyticsConsentAndLoadGa();
    injectUmamiAfterConsent();
    setConsent("analytics");
  }, []);

  const rejectOptional = useCallback(() => {
    writeStoredCookieConsent("necessary");
    setConsent("necessary");
  }, []);

  const value = useMemo(
    () => ({ consent, acceptAnalytics, rejectOptional }),
    [consent, acceptAnalytics, rejectOptional]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
