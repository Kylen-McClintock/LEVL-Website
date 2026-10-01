"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';

export const FOUNDER_FRIENDS_FAMILY_CODES = [
  'TOM30',
  'CAT30',
  'MARK30',
  'TAYLOR30',
  'LAM30',
  'KYLEN30',
  'DAN30',
  'EMMETT30',
  'KEGAN30',
  'LAROCCA30',
] as const;

export const FOUNDER_DIRECT_CODES = [
  'FOUNDER30',
] as const;

export const ALL_FOUNDER_CODES = [
  ...FOUNDER_FRIENDS_FAMILY_CODES,
  ...FOUNDER_DIRECT_CODES,
] as const;

export type FounderCode = typeof ALL_FOUNDER_CODES[number];

interface FounderContextType {
  isFounder: boolean;
  founderCode: string | null;
  isFriendsAndFamily: boolean;
  isFounderDirect: boolean;
  bannerHeadline: string;
  bannerSubtext: string;
  unlockFounderAccess: (code: string) => boolean;
  clearFounderAccess: () => void;
}

const STORAGE_KEY = 'levl_founder_code';
const COOKIE_KEY = 'levl_founder_code';

function normalizeCode(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase();
  const match = ALL_FOUNDER_CODES.find(code => code === cleaned);
  return match || null;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number = 60) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function removeCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

const FounderContext = createContext<FounderContextType>({
  isFounder: false,
  founderCode: null,
  isFriendsAndFamily: false,
  isFounderDirect: false,
  bannerHeadline: '',
  bannerSubtext: '',
  unlockFounderAccess: () => false,
  clearFounderAccess: () => {},
});

function SearchParamsDetector({ onDetected }: { onDetected: (code: string) => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Check query parameters (ref, code, founder, discount, promo, coupon)
    const paramKeys = ['ref', 'code', 'founder', 'discount', 'promo', 'coupon'];
    for (const key of paramKeys) {
      const val = searchParams?.get(key);
      const normalized = normalizeCode(val);
      if (normalized) {
        onDetected(normalized);
        return;
      }
    }

    // 2. Check path segment (e.g. /tom30 or /founder30)
    if (pathname) {
      const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
      const normalized = normalizeCode(cleanPath);
      if (normalized) {
        onDetected(normalized);
        return;
      }
    }
  }, [searchParams, pathname, onDetected]);

  return null;
}

export function FounderProvider({ children }: { children: React.ReactNode }) {
  const [founderCode, setFounderCode] = useState<string | null>(null);

  // Restore stored founder code on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || 
                     sessionStorage.getItem(STORAGE_KEY) || 
                     getCookie(COOKIE_KEY);
      const normalized = normalizeCode(stored);
      if (normalized) {
        setFounderCode(normalized);
      }
    } catch (e) {
      console.warn('Could not read stored founder code', e);
    }
  }, []);

  const handleDetectedCode = useCallback((code: string) => {
    const normalized = normalizeCode(code);
    if (!normalized) return;

    setFounderCode(normalized);
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
      sessionStorage.setItem(STORAGE_KEY, normalized);
      setCookie(COOKIE_KEY, normalized);
    } catch (e) {
      console.warn('Could not persist founder code', e);
    }
  }, []);

  const unlockFounderAccess = useCallback((code: string): boolean => {
    const normalized = normalizeCode(code);
    if (normalized) {
      handleDetectedCode(normalized);
      return true;
    }
    return false;
  }, [handleDetectedCode]);

  const clearFounderAccess = useCallback(() => {
    setFounderCode(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      removeCookie(COOKIE_KEY);
    } catch (e) {
      console.warn('Could not clear founder access', e);
    }
  }, []);

  const isFounder = Boolean(founderCode);
  const isFounderDirect = founderCode === 'FOUNDER30';
  const isFriendsAndFamily = isFounder && !isFounderDirect;

  // Specific copy dictated by user requirements:
  const bannerHeadline = isFounderDirect
    ? "You've unlocked Founder Pricing — Additional 30% off for life"
    : "You've unlocked Founder Pricing for Friends and Family — Additional 30% off for life";
  const bannerSubtext = "Thank you for being among our earliest supporters!";

  return (
    <FounderContext.Provider
      value={{
        isFounder,
        founderCode,
        isFriendsAndFamily,
        isFounderDirect,
        bannerHeadline,
        bannerSubtext,
        unlockFounderAccess,
        clearFounderAccess,
      }}
    >
      <Suspense fallback={null}>
        <SearchParamsDetector onDetected={handleDetectedCode} />
      </Suspense>
      {children}
    </FounderContext.Provider>
  );
}

export function useFounder() {
  return useContext(FounderContext);
}
