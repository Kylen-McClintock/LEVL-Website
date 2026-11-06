'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
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
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Zap,
  Clock,
  Sun,
  Moon,
  CheckCircle2
} from 'lucide-react'
import { OUTPACE_AGING_ISSUES } from '@/lib/data/outpaceAgingIssues'
import FutureGraphLevPulseWidget from '@/components/newsletter/FutureGraphLevPulseWidget'

type CatalogTab = 'editions' | 'studies' | 'protocols'

export default function OutpaceAgingCatalogPage() {
  const [activeTab, setActiveTab] = useState<CatalogTab>('editions')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheme, setSelectedTheme] = useState<string>('all')
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [isLightMode, setIsLightMode] = useState<boolean>(false)

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
    <div
      className={`min-h-screen pb-28 transition-colors ${
        isLightMode
          ? 'bg-[#F8FAFC] text-slate-900'
          : 'bg-[#060913] text-slate-100'
      }`}
    >
      {/* Top Sticky Bar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isLightMode
            ? 'bg-white/90 border-slate-200'
            : 'bg-slate-950/85 border-white/10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/explore?mode=discover"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                isLightMode
                  ? 'text-slate-700 hover:text-slate-950 bg-slate-100 border-slate-300'
                  : 'text-slate-300 hover:text-white bg-white/5 border-white/10'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              LEVL App
            </Link>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${
                  isLightMode
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-400/30'
                }`}
              >
                Outpace Aging Catalog
              </span>
              <span
                className={`text-xs hidden sm:inline ${
                  isLightMode ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                levlhealth.com/newsletter
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={handleToggleTheme}
              aria-pressed={isLightMode}
              aria-label={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10'
              }`}
            >
              {isLightMode ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Light Mode</span>
                </>
              )}
            </button>

            <Link
              href="/newsletter/edition-1"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:opacity-95 transition-opacity shadow"
            >
              <Globe className="w-3.5 h-3.5" />
              Latest Issue (#1)
            </Link>
            <Link
              href="/newsletter/edition-1?mode=beehiiv"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isLightMode
                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-amber-500/15 text-amber-300 border-amber-400/35 hover:bg-amber-500/25'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Beehiiv Studio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Catalog Hero Masthead */}
        <section
          className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 shadow-xl transition-colors ${
            isLightMode
              ? 'border-slate-200 bg-white'
              : 'border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-[#071120]'
          }`}
        >
          <div className="max-w-3xl space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isLightMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              LEVL Weekly Longevity Roundup • Interactive Archive
            </div>
            <h1
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}
            >
              Outpace Aging
            </h1>
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Every week, we distill the five most important primary-source breakthroughs in longevity science into interactive biological telemetry curves, plain-English mechanisms, and one Protocol + one Modality you can launch directly in the LEVL app to slow your pace of aging and reach longevity escape velocity.
            </p>
          </div>

          {/* 4 Archive Pillar Badges */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t ${
              isLightMode ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            <div
              className={`p-3.5 rounded-2xl border ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-900/80 border-white/10'
              }`}
            >
              <div
                className={`text-xs font-extrabold ${
                  isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                }`}
              >
                5 Breakthroughs / Week
              </div>
              <div
                className={`text-[11px] mt-0.5 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                100% primary-source verified with direct DOIs & plain-fact limits
              </div>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-900/80 border-white/10'
              }`}
            >
              <div
                className={`text-xs font-extrabold ${
                  isLightMode ? 'text-cyan-700' : 'text-cyan-300'
                }`}
              >
                Interactive LEVL Telemetry
              </div>
              <div
                className={`text-[11px] mt-0.5 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Toggle between plain-English curves, Geek Mode cascades & trial data
              </div>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-900/80 border-white/10'
              }`}
            >
              <div
                className={`text-xs font-extrabold ${
                  isLightMode ? 'text-purple-700' : 'text-purple-300'
                }`}
              >
                1 Protocol + 1 Modality
              </div>
              <div
                className={`text-[11px] mt-0.5 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Hero visuals, hook stats & Beginner vs. Optimal dosing in every issue
              </div>
            </div>
            <div
              className={`p-3.5 rounded-2xl border ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-slate-900/80 border-white/10'
              }`}
            >
              <div
                className={`text-xs font-extrabold ${
                  isLightMode ? 'text-amber-700' : 'text-amber-300'
                }`}
              >
                Unique Weekly URLs
              </div>
              <div
                className={`text-[11px] mt-0.5 ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Clean permanent links (/newsletter/edition-1) + Beehiiv PNG exporter
              </div>
            </div>
          </div>
        </section>

        {/* Live LEV & Pace of Aging Tracker */}
        <FutureGraphLevPulseWidget
          issue={OUTPACE_AGING_ISSUES[0]}
          compact={true}
          isLightMode={isLightMode}
        />

        {/* Catalog Controls: View Tabs + Search + Theme Filter */}
        <section
          className={`rounded-2xl border p-4 space-y-4 transition-colors ${
            isLightMode
              ? 'border-slate-200 bg-white shadow-xs'
              : 'border-white/10 bg-slate-900/80'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* 3 Catalog Lenses */}
            <div
              className={`inline-flex rounded-xl p-1 border self-start ${
                isLightMode
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-slate-950 border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveTab('editions')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'editions'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Weekly Editions ({OUTPACE_AGING_ISSUES.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('studies')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'studies'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                }`}
              >
                <Microscope className="w-3.5 h-3.5" />
                Breakthrough Studies Vault ({allStudiesFlattened.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('protocols')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'protocols'
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow'
                    : isLightMode
                      ? 'text-slate-600 hover:text-slate-900'
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
                className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-cyan-400/50 ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    : 'bg-slate-950 border-white/10 text-white placeholder:text-slate-500'
                }`}
              />
            </div>
          </div>

          {/* Theme Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider mr-1 ${
                isLightMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Filter by Frontier Theme:
            </span>
            {allThemes.map(theme => (
              <button
                key={theme}
                type="button"
                onClick={() => setSelectedTheme(theme)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTheme === theme
                    ? isLightMode
                      ? 'bg-cyan-600 text-white border border-cyan-700'
                      : 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50'
                    : isLightMode
                      ? 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
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
                className={`rounded-3xl border p-6 sm:p-8 shadow-xl space-y-6 transition-colors ${
                  isLightMode
                    ? 'border-emerald-200 bg-white'
                    : 'border-emerald-500/35 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950'
                }`}
              >
                {/* Edition Top Header */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
                    isLightMode ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950">
                      Edition #{issue.issueNumber} • Latest Release
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${
                        isLightMode ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      <Clock className={`w-3.5 h-3.5 ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`} />
                      {issue.dateLabel} • {issue.readTimeLabel}
                    </span>
                    <code
                      className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                        isLightMode
                          ? 'text-cyan-800 bg-slate-100 border-slate-200'
                          : 'text-cyan-300 bg-slate-900 border-white/10'
                      }`}
                    >
                      levlhealth.com/newsletter/{issue.shortSlug}
                    </code>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(issue.shortSlug)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        isLightMode
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
                      }`}
                    >
                      {copiedSlug === issue.shortSlug ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedSlug === issue.shortSlug ? 'Copied URL!' : 'Copy Edition URL'}
                    </button>
                    <Link
                      href={`/newsletter/${issue.shortSlug}?mode=beehiiv`}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        isLightMode
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-400/35'
                      }`}
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
                    <h2
                      className={`text-2xl sm:text-3xl font-extrabold transition-colors ${
                        isLightMode
                          ? 'text-slate-900 group-hover:text-cyan-700'
                          : 'text-white group-hover:text-cyan-300'
                      }`}
                    >
                      Edition #{issue.issueNumber}: NAD+ Proteostasis, Spider-Silk Senolytic Nanovaccines, Glial Autophagy & 51-Trial Human Epigenetic Clocks
                    </h2>
                  </Link>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isLightMode ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    {issue.introSummaryParagraph}
                  </p>
                </div>

                {/* 5 Breakthrough Studies Grid inside the Edition Card */}
                <div className="space-y-2.5">
                  <div
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isLightMode ? 'text-cyan-800' : 'text-cyan-300'
                    }`}
                  >
                    5 Primary-Source Study Briefings in This Edition (Click Any Study to Open Its Interactive Graph):
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {issue.studies.map(s => (
                      <Link
                        key={s.id}
                        href={`/newsletter/${issue.shortSlug}#${s.id}`}
                        className={`group p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                          isLightMode
                            ? 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:bg-white shadow-2xs'
                            : 'bg-slate-900/90 border-white/10 hover:border-cyan-400/50'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                                isLightMode
                                  ? 'bg-white text-slate-700 border-slate-200'
                                  : 'bg-white/5 text-slate-300 border-white/10'
                              }`}
                            >
                              Study #{s.number} • {s.journal}
                            </span>
                            <span
                              className={`text-[11px] font-bold ${
                                isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                              }`}
                            >
                              {s.keyStatBadge}
                            </span>
                          </div>
                          <h3
                            className={`text-xs sm:text-sm font-bold transition-colors leading-snug ${
                              isLightMode
                                ? 'text-slate-900 group-hover:text-cyan-700'
                                : 'text-white group-hover:text-cyan-300'
                            }`}
                          >
                            {s.headline}
                          </h3>
                        </div>
                        <div
                          className={`flex items-center justify-between text-[11px] font-semibold pt-2 border-t ${
                            isLightMode
                              ? 'text-cyan-700 border-slate-200'
                              : 'text-cyan-400 border-white/5'
                          }`}
                        >
                          <span>{s.themeTag}</span>
                          <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            View Graph <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Featured Protocol of the Week & Modality of the Week Pair with Hero Images & Hook Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {[issue.protocolOfTheWeek, issue.modalityOfTheWeek].map(item => {
                    const isProtocol = item.kind === 'protocol'
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col justify-between shadow-lg ${
                          isLightMode
                            ? isProtocol
                              ? 'border-purple-200 bg-slate-50/70'
                              : 'border-emerald-200 bg-slate-50/70'
                            : isProtocol
                              ? 'border-purple-500/35 bg-gradient-to-br from-purple-950/35 via-slate-900 to-slate-950'
                              : 'border-emerald-500/35 bg-gradient-to-br from-emerald-950/35 via-slate-900 to-slate-950'
                        }`}
                      >
                        <div>
                          {/* Hero Image Banner */}
                          <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                            <img
                              src={item.heroImageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover object-center opacity-85"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${
                                  isProtocol
                                    ? 'bg-purple-500/30 text-purple-100 border-purple-400/50'
                                    : 'bg-emerald-500/30 text-emerald-100 border-emerald-400/50'
                                }`}
                              >
                                {isProtocol ? '🧬 Protocol of the Week' : '⚡ Modality of the Week'}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500 text-slate-950">
                                {item.levlScoreOptimal}
                              </span>
                            </div>
                            <div className="absolute bottom-3 left-3 right-3">
                              <h3 className="text-lg font-black text-white leading-tight drop-shadow">
                                {item.name}
                              </h3>
                            </div>
                          </div>

                          {/* 3 Hook Stats Strip */}
                          <div className="p-4 space-y-3">
                            <div className="grid grid-cols-3 gap-2">
                              {item.hookStats.map((st, sIdx) => (
                                <div
                                  key={sIdx}
                                  className={`p-2 rounded-xl border text-center ${
                                    isLightMode
                                      ? 'bg-white border-slate-200'
                                      : 'bg-slate-950/75 border-white/10'
                                  }`}
                                >
                                  <div
                                    className={`text-sm sm:text-base font-black font-mono ${
                                      isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                                    }`}
                                  >
                                    {st.value}
                                  </div>
                                  <div
                                    className={`text-[10px] font-bold leading-tight mt-0.5 ${
                                      isLightMode ? 'text-slate-700' : 'text-slate-300'
                                    }`}
                                  >
                                    {st.label}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <p
                              className={`text-xs sm:text-sm leading-relaxed ${
                                isLightMode ? 'text-slate-700' : 'text-slate-300'
                              }`}
                            >
                              {item.oneLinePromise}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`px-4 py-3 border-t flex flex-wrap items-center gap-2 ${
                            isLightMode ? 'border-slate-200 bg-white' : 'border-white/10'
                          }`}
                        >
                          <Link
                            href={`/newsletter/${issue.shortSlug}#${item.id}`}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                              isProtocol
                                ? 'bg-purple-500 text-white hover:bg-purple-400'
                                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                            }`}
                          >
                            View Full Blueprint in Issue #{issue.issueNumber} →
                          </Link>
                          <Link
                            href={item.exploreDeepLink}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                              isLightMode
                                ? 'bg-slate-100 text-cyan-800 hover:bg-slate-200 border-slate-300'
                                : 'bg-slate-800 text-cyan-300 hover:bg-slate-700 border-cyan-500/30'
                            }`}
                          >
                            <Compass className="w-3.5 h-3.5" />
                            Open in LEVL Discovery
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================================================
            TAB 2: BREAKTHROUGH STUDIES VAULT
           ===================================================================== */}
        {activeTab === 'studies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allStudiesFlattened.map(({ issueNumber, issueShortSlug, study }) => (
              <div
                key={`${issueShortSlug}-${study.id}`}
                className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all ${
                  isLightMode
                    ? 'border-slate-200 bg-white hover:border-cyan-400 shadow-xs'
                    : 'border-white/15 bg-slate-900/90 hover:border-cyan-400/40'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        isLightMode
                          ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                          : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
                      }`}
                    >
                      Edition #{issueNumber} • Study #{study.number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                        isLightMode
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                      }`}
                    >
                      {study.keyStatBadge}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isLightMode ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {study.journal} • {study.publishDate} • {study.themeTag}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-extrabold leading-snug ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {study.headline}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                      isLightMode ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {study.paragraphs[2]}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isLightMode ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
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
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isLightMode
                        ? 'text-slate-600 hover:text-cyan-700'
                        : 'text-slate-400 hover:text-cyan-300'
                    }`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OUTPACE_AGING_ISSUES.flatMap(issue => [
              { issue, item: issue.protocolOfTheWeek },
              { issue, item: issue.modalityOfTheWeek }
            ]).map(({ issue, item }) => (
              <div
                key={`${issue.shortSlug}-${item.id}`}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between shadow-xl ${
                  isLightMode
                    ? 'border-slate-200 bg-white'
                    : 'border-white/15 bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="relative h-52 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={item.heroImageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-center opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/30 text-purple-100 border border-purple-400/40 backdrop-blur-md">
                        Edition #{issue.issueNumber} •{' '}
                        {item.kind === 'protocol' ? 'Protocol of the Week' : 'Modality of the Week'}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950">
                        {item.levlScoreOptimal} Optimal
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-black text-white drop-shadow">{item.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {item.hookStats.map((st, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-center ${
                            isLightMode
                              ? 'bg-slate-50 border-slate-200'
                              : 'bg-slate-950/80 border-white/10'
                          }`}
                        >
                          <div
                            className={`text-base font-black font-mono ${
                              isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                            }`}
                          >
                            {st.value}
                          </div>
                          <div
                            className={`text-[11px] font-bold mt-0.5 ${
                              isLightMode ? 'text-slate-800' : 'text-slate-200'
                            }`}
                          >
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p
                      className={`text-xs sm:text-sm font-medium leading-relaxed ${
                        isLightMode ? 'text-slate-700' : 'text-cyan-200'
                      }`}
                    >
                      {item.oneLinePromise}
                    </p>

                    <div className="space-y-1.5">
                      {item.keyBenefits.slice(0, 3).map((b, bIdx) => (
                        <div
                          key={bIdx}
                          className={`flex items-start gap-2 text-xs ${
                            isLightMode ? 'text-slate-600' : 'text-slate-300'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isLightMode ? 'text-emerald-600' : 'text-emerald-400'
                            }`}
                          />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`px-6 py-4 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isLightMode ? 'border-slate-200 bg-slate-50' : 'border-white/10'
                  }`}
                >
                  <Link
                    href={`/newsletter/${issue.shortSlug}#${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950"
                  >
                    Interactive Dosing & Telemetry →
                  </Link>
                  <Link
                    href={item.exploreDeepLink}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border ${
                      isLightMode
                        ? 'bg-white text-cyan-800 hover:bg-slate-100 border-slate-300'
                        : 'bg-slate-800 text-cyan-300 hover:bg-slate-700 border-cyan-500/30'
                    }`}
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
