'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Search,
  Globe,
  Mail,
  Activity,
  Microscope,
  Compass,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Layers,
  Zap,
  Clock
} from 'lucide-react'
import { OUTPACE_AGING_ISSUES } from '@/lib/data/outpaceAgingIssues'
import FutureGraphLevPulseWidget from '@/components/newsletter/FutureGraphLevPulseWidget'

type CatalogTab = 'editions' | 'studies' | 'protocols'

export default function OutpaceAgingCatalogPage() {
  const [activeTab, setActiveTab] = useState<CatalogTab>('editions')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string>('all')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const allThemes = useMemo(() => {
    const tags = new Set<string>()
    OUTPACE_AGING_ISSUES.forEach(issue => {
      issue.studies.forEach(s => tags.add(s.themeTag))
    })
    return ['all', ...Array.from(tags)]
  }, [])

  const filteredIssues = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return OUTPACE_AGING_ISSUES.filter(issue => {
      const matchesTheme =
        selectedTheme === 'all' ||
        issue.studies.some(s => s.themeTag === selectedTheme)
      if (!matchesTheme) return false
      if (!q) return true
      const hay = [
        issue.title,
        issue.subtitle,
        issue.dateLabel,
        issue.levStateOfPlayParagraph,
        issue.introSummaryParagraph,
        issue.protocolOfTheWeek.name,
        issue.modalityOfTheWeek.name,
        ...issue.studies.map(s => `${s.headline} ${s.journal} ${s.themeTag} ${s.keyStatBadge}`)
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [searchQuery, selectedTheme])

  const allStudiesFlattened = useMemo(() => {
    const list: {
      issueNumber: number
      issueShortSlug: string
      issueDate: string
      study: (typeof OUTPACE_AGING_ISSUES)[0]['studies'][0]
    }[] = []
    OUTPACE_AGING_ISSUES.forEach(issue => {
      issue.studies.forEach(study => {
        const matchesTheme = selectedTheme === 'all' || study.themeTag === selectedTheme
        const q = searchQuery.trim().toLowerCase()
        const matchesQuery =
          !q ||
          `${study.headline} ${study.journal} ${study.themeTag} ${study.keyStatBadge} ${study.paragraphs.join(' ')}`
            .toLowerCase()
            .includes(q)
        if (matchesTheme && matchesQuery) {
          list.push({
            issueNumber: issue.issueNumber,
            issueShortSlug: issue.shortSlug,
            issueDate: issue.dateLabel,
            study
          })
        }
      })
    })
    return list
  }, [searchQuery, selectedTheme])

  const handleCopyUrl = useCallback(async (shortSlug: string) => {
    const url = `https://levlhealth.com/newsletter/${shortSlug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedSlug(shortSlug)
      setTimeout(() => setCopiedSlug(null), 2500)
    } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 pb-28">
      {/* Top Sticky Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/explore?mode=discover"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              LEVL App
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-400/30">
                Outpace Aging Catalog
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                levlhealth.com/newsletter
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/newsletter/edition-1"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity shadow"
            >
              <Globe className="w-3.5 h-3.5" />
              Latest Issue (#1)
            </Link>
            <Link
              href="/newsletter/edition-1?mode=beehiiv"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-400/35 hover:bg-amber-500/25 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Beehiiv Studio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Catalog Hero Masthead */}
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-[#071120] p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              LEVL Weekly Longevity Roundup • Interactive Archive
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">
              Outpace Aging
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Every week, we distill the five most important primary-source breakthroughs in longevity science into interactive biological telemetry curves, plain-English mechanisms, and one Protocol + one Modality you can launch directly in the LEVL app to slow your pace of aging and reach longevity escape velocity.
            </p>
          </div>

          {/* 4 Archive Pillar Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
              <div className="text-xs font-extrabold text-emerald-300">5 Breakthroughs / Week</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                100% primary-source verified with direct DOIs & plain-fact limits
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
              <div className="text-xs font-extrabold text-cyan-300">Interactive LEVL Telemetry</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Toggle between plain-English curves, Geek Mode cascades & trial data
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
              <div className="text-xs font-extrabold text-purple-300">1 Protocol + 1 Modality</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Interactive Beginner vs. Optimal dosing toggles in every edition
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
              <div className="text-xs font-extrabold text-amber-300">Unique Weekly URLs</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Clean permanent links (/newsletter/edition-1) + Beehiiv PNG exporter
              </div>
            </div>
          </div>
        </section>

        {/* Live Two-Way FutureGraph LEV & Pace of Aging Observatory */}
        <FutureGraphLevPulseWidget
          issue={OUTPACE_AGING_ISSUES[0]}
          compact={true}
          showPublisherSync={true}
        />

        {/* Catalog Controls: View Tabs + Search + Theme Filter */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* 3 Catalog Lenses */}
            <div className="inline-flex rounded-xl p-1 bg-slate-950 border border-white/10 self-start">
              <button
                type="button"
                onClick={() => setActiveTab('editions')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'editions'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Weekly Editions ({OUTPACE_AGING_ISSUES.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('studies')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'studies'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                Breakthrough Studies Vault ({allStudiesFlattened.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('protocols')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'protocols'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Featured Protocols & Modalities ({OUTPACE_AGING_ISSUES.length * 2})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search studies, molecules (NAD+, Gpnmb, FGF13), journals, or protocols..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          {/* Theme Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
              Filter by Frontier Theme:
            </span>
            {allThemes.map(theme => (
              <button
                key={theme}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedTheme === theme
                    ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {theme === 'all' ? 'All Themes' : theme}
              </button>
            ))}
          </div>
        </section>

        {/* =====================================================================
            TAB 1: WEEKLY EDITIONS ARCHIVE
           ===================================================================== */}
        {activeTab === 'editions' && (
          <div className="space-y-8">
            {filteredIssues.map(issue => (
              <div
                key={issue.slug}
                className="rounded-3xl border border-emerald-500/35 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 p-6 sm:p-8 shadow-2xl space-y-6"
              >
                {/* Edition Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950">
                      Edition #{issue.issueNumber} • Latest Release
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {issue.dateLabel} • {issue.readTimeLabel}
                    </span>
                    <code className="text-xs font-mono text-cyan-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-white/10">
                      levlhealth.com/newsletter/{issue.shortSlug}
                    </code>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(issue.shortSlug)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
                    >
                      {copiedSlug === issue.shortSlug ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedSlug === issue.shortSlug ? 'Copied URL!' : 'Copy Edition URL'}
                    </button>
                    <Link
                      href={`/newsletter/${issue.shortSlug}?mode=beehiiv`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/35 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Beehiiv Export & PNGs
                    </Link>
                    <Link
                      href={`/newsletter/${issue.shortSlug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity shadow-lg"
                    >
                      Read Interactive Edition #{issue.issueNumber}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Edition Summary */}
                <div className="space-y-3">
                  <Link href={`/newsletter/${issue.shortSlug}`} className="group block">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      Edition #{issue.issueNumber}: NAD+ Proteostasis, Spider-Silk Senolytic Nanovaccines, Glial Autophagy & 51-Trial Human Epigenetic Clocks
                    </h2>
                  </Link>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {issue.introSummaryParagraph}
                  </p>
                </div>

                {/* 5 Breakthrough Studies Grid inside the Edition Card */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    5 Primary-Source Study Briefings in This Edition (Click Any Study to Open Its Interactive Graph):
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {issue.studies.map(s => (
                      <Link
                        key={s.id}
                        href={`/newsletter/${issue.shortSlug}#${s.id}`}
                        className="group p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-white/5 text-slate-300 border border-white/10">
                              Study #{s.number} • {s.journal}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-300">
                              {s.keyStatBadge}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                            {s.headline}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-cyan-400 font-semibold pt-2 border-t border-white/5">
                          <span>{s.themeTag}</span>
                          <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            View Graph <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Featured Protocol of the Week & Modality of the Week Pair */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Protocol Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/35 via-slate-900 to-slate-950 border border-purple-500/35 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-200 border border-purple-400/35">
                          🧬 Protocol of the Week
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/35">
                          {issue.protocolOfTheWeek.levlScoreOptimal}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white">
                        {issue.protocolOfTheWeek.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {issue.protocolOfTheWeek.oneLinePromise}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                      <Link
                        href={`/newsletter/${issue.shortSlug}#${issue.protocolOfTheWeek.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500 text-white hover:bg-purple-400 transition-colors"
                      >
                        Toggle Dosing in Issue #{issue.issueNumber} →
                      </Link>
                      <Link
                        href={issue.protocolOfTheWeek.exploreDeepLink}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/30"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        Open in LEVL Discovery
                      </Link>
                    </div>
                  </div>

                  {/* Modality Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/35 via-slate-900 to-slate-950 border border-emerald-500/35 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-200 border border-emerald-400/35">
                          ⚡ Modality of the Week
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/35">
                          {issue.modalityOfTheWeek.levlScoreOptimal}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white">
                        {issue.modalityOfTheWeek.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {issue.modalityOfTheWeek.oneLinePromise}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                      <Link
                        href={`/newsletter/${issue.shortSlug}#${issue.modalityOfTheWeek.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                      >
                        Toggle Window in Issue #{issue.issueNumber} →
                      </Link>
                      <Link
                        href={issue.modalityOfTheWeek.exploreDeepLink}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/30"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        Open in LEVL Discovery
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Upcoming Edition #2 Slot Card */}
            <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Upcoming Weekly Dispatch • /newsletter/edition-2</span>
                </div>
                <h3 className="text-lg font-bold text-slate-200">
                  Edition #2: Next Week&apos;s 5 Frontier Longevity Studies + Protocol & Modality Pairing
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Each new weekly edition added to <code className="text-slate-300">OUTPACE_AGING_ISSUES</code> automatically populates this catalog and gets its own permanent URL (<code className="text-cyan-300">/newsletter/edition-2</code>) and Beehiiv export studio.
                </p>
              </div>
              <Link
                href="/newsletter/edition-1"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15"
              >
                Read Edition #1 Now →
              </Link>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: BREAKTHROUGH STUDIES VAULT
           ===================================================================== */}
        {activeTab === 'studies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allStudiesFlattened.map(({ issueNumber, issueShortSlug, issueDate, study }) => (
              <div
                key={`${issueShortSlug}-${study.id}`}
                className="rounded-2xl border border-white/15 bg-slate-900/90 p-5 flex flex-col justify-between gap-4 hover:border-cyan-400/40 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                      Edition #{issueNumber} • Study #{study.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                      {study.keyStatBadge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400">
                    {study.journal} • {study.publishDate} • {study.themeTag}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                    {study.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {study.paragraphs[2]}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href={`/newsletter/${issueShortSlug}#${study.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    Open Interactive LEVL Graph →
                  </Link>
                  <a
                    href={study.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-cyan-300"
                  >
                    Primary Paper <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================================================
            TAB 3: FEATURED PROTOCOLS & MODALITIES VAULT
           ===================================================================== */}
        {activeTab === 'protocols' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OUTPACE_AGING_ISSUES.flatMap(issue => [
              { issue, item: issue.protocolOfTheWeek },
              { issue, item: issue.modalityOfTheWeek }
            ]).map(({ issue, item }) => (
              <div
                key={`${issue.shortSlug}-${item.id}`}
                className="rounded-3xl border border-white/15 bg-slate-900/90 p-6 flex flex-col justify-between gap-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-200 border border-purple-400/35">
                      Edition #{issue.issueNumber} •{' '}
                      {item.kind === 'protocol' ? 'Protocol of the Week' : 'Modality of the Week'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/35">
                      {item.levlScoreOptimal} Optimal ({item.levlScoreBeginner} Beginner)
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed">
                    {item.oneLinePromise}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.whyIncluded}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href={`/newsletter/${issue.shortSlug}#${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950"
                  >
                    Interactive Dosing & Telemetry →
                  </Link>
                  <Link
                    href={item.exploreDeepLink}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/30"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Try in LEVL Discovery
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
