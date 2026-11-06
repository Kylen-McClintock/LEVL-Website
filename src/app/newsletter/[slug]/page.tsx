'use client'

import React, { Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import OutpaceAgingIssueView from '@/components/newsletter/OutpaceAgingIssueView'
import { getOutpaceAgingIssueBySlug, OUTPACE_AGING_ISSUE_01 } from '@/lib/data/outpaceAgingIssues'

function NewsletterIssuePageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const rawSlug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : ''
  const modeParam = searchParams.get('mode')

  const issue = getOutpaceAgingIssueBySlug(rawSlug)

  if (!issue) {
    return (
      <div className="min-h-screen bg-[#060913] text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-3xl border border-white/15 bg-slate-900/90 p-8 text-center space-y-4 shadow-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Outpace Aging Archive
          </span>
          <h1 className="text-2xl font-extrabold text-white">Edition Not Found</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            We couldn&apos;t find an edition matching <code className="text-cyan-300">{rawSlug}</code>. Browse the full catalog of published editions or jump straight into Edition #1.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 text-white hover:bg-slate-700 border border-white/15"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Newsletter Catalog
            </Link>
            <Link
              href={`/newsletter/${OUTPACE_AGING_ISSUE_01.shortSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950"
            >
              Read Edition #1 →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <OutpaceAgingIssueView
      issue={issue}
      initialMode={
        modeParam === 'email' || modeParam === 'simple' || modeParam === 'beehiiv'
          ? 'beehiiv_studio'
          : 'web_canonical'
      }
    />
  )
}

export default function NewsletterIssuePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060913] text-slate-400 flex items-center justify-center text-sm">
          Loading Outpace Aging Edition...
        </div>
      }
    >
      <NewsletterIssuePageContent />
    </Suspense>
  )
}
