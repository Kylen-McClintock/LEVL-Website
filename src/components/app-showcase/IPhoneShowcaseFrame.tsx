"use client";

import React from "react";

export type ShowcaseTheme = "dark" | "light";

export type ShowcaseSlug =
  | "today-morning-tasks"
  | "today-protocols"
  | "today-feed"
  | "schedule-grid"
  | "master-schedule"
  | "adaptive-8020-shield"
  | "adaptive-sleep-triage"
  | "applet-breathwork"
  | "applet-fasting"
  | "applet-thermal"
  | "applet-sunlight"
  | "applet-hiit"
  | "applet-centenarian"
  | "applet-zone2"
  | "applet-peptide"
  | "longevity-score"
  | "intel-longevity-score"
  | "intel-outcome-roi"
  | "intel-hallmarks-radar"
  | "intel-physiological-age"
  | "intel-emotion-checkin"
  | "intel-ai-coach";

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

export const SHOWCASE_CACHE_BUST = "20261023final";

/**
 * Returns the local @3x Retina PNG screenshot path with cache-busting query string
 * (`?v=20261023final`) for any screen slug and active theme ('dark' | 'light').
 */
export function getShowcaseImage(
  slug: string,
  previewTheme: ShowcaseTheme
): string {
  return `/images/app-showcase/${slug}-${previewTheme}.png?v=${SHOWCASE_CACHE_BUST}`;
}

export interface RealPhoneFrameProps {
  src: string;
  alt: string;
  /** Active preview theme so the solid opaque phone canvas matches (#060913 dark / #f8f9f7 light) */
  theme?: ShowcaseTheme;
  /** Image fetch priority following modern-web-guidance optimize-image-priority */
  priority?: "high" | "low" | "default";
  /** Optional caption pill displayed below the iPhone bezel */
  caption?: string;
  /** Optional outer container className */
  className?: string;
}

/**
 * Reusable Component: <RealPhoneFrame />
 * - Renders ONLY the active real @3x Retina PNG screenshot (1179 × 2556) inside the iPhone 15 Pro bezel.
 * - Zero image bleed between tabs: no previous image stays stacked underneath, and the frame uses a
 *   solid opaque background (#060913 in dark mode / #f8f9f7 in light mode).
 * - Zero duplicate fake headers or bottom navigation bars.
 */
export function RealPhoneFrame({
  src,
  alt,
  theme,
  priority = "default",
  caption,
  className = "",
}: RealPhoneFrameProps) {
  const inferredLight =
    theme === "light" || (!theme && src.includes("-light.png"));
  const solidBg = inferredLight ? "#f8f9f7" : "#060913";
  const finalSrc = src.includes("?v=")
    ? src
    : `${src}${src.includes("?") ? "&" : "?"}v=${SHOWCASE_CACHE_BUST}`;

  return (
    <div className={`relative select-none group ${className}`}>
      {/* iPhone 15 Pro Bezel — Solid Opaque Background, Zero Image Bleed, Zero Fake Chrome */}
      <div
        className="mx-auto aspect-[393/852] w-[300px] sm:w-[335px] rounded-[46px] border-[8px] border-slate-800/90 shadow-[0_25px_80px_-15px_rgba(16,185,129,0.28)] overflow-hidden relative"
        style={{ backgroundColor: solidBg }}
      >
        <img
          key={finalSrc}
          src={finalSrc}
          alt={alt}
          width={1179}
          height={2556}
          {...(priority === "high"
            ? { fetchPriority: "high" as const }
            : priority === "low"
            ? { fetchPriority: "low" as const, loading: "lazy" as const }
            : { loading: "lazy" as const })}
          className="block w-full h-full object-cover object-top select-none"
          style={{ backgroundColor: solidBg }}
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
      theme={theme}
      priority={priority}
      caption={caption}
      className={className}
    />
  );
}
