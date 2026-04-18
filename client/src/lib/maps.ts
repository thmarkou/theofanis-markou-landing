/**
 * Static map URLs for Resilience Guard head office (Turmstrasse 18, Steinhausen, CH).
 * Source: https://www.resilienceguard.ch/
 */
const QUERY = "Turmstrasse+18,+6312+Steinhausen,+Switzerland";

/** Opens native / Google Maps in a new tab. */
export const RESILIENCE_GUARD_GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${QUERY}`;

/** iframe src — no API key; standard Google Maps embed query. */
export const RESILIENCE_GUARD_MAP_EMBED_URL = `https://www.google.com/maps?q=${QUERY}&z=15&output=embed`;
