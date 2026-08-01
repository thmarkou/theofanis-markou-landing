import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import {
  type AppId,
  getAppBySlug,
  isAppLiveOnStore,
  isKnownAppSlug,
} from "@/lib/appsCatalog";
import type { FaqItem } from "@/lib/siteContent";
import {
  appPrivacyPathForLanguage,
  canonicalAppProductUrl,
  languageFromPathname,
  pathForLanguage,
  SITE_ORIGIN,
} from "@/lib/site";
import NotFound from "@/pages/NotFound";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { scrollToElementId } from "@/lib/scroll";

function resolveProductFaq(
  faq: readonly FaqItem[],
  liveAnswer: string,
  isLive: boolean,
): FaqItem[] {
  if (!isLive) {
    return [...faq];
  }
  return faq.map(item => {
    const isAvailabilityQuestion =
      /App Store yet/i.test(item.question) ||
      /schon im App Store/i.test(item.question);
    return isAvailabilityQuestion
      ? { question: item.question, answer: liveAnswer }
      : item;
  });
}

function setMetaName(name: string, content: string): void {
  const el =
    Array.from(document.querySelectorAll("meta")).find(
      m => m.getAttribute("name") === name
    ) ??
    (() => {
      const node = document.createElement("meta");
      node.setAttribute("name", name);
      document.head.appendChild(node);
      return node;
    })();
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string): void {
  const el =
    Array.from(document.querySelectorAll("meta")).find(
      m => m.getAttribute("property") === property
    ) ??
    (() => {
      const node = document.createElement("meta");
      node.setAttribute("property", property);
      document.head.appendChild(node);
      return node;
    })();
  el.setAttribute("content", content);
}

function setCanonicalHref(href: string): void {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setHreflangAlternates(slug: string): void {
  const pairs: { hreflang: string; href: string }[] = [
    { hreflang: "en", href: canonicalAppProductUrl(slug, "en") },
    { hreflang: "de", href: canonicalAppProductUrl(slug, "de") },
    { hreflang: "x-default", href: canonicalAppProductUrl(slug, "en") },
  ];

  for (const { hreflang, href } of pairs) {
    let el = document.querySelector(
      `link[rel="alternate"][hreflang="${hreflang}"]`
    );
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "alternate");
      el.setAttribute("hreflang", hreflang);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }
}

function AppProductHead({
  slug,
  appId,
}: {
  slug: string;
  appId: AppId;
}) {
  const { language } = useLanguage();
  const { appProductPages, workTeaser } = useDictionary();
  const page = appProductPages[appId];
  const catalog = getAppBySlug(slug);
  const pageTitle = `${page.title} · Theofanis Markou`;
  const canonical = canonicalAppProductUrl(slug, language);
  const ogImage = `${SITE_ORIGIN}/og-image.png`;
  const statusLabel = catalog
    ? workTeaser.statusLabels[catalog.status]
    : workTeaser.statusLabels.in_review;
  const isLive = catalog ? isAppLiveOnStore(catalog) : false;
  const faqItems = useMemo(
    () =>
      resolveProductFaq(
        page.faq,
        page.faqAvailabilityAnswerLive,
        isLive,
      ),
    [page.faq, page.faqAvailabilityAnswerLive, isLive],
  );

  useEffect(() => {
    document.title = pageTitle;
    setMetaName("description", page.metaDescription);
    setCanonicalHref(canonical);
    setHreflangAlternates(slug);

    setMetaProperty("og:title", pageTitle);
    setMetaProperty("og:description", page.metaDescription);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", ogImage);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:locale", language === "de" ? "de_DE" : "en_US");
    setMetaProperty(
      "og:locale:alternate",
      language === "de" ? "en_US" : "de_DE"
    );

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", pageTitle);
    setMetaName("twitter:description", page.metaDescription);
    setMetaName("twitter:image", ogImage);
  }, [
    pageTitle,
    page.metaDescription,
    canonical,
    language,
    ogImage,
    slug,
  ]);

  useEffect(() => {
    const faqId = "seo-app-faq-jsonld";
    const appIdAttr = "seo-software-application-jsonld";
    document.getElementById(faqId)?.remove();
    document.getElementById(appIdAttr)?.remove();

    const operatingSystem = catalog?.platforms.includes("ios")
      ? "iOS"
      : catalog?.platforms.join(", ") ?? "iOS";

    const application: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: page.headline,
      description: page.metaDescription,
      applicationCategory: "ProductivityApplication",
      operatingSystem,
      url: canonical,
      inLanguage: language === "de" ? "de" : "en",
      author: {
        "@type": "Person",
        name: "Theofanis Markou",
        url: SITE_ORIGIN,
      },
      offers: {
        "@type": "Offer",
        availability: isLive
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "EUR",
        description: statusLabel,
      },
    };

    if (isLive && catalog?.appStoreUrl) {
      application.downloadUrl = catalog.appStoreUrl;
      application.offers = {
        "@type": "Offer",
        url: catalog.appStoreUrl,
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "EUR",
      };
    }

    const appScript = document.createElement("script");
    appScript.id = appIdAttr;
    appScript.type = "application/ld+json";
    appScript.textContent = JSON.stringify(application);
    document.head.appendChild(appScript);

    const faqScript = document.createElement("script");
    faqScript.id = faqId;
    faqScript.type = "application/ld+json";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById(faqId)?.remove();
      document.getElementById(appIdAttr)?.remove();
    };
  }, [page, catalog, canonical, language, statusLabel, isLive, faqItems]);

  return null;
}

