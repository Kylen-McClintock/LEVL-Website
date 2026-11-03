import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ActivateHero } from "@/components/activate/ActivateHero";
import { ActivateFastingSection } from "@/components/activate/ActivateFastingSection";
import { ActivateBenefitTimeline } from "@/components/activate/ActivateBenefitTimeline";
import { ActivateScienceSection } from "@/components/activate/ActivateScienceSection";
import { ActivateInteractiveIngredients } from "@/components/activate/ActivateInteractiveIngredients";
import { ActivateComparisonTable } from "@/components/activate/ActivateComparisonTable";
import { ActivateBenefitsAtEveryAge } from "@/components/activate/ActivateBenefitsAtEveryAge";
import {
  ActivateGuaranteeStrip,
  ActivateFAQ,
} from "@/components/activate/ActivateFAQ";
import { activateContent } from "@/content/productActivate";

export const metadata: Metadata = {
  title: "LEVL LIFESPAN+ Activate | Fasting-Mimetic Longevity Complex",
  description: activateContent.shortDescription,
};

export default function ActivatePage() {
  return (
    <div className="min-h-screen bg-[var(--color-levl-bg)] flex flex-col font-sans relative">
      {/* Global Twilight Background Orbs (Matches src/app/page.tsx) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_#151C3B_0%,_transparent_70%)] opacity-50 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Storefront Navigation */}
        <div className="relative z-50">
          <Navbar showCart={false} />
        </div>

        {/* Exact Section Order Matching levlhealth.com (src/app/page.tsx) */}
        <main className="flex-grow">
          <ActivateHero />
          <ActivateFastingSection />

          <ActivateBenefitTimeline />
          <div id="science">
            <ActivateScienceSection />
          </div>
          <ActivateGuaranteeStrip />
          <div id="ingredients">
            <ActivateInteractiveIngredients />
          </div>
          <ActivateComparisonTable />
          <ActivateBenefitsAtEveryAge />
          <div id="faq">
            <ActivateFAQ />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
