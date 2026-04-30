"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productContent } from '../../content/productLongevity';
import { ShopifyProduct } from '../../types/shopify';
import Image from 'next/image';

interface StickyDesktopHeaderProps {
  product?: ShopifyProduct;
  onAddToCart: () => void;
}

export function StickyDesktopHeader({ product, onAddToCart }: StickyDesktopHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past the hero (approx 800px)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-levl-bg)]/90 backdrop-blur-md border-b border-[var(--color-levl-panel-border)] shadow-xl hidden md:block"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Left side: Logo & Title */}
            <div className="flex items-center gap-6">
              <div className="relative w-[80px] h-[24px] flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Image src="/images/levl_logo.png" alt="LEVL" fill className="object-contain object-left" />
              </div>
              <div className="h-6 w-px bg-white/20" />
              <span className="text-white font-semibold text-sm">
                {product?.title || productContent.name}
              </span>
            </div>
            
            {/* Right side: Price & Button */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[var(--color-levl-cyan)] font-bold leading-tight">
                  $117.00
                </span>
                <span className="text-[10px] text-[var(--color-levl-text-muted)] uppercase tracking-wider">
                  90-Day Supply
                </span>
              </div>
              <button
                onClick={onAddToCart}
                className="bg-[var(--color-levl-cyan)] text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-levl-cyan)]/90 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              >
                Add to Protocol
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
