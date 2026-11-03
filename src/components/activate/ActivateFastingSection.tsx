"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Clock,
  Dna,
  Flame,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";

const FASTING_WINDOWS = [
  {
    hours: "12 Hours",
    title: "Overnight Circadian Baseline",
    standardFast:
      "Glycogen begins depleting overnight; mild basal autophagy starts near waking—but shuts off immediately when breakfast spikes glucose and insulin.",
    withActivate:
      "Pairs with evening LIFESPAN+ DeepCell so nocturnal autophagy peaks overnight, then transitions seamlessly into morning meal-time activation.",
  },
  {
    hours: "14–16 Hours",
    title: "The Breakfast Paradox Window",
    standardFast:
      "Skipping breakfast extends AMPK/autophagy, but can trigger morning cortisol spikes, hormone disruption (especially in women), and muscle protein breakdown.",
    withActivate:
      "1 scoop with a protein-rich breakfast engages SLC2A/TFEB and AMPK cleanup pathways (Trehalose, EGCG, Glucosamine) while feeding muscle and stabilizing hormones.",
  },
  {
    hours: "18–24+ Hours",
    title: "Deep Autophagy & NAD+ Elevation",
    standardFast:
      "Deep cellular cleanup and Sirtuin activation occur, but prolonged caloric restriction impairs high-intensity athletic output and lean muscle retention.",
    withActivate:
      "Directly elevates intracellular NAD+ (NR + Pterostilbene) and epigenetic TET activity (Ca-AKG + Vitamin C) alongside Creatine & Taurine—unlocking deep longevity signaling with zero starvation.",
  },
];

