"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { activateContent } from "@/content/productActivate";

const hallmarks = [
  "Autophagy",
  "Mitochondrial Health",
  "Cellular Renewal",
  "Genomic Stability",
  "Metabolic Health",
  "Stem Cell Vitality",
  "Telomere Preservation",
  "Inflammatory Balance",
];

const daytimeBenefits = [
  "Fasting-Mimetic Autophagy",
  "Cellular Energy & NAD+",
  "Skin & Joint Longevity",
  "Muscle & Brain Performance",
  "Morning Minerals",
];

export function ActivateInteractiveIngredients() {
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(
    null
  );

  const ingredients = activateContent.ingredients;

  const filteredIngredients = ingredients.filter((i) => {
    if (selectedHall && !i.halls?.includes(selectedHall)) return false;
    if (selectedBenefit && !i.daytimeBenefits?.includes(selectedBenefit))
      return false;
    return true;
  });

  return (
    <div className="py-12 md:py-24 space-y-12">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          14 Ingredients Targeting All 12 Hallmarks of Aging
        </h2>
        <p className="text-[var(--color-levl-text-secondary)] text-lg">
          Activate isn&apos;t just a morning drink. It&apos;s a fasting-mimetic
          longevity protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
        {/* Left Side: Filter Menus (Matches InteractiveIngredients.tsx) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Daytime Benefits Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[var(--color-levl-text-muted)] uppercase tracking-widest mb-4 px-2">
              Daytime Benefits
            </h3>
            {daytimeBenefits.map((benefit) => (
              <button
                key={benefit}
                type="button"
                onClick={() => {
                  setSelectedBenefit(
                    selectedBenefit === benefit ? null : benefit
                  );
                  setSelectedHall(null);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-full transition-all text-base font-medium border border-white/15 cursor-pointer [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] ${
                  selectedBenefit === benefit
                    ? "bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] text-white shadow-[0_0_20px_rgba(246,149,32,0.45)] scale-[1.02]"
                    : "bg-[linear-gradient(to_right,rgba(221,77,14,0.6)_0%,rgba(246,149,32,0.58)_32%,rgba(99,149,208,0.58)_68%,rgba(51,130,199,0.6)_100%)] text-white/90 hover:bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] hover:text-white hover:scale-[1.01]"
                }`}
              >
                {benefit}
              </button>
            ))}
          </div>

          {/* Hallmarks Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[var(--color-levl-text-muted)] uppercase tracking-widest mb-4 px-2">
              Improved Hallmarks
            </h3>
            {hallmarks.map((hall) => (
              <button
                key={hall}
                type="button"
                onClick={() => {
                  setSelectedHall(selectedHall === hall ? null : hall);
                  setSelectedBenefit(null);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-full transition-all text-base font-medium border border-white/15 cursor-pointer [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] ${
                  selectedHall === hall
                    ? "bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] text-white shadow-[0_0_20px_rgba(246,149,32,0.45)] scale-[1.02]"
                    : "bg-[linear-gradient(to_right,rgba(221,77,14,0.6)_0%,rgba(246,149,32,0.58)_32%,rgba(99,149,208,0.58)_68%,rgba(51,130,199,0.6)_100%)] text-white/90 hover:bg-[linear-gradient(to_right,rgba(221,77,14,1)_0%,rgba(246,149,32,1)_32%,rgba(99,149,208,1)_68%,rgba(51,130,199,1)_100%)] hover:text-white hover:scale-[1.01]"
                }`}
              >
                {hall}
              </button>
            ))}
          </div>

          {(selectedHall || selectedBenefit) && (
            <button
              type="button"
              onClick={() => {
                setSelectedHall(null);
                setSelectedBenefit(null);
              }}
              className="text-xs text-[var(--color-levl-text-muted)] hover:text-white mt-4 w-full text-center underline cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Right Side: Ingredients Grid (Identical aesthetics & behavior to InteractiveIngredients.tsx) */}
        <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 content-start">
          <AnimatePresence>
            {filteredIngredients.map((ing) => (
              <motion.div
                key={ing.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`relative rounded-2xl p-[2px] flex flex-col bg-[linear-gradient(180deg,#3382C7_0%,#6395D0_22%,#EBB589_48%,#F69520_74%,#DD4D0E_100%)] hover:shadow-[0_0_20px_rgba(246,149,32,0.28)] transition-shadow duration-300 ${
                  expandedIngredient === ing.name
                    ? "col-span-2 lg:col-span-4 h-auto aspect-auto"
                    : "aspect-square w-full"
                }`}
              >
                <div className="bg-[#0B0E17] rounded-2xl p-3 sm:p-3.5 md:p-4 flex flex-col justify-between h-full w-full relative overflow-hidden">
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
                    <span className="text-[9px] sm:text-[10px] font-mono text-white/60 tracking-widest uppercase bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                      {ing.dose}
                    </span>
                  </div>

                  {/* Ingredient Name & Subtitle */}
                  <div className="flex flex-col items-center justify-center text-center pt-5 sm:pt-6 pb-1 flex-grow">
                    {(() => {
                      const match = ing.name.match(/^(.*?)\s*(\(.*?\))$/);
                      const mainName = match ? match[1] : ing.name;
                      const subName = match ? match[2] : null;
                      return (
                        <h4 className="font-bold text-white text-sm sm:text-base md:text-lg leading-tight flex flex-col items-center justify-center gap-0.5">
                          <span>{mainName}</span>
                          {subName && (
                            <span className="text-[10px] sm:text-[11px] text-[var(--color-levl-text-secondary)] font-medium">
                              {subName}
                            </span>
                          )}
                        </h4>
                      );
                    })()}
                  </div>

                  {/* Bottom Area with Function and Learn More */}
                  <div className="mt-auto flex flex-col shrink-0">
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-center text-[var(--color-levl-text-secondary)] leading-snug line-clamp-2 mb-2 px-0.5">
                      {ing.function}
                    </p>

                    {/* Toggleable Description */}
                    <div className="pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedIngredient(
                            expandedIngredient === ing.name ? null : ing.name
                          )
                        }
                        className="text-[10px] sm:text-xs font-semibold text-white/60 hover:text-white flex items-center justify-center gap-1 w-full transition-colors cursor-pointer py-0.5"
                      >
                        {expandedIngredient === ing.name
                          ? "Show less"
                          : "Learn more"}
                        {expandedIngredient === ing.name ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedIngredient === ing.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-5 text-sm text-[var(--color-levl-text-secondary)] overflow-hidden flex flex-col gap-6"
                          >
                            <div className="flex flex-wrap gap-2 justify-center">
                              {ing.daytimeBenefits?.map((b: string) => (
                                <Badge
                                  key={b}
                                  variant="outline"
                                  className={`text-[10px] ${
                                    selectedBenefit === b
                                      ? "bg-[var(--color-levl-copper)]/20 border-[var(--color-levl-copper)]/40 text-[var(--color-levl-copper)]"
                                      : "bg-transparent border-white/10 text-white/50"
                                  }`}
                                >
                                  {b}
                                </Badge>
                              ))}
                              {ing.halls?.map((h: string) => (
                                <Badge
                                  key={h}
                                  variant="outline"
                                  className={`text-[10px] ${
                                    selectedHall === h
                                      ? "bg-[var(--color-levl-cyan)]/20 border-[var(--color-levl-cyan)]/40 text-[var(--color-levl-cyan)]"
                                      : "bg-transparent border-white/10 text-white/50"
                                  }`}
                                >
                                  {h}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-2">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                                Evidence:
                              </span>
                              <Badge
                                variant="outline"
                                className="text-[10px] bg-white/5 text-[var(--color-levl-text-secondary)] border-white/10 font-medium shrink-0"
                              >
                                {ing.evidenceTag}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                              <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h5 className="text-xs font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider">
                                  Longevity Mechanism
                                </h5>
                                <p className="text-[13px] leading-relaxed text-white/90">
                                  {ing.whyItMatters}
                                </p>
                              </div>

                              <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
                                <h5 className="text-xs font-bold text-[var(--color-levl-copper)] uppercase tracking-wider">
                                  Daytime Functional Benefit
                                </h5>
                                <p className="text-[13px] leading-relaxed text-white/90">
                                  {ing.daytimeBenefitDetail}
                                </p>
                              </div>

                              <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/10 md:col-span-2">
                                <h5 className="text-xs font-bold text-white/60 uppercase tracking-wider">
                                  Biochemical Mechanism
                                </h5>
                                <p className="text-[13px] leading-relaxed text-white/80">
                                  {ing.daytimeMechanism}
                                </p>
                              </div>
                            </div>

                            {ing.enhancedBenefitsWith &&
                              ing.enhancedBenefitsWith.length > 0 && (
                                <div className="mt-2 text-center pt-4 border-t border-white/10">
                                  <h5 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                                    Synergistic Stack
                                  </h5>
                                  <div className="flex flex-wrap gap-2 justify-center">
                                    {ing.enhancedBenefitsWith.map(
                                      (synergy: string) => (
                                        <span
                                          key={synergy}
                                          className="text-[11px] px-3 py-1 rounded-full bg-black/40 border border-white/10 text-white/80"
                                        >
                                          + {synergy}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
