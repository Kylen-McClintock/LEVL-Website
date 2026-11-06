'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    Activity,
    ChevronDown,
    ChevronUp,
    Compass,
    Gauge,
    Sparkles,
    Zap,
} from 'lucide-react';
import type { OutpaceAgingIssue } from '@/lib/data/outpaceAgingIssues';

const FUTUREGRAPH_WEEKLY_PULSE_API = 'https://futuregraph-beta.vercel.app/api/v1/lev/weekly-pulse';

interface CohortMetricsSnapshot {
    intrinsicPaceOfAging: number;
    biotechRejuvenationOffset: number;
    netEffectivePaceOfAging: number;
    bioMonthsPerYear: number;
    daysGainedPerYear: number;
    levInterceptYear: number;
    levInterceptFormatted: string;
    yearsToLev: number;
    biologicalAgeAtLev: number;
    poaP25?: number;
    poaP75?: number;
}

interface KpiMetricItem {
    id: string;
    name: string;
    shortLabel: string;
    displayValue: string;
    trendMagnitude: string;
    annualVelocityPct: number;
    indexWeight: number;
    weightedContribution: number;
}

interface QuantileDateCone {
    p10Formatted: string;
    p25Formatted: string;
    p50Formatted: string;
    p75Formatted: string;
    p90Formatted: string;
}

interface LiveFutureGraphData {
    aggregate99thFormatted: string;
    aggregate80thFormatted: string;
    marketAggregate99thYear: number;
    expertAggregate99thYear: number;
    trajectoryIntercept99thYear: number;
    cone99th: QuantileDateCone;
    cone80th: QuantileDateCone;
    cohorts: {
        p99: CohortMetricsSnapshot;
        p80: CohortMetricsSnapshot;
    };
    kpiVelocityEngine: {
        weightedAvgVelocityPct: number;
        normalizedAccelerationVector: number;
        totalWeightedVelocity: number;
        totalWeight: number;
        metrics: KpiMetricItem[];
    };
    latestPulse: {
        weekOf: string;
        issueLabel: string;
        newsletterTitle: string;
        newsletterUrl: string;
        predictionMarketsSummary: string;
        expertConsensusSummary: string;
        breakthroughsSummary: string;
        netWeeklyDelta: {
            days99thLevShift: number;
            days80thLevShift: number;
            poa99thShift: number;
            poa80thShift: number;
        };
    };
}

