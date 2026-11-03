import React from "react";
import Image from "next/image";
import { Calendar, CheckCircle, Clock, Dna, Sparkles, Zap } from "lucide-react";
import { activateContent } from "@/content/productActivate";

const TIMELINE_ICONS = [Clock, Zap, Calendar, Dna];

const TIMELINE_ELEMENT_FRAMES = [
  {
    symbol: "D1",
    code: "01 • ACUTE",
    image: "/images/benefits/lifestyle_20s.png",
    caption: "Energy & Mental Clarity",
  },
  {
    symbol: "W2",
    code: "02 • CELLULAR",
    image: "/images/benefits/lifestyle_30s.png",
    caption: "NAD+ & Metabolic Flow",
  },
  {
    symbol: "M1",
    code: "03 • TISSUE",
    image: "/images/benefits/lifestyle_40s.png",
    caption: "Joint, Skin & Endurance",
  },
  {
    symbol: "LT",
    code: "04 • SYSTEMIC",
    image: "/images/benefits/lifestyle_50s.png",
    caption: "DNA, Heart & Brain Youth",
  },
];

export function ActivateBenefitTimeline() {
  const { timeline } = activateContent;

  return (
    <section
      id="timeline"
      className="py-20 md:py-28 relative overflow-hidden border-t border-[var(--color-levl-panel-border)]"
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-15 bg-[radial-gradient(circle,_var(--color-levl-cyan)_0%,_transparent_65%)] blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-levl-panel-border)] bg-[var(--color-levl-panel)] text-xs sm:text-sm font-semibold text-amber-300">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
            <span>
              PhD-Formulated • Physician-Approved • Guided by LEVL’s AI Synergy
              Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Benefits You Feel Today—That Compound Over a Lifetime
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-levl-text-secondary)]">
            From first-scoop cellular energy and mental clarity to long-term
            cardiovascular, epigenetic, and neuroprotective longevity.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Segment Connector Bars: 100% opacity at each node edge, dropping to ~45% in the middle */}
          <div
            aria-hidden="true"
            className="hidden lg:grid lg:grid-cols-3 absolute top-[7.5rem] left-[12.5%] right-[12.5%] h-0.5 z-0 pointer-events-none"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(14,165,233,1) 0%, rgba(14,165,233,0.42) 50%, rgba(245,158,11,1) 100%)",
              }}
            />
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(245,158,11,1) 0%, rgba(34,197,94,0.42) 50%, rgba(34,197,94,1) 100%)",
              }}
            />
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(232,121,249,0.42) 50%, rgba(232,121,249,1) 100%)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {timeline.map((item, i) => {
              const Icon = TIMELINE_ICONS[i % TIMELINE_ICONS.length];
              const frame = TIMELINE_ELEMENT_FRAMES[i];

              return (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#0B0E17]/95 border border-white/10 hover:border-white/25 p-5 sm:p-6 flex flex-col justify-between transition-all shadow-2xl group"
                >
                  <div>
                    {/* Aspirational Image Framed in Element Square Size */}
                    <div className="relative w-36 h-36 mx-auto mb-5 rounded-2xl p-[2px] bg-gradient-to-br from-amber-400/70 via-[var(--color-levl-cyan)]/70 to-purple-500/70 shadow-[0_0_25px_rgba(14,165,233,0.18)]">
                      <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#07090F]">
                        <Image
                          src={frame.image}
                          alt={frame.caption}
                          fill
                          sizes="150px"
                          className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

                        {/* Element Square Corner Metadata */}
                        <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-white/80">
                          <span>{frame.code}</span>
                          <Icon
                            aria-hidden="true"
                            className="w-3.5 h-3.5"
                            style={{ color: item.accentColor }}
                          />
                        </div>

                        {/* Element Symbol */}
                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between">
                          <div>
                            <div className="text-xl font-black text-white leading-none">
                              {frame.symbol}
                            </div>
                            <div className="text-[9px] font-semibold text-white/75 mt-0.5">
                              {frame.caption}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time & Headline */}
                    <div className="text-center mb-4">
                      <div
                        className="text-xs font-mono font-bold uppercase tracking-widest mb-1"
                        style={{ color: item.accentColor }}
                      >
                        {item.time}
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                        {item.headline}
                      </h3>
                    </div>

                    {/* Stats Pills */}
                    {item.stats.length > 0 && (
                      <div className="flex flex-col gap-1.5 mb-4">
                        {item.stats.map((stat, k) => (
                          <div
                            key={k}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-bold uppercase tracking-wider text-center text-white/90"
                          >
                            {stat}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 text-left border-t border-white/10 pt-4">
                      {item.points.map((point, j) => (
                        <li
                          key={j}
                          className="text-xs sm:text-sm text-[var(--color-levl-text-secondary)] leading-relaxed flex items-start gap-2"
                        >
                          <CheckCircle
                            aria-hidden="true"
                            className="w-3.5 h-3.5 mt-1 shrink-0"
                            style={{ color: item.accentColor }}
                          />
                          <span>{point}</span>
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
