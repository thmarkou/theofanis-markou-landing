/**
 * Smooth-scroll helpers for in-page navigation (used by header / mobile menu).
 */
export function scrollToPageTop(): void {
  const el = document.getElementById("top");
  if (!el) {
    window.scrollTo(0, 0);
    return;
  }
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  el.scrollIntoView({ behavior, block: "start" });
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/** Scroll to an element by id (e.g. contact-form) after SPA route changes. */
export function scrollToElementId(id: string, attempts = 12): void {
  const tryScroll = (left: number) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      return;
    }
    if (left <= 0) return;
    window.setTimeout(() => tryScroll(left - 1), 50);
  };
  tryScroll(attempts);
}

/**
 * After landing on Home (or any route), honor `#hash` or reset to top.
 * Call from a useEffect keyed on the wouter path.
 */
export function restoreScrollForRoute(): void {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    scrollToElementId(hash);
    return;
  }
  window.scrollTo(0, 0);
}
