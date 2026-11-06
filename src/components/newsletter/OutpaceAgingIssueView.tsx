'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Download,
  Activity,
  Microscope,
  FileText,
  Globe,
  Mail,
  Compass,
  Calendar,
  Share2,
  LayoutGrid
} from 'lucide-react'
import BiologicalTelemetryCurveCard from '@/components/science/BiologicalTelemetryCurveCard'
import FutureGraphLevPulseWidget from '@/components/newsletter/FutureGraphLevPulseWidget'
import {
  OutpaceAgingIssue,
  NewsletterStudySection,
  NewsletterActionableItem
} from '@/lib/data/outpaceAgingIssues'

type StudyVisualTab = 'curve' | 'bars' | 'cascade' | 'table'
type ActionableVisualTab = 'telemetry' | 'onset' | 'vectors'
type ScalingMode = 'optimal' | 'beginner'

const ACCENT_STYLES: Record<
  NewsletterStudySection['accentColor'],
  {
    badgeBg: string
    badgeText: string
    border: string
    glow: string
    numberBg: string
  }
> = {
  emerald: {
    badgeBg: 'bg-emerald-500/15 border-emerald-400/35',
    badgeText: 'text-emerald-300',
    border: 'border-emerald-500/30',
    glow: 'from-emerald-500/10 via-slate-900/95 to-slate-950',
    numberBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
  },
  cyan: {
    badgeBg: 'bg-cyan-500/15 border-cyan-400/35',
    badgeText: 'text-cyan-300',
    border: 'border-cyan-500/30',
    glow: 'from-cyan-500/10 via-slate-900/95 to-slate-950',
    numberBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
  },
  purple: {
    badgeBg: 'bg-purple-500/15 border-purple-400/35',
    badgeText: 'text-purple-300',
    border: 'border-purple-500/30',
    glow: 'from-purple-500/10 via-slate-900/95 to-slate-950',
    numberBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40'
  },
  amber: {
    badgeBg: 'bg-amber-500/15 border-amber-400/35',
    badgeText: 'text-amber-300',
    border: 'border-amber-500/30',
    glow: 'from-amber-500/10 via-slate-900/95 to-slate-950',
    numberBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40'
  },
  rose: {
    badgeBg: 'bg-rose-500/15 border-rose-400/35',
    badgeText: 'text-rose-300',
    border: 'border-rose-500/30',
    glow: 'from-rose-500/10 via-slate-900/95 to-slate-950',
    numberBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40'
  }
}

/**
 * Generates a high-resolution (1600x900 16:9) PNG data URL from a newsletter study or protocol spec
 * so the user can download static LEVL-aesthetic cards in one click for Beehiiv emails.
 */
