'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    Activity,
    ChevronDown,
    ChevronUp,
    Clock,
    Compass,
    Gauge,
    Sparkles,
    TrendingDown,
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

interface LiveFutureGraphData {
    aggregate99thFormatted: string;
    aggregate80thFormatted: string;
    marketAggregate99thYear: number;
    expertAggregate99thYear: number;
    trajectoryIntercept99thYear: number;
    cone99th: {
        p10Formatted: string;
        p50Formatted: string;
        p90Formatted: string;
    };
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
        p50Formatted: 'Oct 2036',
        p90Formatted: 'May 2045',
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

interface FutureGraphLevPulseWidgetProps {
    issue?: OutpaceAgingIssue;
    compact?: boolean;
    showPublisherSync?: boolean;
    isLightMode?: boolean;
}

const DECADE_AGES = [30, 40, 50, 60, 70] as const;

export default function FutureGraphLevPulseWidget({
    compact = false,
    isLightMode = false,
}: FutureGraphLevPulseWidgetProps) {
    const [age, setAge] = useState<number>(30);
    const [data, setData] = useState<LiveFutureGraphData>(FALLBACK_BASELINE);
    const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPulseDigest, setShowPulseDigest] = useState<boolean>(!compact);
    const [showVelocityMatrix, setShowVelocityMatrix] = useState<boolean>(false);

    const fetchLivePulse = useCallback(async (targetAge: number) => {
        setIsLoading(true);
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
                        p50Formatted: comp.cone99th?.p50Formatted || prev.cone99th.p50Formatted,
                        p90Formatted: comp.cone99th?.p90Formatted || prev.cone99th.p90Formatted,
                    },
                    cohorts: {
                        p99: comp.cohorts.p99,
                        p80: comp.cohorts.p80,
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
                setIsLiveConnected(true);
            }
        } catch {
            setIsLiveConnected(false);
        } finally {
            setIsLoading(false);
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

    return (
        <section
            className={`rounded-2xl border p-5 sm:p-6 shadow-xl relative overflow-hidden transition-colors ${
                isLightMode
                    ? 'border-emerald-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 text-slate-900'
                    : 'border-emerald-500/25 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1528] text-slate-100'
            }`}
        >
            {!isLightMode && (
                <>
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                </>
            )}

            {/* Top Header & Clickable Velocity Badge */}
            <div
                className={`relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
                    isLightMode ? 'border-slate-200' : 'border-slate-800/80'
                }`}
            >
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                isLightMode
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            }`}
                        >
                            <TrendingDown className="w-3 h-3" />
                            {days99Shift < 0
                                ? `Optimal LEV Pulled ${Math.abs(days99Shift)} Days Closer This Week`
                                : `Weekly Shift: +${days99Shift} Days`}
                        </span>

                        {/* Clickable Velocity Pill */}
                        <button
                            type="button"
                            onClick={() => setShowVelocityMatrix((v) => !v)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                                showVelocityMatrix
                                    ? isLightMode
                                        ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                                        : 'bg-purple-500 text-white border-purple-400 shadow-sm'
                                    : isLightMode
                                      ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-300'
                                      : 'bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border-purple-500/35'
                            }`}
                            title="Click to inspect the 14 Longevity Velocity KPIs"
                        >
                            <Gauge className="w-3 h-3" />
                            <span>
                                Science Velocity: {data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}%/yr (
                                {data.kpiVelocityEngine.normalizedAccelerationVector.toFixed(2)}v)
                            </span>
                            <span className="underline ml-0.5">
                                {showVelocityMatrix ? 'Hide KPIs' : 'View 14 KPIs'}
                            </span>
                            {showVelocityMatrix ? (
                                <ChevronUp className="w-3 h-3" />
                            ) : (
                                <ChevronDown className="w-3 h-3" />
                            )}
                        </button>
                    </div>

                    <h3
                        className={`text-base sm:text-lg font-extrabold tracking-tight ${
                            isLightMode ? 'text-slate-900' : 'text-white'
                        }`}
                    >
                        Longevity Escape Velocity (LEV) & Pace of Aging Forecast
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        When medical rejuvenation advances faster than biological aging (&gt;1 year of life expectancy gained per calendar year).
                    </p>
                </div>
            </div>

