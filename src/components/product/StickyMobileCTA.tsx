"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productContent } from '../../content/productLongevity';
import { ShopifyProduct } from '../../types/shopify';

interface StickyMobileCTAProps {
  product?: ShopifyProduct;
  onAddToCart: () => void;
}

export function StickyMobileCTA({ product, onAddToCart }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past the hero (approx 600px)
      if (window.scrollY > 600) {
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
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-levl-panel)]/90 backdrop-blur-md border-t border-[var(--color-levl-panel-border)] p-4 md:hidden flex items-center justify-between shadow-2xl shadow-black"
        >
          <div className="flex flex-col">
            <span className="text-white font-semibold text-sm">
              {product?.title || productContent.name}
            </span>
            <span className="text-[var(--color-levl-cyan)] font-bold text-lg">
              From $102.00
            </span>
          </div>
          
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Optional: also trigger cart open or scroll directly to purchase box
            }}
            className="bg-[var(--color-levl-cyan)] text-black px-6 py-3 rounded-full font-semibold hover:bg-[var(--color-levl-cyan)]/90 transition-colors"
          >
            Buy Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
