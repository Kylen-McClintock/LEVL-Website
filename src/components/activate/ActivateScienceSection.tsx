"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Cpu,
  Dna,
  ExternalLink,
  Flame,
  HeartPulse,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";
import { activateContent } from "@/content/productActivate";

export function ActivateScienceSection() {
  const [showAllMechanisms, setShowAllMechanisms] = useState(true);
  const [showReferences, setShowReferences] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section
      id="science"
      className="py-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden relative"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-[1.25] z-0"
      >
        <source src="/videos/levl-background-footage.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#0B0E17]/80 z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 pointer-events-none bg-[radial-gradient(circle,_var(--color-levl-cyan)_0%,_transparent_60%)] blur-[120px] z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)] text-sm font-semibold">
            <Cpu aria-hidden="true" className="w-4 h-4" />
            <span>Core Biology &amp; AI Synergy Discovery Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Rooted in the Frontier of Longevity Science
          </h2>
          <p className="text-lg sm:text-xl text-[var(--color-levl-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Our AI Synergy Discovery Engine analyzes peer-reviewed clinical
            trials and pathway databases to rank ingredient pairs by effect
            size, safety signals, and hallmark coverage—reviewed by our PhD and
            MD scientific team.
          </p>
        </div>

        {/* 6 PUBLISHED CLINICAL BENCHMARK CALLOUT CARDS */}
        <div>
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              Published Human Clinical Literature Benchmarks on Key Actives
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activateContent.clinicalClaims.map((claim, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0B0E17]/90 border border-white/10 hover:border-[var(--color-levl-cyan)]/40 transition-colors flex flex-col justify-between gap-3 shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-[var(--color-levl-cyan)]">
                      {claim.metric}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      {claim.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    “{claim.detail}”
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] text-white/55 font-mono">
                  <span className="truncate">{claim.citation}</span>
                  {claim.url && (
                    <a
                      href={claim.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--color-levl-cyan)] hover:underline shrink-0"
                    >
                      <span>Nature</span>
                      <ExternalLink aria-hidden="true" className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 EXPANDABLE CORE MECHANISM BENTO CARDS */}
        <div>
          <BentoGrid className="mb-8">
            {/* Card 1 */}
            <BentoCard
              colSpan={2}
              className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-7 sm:p-8 group hover:border-amber-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 text-amber-300">
                  <Flame aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Fasting-Induced Autophagy (Even With a Meal)
                </h3>
              </div>
              <AnimatePresence>
                {showAllMechanisms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[var(--color-levl-text-secondary)] text-sm sm:text-base leading-relaxed space-y-3 border-t border-amber-400/20 pt-4">
                      <p>
                        Autophagy—the cell’s recycling and cleanup system—slows
                        dramatically with age and normally shuts off the moment
                        you eat breakfast.
                      </p>
                      <p>
                        Activate combines{" "}
                        <strong className="text-amber-300">Trehalose</strong>{" "}
                        (an mTOR-independent TFEB lysosomal activator) [1],{" "}
                        <strong className="text-amber-300">
                          Vegan Glucosamine HCl
                        </strong>{" "}
                        (a glucokinase modulator that induces glycolytic
                        autophagy) [2], and{" "}
                        <strong className="text-amber-300">EGCG (98%)</strong>{" "}
                        (an LKB1/AMPK activator) [3] to keep cellular renewal
                        pathways engaged without caloric restriction.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </BentoCard>

            {/* Card 2 */}
            <BentoCard
              colSpan={2}
              className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-7 sm:p-8 group hover:border-[var(--color-levl-cyan)]/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/15 flex items-center justify-center shrink-0 text-[var(--color-levl-cyan)]">
                  <Zap aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  NAD+ Salvage &amp; Sirtuin Activation Synergy
                </h3>
              </div>
              <AnimatePresence>
                {showAllMechanisms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[var(--color-levl-text-secondary)] text-sm sm:text-base leading-relaxed space-y-3 border-t border-[var(--color-levl-cyan)]/20 pt-4">
                      <p>
                        Boosting NAD+ alone is only half the equation: Sirtuins
                        (SIRT1–SIRT7) require both{" "}
                        <strong className="text-white">NAD+ fuel</strong> and{" "}
                        <strong className="text-white">
                          allosteric activation
                        </strong>
                        .
                      </p>
                      <p>
                        <strong className="text-[var(--color-levl-cyan)]">
                          Nicotinamide Riboside (NR)
                        </strong>{" "}
                        raises human NAD+ by up to ~142% [4], while{" "}
                        <strong className="text-[var(--color-levl-cyan)]">
                          Pterostilbene
                        </strong>{" "}
                        (with ~80% oral bioavailability) activates SIRT1—a
                        combination clinically shown in{" "}
                        <em>npj Aging (Nature)</em> to sustain up to ~90% higher
                        NAD+ levels over 30 days [5].
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </BentoCard>

            {/* Card 3 */}
            <BentoCard
              colSpan={2}
              className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-7 sm:p-8 group hover:border-purple-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-400/15 flex items-center justify-center shrink-0 text-purple-300">
                  <Dna aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Epigenetic Demethylation &amp; Methyl Pool Protection
                </h3>
              </div>
              <AnimatePresence>
                {showAllMechanisms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[var(--color-levl-text-secondary)] text-sm sm:text-base leading-relaxed space-y-3 border-t border-purple-400/20 pt-4">
                      <p>
                        Unbuffered NAD+ precursors can drain methyl groups
                        during nicotinamide clearance. We pair NR with{" "}
                        <strong className="text-purple-300">
                          Trimethylglycine (TMG)
                        </strong>{" "}
                        (shown to lower homocysteine by 12–23% [6]) and{" "}
                        <strong className="text-purple-300">Glycine</strong> to
                        protect the cellular SAMe methyl pool.
                      </p>
                      <p>
                        Simultaneously,{" "}
                        <strong className="text-purple-300">Ca-AKG</strong> and{" "}
                        <strong className="text-purple-300">
                          Vitamin C (Sodium Ascorbate)
                        </strong>{" "}
                        serve as the obligatory co-substrate and Fe(II) electron
                        donor for <strong>TET DNA demethylases</strong>,
                        repairing epigenetic aging drift [7].
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </BentoCard>

            {/* Card 4 */}
            <BentoCard
              colSpan={2}
              className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-7 sm:p-8 group hover:border-emerald-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-400/15 flex items-center justify-center shrink-0 text-emerald-300">
                  <Activity aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Krebs Cycle Malate &amp; Morning Mineral Hydration
                </h3>
              </div>
              <AnimatePresence>
                {showAllMechanisms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[var(--color-levl-text-secondary)] text-sm sm:text-base leading-relaxed space-y-3 border-t border-emerald-400/20 pt-4">
                      <p>
                        Rather than loading a formula with cheap table salt,
                        Activate delivers{" "}
                        <strong className="text-emerald-300">
                          Magnesium Malate
                        </strong>{" "}
                        and{" "}
                        <strong className="text-emerald-300">
                          Potassium Aspartate
                        </strong>
                        .
                      </p>
                      <p>
                        <strong>Malate</strong> and <strong>Aspartate</strong>{" "}
                        power the mitochondrial{" "}
                        <strong className="text-white">
                          Malate-Aspartate NADH Shuttle
                        </strong>
                        —accelerating Krebs cycle ATP synthesis, muscle
                        endurance, and metabolic efficiency while elemental
                        Magnesium and Potassium support intracellular hydration
                        and DNA repair.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </BentoCard>

            {/* Card 5 */}
            <BentoCard
              colSpan={2}
              className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-7 sm:p-8 group hover:border-[var(--color-levl-cyan)]/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/15 flex items-center justify-center shrink-0 text-[var(--color-levl-cyan)]">
                  <HeartPulse aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  Skin, Joint, Muscle &amp; Cardiovascular Longevity
                </h3>
              </div>
              <AnimatePresence>
                {showAllMechanisms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[var(--color-levl-text-secondary)] text-sm sm:text-base leading-relaxed space-y-3 border-t border-[var(--color-levl-cyan)]/20 pt-4">
                      <p>
                        <strong className="text-[var(--color-levl-cyan)]">
                          Creatine Monohydrate
                        </strong>{" "}
                        and <strong className="text-white">Taurine</strong>{" "}
                        preserve lean muscle mass, cognitive ATP, and
                        mitochondrial tRNA translation [8].
                      </p>
                      <p>
                        <strong className="text-[var(--color-levl-cyan)]">
                          Glycine + Vitamin C + Ca-AKG
                        </strong>{" "}
                        rebuild dermal collagen to reduce fine-line aging from
                        within, while{" "}
                        <strong className="text-white">
                          Vegan Glucosamine HCl
                        </strong>{" "}
                        supports joint mobility and is linked in cohort studies
                        to lower cardiovascular and all-cause mortality [9].
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </BentoCard>

            {/* Card 6 */}
            <BentoCard
              colSpan={2}
              className="bg-[linear-gradient(30deg,#451F52e6,#742D6B33)] backdrop-blur-md p-7 sm:p-8 group hover:border-amber-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-400/15 flex items-center justify-center shrink-0 text-amber-300">
                  <BrainCircuit aria-hidden="true" className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white m-0">
                  24/7 Bio-Synchronized Protocol (Activate + DeepCell)
                </h3>
              </div>
              <AnimatePresence>
                {showAllMechanisms && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[var(--color-levl-text-secondary)] text-sm sm:text-base leading-relaxed space-y-3 border-t border-amber-400/20 pt-4">
                      <p>
                        Static supplements ignore circadian biology. LEVL
                        separates daytime bioenergetics from nighttime neural
                        recovery.
                      </p>
                      <p>
                        Take <strong className="text-amber-300">Activate</strong>{" "}
                        in the morning to drive NAD+, ATP, metabolic
                        flexibility, and meal-time autophagy; pair with{" "}
                        <strong className="text-[var(--color-levl-cyan)]">
                          LIFESPAN+ DeepCell
                        </strong>{" "}
                        at night for melatonin-free slow-wave sleep, glymphatic
                        brain clearance, and nocturnal DNA repair.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </BentoCard>
          </BentoGrid>

          {/* Toggle All Mechanisms Button */}
          <div className="flex justify-center">
            <button
              type="button"
              aria-expanded={showAllMechanisms}
              onClick={() => setShowAllMechanisms(!showAllMechanisms)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black/40 backdrop-blur-md border border-[var(--color-levl-cyan)]/35 text-white font-bold text-base sm:text-lg hover:border-[var(--color-levl-cyan)] hover:shadow-[0_0_18px_rgba(14,165,233,0.3)] transition-all cursor-pointer"
            >
              <span>
                {showAllMechanisms
                  ? "Collapse Protocol Mechanisms"
                  : "Expand All 6 Protocol Mechanisms"}
              </span>
              {showAllMechanisms ? (
                <ChevronUp
                  aria-hidden="true"
                  className="w-4 h-4 text-[var(--color-levl-cyan)]"
                />
              ) : (
                <ChevronDown
                  aria-hidden="true"
                  className="w-4 h-4 text-[var(--color-levl-cyan)]"
                />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Scientific References Drawer */}
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--color-levl-cyan)]/30">
          <button
            type="button"
            aria-expanded={showReferences}
            onClick={() => setShowReferences(!showReferences)}
            className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
          >
            <h3 className="text-sm font-semibold text-white/85 flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="w-4 h-4 text-[var(--color-levl-cyan)]"
              />
              <span>
                Scientific Transparency (Peer-Reviewed References &amp;
                *Disclaimer)
              </span>
            </h3>
            <div
              className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${
                showReferences ? "rotate-180" : ""
              }`}
            >
              <ChevronDown
                aria-hidden="true"
                className="w-5 h-5 text-white/60"
              />
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
                <div className="text-xs sm:text-sm space-y-2.5 text-[var(--color-levl-text-secondary)] border-t border-[var(--color-levl-panel-border)] pt-5">
                  <p>
                    [1] Rusmini et al. <em>Autophagy</em> (2019); Jeong et al.{" "}
                    <em>Autophagy</em> (2021): Trehalose induces TFEB nuclear
                    translocation and mTOR-independent autophagy-lysosome
                    biogenesis.
                  </p>
                  <p>
                    [2] Weimer et al. <em>Nature Communications</em> (2014):
                    D-Glucosamine supplementation extends life span of nematodes
                    and of ageing mice by impairing glucose metabolism and
                    activating AMPK/autophagy.
                  </p>
                  <p>
                    [3] Rahman et al. <em>Molecules</em> (2024): EGCG modulates
                    AMPK/mTOR signaling, induces hepatic autophagy, and
                    attenuates cellular senescence.
                  </p>
                  <p>
                    [4] Conze et al. <em>Scientific Reports</em> (2019); Martens
                    et al. <em>Nature Communications</em> (2018): 1,000 mg NR
                    increased NAD+ by ~142% in 2 weeks; NR reduced systolic BP
                    by ~9 mmHg in 6 weeks in older adults.
                  </p>
                  <p>
                    [5] Dellinger et al.{" "}
                    <em>npj Aging and Mechanisms of Disease / Nature</em>{" "}
                    (2017): Repeat dose study of NR + Pterostilbene Safely and
                    Sustainably Increases NAD+ levels up to ~90% in Humans.{" "}
                    <a
                      href="https://www.nature.com/articles/s41514-017-0016-9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[var(--color-levl-cyan)]"
                    >
                      Nature Article
                    </a>
                  </p>
                  <p>
                    [6] Olthof et al. <em>Am J Clin Nutr</em> (2003); McRae{" "}
                    <em>J Chiropr Med</em> (2013): Trimethylglycine (Betaine)
                    supplementation (1.5 g+) lowers plasma homocysteine by
                    12–23% in healthy adults.
                  </p>
                  <p>
                    [7] Asadi Shahmirzadi et al. <em>Cell Metabolism</em>{" "}
                    (2020); Demidenko et al. <em>Aging</em> (2021):
                    Alpha-Ketoglutarate (Ca-AKG) compresses morbidity, reduces
                    systemic inflammatory cytokines, and supports TET epigenetic
                    demethylation alongside Vitamin C.
                  </p>
                  <p>
                    [8] Singh et al. <em>Science</em> (2023); Abud et al.{" "}
                    <em>Nutrition</em> (2022): Taurine deficiency as a driver of
                    aging; 1.5 g/day taurine improved antioxidant capacity (SOD)
                    in women aged 55–70 over 16 weeks.
                  </p>
                  <p>
                    [9] Li et al. <em>BMJ</em> (2019); King et al.{" "}
                    <em>JABFM</em> (2020): Habitual glucosamine use linked with
                    15–18% lower all-cause and cardiovascular mortality in prospective
                    cohorts.
                  </p>

                  <div className="mt-5 pt-4 border-t border-[var(--color-levl-panel-border)]">
                    <p className="font-bold text-white mb-1">*Disclaimer</p>
                    <p className="italic">
                      “These statements have not been evaluated by the Food and
                      Drug Administration. This product is not intended to
                      diagnose, treat, cure, or prevent any disease. Clinical
                      references describe published studies on individual
                      ingredients.”
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
