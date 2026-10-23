"use client";

import React, { useEffect, useState } from "react";

export type ShowcaseTheme = "dark" | "light";

export type ShowcaseSlug =
  | "today-feed"
  | "today-morning-tasks"
  | "longevity-score"
  | "schedule-grid"
  | "adaptive-8020-shield"
  | "adaptive-sleep-triage"
  | "applet-breathwork"
  | "applet-fasting"
  | "applet-thermal"
  | "applet-sunlight"
  | "applet-hiit"
  | "applet-peptide"
  | "intel-outcome-roi"
  | "intel-longevity-score"
  | "intel-physiological-age"
  | "intel-emotion-checkin"
  | "intel-hallmarks-radar"
  | "intel-ai-coach"
  | "master-schedule";

export type ShowcaseScreenKey = ShowcaseSlug;

export type CircadianPhaseId = "dawn" | "zenith" | "dusk" | "night";

export type FamousProtocolId =
  | "blueprint"
  | "huberman"
  | "attia"
  | "patrick"
  | "combined";

export type BiologyProfileId =
  | "lifting-apob"
  | "female-biology"
  | "sleep-debt"
  | "busy-travel";

/**
 * Step 1 Helper: Returns the local @3x Retina PNG screenshot path
 * for any screen slug and active theme ('dark' | 'light').
 */
export function getShowcaseImage(
  slug: string,
  previewTheme: ShowcaseTheme
): string {
  return `/images/app-showcase/${slug}-${previewTheme}.png`;
}

export interface RealPhoneFrameProps {
  src: string;
  alt: string;
  /** Image fetch priority following modern-web-guidance optimize-image-priority */
  priority?: "high" | "low" | "default";
  /** Optional caption pill displayed below the iPhone bezel */
  caption?: string;
  /** Optional outer container className */
  className?: string;
}

/**
 * Step 2 Reusable Component: <RealPhoneFrame />
 * Renders ONLY real @3x Retina PNG screenshots (1179 × 2556) inside the
 * iPhone 15 Pro bezel with smooth crossfade when switching tabs or toggling Dark/Light mode.
 */
export function RealPhoneFrame({
  src,
  alt,
  priority = "default",
  caption,
  className = "",
}: RealPhoneFrameProps) {
  const [displayedSrc, setDisplayedSrc] = useState(src);
  const [previousSrc, setPreviousSrc] = useState<string | null>(null);
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    if (src !== displayedSrc) {
      setPreviousSrc(displayedSrc);
      setDisplayedSrc(src);
      setIsFadingIn(true);
      const timer = window.setTimeout(() => {
        setIsFadingIn(false);
        setPreviousSrc(null);
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [src, displayedSrc]);

  return (
    <div className={`relative select-none group ${className}`}>
      {/* iPhone 15 Pro Bezel — ONLY Real @3x PNG Screenshots Inside */}
      <div className="mx-auto aspect-[393/852] w-[300px] sm:w-[335px] rounded-[46px] border-[8px] border-slate-800/90 bg-[#06080F] shadow-[0_25px_80px_-15px_rgba(16,185,129,0.28)] overflow-hidden relative">
        {previousSrc && (
          <img
            src={previousSrc}
            alt=""
            aria-hidden="true"
            width={1179}
            height={2556}
            className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
          />
        )}
        <img
          src={displayedSrc}
          alt={alt}
          width={1179}
          height={2556}
          {...(priority === "high"
            ? { fetchPriority: "high" as const }
            : priority === "low"
            ? { fetchPriority: "low" as const, loading: "lazy" as const }
            : { loading: "lazy" as const })}
          className={`relative z-10 w-full h-full object-cover object-top select-none transition-opacity duration-300 ${
            isFadingIn ? "opacity-95" : "opacity-100"
          }`}
        />
      </div>

      {/* Optional Caption Pill */}
      {caption && (
        <div className="mt-3.5 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border backdrop-blur-md bg-slate-900/80 border-white/10 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {caption}
          </span>
        </div>
      )}
    </div>
  );
}

export interface IPhoneShowcaseFrameProps {
  screenKey: ShowcaseScreenKey;
  theme: ShowcaseTheme;
  priority?: "high" | "low" | "default";
  caption?: string;
  className?: string;
}

export function IPhoneShowcaseFrame({
  screenKey,
  theme,
  priority = "default",
  caption,
  className = "",
}: IPhoneShowcaseFrameProps) {
  return (
    <RealPhoneFrame
      src={getShowcaseImage(screenKey, theme)}
      alt={caption || `LEVL: OutPace Aging — ${screenKey} (${theme} mode)`}
      priority={priority}
      caption={caption}
      className={className}
    />
  );
}
