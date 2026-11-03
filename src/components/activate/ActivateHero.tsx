"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Award,
  BrainCircuit,
  Cpu,
  Dna,
  Factory,
  Flame,
  FlaskConical,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { activateContent } from "@/content/productActivate";
import { ActivateWaitlistForm } from "./ActivateWaitlistForm";

const GALLERY_TABS = [
  {
    id: "vessel",
    label: "Activate Concept",
    shortLabel: "Concept",
    icon: Sun,
  },
  {
    id: "pathways",
    label: "5 Core Pathways",
    shortLabel: "Pathways",
    icon: Dna,
  },
  {
    id: "formula",
    label: "14-Active Matrix",
    shortLabel: "14 Actives",
    icon: FlaskConical,
  },
  {
    id: "value",
    label: "vs. $600+ NAD+ IVs",
    shortLabel: "Value",
    icon: Layers,
  },
] as const;

const DIY_STACK_PRICES = [
  { name: "Nicotinamide Riboside (NR)", role: "NAD+ Precursor", price: 54 },
  { name: "Ca-AKG (Sustained Grade)", role: "Epigenetics & Krebs", price: 45 },
  { name: "Pterostilbene", role: "SIRT1 Polyphenol", price: 28 },
  { name: "Trehalose (Pure Grade)", role: "TFEB Autophagy", price: 24 },
  { name: "EGCG (98% Standardized)", role: "AMPK & Senomorphic", price: 22 },
  { name: "Taurine (Pharmaceutical)", role: "Mitochondrial tRNA", price: 18 },
  { name: "Trimethylglycine (TMG)", role: "Methyl Donor", price: 18 },
  { name: "Vegan Glucosamine HCl", role: "Joints & Autophagy", price: 20 },
  { name: "Creatine Monohydrate", role: "Brain & Muscle ATP", price: 22 },
  { name: "Glycine", role: "Collagen & GSH", price: 16 },
  { name: "Magnesium Malate", role: "Krebs Malate & DNA", price: 20 },
  { name: "Potassium Aspartate", role: "Morning Minerals", price: 15 },
  { name: "Vitamin C (Sodium Ascorbate)", role: "TET & Collagen", price: 12 },
  { name: "Vitamin D3 (5,000 IU)", role: "Telomeres & Immune", price: 14 },
];

