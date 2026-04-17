import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { useDictionary } from "@/hooks/useDictionary";
import { images } from "@/lib/images";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

const FOCUS_ICONS: readonly LucideIcon[] = [ShieldCheck, Cpu, Sparkles];
const LEADERSHIP_ICONS: readonly LucideIcon[] = [
  Waypoints,
  BriefcaseBusiness,
  Target,
];

export function FocusAreas() {
  const { focus } = useDictionary();

  return (
    <section
      id="focus"
      className="relative scroll-mt-28 border-b border-white/8 py-20 md:py-28"
    >
      <div className="container grid gap-14 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start xl:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.72 }}
            className="max-w-3xl"
          >
            <p className="section-kicker">{focus.kicker}</p>
            <h2 className="mt-5 font-heading text-3xl font-semibold text-white md:text-5xl">
              {focus.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              {focus.intro}
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-10 grid gap-5 lg:grid-cols-3"
          >
            {focus.areas.map((area, index) => {
              const Icon = FOCUS_ICONS[index] ?? Target;
              return (
                <motion.article
                  key={area.title}
                  variants={fadeUp}
                  className="executive-panel h-full p-6 md:p-7"
                >
                  <div className="flex items-center justify-between border-b border-white/8 pb-5">
                    <Icon className="h-5 w-5 text-[#82c4ff]" />
                    <span className="text-[0.72rem] tracking-[0.18em] text-white/38 uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-white">
                    {area.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-white/60">
                    {area.body}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.68 }}
            className="mt-6 executive-panel grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#82c4ff]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="section-kicker">{focus.educationKicker}</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-white">
                {focus.educationTitle}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-8 text-white/60">
                {focus.educationBody}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.75 }}
          className="space-y-5"
        >
          <div className="executive-panel overflow-hidden p-4">
            <img
              src={images.focus}
              alt={focus.imageAlt}
              loading="lazy"
              className="h-[360px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div className="executive-panel p-6 md:p-7">
            <p className="section-kicker">{focus.leadershipLensKicker}</p>
            <div className="mt-5 space-y-4 text-white/62">
              {focus.leadershipBullets.map((bullet, index) => {
                const Icon = LEADERSHIP_ICONS[index] ?? Target;
                return (
                  <div key={bullet} className="flex items-start gap-4">
                    <Icon className="mt-1 h-5 w-5 text-[#82c4ff]" />
                    <p className="leading-7">{bullet}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
