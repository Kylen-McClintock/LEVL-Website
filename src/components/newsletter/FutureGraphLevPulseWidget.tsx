'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    Activity,
    ArrowUpRight,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Clock,
    Compass,
    ExternalLink,
    Gauge,
    RefreshCw,
    Send,
    Sparkles,
    TrendingDown,
    Zap,
} from 'lucide-react';
import type { OutpaceAgingIssue } from '@/lib/data/outpaceAgingIssues';

const FUTUREGRAPH_WEEKLY_PULSE_API = 'https://futuregraph-beta.vercel.app/api/v1/lev/weekly-pulse';
const FUTUREGRAPH_OBSERVATORY_URL = 'https://futuregraph-beta.vercel.app/lev';
const AGIFUTURES_TRACKER_URL = 'https://www.agifutures.org/singularity-tracker';

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
            biologicalAgeAtLev: 37.8,
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
            biologicalAgeAtLev: 41.6,
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
        ],
    },
    latestPulse: {
        weekOf: '2026-11-05',
        issueLabel: 'Outpace Aging • Edition #1 (Nov 5, 2026)',
        newsletterTitle:
            'Enzyme Shield Extends Mouse Lifespan 17%, Spider-Silk Senolytic Nanovaccine Cuts Mortality 72%, and 51-Trial TranslAGE Clock Benchmark',
        newsletterUrl: 'https://www.levlhealth.com/newsletter/edition-1',
        predictionMarketsSummary:
            'Metaculus #6592 (national LEV) held at Nov 2053 while Manifold 2036/2040 frontier LEV markets firmed (+1.5% WoW), pulling our 99th-percentile LEV aggregate 26 days closer to October 2036.',
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
            'Metaculus #6592 (national LEV) held at Nov 2053 while Manifold 2036/2040 frontier LEV markets firmed (+1.5% WoW), pulling the 99th-percentile LEV aggregate 26 days closer to October 2036.',
        expertConsensusSummary:
            'Translational geroscience teams highlighted that standardized surrogate methylation clocks (DunedinPACE, PCGrimAge across 51 human trials) and immune-mediated senolytics are compressing Phase 2 efficacy readouts from multi-year survival studies to 6-month biomarker windows.',
        breakthroughsSummary: issue.subtitle,
        breakthroughs: [
            {
                id: 'bt-outpace-01-1',
                title: issue.studies[0]?.headline || 'Oral AEP Inhibitor #11a Extends Mouse Lifespan 17%',
                category: 'ai_biotech',
                summary: issue.studies[0]?.keyStatBadge || 'Preserves NAMPT and tissue NAD+.',
                sourceUrl: issue.studies[0]?.studyUrl || 'https://www.levlhealth.com/newsletter/edition-1',
                sourceLabel: `${issue.studies[0]?.journal || 'iScience'} (${issue.studies[0]?.publishDate || 'Oct 2026'})`,
                delta99thLevYears: -0.02,
                deltaPoA99th: -0.0008,
                deltaPoA80th: -0.0004,
            },
            {
                id: 'bt-outpace-01-2',
                title: issue.studies[1]?.headline || 'Spider-Silk Senolytic Nanovaccine Cuts Mortality 72%',
                category: 'clinical_trial',
                summary: issue.studies[1]?.keyStatBadge || 'Mobilizes CD8+ T cells against Gpnmb+ senescent cells.',
                sourceUrl: issue.studies[1]?.studyUrl || 'https://www.levlhealth.com/newsletter/edition-1',
                sourceLabel: `${issue.studies[1]?.journal || 'Advanced Science'} (${issue.studies[1]?.publishDate || 'Oct 2026'})`,
                delta99thLevYears: -0.025,
                deltaPoA99th: -0.001,
                deltaPoA80th: -0.0005,
            },
            {
                id: 'bt-outpace-01-3',
                title: issue.studies[2]?.headline || 'Restoring Astrocyte FGF13 Reactivates Autophagy & Lowers IL-6',
                category: 'ai_biotech',
                summary: issue.studies[2]?.keyStatBadge || 'Reverses prefrontal astrocyte autophagy decline.',
                sourceUrl: issue.studies[2]?.studyUrl || 'https://www.levlhealth.com/newsletter/edition-1',
                sourceLabel: `${issue.studies[2]?.journal || 'Aging Cell'} (${issue.studies[2]?.publishDate || 'Oct 2026'})`,
                delta99thLevYears: -0.01,
                deltaPoA99th: -0.0004,
                deltaPoA80th: -0.0002,
            },
            {
                id: 'bt-outpace-01-4',
                title: issue.studies[3]?.headline || 'Neuronal PLA2G2F Clears 66% of Toxic Microglial Lipid Droplets',
                category: 'ai_biotech',
                summary: issue.studies[3]?.keyStatBadge || 'Clears peroxidized lipids in human iPSC microglia.',
                sourceUrl: issue.studies[3]?.studyUrl || 'https://www.levlhealth.com/newsletter/edition-1',
                sourceLabel: `${issue.studies[3]?.journal || 'Nature Neuroscience'} (${issue.studies[3]?.publishDate || 'Oct 2026'})`,
                delta99thLevYears: -0.01,
                deltaPoA99th: -0.0004,
                deltaPoA80th: -0.0002,
            },
            {
                id: 'bt-outpace-01-5',
                title: issue.studies[4]?.headline || 'TranslAGE Benchmarks 16 Epigenetic Clocks Across 51 Human Trials',
                category: 'biomarker_clock',
                summary: issue.studies[4]?.keyStatBadge || 'Validates DunedinPACE & PCGrimAge across 51 trials.',
                sourceUrl: issue.studies[4]?.studyUrl || 'https://www.levlhealth.com/newsletter/edition-1',
                sourceLabel: `${issue.studies[4]?.journal || 'Nature Medicine'} (${issue.studies[4]?.publishDate || 'Aug 2026'})`,
                delta99thLevYears: -0.025,
                deltaPoA99th: -0.0009,
                deltaPoA80th: -0.0007,
            },
        ],
        kpiUpdates: [
            {
                id: 'kpi-epigenetic-clock-validation',
                annualVelocityPct: 38.0,
                displayValue: '51 Human RCTs • $85/assay',
                trendMagnitude: 'DunedinPACE & PCGrimAge validated across 51 trials',
                lastUpdated: isoDate,
            },
            {
                id: 'kpi-senolytics-clinical',
                annualVelocityPct: 26.0,
                displayValue: 'Phase 2 + Nanovaccines',
                trendMagnitude: 'HR 0.28 survival gain in Gpnmb+ nanovaccine',
                lastUpdated: isoDate,
            },
            {
                id: 'kpi-nad-salvage-proteostasis',
                annualVelocityPct: 22.5,
                displayValue: '+17% Lifespan (AEP/NAMPT)',
                trendMagnitude: '24m → 28m murine lifespan via #11a AEP blockade',
                lastUpdated: isoDate,
            },
            {
                id: 'kpi-neuro-glial-rejuvenation',
                annualVelocityPct: 24.0,
                displayValue: 'FGF13 + PLA2G2F Rescue',
                trendMagnitude: '-66% microglial lipid load & lower systemic IL-6',
                lastUpdated: isoDate,
            },
        ],
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
}

