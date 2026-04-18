import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import {
  RESILIENCE_GUARD_GOOGLE_MAPS_URL,
  RESILIENCE_GUARD_MAP_EMBED_URL,
} from "@/lib/maps";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Office map + address on every viewport: single column on small screens,
 * two columns from `lg` up. The iframe is never hidden by CSS.
 */
export function CompanyMap() {
  const { location } = useDictionary();

  return (
    <section
      id="location"
      className="scroll-mt-28 border-b border-white/8 py-20 md:py-28"
      aria-labelledby="location-title"
    >
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-stretch lg:gap-14"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="section-kicker">{location.kicker}</p>
            <h2
              id="location-title"
              className="font-heading text-3xl font-semibold text-white md:text-4xl"
            >
              {location.title}
            </h2>
            <p className="max-w-md text-base leading-8 text-white/58">
              {location.intro}
            </p>
            <address className="not-italic">
              <ul className="space-y-1 text-base leading-8 text-white/72">
                {location.addressLines.map(line => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </address>
            <a
              href={RESILIENCE_GUARD_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#82c4ff] transition-colors hover:text-[#a8d4ff]"
            >
              {location.openMapsLabel}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="executive-panel overflow-hidden rounded-[1.25rem] p-0"
          >
            <div className="relative aspect-[4/3] w-full min-h-[220px] md:min-h-[260px] md:aspect-video lg:min-h-[300px] xl:min-h-[340px]">
              <iframe
                title={location.mapIframeTitle}
                src={RESILIENCE_GUARD_MAP_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
