"use client";

import React, { useState, useRef, useEffect } from "react";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import {
  Flame,
  Zap,
  Dna,
  Sparkles,
  BrainCircuit,
  Sun,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ActivateScienceSection() {
  const [showReferences, setShowReferences] = useState(false);
  const [showAllMechanisms, setShowAllMechanisms] = useState(false);
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const toggleCard = (idx: number) => {
    setOpenCards((prev) => ({
      ...prev,
      [idx]: !(showAllMechanisms || prev[idx]),
    }));
  };

  const isCardOpen = (idx: number) => showAllMechanisms || Boolean(openCards[idx]);

  return (
    <section className="py-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden relative">
      {/* Video Background (Matches ScienceMechanismSection.tsx) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-[1.25] z-0"
      >
        <source src="/videos/levl-background-footage.mp4" type="video/mp4" />
      </video>

      {/* Opacity filter over video */}
      <div className="absolute inset-0 bg-[#0B0E17]/70 z-0 pointer-events-none" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 pointer-events-none bg-[radial-gradient(circle,_var(--color-levl-cyan)_0%,_transparent_60%)] blur-[120px] z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)] text-sm font-medium mb-6">
            Core Biology
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl mx-auto mb-4">
            The Ultimate Fasting-Mimetic + Longevity Protocol
          </h2>
          <p className="text-xl text-[var(--color-levl-text-secondary)] font-medium max-w-2xl mx-auto">
            The Science of Fasting Meets the Biology of Aging
          </p>
        </div>

        <BentoGrid className="mb-12">
          {/* Card 1: Fasting Mimetic */}
          <BentoCard
            colSpan={2}
            className="bg-[linear-gradient(135deg,rgba(20,45,76,0.82)_0%,rgba(28,32,52,0.78)_55%,rgba(78,34,15,0.45)_100%)] backdrop-blur-md p-8 group hover:border-[var(--color-levl-cyan)]/50 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => toggleCard(0)}
              aria-expanded={isCardOpen(0)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-cyan)]">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  End Your Fast, Not Your Autophagy
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${
                  isCardOpen(0) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCardOpen(0) && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-cyan)]/20 pt-4">
                    <p>
                      Fasting-induced cellular cleanup (<strong className="text-[var(--color-levl-cyan)]">autophagy</strong>) is humanity’s most conserved pathway to longer, healthier lifespans—yet prolonged caloric restriction can trigger hunger, cortisol spikes, and muscle loss (especially for women and athletes).
                    </p>
                    <p>
                      Activate combines <strong className="text-white">Trehalose</strong> (an mTOR-independent TFEB activator), <strong className="text-white">EGCG (98%)</strong>, <strong className="text-white">Vegan Glucosamine HCl</strong>, and <strong className="text-white">Pterostilbene</strong> to keep your fasting and AMPK pathways engaged—<em>even alongside breakfast</em> [1, 2].
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>

          {/* Card 2: Cellular Energy - NAD+ Support */}
          <BentoCard
            colSpan={2}
            className="bg-[linear-gradient(135deg,rgba(20,45,76,0.82)_0%,rgba(28,32,52,0.78)_55%,rgba(78,34,15,0.45)_100%)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-green)]/50 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => toggleCard(1)}
              aria-expanded={isCardOpen(1)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-green)]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Cellular Energy &amp; NAD+ Support
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${
                  isCardOpen(1) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCardOpen(1) && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-green)]/20 pt-4">
                    <p>
                      Involved in every cellular process, intracellular <strong className="text-[var(--color-levl-green)]">NAD+ declines by up to 50%</strong> with age—and clinic NAD+ IV drips cost $600–$1,000+ per session.
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <strong className="text-[var(--color-levl-green)]">Nicotinamide Riboside (NR)</strong> has been clinically shown in human trials to increase blood NAD+ by up to <strong className="text-white">142%</strong> [3].
                      </li>
                      <li>
                        <strong className="text-[var(--color-levl-green)]">NR + Pterostilbene</strong> sustained a <strong className="text-white">90% increase in cellular NAD+</strong> in a randomized, double-blind trial published in <em>Nature npj Aging</em> [4].
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>

          {/* Card 3: Lowered Pace of Aging & Methylation */}
          <BentoCard
            colSpan={2}
            className="bg-[linear-gradient(135deg,rgba(20,45,76,0.82)_0%,rgba(28,32,52,0.78)_55%,rgba(78,34,15,0.45)_100%)] p-8 backdrop-blur-md group hover:border-[#F69520]/50 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => toggleCard(2)}
              aria-expanded={isCardOpen(2)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-magenta)]">
                  <Dna className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Lowered Pace of Aging &amp; Methylation
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${
                  isCardOpen(2) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCardOpen(2) && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-magenta)]/20 pt-4">
                    <p>
                      <strong className="text-[var(--color-levl-magenta)]">Ca-AKG</strong> and <strong className="text-white">Vitamin C</strong> act as obligatory co-substrates for <strong className="text-white">TET DNA demethylases</strong>—restoring youthful epigenetic methylation patterns and slowing biological Pace of Aging [5].
                    </p>
                    <p>
                      Meanwhile, <strong className="text-white">Trimethylglycine (TMG)</strong> replenishes the methyl groups consumed by NAD+ metabolism, lowering homocysteine by 12–23% in human studies [6].
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>

          {/* Card 4: Skin & Joint Longevity */}
          <BentoCard
            colSpan={2}
            className="bg-[linear-gradient(135deg,rgba(20,45,76,0.82)_0%,rgba(28,32,52,0.78)_55%,rgba(78,34,15,0.45)_100%)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-cyan)]/50 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => toggleCard(3)}
              aria-expanded={isCardOpen(3)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-cyan)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Skin &amp; Joint Longevity
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${
                  isCardOpen(3) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCardOpen(3) && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-cyan)]/20 pt-4">
                    <p>
                      Widespread cellular rejuvenation works both organ-deep and skin-deep:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <strong className="text-[var(--color-levl-cyan)]">Glycine + Sodium Ascorbate + Ca-AKG</strong> supply the rate-limiting amino acids and prolyl-4-hydroxylase cofactors required for triple-helix dermal collagen synthesis and skin elasticity [7].
                      </li>
                      <li>
                        <strong className="text-[var(--color-levl-cyan)]">Vegan Glucosamine HCl</strong> supports articular cartilage proteoglycans and hyaluronic acid while inducing AMPK autophagy [8].
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>

          {/* Card 5: Muscle & Brain Longevity */}
          <BentoCard
            colSpan={2}
            className="bg-[linear-gradient(135deg,rgba(20,45,76,0.82)_0%,rgba(28,32,52,0.78)_55%,rgba(78,34,15,0.45)_100%)] p-8 backdrop-blur-md group hover:border-[#F69520]/50 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => toggleCard(4)}
              aria-expanded={isCardOpen(4)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-magenta)]">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Muscle &amp; Brain Longevity
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${
                  isCardOpen(4) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCardOpen(4) && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-magenta)]/20 pt-4">
                    <p>
                      <strong className="text-white">Creatine Monohydrate</strong> rapidly recycles ADP back into ATP inside neurons and skeletal muscle fibers—supporting executive cognitive focus and protecting lean muscle mass against age-related sarcopenia [9].
                    </p>
                    <p>
                      Paired with <strong className="text-[var(--color-levl-magenta)]">Taurine</strong>—shown in <em>Science</em> (2023) to decline by ~80% with age and extend healthy lifespan when restored—Activate protects mitochondrial Complex I and neuromuscular performance [10].
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>

          {/* Card 6: Morning Minerals & Krebs Cycle Malate */}
          <BentoCard
            colSpan={2}
            className="bg-[linear-gradient(135deg,rgba(20,45,76,0.82)_0%,rgba(28,32,52,0.78)_55%,rgba(78,34,15,0.45)_100%)] p-8 backdrop-blur-md group hover:border-[var(--color-levl-green)]/50 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => toggleCard(5)}
              aria-expanded={isCardOpen(5)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0 text-[var(--color-levl-green)]">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Morning Minerals &amp; Krebs Malate
                </h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-white/50 shrink-0 transition-transform ${
                  isCardOpen(5) ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {isCardOpen(5) && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-[var(--color-levl-text-secondary)] leading-relaxed space-y-4 border-t border-[var(--color-levl-green)]/20 pt-4">
                    <p>
                      Instead of high-sodium salt bombs, Activate delivers <strong className="text-[var(--color-levl-green)]">Magnesium Malate</strong> and <strong className="text-[var(--color-levl-green)]">Potassium Aspartate</strong> alongside buffered <strong className="text-white">Sodium Ascorbate</strong> and <strong className="text-white">Vitamin D3 (5,000 IU)</strong>.
                    </p>
                    <p>
                      <strong className="text-white">Malate</strong> and <strong className="text-white">Aspartate</strong> directly fuel the mitochondrial <strong className="text-[var(--color-levl-green)]">Malate-Aspartate NADH Shuttle</strong> and Krebs cycle—boosting cellular energy, muscle function, and daytime metabolism with zero caffeine [11].
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>
        </BentoGrid>

        {/* Show All Toggle Button (Matches ScienceMechanismSection.tsx) */}
        <div className="flex justify-center mt-8 mb-12 relative z-20">
          <button
            type="button"
            onClick={() => {
              const next = !showAllMechanisms;
              setShowAllMechanisms(next);
              if (!next) setOpenCards({});
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[linear-gradient(to_right,rgba(221,77,14,0.88)_0%,rgba(246,149,32,0.88)_32%,rgba(99,149,208,0.88)_68%,rgba(51,130,199,0.88)_100%)] hover:bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] border border-white/20 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] font-bold text-lg md:text-xl shadow-[0_0_24px_rgba(246,149,32,0.35)] hover:shadow-[0_0_30px_rgba(246,149,32,0.5)] transition-all group cursor-pointer"
          >
            {showAllMechanisms ? "Collapse Protocol" : "View Full Protocol"}
            {showAllMechanisms ? (
              <ChevronUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>

        {/* References Toggle (Matches ScienceMechanismSection.tsx) */}
        <div className="max-w-4xl mx-auto mt-8 bg-black/30 backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--color-levl-cyan)]/30">
          <button
            type="button"
            onClick={() => setShowReferences(!showReferences)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left cursor-pointer"
          >
            <h3 className="text-sm font-medium text-white/80">
              Scientific Transparency (References &amp; *Disclaimer)
            </h3>
            <div
              className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${
                showReferences ? "rotate-180" : ""
              }`}
            >
              <ChevronDown className="w-5 h-5 text-white/50" />
            </div>
          </button>

          <AnimatePresence>
            {showReferences && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6"
              >
                <div className="text-sm space-y-3 text-[var(--color-levl-text-secondary)] border-t border-[var(--color-levl-panel-border)] pt-6">
                  <p>
                    [1] DeBosch et al. <em className="italic">Science Signaling</em> (2016) &amp; Rusmini et al. <em className="italic">Autophagy</em> (2019): Trehalose induces mTOR-independent TFEB nuclear translocation and macroautophagy.
                  </p>
                  <p>
                    [2] Rahman et al. (2024): EGCG (98%) activates AMPK/ULK1 signaling and suppresses senescent SASP markers.
                  </p>
                  <p>
                    [3] Conze et al. <em className="italic">Scientific Reports</em> (2019) &amp; Martens et al. <em className="italic">Nature Communications</em> (2018): Nicotinamide Riboside (NR) increases human whole-blood NAD+ by up to 142% and supports healthy systolic blood pressure.
                  </p>
                  <p>
                    [4] Dellinger et al. <em className="italic">Nature npj Aging and Mechanisms of Disease</em> (2017): Randomized, double-blind trial demonstrating a sustained 90% increase in human cellular NAD+ with NR + Pterostilbene.
                  </p>
                  <p>
                    [5] Asadi Shahmirzadi et al. <em className="italic">Cell Metabolism</em> (2020) &amp; Demidenko et al. <em className="italic">Aging</em> (2021): Calcium Alpha-Ketoglutarate (Ca-AKG) compresses morbidity and reduces epigenetic biological age markers.
                  </p>
                  <p>
                    [6] McRae <em className="italic">J Chiropr Med</em> (2013): Meta-analysis of randomized trials showing Trimethylglycine (TMG) reduces plasma homocysteine by 12–23%.
                  </p>
                  <p>
                    [7] Miller et al. <em className="italic">Aging Cell</em> (2019) &amp; Sekhar et al. <em className="italic">Am J Clin Nutr</em> (2011): Glycine extends mammalian lifespan and restores intracellular glutathione (GSH) synthesis.
                  </p>
                  <p>
                    [8] Weimer et al. <em className="italic">Nature Communications</em> (2014) &amp; Li et al. <em className="italic">BMJ</em> (2020): Glucosamine mimics low-carbohydrate glycolysis to induce AMPK autophagy and is associated with lower all-cause mortality in 466,039 adults.
                  </p>
                  <p>
                    [9] Rae et al. <em className="italic">Proc Biol Sci</em> (2003) &amp; Candow et al. <em className="italic">Nutrients</em> (2022): Creatine Monohydrate enhances brain phosphocreatine, working memory, and lean muscle preservation.
                  </p>
                  <p>
                    [10] Singh et al. <em className="italic">Science</em> (2023): Taurine deficiency as a driver of aging; restoration improves mitochondrial health and extends lifespan.
                  </p>
                  <p>
                    [11] Uysal et al. <em className="italic">Biol Trace Elem Res</em> (2019): Magnesium Malate exhibits superior bioavailability and supports Krebs cycle malate-aspartate NADH transport.
                  </p>

                  <div className="mt-6 pt-4 border-t border-[var(--color-levl-panel-border)]">
                    <p className="font-bold text-white mb-1">*Disclaimer</p>
                    <p className="italic">
                      “These statements have not been evaluated by the Food and
                      Drug Administration. This product is not intended to
                      diagnose, treat, cure, or prevent any disease.”
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
