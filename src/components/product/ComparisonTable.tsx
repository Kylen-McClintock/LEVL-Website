"use client";

import React from 'react';
import { Check, Minus, Info } from 'lucide-react';
import { productContent } from '../../content/productLongevity';
import { cn } from '../cart/CheckoutButton';

export function ComparisonTable() {
  const { comparisonTable } = productContent;

  const renderValue = (val: string | boolean) => {
    if (val === true) {
      return (
        <div className="w-5 h-5 sm:w-6 sm:h-6 mx-auto rounded-full bg-[var(--color-levl-cyan)]/20 border border-[var(--color-levl-cyan)] flex items-center justify-center">
          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-levl-cyan)] stroke-[2.5]" />
        </div>
      );
    }
    if (val === false) {
      return <Minus className="w-4 h-4 mx-auto text-white/20" />;
    }
    return (
      <span className="text-[10px] sm:text-xs font-medium text-[var(--color-levl-text-secondary)]">
        {val}
      </span>
    );
  };

  return (
    <section className="py-16 md:py-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Standard for Longevity
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto">
            See how LEVL DeepCell compares to traditional and fragmented sleep approaches.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full bg-[var(--color-levl-panel)]/50 border border-[var(--color-levl-panel-border)] rounded-2xl p-2 sm:p-5 md:p-6 shadow-2xl overflow-hidden">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-levl-panel-border)]">
                {/* Column 1: Feature */}
                <th className="w-[38%] sm:w-[32%] text-left py-3 px-2 sm:px-4 text-[11px] sm:text-xs md:text-sm font-semibold text-white">
                  Feature
                </th>
                
                {/* Column 2: LEVL DeepCell Highlight */}
                <th className="w-[15.5%] sm:w-[17%] text-center py-3 px-1 sm:px-2 bg-[var(--color-levl-cyan)]/15 border-t-2 border-x border-[var(--color-levl-cyan)]/40 rounded-t-xl">
                  <span className="text-[var(--color-levl-cyan)] font-black text-[11px] sm:text-xs md:text-sm block">
                    <span className="md:hidden">DeepCell</span>
                    <span className="hidden md:inline">{comparisonTable.headers[1]}</span>
                  </span>
                </th>

                {/* Column 3: Melatonin */}
                <th className="w-[15.5%] sm:w-[17%] text-center py-3 px-1 sm:px-2 text-[10px] sm:text-xs md:text-sm font-medium text-[var(--color-levl-text-secondary)]">
                  <span className="md:hidden">Melatonin</span>
                  <span className="hidden md:inline">{comparisonTable.headers[2]}</span>
                </th>

                {/* Column 4: Sleeping Pills */}
                <th className="w-[15.5%] sm:w-[17%] text-center py-3 px-1 sm:px-2 text-[10px] sm:text-xs md:text-sm font-medium text-[var(--color-levl-text-secondary)]">
                  <span className="md:hidden">Pills</span>
                  <span className="hidden md:inline">{comparisonTable.headers[3]}</span>
                </th>

                {/* Column 5: DIY Stack */}
                <th className="w-[15.5%] sm:w-[17%] text-center py-3 px-1 sm:px-2 text-[10px] sm:text-xs md:text-sm font-medium text-[var(--color-levl-text-secondary)]">
                  <span className="md:hidden">DIY Stack</span>
                  <span className="hidden md:inline">{comparisonTable.headers[4]}</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {comparisonTable.rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  {/* Feature Name & Tooltip */}
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-left align-middle">
                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                      <span className="text-white font-medium text-[11px] sm:text-xs md:text-sm leading-snug break-words">
                        {row.feature}
                      </span>
                      {row.tooltip && (
                        <div className="relative group shrink-0 inline-block">
                          <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-levl-text-muted)] group-hover:text-[var(--color-levl-cyan)] transition-colors cursor-pointer" />
                          <div className="absolute left-0 bottom-full mb-2 w-44 sm:w-56 bg-[#1A1D27] border border-[var(--color-levl-panel-border)] p-2 rounded-lg text-[10px] sm:text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-30 shadow-2xl">
                            {row.tooltip}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* LEVL DeepCell Value */}
                  <td className={cn(
                    "py-3 sm:py-4 px-1 text-center align-middle bg-[var(--color-levl-cyan)]/10 border-x border-[var(--color-levl-cyan)]/25",
                    i === comparisonTable.rows.length - 1 && "rounded-b-xl border-b border-[var(--color-levl-cyan)]/40"
                  )}>
                    {renderValue(row.levl)}
                  </td>

                  {/* Generic Melatonin */}
                  <td className="py-3 sm:py-4 px-1 text-center align-middle">
                    {renderValue(row.generic)}
                  </td>

                  {/* Sleeping Pills */}
                  <td className="py-3 sm:py-4 px-1 text-center align-middle">
                    {renderValue(row.single)}
                  </td>

                  {/* DIY Stack */}
                  <td className="py-3 sm:py-4 px-1 text-center align-middle">
                    {renderValue(row.diy)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
