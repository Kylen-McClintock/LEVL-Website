"use client";

import React, { useState } from "react";
import { Check, X, Minus, Info } from "lucide-react";
import { activateContent } from "@/content/productActivate";

export function ActivateComparisonTable() {
  const { caption, headers, rows } = activateContent.comparisonTable;
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const captionId = "activate-comparison-table-caption";

  const toggleTooltip = (idx: number) => {
    setOpenTooltipIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="comparison"
      className="py-24 bg-[#070A0F] border-t border-white/10 relative overflow-hidden"
    >
      {/* Ambient accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Category Comparison
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How <span className="text-amber-400">LIFESPAN+ Activate</span> Compares
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Most morning powders force a trade-off between stimulant energy drinks that crash your adrenals, basic longevity blends that ignore methylation and fasting pathways, or $600+ clinic NAD+ IV drips.
          </p>
        </div>

        {/* Accessible, keyboard-scrollable responsive table container */}
        <div
          tabIndex={0}
          role="region"
          aria-labelledby={captionId}
          className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0B1018]/90 shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <table className="w-full border-collapse text-left min-w-[820px]">
            <caption id={captionId} className="sr-only">
              {caption}
            </caption>
            <thead>
              <tr className="border-b border-white/10">
                {headers.map((header, idx) => {
                  const isFeatureCol = idx === 0;
                  const isActivateCol = idx === 1;
                  return (
                    <th
                      key={header}
                      scope="col"
                      className={`p-5 sm:p-6 align-bottom ${
                        isFeatureCol
                          ? "sticky start-0 z-20 bg-[#0B1018] w-[26%] text-xs font-bold uppercase tracking-widest text-gray-400 border-r border-white/10"
                          : isActivateCol
                          ? "w-[24%] bg-amber-500/[0.12] border-x border-amber-500/30 text-amber-300"
                          : "w-[16.6%] text-gray-300 font-semibold text-sm"
                      }`}
                    >
                      {isActivateCol ? (
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest mb-2">
                            Morning System
                          </span>
                          <div className="text-lg font-extrabold text-white tracking-tight">
                            {header}
                          </div>
                          <div className="text-[11px] font-medium text-amber-300/80 mt-0.5">
                            14-Active Fasting-Mimetic Complex
                          </div>
                        </div>
                      ) : (
                        <span>{header}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {rows.map((row, idx) => {
                const isTooltipOpen = openTooltipIndex === idx;
                return (
                  <tr
                    key={row.feature}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Sticky Row Header */}
                    <th
                      scope="row"
                      className="sticky start-0 z-10 bg-[#0B1018] group-hover:bg-[#101722] p-5 sm:p-6 font-bold text-white border-r border-white/10 align-top transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="leading-snug">{row.feature}</span>
                        {row.tooltip && (
                          <button
                            type="button"
                            onClick={() => toggleTooltip(idx)}
                            aria-expanded={isTooltipOpen}
                            aria-label={`More details about ${row.feature}`}
                            className="p-1 rounded-md text-gray-500 hover:text-amber-400 hover:bg-white/5 transition-colors shrink-0"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {isTooltipOpen && row.tooltip && (
                        <p className="mt-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-normal text-gray-300 leading-relaxed">
                          {row.tooltip}
                        </p>
                      )}
                    </th>

                    {/* LIFESPAN+ Activate Column */}
                    <td className="p-5 sm:p-6 bg-amber-500/[0.07] border-x border-amber-500/30 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="font-bold text-white leading-snug">
                          {row.activate}
                        </span>
                      </div>
                    </td>

                    {/* Other Longevity Powders */}
                    <td className="p-5 sm:p-6 text-gray-300 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/10 text-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Minus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-300 leading-snug">
                          {row.otherLongevity}
                        </span>
                      </div>
                    </td>

                    {/* Stimulant Energy Drinks */}
                    <td className="p-5 sm:p-6 text-gray-400 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-400 leading-snug">
                          {row.energyDrinks}
                        </span>
                      </div>
                    </td>

                    {/* $600+ NAD+ IV Clinics */}
                    <td className="p-5 sm:p-6 text-gray-400 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/10 text-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Minus className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-400 leading-snug">
                          {row.nadIv}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Caption Note */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Tip: Click the <Info className="w-3.5 h-3.5 inline mx-0.5 -mt-0.5 text-gray-400" /> icon on any row for mechanistic details. Swipe or scroll horizontally on mobile devices.
        </p>
      </div>
    </section>
  );
}
