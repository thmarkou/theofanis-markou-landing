import { motion } from "framer-motion";
import { ArrowRight, Building2, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { VIEWPORT_ONCE } from "@/lib/motion";

export function Mission() {
  const { mission } = useDictionary();

  return (
    <section
      id="mission"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/8 py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(130,196,255,0.04),transparent_22%,transparent_78%,rgba(255,255,255,0.03))]" />
      <div className="container relative grid gap-10 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.72 }}
          className="executive-panel p-7 md:p-9"
        >
          <p className="section-kicker">{mission.kicker}</p>
          <h2 className="mt-5 font-heading text-3xl font-semibold text-white md:text-5xl">
            {mission.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/64">{mission.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Button
              asChild
              className="executive-button h-auto min-h-14 w-full rounded-full px-5 py-4 text-center text-sm leading-5 tracking-[0.16em] uppercase sm:px-6"
            >
              <a
                href={mission.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center whitespace-normal text-center"
              >
                <span>{mission.primaryCta}</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto min-h-14 w-full rounded-full border-white/16 bg-white/4 px-5 py-4 text-center text-sm leading-5 tracking-[0.16em] text-white uppercase transition-all duration-300 hover:border-white/28 hover:bg-white/8 hover:text-white sm:px-6"
            >
              <a
                href="#advisory"
                className="flex w-full items-center justify-center whitespace-normal text-center"
              >
                {mission.secondaryCta}
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8 }}
          className="executive-panel overflow-hidden p-4"
        >
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(130,196,255,0.14),transparent_28%),linear-gradient(135deg,rgba(8,12,18,0.9),rgba(8,12,18,0.72)_55%,rgba(18,18,18,0.96))] p-7 md:p-8">
            <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[linear-gradient(180deg,rgba(130,196,255,0.1),transparent_30%,transparent_75%,rgba(130,196,255,0.08))] lg:block" />
            <div className="relative">
              <p className="section-kicker text-[#82c4ff]">
                {mission.executiveKicker}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">
                {mission.executiveBody}
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <MissionStat
                  icon={<Building2 className="h-5 w-5 text-[#82c4ff]" />}
                  label={mission.companyLabel}
                  value="Resilience Guard GmbH"
                />
                <MissionStat
                  icon={<ShieldCheck className="h-5 w-5 text-[#82c4ff]" />}
                  label={mission.domainLabel}
                  value={mission.domainValue}
                />
                <MissionStat
                  icon={<Cpu className="h-5 w-5 text-[#82c4ff]" />}
                  label={mission.approachLabel}
                  value={mission.approachValue}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface MissionStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MissionStat({ icon, label, value }: MissionStatProps) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/28 px-4 py-5 backdrop-blur-sm">
      {icon}
      <p className="mt-3 text-sm text-white/50">{label}</p>
      <p className="mt-1 font-heading text-xl text-white">{value}</p>
    </div>
  );
}
