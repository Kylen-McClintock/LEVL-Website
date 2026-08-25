"use client";

import React, { useEffect } from 'react';
import { Star } from 'lucide-react';

interface JudgeMeStarBadgeProps {
  productId?: string;
  className?: string;
}

export function JudgeMeStarBadge({
  productId = "9030713999558",
  className = ""
}: JudgeMeStarBadgeProps) {
  const numericId = productId.includes('/') ? productId.split('/').pop() || productId : productId;

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).jdgm && typeof (window as any).jdgm.initialize === 'function') {
      try {
        (window as any).jdgm.initialize();
      } catch (e) {
        // ignore
      }
    }
  }, [numericId]);

  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={scrollToReviews}
      className={`cursor-pointer inline-flex items-center gap-1.5 transition-all hover:opacity-90 ${className}`}
      title="View all verified reviews"
    >
      {/* Judge.me native badge container */}
      <div
        className="jdgm-widget jdgm-preview-badge"
        data-id={numericId}
        data-template="manual-installation"
        data-auto-install="false"
      >
        {/* Sleek initial fallback while script hydrates */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-levl-cyan)]">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current text-[var(--color-levl-cyan)]" />
            ))}
          </div>
          <span className="font-bold text-white">5.0</span>
          <span className="text-[var(--color-levl-text-secondary)] font-normal">(5 Reviews)</span>
        </div>
      </div>
    </div>
  );
}
