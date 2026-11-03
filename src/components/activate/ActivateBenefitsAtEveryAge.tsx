"use client";

import React, { useState } from "react";
import { Check, Activity, Sparkles } from "lucide-react";
import { activateContent } from "@/content/productActivate";

export function ActivateBenefitsAtEveryAge() {
  const { benefitsByAge } = activateContent;
  const [activeTabId, setActiveTabId] = useState(benefitsByAge[1].id); // Default to 30s

  const activeContent =
    benefitsByAge.find((b) => b.id === activeTabId) || benefitsByAge[0];

  return (
    <section
      id="benefits-by-age"
      className="py-24 bg-[#0A0E17] border-t border-white/10 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-teal-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
            Decade-Specific Cellular Support
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Benefits at <span className="text-amber-400">Every Age</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Whether you are optimizing peak athletic and cognitive output in your 20s and 30s or restoring NAD+, AKG, Taurine, and cellular proteostasis in your 40s, 50s, and 60+, Activate adapts to your decade&apos;s biological bottlenecks.
          </p>
        </div>

        {/* Decade Selector Tabs */}
        <div
          role="tablist"
          aria-label="Benefits by age decade"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {benefitsByAge.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all ${
                  isActive
                    ? "bg-amber-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.3)]"
                    : "bg-white/[0.04] text-gray-300 border border-white/10 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Decade Content Panel */}
        <div className="rounded-3xl bg-[#0D131F] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
              {activeContent.label} • Biological Priorities
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              {activeContent.title}
            </h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {activeContent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Card: What's Happening in Your Body */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-200">
                    What&apos;s Happening in Your Body
                  </h4>
                  <p className="text-xs text-gray-400">
                    Key cellular &amp; metabolic shifts {activeContent.label.toLowerCase()}
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {activeContent.bodyChanges.map((change, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-gray-300 leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400/80 mt-2 shrink-0" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Card: How LIFESPAN+ Activate Intervenes */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/[0.08] to-teal-500/[0.05] border border-amber-500/30 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-amber-300">
                    How LIFESPAN+ Activate Intervenes
                  </h4>
                  <p className="text-xs text-amber-200/70">
                    Targeted morning pathways &amp; functional support
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {activeContent.levlBenefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-white font-medium leading-relaxed"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