export function ActivateHero() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const totalDiyCost = DIY_STACK_PRICES.reduce((acc, item) => acc + item.price, 0);

  return (
    <section
      id="waitlist"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* LEFT COLUMN: Interactive 4-Slide Showcase Gallery */}
        <div className="flex flex-col gap-4 h-fit lg:sticky lg:top-24">
          <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#080B12] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
            <AnimatePresence mode="wait">
              {/* SLIDE 0: MATTE-BLACK & SOLAR-CYAN ACTIVATE VESSEL SHOWCASE */}
              {activeSlide === 0 && (
                <motion.div
                  key="slide-vessel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 overflow-hidden"
                >
                  {/* Ambient Background Layer */}
                  <div className="absolute inset-0 pointer-events-none">
                    <Image
                      src="/images/deepcell_pathways_bg.png"
                      alt=""
                      fill
                      className="object-cover opacity-30 mix-blend-screen scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/80 via-[#080B12]/60 to-[#06080E]/95" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/20 blur-[90px]" />
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[var(--color-levl-cyan)]/20 blur-[100px]" />
                  </div>

                  {/* Top Status Pill */}
                  <div className="relative z-20 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                      <Sun aria-hidden="true" className="w-3.5 h-3.5" />
                      Morning Bio-Synchronized Formula
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">
                      0 mg Caffeine
                    </span>
                  </div>

                  {/* Center Matte-Black Monolith Canister Concept */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
                    <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-[2rem] bg-gradient-to-b from-[#1A1E29] via-[#0B0D13] to-[#050609] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] p-5 flex flex-col justify-between overflow-hidden">
                      {/* Lid Rim */}
                      <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-r from-[#090B10] via-[#262B38] to-[#090B10] border-b border-white/15" />

                      {/* Subtle Metallic Glow Inside Vessel */}
                      <div className="absolute -right-12 top-16 w-36 h-36 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />
                      <div className="absolute -left-12 bottom-12 w-36 h-36 rounded-full bg-[var(--color-levl-cyan)]/20 blur-2xl pointer-events-none" />

                      <div className="pt-5 text-center space-y-1 relative z-10">
                        <div className="text-[10px] font-mono tracking-[0.35em] text-white/50 uppercase">
                          LEVL HEALTH
                        </div>
                        <div className="text-xs font-extrabold tracking-[0.22em] text-[var(--color-levl-cyan)] uppercase">
                          LIFESPAN+
                        </div>
                        <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                          ACTIVATE
                        </div>
                        <div className="h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80 mt-1" />
                      </div>

                      {/* Molecular Ring Graphic */}
                      <div className="my-auto flex flex-col items-center justify-center relative z-10">
                        <div className="w-24 h-24 rounded-2xl bg-black/50 border border-amber-400/30 shadow-[0_0_25px_rgba(245,158,11,0.18)] flex flex-col items-center justify-center p-2 text-center">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300/90">
                            12/12 Hallmarks
                          </span>
                          <span className="text-2xl font-black text-white leading-none my-1">
                            14
                          </span>
                          <span className="text-[9px] font-semibold text-white/65 uppercase tracking-wider">
                            Synergistic Actives
                          </span>
                        </div>
                      </div>

                      <div className="text-center space-y-1 relative z-10 border-t border-white/10 pt-2.5">
                        <div className="text-[10px] font-semibold text-amber-200/90 tracking-wide">
                          Fasting-Inspired Cellular Renewal
                        </div>
                        <div className="text-[9px] font-mono text-white/45 uppercase tracking-widest">
                          NAD+ • Autophagy • ATP • Minerals
                        </div>
                      </div>
                    </div>

                    {/* Floating Animated Selling Point Chips */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-[8%] left-[2%] sm:left-[4%] z-20"
                    >
                      <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/65 backdrop-blur-md border border-amber-400/35 shadow-xl">
                        <Flame
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-amber-400"
                        />
                        <span>Fasting-Aligned Autophagy</span>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                      className="absolute top-[18%] right-[2%] sm:right-[4%] z-20"
                    >
                      <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/65 backdrop-blur-md border border-[var(--color-levl-cyan)]/40 shadow-xl">
                        <Zap
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-[var(--color-levl-cyan)]"
                        />
                        <span>Intracellular NAD+ &amp; ATP</span>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.8,
                      }}
                      className="absolute bottom-[14%] left-[2%] sm:left-[4%] z-20"
                    >
                      <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/65 backdrop-blur-md border border-purple-400/40 shadow-xl">
                        <BrainCircuit
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-purple-300"
                        />
                        <span>Muscle, Brain, Skin &amp; Joints</span>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.1,
                      }}
                      className="absolute bottom-[4%] right-[2%] sm:right-[4%] z-20"
                    >
                      <div className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/65 backdrop-blur-md border border-emerald-400/40 shadow-xl">
                        <Activity
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-emerald-400"
                        />
                        <span>Slows Pace of Aging</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Ritual Strip */}
                  <div className="relative z-20 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 px-4 py-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white">
                        1 Scoop With Your First Meal
                      </div>
                      <div className="text-[11px] text-white/65">
                        Keep breakfast. Keep your fasting-induced cellular cleanup
                        engaged.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveSlide(2)}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-bold text-[var(--color-levl-cyan)] transition-colors cursor-pointer"
                    >
                      View 14 Actives →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 1: 5 CORE DAYTIME BIOLOGICAL PATHWAYS */}
              {activeSlide === 1 && (
                <motion.div
                  key="slide-pathways"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto hide-scrollbar bg-[#090C15]"
                >
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-levl-cyan)] mb-1">
                      Systems Architecture • Guided by LEVL AI Synergy Engine
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      5 Core Daytime Longevity &amp; Functional Pathways
                    </h3>
                  </div>

                  <div className="space-y-2.5 my-3">
                    {[
                      {
                        title: "1. Fasting-Aligned Autophagy & Proteostasis",
                        molecules: "Trehalose • EGCG (98%) • Vegan Glucosamine HCl",
                        desc: "Activates AMPK and TFEB lysosomal cleanup via mTOR-independent and glycolytic-hormetic pathways—even alongside breakfast.",
                        color: "border-amber-400/35 bg-amber-500/10 text-amber-300",
                      },
                      {
                        title: "2. Intracellular NAD+ & Sirtuin Repair",
                        molecules: "Nicotinamide Riboside (NR) • Pterostilbene",
                        desc: "NR supplies direct NAD+ fuel (+142% clinical benchmark) while bioavailable Pterostilbene activates SIRT1/SIRT3 longevity enzymes.",
                        color:
                          "border-[var(--color-levl-cyan)]/35 bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)]",
                      },
                      {
                        title: "3. Epigenetic Demethylation & Methyl Balance",
                        molecules: "Ca-AKG • Trimethylglycine (TMG) • Vitamin C",
                        desc: "Ca-AKG + Vitamin C drive TET DNA demethylation to slow Pace of Aging, while TMG replenishes methyl groups and lowers homocysteine.",
                        color: "border-purple-400/35 bg-purple-500/10 text-purple-300",
                      },
                      {
                        title: "4. Muscle, Brain, Skin & Joint Matrix",
                        molecules: "Creatine • Taurine • Glycine • Glucosamine • Vit C",
                        desc: "Buffers cerebral/muscular ATP, rebuilds triple-helix dermal collagen, and cushions articular joint cartilage.",
                        color: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300",
                      },
                      {
                        title: "5. Krebs Cycle Malate & Morning Minerals",
                        molecules: "Magnesium Malate • Potassium Aspartate • Vit D3",
                        desc: "Delivers Malate and Aspartate to power the mitochondrial NADH shuttle alongside clean intracellular mineral hydration.",
                        color: "border-sky-400/35 bg-sky-500/10 text-sky-300",
                      },
                    ].map((pathway, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-bold text-xs sm:text-sm text-white">
                            {pathway.title}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${pathway.color}`}
                          >
                            {pathway.molecules}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                          {pathway.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-white/50 text-center">
                    All 12 Hallmarks of Aging covered in a single morning ritual.
                  </div>
                </motion.div>
              )}

              {/* SLIDE 2: FULL 14-INGREDIENT ACTIVE MATRIX (SUPPLEMENT FACTS STYLE) */}
              {activeSlide === 2 && (
                <motion.div
                  key="slide-formula"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-[#0B0E17] text-white overflow-y-auto hide-scrollbar p-4 sm:p-6 flex flex-col"
                >
                  <div className="max-w-md mx-auto w-full bg-black border-2 border-white/25 p-4 sm:p-5 shadow-2xl">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tighter">
                        Active Matrix
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded">
                        Pre-Launch Spec
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-b-4 border-white pb-1.5 mb-2 font-medium text-white/80">
                      <div>
                        <div>Serving Size: 1 Scoop (with first meal)</div>
                        <div>Servings Per Container: 30 • 0 mg Caffeine</div>
                      </div>
                    </div>

                    <div className="flex justify-between text-[11px] font-bold border-b border-white pb-1 mb-1.5 uppercase tracking-wider text-white/70">
                      <span>14 Synergistic Longevity Actives</span>
                      <span>Primary Pathway / Form</span>
                    </div>

                    <div className="divide-y divide-white/20 text-xs">
                      {activateContent.ingredients.map((ing) => (
                        <div
                          key={ing.elementNumber}
                          className="py-1.5 flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[10px] font-mono text-[var(--color-levl-cyan)] w-4 shrink-0">
                              {ing.elementNumber}
                            </span>
                            <span className="font-bold text-white truncate">
                              {ing.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-white/70 shrink-0">
                            {ing.specBadge}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-4 border-white mt-2 pt-2 text-[11px] text-white/75 space-y-1">
                      <p>
                        <strong className="text-white">Clean Profile:</strong>{" "}
                        0 mg Caffeine, Zero Artificial Colors or Stimulants.
                      </p>
                      <p className="text-[10px] text-white/55">
                        Formulated in the USA in a GMP-compliant facility •
                        Guided by LEVL’s AI Synergy Discovery Engine.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 3: VALUE PROPOSITION VS $600+ NAD+ IV & 14 BOTTLES */}
              {activeSlide === 3 && (
                <motion.div
                  key="slide-value"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-[#080B12] p-4 sm:p-6 flex flex-col justify-between overflow-y-auto hide-scrollbar"
                >
                  <div className="text-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                      Democratizing Frontier Longevity
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                      Replaces $318/mo in Bottles &amp; $600+ NAD+ IVs
                    </h3>
                  </div>

                  <div className="bg-[#0B0E17] border border-white/10 rounded-2xl p-3.5 sm:p-4 my-2">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                      {DIY_STACK_PRICES.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between border-b border-white/5 pb-1"
                        >
                          <span className="text-white/85 font-medium truncate pr-1">
                            {item.name}
                          </span>
                          <span className="font-mono text-white/55 shrink-0">
                            ${item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>14 Separate Longevity Supplements</span>
                        <span className="font-mono line-through decoration-red-400">
                          ${totalDiyCost} / mo
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>Single Clinic NAD+ IV Infusion</span>
                        <span className="font-mono line-through decoration-red-400">
                          $600–$1,000+ / drip
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-[var(--color-levl-cyan)]/20 to-purple-500/20 border border-[var(--color-levl-cyan)]/40 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-white">
                        LIFESPAN+ Activate (1 Daily Scoop)
                      </div>
                      <div className="text-[11px] text-white/75">
                        Join Waitlist for Founding Member 30% Launch Discount
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[var(--color-levl-cyan)] text-slate-950 font-black text-xs shrink-0">
                      All-In-One
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Thumbnail / View Switcher Tabs */}
          <div
            className="grid grid-cols-4 gap-2.5"
            role="tablist"
            aria-label="LIFESPAN+ Activate product views"
          >
            {GALLERY_TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isSelected = activeSlide === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveSlide(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? "bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)] text-white shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                      : "bg-[#0B0E17] border-white/10 text-white/65 hover:border-white/25 hover:text-white"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`w-4 h-4 ${
                      isSelected
                        ? "text-[var(--color-levl-cyan)]"
                        : "text-white/50"
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-bold leading-tight">
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Headline, Benefits & Waitlist + Protocol Quiz CTA Box */}
        <div className="flex flex-col gap-3">
          {/* Authority Badge */}
          <div className="mb-2">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-panel)] border border-amber-400/35 text-xs font-semibold text-amber-200 shadow-sm">
              <Cpu aria-hidden="true" className="w-3.5 h-3.5 text-amber-400" />
              <span>
                PhD-Formulated • Physician-Approved • Guided by LEVL’s AI
                Synergy Engine
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.06] mb-3">
            OutPace Aging. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-[var(--color-levl-cyan)] to-[var(--color-levl-magenta)]">
              End Your Fast, Not Your Autophagy.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-levl-text-secondary)] leading-relaxed mb-5">
            Patented, fasting-inspired support for cellular renewal, healthy
            aging, steady energy, and cognition—even with a meal. Supports the
            longevity pathways associated with fasting without the hunger,
            cortisol spikes, or muscle loss of caloric restriction.
          </p>

          {/* Key Bullet Points */}
          <ul className="space-y-3.5 mb-6">
            {activateContent.heroBullets.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm sm:text-base text-white/90"
              >
                <div
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 rounded-full bg-[var(--color-levl-cyan)] shadow-[0_0_8px_var(--color-levl-cyan)] shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* WAITLIST & PROTOCOL QUIZ BOX (Replacing PurchaseBox per instructions) */}
          <div
            id="waitlist-box"
            className="bg-[linear-gradient(30deg,#1B1237e6,#451F5233)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-3xl p-5 sm:p-7 flex flex-col gap-5 shadow-2xl shadow-black/60"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                  <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
                  In Development • Daytime Longevity Complex
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  LIFESPAN+ Activate
                </h2>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-extrabold">
                  Founding Waitlist Open
                </span>
                <div className="text-[11px] text-white/55 mt-1">
                  1 Scoop / Morning Meal • 30 Servings
                </div>
              </div>
            </div>

            {/* Dual CTA: Join Waitlist + Take Protocol Quiz */}
            <ActivateWaitlistForm variant="hero" />

            {/* 6 Trust & Quality Badges */}
            <div className="pt-4 border-t border-[var(--color-levl-panel-border)] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  text: "PhD-Formulated & MD-Approved",
                  icon: ShieldCheck,
                },
                {
                  text: "Guided by LEVL’s AI Synergy Engine",
                  icon: Cpu,
                },
                {
                  text: "14 Clinically Aligned Actives",
                  icon: FlaskConical,
                },
                {
                  text: "0 mg Caffeine • Zero Crash",
                  icon: Zap,
                },
                {
                  text: "GMP Certified & 3rd-Party Tested",
                  icon: Factory,
                },
                {
                  text: "Ultra-High Purity • USA Made",
                  icon: Award,
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-[var(--color-levl-text-secondary)]"
                >
                  <badge.icon
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-[var(--color-levl-cyan)] shrink-0"
                  />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[var(--color-levl-text-muted)] text-center leading-relaxed">
              *These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease.
            </p>
          </div>

          {/* Clinical Highlights StatsBar */}
          <div className="bg-[linear-gradient(30deg,#301844e6,#5D265E33)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-5 sm:p-6 grid grid-cols-3 gap-4 divide-x divide-white/10 shadow-lg mt-3">
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
                14
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[var(--color-levl-text-muted)] tracking-wider uppercase mt-0.5">
                Synergistic Actives
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="text-2xl sm:text-3xl font-black text-[var(--color-levl-cyan)] tracking-tighter">
                12 / 12
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[var(--color-levl-text-muted)] tracking-wider uppercase mt-0.5">
                Hallmarks Targeted
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tighter">
                +142%
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[var(--color-levl-text-muted)] tracking-wider uppercase mt-0.5">
                Clinical NAD+ Study
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
