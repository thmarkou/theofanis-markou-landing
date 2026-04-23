import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { images } from "@/lib/images";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

export function Hero() {
  const { hero } = useDictionary();

  return (
    <section className="relative overflow-hidden border-b border-white/8">
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="h-full w-full object-cover opacity-44"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(72,153,255,0.18),transparent_32%),linear-gradient(110deg,rgba(8,10,14,0.92)_15%,rgba(18,18,18,0.85)_48%,rgba(18,18,18,0.96)_100%)]" />
      </div>

      <div className="container relative py-14 md:py-20 xl:py-28">
        <div className="grid gap-16 xl:grid-cols-[minmax(0,220px)_minmax(0,1fr)] xl:gap-20">
          <motion.aside
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex flex-col gap-6 border-white/10 xl:border-r xl:pr-10"
          >
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="section-kicker">{hero.rail.identityKicker}</p>
              <p className="text-sm leading-7 text-white/62">{hero.eyebrow}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="w-full max-w-[200px]">
              <img
                src={images.portrait}
                alt={hero.portraitAlt}
                width={400}
                height={533}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full rounded-[1rem] border border-white/12 object-cover object-top shadow-[0_24px_48px_-28px_rgba(0,0,0,0.65)]"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="section-kicker">{hero.rail.positioningKicker}</p>
              <p className="text-sm leading-7 text-white/62">
                {hero.rail.positioningBody}
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-2">
              <p className="section-kicker">{hero.rail.educationKicker}</p>
              <p className="text-sm leading-7 text-white/62">
                {hero.rail.educationBody}
              </p>
            </motion.div>
          </motion.aside>

          <div className="grid gap-12 xl:grid-cols-[minmax(0,1.1fr)_minmax(290px,0.6fr)] xl:items-end">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="space-y-8"
            >
              <motion.p
                variants={fadeUp}
                className="section-kicker text-[#82c4ff]"
              >
                {hero.kicker}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="max-w-4xl font-heading text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl xl:text-[5.4rem]"
              >
                {hero.title}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-lg leading-8 text-white/70 md:text-xl"
              >
                {hero.subtitle}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-base leading-8 text-white/58 md:text-lg"
              >
                {hero.body}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  asChild
                  className="executive-button rounded-full px-7 py-6 text-sm tracking-[0.16em] uppercase"
                >
                  <a href="#journey">
                    {hero.primaryCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/16 bg-white/4 px-7 py-6 text-sm tracking-[0.16em] text-white uppercase transition-all duration-300 hover:border-white/28 hover:bg-white/8 hover:text-white"
                >
                  <a href="#mission">{hero.secondaryCta}</a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.75 }}
              className="executive-panel p-6 md:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="section-kicker">{hero.overviewKicker}</p>
                  <p className="mt-2 text-sm text-white/58">
                    {hero.overviewBody}
                  </p>
                </div>
                <Globe className="h-5 w-5 text-[#82c4ff]" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {hero.metrics.map(metric => (
                  <div
                    key={metric.label}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] px-5 py-5"
                  >
                    <p className="font-heading text-3xl font-semibold text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/56">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.4rem] border border-[#3f7ebe]/30 bg-[#0e1a27]/45 p-5">
                <p className="section-kicker text-[#82c4ff]">
                  {hero.currentFocusKicker}
                </p>
                <p className="mt-3 text-base leading-7 text-white/72">
                  {hero.currentFocusBody}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 text-white/34">
          <span className="h-px flex-1 bg-white/10" />
          <ChevronDown className="h-4 w-4" />
          <span className="h-px w-20 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
