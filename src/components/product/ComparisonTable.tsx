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
        <div className="w-5 h-5 md:w-6 md:h-6 mx-auto rounded-full bg-[var(--color-levl-cyan)]/20 border border-[var(--color-levl-cyan)] flex items-center justify-center">
          <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-[var(--color-levl-cyan)]" />
        </div>
      );
    }
    if (val === false) {
      return <Minus className="w-4 h-4 mx-auto text-[var(--color-levl-text-muted)] opacity-40" />;
    }
    return (
      <span className="text-[10px] md:text-xs font-medium text-[var(--color-levl-text-secondary)]">
        {val}
      </span>
    );
  };

  // Compact headers for mobile vs full headers for desktop
  const mobileHeaders = ["Feature", "DeepCell", "Melatonin", "Pills", "DIY"];

  return (
    <section className="py-16 md:py-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Standard for Longevity
          </h2>
          <p className="text-sm md:text-base text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto px-4">
            See how LEVL DeepCell compares to traditional and fragmented sleep approaches.
          </p>
        </div>

        {/* Table Container - Fits 100% without horizontal scrolling */}
        <div className="w-full bg-[var(--color-levl-panel)]/40 border border-[var(--color-levl-panel-border)] rounded-2xl p-2 sm:p-4 md:p-6 shadow-xl">
          {/* Headers */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] sm:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] md:grid-cols-5 gap-1 sm:gap-2 md:gap-4 mb-2 items-end">
            <div className="text-left font-semibold text-white text-[11px] sm:text-xs md:text-sm px-1.5 sm:px-3 pb-3 border-b border-[var(--color-levl-panel-border)]">
              Feature
            </div>
            
            {/* LEVL Highlight Header */}
            <div className="text-center px-1 sm:px-2 md:px-4 pb-3 border-b-2 border-[var(--color-levl-cyan)] relative bg-[var(--color-levl-cyan)]/10 rounded-t-xl">
              <span className="text-[var(--color-levl-cyan)] font-extrabold text-[11px] sm:text-xs md:text-sm block truncate">
                <span className="md:hidden">DeepCell</span>
                <span className="hidden md:inline">{comparisonTable.headers[1]}</span>
              </span>
            </div>

            {/* Competitor 1 */}
            <div className="text-center font-medium text-[var(--color-levl-text-secondary)] text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-3 border-b border-[var(--color-levl-panel-border)] truncate">
              <span className="md:hidden">Melatonin</span>
              <span className="hidden md:inline">{comparisonTable.headers[2]}</span>
            </div>

            {/* Competitor 2 */}
            <div className="text-center font-medium text-[var(--color-levl-text-secondary)] text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-3 border-b border-[var(--color-levl-panel-border)] truncate">
              <span className="md:hidden">Pills</span>
              <span className="hidden md:inline">{comparisonTable.headers[3]}</span>
            </div>

            {/* Competitor 3 */}
            <div className="text-center font-medium text-[var(--color-levl-text-secondary)] text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-3 border-b border-[var(--color-levl-panel-border)] truncate">
              <span className="md:hidden">DIY Stack</span>
              <span className="hidden md:inline">{comparisonTable.headers[4]}</span>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {comparisonTable.rows.map((row, i) => (
              <div 
                key={i} 
                className={cn(
                  "grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] sm:grid-cols-[1.8fr_1fr_1fr_1fr_1fr] md:grid-cols-5 gap-1 sm:gap-2 md:gap-4 py-3 sm:py-4 md:py-5 px-1 sm:px-3 items-center transition-colors",
                  i !== comparisonTable.rows.length - 1 && "border-b border-white/5",
                  "hover:bg-white/[0.02]"
                )}
              >
                {/* Feature Name */}
                <div className="text-white font-medium text-[11px] sm:text-xs md:text-sm pr-1 sm:pr-2 flex items-center gap-1 sm:gap-1.5 group relative cursor-default leading-tight">
                  <span className="truncate sm:whitespace-normal">{row.feature}</span>
                  {row.tooltip && (
                    <div className="relative shrink-0">
                      <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-levl-text-muted)] group-hover:text-[var(--color-levl-cyan)] transition-colors" />
                      <div className="absolute left-0 bottom-full mb-2 w-48 sm:w-60 bg-[#1A1D27] border border-[var(--color-levl-panel-border)] p-2.5 rounded-lg text-[10px] sm:text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-30 shadow-2xl">
                        {row.tooltip}
                        <div className="absolute top-full left-2 border-6 border-transparent border-t-[#1A1D27]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* LEVL Value */}
                <div className="text-center relative py-1 bg-[var(--color-levl-cyan)]/5 rounded-md">
                  {renderValue(row.levl)}
                </div>

                {/* Generic Melatonin */}
                <div className="text-center py-1">{renderValue(row.generic)}</div>

                {/* Sleeping Pills */}
                <div className="text-center py-1">{renderValue(row.single)}</div>

                {/* DIY Stack */}
                <div className="text-center py-1">{renderValue(row.diy)}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
