import { MotionConfig } from "framer-motion";
import { useLocation } from "wouter";
import { SeoHead } from "@/components/SeoHead";
import { Advisory } from "@/components/sections/Advisory";
import { CompanyMap } from "@/components/sections/CompanyMap";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { FocusAreas } from "@/components/sections/FocusAreas";
import { FloatingBackToTop } from "@/components/FloatingBackToTop";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Mission } from "@/components/sections/Mission";
import { Network } from "@/components/sections/Network";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { languageFromPathname } from "@/lib/site";

/**
 * Home composition root.
 *
 * Language is derived from the URL (`/` = English, `/de` = German) so
 * hreflang, canonical URLs, and crawlers stay consistent.
 */
export default function Home() {
  const [path] = useLocation();
  const defaultLanguage = languageFromPathname(path);

  return (
    <LanguageProvider defaultLanguage={defaultLanguage} key={path}>
      <SeoHead />
      <MotionConfig reducedMotion="user">
        <div
          id="top"
          className="executive-shell relative min-h-screen overflow-x-hidden bg-background text-foreground"
        >
          <div className="executive-grid" aria-hidden="true" />
          <Header />
          <main>
            <Hero />
            <Journey />
            <FocusAreas />
            <Mission />
            <Advisory />
            <Contact />
            <Network />
            <Faq />
            <CompanyMap />
          </main>
          <Footer />
          <FloatingBackToTop />
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
}
