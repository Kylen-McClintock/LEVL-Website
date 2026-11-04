"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Activity, Zap } from "lucide-react";

export function ActivateFastingSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Hero Bento (Full Width - Shorter desktop height & stacked mobile benefits) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full min-h-[540px] md:h-[540px] lg:h-[580px] rounded-3xl overflow-hidden group flex flex-col justify-between p-5 sm:p-6 md:p-0 md:block"
        >
          <Image
            src="/images/running-lifestyle.jpg"
            alt="Better Days. More Tomorrows."
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />

          {/* Top & Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/90" />

          {/* Large Hero Text */}
          <div className="relative z-10 pt-4 pb-6 md:py-0 md:absolute md:top-10 left-0 right-0 md:px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-xl">
              Better Days.
              <br />
              <span className="text-[var(--color-levl-text-muted)]">
                More Tomorrows.
              </span>
            </h2>
          </div>

          {/* Bottom Frosted Glass Panel:
              - Mobile: Compact vertical 3-row stack so all 3 benefits (Autophagy, NAD+, 12 Hallmarks) are immediately visible with zero horizontal scrolling
              - Desktop (md+): 3-column horizontal grid */}
          <div className="relative z-10 md:absolute md:bottom-8 md:left-10 md:right-10 lg:left-12 lg:right-12">
            <div className="flex flex-col divide-y divide-white/10 md:divide-y-0 md:grid md:grid-cols-3 md:gap-8 bg-black/45 md:bg-white/5 backdrop-blur-md border border-white/15 p-4 sm:p-5 md:px-8 md:py-6 rounded-2xl w-full">
              <div className="flex items-start gap-3.5 py-3 first:pt-0 last:pb-0 md:block md:py-0 md:space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-levl-cyan)]/15 border border-[var(--color-levl-cyan)]/30 flex items-center justify-center shrink-0 mt-0.5 md:mt-0 md:w-auto md:h-auto md:bg-transparent md:border-0 md:justify-start">
                  <Flame
                    className="w-5 h-5 md:w-7 md:h-7 text-[var(--color-levl-cyan)]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-snug">
                    End Your Fast, Not Your Autophagy
                  </h3>
                  <p className="text-[var(--color-levl-text-secondary)] text-xs sm:text-sm leading-relaxed">
                    Engages fasting-induced cellular cleanup pathways—even with
                    breakfast—without hunger or muscle loss.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-3 first:pt-0 last:pb-0 md:block md:py-0 md:space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-levl-cyan)]/15 border border-[var(--color-levl-cyan)]/30 flex items-center justify-center shrink-0 mt-0.5 md:mt-0 md:w-auto md:h-auto md:bg-transparent md:border-0 md:justify-start">
                  <Zap
                    className="w-5 h-5 md:w-7 md:h-7 text-[var(--color-levl-cyan)]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-snug">
                    Steady NAD+ &amp; Cellular ATP
                  </h3>
                  <p className="text-[var(--color-levl-text-secondary)] text-xs sm:text-sm leading-relaxed">
                    Boosts intracellular NAD+ and mitochondrial ATP for clear
                    daytime focus with 0 mg caffeine.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-3 first:pt-0 last:pb-0 md:block md:py-0 md:space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-levl-cyan)]/15 border border-[var(--color-levl-cyan)]/30 flex items-center justify-center shrink-0 mt-0.5 md:mt-0 md:w-auto md:h-auto md:bg-transparent md:border-0 md:justify-start">
                  <Activity
                    className="w-5 h-5 md:w-7 md:h-7 text-[var(--color-levl-cyan)]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl leading-snug">
                    All 12 Hallmarks of Aging
                  </h3>
                  <p className="text-[var(--color-levl-text-secondary)] text-xs sm:text-sm leading-relaxed">
                    Synergistic support for skin, joints, muscle, brain, morning
                    minerals, and a slower pace of aging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Row Bento (Matches BentoImages.tsx 1/3 + 2/3 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column (1/3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative h-[380px] md:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden group"
          >
            <Image
              src="/images/bento-capsule.jpg"
              alt="Precision Formulated"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                Precision
                <br />
                Formulated
              </h3>
              <p className="text-[var(--color-levl-cyan)] font-medium text-sm uppercase tracking-widest">
                Energizing Longevity Complex
              </p>
            </div>
          </motion.div>

          {/* Right Column (2/3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative h-[380px] md:h-[480px] lg:h-[520px] md:col-span-2 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/images/activate-bento-morning.jpg"
              alt="The morning ritual built for energized days and longer horizons."
              fill
              quality={95}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-lg bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl">
              <h3 className="text-white font-bold text-lg md:text-xl leading-relaxed drop-shadow-md">
                What if breakfast didn&apos;t have to &ldquo;break your
                fast&rdquo;? The morning ritual built for energized days and
                longer horizons.
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
