import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getOutpaceAgingIssueBySlug, OUTPACE_AGING_ISSUES } from '@/lib/data/outpaceAgingIssues'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug') || 'edition-1'
    const type = searchParams.get('type') || 'study'
    const num = parseInt(searchParams.get('num') || '1', 10)

    const issue = getOutpaceAgingIssueBySlug(slug) || OUTPACE_AGING_ISSUES[0]

    // -------------------------------------------------------------------------
    // 1. LEV STATE OF PLAY 3-KPI STRIP PNG (1200 x 300)
    // -------------------------------------------------------------------------
    if (type === 'lev') {
      return new ImageResponse(
        (
          <div
            style={{
              width: '1200px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#060b16',
              padding: '26px 30px',
              fontFamily: 'sans-serif',
              color: '#f8fafc',
              border: '2px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '24px'
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
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#34d399'
                }}
              >
                LONGEVITY ESCAPE VELOCITY (LEV) STATE OF PLAY • EDITION #{issue.issueNumber}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#94a3b8'
                }}
              >
                levlhealth.com/newsletter/{issue.shortSlug}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                width: '100%',
                marginTop: '14px'
              }}
            >
              {/* Card 1: Optimal */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '22px 24px',
                  borderRadius: '20px',
                  backgroundColor: '#0b1528',
                  border: '2px solid rgba(16, 185, 129, 0.45)'
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
                      fontSize: '13px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: '#34d399'
                    }}
                  >
                    ESTIMATED LEV DATE • OPTIMAL
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(16, 185, 129, 0.18)',
                      color: '#6ee7b7',
                      fontSize: '12px',
                      fontWeight: 800
                    }}
                  >
                    Top 1%
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '38px',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginTop: '14px'
                  }}
                >
                  October 2036
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#34d399',
                    marginTop: '6px'
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
                  padding: '22px 24px',
                  borderRadius: '20px',
                  backgroundColor: '#0b1528',
                  border: '2px solid rgba(6, 182, 212, 0.45)'
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
                      fontSize: '13px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: '#22d3ee'
                    }}
                  >
                    ESTIMATED LEV DATE • ACTIVE
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(6, 182, 212, 0.18)',
                      color: '#67e8f9',
                      fontSize: '12px',
                      fontWeight: 800
                    }}
                  >
                    Top 20%
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '38px',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginTop: '14px'
                  }}
                >
                  February 2042
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#22d3ee',
                    marginTop: '6px'
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
                  padding: '22px 24px',
                  borderRadius: '20px',
                  backgroundColor: '#0b1528',
                  border: '2px solid rgba(168, 85, 247, 0.45)'
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
                      fontSize: '13px',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: '#c084fc'
                    }}
                  >
                    CURRENT PACE OF AGING
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(168, 85, 247, 0.18)',
                      color: '#d8b4fe',
                      fontSize: '12px',
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
                    gap: '10px',
                    marginTop: '14px'
                  }}
                >
                  <span style={{ fontSize: '38px', fontWeight: 900, color: '#ffffff' }}>0.67</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#94a3b8' }}>
                    Optimal vs 0.84 Active
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#c084fc',
                    marginTop: '6px'
                  }}
                >
                  -0.0035 yr/yr this week
                </div>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 300
        }
      )
    }

    // -------------------------------------------------------------------------
    // 2. PROTOCOL OR MODALITY TELEMETRY CARD PNG (1200 x 650)
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
              width: '1200px',
              height: '650px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#070c18',
              padding: '32px 36px',
              fontFamily: 'sans-serif',
              color: '#f8fafc',
              border: `2px solid ${borderColor}`,
              borderRadius: '24px'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
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
                    padding: '6px 14px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: `1px solid ${borderColor}`,
                    color: badgeColor,
                    fontSize: '14px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}
                >
                  {type === 'protocol' ? 'PROTOCOL OF THE WEEK' : 'MODALITY OF THE WEEK'} •{' '}
                  {item.badgeText}
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '6px 16px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.18)',
                    border: '1px solid rgba(52, 211, 153, 0.45)',
                    color: '#6ee7b7',
                    fontSize: '16px',
                    fontWeight: 900
                  }}
                >
                  Optimal Impact: {item.levlScoreOptimal}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  fontSize: '30px',
                  fontWeight: 900,
                  color: '#ffffff',
                  marginTop: '4px'
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '16px',
                  color: '#94a3b8'
                }}
              >
                {item.curveSpec.title}
              </div>
            </div>

            {/* 3 Hook Stat Boxes */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                width: '100%',
                marginTop: '12px'
              }}
            >
              {item.hookStats.map((st, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '18px 20px',
                    borderRadius: '18px',
                    backgroundColor: '#0f172a',
                    border: '1px solid rgba(56, 189, 248, 0.3)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '32px',
                      fontWeight: 900,
                      color: idx === 0 ? '#34d399' : idx === 1 ? '#38bdf8' : '#c084fc'
                    }}
                  >
                    {st.value}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginTop: '4px'
                    }}
                  >
                    {st.label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '13px',
                      color: '#94a3b8',
                      marginTop: '4px',
                      lineHeight: 1.35
                    }}
                  >
                    {st.sublabel}
                  </div>
                </div>
              ))}
            </div>

            {/* Targeted Longevity Vectors */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                padding: '20px 24px',
                borderRadius: '18px',
                backgroundColor: '#0b1322',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                marginTop: '12px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#38bdf8'
                }}
              >
                <span>TARGETED LONGEVITY VECTORS & BIOMARKER SHIFTS</span>
                <span>0-100 CLINICAL RUBRIC</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '100%'
                }}
              >
                {item.vectorScores.slice(0, 4).map((vec, vIdx) => (
                  <div
                    key={vIdx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        fontSize: '14px',
                        fontWeight: 700
                      }}
                    >
                      <span style={{ color: '#f1f5f9' }}>{vec.vectorName}</span>
                      <span style={{ color: '#34d399' }}>
                        {vec.score}/100 • {vec.effectStat}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        height: '10px',
                        borderRadius: '999px',
                        backgroundColor: '#1e293b',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: `${Math.max(10, Math.min(100, vec.score))}%`,
                          height: '100%',
                          borderRadius: '999px',
                          backgroundColor: vec.color || '#10b981'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                fontSize: '13px',
                color: '#94a3b8',
                marginTop: '8px'
              }}
            >
              <span>OUTPACE AGING • LEVL WEEKLY LONGEVITY ROUNDUP</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                Interactive Protocol & Dosing Tiers: levlhealth.com/newsletter/{issue.shortSlug}
              </span>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 650
        }
      )
    }

    // -------------------------------------------------------------------------
    // 3. STUDY GRAPH CARD PNG (1200 x 620)
    // -------------------------------------------------------------------------
    const study =
      issue.studies.find(s => s.number === num) ||
      issue.studies[Math.max(0, Math.min(issue.studies.length - 1, num - 1))]

    const barColors = ['#10b981', '#38bdf8', '#a855f7', '#f59e0b']

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '620px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#070b16',
            padding: '32px 38px',
            fontFamily: 'sans-serif',
            color: '#f8fafc',
            border: '2px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '24px'
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
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
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(6, 182, 212, 0.16)',
                  border: '1px solid rgba(34, 211, 238, 0.45)',
                  color: '#67e8f9',
                  fontSize: '14px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                STUDY #{study.number} • {study.journal} ({study.publishDate})
              </div>

              <div
                style={{
                  display: 'flex',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(16, 185, 129, 0.18)',
                  border: '1px solid rgba(52, 211, 153, 0.5)',
                  color: '#6ee7b7',
                  fontSize: '15px',
                  fontWeight: 900
                }}
              >
                {study.keyStatBadge}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '28px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.25,
                marginTop: '4px'
              }}
            >
              {study.visualSpec.chartTitle}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '16px',
                color: '#94a3b8'
              }}
            >
              {study.visualSpec.chartSubtitle}
            </div>
          </div>

          {/* Cohort Comparison Bars */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              width: '100%',
              padding: '24px 28px',
              borderRadius: '20px',
              backgroundColor: '#0c1425',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              marginTop: '12px'
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
                      fontSize: '16px',
                      fontWeight: 700
                    }}
                  >
                    <span style={{ color: '#f1f5f9' }}>{bar.label}</span>
                    <span style={{ color, fontWeight: 800 }}>{bar.deltaText}</span>
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

          {/* Footer Source & Link */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '12px 18px',
              borderRadius: '14px',
              backgroundColor: '#0b1322',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              fontSize: '13px',
              color: '#94a3b8'
            }}
          >
            <span>{study.visualSpec.sourceFigureBadge}</span>
            <span style={{ color: '#34d399', fontWeight: 800 }}>
              Interactive Telemetry & Geek Mode: levlhealth.com/newsletter/{issue.shortSlug}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 620
      }
    )
  } catch (err) {
    console.error('Error generating newsletter card PNG:', err)
    return new Response('Failed to generate newsletter card PNG', { status: 500 })
  }
}
