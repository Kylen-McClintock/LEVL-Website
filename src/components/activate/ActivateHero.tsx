"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Award,
  Calendar,
  Dna,
  Factory,
  Flame,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  Zap,
} from "lucide-react";
import { activateContent } from "@/content/productActivate";
import { ActivateWaitlistForm } from "./ActivateWaitlistForm";
import { StatsBar } from "@/components/product/StatsBar";

const VALUE_INGREDIENTS = [
  { name: "Nicotinamide Riboside (NR)", dose: "300 mg", price: 54 },
  { name: "Ca-AKG (Sustained Grade)", dose: "1,000 mg", price: 45 },
  { name: "Pterostilbene", dose: "100 mg", price: 28 },
  { name: "Trehalose", dose: "5,000 mg", price: 24 },
  { name: "EGCG (98% Green Tea)", dose: "300 mg", price: 22 },
  { name: "Creatine Monohydrate", dose: "2,500 mg", price: 22 },
  { name: "Vegan Glucosamine HCl", dose: "1,500 mg", price: 20 },
  { name: "Magnesium Malate", dose: "200 mg", price: 20 },
  { name: "Taurine", dose: "1,000 mg", price: 18 },
  { name: "Trimethylglycine (TMG)", dose: "500 mg", price: 18 },
  { name: "Glycine", dose: "1,500 mg", price: 16 },
  { name: "Potassium Aspartate", dose: "99 mg", price: 15 },
  { name: "Vitamin D3 (5,000 IU)", dose: "125 mcg", price: 14 },
  { name: "Vitamin C (Sodium Ascorbate)", dose: "250 mg", price: 12 },
];

/**
 * Renders the signature LEVL Matte-Black Vessel with the authentic Activate Element Square
 * matching `deepcell-bottle.jpg` (vertical LIFESPAN+, Element Square with top-left pill,
 * top-right icon, bold product title, 2-line subtitle, and Today / Long Term horizon bar).
 */
function ActivateBottleGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-center select-none ${
        compact ? "w-28 sm:w-32" : "w-60 sm:w-68"
      }`}
    >
      {/* Matte-Black Cylindrical Cap */}
      <div
        className={`w-[92%] ${
          compact ? "h-6 rounded-t-md" : "h-12 sm:h-14 rounded-t-xl"
        } bg-gradient-to-r from-[#0A0B0E] via-[#2A2D37] to-[#08090C] border-x border-t border-white/15 shadow-[0_6px_15px_rgba(0,0,0,0.8)] relative z-10`}
      />
      {/* Neck Groove */}
      <div className="w-[88%] h-1.5 bg-black border-x border-white/10" />

      {/* Matte-Black Cylindrical Bottle Body */}
      <div
        className={`w-full ${
          compact ? "rounded-b-xl pb-3" : "rounded-b-2xl rounded-t-sm pb-6"
        } bg-gradient-to-r from-[#08090C] via-[#1B1D24] to-[#07080B] border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col`}
      >
        {/* Top Metallic Band with LEVL+ Wordmark */}
        <div
          className={`w-full ${
            compact ? "h-3.5 mt-1.5" : "h-6 sm:h-7 mt-3"
          } bg-gradient-to-r from-[#2D1B54] via-[#9F4576] to-[#E58063] flex items-center justify-center shadow-sm`}
        >
          <span
            className={`${
              compact ? "text-[7px]" : "text-[11px] sm:text-xs"
            } font-black tracking-[0.28em] text-white uppercase`}
          >
            LEVL<sup className="text-[75%]">+</sup>
          </span>
        </div>

        {/* Middle Section: Vertical LIFESPAN+ & The Activate Element Square */}
        <div
          className={`flex items-center justify-center ${
            compact ? "px-2 py-2.5 gap-1.5" : "px-4 sm:px-5 py-5 sm:py-6 gap-3"
          }`}
        >
          {/* Vertical LIFESPAN+ along left edge */}
          <div className="flex items-center justify-center shrink-0">
            <span
              className={`[writing-mode:vertical-lr] rotate-180 font-extralight tracking-[0.25em] text-white/90 uppercase leading-none ${
                compact ? "text-[9px]" : "text-lg sm:text-xl"
              }`}
            >
              LIFESPAN+
            </span>
          </div>

          {/* THE ACTIVATE ELEMENT SQUARE (matches DeepCell Element Square) */}
          <div
            className={`aspect-square flex-1 rounded-xl p-[1.5px] bg-gradient-to-bl from-[#2D1B54] via-[#9F4576] to-[#E58063] shadow-[0_0_25px_rgba(229,128,99,0.15)]`}
          >
            <div
              className={`w-full h-full rounded-[10px] bg-[#111319]/95 flex flex-col justify-between ${
                compact ? "p-2" : "p-3.5 sm:p-4"
              }`}
            >
              {/* Top Row inside Square: Pill on left, Sun icon on right */}
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`${
                    compact
                      ? "text-[5px] px-1 py-0.5"
                      : "text-[9px] sm:text-[10px] px-2.5 py-0.5"
                  } rounded-full bg-[#2D1B54]/70 border border-white/15 text-white/90 font-medium tracking-wide`}
                >
                  Caffeine-Free
                </span>
                <Sun
                  aria-hidden="true"
                  className={`${
                    compact ? "w-2.5 h-2.5" : "w-4 h-4 sm:w-4.5 sm:h-4.5"
                  } text-amber-300/90 stroke-[1.75]`}
                />
              </div>

              {/* Center Product Title inside Square */}
              <div className="my-auto text-left">
                <div
                  className={`${
                    compact
                      ? "text-sm"
                      : "text-2xl sm:text-3xl"
                  } font-bold text-white tracking-tight leading-none`}
                >
                  Activate
                </div>
              </div>

              {/* Bottom 2-Line Descriptor inside Square */}
              <div
                className={`${
                  compact
                    ? "text-[6px] leading-tight"
                    : "text-xs sm:text-[13px] leading-snug"
                } text-white/90 font-normal text-left`}
              >
                <div>Fasting-Mimetic</div>
                <div>Longevity Complex</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizon Bar: Immediate vs. Long Term (matches DeepCell bottle) */}
        <div className={compact ? "px-2.5" : "px-5 sm:px-6"}>
          <div
            className={`grid grid-cols-2 text-left ${
              compact ? "text-[6px]" : "text-[11px] sm:text-xs"
            } font-medium text-white/90 pb-1`}
          >
            <span>Cellular Energy*</span>
            <span>Cellular Renewal*</span>
          </div>
          <div className="h-[1.5px] w-full bg-gradient-to-r from-[#2D1B54] via-[#9F4576] to-[#E58063] opacity-80" />
          <div
            className={`grid grid-cols-2 text-left ${
              compact ? "text-[6px] pt-0.5" : "text-[10px] sm:text-[11px] pt-1"
            } font-medium text-[#E58063]`}
          >
            <span>Today</span>
            <span>Long Term</span>
          </div>

          {!compact && (
            <div className="grid grid-cols-2 text-center text-[10px] text-white/75 pt-4 leading-tight">
              <div>
                <div className="font-semibold text-white">30</div>
                <div>Servings</div>
              </div>
              <div>
                <div className="font-semibold text-white">Dietary</div>
                <div>Supplement</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ActivateHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalValue = VALUE_INGREDIENTS.reduce((sum, item) => sum + item.price, 0);

  return (
    <section
      id="purchase"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column: Gallery (Matches ProductGallery.tsx) */}
        <div className="flex flex-col gap-8 h-fit lg:sticky lg:top-24">
          <div className="flex flex-col gap-4">
            {/* Main Aspect-[4/5] Stage */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)]">
              <AnimatePresence mode="wait">
                {/* SLIDE 0: Product Bottle & Floating Chips */}
                {currentIndex === 0 && (
                  <motion.div
                    key="slide-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center overflow-hidden"
                  >
                    {/* Sunrise / Twilight Horizon Backdrop matching deepcell-bottle.jpg */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#090D1A] via-[#2B1636] to-[#08090C]" />
                    <div className="absolute top-[42%] left-0 right-0 h-44 bg-gradient-to-b from-transparent via-[#E58063]/35 to-amber-500/20 blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-black via-[#120A08]/95 to-transparent border-t border-white/5 pointer-events-none" />

                    {/* Matte-Black Activate Vessel with Authentic Element Square */}
                    <div className="relative z-10">
                      <ActivateBottleGraphic />
                    </div>

                    {/* Floating Selling Point Chips (Identical animation & style to ProductGallery.tsx) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                      transition={{
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="absolute top-[14%] right-[5%] z-20"
                    >
                      <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-magenta)]/50 transition-colors">
                        <Zap className="w-3.5 h-3.5 text-[var(--color-levl-magenta)]" />
                        Mitochondrial NAD+ &amp; ATP
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
                      transition={{
                        opacity: { duration: 0.3, delay: 0.1 },
                        scale: { duration: 0.3, delay: 0.1 },
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        },
                      }}
                      className="absolute bottom-[10%] right-[6%] z-20"
                    >
                      <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-cyan)]/50 transition-colors">
                        <Activity className="w-3.5 h-3.5 text-[var(--color-levl-cyan)]" />
                        Cellular Renewal
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                      transition={{
                        opacity: { duration: 0.3, delay: 0.2 },
                        scale: { duration: 0.3, delay: 0.2 },
                        y: {
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        },
                      }}
                      className="absolute top-[8%] left-[4%] z-20"
                    >
                      <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-green)]/50 transition-colors">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Fasting-Mimetic Autophagy
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* SLIDE 1: 5 Synergistic Pathways (Matches deepcell_pathways_bg.png) */}
                {currentIndex === 1 && (
                  <motion.div
                    key="slide-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 bg-[#0B0E17] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B0E17] via-[#1B122C] to-[#2C1810] opacity-90" />

                    <div className="relative z-10 max-w-md">
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                        5 SYNERGISTIC
                        <br />
                        PATHWAYS
                      </h2>
                      <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                        Activate combines five scientifically designed daytime
                        pathways to target all 12 Hallmarks of Aging—even with
                        breakfast.
                      </p>
                    </div>

                    <div className="relative z-10 space-y-3 my-auto py-2">
                      {[
                        {
                          icon: Flame,
                          color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
                          title: "Fasting-Mimetic Autophagy",
                          sub: "AMPK & TFEB cellular cleanup with a meal",
                        },
                        {
                          icon: Zap,
                          color:
                            "text-[var(--color-levl-cyan)] border-[var(--color-levl-cyan)]/30 bg-[var(--color-levl-cyan)]/10",
                          title: "Intracellular NAD+ & ATP",
                          sub: "NR + Pterostilbene + Creatine bioenergetics",
                        },
                        {
                          icon: Dna,
                          color:
                            "text-[var(--color-levl-magenta)] border-[var(--color-levl-magenta)]/30 bg-[var(--color-levl-magenta)]/10",
                          title: "Pace of Aging & Methylation",
                          sub: "Ca-AKG + Vitamin C + TMG epigenetic balance",
                        },
                        {
                          icon: Sparkles,
                          color:
                            "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
                          title: "Skin, Joint, Muscle & Brain",
                          sub: "Glycine, Glucosamine, Taurine & Creatine matrix",
                        },
                        {
                          icon: Sun,
                          color:
                            "text-purple-300 border-purple-400/30 bg-purple-400/10",
                          title: "Krebs Malate & Morning Minerals",
                          sub: "Magnesium Malate, Potassium Aspartate & D3",
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}
                          >
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white leading-tight">
                              {item.title}
                            </div>
                            <div className="text-xs text-white/65">
                              {item.sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mini bottle in bottom-right corner like deepcell_pathways_bg.png */}
                    <div className="hidden sm:block absolute bottom-4 right-4 z-10 opacity-95">
                      <ActivateBottleGraphic compact />
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 2: Supplement Facts (Matches SupplementFacts.tsx) */}
                {currentIndex === 2 && (
                  <motion.div
                    key="slide-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 bg-[#0B0E17] text-white overflow-y-auto hide-scrollbar p-3 md:p-6 flex flex-col"
                  >
                    <div className="max-w-md mx-auto w-full bg-black border-2 border-white/20 p-4 md:p-6 shadow-2xl">
                      <h2 className="text-3xl md:text-4xl font-black mb-1 tracking-tighter">
                        Supplement Facts
                      </h2>
                      <div className="flex justify-between text-xs md:text-sm border-b-4 border-white pb-1 mb-2 font-medium">
                        <div className="flex flex-col">
                          <span>Serving Size 1 Scoop (with first meal)</span>
                          <span>Servings Per Container 30</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs font-bold border-b border-white pb-1 mb-2">
                        <span>14 Active Ingredients</span>
                        <span>Primary Role</span>
                      </div>

                      <div className="space-y-1 text-xs sm:text-sm font-medium">
                        {activateContent.ingredients.map((ing) => (
                          <div
                            key={ing.name}
                            className="flex justify-between items-end border-b border-white/30 pb-0.5"
                          >
                            <span className="font-bold">{ing.name}</span>
                            <span className="text-xs text-white/75 font-mono">
                              {ing.dose}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t-4 border-white mt-2 pt-2 mb-3">
                        <p className="text-xs font-medium">
                          0 mg Caffeine • Guided by LEVL&apos;s AI Synergy Engine
                        </p>
                      </div>

                      <p className="text-[11px] text-white/60 pt-2 border-t border-white/20">
                        Formulated in the USA in a GMP-compliant facility for
                        LEVL, Inc.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 3: Value Proposition (Matches ValueProposition.tsx) */}
                {currentIndex === 3 && (
                  <motion.div
                    key="slide-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 bg-[var(--color-levl-bg)] flex flex-col items-center justify-center p-3 md:p-6 overflow-y-auto hide-scrollbar"
                  >
                    <div className="w-full max-w-lg mx-auto">
                      <div className="text-center mb-3 md:mb-4">
                        <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter mb-1 leading-tight">
                          INCREDIBLE VALUE: <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-levl-magenta)] to-[var(--color-levl-cyan)]">
                            SAVE 80%+
                          </span>
                        </h2>
                        <p className="text-[var(--color-levl-text-secondary)] text-xs md:text-sm leading-tight uppercase">
                          VS 14 INDIVIDUAL SUPPLEMENTS &amp; $600+ NAD+ IV DRIPS
                        </p>
                      </div>

                      <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 p-4 md:p-5">
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
                          {VALUE_INGREDIENTS.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center border-b border-white/5 pb-1"
                            >
                              <span className="text-white/90 text-[11px] font-medium leading-tight truncate pr-1">
                                {item.name}
                              </span>
                              <span className="text-white/60 font-mono text-xs shrink-0">
                                ${item.price}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-black/40 rounded-xl p-3 border border-white/10 mb-2.5 flex justify-between items-center">
                          <span className="text-[var(--color-levl-text-secondary)] text-xs">
                            14 Bottles Separately
                          </span>
                          <span className="text-[var(--color-levl-text-secondary)] line-through decoration-red-500/50 decoration-2 font-mono text-sm">
                            ${totalValue} / mo
                          </span>
                        </div>

                        <div className="bg-gradient-to-r from-[var(--color-levl-magenta)]/20 to-[var(--color-levl-cyan)]/20 rounded-xl p-3 border border-[var(--color-levl-magenta)]/30 flex justify-between items-center">
                          <span className="text-white font-bold text-xs sm:text-sm">
                            LIFESPAN+ Activate (1 Daily Scoop)
                          </span>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-levl-magenta)] to-[var(--color-levl-cyan)] font-black text-base sm:text-lg">
                            Founding Waitlist
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4 Square Thumbnails (Matches ProductGallery.tsx) */}
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {[
                { label: "Activate", sub: "Vessel" },
                { label: "5 Pathways", sub: "Synergy" },
                { label: "Supplement", sub: "Facts" },
                { label: "Save 80%", sub: "Value" },
              ].map((thumb, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start cursor-pointer bg-[#0B0E17] flex flex-col items-center justify-center p-1.5 text-center ${
                    currentIndex === index
                      ? "border-[var(--color-levl-cyan)]"
                      : "border-white/10 hover:border-[var(--color-levl-panel-border)]"
                  }`}
                >
                  {index === 3 ? (
                    <Image
                      src="/images/value_prop_thumbnail.png"
                      alt="Value Proposition"
                      fill
                      className="object-cover p-1"
                    />
                  ) : (
                    <>
                      <span className="text-[10px] font-black text-white leading-tight">
                        {thumb.label}
                      </span>
                      <span className="text-[9px] text-[var(--color-levl-cyan)] font-medium mt-0.5">
                        {thumb.sub}
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Info & Waitlist Box (Matches ProductHero.tsx + PurchaseBox.tsx) */}
        <div
          className="flex flex-col gap-2 pb-12 lg:pb-0 lg:sticky"
          style={{ top: "max(6rem, calc(100vh - 100% - 2rem))" }}
        >
          <div className="mb-8">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] text-xs font-semibold text-white/90 shadow-sm">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  PhD-Formulated • Guided by LEVL&apos;s AI Synergy Engine
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-6">
              OutPace Aging <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-levl-cyan)] via-[var(--color-levl-magenta)] to-[#E58063]">
                Without Fasting
              </span>
            </h1>

            <p className="text-xl text-[var(--color-levl-text-secondary)] mb-8">
              {activateContent.shortDescription}
            </p>
          </div>

          <ul className="space-y-4 mb-10">
            {activateContent.heroBullets.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-levl-cyan)] shadow-[0_0_8px_var(--color-levl-cyan)] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Waitlist & Protocol Quiz Box (Matches PurchaseBox.tsx styling) */}
          <div
            id="purchase-section"
            className="bg-[linear-gradient(30deg,#1B1237e6,#451F5233)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 shadow-2xl shadow-black/50 scroll-mt-20"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-400/30 px-3 py-1 rounded-full">
                In Development • Priority Waitlist Open
              </span>
              <span className="text-xs text-[var(--color-levl-text-secondary)]">
                0 mg Caffeine • 30 Servings
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                LIFESPAN+ Activate
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-levl-cyan)] mt-1 font-medium">
                1 Scoop With Breakfast • End Your Fast, Not Your Autophagy
              </p>
            </div>

            {/* Dual CTA: Join Waitlist + Take Protocol Quiz */}
            <ActivateWaitlistForm variant="hero" />

            {/* Trust Badges (Matches PurchaseBox.tsx) */}
            <div className="pt-4 border-t border-[var(--color-levl-panel-border)] grid grid-cols-2 gap-3">
              {[
                { text: "PhD-Formulated & MD-Approved", icon: ShieldCheck },
                { text: "Guided by AI Synergy Engine", icon: RefreshCcw },
                { text: "14 Clinically Aligned Actives", icon: Truck },
                { text: "All 12 Hallmarks of Aging", icon: Calendar },
                { text: "Manufactured in the USA", icon: Award },
                { text: "GMP Certified & 3rd-Party Tested", icon: Factory },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-[var(--color-levl-text-secondary)]"
                >
                  <item.icon className="w-3.5 h-3.5 text-[var(--color-levl-cyan)] shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[var(--color-levl-text-muted)] text-center">
              {activateContent.purchaseOptions.disclaimer}
            </p>
          </div>

          <StatsBar />
        </div>
      </div>
    </section>
  );
}
