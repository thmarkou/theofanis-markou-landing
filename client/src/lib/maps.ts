/**
 * Map embed + external links for office locations (order matches `location.offices` in siteContent).
 */
const CH_QUERY = "Turmstrasse+18,+6312+Steinhausen,+Switzerland";
const GR_QUERY = "Ionias+71,+54453+Thessaloniki,+Greece";

export const OFFICE_LOCATION_MAPS = [
  {
    googleSearchUrl: `https://www.google.com/maps/search/?api=1&query=${CH_QUERY}`,
    embedUrl: `https://www.google.com/maps?q=${CH_QUERY}&z=15&output=embed`,
  },
  {
    googleSearchUrl: `https://www.google.com/maps/search/?api=1&query=${GR_QUERY}`,
    embedUrl: `https://www.google.com/maps?q=${GR_QUERY}&z=15&output=embed`,
  },
] as const;
