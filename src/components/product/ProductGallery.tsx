"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Moon } from 'lucide-react';
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
                className="absolute bottom-[10%] right-[6%] z-20"
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
                className="absolute top-[8%] left-[4%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-green)]/50 transition-colors">
                    <Moon className="w-3.5 h-3.5 text-[var(--color-levl-green)]" />
                    Nighttime Autophagy
                </div>
              </motion.div>
            </>
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
