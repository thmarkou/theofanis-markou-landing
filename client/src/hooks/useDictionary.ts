import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { content, type Dictionary } from "@/lib/siteContent";

/**
 * Returns the Dictionary for the currently active language.
 *
 * Provided as a hook (rather than direct `content[language]` access in every
 * component) so consumers never have to import both the Language type and
 * the content map, and so future enrichment (e.g. fallback keys, runtime
 * overrides) happens in one place.
 */
export function useDictionary(): Dictionary {
  const { language } = useLanguage();
  return useMemo(() => content[language], [language]);
}
