"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Sun,
  Moon,
  ShieldCheck,
  Cpu,
  FlaskConical,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { activateContent } from "@/content/productActivate";
import { ActivateWaitlistForm } from "./ActivateWaitlistForm";

export function ActivateFAQ() {
  const { faqs } = activateContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* 1. Complete 24/7 Bio-Synchronized Longevity System Section */}
      <section
        id="system-pairing"
        className="py-24 bg-[#070A0F] border-t border-white/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              LEVL Bio-Synchronized Total Longevity System
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Better Todays. <span className="text-amber-400">More Tomorrows.</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Human cellular biology operates on a 24-hour circadian clock. Pair morning{" "}
              <strong className="text-white">LIFESPAN+ Activate</strong> with evening{" "}
              <strong className="text-white">LIFESPAN+ DeepCell</strong> for round-the-clock fasting-mimetic renewal, NAD+ energetics, and nocturnal restorative repair—with zero ingredient overlap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Morning: LIFESPAN+ Activate */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#0C121D] to-[#0A0E17] border border-amber-500/30 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-black uppercase tracking-widest">
                    <Sun className="w-3.5 h-3.5" /> Morning Phase • With First Meal
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                    14 Actives • Powder Drink Mix
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  LIFESPAN+ Activate
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Patented-pathway fasting-mimetic &amp; cellular energy complex. Keeps morning autophagy engaged even with breakfast while fueling NAD+, mitochondrial ATP, methylation balance, and skin/joint/muscle resilience.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Core Pathways
                    </div>
                    <div className="text-xs text-gray-300">
                      AMPK / TFEB Autophagy, NAD+ / Sirtuins, TET Epigenetics
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Daytime Outcomes
                    </div>
                    <div className="text-xs text-gray-300">
                      0 mg Caffeine ATP Drive, Morning Minerals, Joint &amp; Brain Support
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-300 font-bold uppercase tracking-wider">
                <span>Currently Viewing • Pre-Launch Waitlist Open</span>
                <a href="#waitlist-hero" className="underline hover:text-white">
                  Join Waitlist ↑
                </a>
              </div>
            </div>

            {/* Evening: LIFESPAN+ DeepCell */}
            <div className="rounded-3xl bg-gradient-to-br from-teal-500/10 via-[#0C121D] to-[#0A0E17] border border-teal-500/30 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400 text-black text-xs font-black uppercase tracking-widest">
                    <Moon className="w-3.5 h-3.5" /> Evening Phase • 30–60 Min Before Bed
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                    12 Actives • Restorative Complex
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  LIFESPAN+ DeepCell
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Nocturnal cellular regeneration &amp; deep sleep architecture complex. Optimizes slow-wave &amp; REM sleep, activates glymphatic brain clearance, lowers nighttime cortisol, and drives overnight DNA &amp; senolytic repair.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                      Core Pathways
                    </div>
                    <div className="text-xs text-gray-300">
                      Glymphatic Clearance, Nocturnal Mitophagy, HPA Axis Calm
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                      Nighttime Outcomes
                    </div>
                    <div className="text-xs text-gray-300">
                      0 mg Melatonin Deep Sleep, HRV Recovery, Morning Sharpness
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-teal-300 font-bold uppercase tracking-wider">
                  Zero Ingredient Overlap with Activate
                </span>
                <Link
                  href="/products/longevity"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-teal-300 transition-colors"
                >
                  Explore DeepCell <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quality & Formulation Guarantee Strip */}
      <section className="py-12 bg-[#0B1018] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  PhD-Formulated, MD-Approved
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Engineered by longevity biochemists and reviewed by preventative physicians.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  AI Synergy Discovery Engine
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Screened across multi-pathway networks to maximize synergy and eliminate antagonism.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  GMP Certified &amp; 3rd-Party Tested
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Verified for ultra-high purity, heavy metal safety, and exact label potency.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Clinically Aligned Dosages
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  100% transparent label—zero proprietary blends, zero stimulants, zero fillers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions */}
      <section
        id="faq"
        className="py-24 bg-[#070A0F] relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-4">
              Science &amp; Protocol FAQ
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Everything you need to know about fasting-mimetic autophagy, NAD+ methylation balance, and how to use LIFESPAN+ Activate.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? "bg-[#0D1420] border-amber-500/40"
                      : "bg-[#0B1018]/80 border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-amber-400 text-black rotate-180"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 4. Bottom Waitlist + Protocol Quiz Conversion Card */}
          <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#111927] via-[#0C121D] to-[#090D14] border border-amber-500/30 p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Outpace Aging • Democratizing Longevity
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Keep Breakfast. Keep Fasting-Aligned.
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Reserve your spot on the <strong className="text-white">LIFESPAN+ Activate</strong> pre-launch waitlist for beta cohort invitations and founding-member pricing—or take our 60-Second Protocol Quiz to discover your personalized longevity stack today.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <ActivateWaitlistForm
                variant="banner"
                source="Activate Bottom Banner"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
