"use client";

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CheckoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checkoutUrl?: string;
  disabled?: boolean;
}

export function CheckoutButton({ checkoutUrl, disabled, className, children, ...props }: CheckoutButtonProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = () => {
    if (!checkoutUrl) return;
    setIsRedirecting(true);
    // In a real app, this redirects to the Shopify hosted checkout
    window.location.href = checkoutUrl;
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || isRedirecting}
      className={cn(
        "relative w-full flex items-center justify-center rounded-full bg-white text-[#050505] font-semibold py-4 px-6",
        "transition-all duration-300 hover:bg-gray-200 active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:active:scale-100",
        className
      )}
      {...props}
    >
      {isRedirecting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        children || "Proceed to Checkout"
      )}
    </button>
  );
}
