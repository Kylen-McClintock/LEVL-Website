"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

function CountUp({ end, suffix = "", decimals = 0, duration = 2 }: { end: number, suffix?: string, decimals?: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setCount(ease * end);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <div className="bg-[linear-gradient(30deg,#301844e6,#5D265E33)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-lg mt-8">
      
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 pt-4 md:pt-0 first:pt-0">
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">
          <CountUp end={258} />
        </h3>
        <p className="text-[10px] md:text-xs font-bold text-[var(--color-levl-text-muted)] tracking-widest uppercase text-center">DeepCell Testers</p>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/3 pt-6 md:pt-0">
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">
          <CountUp end={8.4} decimals={1} />
        </h3>
        <p className="text-[10px] md:text-xs font-bold text-[var(--color-levl-text-muted)] tracking-widest uppercase text-center">Avg Next Day Feel</p>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/3 pt-6 md:pt-0">
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">
          <CountUp end={92} suffix="%" />
        </h3>
        <p className="text-[10px] md:text-xs font-bold text-[var(--color-levl-text-muted)] tracking-widest uppercase text-center">Would Recommend</p>
      </div>

    </div>
  );
}
