"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Beaker } from 'lucide-react';
import { productContent } from '../../content/productLongevity';

export function IngredientAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Clinical Dosing</h2>
        <p className="text-lg text-[var(--color-levl-text-secondary)]">
          No proprietary blends. We use forms and doses backed by longevity research.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {productContent.ingredients.map((ingredient, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={i} 
              className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0">
                    <Beaker className="w-5 h-5 text-[var(--color-levl-green)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{ingredient.name}</h3>
                    <p className="text-sm text-[var(--color-levl-text-secondary)]">{ingredient.function}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="hidden sm:block font-medium text-white">{ingredient.dose}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 ml-14">
                      <div className="pt-4 border-t border-[var(--color-levl-panel-border)] flex flex-col gap-4">
                        <div className="sm:hidden font-medium text-white mb-2">Dose: {ingredient.dose}</div>
                        <p className="text-[var(--color-levl-text-secondary)] leading-relaxed">
                          <strong className="text-white">Why it matters: </strong>
                          {ingredient.whyItMatters}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs uppercase tracking-wider font-bold text-[var(--color-levl-text-muted)]">Evidence:</span>
                          <span className="text-xs font-medium px-2 py-1 rounded bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)]">
                            {ingredient.evidenceTag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
