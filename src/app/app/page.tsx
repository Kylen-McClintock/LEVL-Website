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
 * DATA DEFINITIONS: CIRCADIAN PHASES, 8 VECTORS, FAMOUS PROTOCOLS X-RAY, FAQ
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
 * SECTION 4 DATA: FAMOUS PROTOCOLS × YOUR BIOLOGY X-RAY
 * ============================================================================ */

interface FamousProtocolOption {
  id: FamousProtocolId;
  name: string;
  shortName: string;
  badge: string;
  highlight?: boolean;
}

const FAMOUS_PROTOCOLS: FamousProtocolOption[] = [
  {
    id: "blueprint",
    name: "Bryan Johnson — Blueprint 2026",
    shortName: "Blueprint 2026",
    badge: "24 Modalities • 0.69 Pace Target",
  },
  {
    id: "huberman",
    name: "Andrew Huberman — Neuro-Circadian",
    shortName: "Huberman Neuro-Circadian",
    badge: "14 Modalities • Dopamine & Sleep Architecture",
  },
  {
    id: "attia",
    name: "Peter Attia — Outlive Medicine 3.0",
    shortName: "Attia Outlive 3.0",
    badge: "12 Modalities • Zone 2, VO2 Max & ApoB Shield",
  },
  {
    id: "patrick",
    name: "Rhonda Patrick — FoundMyFitness",
    shortName: "Patrick FoundMyFitness",
    badge: "16 Modalities • 174°F+ Sauna, Sulforaphane & Omega-3",
  },
  {
    id: "combined",
    name: "✨ Combine Multiple Influencers",
    shortName: "Multi-Influencer Hybrid",
    badge: "Huberman Morning + Attia Workouts + Blueprint Sleep",
    highlight: true,
  },
];

