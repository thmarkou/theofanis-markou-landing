import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import { scrollToPageTop } from "@/lib/scroll";

/** Show control once the user has left the initial viewport (first “screen”). */
function useScrolledPastFirstScreen(): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const threshold = () =>
      Math.max(120, Math.floor(window.innerHeight * 0.22));

    const update = () => {
      setPast(window.scrollY >= threshold());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return past;
}

export function Footer() {
  const { footer, languageLabel, nav } = useDictionary();
  const showBackToTop = useScrolledPastFirstScreen();

  return (
    <footer className="border-t border-white/8 py-8">
      <div className="container flex flex-col gap-4 text-sm text-white/42">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <p className="md:max-w-xl">{footer.note}</p>
          <div className="flex flex-col items-stretch gap-3 md:items-end">
            <div className="flex flex-wrap items-center gap-3 tracking-[0.18em] uppercase md:justify-end">
              <span>{languageLabel}</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span>Theofanis Markou</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <a
                href="#contact-form"
                className="tracking-normal transition-colors duration-300 hover:text-white/72"
              >
                {footer.contactLinkLabel}
              </a>
            </div>
            {showBackToTop ? (
              <button
                type="button"
                onClick={() => scrollToPageTop()}
                className="inline-flex items-center gap-2 self-end text-[0.72rem] font-medium tracking-[0.2em] text-white/52 uppercase transition-colors duration-300 hover:text-[#82c4ff]"
              >
                <ChevronUp className="h-4 w-4 shrink-0" aria-hidden />
                {nav.scrollToTopLabel}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
