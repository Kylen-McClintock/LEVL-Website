"use client";

import React, { useState } from "react";
import {
  Sun,
  Compass,
  Sparkles,
  TrendingUp,
  User,
  Flame,
  Snowflake,
  Activity,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  Calendar,
  Layers,
  ExternalLink,
  Coffee,
  Plus,
  ChevronDown,
  Gauge,
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

export interface XRayPhoneSyncConfig {
  protocolName: string;
  profileLabel: string;
  profileId: BiologyProfileId;
  adaptationBanner: string;
  blockedSummary: string;
  upgradedTaskTitle: string;
  upgradedTaskSub: string;
  upgradedTaskBadge: string;
  vectorScore: number;
  paceOfAging: string;
}

interface IPhoneShowcaseFrameProps {
  screenKey: ShowcaseScreenKey;
  theme: ShowcaseTheme;
  /** Image fetch priority following modern-web-guidance optimize-image-priority */
  priority?: "high" | "low" | "default";
  /** Optional active circadian phase highlight for the Today screen */
  activePhase?: CircadianPhaseId;
  /** Optional active vector name highlight for the Longevity Score screen */
  activeVector?: string;
  /** Optional live X-Ray sync payload for the Famous Protocols × Biology section */
  xrayConfig?: XRayPhoneSyncConfig;
  /** Optional className for outer sizing/transforms */
  className?: string;
  /** Optional badge label shown below the frame */
  caption?: string;
}

function getHeaderDropdownLabel(screenKey: ShowcaseScreenKey): string {
  switch (screenKey) {
    case "today-circadian":
      return "🕐 Time Blocks ▾";
    case "mastermind-protocols":
      return "📋 Protocol ▾";
    case "schedule-grid":
      return "📅 7-Day Week ▾";
    case "longevity-score":
      return "⚡ Longevity Score ▾";
    case "biomarkers-tracking":
    case "modality-evidence":
      return "📈 Insights ▾";
    case "bench-drawer":
      return "🔖 My Bench ▾";
  }
}

export function IPhoneShowcaseFrame({
  screenKey,
  theme,
  priority = "default",
  activePhase,
  activeVector,
  xrayConfig,
  className = "",
  caption,
}: IPhoneShowcaseFrameProps) {
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, boolean>>({});
  const [survivalMode8020, setSurvivalMode8020] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    sunlight: true,
    hydration: true,
    caffeine: true,
    sauna: false,
    plunge: false,
  });

  const isDark = theme === "dark";
  const currentImgKey = `${screenKey}-${theme}`;
  // Show static PNG screenshot if it exists and loaded, unless xrayConfig is actively driving dynamic state
  const hasRealScreenshot =
    !xrayConfig && loadedMap[currentImgKey] && !errorMap[currentImgKey];

  const toggleItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allDone = Object.values(checkedItems).every(Boolean);

  return (
    <div className={`relative select-none group ${className}`}>
      {/* Ambient Radial Backlight */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[60px] opacity-60 blur-2xl transition-all duration-700 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 25%, rgba(14, 165, 233, 0.24), rgba(16, 185, 129, 0.16) 50%, transparent 75%)"
            : "radial-gradient(circle at 50% 25%, rgba(13, 148, 136, 0.20), rgba(2, 132, 199, 0.14) 50%, transparent 75%)",
        }}
      />

      {/* iPhone 16 Pro Titanium Outer Chassis */}
      <div
        className="relative mx-auto w-[305px] sm:w-[326px] aspect-[393/852] rounded-[48px] p-[10px] transition-all duration-500 shadow-2xl"
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
            backgroundColor: isDark ? "#060913" : "#F8F9F7",
            color: isDark ? "#F9FAFB" : "#0F172A",
            boxShadow: "inset 0 0 0 1px rgba(128,128,128,0.16)",
          }}
        >
          {/* Top Edge 2.5px Horizontal Completion Progress Bar (TopStickyHeader.tsx) */}
          <div className="w-full h-[2.5px] bg-slate-800/40 shrink-0 z-30">
            <div
              className={`h-full transition-all duration-500 ${
                allDone
                  ? "w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400"
                  : "w-[76%] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
              }`}
            />
          </div>

          {/* Top iOS Status Bar + Dynamic Island */}
          <div className="relative z-30 flex items-center justify-between px-6 pt-2 pb-1.5 text-[10px] font-semibold tracking-tight shrink-0">
            <span className="tabular-nums opacity-85">9:41</span>
            <div className="w-[88px] h-[20px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-white/10">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-wider">
                  LEVL
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#111827] border border-sky-500/30" />
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

          {/* Layer 1: Real Screenshot Loader (Unmounts cleanly when absent so no opacity-0 ghost remains) */}
          {!xrayConfig &&
            (["dark", "light"] as const).map((variant) => {
              const key = `${screenKey}-${variant}`;
              const isCurrentVariant = variant === theme;
              if (errorMap[key]) return null;

              const isHighPriority = priority === "high" && isCurrentVariant;
              const isLowPriority = priority === "low" || !isCurrentVariant;

              return (
                <img
                  key={key}
                  ref={(el) => {
                    if (
                      el &&
                      el.complete &&
                      !loadedMap[key] &&
                      !errorMap[key]
                    ) {
                      if (el.naturalWidth > 0) {
                        setLoadedMap((prev) => ({ ...prev, [key]: true }));
                      } else {
                        setErrorMap((prev) => ({ ...prev, [key]: true }));
                      }
                    }
                  }}
                  src={`/images/app-showcase/${screenKey}-${variant}.png`}
                  alt={`LEVL: OutPace Aging ${screenKey.replace("-", " ")} (${variant} mode)`}
                  width={393}
                  height={852}
                  {...(isHighPriority
                    ? { fetchPriority: "high" as const }
                    : isLowPriority
                    ? {
                        fetchPriority: "low" as const,
                        loading: "lazy" as const,
                      }
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

          {/* Layer 2: Real LEVL: OutPace Aging App Chrome + Interactive Screen Preview */}
          {!hasRealScreenshot && (
            <div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden text-left">
              {/* REAL TopStickyHeader.tsx */}
              <div
                className="px-3 py-2 border-b flex items-center justify-between gap-1.5 shrink-0"
                style={{
                  backgroundColor: isDark
                    ? "rgba(6, 9, 19, 0.92)"
                    : "rgba(255, 255, 255, 0.94)",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                {/* Left: LEVL + ● Synced pill */}
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs tracking-tight">
                    LEVL
                  </span>
                  <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[9px] font-mono rounded-full px-1.5 py-0.5 leading-none">
                    ● Synced
                  </span>
                </div>

                {/* Center: Interactive View Selector Dropdown Pill */}
                <div
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold flex items-center gap-1 border ${
                    isDark
                      ? "bg-slate-900/90 border-slate-700/80 text-white"
                      : "bg-slate-100 border-slate-300 text-slate-900"
                  }`}
                >
                  <span>{getHeaderDropdownLabel(screenKey)}</span>
                </div>

                {/* Right: Blue Gradient + Quick Action Button */}
                <div className="w-6 h-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>

              {/* Scrollable Screen Body */}
              <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-2 space-y-2">
                {screenKey === "today-circadian" && (
                  <TodayCircadianPreview
                    isDark={isDark}
                    activePhase={activePhase}
                    checkedItems={checkedItems}
                    onToggleItem={toggleItem}
                    survivalMode8020={
                      xrayConfig?.profileId === "busy-travel" || survivalMode8020
                    }
                    onToggleSurvivalMode={() =>
                      setSurvivalMode8020((prev) => !prev)
                    }
                    xrayConfig={xrayConfig}
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

              {/* REAL 5-Tab Bottom Navigation Bar (BottomNav.tsx): Today | Explore | AI Coach | Insights | Profile */}
              <div
                className="px-2 pt-2 pb-1 border-t flex items-center justify-around text-[9px] shrink-0 backdrop-blur-md"
                style={{
                  backgroundColor: isDark
                    ? "rgba(11, 14, 23, 0.94)"
                    : "rgba(255, 255, 255, 0.95)",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                {[
                  {
                    id: "today",
                    label: "Today",
                    icon: Sun,
                    isActive:
                      screenKey === "today-circadian" ||
                      screenKey === "schedule-grid" ||
                      screenKey === "mastermind-protocols" ||
                      screenKey === "bench-drawer",
                  },
                  {
                    id: "explore",
                    label: "Explore",
                    icon: Compass,
                    isActive: screenKey === "modality-evidence",
                  },
                  {
                    id: "ai-coach",
                    label: "AI Coach",
                    icon: Sparkles,
                    isActive: false,
                  },
                  {
                    id: "insights",
                    label: "Insights",
                    icon: TrendingUp,
                    isActive:
                      screenKey === "longevity-score" ||
                      screenKey === "biomarkers-tracking",
                  },
                  {
                    id: "profile",
                    label: "Profile",
                    icon: User,
                    isActive: false,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <div
                      key={tab.id}
                      className={`flex flex-col items-center gap-0.5 transition-transform ${
                        tab.isActive
                          ? "text-sky-400 font-bold scale-105"
                          : "text-slate-400 font-medium"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* iPhone Home Indicator */}
              <div className="w-24 h-1 rounded-full mx-auto my-1 opacity-30 bg-current shrink-0" />
            </div>
          )}
        </div>
      </div>

      {caption && (
        <p
          className="text-center text-xs font-medium mt-3 tracking-wide"
          style={{ color: isDark ? "#B4B5B8" : "#475569" }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

/* ============================================================================
 * 1. TODAY CIRCADIAN FEED (/today) — Real LEVL: OutPace Aging Feed
 * ============================================================================ */
function TodayCircadianPreview({
  isDark,
  activePhase,
  checkedItems,
  onToggleItem,
  survivalMode8020,
  onToggleSurvivalMode,
  xrayConfig,
}: {
  isDark: boolean;
  activePhase?: CircadianPhaseId;
  checkedItems: Record<string, boolean>;
  onToggleItem: (id: string, e: React.MouseEvent) => void;
  survivalMode8020: boolean;
  onToggleSurvivalMode: () => void;
  xrayConfig?: XRayPhoneSyncConfig;
}) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.88)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const paceValue = xrayConfig ? xrayConfig.paceOfAging : "0.74 DunedinPACE";
  const vectorScoreValue = xrayConfig ? `${xrayConfig.vectorScore}/100` : "89/100";

  return (
    <div className="space-y-2">
      {/* Real Today Feed Header Pills: Pace of Aging + 8-Vector Score Ring + 🛡️ 80/20 Survival Mode */}
      <div className="flex items-center justify-between gap-1">
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-xl border text-[8.5px] font-mono font-bold"
          style={{ backgroundColor: cardBg, borderColor: borderCol }}
        >
          <Gauge className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="text-emerald-400">{paceValue}</span>
        </div>

        <div
          className="flex items-center gap-1 px-2 py-1 rounded-xl border text-[8.5px] font-mono font-bold"
          style={{ backgroundColor: cardBg, borderColor: borderCol }}
        >
          <span className="w-2 h-2 rounded-full border-2 border-sky-400 inline-block" />
          <span className="text-sky-400">8-Vector: {vectorScoreValue}</span>
        </div>

        <button
          type="button"
          onClick={onToggleSurvivalMode}
          className={`px-2 py-1 rounded-xl border text-[8px] font-mono font-bold cursor-pointer transition-all ${
            survivalMode8020
              ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
              : "opacity-80"
          }`}
          style={
            !survivalMode8020
              ? { backgroundColor: cardBg, borderColor: borderCol }
              : undefined
          }
        >
          🛡️ 80/20 Mode
        </button>
      </div>

      {/* Active X-Ray Biology Adaptation Banner (when synced with Famous Protocols × Biology section) */}
      {xrayConfig && (
        <div
          className="p-2 rounded-2xl border space-y-1 animate-fade-in"
          style={{
            backgroundColor: isDark
              ? "rgba(14, 165, 233, 0.12)"
              : "rgba(224, 242, 254, 0.9)",
            borderColor: "rgba(14, 165, 233, 0.4)",
          }}
        >
          <div className="flex items-center justify-between text-[8px] font-mono font-extrabold uppercase tracking-wider text-sky-400">
            <span>⚡ {xrayConfig.protocolName}</span>
            <span>Adapted</span>
          </div>
          <p className="text-[9px] font-bold leading-snug">
            {xrayConfig.adaptationBanner}
          </p>
          <div className="text-[8px] font-mono text-amber-400">
            🛑 {xrayConfig.blockedSummary}
          </div>
        </div>
      )}

      {/* Phase 1: Morning Rise (06:00–10:00) — Morning Sunlight ALWAYS Pinned Task #1 */}
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
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[9.5px] font-bold text-amber-500 uppercase tracking-wider">
              Morning Rise • 06:00–10:00
            </span>
          </div>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 font-bold">
            ☀️ Circadian Anchor #1
          </span>
        </div>

        {/* Task #1: Morning Sunlight Exposure */}
        <div
          onClick={(e) => onToggleItem("sunlight", e)}
          className="p-2 rounded-xl border mb-1.5 cursor-pointer transition-all"
          style={{
            backgroundColor: isDark
              ? "rgba(245, 158, 11, 0.08)"
              : "rgba(254, 243, 199, 0.65)",
            borderColor: "rgba(245, 158, 11, 0.35)",
          }}
        >
          <div className="flex items-start gap-2">
            <CheckCircle2
              className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                checkedItems.sunlight
                  ? "text-emerald-400"
                  : "text-amber-500/50"
              }`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-extrabold leading-tight">
                  Morning Sunlight Exposure
                </p>
                <span className="text-[7.5px] font-mono text-amber-400 font-bold">
                  #1 Task
                </span>
              </div>
              <p className="text-[8.5px] mt-0.5" style={{ color: mutedText }}>
                10,000+ Lux • 10–15 mins Outdoor before screens
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-semibold">
                  10–15 mins
                </span>
                <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-semibold">
                  SCN Phase Lock
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delayed Caffeine */}
        {!survivalMode8020 && (
          <div
            onClick={(e) => onToggleItem("caffeine", e)}
            className="p-1.5 rounded-xl border flex items-center justify-between cursor-pointer"
            style={{ borderColor: borderCol }}
          >
            <div className="flex items-center gap-2">
              <Coffee
                className={`w-3 h-3 ${
                  checkedItems.caffeine ? "text-emerald-400" : "text-amber-500"
                }`}
              />
              <div>
                <p className="text-[9px] font-semibold">
                  Delayed Caffeine Intake
                </p>
                <p className="text-[7.5px]" style={{ color: mutedText }}>
                  90–120m post-wake • Adenosine washout
                </p>
              </div>
            </div>
            <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-slate-500/15">
              08:30 AM
            </span>
          </div>
        )}
      </div>

      {/* Dynamic Upgraded Biology Card OR Standard Daytime & Afternoon Blocks */}
      {xrayConfig ? (
        <div
          className="p-2.5 rounded-2xl border space-y-1.5"
          style={{
            backgroundColor: isDark
              ? "rgba(16, 185, 129, 0.10)"
              : "rgba(209, 250, 229, 0.65)",
            borderColor: "rgba(16, 185, 129, 0.4)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-mono font-extrabold uppercase text-emerald-400">
              ⚡ Upgraded for {xrayConfig.profileLabel}
            </span>
            <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">
              {xrayConfig.upgradedTaskBadge}
            </span>
          </div>
          <p className="text-[10px] font-extrabold">
            {xrayConfig.upgradedTaskTitle}
          </p>
          <p className="text-[8.5px] leading-snug" style={{ color: mutedText }}>
            {xrayConfig.upgradedTaskSub}
          </p>
        </div>
      ) : (
        <>
          {/* Phase 2: Daytime Peak (10:00–14:00) */}
          <div
            className="p-2 rounded-2xl border"
            style={{
              backgroundColor: cardBg,
              borderColor: activePhase === "zenith" ? "#0EA5E9" : borderCol,
            }}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                ☀️ Daytime Peak • 10:00–14:00
              </span>
              <span className="text-[7.5px] font-mono text-emerald-400 font-semibold">
                ✦ Synergy +3.4x
              </span>
            </div>
            <p className="text-[9.5px] font-semibold">
              Creatine 5g + High-Polyphenol EVOO Lipid Matrix
            </p>
          </div>

          {/* Phase 3: Afternoon Dip (14:00–18:00) */}
          <div
            className="p-2 rounded-2xl border space-y-1.5"
            style={{
              backgroundColor: cardBg,
              borderColor: activePhase === "dusk" ? "#6366F1" : borderCol,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">
                ⚡ Afternoon Dip • 14:00–18:00
              </span>
              <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-semibold">
                Hormetic Peak
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
                  <p className="text-[9px] font-bold">
                    Finnish Dry Sauna (174°F+ • 20m)
                  </p>
                  <p className="text-[7.5px]" style={{ color: mutedText }}>
                    HSP70 +3.2x • ≥25% hs-CRP reduction
                  </p>
                </div>
              </div>
              <span className="text-[7.5px] font-mono text-emerald-400 font-bold">
                Tier-1
              </span>
            </div>
          </div>
        </>
      )}

      {/* Phase 4: Evening Wind-Down (18:00–22:00) */}
      <div
        className="p-2 rounded-2xl border"
        style={{
          backgroundColor: cardBg,
          borderColor: activePhase === "night" ? "#A855F7" : borderCol,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[8.5px] font-bold text-purple-400 uppercase tracking-wider">
            🌙 Evening Wind-Down • 18:00–22:00
          </span>
          <span className="text-[7.5px] font-mono text-purple-400">
            Mg L-Threonate + 3g Glycine
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
  const cardBg = isDark ? "rgba(11, 14, 23, 0.88)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const vectors = [
    { name: "Heart Health", score: 94, tier: "Tier-1 Anchor", pathway: "eNOS • VO2" },
    { name: "Brain Longevity", score: 91, tier: "Tier-1 Anchor", pathway: "BDNF • Glymphatic" },
    { name: "Metabolic Health", score: 89, tier: "Tier-1 Anchor", pathway: "AMPK • GLUT4" },
    { name: "Chronic Inflammation", score: 92, tier: "Tier-1 Anchor", pathway: "Nrf2 • NF-κB↓" },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            8-VECTOR BIOLOGICAL SCORE
          </span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-extrabold tracking-tight text-emerald-400">
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
        className="p-2 rounded-2xl border flex flex-col items-center relative"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <svg viewBox="0 0 200 160" className="w-full h-[134px] overflow-visible">
          {[58, 43, 28, 14].map((r, idx) => {
            const pts = Array.from({ length: 8 })
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
                return `${100 + r * Math.cos(angle)},${80 + r * Math.sin(angle)}`;
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
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
            return (
              <line
                key={i}
                x1="100"
                y1="80"
                x2={100 + 58 * Math.cos(angle)}
                y2={80 + 58 * Math.sin(angle)}
                stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}
                strokeWidth="1"
              />
            );
          })}
          <polygon
            points="100,24 138,42 152,80 136,118 100,134 62,117 48,80 64,43"
            fill={isDark ? "rgba(14, 165, 233, 0.24)" : "rgba(2, 132, 199, 0.20)"}
            stroke="#0ea5e9"
            strokeWidth="2"
          />
          <text x="100" y="14" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="700">
            Heart (94)
          </text>
          <text x="162" y="40" textAnchor="start" fill="currentColor" fontSize="7" fontWeight="600">
            Brain (91)
          </text>
          <text x="160" y="83" textAnchor="start" fill="currentColor" fontSize="7" fontWeight="600">
            Metabolic
          </text>
          <text x="148" y="130" textAnchor="start" fill="currentColor" fontSize="7" fontWeight="600">
            Inflammation
          </text>
          <text x="100" y="150" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="600">
            Cellular (90)
          </text>
          <text x="50" y="130" textAnchor="end" fill="currentColor" fontSize="7" fontWeight="600">
            Hormones
          </text>
          <text x="40" y="83" textAnchor="end" fill="currentColor" fontSize="7" fontWeight="600">
            Cancer Def
          </text>
          <text x="46" y="40" textAnchor="end" fill="currentColor" fontSize="7" fontWeight="600">
            Bone (82)
          </text>
        </svg>
      </div>

      {/* Vector Breakdown List */}
      <div className="space-y-1.5">
        {vectors.map((v) => {
          const isHighlighted = activeVector && v.name.includes(activeVector);
          return (
            <div
              key={v.name}
              className="p-2 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: isHighlighted
                  ? isDark
                    ? "rgba(14,165,233,0.14)"
                    : "rgba(2,132,199,0.1)"
                  : cardBg,
                borderColor: isHighlighted ? "#0ea5e9" : borderCol,
              }}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-bold">{v.name}</span>
                  <span className="text-[7.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-semibold">
                    {v.tier}
                  </span>
                </div>
                <span className="text-[8px] font-mono" style={{ color: mutedText }}>
                  Pathways: {v.pathway}
                </span>
              </div>
              <span className="text-xs font-mono font-extrabold text-sky-400">
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
  const cardBg = isDark ? "rgba(11, 14, 23, 0.88)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const cadenceRows = [
    {
      name: "Morning Sunlight (15m)",
      phase: "Dawn #1",
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
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-sky-400 font-bold block">
            7-DAY CIRCADIAN CADENCE
          </span>
          <h4 className="text-xs font-bold">Pulsed Interventions &amp; Rest Days</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          🛡️ 80/20 Ready
        </span>
      </div>

      <div
        className="p-2.5 rounded-2xl border space-y-2"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div
          className="grid grid-cols-12 items-center text-[8px] font-mono pb-1 border-b"
          style={{ borderColor: borderCol }}
        >
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
                {row.phase}
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
              <span className="text-[7.5px] font-mono font-bold text-emerald-400">
                {row.freq}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-2.5 rounded-2xl border"
        style={{
          backgroundColor: isDark
            ? "rgba(99, 102, 241, 0.1)"
            : "rgba(238, 242, 255, 0.9)",
          borderColor: "rgba(99, 102, 241, 0.3)",
        }}
      >
        <p className="text-[8.5px]" style={{ color: mutedText }}>
          <strong className="text-indigo-400">Auto-Separated:</strong> Cold Plunge
          scheduled away from Mon/Wed/Sat hypertrophy days to protect{" "}
          <span className="font-mono font-bold">mTORC1</span>.
        </p>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. MODALITY EVIDENCE MODAL (/explore)
 * ============================================================================ */
function ModalityEvidencePreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.95)";
  const borderCol = isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
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

        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
            <span className="text-[7.5px] font-mono uppercase text-emerald-400 block">
              VO2 Max Delta
            </span>
            <span className="text-xs font-extrabold text-emerald-400">
              +15–20%
            </span>
          </div>
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/25">
            <span className="text-[7.5px] font-mono uppercase text-sky-400 block">
              Inflammation
            </span>
            <span className="text-xs font-extrabold text-sky-400">
              ≥25% hs-CRP↓
            </span>
          </div>
        </div>

        <div>
          <span
            className="text-[8px] font-mono uppercase tracking-wider block mb-1"
            style={{ color: mutedText }}
          >
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

        <div className="space-y-1 pt-0.5">
          <div className="p-1.5 rounded-lg bg-slate-500/10 flex items-center justify-between text-[8px] font-mono">
            <span className="truncate">
              PMID: 25705824 • Laukkanen JAMA Intern Med
            </span>
            <ExternalLink className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 5. FAMOUS PROTOCOLS (/protocols)
 * ============================================================================ */
function MastermindProtocolsPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.88)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const stacks = [
    {
      title: "Bryan Johnson — Blueprint 2026",
      badge: "0.69 Pace • 24 Modalities",
      focus: "Adapted to your sleep, labs & lifting schedule",
      color: "text-emerald-400",
      enrolled: true,
    },
    {
      title: "Andrew Huberman — Neuro-Circadian",
      badge: "Circadian • 14 Modalities",
      focus: "Morning Lux #1, Delayed Caffeine, NSDR, Sleep Stack",
      color: "text-amber-400",
      enrolled: false,
    },
    {
      title: "Peter Attia — Outlive Medicine 3.0",
      badge: "Centenarian • 12 Modalities",
      focus: "Zone 2 (4x/wk), Norwegian 4x4, Heavy Carries, ApoB",
      color: "text-sky-400",
      enrolled: false,
    },
    {
      title: "Rhonda Patrick — FoundMyFitness",
      badge: "Hormetic • 16 Modalities",
      focus: "Finnish Sauna 174°F+, Sulforaphane, Omega-3 Index",
      color: "text-indigo-400",
      enrolled: false,
    },
  ];

  return (
    <div className="space-y-2">
      {stacks.map((s) => (
        <div
          key={s.title}
          className="p-2.5 rounded-2xl border space-y-1"
          style={{ backgroundColor: cardBg, borderColor: borderCol }}
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
              {s.enrolled ? "✓ Personalized" : "+ Adapt"}
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
  const cardBg = isDark ? "rgba(11, 14, 23, 0.88)" : "rgba(255, 255, 255, 0.94)";
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
            <span className="text-[7.5px] font-mono text-emerald-400 font-bold">
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
  );
}

/* ============================================================================
 * 7. BENCH DRAWER & CLASH AUDIT (/bench)
 * ============================================================================ */
function BenchDrawerPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.88)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{
          backgroundColor: isDark
            ? "rgba(245, 158, 11, 0.08)"
            : "rgba(254, 243, 199, 0.7)",
          borderColor: "rgba(245, 158, 11, 0.35)",
        }}
      >
        <div className="flex items-center gap-1.5 text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[9px] font-extrabold uppercase tracking-wider">
            Antagonistic Clash Guard
          </span>
        </div>
        <p className="text-[8.5px] leading-snug">
          <strong>Cold Plunge (50°F)</strong> or <strong>Metformin</strong> within 4h of Heavy Resistance blunts{" "}
          <span className="font-mono font-bold">mTORC1 / IGF-1</span> hypertrophy signaling by 24%.
        </p>
        <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-[8px] font-mono text-emerald-400 font-bold">
          <span>✓ Auto-Moved to Rest Day / Dawn</span>
          <span>Saved +mTORC1</span>
        </div>
      </div>

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
