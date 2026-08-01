import { describe, expect, it } from "vitest";
import { APPS_CATALOG, type AppId } from "./appsCatalog";
import { content, type Language } from "./siteContent";

const languages: Language[] = ["en", "de"];

describe("APPS_CATALOG content coverage", () => {
  it("gives every catalog app a unique slug and id", () => {
    const ids = APPS_CATALOG.map(app => app.id);
    const slugs = APPS_CATALOG.map(app => app.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(languages)(
    "has product page, privacy page, and teaser copy for every catalog app (%s)",
    lang => {
      const dict = content[lang];
      for (const app of APPS_CATALOG) {
        const id: AppId = app.id;
        expect(
          dict.appProductPages[id],
          `missing appProductPages.${id} (${lang})`,
        ).toBeDefined();
        expect(
          dict.appPrivacyPages[id],
          `missing appPrivacyPages.${id} (${lang})`,
        ).toBeDefined();
        expect(
          dict.workTeaser.apps.some(item => item.id === id),
          `missing workTeaser.apps entry for ${id} (${lang})`,
        ).toBe(true);
        expect(dict.appProductPages[id].headline.length).toBeGreaterThan(0);
        expect(dict.appPrivacyPages[id].blocks.length).toBeGreaterThan(0);
      }
    },
  );
});
