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
  ExternalLink,
  Coffee,
  Plus,
  Gauge,
  Wind,
  Timer,
  Syringe,
  HeartPulse,
  Brain,
  Bot,
} from "lucide-react";

export type ShowcaseScreenKey =
  | "today-circadian"
  | "longevity-score"
  | "schedule-grid"
  | "modality-evidence"
  | "mastermind-protocols"
  | "biomarkers-tracking"
  | "bench-drawer"
  // Section 3: Modality-Specific Interactive Applets (6 screens)
  | "applet-breathwork"
  | "applet-fasting"
  | "applet-thermal"
  | "applet-sunlight"
  | "applet-hiit"
  | "applet-peptide"
  // Section 4: Core Intelligence & N-of-1 Discovery Engine (6 screens; uses longevity-score for #2)
  | "intel-outcomes"
  | "intel-bio-age"
  | "intel-emotions"
  | "intel-hallmarks"
  | "intel-ai-coach";

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
    case "applet-breathwork":
    case "applet-fasting":
    case "applet-thermal":
    case "applet-sunlight":
    case "applet-hiit":
    case "applet-peptide":
    case "mastermind-protocols":
    case "bench-drawer":
      return "🕐 Time Blocks ▾";
    case "longevity-score":
      return "⚡ Longevity Score ▾";
    case "schedule-grid":
      return "📅 7-Day Week ▾";
    case "intel-bio-age":
      return "🧬 Bio Age ▾";
    case "intel-ai-coach":
      return "✨ AI Coach ▾";
    case "intel-outcomes":
    case "intel-emotions":
    case "intel-hallmarks":
    case "biomarkers-tracking":
    case "modality-evidence":
      return "📈 Insights ▾";
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
  const isLight = !isDark;
  const currentImgKey = `${screenKey}-${theme}`;

  // Static PNG only applies if not using interactive applet/intelligence/xray screens and PNG actually loaded
  const isCustomInteractiveScreen =
    Boolean(xrayConfig) ||
    screenKey === "today-circadian" ||
    screenKey === "longevity-score" ||
    screenKey.startsWith("applet-") ||
    screenKey.startsWith("intel-");

  const hasRealScreenshot =
    !isCustomInteractiveScreen &&
    loadedMap[currentImgKey] &&
    !errorMap[currentImgKey];

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
                  : "w-[78%] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
              }`}
            />
          </div>

          {/* Top iOS Status Bar + Clean Hardware Dynamic Island (No duplicate LEVL text) */}
          <div className="relative z-30 flex items-center justify-between px-6 pt-2 pb-1.5 text-[10px] font-semibold tracking-tight shrink-0">
            <span className="tabular-nums opacity-85">9:41</span>
            <div
              aria-hidden="true"
              className="w-[84px] h-[20px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-[#0b0f19] border border-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#0f172a] border border-sky-500/20" />
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

          {/* Layer 1: Optional Static Screenshot Loader */}
          {!isCustomInteractiveScreen &&
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
              {/* REAL TopStickyHeader.tsx with Actual /images/levl-logo.png */}
              <div
                className="px-3 py-2 border-b flex items-center justify-between gap-1.5 shrink-0"
                style={{
                  backgroundColor: isDark
                    ? "rgba(6, 9, 19, 0.94)"
                    : "rgba(255, 255, 255, 0.96)",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                {/* Left: Actual /images/levl-logo.png + ● Synced pill */}
                <div className="flex items-center gap-1.5">
                  <img
                    src="/images/levl-logo.png"
                    alt="LEVL"
                    className={`h-4 w-auto object-contain ${
                      isLight ? "invert brightness-0" : ""
                    }`}
                  />
                  <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[8.5px] font-mono rounded-full px-1.5 py-0.5 leading-none">
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

                {/* Section 3: 6 Modality-Specific Interactive Applet Screens */}
                {screenKey === "applet-breathwork" && (
                  <AppletBreathworkPreview isDark={isDark} />
                )}
                {screenKey === "applet-fasting" && (
                  <AppletFastingPreview isDark={isDark} />
                )}
                {screenKey === "applet-thermal" && (
                  <AppletThermalPreview isDark={isDark} />
                )}
                {screenKey === "applet-sunlight" && (
                  <AppletSunlightPreview isDark={isDark} />
                )}
                {screenKey === "applet-hiit" && (
                  <AppletHiitPreview isDark={isDark} />
                )}
                {screenKey === "applet-peptide" && (
                  <AppletPeptidePreview isDark={isDark} />
                )}

                {/* Section 4: Core Intelligence Screens */}
                {screenKey === "intel-outcomes" && (
                  <IntelOutcomesPreview isDark={isDark} />
                )}
                {screenKey === "intel-bio-age" && (
                  <IntelBioAgePreview isDark={isDark} />
                )}
                {screenKey === "intel-emotions" && (
                  <IntelEmotionsPreview isDark={isDark} />
                )}
                {screenKey === "intel-hallmarks" && (
                  <IntelHallmarksPreview isDark={isDark} />
                )}
                {screenKey === "intel-ai-coach" && (
                  <IntelAiCoachPreview isDark={isDark} />
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
                      screenKey === "bench-drawer" ||
                      screenKey === "intel-emotions" ||
                      screenKey.startsWith("applet-"),
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
                    isActive: screenKey === "intel-ai-coach",
                  },
                  {
                    id: "insights",
                    label: "Insights",
                    icon: TrendingUp,
                    isActive:
                      screenKey === "longevity-score" ||
                      screenKey === "biomarkers-tracking" ||
                      screenKey === "intel-outcomes" ||
                      screenKey === "intel-bio-age" ||
                      screenKey === "intel-hallmarks",
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
 * 1. TODAY CIRCADIAN FEED (/today) — Prominent Daily Longevity Score Hero Strip
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

  const paceValue = xrayConfig ? xrayConfig.paceOfAging : "0.72 DunedinPACE";
  const dailyScore = xrayConfig ? xrayConfig.vectorScore : 89;

  return (
    <div className="space-y-2">
      {/* PROMINENT DAILY LONGEVITY SCORE HERO STRIP (DailyTopStatusStrip.tsx) */}
      <div
        className="p-2.5 rounded-2xl border relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(14, 165, 233, 0.12) 100%)"
            : "linear-gradient(135deg, rgba(209, 250, 229, 0.85) 0%, rgba(224, 242, 254, 0.85) 100%)",
          borderColor: isDark
            ? "rgba(16, 185, 129, 0.4)"
            : "rgba(13, 148, 136, 0.35)",
        }}
      >
        <div className="flex items-center justify-between gap-1.5">
          {/* Left: Large Glowing Longevity Score Badge */}
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[8px] font-mono font-extrabold uppercase tracking-wider text-emerald-400">
                🏆 LONGEVITY SCORE
              </span>
              <span className="px-1.5 py-0.2 rounded-full text-[7.5px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                +4 Surplus
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-black font-mono text-emerald-400 leading-none">
                {dailyScore}
              </span>
              <span
                className="text-[9px] font-mono font-bold"
                style={{ color: mutedText }}
              >
                / 94 Ceiling
              </span>
            </div>
          </div>

          {/* Right: 0.72 DunedinPACE + 28d Pace + Check-in */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-500/15 border border-sky-500/30 text-[8px] font-mono font-bold text-sky-400">
              <Gauge className="w-2.5 h-2.5 shrink-0" />
              <span>{paceValue}</span>
            </div>
            <div className="flex items-center gap-1 text-[7.5px] font-mono font-bold">
              <span className="px-1.5 py-0.2 rounded bg-slate-500/15">
                28d Pace: 91/99
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400">
                ☀️ Check-in ✓
              </span>
            </div>
          </div>
        </div>

        {/* Sub-strip: Quick 80/20 Mode Toggle */}
        <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-white/10 text-[7.5px] font-mono">
          <span style={{ color: mutedText }}>
            8/8 Vectors Active • Top 6% Peer Pace
          </span>
          <button
            type="button"
            onClick={onToggleSurvivalMode}
            className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all ${
              survivalMode8020
                ? "bg-amber-500/25 text-amber-400 border border-amber-500/40"
                : "bg-slate-500/15 opacity-85"
            }`}
          >
            🛡️ 80/20 Mode
          </button>
        </div>
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
            <span>Personalized</span>
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
              ☀️ Morning Rise • 06:00–10:00
            </span>
          </div>
          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 font-bold">
            Task #1 Anchor
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
                10,000+ Lux • 10–15m Outdoor before screens
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
 * 2. LONGEVITY SCORE & 8-VECTOR RADAR (/longevity-score) — Prominent Dial & 6 Pillars
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

  const pillars = [
    { label: "Sleep", val: "24/25", pct: 96, color: "bg-indigo-400" },
    { label: "Bio-Opt", val: "19/20", pct: 95, color: "bg-emerald-400" },
    { label: "Nutrition", val: "16/18", pct: 89, color: "bg-sky-400" },
    { label: "Movement", val: "16/17", pct: 94, color: "bg-teal-400" },
    { label: "Autonomic", val: "11/12", pct: 92, color: "bg-purple-400" },
    { label: "Avoidance", val: "8/8", pct: 100, color: "bg-amber-400" },
  ];

  return (
    <div className="space-y-2">
      {/* Prominent Longevity Score Dial & Pillar Card */}
      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(14, 165, 233, 0.12) 100%)"
            : "linear-gradient(135deg, rgba(209, 250, 229, 0.85) 0%, rgba(224, 242, 254, 0.85) 100%)",
          borderColor: isDark
            ? "rgba(16, 185, 129, 0.4)"
            : "rgba(13, 148, 136, 0.35)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold block">
              🏆 DAILY LONGEVITY SCORE
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-black font-mono tracking-tight text-emerald-400 leading-none">
                89 / 94
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[7.5px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                +4 pts Surplus Active
              </span>
            </div>
            <span
              className="text-[8px] font-mono block mt-1"
              style={{ color: mutedText }}
            >
              Daily Pace vs. Protocol Ceiling • Top 6% Peer Pace
            </span>
          </div>

          <div className="text-right">
            <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30 block">
              91/99 28d Pace
            </span>
            <span className="text-[7.5px] font-mono text-emerald-400 font-bold mt-1 block">
              0.72 DunedinPACE
            </span>
          </div>
        </div>
      </div>

      {/* 8-Vector Biological Radar Octagon */}
      <div
        className="p-2 rounded-2xl border flex flex-col items-center relative"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <svg viewBox="0 0 200 148" className="w-full h-[120px] overflow-visible">
          {[52, 39, 26, 13].map((r, idx) => {
            const pts = Array.from({ length: 8 })
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
                return `${100 + r * Math.cos(angle)},${74 + r * Math.sin(angle)}`;
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
                y1="74"
                x2={100 + 52 * Math.cos(angle)}
                y2={74 + 52 * Math.sin(angle)}
                stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"}
                strokeWidth="1"
              />
            );
          })}
          <polygon
            points="100,24 134,40 147,74 133,108 100,122 66,107 53,74 68,41"
            fill={isDark ? "rgba(14, 165, 233, 0.24)" : "rgba(2, 132, 199, 0.20)"}
            stroke="#0ea5e9"
            strokeWidth="2"
          />
          <text x="100" y="15" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700">
            Heart 94
          </text>
          <text x="155" y="38" textAnchor="start" fill="currentColor" fontSize="6.8" fontWeight="600">
            Brain 91
          </text>
          <text x="154" y="77" textAnchor="start" fill="currentColor" fontSize="6.8" fontWeight="600">
            Metabolic 89
          </text>
          <text x="144" y="120" textAnchor="start" fill="currentColor" fontSize="6.8" fontWeight="600">
            Inflammation 92
          </text>
          <text x="100" y="138" textAnchor="middle" fill="currentColor" fontSize="6.8" fontWeight="600">
            Cellular 90
          </text>
          <text x="54" y="120" textAnchor="end" fill="currentColor" fontSize="6.8" fontWeight="600">
            Hormones 86
          </text>
          <text x="46" y="77" textAnchor="end" fill="currentColor" fontSize="6.8" fontWeight="600">
            Cancer Def 84
          </text>
          <text x="50" y="38" textAnchor="end" fill="currentColor" fontSize="6.8" fontWeight="600">
            Bone 82
          </text>
        </svg>
        {activeVector && (
          <div className="text-[7.5px] font-mono text-sky-400 font-bold">
            Active Vector Focus: {activeVector}
          </div>
        )}
      </div>

      {/* 6 Foundational Pillars Progress Bars */}
      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between text-[8px] font-mono font-bold uppercase">
          <span style={{ color: mutedText }}>6 Foundational Pillars</span>
          <span className="text-emerald-400">+Pillar Score Boosters</span>
        </div>
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5">
          {pillars.map((p) => (
            <div key={p.label} className="space-y-0.5">
              <div className="flex items-center justify-between text-[8px] font-mono">
                <span className="font-bold">{p.label}</span>
                <span className="text-sky-400 font-bold">{p.val}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-500/20 overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.color}`}
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * SECTION 3 SCREENS: 6 MODALITY-SPECIFIC INTERACTIVE APPLETS
 * ============================================================================ */

/* Applet 1: Guided Breathwork Visuals (Cyclic Sighing • Box • 4-7-8) */
function AppletBreathworkPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2.5">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-sky-400 font-bold block">
            STANFORD RCT AUTONOMIC APPLET
          </span>
          <h4 className="text-xs font-extrabold">Cyclic Physiological Sigh</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
          ♫ 432Hz Audio Active
        </span>
      </div>

      {/* Concentric Glowing Breathing Sphere */}
      <div
        className="p-4 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="relative w-36 h-36 flex items-center justify-center my-1">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 via-sky-500/25 to-purple-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-sky-400/40 bg-gradient-to-br from-sky-500/20 via-emerald-500/20 to-purple-500/25" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/30 via-sky-500/40 to-indigo-600/40 border border-emerald-400/60 flex flex-col items-center justify-center text-center p-2 shadow-lg">
            <Wind className="w-4 h-4 text-emerald-300 mb-0.5" />
            <span className="text-[8.5px] font-mono font-black uppercase tracking-wider text-white leading-tight">
              DOUBLE INHALE...
            </span>
            <span className="text-[10px] font-mono font-extrabold text-emerald-300 mt-0.5">
              HOLD • 3.5s
            </span>
          </div>
        </div>

        <div className="text-[9px] font-mono font-bold text-sky-400 mt-1">
          Cycle 14 of 35 • 02:18 remaining
        </div>

        {/* Mode Switcher Pills */}
        <div className="flex items-center gap-1 mt-2">
          {["Cyclic Sighing", "Box 4-4-4-4", "4-7-8 Sleep"].map((m, i) => (
            <span
              key={m}
              className={`px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold ${
                i === 0
                  ? "bg-sky-500 text-slate-950"
                  : "bg-slate-500/15 opacity-75"
              }`}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Pre/Post Autonomic Stress Delta */}
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase block" style={{ color: mutedText }}>
            Autonomic Stress Delta
          </span>
          <span className="text-[10px] font-extrabold text-emerald-400">
            Stress: 7 → 3 (-57% Sympathetic Load)
          </span>
        </div>
        <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
          +Vagal Tone
        </span>
      </div>
    </div>
  );
}

/* Applet 2: 360° Fasting & Autophagy Companion (Metabolic Stage Tracker) */
function AppletFastingPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            360° FASTING &amp; AUTOPHAGY COMPANION
          </span>
          <h4 className="text-xs font-extrabold">Metabolic Stage Tracker</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          GKI: 1.8
        </span>
      </div>

      {/* Circular Multi-Stage Metabolic Ring */}
      <div
        className="p-3 rounded-2xl border flex flex-col items-center text-center"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="relative w-32 h-32 rounded-full border-4 border-emerald-500/30 flex flex-col items-center justify-center p-2 shadow-inner">
          <div className="text-[8px] font-mono uppercase text-emerald-400 font-bold">
            92% of 18h Fast
          </div>
          <div className="text-base font-black font-mono tracking-tight mt-0.5">
            16h 42m
          </div>
          <div className="text-[7.5px] font-mono" style={{ color: mutedText }}>
            Elapsed • 01h 18m left
          </div>
        </div>

        <div className="mt-2 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[8.5px] font-mono font-bold text-emerald-400">
          🧬 Stage 4: Cellular Autophagy (mTORC1 Suppressed • ULK1 Active)
        </div>
      </div>

      {/* GKI & Next Stage */}
      <div
        className="p-2.5 rounded-2xl border space-y-1"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between text-[8.5px] font-mono">
          <span className="font-bold text-sky-400">
            GKI: 1.8 (Deep Therapeutic Ketosis)
          </span>
          <span className="text-amber-400 font-bold">Next: 18h Mitophagy</span>
        </div>
        <p className="text-[8px]" style={{ color: mutedText }}>
          Glucose 76 mg/dL • BHB Ketones 2.3 mmol/L • AMPK + SIRT1 Elevated
        </p>
      </div>
    </div>
  );
}

/* Applet 3: Cold Plunge & Sauna Thermal Pacer (Søberg & HSP70 Timer) */
function AppletThermalPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
            THERMAL CONTRAST PACER
          </span>
          <h4 className="text-xs font-extrabold">Cold Plunge &amp; Sauna Timer</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
          52°F / 11°C
        </span>
      </div>

      {/* Icy Cyan Timer Ring */}
      <div
        className="p-3.5 rounded-2xl border flex flex-col items-center text-center"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="w-32 h-32 rounded-full border-4 border-cyan-400/60 bg-cyan-500/10 flex flex-col items-center justify-center p-2">
          <Snowflake className="w-4 h-4 text-cyan-300 mb-0.5" />
          <span className="text-base font-black font-mono text-cyan-300">
            02:15 / 03:00
          </span>
          <span className="text-[8px] font-mono font-bold text-white/80">
            52°F (11°C) Immersion
          </span>
        </div>

        <div className="mt-2 px-2.5 py-1 rounded-xl bg-sky-500/15 border border-sky-500/30 text-[8.5px] font-mono font-bold text-sky-400">
          ⚡ +250% Sustained Norepinephrine &amp; Dopamine
        </div>
      </div>

      {/* Søberg Natural Warm-Up Armed Toggle */}
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[9px] font-extrabold text-emerald-400 block">
            ✓ Søberg Natural Warm-Up Armed
          </span>
          <span className="text-[7.5px] font-mono" style={{ color: mutedText }}>
            Weekly: 9/11m Cold • 60/80m Sauna (174°F+)
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[7.5px] font-mono font-bold">
          UCP1 Active
        </span>
      </div>
    </div>
  );
}

/* Applet 4: Morning Sunlight & Live UV/Lux Session (Circadian Phase Lock) */
function AppletSunlightPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
            SOLAR PHOTON &amp; LUX PACER
          </span>
          <h4 className="text-xs font-extrabold">Morning Sunlight Session</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
          Task #1 Anchor
        </span>
      </div>

      {/* Golden Solar Dial */}
      <div
        className="p-3.5 rounded-2xl border flex flex-col items-center text-center"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="w-32 h-32 rounded-full border-4 border-amber-400/70 bg-amber-500/10 flex flex-col items-center justify-center p-2">
          <Sun className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-base font-black font-mono text-amber-400">
            08:40 / 10:00
          </span>
          <span className="text-[8px] font-mono font-bold">mins outdoor</span>
        </div>

        <div className="mt-2 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-[8.5px] font-mono font-bold text-amber-400">
          ☀️ Clear Sky • ~18,500 Lux • UV Index 2.4
        </div>
      </div>

      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[9px] font-extrabold text-emerald-400 block">
            ✓ SCN Circadian Phase Locked
          </span>
          <span className="text-[7.5px] font-mono" style={{ color: mutedText }}>
            16h Melatonin Timer Armed for 21:45 DLMO
          </span>
        </div>
        <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
          ipRGC Lock
        </span>
      </div>
    </div>
  );
}

/* Applet 5: Live HIIT, Zone 2 & Strength Companion (VO2 Max & BFR Pacer) */
function AppletHiitPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-rose-400 font-bold block">
            NORWEGIAN 4x4 HIIT PACER
          </span>
          <h4 className="text-xs font-extrabold">VO2 Max Peak Interval</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
          Interval 3 of 4
        </span>
      </div>

      <div
        className="p-3 rounded-2xl border space-y-2 text-center"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="text-[9px] font-mono font-bold text-sky-400">
          Interval 3 of 4 • 03:12 Remaining
        </div>
        <div className="text-2xl font-black font-mono text-rose-400">
          🔥 172 BPM
        </div>
        <div className="px-2 py-1 rounded-xl bg-rose-500/15 border border-rose-500/30 text-[8.5px] font-mono font-bold text-rose-400">
          91% Max HR — VO2 Max Peak Zone (85–95%)
        </div>

        {/* 4 Interval Split Bars */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[
            { label: "Int 1", status: "Done • 170" },
            { label: "Int 2", status: "Done • 173" },
            { label: "Int 3", status: "Active • 172" },
            { label: "Int 4", status: "Up Next" },
          ].map((b, i) => (
            <div
              key={b.label}
              className={`p-1.5 rounded-lg border text-[7.5px] font-mono ${
                i === 2
                  ? "bg-rose-500/20 border-rose-500 text-rose-300 font-bold"
                  : i < 2
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-500/10 border-white/10 opacity-60"
              }`}
            >
              <div>{b.label}</div>
              <div className="mt-0.5">{b.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between text-[8px] font-mono"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <span style={{ color: mutedText }}>
          Weekly Zone 2 Base: 165 / 180 mins
        </span>
        <span className="text-emerald-400 font-bold">+PGC-1α • Stroke Vol</span>
      </div>
    </div>
  );
}

/* Applet 6: Peptide Reconstitution & Site Rotation (Precision SubQ Companion) */
function AppletPeptidePreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-teal-400 font-bold block">
            PRECISION SUBQ COMPANION
          </span>
          <h4 className="text-xs font-extrabold">
            Peptide Reconstitution &amp; Rotation
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
          U-100 Syringe
        </span>
      </div>

      {/* Dilution & Visual Syringe Barrel */}
      <div
        className="p-2.5 rounded-2xl border space-y-2"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <p className="text-[8.5px] font-mono font-bold leading-snug text-sky-400">
          BPC-157 • 5mg Vial + 2.0mL BAC Water → Target 250mcg = Draw to 10 Units
        </p>

        {/* Visual U-100 Syringe Barrel Highlighted at 10 IU */}
        <div className="p-2 rounded-xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-[7.5px] font-mono text-emerald-400 font-bold">
            <span>Draw Line: 10 IU (0.10 mL)</span>
            <span>2,500 mcg/mL Conc.</span>
          </div>
          <div className="w-full h-4 rounded-md bg-slate-800 border border-slate-600 relative overflow-hidden flex items-center">
            <div className="w-[22%] h-full bg-gradient-to-r from-emerald-400 to-sky-400" />
            <div className="absolute inset-0 flex justify-between px-1.5 items-center text-[6.5px] font-mono text-white/75">
              <span>0</span>
              <span className="font-black text-white">10 IU</span>
              <span>20</span>
              <span>30</span>
              <span>50</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Zone Abdomen/Thigh Rotation Map */}
      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between text-[8px] font-mono">
          <span className="font-bold">8-Zone SubQ Rotation Map</span>
          <span className="text-emerald-400 font-bold">Rested 7d</span>
        </div>
        <div className="grid grid-cols-4 gap-1 text-[7.5px] font-mono text-center">
          {["UL Abd", "UR Abd", "LL Abd", "LR Abd ★"].map((z, i) => (
            <div
              key={z}
              className={`py-1 rounded border ${
                i === 3
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold"
                  : "bg-slate-500/10 border-white/10 opacity-70"
              }`}
            >
              {z}
            </div>
          ))}
        </div>
        <div className="text-[8px] font-mono font-bold text-emerald-400">
          Next Site: Lower Right Quadrant (Rested 7d)
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * SECTION 4 SCREENS: CORE INTELLIGENCE & N-OF-1 DISCOVERY ENGINE
 * ============================================================================ */

/* Intel 1: Outcome ROI & Attribution (/tracking) */
function IntelOutcomesPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const correlations = [
    {
      title: "🔥 Finnish Sauna (174°F+)",
      outcome: "+28% Deep Sleep & -14% Stress",
      conf: "96% N-of-1 Match",
    },
    {
      title: "☀️ Morning Sunlight (15m)",
      outcome: "+34% Morning Alertness",
      conf: "94% N-of-1 Match",
    },
    {
      title: "🚶 Post-Meal Walk (15m)",
      outcome: "+22% Afternoon Focus",
      conf: "91% N-of-1 Match",
    },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(14, 165, 233, 0.12))"
            : "linear-gradient(135deg, rgba(209, 250, 229, 0.8), rgba(224, 242, 254, 0.8))",
          borderColor: "rgba(16, 185, 129, 0.4)",
        }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
            OUTCOME ROI &amp; ATTRIBUTION (/tracking)
          </span>
          <div className="text-sm font-black font-mono text-emerald-400">
            Realized Protocol ROI: 91%
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
          28d Verified
        </span>
      </div>

      <div className="space-y-1.5">
        {correlations.map((c) => (
          <div
            key={c.title}
            className="p-2 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: cardBg, borderColor: borderCol }}
          >
            <div>
              <p className="text-[9px] font-extrabold">{c.title}</p>
              <p className="text-[8.5px] font-mono text-emerald-400 font-bold">
                → {c.outcome}
              </p>
            </div>
            <span
              className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 font-semibold"
            >
              {c.conf}
            </span>
          </div>
        ))}
      </div>

      {/* Low-ROI Leak Detected */}
      <div
        className="p-2 rounded-2xl border space-y-1"
        style={{
          backgroundColor: isDark
            ? "rgba(245, 158, 11, 0.1)"
            : "rgba(254, 243, 199, 0.75)",
          borderColor: "rgba(245, 158, 11, 0.4)",
        }}
      >
        <div className="flex items-center justify-between text-[8px] font-mono font-bold text-amber-400">
          <span>⚠️ Low-ROI Leak Detected</span>
          <span>Save $64/mo</span>
        </div>
        <p className="text-[8px]" style={{ color: mutedText }}>
          Ashwagandha PM showed 0% HRV or Deep Sleep delta over 28d → Tap to bench.
        </p>
      </div>
    </div>
  );
}

/* Intel 3: Physiological Age Testing (Calico UK Biobank Model) */
function IntelBioAgePreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const mutedText = isDark ? "#9CA3AF" : "#475569";

  const tests = [
    { name: "Single-Leg Balance", val: "42s (Eyes Closed)", badge: "26 yr eq" },
    { name: "Reaction Time", val: "218ms Visual", badge: "28 yr eq" },
    { name: "VO2 Max", val: "54 mL/kg/min", badge: "Top 2%" },
    { name: "Systolic BP", val: "112 mmHg", badge: "Optimal" },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border space-y-1"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(14, 165, 233, 0.12))"
            : "linear-gradient(135deg, rgba(209, 250, 229, 0.85), rgba(224, 242, 254, 0.85))",
          borderColor: "rgba(16, 185, 129, 0.4)",
        }}
      >
        <div className="flex items-center justify-between text-[8px] font-mono font-bold">
          <span className="text-sky-400">CALICO-INFORMED PLS MODEL</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-extrabold">
            ΔAge: -6.6 yrs
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <span className="text-[8px] font-mono block" style={{ color: mutedText }}>
              Calculated Physiological Age
            </span>
            <span className="text-xl font-black font-mono text-emerald-400">
              29.4 years
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] font-mono block" style={{ color: mutedText }}>
              Chronological Age
            </span>
            <span className="text-sm font-bold font-mono">36.0 yrs</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {tests.map((t) => (
          <div
            key={t.name}
            className="p-2 rounded-xl border"
            style={{ backgroundColor: cardBg, borderColor: borderCol }}
          >
            <span className="text-[7.5px] font-mono block" style={{ color: mutedText }}>
              {t.name}
            </span>
            <span className="text-[9.5px] font-extrabold block mt-0.5">
              {t.val}
            </span>
            <span className="text-[7.5px] font-mono text-emerald-400 font-bold">
              {t.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Intel 4: 144-Emotion & Circadian Wellbeing Check-in */
function IntelEmotionsPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";

  const bubbles = [
    { label: "Locked-In", color: "bg-emerald-500 text-slate-950 font-black scale-105" },
    { label: "Energized", color: "bg-amber-500/20 text-amber-400 border border-amber-500/40" },
    { label: "Focused", color: "bg-sky-500/20 text-sky-400 border border-sky-500/40" },
    { label: "Restored", color: "bg-emerald-500/25 text-emerald-300 border border-emerald-400" },
    { label: "Grounded", color: "bg-teal-500/20 text-teal-300 border border-teal-500/40" },
    { label: "Calm", color: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" },
    { label: "Wired", color: "bg-rose-500/15 text-rose-400 border border-rose-500/30 opacity-65" },
    { label: "Depleted", color: "bg-purple-500/15 text-purple-400 border border-purple-500/30 opacity-65" },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
            144-EMOTION AUTONOMIC CHECK-IN
          </span>
          <h4 className="text-xs font-extrabold">2D Neurotransmitter Quadrant</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[7.5px] font-mono font-bold bg-emerald-500/15 text-emerald-400">
          144 States
        </span>
      </div>

      {/* 4-Quadrant Bubble Grid */}
      <div
        className="p-3 rounded-2xl border space-y-2"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
          {bubbles.map((b) => (
            <span
              key={b.label}
              className={`px-2.5 py-1 rounded-full text-[8.5px] font-mono font-bold ${b.color}`}
            >
              {b.label}
            </span>
          ))}
        </div>

        <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[8.5px] font-mono font-bold text-emerald-400 text-center">
          ✨ Locked-In &amp; Restored (High Dopamine / High Vagal Tone)
        </div>
      </div>

      <div
        className="p-2.5 rounded-2xl border text-[8px] font-mono font-bold text-sky-400 text-center"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        Energy 9/10 • Stress 2/10 • Last Meal 7:15 PM (3.5h before bed)
      </div>
    </div>
  );
}

/* Intel 5: 12 Hallmarks of Aging & Bio-Gap Solver */
function IntelHallmarksPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";

  const hallmarks = [
    { name: "Mitochondrial Function", score: "94%", ok: true },
    { name: "Autophagic Flux", score: "91%", ok: true },
    { name: "Epigenetic Stability", score: "89%", ok: true },
    { name: "Inflammaging Control", score: "92%", ok: true },
    { name: "Cellular Senescence", score: "48%", ok: false },
    { name: "Glymphatic Clearance", score: "48%", ok: false },
  ];

  return (
    <div className="space-y-2">
      <div
        className="p-2.5 rounded-2xl border flex items-center justify-between"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div>
          <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            12 HALLMARKS OF AGING AUDIT
          </span>
          <h4 className="text-xs font-extrabold">10/12 Hallmarks Anchored</h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          2 Bio-Gaps
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {hallmarks.map((h) => (
          <div
            key={h.name}
            className="p-2 rounded-xl border flex items-center justify-between"
            style={{
              backgroundColor: cardBg,
              borderColor: h.ok ? borderCol : "rgba(245, 158, 11, 0.5)",
            }}
          >
            <span className="text-[8px] font-bold truncate pr-1">{h.name}</span>
            <span
              className={`text-[8px] font-mono font-extrabold ${
                h.ok ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {h.score}
            </span>
          </div>
        ))}
      </div>

      <div
        className="p-2.5 rounded-2xl border space-y-1.5"
        style={{
          backgroundColor: isDark
            ? "rgba(245, 158, 11, 0.1)"
            : "rgba(254, 243, 199, 0.8)",
          borderColor: "rgba(245, 158, 11, 0.4)",
        }}
      >
        <div className="text-[8px] font-mono font-extrabold text-amber-400">
          ⚠️ Bio-Gap Detected: Cellular Senescence &amp; Glymphatic Clearance (48% Coverage)
        </div>
        <div className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 text-[8px] font-mono font-extrabold text-center">
          + Add Fisetin Pulse / Evening Sauna (+14% Coverage)
        </div>
      </div>
    </div>
  );
}

