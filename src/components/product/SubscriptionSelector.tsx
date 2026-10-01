"use client";

import React from 'react';
import { Check, Sparkles, Truck } from 'lucide-react';
import { cn } from '../cart/CheckoutButton';
import { motion, AnimatePresence } from 'framer-motion';

export type PlanType = 'subscribe-90' | 'subscribe-30' | 'onetime-90' | 'onetime-30';

interface SubscriptionSelectorProps {
  selectedPlan: PlanType;
  onChange: (plan: PlanType) => void;
}

export function SubscriptionSelector({ selectedPlan, onChange }: SubscriptionSelectorProps) {
  const isSubscription = selectedPlan.startsWith('subscribe');
  const activeSupply = selectedPlan.endsWith('90') ? '90' : '30';

  const handleSupplySelect = (supply: '90' | '30') => {
    if (supply === '90') {
      onChange(isSubscription ? 'subscribe-90' : 'onetime-90');
    } else {
      onChange(isSubscription ? 'subscribe-30' : 'onetime-30');
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* ========================================================= */}
      {/* SUPPLY CARD 1 (DEFAULT / RECOMMENDED): 3-MONTH PROTOCOL  */}
      {/* ========================================================= */}
      <div
        onClick={() => handleSupplySelect('90')}
        className={cn(
          "relative flex flex-col rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer",
          activeSupply === '90'
            ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 shadow-[0_0_30px_rgba(34,197,94,0.18)]"
            : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600 opacity-80 hover:opacity-100"
        )}
      >
        {/* Card Header */}
        <div className="p-4 flex justify-between items-start gap-2">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              activeSupply === '90' ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]" : "border-gray-500"
            )}>
              {activeSupply === '90' && <Check className="w-3 h-3 text-black" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-base tracking-tight">3-Month Protocol</span>
                <span className="text-xs text-[var(--color-levl-text-secondary)] font-medium">(3 Bottles)</span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-[var(--color-levl-cyan)] to-emerald-400 text-black px-2.5 py-0.5 rounded-full shadow-sm">
                  Best Value
                </span>
              </div>
              <p className="text-xs text-[var(--color-levl-cyan)]/90 mt-1 font-medium">
                The biological window for cellular renewal.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-baseline gap-1">
              <span className={cn(
                "font-black text-xl sm:text-2xl tracking-tight",
                activeSupply === '90' && isSubscription ? "text-[var(--color-levl-cyan)]" : "text-white"
              )}>
                {activeSupply === '90' && !isSubscription ? "$49" : "$44"}
              </span>
              <span className="text-xs font-semibold text-[var(--color-levl-text-secondary)]">/ bottle</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] line-through text-[var(--color-levl-text-muted)]">$59</span>
              <span className="text-[11px] text-[var(--color-levl-text-muted)] font-medium">
                {activeSupply === '90' && !isSubscription ? "($147 total)" : "($132 total)"}
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Delivery & Billing Options (Visible when 3-Month is active) */}
        <AnimatePresence>
          {activeSupply === '90' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4 pt-2 border-t border-white/10 bg-black/25 flex flex-col gap-2"
            >
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Select Delivery & Billing:
              </span>

              {/* Option A: Subscribe & Save */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('subscribe-90');
                }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  isSubscription
                    ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/15 shadow-sm"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="billing-90"
                    checked={isSubscription}
                    onChange={() => onChange('subscribe-90')}
                    className="accent-[var(--color-levl-cyan)] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                      <Sparkles className="w-3 h-3 text-[var(--color-levl-cyan)]" />
                      <span>Subscribe & Save:</span>
                      <span className="text-[var(--color-levl-cyan)] font-extrabold">$44 / bottle</span>
                      <span className="text-gray-400 font-normal">($132 total)</span>
                    </span>
                    <span className="text-[11px] text-[var(--color-levl-cyan)] flex items-center gap-1 font-medium mt-0.5">
                      <Truck className="w-3 h-3" /> Free US Shipping • Deliver every 90 days
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-gradient-to-r from-[var(--color-levl-cyan)]/25 to-emerald-500/25 text-[var(--color-levl-cyan)] px-2.5 py-0.5 rounded font-bold border border-[var(--color-levl-cyan)]/40 shrink-0">
                  Best Value • Save 25%
                </span>
              </div>

              {/* Option B: One-Time Order */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('onetime-90');
                }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  !isSubscription
                    ? "border-white bg-white/15 shadow-sm"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="billing-90"
                    checked={!isSubscription}
                    onChange={() => onChange('onetime-90')}
                    className="accent-white w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                      <span>One-Time Order:</span>
                      <span className="font-extrabold text-white">$49 / bottle</span>
                      <span className="text-gray-400 font-normal">($147 total)</span>
                    </span>
                    <span className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                      <Truck className="w-3 h-3 text-[var(--color-levl-cyan)]" /> Free US Shipping • Single 3-month delivery
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded font-medium border border-white/15 shrink-0">
                  Save 17%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* SUPPLY CARD 2: 1-MONTH SUPPLY                             */}
      {/* ========================================================= */}
      <div
        onClick={() => handleSupplySelect('30')}
        className={cn(
          "relative flex flex-col rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer",
          activeSupply === '30'
            ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/10 shadow-[0_0_30px_rgba(34,197,94,0.18)]"
            : "border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] hover:border-gray-600 opacity-80 hover:opacity-100"
        )}
      >
        {/* Card Header */}
        <div className="p-4 flex justify-between items-start gap-2">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              activeSupply === '30' ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]" : "border-gray-500"
            )}>
              {activeSupply === '30' && <Check className="w-3 h-3 text-black" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-base tracking-tight">1-Month Supply</span>
                <span className="text-xs text-[var(--color-levl-text-secondary)] font-medium">(1 Bottle)</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                Establish your baseline.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-baseline gap-1">
              <span className={cn(
                "font-black text-xl sm:text-2xl tracking-tight",
                activeSupply === '30' && isSubscription ? "text-[var(--color-levl-cyan)]" : "text-white"
              )}>
                {activeSupply === '30' && isSubscription ? "$49" : "$59"}
              </span>
              <span className="text-xs font-semibold text-[var(--color-levl-text-secondary)]">/ bottle</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {activeSupply === '30' && isSubscription && (
                <span className="text-[11px] line-through text-[var(--color-levl-text-muted)]">$59</span>
              )}
              <span className="text-[11px] text-[var(--color-levl-text-muted)] font-medium">
                {activeSupply === '30' && isSubscription ? "($49 total)" : "($59 total)"}
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Delivery & Billing Options (Visible when 1-Month is active) */}
        <AnimatePresence>
          {activeSupply === '30' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 pb-4 pt-2 border-t border-white/10 bg-black/25 flex flex-col gap-2"
            >
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Select Delivery & Billing:
              </span>

              {/* Option A: Subscribe & Save */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('subscribe-30');
                }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  isSubscription
                    ? "border-[var(--color-levl-cyan)] bg-[var(--color-levl-cyan)]/15 shadow-sm"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="billing-30"
                    checked={isSubscription}
                    onChange={() => onChange('subscribe-30')}
                    className="accent-[var(--color-levl-cyan)] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                      <Sparkles className="w-3 h-3 text-[var(--color-levl-cyan)]" />
                      <span>Subscribe & Save:</span>
                      <span className="text-[var(--color-levl-cyan)] font-extrabold">$49 / bottle</span>
                      <span className="text-gray-400 font-normal">($49 total)</span>
                    </span>
                    <span className="text-[11px] text-[var(--color-levl-cyan)] flex items-center gap-1 font-medium mt-0.5">
                      <Truck className="w-3 h-3" /> Free US Shipping • Deliver monthly
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] px-2 py-0.5 rounded font-bold border border-[var(--color-levl-cyan)]/30 shrink-0">
                  Save 17%
                </span>
              </div>

              {/* Option B: One-Time Order */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('onetime-30');
                }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  !isSubscription
                    ? "border-white bg-white/15 shadow-sm"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="billing-30"
                    checked={!isSubscription}
                    onChange={() => onChange('onetime-30')}
                    className="accent-white w-4 h-4 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
                      <span>One-Time Order:</span>
                      <span className="font-extrabold text-white">$59 / bottle</span>
                      <span className="text-gray-400 font-normal">($59 total)</span>
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      Shipping calculated at checkout • Single bottle delivery
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
