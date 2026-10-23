"use client";

import React, { useState } from "react";
import {
  Sun,
  Moon,
  Flame,
  Snowflake,
  Activity,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  HeartPulse,
  Brain,
  Zap,
  TrendingUp,
  Calendar,
  Award,
  Layers,
  ExternalLink,
  Clock,
  Coffee,
  Droplets,
} from "lucide-react";

export type ShowcaseScreenKey =
  | "today-circadian"
  | "longevity-score"
  | "schedule-grid"
  | "modality-evidence"
  | "mastermind-protocols"
  | "biomarkers-tracking"
  | "bench-drawer";

export type ShowcaseTheme = "dark" | "light";

export type CircadianPhaseId = "dawn" | "zenith" | "dusk" | "night";

interface IPhoneShowcaseFrameProps {
  screenKey: ShowcaseScreenKey;
  theme: ShowcaseTheme;
  /** Image fetch priority following modern-web-guidance optimize-image-priority */
  priority?: "high" | "low" | "default";
  /** Optional active circadian phase highlight for the Today screen */
  activePhase?: CircadianPhaseId;
  /** Optional active vector name highlight for the Longevity Score screen */
  activeVector?: string;
  /** Optional className for outer sizing/transforms */
  className?: string;
  /** Optional badge label shown above or inside the frame */
  caption?: string;
}

