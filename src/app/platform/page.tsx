import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/Button';
import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid';
import { PartnerButton } from '@/components/ui/PartnerButton';
import { 
    BookOpen, Network, Zap, CheckCircle2, FlaskConical, Users, 
    ArrowRight, Activity, Cpu, Search, Microscope, LineChart, 
    Layers, ShieldCheck, HeartPulse, Dna, BrainCircuit, Workflow, Database
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform | LEVL Health',
  description: 'The AI discovery platform for longevity. We map the biology of aging to discover synergistic formulations and personalized protocols.',
  openGraph: {
    title: 'Platform | LEVL Health',
    description: 'The AI discovery platform for longevity.',
    images: ['https://www.levlhealth.com/images/synergy_engine_visual.png'], // Using the synergy engine bg as a good tech visualization
  },
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[var(--color-levl-bg)] font-sans relative flex flex-col text-white selection:bg-[var(--color-levl-cyan)]/30">
      
      {/* Global Twilight Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_#1E2C5A_0%,_transparent_70%)] opacity-40 blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] rounded-full bg-[radial-gradient(circle,_#151C3B_0%,_transparent_70%)] opacity-50 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,_#1B1237_0%,_transparent_70%)] opacity-50 blur-[130px]" />
      </div>

      <div className="relative z-50">
        <Navbar showCart={false} />
      </div>

      <main className="relative z-10 flex-grow pt-24 md:pt-32">
        
        {/* HERO SECTION */}
        <section className="pb-24">
            <Container>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-levl-cyan)]/30 bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)] text-sm font-medium tracking-wide uppercase">
                        <Cpu className="w-4 h-4" /> The LEVL Engine
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
                        The AI discovery platform for longevity.
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-[var(--color-levl-text-secondary)] leading-relaxed max-w-3xl mx-auto">
                        LEVL maps the biology of aging to discover synergistic formulations and personalized protocols that help people live healthier, longer.
                    </p>
                    
                    <p className="text-lg text-[var(--color-levl-text-muted)] max-w-2xl mx-auto">
                        Our platform reads scientific literature, scores compounds and combinations, connects mechanisms to the hallmarks of aging, and learns from real-world biomarker and protocol outcomes.
                        <br/><br/>
                        <span className="text-white font-medium">We are building the intelligence layer for the next generation of longevity products.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link href="#platform-section" className="w-full sm:w-auto">
                            <Button variant="primary" size="lg" className="w-full gap-2">
                                Explore the Platform <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <PartnerButton variant="secondary" size="lg" className="w-full sm:w-auto bg-white/5 hover:bg-white/10">
                            Partner With LEVL
                        </PartnerButton>
                    </div>

                    {/* Feature Pills */}
                    <div className="pt-16 flex flex-wrap justify-center gap-3">
                        {['Literature-to-formulation engine', 'Hallmark and pathway scoring', 'Source-linked evidence graph', 'Biomarker feedback loop', 'LIFESPAN+ product pipeline'].map((feature) => (
                            <div key={feature} className="px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-sm text-white/80 flex items-center gap-2 shadow-lg">
                                <CheckCircle2 className="w-4 h-4 text-[var(--color-levl-cyan)]" /> {feature}
                            </div>
                        ))}
                    </div>

                    {/* Trust/Data Sources Band */}
                    <div className="pt-20 border-t border-white/5 mt-20">
                        <p className="text-xs font-mono text-[var(--color-levl-text-muted)] uppercase tracking-widest mb-6">Continuously ingesting and structuring from</p>
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2 font-mono text-sm tracking-wide text-white">
                                <Database className="w-4 h-4" /> PubMed & arXiv
                            </div>
                            <div className="flex items-center gap-2 font-mono text-sm tracking-wide text-white">
                                <Database className="w-4 h-4" /> ClinicalTrials.gov
                            </div>
                            <div className="flex items-center gap-2 font-mono text-sm tracking-wide text-white">
                                <Database className="w-4 h-4" /> DrugBank & ChEMBL
                            </div>
                            <div className="flex items-center gap-2 font-mono text-sm tracking-wide text-white">
                                <Database className="w-4 h-4" /> Real-World Biomarker Data
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

        {/* BIG THESIS SECTION */}
        <section className="py-24 border-y border-white/5 bg-black/20">
            <Container>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Aging is a systems problem.</h2>
                        <p className="text-xl text-[var(--color-levl-text-secondary)] mb-8 leading-relaxed">
                            For decades, longevity science has been trapped in fragments.
                        </p>
                        
                        <div className="space-y-4 mb-10 border-l border-white/10 pl-6">
                            <p className="text-white/40 text-lg">One paper on autophagy.</p>
                            <p className="text-white/40 text-lg">One study on mitochondrial function.</p>
                            <p className="text-white/40 text-lg">One supplement for sleep.</p>
                            <p className="text-white/40 text-lg">One biomarker panel every few months.</p>
                            <p className="text-white/40 text-lg">One protocol built from expert intuition.</p>
                        </div>
                    </div>
                    
                    <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl backdrop-blur-xl shadow-2xl group flex flex-col md:flex-row overflow-hidden">
                        <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                            <p className="text-2xl text-white font-medium mb-8 leading-relaxed">
                                But aging does not happen one pathway at a time.
                            </p>
                            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-8">
                                It emerges from interacting biological systems: impaired autophagy, mitochondrial dysfunction, deregulated nutrient sensing, chronic inflammation, cellular senescence, genomic instability, epigenetic drift, and other hallmarks of aging.
                            </p>
                            <p className="text-[var(--color-levl-cyan)] text-xl font-medium">
                                LEVL was built for that complexity.
                            </p>
                            <p className="text-[var(--color-levl-text-muted)] mt-4 leading-relaxed">
                                Our platform organizes longevity science into a living map of compounds, pathways, hallmarks, functional outcomes, biomarkers, doses, and real-world results, then uses that map to discover combinations that single-ingredient thinking misses.
                            </p>
                        </div>
                        <div className="h-64 md:h-auto md:w-2/5 bg-[url('/images/platform-visual-2_v2.png')] bg-contain bg-no-repeat bg-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                    </div>
                </div>
            </Container>
        </section>

        {/* PLATFORM VISUAL SECTION (Bento Grid) */}
        <section id="platform-section" className="py-24">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The LEVL Platform</h2>
                    <p className="text-xl text-[var(--color-levl-text-secondary)] max-w-2xl mx-auto">
                        Discovery becomes product. Product becomes data. Data improves discovery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Literature Engine */}
                    <div className="md:col-span-1 bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl backdrop-blur-xl transition-colors group flex flex-col overflow-hidden hover:border-white/20">
                        <div className="h-48 w-full bg-[url('/images/literature_engine_visual_v2.png')] bg-contain bg-no-repeat bg-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                        <div className="p-8 flex-grow">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-levl-cyan)]/10 transition-colors">
                                <BookOpen className="w-6 h-6 text-[var(--color-levl-cyan)]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Literature Engine</h3>
                            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed">
                                Reads and structures longevity research from scientific papers.
                            </p>
                        </div>
                    </div>

                    {/* Longevity Graph */}
                    <div className="md:col-span-2 bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl backdrop-blur-xl overflow-hidden group flex flex-col md:flex-row hover:border-white/20 transition-colors">
                        <div className="p-8 flex flex-col justify-center md:w-1/2">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                                <Network className="w-6 h-6 text-[var(--color-levl-magenta)]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Longevity Graph</h3>
                            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed max-w-md">
                                Maps compounds, pathways, hallmarks of aging, biomarkers, and functional outcomes into a cohesive biological network.
                            </p>
                        </div>
                        <div className="h-64 md:h-auto md:w-1/2 bg-[url('/images/platform-visual_v2.png')] bg-contain bg-no-repeat bg-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                    </div>

                    {/* Synergy Engine */}
                    <div className="md:col-span-3 bg-gradient-to-r from-[var(--color-levl-panel)] to-black/40 border border-[var(--color-levl-panel-border)] rounded-3xl backdrop-blur-xl overflow-hidden group flex flex-col md:flex-row hover:border-white/20 transition-colors">
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-xl bg-[var(--color-levl-cyan)]/10 border border-[var(--color-levl-cyan)]/20 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-[var(--color-levl-cyan)]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Synergy Engine</h3>
                            <p className="text-lg text-[var(--color-levl-text-secondary)] leading-relaxed">
                                Ranks combinations by mechanism, evidence strength, dose feasibility, safety, and expected biological effect.
                            </p>
                        </div>
                        <div className="h-64 md:h-auto md:w-1/2 bg-[url('/images/synergy_engine_visual_v2.png')] bg-contain bg-no-repeat bg-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                    </div>

                    {/* Protocol App */}
                    <div className="md:col-span-2 bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl backdrop-blur-xl overflow-hidden group flex flex-col md:flex-row hover:border-white/20 transition-colors">
                        <div className="h-64 md:h-auto md:w-1/2 bg-[url('/images/protocol_app_visual_v2.png')] bg-contain bg-no-repeat bg-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                        <div className="p-8 flex flex-col justify-center md:w-1/2">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Protocol App</h3>
                            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed max-w-md">
                                Turns discoveries into personalized interventions users can follow, measure, and improve.
                            </p>
                        </div>
                    </div>

                    {/* Feedback Loop */}
                    <div className="md:col-span-1 bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-3xl backdrop-blur-xl transition-colors group flex flex-col overflow-hidden hover:border-white/20">
                        <div className="h-48 w-full bg-[url('/images/feedback_loop_visual_v2.png')] bg-contain bg-no-repeat bg-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen" style={{ maskImage: 'radial-gradient(circle, black 50%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                        <div className="p-8 flex-grow">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-levl-cyan)]/10 transition-colors">
                                <Workflow className="w-6 h-6 text-[var(--color-levl-cyan)]" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Feedback Loop</h3>
                            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed">
                                Learns from biomarkers, subjective outcomes, adherence, and real-world protocol results.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

        {/* WHY NOW */}
        <section className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-black/30">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Longevity is becoming computable.</h2>
                    <p className="text-xl text-[var(--color-levl-text-secondary)] mb-12">
                        For the first time, the pieces exist for a true longevity discovery platform.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1"><Search className="w-5 h-5 text-[var(--color-levl-cyan)]" /></div>
                                <p className="text-white/80 leading-relaxed">Scientific literature can be read and structured by AI.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1"><Dna className="w-5 h-5 text-[var(--color-levl-cyan)]" /></div>
                                <p className="text-white/80 leading-relaxed">The hallmarks of aging give the field a shared biological framework.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1"><Microscope className="w-5 h-5 text-[var(--color-levl-cyan)]" /></div>
                                <p className="text-white/80 leading-relaxed">Consumer biomarker testing is becoming mainstream.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1"><HeartPulse className="w-5 h-5 text-[var(--color-levl-cyan)]" /></div>
                                <p className="text-white/80 leading-relaxed">Wearables and apps make daily health feedback measurable.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1"><BrainCircuit className="w-5 h-5 text-[var(--color-levl-cyan)]" /></div>
                                <p className="text-white/80 leading-relaxed">AI can compare thousands of mechanisms, compounds, and outcomes at a scale no human team can hold in memory.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 text-center">
                        <p className="text-xl md:text-2xl font-medium text-white mb-4">
                            The bottleneck is no longer whether the science exists.
                        </p>
                        <p className="text-[var(--color-levl-text-secondary)] text-lg mb-6">
                            The bottleneck is whether we can organize it, score it, test it, and personalize it fast enough.
                        </p>
                        <p className="text-[var(--color-levl-cyan)] font-bold text-lg">
                            That is what LEVL is building.
                        </p>
                    </div>
                </div>
            </Container>
        </section>

        {/* HOW IT WORKS (Vertical Process) */}
        <section className="py-24">
            <Container>
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
                    <p className="text-xl text-[var(--color-levl-text-secondary)]">From aging science to personalized protocols.</p>
                </div>

                <div className="max-w-4xl mx-auto relative pl-8 md:pl-12 space-y-24">
                    
                    {/* Glowing Vertical Timeline Line */}
                    <div className="absolute left-[23px] top-[24px] bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-levl-cyan)] via-[var(--color-levl-magenta)] to-transparent opacity-30" />
                    
                    {/* Step 1 */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] w-12 h-12 rounded-full bg-[var(--color-levl-bg)] border-2 border-[var(--color-levl-cyan)] flex items-center justify-center font-mono font-bold text-[var(--color-levl-cyan)] shadow-[0_0_20px_rgba(34,211,238,0.4)] z-10">1</div>
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Ingest</h3>
                                <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-4">
                                    LEVL ingests scientific papers, pathway databases, hallmark-of-aging research, compound data, biomarker evidence, and real-world protocol outcomes.
                                </p>
                                <p className="text-white/60 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                                    The platform is designed to pull longevity science out of static documents and into a structured discovery system.
                                </p>
                            </div>
                            <div className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs text-[var(--color-levl-text-muted)] overflow-hidden">
                                <div className="flex gap-2 mb-2 border-b border-white/10 pb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                </div>
                                <div className="space-y-1 opacity-70">
                                    <p><span className="text-blue-400">GET</span> /api/ingest/literature?source=pubmed</p>
                                    <p className="text-green-400">Success: 24,105 documents queued</p>
                                    <p>Processing text extraction...</p>
                                    <p>Identifying mechanistic entities...</p>
                                    <p>Linking to hallmark ontology...</p>
                                    <p className="animate-pulse text-[var(--color-levl-cyan)]">_</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] w-12 h-12 rounded-full bg-[var(--color-levl-bg)] border-2 border-[var(--color-levl-cyan)] flex items-center justify-center font-mono font-bold text-[var(--color-levl-cyan)] shadow-[0_0_20px_rgba(34,211,238,0.4)] z-10">2</div>
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-white">Structure</h3>
                                <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-6">
                                    The platform extracts the useful signal, answering precise biological questions. This turns scattered papers into searchable biological intelligence.
                                </p>
                                <div className="space-y-2">
                                    {['Which compound was studied?', 'Which pathway changed?', 'Which hallmark of aging does it affect?', 'What dose was used?'].map(q => (
                                        <div key={q} className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] p-3 rounded-lg text-sm text-white/80">
                                            {q}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-xs text-[var(--color-levl-cyan)] overflow-hidden">
                                <pre className="whitespace-pre-wrap opacity-80">
{`{
  "entity": "Fisetin",
  "type": "flavonoid",
  "mechanisms": [
    {
      "pathway": "mTORC1",
      "effect": "inhibition",
      "hallmark": "Nutrient Sensing"
    },
    {
      "pathway": "senolysis",
      "effect": "activation",
      "hallmark": "Cellular Senescence"
    }
  ],
  "confidence_score": 0.94
}`}
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] w-12 h-12 rounded-full bg-[var(--color-levl-bg)] border-2 border-[var(--color-levl-cyan)] flex items-center justify-center font-mono font-bold text-[var(--color-levl-cyan)] shadow-[0_0_20px_rgba(34,211,238,0.4)] z-10">3</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Score</h3>
                        <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-8 max-w-2xl">
                            Every compound and combination can be ranked across dimensions that matter:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                {[
                                    { title: 'Hallmark impact', desc: 'Directly targeting biological drivers of aging.' },
                                    { title: 'Functional benefit', desc: 'Outcomes like energy, sleep, cognition, and recovery.' },
                                    { title: 'Pathway activation', desc: 'Which mechanisms are affected, and how strongly?' }
                                ].map(item => (
                                    <div key={item.title} className="border-l-2 border-[var(--color-levl-cyan)]/30 pl-6">
                                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                        <p className="text-[var(--color-levl-text-muted)] text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Mock Scoring Chart */}
                            <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] rounded-xl p-6">
                                <p className="text-xs font-mono text-white/50 mb-4 uppercase tracking-widest">Synergy Score Output</p>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Evidence Confidence', val: 85, color: 'bg-green-400' },
                                        { label: 'Synergy Potential', val: 92, color: 'bg-[var(--color-levl-cyan)]' },
                                        { label: 'Dose Feasibility', val: 78, color: 'bg-[var(--color-levl-magenta)]' },
                                    ].map(stat => (
                                        <div key={stat.label}>
                                            <div className="flex justify-between text-xs mb-1 text-white/80 font-mono">
                                                <span>{stat.label}</span>
                                                <span>{stat.val}/100</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                                                <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.val}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] w-12 h-12 rounded-full bg-[var(--color-levl-bg)] border-2 border-[var(--color-levl-magenta)] flex items-center justify-center font-mono font-bold text-[var(--color-levl-magenta)] shadow-[0_0_30px_rgba(217,70,239,0.4)] z-10">4</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Formulate</h3>
                        <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-6">
                            LEVL uses this ranked evidence to identify high-potential combinations for <span className="text-white font-semibold">LIFESPAN+</span>, our line of science-driven formulations designed to support the biological foundations of healthy aging.
                        </p>
                        <div className="bg-gradient-to-r from-[var(--color-levl-magenta)]/10 to-transparent border-l-4 border-[var(--color-levl-magenta)] p-6 rounded-r-xl">
                            <p className="text-white font-medium text-lg">We do not start with trend ingredients.</p>
                            <p className="text-[var(--color-levl-magenta)] font-bold text-lg">We start with the biology.</p>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] w-12 h-12 rounded-full bg-[var(--color-levl-bg)] border-2 border-white/20 flex items-center justify-center font-mono font-bold text-white z-10">5</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Personalize</h3>
                        <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-4">
                            The same platform that powers formulation discovery also informs personalized protocols.
                        </p>
                        <p className="text-white/60 leading-relaxed bg-[var(--color-levl-panel)] p-5 rounded-xl border border-[var(--color-levl-panel-border)] shadow-inner">
                            A user’s goals, biomarkers, wearable data, qualitative feedback, and adherence patterns can help determine which interventions are most relevant for their biology.
                        </p>
                    </div>

                    {/* Step 6 */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] w-12 h-12 rounded-full bg-[var(--color-levl-bg)] border-2 border-white/20 flex items-center justify-center font-mono font-bold text-white z-10">6</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Learn</h3>
                        <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-6">
                            Real-world outcomes feed back into the platform.
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <LineChart className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                                <p className="text-white/70 text-sm leading-relaxed">If a protocol improves sleep quality, energy, recovery, glucose stability, inflammatory markers, or other health signals, that matters.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <LineChart className="w-5 h-5 text-red-400 mt-1 shrink-0 rotate-180" />
                                <p className="text-white/70 text-sm leading-relaxed">If an intervention looks strong in the literature but fails to translate in practice, that matters too.</p>
                            </div>
                        </div>
                        <p className="text-[var(--color-levl-cyan)] font-medium mt-6 border-t border-white/10 pt-6">
                            LEVL is designed to become smarter with every validated signal.
                        </p>
                    </div>

                </div>
            </Container>
        </section>

        {/* SCIENTIFIC TRUST */}
        <section className="py-24 border-y border-white/5 bg-black/20">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for scientific accountability.</h2>
                    <p className="text-xl text-[var(--color-levl-text-secondary)] leading-relaxed">
                        Longevity has too much hype and too little infrastructure. LEVL is building the opposite: an auditable system for translating longevity science into products and protocols.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        { icon: <BookOpen />, title: "Source-linked", desc: "Claims trace back to supporting literature." },
                        { icon: <Network />, title: "Mechanism-mapped", desc: "Ingredients connect to pathways, biomarkers, and hallmarks of aging." },
                        { icon: <Layers />, title: "Evidence-weighted", desc: "Human evidence counts more than animal evidence. Animal evidence counts more than cell data. Weak evidence is not treated like strong evidence." },
                        { icon: <ShieldCheck />, title: "Dose-aware", desc: "Promising mechanisms are filtered through practical, safe, human-relevant dose ranges." },
                        { icon: <Activity />, title: "Outcome-updated", desc: "Real-world feedback helps refine future scoring and protocol recommendations." }
                    ].map(item => (
                        <div key={item.title} className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] p-6 rounded-2xl">
                            <div className="text-[var(--color-levl-cyan)] mb-4">{item.icon}</div>
                            <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-sm text-[var(--color-levl-text-muted)] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                    
                    <div className="bg-gradient-to-br from-[var(--color-levl-cyan)]/10 to-transparent border border-[var(--color-levl-cyan)]/30 p-6 rounded-2xl flex flex-col justify-center">
                        <p className="text-white/80 text-sm font-medium mb-2">The goal is not to replace scientific judgment.</p>
                        <p className="text-[var(--color-levl-cyan)] font-bold">The goal is to give scientists, clinicians, partners, and customers a better map.</p>
                    </div>
                </div>
            </Container>
        </section>

        {/* HALLMARKS SECTION */}
        <section className="py-24">
            <Container>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Targeting the hallmarks of aging.</h2>
                        <p className="text-xl text-[var(--color-levl-text-secondary)] mb-6 leading-relaxed">
                            The hallmarks of aging are the biological drivers that shape how our bodies decline over time. LEVL uses them as a core framework for discovery.
                        </p>
                        <p className="text-white/60 leading-relaxed mb-8">
                            Instead of asking whether an ingredient is “good for longevity” in the abstract, our platform asks more precise questions:
                        </p>

                        <div className="space-y-3">
                            {[
                                "Does it support autophagy?",
                                "Does it improve mitochondrial resilience?",
                                "Does it affect nutrient sensing?",
                                "Does it reduce inflammatory signaling?",
                                "Does it influence senescent-cell burden?",
                                "Does it support proteostasis, genomic stability, or epigenetic regulation?",
                                "Does it produce measurable functional benefits in the real world?"
                            ].map((q, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-levl-cyan)] mt-2 shrink-0" />
                                    <p className="text-white/90 text-sm md:text-base">{q}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                        <h3 className="text-2xl font-bold text-white mb-6">This is how longevity becomes actionable.</h3>
                        <div className="space-y-2">
                            <p className="text-white/40 text-xl line-through decoration-white/20">Not vague anti-aging.</p>
                            <p className="text-[var(--color-levl-cyan)] text-xl font-medium">Mechanism by mechanism.</p>
                            <p className="text-[var(--color-levl-cyan)] text-xl font-medium">Pathway by pathway.</p>
                            <p className="text-[var(--color-levl-cyan)] text-xl font-medium">Protocol by protocol.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

        {/* PRODUCT BRIDGE & DEEPCELL */}
        <section className="py-24 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-levl-magenta)]/5 to-transparent pointer-events-none" />
            <Container>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-levl-magenta)]/20 to-transparent blur-3xl rounded-full" />
                        <Image 
                            src="/images/deepcell-bottle.jpg"
                            alt="LEVL DeepCell"
                            width={600}
                            height={800}
                            className="relative z-10 w-full h-auto rounded-3xl border border-white/10 shadow-2xl"
                        />
                    </div>

                    <div className="order-1 md:order-2 space-y-12">
                        {/* Bridge */}
                        <div>
                            <div className="text-[var(--color-levl-magenta)] text-sm font-bold tracking-widest uppercase mb-4">From platform to product</div>
                            <h2 className="text-3xl font-bold mb-4">LIFESPAN+ is the first commercial expression of the LEVL platform.</h2>
                            <p className="text-[var(--color-levl-text-secondary)] leading-relaxed mb-6">
                                LEVL’s discovery engine powers the development of LIFESPAN+, our line of formulations designed to support the foundations of healthy aging. Each product begins with a biological question:
                            </p>
                            <blockquote className="border-l-2 border-[var(--color-levl-magenta)] pl-4 italic text-white/80 mb-6">
                                "What combination of naturally derived compounds can safely support the systems that help people feel, function, and age better?"
                            </blockquote>
                            <p className="text-[var(--color-levl-text-muted)] text-sm leading-relaxed mb-6">
                                From there, LEVL evaluates mechanisms, evidence strength, hallmark coverage, dosing, safety, synergy, and real-world outcomes.
                            </p>
                            <p className="text-white font-medium">
                                The result is not another supplement stack. It is a new model for building longevity products: computationally discovered, biologically mapped, and continuously improved.
                            </p>
                        </div>

                        {/* DeepCell */}
                        <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] p-8 rounded-3xl shadow-xl">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold text-white">DeepCell</h3>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--color-levl-magenta)]/30 bg-[var(--color-levl-magenta)]/10 text-[var(--color-levl-magenta)] text-[10px] font-bold tracking-widest uppercase">
                                    <ShieldCheck className="w-3 h-3" />
                                    Patented US 12396994 B2
                                </div>
                            </div>
                            <p className="text-[var(--color-levl-magenta)] font-medium mb-6">Cellular renewal, designed from the biology of fasting.</p>
                            
                            <p className="text-[var(--color-levl-text-secondary)] text-sm leading-relaxed mb-4">
                                DeepCell is LEVL’s first platform-discovered formulation. The first patent from this platform is a synergistic combination of 3 ingredients that combined induces comparable levels of autophagy as Rapamycin without the negative immune suppressing side effects.
                            </p>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                It is a powerful fasting mimetic that activates the same longevity enhancing pathways without the need for caloric restriction. 
                            </p>
                            <div className="border-t border-white/10 pt-4">
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    DeepCell is the first step in a broader platform strategy: use AI-powered discovery to build formulations and protocols that target the root biology beneath age-related decline.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

        {/* PARTNERS & INVESTORS */}
        <section className="py-24 bg-black/40 border-y border-white/5">
            <Container>
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Ecosystem */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Built for the longevity ecosystem.</h2>
                        <p className="text-[var(--color-levl-text-secondary)] mb-10">
                            LEVL is not just building products. We are building infrastructure for the next generation of personalized longevity.
                        </p>

                        <div className="space-y-6">
                            {[
                                { t: "For biomarker companies", d: "LEVL can help turn test results into personalized, evidence-linked protocols." },
                                { t: "For clinics and practitioners", d: "LEVL can support protocol design, adherence tracking, and longitudinal outcome monitoring." },
                                { t: "For researchers", d: "LEVL provides a structured way to explore compounds, pathways, hallmarks, mechanisms, and synergistic combinations." },
                                { t: "For formulation partners", d: "LEVL shortens the path from biological hypothesis to testable product candidate." },
                                { t: "For customers", d: "LEVL translates complex aging science into daily protocols people can actually follow." }
                            ].map(p => (
                                <div key={p.t} className="border-b border-white/10 pb-4">
                                    <h4 className="text-white font-medium mb-1">{p.t}</h4>
                                    <p className="text-[var(--color-levl-text-muted)] text-sm">{p.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wedge / Flywheel */}
                    <div>
                        <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] p-8 md:p-10 rounded-3xl h-full flex flex-col">
                            <h2 className="text-2xl font-bold mb-4">A platform company with a product wedge.</h2>
                            <p className="text-[var(--color-levl-text-secondary)] text-sm mb-6 leading-relaxed">
                                The first wave of consumer longevity was content, coaching, and generic supplements. The next wave will be adaptive, evidence-linked, and personalized.
                            </p>
                            <p className="text-white text-sm mb-8">
                                LEVL is building toward that future from both sides: A commercial product engine through LIFESPAN+ formulations, and a data intelligence engine through the LEVL Protocols App and Synergy Platform.
                            </p>

                            <div className="flex-grow flex items-center justify-center py-8">
                                <div className="space-y-4 text-center">
                                    <p className="text-[var(--color-levl-cyan)] font-medium text-sm">Better science creates better products.</p>
                                    <div className="w-px h-4 bg-white/20 mx-auto" />
                                    <p className="text-[var(--color-levl-cyan)] font-medium text-sm">Better products create more users.</p>
                                    <div className="w-px h-4 bg-white/20 mx-auto" />
                                    <p className="text-[var(--color-levl-cyan)] font-medium text-sm">More users create more outcome data.</p>
                                    <div className="w-px h-4 bg-white/20 mx-auto" />
                                    <p className="text-[var(--color-levl-cyan)] font-medium text-sm">More outcome data improves the platform.</p>
                                    <div className="w-px h-4 bg-white/20 mx-auto" />
                                    <p className="text-[var(--color-levl-cyan)] font-medium text-sm">A better platform creates better products.</p>
                                </div>
                            </div>

                            <p className="text-white font-bold text-center border-t border-white/10 pt-6 mt-6">
                                This is how LEVL moves from supplement company to longevity infrastructure company.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

        {/* VISION CLOSE & CTA */}
        <section className="py-32 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-levl-cyan)]/10 via-[var(--color-levl-bg)] to-[var(--color-levl-bg)] pointer-events-none" />
            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                        Our mission is Longevity Escape Velocity.
                    </h2>
                    
                    <p className="text-xl text-[var(--color-levl-text-secondary)] leading-relaxed">
                        LEVL exists to help humanity reach a future where healthy lifespan increases faster than chronological time passes.
                    </p>
                    
                    <p className="text-white/60 text-lg leading-relaxed">
                        That future will not come from generic wellness advice. It will come from systems that can discover better interventions, personalize them to individual biology, measure whether they work, and improve continuously.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 max-w-2xl mx-auto">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm font-medium">Better formulations.</div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm font-medium">Better protocols.</div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm font-medium">Better biomarkers.</div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm font-medium">Better tools.</div>
                    </div>

                    <p className="text-2xl text-[var(--color-levl-cyan)] font-medium italic">
                        Tomorrow, it means a world where age-related decline is no longer accepted as inevitable.
                    </p>

                    <h3 className="text-3xl font-bold text-white pt-8">
                        LEVL is building the platform to get there.
                    </h3>

                    <div className="bg-[var(--color-levl-panel)] border border-[var(--color-levl-panel-border)] p-8 md:p-12 rounded-3xl mt-12 shadow-2xl">
                        <h4 className="text-2xl font-bold mb-4">Help us build the platform for the end of age-related disease.</h4>
                        <p className="text-[var(--color-levl-text-secondary)] mb-10 max-w-xl mx-auto">
                            We are looking for partners, scientists, engineers, clinicians, investors, and customers who believe longevity should be proactive, personalized, measurable, and radically ambitious.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <PartnerButton variant="secondary" className="w-full sm:w-auto bg-white/5 hover:bg-white/10">Partner With LEVL</PartnerButton>
                            <Link href="/">
                                <Button variant="primary" className="w-full sm:w-auto">Explore LIFESPAN+</Button>
                            </Link>
                            <Link href="/checkout-mock/">
                                <Button variant="secondary" className="w-full sm:w-auto bg-[var(--color-levl-cyan)]/10 text-[var(--color-levl-cyan)] hover:bg-[var(--color-levl-cyan)]/20 border-none">
                                    Join the Mission
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

      </main>

      <Footer />
    </div>
  );
}