function AppProductMain({ appId, slug }: { appId: AppId; slug: string }) {
  const { appProductPages, workTeaser } = useDictionary();
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  const page = appProductPages[appId];
  const catalog = getAppBySlug(slug);
  const homePath = pathForLanguage(language);
  const privacyHref = appPrivacyPathForLanguage(slug, language);
  const statusLabel = catalog
    ? workTeaser.statusLabels[catalog.status]
    : workTeaser.statusLabels.in_review;
  const isLive = catalog ? isAppLiveOnStore(catalog) : false;
  const faqItems = useMemo(
    () =>
      resolveProductFaq(
        page.faq,
        page.faqAvailabilityAnswerLive,
        isLive,
      ),
    [page.faq, page.faqAvailabilityAnswerLive, isLive],
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeShot =
    lightboxIndex === null ? null : page.screenshots[lightboxIndex] ?? null;

  const goHome = () => {
    navigate(homePath);
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const goContact = () => {
    navigate(homePath);
    window.setTimeout(() => {
      window.history.replaceState(null, "", `${homePath}#contact-form`);
      scrollToElementId("contact-form");
    }, 50);
  };

  return (
    <main className="container max-w-3xl py-16 md:py-24">
      <p className="section-kicker">{page.kicker}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          {page.headline}
        </h1>
        <span className="rounded-full border border-white/14 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase">
          {statusLabel}
        </span>
      </div>
      <p className="mt-6 text-base leading-8 text-white/72 md:text-lg">
        {page.intro}
      </p>
      <p className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-white/58">
        {isLive ? page.liveNote : page.statusNote}
      </p>

      {isLive && catalog?.appStoreUrl ? (
        <p className="mt-6">
          <a
            href={catalog.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center bg-foreground px-6 py-2.5 text-xs font-medium tracking-[0.16em] text-background uppercase transition-opacity hover:opacity-92"
          >
            {page.appStoreCta}
          </a>
        </p>
      ) : null}

      {page.screenshots.length > 0 ? (
        <section className="mt-14" aria-labelledby="app-screenshots-title">
          <h2
            id="app-screenshots-title"
            className="text-xs font-medium tracking-[0.22em] text-white/52 uppercase"
          >
            {page.screenshotsKicker}
          </h2>
          <p className="mt-2 text-xs text-white/40">{page.screenshotsExpandHint}</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {page.screenshots.map((shot, index) => (
              <li key={shot.src}>
                <button
                  type="button"
                  className="group w-full text-left transition-opacity hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${page.screenshotsExpandHint}: ${shot.caption}`}
                >
                  <figure>
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={390}
                      height={844}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-[1.15rem] border border-white/12 bg-black/40 shadow-[0_20px_48px_-24px_rgba(0,0,0,0.85)] transition-[border-color] group-hover:border-white/28"
                    />
                    <figcaption className="mt-2.5 text-[11px] leading-4 text-white/48 sm:text-xs sm:leading-5">
                      {shot.caption}
                    </figcaption>
                  </figure>
                </button>
              </li>
            ))}
          </ul>

          <Dialog
            open={lightboxIndex !== null}
            onOpenChange={open => {
              if (!open) setLightboxIndex(null);
            }}
          >
            <DialogContent
              showCloseButton
              className="max-h-[92vh] w-auto max-w-[min(100vw-1.5rem,420px)] overflow-y-auto border-white/12 bg-[#121212] p-3 sm:max-w-[min(100vw-2rem,440px)] sm:p-4"
            >
              {activeShot ? (
                <>
                  <DialogTitle className="pr-8 text-sm font-medium text-white/88">
                    {activeShot.caption}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {activeShot.alt}
                  </DialogDescription>
                  <img
                    src={activeShot.src}
                    alt={activeShot.alt}
                    width={390}
                    height={844}
                    className="mx-auto max-h-[min(78vh,760px)] w-auto rounded-[1.25rem] border border-white/10"
                  />
                  <span className="sr-only">{page.screenshotsCloseLabel}</span>
                </>
              ) : null}
            </DialogContent>
          </Dialog>
        </section>
      ) : null}

      <section className="mt-14" aria-labelledby="app-features-title">
        <h2
          id="app-features-title"
          className="text-xs font-medium tracking-[0.22em] text-white/52 uppercase"
        >
          {page.featuresKicker}
        </h2>
        <ul className="mt-6 space-y-6">
          {page.features.map(feature => (
            <li key={feature.title}>
              <h3 className="font-heading text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/68">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="app-faq-title">
        <p className="section-kicker">{page.faqKicker}</p>
        <h2
          id="app-faq-title"
          className="mt-4 font-heading text-2xl font-semibold text-white md:text-3xl"
        >
          {page.faqTitle}
        </h2>
        <div className="mt-8 space-y-6">
          {faqItems.map(item => (
            <div key={item.question}>
              <h3 className="text-base font-medium text-white">
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/68">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={privacyHref}
          className="text-foreground underline decoration-white/28 underline-offset-4 transition-colors hover:decoration-white/50"
        >
          {page.privacyLabel}
        </Link>
        <button
          type="button"
          onClick={goContact}
          className="cursor-pointer text-left text-foreground underline decoration-white/28 underline-offset-4 transition-colors hover:decoration-white/50"
        >
          {page.contactLabel}
        </button>
        <button
          type="button"
          onClick={goHome}
          className="cursor-pointer text-left text-white/55 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/75 hover:decoration-white/40"
        >
          {page.backHome}
        </button>
      </div>
    </main>
  );
}

export default function AppProduct() {
  const [path] = useLocation();
  const [, enParams] = useRoute("/:slug");
  const [, deParams] = useRoute("/de/:slug");
  const slug = (deParams?.slug ?? enParams?.slug ?? "").toLowerCase();
  const defaultLanguage = languageFromPathname(path);

  if (!isKnownAppSlug(slug)) {
    return <NotFound />;
  }

  const catalog = getAppBySlug(slug);
  if (!catalog) {
    return <NotFound />;
  }

  return (
    <LanguageProvider defaultLanguage={defaultLanguage} key={path}>
      <AppProductInner appId={catalog.id} slug={catalog.slug} />
    </LanguageProvider>
  );
}

function AppProductInner({ appId, slug }: { appId: AppId; slug: string }) {
  // SPA navigations keep window scrollY — reset so Selected work → product opens at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <>
      <AppProductHead slug={slug} appId={appId} />
      <div
        id="top"
        className="executive-shell relative min-h-screen overflow-x-hidden bg-background text-foreground"
      >
        <div className="executive-grid" aria-hidden="true" />
        <Header />
        <AppProductMain appId={appId} slug={slug} />
        <Footer />
      </div>
    </>
  );
}
