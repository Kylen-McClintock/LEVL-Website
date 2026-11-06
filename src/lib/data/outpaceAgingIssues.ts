import { BiologicalCurveSpec } from '@/lib/data/biologicalCurves'

export interface DiscoverEffectBar {
  label: string
  deltaText: string
  percentWidth: number
  barColorClass: string
  textColorClass: string
}

export interface DiscoverThresholdComparison {
  title: string
  headers: [string, string, string]
  rows: {
    col1: string
    col2: string
    col3: string
    col3ColorClass: string
  }[]
}

export interface DiscoverMolecularStage {
  stepNum: number
  title: string
  detail: string
  accentClass: string
}

export interface NewsletterStudySection {
  number: number
  id: string
  journal: string
  publishDate: string
  headline: string
  keyStatBadge: string
  themeTag: string
  accentColor: 'emerald' | 'cyan' | 'purple' | 'amber' | 'rose'
  paragraphs: [string, string, string]
  limits: string
  futureImplications: string
  studyUrl: string
  doiLabel: string
  // Visual Card Data (placed between paragraphs and Limits)
  visualSpec: {
    defaultChartType: 'telemetry_curve' | 'cohort_bars'
    chartTitle: string
    chartSubtitle: string
    sourceFigureBadge: string
    curveSpec: BiologicalCurveSpec
    cohortBars: DiscoverEffectBar[]
    molecularCascade: [
      DiscoverMolecularStage,
      DiscoverMolecularStage,
      DiscoverMolecularStage,
      DiscoverMolecularStage
    ]
    trialComparison: DiscoverThresholdComparison
  }
}

export interface NewsletterActionableStep {
  stepNumber: number
  title: string
  timingAndFrequency: string
  optimalInstruction: string
  beginnerInstruction: string
  optimalDoseBadge: string
  beginnerDoseBadge: string
}

export interface NewsletterHookStat {
  value: string
  label: string
  sublabel: string
  accent: 'emerald' | 'cyan' | 'purple' | 'amber'
}

export interface NewsletterActionableItem {
  kind: 'protocol' | 'modality'
  id: string
  discoverFamilyKey: string
  exploreDeepLink: string
  name: string
  badgeText: string
  heroImageUrl: string
  hookStats: [NewsletterHookStat, NewsletterHookStat, NewsletterHookStat]
  keyBenefits: string[]
  oneLinePromise: string
  whyIncluded: string
  pubmedLinks: { label: string; pmid: string; url: string }[]
  levlScoreOptimal: string
  levlScoreBeginner: string
  curveKey: string
  curveSpec: BiologicalCurveSpec
  onsetPhases: [
    { phase: string; window: string; detail: string },
    { phase: string; window: string; detail: string },
    { phase: string; window: string; detail: string }
  ]
  vectorScores: {
    vectorName: string
    score: number
    effectStat: string
    color: string
  }[]
  steps: NewsletterActionableStep[]
  beginnerScalingNote: string
  cautions: string
  disclaimer: string
}

export interface OutpaceAgingIssue {
  issueNumber: number
  shortSlug: string
  slug: string
  title: string
  subtitle: string
  dateLabel: string
  readTimeLabel: string
  levStateOfPlayParagraph: string
  introSummaryParagraph: string
  themes: { id: string; title: string; summary: string }[]
  studies: NewsletterStudySection[]
  protocolOfTheWeek: NewsletterActionableItem
  modalityOfTheWeek: NewsletterActionableItem
  closingParagraph: string
  aboutLevlParagraph: string
}

