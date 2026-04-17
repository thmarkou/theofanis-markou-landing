import { useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import type { Language } from "@/lib/siteContent";

export function Header() {
  const dictionary = useDictionary();
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = dictionary.nav.items;
  const mobileNavItems = [...navItems, ...dictionary.nav.mobileExtra];

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#121212]/72 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <a
          href="#top"
          className="flex items-center gap-4 text-sm tracking-[0.22em] text-white/88 uppercase"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[0.7rem] font-semibold">
            TM
          </span>
          <span className="hidden flex-col md:flex">
            <span className="font-heading text-[0.78rem]">Theofanis Markou</span>
            <span className="text-[0.66rem] text-white/45">
              CTO · Resilience Guard GmbH
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.73rem] font-medium tracking-[0.22em] text-white/54 uppercase transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguagePill
            language={language}
            switchLabel={dictionary.switchLabel}
            onChange={setLanguage}
          />
          <Button
            asChild
            className="executive-button min-w-[176px] rounded-full px-6"
          >
            <a href="#contact">{dictionary.contact.kicker}</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white lg:hidden"
          onClick={() => setMobileOpen(open => !open)}
          aria-expanded={mobileOpen}
          aria-label={dictionary.nav.toggle}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/8 bg-[#121212]/95 lg:hidden">
          <div className="container flex flex-col gap-6 py-6">
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <div className="flex items-center gap-2 text-[0.72rem] tracking-[0.18em] text-white/50 uppercase">
                <Languages className="h-4 w-4" />
                {dictionary.languageLabel}
              </div>
              <LanguagePill
                language={language}
                switchLabel={dictionary.switchLabel}
                onChange={setLanguage}
              />
            </div>
            <nav className="flex flex-col gap-4">
              {mobileNavItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/8 pb-4 text-sm tracking-[0.18em] text-white/72 uppercase"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

interface LanguagePillProps {
  language: Language;
  switchLabel: string;
  onChange: (language: Language) => void;
}

function LanguagePill({ language, switchLabel, onChange }: LanguagePillProps) {
  return (
    <div className="language-pill" role="group" aria-label={switchLabel}>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={language === "en" ? "is-active" : ""}
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <span className="text-white/20">|</span>
      <button
        type="button"
        onClick={() => onChange("de")}
        className={language === "de" ? "is-active" : ""}
        aria-pressed={language === "de"}
      >
        DE
      </button>
    </div>
  );
}
