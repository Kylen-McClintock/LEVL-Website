import re

with open("src/components/product/ProductGallery.tsx", "r") as f:
    content = f.read()

# Add new icons to import
content = content.replace("import { Zap, Activity, Moon } from 'lucide-react';", "import { Zap, Activity, Moon, ShieldCheck, Dna, SunMoon } from 'lucide-react';")

new_overlay = """
        {/* Floating Selling Points (Visible on main image) */}
        <AnimatePresence>
          {currentIndex === 0 && (
            <>
              {/* Chip 1: Mitochondrial Health */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -8, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-[15%] right-[5%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-magenta)]/50 transition-colors">
                    <Zap className="w-3.5 h-3.5 text-[var(--color-levl-magenta)]" />
                    Mitochondrial Health
                </div>
              </motion.div>

              {/* Chip 2: Cellular Renewal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 8, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.3, delay: 0.1 },
                  scale: { duration: 0.3, delay: 0.1 },
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute bottom-[20%] left-[5%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-cyan)]/50 transition-colors">
                    <Activity className="w-3.5 h-3.5 text-[var(--color-levl-cyan)]" />
                    Cellular Renewal
                </div>
              </motion.div>

              {/* Chip 3: Nighttime Autophagy */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -6, 0]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.3, delay: 0.2 },
                  scale: { duration: 0.3, delay: 0.2 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute top-[25%] left-[8%] z-20"
              >
                <div className="px-3 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap hover:border-[var(--color-levl-green)]/50 transition-colors">
                    <Moon className="w-3.5 h-3.5 text-[var(--color-levl-green)]" />
                    Nighttime Autophagy
                </div>
              </motion.div>
            </>
          )}

          {images[currentIndex].altText === '5 Core Biological Pathways' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10 flex flex-col p-6 md:p-8"
            >
              <div className="max-w-[70%]">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">5 SYNERGISTIC PATHWAYS</h3>
                <p className="text-xs md:text-sm text-white/70 mb-6 leading-relaxed">
                  DeepCell's formulation combines five scientifically-designed pathways that work together to target all hallmarks of aging with unprecedented precision.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-levl-green)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-green)]/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                      <Moon className="w-5 h-5 text-[var(--color-levl-green)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base leading-tight">Deep Sleep Architecture</h4>
                      <p className="text-[10px] md:text-xs text-white/60">Optimization of GABA and alpha brain waves</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-cyan)]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                      <Activity className="w-5 h-5 text-[var(--color-levl-cyan)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base leading-tight">Overnight Cellular Tuneup</h4>
                      <p className="text-[10px] md:text-xs text-white/60">Nocturnal autophagy & glymphatic clearance</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-magenta)]/20 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
                      <ShieldCheck className="w-5 h-5 text-[var(--color-levl-magenta)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base leading-tight">Neuroprotection & Mood</h4>
                      <p className="text-[10px] md:text-xs text-white/60">Inflammatory modulation & stress resilience</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-levl-cyan)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-cyan)]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                      <Dna className="w-5 h-5 text-[var(--color-levl-cyan)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base leading-tight">Nightly Cellular Rejuvenation</h4>
                      <p className="text-[10px] md:text-xs text-white/60">Genomic stability & mitochondrial ATP</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-levl-magenta)]/10 flex items-center justify-center shrink-0 border border-[var(--color-levl-magenta)]/20 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
                      <SunMoon className="w-5 h-5 text-[var(--color-levl-magenta)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base leading-tight">Natural Melatonin Support</h4>
                      <p className="text-[10px] md:text-xs text-white/60">Providing precursors for serotonin & melatonin</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>"""

# Using regex to replace the existing AnimatePresence block for floating chips
pattern = re.compile(r'\{\/\* Floating Selling Points \(Visible on main image\) \*\/\}.*?<\/AnimatePresence>', re.DOTALL)
content = pattern.sub(new_overlay, content)

with open("src/components/product/ProductGallery.tsx", "w") as f:
    f.write(content)
