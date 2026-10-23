"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sun,
  Moon,
  Sparkles,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Activity,
  Flame,
  Snowflake,
  HeartPulse,
  Brain,
  Zap,
  AlertTriangle,
  CheckCircle2,
  FlaskConical,
  Layers,
  Calendar,
  Clock,
  Sliders,
  ChevronDown,
  ExternalLink,
  Award,
  TrendingUp,
  Dna,
  BatteryCharging,
  Compass,
} from "lucide-react";
import {
  IPhoneShowcaseFrame,
  type ShowcaseScreenKey,
  type ShowcaseTheme,
  type CircadianPhaseId,
} from "@/components/app-showcase/IPhoneShowcaseFrame";
import {
  EarlyAccessModal,
  type ModalTab,
} from "@/components/app-showcase/EarlyAccessModal";
import { Footer } from "@/components/sections/Footer";

export const LEVL_WEB_APP_URL =
  "https://2026-levl-protocols-app.vercel.app/today";

/* ============================================================================
 * DATA DEFINITIONS: CIRCADIAN PHASES, 8 VECTORS, MASTERMIND STACKS, ARCHETYPES
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
        name: "Morning Sunlight First (#1 Anchor)",
        badge: "10–15m • 10,000+ Lux",
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
      "Core body temperature and prefrontal catecholamines reach their first zenith. LEVL groups fat-soluble senolytics and polyphenols with high-polyphenol EVOO to multiply absorption.",
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
      "Early Circadian eTRE (10h Window Ending 3h Pre-Bed)",
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
    effectSize: "+15–22% Free Testosterone & HPG Axis Resilience",
    effectDetail:
      "Protecting REM/deep sleep cycles, micronutrient repletion (Boron, D3+K2, Zinc, Mg), and avoiding chronic caloric/cortisol overtraining preserve endocrine vitality.",
    anchorModalities: [
      "8h Sleep Window (REM Testosterone Pulse Protection)",
      "Heavy Lower-Body Compound Loading",
      "Micronutrient Endocrine Stack (D3 4,000 IU + K2 + Boron 6mg)",
    ],
    biomarkers: ["Free & Total Testosterone", "SHBG", "Morning Cortisol Slope", "IGF-1"],
    pathways: ["HPG Axis", "StAR Protein", "LH Pulsatility", "AR Sensitivity"],
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
      "Circadian Autophagy Fasting Window (14–16h)",
    ],
    biomarkers: ["DunedinPACE (<0.80)", "Intracellular NAD+", "Telomere PBMC", "GDF-15"],
    pathways: ["SIRT1 / SIRT3", "AMPK", "mTORC1 Pulsed Modulation", "PINK1/Parkin"],
    citation: "PMID: 35029144 • Belsky et al. eLife (DunedinPACE)",
  },
];

const MASTERMIND_STACKS = [
  {
    id: "blueprint",
    name: "Bryan Johnson Blueprint 2026",
    subtitle: "Full-Spectrum Algorithmic Organ Rejuvenation",
    paceBadge: "0.69 DunedinPACE Target",
    modalitiesCount: "24 Modalities",
    vectorsCovered: "8/8 Vectors (98% Score)",
    highlights: [
      "Morning 10,000 Lux + Red/NIR Photobiomodulation",
      "Early eTRE (Final meal 11:00–12:00 PM) + High-Polyphenol EVOO",
      "Daily Zone 2 + 3x/wk Heavy Resistance + Norwegian 4x4",
      "Strict 8.5h Sleep Architecture (Zero Late Blue Light / Alcohol)",
    ],
  },
  {
    id: "huberman",
    name: "Andrew Huberman Foundational",
    subtitle: "Circadian Neurobiology, Dopamine & Sleep Architecture",
    paceBadge: "Autonomic & Neural Peak",
    modalitiesCount: "14 Modalities",
    vectorsCovered: "8/8 Vectors (91% Score)",
    highlights: [
      "Outdoor Morning Sunlight within 30m of wake (#1 Anchor)",
      "Delayed Caffeine (90–120m post-wake) + Afternoon NSDR (20m)",
      "Søberg Cold Plunge (11m/wk total) + Finnish Sauna (57m/wk)",
      "Magnesium L-Threonate + Apigenin + Theanine Wind-Down",
    ],
  },
  {
    id: "attia",
    name: "Peter Attia Outlive Stack",
    subtitle: "Medicine 3.0 Centenarian Decathlon & ApoB/Metabolic Shield",
    paceBadge: "VO2 Max Top 2% Target",
    modalitiesCount: "12 Modalities",
    vectorsCovered: "8/8 Vectors (93% Score)",
    highlights: [
      "4x/wk Zone 2 Lactate Threshold (<2.0 mmol/L) Sessions",
      "1–2x/wk Norwegian 4x4 VO2 Max Peak Intervals",
      "3x/wk Grip Strength, Eccentric Control & Axial Stability",
      "Aggressive ApoB (<60 mg/dL) & Fasting Insulin (<5 uIU/mL) Tracking",
    ],
  },
  {
    id: "patrick",
    name: "Rhonda Patrick FoundMyFitness",
    subtitle: "Hormetic Heat Shock, Sulforaphane & Micronutrient Triage",
    paceBadge: "Nrf2 & HSP70 Focus",
    modalitiesCount: "16 Modalities",
    vectorsCovered: "8/8 Vectors (90% Score)",
    highlights: [
      "Finnish Sauna 174°F+ (20m, 4–7x/wk) for HSP70 & eNOS",
      "Myrosinase-Active Broccoli Sprout Sulforaphane (Nrf2)",
      "Omega-3 Index >8% Target (2g+ EPA/DHA Phospolipids)",
      "Magnesium + Vitamin D3/K2 Triage Theory Repletion",
    ],
  },
];

const ARCHETYPES = [
  {
    persona: "1. The Protocol Optimizer",
    sub: "Huberman / Blueprint / Attia followers",
    frustration:
      "Tracking 15+ supplements, sauna, cold plunge, and workouts across messy Notion docs, spreadsheets, and generic habit trackers that don't understand biology.",
    hook: "“Every Mastermind Protocol—pre-built, conflict-checked, and mapped to your biological clock.”",
    screenLabel: "Today Circadian Feed",
    targetAnchor: "#circadian-engine",
  },
  {
    persona: "2. The Data-Driven Biohacker",
    sub: "Whoop / Oura / Function Health / InsideTracker users",
    frustration:
      "Has wearables and blood panels, but no system connecting daily actions to measurable changes in Biological Age and specific physiological vectors.",
    hook: "“See how every daily action moves your 8 Longevity Vectors & Biological Age.”",
    screenLabel: "8-Vector Longevity Score & Radar",
    targetAnchor: "#vector-score",
  },
  {
    persona: "3. The Busy High-Performer",
    sub: "Founders, executives, parents",
    frustration:
      "Gets overwhelmed by 25-step routines on travel days or poor sleep nights and quits completely (“all-or-nothing burnout”).",
    hook: "“Adaptive 80/20 Survival Mode & Sleep Triage—automatically scales your routine when life happens.”",
    screenLabel: "Adaptive Routine Governor & 7-Day Schedule",
    targetAnchor: "#adaptive-8020",
  },
];

const FAQ_ITEMS = [
  {
    q: "How do I install LEVL OS as a native app on iOS or Android?",
    a: "LEVL OS is engineered as a zero-bloat, 120Hz Progressive Web App (PWA). Once you unlock access with your VIP code (or waitlist invite), open the app in Safari on iOS or Chrome on Android, tap Share → 'Add to Home Screen', and launch it directly from your dock with fullscreen native gestures and offline-ready circadian caching.",
  },
  {
    q: "How does LEVL connect my wearables and blood biomarkers to my daily protocol?",
    a: "In the /tracking tab, you can log or sync Apple Watch, Oura, Whoop, and Garmin readiness alongside key longevity blood panels (ApoB, hs-CRP, Fasting Insulin, DEXA BMD, and DunedinPACE epigenetic speed). LEVL maps every active modality in your stack to the specific biomarkers and 8 biological vectors it moves.",
  },
  {
    q: "Can I customize Mastermind Stacks or bench modalities I'm cycling off?",
    a: "Yes. You can adopt Bryan Johnson Blueprint 2026, Andrew Huberman, Peter Attia, or Rhonda Patrick stacks in one tap, override any dose or timing window, or move items to your Protocol Bench (/bench) when cycling compounds—without losing your historical adherence or biomarker correlations.",
  },
  {
    q: "How does LEVL's 3-Tier Clinical Evidence Rubric score each modality?",
    a: "Every modality in our 100+ intervention library is graded by human clinical trial rigor (Grade A Human RCTs down to emerging mechanistic studies) and assigned a 0–100 Vector Impact Score across three tiers: Tier-1 Anchors (65–100, e.g., Norwegian 4x4 VO2 Max, Morning Sunlight, Finnish Sauna), Tier-2 Synergists (35–64), and Tier-3 Marginals (<35).",
  },
  {
    q: "What is Biochemical Synergy & Antagonistic Clash Detection?",
    a: "Many biohackers accidentally cancel out their hard work—for example, plunging into 50°F water or taking Metformin immediately after heavy hypertrophy training blunts mTORC1 and IGF-1 muscle protein synthesis. LEVL audits your daily schedule in real time, warns you of antagonistic pathway clashes, and offers a 1-tap smart reschedule.",
  },
];

export default function LevlAppShowcasePage() {
  // Default to Obsidian Dark ("dark"), respecting dark-mode-toggle storage rules
  const [previewTheme, setPreviewTheme] = useState<ShowcaseTheme>("dark");
  const [heroFocusScreen, setHeroFocusScreen] =
    useState<ShowcaseScreenKey>("today-circadian");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<ModalTab>("waitlist");

  // Section D: Circadian Phase Explorer state
  const [selectedPhaseId, setSelectedPhaseId] =
    useState<CircadianPhaseId>("dawn");

  // Section E: 8-Vector Radar state
  const [selectedVectorId, setSelectedVectorId] = useState<string>("heart");
  const [vectorPhoneView, setVectorPhoneView] =
    useState<ShowcaseScreenKey>("longevity-score");

  // Section F: Mastermind Stacks + Clash Auditor state
  const [selectedStackId, setSelectedStackId] = useState<string>("blueprint");
  const [stackPhoneView, setStackPhoneView] =
    useState<ShowcaseScreenKey>("mastermind-protocols");
  const [clashResolved, setClashResolved] = useState<boolean>(false);

  // Section G: Adaptive 80/20 Survival Mode & Sleep Triage state
  const [governorMode, setGovernorMode] = useState<
    "optimal" | "sleep-triage" | "pareto-8020"
  >("pareto-8020");

  // Section H: FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const isDark = previewTheme === "dark";

  // Hydrate stored theme override on mount (if user previously toggled)
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
   * - Target scheme = opposite of currently rendered scheme (or explicit selection).
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

  const activeVectorSpec =
    LONGEVITY_VECTORS.find((v) => v.id === selectedVectorId) ||
    LONGEVITY_VECTORS[0];

  const activeStackSpec =
    MASTERMIND_STACKS.find((s) => s.id === selectedStackId) ||
    MASTERMIND_STACKS[0];

  // Exact Dual-Theme Token Palette
  const tokens = {
    canvasBg: isDark ? "#030712" : "#F8F9F7",
    cardBg: isDark ? "rgba(17, 24, 39, 0.75)" : "rgba(255, 255, 255, 0.88)",
    cardBorder: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)",
    textPrimary: isDark ? "#F9FAFB" : "#0F172A",
    textSecondary: isDark ? "#9CA3AF" : "#475569",
    accentEmerald: isDark ? "#10B981" : "#0D9488",
    accentSky: isDark ? "#38BDF8" : "#0284C7",
    dawnAmber: isDark ? "#F59E0B" : "#D97706",
    zenithSky: isDark ? "#0EA5E9" : "#0284C7",
    duskIndigo: isDark ? "#6366F1" : "#4F46E5",
    nightViolet: isDark ? "#A855F7" : "#7C3AED",
  };

  return (
    <div
      className="min-h-screen font-sans relative transition-colors duration-500 overflow-x-hidden"
      style={{
        backgroundColor: tokens.canvasBg,
        color: tokens.textPrimary,
        colorScheme: previewTheme,
      }}
    >
      {/* Ambient Circadian / Botanical Radial Washes */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] h-[540px] rounded-full blur-[130px] transition-all duration-700"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(56, 189, 248, 0.10) 45%, transparent 75%)"
              : "radial-gradient(circle, #E6F3EB 0%, #F0EDFB 55%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-[42%] -right-32 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(224, 242, 254, 0.7) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ====================================================================
          SECTION A — STICKY GLASS SUB-HEADER
         ==================================================================== */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300"
        style={{
          backgroundColor: isDark
            ? "rgba(3, 7, 18, 0.82)"
            : "rgba(248, 249, 247, 0.88)",
          borderColor: tokens.cardBorder,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left: LEVL Logo + OS v2.6 Pill Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/levl-logo.png"
                alt="LEVL"
                width={96}
                height={32}
                className={`h-6 w-auto object-contain transition-all ${
                  !isDark ? "invert brightness-15" : ""
                }`}
              />
            </Link>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border"
              style={{
                backgroundColor: isDark
                  ? "rgba(16, 185, 129, 0.12)"
                  : "rgba(13, 148, 136, 0.12)",
                borderColor: isDark
                  ? "rgba(16, 185, 129, 0.35)"
                  : "rgba(13, 148, 136, 0.35)",
                color: tokens.accentEmerald,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              OS v2.6
            </span>
          </div>

          {/* Center (Desktop): Smooth-Scroll Anchor Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide">
            {[
              { label: "Circadian Engine", href: "#circadian-engine" },
              { label: "8-Vector Score", href: "#vector-score" },
              { label: "Mastermind Stacks", href: "#mastermind-stacks" },
              { label: "Clinical Evidence", href: "#clinical-evidence" },
              { label: "Adaptive 80/20", href: "#adaptive-8020" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-opacity hover:opacity-100 opacity-75"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Interactive Theme Toggle + Enter VIP Code + Get Early Access */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Two-State Theme Toggle in Site Chrome */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                isDark ? "Daylight Quartz Light" : "Obsidian Dark"
              } mode`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: tokens.cardBg,
                borderColor: tokens.cardBorder,
              }}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">🌙 Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline">☀️ Light</span>
                </>
              )}
            </button>

            {/* Enter VIP Code Ghost Button */}
            <button
              type="button"
              onClick={() => openModal("vip")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer hover:opacity-90"
              style={{
                borderColor: tokens.cardBorder,
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(15,23,42,0.04)",
              }}
            >
              <KeyRound className="w-3.5 h-3.5 text-sky-400" />
              <span>Enter VIP Code</span>
            </button>

            {/* Get Early Access Emerald Gradient Button */}
            <button
              type="button"
              onClick={() => openModal("waitlist")}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ====================================================================
            SECTION B — HERO SECTION (ABOVE THE FOLD)
           ==================================================================== */}
        <section className="pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Top Eyebrow Pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase border mb-6"
            style={{
              backgroundColor: isDark
                ? "rgba(16, 185, 129, 0.10)"
                : "rgba(13, 148, 136, 0.10)",
              borderColor: isDark
                ? "rgba(16, 185, 129, 0.30)"
                : "rgba(13, 148, 136, 0.30)",
              color: tokens.accentEmerald,
            }}
          >
            <span>✦ BIOLOGICAL PROTOCOL ENGINE • VIP EARLY ACCESS</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] max-w-5xl mx-auto mb-6">
            Your Biology Runs on a Clock.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #10B981 0%, #38BDF8 55%, #A855F7 100%)"
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
            Explore 100+ clinically graded longevity modalities, adopt
            world-class Mastermind stacks in one tap, and track your real-time
            impact across all 8 biological vectors of aging.
          </p>

          {/* Hero CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-10">
            <button
              type="button"
              onClick={() => openModal("waitlist")}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Early Access</span>
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
              <span>Have VIP Code? Launch App →</span>
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
                <span>🌙 Obsidian Dark</span>
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
                <span>☀️ Daylight Quartz</span>
              </button>
            </div>
          </div>

          {/* Hero Visual: 3-Phone Perspective Stage */}
          <div className="relative max-w-6xl mx-auto pt-2 pb-6">
            {/* Mobile Screen Selector Pills (visible on small screens so mobile visitors can inspect all 3 hero phones) */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
              {[
                { key: "longevity-score" as const, label: "8-Vector Radar" },
                { key: "today-circadian" as const, label: "Today Feed (#1)" },
                { key: "schedule-grid" as const, label: "7-Day Schedule" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setHeroFocusScreen(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    heroFocusScreen === tab.key
                      ? "bg-emerald-500 text-slate-950 border-emerald-500"
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
                    ? "Today Circadian Feed — Morning Sunlight Anchored #1"
                    : heroFocusScreen === "longevity-score"
                    ? "8-Vector Biological Radar & Coverage Score"
                    : "7-Day Pulsed Cadence & Split-Dose Schedule"
                }
              />
            </div>

            {/* Desktop 3-Phone Perspective Stage */}
            <div className="hidden lg:flex items-center justify-center relative min-h-[680px]">
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
                  caption="Today Circadian Feed • Morning Sunlight #1 Anchor"
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
            SECTION C — SOCIAL PROOF & CLINICAL RIGOR TICKER + PERSONA MATRIX
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
                      ? "rgba(3, 7, 18, 0.55)"
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

        {/* Target Audience & Conversion Psychology Matrix (3 Longevity Archetypes) */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
              style={{ color: tokens.accentSky }}
            >
              BUILT FOR HIGH-INTENT LONGEVITY OPERATORS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              One Circadian Operating System. Three Breakthrough Workflows.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: tokens.textSecondary }}>
              Whether you’re stacking 20+ interventions, tracking epigenetic labs,
              or traveling across time zones, LEVL replaces fragmented spreadsheets
              with biological precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARCHETYPES.map((item) => (
              <div
                key={item.persona}
                className="rounded-3xl border p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight">
                      {item.persona}
                    </h3>
                    <p
                      className="text-xs font-mono mt-0.5"
                      style={{ color: tokens.accentSky }}
                    >
                      {item.sub}
                    </p>
                  </div>

                  <div
                    className="p-3.5 rounded-2xl border text-xs leading-relaxed"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(239, 68, 68, 0.06)"
                        : "rgba(254, 226, 226, 0.45)",
                      borderColor: isDark
                        ? "rgba(239, 68, 68, 0.2)"
                        : "rgba(239, 68, 68, 0.25)",
                      color: tokens.textSecondary,
                    }}
                  >
                    <strong className="text-red-400 block mb-1 font-mono uppercase text-[10px]">
                      Core Frustration Today:
                    </strong>
                    {item.frustration}
                  </div>

                  <div
                    className="p-3.5 rounded-2xl border text-xs leading-relaxed"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(16, 185, 129, 0.08)"
                        : "rgba(209, 250, 229, 0.5)",
                      borderColor: isDark
                        ? "rgba(16, 185, 129, 0.25)"
                        : "rgba(13, 148, 136, 0.25)",
                    }}
                  >
                    <strong
                      className="block mb-1 font-mono uppercase text-[10px]"
                      style={{ color: tokens.accentEmerald }}
                    >
                      The LEVL Hook:
                    </strong>
                    <span className="font-semibold">{item.hook}</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t flex items-center justify-between text-xs font-bold" style={{ borderColor: tokens.cardBorder }}>
                  <span style={{ color: tokens.textSecondary }}>
                    Showcase: {item.screenLabel}
                  </span>
                  <a
                    href={item.targetAnchor}
                    className="inline-flex items-center gap-1"
                    style={{ color: tokens.accentEmerald }}
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            SECTION D — INTERACTIVE CIRCADIAN TIME-BLOCK EXPLORER
           ==================================================================== */}
        <section
          id="circadian-engine"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
              style={{ color: tokens.dawnAmber }}
            >
              SIGNATURE DIFFERENTIATOR • CHRONOBIOLOGY ENGINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Right Modality. Right Dose.{" "}
              <span style={{ color: tokens.dawnAmber }}>
                Right Biological Hour.
              </span>
            </h2>
            <p className="text-base sm:text-lg" style={{ color: tokens.textSecondary }}>
              Taking the right supplement or doing a cold plunge at the wrong
              circadian phase can blunt your adaptation. Click each phase below to
              inspect how LEVL sequences your day.
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
                        ? "rgba(17, 24, 39, 0.95)"
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

          {/* Active Phase Details + Phone Showcase */}
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
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: tokens.textSecondary }}
                  >
                    {activePhaseSpec.rationale}
                  </p>
                </div>

                {/* Phase Modalities List */}
                <div className="space-y-3.5">
                  {activePhaseSpec.modalities.map((mod) => (
                    <div
                      key={mod.name}
                      className="p-4 rounded-2xl border transition-all"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(3, 7, 18, 0.55)"
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
                        className="text-xs sm:text-sm mb-2"
                        style={{ color: tokens.textSecondary }}
                      >
                        {mod.detail}
                      </p>
                      <div className="text-[11px] font-mono opacity-80">
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
                caption={`Live Preview: ${activePhaseSpec.label} (${activePhaseSpec.window})`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION E — INTERACTIVE 8-VECTOR BIOLOGICAL RADAR & CLINICAL EVIDENCE
           ==================================================================== */}
        <section
          id="vector-score"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
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

          {/* Selected Vector Deep-Dive + Dual Phone Switcher */}
          <div
            id="clinical-evidence"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24"
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
                      style={{ color: tokens.accentSky }}
                    >
                      {activeVectorSpec.effectSize}
                    </span>
                  </div>
                </div>

                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  {activeVectorSpec.effectDetail}
                </p>

                {/* Tier-1 Anchor Modalities */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-2.5 opacity-80">
                    Tier-1 Anchor Modalities (Scored 65–100)
                  </h4>
                  <div className="space-y-2">
                    {activeVectorSpec.anchorModalities.map((m) => (
                      <div
                        key={m}
                        className="p-3 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-semibold"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(3, 7, 18, 0.55)"
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

                {/* Biomarkers & Molecular Pathways */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-2xl border"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(3, 7, 18, 0.45)"
                        : "rgba(248, 249, 247, 0.8)",
                      borderColor: tokens.cardBorder,
                    }}
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider block mb-2 opacity-75">
                      Biomarker Anchors (/tracking)
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
                        ? "rgba(3, 7, 18, 0.45)"
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

                {/* Verified PubMed Citation Bar */}
                <div
                  className="p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono"
                  style={{ borderColor: tokens.cardBorder }}
                >
                  <span>★ Verified Clinical Evidence: {activeVectorSpec.citation}</span>
                  <span style={{ color: tokens.accentEmerald }}>Grade A RCT</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Screen Switcher (8-Vector Radar / Grade-A Evidence / Biomarkers) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="inline-flex items-center gap-1 p-1 rounded-full border mb-5"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                {[
                  { key: "longevity-score" as const, label: "8-Vector Radar" },
                  { key: "modality-evidence" as const, label: "Grade-A RCT Modal" },
                  { key: "biomarkers-tracking" as const, label: "Lab Biomarkers" },
                ].map((view) => (
                  <button
                    key={view.key}
                    type="button"
                    onClick={() => setVectorPhoneView(view.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      vectorPhoneView === view.key
                        ? "bg-emerald-500 text-slate-950 shadow"
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
                caption={`Inspecting ${activeVectorSpec.name} on ${vectorPhoneView.replace(
                  "-",
                  " "
                )}`}
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION F — MASTERMIND PROTOCOL STACKS + BIOCHEMICAL CLASH DETECTION
           ==================================================================== */}
        <section
          id="mastermind-stacks"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
              style={{ color: tokens.accentSky }}
            >
              1-TAP PROTOCOL ENROLLMENT • BIOCHEMICAL CONFLICT AUDITOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Adopt World-Class Mastermind Stacks.{" "}
              <span style={{ color: tokens.accentSky }}>
                Zero Pathway Clashes.
              </span>
            </h2>
            <p className="text-base sm:text-lg" style={{ color: tokens.textSecondary }}>
              Compare and enroll in flagship longevity stacks in one tap—while
              LEVL’s Biochemical Clash Engine prevents antagonistic timing
              mistakes automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: 4 Mastermind Stack Selector + Live Biochemical Clash Simulator */}
            <div className="lg:col-span-7 space-y-6">
              {/* 4 Flagship Stack Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MASTERMIND_STACKS.map((stack) => {
                  const isSelected = stack.id === selectedStackId;
                  return (
                    <button
                      key={stack.id}
                      type="button"
                      onClick={() => {
                        setSelectedStackId(stack.id);
                        setStackPhoneView("mastermind-protocols");
                      }}
                      className="p-4 rounded-2xl border text-left transition-all cursor-pointer"
                      style={{
                        backgroundColor: isSelected
                          ? isDark
                            ? "rgba(56, 189, 248, 0.12)"
                            : "rgba(2, 132, 199, 0.10)"
                          : tokens.cardBg,
                        borderColor: isSelected
                          ? tokens.accentSky
                          : tokens.cardBorder,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-extrabold text-sm">
                          {stack.name}
                        </span>
                      </div>
                      <p
                        className="text-xs line-clamp-1 mb-2"
                        style={{ color: tokens.textSecondary }}
                      >
                        {stack.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span
                          className="px-2 py-0.5 rounded bg-emerald-500/15 font-bold"
                          style={{ color: tokens.accentEmerald }}
                        >
                          {stack.modalitiesCount}
                        </span>
                        <span className="opacity-75">{stack.vectorsCovered}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Mastermind Stack Breakdown Card */}
              <div
                className="p-6 rounded-3xl border backdrop-blur-xl space-y-4"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span
                      className="text-xs font-mono font-bold uppercase"
                      style={{ color: tokens.accentEmerald }}
                    >
                      {activeStackSpec.paceBadge} • {activeStackSpec.vectorsCovered}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold">
                      {activeStackSpec.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal("vip")}
                    className="px-4 py-2 rounded-full text-xs font-extrabold bg-emerald-500 text-slate-950 hover:opacity-90 transition-all cursor-pointer"
                  >
                    1-Tap Enroll in App →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStackSpec.highlights.map((h) => (
                    <div
                      key={h}
                      className="p-3 rounded-xl border text-xs font-medium flex items-start gap-2"
                      style={{
                        backgroundColor: isDark
                          ? "rgba(3, 7, 18, 0.5)"
                          : "rgba(248, 249, 247, 0.9)",
                        borderColor: tokens.cardBorder,
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: tokens.accentEmerald }}
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Biochemical Clash Auditing Demo */}
              <div
                className="p-6 rounded-3xl border backdrop-blur-xl space-y-4 transition-all"
                style={{
                  backgroundColor: clashResolved
                    ? isDark
                      ? "rgba(16, 185, 129, 0.08)"
                      : "rgba(209, 250, 229, 0.55)"
                    : isDark
                    ? "rgba(245, 158, 11, 0.08)"
                    : "rgba(254, 243, 199, 0.65)",
                  borderColor: clashResolved
                    ? tokens.accentEmerald
                    : tokens.dawnAmber,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className="w-5 h-5"
                      style={{
                        color: clashResolved
                          ? tokens.accentEmerald
                          : tokens.dawnAmber,
                      }}
                    />
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider">
                      Live Biochemical Conflict Auditor (/bench)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setClashResolved(!clashResolved);
                      setStackPhoneView("bench-drawer");
                    }}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer"
                    style={{
                      backgroundColor: clashResolved
                        ? tokens.accentEmerald
                        : tokens.dawnAmber,
                      color: "#030712",
                      borderColor: "transparent",
                    }}
                  >
                    {clashResolved
                      ? "✓ Rescheduled (Click to Reset)"
                      : "⚡ Run 1-Tap Smart Reschedule"}
                  </button>
                </div>

                {!clashResolved ? (
                  <p className="text-xs sm:text-sm leading-relaxed">
                    <strong>⚠️ Antagonistic Clash Detected:</strong> Scheduling{" "}
                    <strong>Cold Plunge (50°F)</strong> or{" "}
                    <strong>Metformin (500mg)</strong> immediately after{" "}
                    <strong>Heavy Hypertrophy Resistance Training</strong> blunts{" "}
                    <code className="font-mono font-bold">mTORC1</code>,{" "}
                    <code className="font-mono font-bold">IGF-1</code>, and ribosomal
                    satellite cell signaling by up to 24%.
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm leading-relaxed">
                    <strong>✓ Pathway Conflict Resolved:</strong> LEVL moved{" "}
                    <strong>Cold Plunge (50°F–55°F)</strong> to{" "}
                    <strong>Morning Rise (07:30 AM) / Non-Lifting Days</strong> and
                    benched Metformin on peak VO2 Max days—preserving 100% of your{" "}
                    <code className="font-mono font-bold">mTORC1</code> hypertrophy
                    window.
                  </p>
                )}
              </div>
            </div>

            {/* Right: Mastermind Protocols & Bench Drawer Phone Switcher */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="inline-flex items-center gap-1 p-1 rounded-full border mb-5"
                style={{
                  backgroundColor: tokens.cardBg,
                  borderColor: tokens.cardBorder,
                }}
              >
                <button
                  type="button"
                  onClick={() => setStackPhoneView("mastermind-protocols")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    stackPhoneView === "mastermind-protocols"
                      ? "bg-emerald-500 text-slate-950 shadow"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  Mastermind Stacks (/protocols)
                </button>
                <button
                  type="button"
                  onClick={() => setStackPhoneView("bench-drawer")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    stackPhoneView === "bench-drawer"
                      ? "bg-emerald-500 text-slate-950 shadow"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  Bench & Clash Guard (/bench)
                </button>
              </div>

              <IPhoneShowcaseFrame
                screenKey={stackPhoneView}
                theme={previewTheme}
                caption={
                  stackPhoneView === "mastermind-protocols"
                    ? "1-Tap Mastermind Stack Comparison & Enrollment"
                    : "Active vs. Benched Modalities & Clash Detection"
                }
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION G — ADAPTIVE 80/20 SURVIVAL MODE & SLEEP TRIAGE
           ==================================================================== */}
        <section
          id="adaptive-8020"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold block mb-2"
                  style={{ color: tokens.duskIndigo }}
                >
                  ANTI-BURNOUT ENGINE • ADAPTIVE ROUTINE GOVERNOR
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Built for Real Life:{" "}
                  <span style={{ color: tokens.accentEmerald }}>
                    Adaptive 80/20 Survival Mode & Sleep Triage.
                  </span>
                </h2>
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: tokens.textSecondary }}
                >
                  Rigid 25-step checklists cause “all-or-nothing burnout” on
                  red-eye travel days or poor sleep nights. LEVL dynamically scales
                  your daily protocol so your streak and biology never break.
                </p>
              </div>

              {/* Interactive Governor Mode Selector */}
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
                    sub: "Logged <6.5h Sleep / Low HRV",
                    badge: "CNS Strain Auto-Swapped",
                  },
                  {
                    id: "optimal" as const,
                    title: "Full Precision Stack",
                    sub: "85%+ Readiness Score",
                    badge: "All 16 Daily Modalities",
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

              {/* Dynamic Mode Output Card */}
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
                        🛡️ 1-Tap 80/20 Pareto Shield Active (4 Anchors • 22 Mins Total)
                      </h3>
                      <span className="text-xs font-mono font-bold text-emerald-500">
                        82% Biological ROI Retained
                      </span>
                    </div>
                    <p
                      className="text-xs sm:text-sm"
                      style={{ color: tokens.textSecondary }}
                    >
                      16 secondary/marginal steps automatically deferred. Only your
                      top 20% highest-ROI Tier-1 anchors remain active today:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
                      {[
                        "1. Morning Sunlight (10m Outdoor Lux)",
                        "2. Creatine 5g + Essential Lipid Matrix",
                        "3. 15m Post-Meal Zone 1 Metabolic Walk",
                        "4. Evening Mg L-Threonate + 3g Glycine",
                      ].map((step) => (
                        <div
                          key={step}
                          className="p-3 rounded-xl border flex items-center gap-2"
                          style={{ borderColor: tokens.cardBorder }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
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
                        🌙 Poor Sleep Triage (&lt;6.5h Logged) — CNS Protection Active
                      </h3>
                      <span className="text-xs font-mono font-bold text-amber-500">
                        Autonomic Recovery Mode
                      </span>
                    </div>
                    <p
                      className="text-xs sm:text-sm"
                      style={{ color: tokens.textSecondary }}
                    >
                      High-CNS strain workouts on sleep debt spike cortisol and
                      injury risk. LEVL automatically swaps today’s heavy intervals
                      for parasympathetic recovery:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold">
                      {[
                        "✓ Swapped Norwegian 4x4 → 25m Zone 1 Nasal Walk",
                        "✓ Added 20m Afternoon NSDR (Non-Sleep Deep Rest)",
                        "✓ Elevated Creatine to 10g (Acute Sleep-Debt Brain Buffer)",
                        "✓ Shifted Evening Wind-Down 45m Earlier",
                      ].map((step) => (
                        <div
                          key={step}
                          className="p-3 rounded-xl border flex items-center gap-2"
                          style={{ borderColor: tokens.cardBorder }}
                        >
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
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
                      className="text-xs sm:text-sm"
                      style={{ color: tokens.textSecondary }}
                    >
                      Your HRV and deep sleep are in the top quartile. LEVL unlocks
                      your scheduled Norwegian 4x4 VO2 Max + 174°F+ Finnish Sauna
                      pairing in the 14:00–18:00 Afternoon Dip window.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <IPhoneShowcaseFrame
                screenKey="schedule-grid"
                theme={previewTheme}
                caption="7-Day Schedule Grid & 1-Tap Rest Day Reconciliation"
              />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION H — BOTTOM CONVERSION BANNER & 5-QUESTION FAQ
           ==================================================================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
                  "radial-gradient(circle, #10B981 0%, #38BDF8 60%, transparent 100%)",
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
                Ready to OutPace Aging?
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Turn Longevity Science Into Your Daily Operating System.
              </h2>

              <p
                className="text-base sm:text-lg"
                style={{ color: tokens.textSecondary }}
              >
                Join the Early Access cohort or enter your VIP activation code to
                launch the LEVL Web & Mobile PWA immediately.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openModal("waitlist")}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-extrabold text-sm sm:text-base bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join Early Access Waitlist</span>
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
                Everything You Need to Know About LEVL OS
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
                      className="px-6 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3.5"
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

      {/* Global Footer */}
      <Footer />

      {/* Early Access Waitlist + VIP Invite Code Modal (LEV2035) */}
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
