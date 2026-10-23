"use client";

import React, { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Sparkles,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  OctagonAlert,
  Zap,
} from "lucide-react";
import {
  RealPhoneFrame,
  getShowcaseImage,
  type ShowcaseSlug,
  type ShowcaseTheme,
  type CircadianPhaseId,
  type FamousProtocolId,
} from "@/components/app-showcase/IPhoneShowcaseFrame";
import {
  EarlyAccessModal,
  type ModalTab,
} from "@/components/app-showcase/EarlyAccessModal";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export const LEVL_WEB_APP_URL =
  "https://2026-levl-protocols-app.vercel.app/today";

/* ============================================================================
 * SECTION 1 — HERO & CORE VIEWS SHOWCASE (5 DISTINCT VIEW TABS)
 * ============================================================================ */

interface HeroScreenOption {
  slug: ShowcaseSlug;
  label: string;
  shortLabel: string;
  caption: string;
}

const HERO_SCREEN_OPTIONS: HeroScreenOption[] = [
  {
    slug: "today-morning-tasks",
    label: "Morning Protocol Stack",
    shortLabel: "Morning Stack",
    caption: "LEVL: OutPace Aging — Morning Protocol Stack (Focus View)",
  },
  {
    slug: "today-protocols",
    label: "Protocol-by-Protocol View",
    shortLabel: "By Protocol",
    caption:
      "LEVL: OutPace Aging — Protocol-by-Protocol View (Bryan Johnson Blueprint)",
  },
  {
    slug: "today-feed",
    label: "Full Daily Command Center",
    shortLabel: "Today Overview",
    caption: "LEVL: OutPace Aging — Full Daily Command Center (Today Overview)",
  },
  {
    slug: "schedule-grid",
    label: "7-Day Adherence & Week View",
    shortLabel: "7-Day Week View",
    caption: "LEVL: OutPace Aging — 7-Day Adherence & Week View",
  },
];

/* ============================================================================
 * LEADING PROTOCOLS × PERSONALIZED TO YOU (#famous-protocols)
 * Single-Screen 5-Protocol Interactive Selector + Synced @3x Screenshots
 * ============================================================================ */

interface LeadingProtocolSpec {
  id: FamousProtocolId;
  emoji: string;
  title: string;
  shortName: string;
  badge: string;
  screenshotSlug: ShowcaseSlug;
  blockedStrikethrough: string;
  blockedAction: string;
  upgradeOneLiner: string;
  clinicalWhy: string;
  pathways: string[];
  vectorScore: number;
  paceOfAging: string;
  highlight?: boolean;
}

const LEADING_PROTOCOLS: LeadingProtocolSpec[] = [
  {
    id: "blueprint",
    emoji: "🧬",
    title: "Bryan Johnson — Blueprint",
    shortName: "Bryan Johnson Blueprint",
    badge: "Multi-Modality Synergy",
    screenshotSlug: "today-protocols",
    blockedStrikethrough: "11:00 AM Final Meal Cutoff & 50+ Daily Pills",
    blockedAction: "Adapted to 12.5h Social Window & 6 Core Evidence Anchors",
    upgradeOneLiner:
      "+ High-Polyphenol EVOO (15mL), Morning Sunlight & 65°F Sleep Sanctuary",
    clinicalWhy:
      "Extracts Blueprint’s highest-ROI clinical anchors while removing extreme 18-hour fasting cutoffs that disrupt thyroid T3, kisspeptin, and evening social dinners.",
    pathways: ["ApoB <65 mg/dL", "mTOR/AMPK Balance", "0.72 DunedinPACE"],
    vectorScore: 94,
    paceOfAging: "0.72 DunedinPACE",
  },
  {
    id: "huberman",
    emoji: "☀️",
    title: "Andrew Huberman — Neuro-Circadian",
    shortName: "Huberman Neuro-Circadian",
    badge: "Circadian & Dopamine",
    screenshotSlug: "protocol-huberman",
    blockedStrikethrough: "50°F Ice Bath Immediately After Heavy Lifting",
    blockedAction: "Auto-Moved to Rest Day (mTORC1 Hypertrophy Protected)",
    upgradeOneLiner:
      "+ 12m Morning Outdoor Sun, 90m Caffeine Delay & 20m Afternoon NSDR",
    clinicalWhy:
      "Anchors your suprachiasmatic nucleus (SCN) cortisol peak on waking, clears morning adenosine to eliminate the 2 PM crash, and restores striatal dopamine with afternoon NSDR.",
    pathways: ["SCN Phase Lock", "+65% Striatal Dopamine", "mTORC1 Protected"],
    vectorScore: 93,
    paceOfAging: "0.73 DunedinPACE",
  },
  {
    id: "attia",
    emoji: "🫀",
    title: "Peter Attia — Outlive 3.0",
    shortName: "Peter Attia Outlive 3.0",
    badge: "VO2 Max & Four Horsemen",
    screenshotSlug: "protocol-attia",
    blockedStrikethrough: "Norwegian 4x4 Intervals on <6h Sleep / Low HRV Day",
    blockedAction: "Swapped to Zone 2 Recovery & Rescheduled to High-HRV Day",
    upgradeOneLiner:
      "+ 45m Zone 2 Mitochondrial Base, Centenarian Grip/Axial Load & ApoB Shield",
    clinicalWhy:
      "Protects your autonomic nervous system when overnight HRV drops while keeping weekly Zone 2 lactate clearance (<2.0 mmol/L), Piezo1 axial loading, and ApoB lipid targets on track.",
    pathways: ["VO2 Max Top 2.5%", "Zone 2 Mitochondria", "ApoB <60 mg/dL"],
    vectorScore: 95,
    paceOfAging: "0.71 DunedinPACE",
  },
  {
    id: "patrick",
    emoji: "🔥",
    title: "Rhonda Patrick — FoundMyFitness",
    shortName: "Rhonda Patrick FoundMyFitness",
    badge: "Sauna HSP70 & NRF2",
    screenshotSlug: "protocol-patrick",
    blockedStrikethrough: "Unverified Supplement Stacking & Pre-Lift Heat Fatigue",
    blockedAction: "Sequenced 174°F+ Sauna Post-Lift & Verified Dose Triage",
    upgradeOneLiner:
      "+ 20m Post-Lift 174°F+ Sauna (+3.2x HSP70), Sulforaphane & Omega-3 >8%",
    clinicalWhy:
      "Places Finnish dry sauna immediately after resistance training to amplify heat-shock proteins (HSP70) and endothelial nitric oxide (eNOS) while activating cellular NRF2 detox.",
    pathways: ["+3.2x HSP70", "NRF2 Glutathione", "Omega-3 Index >8%"],
    vectorScore: 92,
    paceOfAging: "0.73 DunedinPACE",
  },
  {
    id: "combined",
    emoji: "✨",
    title: "Combine Multiple Protocols",
    shortName: "Combined Multi-Protocol Stack",
    badge: "4 Protocols Merged & De-Conflicted",
    screenshotSlug: "protocol-combined",
    blockedStrikethrough: "4x Duplicate Magnesium/Omega Doses & Cold-After-Lift Clash",
    blockedAction: "Auto-Merged into 1 Safe Dose & Separated Competing Pathways",
    upgradeOneLiner:
      "+ Blueprint EVOO + Huberman Sun/NSDR + Attia Zone 2 + Patrick 174°F Sauna",
    clinicalWhy:
      "When you subscribe to multiple protocols at once, LEVL de-duplicates overlapping supplements to cap upper-limit toxicity and separates AMPK/cold from mTORC1 heavy lifting.",
    pathways: ["96% Protocol Synergy", "Zero Dose Overlap", "0.71 DunedinPACE"],
    vectorScore: 96,
    paceOfAging: "0.71 DunedinPACE",
    highlight: true,
  },
];

/* ============================================================================
 * SECTION 2 (#adaptive-8020): "TOGGLE YOUR BIOLOGY & DAILY REALITY"
 * 3-State Interactive Mode Switcher
 * ============================================================================ */

type AdaptiveGovernorModeId = "optimal" | "pareto-8020" | "sleep-triage";

interface AdaptiveGovernorModeSpec {
  id: AdaptiveGovernorModeId;
  stateLabel: string;
  pillLabel: string;
  title: string;
  sub: string;
  badge: string;
  slug: ShowcaseSlug;
  caption: string;
  headline: string;
  kpiBadge: string;
  summary: string;
  bullets: string[];
}

