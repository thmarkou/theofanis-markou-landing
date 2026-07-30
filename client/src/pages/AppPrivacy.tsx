import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import {
  languageFromPathname,
  pathForLanguage,
  SITE_ORIGIN,
  canonicalAppPrivacyUrl,
} from "@/lib/site";
import { useEffect } from "react";
import NotFound from "@/pages/NotFound";
import { Link, useLocation, useRoute } from "wouter";

type AppPrivacyId = "voiceaction";

const KNOWN_APP_PRIVACY_IDS = new Set<AppPrivacyId>(["voiceaction"]);

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

function AppPrivacyHead({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}) {
  const { language } = useLanguage();
  const pageTitle = `${title} · Theofanis Markou`;
  const canonical = canonicalAppPrivacyUrl(slug, language);
  const ogImage = `${SITE_ORIGIN}/og-image.png`;

  useEffect(() => {
    document.title = pageTitle;
    setMetaName("description", description);
    setCanonicalHref(canonical);
    setMetaProperty("og:title", pageTitle);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", ogImage);
    setMetaProperty("og:locale", language === "de" ? "de_DE" : "en_US");
    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", pageTitle);
    setMetaName("twitter:description", description);
  }, [pageTitle, description, canonical, language, ogImage]);

  return null;
}

function AppPrivacyMain({ appId }: { appId: AppPrivacyId }) {
  const { appPrivacyPages } = useDictionary();
  const { language } = useLanguage();
  const page = appPrivacyPages[appId];
  const homePath = pathForLanguage(language);

  return (
    <main className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {page.title}
      </h1>
      <div className="mt-10 space-y-10">
        {page.blocks.map(block => (
          <section key={block.heading}>
            <h2 className="text-xs font-medium tracking-[0.22em] text-white/52 uppercase">
              {block.heading}
            </h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/72">
              {block.body}
            </p>
          </section>
        ))}
      </div>
      <p className="mt-14 text-sm">
        <Link
          href={homePath}
          className="text-foreground underline decoration-white/28 underline-offset-4 transition-colors hover:decoration-white/50"
        >
          {page.backHome}
        </Link>
      </p>
    </main>
  );
}

export default function AppPrivacy() {
  const [path] = useLocation();
  const [, enParams] = useRoute("/:slug/privacy");
  const [, deParams] = useRoute("/de/:slug/privacy");
  const slug = (deParams?.slug ?? enParams?.slug ?? "").toLowerCase();
  const defaultLanguage = languageFromPathname(path);

  if (!KNOWN_APP_PRIVACY_IDS.has(slug as AppPrivacyId)) {
    return <NotFound />;
  }

  const appId = slug as AppPrivacyId;

  return (
    <LanguageProvider defaultLanguage={defaultLanguage} key={path}>
      <AppPrivacyInner appId={appId} slug={slug} />
    </LanguageProvider>
  );
}

function AppPrivacyInner({
  appId,
  slug,
}: {
  appId: AppPrivacyId;
  slug: string;
}) {
  const { appPrivacyPages } = useDictionary();
  const page = appPrivacyPages[appId];

  return (
    <>
      <AppPrivacyHead
        slug={slug}
        title={page.title}
        description={page.metaDescription}
      />
      <div
        id="top"
        className="executive-shell relative min-h-screen overflow-x-hidden bg-background text-foreground"
      >
        <div className="executive-grid" aria-hidden="true" />
        <Header />
        <AppPrivacyMain appId={appId} />
        <Footer />
      </div>
    </>
  );
}