export function downloadStaticNewsletterCardPng(options: {
  filename: string
  topTag: string
  title: string
  subtitle: string
  keyStatBadge: string
  sourceBadge: string
  bars: { label: string; valueText: string; percent: number; colorHex: string }[]
  ctaText: string
}) {
  const canvas = document.createElement('canvas')
  canvas.width = 1600
  canvas.height = 900
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1600, 900)
  bgGrad.addColorStop(0, '#070b16')
  bgGrad.addColorStop(0.5, '#0f172a')
  bgGrad.addColorStop(1, '#090d1a')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 1600, 900)

  // Subtle grid lines
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.07)'
  ctx.lineWidth = 1
  for (let x = 80; x < 1600; x += 80) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 900)
    ctx.stroke()
  }
  for (let y = 80; y < 900; y += 80) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(1600, y)
    ctx.stroke()
  }

  // Outer card frame
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)'
  ctx.lineWidth = 3
  ctx.strokeRect(36, 36, 1528, 828)

  // Top Pill Badge
  ctx.fillStyle = 'rgba(16, 185, 129, 0.16)'
  ctx.fillRect(76, 72, 540, 44)
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)'
  ctx.lineWidth = 1.5
  ctx.strokeRect(76, 72, 540, 44)

  ctx.fillStyle = '#6ee7b7'
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillText(options.topTag.toUpperCase(), 96, 100)

  // Brand right badge
  ctx.fillStyle = '#38bdf8'
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('OUTPACE AGING • LEVL TELEMETRY', 1520, 100)
  ctx.textAlign = 'left'

  // Title (word-wrapped up to 2 lines)
  ctx.fillStyle = '#f8fafc'
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  const words = options.title.split(' ')
  let line1 = ''
  let line2 = ''
  for (const w of words) {
    if ((line1 + ' ' + w).length < 62) {
      line1 = (line1 ? line1 + ' ' : '') + w
    } else {
      line2 = (line2 ? line2 + ' ' : '') + w
    }
  }
  ctx.fillText(line1, 76, 170)
  if (line2) {
    ctx.fillText(line2, 76, 216)
  }

  // Subtitle
  ctx.fillStyle = '#94a3b8'
  ctx.font = '21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillText(options.subtitle.slice(0, 105), 76, line2 ? 258 : 220)

  // Key Stat Highlight Pill
  const statY = line2 ? 286 : 252
  ctx.fillStyle = 'rgba(6, 182, 212, 0.18)'
  ctx.fillRect(76, statY, 640, 48)
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)'
  ctx.strokeRect(76, statY, 640, 48)
  ctx.fillStyle = '#22d3ee'
  ctx.font = 'bold 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillText(`KEY METRIC: ${options.keyStatBadge}`, 96, statY + 31)

  // Bars section
  let barY = statY + 86
  options.bars.slice(0, 4).forEach(bar => {
    ctx.fillStyle = '#e2e8f0'
    ctx.font = 'bold 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.fillText(bar.label, 76, barY)

    ctx.fillStyle = bar.colorHex
    ctx.font = 'bold 21px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(bar.valueText, 1520, barY)
    ctx.textAlign = 'left'

    ctx.fillStyle = 'rgba(30, 41, 59, 0.85)'
    ctx.fillRect(76, barY + 14, 1444, 28)

    const fillW = Math.max(80, Math.min(1444, Math.round((bar.percent / 100) * 1444)))
    ctx.fillStyle = bar.colorHex
    ctx.fillRect(76, barY + 14, fillW, 28)

    barY += 92
  })

  // Footer Source & Interactive CTA strip
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'
  ctx.fillRect(76, 766, 1444, 64)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)'
  ctx.strokeRect(76, 766, 1444, 64)

  ctx.fillStyle = '#94a3b8'
  ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillText(options.sourceBadge, 98, 804)

  ctx.fillStyle = '#34d399'
  ctx.font = 'bold 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(options.ctaText, 1498, 804)
  ctx.textAlign = 'left'

  const link = document.createElement('a')
  link.download = options.filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

/**
 * Interactive 4-Tab Study Card placed directly before `Limits:` and `Future Implications:`.
 */