interface BiologyProfileSpec {
  id: BiologyProfileId;
  emoji: string;
  label: string;
  sublabel: string;
  blockedStrikethrough: string;
  blockedAction: string;
  blockedClinicalWhy: string;
  upgradeTitle: string;
  upgradeBody: string;
  upgradeBullets?: string[];
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
    emoji: "🏋️",
    label: "Lifting Heavy Today + High ApoB",
    sublabel: "Cardiometabolic & Hypertrophy Focus",
    blockedStrikethrough:
      "Cold Plunge (50°F–55°F) or Metformin immediately after lifting",
    blockedAction: "Auto-Moved to Rest Day / Dawn Slot",
    blockedClinicalWhy:
      "Cold immersion or AMPK agonists within 4 hours after heavy resistance training blunts mTORC1, IGF-1, and ribosomal muscle protein synthesis by up to 24%.",
    upgradeTitle: "Promotes Tier-1 Lipid & Endothelial Anchors",
    upgradeBody:
      "Elevates High-Polyphenol EVOO (15mL), Soluble Fiber / Berberine, and Post-Lift Finnish Dry Sauna (174°F+ for 20m) to target ApoB <65 mg/dL, +eNOS, and +GH/HSP70.",
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
    emoji: "🧬",
    label: "Female Biology (Hormone & Thyroid Protected)",
    sublabel: "Cycle/Perimenopause & Bone Density Focus",
    blockedStrikethrough:
      "Extreme 18-Hour Fast (Final meal at 11:00 AM) + Fasted HIIT",
    blockedAction:
      "Converted to 12.5h Circadian Window + 30g Protein Within 45m of Waking",
    blockedClinicalWhy:
      "Aggressive caloric/fasting windows in female physiology downregulate kisspeptin and T3 thyroid conversion while spiking morning cortisol (HPA-axis).",
    upgradeTitle: "Boosts Bone Density & Micronutrient Anchors",
    upgradeBody:
      "Prioritizes Heavy Axial Resistance + Plyometrics (Piezo1 osteoblast activation for Bone Density), Iron/Ferritin tracking, and warms Cold Plunge to 55°F–58°F to prevent luteal vasoconstriction.",
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
    emoji: "😴",
    label: "Slept 5.5 Hours Last Night (Low HRV)",
    sublabel: "Wearable Recovery Auto-Triage",
    blockedStrikethrough:
      "Norwegian 4x4 VO2 Max Intervals & 50°F Cold Plunge",
    blockedAction: "Auto-Benched for Today by Adaptive Sleep Triage",
    blockedClinicalWhy:
      "High sympathetic CNS strain on <6h sleep compounds autonomic stress and suppresses overnight HRV recovery.",
    upgradeTitle: "Injects CNS & Prefrontal ATP Recovery",
    upgradeBody:
      "Swaps in 20m Afternoon NSDR (Non-Sleep Deep Rest) (14:00–16:00) and increases Creatine Monohydrate from 5g → 10g to buffer prefrontal cortex ATP depletion after sleep debt.",
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
    emoji: "⏱️",
    label: "Busy Work / Travel Day (Only Have 20 Mins)",
    sublabel: "1-Tap 80/20 Pareto Survival Mode",
    blockedStrikethrough: "20 Secondary & Marginal Protocol Steps",
    blockedAction: "Auto-Deferred Without Breaking Your Streak",
    blockedClinicalWhy:
      'Prevents "all-or-nothing" protocol burnout on travel and high-stress days.',
    upgradeTitle:
      "Locks In Your Top 4 Tier-1 Pareto Anchors (82% Biological ROI Retained)",
    upgradeBody:
      "Filters your entire stack down to the 4 highest-impact anchors you can complete anywhere in under 20 minutes:",
    upgradeBullets: [
      "☀️ Morning Outdoor Sunlight (10m • 10,000+ Lux)",
      "💊 Creatine 5g + Essential Lipid Matrix",
      "🚶 15m Post-Meal Glucose Walk (GLUT4)",
      "🌙 Evening Sleep Stack (Mg L-Threonate + 3g Glycine)",
    ],
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
 * SECTION E DATA: 8 CANONICAL LONGEVITY VECTORS
 * ============================================================================ */

interface LongevityVectorSpec {
  id: string;
  name: string;
  score: number;
  tierBadge: string;
  effectSize: string;
  effectDetail: string;
  anchorModalities: string[];
  biomarkers: string[];
  pathways: string[];
  citation: string;
}

const LONGEVITY_VECTORS: LongevityVectorSpec[] = [
  {
    id: "heart",
    name: "Heart Health",
    score: 94,
    tierBadge: "Tier-1 Anchor • Score 94/100",
    effectSize: "+15–20% VO2 Max & -40% ACM Hazard",
    effectDetail:
      "Sustained cardiorespiratory peak conditioning paired with 4–7x/wk Finnish sauna reduces all-cause cardiovascular mortality hazard by 40–50%.",
    anchorModalities: [
      "Norwegian 4x4 VO2 Max Intervals (2x/wk)",
      "Zone 2 Mitochondrial Base (150–180m/wk)",
      "Finnish Dry Sauna 174°F+ (4x/wk • 20m)",
    ],
    biomarkers: ["ApoB (<65 mg/dL)", "VO2 Max", "Resting HR", "Lp(a)", "PWV"],
    pathways: ["eNOS", "PGC-1α", "HSP70", "VEGF"],
    citation: "PMID: 25705824 • Laukkanen et al. JAMA Intern Med",
  },
  {
    id: "brain",
    name: "Brain Longevity",
    score: 91,
    tierBadge: "Tier-1 Anchor • Score 91/100",
    effectSize: "+28% Slow-Wave Glymphatic Clearance",
    effectDetail:
      "Circadian light anchoring, deep slow-wave sleep architecture, and high-DHA/EPA phospholipids preserve hippocampal volume and synaptic plasticity.",
    anchorModalities: [
      "Morning Sunlight SCN Lock (10,000+ Lux)",
      "Omega-3 Phospholipids (2g EPA / 1.5g DHA)",
      "Magnesium L-Threonate + 3g Glycine",
    ],
    biomarkers: ["Deep Sleep %", "Nocturnal HRV", "Homocysteine", "Omega-3 Index (>8%)"],
    pathways: ["BDNF", "Glymphatic AQP4", "CREB", "Synapsin-1"],
    citation: "PMID: 24136970 • Xie et al. Science (Glymphatic Clearance)",
  },
  {
    id: "metabolic",
    name: "Metabolic Health",
    score: 89,
    tierBadge: "Tier-1 Anchor • Score 89/100",
    effectSize: "-22–30% Post-Prandial Glucose Excursion",
    effectDetail:
      "Early circadian time-restricted feeding, post-meal Zone 1 walks, and skeletal muscle hypertrophy maximize insulin sensitivity and mitochondrial beta-oxidation.",
    anchorModalities: [
      "Early Circadian eTRE (10–12h Window Ending 3h Pre-Bed)",
      "Post-Prandial 15m Metabolic Walks",
      "Heavy Compound Resistance Training (3x/wk)",
    ],
    biomarkers: ["Fasting Insulin (<5 uIU/mL)", "HbA1c (<5.1%)", "HOMA-IR", "Triglyceride/HDL"],
    pathways: ["AMPK", "GLUT4", "SIRT1", "CPT1A"],
    citation: "PMID: 29754952 • Sutton et al. Cell Metabolism",
  },
  {
    id: "cancer",
    name: "Cancer Defense",
    score: 84,
    tierBadge: "Tier-1 Anchor • Score 84/100",
    effectSize: "+2.4x Phase II Detoxification & NK Surveillance",
    effectDetail:
      "Myrosinase-activated sulforaphane, vigorous aerobic shear stress, and circadian melatonin integrity bolster Natural Killer (NK) cell surveillance.",
    anchorModalities: [
      "Broccoli Sprout Sulforaphane (40–60mg Glucoraphanin)",
      "Vigorous Exercise Shear Stress (NK Mobilization)",
      "Strict Nocturnal Darkness (Melatonin Oncostatic Shield)",
    ],
    biomarkers: ["NK Cell Cytotoxicity", "8-OHdG Oxidative DNA Damage", "hs-CRP"],
    pathways: ["Nrf2", "Keap1", "Phase II GST/NQO1", "p53"],
    citation: "PMID: 24913818 • Egner et al. Cancer Prev Res",
  },
  {
    id: "hormones",
    name: "Testosterone & Hormones",
    score: 86,
    tierBadge: "Tier-1 Anchor • Score 86/100",
    effectSize: "+15–22% Endocrine & HPG Axis Resilience",
    effectDetail:
      "Protecting REM/deep sleep cycles, micronutrient repletion (Boron, D3+K2, Zinc, Mg), and avoiding chronic caloric/cortisol overtraining preserve endocrine vitality.",
    anchorModalities: [
      "8h Sleep Window (REM Endocrine Pulse Protection)",
      "Heavy Lower-Body Compound Loading",
      "Micronutrient Endocrine Stack (D3 4,000 IU + K2 + Boron 6mg)",
    ],
    biomarkers: ["Free & Total Testosterone / Estradiol", "SHBG", "Morning Cortisol", "Free T3"],
    pathways: ["HPG Axis", "Kisspeptin", "LH Pulsatility", "AR Sensitivity"],
    citation: "PMID: 21632481 • Leproult & Van Cauter JAMA",
  },
  {
    id: "inflammation",
    name: "Chronic Inflammation",
    score: 92,
    tierBadge: "Tier-1 Anchor • Score 92/100",
    effectSize: "≥25% hs-CRP & IL-6 Senescent Secretome Reduction",
    effectDetail:
      "Suppressing sterile 'inflammaging' via Specialized Pro-Resolving Mediators (EPA/DHA), heat-shock conditioning, and periodic senolytic pulses.",
    anchorModalities: [
      "High-Dose EPA/DHA + High-Polyphenol EVOO",
      "Finnish Sauna + Cold Plunge Contrast",
      "Pulsed Fisetin + Quercetin Senolytic Protocol",
    ],
    biomarkers: ["hs-CRP (<0.5 mg/L)", "IL-6", "TNF-α", "GlycA"],
    pathways: ["NF-κB Inhibition", "NLRP3 Inflammasome↓", "Resolvins E1/D1"],
    citation: "PMID: 29273061 • Ridker et al. NEJM / Inflammation Atlas",
  },
  {
    id: "bone",
    name: "Bone Density",
    score: 82,
    tierBadge: "Tier-1 Anchor • Score 82/100",
    effectSize: "+1.8–3.2% Lumbar & Femoral Neck BMD Preservation",
    effectDetail:
      "Axial mechanical loading above 4x bodyweight forces activates osteocyte Piezo1 mechanotransducers to stimulate osteoblast mineralization.",
    anchorModalities: [
      "Heavy Axial Resistance & Farmer Carries (3x/wk)",
      "Multi-Directional Impact / Plyometric Hops",
      "Vitamin D3 + MK-7 K2 + Magnesium Matrix",
    ],
    biomarkers: ["DEXA BMD T-Score", "25(OH) Vitamin D", "Osteocalcin", "CTX"],
    pathways: ["Piezo1", "Wnt/β-Catenin", "Osteoblast Runx2", "OPG/RANKL"],
    citation: "PMID: 28975661 • Watson et al. LIFTMOR Trial JBMR",
  },
  {
    id: "cellular",
    name: "Cellular Longevity",
    score: 90,
    tierBadge: "Tier-1 Anchor • Score 90/100",
    effectSize: "-0.18 yr/yr Epigenetic Pace of Aging (DunedinPACE)",
    effectDetail:
      "Coordinating NAD+ salvage, mitophagy (Urolithin A / Zone 2), and autophagic flux slows epigenetic methylation drift across all hallmarks of aging.",
    anchorModalities: [
      "NAD+ Precursor + Polyphenol Co-Activation",
      "Mitophagy Activation (Zone 2 + Urolithin A / Spermidine)",
      "Circadian Autophagy Fasting Window (12.5–16h)",
    ],
    biomarkers: ["DunedinPACE (<0.80)", "Intracellular NAD+", "Telomere PBMC", "GDF-15"],
    pathways: ["SIRT1 / SIRT3", "AMPK", "mTORC1 Pulsed Modulation", "PINK1/Parkin"],
    citation: "PMID: 35029144 • Belsky et al. eLife (DunedinPACE)",
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
    q: "How does LEVL: OutPace Aging connect my wearables and blood biomarkers to my daily routine?",
    a: "In the Insights & Biomarkers view, you can track Apple Watch, Oura, Whoop, and Garmin readiness alongside key longevity blood panels (ApoB, hs-CRP, Fasting Insulin, DEXA BMD, and DunedinPACE epigenetic speed). LEVL: OutPace Aging maps every active modality in your stack to the specific biomarkers and 8 biological vectors it moves.",
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

  // Section D: Circadian Phase Explorer state
  const [selectedPhaseId, setSelectedPhaseId] =
    useState<CircadianPhaseId>("dawn");

  // Section 4 (Upgraded): 2-Click "Famous Protocols × Your Biology" X-Ray state
  const [selectedProtocolId, setSelectedProtocolId] =
    useState<FamousProtocolId>("blueprint");
  const [selectedProfileId, setSelectedProfileId] =
    useState<BiologyProfileId>("lifting-apob");

  // Section E: 8-Vector Radar state
  const [selectedVectorId, setSelectedVectorId] = useState<string>("heart");
  const [vectorPhoneView, setVectorPhoneView] =
    useState<ShowcaseScreenKey>("longevity-score");

  // Section G: Adaptive 80/20 Survival Mode & Sleep Triage state
  const [governorMode, setGovernorMode] = useState<
    "optimal" | "sleep-triage" | "pareto-8020"
  >("pareto-8020");

  // Section H: FAQ state
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

  const activePhaseSpec =
    CIRCADIAN_PHASES.find((p) => p.id === selectedPhaseId) ||
    CIRCADIAN_PHASES[0];

  const activeProtocolSpec =
    FAMOUS_PROTOCOLS.find((p) => p.id === selectedProtocolId) ||
    FAMOUS_PROTOCOLS[0];

  const activeProfileSpec =
    BIOLOGY_PROFILES.find((p) => p.id === selectedProfileId) ||
    BIOLOGY_PROFILES[0];

  const activeVectorSpec =
    LONGEVITY_VECTORS.find((v) => v.id === selectedVectorId) ||
    LONGEVITY_VECTORS[0];

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
          <div className="flex items-center gap-4 lg:gap-6">
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
                  label: "Famous Protocols × Your Biology",
                  href: "#famous-protocols",
                },
                { label: "8-Vector Score", href: "#vector-score" },
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
            HERO SECTION (#overview)
           ==================================================================== */}
        <section
          id="overview"
          className="pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center scroll-mt-32"
        >
          {/* Top Eyebrow Pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase border mb-6"
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

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] max-w-5xl mx-auto mb-6">
            Your Biology Runs on a Clock.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #10B981 0%, #0ea5e9 55%, #e879f9 100%)"
                  : "linear-gradient(135deg, #0D9488 0%, #0284C7 55%, #4F46E5 100%)",
              }}
            >
              Now Your Longevity Protocol Does Too.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
            style={{ color: tokens.textSecondary }}
          >
            Explore 100+ clinically graded longevity modalities, adapt
            world-class famous protocols to your personal biology, and track your
            real-time impact across all 8 biological vectors of aging in{" "}
            <strong style={{ color: tokens.textPrimary }}>
              LEVL: OutPace Aging
            </strong>
            .
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
                { key: "longevity-score" as const, label: "8-Vector Score" },
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
                    ? "LEVL: OutPace Aging — Today Feed (Morning Sunlight Anchored #1)"
                    : heroFocusScreen === "longevity-score"
                    ? "LEVL: OutPace Aging — 8-Vector Biological Radar"
                    : "LEVL: OutPace Aging — 7-Day Circadian Schedule"
                }
              />
            </div>

            {/* Desktop 3-Phone Perspective Stage */}
            <div className="hidden lg:flex items-center justify-center relative min-h-[690px]">
              {/* Left Tilted Phone (-8deg, scale-90): longevity-score-{theme}.png */}
              <div className="transform -rotate-[8deg] scale-90 -mr-10 z-10 hover:z-30 hover:rotate-0 hover:scale-95 transition-all duration-500">
                <IPhoneShowcaseFrame
                  screenKey="longevity-score"
                  theme={previewTheme}
                  priority="default"
                  caption="8-Vector Longevity Score & Radar"
                />
              </div>

              {/* Center Foreground Phone: today-circadian-{theme}.png (LCP High Priority) */}
              <div className="z-20 transform scale-100 hover:scale-[1.02] transition-all duration-500">
                <IPhoneShowcaseFrame
                  screenKey="today-circadian"
                  theme={previewTheme}
                  priority="high"
                  caption="Today Circadian Feed • ☀️ Morning Sunlight Task #1"
                />
              </div>

              {/* Right Tilted Phone (+8deg, scale-90): schedule-grid-{theme}.png */}
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
                "100+ RCT-Anchored Modalities",
                "3-Tier Clinical Rubric (Tier-1 Anchor • Tier-2 Synergist • Tier-3 Marginal)",
                "Exact Dosing, Temperature & Synergy Guardrails",
                "Real-Time Antagonistic Clash Detection",
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
            UPGRADED SECTION 4 — 2-CLICK "FAMOUS PROTOCOLS × YOUR BIOLOGY" X-RAY
           ==================================================================== */}
        <section
          id="famous-protocols"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div id="mastermind-stacks" className="scroll-mt-28" />

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span
              className="text-xs sm:text-sm font-mono uppercase tracking-widest font-bold block mb-3"
              style={{ color: tokens.accentCyan }}
            >
              FAMOUS PROTOCOLS × YOUR PERSONAL BIOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
              Follow World-Class Longevity Protocols.{" "}
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
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: tokens.textSecondary }}
            >
              Bryan Johnson’s Blueprint was built for a 47-year-old male eating
              his last meal at 11:00 AM with a full-time medical team—not you.
              Copy-pasting a famous checklist blindly onto your body can actually
              backfire. Pick a protocol below, then click a real-life biology
              profile to see how{" "}
              <strong style={{ color: tokens.textPrimary }}>
                LEVL: OutPace Aging
              </strong>{" "}
              adapts it for you.
            </p>
          </div>

          {/* STEP 1 — Pick the Famous Protocol You Want to Follow (5 Selectable Cards) */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
                Step 1
              </span>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                Pick the Famous Protocol You Want to Follow
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {FAMOUS_PROTOCOLS.map((proto) => {
                const isSelected = proto.id === selectedProtocolId;
                return (
                  <button
                    key={proto.id}
                    type="button"
                    onClick={() => setSelectedProtocolId(proto.id)}
                    className="p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between"
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(14, 165, 233, 0.16)"
                          : "rgba(2, 132, 199, 0.12)"
                        : tokens.cardBg,
                      borderColor: isSelected
                        ? tokens.accentCyan
                        : proto.highlight
                        ? "rgba(232, 121, 249, 0.35)"
                        : tokens.cardBorder,
                      boxShadow: isSelected
                        ? "0 0 25px -5px rgba(14, 165, 233, 0.35)"
                        : "none",
                    }}
                  >
                    <div className="font-extrabold text-sm sm:text-[15px] leading-snug mb-2">
                      {proto.name}
                    </div>
                    <div
                      className="text-xs font-mono font-semibold"
                      style={{
                        color: isSelected
                          ? tokens.accentCyan
                          : proto.highlight
                          ? tokens.accentMagenta
                          : tokens.textSecondary,
                      }}
                    >
                      {proto.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2 — Pick 1 Relatable "Who Are You Today?" Biology Profile (4 Exclusive 1-Click Pills) */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Step 2
              </span>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                Pick 1 Relatable “Who Are You Today?” Biology Profile
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BIOLOGY_PROFILES.map((profile) => {
                const isSelected = profile.id === selectedProfileId;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setSelectedProfileId(profile.id)}
                    className="p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3"
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? "rgba(16, 185, 129, 0.16)"
                          : "rgba(13, 148, 136, 0.12)"
                        : tokens.cardBg,
                      borderColor: isSelected
                        ? tokens.accentEmerald
                        : tokens.cardBorder,
                      boxShadow: isSelected
                        ? "0 0 25px -5px rgba(16, 185, 129, 0.35)"
                        : "none",
                    }}
                  >
                    <span className="text-2xl leading-none shrink-0 mt-0.5">
                      {profile.emoji}
                    </span>
                    <div>
                      <div className="font-extrabold text-sm sm:text-[15px] leading-snug">
                        {profile.label}
                      </div>
                      <div
                        className="text-xs font-mono mt-1"
                        style={{ color: tokens.textSecondary }}
                      >
                        {profile.sublabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* THE INSTANT VISUAL PAYOFF: 3 Large Full-Readability X-Ray Cards + Synced Phone Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 7 Cols: 3 Large High-Contrast X-Ray Cards (15px–16px body text) */}
            <div className="lg:col-span-7 space-y-5">
              {/* CARD 1: 🛑 WHAT LEVL BLOCKS OR RESCHEDULES */}
              <div
                className="p-6 sm:p-7 rounded-3xl border backdrop-blur-xl space-y-3 transition-all"
                style={{
                  backgroundColor: isDark
                    ? "rgba(239, 68, 68, 0.08)"
                    : "rgba(254, 226, 226, 0.65)",
                  borderColor: isDark
                    ? "rgba(239, 68, 68, 0.35)"
                    : "rgba(239, 68, 68, 0.4)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-red-400 flex items-center gap-2">
                    <OctagonAlert className="w-4 h-4 shrink-0" />
                    🛑 WHAT LEVL BLOCKS OR RESCHEDULES
                  </span>
                  <span
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-semibold"
                  >
                    Why copying raw {activeProtocolSpec.shortName} hurts you
                  </span>
                </div>

                <div className="text-[15px] sm:text-base leading-relaxed">
                  <span className="line-through opacity-75 font-semibold mr-2">
                    {activeProfileSpec.blockedStrikethrough}
                  </span>
                  <span className="font-extrabold text-amber-400">
                    → {activeProfileSpec.blockedAction}
                  </span>
                </div>

                <p
                  className="text-[15px] sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  <strong style={{ color: tokens.textPrimary }}>
                    Clinical Why:
                  </strong>{" "}
                  {activeProfileSpec.blockedClinicalWhy}
                </p>
              </div>

              {/* CARD 2: ⚡ WHAT LEVL UPGRADES FOR YOUR BIOLOGY */}
              <div
                className="p-6 sm:p-7 rounded-3xl border backdrop-blur-xl space-y-3 transition-all"
                style={{
                  backgroundColor: isDark
                    ? "rgba(16, 185, 129, 0.09)"
                    : "rgba(209, 250, 229, 0.65)",
                  borderColor: isDark
                    ? "rgba(16, 185, 129, 0.38)"
                    : "rgba(13, 148, 136, 0.4)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider flex items-center gap-2"
                    style={{ color: tokens.accentEmerald }}
                  >
                    <Zap className="w-4 h-4 shrink-0" />
                    ⚡ WHAT LEVL UPGRADES FOR YOUR BIOLOGY
                  </span>
                  <span
                    className="text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                    style={{
                      borderColor: tokens.accentEmerald,
                      color: tokens.accentEmerald,
                    }}
                  >
                    Personalized to your labs &amp; wearable data
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {activeProfileSpec.upgradeTitle}
                </h4>

                <p
                  className="text-[15px] sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  {activeProfileSpec.upgradeBody}
                </p>

                {activeProfileSpec.upgradeBullets && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {activeProfileSpec.upgradeBullets.map((item, idx) => (
                      <div
                        key={item}
                        className="p-3 rounded-xl border text-[15px] font-bold flex items-center gap-2"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(6, 9, 19, 0.65)"
                            : "#FFFFFF",
                          borderColor: tokens.cardBorder,
                        }}
                      >
                        <span className="text-xs font-mono text-emerald-400">
                          {idx + 1}.
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CARD 3: ✅ YOUR PERSONALIZED LEVL: OUTPACE AGING FEED */}
              <div
                className="p-6 sm:p-7 rounded-3xl border backdrop-blur-xl space-y-4 transition-all"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.accentCyan,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider"
                    style={{ color: tokens.accentCyan }}
                  >
                    ✅ YOUR PERSONALIZED LEVL: OUTPACE AGING FEED
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      8-Vector: {activeProfileSpec.vectorScore}/100
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                      {activeProfileSpec.paceOfAging}
                    </span>
                  </div>
                </div>

                <p
                  className="text-[15px] sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Synced live inside the iPhone preview: your{" "}
                  <strong style={{ color: tokens.textPrimary }}>
                    {activeProtocolSpec.name}
                  </strong>{" "}
                  stack is now calibrated for{" "}
                  <strong style={{ color: tokens.textPrimary }}>
                    {activeProfileSpec.emoji} {activeProfileSpec.label}
                  </strong>{" "}
                  with{" "}
                  <strong style={{ color: tokens.dawnAmber }}>
                    ☀️ Morning Sunlight
                  </strong>{" "}
                  pinned at Task #1 and zero pathway conflicts.
                </p>

                <button
                  type="button"
                  onClick={() => openModal("waitlist")}
                  className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 text-slate-950 shadow-xl shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    Personalize This Protocol in LEVL: OutPace Aging →
                  </span>
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
            SECTION E — INTERACTIVE 8-VECTOR BIOLOGICAL RADAR & CLINICAL EVIDENCE
           ==================================================================== */}
        <section
          id="vector-score"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
              style={{ color: tokens.accentEmerald }}
            >
              SYSTEMS BIOLOGY TELEMETRY • 8 CANONICAL LONGEVITY VECTORS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              See How Every Daily Action Moves Your{" "}
              <span style={{ color: tokens.accentEmerald }}>
                8 Biological Vectors.
              </span>
            </h2>
            <p className="text-base sm:text-lg" style={{ color: tokens.textSecondary }}>
              Click any of the 8 Longevity Vectors below to inspect Tier-1 Anchor
              modalities, quantifiable human RCT effect sizes, target blood
              biomarkers, and cellular signaling pathways.
            </p>
          </div>

          {/* 8-Vector Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {LONGEVITY_VECTORS.map((vec) => {
              const isSelected = vec.id === selectedVectorId;
              return (
                <button
                  key={vec.id}
                  type="button"
                  onClick={() => setSelectedVectorId(vec.id)}
                  className="p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between"
                  style={{
                    backgroundColor: isSelected
                      ? isDark
                        ? "rgba(16, 185, 129, 0.14)"
                        : "rgba(13, 148, 136, 0.12)"
                      : tokens.cardBg,
                    borderColor: isSelected
                      ? tokens.accentEmerald
                      : tokens.cardBorder,
                  }}
                >
                  <div>
                    <div className="text-xs sm:text-sm font-extrabold">
                      {vec.name}
                    </div>
                    <div
                      className="text-[11px] font-mono mt-0.5"
                      style={{ color: tokens.textSecondary }}
                    >
                      Tier-1 Anchored
                    </div>
                  </div>
                  <span
                    className="text-base sm:text-lg font-mono font-extrabold"
                    style={{ color: tokens.accentEmerald }}
                  >
                    {vec.score}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="clinical-evidence"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-28"
          >
            <div className="lg:col-span-7">
              <div
                className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-6"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block mb-2"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(13, 148, 136, 0.12)",
                        borderColor: tokens.accentEmerald,
                        color: tokens.accentEmerald,
                      }}
                    >
                      {activeVectorSpec.tierBadge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {activeVectorSpec.name} Vector
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono uppercase block opacity-70">
                      Quantifiable Effect Size
                    </span>
                    <span
                      className="text-sm sm:text-base font-mono font-extrabold"
                      style={{ color: tokens.accentCyan }}
                    >
                      {activeVectorSpec.effectSize}
                    </span>
                  </div>
                </div>

                <p
                  className="text-[15px] sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  {activeVectorSpec.effectDetail}
                </p>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 opacity-80">
                    Tier-1 Anchor Modalities (Scored 65–100)
                  </h4>
                  <div className="space-y-2">
                    {activeVectorSpec.anchorModalities.map((m) => (
                      <div
                        key={m}
                        className="p-3 rounded-xl border flex items-center gap-2.5 text-sm font-semibold"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(6, 9, 19, 0.6)"
                            : "rgba(248, 249, 247, 0.9)",
                          borderColor: tokens.cardBorder,
                        }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: tokens.accentEmerald }}
                        />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-2xl border"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(6, 9, 19, 0.5)"
                        : "rgba(248, 249, 247, 0.8)",
                      borderColor: tokens.cardBorder,
                    }}
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-2 opacity-75">
                      Biomarker Anchors (Insights)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeVectorSpec.biomarkers.map((b) => (
                        <span
                          key={b}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/25 font-semibold"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-2xl border"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(6, 9, 19, 0.5)"
                        : "rgba(248, 249, 247, 0.8)",
                      borderColor: tokens.cardBorder,
                    }}
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-2 opacity-75">
                      Molecular Pathways
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeVectorSpec.pathways.map((p) => (
                        <span
                          key={p}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 font-semibold"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono"
                  style={{ borderColor: tokens.cardBorder }}
                >
                  <span>★ Verified Clinical Evidence: {activeVectorSpec.citation}</span>
                  <span style={{ color: tokens.accentEmerald }}>Grade A RCT</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="inline-flex items-center gap-1 p-1 rounded-full border mb-5"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                {[
                  { key: "longevity-score" as const, label: "8-Vector Score" },
                  { key: "modality-evidence" as const, label: "Grade-A RCT" },
                  { key: "biomarkers-tracking" as const, label: "Biomarkers" },
                ].map((view) => (
                  <button
                    key={view.key}
                    type="button"
                    onClick={() => setVectorPhoneView(view.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      vectorPhoneView === view.key
                        ? "bg-sky-500 text-slate-950 shadow"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>

              <IPhoneShowcaseFrame
                screenKey={vectorPhoneView}
                theme={previewTheme}
                activeVector={activeVectorSpec.name}
                caption={`Inspecting ${activeVectorSpec.name} in LEVL: OutPace Aging`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION G — ADAPTIVE 80/20 SURVIVAL MODE & SLEEP TRIAGE
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
            SECTION H — BOTTOM CONVERSION BANNER & 5-QUESTION FAQ (#faq)
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

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Turn Longevity Science Into Your Daily Operating System.
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
