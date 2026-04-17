import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { VIEWPORT_ONCE } from "@/lib/motion";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { contact, network, mission } = useDictionary();

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 border-b border-white/8 py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(130,196,255,0.09),transparent_24%),linear-gradient(180deg,transparent,rgba(255,255,255,0.02)_100%)]" />
      <div className="container relative grid gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start xl:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.72 }}
          className="space-y-7"
        >
          <div>
            <p className="section-kicker">{contact.kicker}</p>
            <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold text-white md:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
              {contact.intro}
            </p>
          </div>

          <div className="executive-panel p-6 md:p-8">
            <p className="section-kicker">{contact.responseModeKicker}</p>
            <p className="mt-4 text-base leading-8 text-white/62">
              {contact.availability}
            </p>
          </div>

          <div className="executive-panel p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#82c4ff]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="section-kicker text-[#82c4ff]">
                  {contact.emailLabel}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {contact.emailBody}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 inline-block break-all font-heading text-lg text-white transition-colors duration-300 hover:text-[#82c4ff]"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <Linkedin className="h-5 w-5 text-[#82c4ff]" />
              <p className="mt-4 section-kicker text-[#82c4ff]">
                {contact.linkedinLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {network.body}
              </p>
              <a
                href={network.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-heading text-base text-white transition-colors duration-300 hover:text-[#82c4ff]"
              >
                {contact.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
              <Mail className="h-5 w-5 text-[#82c4ff]" />
              <p className="mt-4 section-kicker text-[#82c4ff]">
                Resilience Guard GmbH
              </p>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {mission.body}
              </p>
              <a
                href={mission.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-heading text-base text-white transition-colors duration-300 hover:text-[#82c4ff]"
              >
                {mission.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
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
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
