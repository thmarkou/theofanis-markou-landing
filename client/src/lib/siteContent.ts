/**
 * Single source of truth for all bilingual (EN/DE) copy on the landing page.
 * Every section component reads from here via the `useDictionary` hook —
 * no inline strings elsewhere. Keys are grouped by section to keep
 * translators and reviewers aligned with the visible page structure.
 *
 * New App Store products: follow DEPLOYMENT.md → “Add a new App Store product”
 * (catalog entry + workTeaser + appProductPages + appPrivacyPages + sitemap + llm).
 */

import type { AppId } from "@/lib/appsCatalog";
import type {
  AppPrivacyPageCopy,
  AppProductPageCopy,
  FaqItem,
  WorkTeaserAppCopy,
} from "@/lib/appContentTypes";

export type { FaqItem, AppPrivacyPageCopy, AppProductPageCopy, WorkTeaserAppCopy };
export type Language = "en" | "de";

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface Metric {
  readonly value: string;
  readonly label: string;
}

export interface TimelineEntry {
  readonly year: string;
  readonly title: string;
  readonly description: string;
}

export interface TitledBody {
  readonly title: string;
  readonly body: string;
}

export interface Dictionary {
  readonly languageLabel: string;
  readonly switchLabel: string;

  readonly nav: {
    readonly items: readonly NavItem[];
    readonly mobileExtra: readonly NavItem[];
    readonly toggle: string;
    /** Mobile: arrow next to each link — scrolls to page top. */
    readonly scrollToTopLabel: string;
  };

  readonly hero: {
    readonly eyebrow: string;
    readonly kicker: string;
    readonly title: string;
    readonly subtitle: string;
    readonly body: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly metrics: readonly Metric[];
    readonly overviewKicker: string;
    readonly overviewBody: string;
    readonly currentFocusKicker: string;
    readonly currentFocusBody: string;
    /** Alt text for hero rail portrait (below Identity). */
    readonly portraitAlt: string;
    readonly rail: {
      readonly identityKicker: string;
      readonly positioningKicker: string;
      readonly positioningBody: string;
      readonly educationKicker: string;
      readonly educationBody: string;
    };
  };

  readonly journey: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly timeline: readonly TimelineEntry[];
    readonly imageAlt: string;
  };

  readonly focus: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly areas: readonly TitledBody[];
    readonly imageAlt: string;
    readonly leadershipLensKicker: string;
    readonly leadershipBullets: readonly string[];
    readonly educationKicker: string;
    readonly educationTitle: string;
    readonly educationBody: string;
  };

  readonly mission: {
    readonly kicker: string;
    readonly title: string;
    readonly body: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly url: string;
    readonly executiveKicker: string;
    readonly executiveBody: string;
    readonly companyLabel: string;
    readonly domainLabel: string;
    readonly domainValue: string;
    readonly approachLabel: string;
    readonly approachValue: string;
  };

  readonly advisory: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly practiceTitle: string;
    readonly practiceBody: string;
    readonly services: readonly TitledBody[];
    readonly distinctionTitle: string;
    readonly distinctionBody: string;
    readonly serviceArchitectureKicker: string;
    readonly serviceArchitectureSupport: string;
    readonly executiveMandateKicker: string;
    readonly privatePracticeKicker: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly softwareDevelopmentNavLabel: string;
    readonly consultingNavLabel: string;
  };

  readonly contact: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly availability: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly responseModeKicker: string;
    readonly viaFormKicker: string;
    readonly viaFormBody: string;
    readonly viaFormCta: string;
    readonly form: {
      readonly title: string;
      readonly intro: string;
      readonly nameLabel: string;
      readonly namePlaceholder: string;
      readonly emailLabel: string;
      readonly emailPlaceholder: string;
      readonly companyLabel: string;
      readonly companyPlaceholder: string;
      readonly messageLabel: string;
      readonly messagePlaceholder: string;
      readonly submit: string;
      readonly submitting: string;
      readonly successTitle: string;
      readonly successBody: string;
      readonly errorTitle: string;
      readonly errorBody: string;
      readonly validation: {
        readonly nameRequired: string;
        readonly emailInvalid: string;
        readonly messageTooShort: string;
      };
    };
    readonly supportKicker: string;
    readonly supportBody: string;
    readonly linkedinLabel: string;
  };

  readonly network: {
    readonly kicker: string;
    readonly title: string;
    readonly body: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly panelKicker: string;
    readonly panelSupport: string;
    readonly panelBody: string;
    readonly imageAlt: string;
    readonly linkedinUrl: string;
  };

  readonly faq: {
    readonly kicker: string;
    readonly title: string;
    readonly items: readonly FaqItem[];
  };

  readonly workTeaser: {
    readonly kicker: string;
    readonly title: string;
    readonly body: string;
    readonly privacyLabel: string;
    readonly learnMoreLabel: string;
    readonly appStoreLabel: string;
    readonly statusLabels: {
      readonly coming_soon: string;
      readonly in_review: string;
      readonly live: string;
    };
    readonly apps: readonly WorkTeaserAppCopy[];
  };

  /**
   * Must include every `APPS_CATALOG` id (enforced by appsCatalog.coverage.test.ts).
   */
  readonly appProductPages: Readonly<Record<AppId, AppProductPageCopy>>;

  /**
   * Must include every `APPS_CATALOG` id (enforced by appsCatalog.coverage.test.ts).
   */
  readonly appPrivacyPages: Readonly<Record<AppId, AppPrivacyPageCopy>>;

  readonly location: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly openMapsLabel: string;
    readonly offices: readonly {
      readonly name: string;
      readonly addressLines: readonly string[];
      readonly mapIframeTitle: string;
    }[];
  };

  readonly cookieConsent: {
    readonly message: string;
    readonly learnMore: string;
    readonly accept: string;
    readonly reject: string;
  };

  readonly privacyPage: {
    readonly title: string;
    readonly metaDescription: string;
    readonly backHome: string;
    readonly blocks: readonly { readonly heading: string; readonly body: string }[];
  };

  readonly footer: {
    readonly note: string;
    readonly contactLinkLabel: string;
    readonly privacyLinkLabel: string;
  };
}

// --- English ---------------------------------------------------------------

