/**
 * Single source of truth for all bilingual (EN/DE) copy on the landing page.
 * Every section component reads from here via the `useDictionary` hook —
 * no inline strings elsewhere. Keys are grouped by section to keep
 * translators and reviewers aligned with the visible page structure.
 */

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

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
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
  };

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

  readonly footer: {
    readonly note: string;
    readonly contactLinkLabel: string;
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
          "A dedicated page with representative engagements is planned for this site. Until it is live, use the contact form with your constraints (platforms, compliance, timeline) to discuss fit and relevant experience.",
      },
    ],
  },

  workTeaser: {
    kicker: "Selected work",
    title: "Project overview — coming to this site",
    body: "A structured page summarising custom web and mobile deliveries (with appropriate confidentiality) is in preparation. If you are evaluating a mandate now, the Contact form is the fastest way to align on scope and see whether the practice is the right fit.",
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

  footer: {
    note:
      "Executive profile and selective custom software practice — Theofanis Markou.",
    contactLinkLabel: "Contact",
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
          "Eine eigene Seite mit repräsentativen Mandaten ist für diese Website vorgesehen. Bis sie live ist, nutzen Sie das Kontaktformular mit Ihren Rahmenbedingungen (Plattformen, Compliance, Zeitplan), um Passung und passende Erfahrung zu klären.",
      },
    ],
  },

  workTeaser: {
    kicker: "Ausgewählte Arbeiten",
    title: "Projektüberblick — demnächst auf dieser Seite",
    body: "Eine strukturierte Übersicht über maßgeschneiderte Web- und Mobile-Lieferungen (mit angemessenem Vertraulichkeitsrahmen) ist in Vorbereitung. Für eine aktuelle Mandatsprüfung ist das Kontaktformular der schnellste Weg, Umfang abzugleichen und die Passung der Praxis zu klären.",
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

  footer: {
    note:
      "Executive-Profil und ausgewählte Software-Praxis — Theofanis Markou.",
    contactLinkLabel: "Kontakt",
  },
};

export const content: Readonly<Record<Language, Dictionary>> = { en, de };
