import { motion } from "framer-motion";
import { useDictionary } from "@/hooks/useDictionary";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

/** Placeholder for a future dedicated selected-work / portfolio route or page. */
export function SelectedWorkTeaser() {
  const { workTeaser } = useDictionary();

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
          <motion.div
            variants={fadeUp}
            className="executive-panel rounded-[1.25rem] p-7 md:p-9"
          >
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
        </motion.div>
      </div>
    </section>
  );
}