const en: Dictionary = {
  languageLabel: "EN",
  switchLabel: "Switch language",

  nav: {
    items: [
      { label: "Journey", href: "#journey" },
      { label: "Focus Areas", href: "#focus" },
      { label: "Current Mission", href: "#mission" },
      { label: "Advisory", href: "#advisory" },
      { label: "Network", href: "#network" },
      { label: "FAQ", href: "#faq" },
      { label: "Selected work", href: "#selected-work" },
      { label: "Contact", href: "#contact" },
      { label: "Office", href: "#location" },
    ],
    mobileExtra: [
      { label: "Software Development", href: "#software-development" },
      { label: "Consulting", href: "#consulting" },
    ],
    toggle: "Toggle navigation",
    scrollToTopLabel: "Back to top",
  },

  hero: {
    eyebrow: "Theofanis Markou · CTO at Resilience Guard GmbH",
    kicker: "Executive Branding Landing Page",
    title: "From Code to Strategy: 30 Years of IT Excellence",
    subtitle:
      "A career shaped across software development, team leadership, IT management, and executive technology strategy since 1995.",
    body: "Theofanis Markou brings together deep technical credibility and executive-level strategic clarity, with a focus on cyber resilience, business continuity, sustainable digital transformation, and selected high-value advisory engagements.",
    primaryCta: "Explore the journey",
    secondaryCta: "Current mission",
    metrics: [
      { value: "30+", label: "Years in IT" },
      { value: "1995", label: "Career start" },
      { value: "CTO", label: "Current role" },
      { value: "MSc", label: "Information Technology" },
    ],
    overviewKicker: "Overview",
    overviewBody: "Strategic profile in two languages",
    currentFocusKicker: "Current Focus",
    currentFocusBody:
      "Executive technology leadership for business-critical environments, complemented by selective high-value advisory work.",
    portraitAlt: "Theofanis Markou — portrait photograph",
    rail: {
      identityKicker: "Identity",
      positioningKicker: "Positioning",
      positioningBody:
        "Cyber Resilience · Business Continuity · Strategic IT Management",
      educationKicker: "Education",
      educationBody: "MSc in Information Technology",
    },
  },

  journey: {
    kicker: "Timeline",
    title: "Professional Journey",
    intro:
      "A progression from hands-on software delivery to executive technology leadership, reflecting the role path visible across public LinkedIn snippets and company biography references from 1995 onward.",
    timeline: [
      {
        year: "1995",
        title: "Software Developer / Analyst",
        description:
          "Began the professional journey in software engineering and analysis, building the technical foundation for later leadership in business-critical IT environments.",
      },
      {
        year: "2000s",
        title: "Senior Software Engineer · ICAP Group & Epsilon NET",
        description:
          "Delivered enterprise-oriented business applications with strong Microsoft development expertise, including large-scale .NET and ASP.NET design and integration work.",
      },
      {
        year: "2010s",
        title: "IT Manager · Meli Tours",
        description:
          "Took responsibility for operational IT leadership, infrastructure oversight, and business-facing technology management in a demanding destination-management environment.",
      },
      {
        year: "Today",
        title: "Group Technology Officer / CTO · Resilience Guard GmbH",
        description:
          "Leads research, development, and technology direction with a focus on cyber resilience, business continuity, infrastructure discipline, and executive decision support.",
      },
    ],
    imageAlt: "Abstract blueprint composition representing career progression",
  },

  focus: {
    kicker: "Strategic Domain",
    title: "Strategic Focus Areas",
    intro:
      "A leadership profile centered on resilience, control, and transformation in business-critical technology landscapes.",
    areas: [
      {
        title: "Strategic Cyber Resilience",
        body: "Designing resilient operating models that strengthen preparedness, reduce exposure, and support continuity under pressure.",
      },
      {
        title: "Infrastructure Control",
        body: "Maintaining visibility, governance, and operational reliability across essential systems and technology foundations.",
      },
      {
        title: "Digital Transformation",
        body: "Driving change through pragmatic modernization, executive alignment, and disciplined technology planning.",
      },
    ],
    imageAlt: "Abstract cyber resilience infrastructure artwork",
    leadershipLensKicker: "Leadership Lens",
    leadershipBullets: [
      "Long-horizon thinking grounded in operational detail.",
      "Board-ready communication combined with technical depth.",
      "Transformation initiatives managed with discipline, clarity, and resilience.",
    ],
    educationKicker: "Education",
    educationTitle: "Academic Foundation",
    educationBody:
      "MSc in Information Technology, Middlesex University — complementing practical leadership with formal technological expertise.",
  },

  mission: {
    kicker: "Current Role",
    title: "Current Mission at Resilience Guard GmbH",
    body: "In his current CTO mandate at Resilience Guard, the focus is on strengthening cyber resilience and business continuity through strategic oversight, operational clarity, infrastructure discipline, and executive technology leadership.",
    primaryCta: "Visit resilienceguard.ch",
    secondaryCta: "Custom Solutions",
    url: "https://www.resilienceguard.ch/",
    executiveKicker: "Executive Mandate",
    executiveBody:
      "CTO leadership at Resilience Guard, centered on resilience, continuity, and infrastructure governance.",
    companyLabel: "Company",
    domainLabel: "Domain",
    domainValue: "Cyber Resilience",
    approachLabel: "Approach",
    approachValue: "Executive Technology Leadership",
  },

  advisory: {
    kicker: "Private Advisory Practice",
    title: "Bespoke Digital Solutions & Advisory",
    intro:
      "Alongside the current CTO mandate, Theofanis Markou maintains a selective private consulting practice focused on tailor-made digital delivery and high-level strategic technology advisory.",
    practiceTitle: "Private Consulting Practice",
    practiceBody:
      "This advisory work is complementary to — and clearly distinct from — the executive role at Resilience Guard. It is designed for organizations that require experienced technical leadership, pragmatic decision support, and precise delivery for business-critical initiatives.",
    services: [
      {
        title: "Custom Software Development",
        body: "Expert creation of bespoke web and mobile applications, including native iOS and Android solutions, engineered around operational reality and business-specific requirements.",
      },
      {
        title: "IT Strategic Consulting",
        body: "High-level support and expert advisory for companies seeking seasoned technical leadership, infrastructure guidance, and disciplined technology decision-making.",
      },
    ],
    distinctionTitle: "Complementary Positioning",
    distinctionBody:
      "Resilience Guard represents the current executive leadership mandate in cyber resilience and continuity. The private advisory practice extends that experience into selected consulting engagements and bespoke digital product work.",
    serviceArchitectureKicker: "Service Architecture",
    serviceArchitectureSupport:
      "Selective mandates for digital delivery and strategic guidance",
    executiveMandateKicker: "Executive Mandate",
    privatePracticeKicker: "Private Practice",
    primaryCta: "Discuss an advisory mandate",
    secondaryCta: "View current mission",
    softwareDevelopmentNavLabel: "Software Development",
    consultingNavLabel: "Consulting",
  },

  contact: {
    kicker: "Executive Contact",
    title: "Executive Contact",
    intro:
      "A dedicated contact point for selected advisory conversations, bespoke digital solution inquiries, executive introductions, and strategic exchange.",
    availability:
      "Available for carefully selected discussions in consulting, custom software development, and resilient technology leadership.",
    primaryCta: "Open contact form",
    secondaryCta: "Open LinkedIn",
    responseModeKicker: "Preferred Contact Flow",
    viaFormKicker: "Website contact",
    viaFormBody:
      "Please use the secure message form on this page. A public email address is not shown here to reduce spam; inquiries are handled through the form.",
    viaFormCta: "Go to form",
    form: {
      title: "Send a structured message",
      intro:
        "Introduce yourself and outline the context. Messages are reviewed personally and replied to within a few business days.",
      nameLabel: "Full name",
      namePlaceholder: "Your name",
      emailLabel: "Email address",
      emailPlaceholder: "you@company.com",
      companyLabel: "Organization",
      companyPlaceholder: "Company or affiliation (optional)",
      messageLabel: "Message",
      messagePlaceholder:
        "Briefly describe the engagement, initiative, or question you would like to discuss.",
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Message received",
      successBody:
        "Thank you. Your message has been logged and will be reviewed personally.",
      errorTitle: "Message could not be sent",
      errorBody: "Please try again in a moment.",
      validation: {
        nameRequired: "Please enter your name.",
        emailInvalid: "Please enter a valid email address.",
        messageTooShort: "Message must be at least 20 characters.",
      },
    },
    supportKicker: "How to reach out",
    supportBody:
      "Use the contact form on this page for inquiries, or LinkedIn for executive networking. No public email is listed on this site.",
    linkedinLabel: "LinkedIn",
  },

  network: {
    kicker: "Professional Networking",
    title: "Let’s Connect on LinkedIn",
    body: "Open to executive networking, strategic exchange, and selected conversations around resilient IT leadership, bespoke digital solutions, and transformation.",
    primaryCta: "Open LinkedIn",
    secondaryCta: "View Resilience Guard",
    panelKicker: "LinkedIn",
    panelSupport: "C-level networking and strategic exchange",
    panelBody:
      "Connect directly for executive networking, strategic exchange, and selected advisory conversations.",
    imageAlt: "Abstract professional network constellation",
    linkedinUrl: "https://www.linkedin.com/in/theofanismarkou/",
  },

  faq: {
    kicker: "FAQ",
    title: "Common questions",
    items: [
      {
        question: "Who is Theofanis Markou?",
        answer:
          "Chief Technology Officer at Resilience Guard GmbH, with 30+ years in IT since 1995. Alongside that executive mandate he runs a selective individual practice for made-to-order mobile apps (iOS and Android), modern web applications, and high-trust IT advisory — scoped separately from Resilience Guard client engagements.",
      },
      {
        question: "What is his current role at Resilience Guard?",
        answer:
          "He leads research, development, and technology direction as CTO, strengthening cyber resilience and business continuity through strategic oversight, R&D alignment, and disciplined infrastructure governance.",
      },
      {
        question: "What languages does this site support?",
        answer:
          "English and German. Use EN / DE in the header or the /de URL for hreflang-aligned indexing.",
      },
      {
        question: "How can I contact him about a project or advisory inquiry?",
        answer:
          "Use the structured contact form in the Contact section. For executive networking you can also connect on LinkedIn. No public email is listed here.",
      },
      {
        question:
          "What kind of custom software does the private practice deliver?",
        answer:
          "Bespoke mobile and web solutions for selected clients: business-critical apps, disciplined delivery, and clear documentation. Engagements can cover full product builds or focused engineering leadership. The Advisory section describes Custom Software Development and Consulting in more detail — including anchors you can share with stakeholders.",
      },
      {
        question: "Does he work with React and React Native?",
        answer:
          "Yes. React is a primary choice for web user interfaces; React Native for cross-platform iOS and Android when a shared codebase and predictable release cadence fit the product. The stack is always tailored to the mandate — these are tools he uses regularly, not a one-size-fits-all prescription.",
      },
      {
        question:
          "How is the private practice different from the Resilience Guard mandate?",
        answer:
          "Resilience Guard is the executive employer: group technology direction, resilience, and continuity. The individual practice delivers tailor-made client applications and selected consulting under separate agreements, so scope, contracts, and delivery responsibilities stay clearly separated.",
      },
      {
        question: 'Is there a portfolio or “selected work” overview?',
        answer:
          "Yes — the Selected work section lists public apps (starting with VoiceAction) with product pages such as /voiceaction, and will grow as more products ship. Private client engagements stay under NDA; use the contact form with your constraints if you want to discuss fit.",
      },
    ],
  },

  workTeaser: {
    kicker: "Selected work",
    title: "Apps & custom deliveries",
    body: "A growing catalogue of products and bespoke builds. VoiceAction is the first public app; more titles will appear here over time. For private client work, use Contact to discuss fit under NDA.",
    privacyLabel: "Privacy policy",
    learnMoreLabel: "Learn more",
    appStoreLabel: "App Store",
    statusLabels: {
      coming_soon: "Coming soon",
      in_review: "Waiting for Review",
      live: "Available on the App Store",
    },
    apps: [
      {
        id: "voiceaction",
        name: "VoiceAction",
        tagline:
          "Voice notes to structured tasks and calendar reminders, with optional Google sync and a Pro subscription.",
        platformsLabel: "iOS",
      },
    ],
  },

  appProductPages: {
    voiceaction: {
      title: "VoiceAction — Voice notes to actionable tasks",
      metaDescription:
        "VoiceAction is an iOS app by Theofanis Markou that turns voice notes into structured tasks and reminders, with optional Google Calendar & Tasks sync and a Pro subscription. Currently waiting for App Store review.",
      kicker: "iOS app",
      headline: "VoiceAction",
      intro:
        "Speak a note. VoiceAction converts speech to text, extracts a clear summary with tasks and reminders, and can sync them to Google Calendar and Google Tasks when you choose. Built for people who think out loud and need structured follow-through.",
      statusNote:
        "Status: submitted to Apple App Store Connect and currently Waiting for Review. A public App Store download link will appear here as soon as the app is approved.",
      liveNote:
        "VoiceAction is available on the App Store for iPhone. Download below to try voice notes → tasks and optional Google sync.",
      appStoreCta: "View on the App Store",
      screenshotsKicker: "In the app",
      screenshotsExpandHint: "Click to enlarge",
      screenshotsCloseLabel: "Close screenshot",
      screenshots: [
        {
          src: "/images/voiceaction/01-sign-in.png",
          alt: "VoiceAction home screen with Sign in with Google",
          caption: "Optional Google sign-in for Calendar & Tasks",
        },
        {
          src: "/images/voiceaction/02-ready-to-record.png",
          alt: "VoiceAction ready to record with microphone button",
          caption: "Tap to record a voice note",
        },
        {
          src: "/images/voiceaction/03-task-extraction.png",
          alt: "VoiceAction AI Action Extractor showing a task from speech",
          caption: "AI extracts tasks from what you said",
        },
        {
          src: "/images/voiceaction/04-calendar-extraction.png",
          alt: "VoiceAction extracting a calendar meeting from speech",
          caption: "Meetings become calendar reminders",
        },
        {
          src: "/images/voiceaction/05-synced-calendar.png",
          alt: "VoiceAction after syncing an event to Google Calendar",
          caption: "One-tap sync to Google Calendar",
        },
        {
          src: "/images/voiceaction/06-history.png",
          alt: "VoiceAction History screen with past recordings",
          caption: "History of past voice actions",
        },
      ],
      featuresKicker: "What it does",
      features: [
        {
          title: "Voice → structured actions",
          body: "Record a voice command; on-device speech recognition produces a transcript, then AI extracts summary, tasks, and reminders you can act on.",
        },
        {
          title: "Optional Google sync",
          body: "Sign in with Google only if you want events and tasks created in Google Calendar and Google Tasks. Local workflows stay on-device without Google.",
        },
        {
          title: "Pro via Apple In-App Purchase",
          body: "VoiceAction Pro unlocks subscription features through Apple’s In-App Purchase system (entitlements managed with RevenueCat). Payment is handled by Apple.",
        },
      ],
      faqKicker: "VoiceAction FAQ",
      faqTitle: "Common questions",
      faq: [
        {
          question: "What is VoiceAction?",
          answer:
            "VoiceAction is an iOS app by Theofanis Markou that turns spoken notes into structured summaries, tasks, and reminders, with optional sync to Google Calendar and Google Tasks.",
        },
        {
          question: "Is VoiceAction available on the App Store yet?",
          answer:
            "The app has been submitted to App Store Connect and is Waiting for Review. It is not publicly downloadable until Apple approves it. This page will be updated with the App Store link when it goes live.",
        },
        {
          question: "Does VoiceAction require a subscription?",
          answer:
            "Core capture and processing workflows are designed around the product experience; Pro features are offered through Apple In-App Purchase. Payment and subscription management stay under your Apple ID.",
        },
        {
          question: "How does privacy work?",
          answer:
            "Microphone and speech permissions are required for recording. AI extraction sends the transcript you choose to process. Google Sign-In is optional. Full details are in the VoiceAction privacy policy on this site.",
        },
        {
          question: "Who builds VoiceAction?",
          answer:
            "VoiceAction is published by Theofanis Markou as part of his selective product practice, separate from his CTO mandate at Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Yes. VoiceAction is available on the Apple App Store for iOS. Use the App Store button on this page to open the product listing.",
      privacyLabel: "VoiceAction privacy policy",
      contactLabel: "Contact about this app",
      backHome: "Back to home",
    },
  },

  appPrivacyPages: {
    voiceaction: {
      title: "VoiceAction — Privacy Policy",
      metaDescription:
        "Privacy policy for the VoiceAction iOS app: microphone, speech recognition, AI processing, Google sync, and subscriptions.",
      backHome: "Back to home",
      blocks: [
        {
          heading: "Who this applies to",
          body: "This privacy policy applies to the VoiceAction mobile application for iOS (“VoiceAction”, “the App”), published by Theofanis Markou (“we”, “us”). It describes what information the App processes when you use it, and why. The separate website privacy notice at /privacy covers only theofanis-markou.vercel.app.",
        },
        {
          heading: "Information we process",
          body: "Depending on how you use VoiceAction, the App may process:\n\n• Microphone audio, while you record a voice command (device permission required).\n• Speech-to-text transcript produced on-device / via Apple speech recognition features.\n• The resulting text you choose to send for AI extraction of summary, tasks, and reminders.\n• Task completion state and history stored on your device.\n• If you sign in with Google: your Google account email and OAuth tokens needed to create events in Google Calendar and tasks in Google Tasks.\n• If you subscribe: purchase and entitlement status handled via Apple In-App Purchase and RevenueCat (Apple processes payment; we receive subscription status, not your full card details).",
        },
        {
          heading: "How we use information",
          body: "We use this information solely to provide VoiceAction’s features: converting speech to text, extracting actions with AI, showing and syncing tasks/reminders, and unlocking Pro features after a valid subscription. We do not sell personal data. We do not use your voice content for third-party advertising.",
        },
        {
          heading: "AI processing (Gemini)",
          body: "When you allow AI extraction in the App, the transcript (and related prompt context) is sent to Google’s Gemini API to generate the structured Markdown result shown in the App. The App will not send that transcript until you tap Allow on the in-app consent prompt. Do not dictate sensitive special-category data unless necessary. Processing occurs to fulfil your request to extract actions from what you said.",
        },
        {
          heading: "Google Calendar & Tasks",
          body: "Google Sign-In is optional. If you connect Google, the App requests calendar and tasks scopes only to create the events/tasks you sync. You can disconnect Google from within the App. Google’s own privacy policy applies to data held in your Google account.",
        },
        {
          heading: "Subscriptions & RevenueCat",
          body: "VoiceAction Pro is sold through Apple’s In-App Purchase system. RevenueCat helps manage entitlements and subscription status. Payment is charged to your Apple ID; Apple’s terms and privacy policy apply to the transaction.",
        },
        {
          heading: "Storage & retention",
          body: "Local notes, task check state, and sync markers are stored on your device (for example via on-device storage). You can delete individual history items in the App. Server-side AI requests are processed to return a result and are not used by us to build advertising profiles.",
        },
        {
          heading: "Your choices",
          body: "Before any transcript is sent to Google’s Gemini API, the App asks for your permission in an on-screen prompt (Allow / Don’t Allow). You can deny microphone or speech permissions in iOS Settings (core recording features will not work). You can avoid Google Sign-In and keep work local to the device. You can manage or cancel subscriptions in your Apple ID subscription settings. You may contact us to ask questions about this policy.",
        },
        {
          heading: "Contact",
          body: "Questions about VoiceAction privacy: use the contact form on https://theofanis-markou.vercel.app/ or email the address you already use for App Store / developer correspondence with Theofanis Markou.\n\nLast updated: 8 August 2026.",
        },
      ],
    },
  },

  location: {
    kicker: "Locations",
    title: "Offices & addresses",
    intro:
      "Registered head office in Switzerland (Resilience Guard GmbH) and an address in Thessaloniki, Greece. Swiss seat: company website and public register.",
    openMapsLabel: "Open in Google Maps",
    offices: [
      {
        name: "Resilience Guard GmbH — Switzerland",
        addressLines: [
          "Turmstrasse 18",
          "CH-6312 Steinhausen",
          "Switzerland",
        ],
        mapIframeTitle: "Map: Resilience Guard GmbH, Steinhausen",
      },
      {
        name: "Thessaloniki — Greece",
        addressLines: ["Ionias 71", "GR-54453 Thessaloniki", "Greece"],
        mapIframeTitle: "Map: Ionias 71, Thessaloniki",
      },
    ],
  },

  cookieConsent: {
    message:
      "This site uses strictly necessary techniques so pages load and work. If you choose “Accept analytics”, we also load Google Analytics 4 (and, when configured, Umami) to measure visits in aggregate. Advertising cookies are not used. You can change your mind anytime by clearing site data for this domain.",
    learnMore: "Privacy policy",
    accept: "Accept analytics",
    reject: "Only necessary",
  },

  privacyPage: {
    title: "Privacy & cookies",
    metaDescription:
      "How theofanis-markou.vercel.app handles data, cookies, analytics consent, and your privacy rights.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Who this applies to",
        body:
          "This notice covers the public website at theofanis-markou.vercel.app (English and German pages). It is operated as a professional profile and contact point for Theofanis Markou. Depending on how you use the site, small amounts of data are processed as described below.",
      },
      {
        heading: "Cookies and analytics",
        body:
          "Strictly necessary storage may be used so the site functions (for example remembering your cookie choice in this browser). Optional analytics run only if you click “Accept analytics”. In that case we load Google Analytics 4 with Consent Mode (analytics storage granted; ad-related signals stay denied in our configuration). If environment variables for Umami are present, that privacy-oriented analytics script may also load after the same consent. Until you accept, those analytics scripts are not loaded.",
      },
      {
        heading: "Contact form",
        body:
          "If you send a message via the contact form, the information you enter is transmitted to the site backend so the inquiry can be handled. Do not submit special categories of personal data unless necessary. Retention follows what is needed to respond and any legal obligations.",
      },
      {
        heading: "Legal basis & your rights (EEA, UK, CH)",
        body:
          "Where the GDPR or similar laws apply: necessary site operation may rely on legitimate interests or technical necessity; analytics relies on your consent, which you can withdraw by clearing local storage for this site or using browser controls. You may have rights to access, rectification, erasure, restriction, portability, and objection, and the right to lodge a complaint with a supervisory authority.",
      },
    ],
  },

  footer: {
    note:
      "Executive profile and selective custom software practice — Theofanis Markou.",
    contactLinkLabel: "Contact",
    privacyLinkLabel: "Privacy",
  },
};

