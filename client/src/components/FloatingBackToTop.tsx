import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import { scrollToPageTop } from "@/lib/scroll";

/**
 * Fixed to the viewport: stays available for the whole scroll depth after the
 * user leaves the first screen. Not rendered while still on that first screen.
 */
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

export function FloatingBackToTop() {
  const { nav } = useDictionary();
  const visible = useScrolledPastFirstScreen();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined" || !visible) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed z-40 flex justify-end"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        left: "max(1rem, env(safe-area-inset-left, 0px))",
      }}
    >
      <button
        type="button"
        onClick={() => scrollToPageTop()}
        className="pointer-events-auto inline-flex max-w-[min(100%,18rem)] items-center gap-2 rounded-full border border-white/14 bg-[#121212]/88 px-4 py-3 text-left text-[0.68rem] font-medium tracking-[0.18em] text-white/78 uppercase shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[transform,box-shadow,border-color] hover:border-[#82c4ff]/35 hover:text-white hover:shadow-[0_14px_44px_rgba(0,0,0,0.5)] active:scale-[0.98] md:px-5 md:py-3.5 md:text-[0.72rem] md:tracking-[0.2em]"
      >
        <ChevronUp className="h-4 w-4 shrink-0 text-[#82c4ff]" aria-hidden />
        <span className="min-w-0 leading-snug">{nav.scrollToTopLabel}</span>
      </button>
    </div>,
    document.body
  );
}
