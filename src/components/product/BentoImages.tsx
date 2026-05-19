"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Moon, Activity, Sun } from 'lucide-react';

export function BentoImages() {
  return (
    <section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Hero Bento (Full Width) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[600px] md:h-[800px] rounded-3xl overflow-hidden group"
        >
          <Image
            src="/images/bento-bed.jpg"
            alt="Better Nights. More Tomorrows."
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />
          
          {/* Top Text Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

          {/* Large Hero Text */}
          <div className="absolute top-12 left-0 right-0 px-8 text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
              Better Nights.
              <br />
              <span className="text-[var(--color-levl-text-muted)]">More Tomorrows.</span>
            </h2>
          </div>

          {/* Bottom Frosted Glass Panel (Seed formatting) */}
          <div className="absolute bottom-6 left-0 right-0 md:left-12 md:right-12 md:bottom-12 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 md:px-0">
            <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl w-max md:w-full">
              
              <div className="w-[280px] md:w-auto snap-center flex-shrink-0 space-y-3">
                <Moon className="w-8 h-8 text-[var(--color-levl-cyan)]" strokeWidth={1.5} />
                <h3 className="text-white font-bold text-lg md:text-xl">Rapid Sleep Onset</h3>
                <p className="text-[var(--color-levl-text-secondary)] text-sm leading-relaxed">
                  Modulates GABA pathways for faster sleep onset without heavy sedatives.
                </p>
              </div>

              <div className="w-[280px] md:w-auto snap-center flex-shrink-0 space-y-3">
                <Activity className="w-8 h-8 text-[var(--color-levl-cyan)]" strokeWidth={1.5} />
                <h3 className="text-white font-bold text-lg md:text-xl">Cellular Tuneup</h3>
                <p className="text-[var(--color-levl-text-secondary)] text-sm leading-relaxed">
                  Activates nocturnal autophagy to clear senescent cells and regenerate ATP.
                </p>
              </div>

              <div className="w-[280px] md:w-auto snap-center flex-shrink-0 space-y-3">
                <Sun className="w-8 h-8 text-[var(--color-levl-cyan)]" strokeWidth={1.5} />
                <h3 className="text-white font-bold text-lg md:text-xl">Next Morning Clarity</h3>
                <p className="text-[var(--color-levl-text-secondary)] text-sm leading-relaxed">
                  Supports natural sleep architecture so you wake up energized and cognitively sharp.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Bottom Row Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column (1/3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group"
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
              <h3 className="text-3xl font-bold text-white mb-2">Precision<br />Formulated</h3>
              <p className="text-[var(--color-levl-cyan)] font-medium text-sm uppercase tracking-widest">
                Deep Sleep Longevity Complex
              </p>
            </div>
          </motion.div>

          {/* Right Column (2/3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative h-[400px] md:h-[600px] md:col-span-2 rounded-3xl overflow-hidden group"
          >
            <Image
              src="/images/bento-sauna.jpg"
              alt="The nightly ritual built for deeper sleep and longer horizons."
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl shadow-2xl">
              <h3 className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
                The nightly ritual built for deeper sleep and longer horizons.
              </h3>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
