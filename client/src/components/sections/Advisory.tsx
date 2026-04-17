import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Cpu,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { VIEWPORT_ONCE } from "@/lib/motion";

const SERVICE_ICONS: readonly LucideIcon[] = [Cpu, BriefcaseBusiness];
const SERVICE_ANCHORS: readonly string[] = ["software-development", "consulting"];

export function Advisory() {
  const { advisory, network, mission } = useDictionary();

  return (
    <section
      id="advisory"
      className="relative scroll-mt-28 border-b border-white/8 py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(130,196,255,0.08),transparent_24%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02)_100%)]" />
      <div className="container relative grid gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.72 }}
          className="space-y-7"
        >
          <div>
            <p className="section-kicker">{advisory.kicker}</p>
            <h2 className="mt-5 max-w-2xl font-heading text-3xl font-semibold text-white md:text-5xl">
              {advisory.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
              {advisory.intro}
            </p>
          </div>

          <div className="executive-panel p-6 md:p-8">
            <p className="section-kicker">{advisory.distinctionTitle}</p>
            <p className="mt-4 text-base leading-8 text-white/62">
              {advisory.distinctionBody}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="executive-panel p-6">
              <p className="section-kicker">{advisory.executiveMandateKicker}</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-white">
                Resilience Guard GmbH
              </h3>
              <p className="mt-4 text-base leading-8 text-white/60">
                {mission.executiveBody}
              </p>
            </div>
            <div className="executive-panel p-6">
              <p className="section-kicker">{advisory.privatePracticeKicker}</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-white">
                {advisory.practiceTitle}
              </h3>
              <p className="mt-4 text-base leading-8 text-white/60">
                {advisory.practiceBody}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.76 }}
          className="executive-panel p-6 md:p-8"
        >
          <div className="flex items-center justify-between border-b border-white/8 pb-5">
            <div>
              <p className="section-kicker">
                {advisory.serviceArchitectureKicker}
              </p>
              <p className="mt-2 text-sm text-white/56">
                {advisory.serviceArchitectureSupport}
              </p>
            </div>
            <Sparkles className="h-5 w-5 text-[#82c4ff]" />
          </div>

          <div className="mt-6 grid gap-5">
            {advisory.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index] ?? ShieldCheck;
              const anchor = SERVICE_ANCHORS[index];
              return (
                <article
                  id={anchor}
                  key={service.title}
                  className="scroll-mt-28 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6"
                >
                  <div className="flex items-center justify-between border-b border-white/8 pb-5">
                    <Icon className="h-5 w-5 text-[#82c4ff]" />
                    <span className="text-[0.72rem] tracking-[0.18em] text-white/38 uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-white/60">
                    {service.body}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              className="executive-button rounded-full px-7 py-6 text-sm tracking-[0.16em] uppercase"
            >
              <a href={network.linkedinUrl} target="_blank" rel="noreferrer">
                {advisory.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/16 bg-white/4 px-7 py-6 text-sm tracking-[0.16em] text-white uppercase transition-all duration-300 hover:border-white/28 hover:bg-white/8 hover:text-white"
            >
              <a href="#mission">{advisory.secondaryCta}</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
