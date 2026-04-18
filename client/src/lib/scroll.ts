/**
 * Smooth-scroll helpers for in-page navigation (used by header / mobile menu).
 */
export function scrollToPageTop(): void {
  const el = document.getElementById("top");
  if (!el) return;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  el.scrollIntoView({ behavior, block: "start" });
}
