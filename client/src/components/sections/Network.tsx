import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { images } from "@/lib/images";
import { VIEWPORT_ONCE } from "@/lib/motion";

export function Network() {
  const { network, mission, contact } = useDictionary();

  return (
    <section
      id="network"
      className="relative scroll-mt-28 overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 opacity-55">
        <img
          src={images.networking}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,10,14,0.96)_15%,rgba(18,18,18,0.78)_58%,rgba(18,18,18,0.92)_100%)]" />
      </div>

      <div className="container relative grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.65fr)] xl:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <p className="section-kicker">{network.kicker}</p>
          <h2 className="mt-5 font-heading text-3xl font-semibold text-white md:text-5xl">
            {network.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            {network.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.78 }}
          className="executive-panel p-7 md:p-8"
        >
          <div className="flex items-center justify-between border-b border-white/8 pb-5">
            <div>
              <p className="section-kicker">{network.panelKicker}</p>
              <p className="mt-2 text-sm text-white/56">
                {network.panelSupport}
              </p>
            </div>
            <Linkedin className="h-5 w-5 text-[#82c4ff]" />
          </div>
          <div className="mt-6 space-y-4 text-white/62">
            <p className="leading-8">{network.panelBody}</p>
          </div>
          <div className="mt-7 flex flex-col gap-4">
            <Button
              asChild
              className="executive-button rounded-full px-7 py-6 text-sm tracking-[0.16em] uppercase"
            >
              <a href={network.linkedinUrl} target="_blank" rel="noreferrer">
                {network.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/16 bg-white/4 px-7 py-6 text-sm tracking-[0.16em] text-white uppercase transition-all duration-300 hover:border-white/28 hover:bg-white/8 hover:text-white"
            >
              <a href="#contact-form">
                {contact.viaFormCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/16 bg-white/4 px-7 py-6 text-sm tracking-[0.16em] text-white uppercase transition-all duration-300 hover:border-white/28 hover:bg-white/8 hover:text-white"
            >
              <a href={mission.url} target="_blank" rel="noreferrer">
                {network.secondaryCta}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
