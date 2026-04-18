import { useEffect } from "react";
import { canonicalUrlForLanguage, SITE_ORIGIN } from "@/lib/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import { seoDescriptions, seoTitles } from "@/lib/seoCopy";

function setMetaName(name: string, content: string): void {
  const el =
    Array.from(document.querySelectorAll("meta")).find(
      m => m.getAttribute("name") === name
    ) ?? (() => {
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
    ) ?? (() => {
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

const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

/**
 * Client-side SEO: updates document title, meta description, canonical URL,
 * Open Graph and Twitter tags per active language. Injects FAQPage JSON-LD
 * that mirrors the visible FAQ section (required for valid FAQ rich results).
 */
export function SeoHead() {
  const { language } = useLanguage();
  const { faq } = useDictionary();

  const title = seoTitles[language];
  const description = seoDescriptions[language];
  const canonical = canonicalUrlForLanguage(language);

  useEffect(() => {
    document.title = title;
    setMetaName("description", description);
    setCanonicalHref(canonical);

    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonical);
    setMetaProperty("og:image", OG_IMAGE);
    setMetaProperty("og:image:width", "1200");
    setMetaProperty("og:image:height", "630");
    setMetaProperty("og:locale", language === "de" ? "de_DE" : "en_US");
    setMetaProperty(
      "og:locale:alternate",
      language === "de" ? "en_US" : "de_DE"
    );

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", description);
    setMetaName("twitter:image", OG_IMAGE);
  }, [title, description, canonical, language]);

  useEffect(() => {
    const id = "seo-faq-jsonld";
    document.getElementById(id)?.remove();

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [faq.items, language]);

  return null;
}
