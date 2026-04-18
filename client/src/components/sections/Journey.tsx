import { motion } from "framer-motion";
import { useDictionary } from "@/hooks/useDictionary";
import { images } from "@/lib/images";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

export function Journey() {
  const { journey } = useDictionary();

  return (
    <section
      id="journey"
      className="relative scroll-mt-28 border-b border-white/8 py-20 md:py-28"
    >
      <div className="container grid gap-14 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div>
            <p className="section-kicker">{journey.kicker}</p>
            <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold text-white md:text-5xl">
              {journey.title}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/64">
            {journey.intro}
          </p>
          <div className="executive-panel overflow-hidden p-4">
            <img
              src={images.timeline}
              alt={journey.imageAlt}
              loading="lazy"
              className="h-full w-full rounded-[1.5rem] object-cover [filter:brightness(0.82)_saturate(0.92)]"
            />
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative"
        >
          <div className="absolute left-[1.05rem] top-0 h-full w-px bg-gradient-to-b from-[#6bb7ff] via-white/12 to-transparent md:left-[1.45rem]" />
          <div className="space-y-8">
            {journey.timeline.map((item, index) => {
              const isLatest = index === journey.timeline.length - 1;
              return (
                <motion.article
                  key={`${item.year}-${item.title}`}
                  variants={fadeUp}
                  className="timeline-card relative ml-0 pl-12 md:pl-16"
                >
                  <span className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#71bcff]/35 bg-[#0d1620] shadow-[0_0_0_6px_rgba(18,18,18,0.95)] md:h-10 md:w-10">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isLatest
                          ? "bg-[#82c4ff] shadow-[0_0_18px_rgba(130,196,255,0.9)]"
                          : "bg-white/60"
                      }`}
                    />
                  </span>
                  <div className="executive-panel p-6 md:p-8">
                    <div className="flex flex-col gap-3 border-b border-white/8 pb-4 md:flex-row md:items-center md:justify-between">
                      <h3 className="font-heading text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] tracking-[0.18em] text-white/56 uppercase">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
