import { Link } from "wouter";
import { motion } from "framer-motion";
import { useDictionary } from "@/hooks/useDictionary";
import { useLanguage } from "@/contexts/LanguageContext";
import { APPS_CATALOG } from "@/lib/appsCatalog";
import { appPrivacyPathForLanguage } from "@/lib/site";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

/** Catalogue of public apps — add entries in appsCatalog + siteContent. */
export function SelectedWorkTeaser() {
  const { workTeaser } = useDictionary();
  const { language } = useLanguage();

  return (
    <section
      id="selected-work"
      className="scroll-mt-28 border-b border-white/8 py-16 md:py-24"
      aria-labelledby="selected-work-title"
    >
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="section-kicker">{workTeaser.kicker}</p>
            <h2
              id="selected-work-title"
              className="mt-4 font-heading text-2xl font-semibold text-white md:text-4xl"
            >
              {workTeaser.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/62">
              {workTeaser.body}
            </p>
          </motion.div>

          <ul className="space-y-4">
            {APPS_CATALOG.map(app => {
              const copy = workTeaser.apps.find(item => item.id === app.id);
              if (!copy) {
                return null;
              }

              const statusLabel = workTeaser.statusLabels[app.status];
              const privacyHref = appPrivacyPathForLanguage(app.slug, language);

              return (
                <motion.li
                  key={app.id}
                  variants={fadeUp}
                  className="executive-panel rounded-[1.25rem] p-7 md:p-9"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
                      {copy.name}
                    </h3>
                    <span className="rounded-full border border-white/14 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase">
                      {statusLabel}
                    </span>
                    <span className="text-xs tracking-[0.12em] text-white/40 uppercase">
                      {copy.platformsLabel}
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-7 text-white/62">
                    {copy.tagline}
                  </p>
                  <p className="mt-5 text-sm">
                    <Link
                      href={privacyHref}
                      className="text-foreground underline decoration-white/28 underline-offset-4 transition-colors hover:decoration-white/50"
                    >
                      {workTeaser.privacyLabel}
                    </Link>
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
