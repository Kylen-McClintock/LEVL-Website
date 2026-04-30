"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const ingredients = [
  { name: 'Luteolin', dose: '50 mg', price: 25 },
  { name: 'Apigenin', dose: '50 mg', price: 20 },
  { name: 'Magnesium Glycinate', dose: '70 mg', price: 18 },
  { name: 'Astragalus Root Extract', dose: '300 mg', price: 16 },
  { name: 'Lithium Orotate', dose: '50 mg', price: 15 },
  { name: 'L-Tryptophan', dose: '100 mg', price: 15 },
  { name: 'Valerian Root Extract', dose: '300 mg', price: 14 },
  { name: 'L-Theanine', dose: '200 mg', price: 14 },
  { name: 'Lemon Balm Extract', dose: '250 mg', price: 12 },
  { name: 'Passion Flower Extract', dose: '100 mg', price: 12 },
  { name: 'Hops Extract', dose: '100 mg', price: 12 },
  { name: 'Zinc Citrate', dose: '8.0 mg', price: 12 },
  { name: 'Vitamin B6', dose: '5.0 mg', price: 10 },
];

export function ValueProposition() {
  const totalValue = ingredients.reduce((sum, item) => sum + item.price, 0);
  const levlPrice = 39;
  const percentSavings = 80;

  return (
    <div className="absolute inset-0 z-20 bg-[var(--color-levl-bg)] flex flex-col items-center justify-center p-3 md:p-6">
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-4 md:mb-5">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl font-black text-white tracking-tighter mb-1 md:mb-2 leading-tight"
          >
            INCREDIBLE VALUE: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-levl-magenta)] to-[var(--color-levl-cyan)]">
              SAVE {percentSavings}%
            </span>
          </motion.h2>
          <p className="text-[var(--color-levl-text-secondary)] text-sm md:text-base leading-tight">
            VS INDIVIDUAL SUPPLEMENTS
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
        >
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 md:gap-y-2 mb-4 md:mb-5">
              {ingredients.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <div className="flex flex-col">
                    <span className="text-white/90 text-[11px] md:text-xs font-medium leading-tight">{item.name}</span>
                    <span className="text-white/40 text-[9px] md:text-[10px] leading-tight">{item.dose}</span>
                  </div>
                  <span className="text-white/60 font-mono text-xs tracking-tight">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="bg-black/40 rounded-xl p-3 md:p-4 border border-white/10 mb-3 md:mb-4">
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-levl-text-secondary)] text-xs md:text-sm">Total Separately</span>
                <span className="text-[var(--color-levl-text-secondary)] line-through decoration-red-500/50 decoration-2 font-mono">${totalValue} USD</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[var(--color-levl-magenta)]/20 to-[var(--color-levl-cyan)]/20 rounded-xl p-3 md:p-4 border border-[var(--color-levl-magenta)]/30">
              <div className="flex justify-between items-center gap-2">
                <span className="text-white font-bold text-sm md:text-base leading-tight">DeepCell Subscription</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-levl-magenta)] to-[var(--color-levl-cyan)] font-black text-2xl tracking-tighter">
                  ${levlPrice}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