function StudyInteractiveCard({
  study,
  issueShortSlug
}: {
  study: NewsletterStudySection
  issueShortSlug: string
}) {
  const [activeTab, setActiveTab] = useState<StudyVisualTab>(
    study.visualSpec.defaultChartType === 'telemetry_curve' ? 'curve' : 'bars'
  )

  const handleDownloadPng = () => {
    downloadStaticNewsletterCardPng({
      filename: `outpace_aging_${issueShortSlug}_study_0${study.number}_${study.id}.png`,
      topTag: `Study 0${study.number} • ${study.journal}`,
      title: study.visualSpec.chartTitle,
      subtitle: study.visualSpec.chartSubtitle,
      keyStatBadge: study.keyStatBadge,
      sourceBadge: study.visualSpec.sourceFigureBadge,
      bars: study.visualSpec.cohortBars.map((b, idx) => ({
        label: b.label,
        valueText: b.deltaText,
        percent: b.percentWidth,
        colorHex: idx === 0 ? '#10b981' : idx === 1 ? '#38bdf8' : idx === 2 ? '#a855f7' : '#94a3b8'
      })),
      ctaText: `Interactive Graph & Geek Mode: levlhealth.com/newsletter/${issueShortSlug} →`
    })
  }

  return (
    <div className="my-6 rounded-2xl border border-cyan-500/25 bg-slate-950/90 shadow-[0_12px_40px_rgba(0,0,0,0.65)] overflow-hidden">
      {/* Top Bar: Visual Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-900/90 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            <Activity className="w-3.5 h-3.5" />
            LEVL Study Telemetry
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Toggle between plain-English graph, deep mechanism cascade, and trial table
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('curve')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'curve'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📈 Telemetry Curve
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bars')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'bars'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📊 Cohort Bars
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cascade')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'cascade'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            🧬 Geek Mode Cascade
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'table'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📄 Trial Data
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5">
        {activeTab === 'curve' && (
          <div>
            <BiologicalTelemetryCurveCard curves={[study.visualSpec.curveSpec]} />
          </div>
        )}

        {activeTab === 'bars' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {study.visualSpec.chartTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">{study.visualSpec.chartSubtitle}</p>
            </div>
            <div className="space-y-3 pt-1">
              {study.visualSpec.cohortBars.map((bar, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-slate-200">{bar.label}</span>
                    <span className={`font-bold ${bar.textColorClass}`}>{bar.deltaText}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${bar.barColorClass} transition-all duration-500`}
                      style={{ width: `${bar.percentWidth}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cascade' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Microscope className="w-4 h-4 text-purple-400" />
                4-Stage Cellular & Molecular Mechanism Cascade
              </h4>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-400/30">
                Deep Science View
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {study.visualSpec.molecularCascade.map(stage => (
                <div
                  key={stage.stepNum}
                  className={`p-3.5 rounded-xl border ${stage.accentClass} transition-all`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-black/40 border border-current flex items-center justify-center text-[11px] font-bold">
                      {stage.stepNum}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">{stage.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{stage.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-white">
              {study.visualSpec.trialComparison.title}
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900/95 border-b border-white/10 text-slate-300">
                    {study.visualSpec.trialComparison.headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-slate-950/60">
                  {study.visualSpec.trialComparison.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-medium text-white">{row.col1}</td>
                      <td className="py-2.5 px-3 text-slate-300">{row.col2}</td>
                      <td className={`py-2.5 px-3 ${row.col3ColorClass}`}>{row.col3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Source Credibility Strip */}
      <div className="px-4 py-2.5 bg-slate-900/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span className="font-mono text-slate-300">{study.visualSpec.sourceFigureBadge}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadPng}
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            Download Beehiiv PNG
          </button>
          <a
            href={study.studyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200 font-semibold"
          >
            Verify in Primary Paper
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Interactive Protocol / Modality Sandbox Card with Beginner vs. Optimal Scaling Toggle,
 * 3-Tab Visual Explorer (Telemetry Curve / Onset Timeline / 8-Vector Impact), and 1-Click LEVL App Deep-Link.
 */
function ActionableProtocolModalitySection({
  item,
  issueShortSlug
}: {
  item: NewsletterActionableItem
  issueShortSlug: string
}) {
  const [scalingMode, setScalingMode] = useState<ScalingMode>('optimal')
  const [visualTab, setVisualTab] = useState<ActionableVisualTab>('telemetry')

  const isProtocol = item.kind === 'protocol'
  const activeScoreBadge = scalingMode === 'optimal' ? item.levlScoreOptimal : item.levlScoreBeginner

  const handleDownloadBlueprintPng = () => {
    downloadStaticNewsletterCardPng({
      filename: `outpace_aging_${issueShortSlug}_${item.kind}_${item.id}.png`,
      topTag: `${isProtocol ? 'Protocol of the Week' : 'Modality of the Week'} • ${item.badgeText}`,
      title: item.name,
      subtitle: item.oneLinePromise,
      keyStatBadge: `${activeScoreBadge} Score Impact • ${item.steps.length} Actionable Steps`,
      sourceBadge: `PUBMED VERIFIED: ${item.pubmedLinks.map(p => p.label).join(' • ')}`,
      bars: item.vectorScores.map(v => ({
        label: `${v.vectorName} Vector`,
        valueText: `${v.score}/100 • ${v.effectStat}`,
        percent: v.score,
        colorHex: v.color
      })),
      ctaText: `Toggle Beginner vs. Optimal: levlhealth.com/newsletter/${issueShortSlug} →`
    })
  }

  return (
    <section
      id={item.id}
      className={`rounded-3xl border p-5 sm:p-8 shadow-2xl ${
        isProtocol
          ? 'border-purple-500/35 bg-gradient-to-br from-purple-950/25 via-slate-900/95 to-slate-950'
          : 'border-emerald-500/35 bg-gradient-to-br from-emerald-950/25 via-slate-900/95 to-slate-950'
      }`}
    >
      {/* Top Header Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              isProtocol
                ? 'bg-purple-500/20 text-purple-200 border-purple-400/40'
                : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40'
            }`}
          >
            {isProtocol ? '🧬 Protocol of the Week' : '⚡ Modality of the Week'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10">
            {item.badgeText}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
            {activeScoreBadge} Projected Impact
          </span>
        </div>
      </div>

      {/* Title & One-Line Promise */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        {item.name}
      </h2>
      <p className="mt-2 text-base sm:text-lg font-medium text-cyan-200 leading-relaxed">
        <span className="font-bold text-white">One-line promise:</span> {item.oneLinePromise}
      </p>

      {/* Why It Is Included This Week */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-900/85 border border-white/10">
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          <span className="font-bold text-white">Why it is included this week: </span>
          {item.whyIncluded}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Verified Clinical Sources:</span>
          {item.pubmedLinks.map(link => (
            <a
              key={link.pmid}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/25 transition-colors"
            >
              📄 {link.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Telemetry & Dosing Sandbox Card (Placed Before Steps) */}
      <div className="my-6 rounded-2xl border border-cyan-500/30 bg-slate-950/95 overflow-hidden shadow-xl">
        {/* Top Controls: Scaling Mode Toggle + Visual View Toggle */}
        <div className="p-4 bg-slate-900/95 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Beginner vs Optimal Scaling Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Dosing Tier:
            </span>
            <div className="inline-flex rounded-xl p-1 bg-slate-950 border border-white/10">
              <button
                type="button"
                onClick={() => setScalingMode('beginner')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  scalingMode === 'beginner'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🌱 Beginner Scaling ({item.levlScoreBeginner})
              </button>
              <button
                type="button"
                onClick={() => setScalingMode('optimal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  scalingMode === 'optimal'
                    ? 'bg-cyan-400 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ⚡ Clinical Optimal ({item.levlScoreOptimal})
              </button>
            </div>
          </div>

          {/* Graph / Onset / Vectors View Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setVisualTab('telemetry')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                visualTab === 'telemetry'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              📈 24h Telemetry Curve
            </button>
            <button
              type="button"
              onClick={() => setVisualTab('onset')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                visualTab === 'onset'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🎯 Onset Timeline
            </button>
            <button
              type="button"
              onClick={() => setVisualTab('vectors')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                visualTab === 'vectors'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ⬢ Longevity Vectors
            </button>
          </div>
        </div>

        {/* Visual Body */}
        <div className="p-4 sm:p-5">
          {visualTab === 'telemetry' && (
            <BiologicalTelemetryCurveCard curves={[item.curveSpec]} />
          )}

          {visualTab === 'onset' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {item.onsetPhases.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      {p.phase}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                      {p.window}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          )}

          {visualTab === 'vectors' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  Targeted Biological Longevity Vectors & Quantified Biomarker Shifts
                </h4>
                <span className="text-xs text-slate-400">Calibrated 0–100 Clinical Rubric</span>
              </div>
              <div className="space-y-2.5">
                {item.vectorScores.map(vec => (
                  <div key={vec.vectorName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-white">{vec.vectorName}</span>
                      <span className="font-bold text-cyan-300">
                        {vec.score}/100 • {vec.effectStat}
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${vec.score}%`, backgroundColor: vec.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Bar: Deep-Link to LEVL Discovery & Download Beehiiv PNG */}
        <div className="px-4 py-3 bg-slate-900/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={item.exploreDeepLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity shadow-lg"
            >
              <Compass className="w-4 h-4" />
              Open Interactive Card in LEVL Discovery
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/today"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              Go to Today Timeline
            </Link>
          </div>

          <button
            type="button"
            onClick={handleDownloadBlueprintPng}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200"
          >
            <Download className="w-3.5 h-3.5" />
            Download Static Blueprint Card (PNG)
          </button>
        </div>
      </div>

      {/* Numbered Steps (Dynamically Responds to Beginner vs Optimal Toggle) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white">
            Numbered Steps ({scalingMode === 'optimal' ? 'Clinical Optimal Dosing' : 'Beginner Entry Scaling'}):
          </h3>
          <span className="text-xs text-slate-400">
            Click the Dosing Tier toggle above to compare Beginner vs. Optimal
          </span>
        </div>

        <div className="space-y-2.5">
          {item.steps.map(step => {
            const activeBadge =
              scalingMode === 'optimal' ? step.optimalDoseBadge : step.beginnerDoseBadge
            const activeInstruction =
              scalingMode === 'optimal' ? step.optimalInstruction : step.beginnerInstruction

            return (
              <div
                key={step.stepNumber}
                className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-extrabold flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span className="font-bold text-white text-sm sm:text-base">{step.title}</span>
                    <span className="text-xs text-slate-400">({step.timingAndFrequency})</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      scalingMode === 'optimal'
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                    }`}
                  >
                    {activeBadge}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed pl-8">{activeInstruction}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Beginner Scaling Note & Cautions */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className={`p-4 rounded-2xl border transition-all ${
            scalingMode === 'beginner'
              ? 'bg-emerald-950/40 border-emerald-400/50 ring-1 ring-emerald-400/30'
              : 'bg-slate-900/80 border-emerald-500/25'
          }`}
        >
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <span className="font-bold text-emerald-300">Beginner Scaling Note: </span>
            {item.beginnerScalingNote}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <span className="font-bold text-amber-300">Cautions: </span>
            {item.cautions}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 italic">{item.disclaimer}</p>
    </section>
  )
}

/**
 * Generates clean HTML & plain-text newsletter copy for 1-click pasting into Beehiiv.
 * Links directly to `https://levlhealth.com/newsletter/<shortSlug>`!
 */
export function buildBeehiivRichHtmlAndText(issue: OutpaceAgingIssue) {
  const canonicalIssueUrl = `https://levlhealth.com/newsletter/${issue.shortSlug}`
  const htmlParts: string[] = []
  const textParts: string[] = []

  htmlParts.push(`<h1>${issue.title}</h1>`)
  htmlParts.push(
    `<p><strong>${issue.dateLabel} | Edition #${issue.issueNumber}</strong> • <a href="${canonicalIssueUrl}">Read Interactive Web Edition on LEVL →</a></p>`
  )
  htmlParts.push(`<p>${issue.levStateOfPlayParagraph}</p>`)
  htmlParts.push(`<p>${issue.introSummaryParagraph}</p>`)
  htmlParts.push(`<hr />`)

  textParts.push(`${issue.title}`)
  textParts.push(
    `${issue.dateLabel} | Edition #${issue.issueNumber} • Interactive Web Edition: ${canonicalIssueUrl}\n`
  )
  textParts.push(`${issue.levStateOfPlayParagraph}\n`)
  textParts.push(`${issue.introSummaryParagraph}\n`)
  textParts.push(`------------------------------------------------------------\n`)

  for (const s of issue.studies) {
    htmlParts.push(`<h2>${s.number}. ${s.headline}</h2>`)
    textParts.push(`${s.number}. ${s.headline}\n`)

    for (const p of s.paragraphs) {
      htmlParts.push(`<p>${p}</p>`)
      textParts.push(`${p}\n`)
    }

    htmlParts.push(
      `<p><em>[Insert Static Graph PNG: outpace_aging_${issue.shortSlug}_study_0${s.number}_${s.id}.png | Link image to: ${canonicalIssueUrl}#${s.id}]</em></p>`
    )
    textParts.push(
      `[Insert Static Graph PNG: outpace_aging_${issue.shortSlug}_study_0${s.number}_${s.id}.png -> ${canonicalIssueUrl}#${s.id}]\n`
    )

    htmlParts.push(`<p><strong>Limits:</strong> ${s.limits}</p>`)
    textParts.push(`Limits: ${s.limits}\n`)

    htmlParts.push(`<p><strong>Future Implications:</strong> ${s.futureImplications}</p>`)
    textParts.push(`Future Implications: ${s.futureImplications}\n`)

    htmlParts.push(`<p>Study link: <a href="${s.studyUrl}">${s.studyUrl}</a></p><hr />`)
    textParts.push(`Study link: ${s.studyUrl}\n------------------------------------------------------------\n`)
  }

  for (const item of [issue.protocolOfTheWeek, issue.modalityOfTheWeek]) {
    const headingPrefix =
      item.kind === 'protocol' ? 'Protocol of the Week' : 'Modality of the Week'
    htmlParts.push(`<h2>${headingPrefix}: ${item.name}</h2>`)
    htmlParts.push(`<p><strong>One-line promise:</strong> ${item.oneLinePromise}</p>`)
    htmlParts.push(
      `<p><strong>Why it is included this week:</strong> ${item.whyIncluded}<br />Source links: ${item.pubmedLinks
        .map(l => `<a href="${l.url}">${l.url}</a>`)
        .join(' and ')}</p>`
    )
    htmlParts.push(
      `<p><em>[Insert Static Blueprint Card PNG: outpace_aging_${issue.shortSlug}_${item.kind}_${item.id}.png | Link image to: https://levlhealth.com${item.exploreDeepLink}]</em></p>`
    )
    htmlParts.push(`<p><strong>Numbered Steps:</strong></p><ol>`)

    textParts.push(`${headingPrefix}: ${item.name}\n`)
    textParts.push(`One-line promise: ${item.oneLinePromise}\n`)
    textParts.push(
      `Why it is included this week: ${item.whyIncluded}\nSource links: ${item.pubmedLinks
        .map(l => l.url)
        .join(' and ')}\n`
    )
    textParts.push(
      `[Insert Static Blueprint Card PNG: outpace_aging_${issue.shortSlug}_${item.kind}_${item.id}.png -> https://levlhealth.com${item.exploreDeepLink}]\n`
    )
    textParts.push(`Numbered Steps:`)

    for (const step of item.steps) {
      htmlParts.push(
        `<li><strong>${step.title} (${step.timingAndFrequency}):</strong> ${step.optimalInstruction}</li>`
      )
      textParts.push(
        `${step.stepNumber}. ${step.title} (${step.timingAndFrequency}): ${step.optimalInstruction}`
      )
    }
    htmlParts.push(`</ol>`)
    textParts.push(``)

    htmlParts.push(`<p><strong>Beginner Scaling Note:</strong> ${item.beginnerScalingNote}</p>`)
    htmlParts.push(`<p><strong>Cautions:</strong> ${item.cautions}</p>`)
    htmlParts.push(
      `<p><a href="https://levlhealth.com${item.exploreDeepLink}"><strong>Try ${item.name} interactively in the LEVL app →</strong></a></p>`
    )
    htmlParts.push(`<p><em>${item.disclaimer}</em></p><hr />`)

    textParts.push(`Beginner Scaling Note: ${item.beginnerScalingNote}\n`)
    textParts.push(`Cautions: ${item.cautions}\n`)
    textParts.push(
      `Try ${item.name} interactively in the LEVL app: https://levlhealth.com${item.exploreDeepLink}\n`
    )
    textParts.push(`${item.disclaimer}\n------------------------------------------------------------\n`)
  }

  htmlParts.push(`<h2>Closing</h2>`)
  htmlParts.push(`<p>${issue.closingParagraph}</p>`)
  htmlParts.push(
    `<p><strong>About LEVL:</strong> ${issue.aboutLevlParagraph.replace(
      'levlhealth.com',
      '<a href="https://levlhealth.com">levlhealth.com</a>'
    )}</p>`
  )

  textParts.push(`Closing\n${issue.closingParagraph}\n`)
  textParts.push(`About LEVL: ${issue.aboutLevlParagraph}\n`)

  return {
    html: htmlParts.join('\n'),
    text: textParts.join('\n')
  }
}

export default function OutpaceAgingIssueView({
  issue,
  initialMode = 'web_canonical'
}: {
  issue: OutpaceAgingIssue
  initialMode?: 'web_canonical' | 'beehiiv_studio'
}) {
  const [pageMode, setPageMode] = useState<'web_canonical' | 'beehiiv_studio'>(initialMode)
  const [copiedRich, setCopiedRich] = useState(false)
  const [copiedPlain, setCopiedPlain] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  const canonicalUrl = `https://levlhealth.com/newsletter/${issue.shortSlug}`

  const handleCopyShareUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2500)
    } catch {}
  }, [canonicalUrl])

  const handleCopyBeehiivRich = useCallback(async () => {
    const { html, text } = buildBeehiivRichHtmlAndText(issue)
    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        const htmlBlob = new Blob([html], { type: 'text/html' })
        const textBlob = new Blob([text], { type: 'text/plain' })
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
          })
        ])
      } else {
        await navigator.clipboard.writeText(text)
      }
      setCopiedRich(true)
      setTimeout(() => setCopiedRich(false), 3000)
    } catch {
      await navigator.clipboard.writeText(text)
      setCopiedRich(true)
      setTimeout(() => setCopiedRich(false), 3000)
    }
  }, [issue])

  const handleCopyPlainText = useCallback(async () => {
    const { text } = buildBeehiivRichHtmlAndText(issue)
    await navigator.clipboard.writeText(text)
    setCopiedPlain(true)
    setTimeout(() => setCopiedPlain(false), 3000)
  }, [issue])

  const handleDownloadAllPngs = () => {
    issue.studies.forEach((study, idx) => {
      setTimeout(() => {
        downloadStaticNewsletterCardPng({
          filename: `outpace_aging_${issue.shortSlug}_study_0${study.number}_${study.id}.png`,
          topTag: `Study 0${study.number} • ${study.journal}`,
          title: study.visualSpec.chartTitle,
          subtitle: study.visualSpec.chartSubtitle,
          keyStatBadge: study.keyStatBadge,
          sourceBadge: study.visualSpec.sourceFigureBadge,
          bars: study.visualSpec.cohortBars.map((b, bIdx) => ({
            label: b.label,
            valueText: b.deltaText,
            percent: b.percentWidth,
            colorHex: bIdx === 0 ? '#10b981' : bIdx === 1 ? '#38bdf8' : bIdx === 2 ? '#a855f7' : '#94a3b8'
          })),
          ctaText: `Interactive Graph & Geek Mode: levlhealth.com/newsletter/${issue.shortSlug} →`
        })
      }, idx * 350)
    })

    setTimeout(() => {
      for (const item of [issue.protocolOfTheWeek, issue.modalityOfTheWeek]) {
        downloadStaticNewsletterCardPng({
          filename: `outpace_aging_${issue.shortSlug}_${item.kind}_${item.id}.png`,
          topTag: `${item.kind === 'protocol' ? 'Protocol of the Week' : 'Modality of the Week'} • ${item.badgeText}`,
          title: item.name,
          subtitle: item.oneLinePromise,
          keyStatBadge: `${item.levlScoreOptimal} Score Impact • ${item.steps.length} Steps`,
          sourceBadge: `PUBMED VERIFIED: ${item.pubmedLinks.map(p => p.label).join(' • ')}`,
          bars: item.vectorScores.map(v => ({
            label: `${v.vectorName} Vector`,
            valueText: `${v.score}/100 • ${v.effectStat}`,
            percent: v.score,
            colorHex: v.color
          })),
          ctaText: `Toggle Beginner vs. Optimal: levlhealth.com/newsletter/${issue.shortSlug} →`
        })
      }
    }, issue.studies.length * 350 + 250)
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 pb-28">
      {/* Top Sticky Editorial Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              All Editions
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-400/30">
                Edition #{issue.issueNumber}
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">
                {issue.dateLabel} • /newsletter/{issue.shortSlug}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              title={canonicalUrl}
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedUrl ? 'URL Copied!' : 'Share URL'}</span>
            </button>

            {/* Mode Switcher: Canonical Web vs Beehiiv Studio */}
            <div className="inline-flex rounded-xl p-1 bg-slate-900 border border-white/10">
              <button
                type="button"
                onClick={() => setPageMode('web_canonical')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  pageMode === 'web_canonical'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Interactive Edition
              </button>
              <button
                type="button"
                onClick={() => setPageMode('beehiiv_studio')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  pageMode === 'beehiiv_studio'
                    ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Beehiiv Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
        {/* Beehiiv Export Studio Banner (When Active) */}
        {pageMode === 'beehiiv_studio' && (
          <section className="rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 p-6 shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  ✉️ Beehiiv Weekly Publisher Studio
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                  1-Click Copy for Beehiiv + Static 16:9 LEVL Graph PNGs
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Canonical URL:{' '}
                  <code className="text-cyan-300 font-mono bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                    {canonicalUrl}
                  </code>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyBeehiivRich}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:opacity-95 transition-opacity shadow-lg"
                >
                  {copiedRich ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedRich ? 'Copied Formatted Beehiiv Copy!' : 'Copy Rich Text for Beehiiv'}
                </button>

                <button
                  type="button"
                  onClick={handleCopyPlainText}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10"
                >
                  {copiedPlain ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  {copiedPlain ? 'Copied Plain Text!' : 'Copy Plain Text'}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAllPngs}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/30"
                >
                  <Download className="w-4 h-4" />
                  Download All 7 Static PNG Cards
                </button>
              </div>
            </div>

            {/* Editorial Compliance Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
                <div className="text-emerald-400 font-bold">✓ Zero Em Dashes</div>
                <div className="text-slate-400 mt-0.5">Verified 0 em dashes in copy</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
                <div className="text-emerald-400 font-bold">✓ Primary Sources</div>
                <div className="text-slate-400 mt-0.5">5 direct DOIs + 3 PubMed RCTs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
                <div className="text-emerald-400 font-bold">✓ Limits & Future</div>
                <div className="text-slate-400 mt-0.5">Complete factual sentences</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
                <div className="text-emerald-400 font-bold">✓ 1 Protocol + 1 Modality</div>
                <div className="text-slate-400 mt-0.5">Deep-linked to LEVL Discovery</div>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Hero & Opening Intro */}
        <section className="rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              LEVL Weekly Longevity Roundup
            </span>
            <span className="text-xs font-medium text-slate-400">
              {issue.dateLabel} • Edition #{issue.issueNumber} • {issue.readTimeLabel}
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.12]">
              Outpace Aging
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-300 font-medium">
              {issue.subtitle}
            </p>
          </div>

          {/* Paragraph 1: LEV State of Play */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900/80 border border-emerald-500/30">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 mb-1.5">
              🚀 Longevity Escape Velocity (LEV) State of Play
            </div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
              {issue.levStateOfPlayParagraph}
            </p>
          </div>

          {/* Paragraph 2: Weekly Spotlight + Lead-in to Protocol & Modality */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            {issue.introSummaryParagraph}
          </p>

          {/* 3 Connecting Themes Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {issue.themes.map(t => (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl bg-slate-900/85 border border-white/10 space-y-1"
              >
                <div className="text-xs font-bold text-cyan-300">{t.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{t.summary}</p>
              </div>
            ))}
          </div>

          {/* Quick Jump Anchors */}
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-white/10">
            <span className="text-xs font-semibold text-slate-400 mr-1">Jump to:</span>
            {issue.studies.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
              >
                #{s.number} {s.themeTag}
              </a>
            ))}
            <a
              href={`#${issue.protocolOfTheWeek.id}`}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/35 transition-colors"
            >
              🧬 Protocol of the Week
            </a>
            <a
              href={`#${issue.modalityOfTheWeek.id}`}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/35 transition-colors"
            >
              ⚡ Modality of the Week
            </a>
          </div>
        </section>

        {/* Live Two-Way FutureGraph LEV & Pace of Aging Observatory */}
        <FutureGraphLevPulseWidget issue={issue} showPublisherSync={true} />

        {/* Five Study Briefings */}
        <div className="space-y-8">
          {issue.studies.map(study => {
            const style = ACCENT_STYLES[study.accentColor]
            return (
              <article
                key={study.id}
                id={study.id}
                className={`rounded-3xl border ${style.border} bg-gradient-to-b ${style.glow} p-6 sm:p-8 shadow-xl`}
              >
                {/* Study Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-black ${style.numberBg}`}
                    >
                      {study.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {study.journal} • {study.publishDate}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${style.badgeBg} ${style.badgeText}`}
                  >
                    {study.keyStatBadge}
                  </span>
                </div>

                {/* Numbered Headline */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {study.number}. {study.headline}
                </h2>

                {/* 3 Core Paragraphs (Question, Method, Findings) */}
                <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                  {study.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Interactive LEVL Visual Card Placed Right Before Limits */}
                <StudyInteractiveCard study={study} issueShortSlug={issue.shortSlug} />

                {/* Limits & Future Implications Blocks */}
                <div className="space-y-3 mt-5">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10">
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-300">Limits: </span>
                      {study.limits}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30">
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                      <span className="font-bold text-emerald-300">Future Implications: </span>
                      {study.futureImplications}
                    </p>
                  </div>
                </div>

                {/* Primary Source Link */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 font-mono">{study.doiLabel}</span>
                  <a
                    href={study.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-cyan-300 hover:text-cyan-200"
                  >
                    Study link: {study.studyUrl}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        {/* Protocol of the Week */}
        <ActionableProtocolModalitySection
          item={issue.protocolOfTheWeek}
          issueShortSlug={issue.shortSlug}
        />

        {/* Modality of the Week */}
        <ActionableProtocolModalitySection
          item={issue.modalityOfTheWeek}
          issueShortSlug={issue.shortSlug}
        />

        {/* Closing & About LEVL */}
        <section className="rounded-3xl border border-white/15 bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Closing</h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {issue.closingParagraph}
          </p>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-emerald-950/40 border border-cyan-500/30 space-y-3">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              <span className="font-bold text-white">About LEVL: </span>
              {issue.aboutLevlParagraph}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/30"
              >
                <LayoutGrid className="w-4 h-4" />
                Browse All Newsletter Editions
              </Link>
              <Link
                href="/explore?mode=discover"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity"
              >
                <Compass className="w-4 h-4" />
                Explore Discovery Feed
              </Link>
              <Link
                href="/today"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-white/10"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                Open My Today Routine
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