const FALLBACK_BASELINE: LiveFutureGraphData = {
    aggregate99thFormatted: 'October 2036',
    aggregate80thFormatted: 'February 2042',
    marketAggregate99thYear: 2037.6,
    expertAggregate99thYear: 2036.6,
    trajectoryIntercept99thYear: 2035.8,
    cone99th: {
        p10Formatted: 'Jul 2030',
        p25Formatted: 'May 2033',
        p50Formatted: 'Oct 2036',
        p75Formatted: 'Jan 2041',
        p90Formatted: 'May 2045',
    },
    cone80th: {
        p10Formatted: 'Apr 2035',
        p25Formatted: 'Apr 2038',
        p50Formatted: 'Feb 2042',
        p75Formatted: 'Oct 2046',
        p90Formatted: 'Sep 2051',
    },
    cohorts: {
        p99: {
            intrinsicPaceOfAging: 0.665,
            biotechRejuvenationOffset: 0.118,
            netEffectivePaceOfAging: 0.547,
            bioMonthsPerYear: 8.0,
            daysGainedPerYear: 122,
            levInterceptYear: 2036.8,
            levInterceptFormatted: 'October 2036',
            yearsToLev: 9.9,
            biologicalAgeAtLev: 33.1,
            poaP25: 0.62,
            poaP75: 0.715,
        },
        p80: {
            intrinsicPaceOfAging: 0.842,
            biotechRejuvenationOffset: 0.049,
            netEffectivePaceOfAging: 0.793,
            bioMonthsPerYear: 10.1,
            daysGainedPerYear: 58,
            levInterceptYear: 2042.1,
            levInterceptFormatted: 'February 2042',
            yearsToLev: 15.3,
            biologicalAgeAtLev: 39.2,
            poaP25: 0.795,
            poaP75: 0.895,
        },
    },
    kpiVelocityEngine: {
        weightedAvgVelocityPct: 26.8,
        normalizedAccelerationVector: 0.13,
        totalWeightedVelocity: 274.88,
        totalWeight: 10.25,
        metrics: [
            {
                id: 'kpi-lev-readiness',
                name: 'LEV Readiness Index (Composite Bridge)',
                shortLabel: 'LEV Velocity Bridge',
                displayValue: '26.8 / 100',
                trendMagnitude: '+2.8 pts (Nov 2026 Pulse)',
                annualVelocityPct: 28.5,
                indexWeight: 1.0,
                weightedContribution: 28.5,
            },
            {
                id: 'kpi-cellular-reprogramming',
                name: 'In Vivo Partial Cellular Reprogramming',
                shortLabel: 'Epigenetic Reset (OSK)',
                displayValue: 'NHP Safety / IND Prep',
                trendMagnitude: 'Zero teratoma at 18m in NHP',
                annualVelocityPct: 32.0,
                indexWeight: 1.0,
                weightedContribution: 32.0,
            },
            {
                id: 'kpi-epigenetic-clock-validation',
                name: 'Epigenetic Clock Surrogate Validation (TranslAGE)',
                shortLabel: 'Biomarker Clock Trials',
                displayValue: '51 Human RCTs • $85/assay',
                trendMagnitude: 'DunedinPACE & PCGrimAge validated',
                annualVelocityPct: 38.0,
                indexWeight: 0.9,
                weightedContribution: 34.2,
            },
            {
                id: 'kpi-cancer-5yr-survival',
                name: '5-Year All-Cancer Composite Survival Rate',
                shortLabel: 'All-Cancer 5-Yr Survival',
                displayValue: '69.8%',
                trendMagnitude: '+1.2% YoY (ctDNA + mRNA)',
                annualVelocityPct: 1.2,
                indexWeight: 0.9,
                weightedContribution: 1.08,
            },
            {
                id: 'kpi-senolytics-clinical',
                name: 'Senolytics & Immune Senescence Clearance',
                shortLabel: 'Senolytic Therapeutics',
                displayValue: 'Phase 2 + Nanovaccines',
                trendMagnitude: 'HR 0.28 survival gain (CK5-GC-NV)',
                annualVelocityPct: 26.0,
                indexWeight: 0.85,
                weightedContribution: 22.1,
            },
            {
                id: 'kpi-omics-genome-cost',
                name: 'Multi-Omics & Whole-Genome Sequencing Efficiency',
                shortLabel: 'Omics Cost Velocity',
                displayValue: '$100 WGS • $240 Multi-Omic',
                trendMagnitude: '68% annualized cost improvement',
                annualVelocityPct: 68.0,
                indexWeight: 0.8,
                weightedContribution: 54.4,
            },
            {
                id: 'kpi-nad-salvage-proteostasis',
                name: 'Proteostasis & NAD+ Salvage Enzyme Preservation',
                shortLabel: 'NAMPT / AEP Blockade',
                displayValue: '+17% Lifespan (AEP/NAMPT)',
                trendMagnitude: '24m → 28m via #11a AEP blockade',
                annualVelocityPct: 22.5,
                indexWeight: 0.8,
                weightedContribution: 18.0,
            },
            {
                id: 'kpi-neuro-glial-rejuvenation',
                name: 'Glial Autophagy & Microglial Lipid Remodeling',
                shortLabel: 'Neuro-Glial Clearance',
                displayValue: 'FGF13 + PLA2G2F Rescue',
                trendMagnitude: '-66% microglial lipid load & lower IL-6',
                annualVelocityPct: 24.0,
                indexWeight: 0.8,
                weightedContribution: 19.2,
            },
            {
                id: 'kpi-approved-gene-therapies',
                name: 'FDA/EMA Approved Gene & Base-Editing Therapies',
                shortLabel: 'Approved Gene Therapies',
                displayValue: '34 Approved',
                trendMagnitude: '+6 approvals YoY (+21.4%/yr)',
                annualVelocityPct: 21.4,
                indexWeight: 0.75,
                weightedContribution: 16.05,
            },
            {
                id: 'kpi-tissue-organ-engineering',
                name: 'Bio-Engineered Tissue & Xenotransplant Survival',
                shortLabel: 'Organ & Tissue Replacement',
                displayValue: 'Phase 1/2 Human Trials',
                trendMagnitude: 'Gene-edited porcine kidney >1 yr survival',
                annualVelocityPct: 18.5,
                indexWeight: 0.7,
                weightedContribution: 12.95,
            },
            {
                id: 'kpi-approved-cell-therapies',
                name: 'Approved Cellular & Immune Rejuvenation Therapies',
                shortLabel: 'Approved Cell Therapies',
                displayValue: '42 Approved',
                trendMagnitude: '+19.0% YoY expansion into autoimmunity',
                annualVelocityPct: 19.0,
                indexWeight: 0.65,
                weightedContribution: 12.35,
            },
            {
                id: 'kpi-longevity-clinical-trials',
                name: 'Active Human Geroscience & Longevity Clinical Trials',
                shortLabel: 'Longevity Clinical Trials',
                displayValue: '195 Active Trials',
                trendMagnitude: '+16.5% YoY pipeline growth',
                annualVelocityPct: 16.5,
                indexWeight: 0.6,
                weightedContribution: 9.9,
            },
            {
                id: 'kpi-early-cancer-survival-panel',
                name: 'Lung, Breast & Colorectal 5-Yr Survival Velocity',
                shortLabel: 'Solid-Tumor Survival Trend',
                displayValue: '28% Lung • 91% Breast',
                trendMagnitude: '+1.6% annualized stage-shift gain',
                annualVelocityPct: 1.6,
                indexWeight: 0.3,
                weightedContribution: 0.48,
            },
            {
                id: 'kpi-biostasis-cryonics-readiness',
                name: 'Reversible Cryopreservation & Biostasis Research',
                shortLabel: 'Cryobiology & Biostasis',
                displayValue: 'Whole-Organ Rat Kidney',
                trendMagnitude: '+12.0%/yr nanowarming progress',
                annualVelocityPct: 12.0,
                indexWeight: 0.2,
                weightedContribution: 2.4,
            },
        ],
    },
    latestPulse: {
        weekOf: '2026-11-05',
        issueLabel: 'Outpace Aging • Edition #1 (Nov 5, 2026)',
        newsletterTitle:
            'Enzyme Shield Extends Mouse Lifespan 17%, Spider-Silk Senolytic Nanovaccine Cuts Mortality 72%, and 51-Trial TranslAGE Clock Benchmark',
        newsletterUrl: 'https://www.levlhealth.com/newsletter/edition-1',
        predictionMarketsSummary:
            'Metaculus #6592 (national LEV) held at Nov 2053 while Manifold 2036/2040 frontier LEV markets firmed (+1.5% WoW), pulling our Optimal Protocol LEV estimate 26 days closer to October 2036.',
        expertConsensusSummary:
            'Translational geroscience teams highlighted that standardized surrogate methylation clocks (DunedinPACE, PCGrimAge across 51 human trials) and immune-mediated senolytics are compressing Phase 2 efficacy readouts from multi-year survival studies to 6-month biomarker windows.',
        breakthroughsSummary:
            'Five peer-reviewed breakthroughs converged on intracellular maintenance: oral AEP inhibitor #11a preserved NAMPT to extend aged mouse lifespan 17%; spider-silk nanovaccine CK5-GC-NV cleared Gpnmb+ senescent cells (HR = 0.28); astrocyte FGF13 and neuronal PLA2G2F reversed glial lipid toxicity; and TranslAGE benchmarked 16 epigenetic clocks across 51 human trials.',
        netWeeklyDelta: {
            days99thLevShift: -26,
            days80thLevShift: -16,
            poa99thShift: -0.0035,
            poa80thShift: -0.002,
        },
    },
};

