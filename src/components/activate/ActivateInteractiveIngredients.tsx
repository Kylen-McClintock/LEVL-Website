"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Dna,
  Flame,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  activateContent,
  ACTIVATE_FUNCTIONAL_CATEGORIES,
  ACTIVATE_HALLMARKS,
} from "@/content/productActivate";

export function ActivateInteractiveIngredients() {
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [selectedFunc, setSelectedFunc] = useState<string | null>(null);
  const [expandedIngredient, setExpandedIngredient] = useState<string | null>(
    null
  );

  const ingredients = activateContent.ingredients;

  const filteredIngredients = ingredients.filter((ing) => {
    if (selectedHall && !ing.halls.includes(selectedHall)) return false;
    if (selectedFunc && !ing.functionalCategories.includes(selectedFunc))
      return false;
    return true;
  });

  return (
    <section
      id="ingredients"
      className="py-16 md:py-24 border-t border-[var(--color-levl-panel-border)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/30 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
            <span>Interactive Periodic Element Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            14 Synergistic Actives Targeting All 12 Hallmarks of Aging
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-levl-text-secondary)]">
            Every ingredient element square displays both its{" "}
            <strong className="text-[var(--color-levl-cyan)]">
              Longevity Benefit
            </strong>{" "}
            (cellular root cause of aging) and its{" "}
            <strong className="text-amber-300">Functional Benefit</strong>{" "}
            (daytime energy, metabolism, morning minerals, skin, joint, or brain
            vitality). Filter by any pathway or click an element square to
            inspect the mechanism.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: Functional Benefits & 12 Hallmarks Filters */}
          <div className="lg:col-span-3 space-y-7 lg:sticky lg:top-24">
            {/* Functional Benefits Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Zap aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>Functional Benefits</span>
                </h3>
                {selectedFunc && (
                  <button
                    type="button"
                    onClick={() => setSelectedFunc(null)}
                    className="text-[11px] text-white/60 hover:text-white underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-wrap lg:flex-col gap-2">
                {ACTIVATE_FUNCTIONAL_CATEGORIES.map((category) => {
                  const isActive = selectedFunc === category;
                  const count = ingredients.filter((i) =>
                    i.functionalCategories.includes(category)
                  ).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        setSelectedFunc(isActive ? null : category)
                      }
                      className={`w-full text-left px-4 py-2.5 rounded-full transition-all text-xs sm:text-sm font-semibold border flex items-center justify-between gap-2 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-[1.01]"
                          : "bg-white/[0.04] text-white/80 border-white/10 hover:bg-white/[0.09] hover:text-white"
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-black/20 text-slate-950 font-bold"
                            : "bg-white/10 text-white/65"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 12 Hallmarks of Aging Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xs font-bold text-[var(--color-levl-cyan)] uppercase tracking-widest flex items-center gap-1.5">
                  <Dna aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>12 Hallmarks of Aging</span>
                </h3>
                {selectedHall && (
                  <button
                    type="button"
                    onClick={() => setSelectedHall(null)}
                    className="text-[11px] text-white/60 hover:text-white underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
                {ACTIVATE_HALLMARKS.map((hall) => {
                  const isActive = selectedHall === hall;
                  const count = ingredients.filter((i) =>
                    i.halls.includes(hall)
                  ).length;

                  return (
                    <button
                      key={hall}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedHall(isActive ? null : hall)}
                      className={`w-full text-left px-3.5 py-2 rounded-full transition-all text-xs font-medium border flex items-center justify-between gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-[linear-gradient(to_right,rgba(14,165,233,1)_0%,rgba(139,92,246,1)_100%)] text-white border-[var(--color-levl-cyan)] shadow-[0_0_18px_rgba(14,165,233,0.35)]"
                          : "bg-white/[0.03] text-white/75 border-white/10 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      <span className="truncate">{hall}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? "bg-black/25 text-white font-bold"
                            : "bg-white/5 text-white/55"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {(selectedHall || selectedFunc) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedHall(null);
                  setSelectedFunc(null);
                }}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Clear All Filters ({filteredIngredients.length}/14 shown)
              </button>
            )}
          </div>

          {/* RIGHT SIDE: 14 INGREDIENT ELEMENT SQUARES GRID */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
            <AnimatePresence mode="popLayout">
              {filteredIngredients.map((ing) => {
                const isExpanded = expandedIngredient === ing.name;

                return (
                  <motion.div
                    key={ing.name}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.22 }}
                    className={`relative rounded-2xl p-[2px] flex flex-col bg-gradient-to-bl from-[#1E293B] via-[#0EA5E9]/70 to-[#F59E0B]/80 hover:shadow-[0_0_25px_rgba(14,165,233,0.22)] transition-shadow duration-300 ${
                      isExpanded
                        ? "sm:col-span-2 xl:col-span-3 h-auto"
                        : "sm:aspect-square w-full"
                    }`}
                  >
                    <div className="bg-[#0B0E17] rounded-[14px] p-4 sm:p-5 flex flex-col justify-between h-full w-full relative overflow-hidden">
                      {/* Top Periodic Element Header Row */}
                      <div className="flex items-center justify-between gap-2 z-10">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/15">
                          <span className="text-[11px] font-mono text-[var(--color-levl-cyan)] font-bold">
                            {ing.elementNumber}
                          </span>
                          <span className="text-white/30">•</span>
                          <span className="text-xs font-black tracking-tight text-white">
                            {ing.symbol}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-amber-200/90 tracking-wider uppercase bg-amber-500/10 border border-amber-400/25 px-2 py-0.5 rounded-md">
                          {ing.specBadge}
                        </span>
                      </div>

                      {/* Center Ingredient Name & Subtitle */}
                      <div className="my-auto py-3 text-center">
                        <h4 className="font-extrabold text-white text-base sm:text-lg leading-snug">
                          {ing.name}
                        </h4>
                        {ing.subtitle && (
                          <p className="text-[11px] text-[var(--color-levl-text-secondary)] font-medium mt-0.5">
                            {ing.subtitle}
                          </p>
                        )}
                      </div>

                      {/* DUAL BENEFIT READOUT ON ELEMENT SQUARE FACE: Longevity + Functional */}
                      <div className="space-y-2 z-10">
                        <div className="p-2.5 rounded-xl bg-[var(--color-levl-cyan)]/[0.08] border border-[var(--color-levl-cyan)]/25 text-left">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-levl-cyan)]">
                            <Dna aria-hidden="true" className="w-3 h-3 shrink-0" />
                            <span>Longevity Benefit</span>
                          </div>
                          <p className="text-xs font-semibold text-white/95 leading-snug mt-0.5">
                            {ing.longevityBenefitShort}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-400/25 text-left">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                            <Flame
                              aria-hidden="true"
                              className="w-3 h-3 shrink-0"
                            />
                            <span>Functional Benefit</span>
                          </div>
                          <p className="text-xs font-semibold text-white/95 leading-snug mt-0.5">
                            {ing.functionalBenefitShort}
                          </p>
                        </div>
                      </div>

                      {/* Expand / Collapse Button & Drawer */}
                      <div className="mt-3 pt-2.5 border-t border-white/10">
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpandedIngredient(isExpanded ? null : ing.name)
                          }
                          className="text-xs font-bold text-white/75 hover:text-white flex items-center justify-center gap-1.5 w-full transition-colors cursor-pointer py-1"
                        >
                          <span>
                            {isExpanded
                              ? "Collapse Clinical Mechanism"
                              : "Explore Mechanism & Synergies"}
                          </span>
                          {isExpanded ? (
                            <ChevronUp aria-hidden="true" className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown
                              aria-hidden="true"
                              className="w-3.5 h-3.5"
                            />
                          )}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-white/10 text-sm text-[var(--color-levl-text-secondary)] overflow-hidden flex flex-col gap-5"
                            >
                              {/* Hallmarks & Functional Tags Row */}
                              <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {ing.functionalCategories.map((cat) => (
                                    <Badge
                                      key={cat}
                                      variant="outline"
                                      className="text-[10px] bg-amber-500/15 border-amber-400/35 text-amber-200"
                                    >
                                      {cat}
                                    </Badge>
                                  ))}
                                  {ing.halls.map((h) => (
                                    <Badge
                                      key={h}
                                      variant="outline"
                                      className="text-[10px] bg-[var(--color-levl-cyan)]/15 border-[var(--color-levl-cyan)]/35 text-[var(--color-levl-cyan)]"
                                    >
                                      {h}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                                    Evidence:
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] bg-emerald-500/15 text-emerald-300 border-emerald-400/30 font-bold"
                                  >
                                    {ing.evidenceTag}
                                  </Badge>
                                </div>
                              </div>

                              {/* Clinical Literature Benchmark Callout */}
                              <div className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/85 flex flex-wrap items-center justify-between gap-2">
                                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-levl-cyan)] font-bold">
                                  Clinical Literature Benchmark:
                                </span>
                                <span className="font-medium text-white">
                                  {ing.clinicalBenchmark}
                                </span>
                              </div>

                              {/* 3-Box Mechanism Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                <div className="space-y-2 bg-white/[0.04] p-4 rounded-xl border border-[var(--color-levl-cyan)]/25">
                                  <h5 className="text-xs font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider">
                                    Longevity Mechanism (Hallmarks of Aging)
                                  </h5>
                                  <p className="text-xs sm:text-sm leading-relaxed text-white/90">
                                    {ing.longevityMechanism}
                                  </p>
                                </div>

                                <div className="space-y-2 bg-white/[0.04] p-4 rounded-xl border border-amber-400/25">
                                  <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                                    Daytime Functional Benefit
                                  </h5>
                                  <p className="text-xs sm:text-sm leading-relaxed text-white/90">
                                    {ing.functionalBenefit}
                                  </p>
                                </div>

                                <div className="space-y-2 bg-white/[0.03] p-4 rounded-xl border border-white/10 md:col-span-2">
                                  <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                                    Nerd Mode • Biochemical Pathway
                                  </h5>
                                  <p className="text-xs sm:text-sm leading-relaxed text-white/80">
                                    {ing.biochemicalMechanism}
                                  </p>
                                </div>
                              </div>

                              {/* Synergistic Stack Partners */}
                              {ing.enhancedBenefitsWith.length > 0 && (
                                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">
                                    AI Synergy Engine Stack Partners:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {ing.enhancedBenefitsWith.map((partner) => (
                                      <button
                                        key={partner}
                                        type="button"
                                        onClick={() =>
                                          setExpandedIngredient(partner)
                                        }
                                        className="text-[11px] px-3 py-1 rounded-full bg-black/50 hover:bg-white/10 border border-white/15 text-white/85 transition-colors cursor-pointer"
                                      >
                                        + {partner}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
