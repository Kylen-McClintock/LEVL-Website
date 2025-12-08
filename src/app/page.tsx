import { Container } from "@/components/ui/Container";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { Navbar } from "@/components/sections/Navbar";
<BentoGrid>
  <Hero />
  <TaglineBand />
  <BenefitTimeline />
  <SocialProof />
  <DeepCellAppCard />
  <EmailCapture />
</BentoGrid>

{/* Science Explorer is full width outside of the main bento grid wrapper to allow custom grid inside */ }
        <div id="science">
          <ScienceExplorer />
        </div>

        <BentoGrid>
          <ScienceOfSleep />
          <BrandMission />
        </BentoGrid>

      </Container >

  <Footer />
    </main >
  );
}