export function buildWeeklyPulsePayloadFromIssue(issue: OutpaceAgingIssue) {
    const isoDate = '2026-11-05';
    return {
        id: `pulse-2026-outpace-0${issue.issueNumber}`,
        weekOf: isoDate,
        issueLabel: `Outpace Aging • Edition #${issue.issueNumber} (${issue.dateLabel})`,
        newsletterTitle: issue.title,
        newsletterUrl: `https://www.levlhealth.com/newsletter/${issue.shortSlug}`,
        authorOrSource: 'Outpace Aging • LEVL Weekly Longevity Roundup',
        predictionMarketsSummary:
            'Metaculus #6592 (national LEV) held at Nov 2053 while Manifold 2036/2040 frontier LEV markets firmed (+1.5% WoW), pulling the Optimal Protocol LEV aggregate 26 days closer to October 2036.',
        expertConsensusSummary:
            'Translational geroscience teams highlighted that standardized surrogate methylation clocks (DunedinPACE, PCGrimAge across 51 human trials) and immune-mediated senolytics are compressing Phase 2 efficacy readouts from multi-year survival studies to 6-month biomarker windows.',
        breakthroughsSummary: issue.subtitle,
        breakthroughs: issue.studies.map((s, idx) => ({
            id: `bt-outpace-0${issue.issueNumber}-${idx + 1}`,
            title: s.headline,
            category: idx === 4 ? 'biomarker_clock' : idx === 1 ? 'clinical_trial' : 'ai_biotech',
            summary: s.keyStatBadge,
            sourceUrl: s.studyUrl,
            sourceLabel: `${s.journal} (${s.publishDate})`,
            delta99thLevYears: idx === 1 || idx === 4 ? -0.025 : -0.015,
            deltaPoA99th: -0.0007,
            deltaPoA80th: -0.0004,
        })),
        netWeeklyDelta: {
            days99thLevShift: -26,
            days80thLevShift: -16,
            poa99thShift: -0.0035,
            poa80thShift: -0.002,
        },
    };
}

/**
 * Renders the P25 / P50 Median / P75 Bayesian Probability Density Curve
 * (shown inside the expanded LEV breakdown).
 */
function ProbabilityDistributionCurve({
    idSuffix,
    p25Label,
    p50Label,
    p75Label,
    tailRangeLabel,
    accentColor,
    isLightMode,
}: {
    idSuffix: string;
    p25Label: string;
    p50Label: string;
    p75Label: string;
    tailRangeLabel?: string;
    accentColor: string;
    isLightMode: boolean;
}) {
    return (
        <div
            className={`mt-2.5 pt-2 border-t ${
                isLightMode ? 'border-slate-200' : 'border-white/10'
            }`}
        >
            <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono mb-1">
                <span className={isLightMode ? 'text-emerald-700' : 'text-emerald-300'}>
                    P25: <strong>{p25Label}</strong>
                </span>
                <span className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    P50: {p50Label}
                </span>
                <span className={isLightMode ? 'text-amber-700' : 'text-amber-300'}>
                    P75: <strong>{p75Label}</strong>
                </span>
            </div>
            <svg viewBox="0 0 240 58" className="w-full h-13 overflow-visible">
                <defs>
                    <linearGradient id={`nl-iqr-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
                        <stop offset="100%" stopColor={accentColor} stopOpacity="0.06" />
                    </linearGradient>
                    <linearGradient id={`nl-tail-${idSuffix}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accentColor} stopOpacity="0.16" />
                        <stop offset="100%" stopColor={accentColor} stopOpacity="0.01" />
                    </linearGradient>
                </defs>

                {/* Baseline axis */}
                <line
                    x1="8"
                    y1="46"
                    x2="232"
                    y2="46"
                    stroke={isLightMode ? 'rgba(15,23,42,0.2)' : 'rgba(255,255,255,0.18)'}
                    strokeWidth="1"
                />

                {/* Full distribution tail area */}
                <path
                    d="M 8,46 C 34,45 56,37 82,21 C 96,11 106,6 116,6 C 128,6 142,14 158,26 C 182,39 206,45 232,46 Z"
                    fill={`url(#nl-tail-${idSuffix})`}
                />

                {/* Shaded 25th–75th Percentile Interquartile Band (x=84 to x=156) */}
                <path
                    d="M 84,46 L 84,20 C 97,10 107,6 116,6 C 128,6 141,13 156,25 L 156,46 Z"
                    fill={`url(#nl-iqr-${idSuffix})`}
                />

                {/* Smooth probability density curve */}
                <path
                    d="M 8,46 C 34,45 56,37 82,21 C 96,11 106,6 116,6 C 128,6 142,14 158,26 C 182,39 206,45 232,46"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="1.8"
                />

                {/* P25 Marker */}
                <line
                    x1="84"
                    y1="20"
                    x2="84"
                    y2="46"
                    stroke="#10b981"
                    strokeWidth="1.1"
                    strokeDasharray="2 2"
                />
                <circle cx="84" cy="20" r="2.3" fill="#10b981" />

                {/* P50 Median Prominent Marker */}
                <line
                    x1="116"
                    y1="6"
                    x2="116"
                    y2="46"
                    stroke={isLightMode ? '#0f172a' : '#ffffff'}
                    strokeWidth="1.8"
                />
                <circle
                    cx="116"
                    cy="6"
                    r="3.4"
                    fill={isLightMode ? '#0f172a' : '#ffffff'}
                    stroke={accentColor}
                    strokeWidth="1.8"
                />

                {/* P75 Marker */}
                <line
                    x1="156"
                    y1="25"
                    x2="156"
                    y2="46"
                    stroke="#f59e0b"
                    strokeWidth="1.1"
                    strokeDasharray="2 2"
                />
                <circle cx="156" cy="25" r="2.3" fill="#f59e0b" />

                {/* Labels below axis */}
                <text
                    x="84"
                    y="55"
                    textAnchor="middle"
                    fill={isLightMode ? '#047857' : '#6ee7b7'}
                    fontSize="7.5"
                    className="font-mono"
                >
                    P25
                </text>
                <text
                    x="116"
                    y="55"
                    textAnchor="middle"
                    fill={isLightMode ? '#0f172a' : '#ffffff'}
                    fontSize="8"
                    fontWeight="bold"
                    className="font-mono"
                >
                    P50 Median
                </text>
                <text
                    x="156"
                    y="55"
                    textAnchor="middle"
                    fill={isLightMode ? '#b45309' : '#fcd34d'}
                    fontSize="7.5"
                    className="font-mono"
                >
                    P75
                </text>
            </svg>
            {tailRangeLabel && (
                <div
                    className={`text-[10px] font-mono text-center mt-0.5 ${
                        isLightMode ? 'text-slate-500' : 'text-slate-400'
                    }`}
                >
                    {tailRangeLabel}
                </div>
            )}
        </div>
    );
}