export function ActivateFastingSection() {
  const [nerdModeOpen, setNerdModeOpen] = useState(false);
  const [showFastingChart, setShowFastingChart] = useState(false);

  return (
    <section
      id="fasting-mimetic"
      className="py-12 md:py-24 border-t border-[var(--color-levl-panel-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* TOP HERO BENTO: Better Todays. More Tomorrows. / Breakfast That Respects Your Fast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-[#090C15] shadow-2xl"
        >
          {/* Background Image + Multi-Stop Gradient Overlay */}
          <div className="relative min-h-[540px] md:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 md:p-12">
            <Image
              src="/images/running-lifestyle.jpg"
              alt="Active morning longevity ritual"
              fill
              quality={90}
              className="object-cover object-center opacity-35"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/75 to-[#060913]/65" />

            {/* Top Section Header */}
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Flame aria-hidden="true" className="w-3.5 h-3.5" />
                Fasting-Inspired Cellular Renewal • 1 Scoop With Your First Meal
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                What If Breakfast Didn’t Have to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-[var(--color-levl-cyan)] to-emerald-300">
                  “Break Your Fast”?
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
                Fasting-induced cellular cleanup (autophagy) is humanity’s most
                ancient and clinically studied pathway to longer, healthier
                lifespans. <strong className="text-white">LIFESPAN+ Activate</strong>{" "}
                is formulated to keep your body’s fasting and cellular-renewal
                pathways engaged—<em>even with a meal</em>—so you feel mentally
                sharp and physically fueled for the day.
              </p>

              {/* Toggle Buttons for Nerd Mode & Fasting Windows Guide */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNerdModeOpen(!nerdModeOpen)}
                  aria-expanded={nerdModeOpen}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    nerdModeOpen
                      ? "bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                      : "bg-black/60 text-amber-200 border-amber-400/40 hover:bg-amber-500/20"
                  }`}
                >
                  <Sparkles aria-hidden="true" className="w-4 h-4" />
                  <span>
                    {nerdModeOpen
                      ? "Nerd Mode: ON (Hide Mechanism)"
                      : "Nerd Mode: How Meal-Time Autophagy Works"}
                  </span>
                  {nerdModeOpen ? (
                    <ChevronUp aria-hidden="true" className="w-4 h-4" />
                  ) : (
                    <ChevronDown aria-hidden="true" className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowFastingChart(!showFastingChart)}
                  aria-expanded={showFastingChart}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                    showFastingChart
                      ? "bg-[var(--color-levl-cyan)] text-slate-950 border-[var(--color-levl-cyan)] shadow-[0_0_20px_rgba(14,165,233,0.35)]"
                      : "bg-black/60 text-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)]/40 hover:bg-[var(--color-levl-cyan)]/15"
                  }`}
                >
                  <Clock aria-hidden="true" className="w-4 h-4" />
                  <span>
                    {showFastingChart
                      ? "Hide Fasting Windows Comparison"
                      : "Compare Fasting Windows vs. Activate"}
                  </span>
                  {showFastingChart ? (
                    <ChevronUp aria-hidden="true" className="w-4 h-4" />
                  ) : (
                    <ChevronDown aria-hidden="true" className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expandable Nerd Mode Drawer */}
              <AnimatePresence>
                {nerdModeOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-400/35 space-y-3 text-xs sm:text-sm text-white/85 leading-relaxed">
                      <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                        Nerd Mode • Multi-Node Autophagy &amp; Nutrient-Sensing
                        Architecture
                      </div>
                      <p>
                        Normally, eating a meal elevates blood glucose and amino
                        acids, activating <strong className="text-white">mTORC1</strong>{" "}
                        and suppressing <strong className="text-white">AMPK</strong>—which
                        immediately halts macroautophagy. Activate bypasses this
                        bottleneck through four complementary mechanisms:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <li className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                          <strong className="text-amber-300 block mb-0.5">
                            1. SLC2A / TFEB Lysosomal Trigger (Trehalose):
                          </strong>
                          Transiently modulates hepatocyte/neuronal glucose
                          transporters to trigger nuclear translocation of{" "}
                          <strong>TFEB</strong> (master regulator of lysosomal
                          biogenesis) via an{" "}
                          <em>mTOR-independent</em> pathway.
                        </li>
                        <li className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                          <strong className="text-[var(--color-levl-cyan)] block mb-0.5">
                            2. Glycolytic Hormesis (Vegan Glucosamine HCl):
                          </strong>
                          Competitively modulates glucokinase to mimic mild
                          carbohydrate restriction, elevating the intracellular
                          AMP:ATP ratio and activating <strong>AMPK</strong>.
                        </li>
                        <li className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                          <strong className="text-emerald-300 block mb-0.5">
                            3. LKB1/AMPK &amp; ULK1 Activation (EGCG 98%):
                          </strong>
                          Stimulates hepatic autophagy and lipid oxidation while
                          dampening hyperactive mTORC1 signaling.
                        </li>
                        <li className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                          <strong className="text-purple-300 block mb-0.5">
                            4. NAD+ / SIRT1 Deacetylation (NR + Pterostilbene):
                          </strong>
                          Supplies intracellular NAD+ and allosterically
                          activates <strong>SIRT1</strong>, which deacetylates
                          autophagy proteins (Atg5, Atg7, LC3) and FOXO3.
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expandable Fasting Windows Chart */}
              <AnimatePresence>
                {showFastingChart && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-[var(--color-levl-cyan)]/35 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-levl-cyan)] font-bold">
                          Fasting Windows Guide • Caloric Restriction vs.
                          Fasting-Aligned Activation
                        </div>
                        <span className="text-[11px] text-white/60">
                          Keep your morning meal &amp; muscle mass
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        {FASTING_WINDOWS.map((win) => (
                          <div
                            key={win.hours}
                            className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] font-mono text-xs font-bold">
                                {win.hours}
                              </span>
                              <span className="text-xs font-bold text-white">
                                {win.title}
                              </span>
                            </div>
                            <div className="text-xs text-white/60 border-b border-white/10 pb-2">
                              <strong className="text-white/80 block mb-0.5">
                                Traditional Water Fast:
                              </strong>
                              {win.standardFast}
                            </div>
                            <div className="text-xs text-emerald-200/90">
                              <strong className="text-emerald-300 block mb-0.5">
                                Breakfast + LIFESPAN+ Activate:
                              </strong>
                              {win.withActivate}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Frosted Glass 3-Column Audience & Benefit Bar */}
            <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 bg-white/[0.06] backdrop-blur-md border border-white/15 p-5 sm:p-7 rounded-2xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                  <Sun aria-hidden="true" className="w-5 h-5 shrink-0" />
                  <span>Extend Your Nighttime Fast</span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Bridge the cellular renewal of overnight sleep into your
                  waking hours—keeping autophagy and AMPK pathways active while
                  you eat breakfast.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-levl-cyan)] font-bold text-sm sm:text-base">
                  <HeartPulse aria-hidden="true" className="w-5 h-5 shrink-0" />
                  <span>Built for Women &amp; Athletes</span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Aggressive fasting often spikes cortisol, disrupts female
                  hormone cycles, or sacrifices lean muscle. Activate supports
                  autophagy while you fuel your body.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm sm:text-base">
                  <ShieldCheck aria-hidden="true" className="w-5 h-5 shrink-0" />
                  <span>Zero Muscle Loss or Hunger</span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Pair Activate with your morning protein to protect skeletal
                  muscle mass (supported by Creatine, Taurine &amp; Glycine)
                  while activating longevity pathways.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 CORE LONGEVITY & FUNCTIONAL PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: Cellular Energy & NAD+ Support */}
          <div className="rounded-3xl bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] hover:border-amber-400/40 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  Pillar 01 • Cellular Energy &amp; NAD+
                </span>
                <Zap aria-hidden="true" className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Clinic-Grade NAD+ Support—Without $600+ IV Drips
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-levl-text-secondary)] leading-relaxed">
                NAD+ is required for every cellular energy and DNA repair
                process, yet declines up to 50% with age. Instead of painful,
                $600+ clinic NAD+ IV infusions, Activate pairs{" "}
                <strong className="text-white">Nicotinamide Riboside (NR)</strong>{" "}
                with bioavailable{" "}
                <strong className="text-white">Pterostilbene</strong> (shown to
                raise NAD+ by 90–142%) and{" "}
                <strong className="text-white">Trimethylglycine (TMG)</strong>{" "}
                to safeguard methylation balance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {["Nicotinamide Riboside (NR)", "Pterostilbene", "Trimethylglycine (TMG)"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-amber-200"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Pillar 2: Skin & Joint Longevity */}
          <div className="rounded-3xl bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] hover:border-[var(--color-levl-cyan)]/40 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--color-levl-cyan)]/15 border border-[var(--color-levl-cyan)]/30 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider">
                  Pillar 02 • Skin &amp; Joint Longevity
                </span>
                <Activity
                  aria-hidden="true"
                  className="w-5 h-5 text-[var(--color-levl-cyan)]"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Skin-Deep Elasticity &amp; Preventative Joint Mobility
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-levl-text-secondary)] leading-relaxed">
                True rejuvenation is both organ-deep and skin-deep.{" "}
                <strong className="text-white">Glycine</strong> provides the
                rate-limiting amino acid for triple-helix collagen,{" "}
                <strong className="text-white">
                  Vitamin C (Sodium Ascorbate)
                </strong>{" "}
                and <strong className="text-white">Ca-AKG</strong> activate
                prolyl hydroxylase cross-linking for dermal firmness, and{" "}
                <strong className="text-white">Vegan Glucosamine HCl</strong>{" "}
                protects joint cartilage while inducing cellular autophagy.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {[
                "Glycine",
                "Vitamin C (Sodium Ascorbate)",
                "Glucosamine HCl (Vegan)",
                "Ca-AKG",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-sky-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pillar 3: Muscle & Brain Longevity */}
          <div className="rounded-3xl bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] hover:border-purple-400/40 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  Pillar 03 • Muscle &amp; Brain Longevity
                </span>
                <BrainCircuit
                  aria-hidden="true"
                  className="w-5 h-5 text-purple-300"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Cerebral ATP Stamina &amp; Lean Muscle Preservation
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-levl-text-secondary)] leading-relaxed">
                Neurons and skeletal muscle fibers are the highest ATP consumers
                in the human body.{" "}
                <strong className="text-white">Creatine Monohydrate</strong>{" "}
                saturates phosphocreatine reserves for faster cognitive
                processing and muscular strength, while{" "}
                <strong className="text-white">Taurine</strong> preserves
                mitochondrial tRNA fidelity, boosts SOD antioxidant capacity,
                and enhances endurance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {["Creatine Monohydrate", "Taurine", "Trehalose", "EGCG (98%)"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-200"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Pillar 4: Lowered Pace of Aging & Morning Minerals */}
          <div className="rounded-3xl bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] hover:border-emerald-400/40 p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Pillar 04 • Pace of Aging &amp; Morning Minerals
                </span>
                <Dna aria-hidden="true" className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Slow Your Pace of Aging + Krebs Cycle Morning Minerals
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-levl-text-secondary)] leading-relaxed">
                <strong className="text-white">Ca-AKG</strong>,{" "}
                <strong className="text-white">Vitamin D3 (5,000 IU)</strong>,
                and <strong className="text-white">Pterostilbene</strong> target
                epigenetic drift and telomere preservation to slow your
                biological pace of aging. Meanwhile,{" "}
                <strong className="text-white">Magnesium Malate</strong>{" "}
                (supplying bioenergetic Malate for Krebs cycle ATP) and{" "}
                <strong className="text-white">Potassium Aspartate</strong>{" "}
                deliver clean morning minerals without excess salt.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {[
                "Calcium Alpha-Ketoglutarate (Ca-AKG)",
                "Magnesium Malate (with Malate)",
                "Potassium Aspartate",
                "Vitamin D3 (125 mcg)",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-emerald-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
