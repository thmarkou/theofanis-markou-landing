import { MotionConfig } from "framer-motion";
import { Advisory } from "@/components/sections/Advisory";
import { Contact } from "@/components/sections/Contact";
import { FocusAreas } from "@/components/sections/FocusAreas";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Mission } from "@/components/sections/Mission";
import { Network } from "@/components/sections/Network";
import { LanguageProvider } from "@/contexts/LanguageContext";

/**
 * Home composition root.
 *
 * Keeps the page declarative and flat: each section manages its own markup,
 * content, and animations, while this component only sets up the shared
 * language context and the single global motion configuration. Adding or
 * re-ordering sections now requires a single edit here.
 */
export default function Home() {
  return (
    <LanguageProvider>
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
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
}
