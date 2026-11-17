/**
 * Product / privacy / terms copy for apps added after Survival Plan + VoiceAction.
 * Merged into siteContent EN/DE dictionaries.
 *
 */
import type {
  AppPrivacyPageCopy,
  AppProductPageCopy,
} from "@/lib/appContentTypes";

function productShell(
  partial: Omit<
    AppProductPageCopy,
    | "statusNote"
    | "appStoreCta"
    | "screenshotsKicker"
    | "screenshotsExpandHint"
    | "screenshotsCloseLabel"
    | "screenshots"
    | "featuresKicker"
    | "faqKicker"
    | "faqTitle"
    | "privacyLabel"
    | "termsLabel"
    | "contactLabel"
    | "backHome"
  > &
    Partial<
      Pick<
        AppProductPageCopy,
        | "statusNote"
        | "screenshots"
        | "screenshotsKicker"
        | "featuresKicker"
        | "faqKicker"
        | "faqTitle"
        | "privacyLabel"
        | "termsLabel"
        | "contactLabel"
        | "backHome"
        | "appStoreCta"
        | "screenshotsExpandHint"
        | "screenshotsCloseLabel"
      >
    >,
  name: string,
): AppProductPageCopy {
  return {
    statusNote: "",
    appStoreCta: "View on the App Store",
    screenshotsKicker: "In the app",
    screenshotsExpandHint: "Click to enlarge",
    screenshotsCloseLabel: "Close screenshot",
    screenshots: [],
    featuresKicker: "What it does",
    faqKicker: `${name} FAQ`,
    faqTitle: "Common questions",
    privacyLabel: `${name} privacy policy`,
    termsLabel: `${name} Terms of Use`,
    contactLabel: "Contact about this app",
    backHome: "Back to home",
    ...partial,
  };
}

function productShellDe(
  partial: Omit<
    AppProductPageCopy,
    | "statusNote"
    | "appStoreCta"
    | "screenshotsKicker"
    | "screenshotsExpandHint"
    | "screenshotsCloseLabel"
    | "screenshots"
    | "featuresKicker"
    | "faqKicker"
    | "faqTitle"
    | "privacyLabel"
    | "termsLabel"
    | "contactLabel"
    | "backHome"
  > &
    Partial<
      Pick<
        AppProductPageCopy,
        | "statusNote"
        | "screenshots"
        | "screenshotsKicker"
        | "featuresKicker"
        | "faqKicker"
        | "faqTitle"
        | "privacyLabel"
        | "termsLabel"
        | "contactLabel"
        | "backHome"
        | "appStoreCta"
        | "screenshotsExpandHint"
        | "screenshotsCloseLabel"
      >
    >,
  name: string,
): AppProductPageCopy {
  return {
    statusNote: "",
    appStoreCta: "Im App Store ansehen",
    screenshotsKicker: "In der App",
    screenshotsExpandHint: "Zum Vergrößern tippen",
    screenshotsCloseLabel: "Screenshot schließen",
    screenshots: [],
    featuresKicker: "Was sie leistet",
    faqKicker: `${name} FAQ`,
    faqTitle: "Häufige Fragen",
    privacyLabel: `${name} Datenschutzerklärung`,
    termsLabel: `${name} Nutzungsbedingungen`,
    contactLabel: "Kontakt zu dieser App",
    backHome: "Zur Startseite",
    ...partial,
  };
}

