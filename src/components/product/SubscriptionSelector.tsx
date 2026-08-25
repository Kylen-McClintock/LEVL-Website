"use client";

import React from 'react';
import { Check, Sparkles, Truck } from 'lucide-react';
import { cn } from '../cart/CheckoutButton';
import { motion } from 'framer-motion';

export type PlanType = 'subscribe-90' | 'subscribe-30' | 'onetime-90' | 'onetime-30';

interface SubscriptionSelectorProps {
  selectedPlan: PlanType;
  onChange: (plan: PlanType) => void;
}

export function SubscriptionSelector({ selectedPlan, onChange }: SubscriptionSelectorProps) {
  const isSubscription = selectedPlan.startsWith('subscribe');
  const supply = selectedPlan.endsWith('90') ? '90' : '30';

  const handleModeChange = (mode: 'subscribe' | 'onetime') => {
    if (mode === 'subscribe') {
      onChange(supply === '90' ? 'subscribe-90' : 'subscribe-30');
    } else {
      onChange(supply === '90' ? 'onetime-90' : 'onetime-30');
    }
  };

  const handleSupplyChange = (newSupply: '90' | '30') => {
    if (isSubscription) {
      onChange(newSupply === '90' ? 'subscribe-90' : 'subscribe-30');
    } else {
      onChange(newSupply === '90' ? 'onetime-90' : 'onetime-30');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tier 1: Top Purchase Frequency Toggle */}
      <div className="grid grid-cols-2 p-1 bg-black/40 rounded-xl border border-white/10 relative">
        <button
          type="button"
          onClick={() => handleModeChange('subscribe')}
          className={cn(
            "relative py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5",
            isSubscription
              ? "bg-[var(--color-levl-cyan)] text-black shadow-lg shadow-[var(--color-levl-cyan)]/25"
              : "text-gray-300 hover:text-white"
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Subscribe & Save</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('onetime')}
          className={cn(
            "relative py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5",
            !isSubscription
              ? "bg-white text-black shadow-lg"
              : "text-gray-400 hover:text-white"
          )}
        >
          <span>One-Time Order</span>
        </button>
      </div>

      {/* Tier 2: Supply Selection Cards */}
      <div className="flex flex-col gap-3">
        {/* 90-Day (3 Bottles) Card */}
        <button
          type="button"
          onClick={() => handleSupplyChange('90')}
          className={cn(
            "relative flex flex-col p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
            supply === '90'
              ? isSubscription 
                ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                : "border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600"
          )}
        >
          <div className="flex justify-between items-start w-full mb-1.5">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                supply === '90'
                  ? isSubscription
                    ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]"
                    : "border-white bg-white"
                  : "border-gray-500"
              )}>
                {supply === '90' && <Check className="w-3 h-3 text-black" />}
              </div>
              <div>
                <span className="font-bold text-white text-sm">3-Month Protocol</span>
                <span className="text-xs text-[var(--color-levl-text-secondary)] ml-1.5">(3 Bottles)</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="text-xs line-through text-[var(--color-levl-text-muted)]">$147</span>
                <span className={cn(
                  "font-bold text-base",
                  isSubscription ? "text-[var(--color-levl-cyan)]" : "text-white"
                )}>
                  {isSubscription ? "$117" : "$129"}
                </span>
              </div>
              <span className="text-[10px] text-[var(--color-levl-text-muted)] font-mono">
                {isSubscription ? "$39 / bottle" : "$43 / bottle"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between ml-7 pt-1 border-t border-white/5 text-xs text-[var(--color-levl-text-secondary)]">
            <span className="text-[11px] text-[var(--color-levl-cyan)] flex items-center gap-1 font-medium">
              <Truck className="w-3 h-3" /> Free US Shipping
            </span>
            <span className="text-[11px] text-gray-400">
              {isSubscription ? "Delivered every 90 days" : "Single 3-month delivery"}
            </span>
          </div>
        </button>

        {/* 30-Day (1 Bottle) Card */}
        <button
          type="button"
          onClick={() => handleSupplyChange('30')}
          className={cn(
            "relative flex flex-col p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer",
            supply === '30'
              ? isSubscription 
                ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                : "border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600"
          )}
        >
          <div className="flex justify-between items-start w-full mb-1.5">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                supply === '30'
                  ? isSubscription
                    ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]"
                    : "border-white bg-white"
                  : "border-gray-500"
              )}>
                {supply === '30' && <Check className="w-3 h-3 text-black" />}
              </div>
              <div>
                <span className="font-bold text-white text-sm">1-Month Supply</span>
                <span className="text-xs text-[var(--color-levl-text-secondary)] ml-1.5">(1 Bottle)</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                {isSubscription && <span className="text-xs line-through text-[var(--color-levl-text-muted)]">$49</span>}
                <span className={cn(
                  "font-bold text-base",
                  isSubscription ? "text-[var(--color-levl-cyan)]" : "text-white"
                )}>
                  {isSubscription ? "$43" : "$49"}
                </span>
              </div>
              <span className="text-[10px] text-[var(--color-levl-text-muted)] font-mono">
                {isSubscription ? "$43 / bottle" : "$49 / bottle"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between ml-7 pt-1 border-t border-white/5 text-xs text-[var(--color-levl-text-secondary)]">
            {isSubscription ? (
              <span className="text-[11px] text-[var(--color-levl-cyan)] flex items-center gap-1 font-medium">
                <Truck className="w-3 h-3" /> Free US Shipping
              </span>
            ) : (
              <span className="text-[11px] text-gray-400">
                Shipping calculated at checkout
              </span>
            )}
            <span className="text-[11px] text-gray-400">
              {isSubscription ? "Delivered monthly" : "Single bottle delivery"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
