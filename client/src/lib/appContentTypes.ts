import type { AppId } from "@/lib/appsCatalog";

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/** Shared shape for every public product landing page (EN/DE). */
export interface AppProductPageCopy {
  readonly title: string;
  readonly metaDescription: string;
  readonly kicker: string;
  readonly headline: string;
  readonly intro: string;
  /** Shown while status is not live (e.g. Waiting for Review). */
  readonly statusNote: string;
  /** Shown when status is live + App Store URL is set. */
  readonly liveNote: string;
  readonly appStoreCta: string;
  readonly screenshotsKicker: string;
  readonly screenshotsExpandHint: string;
  readonly screenshotsCloseLabel: string;
  readonly screenshots: readonly {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
  }[];
  readonly featuresKicker: string;
  readonly features: readonly { readonly title: string; readonly body: string }[];
  readonly faqKicker: string;
  readonly faqTitle: string;
  readonly faq: readonly FaqItem[];
  /** Replaces the “is it available?” FAQ answer once the app is live. */
  readonly faqAvailabilityAnswerLive: string;
  readonly privacyLabel: string;
  readonly contactLabel: string;
  readonly backHome: string;
}

/** Shared shape for every app privacy policy page (EN/DE). */
export interface AppPrivacyPageCopy {
  readonly title: string;
  readonly metaDescription: string;
  readonly backHome: string;
  readonly blocks: readonly { readonly heading: string; readonly body: string }[];
}

export interface WorkTeaserAppCopy {
  readonly id: AppId;
  readonly name: string;
  readonly tagline: string;
  readonly platformsLabel: string;
}
