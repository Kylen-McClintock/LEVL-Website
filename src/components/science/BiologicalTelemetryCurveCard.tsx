'use client'

import React, { useState, useEffect, useId } from 'react'
import { Activity, ExternalLink, Sparkles, Zap } from 'lucide-react'
import {
  BiologicalCurveSpec,
  BioCurveColorScheme,
  getBiologicalCurvesForModality,
  getBiologicalCurvesForApplet,
  getBiologicalCurvesForProtocol
} from '@/lib/data/biologicalCurves'

interface BiologicalTelemetryCurveCardProps {
  curves?: BiologicalCurveSpec[]
  modalityId?: string | null
  modalityName?: string | null
  category?: string | null
  appletKey?: string | null
  protocolId?: string | null
  protocolName?: string | null
  edgeToEdge?: boolean
  isLightMode?: boolean
  className?: string
}

const COLOR_SCHEMES: Record<
  BioCurveColorScheme,
  {
    gradStart: string
    gradMid: string
    gradEnd: string
    fillStart: string
    nodeStroke: string
    nodeActiveFill: string
    legendText: string
    hudBg: string
    hudBorder: string
    hudBadgeBg: string
    hudBadgeText: string
  }
> = {
  cyan_emerald: {
    gradStart: '#06b6d4',
    gradMid: '#10b981',
    gradEnd: '#3b82f6',
    fillStart: '#10b981',
    nodeStroke: '#22d3ee',
    nodeActiveFill: '#22d3ee',
    legendText: 'text-cyan-300',
    hudBg: 'bg-cyan-950/35',
    hudBorder: 'border-cyan-500/35',
    hudBadgeBg: 'bg-cyan-500/20 border-cyan-400/40',
    hudBadgeText: 'text-cyan-200'
  },
  amber_cyan: {
    gradStart: '#f59e0b',
    gradMid: '#10b981',
    gradEnd: '#06b6d4',
    fillStart: '#f59e0b',
    nodeStroke: '#fbbf24',
    nodeActiveFill: '#fbbf24',
    legendText: 'text-amber-300',
    hudBg: 'bg-amber-950/30',
    hudBorder: 'border-amber-500/35',
    hudBadgeBg: 'bg-amber-500/20 border-amber-400/40',
    hudBadgeText: 'text-amber-200'
  },
  emerald_teal: {
    gradStart: '#10b981',
    gradMid: '#14b8a6',
    gradEnd: '#06b6d4',
    fillStart: '#10b981',
    nodeStroke: '#34d399',
    nodeActiveFill: '#34d399',
    legendText: 'text-emerald-300',
    hudBg: 'bg-emerald-950/30',
    hudBorder: 'border-emerald-500/35',
    hudBadgeBg: 'bg-emerald-500/20 border-emerald-400/40',
    hudBadgeText: 'text-emerald-200'
  },
  purple_cyan: {
    gradStart: '#a855f7',
    gradMid: '#06b6d4',
    gradEnd: '#10b981',
    fillStart: '#a855f7',
    nodeStroke: '#c084fc',
    nodeActiveFill: '#c084fc',
    legendText: 'text-purple-300',
    hudBg: 'bg-purple-950/35',
    hudBorder: 'border-purple-500/35',
    hudBadgeBg: 'bg-purple-500/20 border-purple-400/40',
    hudBadgeText: 'text-purple-200'
  },
  rose_amber: {
    gradStart: '#f43f5e',
    gradMid: '#f59e0b',
    gradEnd: '#10b981',
    fillStart: '#f43f5e',
    nodeStroke: '#fb7185',
    nodeActiveFill: '#fbbf24',
    legendText: 'text-amber-300',
    hudBg: 'bg-rose-950/30',
    hudBorder: 'border-rose-500/35',
    hudBadgeBg: 'bg-rose-500/20 border-rose-400/40',
    hudBadgeText: 'text-rose-200'
  }
}

const ZONE_TINTS: Record<string, { fill: string; text: string }> = {
  slate: { fill: '#334155', text: '#94a3b8' },
  cyan: { fill: '#06b6d4', text: '#67e8f9' },
  emerald: { fill: '#10b981', text: '#6ee7b7' },
  amber: { fill: '#f59e0b', text: '#fcd34d' },
  rose: { fill: '#f43f5e', text: '#fda4af' },
  purple: { fill: '#a855f7', text: '#d8b4fe' }
}

