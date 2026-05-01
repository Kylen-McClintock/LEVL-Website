"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Moon, ShieldCheck, Dna, SunMoon } from 'lucide-react';
import { SupplementFacts } from './SupplementFacts';
import { ValueProposition } from './ValueProposition';

interface ProductGalleryProps {
  images: { url: string; altText: string }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || !images.length) return null;

  // Clamp index to prevent out-of-bounds errors during Fast Refresh or when props change
  const safeIndex = currentIndex >= images.length ? 0 : currentIndex;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={images[safeIndex].url}
              alt={images[safeIndex].altText}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        
        {/* Floating Selling Points (Visible on main image) */}
        <AnimatePresence>
          {safeIndex === 0 && (
            <>
              {/* Chip 1: Mitochondrial Health */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -8, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-[15%] right-[5%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-magenta)]/50 transition-colors">
                    <Zap className="w-3.5 h-3.5 text-[var(--color-levl-magenta)]" />
                    Mitochondrial Health
                </div>
              </motion.div>

              {/* Chip 2: Cellular Renewal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 8, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.3, delay: 0.1 },
                  scale: { duration: 0.3, delay: 0.1 },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute bottom-[20%] left-[5%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-cyan)]/50 transition-colors">
                    <Activity className="w-3.5 h-3.5 text-[var(--color-levl-cyan)]" />
                    Cellular Renewal
                </div>
              </motion.div>

              {/* Chip 3: Nighttime Autophagy */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -6, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.3, delay: 0.2 },
                  scale: { duration: 0.3, delay: 0.2 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute top-[25%] left-[8%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-green)]/50 transition-colors">
                    <Moon className="w-3.5 h-3.5 text-[var(--color-levl-green)]" />
                    Nighttime Autophagy
                </div>
              </motion.div>
            </>
          )}

          {images[safeIndex].altText === '5 Core Biological Pathways' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10 flex flex-col pt-6 md:pt-10 px-4 md:px-8 pb-4 overflow-y-auto hide-scrollbar"
            >
              <div className="max-w-[85%] md:max-w-[70%]">
                <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2 tracking-tight">5 SYNERGISTIC PATHWAYS</h3>
                <p className="text-xs md:text-base text-white/80 mb-3 md:mb-6 leading-relaxed">
                  DeepCell's formulation combines five scientifically-designed pathways that work together to target all hallmarks of aging with unprecedented precision.
                </p>

                <div className="space-y-3 md:space-y-5">
                  <div className="flex gap-3 md:gap-4 items-center md:items-start">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-green)]/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                      <Moon className="w-4 h-4 md:w-6 md:h-6 text-[var(--color-levl-green)]" />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-bold text-white text-sm md:text-lg leading-tight mb-0.5 md:mb-1">Deep Sleep Architecture</h4>
                      <p className="text-[10px] md:text-sm text-white/60 leading-tight">Optimization of GABA and alpha brain waves</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4 items-center md:items-start">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-cyan)]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                      <Activity className="w-4 h-4 md:w-6 md:h-6 text-[var(--color-levl-cyan)]" />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-bold text-white text-sm md:text-lg leading-tight mb-0.5 md:mb-1">Overnight Cellular Tuneup</h4>
                      <p className="text-[10px] md:text-sm text-white/60 leading-tight">Nocturnal autophagy & glymphatic clearance</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4 items-center md:items-start">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-magenta)]/20 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
                      <ShieldCheck className="w-4 h-4 md:w-6 md:h-6 text-[var(--color-levl-magenta)]" />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-bold text-white text-sm md:text-lg leading-tight mb-0.5 md:mb-1">Neuroprotection & Mood</h4>
                      <p className="text-[10px] md:text-sm text-white/60 leading-tight">Inflammatory modulation & stress resilience</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4 items-center md:items-start">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-cyan)]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                      <Dna className="w-4 h-4 md:w-6 md:h-6 text-[var(--color-levl-cyan)]" />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-bold text-white text-sm md:text-lg leading-tight mb-0.5 md:mb-1">Nightly Cellular Rejuvenation</h4>
                      <p className="text-[10px] md:text-sm text-white/60 leading-tight">Genomic stability & mitochondrial ATP</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4 items-center md:items-start">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-magenta)]/20 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
                      <SunMoon className="w-4 h-4 md:w-6 md:h-6 text-[var(--color-levl-magenta)]" />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="font-bold text-white text-sm md:text-lg leading-tight mb-0.5 md:mb-1">Natural Melatonin Support</h4>
                      <p className="text-[10px] md:text-sm text-white/60 leading-tight">Providing precursors for serotonin & melatonin</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {images[safeIndex].altText === 'Supplement Facts' && (
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
             >
               <SupplementFacts />
             </motion.div>
          )}

          {images[safeIndex].altText === 'Value Proposition' && (
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
             >
               <ValueProposition />
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start ${
              safeIndex === index
                ? 'border-[var(--color-levl-cyan)]'
                : 'border-transparent hover:border-[var(--color-levl-panel-border)]'
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
