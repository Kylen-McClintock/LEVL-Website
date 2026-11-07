'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import {
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
  LayoutGrid,
  Sun,
  Moon,
  CheckCircle2
} from 'lucide-react'
import BiologicalTelemetryCurveCard from '@/components/science/BiologicalTelemetryCurveCard'
import FutureGraphLevPulseWidget from '@/components/newsletter/FutureGraphLevPulseWidget'
import NewsletterSignupBanner, {
  NewsletterHeaderSubscribeButton
} from '@/components/newsletter/NewsletterSignupWidget'
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
    lightBadgeBg: string
    lightBadgeText: string
    border: string
    lightBorder: string
    glow: string
    lightGlow: string
    numberBg: string
    lightNumberBg: string
  }
> = {
  emerald: {
    badgeBg: 'bg-emerald-500/15 border-emerald-400/35',
    badgeText: 'text-emerald-300',
    lightBadgeBg: 'bg-emerald-50 border-emerald-300',
    lightBadgeText: 'text-emerald-800',
    border: 'border-emerald-500/30',
    lightBorder: 'border-emerald-200',
    glow: 'from-emerald-500/10 via-slate-900/95 to-slate-950',
    lightGlow: 'from-emerald-50/50 via-white to-white',
    numberBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    lightNumberBg: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  cyan: {
    badgeBg: 'bg-cyan-500/15 border-cyan-400/35',
    badgeText: 'text-cyan-300',
    lightBadgeBg: 'bg-cyan-50 border-cyan-300',
    lightBadgeText: 'text-cyan-800',
    border: 'border-cyan-500/30',
    lightBorder: 'border-cyan-200',
    glow: 'from-cyan-500/10 via-slate-900/95 to-slate-950',
    lightGlow: 'from-cyan-50/50 via-white to-white',
    numberBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    lightNumberBg: 'bg-cyan-100 text-cyan-800 border-cyan-300'
  },
  purple: {
    badgeBg: 'bg-purple-500/15 border-purple-400/35',
    badgeText: 'text-purple-300',
    lightBadgeBg: 'bg-purple-50 border-purple-300',
    lightBadgeText: 'text-purple-800',
    border: 'border-purple-500/30',
    lightBorder: 'border-purple-200',
    glow: 'from-purple-500/10 via-slate-900/95 to-slate-950',
    lightGlow: 'from-purple-50/50 via-white to-white',
    numberBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    lightNumberBg: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  amber: {
    badgeBg: 'bg-amber-500/15 border-amber-400/35',
    badgeText: 'text-amber-300',
    lightBadgeBg: 'bg-amber-50 border-amber-300',
    lightBadgeText: 'text-amber-800',
    border: 'border-amber-500/30',
    lightBorder: 'border-amber-200',
    glow: 'from-amber-500/10 via-slate-900/95 to-slate-950',
    lightGlow: 'from-amber-50/50 via-white to-white',
    numberBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    lightNumberBg: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  rose: {
    badgeBg: 'bg-rose-500/15 border-rose-400/35',
    badgeText: 'text-rose-300',
    lightBadgeBg: 'bg-rose-50 border-rose-300',
    lightBadgeText: 'text-rose-800',
    border: 'border-rose-500/30',
    lightBorder: 'border-rose-200',
    glow: 'from-rose-500/10 via-slate-900/95 to-slate-950',
    lightGlow: 'from-rose-50/50 via-white to-white',
    numberBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    lightNumberBg: 'bg-rose-100 text-rose-800 border-rose-300'
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
  issueShortSlug,
  isLightMode
}: {
  study: NewsletterStudySection
  issueShortSlug: string
  isLightMode: boolean
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
    <div
      className={`my-6 rounded-2xl border overflow-hidden transition-colors ${
        isLightMode
          ? 'border-slate-200 bg-slate-50/80 shadow-md'
          : 'border-cyan-500/25 bg-slate-950/90 shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
      }`}
    >
      {/* Top Bar: Visual Mode Toggles */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b ${
          isLightMode
            ? 'bg-white border-slate-200'
            : 'bg-slate-900/90 border-white/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
              isLightMode
                ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            LEVL Study Telemetry
          </span>
          <span className={`text-xs hidden sm:inline ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Explore interactive curve, cohort outcomes, and mechanism cascade
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('curve')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'curve'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : isLightMode
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📈 Telemetry Curve
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bars')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'bars'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : isLightMode
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            📊 Cohort Bars
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cascade')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'cascade'
                ? 'bg-purple-500 text-white shadow-sm'
                : isLightMode
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            🧬 Geek Mode Cascade
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'table'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : isLightMode
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
            <BiologicalTelemetryCurveCard
              curves={[study.visualSpec.curveSpec]}
              isLightMode={isLightMode}
            />
          </div>
        )}

        {activeTab === 'bars' && (
          <div className="space-y-4">
            <div>
              <h4
                className={`text-sm sm:text-base font-bold ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                {study.visualSpec.chartTitle}
              </h4>
              <p className={`text-xs mt-0.5 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                {study.visualSpec.chartSubtitle}
              </p>
            </div>
            <div className="space-y-3 pt-1">
              {study.visualSpec.cohortBars.map((bar, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className={`font-semibold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                      {bar.label}
                    </span>
                    <span
                      className={`font-bold ${
                        isLightMode ? 'text-cyan-800' : bar.textColorClass
                      }`}
                    >
                      {bar.deltaText}
                    </span>
                  </div>
                  <div
                    className={`w-full h-3 rounded-full overflow-hidden border ${
                      isLightMode
                        ? 'bg-slate-200 border-slate-300'
                        : 'bg-slate-900 border-white/10'
                    }`}
                  >
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4
                className={`text-sm sm:text-base font-bold flex items-center gap-2 ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                }`}
              >
                <Microscope className={`w-4 h-4 ${isLightMode ? 'text-purple-600' : 'text-purple-400'}`} />
                4-Stage Cellular & Molecular Mechanism Cascade
              </h4>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isLightMode
                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                    : 'bg-purple-500/15 text-purple-300 border-purple-400/30'
                }`}
              >
                Deep Science View
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {study.visualSpec.molecularCascade.map(stage => (
                <div
                  key={stage.stepNum}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isLightMode
                      ? 'bg-white border-slate-200 shadow-2xs'
                      : stage.accentClass
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] font-bold ${
                        isLightMode
                          ? 'bg-purple-50 border-purple-300 text-purple-800'
                          : 'bg-black/40 border-current'
                      }`}
                    >
                      {stage.stepNum}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isLightMode ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {stage.title}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isLightMode ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    {stage.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="space-y-3">
            <h4
              className={`text-sm sm:text-base font-bold ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              {study.visualSpec.trialComparison.title}
            </h4>
            <div
              className={`overflow-x-auto rounded-xl border ${
                isLightMode ? 'border-slate-200 bg-white' : 'border-white/10'
              }`}
            >
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr
                    className={`border-b ${
                      isLightMode
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-slate-900/95 border-white/10 text-slate-300'
                    }`}
                  >
                    {study.visualSpec.trialComparison.headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  className={
                    isLightMode
                      ? 'divide-y divide-slate-200 bg-white'
                      : 'divide-y divide-white/5 bg-slate-950/60'
                  }
                >
                  {study.visualSpec.trialComparison.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={isLightMode ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}
                    >
                      <td
                        className={`py-2.5 px-3 font-medium ${
                          isLightMode ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {row.col1}
                      </td>
                      <td
                        className={`py-2.5 px-3 ${
                          isLightMode ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        {row.col2}
                      </td>
                      <td
                        className={`py-2.5 px-3 ${
                          isLightMode ? 'text-emerald-700 font-bold' : row.col3ColorClass
                        }`}
                      >
                        {row.col3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Source Credibility Strip */}
      <div
        className={`px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] ${
          isLightMode
            ? 'bg-slate-100/90 border-slate-200 text-slate-600'
            : 'bg-slate-900/95 border-white/10 text-slate-400'
        }`}
      >
        <span className={`font-mono ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
          {study.visualSpec.sourceFigureBadge}
        </span>
        <div className="flex items-center gap-3">
          <a
            href={study.studyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-semibold ${
              isLightMode
                ? 'text-emerald-700 hover:text-emerald-900'
                : 'text-emerald-300 hover:text-emerald-200'
            }`}
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
 * Interactive Protocol / Modality Sandbox Card with:
 * - Prominent Hero Image Banner
 * - 3 Big Hook Stat Cards
 * - Key Benefits List
 * - Beginner vs. Optimal Scaling Toggle & 3-Tab Visual Explorer
 */
function ActionableProtocolModalitySection({
  item,
  issueShortSlug,
  isLightMode
}: {
  item: NewsletterActionableItem
  issueShortSlug: string
  isLightMode: boolean
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

  const scoreNumber = activeScoreBadge.replace(/\s*LEVL/i, '').trim()
  const stepsBadge =
    item.stepsAndTimeBadge ||
    (isProtocol
      ? `${item.steps.length} Steps • ~15 min/day`
      : `${item.steps.length} Steps • 16h Fast / 8h Window`)
  const creatorName =
    item.creatorName ||
    (isProtocol ? 'Dr. David Sinclair' : 'Dr. Satchin Panda & Dr. Courtney Peterson')
  const creatorAffiliation =
    item.creatorAffiliation ||
    (isProtocol ? 'Harvard NAD+ & Sirtuin Lab' : 'Salk Institute & UAB Circadian Trials')
  const creatorAvatarUrl = item.creatorAvatarUrl || '/images/discover/creator_sketch_avatar.jpg'

  return (
    <section
      id={item.id}
      className={`rounded-none sm:rounded-3xl border-x-0 sm:border-x border-y overflow-hidden shadow-none sm:shadow-2xl transition-colors ${
        isLightMode
          ? isProtocol
            ? 'border-purple-200 bg-white'
            : 'border-emerald-200 bg-white'
          : isProtocol
            ? 'border-purple-500/35 bg-gradient-to-br from-purple-950/25 via-slate-900/95 to-slate-950'
            : 'border-emerald-500/35 bg-gradient-to-br from-emerald-950/25 via-slate-900/95 to-slate-950'
      }`}
    >
      {/* 1. SOCIAL-MEDIA STYLE TALLER HERO COVER BANNER (With #Steps/Time, +Score LEVL Logo, Creator, & Hook Stats Overlaid) */}
      <div className="relative w-full min-h-[440px] sm:min-h-[510px] flex flex-col justify-between p-4 sm:p-7 overflow-hidden bg-slate-950">
        <img
          src={item.heroImageUrl}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(2,6,23,0.76) 0%, rgba(2,6,23,0.12) 24%, rgba(2,6,23,0.22) 44%, rgba(2,6,23,0.90) 68%, rgba(2,6,23,0.98) 100%)'
          }}
        />

        {/* Top Row: # Steps & Time (Left) + Bright Green Score & Official LEVL Logo (Right) */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider border backdrop-blur-md ${
              isProtocol
                ? 'bg-slate-950/80 text-purple-200 border-purple-400/50'
                : 'bg-slate-950/80 text-emerald-200 border-emerald-400/50'
            }`}
          >
            {isProtocol ? '🧬 Protocol' : '⚡ Modality'} • {stepsBadge}
          </span>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-400">
              {scoreNumber}
            </span>
            <img
              src="/images/discover/levl_logo_official.png"
              alt="LEVL"
              className="h-4 sm:h-5 w-auto object-contain"
            />
          </div>
        </div>

        {/* Bottom Stack: Title + Creator Attribution + Promise + 3 Hook Stat Cards */}
        <div className="relative z-10 space-y-3 pt-28 sm:pt-36">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {item.name}
            </h2>

            {/* Creator Avatar + Creator Name & Affiliation */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <img
                src={creatorAvatarUrl}
                alt={creatorName}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-emerald-400/60"
              />
              <span className="text-xs sm:text-sm font-extrabold text-emerald-300">
                {creatorName}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                {creatorAffiliation}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm font-medium text-slate-200 leading-relaxed max-w-3xl">
              {item.oneLinePromise}
            </p>
          </div>

          {/* 3 Prominent Hook Stat Cards Overlaid at Bottom of Hero Image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {item.hookStats.map((stat, idx) => {
              const borderClass =
                stat.accent === 'emerald'
                  ? 'border-emerald-400/45 text-emerald-300'
                  : stat.accent === 'cyan'
                    ? 'border-cyan-400/45 text-cyan-300'
                    : stat.accent === 'purple'
                      ? 'border-purple-400/45 text-purple-300'
                      : 'border-amber-400/45 text-amber-300'

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border bg-slate-950/85 backdrop-blur-md p-3 sm:p-3.5 flex flex-col justify-between ${borderClass}`}
                >
                  <div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-snug">
                    {stat.sublabel}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="p-3.5 sm:p-8 space-y-6">

        {/* 3. PROMINENT KEY BENEFITS GRID */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border ${
            isLightMode
              ? 'bg-slate-50 border-slate-200'
              : 'bg-slate-900/90 border-white/10'
          }`}
        >
          <div
            className={`text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${
              isLightMode ? 'text-emerald-700' : 'text-emerald-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Key Longevity & Performance Benefits
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {item.keyBenefits.map((benefit, bIdx) => (
              <div
                key={bIdx}
                className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                  isLightMode
                    ? 'bg-white border-slate-200/90 text-slate-800'
                    : 'bg-slate-950/70 border-white/5 text-slate-200'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isLightMode ? 'text-emerald-600' : 'text-emerald-400'
                  }`}
                />
                <span className="text-xs sm:text-sm font-medium leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Is Included This Week */}
        <div
          className={`p-4 rounded-2xl border ${
            isLightMode
              ? 'bg-white border-slate-200'
              : 'bg-slate-900/85 border-white/10'
          }`}
        >
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isLightMode ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            <span className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Why it is included this week:{' '}
            </span>
            {item.whyIncluded}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-semibold ${
                isLightMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Verified Clinical Sources:
            </span>
            {item.pubmedLinks.map(link => (
              <a
                key={link.pmid}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  isLightMode
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100'
                    : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/25'
                }`}
              >
                📄 {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Numbered Steps FIRST (Before the Telemetry Graphs) with Dosing Tier Toggle */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className={`text-base sm:text-lg font-bold ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Numbered Steps (
              {scalingMode === 'optimal' ? 'Clinical Optimal Dosing' : 'Beginner Entry Scaling'}):
            </h3>

            {/* Beginner vs Optimal Scaling Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Dosing Tier:
              </span>
              <div
                className={`inline-flex rounded-xl p-1 border ${
                  isLightMode
                    ? 'bg-slate-100 border-slate-200'
                    : 'bg-slate-950 border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setScalingMode('beginner')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    scalingMode === 'beginner'
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : isLightMode
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🌱 Beginner ({item.levlScoreBeginner})
                </button>
                <button
                  type="button"
                  onClick={() => setScalingMode('optimal')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    scalingMode === 'optimal'
                      ? 'bg-cyan-400 text-slate-950 shadow'
                      : isLightMode
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ⚡ Optimal ({item.levlScoreOptimal})
                </button>
              </div>
            </div>
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
                  className={`p-4 rounded-2xl border transition-all ${
                    isLightMode
                      ? 'bg-slate-50/90 border-slate-200 hover:border-cyan-400'
                      : 'bg-slate-900/90 border-white/10 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full border text-xs font-extrabold flex items-center justify-center ${
                          isLightMode
                            ? 'bg-cyan-100 border-cyan-300 text-cyan-800'
                            : 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <span
                        className={`font-bold text-sm sm:text-base ${
                          isLightMode ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}
                      >
                        ({step.timingAndFrequency})
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        scalingMode === 'optimal'
                          ? isLightMode
                            ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                            : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
                          : isLightMode
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                      }`}
                    >
                      {activeBadge}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed pl-8 ${
                      isLightMode ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    {activeInstruction}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Beginner Scaling Note & Cautions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isLightMode
                ? scalingMode === 'beginner'
                  ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-300'
                  : 'bg-emerald-50/50 border-emerald-200'
                : scalingMode === 'beginner'
                  ? 'bg-emerald-950/40 border-emerald-400/50 ring-1 ring-emerald-400/30'
                  : 'bg-slate-900/80 border-emerald-500/25'
            }`}
          >
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLightMode ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              <span
                className={`font-bold ${
                  isLightMode ? 'text-emerald-800' : 'text-emerald-300'
                }`}
              >
                Beginner Scaling Note:{' '}
              </span>
              {item.beginnerScalingNote}
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border ${
              isLightMode
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-amber-950/20 border-amber-500/30'
            }`}
          >
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLightMode ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              <span
                className={`font-bold ${isLightMode ? 'text-amber-800' : 'text-amber-300'}`}
              >
                Cautions:{' '}
              </span>
              {item.cautions}
            </p>
          </div>
        </div>

        {/* Interactive Telemetry & Vectors Graph Card (Placed AFTER Steps) */}
        <div
          className={`rounded-2xl border overflow-hidden shadow-lg ${
            isLightMode
              ? 'border-slate-200 bg-slate-50/70'
              : 'border-cyan-500/30 bg-slate-950/95'
          }`}
        >
          {/* Top Controls: Visual View Toggle */}
          <div
            className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
              isLightMode
                ? 'bg-white border-slate-200'
                : 'bg-slate-900/95 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                  isLightMode
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                    : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                24-Hour Biological Telemetry &amp; Vectors
              </span>
            </div>

            {/* Graph / Onset / Vectors View Switcher */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setVisualTab('telemetry')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  visualTab === 'telemetry'
                    ? 'bg-cyan-500 text-slate-950'
                    : isLightMode
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                📈 24h Telemetry Curve
              </button>
              <button
                type="button"
                onClick={() => setVisualTab('onset')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  visualTab === 'onset'
                    ? 'bg-emerald-500 text-slate-950'
                    : isLightMode
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                🎯 Onset Timeline
              </button>
              <button
                type="button"
                onClick={() => setVisualTab('vectors')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  visualTab === 'vectors'
                    ? 'bg-purple-500 text-white'
                    : isLightMode
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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
              <BiologicalTelemetryCurveCard
                curves={[item.curveSpec]}
                isLightMode={isLightMode}
              />
            )}

            {visualTab === 'onset' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {item.onsetPhases.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border space-y-1.5 ${
                      isLightMode
                        ? 'bg-white border-slate-200 shadow-2xs'
                        : 'bg-slate-900/90 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isLightMode ? 'text-cyan-800' : 'text-cyan-300'
                        }`}
                      >
                        {p.phase}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                          isLightMode
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                        }`}
                      >
                        {p.window}
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLightMode ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {visualTab === 'vectors' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Targeted Biological Longevity Vectors &amp; Quantified Biomarker Shifts
                  </h4>
                  <span className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Calibrated 0–100 Clinical Rubric
                  </span>
                </div>
                <div className="space-y-2.5">
                  {item.vectorScores.map(vec => (
                    <div key={vec.vectorName} className="space-y-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span
                          className={`font-semibold ${
                            isLightMode ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          {vec.vectorName}
                        </span>
                        <span
                          className={`font-bold ${
                            isLightMode ? 'text-cyan-800' : 'text-cyan-300'
                          }`}
                        >
                          {vec.score}/100 • {vec.effectStat}
                        </span>
                      </div>
                      <div
                        className={`w-full h-2.5 rounded-full border overflow-hidden ${
                          isLightMode
                            ? 'bg-slate-200 border-slate-300'
                            : 'bg-slate-900 border-white/10'
                        }`}
                      >
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

          {/* Bottom Action Bar: Deep-Link to LEVL Discovery */}
          <div
            className={`px-4 py-3 border-t flex flex-wrap items-center justify-between gap-3 ${
              isLightMode
                ? 'bg-white border-slate-200'
                : 'bg-slate-900/95 border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={item.exploreDeepLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity shadow-md"
              >
                <Compass className="w-4 h-4" />
                Open Interactive Card in LEVL Discovery
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/today"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors ${
                  isLightMode
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-white/10'
                }`}
              >
                <Calendar className={`w-4 h-4 ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`} />
                Go to Today Timeline
              </Link>
            </div>
          </div>
        </div>

        <p className={`text-xs italic ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
          {item.disclaimer}
        </p>
      </div>
    </section>
  )
}

/**
 * Generates clean HTML & plain-text newsletter copy for 1-click pasting into Beehiiv.
 * Links directly to `https://levlhealth.com/newsletter/<shortSlug>`!
 */
export function buildBeehiivRichHtmlAndText(issue: OutpaceAgingIssue) {
  const siteOrigin = 'https://www.levlhealth.com'
  const canonicalIssueUrl = `${siteOrigin}/newsletter/${issue.shortSlug}`
  const htmlParts: string[] = []
  const textParts: string[] = []

  htmlParts.push(`<h1>${issue.title}</h1>`)
  htmlParts.push(
    `<p><strong>${issue.dateLabel} | Edition #${issue.issueNumber}</strong> • <a href="${canonicalIssueUrl}">Read Interactive Web Edition on LEVL →</a></p>`
  )
  htmlParts.push(`<p><strong>Longevity Escape Velocity (LEV) State of Play:</strong> ${issue.levStateOfPlayParagraph}</p>`)
  htmlParts.push(
    `<p><a href="${canonicalIssueUrl}"><img src="${siteOrigin}/api/newsletter/card-png?slug=${issue.shortSlug}&type=lev" alt="Longevity Escape Velocity State of Play KPIs" width="600" style="width: 100%; max-width: 680px; height: auto; border-radius: 16px; display: block; margin: 16px 0;" /></a></p>`
  )
  htmlParts.push(`<p>${issue.introSummaryParagraph}</p>`)
  htmlParts.push(`<hr />`)

  textParts.push(`${issue.title}`)
  textParts.push(
    `${issue.dateLabel} | Edition #${issue.issueNumber} • Interactive Web Edition: ${canonicalIssueUrl}\n`
  )
  textParts.push(`${issue.levStateOfPlayParagraph}\n`)
  textParts.push(
    `• Estimated LEV Date • Optimal (Top 1%): October 2036 (26 days closer this week)\n• Estimated LEV Date • Active (Top 20%): February 2042 (16 days closer this week)\n• Current Pace of Aging: 0.67 Optimal vs 0.84 Active bio-yrs/yr (-0.0035 yr/yr this week)\n`
  )
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
      `<p><a href="${canonicalIssueUrl}#${s.id}"><img src="${siteOrigin}/api/newsletter/card-png?slug=${issue.shortSlug}&type=study&num=${s.number}" alt="${s.visualSpec.chartTitle}" width="600" style="width: 100%; max-width: 680px; height: auto; border-radius: 16px; display: block; margin: 16px 0;" /></a></p>`
    )
    textParts.push(
      `[${s.visualSpec.chartTitle}: ${s.visualSpec.cohortBars
        .slice(0, 3)
        .map(b => `${b.label}: ${b.deltaText}`)
        .join(' | ')} -> ${canonicalIssueUrl}#${s.id}]\n`
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
    htmlParts.push(
      `<p><a href="${siteOrigin}${item.exploreDeepLink}"><img src="${siteOrigin}/api/newsletter/card-png?slug=${issue.shortSlug}&type=${item.kind}-hero" alt="${item.name}" width="600" style="width: 100%; max-width: 680px; height: auto; border-radius: 16px; display: block; margin: 14px 0;" /></a></p>`
    )
    htmlParts.push(`<p><strong>One-line promise:</strong> ${item.oneLinePromise}</p>`)
    htmlParts.push(
      `<p><strong>Key Outcomes:</strong> ${item.hookStats
        .map(st => `${st.value} ${st.label} (${st.sublabel})`)
        .join(' • ')}</p>`
    )
    htmlParts.push(
      `<p><strong>Why it is included this week:</strong> ${item.whyIncluded}<br />Source links: ${item.pubmedLinks
        .map(l => `<a href="${l.url}">${l.url}</a>`)
        .join(' and ')}</p>`
    )
    htmlParts.push(`<p><strong>Numbered Steps:</strong></p><ol>`)

    textParts.push(`${headingPrefix}: ${item.name}\n`)
    textParts.push(`One-line promise: ${item.oneLinePromise}\n`)
    textParts.push(
      `Why it is included this week: ${item.whyIncluded}\nSource links: ${item.pubmedLinks
        .map(l => l.url)
        .join(' and ')}\n`
    )
    textParts.push(`Numbered Steps:`)

    for (const step of item.steps) {
      htmlParts.push(
        `<li><strong>${step.title} (${step.timingAndFrequency}) — ${step.optimalDoseBadge}:</strong> ${step.optimalInstruction}</li>`
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
      `<p><a href="${siteOrigin}${item.exploreDeepLink}"><img src="${siteOrigin}/api/newsletter/card-png?slug=${issue.shortSlug}&type=${item.kind}" alt="${item.curveSpec.title}" width="600" style="width: 100%; max-width: 680px; height: auto; border-radius: 16px; display: block; margin: 16px 0;" /></a></p>`
    )
    htmlParts.push(
      `<p><a href="${siteOrigin}${item.exploreDeepLink}"><strong>Try ${item.name} interactively in the LEVL app →</strong></a></p>`
    )
    htmlParts.push(`<p><em>${item.disclaimer}</em></p><hr />`)

    textParts.push(`Beginner Scaling Note: ${item.beginnerScalingNote}\n`)
    textParts.push(`Cautions: ${item.cautions}\n`)
    textParts.push(
      `Try ${item.name} interactively in the LEVL app: ${siteOrigin}${item.exploreDeepLink}\n`
    )
    textParts.push(`${item.disclaimer}\n------------------------------------------------------------\n`)
  }

  htmlParts.push(`<h2>Closing</h2>`)
  htmlParts.push(`<p>${issue.closingParagraph}</p>`)
  htmlParts.push(
    `<p><strong>About LEVL:</strong> ${issue.aboutLevlParagraph.replace(
      'levlhealth.com',
      `<a href="${siteOrigin}">levlhealth.com</a>`
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
  const [isLightMode, setIsLightMode] = useState<boolean>(false)
  const [copiedRich, setCopiedRich] = useState(false)
  const [copiedPlain, setCopiedPlain] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('levl_newsletter_theme')
      if (saved === 'light') {
        setIsLightMode(true)
        document.documentElement.style.colorScheme = 'light'
      } else {
        document.documentElement.style.colorScheme = 'dark'
      }
    } catch {}
  }, [])

  const handleToggleTheme = useCallback(() => {
    setIsLightMode(prev => {
      const next = !prev
      try {
        localStorage.setItem('levl_newsletter_theme', next ? 'light' : 'dark')
        document.documentElement.style.colorScheme = next ? 'light' : 'dark'
      } catch {}
      return next
    })
  }, [])

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

  const handleDownloadBeehiivHtml = useCallback(() => {
    const { html } = buildBeehiivRichHtmlAndText(issue)
    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${issue.title} — Edition #${issue.issueNumber}</title>
</head>
<body style="max-width: 680px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a;">
${html}
</body>
</html>`
    const blob = new Blob([fullDoc], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `outpace-aging-${issue.shortSlug}-beehiiv.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
    <div
      className={`min-h-screen pb-28 transition-colors ${
        isLightMode
          ? 'bg-[#F8FAFC] text-slate-900'
          : 'bg-[#060913] text-slate-100'
      }`}
    >
      {/* Top Sticky Editorial Bar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isLightMode
            ? 'bg-white/90 border-slate-200'
            : 'bg-slate-950/85 border-white/10'
        }`}
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <Link
              href="/newsletter"
              className={`h-8 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 rounded-lg border whitespace-nowrap transition-colors ${
                isLightMode
                  ? 'text-cyan-800 hover:text-cyan-950 bg-cyan-50 border-cyan-200'
                  : 'text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 border-cyan-400/30'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
              <span>All Editions</span>
            </Link>
            <div className="flex items-center gap-2">
              <span
                className={`h-8 inline-flex items-center px-2.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider border whitespace-nowrap ${
                  isLightMode
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-400/30'
                }`}
              >
                Edition #{issue.issueNumber}
              </span>
              <span
                className={`text-xs hidden md:inline whitespace-nowrap ${
                  isLightMode ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {issue.dateLabel} • /newsletter/{issue.shortSlug}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Light / Dark Mode Toggle (Symbol Only, h-8) */}
            <button
              type="button"
              onClick={handleToggleTheme}
              aria-pressed={isLightMode}
              aria-label={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className={`h-8 w-8 inline-flex items-center justify-center rounded-lg border shrink-0 transition-colors cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
              }`}
            >
              {isLightMode ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-300" />
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyShareUrl}
              className={`h-8 inline-flex items-center justify-center gap-1.5 px-2.5 rounded-lg text-xs font-semibold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
              title={canonicalUrl}
            >
              {copiedUrl ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              ) : (
                <Share2 className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="hidden sm:inline">{copiedUrl ? 'Copied!' : 'Share'}</span>
            </button>

            {/* Subscribe / Subscribed Pill (h-8) */}
            <NewsletterHeaderSubscribeButton isLightMode={isLightMode} />

            {/* Mode Switcher: Interactive vs Simple (h-8) */}
            <div
              className={`h-8 inline-flex items-center rounded-lg p-0.5 border shrink-0 ${
                isLightMode
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-slate-900 border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setPageMode('web_canonical')}
                className={`h-full inline-flex items-center gap-1 px-2.5 rounded-md text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  pageMode === 'web_canonical'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-xs'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>Interactive</span>
              </button>
              <button
                type="button"
                onClick={() => setPageMode('beehiiv_studio')}
                className={`h-full inline-flex items-center gap-1 px-2.5 rounded-md text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  pageMode === 'beehiiv_studio'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-xs'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>Simple</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-0 sm:px-6 pt-3 sm:pt-8 space-y-5 sm:space-y-10">
        {pageMode === 'beehiiv_studio' ? (
          /* =====================================================================
             SIMPLE EMAIL VIEW (Matches what a subscriber sees in their inbox)
             ===================================================================== */
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Email Container (Zero outer border on mobile so content goes edge-to-edge!) */}
            <div
              className={`rounded-none sm:rounded-3xl border-0 sm:border px-3.5 py-4 sm:p-10 shadow-none sm:shadow-xl space-y-7 ${
                isLightMode
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-slate-950 border-white/15 text-slate-100'
              }`}
            >
              {/* Email Header & Intro */}
              <div className="space-y-4 border-b pb-6 border-slate-500/20">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    LEVL Weekly Longevity Roundup • {issue.dateLabel} • Edition #{issue.issueNumber}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyBeehiivRich}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isLightMode
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {copiedRich ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Outpace Aging</h1>
                <p className={`text-base font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  {issue.subtitle}
                </p>

                {/* LEV State of Play + Compact 3-Card KPI Strip Image (Zero Extra Wrapper Border!) */}
                <div className="space-y-3 pt-1">
                  <div
                    className={`text-[11px] font-extrabold uppercase tracking-wider ${
                      isLightMode ? 'text-emerald-800' : 'text-emerald-300'
                    }`}
                  >
                    🚀 Longevity Escape Velocity (LEV) State of Play
                  </div>
                  <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                    {issue.levStateOfPlayParagraph}
                  </p>
                  <img
                    src={`/api/newsletter/card-png?slug=${issue.shortSlug}&type=lev`}
                    alt="Longevity Escape Velocity (LEV) State of Play KPIs"
                    className="w-full h-auto rounded-xl block"
                  />
                </div>

                {/* Rest of Intro right after */}
                <p className={`text-sm sm:text-base leading-relaxed pt-1 ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                  {issue.introSummaryParagraph}
                </p>
              </div>

              {/* 5 Studies in Simple Email Format */}
              <div className="space-y-8">
                {issue.studies.map(study => (
                  <article
                    key={study.id}
                    className={`space-y-3.5 pb-8 border-b ${
                      isLightMode ? 'border-slate-200' : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className={`font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Study #{study.number} • {study.journal} ({study.publishDate})
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-extrabold border ${
                          isLightMode
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                        }`}
                      >
                        {study.keyStatBadge}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold leading-snug">
                      {study.number}. {study.headline}
                    </h2>

                    <div className={`space-y-3 text-sm leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                      {study.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Real PNG Graph Card Image (Placed before Limits so it copies as an image) */}
                    <div className="my-3">
                      <img
                        src={`/api/newsletter/card-png?slug=${issue.shortSlug}&type=study&num=${study.number}`}
                        alt={study.visualSpec.chartTitle}
                        className="w-full h-auto rounded-2xl shadow-md block"
                      />
                    </div>

                    <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                      <strong className={isLightMode ? 'text-amber-800' : 'text-amber-300'}>Limits: </strong>
                      {study.limits}
                    </p>

                    <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                      <strong className={isLightMode ? 'text-emerald-800' : 'text-emerald-300'}>Future Implications: </strong>
                      {study.futureImplications}
                    </p>

                    <div className="text-xs pt-1">
                      <a
                        href={study.studyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-bold underline ${isLightMode ? 'text-cyan-700' : 'text-cyan-300'}`}
                      >
                        Study link: {study.studyUrl}
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Protocol & Modality in Simple Email Format (Social-Media Hero Cover Image -> Steps -> Vector Graph Image) */}
              {[issue.protocolOfTheWeek, issue.modalityOfTheWeek].map(item => (
                <section
                  key={item.id}
                  className={`space-y-4 pb-8 border-b ${
                    isLightMode ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-500">
                    {item.kind === 'protocol' ? '🧬 Protocol of the Week' : '⚡ Modality of the Week'} • {item.badgeText}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold">{item.name}</h2>

                  {/* Taller Social-Media Style Hero Cover PNG (with #Steps/Time, +Score LEVL Logo, Creator, & Hook Stats) */}
                  <img
                    src={`/api/newsletter/card-png?slug=${issue.shortSlug}&type=${item.kind}-hero`}
                    alt={item.name}
                    className="w-full h-auto rounded-2xl shadow-md block"
                  />

                  <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                    <strong>Why it is included this week: </strong>
                    {item.whyIncluded}
                  </p>

                  {/* Numbered Steps FIRST (Before the Telemetry Graph Image) */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider">Numbered Steps:</h3>
                    {item.steps.map(step => (
                      <div
                        key={step.stepNumber}
                        className={`p-3 rounded-xl border text-xs sm:text-sm space-y-1 ${
                          isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-white/10'
                        }`}
                      >
                        <div className="font-bold">
                          {step.stepNumber}. {step.title} ({step.timingAndFrequency}) —{' '}
                          <span className="font-mono text-emerald-500">{step.optimalDoseBadge}</span>
                        </div>
                        <p className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>{step.optimalInstruction}</p>
                      </div>
                    ))}
                  </div>

                  {/* Real PNG Vector & Telemetry Card Image AFTER Steps */}
                  <div className="my-3">
                    <img
                      src={`/api/newsletter/card-png?slug=${issue.shortSlug}&type=${item.kind}`}
                      alt={item.curveSpec.title}
                      className="w-full h-auto rounded-2xl shadow-md block"
                    />
                  </div>
                </section>
              ))}

              {/* Closing & About LEVL */}
              <div className="space-y-3 text-sm leading-relaxed">
                <h3 className="text-base font-extrabold">Closing</h3>
                <p className={isLightMode ? 'text-slate-700' : 'text-slate-200'}>{issue.closingParagraph}</p>
                <p className={`pt-2 ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                  <strong>About LEVL: </strong>
                  {issue.aboutLevlParagraph}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Newsletter Hero & Opening Intro */}
        <section
          className={`rounded-none sm:rounded-3xl border-x-0 sm:border-x border-y px-3.5 py-5 sm:p-10 shadow-none sm:shadow-xl space-y-6 transition-colors ${
            isLightMode
              ? 'border-slate-200 bg-white'
              : 'border-white/15 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isLightMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              LEVL Weekly Longevity Roundup
            </span>
            <span className={`text-xs font-medium ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {issue.dateLabel} • Edition #{issue.issueNumber} • {issue.readTimeLabel}
            </span>
          </div>

          <div>
            <h1
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.12] ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Outpace Aging
            </h1>
            <p
              className={`mt-2 text-base sm:text-lg font-medium ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {issue.subtitle}
            </p>
          </div>

          {/*Newsletter Signup in Hero (Auto-hides if reader is already subscribed) */}
          <NewsletterSignupBanner
            isLightMode={isLightMode}
            variant="hero"
            issueSlug={issue.shortSlug}
            source="newsletter_issue_hero"
          />

          {/* Paragraph 1: LEV State of Play + Compact LEV KPIs directly underneath (Zero extra border on mobile!) */}
          <div
            className={`p-0 sm:p-5 rounded-none sm:rounded-2xl border-0 sm:border space-y-3.5 ${
              isLightMode
                ? 'sm:bg-emerald-50/70 sm:border-emerald-200'
                : 'sm:bg-gradient-to-r sm:from-emerald-950/40 sm:via-cyan-950/30 sm:to-slate-900/80 sm:border-emerald-500/30'
            }`}
          >
            <div>
              <div
                className={`text-[11px] font-extrabold uppercase tracking-wider mb-1.5 ${
                  isLightMode ? 'text-emerald-800' : 'text-emerald-300'
                }`}
              >
                🚀 Longevity Escape Velocity (LEV) State of Play
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLightMode ? 'text-slate-800' : 'text-slate-100'
                }`}
              >
                {issue.levStateOfPlayParagraph}
              </p>
            </div>

            {/* Compact LEV KPIs right under the State of Play text (everything else collapsed by default) */}
            <FutureGraphLevPulseWidget
              issue={issue}
              isLightMode={isLightMode}
              embeddedInIntro={true}
            />
          </div>

          {/* Paragraph 2: Weekly Spotlight + Lead-in to Protocol & Modality */}
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isLightMode ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            {issue.introSummaryParagraph}
          </p>

          {/* 3 Connecting Themes Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {issue.themes.map(t => (
              <div
                key={t.id}
                className={`p-3.5 rounded-2xl border space-y-1 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-slate-900/85 border-white/10'
                }`}
              >
                <div
                  className={`text-xs font-bold ${
                    isLightMode ? 'text-cyan-800' : 'text-cyan-300'
                  }`}
                >
                  {t.title}
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isLightMode ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {t.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Jump Anchors */}
          <div
            className={`pt-3 flex flex-wrap items-center gap-2 border-t ${
              isLightMode ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            <span
              className={`text-xs font-semibold mr-1 ${
                isLightMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Jump to:
            </span>
            {issue.studies.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                  isLightMode
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
                }`}
              >
                #{s.number} {s.themeTag}
              </a>
            ))}
            <a
              href={`#${issue.protocolOfTheWeek.id}`}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                isLightMode
                  ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                  : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-purple-400/35'
              }`}
            >
              🧬 Protocol of the Week
            </a>
            <a
              href={`#${issue.modalityOfTheWeek.id}`}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                isLightMode
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-400/35'
              }`}
            >
              ⚡ Modality of the Week
            </a>
          </div>
        </section>

        {/* Five Study Briefings */}
        <div className="space-y-6 sm:space-y-8">
          {issue.studies.map(study => {
            const style = ACCENT_STYLES[study.accentColor]
            return (
              <article
                key={study.id}
                id={study.id}
                className={`rounded-none sm:rounded-3xl border-x-0 sm:border-x border-y bg-gradient-to-b px-3.5 py-5 sm:p-8 shadow-none sm:shadow-xl transition-colors ${
                  isLightMode
                    ? `${style.lightBorder} ${style.lightGlow}`
                    : `${style.border} ${style.glow}`
                }`}
              >
                {/* Study Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-black ${
                        isLightMode ? style.lightNumberBg : style.numberBg
                      }`}
                    >
                      {study.number}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isLightMode ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {study.journal} • {study.publishDate}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                      isLightMode
                        ? `${style.lightBadgeBg} ${style.lightBadgeText}`
                        : `${style.badgeBg} ${style.badgeText}`
                    }`}
                  >
                    {study.keyStatBadge}
                  </span>
                </div>

                {/* Numbered Headline */}
                <h2
                  className={`text-xl sm:text-2xl font-extrabold leading-snug ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {study.number}. {study.headline}
                </h2>

                {/* 3 Core Paragraphs (Question, Method, Findings) */}
                <div
                  className={`mt-4 space-y-4 text-sm sm:text-base leading-relaxed ${
                    isLightMode ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  {study.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Interactive LEVL Visual Card Placed Right Before Limits */}
                <StudyInteractiveCard
                  study={study}
                  issueShortSlug={issue.shortSlug}
                  isLightMode={isLightMode}
                />

                {/* Limits & Future Implications Blocks */}
                <div className="space-y-3 mt-5">
                  <div
                    className={`p-4 rounded-2xl border ${
                      isLightMode
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-slate-900/90 border-white/10'
                    }`}
                  >
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLightMode ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <span
                        className={`font-bold ${
                          isLightMode ? 'text-amber-800' : 'text-amber-300'
                        }`}
                      >
                        Limits:{' '}
                      </span>
                      {study.limits}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${
                      isLightMode
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-emerald-950/25 border-emerald-500/30'
                    }`}
                  >
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLightMode ? 'text-slate-800' : 'text-slate-100'
                      }`}
                    >
                      <span
                        className={`font-bold ${
                          isLightMode ? 'text-emerald-800' : 'text-emerald-300'
                        }`}
                      >
                        Future Implications:{' '}
                      </span>
                      {study.futureImplications}
                    </p>
                  </div>
                </div>

                {/* Primary Source Link */}
                <div
                  className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                    isLightMode ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  <span
                    className={`font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}
                  >
                    {study.doiLabel}
                  </span>
                  <a
                    href={study.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 font-bold ${
                      isLightMode
                        ? 'text-cyan-700 hover:text-cyan-900'
                        : 'text-cyan-300 hover:text-cyan-200'
                    }`}
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
          isLightMode={isLightMode}
        />

        {/* Modality of the Week */}
        <ActionableProtocolModalitySection
          item={issue.modalityOfTheWeek}
          issueShortSlug={issue.shortSlug}
          isLightMode={isLightMode}
        />

        {/* Closing & About LEVL */}
        <section
          className={`rounded-none sm:rounded-3xl border-x-0 sm:border-x border-y px-3.5 py-5 sm:p-8 shadow-none sm:shadow-xl space-y-5 transition-colors ${
            isLightMode
              ? 'border-slate-200 bg-white'
              : 'border-white/15 bg-slate-900/90'
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-extrabold ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Closing
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isLightMode ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            {issue.closingParagraph}
          </p>

          {/* Closing Newsletter Signup Bar (Shows confirmation if already subscribed) */}
          <NewsletterSignupBanner
            isLightMode={isLightMode}
            variant="closing"
            issueSlug={issue.shortSlug}
            source="newsletter_issue_closing"
          />

          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isLightMode
                ? 'bg-gradient-to-r from-cyan-50 via-white to-emerald-50 border-cyan-200'
                : 'bg-gradient-to-r from-cyan-950/50 via-slate-900 to-emerald-950/40 border-cyan-500/30'
            }`}
          >
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isLightMode ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              <span className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                About LEVL:{' '}
              </span>
              {issue.aboutLevlParagraph}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/newsletter"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border ${
                  isLightMode
                    ? 'bg-white text-cyan-800 hover:bg-slate-50 border-cyan-300'
                    : 'bg-slate-800 text-cyan-300 hover:bg-slate-700 border-cyan-500/30'
                }`}
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border ${
                  isLightMode
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border-white/10'
                }`}
              >
                <Calendar className={`w-4 h-4 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
                Open My Today Routine
              </Link>
            </div>
          </div>
        </section>
          </>
        )}
      </main>
    </div>
  )
}