export const BiologicalTelemetryCurveCard: React.FC<BiologicalTelemetryCurveCardProps> = ({
  curves: explicitCurves,
  modalityId,
  modalityName,
  category,
  appletKey,
  protocolId,
  protocolName,
  edgeToEdge = false,
  isLightMode = false,
  className = ''
}) => {
  const uniqueSvgId = useId().replace(/:/g, '')

  const resolvedCurves: BiologicalCurveSpec[] = React.useMemo(() => {
    if (explicitCurves && explicitCurves.length > 0) return explicitCurves
    if (appletKey) return getBiologicalCurvesForApplet(appletKey, modalityName)
    if (protocolId || protocolName) return getBiologicalCurvesForProtocol(protocolId, protocolName)
    return getBiologicalCurvesForModality(modalityId, modalityName, category)
  }, [explicitCurves, appletKey, protocolId, protocolName, modalityId, modalityName, category])

  const [activeCurveIdx, setActiveCurveIdx] = useState(0)
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(0)

  useEffect(() => {
    setActiveCurveIdx(0)
    setSelectedNodeIdx(0)
  }, [modalityId, appletKey, protocolId])

  useEffect(() => {
    setSelectedNodeIdx(0)
  }, [activeCurveIdx])

  if (!resolvedCurves || resolvedCurves.length === 0) return null

  const activeSpec = resolvedCurves[activeCurveIdx] || resolvedCurves[0]
  const theme = COLOR_SCHEMES[activeSpec.colorScheme] || COLOR_SCHEMES.cyan_emerald
  const activeNode = activeSpec.nodes[selectedNodeIdx] || activeSpec.nodes[0]
  const isWarningSecondary = activeSpec.secondaryCurve.style === 'dashed_warning'

  return (
    <div
      className={
        edgeToEdge
          ? `rounded-2xl ${
              isLightMode
                ? 'bg-white border border-slate-200 shadow-lg text-slate-900'
                : 'bg-[#070B14] border border-slate-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.65)] keep-white'
            } overflow-hidden text-left ${className}`
          : `rounded-2xl ${
              isLightMode
                ? 'bg-white border border-slate-200/90 shadow-md text-slate-900'
                : 'bg-[#070B14] border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.65)] keep-white'
            } p-3.5 sm:p-4 space-y-3 text-left ${className}`
      }
    >
      {/* Top Bar: Telemetry Badge + Multi-Curve Switcher Tabs */}
      <div
        className={
          edgeToEdge
            ? 'px-2.5 pt-2 pb-1.5 flex flex-col gap-1'
            : 'space-y-2.5'
        }
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-1.5 border-b ${
            isLightMode ? 'border-slate-200' : 'border-white/10'
          } pb-1.5`}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                isLightMode
                  ? 'bg-cyan-50 border border-cyan-300 text-cyan-800'
                  : 'bg-cyan-500/15 border border-cyan-400/35 text-cyan-300'
              }`}
            >
              <Activity size={10} className={isLightMode ? 'text-cyan-700' : 'text-cyan-400'} />
              <span>Bio-Telemetry</span>
            </span>

            <a
              href={activeSpec.citation.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`text-[10px] font-mono ${
                isLightMode
                  ? 'text-slate-600 hover:text-cyan-700'
                  : 'text-slate-400 hover:text-cyan-300'
              } transition-colors inline-flex items-center gap-1`}
              title={`View PubMed Study: ${activeSpec.citation.study}`}
            >
              <span>{activeSpec.citation.study}</span>
              <span className={isLightMode ? 'text-cyan-700 font-bold' : 'text-cyan-400 font-bold'}>
                (PMID: {activeSpec.citation.pmid})
              </span>
              <ExternalLink size={9} className="shrink-0" />
            </a>
          </div>

          {resolvedCurves.length > 1 && (
            <div className="flex items-center gap-1 flex-wrap">
              {resolvedCurves.map((c, idx) => {
                const isTabActive = idx === activeCurveIdx
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      setActiveCurveIdx(idx)
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      isTabActive
                        ? isLightMode
                          ? 'bg-cyan-600 text-white border border-cyan-700 shadow-sm'
                          : 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                        : isLightMode
                          ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-transparent'
                          : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    {c.tabLabel}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Title & Dual-Curve Legend — Stacked Vertically so Title/Subtitle Always Span 100% Width */}
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <h4
              className={`text-sm sm:text-base font-black ${
                isLightMode ? 'text-slate-900' : 'text-white'
              } tracking-tight leading-snug`}
            >
              {activeSpec.title}
            </h4>
            {!edgeToEdge && (
              <p
                className={`text-xs ${
                  isLightMode ? 'text-slate-600' : 'text-slate-400'
                } mt-0.5 leading-relaxed`}
              >
                {activeSpec.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] sm:text-[11px] font-mono">
            <span
              className={`${
                isLightMode ? 'text-cyan-800' : theme.legendText
              } font-bold flex items-center gap-1.5`}
            >
              <span className="inline-block w-3 h-0.5 rounded-full bg-cyan-500 shadow-[0_0_6px_#22d3ee] shrink-0" />
              <span>{activeSpec.solidCurve.label}</span>
            </span>
            <span
              className={`${
                isWarningSecondary
                  ? isLightMode
                    ? 'text-rose-700 font-semibold'
                    : 'text-rose-400/90'
                  : isLightMode
                    ? 'text-sky-700 font-semibold'
                    : 'text-sky-300/90'
              } flex items-center gap-1.5`}
            >
              <span
                className={`inline-block w-3 border-b-2 shrink-0 ${
                  isWarningSecondary
                    ? 'border-dashed border-rose-500'
                    : 'border-dotted border-sky-500'
                }`}
              />
              <span>{activeSpec.secondaryCurve.label}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main SVG Telemetry Canvas */}
      <div
        className={
          edgeToEdge
            ? 'relative w-full bg-[#050912] border-y border-slate-800/70 overflow-hidden'
            : `relative w-full rounded-xl bg-slate-950/95 border ${
                isLightMode ? 'border-slate-300 shadow-inner' : 'border-white/10'
              } p-2 sm:p-2.5 overflow-hidden`
        }
      >
        <svg
          viewBox={edgeToEdge ? '6 8 532 186' : '0 0 560 202'}
          className={
            edgeToEdge
              ? 'w-full h-[126px] sm:h-[136px] block select-none'
              : 'w-full h-44 sm:h-48 overflow-visible select-none'
          }
          role="img"
          aria-label={activeSpec.title}
        >
          <defs>
            <linearGradient id={`strokeGrad_${uniqueSvgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme.gradStart} />
              <stop offset="50%" stopColor={theme.gradMid} />
              <stop offset="100%" stopColor={theme.gradEnd} />
            </linearGradient>

            <linearGradient id={`peakCrest_${uniqueSvgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="35%" stopColor="#facc15" />
              <stop offset="70%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>

            <linearGradient id={`areaFill_${uniqueSvgId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.fillStart} stopOpacity="0.28" />
              <stop offset="85%" stopColor={theme.gradMid} stopOpacity="0.05" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.0" />
            </linearGradient>

            <filter id={`neonGlow_${uniqueSvgId}`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={theme.nodeStroke} floodOpacity="0.55" />
            </filter>
          </defs>

          {/* Optional Semantic Phase Zones */}
          {activeSpec.phaseZones?.map((zone, zIdx) => {
            const zColor = ZONE_TINTS[zone.tint] || ZONE_TINTS.slate
            return (
              <g key={zIdx}>
                <rect
                  x={zone.x}
                  y={14}
                  width={zone.width}
                  height={161}
                  rx={4}
                  fill={zColor.fill}
                  opacity={0.07}
                />
                <text
                  x={zone.x + zone.width / 2}
                  y={25}
                  fill={zColor.text}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                  opacity={0.85}
                >
                  {zone.label}
                </text>
              </g>
            )
          })}

          {/* Horizontal Telemetry Reference Gridlines & Y-Axis Ticks */}
          {[36, 98, 158].map((gridY, gIdx) => (
            <g key={gridY}>
              <line
                x1={52}
                y1={gridY}
                x2={530}
                y2={gridY}
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text
                x={46}
                y={gridY + 3}
                fill="#64748b"
                fontSize="9.5"
                fontFamily="monospace"
                textAnchor="end"
              >
                {activeSpec.yAxisTicks[gIdx]}
              </text>
            </g>
          ))}

          {/* X-Axis Baseline */}
          <line x1={52} y1={175} x2={530} y2={175} stroke="#334155" strokeWidth="1.5" />

          {/* Optional Calibrated Threshold Line */}
          {activeSpec.thresholdLine && (
            <g>
              <line
                x1={52}
                y1={activeSpec.thresholdLine.y}
                x2={530}
                y2={activeSpec.thresholdLine.y}
                stroke={activeSpec.thresholdLine.color}
                strokeWidth="1.25"
                strokeDasharray="6,4"
                opacity={0.85}
              />
              <rect
                x={58}
                y={activeSpec.thresholdLine.y - 14}
                width={Math.min(activeSpec.thresholdLine.label.length * 5.3 + 12, 340)}
                height={13}
                rx={3}
                fill="#020617"
                opacity={0.85}
              />
              <text
                x={62}
                y={activeSpec.thresholdLine.y - 4.5}
                fill={activeSpec.thresholdLine.color}
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {activeSpec.thresholdLine.label}
              </text>
            </g>
          )}

          {/* Area Fill Under Primary Solid Curve */}
          <path d={activeSpec.solidCurve.areaPath} fill={`url(#areaFill_${uniqueSvgId})`} />

          {/* Secondary Comparison / Crossover Curve */}
          <path
            d={activeSpec.secondaryCurve.path}
            fill="none"
            stroke={isWarningSecondary ? '#fb7185' : '#38bdf8'}
            strokeWidth={isWarningSecondary ? '2.25' : '2.5'}
            strokeDasharray={isWarningSecondary ? '5,5' : '3,3'}
            strokeLinecap="round"
            opacity={0.82}
          />

          {/* Primary Optimal Vector Curve */}
          <path
            d={activeSpec.solidCurve.path}
            fill="none"
            stroke={`url(#strokeGrad_${uniqueSvgId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            filter={`url(#neonGlow_${uniqueSvgId})`}
          />

          {/* Optional Peak Crest Prismatic Highlight */}
          {activeSpec.solidCurve.peakHighlightPath && (
            <path
              d={activeSpec.solidCurve.peakHighlightPath}
              fill="none"
              stroke={`url(#peakCrest_${uniqueSvgId})`}
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity={0.95}
            />
          )}

          {/* Active Node Vertical Hairline Guide */}
          {activeNode && (
            <line
              x1={activeNode.x}
              y1={activeNode.y}
              x2={activeNode.x}
              y2={175}
              stroke={activeNode.curve === 'secondary' && isWarningSecondary ? '#fb7185' : theme.nodeStroke}
              strokeWidth="1"
              strokeDasharray="2,3"
              opacity={0.6}
            />
          )}

          {/* Interactive Telemetry Nodes on Curve */}
          {activeSpec.nodes.map((node, idx) => {
            const isSelected = idx === selectedNodeIdx
            const isSecWarn = node.curve === 'secondary' && isWarningSecondary
            const strokeColor = isSecWarn ? '#fb7185' : theme.nodeStroke
            const fillColor = isSelected ? (isSecWarn ? '#fb7185' : theme.nodeActiveFill) : '#090d16'

            // Keep floating tag inside horizontal bounds
            const pillWidth = Math.max(node.valueTag.length * 6.2 + 16, 68)
            const clampedX = Math.min(Math.max(node.x - pillWidth / 2, 54), 530 - pillWidth)
            const pillY = node.y > 46 ? node.y - 26 : node.y + 10

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onClick={e => {
                  e.stopPropagation()
                  setSelectedNodeIdx(idx)
                }}
              >
                {isSelected && (
                  <>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={12}
                      fill={strokeColor}
                      opacity={0.22}
                    />
                    <rect
                      x={clampedX}
                      y={pillY}
                      width={pillWidth}
                      height={17}
                      rx={4}
                      fill="#0f172a"
                      stroke={strokeColor}
                      strokeWidth="1.2"
                    />
                    <text
                      x={clampedX + pillWidth / 2}
                      y={pillY + 11.5}
                      fill="#f8fafc"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.valueTag}
                    </text>
                  </>
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={edgeToEdge ? (isSelected ? 9.5 : 8) : isSelected ? 6 : 4.5}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                />
                {edgeToEdge && (
                  <text
                    x={node.x}
                    y={node.y + 3.2}
                    fill={isSelected ? '#020617' : '#e2e8f0'}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {idx + 1}
                  </text>
                )}
              </g>
            )
          })}

          {/* X-Axis Labels */}
          {activeSpec.xAxisLabels.map((lbl, idx) => {
            const count = activeSpec.xAxisLabels.length
            const x = 56 + idx * (468 / Math.max(count - 1, 1))
            return (
              <text
                key={idx}
                x={x}
                y={edgeToEdge ? 190 : 193}
                fill="#94a3b8"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {lbl}
              </text>
            )
          })}
        </svg>
      </div>

      {/* Interactive Node Selector Pills + Bottom HUD Readout Box */}
      <div className={edgeToEdge ? 'px-2.5 pb-2 pt-1.5 space-y-1.5' : 'space-y-3'}>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[9px] font-mono uppercase tracking-wider ${
              isLightMode ? 'text-slate-600' : 'text-slate-400'
            } font-bold mr-0.5`}
          >
            {edgeToEdge ? 'Tap Node:' : 'Inspect Curve Point:'}
          </span>
          {activeSpec.nodes.map((node, idx) => {
            const isSelected = idx === selectedNodeIdx
            const isSecWarn = node.curve === 'secondary' && isWarningSecondary
            return (
              <button
                key={idx}
                type="button"
                onClick={e => {
                  e.stopPropagation()
                  setSelectedNodeIdx(idx)
                }}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? isLightMode
                      ? isSecWarn
                        ? 'bg-rose-600 text-white border border-rose-700 font-bold shadow-sm'
                        : 'bg-cyan-700 text-white border border-cyan-800 font-bold shadow-sm'
                      : isSecWarn
                        ? 'bg-rose-500/25 text-rose-200 border border-rose-400/50 font-bold shadow-sm'
                        : `${theme.hudBadgeBg} ${theme.hudBadgeText} border font-bold shadow-sm`
                    : isLightMode
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
                }`}
              >
                <span>{node.badge}</span>
              </button>
            )
          })}
        </div>

        {/* Bottom HUD Readout Box: Active Node Mechanism + Key Citation Takeaway */}
        {activeNode && (
          <div
            className={`${edgeToEdge ? 'p-2' : 'p-3'} rounded-xl border ${
              isLightMode
                ? activeNode.curve === 'secondary' && isWarningSecondary
                  ? 'bg-rose-50/90 border-rose-200'
                  : 'bg-slate-50 border-slate-200'
                : activeNode.curve === 'secondary' && isWarningSecondary
                  ? 'bg-rose-950/30 border-rose-500/35'
                  : `${theme.hudBg} ${theme.hudBorder}`
            } space-y-1.5 transition-all duration-150`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`text-[11px] sm:text-xs font-extrabold ${
                  isLightMode ? 'text-slate-900' : 'text-white'
                } flex items-center gap-1.5`}
              >
                <Zap
                  size={12}
                  className={
                    activeNode.curve === 'secondary' && isWarningSecondary
                      ? isLightMode
                        ? 'text-rose-600'
                        : 'text-rose-400'
                      : isLightMode
                        ? 'text-cyan-700'
                        : 'text-cyan-400'
                  }
                />
                <span>{activeNode.badge}</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                  isLightMode
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-black/50 border-white/10 text-amber-300'
                }`}
              >
                {activeNode.valueTag}
              </span>
            </div>
            <p
              className={`text-xs ${
                isLightMode ? 'text-slate-700' : 'text-slate-200'
              } leading-relaxed ${edgeToEdge ? 'line-clamp-2' : ''}`}
            >
              {activeNode.mechanismDetail}
            </p>
            <div
              className={`pt-1.5 border-t ${
                isLightMode ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'
              } flex items-center justify-between gap-2 text-[10px] font-mono flex-wrap`}
            >
              <span
                className={`flex items-center gap-1 ${
                  isLightMode ? 'text-emerald-700' : 'text-emerald-300'
                } font-semibold`}
              >
                <Sparkles size={10} />
                <span>Outcome: {activeSpec.citation.keyMetric}</span>
              </span>
              <span>Y-Axis: {activeSpec.yAxisLabel}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BiologicalTelemetryCurveCard
