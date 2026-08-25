"use client";

import React from 'react';
import { Star } from 'lucide-react';

interface JudgeMeStarBadgeProps {
  productId?: string;
  className?: string;
  totalReviews?: number;
  rating?: number;
}

export function JudgeMeStarBadge({
  className = "",
  totalReviews = 5,
  rating = 5.0
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
      className={`cursor-pointer inline-flex items-center gap-2 transition-all hover:opacity-90 group ${className}`}
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
      <span className="text-[var(--color-levl-text-secondary)] text-xs font-medium">
        ({totalReviews} Reviews)
      </span>
      <span className="text-gray-500 text-xs">•</span>
      <span className="text-[11px] font-semibold text-[var(--color-levl-cyan)]">
        100% Verified
      </span>
    </button>
  );
}
