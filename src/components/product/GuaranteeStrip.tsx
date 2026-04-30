"use client";

import React from 'react';
import { ShieldCheck, Calendar, Truck, RefreshCcw } from 'lucide-react';
import { productContent } from '../../content/productLongevity';

export function GuaranteeStrip() {
  const icons = [ShieldCheck, Calendar, Truck, RefreshCcw];

  return (
    <div className="bg-[var(--color-levl-panel)] border-y border-[var(--color-levl-panel-border)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {productContent.purchaseOptions.trustRow.map((trustItem, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[var(--color-levl-cyan)]" />
                </div>
                <span className="text-sm font-medium text-[var(--color-levl-text-secondary)]">
                  {trustItem}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
