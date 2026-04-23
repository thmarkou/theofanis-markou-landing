import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { PrivacyHead } from "@/components/PrivacyHead";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import { languageFromPathname, pathForLanguage } from "@/lib/site";
import { Link, useLocation } from "wouter";

function PrivacyMain() {
  const { privacyPage } = useDictionary();
  const { language } = useLanguage();
  const homePath = pathForLanguage(language);

  return (
    <main className="container max-w-3xl py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {privacyPage.title}
      </h1>
      <div className="mt-10 space-y-10">
        {privacyPage.blocks.map(block => (
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
          {privacyPage.backHome}
        </Link>
      </p>
    </main>
  );
}

export default function Privacy() {
  const [path] = useLocation();
  const defaultLanguage = languageFromPathname(path);

  return (
    <LanguageProvider defaultLanguage={defaultLanguage} key={path}>
      <PrivacyHead />
      <div
        id="top"
        className="executive-shell relative min-h-screen overflow-x-hidden bg-background text-foreground"
      >
        <div className="executive-grid" aria-hidden="true" />
        <Header />
        <PrivacyMain />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