export const extraAppProductPagesEn = {
  assetflow: productShell(
    {
      title: "AssetFlow Manager — Track assets & inventory",
      metaDescription:
        "AssetFlow Manager by Theofanis Markou: iOS & Android asset inventory with categories, locations, condition, photos, QR codes, and analytics. Available via Contact.",
      kicker: "iOS & Android",
      headline: "AssetFlow Manager",
      intro:
        "A mobile asset inventory for personal and business equipment — categories, locations, condition, purchase and value data, photos, and QR codes — with a dashboard that keeps the portfolio readable.",
      liveNote:
        "AssetFlow Manager is available on the public stores. Download below to manage assets, locations, and QR workflows.",
      screenshots: [
        {
          src: "/images/assetflow/01-login.png",
          alt: "AssetFlow Manager login screen",
          caption: "Sign in",
        },
        {
          src: "/images/assetflow/02-dashboard.png",
          alt: "AssetFlow Manager dashboard overview",
          caption: "Dashboard",
        },
        {
          src: "/images/assetflow/03-assets.png",
          alt: "AssetFlow Manager asset list",
          caption: "Asset management",
        },
        {
          src: "/images/assetflow/04-history.png",
          alt: "AssetFlow Manager asset history",
          caption: "Asset history",
        },
        {
          src: "/images/assetflow/05-qr.png",
          alt: "AssetFlow Manager QR code generator",
          caption: "QR code generator",
        },
        {
          src: "/images/assetflow/06-employees.png",
          alt: "AssetFlow Manager employee management",
          caption: "Employee management",
        },
        {
          src: "/images/assetflow/07-notifications.png",
          alt: "AssetFlow Manager notifications",
          caption: "Notifications",
        },
        {
          src: "/images/assetflow/08-reports.png",
          alt: "AssetFlow Manager reports and analytics",
          caption: "Reports & analytics",
        },
      ],
      features: [
        {
          title: "Assets end to end",
          body: "Add, edit, and retire assets; attach categories, locations, condition, purchase details, and current values; store photos and generate or scan QR codes.",
        },
        {
          title: "Dashboard & organisation",
          body: "See totals and condition at a glance. Colour-coded categories and location hierarchies keep large inventories navigable.",
        },
        {
          title: "Account-backed sync",
          body: "Sign-in, verification, and secure sessions via the product backend so teams can work from a shared asset source of truth.",
        },
      ],
      faq: [
        {
          question: "What is AssetFlow Manager?",
          answer:
            "AssetFlow Manager is an iOS and Android app by Theofanis Markou for tracking personal and business assets — inventory, categories, locations, photos, QR codes, and analytics.",
        },
        {
          question: "Is AssetFlow Manager available on the App Store yet?",
          answer:
            "A public store download link will appear here when published. The product is available now — use Contact to discuss licensing, purchase, or a private rollout for your organisation.",
        },
        {
          question: "Who is it for?",
          answer:
            "Individuals and teams that need a structured mobile inventory of equipment and assets, not a full ERP warehouse system.",
        },
        {
          question: "Who builds AssetFlow Manager?",
          answer:
            "Published by Theofanis Markou as part of his selective product practice, separate from his CTO mandate at Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Yes. AssetFlow Manager is available on the public app stores. Use the download button on this page.",
    },
    "AssetFlow Manager",
  ),
  supplydine: productShell(
    {
      title: "SupplyDine — Hospitality B2B ordering",
      metaDescription:
        "SupplyDine by Theofanis Markou: iOS & Android B2B marketplace connecting hospitality buyers with suppliers for catalogues and orders. Available via Contact.",
      kicker: "iOS & Android",
      headline: "SupplyDine",
      intro:
        "A B2B platform for hospitality: restaurants and related buyers browse supplier catalogues, place orders, and manage profiles — while suppliers publish assortments and fulfil demand. Built for ordering workflows, not warehouse WMS or payment clearing between parties.",
      liveNote:
        "SupplyDine is available on the public stores. Download below to connect buyers and suppliers.",
      screenshots: [
        {
          src: "/images/supplydine/01-buyer-home.png",
          alt: "SupplyDine buyer home with quick reorder and actions",
          caption: "Buyer home",
        },
        {
          src: "/images/supplydine/02-suppliers.png",
          alt: "SupplyDine suppliers search",
          caption: "Suppliers",
        },
        {
          src: "/images/supplydine/03-orders.png",
          alt: "SupplyDine buyer orders list",
          caption: "Orders",
        },
        {
          src: "/images/supplydine/04-favorites.png",
          alt: "SupplyDine favorites for suppliers and products",
          caption: "Favorites",
        },
        {
          src: "/images/supplydine/05-buyer-account.png",
          alt: "SupplyDine buyer account and language settings",
          caption: "Buyer account",
        },
        {
          src: "/images/supplydine/06-supplier-dashboard.png",
          alt: "SupplyDine supplier day summary dashboard",
          caption: "Supplier dashboard",
        },
        {
          src: "/images/supplydine/07-supplier-orders.png",
          alt: "SupplyDine supplier orders with Pro history",
          caption: "Supplier orders",
        },
        {
          src: "/images/supplydine/08-catalog.png",
          alt: "SupplyDine supplier product catalog",
          caption: "Catalog",
        },
        {
          src: "/images/supplydine/09-supplier-account.png",
          alt: "SupplyDine supplier account and language",
          caption: "Supplier account",
        },
      ],
      features: [
        {
          title: "Buyers & suppliers",
          body: "Role-based accounts for hospitality buyers and suppliers: catalogues, order placement, status tracking, and profile management.",
        },
        {
          title: "Orders without pretending to be WMS",
          body: "Focused on catalogue browsing and order flow. Availability and delivery terms remain between the trading parties; the app is not a warehouse management system.",
        },
        {
          title: "Pro plan (when enabled)",
          body: "Optional Pro entitlements for higher limits and premium features, sold through store In-App Purchase when the public listing is live.",
        },
      ],
      faq: [
        {
          question: "What is SupplyDine?",
          answer:
            "SupplyDine is an iOS and Android B2B app by Theofanis Markou that connects hospitality buyers with suppliers for catalogues and orders.",
        },
        {
          question: "Is SupplyDine available on the App Store yet?",
          answer:
            "A public store download link will appear here when published. The product is available now — use Contact to discuss licensing, purchase, or a private rollout for your organisation.",
        },
        {
          question: "Does SupplyDine process payments between buyer and supplier?",
          answer:
            "No. SupplyDine supports catalogue and order workflows. Commercial settlement between buyer and supplier stays outside the app unless a specific deployment adds that capability.",
        },
        {
          question: "Who builds SupplyDine?",
          answer:
            "Published by Theofanis Markou as part of his selective product practice, separate from his CTO mandate at Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Yes. SupplyDine is available on the public app stores. Use the download button on this page.",
    },
    "SupplyDine",
  ),
  dentalpractice: productShell(
    {
      title: "Dental Practice — Small clinic operations",
      metaDescription:
        "Dental Practice Management by Theofanis Markou: iOS & Android offline-first app for small dental clinics — patients, appointments, and practice notes. Available via Contact.",
      kicker: "iOS & Android",
      headline: "Dental Practice",
      intro:
        "An offline-first practice companion for small dental clinics (typically a few staff): patients, appointments, and day-to-day operational notes on phone or tablet — without pretending to replace a full hospital HIS.",
      liveNote:
        "Dental Practice is available on the public stores. Download below to run the clinic workflow on iOS and Android.",
      screenshots: [
        {
          src: "/images/dental-practice/01-today.png",
          alt: "Dental Practice Today clinic flow board",
          caption: "Today · Clinic flow",
        },
        {
          src: "/images/dental-practice/02-appointments.png",
          alt: "Dental Practice appointments day view",
          caption: "Appointments",
        },
        {
          src: "/images/dental-practice/03-new-appointment.png",
          alt: "Dental Practice new appointment form",
          caption: "New appointment",
        },
        {
          src: "/images/dental-practice/04-patient-details.png",
          alt: "Dental Practice patient details",
          caption: "Patient details",
        },
        {
          src: "/images/dental-practice/05-dental-chart.png",
          alt: "Dental Practice FDI dental chart",
          caption: "Dental chart",
        },
        {
          src: "/images/dental-practice/06-invoices.png",
          alt: "Dental Practice invoices and receipts",
          caption: "Invoices & receipts",
        },
        {
          src: "/images/dental-practice/07-cash-register.png",
          alt: "Dental Practice cash register",
          caption: "Cash register",
        },
        {
          src: "/images/dental-practice/08-reports.png",
          alt: "Dental Practice monthly reports",
          caption: "Reports",
        },
        {
          src: "/images/dental-practice/09-settings.png",
          alt: "Dental Practice settings and language",
          caption: "Settings",
        },
      ],
      features: [
        {
          title: "Patients & appointments",
          body: "Keep the clinic schedule and patient records organised for a small team working on shared devices.",
        },
        {
          title: "Offline-first",
          body: "Core data stays on device (SQLite) so the practice can keep working when connectivity is poor — designed for real clinic floors, not demo Wi-Fi only.",
        },
        {
          title: "Right-sized scope",
          body: "Built for 2–3 staff practices. It is an operational aid, not a substitute for regulated medical records systems where those are legally required.",
        },
      ],
      faq: [
        {
          question: "What is Dental Practice?",
          answer:
            "Dental Practice is an iOS and Android app by Theofanis Markou for small dental clinic operations — patients, appointments, and offline-first practice workflows.",
        },
        {
          question: "Is Dental Practice available on the App Store yet?",
          answer:
            "A public store download link will appear here when published. The product is available now — use Contact to discuss licensing, purchase, or a private rollout for your organisation.",
        },
        {
          question: "Is this a hospital information system?",
          answer:
            "No. It is a compact practice tool for small clinics. Where regulated medical-record systems are required, use those as the system of record.",
        },
        {
          question: "Who builds Dental Practice?",
          answer:
            "Published by Theofanis Markou as part of his selective product practice, separate from his CTO mandate at Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Yes. Dental Practice is available on the public app stores. Use the download button on this page.",
    },
    "Dental Practice",
  ),
} as const satisfies Record<string, AppProductPageCopy>;

export const extraAppProductPagesDe = {
  assetflow: productShellDe(
    {
      title: "AssetFlow Manager — Assets & Inventar",
      metaDescription:
        "AssetFlow Manager von Theofanis Markou: iOS- & Android-Inventar mit Kategorien, Standorten, Zustand, Fotos, QR-Codes und Analytics. Verfügbar über Kontakt.",
      kicker: "iOS & Android",
      headline: "AssetFlow Manager",
      intro:
        "Mobiles Asset-Inventar für persönliche und geschäftliche Ausrüstung — Kategorien, Standorte, Zustand, Kauf- und Wertdaten, Fotos und QR-Codes — mit einem Dashboard, das den Bestand lesbar hält.",
      liveNote:
        "AssetFlow Manager ist in den öffentlichen Stores verfügbar. Laden Sie die App unten herunter, um Assets, Standorte und QR-Workflows zu verwalten.",
      screenshots: [
        {
          src: "/images/assetflow/01-login.png",
          alt: "AssetFlow Manager Anmeldebildschirm",
          caption: "Anmeldung",
        },
        {
          src: "/images/assetflow/02-dashboard.png",
          alt: "AssetFlow Manager Dashboard",
          caption: "Dashboard",
        },
        {
          src: "/images/assetflow/03-assets.png",
          alt: "AssetFlow Manager Asset-Liste",
          caption: "Asset-Verwaltung",
        },
        {
          src: "/images/assetflow/04-history.png",
          alt: "AssetFlow Manager Asset-Historie",
          caption: "Asset-Historie",
        },
        {
          src: "/images/assetflow/05-qr.png",
          alt: "AssetFlow Manager QR-Code-Generator",
          caption: "QR-Code-Generator",
        },
        {
          src: "/images/assetflow/06-employees.png",
          alt: "AssetFlow Manager Mitarbeiterverwaltung",
          caption: "Mitarbeiterverwaltung",
        },
        {
          src: "/images/assetflow/07-notifications.png",
          alt: "AssetFlow Manager Benachrichtigungen",
          caption: "Benachrichtigungen",
        },
        {
          src: "/images/assetflow/08-reports.png",
          alt: "AssetFlow Manager Berichte und Analytics",
          caption: "Berichte & Analytics",
        },
      ],
      features: [
        {
          title: "Assets durchgängig",
          body: "Assets anlegen, bearbeiten und ausmustern; Kategorien, Standorte, Zustand, Kaufdaten und aktuelle Werte pflegen; Fotos speichern sowie QR-Codes erzeugen oder scannen.",
        },
        {
          title: "Dashboard & Organisation",
          body: "Summen und Zustand auf einen Blick. Farbige Kategorien und Standort-Hierarchien halten große Inventare navigierbar.",
        },
        {
          title: "Kontobasiertes Sync",
          body: "Anmeldung, Verifikation und sichere Sessions über das Produkt-Backend, damit Teams aus einer gemeinsamen Asset-Quelle arbeiten.",
        },
      ],
      faq: [
        {
          question: "Was ist AssetFlow Manager?",
          answer:
            "AssetFlow Manager ist eine iOS- und Android-App von Theofanis Markou zur Verwaltung persönlicher und geschäftlicher Assets — Inventar, Kategorien, Standorte, Fotos, QR-Codes und Analytics.",
        },
        {
          question: "Ist AssetFlow Manager schon im App Store verfügbar?",
          answer:
            "Ein öffentlicher Store-Download-Link erscheint hier nach der Veröffentlichung. Das Produkt ist jetzt verfügbar — nutzen Sie Kontakt für Lizenz, Kauf oder privaten Rollout.",
        },
        {
          question: "Für wen ist die App gedacht?",
          answer:
            "Für Einzelpersonen und Teams, die ein strukturiertes mobiles Inventar brauchen — kein vollständiges ERP-/WMS-System.",
        },
        {
          question: "Wer entwickelt AssetFlow Manager?",
          answer:
            "Veröffentlicht von Theofanis Markou im Rahmen seiner selektiven Produktpraxis, getrennt von seinem CTO-Mandat bei der Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Ja. AssetFlow Manager ist in den öffentlichen App-Stores verfügbar. Nutzen Sie den Download-Button auf dieser Seite.",
    },
    "AssetFlow Manager",
  ),
  supplydine: productShellDe(
    {
      title: "SupplyDine — B2B-Bestellungen für Gastronomie",
      metaDescription:
        "SupplyDine von Theofanis Markou: iOS- & Android-B2B-Marktplatz für Gastronomie-Einkäufer und Lieferanten. Verfügbar über Kontakt.",
      kicker: "iOS & Android",
      headline: "SupplyDine",
      intro:
        "Eine B2B-Plattform für die Gastronomie: Einkäufer browsen Lieferantenkataloge, platzieren Bestellungen und pflegen Profile — Lieferanten veröffentlichen Sortimente und bedienen Nachfrage. Für Bestellworkflows gebaut, nicht als WMS und nicht als Zahlungsabwicklung zwischen den Parteien.",
      liveNote:
        "SupplyDine ist in den öffentlichen Stores verfügbar. Laden Sie die App unten herunter, um Einkäufer und Lieferanten zu verbinden.",
      screenshots: [
        {
          src: "/images/supplydine/01-buyer-home.png",
          alt: "SupplyDine Buyer-Home mit Quick Reorder",
          caption: "Buyer-Home",
        },
        {
          src: "/images/supplydine/02-suppliers.png",
          alt: "SupplyDine Lieferantensuche",
          caption: "Lieferanten",
        },
        {
          src: "/images/supplydine/03-orders.png",
          alt: "SupplyDine Bestellungen für Einkäufer",
          caption: "Bestellungen",
        },
        {
          src: "/images/supplydine/04-favorites.png",
          alt: "SupplyDine Favoriten",
          caption: "Favoriten",
        },
        {
          src: "/images/supplydine/05-buyer-account.png",
          alt: "SupplyDine Buyer-Konto und Sprache",
          caption: "Buyer-Konto",
        },
        {
          src: "/images/supplydine/06-supplier-dashboard.png",
          alt: "SupplyDine Lieferanten-Dashboard",
          caption: "Lieferanten-Dashboard",
        },
        {
          src: "/images/supplydine/07-supplier-orders.png",
          alt: "SupplyDine Bestellungen für Lieferanten",
          caption: "Lieferanten-Bestellungen",
        },
        {
          src: "/images/supplydine/08-catalog.png",
          alt: "SupplyDine Produktkatalog",
          caption: "Katalog",
        },
        {
          src: "/images/supplydine/09-supplier-account.png",
          alt: "SupplyDine Lieferanten-Konto und Sprache",
          caption: "Lieferanten-Konto",
        },
      ],
      features: [
        {
          title: "Einkäufer & Lieferanten",
          body: "Rollenbasierte Konten: Kataloge, Bestellungen, Status und Profilverwaltung für beide Seiten.",
        },
        {
          title: "Bestellungen ohne WMS-Anspruch",
          body: "Fokus auf Katalog und Bestellfluss. Verfügbarkeit und Lieferung bleiben zwischen den Handelspartnern; die App ist kein Warehouse-Management-System.",
        },
        {
          title: "Pro-Plan (wenn aktiv)",
          body: "Optionale Pro-Rechte für höhere Limits und Premium-Funktionen über In-App Purchase, sobald das öffentliche Listing live ist.",
        },
      ],
      faq: [
        {
          question: "Was ist SupplyDine?",
          answer:
            "SupplyDine ist eine iOS- und Android-B2B-App von Theofanis Markou, die Gastronomie-Einkäufer mit Lieferanten für Kataloge und Bestellungen verbindet.",
        },
        {
          question: "Ist SupplyDine schon im App Store verfügbar?",
          answer:
            "Ein öffentlicher Store-Download-Link erscheint hier nach der Veröffentlichung. Das Produkt ist jetzt verfügbar — nutzen Sie Kontakt für Lizenz, Kauf oder privaten Rollout.",
        },
        {
          question: "Verarbeitet SupplyDine Zahlungen zwischen Einkäufer und Lieferant?",
          answer:
            "Nein. SupplyDine unterstützt Katalog- und Bestellworkflows. Die kommerzielle Abwicklung bleibt außerhalb der App, sofern ein Deployment das nicht ausdrücklich ergänzt.",
        },
        {
          question: "Wer entwickelt SupplyDine?",
          answer:
            "Veröffentlicht von Theofanis Markou im Rahmen seiner selektiven Produktpraxis, getrennt von seinem CTO-Mandat bei der Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Ja. SupplyDine ist in den öffentlichen App-Stores verfügbar. Nutzen Sie den Download-Button auf dieser Seite.",
    },
    "SupplyDine",
  ),
  dentalpractice: productShellDe(
    {
      title: "Dental Practice — Kleine Praxisabläufe",
      metaDescription:
        "Dental Practice Management von Theofanis Markou: offline-first iOS- & Android-App für kleine Zahnarztpraxen. Verfügbar über Kontakt.",
      kicker: "iOS & Android",
      headline: "Dental Practice",
      intro:
        "Ein offline-first Praxisbegleiter für kleine Zahnarztpraxen (typisch wenige Mitarbeitende): Patienten, Termine und operative Notizen auf Handy oder Tablet — ohne Anspruch, ein vollständiges Krankenhaus-HIS zu ersetzen.",
      liveNote:
        "Dental Practice ist in den öffentlichen Stores verfügbar. Laden Sie die App unten herunter, um den Praxisablauf auf iOS und Android zu führen.",
      screenshots: [
        {
          src: "/images/dental-practice/01-today.png",
          alt: "Dental Practice Today Klinik-Flow",
          caption: "Today · Klinik-Flow",
        },
        {
          src: "/images/dental-practice/02-appointments.png",
          alt: "Dental Practice Termine Tagesansicht",
          caption: "Termine",
        },
        {
          src: "/images/dental-practice/03-new-appointment.png",
          alt: "Dental Practice neuer Termin",
          caption: "Neuer Termin",
        },
        {
          src: "/images/dental-practice/04-patient-details.png",
          alt: "Dental Practice Patientendetails",
          caption: "Patientendetails",
        },
        {
          src: "/images/dental-practice/05-dental-chart.png",
          alt: "Dental Practice FDI-Zahnschema",
          caption: "Zahnschema",
        },
        {
          src: "/images/dental-practice/06-invoices.png",
          alt: "Dental Practice Rechnungen und Quittungen",
          caption: "Rechnungen & Quittungen",
        },
        {
          src: "/images/dental-practice/07-cash-register.png",
          alt: "Dental Practice Kasse",
          caption: "Kasse",
        },
        {
          src: "/images/dental-practice/08-reports.png",
          alt: "Dental Practice Monatsberichte",
          caption: "Berichte",
        },
        {
          src: "/images/dental-practice/09-settings.png",
          alt: "Dental Practice Einstellungen und Sprache",
          caption: "Einstellungen",
        },
      ],
      features: [
        {
          title: "Patienten & Termine",
          body: "Praxisplan und Patientenakten für ein kleines Team auf gemeinsamen Geräten organisiert halten.",
        },
        {
          title: "Offline-first",
          body: "Kerndaten bleiben auf dem Gerät (SQLite), damit die Praxis auch bei schwacher Verbindung weiterarbeiten kann.",
        },
        {
          title: "Passender Umfang",
          body: "Für Praxen mit 2–3 Mitarbeitenden. Operative Hilfe — kein Ersatz für gesetzlich vorgeschriebene Medizinproduktsysteme, wo diese Pflicht sind.",
        },
      ],
      faq: [
        {
          question: "Was ist Dental Practice?",
          answer:
            "Dental Practice ist eine iOS- und Android-App von Theofanis Markou für kleine Zahnarztpraxen — Patienten, Termine und offline-first Abläufe.",
        },
        {
          question: "Ist Dental Practice schon im App Store verfügbar?",
          answer:
            "Ein öffentlicher Store-Download-Link erscheint hier nach der Veröffentlichung. Das Produkt ist jetzt verfügbar — nutzen Sie Kontakt für Lizenz, Kauf oder privaten Rollout.",
        },
        {
          question: "Ist das ein Krankenhausinformationssystem?",
          answer:
            "Nein. Es ist ein kompaktes Praxiswerkzeug. Wo regulierte Medizinakensysteme vorgeschrieben sind, bleiben diese das System of Record.",
        },
        {
          question: "Wer entwickelt Dental Practice?",
          answer:
            "Veröffentlicht von Theofanis Markou im Rahmen seiner selektiven Produktpraxis, getrennt von seinem CTO-Mandat bei der Resilience Guard GmbH.",
        },
      ],
      faqAvailabilityAnswerLive:
        "Ja. Dental Practice ist in den öffentlichen App-Stores verfügbar. Nutzen Sie den Download-Button auf dieser Seite.",
    },
    "Dental Practice",
  ),
} as const satisfies Record<string, AppProductPageCopy>;

export const extraAppPrivacyPagesEn = {
  assetflow: {
    title: "AssetFlow Manager — Privacy Policy",
    metaDescription:
      "Privacy policy for AssetFlow Manager (iOS & Android): accounts, asset inventory data, photos, and QR workflows.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Who this applies to",
        body: "This privacy policy applies to the AssetFlow Manager mobile application for iOS and Android (“AssetFlow Manager”, “the App”), published by Theofanis Markou (“we”, “us”). The website privacy notice at /privacy covers only www.theofanismarkou.com.",
      },
      {
        heading: "Information we process",
        body: "Depending on how you use the App, we may process:\n\n• Account details (e.g. email, name) for registration, login, and session management.\n• Asset inventory content you enter (categories, locations, condition, purchase/value fields, notes).\n• Photos and images you attach to assets, stored via the product backend/storage.\n• QR-related identifiers you generate or scan in the App.\n• Technical logs needed for security and reliability of the API.",
      },
      {
        heading: "How we use information",
        body: "We use this information to provide AssetFlow Manager’s features: inventory, organisation, media, and QR workflows. We do not sell personal data for advertising.",
      },
      {
        heading: "Storage & third parties",
        body: "Account and inventory data are stored with the product backend (e.g. Supabase-hosted database and storage). Platform providers (Apple, Google) process store-related data when you install or purchase through them.",
      },
      {
        heading: "Your choices",
        body: "You can update or delete inventory content in the App. You may request account deletion via Contact. You can deny camera/photo permissions in system settings (features that need them will not work).",
      },
      {
        heading: "Contact",
        body: "Questions about AssetFlow Manager privacy: use the contact form on https://www.theofanismarkou.com/\n\nLast updated: 16 November 2026.",
      },
    ],
  },
  supplydine: {
    title: "SupplyDine — Privacy Policy",
    metaDescription:
      "Privacy policy for SupplyDine (iOS & Android): accounts, orders, profiles, and optional push notifications.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Who this applies to",
        body: "This privacy policy applies to the SupplyDine mobile application for iOS and Android (“SupplyDine”, “the App”), published by Theofanis Markou (“we”, “us”). The website privacy notice at /privacy covers only www.theofanismarkou.com.",
      },
      {
        heading: "Information we process",
        body: "Depending on how you use the App, we may process:\n\n• Account data (name, email, credentials) for login and role (buyer or supplier).\n• Business profile details (venue / supplier name, location, catalogue content).\n• Orders (line items, quantities, status) to operate the marketplace.\n• Subscription / plan status when Pro is enabled.\n• Optional push tokens if you enable notifications.\n• Technical data (e.g. IP for rate limiting, server logs) for security and stability.",
      },
      {
        heading: "How we use information",
        body: "We use this information to run SupplyDine’s B2B ordering features. We do not sell personal data for advertising.",
      },
      {
        heading: "Storage & third parties",
        body: "API and database hosting may run on infrastructure such as Fly.io (EU regions when configured). Apple / Google process store and (when enabled) In-App Purchase data. Session tokens are stored securely on device.",
      },
      {
        heading: "Your choices",
        body: "You can update profile and order-related content in the App. Request account deletion via Contact. Deny notification permission if you do not want push alerts.",
      },
      {
        heading: "Contact",
        body: "Questions about SupplyDine privacy: use the contact form on https://www.theofanismarkou.com/\n\nLast updated: 16 November 2026.",
      },
    ],
  },
  dentalpractice: {
    title: "Dental Practice — Privacy Policy",
    metaDescription:
      "Privacy policy for Dental Practice (iOS & Android): offline-first patient and appointment data on device.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Who this applies to",
        body: "This privacy policy applies to the Dental Practice mobile application for iOS and Android (“Dental Practice”, “the App”), published by Theofanis Markou (“we”, “us”). The website privacy notice at /privacy covers only www.theofanismarkou.com.",
      },
      {
        heading: "Information we process",
        body: "The App is designed offline-first. Depending on use, it may process:\n\n• Patient and appointment content you enter, stored primarily on the device.\n• Operational notes related to clinic workflows.\n• Optional camera / photo input when a feature requires it.\n• If a deployment enables cloud sync or accounts, those credentials and synced records as configured for that deployment.",
      },
      {
        heading: "How we use information",
        body: "We use this information solely to provide clinic organisation features in the App. We do not sell personal data for advertising.",
      },
      {
        heading: "Storage & retention",
        body: "Default builds keep core practice data on device until you delete it or uninstall the App. Clinic operators are responsible for lawful processing of patient data under applicable medical / privacy rules in their jurisdiction.",
      },
      {
        heading: "Important limits",
        body: "Dental Practice is an organisational tool for small clinics. It is not a substitute for regulated electronic health record systems where those are legally required.",
      },
      {
        heading: "Contact",
        body: "Questions about Dental Practice privacy: use the contact form on https://www.theofanismarkou.com/\n\nLast updated: 16 November 2026.",
      },
    ],
  },
} as const satisfies Record<string, AppPrivacyPageCopy>;

export const extraAppPrivacyPagesDe = {
  assetflow: {
    title: "AssetFlow Manager — Datenschutzerklärung",
    metaDescription:
      "Datenschutzerklärung für AssetFlow Manager (iOS & Android): Konten, Inventardaten, Fotos und QR-Workflows.",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Geltungsbereich",
        body: "Diese Datenschutzerklärung gilt für die Mobile-App AssetFlow Manager für iOS und Android („AssetFlow Manager“, „die App“), herausgegeben von Theofanis Markou („wir“, „uns“). Die Website-Datenschutzerklärung unter /de/privacy betrifft nur www.theofanismarkou.com.",
      },
      {
        heading: "Welche Daten wir verarbeiten",
        body: "Je nach Nutzung können wir verarbeiten:\n\n• Kontodaten (z. B. E-Mail, Name) für Registrierung, Login und Sitzungen.\n• Inventarinhalte, die Sie eingeben (Kategorien, Standorte, Zustand, Kauf-/Wertfelder, Notizen).\n• Fotos/Bilder zu Assets, gespeichert über Backend/Storage.\n• QR-bezogene Kennungen, die Sie erzeugen oder scannen.\n• Technische Logs für Sicherheit und Stabilität der API.",
      },
      {
        heading: "Zwecke",
        body: "Wir nutzen diese Daten zur Bereitstellung der AssetFlow-Funktionen. Wir verkaufen keine personenbezogenen Daten für Werbung.",
      },
      {
        heading: "Speicherung & Dritte",
        body: "Konto- und Inventardaten liegen beim Produkt-Backend (z. B. Supabase). Apple/Google verarbeiten storebezogene Daten bei Installation oder Käufen.",
      },
      {
        heading: "Ihre Wahlmöglichkeiten",
        body: "Inventarinhalte können in der App geändert oder gelöscht werden. Kontolöschung über Kontakt anfragen. Kamera-/Fotorechte in den Systemeinstellungen verweigern.",
      },
      {
        heading: "Kontakt",
        body: "Fragen zum Datenschutz AssetFlow Manager: Kontaktformular auf https://www.theofanismarkou.com/de\n\nZuletzt aktualisiert: 16. November 2026.",
      },
    ],
  },
  supplydine: {
    title: "SupplyDine — Datenschutzerklärung",
    metaDescription:
      "Datenschutzerklärung für SupplyDine (iOS & Android): Konten, Bestellungen, Profile und optionale Push-Benachrichtigungen.",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Geltungsbereich",
        body: "Diese Datenschutzerklärung gilt für die Mobile-App SupplyDine für iOS und Android („SupplyDine“, „die App“), herausgegeben von Theofanis Markou („wir“, „uns“). Die Website-Datenschutzerklärung unter /de/privacy betrifft nur www.theofanismarkou.com.",
      },
      {
        heading: "Welche Daten wir verarbeiten",
        body: "Je nach Nutzung können wir verarbeiten:\n\n• Kontodaten (Name, E-Mail, Zugangsdaten) für Login und Rolle (Einkäufer/Lieferant).\n• Geschäftsprofildaten (Lokal / Lieferant, Standort, Kataloginhalte).\n• Bestellungen (Positionen, Mengen, Status).\n• Abo-/Planstatus, wenn Pro aktiv ist.\n• Optionale Push-Tokens bei aktivierten Benachrichtigungen.\n• Technische Daten (z. B. IP für Rate-Limiting, Server-Logs).",
      },
      {
        heading: "Zwecke",
        body: "Wir nutzen diese Daten für die B2B-Bestellfunktionen von SupplyDine. Wir verkaufen keine personenbezogenen Daten für Werbung.",
      },
      {
        heading: "Speicherung & Dritte",
        body: "API/Datenbank können auf Infrastruktur wie Fly.io (EU-Regionen, sofern konfiguriert) laufen. Apple/Google verarbeiten Store- und ggf. In-App-Purchase-Daten. Sitzungstoken werden sicher auf dem Gerät gespeichert.",
      },
      {
        heading: "Ihre Wahlmöglichkeiten",
        body: "Profil- und Bestellinhalte in der App aktualisieren. Kontolöschung über Kontakt. Push-Rechte verweigern, wenn keine Benachrichtigungen gewünscht sind.",
      },
      {
        heading: "Kontakt",
        body: "Fragen zum Datenschutz SupplyDine: Kontaktformular auf https://www.theofanismarkou.com/de\n\nZuletzt aktualisiert: 16. November 2026.",
      },
    ],
  },
  dentalpractice: {
    title: "Dental Practice — Datenschutzerklärung",
    metaDescription:
      "Datenschutzerklärung für Dental Practice (iOS & Android): offline-first Patienten- und Termindaten auf dem Gerät.",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Geltungsbereich",
        body: "Diese Datenschutzerklärung gilt für die Mobile-App Dental Practice für iOS und Android („Dental Practice“, „die App“), herausgegeben von Theofanis Markou („wir“, „uns“). Die Website-Datenschutzerklärung unter /de/privacy betrifft nur www.theofanismarkou.com.",
      },
      {
        heading: "Welche Daten wir verarbeiten",
        body: "Die App ist offline-first. Je nach Nutzung können verarbeitet werden:\n\n• Patienten- und Termininhalte, die Sie eingeben — vorwiegend auf dem Gerät.\n• Operative Notizen zum Praxisablauf.\n• Optionale Kamera-/Fotoeingaben, wenn eine Funktion das erfordert.\n• Bei einem Deployment mit Cloud-Sync/Konten: Zugangsdaten und synchronisierte Datensätze laut Konfiguration.",
      },
      {
        heading: "Zwecke",
        body: "Wir nutzen diese Daten ausschließlich für die Organisationsfunktionen der App. Wir verkaufen keine personenbezogenen Daten für Werbung.",
      },
      {
        heading: "Speicherung & Aufbewahrung",
        body: "Standard-Builds halten Kerndaten auf dem Gerät, bis Sie sie löschen oder die App deinstallieren. Praxisbetreiber sind für die rechtmäßige Verarbeitung von Patientendaten in ihrer Jurisdiktion verantwortlich.",
      },
      {
        heading: "Wichtige Grenzen",
        body: "Dental Practice ist ein Organisationswerkzeug für kleine Praxen — kein Ersatz für gesetzlich vorgeschriebene elektronische Gesundheitsaktensysteme.",
      },
      {
        heading: "Kontakt",
        body: "Fragen zum Datenschutz Dental Practice: Kontaktformular auf https://www.theofanismarkou.com/de\n\nZuletzt aktualisiert: 16. November 2026.",
      },
    ],
  },
} as const satisfies Record<string, AppPrivacyPageCopy>;