const ADAPTIVE_GOVERNOR_MODES: AdaptiveGovernorModeSpec[] = [
  {
    id: "optimal",
    stateLabel: "Mode 1",
    pillLabel: "☀️ Optimal Bandwidth (Full Stack)",
    title: "Optimal Bandwidth (Full Stack)",
    sub: "Full Daily Command Center • All Circadian Windows Active",
    badge: "Full Precision Stack",
    slug: "today-feed",
    caption: "Optimal Bandwidth (Full Stack) • Full Daily Command Center (/today)",
    headline:
      "☀️ Optimal Bandwidth (Full Stack) — All Circadian Windows Armed",
    kpiBadge: "Peak Hormetic Window",
    summary:
      "When readiness and schedule are unobstructed, your full circadian stack runs across Morning, Afternoon, and Evening windows—anchored by Morning Circadian Sunlight Viewing within 30–60m of waking.",
    bullets: [
      "✓ Morning Circadian Sunlight Viewing (10,000+ Lux • within 30–60m of waking)",
      "✓ Delayed Morning Caffeine (90–120m post-wake adenosine washout)",
      "✓ High-Polyphenol Extra Virgin Olive Oil + Targeted Nutraceutical Matrix",
      "✓ Full Afternoon VO2 Max / Sauna & Evening Sleep Triad unlocked",
    ],
  },
  {
    id: "pareto-8020",
    stateLabel: "Mode 2",
    pillLabel: "⚡ High-Stress / Travel Day (80/20 Survival Shield)",
    title: "High-Stress / Travel Day (80/20 Survival Shield)",
    sub: "94% Benefits Retained • 5 Kept (Core 20%) • 4 Auto-Deferred",
    badge: "80/20 Survival Shield",
    slug: "adaptive-8020-shield",
    caption:
      "High-Stress / Travel Day • 80/20 Survival Shield Active Over /today",
    headline:
      "🛡️ High-Stress / Travel Day (80/20 Survival Shield) — 94% Benefits Retained",
    kpiBadge: "100% Adherence Shield",
    summary:
      "One tap activates the 80/20 Survival Shield, pruning secondary tasks and protecting the vital 20% keystone habits that drive 80% of your biological ROI—keeping your streak alive without burnout.",
    bullets: [
      "✓ Downgrade: Cold Plunge (50°F–55°F Søberg) → 60s Cool Face/Shower Rinse",
      "✓ Active: Creatine Monohydrate (+10g Cognitive Rescue Dose)",
      "✓ Active: 10,000+ Lux Morning Circadian Sunlight Viewing",
      "✓ 100% Adherence Shield: Completing 80/20 routine preserves full streak",
    ],
  },
  {
    id: "sleep-triage",
    stateLabel: "Mode 3",
    pillLabel: "😴 Poor Sleep Recovery (<6h / Low HRV Triage)",
    title: "Poor Sleep Recovery (<6h / Low HRV Triage)",
    sub: "5 Evidence-Based Schedule Adaptations Ready on /today",
    badge: "<6h / Low HRV Triage",
    slug: "adaptive-sleep-triage",
    caption:
      "Poor Sleep Recovery (<6h / Low HRV Triage) • CNS Protection Active",
    headline:
      "😴 Poor Sleep Recovery (<6h / Low HRV Triage) — CNS Protection Active",
    kpiBadge: "5 Adaptations Ready",
    summary:
      "Automatically detects poor sleep recovery and triages your day—pausing high-CNS strain while prioritizing morning sunlight, hydration, and autonomic recovery.",
    bullets: [
      "✓ 10g Creatine Monohydrate cognitive rescue (frontal cortical ATP pool)",
      "✓ High-CNS Norwegian 4×4 swapped to Zone 2 steady-state recovery",
      "✓ Injected 20m Afternoon NSDR (Non-Sleep Deep Rest) parasympathetic reset",
      "✓ Auto-benched 50°F Cold Plunge to prevent adrenal norepinephrine exhaustion",
    ],
  },
];

/* ============================================================================
 * SECTION 3 (#modality-applets): MODALITY-SPECIFIC INTERACTIVE APPLETS (ALL 8)
 * ============================================================================ */

interface ModalityAppletCardSpec {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  details: string;
  badges: string[];
  slug: ShowcaseSlug;
  caption: string;
}

const MODALITY_APPLETS: ModalityAppletCardSpec[] = [
  {
    id: "breathwork",
    emoji: "🌬️",
    title: "Guided Breathwork & Vagal Pacer",
    subtitle: "Physiological Sighs • 4-7-8 • Box Breathing",
    details:
      "Visualizes real-time lung expansion and vagal tone coherence across Physiological Sighs (4s + 2s double-inhale, 8s exhale), 4-7-8 Parasympathetic Down-Regulation, and Box Breathing with live cycle pacing and acoustic cues.",
    badges: [
      "Physiological Sighs (4s+2s / 8s)",
      "4-7-8 Parasympathetic Pacer",
      "Box Breathing & Vagal Coherence",
    ],
    slug: "applet-breathwork",
    caption:
      "Guided Breathwork & Vagal Pacer • Live Lung Expansion & Vagal Coherence",
  },
  {
    id: "fasting",
    emoji: "⏳",
    title: "Metabolic Fasting & Autophagy Tracker",
    subtitle: "5 Biological Fasting Zones",
    details:
      "Tracks your live transition through 5 biological fasting zones (Anabolic → Glycogen Depletion → Fat Oxidation → Ketosis → AMPK & Deep Autophagy) with timed electrolyte milestones and circadian feeding window alignment.",
    badges: [
      "5 Biological Fasting Zones",
      "Ketosis → AMPK & Deep Autophagy",
      "Timed Electrolyte Milestones",
    ],
    slug: "applet-fasting",
    caption:
      "Metabolic Fasting & Autophagy Tracker • 5 Biological Fasting Zones",
  },
  {
    id: "thermal",
    emoji: "🧊",
    title: "Thermal Contrast & Søberg Timer",
    subtitle: "50°F–55°F Cold Plunge & 174°F+ Sauna",
    details:
      "Multi-round Cold Plunge (50°F–55°F) and Sauna (174°F+) contrast timer with live norepinephrine / heat-shock protein (HSP70) zone tracking and Søberg Principle natural re-warming guidance.",
    badges: [
      "Cold (50°F–55°F) & Sauna (174°F+)",
      "Norepinephrine & HSP70 Zones",
      "Søberg Principle Re-Warming",
    ],
    slug: "applet-thermal",
    caption:
      "Thermal Contrast & Søberg Timer • Cold Plunge & Sauna Contrast Pacer",
  },
  {
    id: "sunlight",
    emoji: "☀️",
    title: "Morning Circadian Sunlight Lux Meter",
    subtitle: "10,000–100,000 Lux • SCN Phase Lock",
    details:
      "Calibrates target outdoor viewing duration (5m clear sky to 25m overcast) based on ambient photon lux (10,000–100,000 lux) to trigger your morning cortisol peak and set your 16-hour melatonin timer.",
    badges: [
      "10,000–100,000 Ambient Lux",
      "5m Clear Sky → 25m Overcast",
      "16-Hour Melatonin Timer",
    ],
    slug: "applet-sunlight",
    caption:
      "Morning Circadian Sunlight Lux Meter • 10,000–100,000 Lux Calibration",
  },
  {
    id: "hiit",
    emoji: "🫀",
    title: "Norwegian 4×4 VO2 Max HIIT Pacer",
    subtitle: "4×4m Zone 5 (85–95% Max HR)",
    details:
      "Guides 4 rounds of 4-minute Zone 5 (85–95% Max HR) intervals paired with 3-minute active recovery windows to drive stroke volume and +12–20% VO2 Max expansion.",
    badges: [
      "4 Rounds × 4-Min Zone 5",
      "85–95% Max HR Surges",
      "+12–20% VO2 Max Expansion",
    ],
    slug: "applet-hiit",
    caption:
      "Norwegian 4×4 VO2 Max HIIT Pacer • 4×4m Zone 5 Interval Companion",
  },
  {
    id: "centenarian",
    emoji: "🏋️",
    title: "Centenarian Decathlon Strength & Stability",
    subtitle: "Attia Centenarian Standards",
    details:
      "Multi-station longevity circuit (Dead Hang Grip Endurance, Farmer's Carry @ 75% BW, Goblet Squat Hold, Single-Leg Eyes-Closed Balance) benchmarked against Peter Attia's centenarian standards.",
    badges: [
      "Dead Hang & Farmer's Carry @ 75% BW",
      "Goblet Squat & Eyes-Closed Balance",
      "Attia Centenarian Benchmarks",
    ],
    slug: "applet-centenarian",
    caption:
      "Centenarian Decathlon Strength & Stability • 4-Station Longevity Circuit",
  },
  {
    id: "zone2",
    emoji: "🚴",
    title: "Zone 2 Mitochondrial Base Pacer",
    subtitle: "65–75% Max HR • <2.0 mmol/L Lactate",
    details:
      "Locks in steady-state aerobic output (65–75% Max HR, <2.0 mmol/L lactate) with nasal-breathing talk-test verification for PGC-1α mitochondrial biogenesis and fat oxidation efficiency.",
    badges: [
      "65–75% Max HR Steady-State",
      "<2.0 mmol/L Lactate Threshold",
      "PGC-1α Mitochondrial Biogenesis",
    ],
    slug: "applet-zone2",
    caption:
      "Zone 2 Mitochondrial Base Pacer • Steady-State Aerobic & Talk-Test Lock",
  },
  {
    id: "peptide",
    emoji: "💉",
    title: "Peptide Reconstitution & SubQ Dosing Calculator",
    subtitle: "U-100 Syringe Visualizer & 8-Zone Rotation",
    details:
      "Interactive U-100 insulin syringe visualizer that converts vial mass (mg), bacteriostatic water volume (mL), and target dose (mcg) into exact syringe tick units alongside an 8-zone subcutaneous site rotation tracker.",
    badges: [
      "U-100 Syringe Tick Visualizer",
      "mg / mL / mcg Reconstitution",
      "8-Zone SubQ Site Rotation",
    ],
    slug: "applet-peptide",
    caption:
      "Peptide Reconstitution & SubQ Dosing Calculator • U-100 Syringe Visualizer",
  },
];

/* ============================================================================
 * SECTION 4 (#core-intelligence): BIOLOGICAL INTELLIGENCE & OUTCOME ATTRIBUTION
 * ============================================================================ */

interface CoreIntelligenceCardSpec {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  details: string;
  badges: string[];
  slug: ShowcaseSlug;
  caption: string;
}

