import type { Variants } from "framer-motion";

/**
 * Shared motion presets.
 *
 * Centralised so every section uses the same entrance rhythm — aligned with
 * the Swiss Editorial Command design language (restrained, short, opacity-led).
 * framer-motion automatically respects `prefers-reduced-motion` when the
 * `MotionConfig` reducedMotion="user" wrapper is in place on the page root.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export const stagger: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.22 } as const;
