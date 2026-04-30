"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { productContent } from '../../content/productLongevity';

export function ReviewCards() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        // On mobile it's 85vw, on desktop 600px.
        const isMobile = window.innerWidth < 768;
        const scrollAmount = isMobile ? window.innerWidth * 0.85 + 24 : 600 + 24;
        
        // If we are near the end, reset to start
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pb-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built With Real World Feedback</h2>
        <p className="text-lg text-[var(--color-levl-text-secondary)] mb-12">We test until the data says it works.</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">96%</span>
            <span className="text-sm font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider">Improved Sleep Score</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">89%</span>
            <span className="text-sm font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider">Fell Asleep Faster</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">87%</span>
            <span className="text-sm font-bold text-[var(--color-levl-cyan)] uppercase tracking-wider">Increased Next Day Energy</span>
          </div>
        </div>
      </div>

      <div 
        className="relative -mx-4 sm:mx-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
            // Optional: resume after a delay or just keep paused while interacting
            setTimeout(() => setIsPaused(false), 2000);
        }}
      >
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-8 w-12 md:w-32 bg-gradient-to-r from-[var(--color-levl-bg)] to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-8 w-12 md:w-32 bg-gradient-to-l from-[var(--color-levl-bg)] to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 sm:px-0 snap-x snap-mandatory hide-scrollbar"
        >
          {productContent.reviews.map((review, i) => (
            <div 
              key={i} 
              className="snap-center shrink-0 w-[85vw] md:w-[600px] bg-[linear-gradient(30deg,#742D6Be6,#E37C6033)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-8 flex flex-col h-full hover:border-[var(--color-levl-cyan)]/50 transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] relative z-0 overflow-hidden"
            >
              <div className="flex items-center gap-1 text-[var(--color-levl-cyan)] mb-6">
                {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-white text-lg leading-relaxed flex-1 mb-8 font-medium">
                "{review.quote}"
              </p>
              <div>
                <p className="text-white font-semibold">{review.name}</p>
                <p className="text-sm text-[var(--color-levl-text-muted)]">{review.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
