"use client";

import React from 'react';
import { productContent } from '../../content/productLongevity';
import { Zap, Activity, ShieldCheck, Brain, Moon, Leaf } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-6 h-6 text-[var(--color-levl-cyan)]" />,
  activity: <Activity className="w-6 h-6 text-[var(--color-levl-cyan)]" />,
  "shield-check": <ShieldCheck className="w-6 h-6 text-[var(--color-levl-cyan)]" />,
  brain: <Brain className="w-6 h-6 text-[var(--color-levl-cyan)]" />,
  moon: <Moon className="w-6 h-6 text-[var(--color-levl-cyan)]" />,
  leaf: <Leaf className="w-6 h-6 text-[var(--color-levl-cyan)]" />
};

export function BenefitGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[var(--color-levl-panel-border)]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Protocol Coverage</h2>
        <p className="text-lg text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto">
          LIFESPAN+ provides a full-spectrum foundation, addressing the most critical pathways for optimal daily performance and long-term healthspan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productContent.benefits.map((benefit, i) => (
          <div 
            key={i}
            className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-2xl p-8 hover:bg-white/[0.02] transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-levl-cyan)]/10 flex items-center justify-center mb-6">
              {iconMap[benefit.icon] || <Activity className="w-6 h-6 text-[var(--color-levl-cyan)]" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
