import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ActivateHero } from "@/components/activate/ActivateHero";
import { ActivateFastingSection } from "@/components/activate/ActivateFastingSection";
import { ActivateBenefitTimeline } from "@/components/activate/ActivateBenefitTimeline";
import { ActivateInteractiveIngredients } from "@/components/activate/ActivateInteractiveIngredients";
import { ActivateScienceSection } from "@/components/activate/ActivateScienceSection";
import { ActivateComparisonTable } from "@/components/activate/ActivateComparisonTable";
import { ActivateBenefitsAtEveryAge } from "@/components/activate/ActivateBenefitsAtEveryAge";
import { ActivateFAQ } from "@/components/activate/ActivateFAQ";

export const metadata: Metadata = {
  title:
    "LIFESPAN+ Activate | Breakthrough Fasting-Mimetic & NAD+ Longevity Complex | LEVL Health",
  description:
    "Patented, fasting-inspired cellular renewal, NAD+ bioenergetics, and all-12-Hallmarks longevity support—even with breakfast. 14 evidence-backed actives formulated by PhD researchers and guided by LEVL's AI Synergy Engine.",
};

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[var(--color-levl-bg)] flex flex-col font-sans relative text-white selection:bg-amber-400/30">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.14)_0%,_transparent_70%)] opacity-60 blur-[130px]" />
        <div className="absolute top-[35%] left-[-10%] w-[75vw] h-[75vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
      </div>

      {/* Global Navigation */}
      <div className="relative z-50">
        <Navbar showCart={false} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow pt-20 md:pt-24">
        {/* 1. Product Hero: Gallery + Waitlist & Protocol Quiz CTA + StatsBar */}
        <div id="waitlist-hero">
          <ActivateHero />
        </div>

        {/* Sticky Section Quick-Jump Bar */}
        <nav
          aria-label="Activate page sections"
          className="sticky top-16 z-40 bg-[#070A0F]/90 backdrop-blur-md border-y border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-6 py-3 min-w-max text-xs font-bold uppercase tracking-wider text-gray-400">
              <a
                href="#fasting-mimetic"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Fasting-Mimetic &amp; 4 Pillars
              </a>
              <a
                href="#benefit-timeline"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Timeline of Benefits
              </a>
              <a
                href="#ingredients-matrix"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                14 Ingredient Elements
              </a>
              <a
                href="#core-biology"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Clinical Science
              </a>
              <a
                href="#comparison"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                Comparison
              </a>
              <a
                href="#benefits-by-age"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                By Age (20s–60+)
              </a>
              <a
                href="#faq"
                className="px-3 py-1.5 rounded-full hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                24/7 System &amp; FAQ
              </a>
            </div>
          </div>
        </nav>

        {/* 2. Fasting-Mimetic Story, Nerd Mode, Fasting Windows & 4 Core Pillars */}
        <div id="fasting-mimetic">
          <ActivateFastingSection />
        </div>

        {/* 3. Timeline of Benefits (Element-Square Framed + Edge-Weighted Opacity Connectors) */}
        <div id="benefit-timeline">
          <ActivateBenefitTimeline />
        </div>

        {/* 4. 14 Interactive Ingredient Element Squares (Longevity + Functional Benefits) */}
        <div id="ingredients-matrix">
          <ActivateInteractiveIngredients />
        </div>

        {/* 5. Core Biology, Clinical Study Benchmarks & AI Synergy Engine */}
        <div id="core-biology">
          <ActivateScienceSection />
        </div>

        {/* 6. Category Comparison Table */}
        <ActivateComparisonTable />

        {/* 7. Benefits at Every Age (20s, 30s, 40s, 50s, 60+) */}
        <ActivateBenefitsAtEveryAge />

        {/* 8. 24/7 Bio-Synchronized Pairing (DeepCell), Guarantee Strip, FAQ & Bottom Waitlist */}
        <ActivateFAQ />
      </main>

      <Footer />
    </div>
  );
}
