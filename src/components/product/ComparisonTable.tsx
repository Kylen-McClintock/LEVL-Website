"use client";

import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { productContent } from '../../content/productLongevity';
import { cn } from '../cart/CheckoutButton';

export function ComparisonTable() {
  const { comparisonTable } = productContent;

  const renderValue = (val: string | boolean) => {
    if (val === true) return <Check className="w-5 h-5 mx-auto text-[var(--color-levl-cyan)]" />;
    if (val === false) return <Minus className="w-5 h-5 mx-auto text-[var(--color-levl-text-muted)] opacity-50" />;
    return <span className="text-sm text-[var(--color-levl-text-secondary)]">{val}</span>;
  };

  return (
    <section className="bg-[var(--color-levl-panel)] py-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Standard for Longevity</h2>
          <p className="text-lg text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto">
            See how LIFESPAN+ compares to traditional approaches.
          </p>
        </div>

        <div className="overflow-x-auto hide-scrollbar">
          <div className="min-w-[800px]">
            {/* Headers */}
            <div className="grid grid-cols-5 gap-4 mb-4 items-end">
              <div className="text-left font-semibold text-white px-4 pb-4 border-b border-[var(--color-levl-panel-border)]">
                {comparisonTable.headers[0]}
              </div>
              <div className="text-center px-4 pb-4 border-b-2 border-[var(--color-levl-cyan)] relative">
                <span className="text-[var(--color-levl-cyan)] font-bold">{comparisonTable.headers[1]}</span>
                <div className="absolute inset-x-0 bottom-0 top-[-20px] bg-[var(--color-levl-cyan)]/5 rounded-t-2xl -z-10 border-x border-t border-[var(--color-levl-cyan)]/20" />
              </div>
              <div className="text-center font-medium text-[var(--color-levl-text-secondary)] px-4 pb-4 border-b border-[var(--color-levl-panel-border)]">
                {comparisonTable.headers[2]}
              </div>
              <div className="text-center font-medium text-[var(--color-levl-text-secondary)] px-4 pb-4 border-b border-[var(--color-levl-panel-border)]">
                {comparisonTable.headers[3]}
              </div>
              <div className="text-center font-medium text-[var(--color-levl-text-secondary)] px-4 pb-4 border-b border-[var(--color-levl-panel-border)]">
                {comparisonTable.headers[4]}
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {comparisonTable.rows.map((row, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "grid grid-cols-5 gap-4 py-6 px-4 items-center transition-colors",
                    i !== comparisonTable.rows.length - 1 && "border-b border-white/5",
                    "hover:bg-white/[0.02]"
                  )}
                >
                  <div className="text-white font-medium pr-4">{row.feature}</div>
                  <div className="text-center relative">
                    {/* Background column highlight for LEVL */}
                    <div className="absolute inset-y-[-1.5rem] inset-x-0 bg-[var(--color-levl-cyan)]/5 border-x border-[var(--color-levl-cyan)]/20 -z-10" />
                    {renderValue(row.levl)}
                  </div>
                  <div className="text-center">{renderValue(row.generic)}</div>
                  <div className="text-center">{renderValue(row.single)}</div>
                  <div className="text-center">{renderValue(row.diy)}</div>
                </div>
              ))}
              
              {/* Bottom close out for LEVL highlight column */}
              <div className="grid grid-cols-5 gap-4">
                <div className="col-start-2 relative h-6">
                  <div className="absolute inset-0 bg-[var(--color-levl-cyan)]/5 rounded-b-2xl border-x border-b border-[var(--color-levl-cyan)]/20 -z-10" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
