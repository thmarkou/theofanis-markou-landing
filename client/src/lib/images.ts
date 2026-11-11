/**
 * Image URLs used across page sections.
 *
 * Kept in a single module so the full set of assets is visible at a
 * glance, and so future swaps (optimized variants, CDN, etc.) happen
 * in exactly one place.
 *
 * Prefer self-hosted files under `client/public/images/` — external
 * Manus CloudFront URLs previously used here expired with HTTP 403.
 */

export const images = {
  /** Local asset in `client/public/images/fanis.png` */
  portrait: "/images/fanis.png",
  hero: "/images/hero-executive-architecture.jpg",
  focus: "/images/cyber-resilience-grid.jpg",
  timeline: "/images/timeline-blueprint.jpg",
  networking: "/images/networking-constellation.jpg",
} as const;
