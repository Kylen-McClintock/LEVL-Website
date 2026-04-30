"use client";

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../cart/CheckoutButton';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (q: number) => void;
  className?: string;
}

export function QuantitySelector({ quantity, onChange, className }: QuantitySelectorProps) {
  const handleDec = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const handleInc = () => {
    if (quantity < 10) onChange(quantity + 1);
  };

  return (
    <div className={cn("flex items-center justify-between border border-[var(--color-levl-panel-border)] rounded-full px-4 py-2 bg-[#060913]", className)}>
      <button
        onClick={handleDec}
        disabled={quantity <= 1}
        className="p-1 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-semibold text-white w-8 text-center">{quantity}</span>
      <button
        onClick={handleInc}
        disabled={quantity >= 10}
        className="p-1 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
