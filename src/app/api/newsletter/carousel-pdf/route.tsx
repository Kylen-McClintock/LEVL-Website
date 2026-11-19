import fs from 'fs'
import path from 'path'
import React from 'react'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import {
  getOutpaceAgingIssueBySlug,
  OUTPACE_AGING_ISSUES,
  OutpaceAgingIssue,
  NewsletterStudySection,
  NewsletterActionableItem
} from '@/lib/data/outpaceAgingIssues'
import { buildMultiPagePdfFromPngs } from '@/lib/utils/pngToPdf'

export const runtime = 'nodejs'

const SLIDE_W = 800
const SLIDE_H = 1000

function readPublicImageAsDataUrl(relPath: string): string | null {
  try {
    const cleanRel = relPath.replace(/^\/app\//, '').replace(/^\//, '')
    const fullPath = path.join(process.cwd(), 'public', cleanRel)
    const buf = fs.readFileSync(fullPath)
    const ext = path.extname(fullPath).toLowerCase()
    const mime =
      ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'
    return `data:${mime};base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

function trimCopy(text: string, maxChars: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= maxChars) return clean
  const slice = clean.slice(0, maxChars - 1)
  const lastPeriod = slice.lastIndexOf('. ')
  if (lastPeriod > maxChars * 0.58) {
    return slice.slice(0, lastPeriod + 1)
  }
  const lastSpace = slice.lastIndexOf(' ')
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : maxChars - 1)}...`
}

function SlideTopBar({
  leftText,
  slideNum,
  totalSlides,
  logoDataUrl,
  accentHex
}: {
  leftText: string
  slideNum: number
  totalSlides: number
  logoDataUrl: string | null
  accentHex: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: '18px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.16)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '10px',
            height: '10px',
            borderRadius: '999px',
            backgroundColor: accentHex
          }}
        />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accentHex
          }}
        >
          {leftText}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#94a3b8'
          }}
        >
          {slideNum} / {totalSlides}
        </span>
        {logoDataUrl ? (
          <img
            src={logoDataUrl}
            alt="LEVL"
            height={22}
            style={{ height: '22px', objectFit: 'contain' }}
          />
        ) : (
          <span
            style={{
              fontSize: '18px',
              fontWeight: 900,
              letterSpacing: '0.12em',
              color: '#ffffff'
            }}
          >
            LEVL
          </span>
        )}
      </div>
    </div>
  )
}

