import { motion } from "framer-motion";
import { useDictionary } from "@/hooks/useDictionary";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/lib/motion";

export function Faq() {
  const { faq } = useDictionary();

  return (
    <section
      id="faq"
      className="scroll-mt-28 border-b border-white/8 py-20 md:py-28"
      aria-labelledby="faq-title"
    >
      <div className="container">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-3xl"
        >
          <motion.p variants={fadeUp} className="section-kicker">
            {faq.kicker}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="faq-title"
            className="mt-5 font-heading text-3xl font-semibold text-white md:text-5xl"
          >
            {faq.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-12 space-y-6">
            {faq.items.map(item => (
              <article
                key={item.question}
                className="executive-panel rounded-[1.25rem] p-6 md:p-8"
              >
                <h3 className="font-heading text-lg font-semibold text-white md:text-xl">
                  {item.question}
                </h3>
                <p className="mt-4 text-base leading-8 text-white/62">
                  {item.answer}
                </p>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
