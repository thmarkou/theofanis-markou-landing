/*
Design Philosophy: Swiss Editorial Command
The 404 page must stay inside the dark executive visual contract: charcoal
foundation, controlled blue accent, editorial restraint. No soft consumer
gradients or light cards — users landing here should feel the same brand.
*/

import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="executive-shell min-h-screen bg-background text-foreground">
      <div className="executive-grid" aria-hidden="true" />
      <main className="container flex min-h-screen flex-col items-center justify-center gap-10 py-20 text-center">
        <p className="section-kicker text-[#82c4ff]">Error 404</p>

        <div className="flex flex-col items-center gap-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#82c4ff]">
            <AlertTriangle className="h-7 w-7" />
          </span>
          <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
            The page you requested is not available.
          </h1>
          <p className="max-w-xl text-base leading-8 text-white/62 md:text-lg">
            The link may have moved, been retired, or never existed. Return to
            the executive landing page to continue.
          </p>
        </div>

        <Button
          onClick={() => setLocation("/")}
          className="executive-button rounded-full px-7 py-6 text-sm tracking-[0.16em] uppercase"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to home
        </Button>
      </main>
    </div>
  );
}