/* Intel 6: Context-Aware AI Longevity Coach (/coach) */
function IntelAiCoachPreview({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? "rgba(11, 14, 23, 0.9)" : "rgba(255, 255, 255, 0.94)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";

  return (
    <div className="space-y-2">
      {/* Context Badges */}
      <div className="flex flex-wrap items-center gap-1">
        {[
          "✓ Stack Loaded (14)",
          "✓ Labs: ApoB 98",
          "✓ Sleep: 5h 45m",
        ].map((b) => (
          <span
            key={b}
            className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[7.5px] font-mono font-bold text-emerald-400"
          >
            {b}
          </span>
        ))}
      </div>

      {/* User Prompt */}
      <div className="p-2 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-[8.5px] font-semibold ml-4">
        “Should I skip Norwegian 4x4 today since my HRV dropped after 5h 45m sleep?”
      </div>

      {/* AI Coach Response */}
      <div
        className="p-2.5 rounded-2xl border space-y-2"
        style={{ backgroundColor: cardBg, borderColor: borderCol }}
      >
        <div className="flex items-center justify-between text-[8px] font-mono">
          <span className="text-sky-400 font-extrabold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> LEVL AI Strategist
          </span>
          <span className="text-emerald-400">PMID: 25705824</span>
        </div>
        <p className="text-[8.5px] leading-relaxed">
          Yes—with sleep &lt;6h and suppressed HRV, 95% HRmax intervals spike
          autonomic cortisol. Swap today’s 4x4 for a{" "}
          <strong>20m Afternoon NSDR + 10g Creatine ATP buffer</strong> and shift
          4x4 to Thursday.
        </p>
        <div className="p-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 text-slate-950 text-[8px] font-mono font-extrabold text-center">
          ⚡ Apply Today&apos;s Recovery Swap to Schedule
        </div>
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
    { name: "DunedinPACE", val: "0.72 yr/yr", delta: "-0.18", status: "Optimal <0.85", color: "text-emerald-400" },
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