function buildEditionSlides(
  issue: OutpaceAgingIssue,
  logoDataUrl: string | null
): React.ReactElement[] {
  const totalSlides = 2 + issue.studies.length // Cover + 5 Studies + Action CTA = 7
  const levSnap = issue.levSnapshot || {
    optimalDate: 'September 2036',
    optimalShiftText: '24 days closer this week',
    activeDate: 'January 2042',
    activeShiftText: '15 days closer this week',
    poaOptimal: '0.66',
    poaActive: '0.84',
    poaShiftText: '-0.0031 yr/yr this week'
  }
  const leadStudy = issue.studies[0]

  const accentPalette: Record<NewsletterStudySection['accentColor'], string> = {
    emerald: '#34d399',
    cyan: '#38bdf8',
    purple: '#c084fc',
    amber: '#fbbf24',
    rose: '#fb7185'
  }
  const barColors = ['#10b981', '#38bdf8', '#a855f7', '#f59e0b']

  const slides: React.ReactElement[] = []

  // SLIDE 1: EDITION COVER
  slides.push(
    <div
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050a14',
        padding: '44px 48px',
        fontFamily: 'sans-serif',
        color: '#f8fafc',
        borderTop: '8px solid #10b981'
      }}
    >
      <SlideTopBar
        leftText={`OUTPACE AGING • EDITION #${issue.issueNumber} • ${issue.dateLabel}`}
        slideNum={1}
        totalSlides={totalSlides}
        logoDataUrl={logoDataUrl}
        accentHex="#34d399"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            fontSize: '46px',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#ffffff'
          }}
        >
          5 Frontier Longevity Breakthroughs This Week
        </div>

        {/* Lead Study Highlight Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '24px 26px',
            borderRadius: '22px',
            backgroundColor: '#0c1629',
            border: '2px solid rgba(52, 211, 153, 0.45)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: '#38bdf8'
              }}
            >
              HEADLINE BREAKTHROUGH • {leadStudy.journal}
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 900,
                color: '#34d399'
              }}
            >
              {leadStudy.keyStatBadge}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 800,
              lineHeight: 1.24,
              color: '#ffffff'
            }}
          >
            {leadStudy.headline}
          </div>
        </div>

        {/* All 5 Study Teaser Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          {issue.studies.map(s => (
            <div
              key={s.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 16px',
                borderRadius: '14px',
                backgroundColor: '#0a1222',
                border: '1px solid rgba(148, 163, 184, 0.18)'
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#f1f5f9'
                }}
              >
                0{s.number}. {s.themeTag} ({s.journal})
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: accentPalette[s.accentColor] || '#34d399'
                }}
              >
                {trimCopy(s.keyStatBadge, 34)}
              </span>
            </div>
          ))}
        </div>

        {/* Compact LEV Observatory Shift Strip */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            width: '100%',
            marginTop: '4px'
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 18px',
              borderRadius: '16px',
              backgroundColor: '#0b1528',
              border: '1.5px solid rgba(16, 185, 129, 0.45)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', letterSpacing: '0.06em' }}>
              ESTIMATED LEV • OPTIMAL
            </span>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {levSnap.optimalDate}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#6ee7b7', marginTop: '2px' }}>
              {levSnap.optimalShiftText}
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 18px',
              borderRadius: '16px',
              backgroundColor: '#0b1528',
              border: '1.5px solid rgba(168, 85, 247, 0.45)'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#c084fc', letterSpacing: '0.06em' }}>
              OPTIMAL PACE OF AGING
            </span>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {levSnap.poaOptimal} bio-yrs/yr
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#d8b4fe', marginTop: '2px' }}>
              {levSnap.poaShiftText}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Swipe Cue */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: '16px',
          borderTop: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>
          levlhealth.com/newsletter/{issue.shortSlug}
        </span>
        <span style={{ fontSize: '16px', fontWeight: 900, color: '#34d399' }}>
          Swipe for all 5 studies →
        </span>
      </div>
    </div>
  )

  // SLIDES 2..6: ONE CRISP SLIDE PER STUDY
  issue.studies.forEach((study, idx) => {
    const accent = accentPalette[study.accentColor] || '#38bdf8'
    slides.push(
      <div
        style={{
          width: `${SLIDE_W}px`,
          height: `${SLIDE_H}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#050a14',
          padding: '44px 48px',
          fontFamily: 'sans-serif',
          color: '#f8fafc',
          borderTop: `8px solid ${accent}`
        }}
      >
        <SlideTopBar
          leftText={`STUDY #${study.number} OF ${issue.studies.length} • ${study.journal} (${study.publishDate})`}
          slideNum={idx + 2}
          totalSlides={totalSlides}
          logoDataUrl={logoDataUrl}
          accentHex={accent}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          {/* Key Stat Badge */}
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                padding: '8px 18px',
                borderRadius: '999px',
                backgroundColor: 'rgba(16, 185, 129, 0.16)',
                border: `1.5px solid ${accent}`,
                color: accent,
                fontSize: '16px',
                fontWeight: 900
              }}
            >
              {study.keyStatBadge}
            </div>
          </div>

          {/* Study Headline */}
          <div
            style={{
              display: 'flex',
              fontSize: '33px',
              fontWeight: 900,
              lineHeight: 1.16,
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}
          >
            {study.number}. {study.headline}
          </div>

          {/* Core Finding Plain-English Takeaway */}
          <div
            style={{
              display: 'flex',
              fontSize: '19px',
              lineHeight: 1.48,
              color: '#cbd5e1'
            }}
          >
            {trimCopy(study.paragraphs[2], 320)}
          </div>

          {/* Cohort Comparison Bars */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              width: '100%',
              padding: '22px 24px',
              borderRadius: '20px',
              backgroundColor: '#0b1426',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#38bdf8'
              }}
            >
              QUANTIFIED EXPERIMENTAL SIGNAL
            </span>
            {study.visualSpec.cohortBars.slice(0, 3).map((bar, bIdx) => {
              const color = barColors[bIdx % barColors.length]
              return (
                <div
                  key={bIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '7px',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      fontSize: '15px',
                      fontWeight: 800
                    }}
                  >
                    <span style={{ color: '#f8fafc' }}>{trimCopy(bar.label, 42)}</span>
                    <span style={{ color, fontWeight: 900 }}>{trimCopy(bar.deltaText, 30)}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '14px',
                      borderRadius: '999px',
                      backgroundColor: '#1e293b',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: `${Math.max(14, Math.min(100, bar.percentWidth))}%`,
                        height: '100%',
                        borderRadius: '999px',
                        backgroundColor: color
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Future Implications Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '18px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(52, 211, 153, 0.3)'
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: '#34d399'
              }}
            >
              WHY IT MATTERS FOR LEV
            </span>
            <span style={{ fontSize: '16px', lineHeight: 1.4, color: '#e2e8f0' }}>
              {trimCopy(study.futureImplications, 210)}
            </span>
          </div>
        </div>

        {/* Slide Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '14px',
            borderTop: '1px solid rgba(148, 163, 184, 0.16)'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
            {study.doiLabel}
          </span>
          <span style={{ fontSize: '15px', fontWeight: 900, color: accent }}>
            {idx === issue.studies.length - 1 ? 'Swipe for daily protocols →' : 'Next study →'}
          </span>
        </div>
      </div>
    )
  })

  // SLIDE 7: PROTOCOL + MODALITY ACTION CTA
  const proto = issue.protocolOfTheWeek
  const mod = issue.modalityOfTheWeek

  slides.push(
    <div
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050a14',
        padding: '44px 48px',
        fontFamily: 'sans-serif',
        color: '#f8fafc',
        borderTop: '8px solid #38bdf8'
      }}
    >
      <SlideTopBar
        leftText={`APPLY THE SCIENCE TODAY • EDITION #${issue.issueNumber}`}
        slideNum={totalSlides}
        totalSlides={totalSlides}
        logoDataUrl={logoDataUrl}
        accentHex="#38bdf8"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            fontSize: '38px',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: '#ffffff'
          }}
        >
          Pair Frontier Breakthroughs With Daily Protocols
        </div>

        {[proto, mod].map(item => {
          const isProto = item.kind === 'protocol'
          const accent = isProto ? '#c084fc' : '#34d399'
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '22px 24px',
                borderRadius: '20px',
                backgroundColor: '#0b1426',
                border: `1.5px solid ${isProto ? 'rgba(192,132,252,0.45)' : 'rgba(52,211,153,0.45)'}`
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: accent
                  }}
                >
                  {isProto ? 'PROTOCOL OF THE WEEK' : 'MODALITY OF THE WEEK'} •{' '}
                  {item.stepsAndTimeBadge || `${item.steps.length} Steps`}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#34d399' }}>
                  {item.levlScoreOptimal}
                </span>
              </div>
              <div style={{ display: 'flex', fontSize: '24px', fontWeight: 900, color: '#ffffff' }}>
                {item.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%' }}>
                {item.hookStats.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#060c1a',
                      border: '1px solid rgba(148, 163, 184, 0.18)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 900,
                        color: sIdx === 0 ? '#34d399' : sIdx === 1 ? '#38bdf8' : '#c084fc'
                      }}
                    >
                      {st.value}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0', marginTop: '2px' }}>
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Strong Web Edition CTA Banner */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '24px 26px',
            borderRadius: '20px',
            backgroundColor: '#064e3b',
            border: '2px solid #34d399'
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#ffffff'
            }}
          >
            Read Full Interactive Edition #{issue.issueNumber} (Free)
          </span>
          <span style={{ fontSize: '16px', fontWeight: 600, color: '#a7f3d0' }}>
            4-Tab Telemetry Curves • Primary DOIs • Beginner vs. Optimal Dosing Steps
          </span>
          <span style={{ fontSize: '20px', fontWeight: 900, color: '#6ee7b7', marginTop: '4px' }}>
            levlhealth.com/newsletter/{issue.shortSlug}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: '14px',
          borderTop: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>
          Save this deck & subscribe every Thursday
        </span>
        <span style={{ fontSize: '15px', fontWeight: 900, color: '#38bdf8' }}>
          OUTPACE AGING • LEVL
        </span>
      </div>
    </div>
  )

  return slides
}

function buildActionableSlides(
  issue: OutpaceAgingIssue,
  item: NewsletterActionableItem,
  logoDataUrl: string | null
): React.ReactElement[] {
  const isProtocol = item.kind === 'protocol'
  const accent = isProtocol ? '#c084fc' : '#34d399'
  const heroDataUrl = readPublicImageAsDataUrl(item.heroImageUrl)
  const avatarDataUrl = readPublicImageAsDataUrl(
    item.creatorAvatarUrl || '/images/discover/creator_sketch_avatar.jpg'
  )
  const scoreNumber = item.levlScoreOptimal.replace(/\s*LEVL/i, '').trim()
  const stepsBadge = item.stepsAndTimeBadge || `${item.steps.length} Steps`
  const creatorName = item.creatorName || 'LEVL Science Team'
  const creatorAffiliation = item.creatorAffiliation || 'Peer-Reviewed Clinical Protocol'
  const totalSlides = 5

  return [
    // SLIDE 1: SOCIAL-MEDIA HERO COVER (800 x 1000)
    <div
      key="s1"
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#040814',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
        color: '#f8fafc'
      }}
    >
      {heroDataUrl && (
        <img
          src={heroDataUrl}
          alt={item.name}
          width={SLIDE_W}
          height={SLIDE_H}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${SLIDE_W}px`,
            height: `${SLIDE_H}px`,
            objectFit: 'cover'
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${SLIDE_W}px`,
          height: `${SLIDE_H}px`,
          display: 'flex',
          background:
            'linear-gradient(180deg, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.12) 26%, rgba(2,6,23,0.28) 46%, rgba(2,6,23,0.92) 66%, rgba(2,6,23,0.99) 100%)'
        }}
      />

      {/* Top Corner Row */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '36px 36px 0 36px'
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '10px 18px',
            borderRadius: '999px',
            backgroundColor: 'rgba(2, 6, 23, 0.84)',
            border: `1.5px solid ${accent}`
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isProtocol ? '#e9d5ff' : '#a7f3d0'
            }}
          >
            {isProtocol ? 'PROTOCOL' : 'MODALITY'} • {stepsBadge}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            borderRadius: '14px',
            backgroundColor: 'rgba(2, 6, 23, 0.78)'
          }}
        >
          <span style={{ fontSize: '30px', fontWeight: 900, color: '#34d399' }}>
            {scoreNumber}
          </span>
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="LEVL" height={24} style={{ height: '24px', objectFit: 'contain' }} />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff' }}>LEVL</span>
          )}
        </div>
      </div>

      {/* Bottom Hero Overlay Stack */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          padding: '0 36px 38px 36px'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '40px',
            fontWeight: 900,
            lineHeight: 1.1,
            color: '#ffffff'
          }}
        >
          {item.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {avatarDataUrl && (
            <img
              src={avatarDataUrl}
              alt={creatorName}
              width={34}
              height={34}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '999px',
                objectFit: 'cover',
                border: '2px solid rgba(52, 211, 153, 0.75)'
              }}
            />
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#6ee7b7' }}>
              {creatorName}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#cbd5e1' }}>
              {creatorAffiliation}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: '18px', lineHeight: 1.4, color: '#e2e8f0' }}>
          {item.oneLinePromise}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' }}>
          {item.hookStats.map((st, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 16px',
                borderRadius: '16px',
                backgroundColor: 'rgba(6, 12, 26, 0.90)',
                border: `1.5px solid ${idx === 0 ? 'rgba(52,211,153,0.5)' : idx === 1 ? 'rgba(56,189,248,0.5)' : 'rgba(192,132,252,0.5)'}`
              }}
            >
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: idx === 0 ? '#34d399' : idx === 1 ? '#38bdf8' : '#c084fc'
                }}
              >
                {st.value}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                {st.label}
              </span>
              <span style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.3 }}>
                {trimCopy(st.sublabel, 78)}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>
            Outpace Aging • Edition #{issue.issueNumber}
          </span>
          <span style={{ fontSize: '15px', fontWeight: 900, color: '#34d399' }}>
            Swipe for step-by-step protocol →
          </span>
        </div>
      </div>
    </div>,

    // SLIDE 2: WHY INCLUDED + KEY BENEFITS
    <div
      key="s2"
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050a14',
        padding: '44px 48px',
        fontFamily: 'sans-serif',
        color: '#f8fafc',
        borderTop: `8px solid ${accent}`
      }}
    >
      <SlideTopBar
        leftText={`WHY THIS MATTERS NOW • ${item.name.slice(0, 28)}`}
        slideNum={2}
        totalSlides={totalSlides}
        logoDataUrl={logoDataUrl}
        accentHex={accent}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', width: '100%' }}>
        <div style={{ display: 'flex', fontSize: '34px', fontWeight: 900, color: '#ffffff', lineHeight: 1.15 }}>
          Bridging This Week&apos;s Science Into Daily Practice
        </div>

        <div
          style={{
            display: 'flex',
            padding: '22px 24px',
            borderRadius: '20px',
            backgroundColor: '#0b1426',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            fontSize: '18px',
            lineHeight: 1.5,
            color: '#e2e8f0'
          }}
        >
          {trimCopy(item.whyIncluded, 380)}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', color: '#34d399' }}>
            KEY LONGEVITY & PERFORMANCE BENEFITS
          </span>
          {item.keyBenefits.slice(0, 4).map((b, bIdx) => (
            <div
              key={bIdx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '15px 18px',
                borderRadius: '14px',
                backgroundColor: '#0a1222',
                border: '1px solid rgba(148, 163, 184, 0.18)',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: 1.38,
                color: '#f1f5f9'
              }}
            >
              <span style={{ color: '#34d399', fontWeight: 900 }}>✓</span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      >
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
          PubMed Verified • {item.pubmedLinks[0]?.label || 'Clinical Trials'}
        </span>
        <span style={{ fontSize: '15px', fontWeight: 900, color: accent }}>
          Swipe for numbered steps →
        </span>
      </div>
    </div>,

    // SLIDE 3: NUMBERED STEPS (OPTIMAL DOSING)
    <div
      key="s3"
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050a14',
        padding: '44px 48px',
        fontFamily: 'sans-serif',
        color: '#f8fafc',
        borderTop: `8px solid ${accent}`
      }}
    >
      <SlideTopBar
        leftText={`STEP-BY-STEP EXECUTION • ${stepsBadge}`}
        slideNum={3}
        totalSlides={totalSlides}
        logoDataUrl={logoDataUrl}
        accentHex={accent}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <div style={{ display: 'flex', fontSize: '32px', fontWeight: 900, color: '#ffffff' }}>
          Clinical Optimal Protocol Steps
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {item.steps.slice(0, 5).map(step => (
            <div
              key={step.stepNumber}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '15px 18px',
                borderRadius: '16px',
                backgroundColor: '#0b1426',
                border: '1px solid rgba(148, 163, 184, 0.2)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <span style={{ fontSize: '17px', fontWeight: 900, color: '#ffffff' }}>
                  {step.stepNumber}. {step.title}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    color: '#34d399',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(16, 185, 129, 0.16)'
                  }}
                >
                  {step.optimalDoseBadge}
                </span>
              </div>
              <span style={{ fontSize: '14.5px', lineHeight: 1.38, color: '#cbd5e1' }}>
                {trimCopy(step.optimalInstruction, 165)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      >
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
          Beginner scaling available interactively on LEVL
        </span>
        <span style={{ fontSize: '15px', fontWeight: 900, color: accent }}>
          Swipe for longevity vectors →
        </span>
      </div>
    </div>,

    // SLIDE 4: TARGETED VECTORS & ONSET TIMELINE
    <div
      key="s4"
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050a14',
        padding: '44px 48px',
        fontFamily: 'sans-serif',
        color: '#f8fafc',
        borderTop: `8px solid ${accent}`
      }}
    >
      <SlideTopBar
        leftText="BIOLOGICAL IMPACT & ONSET TIMELINE"
        slideNum={4}
        totalSlides={totalSlides}
        logoDataUrl={logoDataUrl}
        accentHex={accent}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', width: '100%' }}>
        <div style={{ display: 'flex', fontSize: '32px', fontWeight: 900, color: '#ffffff' }}>
          Targeted Longevity Vectors (0–100 Rubric)
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            padding: '22px 24px',
            borderRadius: '20px',
            backgroundColor: '#0b1426',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}
        >
          {item.vectorScores.slice(0, 4).map((vec, vIdx) => (
            <div key={vIdx} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 800
                }}
              >
                <span style={{ color: '#f8fafc' }}>{vec.vectorName}</span>
                <span style={{ color: '#34d399' }}>
                  {vec.score}/100 • {trimCopy(vec.effectStat, 34)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '14px',
                  borderRadius: '999px',
                  backgroundColor: '#1e293b',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: `${Math.max(12, Math.min(100, vec.score))}%`,
                    height: '100%',
                    borderRadius: '999px',
                    backgroundColor: vec.color || '#10b981'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', color: '#38bdf8' }}>
            EXPECTED PHYSIOLOGICAL ONSET TIMELINE
          </span>
          {item.onsetPhases.map((p, pIdx) => (
            <div
              key={pIdx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '14px 18px',
                borderRadius: '14px',
                backgroundColor: '#0a1222',
                border: '1px solid rgba(56, 189, 248, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff' }}>{p.phase}</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#34d399' }}>{p.window}</span>
              </div>
              <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.35 }}>
                {trimCopy(p.detail, 140)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      >
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>Calibrated across all 8 LEVL longevity vectors</span>
        <span style={{ fontSize: '15px', fontWeight: 900, color: accent }}>
          Final slide: Scaling & link →
        </span>
      </div>
    </div>,

    // SLIDE 5: BEGINNER SCALING, CAUTIONS & CTA
    <div
      key="s5"
      style={{
        width: `${SLIDE_W}px`,
        height: `${SLIDE_H}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050a14',
        padding: '44px 48px',
        fontFamily: 'sans-serif',
        color: '#f8fafc',
        borderTop: '8px solid #10b981'
      }}
    >
      <SlideTopBar
        leftText={`START SAFELY • OUTPACE AGING EDITION #${issue.issueNumber}`}
        slideNum={5}
        totalSlides={totalSlides}
        logoDataUrl={logoDataUrl}
        accentHex="#34d399"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <div style={{ display: 'flex', fontSize: '34px', fontWeight: 900, color: '#ffffff', lineHeight: 1.15 }}>
          Beginner Ramp-Up & Clinical Guardrails
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '22px 24px',
            borderRadius: '18px',
            backgroundColor: 'rgba(16, 185, 129, 0.10)',
            border: '1.5px solid rgba(52, 211, 153, 0.4)'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#34d399', letterSpacing: '0.07em' }}>
            BEGINNER ENTRY SCALING ({item.levlScoreBeginner})
          </span>
          <span style={{ fontSize: '17px', lineHeight: 1.48, color: '#f1f5f9' }}>
            {item.beginnerScalingNote}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '22px 24px',
            borderRadius: '18px',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1.5px solid rgba(251, 191, 36, 0.35)'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', letterSpacing: '0.07em' }}>
            SAFETY & CLINICAL CAUTIONS
          </span>
          <span style={{ fontSize: '16px', lineHeight: 1.45, color: '#e2e8f0' }}>
            {item.cautions}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '24px 26px',
            borderRadius: '20px',
            backgroundColor: '#064e3b',
            border: '2px solid #34d399'
          }}
        >
          <span style={{ fontSize: '23px', fontWeight: 900, color: '#ffffff' }}>
            Open Interactively in LEVL & Read Edition #{issue.issueNumber}
          </span>
          <span style={{ fontSize: '15px', color: '#a7f3d0' }}>
            Toggle Beginner vs. Optimal dosing, explore 24h telemetry curves & save to your daily timeline.
          </span>
          <span style={{ fontSize: '19px', fontWeight: 900, color: '#6ee7b7', marginTop: '4px' }}>
            levlhealth.com/newsletter/{issue.shortSlug}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      >
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.disclaimer}</span>
        <span style={{ fontSize: '14px', fontWeight: 900, color: '#38bdf8' }}>
          Save for tonight • LEVL
        </span>
      </div>
    </div>
  ]
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug') || OUTPACE_AGING_ISSUES[0].shortSlug
    const deck = (searchParams.get('deck') || 'edition').toLowerCase()
    const slideParam = searchParams.get('slide')

    const issue = getOutpaceAgingIssueBySlug(slug) || OUTPACE_AGING_ISSUES[0]
    const logoDataUrl = readPublicImageAsDataUrl('/images/discover/levl_logo_official.png')

    let slideElements: React.ReactElement[]
    if (deck === 'protocol') {
      slideElements = buildActionableSlides(issue, issue.protocolOfTheWeek, logoDataUrl)
    } else if (deck === 'modality') {
      slideElements = buildActionableSlides(issue, issue.modalityOfTheWeek, logoDataUrl)
    } else {
      slideElements = buildEditionSlides(issue, logoDataUrl)
    }

    // If `?slide=1` (1-indexed) is requested, return that single slide as a crisp PNG (used as Buffer thumbnailUrl!)
    if (slideParam) {
      const idx = Math.max(0, Math.min(slideElements.length - 1, parseInt(slideParam, 10) - 1 || 0))
      return new ImageResponse(slideElements[idx], {
        width: SLIDE_W,
        height: SLIDE_H
      })
    }

    // Render all slides to PNG buffers in parallel, then assemble into a single multi-page PDF
    const pngBuffers = await Promise.all(
      slideElements.map(async el => {
        const res = new ImageResponse(el, { width: SLIDE_W, height: SLIDE_H })
        const ab = await res.arrayBuffer()
        return Buffer.from(ab)
      })
    )

    const pdfBuffer = buildMultiPagePdfFromPngs(pngBuffers)
    const filename = `outpace-aging-${issue.shortSlug}-${deck}-carousel.pdf`

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Content-Length': String(pdfBuffer.length)
      }
    })
  } catch (err) {
    console.error('Error generating LinkedIn carousel PDF:', err)
    return new Response('Failed to generate LinkedIn carousel PDF', { status: 500 })
  }
}