const CORE_INTELLIGENCE_CARDS: CoreIntelligenceCardSpec[] = [
  {
    id: "longevity-score",
    emoji: "🏆",
    title: "Longevity Score",
    subtitle: "0–100 Composite Biological Score",
    details:
      "A live 0–100 composite biological score combining your 7-day protocol execution consistency, clinical stack potency across all 8 longevity vectors, and verified blood/wearable biomarkers.",
    badges: [
      "0–100 Composite Score",
      "7-Day Execution Consistency",
      "8 Longevity Vectors & Biomarkers",
    ],
    slug: "longevity-score",
    caption:
      "Longevity Score • Live 0–100 Composite Biological Score & 28-Day Trajectory",
  },
  {
    id: "outcome-roi",
    emoji: "📈",
    title: "N-of-1 Outcome & Biomarker Attribution",
    subtitle: "Lag-Adjusted Protocol Correlation",
    details:
      "Correlates your protocol adherence against subjective wellbeing, wearable HRV/deep sleep, and blood panels to isolate which modalities genuinely move your biology.",
    badges: [
      "+32% Deep Sleep Attribution",
      "+27% Cellular Energy ROI",
      "Wearable & Lab Correlation",
    ],
    slug: "intel-outcome-roi",
    caption:
      "N-of-1 Outcome & Biomarker Attribution • Protocol Correlation Engine",
  },
  {
    id: "hallmarks-radar",
    emoji: "🛡️",
    title: "8 Biological Vectors & Hallmarks of Aging Radar",
    subtitle: "8 Canonical Vectors & 12 Hallmarks",
    details:
      "Maps your active stack across all 8 canonical longevity vectors (Heart Health, Brain Longevity, Metabolic Health, Cancer Defense, Testosterone, Chronic Inflammation, Bone Density, Cellular Longevity) to expose blind spots.",
    badges: [
      "8 Canonical Longevity Vectors",
      "12 Hallmarks of Aging Radar",
      "95% Cellular Defense Index",
    ],
    slug: "intel-hallmarks-radar",
    caption:
      "8 Biological Vectors & Hallmarks of Aging Radar • Stack Coverage Polygon",
  },
  {
    id: "physiological-age",
    emoji: "🧬",
    title: "Physiological & Epigenetic Age Testing",
    subtitle: "Functional Bio-Age & DunedinPACE",
    details:
      "Tracks your functional physiological age and pace of aging (VO2 Max, grip strength, DEXA BMD, ApoB, hs-CRP, DunedinPACE) relative to your chronological age.",
    badges: [
      "28.4 yrs Composite Bio-Age",
      "-5.6 yrs vs Chronological",
      "0.84 Pace of Aging",
    ],
    slug: "intel-physiological-age",
    caption:
      "Physiological & Epigenetic Age Testing • Functional Bio-Age & Pace of Aging",
  },
  {
    id: "emotion-checkin",
    emoji: "🎭",
    title: "Daily Emotion, Energy & Autonomic Check-in",
    subtitle: "10-Second Morning & Evening Check-in",
    details:
      "10-second morning and evening check-in capturing nervous system state, mental clarity, and sleep restoration to power N-of-1 protocol correlation.",
    badges: [
      "10-Second Autonomic Check-in",
      "Nervous System & Clarity",
      "N-of-1 Correlation Signal",
    ],
    slug: "intel-emotion-checkin",
    caption:
      "Daily Emotion, Energy & Autonomic Check-in • 4-Quadrant Circumplex",
  },
  {
    id: "ai-coach",
    emoji: "🤖",
    title: "AI Longevity Coach",
    subtitle: "Stack, Labs & PubMed Grounded",
    details:
      "Context-aware biological copilot grounded in your active protocol stack, lab biomarkers, and peer-reviewed PubMed clinical trials.",
    badges: [
      "Active Protocol Stack Context",
      "Lab Biomarker Synthesis",
      "PubMed Clinical Citations",
    ],
    slug: "intel-ai-coach",
    caption:
      "AI Longevity Coach • Context-Aware Biological Copilot",
  },
];

/* ============================================================================
 * CIRCADIAN PHASES DATA (#circadian-engine)
 * ============================================================================ */

interface CircadianPhaseSpec {
  id: CircadianPhaseId;
  label: string;
  emoji: string;
  window: string;
  darkAccent: string;
  lightAccent: string;
  headline: string;
  rationale: string;
  slug: ShowcaseSlug;
  modalities: {
    name: string;
    badge: string;
    detail: string;
    mechanism: string;
  }[];
}

const CIRCADIAN_PHASES: CircadianPhaseSpec[] = [
  {
    id: "dawn",
    label: "Morning Rise",
    emoji: "🌅",
    window: "06:00–10:00",
    darkAccent: "#F59E0B",
    lightAccent: "#D97706",
    headline: "Anchor the Suprachiasmatic Nucleus (SCN) Before Any Screen.",
    rationale:
      "Outdoor solar photon flux within 30–60 minutes of waking triggers a healthy cortisol peak, clears residual adenosine, and starts the 14–16 hour melatonin countdown timer.",
    slug: "today-morning-tasks",
    modalities: [
      {
        name: "Morning Circadian Sunlight Viewing (☀️ Anchor #1)",
        badge: "within 30–60m of waking • 10,000+ Lux",
        detail: "Direct outdoor sky exposure prior to artificial blue screens.",
        mechanism: "ipRGC Melanopsin → SCN Cortisol Pulse",
      },
      {
        name: "Delayed Caffeine Intake",
        badge: "90–120m Post-Wake",
        detail: "Allows natural adenosine washout to eliminate the afternoon crash.",
        mechanism: "A1/A2A Receptor Sensitivity Preservation",
      },
      {
        name: "Morning Cellular Hydration + Electrolytes",
        badge: "500mL + Na/K/Mg",
        detail: "Restores nocturnal plasma volume and cellular osmolarity.",
        mechanism: "Renal Perfusion & Morning Autonomic Tone",
      },
    ],
  },
  {
    id: "zenith",
    label: "Daytime Peak",
    emoji: "☀️",
    window: "10:00–14:00",
    darkAccent: "#0EA5E9",
    lightAccent: "#0284C7",
    headline: "Peak Cognitive Output & Lipid-Paired Polyphenol Bioavailability.",
    rationale:
      "Core body temperature and prefrontal catecholamines reach their first zenith. LEVL: OutPace Aging groups fat-soluble senolytics and polyphenols with high-polyphenol EVOO to multiply absorption.",
    slug: "today-feed",
    modalities: [
      {
        name: "High-Polyphenol Extra Virgin Olive Oil + Nutraceuticals",
        badge: "15mL EVOO + D3/K2 + Polyphenols",
        detail: "Scheduled alongside oleic acid lipid matrix for +3.4x AUC absorption.",
        mechanism: "AMPK • SIRT1 • Endothelial eNOS",
      },
      {
        name: "Creatine Monohydrate + TMG",
        badge: "5g–10g Micronized",
        detail: "Saturates cerebral & muscular phosphocreatine ATP buffer.",
        mechanism: "Neuronal ATP Recycling & Methylation",
      },
      {
        name: "Post-Prandial Metabolic Walk",
        badge: "10–15m Zone 1",
        detail: "Blunts post-meal glucose excursion by 22–30% without insulin spikes.",
        mechanism: "Non-Insulin GLUT4 Translocation",
      },
    ],
  },
  {
    id: "dusk",
    label: "Afternoon Dip",
    emoji: "⚡",
    window: "14:00–18:00",
    darkAccent: "#6366F1",
    lightAccent: "#4F46E5",
    headline: "Peak Cardiovascular Output, VO2 Max & Hormetic Thermal Stress.",
    rationale:
      "Grip strength, reaction speed, and cardiac stroke volume peak in late afternoon—making 14:00–18:00 the optimal biological window for VO2 Max intervals, heavy loading, and sauna.",
    slug: "applet-hiit",
    modalities: [
      {
        name: "Norwegian 4x4 VO2 Max Intervals",
        badge: "28m • 4x4m @ 85–95% HRmax",
        detail: "4 mins high-output intervals separated by 3 mins active recovery.",
        mechanism: "PGC-1α • Stroke Volume • +15–20% VO2 Max",
      },
      {
        name: "Cold Plunge (Søberg Principle)",
        badge: "50°F–55°F (52°F) • 2–3 mins",
        detail: "End with natural re-warming to induce brown fat thermogenesis (auto-separated from hypertrophy days).",
        mechanism: "+250% Norepinephrine/Dopamine • UCP1",
      },
      {
        name: "Finnish Dry Sauna Conditioning",
        badge: "174°F+ (79°C+) • 20 mins",
        detail: "4–7x/week thermal conditioning for vascular compliance.",
        mechanism: "HSP70 • eNOS • ≥25% hs-CRP Reduction",
      },
    ],
  },
  {
    id: "night",
    label: "Evening Wind-Down",
    emoji: "🌙",
    window: "18:00–22:00",
    darkAccent: "#A855F7",
    lightAccent: "#7C3AED",
    headline: "Parasympathetic Downregulation & Glymphatic Slow-Wave Prep.",
    rationale:
      "Eliminating short-wavelength overhead lux and dropping core temperature by 1.0°C unlocks deep slow-wave sleep architecture and overnight glymphatic clearance.",
    slug: "adaptive-sleep-triage",
    modalities: [
      {
        name: "Short-Wavelength Blue-Light Blockade",
        badge: "<10 Lux Overhead • 90m Pre-Bed",
        detail: "Prevents pineal melatonin suppression in the dim-light onset window.",
        mechanism: "Dim-Light Melatonin Onset (DLMO) Protection",
      },
      {
        name: "Matthew Walker Sleep Triad (Mg L-Threonate + Apigenin + L-Theanine)",
        badge: "65°F Thermal Drop & 100% Pitch Darkness",
        detail: "Promotes peripheral vasodilation and GABAergic slow-wave entry.",
        mechanism: "NMDA Modulation & GABAergic Calm",
      },
      {
        name: "Nightly Wearable & Subjective Triage",
        badge: "Oura / Whoop / Apple Watch Sync",
        detail: "Calibrates tomorrow’s 80/20 routine load based on HRV & sleep debt.",
        mechanism: "Autonomic Readiness Loop",
      },
    ],
  },
];

