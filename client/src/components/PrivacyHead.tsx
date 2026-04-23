import { useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import { SITE_ORIGIN, canonicalPrivacyUrl } from "@/lib/site";
import { useEffect } from "react";

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

const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

/** SEO head for `/privacy` and `/de/privacy` (no FAQ JSON-LD). */
export function PrivacyHead() {
  const { language } = useLanguage();
  const { privacyPage } = useDictionary();
  const title = `${privacyPage.title} · Theofanis Markou`;
  const description = privacyPage.metaDescription;
  const canonical = canonicalPrivacyUrl(language);

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

  return null;
}
