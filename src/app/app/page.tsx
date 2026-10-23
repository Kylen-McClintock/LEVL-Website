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
  IPhoneShowcaseFrame,
  type ShowcaseScreenKey,
  type ShowcaseTheme,
  type CircadianPhaseId,
  type FamousProtocolId,
  type BiologyProfileId,
  type XRayPhoneSyncConfig,
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
 * DATA DEFINITIONS: CIRCADIAN PHASES, FAMOUS PROTOCOLS X-RAY, APPLETS, INTEL, FAQ
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
  screenKey: ShowcaseScreenKey;
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
      "Outdoor solar photon flux within 30 minutes of waking triggers a healthy cortisol peak, clears residual adenosine, and starts the 14–16 hour melatonin countdown timer.",
    screenKey: "today-circadian",
    modalities: [
      {
        name: "Morning Sunlight Exposure (☀️ Circadian Anchor #1)",
        badge: "10–15m • 10,000+ Lux Outdoor",
        detail: "Direct outdoor sky exposure prior to artificial blue screens.",
        mechanism: "ipRGC Melanopsin → SCN Cortisol Pulse",
      },
      {
        name: "Delayed Caffeine Intake",
        badge: "90–120m Post-Wake",
        detail: "Allows natural adenosine washout to eliminate the 2 PM crash.",
        mechanism: "A1/A2A Receptor Sensitivity Preservation",
      },
      {
        name: "Morning Hydration + Electrolytes",
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
    screenKey: "today-circadian",
    modalities: [
      {
        name: "Targeted Nutraceutical & Senolytic Matrix",
        badge: "20mg/kg Fisetin + 1,000mg Quercetin + EVOO",
        detail: "Scheduled alongside oleic acid lipid matrix for +3.4x AUC absorption.",
        mechanism: "AMPK • SIRT1 • Senescent Cell Clearance",
      },
      {
        name: "Creatine Monohydrate + TMG",
        badge: "5g Micronized",
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
    screenKey: "modality-evidence",
    modalities: [
      {
        name: "Norwegian 4x4 VO2 Max Intervals",
        badge: "4x4m @ 90–95% HRmax",
        detail: "4 mins high-output intervals separated by 3 mins active recovery.",
        mechanism: "PGC-1α • Stroke Volume • +15–20% VO2 Max",
      },
      {
        name: "Cold Plunge (Søberg Principle)",
        badge: "50°F–55°F (10°C–13°C) • 2–3 mins",
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
    screenKey: "biomarkers-tracking",
    modalities: [
      {
        name: "Short-Wavelength Blue-Light Blockade",
        badge: "<10 Lux Overhead • 90m Pre-Bed",
        detail: "Prevents pineal melatonin suppression in the dim-light onset window.",
        mechanism: "Dim-Light Melatonin Onset (DLMO) Protection",
      },
      {
        name: "Glycine + Magnesium L-Threonate",
        badge: "3g Glycine + 144mg Elemental Mg",
        detail: "Promotes peripheral vasodilation to drop core body temperature.",
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

/* ============================================================================
 * SECTION 2 DATA: FAMOUS PROTOCOLS × YOUR BIOLOGY (1-LINE PILLS & EXPANDABLE X-RAY)
 * ============================================================================ */

interface FamousProtocolOption {
  id: FamousProtocolId;
  pillLabel: string;
  shortName: string;
  highlight?: boolean;
}

const FAMOUS_PROTOCOLS: FamousProtocolOption[] = [
  {
    id: "blueprint",
    pillLabel: "🧬 Bryan Johnson — Blueprint",
    shortName: "Blueprint",
  },
  {
    id: "huberman",
    pillLabel: "☀️ Andrew Huberman — Neuro-Circadian",
    shortName: "Huberman Neuro-Circadian",
  },
  {
    id: "attia",
    pillLabel: "🫀 Peter Attia — Outlive 3.0",
    shortName: "Attia Outlive 3.0",
  },
  {
    id: "patrick",
    pillLabel: "🔥 Rhonda Patrick — FoundMyFitness",
    shortName: "Patrick FoundMyFitness",
  },
  {
    id: "combined",
    pillLabel: "✨ Combine All 4 Protocols",
    shortName: "Combined 4-Protocol Stack",
    highlight: true,
  },
];

interface BiologyProfileSpec {
  id: BiologyProfileId;
  pillLabel: string;
  label: string;
  blockedStrikethrough: string;
  blockedAction: string;
  blockedClinicalWhy: string;
  blockedPathways: string[];
  upgradeOneLiner: string;
  upgradeClinicalWhy: string;
  upgradePathways: string[];
  beforeAfterSummary: string;
  phoneAdaptationBanner: string;
  phoneBlockedSummary: string;
  phoneUpgradedTaskTitle: string;
  phoneUpgradedTaskSub: string;
  phoneUpgradedTaskBadge: string;
  vectorScore: number;
  paceOfAging: string;
}

const BIOLOGY_PROFILES: BiologyProfileSpec[] = [
  {
    id: "lifting-apob",
    pillLabel: "🏋️ Lifting Heavy Today + High ApoB",
    label: "Lifting Heavy Today + High ApoB",
    blockedStrikethrough: "Post-Lift Cold Plunge (50°F)",
    blockedAction: "Auto-Moved to Rest Day",
    blockedClinicalWhy:
      "Cold immersion or AMPK agonists (Metformin) within 4 hours after heavy resistance training blunts mTORC1, IGF-1, and ribosomal muscle protein synthesis by up to 24%.",
    blockedPathways: ["mTORC1 Protected", "IGF-1 Preserved", "p70S6K Ribosomal Synthesis"],
    upgradeOneLiner:
      "+ High-Polyphenol EVOO (15mL), Berberine & Post-Lift Sauna (174°F+)",
    upgradeClinicalWhy:
      "Elevates soluble fiber, Berberine/PCSK9 support, High-Polyphenol EVOO, and 20-minute post-lift Finnish dry sauna (174°F+) to drive ApoB <65 mg/dL, +eNOS endothelial compliance, and +3.2x HSP70.",
    upgradePathways: ["ApoB <65 mg/dL", "+eNOS Nitric Oxide", "+3.2x HSP70 Heat-Shock"],
    beforeAfterSummary:
      "Raw protocol post-lift ice bath & Metformin clash removed; lipid-lowering EVOO + post-lift 174°F+ sauna scheduled in Afternoon Dip window.",
    phoneAdaptationBanner:
      "Hypertrophy + ApoB Shield Active: Post-lift Cold Plunge blocked; Sauna 174°F+ & EVOO elevated.",
    phoneBlockedSummary: "Cold Plunge & Metformin moved away from lifting window",
    phoneUpgradedTaskTitle: "Post-Lift Finnish Sauna (174°F+ • 20m) + 15mL EVOO",
    phoneUpgradedTaskSub:
      "Targets ApoB <65 mg/dL, endothelial eNOS & +GH/HSP70 without blunting mTORC1",
    phoneUpgradedTaskBadge: "ApoB + mTORC1 Safe",
    vectorScore: 93,
    paceOfAging: "0.72 DunedinPACE",
  },
  {
    id: "female-biology",
    pillLabel: "🧬 Female Biology (Hormone & Thyroid Protected)",
    label: "Female Biology (Hormone & Thyroid Protected)",
    blockedStrikethrough: "Extreme 18h Fast (11 AM Cutoff) + Fasted HIIT",
    blockedAction: "Converted to 12.5h Window + 30g Morning Protein",
    blockedClinicalWhy:
      "Aggressive 18-hour fasting windows and fasted high-intensity intervals in female physiology downregulate kisspeptin neurons and T3 thyroid conversion while spiking morning HPA-axis cortisol.",
    blockedPathways: ["Kisspeptin Protected", "Free T3 Thyroid Shield", "HPA-Axis Cortisol Calm"],
    upgradeOneLiner:
      "+ 30g Protein Within 45m of Waking, Piezo1 Axial Loading & 56°F Cold Calibration",
    upgradeClinicalWhy:
      "Prioritizes Heavy Axial Resistance + Plyometrics (Piezo1 osteoblast activation for Bone Density), Ferritin/Iron tracking, and warms Cold Plunge to 55°F–58°F to prevent luteal vasoconstriction.",
    upgradePathways: ["Piezo1 Bone Density", "HPG Endocrine Axis", "Ferritin & Luteal Shield"],
    beforeAfterSummary:
      "18h extreme fast & fasted HIIT replaced with hormone-safe 12.5h circadian feeding, morning protein anchor, and heavy axial bone loading.",
    phoneAdaptationBanner:
      "Female Endocrine & Bone Shield: 12.5h eTRE + 30g Morning Protein + Piezo1 Axial Loading.",
    phoneBlockedSummary: "18h extreme fast & fasted HIIT replaced to protect T3/Kisspeptin",
    phoneUpgradedTaskTitle: "30g Protein Post-Wake + Heavy Axial Loading (Piezo1)",
    phoneUpgradedTaskSub:
      "Protects HPG/Thyroid axis, Ferritin & Lumbar/Hip BMD; Cold Plunge calibrated to 56°F",
    phoneUpgradedTaskBadge: "Hormone + BMD Shield",
    vectorScore: 92,
    paceOfAging: "0.73 DunedinPACE",
  },
  {
    id: "sleep-debt",
    pillLabel: "😴 Slept 5.5 Hours (Low HRV)",
    label: "Slept 5.5 Hours (Low HRV)",
    blockedStrikethrough: "Norwegian 4x4 VO2 Max & 50°F Cold Plunge",
    blockedAction: "Auto-Benched Today by Adaptive Sleep Triage",
    blockedClinicalWhy:
      "Executing 95% HRmax sympathetic intervals on <6 hours of sleep compounds autonomic strain, spikes afternoon cortisol, and suppresses overnight HRV rebound.",
    blockedPathways: ["CNS Overtraining Blocked", "Autonomic HRV Protected", "Cortisol Capped"],
    upgradeOneLiner:
      "+ 20m Afternoon NSDR (14:00–16:00) & Acute 10g Creatine Prefrontal ATP Buffer",
    upgradeClinicalWhy:
      "Doubles Creatine Monohydrate from 5g → 10g to restore sleep-deprived prefrontal cortex phosphocreatine ATP and injects a guided 20-minute Non-Sleep Deep Rest (NSDR) parasympathetic reset.",
    upgradePathways: ["Prefrontal ATP Repletion", "+Vagal Parasympathetic Tone", "Adenosine Clearance"],
    beforeAfterSummary:
      "High-CNS 4x4 intervals automatically moved to Thursday; today's feed recalibrated for cognitive ATP recovery and early slow-wave sleep.",
    phoneAdaptationBanner:
      "Wearable Sleep Triage (<6h): High-CNS 4x4 benched; 10g Creatine + 20m NSDR injected.",
    phoneBlockedSummary: "Norwegian 4x4 & 50°F Cold Plunge auto-benched today",
    phoneUpgradedTaskTitle: "10g Acute Creatine Buffer + 20m Afternoon NSDR",
    phoneUpgradedTaskSub:
      "Restores prefrontal ATP & parasympathetic HRV rebound without sympathetic overtraining",
    phoneUpgradedTaskBadge: "CNS Recovery Mode",
    vectorScore: 88,
    paceOfAging: "0.75 DunedinPACE",
  },
  {
    id: "busy-travel",
    pillLabel: "⏱️ Busy Day (Only Have 20 Mins)",
    label: "Busy Day (Only Have 20 Mins)",
    blockedStrikethrough: "20 Secondary & Marginal Protocol Steps",
    blockedAction: "Auto-Deferred (Streak Protected)",
    blockedClinicalWhy:
      "Trying to force a rigid 24-step routine on a packed travel or executive workday causes 'all-or-nothing' protocol abandonment. Deferring Tier-2/Tier-3 items preserves consistency.",
    blockedPathways: ["Zero Burnout", "Streak Preserved", "Pareto 80/20 Filter"],
    upgradeOneLiner:
      "+ Locks In Top 4 Tier-1 Pareto Anchors (82% Biological ROI in 20 Mins)",
    upgradeClinicalWhy:
      "Filters your entire day down to 4 portable Tier-1 anchors: (1) 10m Outdoor Morning Sunlight, (2) 5g Creatine + Essential Lipids, (3) 15m Post-Meal Glucose Walk, and (4) Evening Mg L-Threonate + 3g Glycine.",
    upgradePathways: ["SCN Phase Lock", "GLUT4 Glucose Disposal", "Slow-Wave Sleep Shield"],
    beforeAfterSummary:
      "24-step checklist compressed into 4 zero-equipment Tier-1 anchors you can execute anywhere in under 20 minutes while retaining 82% biological ROI.",
    phoneAdaptationBanner:
      "🛡️ 80/20 Pareto Survival Mode Active: 20 secondary steps deferred; Top 4 Anchors locked.",
    phoneBlockedSummary: "20 secondary & marginal tasks auto-deferred (Streak Protected)",
    phoneUpgradedTaskTitle: "Top 4 Pareto Tier-1 Anchors (82% Biological ROI)",
    phoneUpgradedTaskSub:
      "10m Morning Sunlight • 5g Creatine • 15m Glucose Walk • Evening Mg + Glycine",
    phoneUpgradedTaskBadge: "82% ROI in 20m",
    vectorScore: 86,
    paceOfAging: "0.76 DunedinPACE",
  },
];

/* ============================================================================
 * SECTION 3 DATA: 6 MODALITY-SPECIFIC INTERACTIVE APPLETS
 * ============================================================================ */

interface ModalityAppletCardSpec {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  hook: string;
  details: string;
  badges: string[];
  screenKey: ShowcaseScreenKey;
  caption: string;
}

const MODALITY_APPLETS: ModalityAppletCardSpec[] = [
  {
    id: "breathwork",
    emoji: "🌬️",
    title: "Guided Breathwork Visuals",
    subtitle: "Cyclic Sighing • Box • 4-7-8",
    hook: "Real-time expanding visual breath orb, phase timers, and 432Hz binaural audio.",
    details:
      "Guides Stanford RCT Cyclic Sighing (double nasal inhale + slow oral exhale), Navy SEAL 4-4-4-4 Box Breathing, and 4-7-8 Parasympathetic Breathwork with haptic phase cues and pre/post stress logging.",
    badges: ["Stanford RCT Cyclic Sigh", "432Hz Binaural Audio", "Pre/Post Stress Delta"],
    screenKey: "applet-breathwork",
    caption: "Live Cyclic Sighing Applet • 432Hz Audio & Stress Delta",
  },
  {
    id: "fasting",
    emoji: "🔥",
    title: "360° Fasting & Autophagy Companion",
    subtitle: "Metabolic Stage Tracker",
    hook: "Tracks your real-time transition from glycogen depletion to deep cellular autophagy.",
    details:
      "Maps your fast across 7 biological stages (0–4h Anabolic, 4–12h Glycogenolysis, 12–16h Ketosis & BHB, 16–18h AMPK Autophagy, 18–24h Mitophagy, 24h+ Peak HGH) plus a built-in Glucose-Ketone Index (GKI) calculator.",
    badges: ["7 Metabolic Stages", "mTORC1 / ULK1 Autophagy", "Built-In GKI Calculator"],
    screenKey: "applet-fasting",
    caption: "360° Fasting Companion • Stage 4 Cellular Autophagy & GKI",
  },
  {
    id: "thermal",
    emoji: "❄️",
    title: "Cold Plunge & Sauna Thermal Pacer",
    subtitle: "Søberg & HSP70 Timer",
    hook: "Temperature-calibrated timers for 50°F–55°F cold immersion and 174°F+ Finnish sauna.",
    details:
      "Enforces the Søberg Principle (natural shivering re-warm after cold plunge to activate brown adipose UCP1) and tracks cumulative weekly thermal thresholds (11 mins/wk Cold • 80 mins/wk Sauna for 40% ACM reduction).",
    badges: ["Søberg Principle Re-Warm", "+250% Norepinephrine", "11m Cold / 80m Sauna Weekly"],
    screenKey: "applet-thermal",
    caption: "Cold Plunge & Thermal Applet • Søberg Principle Armed",
  },
  {
    id: "sunlight",
    emoji: "☀️",
    title: "Morning Sunlight & Live UV/Lux Session",
    subtitle: "Circadian Phase Lock",
    hook: "Auto-adjusts outdoor viewing time based on live sky cover, UV index, and solar angle.",
    details:
      "Calibrates exact duration (10m Clear Sky • 10,000+ Lux, 15–20m Overcast, 30m Rain/Heavy Cloud) to trigger melanopsin ipRGC signaling, morning cortisol peak, and a 16-hour melatonin countdown timer.",
    badges: ["Live Lux & Sky Calibration", "ipRGC Melanopsin Lock", "16h Melatonin Timer"],
    screenKey: "applet-sunlight",
    caption: "Morning Sunlight & Lux Applet • SCN Circadian Phase Lock",
  },
  {
    id: "hiit",
    emoji: "🏋️",
    title: "Live HIIT, Zone 2 & Strength Companion",
    subtitle: "VO2 Max & BFR Pacer",
    hook: "Guided Norwegian 4x4 intervals, Zone 2 mitochondrial pacing, and Centenarian Strength logging.",
    details:
      "Paces 4-minute 85–95% Max HR VO2 Max intervals with 3-minute active recoveries, tracks weekly Zone 2 aerobic base (150–180m/wk), and logs Blood Flow Restriction (BFR), dead hangs, and compound lifts.",
    badges: ["Norwegian 4x4 VO2 Max", "150–180m/wk Zone 2", "BFR & Centenarian Strength"],
    screenKey: "applet-hiit",
    caption: "Norwegian 4x4 HIIT Pacer • 91% Max HR VO2 Max Peak Zone",
  },
  {
    id: "peptide",
    emoji: "🧪",
    title: "Peptide Reconstitution & Site Rotation",
    subtitle: "Precision SubQ Companion",
    hook: "Zero-math bacteriostatic water dilution, insulin syringe visualizer, and 8-zone site rotation.",
    details:
      "Calculates exact tick marks on 100-unit / 50-unit / 30-unit U-100 syringes from vial mg + BAC water mL + target mcg dose, and tracks 8 subcutaneous rotation zones so you never lipohypertrophy a site.",
    badges: ["U-100 Syringe Visualizer", "Zero-Math Dilution", "8-Zone SubQ Rotation Map"],
    screenKey: "applet-peptide",
    caption: "Peptide Reconstitution & 8-Zone SubQ Rotation Map",
  },
];

/* ============================================================================
 * SECTION 4 DATA: 6 CORE INTELLIGENCE & N-OF-1 DISCOVERY CARDS
 * ============================================================================ */

interface CoreIntelligenceCardSpec {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  hook: string;
  details: string;
  badges: string[];
  screenKey: ShowcaseScreenKey;
  caption: string;
}

const CORE_INTELLIGENCE_CARDS: CoreIntelligenceCardSpec[] = [
  {
    id: "outcomes",
    emoji: "🎯",
    title: 'Outcome Tracking & N-of-1 Attribution',
    subtitle: '"What Actually Works"',
    hook: "Correlates every modality you execute against real changes in Deep Sleep, Focus, Energy, and HRV.",
    details:
      'Log rapid pre/post modality outcome shifts and 28-day adherence ROI. LEVL isolates which habits are driving 80% of your real-world gains—and flags "biological freeloaders" you can bench to save time and money.',
    badges: ["91% Realized Protocol ROI", "28-Day N-of-1 Attribution", "Low-ROI Leak Detector"],
    screenKey: "intel-outcomes",
    caption: "Outcome ROI & Attribution (/tracking) • 91% Realized Protocol ROI",
  },
  {
    id: "longevity-score",
    emoji: "🏆",
    title: "Longevity Score & 8-Vector Biological Radar",
    subtitle: "/longevity-score",
    hook: "Real-time Daily Pace vs. Protocol Ceiling, 6 Foundational Pillars, and 8 Longevity Vectors.",
    details:
      "Tracks your live daily execution (89 / 94 Ceiling + +4 Surplus Points), exponentially weighted 28-Day Rolling Pace (91/99), 6 Foundational Pillars (Sleep, Nutrition, Movement, Bio-Opt, Autonomic, Avoidance), and all 8 Canonical Biological Vectors (Heart, Brain, Metabolic, Cancer Defense, Hormones, Inflammation, Bone, Cellular).",
    badges: ["89 / 94 Daily Ceiling", "+4 Surplus Points", "8 Vectors + 6 Pillars"],
    screenKey: "longevity-score",
    caption: "Longevity Score (/longevity-score) • 89/94 Ceiling & 8-Vector Radar",
  },
  {
    id: "bio-age",
    emoji: "🧬",
    title: "Physiological Age Testing",
    subtitle: "Calico UK Biobank Model",
    hook: "Measure your true functional biological age at home without waiting 6 months for an epigenetic blood kit.",
    details:
      "Powered by Calico Life Sciences' UK Biobank Partial Least Squares (PLS) aging model—combines guided at-home functional tests (Eyes-Closed Single-Leg Balance, Visual Reaction Time, Dead Hang / Grip Strength, VO2 Max) with blood biomarkers to compute your Physiological Age and ΔAge Gap.",
    badges: ["Calico UK Biobank PLS Model", "Calculated Age: 29.4 yrs", "ΔAge: -6.6 yrs"],
    screenKey: "intel-bio-age",
    caption: "Physiological Age (/physiological-age) • ΔAge -6.6 Years",
  },
  {
    id: "emotions",
    emoji: "🎭",
    title: "144-Emotion & Circadian Wellbeing Check-in",
    subtitle: "Autonomic Mapping",
    hook: "Interactive 2D emotion quadrant word-cloud that maps how you feel to neurotransmitter & autonomic pathways.",
    details:
      "Pan across 144 granular emotional states (High Energy Pleasant, Low Energy Pleasant, High Energy Unpleasant, Low Energy Unpleasant) plus morning/evening sleep, meal cutoff, and live local UV/weather confounders—automatically translating your mood into targeted protocol adjustments.",
    badges: ["144 Granular Emotion States", "Dopamine / Vagal Tone Map", "Meal Cutoff & UV Confounders"],
    screenKey: "intel-emotions",
    caption: "144-Emotion & Wellbeing Check-in • 2D Autonomic Mapping",
  },
  {
    id: "hallmarks",
    emoji: "🔬",
    title: "Deep Insights, 12 Hallmarks of Aging & Bio-Gap Solver",
    subtitle: "Systems Biology Audit",
    hook: "Audits your stack across all 12 Hallmarks of Aging and blood biomarkers to expose hidden blind spots.",
    details:
      "Maps your active modalities against Mitochondrial Dysfunction, Cellular Senescence, Autophagy, Epigenetic Alterations, Telomere Attrition, and Inflammaging, cross-referencing your blood panels (ApoB, hs-CRP, Fasting Insulin, Homocysteine) to rank your #1 Next Best Action.",
    badges: ["12 Hallmarks of Aging", "Automated Bio-Gap Solver", "Blood Panel Cross-Check"],
    screenKey: "intel-hallmarks",
    caption: "12 Hallmarks Radar & Bio-Gap Solver • 1-Tap Gap Resolution",
  },
  {
    id: "ai-coach",
    emoji: "✨",
    title: "Context-Aware AI Longevity Coach",
    subtitle: "/coach",
    hook: "Your 24/7 systems-biology strategist that knows your stack, labs, sleep, and PubMed evidence.",
    details:
      'Ask anything—from "Should I skip Norwegian 4x4 today since my HRV dropped?" to "What’s the highest-ROI swap for lowering my ApoB without statin myalgia?"—and get instant, citation-backed answers with 1-tap buttons to update your Today schedule.',
    badges: ["Stack + Lab + Sleep Context", "PMID Citation-Backed", "1-Tap Schedule Updates"],
    screenKey: "intel-ai-coach",
    caption: "AI Longevity Coach (/coach) • Context-Aware Schedule Swaps",
  },
];

const FAQ_ITEMS = [
  {
    q: "How do I install LEVL: OutPace Aging as a native app on iOS or Android?",
    a: "LEVL: OutPace Aging is engineered as a zero-bloat, 120Hz Progressive Web App (PWA). Once you unlock access with your VIP code (or early access invite), open the app in Safari on iOS or Chrome on Android, tap Share → 'Add to Home Screen', and launch it directly from your dock with fullscreen native gestures and offline-ready circadian caching.",
  },
  {
    q: "How does LEVL: OutPace Aging personalize famous protocols to my biology?",
    a: "Famous protocols like Bryan Johnson’s Blueprint or Huberman’s routine were designed around a single person’s schedule and physiology. LEVL: OutPace Aging cross-checks every modality against your sex/hormone profile, lifting days, sleep readiness (Oura/Whoop/Apple Watch), and blood biomarkers (ApoB, hs-CRP, Fasting Insulin)—automatically blocking pathway clashes like post-lift cold plunges or extreme fasts that hurt thyroid and hormone health.",
  },
  {
    q: "How does LEVL: OutPace Aging identify what actually works for my body?",
    a: "Through closed-loop N-of-1 Outcome Tracking, the 144-Emotion autonomic check-in, Calico-informed at-home Physiological Age tests, and blood biomarker trends, LEVL correlates your daily protocol adherence against measurable improvements in Deep Sleep, HRV, Focus, and Biological Age—highlighting high-ROI anchors and flagging biological freeloaders.",
  },
  {
    q: "How does the 3-Tier Clinical Evidence Rubric score each modality?",
    a: "Every modality in our 100+ intervention library is graded by human clinical trial rigor (Grade A Human RCTs down to emerging mechanistic studies) and assigned a 0–100 Vector Impact Score across three tiers: Tier-1 Anchors (65–100, e.g., Norwegian 4x4 VO2 Max, Morning Sunlight, Finnish Sauna), Tier-2 Synergists (35–64), and Tier-3 Marginals (<35).",
  },
  {
    q: "What happens when I travel or get poor sleep?",
    a: "Instead of letting a rigid 25-step checklist cause 'all-or-nothing burnout,' you can toggle 1-Tap 80/20 Survival Mode to filter your day down to your top 4 Tier-1 Pareto anchors (retaining 82% of your biological ROI in under 20 minutes), or let Adaptive Sleep Triage automatically swap high-CNS strain intervals for NSDR and 10g Creatine recovery when you sleep under 6 hours.",
  },
];

export default function LevlAppShowcasePage() {
  const [previewTheme, setPreviewTheme] = useState<ShowcaseTheme>("dark");
  const [heroFocusScreen, setHeroFocusScreen] =
    useState<ShowcaseScreenKey>("today-circadian");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<ModalTab>("waitlist");

  // Section 2: "Famous Protocols × Your Biology" X-Ray state + Click-to-Expand cards
  const [selectedProtocolId, setSelectedProtocolId] =
    useState<FamousProtocolId>("blueprint");
  const [selectedProfileId, setSelectedProfileId] =
    useState<BiologyProfileId>("lifting-apob");
  const [expandedXrayCards, setExpandedXrayCards] = useState<
    Record<string, boolean>
  >({
    blocked: false,
    upgraded: false,
    result: false,
  });

  // Section 3: Modality-Specific Interactive Applets (6 click-to-expand cards)
  const [activeAppletId, setActiveAppletId] = useState<string>("breathwork");

  // Section 4: Core Intelligence & N-of-1 Discovery Engine (6 click-to-expand cards)
  const [activeIntelId, setActiveIntelId] = useState<string>("outcomes");

  // Circadian Phase Explorer state
  const [selectedPhaseId, setSelectedPhaseId] =
    useState<CircadianPhaseId>("dawn");

  // Adaptive 80/20 Survival Mode & Sleep Triage state
  const [governorMode, setGovernorMode] = useState<
    "optimal" | "sleep-triage" | "pareto-8020"
  >("pareto-8020");

  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const isDark = previewTheme === "dark";

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

  const toggleXrayCard = (key: "blocked" | "upgraded" | "result") => {
    setExpandedXrayCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activePhaseSpec =
    CIRCADIAN_PHASES.find((p) => p.id === selectedPhaseId) ||
    CIRCADIAN_PHASES[0];

  const activeProtocolSpec =
    FAMOUS_PROTOCOLS.find((p) => p.id === selectedProtocolId) ||
    FAMOUS_PROTOCOLS[0];

  const activeProfileSpec =
    BIOLOGY_PROFILES.find((p) => p.id === selectedProfileId) ||
    BIOLOGY_PROFILES[0];

  const activeAppletSpec =
    MODALITY_APPLETS.find((a) => a.id === activeAppletId) ||
    MODALITY_APPLETS[0];

  const activeIntelSpec =
    CORE_INTELLIGENCE_CARDS.find((c) => c.id === activeIntelId) ||
    CORE_INTELLIGENCE_CARDS[0];

  const xraySyncPayload: XRayPhoneSyncConfig = {
    protocolName: activeProtocolSpec.shortName,
    profileLabel: activeProfileSpec.label,
    profileId: activeProfileSpec.id,
    adaptationBanner: activeProfileSpec.phoneAdaptationBanner,
    blockedSummary: activeProfileSpec.phoneBlockedSummary,
    upgradedTaskTitle: activeProfileSpec.phoneUpgradedTaskTitle,
    upgradedTaskSub: activeProfileSpec.phoneUpgradedTaskSub,
    upgradedTaskBadge: activeProfileSpec.phoneUpgradedTaskBadge,
    vectorScore: activeProfileSpec.vectorScore,
    paceOfAging: activeProfileSpec.paceOfAging,
  };

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
          SHARED SITE <Navbar /> AT TOP OF /app
         ==================================================================== */}
      <div className="relative z-50">
        <Navbar showCart={false} />
      </div>

      {/* ====================================================================
          SECONDARY FLOATING / STICKY SUB-BAR JUST BELOW <Navbar />
         ==================================================================== */}
      <div
        className="sticky top-14 md:top-16 z-40 border-y backdrop-blur-xl transition-colors duration-300 mt-14 md:mt-16"
        style={{
          backgroundColor: isDark
            ? "rgba(6, 9, 19, 0.86)"
            : "rgba(248, 249, 247, 0.92)",
          borderColor: tokens.cardBorder,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          {/* Left: LEVL: OutPace Aging Badge + Quick Section Jump Links */}
          <div className="flex items-center gap-4 lg:gap-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border shrink-0"
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
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LEVL: OutPace Aging
            </span>

            <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold tracking-wide">
              {[
                { label: "Overview", href: "#overview" },
                {
                  label: "Famous Protocols × Biology",
                  href: "#famous-protocols",
                },
                { label: "Modality Applets", href: "#modality-applets" },
                { label: "What Actually Works", href: "#core-intelligence" },
                { label: "80/20 Adaptive Mode", href: "#adaptive-8020" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-opacity hover:opacity-100 opacity-75 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Interactive App Theme Toggle + Unlock with VIP Code + Join Early Access */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                isDark ? "Light Mode" : "Dark Mode"
              }`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.cardBorder,
              }}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">🌙 Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">☀️ Light Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => openModal("vip")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer hover:opacity-90"
              style={{
                borderColor: tokens.cardBorder,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(15,23,42,0.04)",
              }}
            >
              <KeyRound className="w-3.5 h-3.5 text-sky-400" />
              <span>Unlock with VIP Code</span>
            </button>

            <button
              type="button"
              onClick={() => openModal("waitlist")}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-sky-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Join Early Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-grow">
        {/* ====================================================================
            SECTION 1 — HERO SECTION (#overview)
           ==================================================================== */}
        <section
          id="overview"
          className="pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center scroll-mt-32"
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

          {/* Standout Sub-Headline Banner (Directly below <h1>) */}
          <p className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight max-w-4xl mx-auto mb-5 leading-snug">
            Identify what <em className="italic font-serif">actually</em> works to{" "}
            <span
              className="bg-clip-text text-transparent font-extrabold"
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
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

          {/* Hero Interactive Theme Bar */}
          <div className="flex flex-col items-center justify-center mb-10">
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
          </div>

          {/* Hero Visual: 3-Phone Perspective Stage */}
          <div className="relative max-w-6xl mx-auto pt-2 pb-6">
            {/* Mobile Screen Selector Pills */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
              {[
                { key: "longevity-score" as const, label: "Longevity Score" },
                { key: "today-circadian" as const, label: "Today Feed (#1)" },
                { key: "schedule-grid" as const, label: "7-Day Week" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setHeroFocusScreen(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    heroFocusScreen === tab.key
                      ? "bg-sky-500 text-slate-950 border-sky-500"
                      : "opacity-70"
                  }`}
                  style={
                    heroFocusScreen !== tab.key
                      ? {
                          backgroundColor: tokens.cardBg,
                          borderColor: tokens.cardBorder,
                        }
                      : undefined
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Single Active Phone */}
            <div className="block lg:hidden">
              <IPhoneShowcaseFrame
                screenKey={heroFocusScreen}
                theme={previewTheme}
                priority="high"
                caption={
                  heroFocusScreen === "today-circadian"
                    ? "LEVL: OutPace Aging — Today Feed (Longevity Score 89/94 + Morning Sunlight #1)"
                    : heroFocusScreen === "longevity-score"
                    ? "LEVL: OutPace Aging — Longevity Score (89/94 Ceiling) & 8-Vector Radar"
                    : "LEVL: OutPace Aging — 7-Day Circadian Schedule"
                }
              />
            </div>

            {/* Desktop 3-Phone Perspective Stage */}
            <div className="hidden lg:flex items-center justify-center relative min-h-[690px]">
              {/* Left Tilted Phone (-8deg, scale-90): Longevity Score & 8-Vector Radar */}
              <div className="transform -rotate-[8deg] scale-90 -mr-10 z-10 hover:z-30 hover:rotate-0 hover:scale-95 transition-all duration-500">
                <IPhoneShowcaseFrame
                  screenKey="longevity-score"
                  theme={previewTheme}
                  priority="default"
                  caption="Longevity Score (89/94 Ceiling) & 8-Vector Radar"
                />
              </div>

              {/* Center Foreground Phone: Today Circadian Feed with Prominent Longevity Score Hero Strip */}
              <div className="z-20 transform scale-100 hover:scale-[1.02] transition-all duration-500">
                <IPhoneShowcaseFrame
                  screenKey="today-circadian"
                  theme={previewTheme}
                  priority="high"
                  caption="Today Feed • 🏆 Longevity Score 89/94 + ☀️ Morning Sunlight #1"
                />
              </div>

              {/* Right Tilted Phone (+8deg, scale-90): 7-Day Schedule Grid */}
              <div className="transform rotate-[8deg] scale-90 -ml-10 z-10 hover:z-30 hover:rotate-0 hover:scale-95 transition-all duration-500">
                <IPhoneShowcaseFrame
                  screenKey="schedule-grid"
                  theme={previewTheme}
                  priority="default"
                  caption="7-Day Circadian Schedule Grid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SOCIAL PROOF & CLINICAL RIGOR TICKER
           ==================================================================== */}
        <section
          className="border-y py-6 backdrop-blur-xl"
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
            SECTION 2 — SIMPLIFIED "FAMOUS PROTOCOLS × YOUR BIOLOGY" (#famous-protocols)
            Sleek 1-Line Selector Pills + Click-to-Expand Result Cards
           ==================================================================== */}
        <section
          id="famous-protocols"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div id="mastermind-stacks" className="scroll-mt-28" />

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span
              className="text-xs sm:text-sm font-mono uppercase tracking-widest font-bold block mb-3"
              style={{ color: tokens.accentCyan }}
            >
              FAMOUS PROTOCOLS × YOUR PERSONAL BIOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Follow Leading Longevity Protocols.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark
                    ? "linear-gradient(135deg, #0ea5e9 0%, #10B981 60%, #e879f9 100%)"
                    : "linear-gradient(135deg, #0284C7 0%, #0D9488 60%, #4F46E5 100%)",
                }}
              >
                Personalized to <em className="italic">Your</em> Biology.
              </span>
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              Bryan Johnson’s Blueprint was built for a 47-year-old male eating
              his last meal at 11:00 AM with a full-time medical team—not you.
              Pick a protocol and click your biology profile below to see how{" "}
              <strong style={{ color: tokens.textPrimary }}>
                LEVL: OutPace Aging
              </strong>{" "}
              adapts it in one tap.
            </p>
          </div>

          {/* STEP 1 — Pick a Protocol (Sleek Horizontal 1-Line Pill Bar) */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-extrabold uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
                Step 1
              </span>
              <span className="text-sm sm:text-base font-extrabold tracking-tight">
                Pick a Protocol
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {FAMOUS_PROTOCOLS.map((proto) => {
                const isSelected = proto.id === selectedProtocolId;
                return (
                  <button
                    key={proto.id}
                    type="button"
                    onClick={() => setSelectedProtocolId(proto.id)}
                    className="px-4 py-2.5 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(14, 165, 233, 0.20)"
                          : "rgba(2, 132, 199, 0.14)"
                        : tokens.cardBg,
                      borderColor: isSelected
                        ? tokens.accentCyan
                        : proto.highlight
                        ? "rgba(232, 121, 249, 0.4)"
                        : tokens.cardBorder,
                      boxShadow: isSelected
                        ? "0 0 20px -5px rgba(14, 165, 233, 0.35)"
                        : "none",
                    }}
                  >
                    <span>{proto.pillLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2 — Pick Your Biology Today (Sleek Horizontal 1-Line Pill Bar) */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Step 2
              </span>
              <span className="text-sm sm:text-base font-extrabold tracking-tight">
                Pick Your Biology Today
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {BIOLOGY_PROFILES.map((profile) => {
                const isSelected = profile.id === selectedProfileId;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setSelectedProfileId(profile.id)}
                    className="px-4 py-2.5 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(16, 185, 129, 0.20)"
                          : "rgba(13, 148, 136, 0.14)"
                        : tokens.cardBg,
                      borderColor: isSelected
                        ? tokens.accentEmerald
                        : tokens.cardBorder,
                      boxShadow: isSelected
                        ? "0 0 20px -5px rgba(16, 185, 129, 0.35)"
                        : "none",
                    }}
                  >
                    <span>{profile.pillLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RESULT CARDS (Left Column: 1-Line Headlines + Click-to-Expand "Why? ▾") + Synced Phone (Right Column) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 7 Cols: 3 Sleek Scannable Cards with Progressive Disclosure */}
            <div className="lg:col-span-7 space-y-4">
              {/* CARD 1: 🛑 BLOCKED / MOVED FOR YOU */}
              <div
                className="p-5 sm:p-6 rounded-3xl border backdrop-blur-xl transition-all"
                style={{
                  backgroundColor: isDark
                    ? "rgba(239, 68, 68, 0.08)"
                    : "rgba(254, 226, 226, 0.65)",
                  borderColor: isDark
                    ? "rgba(239, 68, 68, 0.35)"
                    : "rgba(239, 68, 68, 0.4)",
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <OctagonAlert className="w-4 h-4 shrink-0" />
                    🛑 BLOCKED / MOVED FOR YOU
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleXrayCard("blocked")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border border-red-500/30 bg-red-500/10 text-red-400 cursor-pointer hover:bg-red-500/20 transition-all"
                  >
                    <span>Clinical Why?</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        expandedXrayCards.blocked ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Always-visible 1-line headline */}
                <div className="text-base sm:text-lg font-bold leading-snug">
                  <span className="line-through opacity-70 mr-2">
                    {activeProfileSpec.blockedStrikethrough}
                  </span>
                  <span className="font-extrabold text-amber-400">
                    → {activeProfileSpec.blockedAction}
                  </span>
                </div>

                {/* Click-to-expand Clinical Why */}
                {expandedXrayCards.blocked && (
                  <div
                    className="mt-3.5 pt-3.5 border-t space-y-2.5 text-sm sm:text-[15px] leading-relaxed"
                    style={{
                      borderColor: "rgba(239, 68, 68, 0.25)",
                      color: tokens.textSecondary,
                    }}
                  >
                    <p>
                      <strong style={{ color: tokens.textPrimary }}>
                        Clinical Mechanism:
                      </strong>{" "}
                      {activeProfileSpec.blockedClinicalWhy}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfileSpec.blockedPathways.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 2: ⚡ UPGRADED FOR YOUR BIOLOGY */}
              <div
                className="p-5 sm:p-6 rounded-3xl border backdrop-blur-xl transition-all"
                style={{
                  backgroundColor: isDark
                    ? "rgba(16, 185, 129, 0.09)"
                    : "rgba(209, 250, 229, 0.65)",
                  borderColor: isDark
                    ? "rgba(16, 185, 129, 0.38)"
                    : "rgba(13, 148, 136, 0.4)",
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: tokens.accentEmerald }}
                  >
                    <Zap className="w-4 h-4 shrink-0" />
                    ⚡ UPGRADED FOR YOUR BIOLOGY
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleXrayCard("upgraded")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border cursor-pointer transition-all"
                    style={{
                      borderColor: tokens.accentEmerald,
                      color: tokens.accentEmerald,
                      backgroundColor: isDark
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(13, 148, 136, 0.10)",
                    }}
                  >
                    <span>Clinical Why?</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        expandedXrayCards.upgraded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Always-visible 1-line headline */}
                <div className="text-base sm:text-lg font-extrabold leading-snug">
                  {activeProfileSpec.upgradeOneLiner}
                </div>

                {/* Click-to-expand Clinical Why */}
                {expandedXrayCards.upgraded && (
                  <div
                    className="mt-3.5 pt-3.5 border-t space-y-2.5 text-sm sm:text-[15px] leading-relaxed"
                    style={{
                      borderColor: "rgba(16, 185, 129, 0.25)",
                      color: tokens.textSecondary,
                    }}
                  >
                    <p>
                      <strong style={{ color: tokens.textPrimary }}>
                        Targeted Pathway Upgrade:
                      </strong>{" "}
                      {activeProfileSpec.upgradeClinicalWhy}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfileSpec.upgradePathways.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 3: ✅ YOUR RESULTING SCORE & TODAY FEED */}
              <div
                className="p-5 sm:p-6 rounded-3xl border backdrop-blur-xl space-y-4 transition-all"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.accentCyan,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-mono font-extrabold uppercase tracking-wider"
                    style={{ color: tokens.accentCyan }}
                  >
                    ✅ YOUR RESULTING SCORE &amp; TODAY FEED
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleXrayCard("result")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border border-sky-500/30 bg-sky-500/10 text-sky-400 cursor-pointer hover:bg-sky-500/20 transition-all"
                  >
                    <span>Before / After ▾</span>
                  </button>
                </div>

                {/* Always-visible 1-line headline */}
                <div className="text-base sm:text-lg font-extrabold leading-snug flex flex-wrap items-center gap-2">
                  <span className="text-emerald-400">
                    Longevity Score: {activeProfileSpec.vectorScore}/100 (+4
                    Surplus)
                  </span>
                  <span className="opacity-50">•</span>
                  <span className="text-sky-400">
                    Pace: {activeProfileSpec.paceOfAging}
                  </span>
                </div>

                {/* Click-to-expand details */}
                {expandedXrayCards.result && (
                  <div
                    className="pt-3 border-t text-sm sm:text-[15px] leading-relaxed"
                    style={{
                      borderColor: tokens.cardBorder,
                      color: tokens.textSecondary,
                    }}
                  >
                    <strong style={{ color: tokens.textPrimary }}>
                      {activeProtocolSpec.shortName} × {activeProfileSpec.label}:
                    </strong>{" "}
                    {activeProfileSpec.beforeAfterSummary}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => openModal("waitlist")}
                  className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 text-slate-950 shadow-xl shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Personalize in LEVL: OutPace Aging →</span>
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Synced LEVL: OutPace Aging Phone Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <IPhoneShowcaseFrame
                screenKey="today-circadian"
                theme={previewTheme}
                xrayConfig={xraySyncPayload}
                caption={`Live Synced Feed: ${activeProtocolSpec.shortName} × ${activeProfileSpec.label}`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 3 — MODALITY-SPECIFIC INTERACTIVE APPLETS (#modality-applets)
            6 Click-to-Expand Cards + Synced Phone Visual
           ==================================================================== */}
        <section
          id="modality-applets"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span
              className="text-xs sm:text-sm font-mono uppercase tracking-widest font-bold block mb-3"
              style={{ color: tokens.accentEmerald }}
            >
              MODALITY-SPECIFIC INTERACTIVE APPLETS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
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
              className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              Click any modality applet below to expand its clinical execution
              specs and preview the live interactive screen inside{" "}
              <strong style={{ color: tokens.textPrimary }}>
                LEVL: OutPace Aging
              </strong>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: 6 Compact Click-to-Expand Applet Cards */}
            <div className="lg:col-span-7 space-y-3">
              {MODALITY_APPLETS.map((applet) => {
                const isSelected = applet.id === activeAppletId;
                return (
                  <div
                    key={applet.id}
                    onClick={() => setActiveAppletId(applet.id)}
                    className="p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(14, 165, 233, 0.12)"
                          : "rgba(224, 242, 254, 0.75)"
                        : tokens.cardBg,
                      borderColor: isSelected
                        ? tokens.accentCyan
                        : tokens.cardBorder,
                      boxShadow: isSelected
                        ? "0 0 25px -5px rgba(14, 165, 233, 0.30)"
                        : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none mt-0.5 shrink-0">
                          {applet.emoji}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                              {applet.title}
                            </h3>
                            <span
                              className="text-xs font-mono px-2 py-0.5 rounded-full border"
                              style={{
                                borderColor: tokens.cardBorder,
                                color: tokens.accentCyan,
                              }}
                            >
                              {applet.subtitle}
                            </span>
                          </div>
                          {/* 1-Line Hook Always Visible */}
                          <p
                            className="text-sm sm:text-[15px] mt-1"
                            style={{ color: tokens.textSecondary }}
                          >
                            {applet.hook}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                          isSelected ? "rotate-180 text-sky-400" : "opacity-60"
                        }`}
                      />
                    </div>

                    {/* Expanded Clinical Execution Specs */}
                    {isSelected && (
                      <div
                        className="mt-3.5 pt-3.5 border-t space-y-3 text-sm sm:text-[15px] leading-relaxed"
                        style={{
                          borderColor: tokens.cardBorder,
                          color: tokens.textSecondary,
                        }}
                      >
                        <p>{applet.details}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {applet.badges.map((b) => (
                            <span
                              key={b}
                              className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
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

            {/* Right Column: Synced iPhone 16 Pro Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <IPhoneShowcaseFrame
                screenKey={activeAppletSpec.screenKey}
                theme={previewTheme}
                caption={activeAppletSpec.caption}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 4 — CORE INTELLIGENCE & N-OF-1 DISCOVERY ENGINE (#core-intelligence)
            "Identify What Actually Works to Slow Your Pace of Aging."
            (Also aliases #vector-score and #clinical-evidence for smooth anchor scrolling)
           ==================================================================== */}
        <section
          id="core-intelligence"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div id="vector-score" className="scroll-mt-28" />
          <div id="clinical-evidence" className="scroll-mt-28" />

          <div className="text-center max-w-4xl mx-auto mb-14">
            <span
              className="text-xs sm:text-sm font-mono uppercase tracking-widest font-bold block mb-3"
              style={{ color: tokens.accentCyan }}
            >
              CLOSED-LOOP BIOLOGICAL TELEMETRY • N-OF-1 DISCOVERY ENGINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Identify What <em className="italic font-serif">Actually</em> Works
              to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #F472B6 100%)",
                }}
              >
                Slow Your Pace of Aging.
              </span>
            </h2>
            <p
              className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: tokens.textSecondary }}
            >
              Most health apps just give you a static checklist.{" "}
              <strong style={{ color: tokens.textPrimary }}>
                LEVL: OutPace Aging
              </strong>{" "}
              closes the loop—connecting your daily protocol adherence to your
              subjective outcomes, 144 emotional states, at-home physiological
              age tests, and blood biomarkers to prove which interventions
              actually move your biology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Synced iPhone 16 Pro Frame */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <IPhoneShowcaseFrame
                screenKey={activeIntelSpec.screenKey}
                theme={previewTheme}
                caption={activeIntelSpec.caption}
              />
            </div>

            {/* Right Column: 6 Compact Click-to-Expand Intelligence Cards */}
            <div className="lg:col-span-7 space-y-3 order-1 lg:order-2">
              {CORE_INTELLIGENCE_CARDS.map((card) => {
                const isSelected = card.id === activeIntelId;
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveIntelId(card.id)}
                    className="p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all cursor-pointer"
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
                        ? "0 0 25px -5px rgba(16, 185, 129, 0.30)"
                        : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none mt-0.5 shrink-0">
                          {card.emoji}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                              {card.title}
                            </h3>
                            <span
                              className="text-xs font-mono px-2 py-0.5 rounded-full border"
                              style={{
                                borderColor: tokens.cardBorder,
                                color: tokens.accentEmerald,
                              }}
                            >
                              {card.subtitle}
                            </span>
                          </div>
                          {/* 1-Line Hook Always Visible */}
                          <p
                            className="text-sm sm:text-[15px] mt-1"
                            style={{ color: tokens.textSecondary }}
                          >
                            {card.hook}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                          isSelected
                            ? "rotate-180 text-emerald-400"
                            : "opacity-60"
                        }`}
                      />
                    </div>

                    {/* Expanded Details */}
                    {isSelected && (
                      <div
                        className="mt-3.5 pt-3.5 border-t space-y-3 text-sm sm:text-[15px] leading-relaxed"
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
                              className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold"
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
            <p className="text-base sm:text-lg" style={{ color: tokens.textSecondary }}>
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
              <IPhoneShowcaseFrame
                screenKey={activePhaseSpec.screenKey}
                theme={previewTheme}
                activePhase={activePhaseSpec.id}
                caption={`LEVL: OutPace Aging — ${activePhaseSpec.label} (${activePhaseSpec.window})`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 5 — ADAPTIVE 80/20 SURVIVAL MODE & SLEEP TRIAGE (#adaptive-8020)
           ==================================================================== */}
        <section
          id="adaptive-8020"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                  style={{ color: tokens.duskIndigo }}
                >
                  ANTI-BURNOUT ENGINE • 7-DAY SCHEDULE &amp; 80/20 GOVERNOR
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Built for Real Life:{" "}
                  <span style={{ color: tokens.accentEmerald }}>
                    Adaptive 80/20 Survival Mode &amp; Sleep Triage.
                  </span>
                </h2>
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Rigid 25-step checklists cause “all-or-nothing burnout” on
                  travel days or poor sleep nights.{" "}
                  <strong style={{ color: tokens.textPrimary }}>
                    LEVL: OutPace Aging
                  </strong>{" "}
                  dynamically scales your daily routine so your streak and
                  biology never break.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "pareto-8020" as const,
                    title: "1-Tap 80/20 Pareto Shield",
                    sub: "Travel / High-Stress Day",
                    badge: "Top 4 Tier-1 Anchors",
                  },
                  {
                    id: "sleep-triage" as const,
                    title: "Poor Sleep Triage",
                    sub: "Logged <6h Sleep / Low HRV",
                    badge: "CNS Strain Auto-Swapped",
                  },
                  {
                    id: "optimal" as const,
                    title: "Full Precision Stack",
                    sub: "85%+ Readiness Score",
                    badge: "All Scheduled Modalities",
                  },
                ].map((m) => {
                  const active = governorMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setGovernorMode(m.id)}
                      className="p-4 rounded-2xl border text-left transition-all cursor-pointer"
                      style={{
                        backgroundColor: active
                          ? isDark
                            ? "rgba(16, 185, 129, 0.14)"
                            : "rgba(13, 148, 136, 0.12)"
                          : tokens.cardBg,
                        borderColor: active
                          ? tokens.accentEmerald
                          : tokens.cardBorder,
                      }}
                    >
                      <span
                        className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 inline-block mb-1.5"
                        style={{ color: tokens.accentEmerald }}
                      >
                        {m.badge}
                      </span>
                      <div className="font-extrabold text-sm">{m.title}</div>
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

              <div
                className="p-6 rounded-3xl border backdrop-blur-xl space-y-4"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                {governorMode === "pareto-8020" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-extrabold">
                        🛡️ 1-Tap 80/20 Pareto Shield Active (4 Anchors • 20 Mins Total)
                      </h3>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        82% Biological ROI Retained
                      </span>
                    </div>
                    <p
                      className="text-[15px] sm:text-base"
                      style={{ color: tokens.textSecondary }}
                    >
                      20 secondary &amp; marginal steps automatically deferred. Only
                      your top 4 highest-ROI Tier-1 anchors remain active today:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-semibold">
                      {[
                        "1. ☀️ Morning Outdoor Sunlight (10m • 10,000+ Lux)",
                        "2. 💊 Creatine 5g + Essential Lipid Matrix",
                        "3. 🚶 15m Post-Meal Glucose Walk (GLUT4)",
                        "4. 🌙 Evening Sleep Stack (Mg L-Threonate + 3g Glycine)",
                      ].map((step) => (
                        <div
                          key={step}
                          className="p-3 rounded-xl border flex items-center gap-2"
                          style={{ borderColor: tokens.cardBorder }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {governorMode === "sleep-triage" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-extrabold">
                        🌙 Poor Sleep Triage (&lt;6h Logged) — CNS Protection Active
                      </h3>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        Autonomic Recovery Mode
                      </span>
                    </div>
                    <p
                      className="text-[15px] sm:text-base"
                      style={{ color: tokens.textSecondary }}
                    >
                      High-CNS strain workouts on sleep debt spike cortisol and
                      suppress HRV. LEVL: OutPace Aging automatically benches
                      heavy intervals and injects recovery:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-semibold">
                      {[
                        "✓ Auto-Benched Norwegian 4x4 & 50°F Cold Plunge",
                        "✓ Added 20m Afternoon NSDR (14:00–16:00)",
                        "✓ Elevated Creatine from 5g → 10g (Prefrontal ATP Buffer)",
                        "✓ Shifted Evening Wind-Down 45m Earlier",
                      ].map((step) => (
                        <div
                          key={step}
                          className="p-3 rounded-xl border flex items-center gap-2"
                          style={{ borderColor: tokens.cardBorder }}
                        >
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {governorMode === "optimal" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-extrabold">
                        ⚡ Full Precision Cadence (92% Readiness)
                      </h3>
                      <span className="text-xs font-mono font-bold text-sky-400">
                        Peak Hormetic Window
                      </span>
                    </div>
                    <p
                      className="text-[15px] sm:text-base"
                      style={{ color: tokens.textSecondary }}
                    >
                      Your HRV and deep sleep are in the top quartile.{" "}
                      <strong>LEVL: OutPace Aging</strong> unlocks your scheduled
                      Norwegian 4x4 VO2 Max + 174°F+ Finnish Sauna pairing in the
                      14:00–18:00 Afternoon Dip window.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <IPhoneShowcaseFrame
                screenKey="schedule-grid"
                theme={previewTheme}
                caption="LEVL: OutPace Aging — 7-Day Week & Rest Reconciliation"
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

          {/* 5-Question FAQ */}
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

            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border backdrop-blur-xl overflow-hidden transition-all"
                  style={{
                    backgroundColor: tokens.cardBg,
                    borderColor: tokens.cardBorder,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-6 pb-5 text-sm sm:text-base leading-relaxed border-t pt-3.5"
                      style={{
                        color: tokens.textSecondary,
                        borderColor: tokens.cardBorder,
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
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
