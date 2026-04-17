/**
 * Remote image URLs used across page sections.
 *
 * Kept in a single module so the full set of external assets is visible at a
 * glance, and so future swaps (to self-hosted CDN, optimized variants, etc.)
 * happen in exactly one place.
 */

export const images = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663172583062/jPqUK7UdBGcjwjAVYnpThq/theofanis-hero-executive-architecture-DXBJFBbDpuACPLTNpSc3w2.webp",
  focus:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663172583062/jPqUK7UdBGcjwjAVYnpThq/theofanis-cyber-resilience-grid-e4RpKmQhbQFHKc79CXz22U.webp",
  timeline:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663172583062/jPqUK7UdBGcjwjAVYnpThq/theofanis-timeline-blueprint-Z4xbtuLYHEwbdMeJd2MDEP.webp",
  networking:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663172583062/jPqUK7UdBGcjwjAVYnpThq/theofanis-networking-constellation-ibGi79hB4gnVwtBhUEwEZw.webp",
} as const;