const ROTATING_PERSONALIZATION_WORDS = [
  "Goals.",
  "Schedule.",
  "Budget.",
  "Biology.",
  "Real Life.",
] as const;

const FAQ_ITEMS = [
  {
    q: "How do I install LEVL: OutPace Aging as a native app on iOS or Android?",
    a: "LEVL: OutPace Aging is engineered as a zero-bloat, 120Hz Progressive Web App (PWA). Once you unlock access with your VIP code (or early access invite), open the app in Safari on iOS or Chrome on Android, tap Share → 'Add to Home Screen', and launch it directly from your dock with fullscreen native gestures and offline-ready circadian caching.",
  },
  {
    q: "How does LEVL: OutPace Aging personalize leading protocols to my biology?",
    a: "Leading protocols like Bryan Johnson’s Blueprint, Andrew Huberman’s neuro-circadian routine, Peter Attia’s Outlive framework, or Rhonda Patrick’s micronutrient stack were often designed around a single individual’s schedule and physiology. LEVL: OutPace Aging cross-checks every modality against your goals, schedule, budget, sex/hormone profile, lifting days, sleep readiness (Oura, Whoop, Apple Watch), and blood biomarkers (ApoB, hs-CRP, Fasting Insulin)—automatically blocking pathway clashes like post-lift cold plunges or extreme fasts that impair thyroid and hormone signaling.",
  },
  {
    q: "Can I combine multiple protocols without overlapping supplements or conflicting workouts?",
    a: "Yes. When you select multiple protocols in LEVL: OutPace Aging, the Multi-Protocol Stack Merger automatically deduplicates overlapping compounds, resolves biochemical timing clashes (such as separating AMPK agonists and cold immersion from mTORC1 heavy resistance training by at least 4 hours), and sequences your combined stack into four clean circadian time blocks.",
  },
  {
    q: "How does LEVL: OutPace Aging identify what actually works for my body?",
    a: "Most apps only track whether you checked a box. LEVL: OutPace Aging runs a closed-loop N-of-1 Outcome & Biomarker Attribution engine—correlating your 7-day and 28-day protocol adherence against your Daily Emotion, Energy & Autonomic Check-ins, wearable HRV and deep sleep trends, functional physiological tests, and blood panels to isolate which specific habits genuinely move your biology.",
  },
  {
    q: "How is my live 0–100 Longevity Score calculated?",
    a: "Your Longevity Score is a live 0–100 composite biological metric combining three pillars: (1) your rolling 7-day protocol execution consistency, (2) the clinical evidence potency of your active stack across all 8 canonical longevity vectors, and (3) your verified functional, wearable, and blood biomarker trajectories.",
  },
  {
    q: "What happens on busy travel days or nights when I get poor sleep?",
    a: "Rigid 25-step checklists cause all-or-nothing burnout. On high-stress or travel days, one tap activates the 80/20 Survival Shield—pruning secondary tasks and protecting the vital 20% keystone habits that drive 80%+ of your biological ROI while keeping your adherence streak alive. On mornings after <6 hours of sleep or low HRV, Poor Sleep Recovery Triage automatically pauses high-CNS strain (like Norwegian 4×4 HIIT) while prioritizing morning sunlight, hydration, a 10g Creatine cognitive rescue dose, and a 20-minute afternoon NSDR reset.",
  },
  {
    q: "What are the 8 built-in Modality-Specific Interactive Applets?",
    a: "Instead of static checkboxes, every major modality launches a dedicated biometric timer or calculator: (1) Guided Breathwork & Vagal Pacer, (2) Metabolic Fasting & Autophagy Tracker, (3) Thermal Contrast & Søberg Timer, (4) Morning Circadian Sunlight Lux Meter, (5) Norwegian 4×4 VO2 Max HIIT Pacer, (6) Centenarian Decathlon Strength & Stability Circuit, (7) Zone 2 Mitochondrial Base Pacer, and (8) the Peptide Reconstitution & SubQ Dosing Calculator.",
  },
  {
    q: "What are the 8 Biological Vectors and 12 Hallmarks of Aging tracked in the app?",
    a: "LEVL maps your active routine across 8 canonical biological vectors—Heart Health, Brain Longevity, Metabolic Health, Cancer Defense, Hormone Optimization, Chronic Inflammation, Bone Density & Muscle, and Cellular Longevity—as well as the 12 canonical Hallmarks of Aging (including Autophagy, Mitochondrial Function, Epigenetic Alterations, Cellular Senescence, and Telomere Attrition) so you can immediately spot and fill coverage blind spots.",
  },
  {
    q: "Does LEVL: OutPace Aging adapt protocols for female physiology and hormone health?",
    a: "Yes. Female physiology has distinct hypothalamic-pituitary-gonadal (HPG) and thyroid sensitivity to caloric and thermal stressors. LEVL protects Kisspeptin and Free T3 signaling by converting aggressive 18-hour fasts into hormone-safe 12.5-hour circadian windows with a 30g morning protein anchor, prioritizing heavy axial bone loading (Piezo1 osteoblast activation), tracking ferritin/iron status, and calibrating cold exposure to 55°F–58°F.",
  },
  {
    q: "Do I need expensive lab panels, DEXA scans, or wearables to get started?",
    a: "No. You can start immediately using built-in functional physiological age benchmarks (dead hang grip endurance, single-leg eyes-closed balance, goblet squat hold, VO2 max pacing), 10-second daily autonomic check-ins, and circadian protocol tracking. Whenever you connect wearables or log blood panels (like ApoB, hs-CRP, HbA1c, or DunedinPACE), the attribution engine incorporates them automatically.",
  },
  {
    q: "How does the AI Longevity Coach differ from a generic chatbot?",
    a: "The AI Longevity Coach is a context-aware biological copilot grounded directly in your active protocol stack, circadian schedule, logged biomarkers, and peer-reviewed PubMed clinical trials. It can explain the mechanism behind any modality in your feed, flag supplement timing interactions, or adjust today’s routine based on how you feel.",
  },
  {
    q: "How do I get Early Access or unlock the app immediately with a VIP Invite Code?",
    a: "Click 'Join Early Access' to reserve your spot in the next onboarding cohort, or click 'Unlock with VIP Code' if you have received an activation code from the LEVL team, a clinical partner, or an early member to launch your daily command center immediately.",
  },
];

