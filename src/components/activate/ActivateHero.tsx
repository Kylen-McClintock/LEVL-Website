"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowDown,
  Award,
  Calendar,
  Factory,
  Flame,
  RefreshCcw,
  ShieldCheck,
  Sun,
  Truck,
  Zap,
} from "lucide-react";
import { activateContent } from "@/content/productActivate";
import { ActivateWaitlistForm } from "./ActivateWaitlistForm";

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

const GALLERY_IMAGES = [
  {
    url: "/images/activate-bottle.jpg",
    altText: "LEVL LIFESPAN+ Activate",
  },
  {
    url: "/images/activate_pathways_bg.png",
    altText: "5 Core Biological Pathways",
  },
  {
    url: "/images/supplement_facts.png",
    altText: "Supplement Facts",
  },
  {
    url: "/images/value_prop_thumbnail.png",
    altText: "Value Proposition",
  },
];

export function ActivateHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex =
    currentIndex >= GALLERY_IMAGES.length ? 0 : currentIndex;
  const totalValue = VALUE_INGREDIENTS.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <section
      id="purchase"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column: Gallery (Matches ProductGallery.tsx 1-for-1) */}
        <div className="flex flex-col gap-8 h-fit lg:sticky lg:top-24">
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeIndex}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-0"
                >
                  <Image
                    src={GALLERY_IMAGES[safeIndex].url}
                    alt={GALLERY_IMAGES[safeIndex].altText}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Selling Points (Visible on main product pouch image, identical to ProductGallery.tsx) */}
              <AnimatePresence>
                {safeIndex === 0 && (
                  <>
                    {/* Chip 1: Mitochondrial Health */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="absolute top-[15%] right-[5%] z-20"
                    >
                      <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-magenta)]/50 transition-colors">
                        <Zap className="w-3.5 h-3.5 text-[var(--color-levl-magenta)]" />
                        Mitochondrial Health
                      </div>
                    </motion.div>

                    {/* Chip 2: Cellular Renewal */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, 8, 0],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
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

                    {/* Chip 3: Fasting-Mimetic Autophagy */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
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
                  </>
                )}

                {GALLERY_IMAGES[safeIndex].altText === "Supplement Facts" && (
                  <motion.div
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
                          0 mg Caffeine • Natural Orange Flavor
                        </p>
                      </div>

                      <p className="text-[11px] text-white/60 pt-2 border-t border-white/20">
                        Manufactured in the USA in a GMP-compliant facility for
                        LEVL, Inc.
                      </p>
                    </div>
                  </motion.div>
                )}

                {GALLERY_IMAGES[safeIndex].altText === "Value Proposition" && (
                  <motion.div
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
                          <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#3382C7_0%,#6395D0_28%,#EBB589_55%,#F69520_80%,#DD4D0E_100%)]">
                            SAVE 80%+
                          </span>
                        </h2>
                        <p className="text-[var(--color-levl-text-secondary)] text-xs md:text-sm leading-tight uppercase">
                          VS INDIVIDUAL SUPPLEMENTS
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
                            Total Separately
                          </span>
                          <span className="text-[var(--color-levl-text-secondary)] line-through decoration-red-500/50 decoration-2 font-mono text-sm">
                            ${totalValue} USD
                          </span>
                        </div>

                        <div className="bg-[linear-gradient(to_right,rgba(221,77,14,0.22)_0%,rgba(246,149,32,0.2)_35%,rgba(99,149,208,0.2)_70%,rgba(51,130,199,0.25)_100%)] rounded-xl p-3 border border-[#F69520]/35 flex justify-between items-center">
                          <span className="text-white font-bold text-xs sm:text-sm">
                            Activate Waitlist
                          </span>
                          <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#3382C7_0%,#6395D0_28%,#EBB589_55%,#F69520_80%,#DD4D0E_100%)] font-black text-base sm:text-lg">
                            Founding Access
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnails (Actual image previews matching ProductGallery.tsx) */}
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
              {GALLERY_IMAGES.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start cursor-pointer ${
                    safeIndex === index
                      ? "border-[var(--color-levl-cyan)]"
                      : "border-transparent hover:border-[var(--color-levl-panel-border)]"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover p-1"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Info & Waitlist Box */}
        <div
          className="flex flex-col gap-2 pb-12 lg:pb-0 lg:sticky"
          style={{ top: "max(6rem, calc(100vh - 100% - 2rem))" }}
        >
          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#patent-panel"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("patent-panel")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[linear-gradient(to_right,rgba(221,77,14,0.22)_0%,rgba(246,149,32,0.2)_32%,rgba(99,149,208,0.2)_68%,rgba(51,130,199,0.25)_100%)] border border-[#F69520]/45 hover:border-[#F69520]/80 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer group"
              >
                <Flame className="w-3.5 h-3.5 text-[#F69520]" />
                <span>Built on patented autophagy research</span>
                <ArrowDown className="w-3 h-3 text-[#6395D0] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] text-xs font-semibold text-white/90 shadow-sm">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  PhD-Formulated • Guided by LEVL&apos;s AI Synergy Engine
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-6">
              OutPace Aging <br />
              <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#3382C7_0%,#6395D0_28%,#EBB589_55%,#F69520_80%,#DD4D0E_100%)]">
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
                <div className="h-1.5 w-1.5 rounded-full bg-[#F69520] shadow-[0_0_8px_#F69520] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Waitlist & Protocol Quiz Box */}
          <div
            id="purchase-section"
            className="bg-[linear-gradient(135deg,rgba(19,42,74,0.88)_0%,rgba(28,33,53,0.85)_50%,rgba(68,28,14,0.48)_100%)] backdrop-blur-md border border-[#6395D0]/30 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 shadow-2xl shadow-black/50 scroll-mt-20"
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

            <ActivateWaitlistForm variant="hero" />

            {/* Trust Badges */}
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
        </div>
      </div>
    </section>
  );
}
