import { useDictionary } from "@/hooks/useDictionary";

export function Footer() {
  const { footer, languageLabel } = useDictionary();

  return (
    <footer className="border-t border-white/8 py-8">
      <div className="container flex flex-col gap-4 text-sm text-white/42 md:flex-row md:items-center md:justify-between">
        <p>{footer.note}</p>
        <div className="flex flex-wrap items-center gap-3 tracking-[0.18em] uppercase">
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
      </div>
    </footer>
  );
}