export default function LevlAppShowcasePage() {
  const [previewTheme, setPreviewTheme] = useState<ShowcaseTheme>("dark");
  const [heroActiveSlug, setHeroActiveSlug] =
    useState<ShowcaseSlug>("today-morning-tasks");
  const [rotatingWordIdx, setRotatingWordIdx] = useState<number>(0);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<ModalTab>("waitlist");

  // Leading Protocols × Personalized to You state (5 Leading Protocols)
  const [selectedProtocolId, setSelectedProtocolId] =
    useState<FamousProtocolId>("blueprint");

  // Section 2 (#adaptive-8020): 3-State Interactive Mode Switcher
  const [governorMode, setGovernorMode] =
    useState<AdaptiveGovernorModeId>("pareto-8020");

  // Section 3 (#modality-applets): 8 Interactive Modality Execution Applets
  const [activeAppletId, setActiveAppletId] = useState<string>("breathwork");

  // Section 4 (#core-intelligence): 6 Core Longevity Intelligence Cards (Default: 'longevity-score')
  const [activeIntelId, setActiveIntelId] =
    useState<string>("longevity-score");

  // Circadian Phase Explorer state
  const [selectedPhaseId, setSelectedPhaseId] =
    useState<CircadianPhaseId>("dawn");

  const isDark = previewTheme === "dark";

  // Rotate "Personalized to Your [Goals. / Schedule. / Budget. / Biology. / Real Life.]"
  useEffect(() => {
    const timer = window.setInterval(() => {
      setRotatingWordIdx(
        (prev) => (prev + 1) % ROTATING_PERSONALIZATION_WORDS.length
      );
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  // Hydrate stored theme override on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("levl_app_showcase_theme");
      if (stored === "light" || stored === "dark") {
        setPreviewTheme(stored);
      }
    } catch {}
  }, []);

  /**
   * Follows modern-web-guidance `dark-mode-toggle`:
   * - Check divergence against current system preference ONLY at storage time.
   * - If target matches system preference, remove stored value rather than pinning it.
   */
  const applyThemeChange = (target: ShowcaseTheme) => {
    setPreviewTheme(target);
    try {
      const systemPref: ShowcaseTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";

      if (target !== systemPref) {
        localStorage.setItem("levl_app_showcase_theme", target);
      } else {
        localStorage.removeItem("levl_app_showcase_theme");
      }

      let meta = document.querySelector(
        'meta[name="color-scheme"]'
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "color-scheme";
        document.head.appendChild(meta);
      }
      meta.content = target !== systemPref ? target : "light dark";
    } catch {}
  };

  const toggleTheme = () => {
    const nextTheme: ShowcaseTheme = previewTheme === "dark" ? "light" : "dark";
    applyThemeChange(nextTheme);
  };

  const openModal = (tab: ModalTab) => {
    setModalInitialTab(tab);
    setModalOpen(true);
  };

  const activeHeroIndex = Math.max(
    0,
    HERO_SCREEN_OPTIONS.findIndex((o) => o.slug === heroActiveSlug)
  );
  const activeHeroOption = HERO_SCREEN_OPTIONS[activeHeroIndex];
  const leftHeroOption =
    HERO_SCREEN_OPTIONS[
      (activeHeroIndex + HERO_SCREEN_OPTIONS.length - 1) %
        HERO_SCREEN_OPTIONS.length
    ];
  const rightHeroOption =
    HERO_SCREEN_OPTIONS[(activeHeroIndex + 1) % HERO_SCREEN_OPTIONS.length];

  const activeProtocolSpec =
    LEADING_PROTOCOLS.find((p) => p.id === selectedProtocolId) ||
    LEADING_PROTOCOLS[0];

  const activeGovernorSpec =
    ADAPTIVE_GOVERNOR_MODES.find((m) => m.id === governorMode) ||
    ADAPTIVE_GOVERNOR_MODES[0];

  const activeAppletSpec =
    MODALITY_APPLETS.find((a) => a.id === activeAppletId) ||
    MODALITY_APPLETS[0];

  const activeIntelSpec =
    CORE_INTELLIGENCE_CARDS.find((c) => c.id === activeIntelId) ||
    CORE_INTELLIGENCE_CARDS[0];

  const activePhaseSpec =
    CIRCADIAN_PHASES.find((p) => p.id === selectedPhaseId) ||
    CIRCADIAN_PHASES[0];

  // Align tokens with levlhealth.com (--color-levl-bg #060913, --color-levl-cyan #0ea5e9, --color-levl-magenta #e879f9) + Daylight Quartz Light Mode
  const tokens = {
    canvasBg: isDark ? "var(--color-levl-bg, #060913)" : "#F8F9F7",
    cardBg: isDark ? "rgba(11, 14, 23, 0.82)" : "rgba(255, 255, 255, 0.90)",
    cardBorder: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)",
    textPrimary: isDark ? "#F9FAFB" : "#0F172A",
    textSecondary: isDark ? "#B4B5B8" : "#475569",
    accentEmerald: isDark ? "#10B981" : "#0D9488",
    accentCyan: isDark ? "#0ea5e9" : "#0284C7",
    accentMagenta: isDark ? "#e879f9" : "#a21caf",
    dawnAmber: isDark ? "#F59E0B" : "#D97706",
    zenithSky: isDark ? "#0EA5E9" : "#0284C7",
    duskIndigo: isDark ? "#6366F1" : "#4F46E5",
    nightViolet: isDark ? "#A855F7" : "#7C3AED",
  };

  return (
    <div
      className="min-h-screen font-sans relative transition-colors duration-500 overflow-x-hidden flex flex-col"
      style={{
        backgroundColor: tokens.canvasBg,
        color: tokens.textPrimary,
        colorScheme: previewTheme,
      }}
    >
      {/* Global Twilight / Botanical Background Orbs aligned with levlhealth.com */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
      >
        <div
          className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px]"
          style={{
            background: isDark
              ? "radial-gradient(circle, #1E2C5A 0%, transparent 70%)"
              : "radial-gradient(circle, #E6F3EB 0%, transparent 70%)",
            opacity: isDark ? 0.45 : 0.85,
          }}
        />
        <div
          className="absolute top-[38%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[150px]"
          style={{
            background: isDark
              ? "radial-gradient(circle, #151C3B 0%, transparent 70%)"
              : "radial-gradient(circle, #F0EDFB 0%, transparent 70%)",
            opacity: isDark ? 0.5 : 0.85,
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full blur-[130px]"
          style={{
            background: isDark
              ? "radial-gradient(circle, #1B1237 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(224, 242, 254, 0.75) 0%, transparent 70%)",
            opacity: isDark ? 0.5 : 0.8,
          }}
        />
      </div>

      {/* ====================================================================
          SHARED SITE <Navbar /> + ATTACHED SECONDARY SUB-BAR AT TOP OF /app
         ==================================================================== */}
      <Navbar
        showCart={false}
        forceSolidDark={true}
        subBar={
          <div
            className="border-t backdrop-blur-xl transition-colors duration-300 mt-1"
            style={{
              backgroundColor: isDark
                ? "rgba(6, 9, 19, 0.92)"
                : "rgba(248, 249, 247, 0.96)",
              borderColor: tokens.cardBorder,
              color: tokens.textPrimary,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-13 flex items-center justify-between gap-3">
              {/* Left: LEVL: OutPace Aging Badge + Non-Overlapping Section Jump Links */}
              <div className="flex items-center gap-3 lg:gap-4 min-w-0 flex-1 overflow-x-auto hide-scrollbar">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border shrink-0 whitespace-nowrap"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(14, 165, 233, 0.12)"
                      : "rgba(2, 132, 199, 0.10)",
                    borderColor: isDark
                      ? "rgba(14, 165, 233, 0.35)"
                      : "rgba(2, 132, 199, 0.30)",
                    color: tokens.accentCyan,
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  LEVL: OutPace Aging
                </span>

                <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-semibold tracking-wide shrink-0">
                  {[
                    { label: "Overview", href: "#overview" },
                    {
                      label: "Leading Protocols",
                      href: "#famous-protocols",
                    },
                    { label: "80/20 Mode", href: "#adaptive-8020" },
                    { label: "Modality Applets", href: "#modality-applets" },
                    {
                      label: "What Actually Works",
                      href: "#core-intelligence",
                    },
                    { label: "FAQ", href: "#faq" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="transition-opacity hover:opacity-100 opacity-75 whitespace-nowrap shrink-0"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Right: Simple Sun/Moon Icon Toggle + Unlock with VIP Code + Join Early Access */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={toggleTheme}
                  title={`Switch to ${isDark ? "Light Mode" : "Dark Mode"}`}
                  aria-label={`Switch to ${
                    isDark ? "Light Mode" : "Dark Mode"
                  }`}
                  className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer hover:scale-105 shrink-0"
                  style={{
                    backgroundColor: tokens.cardBg,
                    borderColor: tokens.cardBorder,
                  }}
                >
                  {isDark ? (
                    <Moon className="w-4 h-4 text-sky-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => openModal("vip")}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer hover:opacity-90 whitespace-nowrap shrink-0"
                  style={{
                    borderColor: tokens.cardBorder,
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(15,23,42,0.04)",
                  }}
                >
                  <KeyRound className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Unlock with VIP Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => openModal("waitlist")}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-sky-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        }
      />

      <main className="relative z-10 flex-grow">
        {/* ====================================================================
            SECTION 1 — HERO SECTION (#overview)
           ==================================================================== */}
        <section
          id="overview"
          className="pt-8 sm:pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center scroll-mt-36"
        >
          {/* Top Eyebrow Pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase border mb-4"
            style={{
              backgroundColor: isDark
                ? "rgba(14, 165, 233, 0.10)"
                : "rgba(2, 132, 199, 0.10)",
              borderColor: isDark
                ? "rgba(14, 165, 233, 0.30)"
                : "rgba(2, 132, 199, 0.30)",
              color: tokens.accentCyan,
            }}
          >
            <span>✦ LEVL: OUTPACE AGING • PERSONALIZED LONGEVITY PROTOCOLS APP</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] max-w-5xl mx-auto mb-5">
            Longevity Science,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #10B981 0%, #0ea5e9 55%, #e879f9 100%)"
                  : "linear-gradient(135deg, #0D9488 0%, #0284C7 55%, #4F46E5 100%)",
              }}
            >
              Calibrated to Your Biology.
            </span>
          </h1>

          {/* Standout Sub-Headline Banner (Directly below <h1>, all on one line) */}
          <p className="text-lg sm:text-2xl md:text-[28px] lg:text-[34px] font-bold tracking-tight max-w-6xl mx-auto mb-5 leading-snug sm:whitespace-nowrap">
            Identify what <em className="italic font-serif">actually</em> works to{" "}
            <span
              className="bg-clip-text text-transparent font-extrabold whitespace-nowrap"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #F472B6 100%)",
              }}
            >
              slow your pace of aging.
            </span>
          </p>

          {/* Concise 1–2 Sentence Supporting Description */}
          <p
            className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ color: tokens.textSecondary }}
          >
            Follow and personalize leading longevity protocols, execute
            modalities with live biometric applets, and track N-of-1 outcomes
            across all 8 biological vectors and 12 Hallmarks of Aging.
          </p>

          {/* Hero CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-8">
            <button
              type="button"
              onClick={() => openModal("waitlist")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Join Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => openModal("vip")}
              className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-sm sm:text-base border backdrop-blur-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.cardBorder,
              }}
            >
              <KeyRound className="w-4 h-4 text-sky-400" />
              <span>Unlock with VIP Code →</span>
            </button>
          </div>

          {/* Hero Interactive Theme Bar + 4-Screen Primary Toggle */}
          <div className="flex flex-col items-center justify-center gap-3 mb-10">
            <div
              className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border backdrop-blur-xl shadow-lg"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.cardBorder,
              }}
            >
              <span
                className="text-xs font-mono font-semibold pl-3 pr-1"
                style={{ color: tokens.textSecondary }}
              >
                Preview App Theme:
              </span>
              <button
                type="button"
                onClick={() => applyThemeChange("dark")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? "bg-slate-900 text-white shadow-md border border-white/15"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <span>🌙 Dark Mode</span>
              </button>
              <button
                type="button"
                onClick={() => applyThemeChange("light")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  !isDark
                    ? "bg-white text-slate-900 shadow-md border border-slate-900/10"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <span>☀️ Light Mode</span>
              </button>
            </div>

            {/* Step 3.1: Primary Interactive Toggle on the Hero Phone Frame */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {HERO_SCREEN_OPTIONS.map((tab) => {
                const isSelected = heroActiveSlug === tab.slug;
                return (
                  <button
                    key={tab.slug}
                    type="button"
                    onClick={() => setHeroActiveSlug(tab.slug)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-emerald-500 to-sky-400 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20"
                        : "opacity-75 hover:opacity-100"
                    }`}
                    style={
                      !isSelected
                        ? {
                            backgroundColor: tokens.cardBg,
                            borderColor: tokens.cardBorder,
                          }
                        : undefined
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hero Visual: Real @3x Retina Screenshots Inside <RealPhoneFrame /> */}
          <div className="relative max-w-6xl mx-auto pt-2 pb-6">
            {/* Mobile Single Active Phone */}
            <div className="block lg:hidden">
              <RealPhoneFrame
                src={getShowcaseImage(activeHeroOption.slug, previewTheme)}
                alt={activeHeroOption.caption}
                priority="high"
                caption={activeHeroOption.caption}
              />
            </div>

            {/* Desktop 3-Phone Perspective Stage (All Real @3x Retina Screenshots) */}
            <div className="hidden lg:flex items-center justify-center relative min-h-[620px]">
              {/* Left Tilted Phone (-8deg, scale-90): Adjacent Hero View */}
              <div
                onClick={() => setHeroActiveSlug(leftHeroOption.slug)}
                title={`Click to focus: ${leftHeroOption.label}`}
                className="transform -rotate-[8deg] scale-90 -mr-10 z-10 hover:z-30 hover:rotate-0 hover:scale-95 transition-all duration-500 cursor-pointer"
              >
                <RealPhoneFrame
                  src={getShowcaseImage(leftHeroOption.slug, previewTheme)}
                  alt={leftHeroOption.caption}
                  priority="default"
                  caption={leftHeroOption.label}
                />
              </div>

              {/* Center Foreground Phone: Active Selected Hero Tab */}
              <div className="z-20 transform scale-100 hover:scale-[1.02] transition-all duration-500">
                <RealPhoneFrame
                  src={getShowcaseImage(activeHeroOption.slug, previewTheme)}
                  alt={activeHeroOption.caption}
                  priority="high"
                  caption={activeHeroOption.caption}
                />
              </div>

              {/* Right Tilted Phone (+8deg, scale-90): Next Hero View */}
              <div
                onClick={() => setHeroActiveSlug(rightHeroOption.slug)}
                title={`Click to focus: ${rightHeroOption.label}`}
                className="transform rotate-[8deg] scale-90 -ml-10 z-10 hover:z-30 hover:rotate-0 hover:scale-95 transition-all duration-500 cursor-pointer"
              >
                <RealPhoneFrame
                  src={getShowcaseImage(rightHeroOption.slug, previewTheme)}
                  alt={rightHeroOption.caption}
                  priority="default"
                  caption={rightHeroOption.label}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SOCIAL PROOF & CLINICAL RIGOR TICKER
           ==================================================================== */}
        <section
          className="border-y py-5 backdrop-blur-xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.cardBorder,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                "8 Canonical Longevity Vectors",
                "12 Hallmarks of Aging Coverage",
                "100+ RCT-Anchored Modalities",
                "Built-In Biometric Execution Applets",
                "Closed-Loop N-of-1 Outcome Attribution",
              ].map((metric) => (
                <div
                  key={metric}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono font-semibold"
                  style={{
                    borderColor: tokens.cardBorder,
                    backgroundColor: isDark
                      ? "rgba(6, 9, 19, 0.65)"
                      : "rgba(248, 249, 247, 0.85)",
                  }}
                >
                  <ShieldCheck
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: tokens.accentEmerald }}
                  />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 2 — "LEADING PROTOCOLS × PERSONALIZED TO YOU" (#famous-protocols)
            Single-Screen 2-Column Layout: Left Header + 5 Clickable Protocol Cards | Right Synced <RealPhoneFrame />
           ==================================================================== */}
        <section
          id="famous-protocols"
          className="py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div id="mastermind-stacks" className="scroll-mt-28" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 7 Cols: Compact Header + 5 Click-to-Expand Leading Protocol Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                  style={{ color: tokens.accentCyan }}
                >
                  LEADING PROTOCOLS × PERSONALIZED TO YOU
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2.5 leading-tight">
                  <span className="block">
                    Follow Leading Longevity Protocols.
                  </span>
                  <span className="inline-flex items-baseline mt-0.5 whitespace-nowrap">
                    <span
                      className="bg-clip-text text-transparent mr-[0.26em]"
                      style={{
                        backgroundImage: isDark
                          ? "linear-gradient(135deg, #0ea5e9 0%, #10B981 100%)"
                          : "linear-gradient(135deg, #0284C7 0%, #0D9488 100%)",
                      }}
                    >
                      Personalized to <em className="italic">Your</em>
                    </span>
                    <span
                      onClick={() =>
                        setRotatingWordIdx(
                          (prev) =>
                            (prev + 1) % ROTATING_PERSONALIZATION_WORDS.length
                        )
                      }
                      title="Click to cycle"
                      className="inline-grid text-left cursor-pointer align-baseline"
                    >
                      {ROTATING_PERSONALIZATION_WORDS.map((word, idx) => {
                        const isActive = idx === rotatingWordIdx;
                        return (
                          <span
                            key={word}
                            aria-hidden={!isActive}
                            className={`col-start-1 row-start-1 justify-self-start text-left bg-clip-text text-transparent transition-all duration-300 whitespace-nowrap ${
                              isActive
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2 pointer-events-none select-none"
                            }`}
                            style={{
                              backgroundImage: isDark
                                ? "linear-gradient(135deg, #10B981 0%, #38BDF8 45%, #e879f9 100%)"
                                : "linear-gradient(135deg, #0D9488 0%, #0284C7 45%, #4F46E5 100%)",
                            }}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </span>
                  </span>
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Famous routines were built for one person’s lab panels, budget,
                  and schedule—not yours. Click any protocol below to see its
                  live{" "}
                  <strong style={{ color: tokens.textPrimary }}>
                    LEVL: OutPace Aging
                  </strong>{" "}
                  screen and how it adapts to your biology in one tap.
                </p>
              </div>

              {/* 5 Click-to-Expand Protocol Cards (Only Active Card Expands) */}
              <div className="space-y-2.5">
                {LEADING_PROTOCOLS.map((proto) => {
                  const isSelected = proto.id === selectedProtocolId;
                  const panelId = `protocol-panel-${proto.id}`;
                  return (
                    <div
                      key={proto.id}
                      className="rounded-2xl border backdrop-blur-xl transition-all"
                      style={{
                        backgroundColor: isSelected
                          ? isDark
                            ? "rgba(14, 165, 233, 0.11)"
                            : "rgba(224, 242, 254, 0.75)"
                          : tokens.cardBg,
                        borderColor: isSelected
                          ? tokens.accentCyan
                          : proto.highlight
                          ? "rgba(232, 121, 249, 0.38)"
                          : tokens.cardBorder,
                        boxShadow: isSelected
                          ? "0 0 24px -6px rgba(14, 165, 233, 0.28)"
                          : "none",
                      }}
                    >
                      <h3 className="m-0">
                        <button
                          type="button"
                          aria-expanded={isSelected}
                          aria-controls={panelId}
                          onClick={() => setSelectedProtocolId(proto.id)}
                          className="w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span className="text-xl leading-none shrink-0">
                              {proto.emoji}
                            </span>
                            <span className="flex flex-wrap items-center gap-2 min-w-0">
                              <span className="font-extrabold text-sm sm:text-base tracking-tight">
                                {proto.title}
                              </span>
                              <span
                                className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                                style={{
                                  borderColor: tokens.cardBorder,
                                  color: proto.highlight
                                    ? tokens.accentMagenta
                                    : tokens.accentCyan,
                                }}
                              >
                                {proto.badge}
                              </span>
                            </span>
                          </span>

                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isSelected
                                ? "rotate-180 text-sky-400"
                                : "opacity-60"
                            }`}
                          />
                        </button>
                      </h3>

                      {isSelected && (
                        <div
                          id={panelId}
                          className="px-4 sm:px-5 pb-4 pt-3 border-t space-y-2.5 text-xs sm:text-sm leading-relaxed"
                          style={{
                            borderColor: tokens.cardBorder,
                          }}
                        >
                          {/* Row 1: 🛑 Raw Protocol Blind Spot Blocked */}
                          <div
                            className="p-2.5 sm:p-3 rounded-xl border"
                            style={{
                              backgroundColor: isDark
                                ? "rgba(239, 68, 68, 0.08)"
                                : "rgba(254, 226, 226, 0.65)",
                              borderColor: "rgba(239, 68, 68, 0.30)",
                            }}
                          >
                            <div className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-red-400 mb-0.5 flex items-center gap-1">
                              <OctagonAlert className="w-3.5 h-3.5 shrink-0" />
                              <span>🛑 RAW PROTOCOL BLIND SPOT ADJUSTED</span>
                            </div>
                            <div className="font-bold leading-snug">
                              <span className="line-through opacity-70 mr-1.5">
                                {proto.blockedStrikethrough}
                              </span>
                              <span className="text-amber-400 font-extrabold">
                                → {proto.blockedAction}
                              </span>
                            </div>
                          </div>

                          {/* Row 2: ⚡ Personalized Upgrade */}
                          <div
                            className="p-2.5 sm:p-3 rounded-xl border"
                            style={{
                              backgroundColor: isDark
                                ? "rgba(16, 185, 129, 0.08)"
                                : "rgba(209, 250, 229, 0.65)",
                              borderColor: "rgba(16, 185, 129, 0.32)",
                            }}
                          >
                            <div
                              className="text-[10px] font-mono font-extrabold uppercase tracking-wider mb-0.5 flex items-center gap-1"
                              style={{ color: tokens.accentEmerald }}
                            >
                              <Zap className="w-3.5 h-3.5 shrink-0" />
                              <span>⚡ PERSONALIZED FOR YOUR BIOLOGY</span>
                            </div>
                            <div className="font-extrabold leading-snug mb-1">
                              {proto.upgradeOneLiner}
                            </div>
                            <p
                              className="text-xs leading-relaxed"
                              style={{ color: tokens.textSecondary }}
                            >
                              {proto.clinicalWhy}
                            </p>
                          </div>

                          {/* Footer Bar: Pathways + Resulting Longevity Score */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                            <div className="flex flex-wrap gap-1.5">
                              {proto.pathways.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs font-mono font-extrabold text-sky-400">
                              Score: {proto.vectorScore}/100 • {proto.paceOfAging}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Quick Protocol Switcher Pills + Synced Real @3x Screenshot */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                {LEADING_PROTOCOLS.map((proto) => {
                  const active = proto.id === selectedProtocolId;
                  return (
                    <button
                      key={proto.id}
                      type="button"
                      onClick={() => setSelectedProtocolId(proto.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                        active
                          ? "bg-sky-400 text-slate-950 border-sky-300 shadow-md"
                          : "opacity-75 hover:opacity-100"
                      }`}
                      style={
                        !active
                          ? {
                              backgroundColor: tokens.cardBg,
                              borderColor: tokens.cardBorder,
                            }
                          : undefined
                      }
                    >
                      {proto.emoji}{" "}
                      {proto.id === "combined"
                        ? "Combined"
                        : proto.title.split(" — ")[0].split(" ").slice(-1)[0]}
                    </button>
                  );
                })}
              </div>

              <RealPhoneFrame
                src={getShowcaseImage(
                  activeProtocolSpec.screenshotSlug,
                  previewTheme
                )}
                alt={`LEVL: OutPace Aging — ${activeProtocolSpec.shortName}`}
                caption={`${activeProtocolSpec.shortName} (${activeProtocolSpec.badge})`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 3 (#adaptive-8020):
            "Toggle Your Biology & Daily Reality"
            3-State Interactive Mode Switcher + <RealPhoneFrame />
           ==================================================================== */}
        <section
          id="adaptive-8020"
          className="py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                  style={{ color: tokens.duskIndigo }}
                >
                  TOGGLE YOUR BIOLOGY &amp; DAILY REALITY • ADAPTIVE ROUTINE GOVERNOR
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2.5 leading-tight">
                  Toggle Your Biology &amp; Daily Reality:{" "}
                  <span style={{ color: tokens.accentEmerald }}>
                    80/20 Survival Shield &amp; Poor Sleep Triage.
                  </span>
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Rigid 25-step checklists cause “all-or-nothing burnout” on
                  travel days or poor sleep nights.{" "}
                  <strong style={{ color: tokens.textPrimary }}>
                    LEVL: OutPace Aging
                  </strong>{" "}
                  dynamically scales your daily routine across Optimal Bandwidth,
                  High-Stress / Travel Day (80/20 Survival Shield), and Poor
                  Sleep Recovery so your streak and biology never break.
                </p>
              </div>

              {/* 3-State Interactive Mode Switcher Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {ADAPTIVE_GOVERNOR_MODES.map((m) => {
                  const active = governorMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setGovernorMode(m.id)}
                      className="p-3.5 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.01]"
                      style={{
                        backgroundColor: active
                          ? isDark
                            ? "rgba(16, 185, 129, 0.15)"
                            : "rgba(13, 148, 136, 0.12)"
                          : tokens.cardBg,
                        borderColor: active
                          ? tokens.accentEmerald
                          : tokens.cardBorder,
                        boxShadow: active
                          ? "0 0 25px -5px rgba(16, 185, 129, 0.30)"
                          : "none",
                      }}
                    >
                      <span
                        className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 inline-block mb-1"
                        style={{ color: tokens.accentEmerald }}
                      >
                        {m.stateLabel} • {m.badge}
                      </span>
                      <div className="font-extrabold text-sm leading-snug">
                        {m.title}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: tokens.textSecondary }}
                      >
                        {m.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Mode Details Card */}
              <div
                className="p-5 rounded-3xl border backdrop-blur-xl space-y-3"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold">
                    {activeGovernorSpec.headline}
                  </h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {activeGovernorSpec.kpiBadge}
                  </span>
                </div>
                <p
                  className="text-sm sm:text-[15px]"
                  style={{ color: tokens.textSecondary }}
                >
                  {activeGovernorSpec.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
                  {activeGovernorSpec.bullets.map((step) => (
                    <div
                      key={step}
                      className="p-2.5 rounded-xl border flex items-start gap-2"
                      style={{ borderColor: tokens.cardBorder }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Real @3x Screenshot Inside <RealPhoneFrame /> + Quick Pill Switcher Above Phone */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                {ADAPTIVE_GOVERNOR_MODES.map((m) => {
                  const active = governorMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setGovernorMode(m.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                        active
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md"
                          : "opacity-75 hover:opacity-100"
                      }`}
                      style={
                        !active
                          ? {
                              backgroundColor: tokens.cardBg,
                              borderColor: tokens.cardBorder,
                            }
                          : undefined
                      }
                    >
                      {m.pillLabel}
                    </button>
                  );
                })}
              </div>

              <RealPhoneFrame
                src={getShowcaseImage(activeGovernorSpec.slug, previewTheme)}
                alt={activeGovernorSpec.caption}
                caption={activeGovernorSpec.caption}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 4 (#modality-applets):
            "Modality-Specific Interactive Applets"
            Single-Screen Layout: Left Header + 2x4 Applet Selector Grid + Active Detail Card | Right <RealPhoneFrame />
           ==================================================================== */}
        <section
          id="modality-applets"
          className="py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Section Header + 2x4 Compact Selector Grid + Active Applet Clinical Spec Card */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                  style={{ color: tokens.accentEmerald }}
                >
                  MODALITY-SPECIFIC INTERACTIVE APPLETS
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2.5 leading-tight">
                  Don’t Just Check a Box.{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: isDark
                        ? "linear-gradient(135deg, #10B981 0%, #38BDF8 60%, #A855F7 100%)"
                        : "linear-gradient(135deg, #0D9488 0%, #0284C7 60%, #4F46E5 100%)",
                    }}
                  >
                    Execute Every Modality with Built-In Clinical Applets.
                  </span>
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Select any of the 8 built-in clinical applets below to inspect
                  its biological execution guidance and live screen inside{" "}
                  <strong style={{ color: tokens.textPrimary }}>
                    LEVL: OutPace Aging
                  </strong>
                  .
                </p>
              </div>

              {/* 2x4 Compact Applet Selector Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MODALITY_APPLETS.map((applet) => {
                  const isSelected = applet.id === activeAppletId;
                  return (
                    <button
                      key={applet.id}
                      type="button"
                      onClick={() => setActiveAppletId(applet.id)}
                      className="p-3 sm:p-3.5 rounded-2xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer hover:scale-[1.01]"
                      style={{
                        backgroundColor: isSelected
                          ? isDark
                            ? "rgba(14, 165, 233, 0.14)"
                            : "rgba(224, 242, 254, 0.80)"
                          : tokens.cardBg,
                        borderColor: isSelected
                          ? tokens.accentCyan
                          : tokens.cardBorder,
                        boxShadow: isSelected
                          ? "0 0 22px -6px rgba(14, 165, 233, 0.30)"
                          : "none",
                      }}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl leading-none shrink-0">
                          {applet.emoji}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-extrabold text-xs sm:text-sm tracking-tight truncate">
                            {applet.title}
                          </span>
                          <span
                            className="block text-[11px] font-mono truncate"
                            style={{ color: tokens.accentCyan }}
                          >
                            {applet.subtitle}
                          </span>
                        </span>
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isSelected ? "bg-sky-400" : "bg-white/15"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Active Applet Expanded Clinical Detail Box */}
              <div
                className="p-4 sm:p-5 rounded-3xl border backdrop-blur-xl space-y-2.5"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.accentCyan,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{activeAppletSpec.emoji}</span>
                    <h3 className="text-base sm:text-lg font-extrabold">
                      {activeAppletSpec.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      borderColor: tokens.cardBorder,
                      color: tokens.accentCyan,
                    }}
                  >
                    {activeAppletSpec.subtitle}
                  </span>
                </div>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  {activeAppletSpec.details}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeAppletSpec.badges.map((b) => (
                    <span
                      key={b}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Synced <RealPhoneFrame /> */}
            <div className="lg:col-span-5 flex justify-center">
              <RealPhoneFrame
                src={getShowcaseImage(activeAppletSpec.slug, previewTheme)}
                alt={activeAppletSpec.caption}
                caption={activeAppletSpec.caption}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 5 (#core-intelligence):
            "Identify what actually works to slow your pace of aging"
            Single-Screen Layout: Left <RealPhoneFrame /> | Right Header + 6 Compact Intelligence Cards
           ==================================================================== */}
        <section
          id="core-intelligence"
          className="py-14 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div id="vector-score" className="scroll-mt-28" />
          <div id="clinical-evidence" className="scroll-mt-28" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Synced <RealPhoneFrame /> */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <RealPhoneFrame
                src={getShowcaseImage(activeIntelSpec.slug, previewTheme)}
                alt={activeIntelSpec.caption}
                caption={activeIntelSpec.caption}
              />
            </div>

            {/* Right Column: Compact Section Header + 6 Click-to-Expand Intelligence Cards */}
            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                  style={{ color: tokens.accentCyan }}
                >
                  BIOLOGICAL INTELLIGENCE &amp; OUTCOME ATTRIBUTION ENGINE
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2.5 leading-tight">
                  Identify what <em className="italic font-serif">actually</em>{" "}
                  works to{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #F472B6 100%)",
                    }}
                  >
                    slow your pace of aging
                  </span>
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  <strong style={{ color: tokens.textPrimary }}>
                    LEVL: OutPace Aging
                  </strong>{" "}
                  closes the loop—connecting your daily adherence to your 0–100
                  Longevity Score, N-of-1 Biomarker Attribution, Hallmarks of
                  Aging Radar, Functional Age Testing, and AI Coach.
                </p>
              </div>

              <div className="space-y-2">
                {CORE_INTELLIGENCE_CARDS.map((card) => {
                  const isSelected = card.id === activeIntelId;
                  const panelId = `intel-panel-${card.id}`;
                  return (
                    <div
                      key={card.id}
                      className="rounded-2xl border backdrop-blur-xl transition-all"
                      style={{
                        backgroundColor: isSelected
                          ? isDark
                            ? "rgba(16, 185, 129, 0.12)"
                            : "rgba(209, 250, 229, 0.70)"
                          : tokens.cardBg,
                        borderColor: isSelected
                          ? tokens.accentEmerald
                          : tokens.cardBorder,
                        boxShadow: isSelected
                          ? "0 0 22px -6px rgba(16, 185, 129, 0.28)"
                          : "none",
                      }}
                    >
                      <h3 className="m-0">
                        <button
                          type="button"
                          aria-expanded={isSelected}
                          aria-controls={panelId}
                          onClick={() => setActiveIntelId(card.id)}
                          className="w-full px-4 py-3 sm:px-5 sm:py-3.5 text-left flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span className="text-xl leading-none shrink-0">
                              {card.emoji}
                            </span>
                            <span className="flex flex-wrap items-center gap-2 min-w-0">
                              <span className="font-extrabold text-sm sm:text-base tracking-tight">
                                {card.title}
                              </span>
                              <span
                                className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full border"
                                style={{
                                  borderColor: tokens.cardBorder,
                                  color: tokens.accentEmerald,
                                }}
                              >
                                {card.subtitle}
                              </span>
                            </span>
                          </span>

                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform ${
                              isSelected
                                ? "rotate-180 text-emerald-400"
                                : "opacity-60"
                            }`}
                          />
                        </button>
                      </h3>

                      {/* Expanded Details (Shown ONLY when expanded) */}
                      {isSelected && (
                        <div
                          id={panelId}
                          className="px-4 sm:px-5 pb-3.5 pt-2.5 border-t space-y-2 text-xs sm:text-sm leading-relaxed"
                          style={{
                            borderColor: tokens.cardBorder,
                            color: tokens.textSecondary,
                          }}
                        >
                          <p>{card.details}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {card.badges.map((b) => (
                              <span
                                key={b}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            INTERACTIVE CIRCADIAN TIME-BLOCK EXPLORER (#circadian-engine)
           ==================================================================== */}
        <section
          id="circadian-engine"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
              style={{ color: tokens.dawnAmber }}
            >
              CHRONOBIOLOGY ENGINE • 4 DAILY BIOLOGICAL WINDOWS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Right Modality. Right Dose.{" "}
              <span style={{ color: tokens.dawnAmber }}>
                Right Biological Hour.
              </span>
            </h2>
            <p
              className="text-base sm:text-lg"
              style={{ color: tokens.textSecondary }}
            >
              Click each circadian time block below to see how{" "}
              <strong style={{ color: tokens.textPrimary }}>
                LEVL: OutPace Aging
              </strong>{" "}
              sequences your day from Morning Sunlight Anchor #1 to Evening
              Glymphatic Wind-Down.
            </p>
          </div>

          {/* 4-Phase Interactive Switcher */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {CIRCADIAN_PHASES.map((phase) => {
              const isSelected = phase.id === selectedPhaseId;
              const accent = isDark ? phase.darkAccent : phase.lightAccent;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className="p-4 rounded-2xl border text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? isDark
                        ? "rgba(11, 14, 23, 0.95)"
                        : "#FFFFFF"
                      : tokens.cardBg,
                    borderColor: isSelected ? accent : tokens.cardBorder,
                    boxShadow: isSelected ? `0 0 25px -5px ${accent}44` : "none",
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">{phase.emoji}</span>
                    <span
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${accent}20`,
                        color: accent,
                      }}
                    >
                      {phase.window}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm sm:text-base">
                    {phase.label}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div
                className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-6"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <div className="space-y-2">
                  <div
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider"
                    style={{
                      color: isDark
                        ? activePhaseSpec.darkAccent
                        : activePhaseSpec.lightAccent,
                    }}
                  >
                    <span>
                      {activePhaseSpec.emoji} {activePhaseSpec.label} (
                      {activePhaseSpec.window})
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {activePhaseSpec.headline}
                  </h3>
                  <p
                    className="text-[15px] sm:text-base leading-relaxed"
                    style={{ color: tokens.textSecondary }}
                  >
                    {activePhaseSpec.rationale}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {activePhaseSpec.modalities.map((mod) => (
                    <div
                      key={mod.name}
                      className="p-4 rounded-2xl border transition-all"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(6, 9, 19, 0.6)"
                          : "rgba(248, 249, 247, 0.9)",
                        borderColor: tokens.cardBorder,
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-sm sm:text-base">
                          {mod.name}
                        </h4>
                        <span
                          className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${
                              isDark
                                ? activePhaseSpec.darkAccent
                                : activePhaseSpec.lightAccent
                            }20`,
                            color: isDark
                              ? activePhaseSpec.darkAccent
                              : activePhaseSpec.lightAccent,
                          }}
                        >
                          {mod.badge}
                        </span>
                      </div>
                      <p
                        className="text-sm mb-2"
                        style={{ color: tokens.textSecondary }}
                      >
                        {mod.detail}
                      </p>
                      <div className="text-xs font-mono opacity-80">
                        <strong>Mechanism:</strong> {mod.mechanism}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <RealPhoneFrame
                src={getShowcaseImage(activePhaseSpec.slug, previewTheme)}
                alt={`LEVL: OutPace Aging — ${activePhaseSpec.label} (${activePhaseSpec.window})`}
                caption={`LEVL: OutPace Aging — ${activePhaseSpec.label} (${activePhaseSpec.window})`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            BOTTOM CONVERSION BANNER & 5-QUESTION FAQ (#faq)
           ==================================================================== */}
        <section
          id="faq"
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-28"
        >
          {/* Bottom Dual-CTA Conversion Card */}
          <div
            className="rounded-[36px] border p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl mb-20 relative overflow-hidden"
            style={{
              backgroundColor: tokens.cardBg,
              borderColor: tokens.cardBorder,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full blur-3xl pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(circle, #10B981 0%, #0ea5e9 60%, transparent 100%)",
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase border"
                style={{
                  borderColor: tokens.accentEmerald,
                  color: tokens.accentEmerald,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                LEVL: OutPace Aging
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                OutPace Aging With Your{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(135deg, #10B981 0%, #0ea5e9 100%)"
                      : "linear-gradient(135deg, #0D9488 0%, #0284C7 100%)",
                  }}
                >
                  Daily Longevity Operating System.
                </span>
              </h2>

              <p
                className="text-base sm:text-lg"
                style={{ color: tokens.textSecondary }}
              >
                Join the Early Access cohort or enter your VIP activation code to
                launch{" "}
                <strong style={{ color: tokens.textPrimary }}>
                  LEVL: OutPace Aging
                </strong>{" "}
                immediately.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openModal("waitlist")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openModal("vip")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm sm:text-base border hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(15,23,42,0.05)",
                    borderColor: tokens.cardBorder,
                  }}
                >
                  <KeyRound className="w-4 h-4 text-sky-400" />
                  <span>Unlock with VIP Code</span>
                </button>
              </div>
            </div>
          </div>

          {/* 12-Question Comprehensive FAQ */}
          <div className="space-y-4">
            <div className="text-center mb-8">
              <span
                className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                style={{ color: tokens.accentEmerald }}
              >
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Everything You Need to Know About LEVL: OutPace Aging
              </h3>
            </div>

            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={item.q}
                name="levl-app-faq"
                open={idx === 0}
                className="group rounded-2xl border backdrop-blur-xl overflow-hidden transition-all"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <summary className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <ChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div
                  className="px-6 pb-5 text-sm sm:text-base leading-relaxed border-t pt-3.5"
                  style={{
                    color: tokens.textSecondary,
                    borderColor: tokens.cardBorder,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Shared Website Footer with App Early Access Modal Hook */}
      <Footer onEarlyAccessClick={() => openModal("waitlist")} />

      {/* Early Access + VIP Invite Code Modal */}
      <EarlyAccessModal
        isOpen={modalOpen}
        initialTab={modalInitialTab}
        theme={previewTheme}
        webAppUrl={LEVL_WEB_APP_URL}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