export function IPhoneShowcaseFrame({
  screenKey,
  theme,
  priority = "default",
  activePhase,
  activeVector,
  className = "",
  caption,
}: IPhoneShowcaseFrameProps) {
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    sunlight: true,
    hydration: true,
    caffeine: true,
    sauna: false,
    plunge: false,
  });

  const isDark = theme === "dark";
  const currentImgKey = `${screenKey}-${theme}`;
  const hasRealScreenshot = loadedMap[currentImgKey] && !errorMap[currentImgKey];

  const toggleItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`relative select-none group ${className}`}>
      {/* Ambient Radial Backlight */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[60px] opacity-60 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 25%, rgba(16, 185, 129, 0.24), rgba(56, 189, 248, 0.14) 50%, transparent 75%)"
            : "radial-gradient(circle at 50% 25%, rgba(13, 148, 136, 0.20), rgba(2, 132, 199, 0.12) 50%, transparent 75%)",
        }}
      />

      {/* iPhone 16 Pro Titanium Outer Chassis */}
      <div
        className="relative mx-auto w-[300px] sm:w-[320px] aspect-[393/852] rounded-[48px] p-[10px] transition-all duration-500 shadow-2xl"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #374151 0%, #1f2937 35%, #111827 70%, #374151 100%)"
            : "linear-gradient(145deg, #cbd5e1 0%, #94a3b8 35%, #64748b 70%, #cbd5e1 100%)",
          boxShadow: isDark
            ? "0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.14), inset 0 1px 2px rgba(255, 255, 255, 0.25)"
            : "0 30px 65px -15px rgba(15, 23, 42, 0.28), 0 0 0 1px rgba(15, 23, 42, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Titanium Side Hardware Buttons */}
        <div
          aria-hidden="true"
          className="absolute -left-[2.5px] top-[110px] w-[3px] h-7 rounded-l-sm bg-slate-500/60"
        />
        <div
          aria-hidden="true"
          className="absolute -left-[2.5px] top-[154px] w-[3px] h-12 rounded-l-sm bg-slate-500/60"
        />
        <div
          aria-hidden="true"
          className="absolute -left-[2.5px] top-[212px] w-[3px] h-12 rounded-l-sm bg-slate-500/60"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[2.5px] top-[170px] w-[3px] h-16 rounded-r-sm bg-slate-500/60"
        />

        {/* Inner Bezel & Screen Viewport */}
        <div
          className="relative w-full h-full rounded-[39px] overflow-hidden flex flex-col transition-colors duration-500"
          style={{
            backgroundColor: isDark ? "#030712" : "#F8F9F7",
            color: isDark ? "#F9FAFB" : "#0F172A",
            boxShadow: "inset 0 0 0 1px rgba(128,128,128,0.16)",
          }}
        >
          {/* Top iOS Status Bar + Dynamic Island */}
          <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-2 text-[10px] font-semibold tracking-tight shrink-0">
            <span className="tabular-nums opacity-85">9:41</span>
            <div className="w-[88px] h-[22px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-white/10">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-wider">
                  LEVL
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#111827] border border-indigo-500/30" />
            </div>
            <div className="flex items-center gap-1 opacity-85">
              <div className="flex items-end gap-[1.5px] h-2.5">
                <span className="w-[2px] h-1 bg-current rounded-full" />
                <span className="w-[2px] h-1.5 bg-current rounded-full" />
                <span className="w-[2px] h-2 bg-current rounded-full" />
                <span className="w-[2px] h-2.5 bg-current rounded-full" />
              </div>
              <div className="w-4 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center">
                <div className="w-full h-full bg-emerald-500 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Layer 1: Static Screenshot Crossfade (When PNGs exist in public/images/app-showcase/) */}
          {(["dark", "light"] as const).map((variant) => {
            const key = `${screenKey}-${variant}`;
            const isCurrentVariant = variant === theme;
            if (errorMap[key]) return null;

            const isHighPriority = priority === "high" && isCurrentVariant;
            const isLowPriority = priority === "low" || !isCurrentVariant;

            return (
              <img
                key={key}
                src={`/images/app-showcase/${screenKey}-${variant}.png`}
                alt={`LEVL App ${screenKey.replace("-", " ")} (${variant} mode)`}
                width={393}
                height={852}
                {...(isHighPriority
                  ? { fetchPriority: "high" as const }
                  : isLowPriority
                  ? { fetchPriority: "low" as const, loading: "lazy" as const }
                  : { loading: "lazy" as const })}
                onLoad={() =>
                  setLoadedMap((prev) => ({ ...prev, [key]: true }))
                }
                onError={() =>
                  setErrorMap((prev) => ({ ...prev, [key]: true }))
                }
                className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${
                  isCurrentVariant && loadedMap[key]
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              />
            );
          })}

          {/* Layer 2: Interactive Code-Rendered UI Preview Fallback */}
          {!hasRealScreenshot && (
            <div className="relative z-10 flex-1 flex flex-col justify-between px-3.5 pb-2.5 pt-0.5 overflow-hidden text-left">
              {/* Screen Content Switcher */}
              <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2.5 pr-0.5">
                {screenKey === "today-circadian" && (
                  <TodayCircadianPreview
                    isDark={isDark}
                    activePhase={activePhase}
                    checkedItems={checkedItems}
                    onToggleItem={toggleItem}
                  />
                )}
                {screenKey === "longevity-score" && (
                  <LongevityScorePreview
                    isDark={isDark}
                    activeVector={activeVector}
                  />
                )}
                {screenKey === "schedule-grid" && (
                  <ScheduleGridPreview isDark={isDark} />
                )}
                {screenKey === "modality-evidence" && (
                  <ModalityEvidencePreview isDark={isDark} />
                )}
                {screenKey === "mastermind-protocols" && (
                  <MastermindProtocolsPreview isDark={isDark} />
                )}
                {screenKey === "biomarkers-tracking" && (
                  <BiomarkersTrackingPreview isDark={isDark} />
                )}
                {screenKey === "bench-drawer" && (
                  <BenchDrawerPreview isDark={isDark} />
                )}
              </div>

              {/* Bottom App Tab Bar */}
              <div
                className="mt-2 pt-2 pb-1 px-2 rounded-2xl border flex items-center justify-around text-[8.5px] font-medium shrink-0 backdrop-blur-md"
                style={{
                  backgroundColor: isDark
                    ? "rgba(17, 24, 39, 0.86)"
                    : "rgba(255, 255, 255, 0.92)",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                {[
                  { id: "today-circadian", label: "Today", icon: Sun },
                  { id: "longevity-score", label: "8-Vector", icon: Activity },
                  { id: "schedule-grid", label: "Schedule", icon: Calendar },
                  { id: "mastermind-protocols", label: "Stacks", icon: Layers },
                  { id: "biomarkers-tracking", label: "Labs", icon: FlaskConical },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active =
                    screenKey === tab.id ||
                    (screenKey === "modality-evidence" &&
                      tab.id === "longevity-score") ||
                    (screenKey === "bench-drawer" &&
                      tab.id === "mastermind-protocols");
                  return (
                    <div
                      key={tab.id}
                      className="flex flex-col items-center gap-0.5"
                      style={{
                        color: active
                          ? isDark
                            ? "#10B981"
                            : "#0D9488"
                          : isDark
                          ? "#6B7280"
                          : "#64748B",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* iPhone Home Indicator */}
              <div className="w-24 h-1 rounded-full mx-auto mt-1.5 opacity-30 bg-current shrink-0" />
            </div>
          )}
        </div>
      </div>

      {caption && (
        <p
          className="text-center text-xs font-medium mt-3 tracking-wide"
          style={{ color: isDark ? "#9CA3AF" : "#475569" }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

/* ============================================================================
 * 1. TODAY CIRCADIAN FEED (/today)
 * ============================================================================ */
function TodayCircadianPreview({
  isDark,
  activePhase,
  checkedItems,
  onToggleItem,
}: {
  isDark: boolean;
  activePhase?: CircadianPhaseId;
  checkedItems: Record<string, boolean>;
  onToggleItem: (id: string, e: React.MouseEvent) => void;
}) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.92)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const doneCount = Object.values(checkedItems).filter(Boolean).length + 2;

  return (
    <div className="space-y-2.5">
      {/* Header & Photon Progress Bar */}
      <div
        className="p-2.5 rounded-2xl border"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
              CIRCADIAN OS • TODAY
            </span>
            <h4 className="text-xs font-bold tracking-tight">
              Chronological Protocol Feed
            </h4>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            {doneCount}/7 Done
          </span>
        </div>

        {/* Photon Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[8.5px]" style={{ color: mutedText }}>
            <span>Photon & Hormetic Alignment</span>
            <span className="font-mono font-bold text-emerald-500">84%</span>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-500/20 flex">
            <div className="h-full bg-amber-500 w-[30%]" />
            <div className="h-full bg-sky-500 w-[26%]" />
            <div className="h-full bg-indigo-500 w-[18%]" />
            <div className="h-full bg-purple-500 w-[10%]" />
          </div>
        </div>
      </div>

      {/* Phase 1: Morning Rise (Dawn) — Morning Sunlight #1 Anchor */}
      <div
        className="p-2.5 rounded-2xl border transition-all"
        style={{
          backgroundColor: cardBg,
          borderColor:
            activePhase === "dawn"
              ? "#F59E0B"
              : isDark
              ? "rgba(245, 158, 11, 0.3)"
              : "rgba(217, 119, 6, 0.3)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
              Morning Rise • 06:00–10:00
            </span>
          </div>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 font-semibold">
            ANCHOR #1
          </span>
        </div>

        {/* #1 Anchor Item: Morning Sunlight */}
        <div
          onClick={(e) => onToggleItem("sunlight", e)}
          className="p-2 rounded-xl border mb-1.5 cursor-pointer transition-all"
          style={{
            backgroundColor: isDark
              ? "rgba(245, 158, 11, 0.08)"
              : "rgba(254, 243, 199, 0.65)",
            borderColor: "rgba(245, 158, 11, 0.3)",
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <CheckCircle2
                className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                  checkedItems.sunlight
                    ? "text-emerald-500"
                    : "text-amber-500/50"
                }`}
              />
              <div>
                <p className="text-[10.5px] font-bold leading-tight">
                  Morning Sunlight Exposure
                </p>
                <p className="text-[8.5px] mt-0.5" style={{ color: mutedText }}>
                  Outdoor solar lux before screens • SCN cortisol lock
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 font-semibold">
                    10–15 mins
                  </span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 font-semibold">
                    10,000+ Lux
                  </span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-500 font-semibold">
                    Tier-1 (96)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delayed Caffeine */}
        <div
          onClick={(e) => onToggleItem("caffeine", e)}
          className="p-1.5 rounded-xl border flex items-center justify-between cursor-pointer"
          style={{ borderColor: borderCol }}
        >
          <div className="flex items-center gap-2">
            <Coffee
              className={`w-3 h-3 ${
                checkedItems.caffeine ? "text-emerald-500" : "text-amber-500"
              }`}
            />
            <div>
              <p className="text-[9.5px] font-semibold">
                Delayed Caffeine Window
              </p>
              <p className="text-[8px]" style={{ color: mutedText }}>
                90–120m post-wake • Prevents afternoon crash
              </p>
            </div>
          </div>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-500/15">
            08:30 AM
          </span>
        </div>
      </div>

      {/* Phase 2: Daytime Peak (Zenith) */}
      <div
        className="p-2 rounded-2xl border"
        style={{
          backgroundColor: cardBg,
          borderColor: activePhase === "zenith" ? "#0EA5E9" : borderCol,
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9.5px] font-bold text-sky-500 uppercase tracking-wider">
            ☀️ Daytime Peak • 10:00–14:00
          </span>
          <span className="text-[8px] font-mono text-emerald-500 font-semibold">
            ✦ Synergy +3.4x
          </span>
        </div>
        <p className="text-[9.5px] font-semibold">
          Polyphenol + EVOO Lipid Matrix & 5g Creatine
        </p>
        <p className="text-[8px]" style={{ color: mutedText }}>
          AMPK + SIRT1 activation • Paired with 15g high-polyphenol EVOO
        </p>
      </div>

      {/* Phase 3: Afternoon Dip (Dusk) — Cold Plunge + Sauna */}
      <div
        className="p-2.5 rounded-2xl border"
        style={{
          backgroundColor: cardBg,
          borderColor:
            activePhase === "dusk"
              ? "#6366F1"
              : isDark
              ? "rgba(99, 102, 241, 0.3)"
              : "rgba(79, 70, 229, 0.25)",
        }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9.5px] font-bold text-indigo-500 uppercase tracking-wider">
            ⚡ Afternoon Dip • 14:00–18:00
          </span>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-500 font-semibold">
            Hormetic Window
          </span>
        </div>

        <div className="space-y-1.5">
          <div
            onClick={(e) => onToggleItem("plunge", e)}
            className="p-1.5 rounded-xl border flex items-center justify-between cursor-pointer"
            style={{ borderColor: borderCol }}
          >
            <div className="flex items-center gap-2">
              <Snowflake className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <div>
                <p className="text-[9.5px] font-bold">Cold Plunge (Søberg)</p>
                <div className="flex gap-1 mt-0.5">
                  <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-sky-500/15 text-sky-400">
                    50°F–55°F
                  </span>
                  <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-sky-500/15 text-sky-400">
                    2–3 mins
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[8px] font-mono text-emerald-500 font-semibold">
              +250% DA
            </span>
          </div>

          <div
            onClick={(e) => onToggleItem("sauna", e)}
            className="p-1.5 rounded-xl border flex items-center justify-between cursor-pointer"
            style={{ borderColor: borderCol }}
          >
            <div className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <div>
                <p className="text-[9.5px] font-bold">Finnish Dry Sauna</p>
                <div className="flex gap-1 mt-0.5">
                  <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-orange-500/15 text-orange-400">
                    174°F+
                  </span>
                  <span className="text-[7.5px] font-mono px-1 py-0.2 rounded bg-orange-500/15 text-orange-400">
                    20 mins
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[8px] font-mono text-emerald-500 font-semibold">
              HSP70 +eNOS
            </span>
          </div>
        </div>
      </div>

      {/* Phase 4: Evening Wind-Down (Night) */}
      <div
        className="p-2 rounded-2xl border"
        style={{
          backgroundColor: cardBg,
          borderColor: activePhase === "night" ? "#A855F7" : borderCol,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider">
            🌙 Evening Wind-Down • 18:00–22:00
          </span>
          <span className="text-[7.5px] font-mono text-purple-400">
            3g Glycine + Mg-Threonate
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. 8-VECTOR LONGEVITY SCORE & RADAR (/longevity-score)
 * ============================================================================ */
function LongevityScorePreview({
  isDark,
  activeVector,
}: {
  isDark: boolean;
  activeVector?: string;
}) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.92)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const vectors = [
    { name: "Heart Health", score: 94, tier: "Tier-1 Anchor", pathway: "eNOS • VO2" },
    { name: "Brain Longevity", score: 91, tier: "Tier-1 Anchor", pathway: "BDNF • Glymphatic" },
    { name: "Metabolic Health", score: 89, tier: "Tier-1 Anchor", pathway: "AMPK • GLUT4" },
    { name: "Chronic Inflammation", score: 92, tier: "Tier-1 Anchor", pathway: "Nrf2 • NF-κB↓" },
    { name: "Cellular Longevity", score: 90, tier: "Tier-1 Anchor", pathway: "SIRT1 • Autophagy" },
    { name: "Testosterone & Hormones", score: 86, tier: "Tier-1 Anchor", pathway: "HPG Axis • SHBG" },
    { name: "Cancer Defense", score: 84, tier: "Tier-1 Anchor", pathway: "NK Cell • Sulforaphane" },
    { name: "Bone Density", score: 82, tier: "Tier-1 Anchor", pathway: "Piezo1 • Osteoblast" },
  ];

  return (
    <div className="space-y-2.5">
      {/* Top Score Header */}
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-500 font-bold block">
            8-VECTOR BIOLOGICAL SCORE
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-extrabold tracking-tight text-emerald-500">
              89.4
            </span>
            <span className="text-[9px] font-semibold" style={{ color: mutedText }}>
              / 100 Coverage
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30 block">
            0.74 DunedinPACE
          </span>
          <span className="text-[8px] mt-0.5 block" style={{ color: mutedText }}>
            8/8 Vectors Anchored
          </span>
        </div>
      </div>

      {/* Radar SVG Visualization */}
      <div
        className="p-2.5 rounded-2xl border flex flex-col items-center relative"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <svg viewBox="0 0 200 165" className="w-full h-[142px] overflow-visible">
          {/* Concentric Octagon Rings */}
          {[62, 46, 30, 15].map((r, idx) => {
            const pts = Array.from({ length: 8 })
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
                return `${100 + r * Math.cos(angle)},${84 + r * Math.sin(angle)}`;
              })
              .join(" ");
            return (
              <polygon
                key={idx}
                points={pts}
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)"}
                strokeWidth="1"
              />
            );
          })}
          {/* Axis Spokes */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
            return (
              <line
                key={i}
                x1="100"
                y1="84"
                x2={100 + 62 * Math.cos(angle)}
                y2={84 + 62 * Math.sin(angle)}
                stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}
                strokeWidth="1"
              />
            );
          })}
          {/* Active Coverage Polygon */}
          <polygon
            points="100,25 140,44 155,84 138,123 100,140 60,122 46,84 62,45"
            fill={isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(13, 148, 136, 0.22)"}
            stroke={isDark ? "#10B981" : "#0D9488"}
            strokeWidth="2"
          />
          {/* Labels */}
          <text x="100" y="14" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="700">
            Heart (94)
          </text>
          <text x="166" y="42" textAnchor="start" fill="currentColor" fontSize="7" fontWeight="600">
            Brain (91)
          </text>
          <text x="162" y="87" textAnchor="start" fill="currentColor" fontSize="7" fontWeight="600">
            Metabolic
          </text>
          <text x="150" y="135" textAnchor="start" fill="currentColor" fontSize="7" fontWeight="600">
            Inflammation
          </text>
          <text x="100" y="156" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="600">
            Cellular (90)
          </text>
          <text x="48" y="135" textAnchor="end" fill="currentColor" fontSize="7" fontWeight="600">
            Hormones
          </text>
          <text x="38" y="87" textAnchor="end" fill="currentColor" fontSize="7" fontWeight="600">
            Cancer Def
          </text>
          <text x="45" y="42" textAnchor="end" fill="currentColor" fontSize="7" fontWeight="600">
            Bone (82)
          </text>
        </svg>
      </div>

      {/* Vector Breakdown List */}
      <div className="space-y-1.5">
        {vectors.slice(0, 4).map((v) => {
          const isHighlighted = activeVector && v.name.includes(activeVector);
          return (
            <div
              key={v.name}
              className="p-2 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: isHighlighted
                  ? isDark
                    ? "rgba(16,185,129,0.12)"
                    : "rgba(13,148,136,0.1)"
                  : cardBg,
                borderColor: isHighlighted ? "#10B981" : borderCol,
              }}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-bold">{v.name}</span>
                  <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-500 font-semibold">
                    {v.tier}
                  </span>
                </div>
                <span className="text-[8px] font-mono" style={{ color: mutedText }}>
                  Pathways: {v.pathway}
                </span>
              </div>
              <span className="text-xs font-mono font-extrabold text-emerald-500">
                {v.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. 7-DAY SCHEDULE GRID (/schedule)
 * ============================================================================ */
function ScheduleGridPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.92)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const cadenceRows = [
    {
      name: "Morning Sunlight (15m)",
      phase: "Dawn",
      color: "bg-amber-500",
      activeDays: [true, true, true, true, true, true, true],
      freq: "7x/wk",
    },
    {
      name: "Norwegian 4x4 VO2 Max",
      phase: "Dusk",
      color: "bg-sky-500",
      activeDays: [false, true, false, false, true, false, false],
      freq: "2x/wk",
    },
    {
      name: "Finnish Sauna (174°F+)",
      phase: "Dusk",
      color: "bg-orange-500",
      activeDays: [true, false, true, false, true, true, false],
      freq: "4x/wk",
    },
    {
      name: "Heavy Resistance (CNS)",
      phase: "Dusk",
      color: "bg-indigo-500",
      activeDays: [true, false, true, false, false, true, false],
      freq: "3x/wk",
    },
    {
      name: "Cold Plunge (50°F–55°F)",
      phase: "Dawn",
      color: "bg-cyan-400",
      activeDays: [false, true, false, true, false, false, true],
      freq: "3x/wk",
    },
    {
      name: "Fisetin + Quercetin Pulse",
      phase: "Zenith",
      color: "bg-emerald-500",
      activeDays: [false, false, false, false, false, false, true],
      freq: "1x/wk",
    },
  ];

  return (
    <div className="space-y-2.5">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-sky-400 font-bold block">
            WEEKLY CADENCE ENGINE
          </span>
          <h4 className="text-xs font-bold">7-Day Circadian Matrix</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
          80/20 Shield Ready
        </span>
      </div>

      {/* 7-Day Grid Matrix */}
      <div
        className="p-2.5 rounded-2xl border space-y-2"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="grid grid-cols-12 items-center text-[8px] font-mono pb-1 border-b" style={{ borderColor: borderCol }}>
          <div className="col-span-5 font-bold" style={{ color: mutedText }}>
            MODALITY
          </div>
          <div className="col-span-5 grid grid-cols-7 text-center font-bold">
            {days.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="col-span-2 text-right font-bold" style={{ color: mutedText }}>
            PULSE
          </div>
        </div>

        {cadenceRows.map((row) => (
          <div key={row.name} className="grid grid-cols-12 items-center gap-1 py-1">
            <div className="col-span-5 pr-1">
              <p className="text-[8.5px] font-bold leading-tight truncate">
                {row.name}
              </p>
              <span className="text-[7.5px] font-mono" style={{ color: mutedText }}>
                {row.phase} Slot
              </span>
            </div>
            <div className="col-span-5 grid grid-cols-7 gap-0.5 items-center justify-items-center">
              {row.activeDays.map((on, idx) => (
                <span
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-[4px] ${
                    on ? row.color : "bg-slate-500/15"
                  }`}
                />
              ))}
            </div>
            <div className="col-span-2 text-right">
              <span className="text-[7.5px] font-mono font-bold text-emerald-500">
                {row.freq}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Adaptive Governor Banner */}
      <div
        className="p-2.5 rounded-2xl border"
        style={{
          backgroundColor: isDark
            ? "rgba(99, 102, 241, 0.1)"
            : "rgba(238, 242, 255, 0.9)",
          borderColor: "rgba(99, 102, 241, 0.3)",
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8.5px] font-bold text-indigo-400 uppercase tracking-wider">
            ⚡ Smart Split-Dose & Rest Reconciliation
          </span>
          <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">
            Zero Clash
          </span>
        </div>
        <p className="text-[8.5px]" style={{ color: mutedText }}>
          Cold Plunge automatically separated from Mon/Wed/Sat hypertrophy days to preserve mTORC1 & satellite cell synthesis.
        </p>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. MODALITY EVIDENCE MODAL (/explore)
 * ============================================================================ */
function ModalityEvidencePreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.88)" : "rgba(255, 255, 255, 0.95)";
  const borderCol = isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2.5">
      <div
        className="p-3 rounded-2xl border space-y-2.5"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            ★ GRADE A • HUMAN RCT
          </span>
          <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-sky-500/15 text-sky-400">
            Tier-1 Anchor (96/100)
          </span>
        </div>

        <div>
          <h4 className="text-xs font-extrabold tracking-tight">
            Norwegian 4x4 VO2 Max + Finnish Sauna Pairing
          </h4>
          <p className="text-[8.5px] mt-0.5" style={{ color: mutedText }}>
            Cardiorespiratory Peak + Heat-Shock Endothelial Conditioning
          </p>
        </div>

        {/* Quantifiable Clinical Effect Sizes */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <span className="text-[7.5px] font-mono uppercase text-emerald-400 block">
              VO2 Max Delta
            </span>
            <span className="text-xs font-extrabold text-emerald-400">
              +15–20%
            </span>
            <span className="text-[7.5px] block" style={{ color: mutedText }}>
              12-wk Human RCT
            </span>
          </div>
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/25">
            <span className="text-[7.5px] font-mono uppercase text-sky-400 block">
              Inflammation
            </span>
            <span className="text-xs font-extrabold text-sky-400">
              ≥25% hs-CRP↓
            </span>
            <span className="text-[7.5px] block" style={{ color: mutedText }}>
              4–7x/wk 174°F+
            </span>
          </div>
        </div>

        {/* Cellular Mechanisms */}
        <div>
          <span className="text-[8px] font-mono uppercase tracking-wider block mb-1" style={{ color: mutedText }}>
            Activated Cellular Pathways
          </span>
          <div className="flex flex-wrap gap-1">
            {["AMPK", "SIRT1", "eNOS", "PGC-1α", "HSP70", "Nrf2"].map((p) => (
              <span
                key={p}
                className="text-[8px] font-mono px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Exact Dosing Guardrails */}
        <div
          className="p-2 rounded-xl border text-[8.5px] space-y-1"
          style={{ borderColor: borderCol }}
        >
          <div className="flex justify-between">
            <span style={{ color: mutedText }}>Protocol Dose:</span>
            <span className="font-mono font-bold">4x4m @ 90–95% HRmax</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: mutedText }}>Thermal Guardrail:</span>
            <span className="font-mono font-bold text-amber-500">
              174°F+ (79°C) • 20 mins
            </span>
          </div>
        </div>

        {/* Verified PubMed Citations */}
        <div className="space-y-1 pt-0.5">
          <span className="text-[7.5px] font-mono uppercase tracking-wider block" style={{ color: mutedText }}>
            Verified PubMed Citations
          </span>
          <div className="p-1.5 rounded-lg bg-slate-500/10 flex items-center justify-between text-[8px] font-mono">
            <span className="truncate">PMID: 25705824 • Laukkanen JAMA Intern Med</span>
            <ExternalLink className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
          </div>
          <div className="p-1.5 rounded-lg bg-slate-500/10 flex items-center justify-between text-[8px] font-mono">
            <span className="truncate">PMID: 17414804 • Helgerud et al. Med Sci</span>
            <ExternalLink className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 5. MASTERMIND PROTOCOLS (/protocols)
 * ============================================================================ */
function MastermindProtocolsPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.92)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const stacks = [
    {
      title: "Bryan Johnson Blueprint 2026",
      badge: "0.69 Pace • 24 Modalities",
      focus: "Full-Spectrum Epigenetic & Organ Rejuvenation",
      color: "text-emerald-400",
      border: "rgba(16, 185, 129, 0.35)",
      enrolled: true,
    },
    {
      title: "Andrew Huberman Foundational",
      badge: "Circadian • 14 Modalities",
      focus: "Morning Lux, Delayed Caffeine, NSDR, Sleep Stack",
      color: "text-amber-400",
      border: borderCol,
      enrolled: false,
    },
    {
      title: "Peter Attia Outlive Stack",
      badge: "Centenarian • 12 Modalities",
      focus: "Zone 2 (4x/wk), Norwegian 4x4, Heavy Carries, ApoB",
      color: "text-sky-400",
      border: borderCol,
      enrolled: false,
    },
    {
      title: "Rhonda Patrick FoundMyFitness",
      badge: "Hormetic • 16 Modalities",
      focus: "Finnish Sauna 174°F+, Sulforaphane, High-Dose Omega-3",
      color: "text-indigo-400",
      border: borderCol,
      enrolled: false,
    },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-500 font-bold block">
            1-TAP STACK ENROLLMENT
          </span>
          <h4 className="text-xs font-bold">Mastermind Protocol Library</h4>
        </div>
        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold">
          Conflict-Checked
        </span>
      </div>

      {stacks.map((s) => (
        <div
          key={s.title}
          className="p-2.5 rounded-2xl border space-y-1"
          style={{ backgroundColor: cardBg, borderColor: s.border }}
        >
          <div className="flex items-center justify-between">
            <span className={`text-[9.5px] font-extrabold ${s.color}`}>
              {s.title}
            </span>
            <span
              className={`text-[7.5px] font-mono px-1.5 py-0.5 rounded font-bold ${
                s.enrolled
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-slate-500/15"
              }`}
            >
              {s.enrolled ? "✓ Active Stack" : "+ 1-Tap Enroll"}
            </span>
          </div>
          <p className="text-[8px]" style={{ color: mutedText }}>
            {s.focus}
          </p>
          <div className="text-[7.5px] font-mono opacity-80">{s.badge}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================================
 * 6. BIOMARKERS TRACKING (/tracking)
 * ============================================================================ */
function BiomarkersTrackingPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.92)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const markers = [
    { name: "DunedinPACE", val: "0.74 yr/yr", delta: "-0.18", status: "Optimal <0.85", color: "text-emerald-400" },
    { name: "ApoB", val: "58 mg/dL", delta: "-24 mg/dL", status: "Longevity <65", color: "text-sky-400" },
    { name: "hs-CRP", val: "0.38 mg/L", delta: "-42%", status: "Optimal <0.50", color: "text-emerald-400" },
    { name: "Fasting Insulin", val: "3.6 uIU/mL", delta: "-2.1", status: "Optimal <5.0", color: "text-indigo-400" },
    { name: "VO2 Max", val: "57.2 mL/kg", delta: "+6.4", status: "Top 1.5% Age", color: "text-amber-400" },
    { name: "DEXA Spine BMD", val: "+1.5 T-Score", delta: "+0.3", status: "Peak Quartile", color: "text-purple-400" },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-sky-400 font-bold block">
            BIOMARKER ATTRIBUTION
          </span>
          <h4 className="text-xs font-bold">Lab & Epigenetic Velocity</h4>
        </div>
        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-bold">
          Synced • Function + Whoop
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {markers.map((m) => (
          <div
            key={m.name}
            className="p-2 rounded-xl border"
            style={{ backgroundColor: cardBg, borderColor: borderCol }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono font-bold" style={{ color: mutedText }}>
                {m.name}
              </span>
              <span className="text-[7.5px] font-mono text-emerald-500 font-bold">
                {m.delta}
              </span>
            </div>
            <div className={`text-xs font-extrabold mt-0.5 ${m.color}`}>
              {m.val}
            </div>
            <div className="text-[7.5px] font-mono mt-0.5" style={{ color: mutedText }}>
              {m.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * 7. BENCH DRAWER & CLASH AUDIT (/bench)
 * ============================================================================ */
function BenchDrawerPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.92)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2.5">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
            PROTOCOL BENCH & CLASH ENGINE
          </span>
          <h4 className="text-xs font-bold">Active (14) • Benched (5)</h4>
        </div>
        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold">
          1 Clash Resolved
        </span>
      </div>

      {/* Antagonistic Clash Alert Card */}
      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{
          backgroundColor: isDark
            ? "rgba(245, 158, 11, 0.08)"
            : "rgba(254, 243, 199, 0.7)",
          borderColor: "rgba(245, 158, 11, 0.35)",
        }}
      >
        <div className="flex items-center gap-1.5 text-amber-500">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[9px] font-extrabold uppercase tracking-wider">
            Antagonistic Pathway Clash Guard
          </span>
        </div>
        <p className="text-[8.5px] leading-snug">
          <strong>Cold Plunge (50°F)</strong> or <strong>Metformin</strong> within 4h of Heavy Resistance blunts{" "}
          <span className="font-mono font-bold">mTORC1 / IGF-1</span> hypertrophy signaling.
        </p>
        <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-[8px] font-mono text-emerald-500 font-bold">
          <span>✓ Auto-Moved Cold Plunge to Dawn</span>
          <span>Saved +mTORC1</span>
        </div>
      </div>

      {/* Biochemical Synergy Card */}
      <div
        className="p-2.5 rounded-2xl border space-y-1"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-emerald-500">
            ✦ Biochemical Synergy Pairings
          </span>
          <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500">
            +3.4x Area Under Curve
          </span>
        </div>
        <p className="text-[8.5px]" style={{ color: mutedText }}>
          Fisetin + Quercetin + High-Polyphenol EVOO scheduled together at 11:30 AM Zenith meal.
        </p>
      </div>

      {/* Benched Modalities Drawer */}
      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <span className="text-[8px] font-mono uppercase tracking-wider block" style={{ color: mutedText }}>
          Benched / Cycled Modalities
        </span>
        {[
          { name: "Metformin (500mg ER)", reason: "Benched on VO2 Max & Lifting Days" },
          { name: "Melatonin Microdose (300mcg)", reason: "Travel / Jet-Lag Shift Only" },
        ].map((b) => (
          <div
            key={b.name}
            className="p-1.5 rounded-lg bg-slate-500/10 flex items-center justify-between text-[8px]"
          >
            <span className="font-bold">{b.name}</span>
            <span className="font-mono opacity-75">{b.reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