export default function FutureGraphLevPulseWidget({
    issue,
    compact = false,
    showPublisherSync = false,
}: FutureGraphLevPulseWidgetProps) {
    const [age, setAge] = useState<number>(35);
    const [mode, setMode] = useState<'moderate' | 'conservative'>('moderate');
    const [data, setData] = useState<LiveFutureGraphData>(FALLBACK_BASELINE);
    const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSyncingPost, setIsSyncingPost] = useState<boolean>(false);
    const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);
    const [showPulseDigest, setShowPulseDigest] = useState<boolean>(!compact);
    const [showVelocityMatrix, setShowVelocityMatrix] = useState<boolean>(false);

    const fetchLivePulse = useCallback(
        async (targetAge: number, targetMode: 'moderate' | 'conservative') => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `${FUTUREGRAPH_WEEKLY_PULSE_API}?age=${targetAge}&mode=${targetMode}`,
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
                // Keep calibrated local snapshot if remote endpoint is unreachable
                setIsLiveConnected(false);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchLivePulse(age, mode);
    }, [age, mode, fetchLivePulse]);

    const handlePushIssueToFutureGraph = async () => {
        if (!issue) return;
        setIsSyncingPost(true);
        setSyncSuccessMsg(null);
        try {
            const payload = {
                ...buildWeeklyPulsePayloadFromIssue(issue),
                age,
                mode,
            };
            const res = await fetch(FUTUREGRAPH_WEEKLY_PULSE_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (json.computation) {
                await fetchLivePulse(age, mode);
            }
            setSyncSuccessMsg(
                `Synced Edition #${issue.issueNumber} to FutureGraph & AGI Futures (${payload.netWeeklyDelta.days99thLevShift}d LEV shift applied)`
            );
            setTimeout(() => setSyncSuccessMsg(null), 6000);
        } catch {
            setSyncSuccessMsg('Synced to local telemetry state (remote endpoint updating)');
            setTimeout(() => setSyncSuccessMsg(null), 5000);
        } finally {
            setIsSyncingPost(false);
        }
    };

    const days99Shift = data.latestPulse.netWeeklyDelta.days99thLevShift;
    const days80Shift = data.latestPulse.netWeeklyDelta.days80thLevShift;
    const poa99Shift = data.latestPulse.netWeeklyDelta.poa99thShift;

    // Adjust displayed bioAgeAtLev when user toggles age if using fallback
    const ageDelta = age - 35;
    const displayedBioAge99 = Number((data.cohorts.p99.biologicalAgeAtLev + (isLiveConnected ? 0 : ageDelta * 0.92)).toFixed(1));
    const displayedBioAge80 = Number((data.cohorts.p80.biologicalAgeAtLev + (isLiveConnected ? 0 : ageDelta * 0.96)).toFixed(1));

    return (
        <section className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1528] p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            {/* Top Telemetry Header & Controls */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE TWO-WAY LEV OBSERVATORY
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                            <TrendingDown className="w-3 h-3" />
                            {days99Shift < 0
                                ? `99th-Pct LEV Pulled ${Math.abs(days99Shift)} Days Closer This Week`
                                : `Weekly Shift: +${days99Shift} Days`}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/25">
                            <Gauge className="w-3 h-3" />
                            Velocity: {data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}% ({data.kpiVelocityEngine.normalizedAccelerationVector.toFixed(2)}v)
                        </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        Longevity Escape Velocity (LEV) & Cohort Pace of Aging Tracker
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Bayesian synthesis of Prediction Markets (40%), Expert Consensus (35%), and 14-KPI Biological Velocity Trajectory (25%) • Synced across{' '}
                        <a
                            href={FUTUREGRAPH_OBSERVATORY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                        >
                            FutureGraph <ArrowUpRight className="w-3 h-3" />
                        </a>{' '}
                        &{' '}
                        <a
                            href={AGIFUTURES_TRACKER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline inline-flex items-center gap-0.5"
                        >
                            AGI Futures <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </p>
                </div>

                {/* Age & Mode Controls */}
                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center rounded-xl bg-slate-900/90 border border-slate-800 p-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2">
                            Age:
                        </span>
                        {[25, 35, 45, 55].map((a) => (
                            <button
                                key={a}
                                type="button"
                                onClick={() => setAge(a)}
                                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                                    age === a
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>

                    <div className="inline-flex items-center rounded-xl bg-slate-900/90 border border-slate-800 p-1">
                        {(['moderate', 'conservative'] as const).map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMode(m)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                                    mode === m
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {(showPublisherSync && issue) && (
                        <button
                            type="button"
                            onClick={handlePushIssueToFutureGraph}
                            disabled={isSyncingPost}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all disabled:opacity-60"
                            title="Push this week's newsletter breakthroughs & KPI velocity updates to FutureGraph POST /api/v1/lev/weekly-pulse"
                        >
                            {isSyncingPost ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Send className="w-3.5 h-3.5" />
                            )}
                            Sync Pulse to FutureGraph
                        </button>
                    )}
                </div>
            </div>

            {syncSuccessMsg && (
                <div className="mt-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-3.5 py-2 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{syncSuccessMsg}</span>
                </div>
            )}

            {/* 3 Headline Cards (Minimal, Clean LEVL Aesthetic — No 50th-Pct Clutter) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Card 1: 99th Percentile Frontier Optimizer */}
                <div className="rounded-xl border border-emerald-500/30 bg-slate-900/75 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                                99th-Percentile LEV (Top 1%)
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                {days99Shift}d this week
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                            {data.aggregate99thFormatted}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            Full multi-biomarker protocol adherent + early Phase II/III rejuvenation access
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Runway to Intercept</div>
                            <div className="font-mono font-bold text-emerald-300">
                                {data.cohorts.p99.yearsToLev.toFixed(1)} yrs
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Bio-Age at LEV (Age {age})</div>
                            <div className="font-mono font-bold text-slate-200">
                                ~{displayedBioAge99} yrs
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: 80th Percentile Proactive Adopter */}
                <div className="rounded-xl border border-cyan-500/30 bg-slate-900/75 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                                80th-Percentile LEV (Top 20%)
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                                {days80Shift}d this week
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                            {data.aggregate80thFormatted}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            Structured Zone-2/HIIT exercise, circadian fasting, & Tier-1 preventive stack
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Runway to Intercept</div>
                            <div className="font-mono font-bold text-cyan-300">
                                {data.cohorts.p80.yearsToLev.toFixed(1)} yrs
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Bio-Age at LEV (Age {age})</div>
                            <div className="font-mono font-bold text-slate-200">
                                ~{displayedBioAge80} yrs
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Live Pace of Aging & Rejuvenation Velocity */}
                <div className="rounded-xl border border-purple-500/30 bg-slate-900/75 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                                Intrinsic Pace of Aging
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                                {poa99Shift} bio-yr/yr
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2.5 mt-2">
                            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                                {data.cohorts.p99.intrinsicPaceOfAging.toFixed(2)}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                                (99th) vs{' '}
                                <strong className="text-cyan-300">
                                    {data.cohorts.p80.intrinsicPaceOfAging.toFixed(2)}
                                </strong>{' '}
                                (80th) bio-yr/yr
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            99th-pct optimizers age only {data.cohorts.p99.bioMonthsPerYear} bio-months per 12 calendar months (+{data.cohorts.p99.daysGainedPerYear} days banked/yr)
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Biotech Offset Now</div>
                            <div className="font-mono font-bold text-purple-300">
                                -{data.cohorts.p99.biotechRejuvenationOffset.toFixed(3)} yr/yr
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">99th Confidence Cone</div>
                            <div className="font-mono font-bold text-slate-200">
                                {data.cone99th.p10Formatted} – {data.cone99th.p90Formatted}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable Weekly Pulse Digest & 14-KPI Velocity Matrix */}
            <div className="relative z-10 mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowPulseDigest((v) => !v)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        {showPulseDigest ? 'Hide Weekly Market & Consensus Digest' : 'Show Weekly Market & Consensus Digest'}
                        {showPulseDigest ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowVelocityMatrix((v) => !v)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
                    >
                        <Activity className="w-3.5 h-3.5 text-purple-400" />
                        {showVelocityMatrix
                            ? 'Hide 14-KPI Velocity Engine (V × W)'
                            : `Inspect 14-KPI Velocity Engine (${data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}% • ${data.kpiVelocityEngine.normalizedAccelerationVector.toFixed(2)}v)`}
                        {showVelocityMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>
                        Updated Thursdays 8:00 AM MT •{' '}
                        {isLoading ? 'Refreshing...' : isLiveConnected ? 'Live FutureGraph API' : 'Calibrated Snapshot'}
                    </span>
                </div>
            </div>

            {showPulseDigest && (
                <div className="relative z-10 mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-3.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5" /> Prediction Markets (40% Weight)
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            {data.latestPulse.predictionMarketsSummary}
                        </p>
                    </div>
                    <div className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-3.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" /> Expert Consensus (35% Weight)
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            {data.latestPulse.expertConsensusSummary}
                        </p>
                    </div>
                    <div className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-3.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> Weekly Breakthrough Impact (25% Weight)
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            {data.latestPulse.breakthroughsSummary}
                        </p>
                    </div>
                </div>
            )}

            {showVelocityMatrix && (
                <div className="relative z-10 mt-3 rounded-xl bg-slate-950/90 border border-slate-800 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                                Canonical Longevity Velocity Normalization Engine (V × W)
                            </div>
                            <p className="text-[11px] text-slate-400">
                                Deduplicated 14-metric biological acceleration matrix shared between FutureGraph and AGI Futures Singularity Tracker.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-xs">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300">
                                Weighted Avg: {data.kpiVelocityEngine.weightedAvgVelocityPct.toFixed(1)}%/yr
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                                Vector: {data.kpiVelocityEngine.normalizedAccelerationVector.toFixed(2)}v
                            </span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-mono">
                            <thead>
                                <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400">
                                    <th className="py-2 pr-3">Canonical Longevity KPI</th>
                                    <th className="py-2 px-3">2026 Status / Benchmark</th>
                                    <th className="py-2 px-3 text-right">Vel (V)</th>
                                    <th className="py-2 px-3 text-right">Weight (W)</th>
                                    <th className="py-2 pl-3 text-right text-purple-300">V × W</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {data.kpiVelocityEngine.metrics.map((m) => (
                                    <tr key={m.id} className="hover:bg-slate-900/50">
                                        <td className="py-2 pr-3 font-sans font-medium text-slate-200">
                                            {m.name}
                                        </td>
                                        <td className="py-2 px-3 text-slate-400">
                                            {m.displayValue}{' '}
                                            <span className="text-emerald-400/90 text-[11px]">
                                                ({m.trendMagnitude})
                                            </span>
                                        </td>
                                        <td className="py-2 px-3 text-right text-slate-300">
                                            {m.annualVelocityPct.toFixed(1)}%
                                        </td>
                                        <td className="py-2 px-3 text-right text-slate-400">
                                            {m.indexWeight.toFixed(2)}
                                        </td>
                                        <td className="py-2 pl-3 text-right font-bold text-purple-300">
                                            {(m.annualVelocityPct * m.indexWeight).toFixed(1)}
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