            {/* 3 Simple, Obvious Headline Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Card 1: Estimated LEV Date (Optimal Protocol) */}
                <div
                    className={`rounded-xl border p-4 flex flex-col justify-between ${
                        isLightMode
                            ? 'border-emerald-300 bg-white shadow-sm'
                            : 'border-emerald-500/30 bg-slate-900/75'
                    }`}
                >
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <span
                                className={`text-xs font-extrabold uppercase tracking-wide ${
                                    isLightMode ? 'text-emerald-700' : 'text-emerald-400'
                                }`}
                            >
                                Estimated LEV Date • Optimal Protocol
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border shrink-0 ${
                                    isLightMode
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                }`}
                            >
                                Top 1%
                            </span>
                        </div>
                        <div
                            className={`text-2xl sm:text-3xl font-black tracking-tight mt-2 ${
                                isLightMode ? 'text-slate-900' : 'text-white'
                            }`}
                        >
                            {data.aggregate99thFormatted}
                        </div>
                        <div
                            className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold ${
                                isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                            }`}
                        >
                            <span>Pulled {Math.abs(days99Shift)} days closer this week</span>
                        </div>
                        <p
                            className={`text-xs mt-1.5 leading-relaxed ${
                                isLightMode ? 'text-slate-600' : 'text-slate-400'
                            }`}
                        >
                            For adults following a comprehensive biomarker-guided longevity protocol and early clinical therapeutics.
                        </p>
                    </div>
                    <div
                        className={`mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs ${
                            isLightMode ? 'border-slate-200' : 'border-slate-800/80'
                        }`}
                    >
                        <div>
                            <div className={`text-[10px] uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                Years Until LEV
                            </div>
                            <div
                                className={`font-mono font-bold ${
                                    isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                                }`}
                            >
                                {data.cohorts.p99.yearsToLev.toFixed(1)} yrs
                            </div>
                        </div>
                        <div>
                            <div className={`text-[10px] uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                Bio-Age at LEV (Age {age})
                            </div>
                            <div
                                className={`font-mono font-bold ${
                                    isLightMode ? 'text-slate-900' : 'text-slate-200'
                                }`}
                            >
                                ~{displayedBioAge99} yrs
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Estimated LEV Date (Active Health) */}
                <div
                    className={`rounded-xl border p-4 flex flex-col justify-between ${
                        isLightMode
                            ? 'border-cyan-300 bg-white shadow-sm'
                            : 'border-cyan-500/30 bg-slate-900/75'
                    }`}
                >
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <span
                                className={`text-xs font-extrabold uppercase tracking-wide ${
                                    isLightMode ? 'text-cyan-700' : 'text-cyan-400'
                                }`}
                            >
                                Estimated LEV Date • Active Health
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border shrink-0 ${
                                    isLightMode
                                        ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                                        : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                }`}
                            >
                                Top 20%
                            </span>
                        </div>
                        <div
                            className={`text-2xl sm:text-3xl font-black tracking-tight mt-2 ${
                                isLightMode ? 'text-slate-900' : 'text-white'
                            }`}
                        >
                            {data.aggregate80thFormatted}
                        </div>
                        <div
                            className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold ${
                                isLightMode ? 'text-cyan-700' : 'text-cyan-300'
                            }`}
                        >
                            <span>Pulled {Math.abs(days80Shift)} days closer this week</span>
                        </div>
                        <p
                            className={`text-xs mt-1.5 leading-relaxed ${
                                isLightMode ? 'text-slate-600' : 'text-slate-400'
                            }`}
                        >
                            For health-conscious adults practicing regular Zone 2/HIIT exercise, circadian fasting, and core preventive care.
                        </p>
                    </div>
                    <div
                        className={`mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs ${
                            isLightMode ? 'border-slate-200' : 'border-slate-800/80'
                        }`}
                    >
                        <div>
                            <div className={`text-[10px] uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                Years Until LEV
                            </div>
                            <div
                                className={`font-mono font-bold ${
                                    isLightMode ? 'text-cyan-700' : 'text-cyan-300'
                                }`}
                            >
                                {data.cohorts.p80.yearsToLev.toFixed(1)} yrs
                            </div>
                        </div>
                        <div>
                            <div className={`text-[10px] uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                Bio-Age at LEV (Age {age})
                            </div>
                            <div
                                className={`font-mono font-bold ${
                                    isLightMode ? 'text-slate-900' : 'text-slate-200'
                                }`}
                            >
                                ~{displayedBioAge80} yrs
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Current Pace of Aging */}
                <div
                    className={`rounded-xl border p-4 flex flex-col justify-between ${
                        isLightMode
                            ? 'border-purple-300 bg-white shadow-sm'
                            : 'border-purple-500/30 bg-slate-900/75'
                    }`}
                >
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <span
                                className={`text-xs font-extrabold uppercase tracking-wide ${
                                    isLightMode ? 'text-purple-700' : 'text-purple-300'
                                }`}
                            >
                                Current Pace of Aging
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border shrink-0 ${
                                    isLightMode
                                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                                        : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                }`}
                            >
                                {poa99Shift} yr/yr this wk
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2.5 mt-2 flex-wrap">
                            <span
                                className={`text-2xl sm:text-3xl font-black tracking-tight font-mono ${
                                    isLightMode ? 'text-slate-900' : 'text-white'
                                }`}
                            >
                                {data.cohorts.p99.intrinsicPaceOfAging.toFixed(2)}
                            </span>
                            <span
                                className={`text-xs font-mono ${
                                    isLightMode ? 'text-slate-600' : 'text-slate-400'
                                }`}
                            >
                                Optimal vs{' '}
                                <strong className={isLightMode ? 'text-cyan-700' : 'text-cyan-300'}>
                                    {data.cohorts.p80.intrinsicPaceOfAging.toFixed(2)}
                                </strong>{' '}
                                Active yrs/yr
                            </span>
                        </div>
                        <div
                            className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold ${
                                isLightMode ? 'text-purple-700' : 'text-purple-300'
                            }`}
                        >
                            <span>+{data.cohorts.p99.daysGainedPerYear} healthy days banked per year</span>
                        </div>
                        <p
                            className={`text-xs mt-1.5 leading-relaxed ${
                                isLightMode ? 'text-slate-600' : 'text-slate-400'
                            }`}
                        >
                            Biological years aged per calendar year (1.00 = average aging). Optimal protocol followers age only {data.cohorts.p99.bioMonthsPerYear} bio-months per year.
                        </p>
                    </div>
                    <div
                        className={`mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs ${
                            isLightMode ? 'border-slate-200' : 'border-slate-800/80'
                        }`}
                    >
                        <div>
                            <div className={`text-[10px] uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                Biotech Offset Now
                            </div>
                            <div
                                className={`font-mono font-bold ${
                                    isLightMode ? 'text-purple-700' : 'text-purple-300'
                                }`}
                            >
                                -{data.cohorts.p99.biotechRejuvenationOffset.toFixed(3)} yr/yr
                            </div>
                        </div>
                        <div>
                            <div className={`text-[10px] uppercase ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                Optimal Range (10–90%)
                            </div>
                            <div
                                className={`font-mono font-bold ${
                                    isLightMode ? 'text-slate-900' : 'text-slate-200'
                                }`}
                            >
                                {data.cone99th.p10Formatted} – {data.cone99th.p90Formatted}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Controls: Digest Toggle, 14-KPI Velocity Breakdown Toggle & Subtle Decade Age Selector */}
            <div
                className={`relative z-10 mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 ${
                    isLightMode ? 'border-slate-200' : 'border-slate-800/80'
                }`}
            >
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowPulseDigest((v) => !v)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            isLightMode
                                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                                : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700/80'
                        }`}
                    >
                        <Sparkles className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
                        {showPulseDigest ? 'Hide Weekly Market & Science Digest' : 'Why LEV Shifted This Week'}
                        {showPulseDigest ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowVelocityMatrix((v) => !v)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            showVelocityMatrix
                                ? isLightMode
                                    ? 'bg-purple-600 text-white border-purple-700'
                                    : 'bg-purple-500/25 text-purple-200 border-purple-400/50'
                                : isLightMode
                                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700/80'
                        }`}
                    >
                        <Activity className={`w-3.5 h-3.5 ${showVelocityMatrix && isLightMode ? 'text-white' : isLightMode ? 'text-purple-600' : 'text-purple-400'}`} />
                        {showVelocityMatrix
                            ? 'Hide 14-KPI Science Velocity Details'
                            : `Science Velocity Breakdown (${data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}%/yr)`}
                        {showVelocityMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                </div>

                {/* Subtle Decade Age Selector (30 to 70) */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-1 text-[11px]">
                        <span className={isLightMode ? 'text-slate-500 font-medium mr-1' : 'text-slate-400 font-medium mr-1'}>
                            Your Age:
                        </span>
                        {DECADE_AGES.map((a) => (
                            <button
                                key={a}
                                type="button"
                                onClick={() => setAge(a)}
                                className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                                    age === a
                                        ? isLightMode
                                            ? 'bg-emerald-600 text-white shadow-2xs'
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

                    <span className={`text-[11px] hidden xl:inline-flex items-center gap-1 ${isLightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Clock className="w-3 h-3" />
                        {isLoading ? 'Updating...' : isLiveConnected ? 'Updated Weekly' : 'Weekly Snapshot'}
                    </span>
                </div>
            </div>

            {showPulseDigest && (
                <div className="relative z-10 mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                        className={`rounded-xl border p-3.5 ${
                            isLightMode
                                ? 'bg-white border-slate-200 shadow-2xs'
                                : 'bg-slate-900/60 border-slate-800/90'
                        }`}
                    >
                        <div
                            className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                                isLightMode ? 'text-emerald-700' : 'text-emerald-400'
                            }`}
                        >
                            <Compass className="w-3.5 h-3.5" /> Prediction Markets (40% Weight)
                        </div>
                        <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            {data.latestPulse.predictionMarketsSummary}
                        </p>
                    </div>
                    <div
                        className={`rounded-xl border p-3.5 ${
                            isLightMode
                                ? 'bg-white border-slate-200 shadow-2xs'
                                : 'bg-slate-900/60 border-slate-800/90'
                        }`}
                    >
                        <div
                            className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                                isLightMode ? 'text-cyan-700' : 'text-cyan-400'
                            }`}
                        >
                            <Zap className="w-3.5 h-3.5" /> Expert Consensus (35% Weight)
                        </div>
                        <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            {data.latestPulse.expertConsensusSummary}
                        </p>
                    </div>
                    <div
                        className={`rounded-xl border p-3.5 ${
                            isLightMode
                                ? 'bg-white border-slate-200 shadow-2xs'
                                : 'bg-slate-900/60 border-slate-800/90'
                        }`}
                    >
                        <div
                            className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                                isLightMode ? 'text-purple-700' : 'text-purple-400'
                            }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" /> Weekly Breakthrough Impact (25% Weight)
                        </div>
                        <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                            {data.latestPulse.breakthroughsSummary}
                        </p>
                    </div>
                </div>
            )}

            {showVelocityMatrix && (
                <div
                    className={`relative z-10 mt-3 rounded-xl border p-4 ${
                        isLightMode
                            ? 'bg-white border-slate-200 shadow-sm'
                            : 'bg-slate-950/90 border-slate-800'
                    }`}
                >
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b ${
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
                                className={`px-2.5 py-1 rounded-lg border font-bold ${
                                    isLightMode
                                        ? 'bg-purple-50 border-purple-200 text-purple-800'
                                        : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                                }`}
                            >
                                Weighted Avg: {data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}%/yr
                            </span>
                            <span
                                className={`px-2.5 py-1 rounded-lg border font-bold ${
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
                                    <th className="py-2 pr-3">Longevity KPI Metric</th>
                                    <th className="py-2 px-3">Current Benchmark</th>
                                    <th className="py-2 px-3 text-right">Vel (V)</th>
                                    <th className="py-2 px-3 text-right">Weight (W)</th>
                                    <th className="py-2 pl-3 text-right">V × W</th>
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
                                            className={`py-2 pr-3 font-sans font-medium ${
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
                                            className={`py-2 px-3 ${
                                                isLightMode ? 'text-cyan-700 font-semibold' : 'text-cyan-300'
                                            }`}
                                        >
                                            {m.displayValue}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-right ${
                                                isLightMode ? 'text-slate-700' : 'text-slate-300'
                                            }`}
                                        >
                                            {m.annualVelocityPct.toFixed(1)}%
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-right ${
                                                isLightMode ? 'text-slate-500' : 'text-slate-400'
                                            }`}
                                        >
                                            {m.indexWeight.toFixed(2)}
                                        </td>
                                        <td
                                            className={`py-2 pl-3 text-right font-bold ${
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
        </section>
    );
}