// --- German ----------------------------------------------------------------

const de: Dictionary = {
  languageLabel: "DE",
  switchLabel: "Sprache wechseln",

  nav: {
    items: [
      { label: "Werdegang", href: "#journey" },
      { label: "Schwerpunkte", href: "#focus" },
      { label: "Aktuelle Mission", href: "#mission" },
      { label: "Beratung", href: "#advisory" },
      { label: "Netzwerk", href: "#network" },
      { label: "FAQ", href: "#faq" },
      { label: "Projektüberblick", href: "#selected-work" },
      { label: "Kontakt", href: "#contact" },
      { label: "Standort", href: "#location" },
    ],
    mobileExtra: [
      { label: "Softwareentwicklung", href: "#software-development" },
      { label: "Beratung", href: "#consulting" },
    ],
    toggle: "Navigation umschalten",
    scrollToTopLabel: "Zum Seitenanfang",
  },

  hero: {
    eyebrow: "Theofanis Markou · CTO bei Resilience Guard GmbH",
    kicker: "Executive-Branding-Profilseite",
    title: "Von der Programmierung zur Strategie: 30 Jahre IT-Exzellenz",
    subtitle:
      "Eine Laufbahn seit 1995, geprägt durch Softwareentwicklung, Teamführung, IT-Management und strategische Technologieverantwortung auf Führungsebene.",
    body: "Theofanis Markou verbindet fundierte technische Kompetenz mit strategischer Klarheit auf Executive-Niveau – mit Schwerpunkt auf Cyber Resilience, Business Continuity, nachhaltiger digitaler Transformation und ausgewählten hochwertigen Beratungsmandaten.",
    primaryCta: "Werdegang entdecken",
    secondaryCta: "Aktuelle Mission",
    metrics: [
      { value: "30+", label: "Jahre in der IT" },
      { value: "1995", label: "Karrierebeginn" },
      { value: "CTO", label: "Aktuelle Funktion" },
      { value: "MSc", label: "Information Technology" },
    ],
    overviewKicker: "Überblick",
    overviewBody: "Strategisches Profil in zwei Sprachen",
    currentFocusKicker: "Aktueller Fokus",
    currentFocusBody:
      "Technologieführung auf Executive-Ebene für geschäftskritische Umgebungen, ergänzt durch ausgewählte hochwertige Beratungsmandate.",
    portraitAlt: "Theofanis Markou — Porträtfoto",
    rail: {
      identityKicker: "Identität",
      positioningKicker: "Positionierung",
      positioningBody:
        "Cyber Resilience · Business Continuity · Strategisches IT-Management",
      educationKicker: "Ausbildung",
      educationBody: "MSc in Information Technology",
    },
  },

  journey: {
    kicker: "Zeitachse",
    title: "Beruflicher Werdegang",
    intro:
      "Ein Werdegang von operativer Softwareentwicklung hin zu strategischer Technologieführung, orientiert an den öffentlich sichtbaren LinkedIn-Hinweisen und biografischen Unternehmensangaben seit 1995.",
    timeline: [
      {
        year: "1995",
        title: "Softwareentwickler / Analyst",
        description:
          "Beginn der beruflichen Laufbahn in Softwareentwicklung und Analyse – als technisches Fundament für spätere Führungsverantwortung in geschäftskritischen IT-Umgebungen.",
      },
      {
        year: "2000er",
        title: "Senior Software Engineer · ICAP Group & Epsilon NET",
        description:
          "Umsetzung unternehmenskritischer Business-Anwendungen mit ausgeprägter Microsoft-Entwicklungsexpertise, einschließlich großskaliger .NET- und ASP.NET-Architektur- und Integrationsarbeit.",
      },
      {
        year: "2010er",
        title: "IT Manager · Meli Tours",
        description:
          "Verantwortung für operative IT-Führung, Infrastruktursteuerung und geschäftsnahe Technologieverantwortung in einem anspruchsvollen Destination-Management-Umfeld.",
      },
      {
        year: "Heute",
        title: "Group Technology Officer / CTO · Resilience Guard GmbH",
        description:
          "Verantwortet Forschung, Entwicklung und Technologiestrategie mit Fokus auf Cyber Resilience, Business Continuity, Infrastrukturdisziplin und Entscheidungsunterstützung auf Executive-Ebene.",
      },
    ],
    imageAlt: "Abstrakte Blueprint-Komposition zum beruflichen Werdegang",
  },

  focus: {
    kicker: "Strategischer Fokus",
    title: "Strategische Schwerpunkte",
    intro:
      "Ein Führungsprofil mit Fokus auf Resilienz, Kontrolle und Transformation in geschäftskritischen Technologielandschaften.",
    areas: [
      {
        title: "Strategische Cyber Resilience",
        body: "Entwicklung resilienter Betriebsmodelle, die Vorbereitung stärken, Risiken reduzieren und Kontinuität unter Druck unterstützen.",
      },
      {
        title: "Infrastrukturkontrolle",
        body: "Sicherstellung von Transparenz, Governance und operativer Verlässlichkeit über wesentliche Systeme und technologische Grundlagen hinweg.",
      },
      {
        title: "Digitale Transformation",
        body: "Vorantreiben von Veränderung durch pragmatische Modernisierung, Executive Alignment und disziplinierte Technologieplanung.",
      },
    ],
    imageAlt: "Abstrakte Darstellung zu Cyber Resilience und Infrastruktur",
    leadershipLensKicker: "Führungsperspektive",
    leadershipBullets: [
      "Langfristiges Denken mit klarer Verankerung im operativen Detail.",
      "Kommunikation auf Vorstandsniveau in Verbindung mit technischer Tiefe.",
      "Transformationsinitiativen mit Disziplin, Klarheit und Resilienz gesteuert.",
    ],
    educationKicker: "Ausbildung",
    educationTitle: "Akademische Grundlage",
    educationBody:
      "MSc in Information Technology, Middlesex University – als Ergänzung praktischer Führungserfahrung durch fundierte akademische Technologiekompetenz.",
  },

  mission: {
    kicker: "Aktuelle Rolle",
    title: "Aktuelle Mission bei Resilience Guard GmbH",
    body: "In seinem aktuellen CTO-Mandat bei Resilience Guard liegt der Fokus auf der Stärkung von Cyber Resilience und Business Continuity durch strategische Steuerung, operative Klarheit, Infrastrukturdisziplin und technologische Führung auf Executive-Ebene.",
    primaryCta: "resilienceguard.ch besuchen",
    secondaryCta: "Individuelle Lösungen",
    url: "https://www.resilienceguard.ch/",
    executiveKicker: "Executive-Mandat",
    executiveBody:
      "CTO-Führung bei Resilience Guard mit Fokus auf Resilienz, Kontinuität und Infrastruktur-Governance.",
    companyLabel: "Unternehmen",
    domainLabel: "Fokus",
    domainValue: "Cyber-Resilienz",
    approachLabel: "Ansatz",
    approachValue: "Technologieführung auf Executive-Ebene",
  },

  advisory: {
    kicker: "Private Beratungspraxis",
    title: "Maßgeschneiderte Digitale Lösungen & Beratung",
    intro:
      "Neben dem aktuellen CTO-Mandat führt Theofanis Markou eine selektive private Beratungspraxis mit Fokus auf maßgeschneiderte digitale Umsetzung und strategische Technologieberatung auf hohem Niveau.",
    practiceTitle: "Private Beratungspraxis",
    practiceBody:
      "Diese Beratungsarbeit ergänzt die Executive-Rolle bei Resilience Guard, ist jedoch klar davon getrennt. Sie richtet sich an Organisationen, die erfahrene technische Führung, pragmatische Entscheidungsunterstützung und präzise Umsetzung für geschäftskritische Vorhaben benötigen.",
    services: [
      {
        title: "Individuelle Softwareentwicklung",
        body: "Expertengetriebene Entwicklung maßgeschneiderter Web- und Mobile-Anwendungen, einschließlich nativer iOS- und Android-Lösungen, ausgerichtet an operativen Anforderungen und konkreten Geschäftszielen.",
      },
      {
        title: "Strategische IT-Beratung",
        body: "Hochwertige Unterstützung und fachliche Beratung für Unternehmen, die erfahrene technische Führung, Infrastrukturorientierung und disziplinierte Technologieentscheidungen benötigen.",
      },
    ],
    distinctionTitle: "Komplementäre Positionierung",
    distinctionBody:
      "Resilience Guard steht für das aktuelle Executive-Mandat in Cyber Resilience und Kontinuität. Die private Beratungspraxis erweitert diese Erfahrung auf ausgewählte Consulting-Mandate und maßgeschneiderte digitale Produktvorhaben.",
    serviceArchitectureKicker: "Leistungsarchitektur",
    serviceArchitectureSupport:
      "Selektive Mandate für digitale Umsetzung und strategische Orientierung",
    executiveMandateKicker: "Executive-Mandat",
    privatePracticeKicker: "Private Praxis",
    primaryCta: "Beratungsmandat besprechen",
    secondaryCta: "Aktuelle Mission ansehen",
    softwareDevelopmentNavLabel: "Softwareentwicklung",
    consultingNavLabel: "Beratung",
  },

  contact: {
    kicker: "Executive Kontakt",
    title: "Executive Kontakt",
    intro:
      "Ein klarer Kontaktpunkt für ausgewählte Beratungsgespräche, Anfragen zu maßgeschneiderten digitalen Lösungen, Executive-Einführungen und strategischen Austausch.",
    availability:
      "Verfügbar für gezielt ausgewählte Gespräche zu Beratung, individueller Softwareentwicklung und resilienter Technologieführung.",
    primaryCta: "Kontaktformular öffnen",
    secondaryCta: "LinkedIn öffnen",
    responseModeKicker: "Empfohlener Kontaktweg",
    viaFormKicker: "Kontakt über die Website",
    viaFormBody:
      "Bitte nutzen Sie das sichere Nachrichtenformular auf dieser Seite. Aus Gründen des Spam-Schutzes wird hier keine öffentliche E-Mail-Adresse angezeigt.",
    viaFormCta: "Zum Formular",
    form: {
      title: "Strukturierte Nachricht senden",
      intro:
        "Bitte stellen Sie sich kurz vor und skizzieren Sie den Kontext. Nachrichten werden persönlich gelesen und innerhalb weniger Werktage beantwortet.",
      nameLabel: "Vollständiger Name",
      namePlaceholder: "Ihr Name",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "name@unternehmen.com",
      companyLabel: "Organisation",
      companyPlaceholder: "Unternehmen oder Zugehörigkeit (optional)",
      messageLabel: "Nachricht",
      messagePlaceholder:
        "Beschreiben Sie kurz das Mandat, die Initiative oder die Frage, die Sie besprechen möchten.",
      submit: "Nachricht senden",
      submitting: "Wird gesendet…",
      successTitle: "Nachricht empfangen",
      successBody:
        "Vielen Dank. Ihre Nachricht wurde erfasst und wird persönlich geprüft.",
      errorTitle: "Nachricht konnte nicht gesendet werden",
      errorBody: "Bitte versuchen Sie es gleich erneut.",
      validation: {
        nameRequired: "Bitte geben Sie Ihren Namen ein.",
        emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        messageTooShort: "Die Nachricht muss mindestens 20 Zeichen umfassen.",
      },
    },
    supportKicker: "Kontaktaufnahme",
    supportBody:
      "Nutzen Sie das Kontaktformular auf dieser Seite für Anfragen oder LinkedIn für Executive Networking. Es gibt keine öffentliche E-Mail auf dieser Website.",
    linkedinLabel: "LinkedIn",
  },

  network: {
    kicker: "Professionelles Networking",
    title: "Auf LinkedIn vernetzen",
    body: "Offen für Executive Networking, strategischen Austausch und ausgewählte Gespräche über resiliente IT-Führung, maßgeschneiderte digitale Lösungen und Transformation.",
    primaryCta: "LinkedIn öffnen",
    secondaryCta: "Resilience Guard ansehen",
    panelKicker: "LinkedIn",
    panelSupport: "Networking auf C-Level und strategischer Austausch",
    panelBody:
      "Vernetzen Sie sich direkt für Executive Networking, strategischen Austausch und ausgewählte Beratungsgespräche.",
    imageAlt: "Abstrakte Darstellung eines professionellen Netzwerks",
    linkedinUrl: "https://www.linkedin.com/in/theofanismarkou/",
  },

  faq: {
    kicker: "FAQ",
    title: "Häufige Fragen",
    items: [
      {
        question: "Wer ist Theofanis Markou?",
        answer:
          "Chief Technology Officer bei der Resilience Guard GmbH, mit mehr als 30 Jahren IT-Erfahrung seit 1995. Parallel dazu betreibt er eine ausgewählte Einzelpraxis für maßgeschneiderte Mobile-Apps (iOS und Android), moderne Webanwendungen und anspruchsvolle IT-Beratung — klar abgegrenzt von Mandantenarbeit für Resilience Guard.",
      },
      {
        question: "Welche Rolle hat er derzeit bei Resilience Guard?",
        answer:
          "Als CTO verantwortet er Forschung, Entwicklung und Technologiesrichtung, stärkt Cyber Resilience und Business Continuity durch strategische Steuerung, F&E-Ausrichtung und disziplinierte Infrastruktursteuerung.",
      },
      {
        question: "Welche Sprachen bietet diese Seite?",
        answer:
          "Englisch und Deutsch. Über EN/DE in der Kopfzeile oder die URL /de für konsistente hreflang-Signalisierung.",
      },
      {
        question: "Wie kann ich ihn zu einem Projekt oder einer Beratungsanfrage erreichen?",
        answer:
          "Über das strukturierte Kontaktformular im Bereich „Kontakt“. Für Executive Networking steht auch LinkedIn zur Verfügung. Eine öffentliche E-Mail wird hier nicht veröffentlicht.",
      },
      {
        question:
          "Welche Art maßgeschneiderter Software liefert die Einzelpraxis?",
        answer:
          "Individuelle Mobile- und Weblösungen für ausgewählte Auftraggeber: geschäftskritische Anwendungen, disziplinierte Umsetzung und nachvollziehbare Dokumentation. Mandate können vollständige Produktentwicklung oder fokussierte Engineering-Führung umfassen. Der Beratungsabschnitt beschreibt Softwareentwicklung und Consulting im Detail — inklusive Anker für Abstimmung mit Stakeholdern.",
      },
      {
        question: "Arbeitet er mit React und React Native?",
        answer:
          "Ja. React ist eine bevorzugte Basis für Web-Oberflächen; React Native für plattformübergreifende iOS- und Android-Apps, wenn gemeinsame Codebasis und planbare Release-Rhythmen zum Produkt passen. Der Stack wird immer mandatsspezifisch gewählt — dies sind Werkzeuge, die er regelmäßig einsetzt, keine starre Vorgabe.",
      },
      {
        question:
          "Worin unterscheidet sich die Einzelpraxis vom Mandat bei Resilience Guard?",
        answer:
          "Resilience Guard ist der Arbeitgeber auf Führungsebene: Konzern-Technologierichtung, Resilience und Continuity. Die Einzelpraxis liefert maßgeschneiderte Kundenanwendungen und ausgewählte Beratung in separaten Vereinbarungen — damit bleiben Umfang, Verträge und Lieferverantwortung klar getrennt.",
      },
      {
        question: "Gibt es eine Portfolio- oder Projektübersicht?",
        answer:
          "Ja — der Bereich „Ausgewählte Arbeiten“ listet öffentliche Apps (beginnend mit VoiceAction) inklusive Produktseiten wie /de/voiceaction und wächst mit weiteren Produkten. Vertrauliche Kundenprojekte bleiben unter NDA; für Passungsfragen nutzen Sie das Kontaktformular mit Ihren Rahmenbedingungen.",
      },
    ],
  },

  workTeaser: {
    kicker: "Ausgewählte Arbeiten",
    title: "Apps & maßgeschneiderte Lieferungen",
    body: "Ein wachsender Katalog von Produkten und individuellen Builds. VoiceAction ist die erste öffentliche App; weitere Titel folgen. Für vertrauliche Kundenprojekte nutzen Sie bitte Kontakt unter NDA.",
    privacyLabel: "Datenschutzerklärung",
    learnMoreLabel: "Mehr erfahren",
    appStoreLabel: "App Store",
    statusLabels: {
      coming_soon: "Demnächst",
      in_review: "Wartet auf Review",
      live: "Im App Store verfügbar",
    },
    apps: [
      {
        id: "voiceaction",
        name: "VoiceAction",
        tagline:
          "Sprachnotizen zu strukturierten Aufgaben und Kalender-Erinnerungen, optional mit Google-Sync und Pro-Abo.",
        platformsLabel: "iOS",
      },
    ],
  },

  appProductPages: {
    voiceaction: {
      title: "VoiceAction — Sprachnotizen zu umsetzbaren Aufgaben",
      metaDescription:
        "VoiceAction ist eine iOS-App von Theofanis Markou: Sprachnotizen werden zu strukturierten Aufgaben und Erinnerungen, optional mit Google Kalender & Tasks sowie Pro-Abo. Derzeit Waiting for Review im App Store.",
      kicker: "iOS-App",
      headline: "VoiceAction",
      intro:
        "Sprechen Sie eine Notiz. VoiceAction wandelt Sprache in Text um, extrahiert Zusammenfassung, Aufgaben und Erinnerungen und kann sie — wenn Sie möchten — mit Google Kalender und Google Tasks synchronisieren. Für Menschen, die laut denken und strukturierte Nachverfolgung brauchen.",
      statusNote:
        "Status: bei Apple App Store Connect eingereicht und derzeit Waiting for Review. Ein öffentlicher App-Store-Download-Link erscheint hier, sobald die App freigegeben ist.",
      liveNote:
        "VoiceAction ist im App Store für iPhone verfügbar. Laden Sie die App unten herunter, um Sprachnotizen → Aufgaben und optionalen Google-Sync zu nutzen.",
      appStoreCta: "Im App Store ansehen",
      screenshotsKicker: "In der App",
      screenshotsExpandHint: "Zum Vergrößern tippen",
      screenshotsCloseLabel: "Screenshot schließen",
      screenshots: [
        {
          src: "/images/voiceaction/01-sign-in.png",
          alt: "VoiceAction-Startbildschirm mit Google-Anmeldung",
          caption: "Optionale Google-Anmeldung für Kalender & Tasks",
        },
        {
          src: "/images/voiceaction/02-ready-to-record.png",
          alt: "VoiceAction bereit zur Aufnahme mit Mikrofon-Taste",
          caption: "Tippen zum Aufnehmen einer Sprachnotiz",
        },
        {
          src: "/images/voiceaction/03-task-extraction.png",
          alt: "VoiceAction AI Action Extractor mit einer Aufgabe aus Sprache",
          caption: "KI extrahiert Aufgaben aus dem Gesagten",
        },
        {
          src: "/images/voiceaction/04-calendar-extraction.png",
          alt: "VoiceAction extrahiert einen Kalendertermin aus Sprache",
          caption: "Termine werden zu Kalender-Erinnerungen",
        },
        {
          src: "/images/voiceaction/05-synced-calendar.png",
          alt: "VoiceAction nach Sync eines Events in Google Kalender",
          caption: "Mit einem Tipp nach Google Kalender",
        },
        {
          src: "/images/voiceaction/06-history.png",
          alt: "VoiceAction Verlauf mit früheren Aufnahmen",
          caption: "Verlauf früherer Voice Actions",
        },
      ],
      featuresKicker: "Funktionen",
      features: [
        {
          title: "Stimme → strukturierte Aktionen",
          body: "Nehmen Sie einen Sprachbefehl auf; die Spracherkennung erzeugt ein Transkript, die KI extrahiert Zusammenfassung, Aufgaben und Erinnerungen.",
        },
        {
          title: "Optionaler Google-Sync",
          body: "Melden Sie sich nur bei Bedarf mit Google an, um Ereignisse und Aufgaben in Google Kalender und Google Tasks anzulegen. Ohne Google bleibt der Workflow lokal auf dem Gerät.",
        },
        {
          title: "Pro über Apple In-App-Kauf",
          body: "VoiceAction Pro schaltet Abo-Funktionen über Apples In-App-Käufe frei (Entitlements u. a. mit RevenueCat). Die Zahlung läuft über Apple.",
        },
      ],
      faqKicker: "VoiceAction FAQ",
      faqTitle: "Häufige Fragen",
      faq: [
        {
          question: "Was ist VoiceAction?",
          answer:
            "VoiceAction ist eine iOS-App von Theofanis Markou, die gesprochene Notizen in strukturierte Zusammenfassungen, Aufgaben und Erinnerungen umwandelt — optional mit Sync zu Google Kalender und Google Tasks.",
        },
        {
          question: "Ist VoiceAction schon im App Store verfügbar?",
          answer:
            "Die App wurde bei App Store Connect eingereicht und wartet auf Review. Bis zur Freigabe durch Apple ist sie nicht öffentlich downloadbar. Diese Seite wird mit dem App-Store-Link aktualisiert, sobald die App live ist.",
        },
        {
          question: "Braucht VoiceAction ein Abonnement?",
          answer:
            "Die Kernfunktionen folgen dem Produktkonzept; Pro-Funktionen laufen über Apple In-App-Kauf. Zahlung und Abo-Verwaltung bleiben unter Ihrer Apple-ID.",
        },
        {
          question: "Wie funktioniert der Datenschutz?",
          answer:
            "Mikrofon- und Sprachberechtigungen sind für Aufnahmen nötig. Die KI-Extraktion verarbeitet das Transkript, das Sie absenden. Google-Anmeldung ist optional. Details stehen in der VoiceAction-Datenschutzerklärung auf dieser Website.",
        },
        {
          question: "Wer entwickelt VoiceAction?",
          answer:
            "VoiceAction wird von Theofanis Markou im Rahmen seiner selektiven Produktpraxis veröffentlicht — getrennt vom CTO-Mandat bei der Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Ja. VoiceAction ist im Apple App Store für iOS verfügbar. Nutzen Sie den App-Store-Button auf dieser Seite, um den Eintrag zu öffnen.",
      privacyLabel: "Datenschutzerklärung VoiceAction",
      contactLabel: "Kontakt zur App",
      backHome: "Zur Startseite",
    },
  },

  appPrivacyPages: {
    voiceaction: {
      title: "VoiceAction — Datenschutzerklärung",
      metaDescription:
        "Datenschutzerklärung der VoiceAction-iOS-App: Mikrofon, Spracherkennung, KI-Verarbeitung, Google-Sync und Abonnements.",
      backHome: "Zur Startseite",
      blocks: [
        {
          heading: "Geltungsbereich",
          body: "Diese Datenschutzerklärung gilt für die mobile iOS-Anwendung VoiceAction („VoiceAction“, „die App“), herausgegeben von Theofanis Markou („wir“, „uns“). Sie beschreibt, welche Informationen die App bei der Nutzung verarbeitet und warum. Der separate Website-Hinweis unter /de/privacy betrifft nur theofanis-markou.vercel.app.",
        },
        {
          heading: "Welche Informationen wir verarbeiten",
          body: "Je nach Nutzung kann VoiceAction verarbeiten:\n\n• Mikrofonaudio während einer Aufnahme (Geräteberechtigung erforderlich).\n• Speech-to-Text-Transkript über Apple-Spracherkennung.\n• Den Text, den Sie zur KI-Extraktion von Zusammenfassung, Aufgaben und Erinnerungen senden.\n• Aufgabenstatus und Verlauf auf Ihrem Gerät.\n• Bei Google-Anmeldung: E-Mail und OAuth-Tokens zum Anlegen von Google-Kalender-Ereignissen und Google-Tasks.\n• Bei Abo: Kauf- und Berechtigungsstatus über Apple In-App Purchase und RevenueCat (Zahlung über Apple; wir erhalten den Abo-Status, nicht Ihre vollständigen Kartendaten).",
        },
        {
          heading: "Zwecke der Verarbeitung",
          body: "Wir verwenden diese Informationen ausschließlich zur Bereitstellung der App-Funktionen: Sprache zu Text, Extraktion von Aktionen per KI, Anzeige und Sync von Aufgaben/Erinnerungen sowie Freischaltung von Pro nach gültigem Abo. Wir verkaufen keine personenbezogenen Daten und nutzen Ihre Sprachinhalte nicht für Werbung Dritter.",
        },
        {
          heading: "KI-Verarbeitung (Gemini)",
          body: "Wenn Sie in der App die KI-Extraktion erlauben, wird das Transkript (und zugehöriger Prompt-Kontext) an die Gemini-API von Google gesendet, um das strukturierte Ergebnis zu erzeugen. Ohne Tippen auf „Allow“/Erlauben in der Einwilligungsabfrage wird kein Transkript gesendet. Diktieren Sie keine besonders sensiblen Daten, sofern nicht erforderlich. Die Verarbeitung erfolgt zur Ausführung Ihrer Anfrage.",
        },
        {
          heading: "Google Kalender & Tasks",
          body: "Google-Anmeldung ist optional. Bei Verbindung fordert die App nur Kalender- und Tasks-Berechtigungen an, um von Ihnen ausgelöste Syncs auszuführen. Die Trennung ist in der App möglich. Für Daten in Ihrem Google-Konto gilt die Datenschutzerklärung von Google.",
        },
        {
          heading: "Abonnements & RevenueCat",
          body: "VoiceAction Pro wird über Apples In-App-Käufe verkauft. RevenueCat unterstützt Entitlements und Abo-Status. Die Zahlung erfolgt über Ihre Apple-ID; es gelten die Bedingungen und Datenschutzregeln von Apple.",
        },
        {
          heading: "Speicherung & Aufbewahrung",
          body: "Lokale Notizen, Häkchen-Status und Sync-Marker werden auf dem Gerät gespeichert. Einzelne Verlaufseinträge können in der App gelöscht werden. KI-Anfragen werden verarbeitet, um ein Ergebnis zurückzugeben, und von uns nicht für Werbeprofile genutzt.",
        },
        {
          heading: "Ihre Wahlmöglichkeiten",
          body: "Bevor ein Transkript an die Gemini-API von Google gesendet wird, fragt die App in einem Dialog um Ihre Erlaubnis (Allow / Don’t Allow). Mikrofon- oder Sprachberechtigungen können Sie in den iOS-Einstellungen verweigern. Google-Anmeldung ist optional. Abos verwalten oder kündigen Sie in den Apple-ID-Abo-Einstellungen. Bei Fragen zu dieser Erklärung können Sie uns kontaktieren.",
        },
        {
          heading: "Kontakt",
          body: "Fragen zum Datenschutz von VoiceAction: Kontaktformular auf https://theofanis-markou.vercel.app/de oder die Korrespondenzadresse, die Sie bereits für App Store / Entwicklerkommunikation mit Theofanis Markou nutzen.\n\nZuletzt aktualisiert: 8. August 2026.",
        },
      ],
    },
  },

  location: {
    kicker: "Standorte",
    title: "Büros & Adressen",
    intro:
      "Eingetragener Firmensitz in der Schweiz (Resilience Guard GmbH) und eine Adresse in Thessaloniki, Griechenland. Schweizer Sitz: Unternehmenswebsite und Handelsregister.",
    openMapsLabel: "In Google Maps öffnen",
    offices: [
      {
        name: "Resilience Guard GmbH — Schweiz",
        addressLines: [
          "Turmstrasse 18",
          "CH-6312 Steinhausen",
          "Schweiz",
        ],
        mapIframeTitle: "Karte: Resilience Guard GmbH, Steinhausen",
      },
      {
        name: "Thessaloniki — Griechenland",
        addressLines: ["Ionias 71", "GR-54453 Thessaloniki", "Griechenland"],
        mapIframeTitle: "Karte: Ionias 71, Thessaloniki",
      },
    ],
  },

  cookieConsent: {
    message:
      "Diese Website nutzt technisch notwendige Funktionen, damit die Seiten laden und funktionieren. Wenn Sie „Analytik akzeptieren“ wählen, laden wir zusätzlich Google Analytics 4 (und bei Konfiguration Umami), um Besuche aggregiert auszuwerten. Werbe-Cookies werden nicht eingesetzt. Sie können Ihre Entscheidung jederzeit ändern, indem Sie die Website-Daten für diese Domain im Browser löschen.",
    learnMore: "Datenschutzerklärung",
    accept: "Analytik akzeptieren",
    reject: "Nur notwendig",
  },

  privacyPage: {
    title: "Datenschutz & Cookies",
    metaDescription:
      "Informationen zu Datenverarbeitung, Cookies, Einwilligung zur Analytik und Ihren Rechten auf theofanis-markou.vercel.app.",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Geltungsbereich",
        body:
          "Diese Hinweise gelten für die öffentliche Website theofanis-markou.vercel.app (englische und deutsche Seiten). Sie dient als professionelles Profil und Kontaktpunkt für Theofanis Markou. Je nach Nutzung verarbeiten wir die unten beschriebenen Daten in geringem Umfang.",
      },
      {
        heading: "Cookies und Analytik",
        body:
          "Technisch notwendige Speicherung kann erforderlich sein, damit die Website funktioniert (z. B. Merken Ihrer Cookie-Entscheidung in diesem Browser). Optionale Analytik wird nur geladen, wenn Sie „Analytik akzeptieren“ wählen. Dann laden wir Google Analytics 4 mit Consent Mode (Analytik-Speicherung erlaubt; werberelevante Signale bleiben in unserer Konfiguration abgelehnt). Sind Umami-Umgebungsvariablen gesetzt, kann nach derselben Einwilligung auch dieses datenschutzorientierte Analytik-Skript geladen werden. Bis zur Einwilligung werden diese Analytik-Skripte nicht geladen.",
      },
      {
        heading: "Kontaktformular",
        body:
          "Wenn Sie über das Kontaktformular eine Nachricht senden, werden die von Ihnen eingegebenen Informationen an das Backend dieser Website übermittelt, damit die Anfrage bearbeitet werden kann. Bitte übermitteln Sie keine besonderen Kategorien personenbezogener Daten, es sei denn, dies ist erforderlich. Die Aufbewahrung richtet sich nach dem Erfordernis der Beantwortung und gesetzlichen Pflichten.",
      },
      {
        heading: "Rechtsgrundlagen & Ihre Rechte (EWR, UK, CH)",
        body:
          "Soweit DSGVO oder vergleichbare Regeln gelten: Der notwendige Betrieb der Website kann auf berechtigtes Interesse oder technische Notwendigkeit gestützt sein; Analytik stützt sich auf Ihre Einwilligung, die Sie widerrufen können, indem Sie lokale Speicherdaten dieser Website löschen oder Browserfunktionen nutzen. Ihnen können Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde zustehen.",
      },
    ],
  },

  footer: {
    note:
      "Executive-Profil und ausgewählte Software-Praxis — Theofanis Markou.",
    contactLinkLabel: "Kontakt",
    privacyLinkLabel: "Datenschutz",
  },
};

export const content: Readonly<Record<Language, Dictionary>> = { en, de };
