"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { productContent } from '../../content/productLongevity';
import { cn } from '../cart/CheckoutButton';
import Image from 'next/image';

const imageMap: Record<string, string> = {
  "20s": "/images/benefits/lifestyle_20s.png",
  "30s": "/images/benefits/lifestyle_30s.png",
  "40s": "/images/benefits/lifestyle_40s.png",
  "50s": "/images/benefits/lifestyle_50s.png",
  "60s": "/images/benefits/lifestyle_60s.png",
};

export function BenefitsAtEveryAge() {
  const data = productContent.benefitsByAge;
  // Default to index 2 (In your 40s)
  const defaultIndex = data ? Math.max(0, data.findIndex(d => d.id === '40s')) : 0;
  const [[activeTab, direction], setActiveTabAndDirection] = useState<[number, number]>([defaultIndex >= 0 ? defaultIndex : 2, 0]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!data || data.length === 0) return null;

  const activeContent = data[activeTab];

  const setTab = (newIndex: number) => {
    if (newIndex === activeTab) return;
    setActiveTabAndDirection([newIndex, newIndex > activeTab ? 1 : -1]);
  };

  const paginate = (newDirection: number) => {
    const nextIndex = activeTab + newDirection;
    if (nextIndex >= 0 && nextIndex < data.length) {
      setActiveTabAndDirection([nextIndex, newDirection]);
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45; // swipe left -> next decade
    const isRightSwipe = distance < -45; // swipe right -> previous decade

    if (isLeftSwipe && activeTab < data.length - 1) {
      paginate(1);
    } else if (isRightSwipe && activeTab > 0) {
      paginate(-1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: 'blur(6px)',
    }),
  };

  return (
    <section className="pt-12 pb-24 border-y border-[var(--color-levl-panel-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefits at Every Age</h2>
          <p className="text-base sm:text-lg text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto">
            Your body's repair mechanisms change as you age. DeepCell is formulated to meet you where you are, optimizing sleep and cellular repair through every decade.
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center mb-12">
          <div className="flex bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-full p-1 shadow-lg">
            {data.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(index)}
                className={cn(
                  "relative px-8 py-3 text-sm font-semibold rounded-full transition-colors cursor-pointer",
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

        {/* Mobile Tabs & Swipe Controls */}
        <div className="flex flex-col md:hidden w-full mb-6">
          <div className="flex items-center justify-between gap-1.5 w-full">
            <button
              type="button"
              disabled={activeTab === 0}
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer shrink-0"
              aria-label="Previous decade"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex flex-1 gap-1.5 justify-between">
              {data.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(index)}
                  className={cn(
                    "flex-1 py-2 px-1 text-xs font-bold rounded-full border transition-all text-center cursor-pointer",
                    activeTab === index 
                      ? "bg-white text-black border-white shadow-md scale-105" 
                      : "bg-[var(--color-levl-panel)] text-[var(--color-levl-text-secondary)] border-[var(--color-levl-panel-border)] hover:text-white"
                  )}
                >
                  {item.label.replace(/in your /i, '').trim()}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={activeTab === data.length - 1}
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer shrink-0"
              aria-label="Next decade"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[var(--color-levl-text-muted)] text-center mt-2.5">
            Swipe left or right to explore each decade
          </p>
        </div>

        {/* Content Area with Touch Gestures */}
        <div 
          className="relative min-h-[500px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full w-full"
            >
              
              {/* Card 1 - Hero Image & Content */}
              <div className="lg:col-span-7 bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl overflow-hidden relative shadow-2xl min-h-[450px] flex flex-col group select-none">
                <Image 
                  src={imageMap[activeContent.id] || "/images/longevity-art.jpg"}
                  alt={`${activeContent.label} biology`}
                  fill
                  className="object-cover transition-transform duration-[10s] group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80" />
                
                {/* Decade Tag - Top Left */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[var(--color-levl-cyan)]/30 bg-black/50 backdrop-blur-md text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-widest shadow-lg">
                    {activeContent.label}
                  </div>
                </div>

                <div className="relative z-10 px-6 md:px-8 pt-6 flex flex-col items-start mt-auto w-full pb-5 md:pb-6">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-xl max-w-2xl">
                    {activeContent.title}
                  </h3>
                  
                  <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 md:p-6 rounded-2xl shadow-2xl w-full max-w-2xl">
                    <p className="text-white/95 leading-relaxed text-sm sm:text-base md:text-lg">
                      {activeContent.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 & 3 - Problems and Solutions Stack */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Top Card - Problems */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col shadow-xl">
                  <h4 className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider mb-5">What's Happening in Your Body</h4>
                  <ul className="flex flex-col gap-4 sm:gap-5 mt-auto">
                    {activeContent.bodyChanges?.map((change: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                          <X className="w-3 h-3 text-white/40" strokeWidth={3} />
                        </div>
                        <span className="text-white/70 font-medium text-sm sm:text-base leading-snug">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card - Solutions */}
                <div className="bg-gradient-to-br from-[var(--color-levl-cyan)]/10 to-[var(--color-levl-magenta)]/5 border border-[var(--color-levl-cyan)]/20 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col relative overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-levl-cyan)]/20 via-transparent to-transparent opacity-50" />
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider mb-5 relative z-10">DeepCell Longevity Benefits</h4>
                  <ul className="flex flex-col gap-4 sm:gap-5 mt-auto relative z-10">
                    {activeContent.levlBenefits?.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <div className="w-5 h-5 rounded-full bg-[var(--color-levl-cyan)]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[var(--color-levl-cyan)]/40 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                          <Check className="w-3 h-3 text-[var(--color-levl-cyan)]" strokeWidth={3} />
                        </div>
                        <span className="text-white font-medium text-sm sm:text-base leading-snug">{benefit}</span>
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
