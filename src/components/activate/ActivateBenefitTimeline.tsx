import React from "react";
import { Clock, Calendar, CheckCircle, Zap } from "lucide-react";

const timelineItems = [
  {
    icon: Clock,
    time: "Today",
    stats: ["Steady Energy & Mental Clarity", "Fasting Pathways Engaged"],
    points: [
      "Clean mitochondrial ATP & morning mineral hydration with zero caffeine crash",
      "Extends overnight autophagy even alongside breakfast",
    ],
  },
  {
    icon: Calendar,
    time: "2 Weeks",
    stats: ["+90–142% Cellular NAD+ Benchmark"],
    points: [
      "Replenished intracellular NAD+ & phosphocreatine stamina",
      "Protected methylation balance with built-in TMG & Glycine",
    ],
  },
  {
    icon: CheckCircle,
    time: "1 Month",
    stats: ["Joint, Skin & Immune Resilience"],
    points: [
      "Dermal collagen & joint cartilage support via Glycine, Vitamin C & Glucosamine",
      "Improved exercise endurance, stress resilience & recovery",
    ],
  },
  {
    icon: Zap,
    time: "Long Term",
    stats: ["All 12 Hallmarks of Aging"],
    points: [
      "Supports cardiovascular health, DNA repair & neuroprotection",
      "Decelerates biological Pace of Aging for renewed youthful vitality",
    ],
  },
];

export function ActivateBenefitTimeline() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow (Matches BenefitTimeline.tsx) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none bg-[radial-gradient(circle,_var(--color-levl-cyan)_0%,_transparent_60%)] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Daily Health Benefits That Compound Over Time
          </h2>
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] text-sm font-medium text-[var(--color-levl-text-secondary)]">
            PhD Formulated • Physician Approved • Guided by LEVL&apos;s AI
            Synergy Engine
          </div>
        </div>

        <div className="relative">
          {/* Mobile Vertical Connector Line (100% opacity at edges -> 45% in middle) */}
          <div
            className="md:hidden absolute left-[2rem] top-8 bottom-8 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(14,165,233,1) 0%, rgba(14,165,233,0.45) 50%, rgba(14,165,233,1) 100%)",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {timelineItems.map((item, i) => {
              const colors = [
                "var(--color-levl-cyan)",
                "var(--color-levl-green)",
                "var(--color-levl-magenta)",
                "var(--color-levl-cyan)",
              ];
              const color = colors[i];

              return (
                <div
                  key={i}
                  className="relative flex md:flex-col items-start md:items-center gap-6 md:text-center group"
                >
                  {/* Desktop Segment Connector Bar Between Bubbles:
                      100% opacity at each bubble edge, dropping to 45% opacity in the middle */}
                  {i < timelineItems.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute top-[2rem] left-[calc(50%+2rem)] w-[calc(100%-4rem+1rem)] h-0.5 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(14,165,233,1) 0%, rgba(14,165,233,0.45) 50%, rgba(14,165,233,1) 100%)",
                      }}
                    />
                  )}

                  {/* Icon Bubble (Matches BenefitTimeline.tsx) */}
                  <div
                    className="w-16 h-16 rounded-full bg-[var(--color-levl-panel)] border flex items-center justify-center shrink-0 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative z-10"
                    style={{
                      borderColor: `color-mix(in srgb, ${color} 35%, transparent)`,
                    }}
                  >
                    <item.icon
                      className="w-6 h-6 transition-colors duration-500"
                      style={{ color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-2 md:pt-4 w-full">
                    <h4 className="text-xl font-bold text-white mb-4">
                      {item.time}
                    </h4>

                    {item.stats && item.stats.length > 0 && (
                      <div className="flex flex-col gap-2 mb-4 md:items-center">
                        {item.stats.map((stat, k) => (
                          <div
                            key={k}
                            className="inline-flex items-center px-3 py-1.5 rounded bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/20 text-[var(--color-levl-cyan)] text-xs font-bold uppercase tracking-wider text-center max-w-[220px] leading-snug"
                          >
                            {stat}
                          </div>
                        ))}
                      </div>
                    )}

                    <ul className="space-y-3">
                      {item.points.map((point, j) => (
                        <li
                          key={j}
                          className="text-sm text-[var(--color-levl-text-secondary)] leading-relaxed md:justify-center flex md:inline-flex items-start md:items-center gap-2"
                        >
                          <span className="mt-1 md:hidden opacity-50 text-[10px] shrink-0">
                            ■
                          </span>
                          <span className="text-left md:text-center">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
