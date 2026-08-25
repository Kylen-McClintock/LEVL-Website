"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';

interface JudgeMeReviewsProps {
  productId?: string;
  shopDomain?: string;
}

export function JudgeMeReviews({ 
  productId = "9030713999558", 
  shopDomain = "h1hk4t-v3.myshopify.com" 
}: JudgeMeReviewsProps) {

  // Clean numeric ID if GID is passed (e.g. gid://shopify/Product/9030713999558 -> 9030713999558)
  const numericId = productId.includes('/') ? productId.split('/').pop() || productId : productId;

  useEffect(() => {
    // Configure Judge.me settings globally on window
    if (typeof window !== 'undefined') {
      (window as any).jdgmSettings = {
        shop_domain: shopDomain,
        platform: 'shopify',
        auto_install: true
      };

      // Re-initialize widget if Judge.me is already loaded (e.g. after Next.js page transition)
      if ((window as any).jdgm && typeof (window as any).jdgm.initialize === 'function') {
        setTimeout(() => {
          try {
            (window as any).jdgm.initialize();
          } catch (err) {
            console.error("Judge.me initialize error:", err);
          }
        }, 150);
      }
    }
  }, [numericId, shopDomain]);

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
      {/* Load Judge.me Core Script */}
      <Script
        src="https://cdn.judge.me/shopify_v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).jdgm) {
            (window as any).jdgm.initialize?.();
          }
        }}
      />

      {/* Section Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Real Experiences & Community Feedback
        </h2>
        <p className="text-lg text-[var(--color-levl-text-secondary)]">
          Verified reviews from early clinical testers, trial participants, and customers.
        </p>
      </div>

      {/* Glassmorphism Card Container for Judge.me Review Widget */}
      <div className="bg-[linear-gradient(30deg,#15102aee,#281534cc)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-black/50">
        <div
          className="jdgm-widget jdgm-review-widget"
          data-id={numericId}
          data-auto-install="false"
        >
          {/* Fallback while script hydrates */}
          <div className="text-center py-8 text-[var(--color-levl-text-muted)] text-sm animate-pulse">
            Loading verified reviews...
          </div>
        </div>
      </div>
    </section>
  );
}