export const extraAppTermsPagesEn = {
  assetflow: {
    title: "AssetFlow Manager — Terms of Use",
    metaDescription: "Terms of Use for the AssetFlow Manager iOS & Android app.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Agreement",
        body: "These Terms apply to AssetFlow Manager for iOS and Android, published by Theofanis Markou. By using the App, you agree to these Terms.",
      },
      {
        heading: "The service",
        body: "AssetFlow Manager helps you organise asset inventory: categories, locations, condition, values, photos, and QR workflows. It is not a full ERP or warehouse management system.",
      },
      {
        heading: "Accounts",
        body: "You must provide accurate registration details and keep credentials secure. You are responsible for activity under your account.",
      },
      {
        heading: "Availability",
        body: "The product may be licensed, purchased, or deployed privately — contact us to discuss. A public store download link will appear on this site when published.",
      },
      {
        heading: "Privacy",
        body: "See https://www.theofanismarkou.com/assetflow/privacy",
      },
      {
        heading: "Disclaimer",
        body: "The App is provided “as is” to the fullest extent permitted by law. We are not liable for indirect or consequential damages arising from use of the App or third-party hosting.",
      },
      {
        heading: "Contact",
        body: "Questions: contact form on https://www.theofanismarkou.com/\n\nLast updated: 16 November 2026.",
      },
    ],
  },
  supplydine: {
    title: "SupplyDine — Terms of Use",
    metaDescription: "Terms of Use for the SupplyDine iOS & Android app.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Agreement",
        body: "These Terms apply to SupplyDine for iOS and Android, published by Theofanis Markou. By using the App, you agree to these Terms.",
      },
      {
        heading: "The service",
        body: "SupplyDine connects hospitality buyers and suppliers for catalogues and orders. It is not a WMS and does not guarantee availability or delivery — those remain between the trading parties. Order payment clearing between buyer and supplier is outside the default product scope.",
      },
      {
        heading: "Accounts",
        body: "Provide accurate details. One account maps to one role (buyer or supplier) per the App design. You are responsible for account security.",
      },
      {
        heading: "Availability",
        body: "The product may be licensed, purchased, or deployed privately — contact us to discuss. A public store download link will appear on this site when published.",
      },
      {
        heading: "Privacy",
        body: "See https://www.theofanismarkou.com/supplydine/privacy",
      },
      {
        heading: "Disclaimer",
        body: "The App is provided “as is” to the fullest extent permitted by law. We are not liable for commercial outcomes between buyers and suppliers or for third-party service interruptions.",
      },
      {
        heading: "Contact",
        body: "Questions: contact form on https://www.theofanismarkou.com/\n\nLast updated: 16 November 2026.",
      },
    ],
  },
  dentalpractice: {
    title: "Dental Practice — Terms of Use",
    metaDescription: "Terms of Use for the Dental Practice iOS & Android app.",
    backHome: "Back to home",
    blocks: [
      {
        heading: "Agreement",
        body: "These Terms apply to Dental Practice for iOS and Android, published by Theofanis Markou. By using the App, you agree to these Terms.",
      },
      {
        heading: "The service",
        body: "Dental Practice helps small clinics organise patients and appointments offline-first. It is an organisational aid — not medical advice and not a substitute for regulated medical-record systems where required.",
      },
      {
        heading: "Clinic responsibility",
        body: "Clinic operators are responsible for lawful handling of patient data and for using appropriate systems of record under local law.",
      },
      {
        heading: "Availability",
        body: "The product may be licensed, purchased, or deployed privately — contact us to discuss. A public store download link will appear on this site when published.",
      },
      {
        heading: "Privacy",
        body: "See https://www.theofanismarkou.com/dental-practice/privacy",
      },
      {
        heading: "Disclaimer",
        body: "The App is provided “as is” to the fullest extent permitted by law. We are not liable for clinical outcomes or for failures to meet regulatory record-keeping duties outside the App’s scope.",
      },
      {
        heading: "Contact",
        body: "Questions: contact form on https://www.theofanismarkou.com/\n\nLast updated: 16 November 2026.",
      },
    ],
  },
} as const satisfies Record<string, AppPrivacyPageCopy>;

