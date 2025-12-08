import { Container } from "@/components/ui/Container";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { Navbar } from "@/components/sections/Navbar";
import { TopHero } from "@/components/sections/TopHero";
import { Hero } from "@/components/sections/Hero";
import { TaglineBand } from "@/components/sections/TaglineBand";
import { BenefitTimeline } from "@/components/sections/BenefitTimeline";
import { DeepCellAppCard } from "@/components/sections/DeepCellAppCard";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { SocialProof } from "@/components/sections/SocialProof";
import { ScienceExplorer } from "@/components/sections/ScienceExplorer";
import { ScienceOfSleep } from "@/components/sections/ScienceOfSleep";
import { BrandMission } from "@/components/sections/BrandMission";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">
      <Navbar />

      <Container className="pt-24 md:pt-32 space-y-4 md:space-y-6">

        <BentoGrid>
          <TopHero />
          <Hero />
          <TaglineBand />
          <BenefitTimeline />
          <SocialProof />
          <DeepCellAppCard />
          <EmailCapture />
        </BentoGrid>

        {/* Science Explorer is full width outside of the main bento grid wrapper to allow custom grid inside */}
        <div id="science">
          <ScienceExplorer />
        </div>

        <BentoGrid>
          <ScienceOfSleep />
          <BrandMission />
        </BentoGrid>

      </Container>

      <Footer />
    </main>
  );
}
