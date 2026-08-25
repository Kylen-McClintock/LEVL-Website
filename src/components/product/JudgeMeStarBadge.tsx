"use client";

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface JudgeMeStarBadgeProps {
  productId?: string;
  className?: string;
  totalReviews?: number;
  rating?: number;
  showShield?: boolean;
}

export function JudgeMeStarBadge({
  className = "",
  totalReviews = 5,
  rating = 5.0,
  showShield = true,
}: JudgeMeStarBadgeProps) {
  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToReviews}
      className={`cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 transition-all hover:opacity-90 group flex-wrap ${className}`}
      title="View all verified reviews"
    >
      <div className="flex items-center gap-0.5 text-[var(--color-levl-cyan)]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current text-[var(--color-levl-cyan)]" />
        ))}
      </div>
      <span className="font-bold text-white text-xs group-hover:text-[var(--color-levl-cyan)] transition-colors">
        {rating.toFixed(1)}
      </span>
      <span className="text-[var(--color-levl-text-secondary)] text-xs font-normal">
        ({totalReviews} Reviews)
      </span>
      {showShield && (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/25 px-1.5 py-0.5 rounded-full ml-0.5">
          <ShieldCheck className="w-3 h-3 text-[var(--color-levl-cyan)] stroke-[2.5]" />
          <span>Verified</span>
        </span>
      )}
    </button>
  );
}