export const extraAppTermsPagesDe = {
  assetflow: {
    title: "AssetFlow Manager — Nutzungsbedingungen",
    metaDescription: "Nutzungsbedingungen für AssetFlow Manager (iOS & Android).",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Vereinbarung",
        body: "Diese Bedingungen gelten für AssetFlow Manager für iOS und Android, herausgegeben von Theofanis Markou. Mit der Nutzung stimmen Sie zu.",
      },
      {
        heading: "Dienst",
        body: "AssetFlow Manager hilft beim Asset-Inventar: Kategorien, Standorte, Zustand, Werte, Fotos und QR-Workflows. Kein vollständiges ERP/WMS.",
      },
      {
        heading: "Konten",
        body: "Geben Sie korrekte Registrierungsdaten an und schützen Sie Zugangsdaten. Sie sind für Aktivitäten unter Ihrem Konto verantwortlich.",
      },
      {
        heading: "Verfügbarkeit",
        body: "Das Produkt kann lizenziert, gekauft oder privat ausgerollt werden — kontaktieren Sie uns. Ein öffentlicher Store-Download-Link erscheint auf dieser Seite nach der Veröffentlichung.",
      },
      {
        heading: "Datenschutz",
        body: "Siehe https://www.theofanismarkou.com/de/assetflow/privacy",
      },
      {
        heading: "Haftungsausschluss",
        body: "Die App wird „wie besehen“ bereitgestellt, soweit gesetzlich zulässig. Keine Haftung für indirekte oder Folgeschäden aus Nutzung oder Dritt-Hosting.",
      },
      {
        heading: "Kontakt",
        body: "Fragen: Kontaktformular auf https://www.theofanismarkou.com/de\n\nZuletzt aktualisiert: 16. November 2026.",
      },
    ],
  },
  supplydine: {
    title: "SupplyDine — Nutzungsbedingungen",
    metaDescription: "Nutzungsbedingungen für SupplyDine (iOS & Android).",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Vereinbarung",
        body: "Diese Bedingungen gelten für SupplyDine für iOS und Android, herausgegeben von Theofanis Markou. Mit der Nutzung stimmen Sie zu.",
      },
      {
        heading: "Dienst",
        body: "SupplyDine verbindet Gastronomie-Einkäufer und Lieferanten für Kataloge und Bestellungen. Kein WMS; keine Garantie für Verfügbarkeit oder Lieferung. Zahlungsabwicklung zwischen den Parteien liegt außerhalb des Standardumfangs.",
      },
      {
        heading: "Konten",
        body: "Korrekte Angaben erforderlich. Ein Konto entspricht einer Rolle (Einkäufer oder Lieferant). Sie sind für die Kontosicherheit verantwortlich.",
      },
      {
        heading: "Verfügbarkeit",
        body: "Das Produkt kann lizenziert, gekauft oder privat ausgerollt werden — kontaktieren Sie uns. Ein öffentlicher Store-Download-Link erscheint auf dieser Seite nach der Veröffentlichung.",
      },
      {
        heading: "Datenschutz",
        body: "Siehe https://www.theofanismarkou.com/de/supplydine/privacy",
      },
      {
        heading: "Haftungsausschluss",
        body: "Die App wird „wie besehen“ bereitgestellt. Keine Haftung für kommerzielle Ergebnisse zwischen Einkäufer und Lieferant oder für Ausfälle Dritter.",
      },
      {
        heading: "Kontakt",
        body: "Fragen: Kontaktformular auf https://www.theofanismarkou.com/de\n\nZuletzt aktualisiert: 16. November 2026.",
      },
    ],
  },
  dentalpractice: {
    title: "Dental Practice — Nutzungsbedingungen",
    metaDescription: "Nutzungsbedingungen für Dental Practice (iOS & Android).",
    backHome: "Zur Startseite",
    blocks: [
      {
        heading: "Vereinbarung",
        body: "Diese Bedingungen gelten für Dental Practice für iOS und Android, herausgegeben von Theofanis Markou. Mit der Nutzung stimmen Sie zu.",
      },
      {
        heading: "Dienst",
        body: "Dental Practice hilft kleinen Praxen bei Patienten und Terminen offline-first. Organisationshilfe — keine medizinische Beratung und kein Ersatz für vorgeschriebene Medizinaktensysteme.",
      },
      {
        heading: "Verantwortung der Praxis",
        body: "Praxisbetreiber sind für die rechtmäßige Verarbeitung von Patientendaten und für passende Systeme of Record nach lokalem Recht verantwortlich.",
      },
      {
        heading: "Verfügbarkeit",
        body: "Das Produkt kann lizenziert, gekauft oder privat ausgerollt werden — kontaktieren Sie uns. Ein öffentlicher Store-Download-Link erscheint auf dieser Seite nach der Veröffentlichung.",
      },
      {
        heading: "Datenschutz",
        body: "Siehe https://www.theofanismarkou.com/de/dental-practice/privacy",
      },
      {
        heading: "Haftungsausschluss",
        body: "Die App wird „wie besehen“ bereitgestellt. Keine Haftung für klinische Ergebnisse oder für Versäumnisse bei gesetzlicher Dokumentation außerhalb des App-Umfangs.",
      },
      {
        heading: "Kontakt",
        body: "Fragen: Kontaktformular auf https://www.theofanismarkou.com/de\n\nZuletzt aktualisiert: 16. November 2026.",
      },
    ],
  },
} as const satisfies Record<string, AppPrivacyPageCopy>;
