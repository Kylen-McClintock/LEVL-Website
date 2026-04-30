"use client";

import React, { useState } from 'react';
import { ShieldCheck, Calendar, Truck, RefreshCcw, Loader2 } from 'lucide-react';
import { SubscriptionSelector, PlanType } from './SubscriptionSelector';
import { QuantitySelector } from './QuantitySelector';
import { productContent } from '../../content/productLongevity';
import { ShopifyProduct } from '../../types/shopify';
import { addToCart } from '../../lib/shopify';
import { cn } from '../cart/CheckoutButton';

interface PurchaseBoxProps {
  product?: ShopifyProduct;
  onCartOpen: () => void;
  cartId: string | null;
}

export function PurchaseBox({ product, onCartOpen, cartId }: PurchaseBoxProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('subscribe-90');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Fallback for mock if product not passed
  const priceDisplay = selectedPlan === 'subscribe-90' ? '$117.00' : selectedPlan === 'subscribe-30' ? '$43.00' : '$49.00';
  const originalPrice = selectedPlan === 'subscribe-90' ? '$147.00' : selectedPlan === 'subscribe-30' ? '$49.00' : null;
  const perBottleText = selectedPlan === 'subscribe-90' ? ' ($39.00/bottle)' : '';

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      if (cartId) {
        // In real app, match the plan to the specific variant and selling plan ID
        // This is simplified for mock
        const merchandiseId = selectedPlan === 'subscribe-90' ? 'mock-variant-90' : 'mock-variant-30';
        const sellingPlanId = selectedPlan === 'subscribe-90' ? 'mock-plan-90' : selectedPlan === 'subscribe-30' ? 'mock-plan-30' : undefined;
        
        await addToCart(cartId, [{ merchandiseId, quantity, sellingPlanId }]);
      }
      onCartOpen();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(30deg,#1B1237e6,#451F5233)] backdrop-blur-md border border-[var(--color-levl-panel-border)] rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      {/* Price Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white tracking-wide">LIFESPAN+ DeepCell</h2>
        <div className="flex items-end gap-3 flex-wrap">
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-white">{priceDisplay}</span>
          {originalPrice && (
            <span className="text-lg text-[var(--color-levl-text-muted)] line-through mb-1">{originalPrice}</span>
          )}
        </div>
        {perBottleText && (
          <span className="text-sm font-medium text-[var(--color-levl-cyan)] mb-2">{perBottleText}</span>
        )}
      </div>
      </div>

      {/* Selectors */}
      <SubscriptionSelector selectedPlan={selectedPlan} onChange={setSelectedPlan} />
      
      <div className="flex items-center gap-4">
        <QuantitySelector quantity={quantity} onChange={setQuantity} className="h-12 w-32" />
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            "flex-1 h-12 rounded-full font-semibold transition-all duration-300",
            selectedPlan.includes('subscribe')
              ? "bg-[var(--color-levl-cyan)] text-black hover:bg-[var(--color-levl-cyan)]/90"
              : "bg-white text-black hover:bg-gray-200",
            "disabled:opacity-50 flex items-center justify-center"
          )}
        >
          {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add to Protocol"}
        </button>
      </div>

      <div className="pt-4 border-t border-[var(--color-levl-panel-border)] grid grid-cols-2 gap-4">
        {productContent.purchaseOptions.trustRow.map((trustItem, i) => {
          const Icon = [ShieldCheck, RefreshCcw, Truck, Calendar][i % 4];
          return (
            <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-levl-text-secondary)]">
              <Icon className="w-4 h-4 text-[var(--color-levl-text-muted)]" />
              <span>{trustItem}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--color-levl-text-muted)] mt-2">
        {productContent.purchaseOptions.disclaimer}
      </p>
    </div>
  );
}
