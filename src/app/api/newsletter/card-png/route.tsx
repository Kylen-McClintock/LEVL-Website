import fs from 'fs'
import path from 'path'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getOutpaceAgingIssueBySlug, OUTPACE_AGING_ISSUES } from '@/lib/data/outpaceAgingIssues'

export const runtime = 'nodejs'

function readPublicImageAsDataUrl(relPath: string): string | null {
  try {
    const cleanRel = relPath.startsWith('/') ? relPath.slice(1) : relPath
    const fullPath = path.join(process.cwd(), 'public', cleanRel)
    const buf = fs.readFileSync(fullPath)
    const ext = path.extname(fullPath).toLowerCase()
    const mime =
      ext === '.png'
        ? 'image/png'
        : ext === '.webp'
          ? 'image/webp'
          : 'image/jpeg'
    return `data:${mime};base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug') || 'edition-1'
    const type = searchParams.get('type') || 'study'
    const num = parseInt(searchParams.get('num') || '1', 10)

    const issue = getOutpaceAgingIssueBySlug(slug) || OUTPACE_AGING_ISSUES[0]

    // -------------------------------------------------------------------------
    // 1. LEV STATE OF PLAY 3-KPI STRIP PNG (800 x 175 — Zero Outer Box/Border!)
    // -------------------------------------------------------------------------
    if (type === 'lev') {
      return new ImageResponse(
        (
          <div
            style={{
              width: '800px',
              height: '175px',
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              backgroundColor: 'transparent',
              fontFamily: 'sans-serif',
              color: '#f8fafc'
            }}
          >
            {/* Card 1: Optimal */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px 18px',
                borderRadius: '18px',
                backgroundColor: '#0b1528',
                border: '2px solid rgba(16, 185, 129, 0.5)'
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
                <div
                  style={{
                    display: 'flex',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    color: '#34d399'
                  }}
                >
                  ESTIMATED LEV • OPTIMAL
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#6ee7b7',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  Top 1%
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}
              >
                October 2036
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#34d399'
                }}
              >
                26 days closer this week
              </div>
            </div>

            {/* Card 2: Active */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px 18px',
                borderRadius: '18px',
                backgroundColor: '#0b1528',
                border: '2px solid rgba(6, 182, 212, 0.5)'
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
                <div
                  style={{
                    display: 'flex',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    color: '#22d3ee'
                  }}
                >
                  ESTIMATED LEV • ACTIVE
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(6, 182, 212, 0.2)',
                    color: '#67e8f9',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  Top 20%
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}
              >
                February 2042
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#22d3ee'
                }}
              >
                16 days closer this week
              </div>
            </div>

            {/* Card 3: Pace of Aging */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px 18px',
                borderRadius: '18px',
                backgroundColor: '#0b1528',
                border: '2px solid rgba(168, 85, 247, 0.5)'
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
                <div
                  style={{
                    display: 'flex',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    color: '#c084fc'
                  }}
                >
                  PACE OF AGING
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    color: '#d8b4fe',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                >
                  bio-yrs/yr
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff' }}>0.67</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
                  vs 0.84 Active
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#c084fc'
                }}
              >
                -0.0035 yr/yr this week
              </div>
            </div>
          </div>
        ),
        {
          width: 800,
          height: 175
        }
      )
    }

    // -------------------------------------------------------------------------
    // 2. SOCIAL-MEDIA STYLE HERO COVER PNG FOR PROTOCOL & MODALITY (800 x 680)
    //    Includes: Taller vertical layout, # Steps & Time top-left, +Score & LEVL
    //    logo top-right, Creator Avatar + Name, Title, Promise, & 3 Hook Stats!
    // -------------------------------------------------------------------------
    if (type === 'protocol-hero' || type === 'modality-hero') {
      const isProtocol = type === 'protocol-hero'
      const item = isProtocol ? issue.protocolOfTheWeek : issue.modalityOfTheWeek
      const heroDataUrl = readPublicImageAsDataUrl(item.heroImageUrl)
      const logoDataUrl = readPublicImageAsDataUrl('/images/discover/levl_logo_official.png')
      const avatarDataUrl = readPublicImageAsDataUrl(
        item.creatorAvatarUrl || '/images/discover/creator_sketch_avatar.jpg'
      )

      const scoreNumber = item.levlScoreOptimal.replace(/\s*LEVL/i, '').trim()
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

      return new ImageResponse(
        (
          <div
            style={{
              width: '800px',
              height: '680px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              backgroundColor: '#040814',
              borderRadius: '24px',
              overflow: 'hidden',
              fontFamily: 'sans-serif',
              color: '#f8fafc',
              border: isProtocol
                ? '2px solid rgba(168, 85, 247, 0.45)'
                : '2px solid rgba(16, 185, 129, 0.45)'
            }}
          >
            {/* Full-bleed Hero Background Image */}
            {heroDataUrl && (
              <img
                src={heroDataUrl}
                alt={item.name}
                width={800}
                height={680}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '800px',
                  height: '680px',
                  objectFit: 'cover'
                }}
              />
            )}

            {/* Editorial Top & Bottom Dark Legibility Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '800px',
                height: '680px',
                display: 'flex',
                background:
                  'linear-gradient(180deg, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.12) 24%, rgba(2,6,23,0.22) 44%, rgba(2,6,23,0.90) 66%, rgba(2,6,23,0.98) 100%)'
              }}
            />

            {/* TOP ROW: # Steps & Time (Left) + Score & Official LEVL Logo (Right) */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '24px 28px 0 28px'
              }}
            >
              {/* Top-Left: # Steps & Time Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(2, 6, 23, 0.82)',
                  border: isProtocol
                    ? '1.5px solid rgba(192, 132, 252, 0.55)'
                    : '1.5px solid rgba(52, 211, 153, 0.55)'
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isProtocol ? '#e9d5ff' : '#a7f3d0'
                  }}
                >
                  {isProtocol ? 'PROTOCOL' : 'MODALITY'} • {stepsBadge}
                </span>
              </div>

              {/* Top-Right: Unbordered Bright Green Score Boost + Official LEVL Logo */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 14px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(2, 6, 23, 0.72)'
                }}
              >
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#34d399',
                    letterSpacing: '-0.03em'
                  }}
                >
                  {scoreNumber}
                </span>
                {logoDataUrl ? (
                  <img
                    src={logoDataUrl}
                    alt="LEVL"
                    height={22}
                    style={{
                      height: '22px',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: '20px',
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

            {/* BOTTOM STACK: Title + Creator Row + Promise + 3 Hook Stat Cards */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                padding: '0 28px 26px 28px'
              }}
            >
              {/* Title */}
              <div
                style={{
                  display: 'flex',
                  fontSize: '34px',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em'
                }}
              >
                {item.name}
              </div>

              {/* Creator Avatar + Creator Name & Affiliation */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {avatarDataUrl && (
                  <img
                    src={avatarDataUrl}
                    alt={creatorName}
                    width={30}
                    height={30}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '999px',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(52, 211, 153, 0.7)'
                    }}
                  />
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#6ee7b7'
                  }}
                >
                  <span>{creatorName}</span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{creatorAffiliation}</span>
                </div>
              </div>

              {/* One-Line Promise */}
              <div
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  lineHeight: 1.38
                }}
              >
                {item.oneLinePromise}
              </div>

              {/* 3 Prominent Hook Stat Cards Overlaid at Bottom of Hero Image */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '12px',
                  width: '100%',
                  marginTop: '4px'
                }}
              >
                {item.hookStats.map((st, idx) => {
                  const valColor =
                    idx === 0 ? '#34d399' : idx === 1 ? '#38bdf8' : '#c084fc'
                  const borderAccent =
                    idx === 0
                      ? 'rgba(52, 211, 153, 0.45)'
                      : idx === 1
                        ? 'rgba(56, 189, 248, 0.45)'
                        : 'rgba(192, 132, 252, 0.45)'
                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(6, 12, 26, 0.88)',
                        border: `1.5px solid ${borderAccent}`
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '26px',
                          fontWeight: 900,
                          color: valColor,
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {st.value}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '14px',
                          fontWeight: 800,
                          color: '#ffffff',
                          marginTop: '3px'
                        }}
                      >
                        {st.label}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '11.5px',
                          color: '#cbd5e1',
                          marginTop: '3px',
                          lineHeight: 1.28
                        }}
                      >
                        {st.sublabel}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ),
        {
          width: 800,
          height: 680
        }
      )
    }

    // -------------------------------------------------------------------------
    // 3. PROTOCOL OR MODALITY VECTOR & TELEMETRY CARD PNG (800 x 380 — Single Flat Card!)
    // -------------------------------------------------------------------------
    if (type === 'protocol' || type === 'modality') {
      const item = type === 'protocol' ? issue.protocolOfTheWeek : issue.modalityOfTheWeek
      const badgeColor = type === 'protocol' ? '#c084fc' : '#34d399'
      const borderColor =
        type === 'protocol' ? 'rgba(168, 85, 247, 0.45)' : 'rgba(16, 185, 129, 0.45)'

      return new ImageResponse(
        (
          <div
            style={{
              width: '800px',
              height: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#070c18',
              padding: '22px 26px',
              fontFamily: 'sans-serif',
              color: '#f8fafc',
              border: `2px solid ${borderColor}`,
              borderRadius: '20px'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: '12px',
                    fontWeight: 900,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: badgeColor
                  }}
                >
                  TARGETED LONGEVITY VECTORS & BIOMARKER SHIFTS
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(16, 185, 129, 0.18)',
                    color: '#6ee7b7',
                    fontSize: '13px',
                    fontWeight: 900
                  }}
                >
                  Optimal Impact: {item.levlScoreOptimal}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  fontSize: '21px',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1.2
                }}
              >
                {item.curveSpec.title}
              </div>
            </div>

            {/* Targeted Longevity Vectors Directly on Card (Zero Nested Box!) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                marginTop: '6px'
              }}
            >
              {item.vectorScores.slice(0, 4).map((vec, vIdx) => (
                <div
                  key={vIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      fontSize: '15px',
                      fontWeight: 800
                    }}
                  >
                    <span style={{ color: '#f8fafc' }}>{vec.vectorName}</span>
                    <span style={{ color: '#34d399' }}>
                      {vec.score}/100 • {vec.effectStat}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '13px',
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

            {/* Clean Single-Line Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingTop: '10px',
                borderTop: '1px solid rgba(148, 163, 184, 0.16)',
                fontSize: '12px',
                color: '#94a3b8'
              }}
            >
              <span>0–100 Calibrated Clinical Rubric • PubMed Verified</span>
              <span style={{ color: '#38bdf8', fontWeight: 800 }}>
                levlhealth.com/newsletter/{issue.shortSlug}
              </span>
            </div>
          </div>
        ),
        {
          width: 800,
          height: 380
        }
      )
    }

    // -------------------------------------------------------------------------
    // 4. STUDY GRAPH CARD PNG (800 x 390 — Single Flat Card, Zero Inner Boxes!)
    // -------------------------------------------------------------------------
    const study =
      issue.studies.find(s => s.number === num) ||
      issue.studies[Math.max(0, Math.min(issue.studies.length - 1, num - 1))]

    const barColors = ['#10b981', '#38bdf8', '#a855f7', '#f59e0b']

    return new ImageResponse(
      (
        <div
          style={{
            width: '800px',
            height: '390px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#070b16',
            padding: '22px 26px',
            fontFamily: 'sans-serif',
            color: '#f8fafc',
            border: '2px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '20px'
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: '12px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#38bdf8'
                }}
              >
                STUDY #{study.number} • {study.journal} ({study.publishDate})
              </div>

              <div
                style={{
                  display: 'flex',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(52, 211, 153, 0.5)',
                  color: '#6ee7b7',
                  fontSize: '13px',
                  fontWeight: 900
                }}
              >
                {study.keyStatBadge}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '22px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.22,
                marginTop: '2px'
              }}
            >
              {study.visualSpec.chartTitle}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '13.5px',
                color: '#94a3b8'
              }}
            >
              {study.visualSpec.chartSubtitle}
            </div>
          </div>

          {/* Cohort Comparison Bars Directly on Card (Zero Nested Box!) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              width: '100%',
              marginTop: '6px'
            }}
          >
            {study.visualSpec.cohortBars.slice(0, 4).map((bar, idx) => {
              const color = barColors[idx % barColors.length]
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
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
                    <span style={{ color: '#f8fafc' }}>{bar.label}</span>
                    <span style={{ color, fontWeight: 900 }}>{bar.deltaText}</span>
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
                        width: `${Math.max(12, Math.min(100, bar.percentWidth))}%`,
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

          {/* Clean Single-Line Footer (Zero Nested Box!) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '10px',
              borderTop: '1px solid rgba(148, 163, 184, 0.16)',
              fontSize: '12px',
              color: '#94a3b8'
            }}
          >
            <span>{study.visualSpec.sourceFigureBadge}</span>
            <span style={{ color: '#34d399', fontWeight: 800 }}>
              Interactive Graph: levlhealth.com/newsletter/{issue.shortSlug}
            </span>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 390
      }
    )
  } catch (err) {
    console.error('Error generating newsletter card PNG:', err)
    return new Response('Failed to generate newsletter card PNG', { status: 500 })
  }
}
