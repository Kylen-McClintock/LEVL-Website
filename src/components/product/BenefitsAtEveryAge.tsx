"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { productContent } from '../../content/productLongevity';
import { cn } from '../cart/CheckoutButton';
import Image from 'next/image';

const imageMap: Record<string, string> = {
  "20s": "/images/nanobanana_20s_1777504569470.png",
  "30s": "/images/nanobanana_30s_1777504581530.png",
  "40s": "/images/nanobanana_40s_1777504591795.png",
  "50s": "/images/nanobanana_50s_1777504604054.png",
  "60s": "/images/nanobanana_60s_1777504619041.png",
};

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


// ... inside the component where the Content Area starts ...
        {/* Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full w-full"
            >
              
              {/* Card 1 - Hero Image & Content */}
              <div className="lg:col-span-7 bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl overflow-hidden relative shadow-2xl min-h-[400px] flex flex-col justify-end group">
                <Image 
                  src={imageMap[activeContent.id] || "/images/longevity-art.jpg"}
                  alt={`${activeContent.label} biology`}
                  fill
                  className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                
                <div className="relative z-10 p-8 md:p-10 flex flex-col items-start mt-auto">
                  <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 bg-black/40 backdrop-blur-md text-[var(--color-levl-cyan)] text-xs font-semibold uppercase tracking-widest mb-4">
                    {activeContent.label}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {activeContent.title}
                  </h3>
                  
                  <p className="text-[var(--color-levl-text-secondary)] leading-relaxed text-base md:text-lg max-w-2xl">
                    {activeContent.description}
                  </p>
                </div>
              </div>

              {/* Card 2 & 3 - Problems and Solutions Stack */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Top Card - Problems */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex-1 flex flex-col shadow-xl">
                  <h4 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-6">What's Happening in Your Body</h4>
                  <ul className="flex flex-col gap-5 mt-auto">
                    {activeContent.bodyChanges?.map((change: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                          <X className="w-3 h-3 text-white/40" strokeWidth={3} />
                        </div>
                        <span className="text-white/70 font-medium text-base leading-snug">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card - Solutions */}
                <div className="bg-gradient-to-br from-[var(--color-levl-cyan)]/10 to-[var(--color-levl-magenta)]/5 border border-[var(--color-levl-cyan)]/20 rounded-3xl p-8 flex-1 flex flex-col relative overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-levl-cyan)]/20 via-transparent to-transparent opacity-50" />
                  <h4 className="text-sm font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider mb-6 relative z-10">DeepCell Longevity Benefits</h4>
                  <ul className="flex flex-col gap-5 mt-auto relative z-10">
                    {activeContent.levlBenefits?.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-[var(--color-levl-cyan)]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[var(--color-levl-cyan)]/40 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                          <Check className="w-3 h-3 text-[var(--color-levl-cyan)]" strokeWidth={3} />
                        </div>
                        <span className="text-white font-medium text-base leading-snug">{benefit}</span>
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
