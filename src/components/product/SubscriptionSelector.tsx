"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../cart/CheckoutButton';
import { motion } from 'framer-motion';

export type PlanType = 'subscribe-30' | 'subscribe-90' | 'one-time';

interface SubscriptionSelectorProps {
  selectedPlan: PlanType;
  onChange: (plan: PlanType) => void;
}

export function SubscriptionSelector({ selectedPlan, onChange }: SubscriptionSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* 90 Day Subscribe */}
      <button
        onClick={() => onChange('subscribe-90')}
        className={cn(
          "relative flex flex-col p-4 rounded-xl border-2 text-left transition-all",
          selectedPlan === 'subscribe-90'
            ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10"
            : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600"
        )}
      >
        <div className="flex justify-between items-center w-full mb-1">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
              selectedPlan === 'subscribe-90' ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]" : "border-gray-500"
            )}>
              {selectedPlan === 'subscribe-90' && <Check className="w-3 h-3 text-black" />}
            </div>
            <span className="font-semibold text-white">Subscribe & Save (90-Day)</span>
          </div>
          <span className="text-xs font-bold uppercase bg-[var(--color-levl-cyan)] text-black px-2 py-1 rounded">Best Value</span>
        </div>
        <p className="text-sm text-[var(--color-levl-text-secondary)] ml-7">Delivery every 90 days. $39 per bottle.</p>
      </button>

      {/* 30 Day Subscribe */}
      <button
        onClick={() => onChange('subscribe-30')}
        className={cn(
          "relative flex flex-col p-4 rounded-xl border-2 text-left transition-all",
          selectedPlan === 'subscribe-30'
            ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10"
            : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            selectedPlan === 'subscribe-30' ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]" : "border-gray-500"
          )}>
            {selectedPlan === 'subscribe-30' && <Check className="w-3 h-3 text-black" />}
          </div>
          <span className="font-semibold text-white">Subscribe & Save (30-Day)</span>
        </div>
        <p className="text-sm text-[var(--color-levl-text-secondary)] ml-7">Delivery every 30 days. $43 per bottle.</p>
      </button>

      {/* One Time */}
      <button
        onClick={() => onChange('one-time')}
        className={cn(
          "relative flex flex-col p-4 rounded-xl border-2 text-left transition-all",
          selectedPlan === 'one-time'
            ? "border-white bg-white/5"
            : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600"
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            selectedPlan === 'one-time' ? "border-white bg-white" : "border-gray-500"
          )}>
            {selectedPlan === 'one-time' && <Check className="w-3 h-3 text-black" />}
          </div>
          <span className="font-semibold text-white">One-Time Purchase</span>
        </div>
      </button>
    </div>
  );
}