export const OUTPACE_AGING_ISSUE_01: OutpaceAgingIssue = {
  issueNumber: 1,
  shortSlug: 'edition-1',
  slug: 'issue-01-nad-nanovaccine-glial-autophagy',
  title: 'Outpace Aging: LEVL Weekly Longevity Roundup',
  subtitle: 'Frontiers of Longevity Science, Cellular Rejuvenation & Daily Protocols for Longevity Escape Velocity',
  dateLabel: 'November 5, 2026',
  readTimeLabel: '6 min read',
  levStateOfPlayParagraph:
    'We are living through the inflection point where aging shifts from an inevitable biological decline into a programmable engineering problem. As artificial intelligence, multi-omic screening, and precision nanomedicine converge, researchers are no longer just cataloging the damage of old age, they are finding the exact molecular switches that restore youthful cellular function and move humanity closer to longevity escape velocity. On the live LEVL x FutureGraph Observatory this week, five peer-reviewed breakthroughs and firming 2036 to 2040 prediction markets pulled our 99th-percentile Longevity Escape Velocity intercept 26 days closer to October 2036 (and 16 days closer to February 2042 for 80th-percentile proactive adopters), while improving the 99th-percentile intrinsic Pace of Aging benchmark by 0.0035 to 0.665 biological years per calendar year.',
  introSummaryParagraph:
    'This week, we cover an oral enzyme blocker that extended mouse lifespan from 24 to 28 months by stopping a single age-activated enzyme from shredding the body\'s energy machinery, a spider-silk nanovaccine that wakes up aged immune cells to clear senescent fat, and more across five landmark studies in Nature Medicine, Nature Neuroscience, Aging Cell, Advanced Science, and iScience. A clear thread connects all five breakthroughs: aging accelerates when the cell\'s internal recycling and immune-clearing systems stall, and reactivating those single bottlenecks reverses inflammation across the brain and body. At the end of this edition, we pair these discoveries with one Protocol of the Week and one Modality of the Week so you can implement the frontier of longevity science right now, slow your personal pace of aging, and best position yourself to reach longevity escape velocity.',
  themes: [
    {
      id: 'theme-nad-autophagy',
      title: '1. Shielding the Cellular Energy & Recycling Engine',
      summary: 'Stopping upstream enzymes from degrading NAMPT and restoring intracellular autophagy halts multi-organ decline.'
    },
    {
      id: 'theme-glial-command',
      title: '2. Brain Support Cells Governing Systemic Youth',
      summary: 'Astrocytes and microglia control both hippocampal memory resilience and peripheral organ inflammation.'
    },
    {
      id: 'theme-clinical-translation',
      title: '3. Next-Gen Senolytics & Rapid Human Trial Clocks',
      summary: 'Immune-rejuvenating nanovaccines and validated pace-of-aging DNA methylation clocks compress human clinical translation.'
    }
  ],
  studies: [
    // =========================================================================
    // STUDY 1: iScience — AEP Inhibition (#11a) & NAMPT/NAD+ Lifespan Extension
    // =========================================================================
    {
      number: 1,
      id: 'study-1-aep-nampt-lifespan',
      journal: 'iScience (Cell Press)',
      publishDate: 'October 2026',
      headline:
        'Oral enzyme blocker extends mouse lifespan from 24 to 28 months by protecting cellular NAD+ production',
      keyStatBadge: '+17% Total Lifespan (24 → 28 Months)',
      themeTag: 'Cellular NAD+ & Proteostasis',
      accentColor: 'emerald',
      paragraphs: [
        'Why do levels of nicotinamide adenine dinucleotide (NAD+), a coenzyme found in all living cells that fuels mitochondrial energy production and DNA repair, drop by roughly half as mammals enter old age? Researchers at the Shenzhen Institute of Advanced Technology publishing in iScience asked whether an age-activated protein-cutting enzyme called asparagine endopeptidase (AEP) directly drives this energy collapse by destroying the enzyme that manufactures NAD+.',
        'To test this, the team fed an oral, brain-permeable AEP blocker called compound #11a to naturally aging mice starting at 18 months of age, roughly equivalent to a 60-year-old human. They tracked survival, insulin sensitivity, and memory performance against untreated control mice for the remainder of their lives.',
        'Blocking AEP produced remarkable whole-body rejuvenation. While untreated control mice lived an average of 24 months, mice given compound #11a starting at 18 months lived an average of 28 months, a 17 percent increase in total lifespan and a 67 percent increase in remaining life expectancy from the start of treatment. The researchers found that as animals age, rising AEP levels physically slice apart NAMPT, the master enzyme that recycles cellular building blocks back into fresh NAD+. Protecting NAMPT with compound #11a restored youthful NAD+ levels and boosted sirtuin 1 (SIRT1), a longevity protein that repairs DNA and stabilizes mitochondria. Treated mice showed lower multi-organ inflammation, improved insulin sensitivity, stronger motor coordination, and sharper memory in maze testing.'
      ],
      limits:
        'This study was conducted entirely in mice, and the authors did not test human safety, human dosing, or long-term toxicology for compound #11a. Further testing in larger mammals is required to verify that blocking AEP over many years does not interfere with normal cellular protein turnover.',
      futureImplications:
        'Discovering that AEP physically destroys the body\'s NAD+ manufacturing enzyme gives drug developers a single upstream target that solves both protein degradation and mitochondrial energy loss at once. Instead of relying only on daily NAD+ supplements to refill a leaking bucket, future AEP blockers could preserve our native NAD+ production engine well into late life.',
      studyUrl: 'https://www.cell.com/iscience/fulltext/S2589-0042(26)03373-0',
      doiLabel: 'Cell Press iScience • S2589-0042(26)03373-0',
      visualSpec: {
        defaultChartType: 'telemetry_curve',
        chartTitle: 'Mammalian Survival & Intact NAMPT / NAD+ Preservation Under Oral #11a',
        chartSubtitle: 'Late-Life Intervention Started at Month 18 (Human ~60 yr Equivalent) • C57BL/6 Mice',
        sourceFigureBadge: 'SOURCE: iScience (2026) • S2589-0042(26)03373-0 • C57BL/6 Aged Cohort (18m Start)',
        curveSpec: {
          id: 'study1_aep_nampt_survival',
          tabLabel: '📈 Survival & NAD+ Trajectory',
          title: 'Cohort Survival & Cellular NAD+ Salvage Trajectory (18 to 30 Months)',
          subtitle: 'Oral AEP Inhibitor (#11a) vs. Untreated Aged Control • NAMPT Cleavage Blockade',
          yAxisLabel: 'Cohort Survival',
          yAxisTicks: ['100% Alive', '50% Median', '0% Alive'],
          xAxisLabels: ['16m', '18m (Start)', '20m', '22m', '24m (Ctrl)', '26m', '28m (#11a)', '30m'],
          colorScheme: 'emerald_teal',
          phaseZones: [
            { x: 52, width: 78, label: 'BASELINE AGING', tint: 'slate' },
            { x: 130, width: 225, label: 'NAMPT & NAD+ PRESERVED', tint: 'emerald' },
            { x: 355, width: 170, label: '+4 MO LIFESPAN GAIN', tint: 'cyan' }
          ],
          thresholdLine: {
            y: 98,
            label: '50% Median Survival Threshold (24m Control vs. 28m #11a)',
            color: '#34d399'
          },
          solidCurve: {
            label: 'Oral #11a AEP Blocker (28.0 Mo Average Lifespan • Intact NAMPT)',
            path: 'M 52,36 L 130,38 C 195,40 265,48 330,68 C 385,84 425,98 465,126 C 495,146 512,160 525,166',
            areaPath:
              'M 52,36 L 130,38 C 195,40 265,48 330,68 C 385,84 425,98 465,126 C 495,146 512,160 525,166 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 130,38 C 195,40 265,48 330,68 C 385,84 425,98 465,126'
          },
          secondaryCurve: {
            label: 'Untreated Aged Control (24.0 Mo Average Lifespan • NAMPT Cleaved)',
            path: 'M 52,36 L 130,42 C 185,54 245,76 305,98 C 350,124 390,154 435,168 L 525,170',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 130,
              y: 38,
              curve: 'solid',
              badge: '💊 Month 18: #11a Oral Start',
              valueTag: 'NAMPT Shielded',
              mechanismDetail:
                'Daily oral compound #11a crosses the blood-brain barrier and inhibits age-upregulated lysosomal AEP (legumain), stopping the enzymatic cleavage of NAMPT.'
            },
            {
              x: 305,
              y: 98,
              curve: 'secondary',
              badge: '⚠️ Month 24: Control Median',
              valueTag: '24.0 Mo Lifespan',
              mechanismDetail:
                'Untreated control mice reach 50% mortality at 24 months as uninhibited AEP fragments NAMPT, collapsing cellular NAD+/NADH ratios and SIRT1 activity.'
            },
            {
              x: 425,
              y: 98,
              curve: 'solid',
              badge: '🚀 Month 28: #11a Median (+17%)',
              valueTag: '28.0 Mo Lifespan',
              mechanismDetail:
                'Mice receiving #11a achieve an average lifespan of 28 months (+17% total lifespan, +67% remaining life from 18m start) with youthful insulin sensitivity and spatial memory.'
            }
          ],
          citation: {
            study: 'Yang, Ye et al., iScience (2026)',
            pmid: 'S2589-0042(26)03373-0',
            url: 'https://www.cell.com/iscience/fulltext/S2589-0042(26)03373-0',
            keyMetric: '24 → 28 Months Average Lifespan (+17%)'
          }
        },
        cohortBars: [
          {
            label: '#11a Oral AEP Inhibitor (Started at 18 Mo)',
            deltaText: '28.0 Months Avg (+17% Total / +67% Remaining)',
            percentWidth: 94,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-cyan-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'Untreated Aged Control Mice',
            deltaText: '24.0 Months Avg (Baseline Senescent Decline)',
            percentWidth: 72,
            barColorClass: 'bg-slate-600',
            textColorClass: 'text-slate-300'
          },
          {
            label: 'Intact NAMPT & Cellular NAD+/NADH Ratio',
            deltaText: 'Restored to Young Adult Baseline (+SIRT1)',
            percentWidth: 88,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-teal-400',
            textColorClass: 'text-cyan-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Age-Induced Lysosomal AEP Surge',
            detail:
              'During mammalian aging, the protease asparagine endopeptidase (AEP / legumain) becomes hyperactive across brain, liver, and kidney tissues.',
            accentClass: 'border-rose-500/40 bg-rose-950/20 text-rose-300'
          },
          {
            stepNum: 2,
            title: 'Compound #11a Blocks NAMPT Cleavage',
            detail:
              'Unchecked AEP physically slices apart NAMPT (rate-limiting enzyme of the NAD+ salvage pathway). Oral #11a binds AEP and keeps NAMPT intact.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 3,
            title: 'NAD+/NADH & SIRT1 Rebound',
            detail:
              'Preserved NAMPT restores intracellular NAD+ pools, elevating the NAD+/NADH ratio and reactivating the longevity deacetylase SIRT1.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 4,
            title: '4-Month Lifespan & Healthspan Extension',
            detail:
              'Multi-organ senescence (p16/p21) and inflammation drop, insulin sensitivity rebounds, and average mouse lifespan rises from 24 to 28 months.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #1 Experimental Benchmark (iScience 2026)',
          headers: ['Parameter / Cohort', 'Untreated Aged Control', 'Oral #11a AEP Inhibitor'],
          rows: [
            {
              col1: 'Intervention Start Age',
              col2: '18 Months (Standard Diet)',
              col3: '18 Months (Oral #11a in Food)',
              col3ColorClass: 'text-cyan-300 font-semibold'
            },
            {
              col1: 'Average Total Lifespan',
              col2: '24.0 Months',
              col3: '28.0 Months (+17% Total Lifespan)',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Remaining Life from 18m Start',
              col2: '+6.0 Months Remaining',
              col3: '+10.0 Months Remaining (+67%)',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'NAMPT & NAD+/NADH Status',
              col2: 'Proteolytically Cleaved / Depleted',
              col3: 'Protected Intact NAMPT & High SIRT1',
              col3ColorClass: 'text-cyan-300 font-semibold'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 2: Advanced Science — CK5-GC-NV Spider-Silk Senolytic Nanovaccine
    // =========================================================================
    {
      number: 2,
      id: 'study-2-senolytic-nanovaccine',
      journal: 'Advanced Science',
      publishDate: 'October 2026',
      headline:
        'Spider-silk senolytic vaccine extends mouse median survival from 79 to 91 weeks by waking up aged immune cells',
      keyStatBadge: '+12 Weeks Survival (79 → 91 Wks • HR 0.28)',
      themeTag: 'Senolytic Immunotherapy',
      accentColor: 'cyan',
      paragraphs: [
        'Senescent cells are damaged cells that permanently stop dividing but refuse to die, accumulating in aging organs and releasing inflammatory proteins that harm neighboring tissue. Scientists have tried building vaccines to train the immune system to clear these cells, but older immune systems respond poorly because their dendritic cells, the scout cells that teach T-cells what to attack, have become senescent themselves. A research team publishing in Advanced Science asked whether a single nanovaccine could rejuvenate aged dendritic cells while simultaneously training them to hunt down senescent fat cells.',
        'The researchers engineered a dual-action nanovaccine wrapped in a specialized spider-silk protein scaffold and loaded with Gpnmb, a surface marker heavily concentrated on senescent fat cells. They tested the vaccine in naturally aged mice and mice fed a high-fat diet, comparing it against standard vaccine formulas lacking the spider-silk scaffold.',
        'The spider-silk scaffold acted like a youth serum for the immune system itself. It quieted senescence stress signals inside aged dendritic cells, restoring their ability to present targets and unleashing killer CD8+ T-cells that selectively wiped out Gpnmb-positive senescent fat cells in visceral fat. Vaccinated mice cleared excess liver fat, restored healthy insulin sensitivity, and showed steep reductions in tissue senescence markers. In the survival cohort, median lifespan rose from 79 weeks in the control vaccine group to 91 weeks in the spider-silk nanovaccine group, a 12-week median survival gain.'
      ],
      limits:
        'All metabolic and survival experiments were performed in mouse models, with no primate or human clinical data reported. Because the Gpnmb target protein also appears at low baseline levels on certain healthy immune and pigment cells, long-term safety studies are needed to rule out autoimmune side effects in humans.',
      futureImplications:
        'You cannot rely on an aging immune system to clear aging tissue unless you rejuvenate the immune system first. Proving that a single nanoparticle can wake up aged immune scout cells and direct precision T-cell clearance of senescent fat paves the way for long-acting senolytic shots that could replace repetitive pill regimens.',
      studyUrl: 'https://doi.org/10.1002/advs.78545',
      doiLabel: 'Advanced Science • 10.1002/advs.78545',
      visualSpec: {
        defaultChartType: 'cohort_bars',
        chartTitle: 'Median Survival Across 4 Senolytic Vaccine Formulations (Weeks)',
        chartSubtitle: 'CK5-GC-NV Bi-Adjuvant Spider-Silk Nanovaccine vs. Unscaffolded Controls • HR = 0.28 (p < 0.001)',
        sourceFigureBadge: 'SOURCE: Advanced Science (2026) • DOI: 10.1002/advs.78545 • Log-Rank p < 0.001',
        curveSpec: {
          id: 'study2_ck5_nanovaccine_survival',
          tabLabel: '📈 Survival Curve',
          title: 'Kaplan-Meier Median Survival: CK5-GC-NV Nanovaccine vs. Gpnmb/CpG Control',
          subtitle: 'Targeted CD8+ T-Cell Clearance of Gpnmb+ Senescent Adipocytes • HR = 0.28',
          yAxisLabel: 'Cohort Survival',
          yAxisTicks: ['100% Alive', '50% Median', '0% Alive'],
          xAxisLabels: ['60w', '68w', '74w', '79w (Ctrl)', '83w', '87w', '91w (CK5)', '96w'],
          colorScheme: 'cyan_emerald',
          phaseZones: [
            { x: 52, width: 120, label: 'DC REJUVENATION', tint: 'cyan' },
            { x: 172, width: 190, label: 'GPNMB+ FAT CLEARANCE', tint: 'emerald' },
            { x: 362, width: 163, label: '91.0 WK MEDIAN (+12 WKS)', tint: 'purple' }
          ],
          thresholdLine: {
            y: 98,
            label: '50% Median Survival (79.0 Wks Control vs. 91.0 Wks CK5-GC-NV)',
            color: '#22d3ee'
          },
          solidCurve: {
            label: 'CK5-GC-NV Bi-Adjuvant Nanovaccine (91.0 Wks Median • 95% CI: 88–94w)',
            path: 'M 52,36 L 160,38 C 235,40 310,48 375,70 C 415,85 442,98 475,128 C 498,148 514,162 525,168',
            areaPath:
              'M 52,36 L 160,38 C 235,40 310,48 375,70 C 415,85 442,98 475,128 C 498,148 514,162 525,168 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 160,38 C 235,40 310,48 375,70 C 415,85 442,98 475,128'
          },
          secondaryCurve: {
            label: 'Gpnmb/CpG Standard Vaccine Control (79.0 Wks Median • 95% CI: 76–82w)',
            path: 'M 52,36 L 140,46 C 195,62 248,80 292,98 C 340,124 385,152 430,168 L 525,170',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 160,
              y: 38,
              curve: 'solid',
              badge: '🛡️ Dendritic Cell Reset',
              valueTag: 'Aurka/b & PI3K Down',
              mechanismDetail:
                'The cationic spider-silk variant CK5 suppresses senescence-linked Aurka/b and PI3K/AKT phosphorylation in aged dendritic cells, restoring youthful antigen cross-presentation.'
            },
            {
              x: 292,
              y: 98,
              curve: 'secondary',
              badge: '⚠️ Week 79: Control Median',
              valueTag: '79.0 Wks (CI: 76–82)',
              mechanismDetail:
                'Standard Gpnmb + CpG vaccination without the CK5 senomodulator scaffold fails to overcome aged dendritic cell dysfunction, reaching median mortality at 79.0 weeks.'
            },
            {
              x: 442,
              y: 98,
              curve: 'solid',
              badge: '🎯 Week 91: CK5-GC-NV Median',
              valueTag: '91.0 Wks (HR = 0.28)',
              mechanismDetail:
                'Full CK5-GC-NV immunization clears Gpnmb+ senescent visceral adipocytes, reverses insulin resistance, and extends median survival to 91.0 weeks (p < 0.001).'
            }
          ],
          citation: {
            study: 'Song, Du, Dong, Yin et al., Advanced Science (2026)',
            pmid: '10.1002/advs.78545',
            url: 'https://doi.org/10.1002/advs.78545',
            keyMetric: '91.0 vs. 79.0 Weeks Median Survival (HR = 0.28, p < 0.001)'
          }
        },
        cohortBars: [
          {
            label: 'CK5-GC-NV (Spider-Silk + Gpnmb + CpG Nanovaccine)',
            deltaText: '91.0 Wks Median (95% CI: 88.0–94.0 • HR 0.28)',
            percentWidth: 96,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-emerald-400',
            textColorClass: 'text-cyan-300'
          },
          {
            label: 'K36-GC-NV (Control Cationic Scaffold + CpG)',
            deltaText: '83.0 Wks Median (95% CI: 80.0–86.0)',
            percentWidth: 78,
            barColorClass: 'bg-indigo-500/80',
            textColorClass: 'text-indigo-300'
          },
          {
            label: 'CK5-Gpnmb (Spider-Silk Without CpG Adjuvant)',
            deltaText: '81.0 Wks Median (95% CI: 78.0–84.0)',
            percentWidth: 73,
            barColorClass: 'bg-slate-500',
            textColorClass: 'text-slate-300'
          },
          {
            label: 'Gpnmb/CpG Control (No Spider-Silk Scaffold)',
            deltaText: '79.0 Wks Median (95% CI: 76.0–82.0)',
            percentWidth: 68,
            barColorClass: 'bg-rose-500/70',
            textColorClass: 'text-rose-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Co-Assembled CK5-GC-NV Nanoparticle',
            detail:
              'Combines cationic spider-silk protein variant CK5, senescent-cell surface antigen Gpnmb, and Toll-like receptor 9 adjuvant CpG.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 2,
            title: 'Dendritic Cell Senescence Reversal',
            detail:
              'CK5 acts as an intrinsic senomodulator inside aged dendritic cells, downregulating mitotic kinases Aurka/b and suppressing PI3K/AKT hyper-phosphorylation.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          },
          {
            stepNum: 3,
            title: 'CD8+ Cytotoxic T-Cell Priming',
            detail:
              'Rejuvenated dendritic cells efficiently cross-present the Gpnmb antigen alongside CpG signaling, generating a potent pool of Gpnmb-specific CD8+ killer T-cells.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 4,
            title: 'Adipose Senolysis & +12 Wk Survival',
            detail:
              'CD8+ T-cells eliminate Gpnmb+ senescent visceral fat cells, lowering p16/p21/p53, clearing liver steatosis, and extending median survival from 79 to 91 weeks.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #2 Formulation Survival Table (Advanced Science 2026)',
          headers: ['Vaccine Cohort', 'Median Survival (95% CI)', 'Immunological & Metabolic Outcome'],
          rows: [
            {
              col1: 'CK5-GC-NV (Full Bi-Adjuvant)',
              col2: '91.0 Weeks (88.0–94.0)',
              col3: 'HR = 0.28 (p < 0.001) • Rejuvenated DCs + Gpnmb+ Purge',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'K36-GC-NV (Alt Carrier)',
              col2: '83.0 Weeks (80.0–86.0)',
              col3: 'Partial antigen delivery without full DC senomodulation',
              col3ColorClass: 'text-cyan-300'
            },
            {
              col1: 'CK5-Gpnmb (No CpG)',
              col2: '81.0 Weeks (78.0–84.0)',
              col3: 'DC modulation without TLR9 co-stimulation',
              col3ColorClass: 'text-slate-300'
            },
            {
              col1: 'Gpnmb/CpG Control',
              col2: '79.0 Weeks (76.0–82.0)',
              col3: 'Blunted T-cell priming due to aged dendritic cells',
              col3ColorClass: 'text-rose-300'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 3: Aging Cell — Astrocytic FGF13 & Phafin2 Autophagy Brain-Body Axis
    // =========================================================================
    {
      number: 3,
      id: 'study-3-fgf13-astrocyte-autophagy',
      journal: 'Aging Cell',
      publishDate: 'October 2026',
      headline:
        'Restoring a single protein in brain support cells reverses memory loss and lowers whole-body inflammation in aged mice',
      keyStatBadge: 'Near-Young Memory + Systemic IL-6 Drop',
      themeTag: 'Brain-Body Glial Autophagy',
      accentColor: 'purple',
      paragraphs: [
        'Can cellular aging inside one small region of the brain accelerate physical aging and inflammation across the rest of the body? Researchers publishing in Aging Cell investigated fibroblast growth factor 13 (FGF13), an internal signaling protein that stays inside brain cells, to see why it drops sharply with age and whether restoring it in non-neuronal support cells could protect both memory and whole-body health.',
        'The team first analyzed brain tissue from young and old mice and macaque monkeys, finding that FGF13 plunges with age inside astrocytes, the star-shaped glial support cells that nourish neurons, specifically within the prefrontal cortex (the brain\'s executive control center). They then deleted astrocytic FGF13 in young mice and, in a second experiment, used viral gene delivery to restore FGF13 in prefrontal cortex astrocytes of aged mice, testing spatial memory alongside blood and organ aging markers.',
        'Deleting FGF13 in the brain\'s astrocytes of young mice triggered rapid memory loss and brain inflammation, and surprisingly drove whole-body aging: inflammatory blood markers interleukin-6 (IL-6) and interferon-gamma spiked, while senescence markers surged in the liver, kidneys, spleen, and skin. Conversely, restoring FGF13 in prefrontal astrocytes of old mice brought spatial memory back to near-young levels and significantly reduced inflammation and cellular senescence across peripheral organs. Mechanistically, FGF13 reactivated autophagy, the cell\'s internal recycling system that digests damaged proteins before they trigger inflammatory cascades.'
      ],
      limits:
        'The gene-deletion and viral gene-therapy experiments were performed in mice, while the monkey data was observational tissue analysis. Because the viral vector was injected directly into the prefrontal cortex, researchers must develop blood-brain-barrier-crossing delivery vehicles or small-molecule autophagy activators before testing this approach in humans.',
      futureImplications:
        'This study proves that waste recycling inside brain support cells acts as a central thermostat for whole-body inflammaging, the chronic sterile inflammation that drives age-related disease. Restoring cellular autophagy in the brain may soon serve as a two-for-one therapy that protects memory while slowing biological aging in peripheral organs.',
      studyUrl: 'https://doi.org/10.1111/acel.70784',
      doiLabel: 'Aging Cell • 10.1111/acel.70784 (25:e70784)',
      visualSpec: {
        defaultChartType: 'cohort_bars',
        chartTitle: 'Prefrontal Astrocyte FGF13 Restoration: Brain & Peripheral Organ Rejuvenation',
        chartSubtitle: 'Medial Prefrontal Cortex (mPFC) AAV-FGF13 Overexpression vs. Aged Control & Astrocyte Knockout',
        sourceFigureBadge: 'SOURCE: Aging Cell (2026) • DOI: 10.1111/acel.70784 • Mouse & Macaque mPFC Analysis',
        curveSpec: {
          id: 'study3_fgf13_brain_body_curve',
          tabLabel: '📈 Brain-Body Aging Trajectory',
          title: 'Prefrontal Astrocyte Autophagy & Whole-Body Inflammaging Trajectory',
          subtitle: 'mPFC Astrocytic FGF13 Restoration (Via Phafin2 Autophagy) vs. Unchecked Glial Senescence',
          yAxisLabel: 'Youthful Function',
          yAxisTicks: ['100% Young', '60% Mid-Age', '20% Impaired'],
          xAxisLabels: ['Young (3m)', '6m', '12m', '15m (AAV)', '18m', '21m', '24m'],
          colorScheme: 'purple_cyan',
          phaseZones: [
            { x: 52, width: 150, label: 'NATURAL FGF13 DECLINE', tint: 'slate' },
            { x: 202, width: 160, label: 'PHAFIN2 AUTOPHAGY RESET', tint: 'purple' },
            { x: 362, width: 163, label: 'SYSTEMIC IL-6 & ORGAN SHIELD', tint: 'emerald' }
          ],
          solidCurve: {
            label: 'mPFC Astrocyte FGF13 Restored (Near-Young Memory + Low Systemic IL-6)',
            path: 'M 52,40 C 105,46 155,64 202,86 C 245,62 295,48 355,46 C 415,44 475,48 525,52',
            areaPath:
              'M 52,40 C 105,46 155,64 202,86 C 245,62 295,48 355,46 C 415,44 475,48 525,52 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 202,86 C 245,62 295,48 355,46 C 415,44 475,48 525,52'
          },
          secondaryCurve: {
            label: 'Aged Control / Astrocyte FGF13 Depletion (Memory Loss + Organ Senescence)',
            path: 'M 52,40 C 105,52 155,74 202,94 C 265,118 340,142 425,156 C 470,162 502,166 525,168',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 202,
              y: 86,
              curve: 'solid',
              badge: '🧠 mPFC Astrocyte AAV-FGF13',
              valueTag: 'Phafin2 Bound',
              mechanismDetail:
                'Restoring intracellular FGF13 inside medial prefrontal cortex astrocytes promotes direct binding to Phafin2, restarting autophagic clearance of damaged proteins.'
            },
            {
              x: 355,
              y: 46,
              curve: 'solid',
              badge: '⚡ Spatial Memory Rescued',
              valueTag: 'Near-Young Latency',
              mechanismDetail:
                'Homeostatic astrocytes suppress microglial neuroinflammation, restoring Morris water maze spatial learning and memory performance in aged mice.'
            },
            {
              x: 475,
              y: 48,
              curve: 'solid',
              badge: '🛡️ Peripheral Organs Protected',
              valueTag: 'IL-6 & IFN-γ Down',
              mechanismDetail:
                'Quieting brain glial inflammation lowers circulating blood IL-6 and IFN-γ and reduces cellular senescence markers across the liver, kidney, spleen, and skin.'
            }
          ],
          citation: {
            study: 'Zheng, Wang et al., Aging Cell (2026)',
            pmid: '10.1111/acel.70784',
            url: 'https://doi.org/10.1111/acel.70784',
            keyMetric: 'mPFC Astrocyte FGF13 Reverses Cognitive & Peripheral Organ Aging'
          }
        },
        cohortBars: [
          {
            label: 'Astrocytic Autophagic Flux (Phafin2 Pathway)',
            deltaText: 'Restored to Youthful Homeostasis',
            percentWidth: 92,
            barColorClass: 'bg-gradient-to-r from-purple-500 to-cyan-400',
            textColorClass: 'text-purple-300'
          },
          {
            label: 'Spatial Memory Performance (Morris Water Maze)',
            deltaText: 'Rescued to Near-Young Escape Latency',
            percentWidth: 88,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-emerald-400',
            textColorClass: 'text-cyan-300'
          },
          {
            label: 'Circulating Systemic Cytokines (IL-6 & IFN-γ)',
            deltaText: 'Significant Systemic Reduction vs. Aged Control',
            percentWidth: 84,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-teal-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'Peripheral Organ Senescence (Liver, Kidney, Spleen, Skin)',
            deltaText: 'Markedly Suppressed Peripheral Senescence',
            percentWidth: 81,
            barColorClass: 'bg-gradient-to-r from-indigo-500 to-purple-400',
            textColorClass: 'text-indigo-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Age-Related mPFC Astrocyte FGF13 Loss',
            detail:
              'Single-cell and tissue analyses across aging mice and macaques show intracellular FGF13 drops steeply in medial prefrontal cortex astrocytes.',
            accentClass: 'border-rose-500/40 bg-rose-950/20 text-rose-300'
          },
          {
            stepNum: 2,
            title: 'Direct FGF13–Phafin2 Complex Formation',
            detail:
              'Restored FGF13 directly binds the endosomal-lysosomal adapter protein Phafin2 inside cortical astrocytes.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          },
          {
            stepNum: 3,
            title: 'Astrocytic Autophagy & Microglial Quieting',
            detail:
              'The FGF13-Phafin2 complex activates autophagic waste clearance, stopping astrocytes from triggering inflammatory microglial cascades.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 4,
            title: 'Memory Rescue & Systemic Organ Rejuvenation',
            detail:
              'Spatial memory rebounds while circulating IL-6 and IFN-γ plummet, reducing senescence in the liver, kidneys, spleen, and skin.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #3 Brain-to-Body Experimental Matrix (Aging Cell 2026)',
          headers: ['Biological System', 'Astrocyte FGF13 Knockout (Young)', 'Astrocyte FGF13 Overexpression (Aged)'],
          rows: [
            {
              col1: 'mPFC Astrocyte Autophagy',
              col2: 'Impaired Phafin2 signaling & waste buildup',
              col3: 'Restored Phafin2 autophagic flux',
              col3ColorClass: 'text-purple-300 font-semibold'
            },
            {
              col1: 'Hippocampal / Prefrontal Memory',
              col2: 'Accelerated water-maze cognitive deficits',
              col3: 'Rescued to near-young spatial memory',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Blood Cytokines (IL-6, IFN-γ)',
              col2: 'Elevated systemic blood inflammation',
              col3: 'Significantly suppressed circulating cytokines',
              col3ColorClass: 'text-cyan-300 font-semibold'
            },
            {
              col1: 'Liver, Kidney, Spleen & Skin',
              col2: 'Premature multi-organ senescence surge',
              col3: 'Alleviated peripheral tissue senescence',
              col3ColorClass: 'text-emerald-300 font-bold'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 4: Nature Neuroscience — Neuronal PLA2G2F Microglial Lipid Purge
    // =========================================================================
    {
      number: 4,
      id: 'study-4-pla2g2f-cognitive-resilience',
      journal: 'Nature Neuroscience',
      publishDate: 'October 15, 2026',
      headline:
        'Neuron-secreted enzyme clears toxic fat droplets from brain immune cells to preserve memory in aging mice',
      keyStatBadge: 'Purges Microglial Lipid Droplets & Preserves Memory',
      themeTag: 'Cognitive Resilience & Lipid Homeostasis',
      accentColor: 'amber',
      paragraphs: [
        'Why do some older adults keep razor-sharp memory into their 80s and 90s despite carrying age-related brain changes, a trait neuroscientists call cognitive resilience? Researchers at Mass General Brigham, the Harvard Stem Cell Institute, and the Broad Institute publishing in Nature Neuroscience asked whether aging memory neurons actively release protective enzymes to keep neighboring brain circuits healthy.',
        'Screening memory-forming neurons in the mouse hippocampus, the team identified a gene that produces PLA2G2F, a secreted phospholipase enzyme released outside the neuron to break down specific fats. They checked human brain tissue databases to confirm its link to human cognitive resilience, deleted the enzyme in mouse hippocampal neurons, boosted its production in aging mice from 12 to 16 months of age, and tested how it affects human microglia (the brain\'s resident immune cells) grown from reprogrammed adult stem cells.',
        'In both aging mice and cognitively resilient older humans, neurons ramped up PLA2G2F production as a natural shield. Deleting the enzyme in mice caused severe synapse loss, clogged brain immune cells with toxic fat droplets, and accelerated memory decline. Conversely, boosting PLA2G2F in aging mice protected hippocampal connections and preserved youthful memory. When applied to human stem-cell-derived microglia in the lab, neuronal PLA2G2F acted as a broadcast signal that purged toxic lipid droplets and cholesterol esters from the immune cells, preventing them from turning inflammatory.'
      ],
      limits:
        'The memory rescue experiments took place in 12- to 16-month-old mice, while the human evidence came from post-mortem brain tissue correlations and laboratory dishes of human stem-cell-derived microglia. The study did not test systemic drug delivery of the enzyme across the human blood-brain barrier.',
      futureImplications:
        'Fat-clogged microglia have recently emerged as a primary driver of Alzheimer\'s disease and age-related cognitive decline. Discovering the exact native enzyme that neurons use to clear lipid buildup from human microglia gives biotech teams a natural blueprint for brain-penetrant biologics that lock in lifelong cognitive resilience.',
      studyUrl: 'https://doi.org/10.1038/s41593-026-02465-z',
      doiLabel: 'Nature Neuroscience • 10.1038/s41593-026-02465-z',
      visualSpec: {
        defaultChartType: 'telemetry_curve',
        chartTitle: 'Hippocampal Memory Trajectory & Microglial Lipid-Droplet Clearance (12 to 16 Months)',
        chartSubtitle: 'Dentate Granule Cell PLA2G2F Overexpression vs. Pla2g2f Deletion • Mass General / Broad Institute',
        sourceFigureBadge: 'SOURCE: Nature Neuroscience (2026) • DOI: 10.1038/s41593-026-02465-z • Mice & Human iPSC Microglia',
        curveSpec: {
          id: 'study4_pla2g2f_cognitive_resilience',
          tabLabel: '📈 Cognitive Resilience Curve',
          title: 'Hippocampal-Cortical Memory & Synapse Preservation Across Aging (8 to 16 Months)',
          subtitle: 'Secreted Neuronal PLA2G2F Broadcast Signal vs. Pla2g2f Deletion • Microglial Lipid Homeostasis',
          yAxisLabel: 'Memory & Synapses',
          yAxisTicks: ['100% Resilient', '65% Normal Age', '30% Impaired'],
          xAxisLabels: ['8m', '10m', '12m (Boost)', '13m', '14m', '15m', '16m'],
          colorScheme: 'amber_cyan',
          phaseZones: [
            { x: 52, width: 148, label: 'EARLY SYNAPSE STRESS', tint: 'slate' },
            { x: 200, width: 165, label: 'PLA2G2F LIPID BROADCAST', tint: 'amber' },
            { x: 365, width: 160, label: 'MEMORY CIRCUIT LOCKED', tint: 'cyan' }
          ],
          solidCurve: {
            label: 'PLA2G2F Boosted in Dentate Granule Neurons (Protected Memory & Low Microglial Lipids)',
            path: 'M 52,42 C 102,44 152,50 200,56 C 255,48 310,42 375,40 C 435,38 485,40 525,42',
            areaPath:
              'M 52,42 C 102,44 152,50 200,56 C 255,48 310,42 375,40 C 435,38 485,40 525,42 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 200,56 C 255,48 310,42 375,40 C 435,38 485,40 525,42'
          },
          secondaryCurve: {
            label: 'Pla2g2f Deleted (Lipid-Droplet-Clogged Microglia, Gliosis & Memory Loss)',
            path: 'M 52,42 C 102,52 152,72 200,92 C 260,118 335,144 415,158 C 465,165 500,168 525,170',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 200,
              y: 56,
              curve: 'solid',
              badge: '📡 Month 12: PLA2G2F Broadcast',
              valueTag: 'Active Catalytic Site',
              mechanismDetail:
                'Hippocampal dentate granule cells secrete catalytically active PLA2G2F into the extracellular space in response to early age-related synapse stress.'
            },
            {
              x: 375,
              y: 40,
              curve: 'solid',
              badge: '🧹 Microglial Lipid Purge',
              valueTag: 'Cholesterol Esters Down',
              mechanismDetail:
                'Neuronal PLA2G2F signals to neighboring microglia (validated in human iPSC-derived microglia), clearing intracellular lipid droplets and cholesterol esters.'
            },
            {
              x: 485,
              y: 40,
              curve: 'solid',
              badge: '🧠 Month 16: Cognitive Resilience',
              valueTag: 'Synapses & Neurogenesis Intact',
              mechanismDetail:
                'Preventing lipid-droplet microglial inflammation preserves hippocampal-cortical synapses, adult neurogenesis, and spatial memory trajectory.'
            }
          ],
          citation: {
            study: 'Vicidomini, Goode, Sahay et al., Nature Neuroscience (2026)',
            pmid: '10.1038/s41593-026-02465-z',
            url: 'https://doi.org/10.1038/s41593-026-02465-z',
            keyMetric: 'Secreted Neuronal PLA2G2F Clears Microglial Lipids & Protects Memory'
          }
        },
        cohortBars: [
          {
            label: 'Hippocampal-Cortical Memory Retention (PLA2G2F Boosted)',
            deltaText: 'Trajectory Modified to Youthful Resilience',
            percentWidth: 93,
            barColorClass: 'bg-gradient-to-r from-amber-500 to-emerald-400',
            textColorClass: 'text-amber-300'
          },
          {
            label: 'Human iPSC Microglia Lipid Droplet & Cholesterol Ester Clearance',
            deltaText: 'Significant Purge (Requires Intact Catalytic Site)',
            percentWidth: 89,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-teal-400',
            textColorClass: 'text-cyan-300'
          },
          {
            label: 'Human Cognitive Resilience Correlation (Older Adult Cohorts)',
            deltaText: 'Elevated DGC PLA2G2F in Resilient Brains',
            percentWidth: 85,
            barColorClass: 'bg-gradient-to-r from-purple-500 to-indigo-400',
            textColorClass: 'text-purple-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Hippocampal Synapse Stress Sensor',
            detail:
              'Dentate granule cells (DGCs) in the aging hippocampus sense early synaptic stress and upregulate expression of the secreted enzyme gene Pla2g2f.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 2,
            title: 'Extracellular PLA2G2F Broadcast Signal',
            detail:
              'Neurons secrete catalytically active phospholipase A2 group IIF (PLA2G2F) into the local hippocampal microenvironment.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 3,
            title: 'Microglial Lipid & Cholesterol Ester Purge',
            detail:
              'In both mouse glia and human iPSC-derived microglia, neuronal PLA2G2F mobilizes and clears toxic intracellular lipid droplets and cholesterol esters.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          },
          {
            stepNum: 4,
            title: 'Synapse Protection & Cognitive Resilience',
            detail:
              'Lipid-cleared microglia remain non-inflammatory, preventing reactive astrogliosis, preserving neurogenesis, and locking in hippocampal memory.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #4 Genetic & Human iPSC Findings (Nature Neuroscience 2026)',
          headers: ['Experimental Condition', 'Microglial & Glial State', 'Synapse & Memory Outcome'],
          rows: [
            {
              col1: 'DGC Pla2g2f Boosting (12–16m Mice)',
              col2: 'Cleared lipid droplets, calm microglia',
              col3: 'Protected hippocampal synapses & memory trajectory',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Human iPSC Microglia + PLA2G2F',
              col2: 'Reduced lipid droplet & cholesterol ester load',
              col3: 'Intercellular neuroprotective signaling confirmed',
              col3ColorClass: 'text-cyan-300 font-semibold'
            },
            {
              col1: 'Catalytic-Site Mutant PLA2G2F',
              col2: 'Failed to mobilize lipid droplets or reduce gliosis',
              col3: 'Proves enzymatic activity is strictly required',
              col3ColorClass: 'text-amber-300'
            },
            {
              col1: 'DGC Pla2g2f Deletion (Knockout)',
              col2: 'Severe lipid accumulation & reactive gliosis',
              col3: 'Accelerated synapse loss & memory impairment',
              col3ColorClass: 'text-rose-300'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 5: Nature Medicine — TranslAGE 51-Trial Epigenetic Clock Benchmark
    // =========================================================================
    {
      number: 5,
      id: 'study-5-translage-epigenetic-clocks',
      journal: 'Nature Medicine',
      publishDate: 'August 21, 2026',
      headline:
        'Benchmark of 51 human trials proves pace-of-aging epigenetic clocks capture longevity therapies within months',
      keyStatBadge: '51 Human Trials • 16 Clocks + 94 DNAm Biomarkers',
      themeTag: 'Human Clinical Trial Endpoints',
      accentColor: 'rose',
      paragraphs: [
        'Testing whether a longevity therapy extends human life normally takes decades, creating a massive bottleneck for clinical trials. Epigenetic clocks, which are machine-learning algorithms that estimate biological age by reading chemical methyl tags on DNA, offer a way to measure age reversal in months, but scientists lacked proof of which clocks reliably respond to real human treatments. The Biomarkers of Aging Consortium, publishing in Nature Medicine, built the largest harmonized human interventional database ever assembled to find out.',
        'The researchers created TranslAGE, a unified database combining 51 human longitudinal clinical trials covering structured exercise, caloric restriction, lifestyle programs, and longevity drugs. Across blood and tissue samples from all 51 studies, they calculated 16 leading epigenetic clocks and 94 additional DNA methylation biomarkers to see which algorithms consistently register biological age changes after proven interventions.',
        'The benchmark revealed a sharp divide. First-generation clocks trained simply to guess a person\'s birth year responded poorly and inconsistently to treatments. In contrast, newer clocks trained to predict mortality risk and the speed of physiological decline, led by DunedinPACE (which measures how fast your body is aging per calendar year) and PCGrimAge, showed strong, consistent reductions across both lifestyle and drug trials. Anti-inflammatory drugs and structured metabolic lifestyle protocols produced the fastest drops in epigenetic aging pace, while early human senolytic trials showed more variable responses depending on trial length.'
      ],
      limits:
        'While all 51 trials in TranslAGE involved human participants, several individual studies had small sample sizes and short follow-up windows under one year. Additionally, regulatory agencies like the FDA have not yet formally approved short-term epigenetic clock reductions as standalone surrogate endpoints for drug approval.',
      futureImplications:
        'TranslAGE gives clinical trialists the exact measurement playbook the longevity field has been waiting for. By proving across 51 human trials that DunedinPACE and PCGrimAge reliably detect biological age slowdowns within months, researchers can now screen human rejuvenation therapies in rapid phase 2 trials and dramatically accelerate progress toward longevity escape velocity.',
      studyUrl: 'https://doi.org/10.1038/s41591-026-04562-9',
      doiLabel: 'Nature Medicine • 10.1038/s41591-026-04562-9',
      visualSpec: {
        defaultChartType: 'cohort_bars',
        chartTitle: 'TranslAGE Responsiveness Ranking Across 51 Human Interventional Trials',
        chartSubtitle: '16 Epigenetic Clocks + 94 DNA Methylation Biomarkers • Mortality/Pace Clocks vs. Chronological Clocks',
        sourceFigureBadge: 'SOURCE: Nature Medicine (2026) • DOI: 10.1038/s41591-026-04562-9 • 51 Human Trials',
        curveSpec: {
          id: 'study5_translage_clock_sensitivity',
          tabLabel: '📈 Trial Responsiveness Curve',
          title: 'Epigenetic Biomarker Signal Detection Over 12-Month Human Clinical Trial Window',
          subtitle: 'Pace-of-Aging Clocks (DunedinPACE / PCGrimAge) vs. Gen-1 Chronological Clocks Across 51 Trials',
          yAxisLabel: 'Treatment Signal',
          yAxisTicks: ['High Sensitivity', 'Moderate Signal', 'Noise Floor'],
          xAxisLabels: ['Baseline', 'Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 24'],
          colorScheme: 'rose_amber',
          phaseZones: [
            { x: 52, width: 130, label: 'EARLY METHYLATION SHIFT', tint: 'amber' },
            { x: 182, width: 190, label: 'DUNEDINPACE / PCGRIMAGE SIGNAL', tint: 'emerald' },
            { x: 372, width: 153, label: 'VALIDATED TRIAL ENDPOINT', tint: 'cyan' }
          ],
          solidCurve: {
            label: 'Pace & Mortality Clocks (DunedinPACE & PCGrimAge • Strong Consistent Response)',
            path: 'M 52,152 C 105,134 155,96 215,68 C 275,46 340,38 415,36 C 465,35 500,34 525,34',
            areaPath:
              'M 52,152 C 105,134 155,96 215,68 C 275,46 340,38 415,36 C 465,35 500,34 525,34 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 155,96 C 215,68 275,46 340,38 C 415,36 465,35 525,34'
          },
          secondaryCurve: {
            label: '1st-Gen Chronological Clocks (Horvath / Hannum • Weak Inconsistent Response)',
            path: 'M 52,152 C 115,150 180,144 250,140 C 325,136 400,134 465,132 L 525,130',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 215,
              y: 68,
              curve: 'solid',
              badge: '⏱️ 3–6 Mo: Pace Shift Detected',
              valueTag: 'DunedinPACE Responsive',
              mechanismDetail:
                'Clocks trained on longitudinal physiological change (DunedinPACE) capture lifestyle, caloric restriction, and anti-inflammatory drug effects within 3 to 6 months.'
            },
            {
              x: 325,
              y: 136,
              curve: 'secondary',
              badge: '⚠️ Chronological Clock Lag',
              valueTag: 'Gen-1 Inconsistent',
              mechanismDetail:
                'First-generation clocks trained strictly to predict chronological age fail to consistently register metabolic and anti-inflammatory longevity interventions.'
            },
            {
              x: 415,
              y: 36,
              curve: 'solid',
              badge: '🏆 51-Trial Gold Standard',
              valueTag: 'PCGrimAge & DunedinPACE',
              mechanismDetail:
                'Across 51 harmonized human trials and 110 DNAm biomarkers, mortality- and pace-trained clocks deliver the highest reproducibility for phase-2 longevity clinical trials.'
            }
          ],
          citation: {
            study: 'Sehgal, Borrus, Armstrong et al., Nature Medicine (2026)',
            pmid: '10.1038/s41591-026-04562-9',
            url: 'https://doi.org/10.1038/s41591-026-04562-9',
            keyMetric: '51 Human Trials • 16 Clocks + 94 DNAm Biomarkers Harmonized'
          }
        },
        cohortBars: [
          {
            label: 'DunedinPACE (3rd-Gen Pace-of-Aging Clock)',
            deltaText: 'Tier-1 Responsiveness Across Lifestyle & Drug Trials',
            percentWidth: 95,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-cyan-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'PCGrimAge (Principal-Component Mortality Clock)',
            deltaText: 'Tier-1 Responsiveness & High Longitudinal Stability',
            percentWidth: 91,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-blue-400',
            textColorClass: 'text-cyan-300'
          },
          {
            label: 'Targeted Anti-Inflammatory & Metabolic Interventions',
            deltaText: 'Strongest Cross-Study DNAm Rejuvenation Signal',
            percentWidth: 84,
            barColorClass: 'bg-gradient-to-r from-amber-500 to-emerald-400',
            textColorClass: 'text-amber-300'
          },
          {
            label: '1st-Gen Chronological Clocks (Horvath 2013 / Hannum)',
            deltaText: 'Low / Inconsistent Short-Term Trial Responsiveness',
            percentWidth: 38,
            barColorClass: 'bg-slate-600',
            textColorClass: 'text-slate-400'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: '51 Longitudinal Human Trials Harmonized',
            detail:
              'TranslAGE integrates public and private human clinical trials spanning caloric restriction (e.g., CALERIE), exercise, lifestyle, and pharmacological interventions.',
            accentClass: 'border-rose-500/40 bg-rose-950/20 text-rose-300'
          },
          {
            stepNum: 2,
            title: '16 Clocks + 94 DNAm Biomarkers Profiled',
            detail:
              'Every longitudinal sample is scored across 110 standardized DNA methylation algorithms to eliminate pipeline bias.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 3,
            title: 'Pace & Mortality Clocks Outperform Gen-1',
            detail:
              'DunedinPACE and PCGrimAge consistently register biological age deceleration, whereas chronological clocks miss short-term therapeutic shifts.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 4,
            title: 'Surrogate Endpoint Selection Playbook',
            detail:
              'Provides trialists with the STAR framework (Stability, Treatment response, Associations, Risk) to design rapid human clinical trials.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #5 TranslAGE Epigenetic Clock Benchmark (Nature Medicine 2026)',
          headers: ['Biomarker / Intervention Class', 'Scope in TranslAGE', 'Clinical Trial Responsiveness'],
          rows: [
            {
              col1: 'DunedinPACE & PCGrimAge',
              col2: 'Scored across all 51 human trials',
              col3: 'Highest & most consistent treatment sensitivity',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Lifestyle & Caloric Restriction',
              col2: 'Multi-month longitudinal human cohorts',
              col3: 'Robust reductions in pace-of-aging DNAm markers',
              col3ColorClass: 'text-cyan-300 font-semibold'
            },
            {
              col1: 'Anti-Inflammatory (e.g. TNF-α Blockade)',
              col2: 'Pharmacological interventional cohorts',
              col3: 'Strong, reproducible clock deceleration',
              col3ColorClass: 'text-emerald-300 font-semibold'
            },
            {
              col1: '1st-Gen Chronological Clocks',
              col2: 'Horvath / Hannum birth-year predictors',
              col3: 'Weak or inconsistent response over <2 yr trials',
              col3ColorClass: 'text-rose-300'
            }
          ]
        }
      }
    }
  ],

  // ===========================================================================
  // PROTOCOL OF THE WEEK: NAD+ Salvage & Sirtuin Renewal Protocol
  // ===========================================================================
  protocolOfTheWeek: {
    kind: 'protocol',
    id: 'protocol-cellular-nad-autophagy',
    discoverFamilyKey: 'protocol_sinclair_epigenetic',
    exploreDeepLink: '/explore?mode=discover&tab=protocols&item=protocol_sinclair_epigenetic&type=protocol',
    name: 'NAD+ Salvage & Sirtuin Renewal Protocol',
    badgeText: '5-Step Daily Cellular Stack • Bridges Studies #1 & #3',
    heroImageUrl: '/images/discover/hero_cellular_nad_senolytic.jpg',
    hookStats: [
      {
        value: '+60%',
        label: 'Cellular NAD+ Pool',
        sublabel: 'Restores youthful whole-blood & tissue NAD+/NADH ratio in human RCTs',
        accent: 'purple'
      },
      {
        value: '+34%',
        label: 'Muscle NAMPT Enzyme',
        sublabel: 'Aerobic & interval training upregulate the native NAD+ recycling factory',
        accent: 'cyan'
      },
      {
        value: '-38%',
        label: 'CD38 Drain & Inflammation',
        sublabel: 'Evening apigenin & spermidine plug the NAD+ leak and trigger overnight autophagy',
        accent: 'emerald'
      }
    ],
    keyBenefits: [
      'Restores youthful mitochondrial ATP energy output and daytime cognitive stamina within 14 days',
      'Protects the body\'s native NAMPT recycling enzyme so NAD+ precursors aren\'t wasted',
      'Activates SIRT1/PARP1 DNA repair and overnight autophagic clearance of damaged proteins',
      'Improves skeletal muscle insulin sensitivity (+25% in human trials) and deep slow-wave sleep'
    ],
    oneLinePromise:
      'Refill cellular NAD+ pools, block age-related NAD+ drain, and activate sirtuin-driven cellular recycling in five coordinated steps.',
    whyIncluded:
      'Study #1 (iScience) showed that preserving the body\'s NAMPT recycling enzyme to boost NAD+ and SIRT1 extended mouse lifespan by 17 percent, while Study #3 (Aging Cell) proved that cellular autophagy quiets whole-body inflammation. In human clinical trials, oral NAD+ precursors safely elevate blood and tissue NAD+ metabolites and improve muscle insulin sensitivity, while aerobic and interval training naturally increase human skeletal muscle NAMPT enzyme levels.',
    pubmedLinks: [
      {
        label: 'Martens et al., Nat Commun (PMID: 29599478)',
        pmid: '29599478',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29599478/'
      },
      {
        label: 'Yoshino et al., Science (PMID: 33888596)',
        pmid: '33888596',
        url: 'https://pubmed.ncbi.nlm.nih.gov/33888596/'
      }
    ],
    levlScoreOptimal: '+6.8 LEVL',
    levlScoreBeginner: '+3.9 LEVL',
    curveKey: 'cellular_nad_sirtuin_curve',
    curveSpec: {
      id: 'newsletter_protocol_nad_sirtuin',
      tabLabel: '⚡ 24h NAD+ & SIRT1 Curve',
      title: 'Intracellular NAD+ Salvage, NAMPT Peak & Overnight Autophagy Flux',
      subtitle: '5-Step Synergistic Stack (AM Precursor + Zone 2 NAMPT + PM CD38 Blockade) vs. Unprotected Age 50+ Baseline',
      yAxisLabel: 'Cellular NAD+ Pool',
      yAxisTicks: ['100% Youthful', '70% Restored', '45% Age-Depleted'],
      xAxisLabels: ['7a', '8a (NMN/NR)', '11a', '2p (Zone 2)', '6p (Spermidine)', '9p (Apigenin)', '2a (Autophagy)'],
      colorScheme: 'purple_cyan',
      phaseZones: [
        { x: 90, width: 125, label: 'AM NAMPT SALVAGE PEAK', tint: 'cyan' },
        { x: 245, width: 120, label: 'EXERCISE NAMPT BOOST', tint: 'emerald' },
        { x: 385, width: 140, label: 'CD38 BLOCK + AUTOPHAGY', tint: 'purple' }
      ],
      solidCurve: {
        label: '5-Step NAD+ Salvage Stack (Refills Precursor + Boosts NAMPT + Plugs CD38 Leak)',
        path: 'M 52,135 C 75,130 98,92 135,48 C 175,32 220,44 265,40 C 315,36 375,34 435,36 C 475,38 505,40 525,42',
        areaPath:
          'M 52,135 C 75,130 98,92 135,48 C 175,32 220,44 265,40 C 315,36 375,34 435,36 C 475,38 505,40 525,42 L 525,175 L 52,175 Z',
        peakHighlightPath: 'M 98,92 C 135,48 175,32 220,44 C 265,40 315,36 435,36'
      },
      secondaryCurve: {
        label: 'Unprotected Aging Baseline (CD38 Drain & Declining NAMPT Salvage)',
        path: 'M 52,135 C 115,138 185,144 265,148 C 345,152 425,156 525,158',
        style: 'dashed_warning'
      },
      nodes: [
        {
          x: 135,
          y: 48,
          curve: 'solid',
          badge: '🧬 8:00 AM: NMN/NR + TMG',
          valueTag: '+60% Blood NAD+',
          mechanismDetail:
            'Morning NMN or NR (paired with 500 mg TMG methyl support) matches the circadian peak in CLOCK/BMAL1-regulated NAMPT expression, elevating intracellular NAD+.'
        },
        {
          x: 265,
          y: 40,
          curve: 'solid',
          badge: '🏃 Zone 2 / HIIT NAMPT Synthesis',
          valueTag: '+28% Muscle NAMPT',
          mechanismDetail:
            'Aerobic and interval training trigger AMPK signaling in skeletal muscle, increasing endogenous NAMPT protein levels to keep recycling nicotinamide into NAD+.'
        },
        {
          x: 435,
          y: 36,
          curve: 'solid',
          badge: '🌙 9:00 PM: Apigenin CD38 Shield',
          valueTag: 'CD38 Inhibited',
          mechanismDetail:
            'Evening apigenin (50 mg) inhibits the age-upregulated CD38 NADase enzyme that drains cellular NAD+, while dinner spermidine (10 mg) promotes overnight autophagy.'
        }
      ],
      citation: {
        study: 'Martens et al., Nat Commun (2018) • Yoshino et al., Science (2021)',
        pmid: '29599478',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29599478/',
        keyMetric: '+60% Cellular NAD+ Flux & Protected NAMPT Salvage'
      }
    },
    onsetPhases: [
      {
        phase: 'Phase 1: Acute NAD+ Pool Refill',
        window: 'Days 3 to 14',
        detail: 'Whole-blood and PBMC NAD+ metabolites rise by 40% to 60%, supporting daytime mitochondrial ATP output and morning alertness.'
      },
      {
        phase: 'Phase 2: Muscle NAMPT & Insulin Sensitivity',
        window: 'Weeks 3 to 8',
        detail: 'Skeletal muscle NAMPT protein expression and AKT insulin signaling improve alongside deeper slow-wave sleep from evening CD38 inhibition.'
      },
      {
        phase: 'Phase 3: Epigenetic & Autophagic Renewal',
        window: 'Weeks 8 to 16+',
        detail: 'Sustained SIRT1/SIRT3 deacetylase activity and spermidine-driven mitophagy lower systemic inflammatory cytokines (hs-CRP, IL-6).'
      }
    ],
    vectorScores: [
      { vectorName: 'Cellular Longevity', score: 94, effectStat: '+60% NAD+ & SIRT1/PARP1 DNA Repair', color: '#a855f7' },
      { vectorName: 'Metabolic Health', score: 82, effectStat: '+25% Muscle Insulin Sensitivity', color: '#10b981' },
      { vectorName: 'Chronic Inflammation', score: 78, effectStat: 'CD38 NADase & SASP Suppression', color: '#06b6d4' },
      { vectorName: 'Brain Longevity', score: 76, effectStat: 'Neuronal & Glial Autophagy Support', color: '#3b82f6' },
      { vectorName: 'Heart Health', score: 72, effectStat: 'Endothelial SIRT1 & Arterial Compliance', color: '#f59e0b' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Morning NAD+ Precursor',
        timingAndFrequency: '8:00 AM • Daily',
        optimalDoseBadge: '500–1,000 mg NMN or NR',
        beginnerDoseBadge: '250 mg NMN or NR',
        optimalInstruction:
          'Take 500 mg to 1,000 mg of NMN (nicotinamide mononucleotide) or NR (nicotinamide riboside) with water in the morning to match your body\'s natural circadian peak in NAMPT enzyme activity.',
        beginnerInstruction:
          'Start with 250 mg of NMN or NR with water at 8:00 AM for the first 14 days to assess baseline energy response.'
      },
      {
        stepNumber: 2,
        title: 'Methyl-Pool Support',
        timingAndFrequency: '8:00 AM • Daily',
        optimalDoseBadge: '500 mg TMG (Betaine)',
        beginnerDoseBadge: '250 mg TMG (Betaine)',
        optimalInstruction:
          'Take 500 mg of TMG (trimethylglycine) alongside your morning NMN or NR to replenish methyl groups used when the liver clears excess nicotinamide.',
        beginnerInstruction:
          'Pair your starter dose with 250 mg of TMG at 8:00 AM to keep homocysteine and methyl donors balanced.'
      },
      {
        stepNumber: 3,
        title: 'Exercise NAMPT Boost',
        timingAndFrequency: 'Morning or Afternoon • 4x / Week',
        optimalDoseBadge: '45 min Zone 2 or 4x4 HIIT',
        beginnerDoseBadge: '30 min Zone 2 • 3x / Week',
        optimalInstruction:
          'Complete 45 minutes of Zone 2 cardio (conversational pace at 65 to 75 percent of maximum heart rate) or a 4x4 interval session to stimulate your muscles to build more native NAMPT enzyme.',
        beginnerInstruction:
          'Complete three 30-minute brisk Zone 2 walks or cycling sessions per week at a conversational pace.'
      },
      {
        stepNumber: 4,
        title: 'Dietary Autophagy Trigger',
        timingAndFrequency: 'Evening Meal • Daily',
        optimalDoseBadge: '10 mg Spermidine',
        beginnerDoseBadge: 'Food Sources (Wheat Germ / Aged Cheese)',
        optimalInstruction:
          'Include 10 mg of dietary or supplemental spermidine (found in wheat germ, aged cheese, or standardized extract) with dinner to stimulate overnight cellular autophagy.',
        beginnerInstruction:
          'Begin with whole-food polyamine sources at dinner (1 tbsp toasted wheat germ or culinary mushrooms) before adding standardized extracts.'
      },
      {
        stepNumber: 5,
        title: 'Block the CD38 Leak',
        timingAndFrequency: '9:00 PM • Daily',
        optimalDoseBadge: '50 mg Apigenin Pre-Bed',
        beginnerDoseBadge: 'Chamomile Tea or 25 mg Apigenin',
        optimalInstruction:
          'Take 50 mg of apigenin before bed to inhibit CD38, an inflammatory enzyme that rises with age and drains cellular NAD+, while supporting deep sleep.',
        beginnerInstruction:
          'Add 50 mg apigenin (or concentrated chamomile extract) in week 3 once your morning routine is established.'
      }
    ],
    beginnerScalingNote:
      'Start for the first two weeks with Step 3 (three 30-minute Zone 2 cardio sessions per week) plus a half-dose of Step 1 and Step 2 (250 mg NMN or NR with 250 mg TMG at 8:00 AM) before adding evening spermidine or apigenin.',
    cautions:
      'People with active cancer or history of brain tumors should avoid NAD+ precursors (NMN and NR) unless cleared by an oncologist, because rapidly dividing tumor cells also use NAD+ for growth. Pregnant or nursing women should avoid concentrated NAD+ precursors and high-dose apigenin.',
    disclaimer: 'Educational content only, not medical advice.'
  },

  // ===========================================================================
  // MODALITY OF THE WEEK: Early 16:8 Time-Restricted Eating (eTRE)
  // ===========================================================================
  modalityOfTheWeek: {
    kind: 'modality',
    id: 'modality-early-tre-fasting',
    discoverFamilyKey: 'fasting_etre',
    exploreDeepLink: '/explore?mode=discover&tab=modalities&item=fasting_etre&type=modality',
    name: 'Early 16:8 Time-Restricted Eating (eTRE)',
    badgeText: 'Zero-Cost Daily Modality • Bridges Studies #1, #2 & #3',
    heroImageUrl: '/images/discover/hero_fasting_etre.jpg',
    hookStats: [
      {
        value: '-28%',
        label: 'Fasting Insulin Drop',
        sublabel: '5-week controlled human crossover trial without calorie reduction (Cell Metabolism)',
        accent: 'emerald'
      },
      {
        value: '-11 / -10 mmHg',
        label: 'Blood Pressure Reduction',
        sublabel: 'Clinically significant systolic & diastolic improvement matching first-line therapy',
        accent: 'cyan'
      },
      {
        value: '-32%',
        label: 'Oxidative Stress & Autophagy',
        sublabel: 'Drops 8-isoprostane markers and flips the 16-hour overnight AMPK/ULK1 switch',
        accent: 'amber'
      }
    ],
    keyBenefits: [
      'Dramatically lowers fasting insulin (-28%) and improves morning beta-cell responsiveness',
      'Eliminates the late-night melatonin-insulin collision by closing the kitchen 4 hours before sleep',
      'Lowers overnight resting heart rate by 3–5 bpm and boosts deep sleep heart-rate variability (HRV)',
      'Triggers daily 16-hour hepatic glycogen depletion and ULK1-driven cellular autophagy at zero cost'
    ],
    oneLinePromise:
      'Align your 8-hour eating window with morning insulin sensitivity and close the kitchen 4 hours before sleep to lower fasting insulin and trigger nightly autophagy at zero cost.',
    whyIncluded:
      'Studies #1, #2, and #3 all center on restoring insulin sensitivity, clearing senescent fat tissue, and activating overnight cellular recycling. In a controlled human clinical trial (Cell Metabolism), men who shifted their eating window earlier in the day reduced fasting insulin by 28 percent, lowered blood pressure by 11/10 mmHg, and cut oxidative stress markers by 32 percent in just 5 weeks, even when calories were matched so zero weight was lost.',
    pubmedLinks: [
      {
        label: 'Sutton et al., Cell Metabolism (PMID: 29754952)',
        pmid: '29754952',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29754952/'
      }
    ],
    levlScoreOptimal: '+4.6 LEVL',
    levlScoreBeginner: '+2.8 LEVL',
    curveKey: 'early_tre_insulin_autophagy',
    curveSpec: {
      id: 'newsletter_modality_etre_curve',
      tabLabel: '⏳ 24h Insulin & Autophagy Curve',
      title: '24-Hour Plasma Insulin Clearance & Overnight AMPK / Autophagy Initiation',
      subtitle: 'Early 16:8 eTRE (9:00 AM–5:00 PM Window) vs. Late-Night Eating Pattern (Sutton et al., Cell Metabolism)',
      yAxisLabel: 'Autophagy / AMPK',
      yAxisTicks: ['Peak Autophagy', 'Glycogen Switch', 'Fed / Insulin High'],
      xAxisLabels: ['8a', '9a (Meal 1)', '1p', '5p (Close)', '9p (Sleep)', '1a (AMPK)', '5a (ULK1)', '8a'],
      colorScheme: 'emerald_teal',
      phaseZones: [
        { x: 85, width: 155, label: '8H ANABOLIC WINDOW (9A–5P)', tint: 'amber' },
        { x: 240, width: 115, label: 'MELATONIN GLUCOSE SHIELD', tint: 'cyan' },
        { x: 355, width: 170, label: '16H OVERNIGHT AUTOPHAGY', tint: 'emerald' }
      ],
      solidCurve: {
        label: 'Early 16:8 eTRE (Kitchen Closed 5:00 PM → -28% Fasting Insulin & Nightly Autophagy)',
        path: 'M 52,48 C 72,52 88,125 125,148 C 165,152 205,146 240,122 C 285,88 335,58 395,38 C 445,30 490,32 525,36',
        areaPath:
          'M 52,48 C 72,52 88,125 125,148 C 165,152 205,146 240,122 C 285,88 335,58 395,38 C 445,30 490,32 525,36 L 525,175 L 52,175 Z',
        peakHighlightPath: 'M 240,122 C 285,88 335,58 395,38 C 445,30 490,32 525,36'
      },
      secondaryCurve: {
        label: 'Late Dinner / 8:30 PM Snacking (High Nocturnal Insulin • Blunted Autophagy)',
        path: 'M 52,115 C 110,135 180,145 255,152 C 315,158 375,148 435,132 C 475,122 505,118 525,115',
        style: 'dashed_warning'
      },
      nodes: [
        {
          x: 125,
          y: 148,
          curve: 'solid',
          badge: '☀️ 9:00 AM: Peak Insulin Sensitivity',
          valueTag: '8h Window Opens',
          mechanismDetail:
            'Pancreatic beta-cell responsiveness and skeletal muscle GLUT4 translocation peak in the morning, clearing meal glucose with minimal insulin secretion.'
        },
        {
          x: 240,
          y: 122,
          curve: 'solid',
          badge: '🛑 5:00 PM: Kitchen Closed',
          valueTag: '4h Pre-Sleep Cutoff',
          mechanismDetail:
            'Finishing calories by 5:00 PM prevents food intake from colliding with evening melatonin release (which binds pancreatic MTNR1B receptors and impairs glucose clearance by 50%).'
        },
        {
          x: 395,
          y: 38,
          curve: 'solid',
          badge: '♻️ 1:00 AM–8:00 AM: AMPK & Autophagy',
          valueTag: '-28% Fasting Insulin',
          mechanismDetail:
            'By hour 12 to 16 of the fast, hepatic glycogen depletion activates AMPK and inhibits mTORC1, launching ULK1-driven cellular autophagy during deep sleep.'
        }
      ],
      citation: {
        study: 'Sutton et al., Cell Metabolism (2018)',
        pmid: '29754952',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29754952/',
        keyMetric: '-28% Fasting Insulin, -11/-10 mmHg BP & -32% Oxidative Stress'
      }
    },
    onsetPhases: [
      {
        phase: 'Phase 1: Nocturnal HR & Glycemic Stabilization',
        window: 'Days 1 to 7',
        detail: 'Closing the kitchen 4 hours before sleep lowers overnight resting heart rate by 3 to 5 bpm and eliminates late-night glucose spikes.'
      },
      {
        phase: 'Phase 2: Fasting Insulin & Blood Pressure Drop',
        window: 'Weeks 2 to 5',
        detail: 'Controlled human trials show a 28% drop in fasting insulin, an 11/10 mmHg reduction in blood pressure, and a 32% drop in 8-isoprostane oxidative stress.'
      },
      {
        phase: 'Phase 3: Visceral Fat & Autophagic Remodeling',
        window: 'Weeks 6 to 12+',
        detail: 'Daily 16-hour AMPK activation enhances hepatic lipid clearance, mitochondrial biogenesis, and metabolic flexibility.'
      }
    ],
    vectorScores: [
      { vectorName: 'Metabolic Health', score: 92, effectStat: '-28% Fasting Insulin & HOMA-IR Drop', color: '#10b981' },
      { vectorName: 'Cellular Longevity', score: 86, effectStat: 'AMPK & ULK1 Overnight Autophagy', color: '#a855f7' },
      { vectorName: 'Heart Health', score: 84, effectStat: '-11 / -10 mmHg Blood Pressure Shift', color: '#06b6d4' },
      { vectorName: 'Chronic Inflammation', score: 80, effectStat: '-32% 8-iso-PGF2α Oxidative Stress', color: '#f59e0b' },
      { vectorName: 'Brain Longevity', score: 75, effectStat: 'Deep Sleep Glymphatic & Ketone Support', color: '#3b82f6' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Morning Hydration Gate',
        timingAndFrequency: 'Upon Waking • Daily',
        optimalDoseBadge: '16 oz Water + Electrolytes (0 Cal)',
        beginnerDoseBadge: '16 oz Water + Black Coffee / Tea',
        optimalInstruction:
          'Drink 16 ounces of water with electrolytes, black coffee, or plain tea while keeping zero calorie intake for the first 60 to 90 minutes after waking.',
        beginnerInstruction:
          'Drink 16 ounces of water upon waking and hold off on caloric creamers or breakfast until 8:00 AM.'
      },
      {
        stepNumber: 2,
        title: 'Open the 8-Hour Window',
        timingAndFrequency: '8:30 AM to 9:00 AM • Daily',
        optimalDoseBadge: '35–40g Protein First Meal',
        beginnerDoseBadge: '30g+ Protein at 8:30 AM',
        optimalInstruction:
          'Eat your first meal with 35 to 40 grams of protein when morning insulin sensitivity is at its peak.',
        beginnerInstruction:
          'Open your eating window at 8:30 AM with a high-protein meal to anchor daytime satiety.'
      },
      {
        stepNumber: 3,
        title: 'Close the Kitchen Early',
        timingAndFrequency: '4:30 PM to 5:00 PM • Daily',
        optimalDoseBadge: '5:00 PM Hard Cutoff (4h Pre-Bed)',
        beginnerDoseBadge: '6:30 PM Cutoff (14:10 Window)',
        optimalInstruction:
          'Finish your final meal by 5:00 PM (at least 4 hours before sleep) so rising evening melatonin does not impair blood sugar clearance.',
        beginnerInstruction:
          'Finish dinner by 6:30 PM (at least 3 hours before bed) and eliminate all post-dinner snacks or caloric drinks.'
      },
      {
        stepNumber: 4,
        title: '16-Hour Overnight Autophagy Fast',
        timingAndFrequency: '5:00 PM to 9:00 AM • Daily',
        optimalDoseBadge: '16h Fast (5:00 PM → 9:00 AM)',
        beginnerDoseBadge: '14h Fast (6:30 PM → 8:30 AM)',
        optimalInstruction:
          'Drink only water or herbal tea overnight, allowing liver glycogen depletion to switch on AMPK and cellular autophagy.',
        beginnerInstruction:
          'Maintain a clean 14-hour overnight fast with water or chamomile tea, stepping up to 16 hours in week 3.'
      }
    ],
    beginnerScalingNote:
      'If a 5:00 PM cutoff is too early for your dinner routine, start with a 12-hour window (8:00 AM to 8:00 PM) in week one, tighten to a 14:10 window (8:30 AM to 6:30 PM) in week two, and use the full 16:8 window 5 days per week once adapted.',
    cautions:
      'People with type 1 diabetes, anyone taking insulin or sulfonylurea medications, women who are pregnant or breastfeeding, and individuals with a history of disordered eating or BMI under 18.5 should not practice 16-hour fasting without physician guidance.',
    disclaimer: 'Educational content only, not medical advice.'
  },

  closingParagraph:
    'From oral enzyme blockers that protect our native NAD+ factory and spider-silk nanovaccines that wake up aged immune cells, to brain support cells that quiet whole-body inflammation and 51-trial epigenetic clock benchmarks that compress human clinical trials from decades into months, the blueprint for age reversal is coming together rapidly. While next-generation biologics advance toward human trials, you can activate those exact same cellular maintenance pathways today.',
  aboutLevlParagraph:
    'LEVL is the precision longevity operating system built to help you measure, schedule, and optimize the daily protocols that slow your pace of aging. Explore interactive biological telemetry curves, personalize your daily modality stack across all eight vectors of longevity, and track your real-time LEVL Score at levlhealth.com.'
}

export const OUTPACE_AGING_ISSUES: OutpaceAgingIssue[] = [OUTPACE_AGING_ISSUE_01]

/**
 * Resolves a newsletter issue by shortSlug (`edition-1`), full slug (`issue-01-nad-nanovaccine-glial-autophagy`),
 * numeric ID (`1`, `01`), or common variants (`issue-1`, `issue-01`, `week-1`).
 */
export function getOutpaceAgingIssueBySlug(rawSlug?: string | null): OutpaceAgingIssue | null {
  if (!rawSlug) return OUTPACE_AGING_ISSUE_01
  const clean = decodeURIComponent(rawSlug).trim().toLowerCase()

  for (const issue of OUTPACE_AGING_ISSUES) {
    const num = issue.issueNumber
    const padded = String(num).padStart(2, '0')
    const validAliases = [
      issue.shortSlug.toLowerCase(),
      issue.slug.toLowerCase(),
      `edition-${num}`,
      `edition-${padded}`,
      `issue-${num}`,
      `issue-${padded}`,
      `week-${num}`,
      `week-${padded}`,
      `${num}`,
      `${padded}`
    ]
    if (validAliases.includes(clean) || issue.slug.toLowerCase().includes(clean)) {
      return issue
    }
  }

  return null
}

