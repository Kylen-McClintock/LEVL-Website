"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { productContent } from '../../content/productLongevity';
import { cn } from '../cart/CheckoutButton';

export function BenefitsAtEveryAge() {
  const [activeTab, setActiveTab] = useState(0);
  const data = productContent.benefitsByAge;

  if (!data || data.length === 0) return null;

  const activeContent = data[activeTab];

  return (
    <section className="pt-12 pb-24 border-y border-[var(--color-levl-panel-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefits at Every Age</h2>
          <p className="text-lg text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto">
            Your body's repair mechanisms change as you age. DeepCell is formulated to meet you where you are, optimizing sleep and cellular repair through every decade.
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="flex bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-full p-1 shadow-lg">
            {data.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative px-8 py-3 text-sm font-semibold rounded-full transition-colors",
                  activeTab === index ? "text-black" : "text-[var(--color-levl-text-secondary)] hover:text-white"
                )}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex md:hidden w-full mb-8">
          <div className="flex w-full gap-2">
            {data.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "flex-1 py-2 px-1 text-xs sm:text-sm font-semibold rounded-full border transition-colors whitespace-nowrap text-center",
                  activeTab === index 
                    ? "bg-white text-black border-white" 
                    : "bg-[var(--color-levl-panel)] text-[var(--color-levl-text-secondary)] border-[var(--color-levl-panel-border)]"
                )}
              >
                {item.label.replace(/in your /i, '').trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-[linear-gradient(30deg,#AC4A69e6,#f79d6533)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 md:p-12 lg:p-16 flex flex-col h-full w-full"
            >
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left mb-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)] text-xs font-semibold uppercase tracking-widest mb-6">
                  {activeContent.label}
                </div>
                
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {activeContent.title}
                </h3>
                
                <p className="text-[var(--color-levl-text-secondary)] leading-relaxed text-lg max-w-3xl">
                  {activeContent.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-auto">
                
                {/* Left Column - Problems */}
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold text-white mb-6">What's Happening in Your Body:</h4>
                  <ul className="flex flex-col gap-6">
                    {activeContent.bodyChanges?.map((change: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 text-white/60" strokeWidth={3} />
                        </div>
                        <span className="text-[var(--color-levl-text-secondary)] font-medium text-lg leading-snug">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - Solutions */}
                <div className="bg-[var(--color-levl-cyan)]/5 border border-[var(--color-levl-cyan)]/20 rounded-2xl p-6 lg:p-8 flex flex-col relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-levl-cyan)]/10 to-[var(--color-levl-magenta)]/5 opacity-50" />
                  <h4 className="text-lg font-semibold text-white mb-6 relative z-10">DeepCell Longevity Benefits:</h4>
                  <ul className="flex flex-col gap-6 relative z-10">
                    {activeContent.levlBenefits?.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-levl-cyan)] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_var(--color-levl-cyan)]">
                          <Check className="w-3.5 h-3.5 text-[#0B0E17]" strokeWidth={3} />
                        </div>
                        <span className="text-white font-medium text-lg leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