interface FutureGraphLevPulseWidgetProps {
    issue?: OutpaceAgingIssue;
    compact?: boolean;
    showPublisherSync?: boolean;
    isLightMode?: boolean;
    embeddedInIntro?: boolean;
    hideExpandControls?: boolean;
}

const DECADE_AGES = [30, 40, 50, 60, 70] as const;

export default function FutureGraphLevPulseWidget({
    issue,
    isLightMode = false,
    embeddedInIntro = false,
    hideExpandControls = false,
}: FutureGraphLevPulseWidgetProps) {
    const [age, setAge] = useState<number>(30);
    const [data, setData] = useState<LiveFutureGraphData>(FALLBACK_BASELINE);
    const [poaCohortToggle, setPoaCohortToggle] = useState<'p99' | 'p80'>('p99');
    // Both detail sections are collapsed by default so only the ultra-compact KPIs show
    const [showPulseDigest, setShowPulseDigest] = useState<boolean>(false);
    const [showVelocityMatrix, setShowVelocityMatrix] = useState<boolean>(false);

    const fetchLivePulse = useCallback(async (targetAge: number) => {
        try {
            const res = await fetch(
                `${FUTUREGRAPH_WEEKLY_PULSE_API}?age=${targetAge}&mode=moderate`,
                { cache: 'no-store' }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const comp = json.computation;
            const pulse = json.latestPulse || comp?.latestWeeklyPulse;
            const engine = json.kpiVelocityEngine || comp?.kpiVelocityEngine;

            if (comp && comp.cohorts?.p99 && comp.cohorts?.p80) {
                setData((prev) => ({
                    aggregate99thFormatted: comp.aggregate99thFormatted || prev.aggregate99thFormatted,
                    aggregate80thFormatted: comp.aggregate80thFormatted || prev.aggregate80thFormatted,
                    marketAggregate99thYear: comp.marketAggregate99thYear ?? prev.marketAggregate99thYear,
                    expertAggregate99thYear: comp.expertAggregate99thYear ?? prev.expertAggregate99thYear,
                    trajectoryIntercept99thYear:
                        comp.trajectoryIntercept99thYear ?? prev.trajectoryIntercept99thYear,
                    cone99th: {
                        p10Formatted: comp.cone99th?.p10Formatted || prev.cone99th.p10Formatted,
                        p25Formatted: comp.cone99th?.p25Formatted || prev.cone99th.p25Formatted,
                        p50Formatted: comp.cone99th?.p50Formatted || prev.cone99th.p50Formatted,
                        p75Formatted: comp.cone99th?.p75Formatted || prev.cone99th.p75Formatted,
                        p90Formatted: comp.cone99th?.p90Formatted || prev.cone99th.p90Formatted,
                    },
                    cone80th: {
                        p10Formatted: comp.cone80th?.p10Formatted || prev.cone80th.p10Formatted,
                        p25Formatted: comp.cone80th?.p25Formatted || prev.cone80th.p25Formatted,
                        p50Formatted: comp.cone80th?.p50Formatted || prev.cone80th.p50Formatted,
                        p75Formatted: comp.cone80th?.p75Formatted || prev.cone80th.p75Formatted,
                        p90Formatted: comp.cone80th?.p90Formatted || prev.cone80th.p90Formatted,
                    },
                    cohorts: {
                        p99: {
                            ...comp.cohorts.p99,
                            poaP25:
                                comp.cohorts.p99.poaP25 ??
                                Math.round((comp.cohorts.p99.intrinsicPaceOfAging - 0.045) * 1000) / 1000,
                            poaP75:
                                comp.cohorts.p99.poaP75 ??
                                Math.round((comp.cohorts.p99.intrinsicPaceOfAging + 0.05) * 1000) / 1000,
                        },
                        p80: {
                            ...comp.cohorts.p80,
                            poaP25:
                                comp.cohorts.p80.poaP25 ??
                                Math.round((comp.cohorts.p80.intrinsicPaceOfAging - 0.047) * 1000) / 1000,
                            poaP75:
                                comp.cohorts.p80.poaP75 ??
                                Math.round((comp.cohorts.p80.intrinsicPaceOfAging + 0.053) * 1000) / 1000,
                        },
                    },
                    kpiVelocityEngine: engine?.metrics
                        ? {
                              weightedAvgVelocityPct: engine.weightedAvgVelocityPct,
                              normalizedAccelerationVector: engine.normalizedAccelerationVector,
                              totalWeightedVelocity: engine.totalWeightedVelocity,
                              totalWeight: engine.totalWeight,
                              metrics: engine.metrics,
                          }
                        : prev.kpiVelocityEngine,
                    latestPulse: pulse
                        ? {
                              weekOf: pulse.weekOf || prev.latestPulse.weekOf,
                              issueLabel: pulse.issueLabel || prev.latestPulse.issueLabel,
                              newsletterTitle: pulse.newsletterTitle || prev.latestPulse.newsletterTitle,
                              newsletterUrl: pulse.newsletterUrl || prev.latestPulse.newsletterUrl,
                              predictionMarketsSummary:
                                  pulse.predictionMarketsSummary ||
                                  prev.latestPulse.predictionMarketsSummary,
                              expertConsensusSummary:
                                  pulse.expertConsensusSummary || prev.latestPulse.expertConsensusSummary,
                              breakthroughsSummary:
                                  pulse.breakthroughsSummary || prev.latestPulse.breakthroughsSummary,
                              netWeeklyDelta: {
                                  days99thLevShift:
                                      pulse.netWeeklyDelta?.days99thLevShift ??
                                      prev.latestPulse.netWeeklyDelta.days99thLevShift,
                                  days80thLevShift:
                                      pulse.netWeeklyDelta?.days80thLevShift ??
                                      prev.latestPulse.netWeeklyDelta.days80thLevShift,
                                  poa99thShift:
                                      pulse.netWeeklyDelta?.poa99thShift ??
                                      prev.latestPulse.netWeeklyDelta.poa99thShift,
                                  poa80thShift:
                                      pulse.netWeeklyDelta?.poa80thShift ??
                                      prev.latestPulse.netWeeklyDelta.poa80thShift,
                              },
                          }
                        : prev.latestPulse,
                }));
            }
        } catch {
            // Keep calibrated local snapshot if remote endpoint is unreachable
        }
    }, []);

    useEffect(() => {
        fetchLivePulse(age);
    }, [age, fetchLivePulse]);

    const days99Shift = data.latestPulse.netWeeklyDelta.days99thLevShift;
    const days80Shift = data.latestPulse.netWeeklyDelta.days80thLevShift;
    const poa99Shift = data.latestPulse.netWeeklyDelta.poa99thShift;

    // Instant deterministic calculation for decades 30, 40, 50, 60, 70
    const displayedBioAge99 = Number(
        (age * 0.92 + data.cohorts.p99.yearsToLev * data.cohorts.p99.netEffectivePaceOfAging).toFixed(1)
    );
    const displayedBioAge80 = Number(
        (age * 0.95 + data.cohorts.p80.yearsToLev * data.cohorts.p80.netEffectivePaceOfAging).toFixed(1)
    );

    const activePoaCohort = poaCohortToggle === 'p99' ? data.cohorts.p99 : data.cohorts.p80;
    const activePoaP25 = (
        activePoaCohort.poaP25 ?? activePoaCohort.intrinsicPaceOfAging - 0.045
    ).toFixed(3);
    const activePoaP50 = activePoaCohort.intrinsicPaceOfAging.toFixed(3);
    const activePoaP75 = (
        activePoaCohort.poaP75 ?? activePoaCohort.intrinsicPaceOfAging + 0.05
    ).toFixed(3);

    return (
        <div
            className={
                embeddedInIntro
                    ? 'space-y-2'
                    : `rounded-2xl border p-4 shadow-lg transition-colors space-y-2.5 ${
                          isLightMode
                              ? 'border-emerald-200 bg-white text-slate-900'
                              : 'border-emerald-500/25 bg-[#0B1220] text-slate-100'
                      }`
            }
        >
            {/* Ultra-Compact 3-Card KPI Strip (Collapsed Default State: Headline Label + Value Only, No Subtext) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* Card 1: Estimated LEV Date (Optimal Protocol) */}
                <div
                    onClick={() => !hideExpandControls && setShowPulseDigest((v) => !v)}
                    className={`rounded-xl border px-3.5 py-2.5 flex flex-col justify-between transition-colors ${
                        !hideExpandControls ? 'cursor-pointer' : ''
                    } ${
                        isLightMode
                            ? 'border-emerald-200 bg-white hover:border-emerald-300 shadow-2xs'
                            : 'border-emerald-500/30 bg-slate-950/75 hover:border-emerald-400/50'
                    }`}
                >
                    <div className="flex items-center justify-between gap-1.5">
                        <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                isLightMode ? 'text-emerald-700' : 'text-emerald-400'
                            }`}
                        >
                            Estimated LEV Date • Optimal
                        </span>
                        <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border shrink-0 ${
                                isLightMode
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            }`}
                        >
                            Top 1%
                        </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mt-1">
                        <span
                            className={`text-lg sm:text-xl font-black tracking-tight ${
                                isLightMode ? 'text-slate-900' : 'text-white'
                            }`}
                        >
                            {data.aggregate99thFormatted}
                        </span>
                        <span
                            className={`text-[10px] font-mono font-semibold shrink-0 ${
                                isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                            }`}
                        >
                            {Math.abs(days99Shift)}d closer this wk
                        </span>
                    </div>
                </div>

                {/* Card 2: Estimated LEV Date (Active Health) */}
                <div
                    onClick={() => !hideExpandControls && setShowPulseDigest((v) => !v)}
                    className={`rounded-xl border px-3.5 py-2.5 flex flex-col justify-between transition-colors ${
                        !hideExpandControls ? 'cursor-pointer' : ''
                    } ${
                        isLightMode
                            ? 'border-cyan-200 bg-white hover:border-cyan-300 shadow-2xs'
                            : 'border-cyan-500/30 bg-slate-950/75 hover:border-cyan-400/50'
                    }`}
                >
                    <div className="flex items-center justify-between gap-1.5">
                        <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                isLightMode ? 'text-cyan-700' : 'text-cyan-400'
                            }`}
                        >
                            Estimated LEV Date • Active
                        </span>
                        <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border shrink-0 ${
                                isLightMode
                                    ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                                    : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                            }`}
                        >
                            Top 20%
                        </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mt-1">
                        <span
                            className={`text-lg sm:text-xl font-black tracking-tight ${
                                isLightMode ? 'text-slate-900' : 'text-white'
                            }`}
                        >
                            {data.aggregate80thFormatted}
                        </span>
                        <span
                            className={`text-[10px] font-mono font-semibold shrink-0 ${
                                isLightMode ? 'text-cyan-700' : 'text-cyan-300'
                            }`}
                        >
                            {Math.abs(days80Shift)}d closer this wk
                        </span>
                    </div>
                </div>

                {/* Card 3: Current Pace of Aging */}
                <div
                    onClick={() => !hideExpandControls && setShowPulseDigest((v) => !v)}
                    className={`rounded-xl border px-3.5 py-2.5 flex flex-col justify-between transition-colors ${
                        !hideExpandControls ? 'cursor-pointer' : ''
                    } ${
                        isLightMode
                            ? 'border-purple-200 bg-white hover:border-purple-300 shadow-2xs'
                            : 'border-purple-500/30 bg-slate-950/75 hover:border-purple-400/50'
                    }`}
                >
                    <div className="flex items-center justify-between gap-1.5">
                        <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                isLightMode ? 'text-purple-700' : 'text-purple-300'
                            }`}
                        >
                            Current Pace of Aging
                        </span>
                        <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border shrink-0 ${
                                isLightMode
                                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                                    : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                            }`}
                        >
                            {poa99Shift} yr/yr this wk
                        </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mt-1">
                        <div className="flex items-baseline gap-1.5">
                            <span
                                className={`text-lg sm:text-xl font-black tracking-tight font-mono ${
                                    isLightMode ? 'text-slate-900' : 'text-white'
                                }`}
                            >
                                {data.cohorts.p99.intrinsicPaceOfAging.toFixed(2)}
                            </span>
                            <span
                                className={`text-[11px] font-mono ${
                                    isLightMode ? 'text-slate-600' : 'text-slate-400'
                                }`}
                            >
                                Optimal vs{' '}
                                <strong className={isLightMode ? 'text-cyan-700' : 'text-cyan-300'}>
                                    {data.cohorts.p80.intrinsicPaceOfAging.toFixed(2)}
                                </strong>{' '}
                                Active
                            </span>
                        </div>
                        <span
                            className={`text-[10px] font-mono font-semibold shrink-0 ${
                                isLightMode ? 'text-purple-700' : 'text-purple-300'
                            }`}
                        >
                            +{data.cohorts.p99.daysGainedPerYear}d/yr
                        </span>
                    </div>
                </div>
            </div>

            {/* Slim Expandable Controls Strip (Hidden in Simple Email View) */}
            {!hideExpandControls && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowPulseDigest((v) => !v)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                                showPulseDigest
                                    ? isLightMode
                                        ? 'bg-emerald-600 text-white border-emerald-700'
                                        : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40'
                                    : isLightMode
                                      ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-white/10'
                            }`}
                        >
                            <Sparkles
                                className={`w-3 h-3 ${
                                    showPulseDigest && isLightMode
                                        ? 'text-white'
                                        : isLightMode
                                          ? 'text-emerald-600'
                                          : 'text-emerald-400'
                                }`}
                            />
                            <span>
                                {showPulseDigest
                                    ? 'Hide Probability Curves (P25/P50/P75) & Shift Details'
                                    : 'View P25/P50/P75 Probability Curves, Explanations & Age Calculator'}
                            </span>
                            {showPulseDigest ? (
                                <ChevronUp className="w-3 h-3" />
                            ) : (
                                <ChevronDown className="w-3 h-3" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowVelocityMatrix((v) => !v)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                                showVelocityMatrix
                                    ? isLightMode
                                        ? 'bg-purple-600 text-white border-purple-700'
                                        : 'bg-purple-500/25 text-purple-200 border-purple-400/50'
                                    : isLightMode
                                      ? 'bg-white hover:bg-slate-100 text-purple-800 border-purple-200'
                                      : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
                            }`}
                        >
                            <Gauge className="w-3 h-3" />
                            <span>
                                Science Velocity: {data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}%/yr (
                                {data.kpiVelocityEngine.normalizedAccelerationVector.toFixed(2)}v) •{' '}
                                <span className="underline">
                                    {showVelocityMatrix ? 'Hide 14 KPIs' : 'View 14 KPIs'}
                                </span>
                            </span>
                            {showVelocityMatrix ? (
                                <ChevronUp className="w-3 h-3" />
                            ) : (
                                <ChevronDown className="w-3 h-3" />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* EXPANDED SECTION 1: Verbalized Shift Note + P25/P50/P75 Probability Curves + Cohort Definitions + Age Calculator + Market Digest */}
            {!hideExpandControls && showPulseDigest && (
                <div
                    className={`rounded-xl border p-3.5 space-y-3.5 ${
                        isLightMode
                            ? 'bg-white border-slate-200 shadow-xs'
                            : 'bg-slate-950/90 border-white/10'
                    }`}
                >
                    {/* Verbalized Weekly Shift Note (Only shown when expanded) */}
                    {issue?.levStateOfPlayExpandedNote && (
                        <p
                            className={`text-xs sm:text-sm leading-relaxed ${
                                isLightMode ? 'text-slate-700' : 'text-slate-300'
                            }`}
                        >
                            {issue.levStateOfPlayExpandedNote}
                        </p>
                    )}

                    {/* 3-Card Bayesian Probability Distribution (P25 / P50 Median / P75) & Cohort Explanations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Expanded Card 1: Top 1% Optimal Protocol Probability Curve */}
                        <div
                            className={`rounded-xl border p-3 flex flex-col justify-between ${
                                isLightMode
                                    ? 'bg-emerald-50/40 border-emerald-200'
                                    : 'bg-slate-900/80 border-emerald-500/30'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-1.5">
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-wider ${
                                            isLightMode ? 'text-emerald-800' : 'text-emerald-300'
                                        }`}
                                    >
                                        Optimal Protocol (Top 1%)
                                    </span>
                                    <span
                                        className={`text-[10px] font-mono font-bold ${
                                            isLightMode ? 'text-emerald-700' : 'text-emerald-400'
                                        }`}
                                    >
                                        ~{data.cohorts.p99.yearsToLev.toFixed(1)} yrs away
                                    </span>
                                </div>
                                <p
                                    className={`text-xs mt-1 leading-relaxed ${
                                        isLightMode ? 'text-slate-600' : 'text-slate-300'
                                    }`}
                                >
                                    For adults following a comprehensive biomarker-guided protocol &amp; early clinical therapeutics.
                                </p>
                            </div>

                            <ProbabilityDistributionCurve
                                idSuffix="opt-p99"
                                p25Label={data.cone99th.p25Formatted}
                                p50Label={data.cone99th.p50Formatted}
                                p75Label={data.cone99th.p75Formatted}
                                tailRangeLabel={`80% CI (P10–P90): ${data.cone99th.p10Formatted} – ${data.cone99th.p90Formatted}`}
                                accentColor="#10b981"
                                isLightMode={isLightMode}
                            />
                        </div>

                        {/* Expanded Card 2: Top 20% Active Health Probability Curve */}
                        <div
                            className={`rounded-xl border p-3 flex flex-col justify-between ${
                                isLightMode
                                    ? 'bg-cyan-50/40 border-cyan-200'
                                    : 'bg-slate-900/80 border-cyan-500/30'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-1.5">
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-wider ${
                                            isLightMode ? 'text-cyan-800' : 'text-cyan-300'
                                        }`}
                                    >
                                        Active Health (Top 20%)
                                    </span>
                                    <span
                                        className={`text-[10px] font-mono font-bold ${
                                            isLightMode ? 'text-cyan-700' : 'text-cyan-400'
                                        }`}
                                    >
                                        ~{data.cohorts.p80.yearsToLev.toFixed(1)} yrs away
                                    </span>
                                </div>
                                <p
                                    className={`text-xs mt-1 leading-relaxed ${
                                        isLightMode ? 'text-slate-600' : 'text-slate-300'
                                    }`}
                                >
                                    For health-conscious adults practicing regular Zone 2/HIIT, circadian fasting &amp; core preventive care.
                                </p>
                            </div>

                            <ProbabilityDistributionCurve
                                idSuffix="act-p80"
                                p25Label={data.cone80th.p25Formatted}
                                p50Label={data.cone80th.p50Formatted}
                                p75Label={data.cone80th.p75Formatted}
                                tailRangeLabel={`80% CI (P10–P90): ${data.cone80th.p10Formatted} – ${data.cone80th.p90Formatted}`}
                                accentColor="#06b6d4"
                                isLightMode={isLightMode}
                            />
                        </div>

                        {/* Expanded Card 3: Pace of Aging Probability Distribution with Top 1% / Top 20% Toggle */}
                        <div
                            className={`rounded-xl border p-3 flex flex-col justify-between ${
                                isLightMode
                                    ? 'bg-purple-50/40 border-purple-200'
                                    : 'bg-slate-900/80 border-purple-500/30'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-1.5">
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-wider ${
                                            isLightMode ? 'text-purple-800' : 'text-purple-300'
                                        }`}
                                    >
                                        Pace of Aging Distribution
                                    </span>
                                    <div
                                        className={`inline-flex items-center rounded-md border p-0.5 font-mono text-[9px] ${
                                            isLightMode
                                                ? 'bg-white border-slate-200'
                                                : 'bg-slate-950 border-white/10'
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setPoaCohortToggle('p99')}
                                            className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                                                poaCohortToggle === 'p99'
                                                    ? 'bg-purple-600 text-white font-bold'
                                                    : isLightMode
                                                      ? 'text-slate-600 hover:text-slate-900'
                                                      : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            Top 1%
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPoaCohortToggle('p80')}
                                            className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                                                poaCohortToggle === 'p80'
                                                    ? 'bg-cyan-600 text-white font-bold'
                                                    : isLightMode
                                                      ? 'text-slate-600 hover:text-slate-900'
                                                      : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            Top 20%
                                        </button>
                                    </div>
                                </div>
                                <p
                                    className={`text-xs mt-1 leading-relaxed ${
                                        isLightMode ? 'text-slate-600' : 'text-slate-300'
                                    }`}
                                >
                                    Biological years aged per calendar year (1.00 = population avg •{' '}
                                    {activePoaCohort.bioMonthsPerYear} bio-mo/yr).
                                </p>
                            </div>

                            <ProbabilityDistributionCurve
                                idSuffix={`poa-${poaCohortToggle}`}
                                p25Label={activePoaP25}
                                p50Label={activePoaP50}
                                p75Label={activePoaP75}
                                tailRangeLabel={
                                    poaCohortToggle === 'p99'
                                        ? `Top 1% Optimal • +${data.cohorts.p99.daysGainedPerYear}d healthy runway/yr`
                                        : `Top 20% Active • +${data.cohorts.p80.daysGainedPerYear}d healthy runway/yr`
                                }
                                accentColor={poaCohortToggle === 'p99' ? '#a855f7' : '#06b6d4'}
                                isLightMode={isLightMode}
                            />
                        </div>
                    </div>

                    {/* Subtle Decade Age Selector (30 to 70) + Bio-Age at LEV Readout */}
                    <div
                        className={`flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs ${
                            isLightMode
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-slate-900/90 border-slate-800'
                        }`}
                    >
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span
                                className={`text-[11px] font-semibold ${
                                    isLightMode ? 'text-slate-600' : 'text-slate-400'
                                }`}
                            >
                                Your Current Age:
                            </span>
                            {DECADE_AGES.map((a) => (
                                <button
                                    key={a}
                                    type="button"
                                    onClick={() => setAge(a)}
                                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                                        age === a
                                            ? isLightMode
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                                            : isLightMode
                                              ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70'
                                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                            <span>
                                <span className={isLightMode ? 'text-slate-500' : 'text-slate-400'}>
                                    Bio-Age at LEV (Optimal):{' '}
                                </span>
                                <strong className={isLightMode ? 'text-emerald-700' : 'text-emerald-300'}>
                                    ~{displayedBioAge99} yrs
                                </strong>
                            </span>
                            <span>
                                <span className={isLightMode ? 'text-slate-500' : 'text-slate-400'}>
                                    Bio-Age at LEV (Active):{' '}
                                </span>
                                <strong className={isLightMode ? 'text-cyan-700' : 'text-cyan-300'}>
                                    ~{displayedBioAge80} yrs
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* 3-Card Digest */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        <div
                            className={`rounded-lg border p-3 ${
                                isLightMode
                                    ? 'bg-slate-50/70 border-slate-200'
                                    : 'bg-slate-900/70 border-slate-800/90'
                            }`}
                        >
                            <div
                                className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                                    isLightMode ? 'text-emerald-700' : 'text-emerald-400'
                                }`}
                            >
                                <Compass className="w-3 h-3" /> Prediction Markets (40%)
                            </div>
                            <p
                                className={`text-xs leading-relaxed ${
                                    isLightMode ? 'text-slate-700' : 'text-slate-300'
                                }`}
                            >
                                {data.latestPulse.predictionMarketsSummary}
                            </p>
                        </div>
                        <div
                            className={`rounded-lg border p-3 ${
                                isLightMode
                                    ? 'bg-slate-50/70 border-slate-200'
                                    : 'bg-slate-900/70 border-slate-800/90'
                            }`}
                        >
                            <div
                                className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                                    isLightMode ? 'text-cyan-700' : 'text-cyan-400'
                                }`}
                            >
                                <Zap className="w-3 h-3" /> Expert Consensus (35%)
                            </div>
                            <p
                                className={`text-xs leading-relaxed ${
                                    isLightMode ? 'text-slate-700' : 'text-slate-300'
                                }`}
                            >
                                {data.latestPulse.expertConsensusSummary}
                            </p>
                        </div>
                        <div
                            className={`rounded-lg border p-3 ${
                                isLightMode
                                    ? 'bg-slate-50/70 border-slate-200'
                                    : 'bg-slate-900/70 border-slate-800/90'
                            }`}
                        >
                            <div
                                className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                                    isLightMode ? 'text-purple-700' : 'text-purple-400'
                                }`}
                            >
                                <Activity className="w-3 h-3" /> Weekly Breakthroughs (25%)
                            </div>
                            <p
                                className={`text-xs leading-relaxed ${
                                    isLightMode ? 'text-slate-700' : 'text-slate-300'
                                }`}
                            >
                                {data.latestPulse.breakthroughsSummary}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* EXPANDED SECTION 2: 14-KPI Science Velocity Breakdown Table */}
            {!hideExpandControls && showVelocityMatrix && (
                <div
                    className={`rounded-xl border p-3.5 ${
                        isLightMode
                            ? 'bg-white border-slate-200 shadow-xs'
                            : 'bg-slate-950/90 border-slate-800'
                    }`}
                >
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b ${
                            isLightMode ? 'border-slate-200' : 'border-slate-800'
                        }`}
                    >
                        <div>
                            <div
                                className={`text-xs font-bold uppercase tracking-wider ${
                                    isLightMode ? 'text-purple-700' : 'text-purple-300'
                                }`}
                            >
                                14-Metric Longevity Science Velocity Breakdown (V × W)
                            </div>
                            <p className={`text-[11px] ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                                Weighted annualized progress across cellular reprogramming, clinical trials, epigenetic clocks, senolytics, and multi-omics.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs">
                            <span
                                className={`px-2 py-0.5 rounded border font-bold ${
                                    isLightMode
                                        ? 'bg-purple-50 border-purple-200 text-purple-800'
                                        : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                                }`}
                            >
                                Avg: {data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}%/yr
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded border font-bold ${
                                    isLightMode
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                                }`}
                            >
                                Vector: {data.kpiVelocityEngine.normalizedAccelerationVector.toFixed(2)}v
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr
                                    className={`border-b text-[10px] font-mono uppercase ${
                                        isLightMode
                                            ? 'border-slate-200 text-slate-500'
                                            : 'border-slate-800 text-slate-400'
                                    }`}
                                >
                                    <th className="py-1.5 pr-3">Longevity KPI Metric</th>
                                    <th className="py-1.5 px-3">Current Benchmark</th>
                                    <th className="py-1.5 px-3 text-right">Vel (V)</th>
                                    <th className="py-1.5 px-3 text-right">Weight (W)</th>
                                    <th className="py-1.5 pl-3 text-right">V × W</th>
                                </tr>
                            </thead>
                            <tbody
                                className={`divide-y font-mono ${
                                    isLightMode ? 'divide-slate-200/80' : 'divide-slate-800/60'
                                }`}
                            >
                                {data.kpiVelocityEngine.metrics.map((m) => (
                                    <tr
                                        key={m.id}
                                        className={
                                            isLightMode ? 'hover:bg-slate-50' : 'hover:bg-slate-900/50'
                                        }
                                    >
                                        <td
                                            className={`py-1.5 pr-3 font-sans font-medium ${
                                                isLightMode ? 'text-slate-900' : 'text-slate-200'
                                            }`}
                                        >
                                            <div>{m.name}</div>
                                            <div
                                                className={`text-[10px] ${
                                                    isLightMode ? 'text-slate-500' : 'text-slate-500'
                                                }`}
                                            >
                                                {m.trendMagnitude}
                                            </div>
                                        </td>
                                        <td
                                            className={`py-1.5 px-3 ${
                                                isLightMode ? 'text-cyan-700 font-semibold' : 'text-cyan-300'
                                            }`}
                                        >
                                            {m.displayValue}
                                        </td>
                                        <td
                                            className={`py-1.5 px-3 text-right ${
                                                isLightMode ? 'text-slate-700' : 'text-slate-300'
                                            }`}
                                        >
                                            {m.annualVelocityPct.toFixed(1)}%
                                        </td>
                                        <td
                                            className={`py-1.5 px-3 text-right ${
                                                isLightMode ? 'text-slate-500' : 'text-slate-400'
                                            }`}
                                        >
                                            {m.indexWeight.toFixed(2)}
                                        </td>
                                        <td
                                            className={`py-1.5 pl-3 text-right font-bold ${
                                                isLightMode ? 'text-purple-700' : 'text-purple-300'
                                            }`}
                                        >
                                            {m.weightedContribution.toFixed(1)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
