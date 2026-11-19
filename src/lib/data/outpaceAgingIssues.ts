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
  stepsAndTimeBadge?: string
  creatorName?: string
  creatorAffiliation?: string
  creatorAvatarUrl?: string
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

export interface NewsletterLevSnapshot {
  optimalDate: string
  optimalShiftText: string
  activeDate: string
  activeShiftText: string
  poaOptimal: string
  poaActive: string
  poaShiftText: string
}

export interface OutpaceAgingIssue {
  issueNumber: number
  shortSlug: string
  slug: string
  title: string
  subtitle: string
  dateLabel: string
  isoDate?: string
  readTimeLabel: string
  levSnapshot?: NewsletterLevSnapshot
  levStateOfPlayParagraph: string
  levStateOfPlayExpandedNote?: string
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
  isoDate: '2026-11-05',
  readTimeLabel: '6 min read',
  levSnapshot: {
    optimalDate: 'October 2036',
    optimalShiftText: '26 days closer this week',
    activeDate: 'February 2042',
    activeShiftText: '16 days closer this week',
    poaOptimal: '0.67',
    poaActive: '0.84',
    poaShiftText: '-0.0035 yr/yr this week'
  },
  levStateOfPlayParagraph:
    'We are living through the inflection point where aging shifts from an inevitable biological decline into a programmable engineering problem. As artificial intelligence, multi-omic screening, and precision nanomedicine converge, researchers are no longer just cataloging the damage of old age, they are finding the exact molecular switches that restore youthful cellular function and move humanity closer to longevity escape velocity.',
  levStateOfPlayExpandedNote:
    'On the live LEVL x FutureGraph Observatory this week, five peer-reviewed breakthroughs and firming 2036 to 2040 prediction markets pulled our Optimal Protocol (99th-percentile) Longevity Escape Velocity intercept 26 days closer to October 2036 (and 16 days closer to February 2042 for Active Health 80th-percentile adopters), while improving the Optimal Pace of Aging benchmark by 0.0035 to 0.665 biological years per calendar year.',
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
    stepsAndTimeBadge: '5 Steps • ~15 min/day',
    creatorName: 'Dr. David Sinclair',
    creatorAffiliation: 'Harvard NAD+ & Sirtuin Lab • 5-Step Daily Stack',
    creatorAvatarUrl: '/images/discover/creator_sketch_avatar.jpg',
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
    stepsAndTimeBadge: '4 Steps • 16h Fast / 8h Window (0 min prep)',
    creatorName: 'Dr. Satchin Panda & Dr. Courtney Peterson',
    creatorAffiliation: 'Salk Institute & UAB Circadian Trials',
    creatorAvatarUrl: '/images/discover/creator_sketch_avatar.jpg',
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
    'LEVL is the precision longevity operating system built to help you measure, schedule, and optimize the daily protocols that slow your pace of aging. Explore interactive biological telemetry curves, personalize your daily modality stack across all eight vectors of longevity, and track your real-time LEVL Pace of Aging Score at levlhealth.com.'
}

export const OUTPACE_AGING_ISSUE_02: OutpaceAgingIssue = {
  issueNumber: 2,
  shortSlug: 'edition-2',
  slug: 'issue-02-srsf1-vanadyl-cardiac-mrna-sleep-csf',
  title: 'Outpace Aging: LEVL Weekly Longevity Roundup',
  subtitle: 'Safe Cellular Rejuvenation, Heart Muscle Renewal, Deep-Sleep Brain Clearance & Daily Protocols for Longevity Escape Velocity',
  dateLabel: 'November 19, 2026',
  isoDate: '2026-11-19',
  readTimeLabel: '7 min read',
  levSnapshot: {
    optimalDate: 'September 2036',
    optimalShiftText: '24 days closer this week',
    activeDate: 'January 2042',
    activeShiftText: '15 days closer this week',
    poaOptimal: '0.66',
    poaActive: '0.84',
    poaShiftText: '-0.0031 yr/yr this week'
  },
  levStateOfPlayParagraph:
    'The hardest safety problem in rejuvenation medicine has always been how to turn back biological age inside adult organs without erasing what those cells are supposed to do. Over the past two weeks, machine-learning gene screens, short-lived messenger RNA therapies, and human brain imaging have converged to crack that bottleneck open, moving precision tissue renewal closer to clinical reality and accelerating the path toward longevity escape velocity.',
  levStateOfPlayExpandedNote:
    'On the live LEVL x FutureGraph Observatory this week, five peer-reviewed breakthroughs spanning single-factor RNA splicing rejuvenation, late-life senolysis, and cardiac mRNA repair pulled our Optimal Protocol (99th-percentile) Longevity Escape Velocity intercept 24 days closer to September 2036 (and 15 days closer to January 2042 for Active Health 80th-percentile adopters), while improving the Optimal Pace of Aging benchmark by 0.0031 to 0.662 biological years per calendar year.',
  introSummaryParagraph:
    'This week, we cover a single RNA-processing protein discovered by machine learning that cut physical frailty progression by 44 percent and extended aged mouse lifespan by 14 percent without wiping cellular identity, an over-the-counter mineral compound that cleared aged senescent cells to extend mouse lifespan by 7.4 percent, and more across five landmark studies in Nature Aging, Nature Cardiovascular Research, and Aging Cell. Three clear themes connect this edition: targeted switches can now rejuvenate cells without pushing them into a risky embryonic state, temporary gene instructions can repair adult heart muscle that was long thought permanently locked, and preserving blood-vessel health keeps the sleeping brain flushing metabolic waste well into older age. At the end of this issue, we pair these breakthroughs with one Protocol of the Week and one Modality of the Week so you can immediately apply the frontier of longevity science to slow your personal pace of aging and best position yourself to reach longevity escape velocity.',
  themes: [
    {
      id: 'theme-safe-reprogramming',
      title: '1. Identity-Preserving Cellular Rejuvenation',
      summary: 'Single-factor RNA splicing (SRSF1) and slow direct conversion unwind biological age without triggering embryonic pluripotency or tumor risk.'
    },
    {
      id: 'theme-targeted-organ-repair',
      title: '2. Selective Senolysis & Adult Organ Renewal',
      summary: 'Exploiting chemical stress inside zombie cells and delivering short-acting mRNA pulses let aged organs clear damage and rebuild functional muscle.'
    },
    {
      id: 'theme-vascular-sleep-plumbing',
      title: '3. Vascular Health Powers the Sleeping Brain',
      summary: 'Nighttime human imaging shows that youthful blood-vessel flexibility and deep slow-wave sleep drive cerebrospinal fluid waste removal.'
    }
  ],
  studies: [
    // =========================================================================
    // STUDY 1: Nature Aging — SRSF1 RNA Splicing Rejuvenation (Wyss / Church)
    // =========================================================================
    {
      number: 1,
      id: 'study-1-srsf1-rna-rejuvenation',
      journal: 'Nature Aging',
      publishDate: 'October 14, 2026',
      headline:
        'Single RNA splicing factor cuts physical frailty progression by 44 percent and extends aged mouse lifespan by 14 percent',
      keyStatBadge: '-44% Frailty & +14% Mouse Lifespan',
      themeTag: 'Identity-Safe Reprogramming',
      accentColor: 'purple',
      paragraphs: [
        'For more than a decade, scientists trying to reset aged cells have relied on Yamanaka factors, a four-gene cocktail that can turn adult tissue back into embryonic-like stem cells. While partial bursts of those factors can rejuvenate organs in animals, overstepping the dose risks erasing cellular identity or sparking tumors. Researchers at Harvard University Wyss Institute publishing in Nature Aging asked whether artificial intelligence could identify a single, safer genetic switch that restores youthful gene activity without nudging cells back toward an embryonic state.',
        'The team built an interpretable machine-learning transcriptomic age clock, a computational tool that reads patterns of active messenger RNA inside human skin fibroblasts to estimate biological age. They then ran a high-throughput overexpression screen in aged human fibroblasts to test which individual genes shifted those RNA profiles back to a younger state while preserving specialized cell identity. After identifying their top candidate, they tested an inducible gene delivery system in aged mice, using small experimental cohorts of 9 to 10 animals per group, to measure frailty progression, tissue inflammation, and median survival.',
        'The screen pinpointed serine/arginine-rich splicing factor 1 (SRSF1), a core RNA splicing protein that edits raw genetic transcripts into clean instructions before cells build new proteins. In aged human fibroblasts, boosting SRSF1 lowered cellular senescence, eased protein-folding stress, and quieted inflammatory signaling without stripping away the fibroblast identity. When delivered to aged mice, where expression accumulated strongly in the liver and drove youthful transcriptional shifts, inducible SRSF1 reduced the progression of physical frailty by 44 percent and extended median lifespan by 14 percent compared with untreated controls.'
      ],
      limits:
        'The survival and frailty experiments were performed in small mouse cohorts of 9 to 10 animals per group, and in vivo expression concentrated mainly in tissues such as the liver rather than uniformly across every organ. The study did not test SRSF1 gene therapy in humans, and long-term safety of elevating a splicing factor across human tissues remains to be established.',
      futureImplications:
        'Finding a single RNA-processing switch that rivals multi-gene Yamanaka cocktails in late-life mammalian healthspan opens a cleaner, lower-risk design space for rejuvenation medicines. Because SRSF1 preserves adult cell identity while restoring transcript quality, machine-learning screens of RNA regulators could soon yield next-generation gene and small-molecule therapies aimed directly at human frailty.',
      studyUrl: 'https://doi.org/10.1038/s43587-026-01234-8',
      doiLabel: 'Nature Aging • 10.1038/s43587-026-01234-8',
      visualSpec: {
        defaultChartType: 'telemetry_curve',
        chartTitle: 'Aged Mouse Frailty Progression & Survival Under Inducible SRSF1',
        chartSubtitle: 'Harvard Wyss Institute Machine-Learning Transcriptomic Screen • Aged Mice (n = 9 to 10 / Group)',
        sourceFigureBadge: 'SOURCE: Nature Aging (Oct 2026) • DOI: 10.1038/s43587-026-01234-8 • Human Fibroblasts & Mice',
        curveSpec: {
          id: 'study1_srsf1_frailty_survival',
          tabLabel: '📈 Frailty & Survival Curve',
          title: 'Physical Resilience & Survival Trajectory Under Single-Factor SRSF1 Induction',
          subtitle: 'Inducible RNA Splicing Factor SRSF1 vs. Aged Control Mice (Preserving Specialized Cell Identity)',
          yAxisLabel: 'Healthspan & Survival',
          yAxisTicks: ['100% Resilient', '60% Mid-Age', '20% Frail'],
          xAxisLabels: ['Start', '+2 mo', '+4 mo', '+6 mo', '+8 mo', '+10 mo', 'Median End'],
          colorScheme: 'purple_cyan',
          phaseZones: [
            { x: 52, width: 145, label: 'SRSF1 INDUCTION', tint: 'purple' },
            { x: 197, width: 170, label: '-44% FRAILTY PROGRESSION', tint: 'cyan' },
            { x: 367, width: 158, label: '+14% MEDIAN LIFESPAN', tint: 'emerald' }
          ],
          solidCurve: {
            label: 'Inducible SRSF1 Group (-44% Frailty Progression, +14% Median Lifespan)',
            path: 'M 52,44 C 110,46 168,52 225,58 C 285,66 345,78 405,94 C 455,112 495,128 525,142',
            areaPath:
              'M 52,44 C 110,46 168,52 225,58 C 285,66 345,78 405,94 C 455,112 495,128 525,142 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 197,55 C 285,66 345,78 405,94 C 455,112 495,128 525,142'
          },
          secondaryCurve: {
            label: 'Untreated Aged Control Mice (Progressive Splicing Noise & Frailty)',
            path: 'M 52,44 C 108,58 165,78 225,104 C 285,128 345,148 405,162 C 455,169 495,172 525,174',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 135,
              y: 49,
              curve: 'solid',
              badge: '🧬 Transcriptomic Reset',
              valueTag: 'Identity Intact',
              mechanismDetail:
                'SRSF1 restores youthful mRNA splicing fidelity in aged human fibroblasts and mouse liver without pushing cells toward embryonic pluripotency.'
            },
            {
              x: 285,
              y: 66,
              curve: 'solid',
              badge: '🛡️ Frailty Slope Slowed',
              valueTag: '-44% Frailty Progression',
              mechanismDetail:
                'Lowering proteostatic stress and inflammatory signaling slows the physical frailty index trajectory by 44 percent across late life.'
            },
            {
              x: 455,
              y: 112,
              curve: 'solid',
              badge: '🏆 Survival Extension',
              valueTag: '+14% Median Lifespan',
              mechanismDetail:
                'Treated aged cohorts achieved a 14 percent median lifespan extension over matched controls.'
            }
          ],
          citation: {
            study: 'Plesa, Jung, Church et al., Nature Aging (2026)',
            pmid: '10.1038/s43587-026-01234-8',
            url: 'https://doi.org/10.1038/s43587-026-01234-8',
            keyMetric: '-44% Frailty Progression & +14% Median Lifespan via Single Factor SRSF1'
          }
        },
        cohortBars: [
          {
            label: 'Physical Frailty Progression Reduction (SRSF1 vs. Control)',
            deltaText: '-44% Slower Frailty Accumulation',
            percentWidth: 94,
            barColorClass: 'bg-gradient-to-r from-purple-500 to-cyan-400',
            textColorClass: 'text-purple-300'
          },
          {
            label: 'Aged Mouse Median Lifespan Extension (Inducible SRSF1)',
            deltaText: '+14% Median Lifespan',
            percentWidth: 86,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-teal-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'Human Fibroblast Identity Preservation (Zero Pluripotency Shift)',
            deltaText: '100% Somatic Identity Retained',
            percentWidth: 96,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-sky-400',
            textColorClass: 'text-cyan-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'AI Transcriptomic Age Screen',
            detail:
              'Interpretable machine-learning clock scores single-gene cDNA perturbations in aged human fibroblasts for youthful gene expression without fate loss.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          },
          {
            stepNum: 2,
            title: 'SRSF1 RNA Splicing Restoration',
            detail:
              'Overexpressing serine/arginine-rich splicing factor 1 repairs age-related RNA processing errors and cuts misfolded protein burden.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 3,
            title: 'Senescence & SASP Suppression',
            detail:
              'Treated human cells and aged mouse tissues show lower cellular senescence markers, reduced proteostatic stress, and quieter inflammatory signaling.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          },
          {
            stepNum: 4,
            title: 'Frailty Delay & +14% Median Lifespan',
            detail:
              'Inducible SRSF1 delivery slows physical frailty accumulation by 44 percent and shifts aged mouse survival curves rightward by 14 percent.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          }
        ],
        trialComparison: {
          title: 'Study #1 Reprogramming Strategy Comparison (Nature Aging 2026)',
          headers: ['Approach', 'Primary Target', 'Key Safety & Lifespan Signal'],
          rows: [
            {
              col1: 'Inducible SRSF1 (Wyss Screen)',
              col2: 'RNA processing & splicing fidelity',
              col3: '-44% frailty, +14% lifespan, identity kept',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Classic OSK / OSKM Cocktails',
              col2: 'Embryonic pluripotency transcription',
              col3: 'Strong reset, narrow safety dosing window',
              col3ColorClass: 'text-amber-300 font-semibold'
            },
            {
              col1: 'Untreated Aged Control Mice',
              col2: 'Baseline age-related splicing drift',
              col3: 'Standard late-life frailty & mortality curve',
              col3ColorClass: 'text-slate-400'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 2: Nature Aging — Vanadyl Sulfate Cysteine Senolysis (UChicago)
    // =========================================================================
    {
      number: 2,
      id: 'study-2-vanadyl-sulfate-senolysis',
      journal: 'Nature Aging',
      publishDate: 'November 6, 2026',
      headline:
        'Over-the-counter mineral compound clears senescent cells and extends median lifespan by 7.4 percent in aging male mice',
      keyStatBadge: '+7.4% Median Lifespan (886.5 → 952 Days)',
      themeTag: 'Cysteine-Targeted Senolysis',
      accentColor: 'emerald',
      paragraphs: [
        'Senescent cells, often called zombie cells because they stop dividing yet refuse to die, leak inflammatory signals that steadily damage surrounding tissue as we age. Most experimental senolytic drugs that clear these cells were repurposed from chemotherapy, which can cause side effects in healthy organs. Researchers at the University of Chicago publishing in Nature Aging asked whether senescent cells carry a hidden internal chemical weakness that could be targeted by a far simpler, food-derived compound.',
        'By profiling how proteins react chemically inside aged cells, the team mapped a distinct redox shift inside senescent cells and screened compounds capable of exploiting it. To test whether this mechanism translated into longer life in mammals, they administered vanadyl sulfate, a widely available vanadium mineral salt, in the drinking water of aging 70- to 76-week-old male C57BL/6J mice over a 3-month treatment window and tracked survival, metabolic markers, physical endurance, and organ pathology.',
        'The researchers discovered that senescent cells lose activity of glutathione reductase, an antioxidant recycling enzyme, causing oxidized glutathione to build up and leaving cysteine amino acids on their proteins chemically exposed. When vanadyl sulfate entered these stressed zombie cells, it selectively oxidized those vulnerable cysteines, triggering abnormal disulfide cross-links, protein clumping, and programmed cell death while leaving healthy cells intact. In aging male mice, late-life oral vanadyl sulfate increased median lifespan from 886.5 days to 952 days, a 7.4 percent extension equal to about 65.5 extra days of life, while improving physical endurance and metabolic health.'
      ],
      limits:
        'The lifespan and healthspan benefits were observed in aging male C57BL/6J mice, and the study did not establish human clinical efficacy, optimal human dosing, or long-term safety for chronic vanadyl sulfate supplementation in people. Vanadium compounds can accumulate in tissues and cause gastrointestinal or metabolic side effects at high doses.',
      futureImplications:
        'Discovering altered protein cysteine reactivity as a universal Achilles heel of senescent cells gives drug developers a fresh, druggable target class beyond traditional cancer-derived senolytics. Future precision compounds engineered around this redox vulnerability could offer gentler, intermittent senescent-cell clearance protocols suitable for broad human preventive medicine.',
      studyUrl: 'https://doi.org/10.1038/s43587-026-01253-5',
      doiLabel: 'Nature Aging • 10.1038/s43587-026-01253-5',
      visualSpec: {
        defaultChartType: 'cohort_bars',
        chartTitle: 'Aged Male Mouse Survival Under Cysteine-Targeted Vanadyl Sulfate',
        chartSubtitle: '70- to 76-Week-Old C57BL/6J Male Mice • 3-Month Oral Drinking Water Regimen (University of Chicago)',
        sourceFigureBadge: 'SOURCE: Nature Aging (Nov 2026) • DOI: 10.1038/s43587-026-01253-5 • Aged Male Mice',
        curveSpec: {
          id: 'study2_vanadyl_sulfate_senolysis',
          tabLabel: '📈 Senolytic Survival Curve',
          title: 'Late-Life Survival & Senescent Burden Under Oral Vanadyl Sulfate',
          subtitle: 'Selective Cysteine Oxidation Eliminates GSR-Depleted Senescent Cells Without Harming Normal Tissue',
          yAxisLabel: 'Cohort Survival',
          yAxisTicks: ['100% Alive', '50% Median', '0% Survival'],
          xAxisLabels: ['70w (Start)', '85w', '100w', '115w', '126w (886d)', '136w (952d)', '150w'],
          colorScheme: 'emerald_teal',
          phaseZones: [
            { x: 52, width: 130, label: '3-MO VANADYL DOSING', tint: 'emerald' },
            { x: 182, width: 175, label: 'SENESCENT CELL CLEARANCE', tint: 'cyan' },
            { x: 357, width: 168, label: '+65.5 DAYS MEDIAN GAIN', tint: 'amber' }
          ],
          solidCurve: {
            label: 'Vanadyl Sulfate Treated Male Mice (952 Days Median, +7.4%)',
            path: 'M 52,36 C 125,37 195,40 265,50 C 335,64 395,88 445,116 C 482,138 506,156 525,168',
            areaPath:
              'M 52,36 C 125,37 195,40 265,50 C 335,64 395,88 445,116 C 482,138 506,156 525,168 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 265,50 C 335,64 395,88 445,116 C 482,138 506,156 525,168'
          },
          secondaryCurve: {
            label: 'Untreated Control Male Mice (886.5 Days Median)',
            path: 'M 52,36 C 115,39 180,48 245,66 C 308,88 362,118 410,146 C 446,162 478,170 510,174',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 135,
              y: 38,
              curve: 'solid',
              badge: '🧪 GSR Redox Vulnerability',
              valueTag: 'Cysteine Exposed',
              mechanismDetail:
                'Senescent cells exhibit declining glutathione reductase (GSR) and elevated oxidized glutathione, rendering surface and folding cysteines uniquely vulnerable.'
            },
            {
              x: 295,
              y: 55,
              curve: 'solid',
              badge: '🧹 Selective Senolysis',
              valueTag: 'Endurance & Metabolism Up',
              mechanismDetail:
                'Vanadyl sulfate induces aberrant disulfide cross-linking and apoptosis specifically in senescent cells while sparing healthy cells.'
            },
            {
              x: 425,
              y: 104,
              curve: 'solid',
              badge: '🏆 Median Lifespan Shift',
              valueTag: '952 vs. 886.5 Days (+7.4%)',
              mechanismDetail:
                'Late-life oral dosing extended median survival by roughly 65.5 days (+7.4 percent) in aged male C57BL/6J mice.'
            }
          ],
          citation: {
            study: 'Wu, Yang, Li, Chen et al., Nature Aging (2026)',
            pmid: '10.1038/s43587-026-01253-5',
            url: 'https://doi.org/10.1038/s43587-026-01253-5',
            keyMetric: '+7.4% Median Lifespan (886.5 to 952 Days) via Cysteine-Targeted Senolysis'
          }
        },
        cohortBars: [
          {
            label: 'Vanadyl Sulfate Treated Male Mice (Oral Late-Life Start)',
            deltaText: '952.0 Days Median (+7.4% / +65.5 Days)',
            percentWidth: 95,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-teal-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'Untreated Aged Control Male Mice',
            deltaText: '886.5 Days Median Baseline',
            percentWidth: 84,
            barColorClass: 'bg-gradient-to-r from-slate-500 to-slate-400',
            textColorClass: 'text-slate-300'
          },
          {
            label: 'Selective Senescent Apoptosis vs. Healthy Cell Sparing',
            deltaText: 'Targets GSR-Low Oxidized Cysteine Niche',
            percentWidth: 91,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-emerald-400',
            textColorClass: 'text-cyan-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Glutathione Reductase (GSR) Drop',
            detail:
              'Senescent cells lose glutathione reductase capacity, accumulating oxidized glutathione (GSSG) and heightened redox stress.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 2,
            title: 'Altered Protein Cysteine Reactivity',
            detail:
              'Redox imbalance exposes reactive cysteine residues across structural and metabolic proteins inside zombie cells.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 3,
            title: 'Vanadyl Sulfate Disulfide Clumping',
            detail:
              'Oral vanadyl sulfate selectively oxidizes those exposed cysteines, causing aberrant disulfide bonds, protein aggregation, and apoptosis.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          },
          {
            stepNum: 4,
            title: 'Tissue Renewal & +7.4% Lifespan',
            detail:
              'Clearing senescent cells lowers tissue pathology, boosts physical endurance, and shifts median male mouse lifespan from 886.5 to 952 days.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          }
        ],
        trialComparison: {
          title: 'Study #2 Senolytic Outcomes Matrix (Nature Aging 2026)',
          headers: ['Metric', 'Untreated Aged Controls', 'Oral Vanadyl Sulfate (3 Months)'],
          rows: [
            {
              col1: 'Median Lifespan (Male Mice)',
              col2: '886.5 days',
              col3: '952.0 days (+7.4% / +65.5 days)',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Senescent Cell Protein State',
              col2: 'Persistent GSR-low SASP secretion',
              col3: 'Selective cysteine oxidation & clearance',
              col3ColorClass: 'text-cyan-300 font-semibold'
            },
            {
              col1: 'Healthspan & Metabolic Profile',
              col2: 'Age-related endurance & tissue decline',
              col3: 'Improved physical endurance & organ health',
              col3ColorClass: 'text-emerald-300 font-bold'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 3: Nature Cardiovascular Research — Transient Myc + Cyclin T1 mRNA
    // =========================================================================
    {
      number: 3,
      id: 'study-3-cardiac-mrna-regeneration',
      journal: 'Nature Cardiovascular Research',
      publishDate: 'November 2026',
      headline:
        'Short-acting modified mRNA reawakens adult heart muscle division and boosts post-injury blood pumping by 10 percent',
      keyStatBadge: '+10% Blood Pumped Per Heartbeat',
      themeTag: 'Adult Cardiac Muscle Renewal',
      accentColor: 'rose',
      paragraphs: [
        'Unlike skin or liver tissue, adult mammalian cardiomyocytes, the specialized muscle cells that power every heartbeat, stop dividing shortly after birth. When a heart attack starves part of the heart of oxygen, dead muscle is replaced by stiff scar tissue rather than fresh heart cells, gradually leading to heart failure. Researchers at the University of Cambridge, working with QIMR Berghofer and AstraZeneca and publishing in Nature Cardiovascular Research, asked whether a brief pulse of modified messenger RNA could safely restart heart muscle division right where damage occurs.',
        'In a mouse model of myocardial infarction induced by tying off the left anterior descending coronary artery, the team injected a transient modified mRNA encoding two cell-cycle regulatory proteins, Myc and cyclin T1, directly into the border zone surrounding the injured heart tissue. Because modified mRNA degrades naturally within days, the proteins remain active just long enough to trigger cell division before shutting off automatically, avoiding the uncontrolled growth seen with permanent gene activation.',
        'The short-lived mRNA pulse successfully prompted mature adult cardiomyocytes to re-enter the cell cycle and regenerate functional heart muscle. Compared with mice receiving a mock control treatment, treated animals developed stronger contractions, pumped roughly 10 percent more blood with each heartbeat, and achieved significantly higher global cardiac pumping function, measured as ejection fraction, alongside reduced adverse scar remodeling.'
      ],
      limits:
        'All functional heart-repair experiments in this paper were conducted in mice using direct localized injections into the injured heart border zone. Large-animal safety studies, less invasive clinical delivery methods, and human clinical trials are still required before modified mRNA cardiac regeneration can be offered to heart-attack patients.',
      futureImplications:
        'Cardiovascular failure remains the single largest barrier to human healthspan, and even a 10 percent gain in pumping output meaningfully shifts survival and exercise capacity in failing hearts. Proving that transient mRNA can unlock endogenous heart muscle renewal without permanent genetic alteration establishes a scalable blueprint for repairing non-regenerative adult organs.',
      studyUrl: 'https://doi.org/10.1038/s44161-026-00910-7',
      doiLabel: 'Nature Cardiovascular Research • 10.1038/s44161-026-00910-7',
      visualSpec: {
        defaultChartType: 'cohort_bars',
        chartTitle: 'Post-Infarction Heart Pumping & Myocardial Repair (Myc + Cyclin T1 mRNA)',
        chartSubtitle: 'Localized Border-Zone Modified mRNA vs. Mock Treatment After Coronary Artery Ligation in Mice',
        sourceFigureBadge: 'SOURCE: Nature Cardiovascular Research (Nov 2026) • DOI: 10.1038/s44161-026-00910-7',
        curveSpec: {
          id: 'study3_cardiac_mrna_repair',
          tabLabel: '📈 Cardiac Recovery Curve',
          title: 'Post-Heart-Attack Pumping Function Recovery Under Transient Myc + Cyclin T1 mRNA',
          subtitle: 'Short-Acting Modified mRNA Reawakens Adult Cardiomyocytes Without Permanent Oncogenic Activation',
          yAxisLabel: 'Cardiac Pumping',
          yAxisTicks: ['100% Baseline', '75% Recovered', '50% Failing'],
          xAxisLabels: ['Pre-MI', 'Injury', 'Day 3 (mRNA)', 'Day 7', 'Day 14', 'Day 21', 'Day 28+'],
          colorScheme: 'rose_amber',
          phaseZones: [
            { x: 95, width: 120, label: 'TRANSIENT mRNA PULSE', tint: 'rose' },
            { x: 215, width: 155, label: 'CARDIOMYOCYTE DIVISION', tint: 'amber' },
            { x: 370, width: 155, label: '+10% PUMP OUTPUT GAIN', tint: 'emerald' }
          ],
          solidCurve: {
            label: 'Myc + Cyclin T1 Modified mRNA (~10% Higher Blood Volume Per Beat)',
            path: 'M 52,38 L 96,128 C 145,118 205,102 275,86 C 345,74 425,68 525,64',
            areaPath:
              'M 52,38 L 96,128 C 145,118 205,102 275,86 C 345,74 425,68 525,64 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 145,118 C 205,102 275,86 345,74 425,68 525,64'
          },
          secondaryCurve: {
            label: 'Mock-Treated Control Mice (Progressive Scar Stiffening & Decline)',
            path: 'M 52,38 L 96,128 C 155,134 235,142 325,148 C 405,154 465,158 525,162',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 145,
              y: 118,
              curve: 'solid',
              badge: '💉 Self-Limiting mRNA',
              valueTag: 'Short-Acting Pulse',
              mechanismDetail:
                'Modified mRNA encoding Myc and cyclin T1 expresses rapidly in the ischemic border zone and degrades naturally within days.'
            },
            {
              x: 275,
              y: 86,
              curve: 'solid',
              badge: '❤️ Adult Muscle Division',
              valueTag: 'Cardiomyocytes Re-Enter Cycle',
              mechanismDetail:
                'Co-activation of Myc and cyclin T1 unlocks transcription elongation required for mature heart muscle cells to divide and rebuild tissue.'
            },
            {
              x: 455,
              y: 66,
              curve: 'solid',
              badge: '🚀 Stronger Heartbeat',
              valueTag: '+10% Blood Per Beat',
              mechanismDetail:
                'Treated mouse hearts pump roughly 10 percent more blood per beat with higher ejection fraction and smaller fibrotic scars.'
            }
          ],
          citation: {
            study: 'University of Cambridge / QIMR / AstraZeneca, Nature Cardiovascular Research (2026)',
            pmid: '10.1038/s44161-026-00910-7',
            url: 'https://doi.org/10.1038/s44161-026-00910-7',
            keyMetric: '~10% Increase in Blood Pumped Per Heartbeat via Transient Myc + Cyclin T1 mRNA'
          }
        },
        cohortBars: [
          {
            label: 'Blood Pumped Per Heartbeat (Myc + Cyclin T1 mRNA vs. Mock)',
            deltaText: '+10% Greater Pumping Output',
            percentWidth: 92,
            barColorClass: 'bg-gradient-to-r from-rose-500 to-amber-400',
            textColorClass: 'text-rose-300'
          },
          {
            label: 'Adult Cardiomyocyte Proliferation & Border-Zone Renewal',
            deltaText: 'Reawakened Without Permanent Integration',
            percentWidth: 88,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-cyan-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'Post-Infarction Scar Remodeling & Global Ejection Fraction',
            deltaText: 'Significantly Improved Functional Recovery',
            percentWidth: 85,
            barColorClass: 'bg-gradient-to-r from-purple-500 to-rose-400',
            textColorClass: 'text-purple-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Ischemic Border-Zone mRNA Delivery',
            detail:
              'Modified mRNA encoding Myc and cyclin T1 is delivered locally to surviving cardiomyocytes bordering the heart-attack zone.',
            accentClass: 'border-rose-500/40 bg-rose-950/20 text-rose-300'
          },
          {
            stepNum: 2,
            title: 'Transient P-TEFb / Cyclin T1 Unlock',
            detail:
              'Cyclin T1 supplies the transcriptional cofactor needed for Myc to restart cell-cycle gene programs inside adult heart cells.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 3,
            title: 'Controlled Myocyte Division & Auto-Shutoff',
            detail:
              'Adult cardiomyocytes divide to replace lost muscle before the transient mRNA naturally degrades, preventing uncontrolled growth.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 4,
            title: '+10% Pumping Output & Scar Mitigation',
            detail:
              'Regenerated muscle restores stronger heartbeats, higher ejection fraction, and healthier left-ventricular geometry.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #3 Cardiac Regeneration Comparison (Nature Cardiovascular Research 2026)',
          headers: ['Parameter', 'Mock-Treated Control Mice', 'Transient Myc + Cyclin T1 mRNA'],
          rows: [
            {
              col1: 'Blood Volume Pumped Per Beat',
              col2: 'Post-infarction depressed output',
              col3: 'Roughly +10% stronger pump output',
              col3ColorClass: 'text-emerald-300 font-bold'
            },
            {
              col1: 'Adult Cardiomyocyte Renewal',
              col2: 'Negligible post-natal cell division',
              col3: 'Transient, localized muscle regeneration',
              col3ColorClass: 'text-rose-300 font-bold'
            },
            {
              col1: 'Genetic Persistence Profile',
              col2: 'No intervention',
              col3: 'Self-limiting mRNA (clears within days)',
              col3ColorClass: 'text-cyan-300 font-semibold'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 4: Nature Aging — MIT Human Deep-Sleep CSF & Vascular Clearance
    // =========================================================================
    {
      number: 4,
      id: 'study-4-mit-sleep-csf-clearance',
      journal: 'Nature Aging',
      publishDate: 'November 13, 2026',
      headline:
        'Aging blunts the deep-sleep brain wash in healthy adults, yet vascular resilience keeps select older brains clearing waste like young adults',
      keyStatBadge: '72-Human EEG-fMRI • Vascular Coupling r = 0.44',
      themeTag: 'Deep-Sleep Brain Clearance',
      accentColor: 'cyan',
      paragraphs: [
        'During deep non-rapid eye movement (NREM) sleep, slow electrical brain waves synchronize with blood-vessel pulsations to pump waves of cerebrospinal fluid (CSF), the clear liquid cushioning the brain, through neural tissue to flush away metabolic waste such as amyloid-beta and tau. Researchers at MIT publishing in Nature Aging asked whether healthy aging weakens this nighttime cleaning system well before dementia appears, and which biological factors separate resilient older sleepers from declining ones.',
        'The team used simultaneous electroencephalography and fast functional MRI (EEG-fMRI) overnight in 72 healthy volunteers who had no diagnosed neurodegenerative disease. Their final analyzed cohort compared 31 younger adults aged 18 to 39 (mean age 24) against 41 older adults aged 60 to 83 (mean age 69), measuring sleep-stage slow-wave electrical power, global brain blood-flow oscillations, breath-hold cerebrovascular reactivity, and frontal gray-matter volume.',
        'Compared with younger adults, older adults as a group showed substantially weaker CSF wash waves during deep NREM sleep. That drop tracked closely with three interconnected shifts: lower slow-wave delta electrical power, thinner frontal gray matter, and stiffer, less responsive brain blood vessels (cerebrovascular reactivity measured by a simple breath-hold task correlated at r = 0.44 with nocturnal fluid dynamics, accounting for roughly 19 percent of the variance). Encouragingly, a subset of older participants bucked the group trend completely, maintaining nocturnal CSF wave strength inside the normal range of healthy 20-somethings.'
      ],
      limits:
        'This was a cross-sectional neuroimaging study of 72 healthy adults rather than a multi-year longitudinal trial tracking dementia incidence, and sleeping inside an MRI scanner differs from home sleep environments. The study measured macroscopic CSF flow waves rather than directly quantifying amyloid or tau protein removal in each participant.',
      futureImplications:
        'Seeing resilient adults in their 60s and 70s retain young-adult brain fluid clearance proves that losing the nighttime brain wash is not an unchangeable fate of chronological age. Because blood-vessel flexibility and deep slow-wave sleep drive the pump directly, targeted cardiovascular training, sleep-architecture optimization, and future acoustic slow-wave enhancement therapies give us actionable levers to keep the aging brain clean.',
      studyUrl: 'https://doi.org/10.1038/s43587-026-01270-4',
      doiLabel: 'Nature Aging • 10.1038/s43587-026-01270-4',
      visualSpec: {
        defaultChartType: 'telemetry_curve',
        chartTitle: 'Human Deep-Sleep Slow-Wave, Vascular & CSF Clearance Waves Across Age',
        chartSubtitle: 'MIT Simultaneous Nighttime EEG-fMRI • 31 Young Adults (18 to 39) vs. 41 Older Adults (60 to 83)',
        sourceFigureBadge: 'SOURCE: Nature Aging (Nov 13, 2026) • DOI: 10.1038/s43587-026-01270-4 • n = 72 Healthy Humans',
        curveSpec: {
          id: 'study4_mit_sleep_csf_waves',
          tabLabel: '📈 Sleep CSF Wave Curve',
          title: 'Coupled Delta Slow-Wave, Vascular Pulse & CSF Wash Amplitude During NREM Sleep',
          subtitle: 'Young & Resilient Older Brains vs. Age-Attenuated Cerebrovascular Reactivity (Bailes & Lewis, MIT)',
          yAxisLabel: 'CSF Wash Amplitude',
          yAxisTicks: ['Peak NREM Wash', 'Moderate Flow', 'Wake / Blunted'],
          xAxisLabels: ['Awake', 'N1', 'N2', 'N3 Cycle 1', 'N3 Peak', 'N3 Cycle 2', 'Late Sleep'],
          colorScheme: 'cyan_emerald',
          phaseZones: [
            { x: 52, width: 120, label: 'SLEEP ONSET', tint: 'slate' },
            { x: 172, width: 195, label: 'PEAK N3 DELTA + CSF WASH', tint: 'cyan' },
            { x: 367, width: 158, label: 'VASCULAR COUPLING', tint: 'emerald' }
          ],
          solidCurve: {
            label: 'Young Adults & Resilient Older Brains (Strong Delta + Vascular CSF Waves)',
            path: 'M 52,148 C 95,142 135,112 185,54 C 228,32 275,38 320,52 C 375,40 425,44 475,68 C 500,82 515,96 525,108',
            areaPath:
              'M 52,148 C 95,142 135,112 185,54 C 228,32 275,38 320,52 C 375,40 425,44 475,68 C 500,82 515,96 525,108 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 185,54 C 228,32 275,38 320,52 C 375,40 425,44 475,68'
          },
          secondaryCurve: {
            label: 'Typical Older Adult Group Average (Blunted Hemodynamics & Lower Delta Power)',
            path: 'M 52,152 C 98,148 145,134 195,114 C 248,104 305,108 365,116 C 425,122 475,132 525,142',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 228,
              y: 34,
              curve: 'solid',
              badge: '🌊 Deep NREM Delta Surge',
              valueTag: 'CSF Wave Driven',
              mechanismDetail:
                'High-amplitude EEG slow-wave delta oscillations synchronize neural quieting with rhythmic cerebral blood-volume drops that draw fresh CSF inward.'
            },
            {
              x: 375,
              y: 42,
              curve: 'solid',
              badge: '🫀 Vascular Reactivity Link',
              valueTag: 'r = 0.44 (~19% Variance)',
              mechanismDetail:
                'Breath-hold cerebrovascular reactivity correlated directly with sleep fluid dynamics, linking vascular elasticity to nighttime brain waste removal.'
            },
            {
              x: 475,
              y: 68,
              curve: 'solid',
              badge: '🧠 Resilient Older Outliers',
              valueTag: 'Young-Adult Range Kept',
              mechanismDetail:
                'A subset of healthy 60- to 83-year-olds maintained macroscopic CSF wash waves indistinguishable from 18- to 39-year-old adults.'
            }
          ],
          citation: {
            study: 'Bailes, Williams, Lewis et al., Nature Aging (Nov 13, 2026)',
            pmid: '10.1038/s43587-026-01270-4',
            url: 'https://doi.org/10.1038/s43587-026-01270-4',
            keyMetric: '72-Human EEG-fMRI Linking Sleep Slow Waves & Vascular Reactivity (r = 0.44) to CSF Flow'
          }
        },
        cohortBars: [
          {
            label: 'Young Adult Cohort (n = 31, Mean Age 24) Deep NREM CSF Waves',
            deltaText: 'High-Amplitude Rhythmic Wash',
            percentWidth: 94,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-emerald-400',
            textColorClass: 'text-cyan-300'
          },
          {
            label: 'Resilient Older Adult Subgroup (Within 60 to 83 Cohort)',
            deltaText: 'Retained Young-Adult CSF Range',
            percentWidth: 85,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-teal-400',
            textColorClass: 'text-emerald-300'
          },
          {
            label: 'Cerebrovascular Reactivity Correlation With Sleep Fluid Waves',
            deltaText: 'r = 0.44 (~19% Variance Explained)',
            percentWidth: 74,
            barColorClass: 'bg-gradient-to-r from-purple-500 to-cyan-400',
            textColorClass: 'text-purple-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Deep NREM Slow-Wave Delta Firing',
            detail:
              'Synchronized cortical slow waves quiet metabolic demand in waves during the first half of the night.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 2,
            title: 'Cerebral Blood-Volume Pulsation',
            detail:
              'Flexible cerebral vessels constrict rhythmically during neural quiet phases, creating volume room inside the skull.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          },
          {
            stepNum: 3,
            title: 'Macroscopic CSF Inflow Waves',
            detail:
              'Cerebrospinal fluid pulses upward into the brain ventricles and interstitial space to flush amyloid and metabolic waste.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          },
          {
            stepNum: 4,
            title: 'Age-Related Vascular & Delta Bottleneck',
            detail:
              'Stiffer cerebral vessels and thinner frontal gray matter dampen the wash in typical aging, unless vascular and sleep resilience are maintained.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          }
        ],
        trialComparison: {
          title: 'Study #4 Human Sleep Neuroimaging Comparison (Nature Aging 2026)',
          headers: ['Cohort Group', 'Demographics (n = 72)', 'Nocturnal Hemodynamic & CSF Signature'],
          rows: [
            {
              col1: 'Younger Healthy Adults',
              col2: 'n = 31 (Ages 18 to 39, mean 24)',
              col3: 'Strong delta power & high-amplitude CSF wash',
              col3ColorClass: 'text-cyan-300 font-bold'
            },
            {
              col1: 'Older Adults (Group Mean)',
              col2: 'n = 41 (Ages 60 to 83, mean 69)',
              col3: 'Attenuated CSF waves & blunted vascular coupling',
              col3ColorClass: 'text-amber-300 font-semibold'
            },
            {
              col1: 'Resilient Older Outliers',
              col2: 'Subset of 60- to 83-year-olds',
              col3: 'Matched healthy young-adult CSF dynamics',
              col3ColorClass: 'text-emerald-300 font-bold'
            }
          ]
        }
      }
    },

    // =========================================================================
    // STUDY 5: Aging Cell — University of Bonn Gradual 80→<20 Epigenetic Reset
    // =========================================================================
    {
      number: 5,
      id: 'study-5-bonn-gradual-epigenetic-deaging',
      journal: 'Aging Cell',
      publishDate: 'October 2026',
      headline:
        'Gradual direct reprogramming rewinds blood cells from an 80-year-old donor into neural stem cells reading under 20',
      keyStatBadge: '80-Year-Old Cells Reset to Under 20',
      themeTag: 'Slow-Motion Epigenetic Reset',
      accentColor: 'amber',
      paragraphs: [
        'When scientists convert adult cells into induced pluripotent stem cells, embryonic-like cells capable of becoming any tissue, their biological age drops almost overnight, making it nearly impossible to observe how the cell actually erases decades of molecular wear. Researchers at the University of Bonn, University Hospital Bonn, and RWTH Aachen publishing in Aging Cell asked whether converting human blood cells directly into brain stem cells, skipping the embryonic stage completely, would still rewind their epigenetic age and let scientists film the reset in slow motion.',
        'The team collected immature red blood cell precursors, called erythroblasts, from 15 human donors spanning chronological ages from newborns (0 years) up to 101 years old. Using just two transcription factors, SOX2 and c-MYC, they converted those blood precursors directly into induced neural stem cells (iNSCs) without passing through pluripotency, then tracked DNA methylation clocks, chemical tags on DNA that measure biological age, continuously across 50 to more than 100 days.',
        'Skipping the embryonic stage did not stop biological age reversal. Instead, it stretched the epigenetic reset into a steady, observable decline across roughly 50 to 100 days. Cells taken from an 80-year-old donor rolled back by more than 60 years to read under 20 on epigenetic clocks, with early-stage converted cells keeping an average of about 13 percent of original donor age and later-stage cells keeping roughly 5 percent. The slow-motion trajectory now gives researchers a precise molecular map of which aging marks disappear first and which genetic switches control safe cellular de-aging.'
      ],
      limits:
        'All reprogramming experiments were performed in laboratory cell dishes using blood precursors from 15 human donors rather than inside living human brains. Converting cells into dividing neural stem cells still involves changing cell fate, so direct therapeutic use inside aging organs will require separating the age-erasing steps from identity conversion.',
      futureImplications:
        'Turning a sudden black-box age reset into a 100-day slow-motion film lets biologists inspect every molecular gear that strips away 60 years of epigenetic wear. Isolating those exact intermediate switches is one of the clearest routes toward safe, partial rejuvenation treatments that refresh aging human brain cells in place.',
      studyUrl: 'https://doi.org/10.1111/acel.70751',
      doiLabel: 'Aging Cell • 10.1111/acel.70751',
      visualSpec: {
        defaultChartType: 'telemetry_curve',
        chartTitle: '100-Day Slow-Motion Epigenetic Age Rollback in Human Blood-to-Neural Conversion',
        chartSubtitle: '15 Human Donors (Ages 0 to 101) • Direct SOX2 + c-MYC Conversion Skipping Pluripotency (University of Bonn)',
        sourceFigureBadge: 'SOURCE: Aging Cell (Oct 2026) • DOI: 10.1111/acel.70751 • 15 Human Donors (0 to 101 Yrs)',
        curveSpec: {
          id: 'study5_bonn_epigenetic_rollback',
          tabLabel: '📈 100-Day De-Aging Curve',
          title: 'Protracted Epigenetic Clock Age Trajectory During Direct Neural Conversion (80-Year-Old Donor)',
          subtitle: 'Gradual 50- to 100-Day Reset Without Pluripotency vs. Abrupt Embryonic iPSC Reset',
          yAxisLabel: 'Epigenetic Age (Yrs)',
          yAxisTicks: ['80 Yrs (Donor)', '40 Yrs (Mid)', '<20 Yrs (Reset)'],
          xAxisLabels: ['Day 0', 'Day 20', 'Day 40', 'Day 50', 'Day 75', 'Day 100+'],
          colorScheme: 'amber_cyan',
          phaseZones: [
            { x: 52, width: 150, label: 'SOX2 + c-MYC DIRECT SHIFT', tint: 'amber' },
            { x: 202, width: 165, label: '50-DAY MAJOR CLOCK DROP', tint: 'cyan' },
            { x: 367, width: 158, label: '<20 YR MOLECULAR AGE', tint: 'emerald' }
          ],
          solidCurve: {
            label: 'Direct iNSC Conversion (Gradual 50 to 100+ Day Rollback: 80 Yrs to Under 20)',
            path: 'M 52,38 C 115,48 180,74 250,108 C 315,134 385,148 455,156 C 488,159 508,161 525,162',
            areaPath:
              'M 52,38 C 115,48 180,74 250,108 C 315,134 385,148 455,156 C 488,159 508,161 525,162 L 525,175 L 52,175 Z',
            peakHighlightPath: 'M 180,74 C 250,108 315,134 385,148 455,156'
          },
          secondaryCurve: {
            label: 'Unreprogrammed Donor Blood Precursors (Remains at ~80-Year Epigenetic Baseline)',
            path: 'M 52,38 C 165,38 345,38 525,38',
            style: 'dashed_warning'
          },
          nodes: [
            {
              x: 52,
              y: 38,
              curve: 'solid',
              badge: '🩸 Day 0: Donor Blood Precursors',
              valueTag: '80-Year Donor Baseline',
              mechanismDetail:
                'Erythroid progenitors collected across 15 human donors aged 0 to 101 retain full donor DNA methylation age prior to SOX2 + c-MYC induction.'
            },
            {
              x: 250,
              y: 108,
              curve: 'solid',
              badge: '⏱️ Day 50: Slow-Motion Reset',
              valueTag: '~13% Early Passage Age',
              mechanismDetail:
                'Bypassing embryonic pluripotency stretches epigenetic erasure across roughly 50 days so intermediate rejuvenation states can be mapped.'
            },
            {
              x: 455,
              y: 156,
              curve: 'solid',
              badge: '✨ Day 100+: Rejuvenated iNSCs',
              valueTag: 'Reads Under 20 (~5% Age)',
              mechanismDetail:
                'Cells from an 80-year-old donor shed more than 60 years of epigenetic age, stabilizing under 20 years on DNA methylation clocks.'
            }
          ],
          citation: {
            study: 'Berg, Brüstle et al., Aging Cell (Oct 2026)',
            pmid: '10.1111/acel.70751',
            url: 'https://doi.org/10.1111/acel.70751',
            keyMetric: '80-Year-Old Human Blood Cells Reset to Under 20 Over 50 to 100+ Days Without Pluripotency'
          }
        },
        cohortBars: [
          {
            label: 'Starting Donor Blood Precursors (80-Year-Old Human Donor)',
            deltaText: '80 Years Molecular Epigenetic Age',
            percentWidth: 96,
            barColorClass: 'bg-gradient-to-r from-amber-500 to-rose-400',
            textColorClass: 'text-amber-300'
          },
          {
            label: 'Early-Passage Induced Neural Stem Cells (~50 Days)',
            deltaText: 'Retained ~13% of Original Donor Age',
            percentWidth: 32,
            barColorClass: 'bg-gradient-to-r from-cyan-500 to-sky-400',
            textColorClass: 'text-cyan-300'
          },
          {
            label: 'Later-Passage Induced Neural Stem Cells (100+ Days)',
            deltaText: 'Reads Under 20 (~5% Donor Age, >60 Yrs Rolled Back)',
            percentWidth: 16,
            barColorClass: 'bg-gradient-to-r from-emerald-500 to-teal-400',
            textColorClass: 'text-emerald-300'
          }
        ],
        molecularCascade: [
          {
            stepNum: 1,
            title: 'Human Erythroblast Isolation (Ages 0 to 101)',
            detail:
              'Immature red blood cell precursors from 15 human donors provide accessible somatic cells carrying decades of epigenetic aging marks.',
            accentClass: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          },
          {
            stepNum: 2,
            title: 'Direct SOX2 + c-MYC Conversion',
            detail:
              'Two factors redirect blood precursors into neural stem cells while completely bypassing the embryonic pluripotent (iPSC) state.',
            accentClass: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300'
          },
          {
            stepNum: 3,
            title: 'Protracted 50- to 100-Day Erasure',
            detail:
              'Instead of snapping abruptly to zero, DNA methylation aging signatures unwind step by step over more than 100 days.',
            accentClass: 'border-purple-500/40 bg-purple-950/20 text-purple-300'
          },
          {
            stepNum: 4,
            title: '60+ Years of Epigenetic Age Rewound',
            detail:
              'Cells from an 80-year-old donor stabilize with a molecular profile reading under 20, revealing targetable windows for safe de-aging.',
            accentClass: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
          }
        ],
        trialComparison: {
          title: 'Study #5 Reprogramming Timeline Matrix (Aging Cell 2026)',
          headers: ['Conversion Stage', 'Timeline Window', 'Epigenetic Clock Signature'],
          rows: [
            {
              col1: 'Donor Blood Precursors',
              col2: 'Day 0 (15 donors, ages 0 to 101)',
              col3: 'Matches donor chronological age (e.g., 80 yrs)',
              col3ColorClass: 'text-amber-300 font-semibold'
            },
            {
              col1: 'Early-Passage Direct iNSCs',
              col2: 'Around Day 50 (no pluripotency)',
              col3: 'Retains ~13% of original donor epigenetic age',
              col3ColorClass: 'text-cyan-300 font-semibold'
            },
            {
              col1: 'Later-Passage Direct iNSCs',
              col2: '100+ days protracted tracking',
              col3: 'Reads under 20 (~5% donor age retained)',
              col3ColorClass: 'text-emerald-300 font-bold'
            }
          ]
        }
      }
    }
  ],

  // ===========================================================================
  // PROTOCOL OF THE WEEK: Deep Sleep Architecture & Glymphatic Clearance Protocol
  // ===========================================================================
  protocolOfTheWeek: {
    kind: 'protocol',
    id: 'protocol-glymphatic-sleep-clearance',
    discoverFamilyKey: 'protocol_glymphatic',
    exploreDeepLink: '/explore?mode=discover&tab=protocols&item=protocol_glymphatic&type=protocol',
    name: 'Deep Sleep Architecture & Glymphatic Clearance Protocol',
    badgeText: '4-Step Nightly Brain Wash • Bridges Studies #4 & #1',
    stepsAndTimeBadge: '4 Steps • Nightly (10 PM–2 AM Peak)',
    creatorName: 'Dr. Maiken Nedergaard & Dr. Matthew Walker',
    creatorAffiliation: 'Univ. of Rochester Glymphatic Lab & UC Berkeley Sleep Center',
    creatorAvatarUrl: '/images/discover/creator_sketch_avatar.jpg',
    heroImageUrl: '/images/discover/hero_glymphatic_clearance.jpg',
    hookStats: [
      {
        value: '+60%',
        label: 'Brain Wash Space',
        sublabel: 'Interstitial channels expand by 60% during deep NREM slow-wave sleep (Science)',
        accent: 'purple'
      },
      {
        value: '2.2×',
        label: 'Amyloid Plaque Flush',
        sublabel: 'Lateral sleeping posture and deep delta waves double overnight waste clearance',
        accent: 'emerald'
      },
      {
        value: '-36%',
        label: 'Faster Sleep Onset',
        sublabel: 'Warm pre-bed shower plus a 65°F to 68°F room accelerates deep N3 entry',
        accent: 'cyan'
      }
    ],
    keyBenefits: [
      'Protects the critical 10:00 PM to 2:00 AM window when 80 percent of slow-wave CSF brain wash occurs',
      'Uses lateral (side) sleeping posture and clear nasal airflow to maximize cerebrospinal fluid transport',
      'Prevents the 5 percent overnight spike in hippocampal amyloid-beta seen after a single night of lost deep sleep',
      'Drops nocturnal resting heart rate and raises deep-sleep heart-rate variability (HRV) within 7 nights'
    ],
    oneLinePromise:
      'Protect your first two deep NREM sleep cycles with thermal cooling, lateral posture, and zero late stimulants to maximize nightly cerebrospinal fluid brain waste clearance.',
    whyIncluded:
      'Study #4 (Nature Aging, November 13, 2026) used nighttime EEG-fMRI in 72 healthy humans to show that deep NREM slow-wave power and blood-vessel pulses drive the brain cerebrospinal fluid wash, and that resilient older adults keep young-adult fluid dynamics. Landmark human and mechanistic sleep studies prove that protecting slow-wave N3 architecture, cooling core temperature, and sleeping on your side directly amplify that exact glymphatic clearance pump tonight.',
    pubmedLinks: [
      {
        label: 'Xie & Nedergaard, Science (PMID: 24136970)',
        pmid: '24136970',
        url: 'https://pubmed.ncbi.nlm.nih.gov/24136970/'
      },
      {
        label: 'Fultz & Lewis, Science (PMID: 31672896)',
        pmid: '31672896',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31672896/'
      },
      {
        label: 'Lee & Nedergaard, J Neurosci (PMID: 26245953)',
        pmid: '26245953',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26245953/'
      }
    ],
    levlScoreOptimal: '+5.4 LEVL',
    levlScoreBeginner: '+3.2 LEVL',
    curveKey: 'glymphatic_deep_sleep_curve',
    curveSpec: {
      id: 'newsletter_protocol_glymphatic_sleep',
      tabLabel: '🌊 Overnight CSF Wash Curve',
      title: 'Overnight Slow-Wave Delta Power & Glymphatic CSF Clearance Flux',
      subtitle: '4-Step Glymphatic Sleep Protocol (65°F Room + Lateral Posture + Zero Late Alcohol/Caffeine) vs. Fragmented Sleep',
      yAxisLabel: 'Glymphatic Clearance',
      yAxisTicks: ['Peak N3 Wash', 'Baseline Sleep', 'Fragmented / Wake'],
      xAxisLabels: ['8p (Dim)', '9p (Bath)', '10p (Bed)', '11p (N3 #1)', '1a (N3 #2)', '3a (REM)', '6a (Wake)'],
      colorScheme: 'purple_cyan',
      phaseZones: [
        { x: 52, width: 118, label: 'THERMAL & LIGHT DROP', tint: 'amber' },
        { x: 170, width: 195, label: 'PEAK N3 CSF BRAIN WASH', tint: 'purple' },
        { x: 365, width: 160, label: 'REM MEMORY LOCK', tint: 'cyan' }
      ],
      solidCurve: {
        label: '4-Step Glymphatic Sleep Protocol (+60% Interstitial Expansion & Deep N3 Waves)',
        path: 'M 52,154 C 95,150 138,136 185,48 C 228,30 278,36 325,52 C 378,76 435,92 485,112 C 505,122 518,132 525,142',
        areaPath:
          'M 52,154 C 95,150 138,136 185,48 C 228,30 278,36 325,52 C 378,76 435,92 485,112 C 505,122 518,132 525,142 L 525,175 L 52,175 Z',
        peakHighlightPath: 'M 185,48 C 228,30 278,36 325,52'
      },
      secondaryCurve: {
        label: 'Warm Bedroom + Late Screen / Alcohol (Blunted N3 Delta & High Nocturnal HR)',
        path: 'M 52,156 C 110,152 175,134 240,122 C 305,118 370,126 435,138 C 480,144 505,148 525,152',
        style: 'dashed_warning'
      },
      nodes: [
        {
          x: 138,
          y: 136,
          curve: 'solid',
          badge: '🌡️ 9:00 PM: Warm Shower Drop',
          valueTag: '-36% Sleep Latency',
          mechanismDetail:
            'A 10-minute 104°F to 108°F shower vasodilates hands and feet, dumping core body heat by 1.5°F when stepping into a 65°F to 68°F bedroom.'
        },
        {
          x: 228,
          y: 32,
          curve: 'solid',
          badge: '🌊 10:30 PM to 2:00 AM: Peak N3 Wash',
          valueTag: '+60% Interstitial Space',
          mechanismDetail:
            'Eighty percent of slow-wave N3 delta oscillations happen in the first two 90-minute cycles, driving rhythmic CSF waves every 20 seconds.'
        },
        {
          x: 325,
          y: 52,
          curve: 'solid',
          badge: '🛏️ Lateral Posture & Nasal Patency',
          valueTag: '+25% CSF Transport',
          mechanismDetail:
            'Side sleeping combined with clear nasal breathing improves jugular venous drainage and maximizes cerebrospinal-interstitial fluid exchange.'
        }
      ],
      citation: {
        study: 'Xie et al., Science (2013) • Fultz & Lewis, Science (2019)',
        pmid: '31672896',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31672896/',
        keyMetric: '+60% Interstitial Brain Wash & Coupled 20-Second CSF Waves During Deep NREM'
      }
    },
    onsetPhases: [
      {
        phase: 'Phase 1: Deeper Slow-Wave Entry',
        window: 'Nights 1 to 5',
        detail: 'Faster sleep onset, lower sleeping resting heart rate by 3 to 5 bpm, and measurable increases in first-half N3 slow-wave minutes.'
      },
      {
        phase: 'Phase 2: Autonomic & Cognitive Clarity',
        window: 'Weeks 2 to 4',
        detail: 'Higher overnight RMSSD heart-rate variability, steadier morning alertness, and reduced afternoon brain fog.'
      },
      {
        phase: 'Phase 3: Long-Term Neuro-Clearance',
        window: 'Months 2 to 12+',
        detail: 'Consistent nightly amyloid and tau clearance paired with preserved cerebrovascular reactivity supports lifelong cognitive resilience.'
      }
    ],
    vectorScores: [
      { vectorName: 'Brain Longevity', score: 96, effectStat: '+60% Interstitial Wash & 2.2× Amyloid Flush', color: '#a855f7' },
      { vectorName: 'Cellular Longevity', score: 84, effectStat: 'Nightly Proteostasis & DNA Repair Peak', color: '#06b6d4' },
      { vectorName: 'Heart Health', score: 82, effectStat: 'Lower Nocturnal RHR & +18% Overnight HRV', color: '#10b981' },
      { vectorName: 'Chronic Inflammation', score: 79, effectStat: 'Suppresses Neuroinflammatory Microglia', color: '#f59e0b' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Strict Caffeine & Alcohol Buffer',
        timingAndFrequency: 'Caffeine by 12:00 PM • Alcohol Cutoff 5h Pre-Bed',
        optimalDoseBadge: '10h Caffeine Buffer • 0 Drinks Pre-Bed',
        beginnerDoseBadge: '8h Caffeine Buffer • ≤1 Drink Early',
        optimalInstruction:
          'Cut off all caffeine at least 10 hours before bed to protect deep N3 delta amplitude, and keep evenings alcohol-free (or finish any drink at least 5 hours before sleep) to avoid sympathetic heart-rate spikes.',
        beginnerInstruction:
          'Finish your last caffeinated drink by 2:00 PM and keep at least 3 to 4 hours between any evening alcohol and bedtime.'
      },
      {
        stepNumber: 2,
        title: 'Dim Ambient Light & Screen Shield',
        timingAndFrequency: '90 Minutes Before Bed • Nightly',
        optimalDoseBadge: '<30 Lux Warm Light / Amber Lenses',
        beginnerDoseBadge: 'Dim Overhead Lights 60m Pre-Bed',
        optimalInstruction:
          'Switch off overhead white LEDs 90 minutes before bed and use warm lamp light under 30 lux (or blue-blocking amber lenses) so evening melatonin rises on schedule without a 90-minute delay.',
        beginnerInstruction:
          'Dim bedroom and living-room lights and enable warm night-shift mode on screens 60 minutes before sleep.'
      },
      {
        stepNumber: 3,
        title: 'Warm Shower Core-Cooling Trigger',
        timingAndFrequency: '60 Minutes Before Bed • Nightly',
        optimalDoseBadge: '10m @ 104°F–108°F → 65°F–68°F Room',
        beginnerDoseBadge: '5–10m Warm Shower → Cool Bedroom',
        optimalInstruction:
          'Take a 10-minute warm shower or bath (104°F to 108°F) one hour before bedtime, then step into a dark 65°F to 68°F bedroom to trigger a rapid 1.5°F drop in core body temperature that shortens sleep latency by 36 percent.',
        beginnerInstruction:
          'Take a warm shower 60 minutes before bed and set your bedroom thermostat under 69°F.'
      },
      {
        stepNumber: 4,
        title: 'Lateral Sleep Posture & Clear Nasal Airflow',
        timingAndFrequency: '10:00 PM to 2:00 AM Peak Window • Nightly',
        optimalDoseBadge: 'Side Sleeping + Nasal Dilator Strip',
        beginnerDoseBadge: 'Start Sleep on Left or Right Side',
        optimalInstruction:
          'Sleep on your left or right side with supportive neck alignment and a nasal dilator strip if congested, maximizing jugular venous outflow and cerebrospinal fluid transport during your first two 90-minute N3 cycles.',
        beginnerInstruction:
          'Use a supportive side-sleeper pillow to spend the first half of the night in a comfortable lateral posture.'
      }
    ],
    beginnerScalingNote:
      'Start with Step 1 (noon caffeine cutoff) and Step 3 (cool 66°F to 68°F bedroom after a warm evening shower) for the first 7 nights before adding amber evening lighting and nasal dilator strips.',
    cautions:
      'Anyone experiencing loud snoring, witnessed breathing pauses, morning headaches, or persistent daytime sleepiness should be evaluated by a clinician for obstructive sleep apnea before using mouth tape or self-treating sleep fragmentation.',
    disclaimer: 'Educational content only, not medical advice.'
  },

  // ===========================================================================
  // MODALITY OF THE WEEK: Norwegian 4x4 High-Intensity Interval Training (VO2 Max)
  // ===========================================================================
  modalityOfTheWeek: {
    kind: 'modality',
    id: 'modality-norwegian-4x4-hiit',
    discoverFamilyKey: 'norwegian_4x4_hiit',
    exploreDeepLink: '/explore?mode=discover&tab=modalities&item=norwegian_4x4_hiit&type=modality',
    name: 'Norwegian 4×4 High-Intensity Interval Training',
    badgeText: 'Gold-Standard Cardiac Remodeling • Bridges Studies #3 & #4',
    stepsAndTimeBadge: '4 Steps • 35 min • 1–2x / Week',
    creatorName: 'Dr. Jan Helgerud, Dr. Ulrik Wisløff & Dr. Benjamin Levine',
    creatorAffiliation: 'NTNU Cardiac Exercise Lab & UT Southwestern',
    creatorAvatarUrl: '/images/discover/creator_sketch_avatar.jpg',
    heroImageUrl: '/images/discover/hero_norwegian_4x4_hiit.jpg',
    hookStats: [
      {
        value: '+10% to +13%',
        label: 'Stroke Volume & VO₂ Max',
        sublabel: '8-week clinical RCT expansion in cardiac pumping and peak oxygen uptake',
        accent: 'emerald'
      },
      {
        value: '-20 Yrs',
        label: 'Heart Stiffness Reversal',
        sublabel: 'Reverses two decades of sedentary left-ventricular stiffening in middle age',
        accent: 'cyan'
      },
      {
        value: '5.0×',
        label: 'Lower Mortality Risk',
        sublabel: 'Top cardiorespiratory fitness tier across 122,007 adults (JAMA Netw Open)',
        accent: 'amber'
      }
    ],
    keyBenefits: [
      'Expands left-ventricular chamber compliance and blood pumped per heartbeat by +10 percent in 8 weeks',
      'Directly improves cerebral blood-vessel elasticity, supporting the nighttime brain CSF wash mapped in Study #4',
      'Drives mitochondrial biogenesis (+69 percent mitochondrial capacity in older adults) via AMPK and PGC-1α',
      'Delivers the strongest single modifiable mortality shield in clinical medicine with just 1 to 2 sessions per week'
    ],
    oneLinePromise:
      'Perform four 4-minute intervals at 85 to 95 percent of maximum heart rate with 3-minute active recoveries to expand cardiac stroke volume, reverse heart stiffening, and preserve vascular elasticity.',
    whyIncluded:
      'Study #3 (Nature Cardiovascular Research) showed that boosting heart muscle pumping output by 10 percent dramatically improves cardiac function after injury, while Study #4 (Nature Aging) proved that cerebral blood-vessel reactivity directly drives the sleeping brain waste-clearance pump. Right now, Norwegian 4x4 aerobic interval training is the most potent human clinical tool proven to raise cardiac stroke volume by 10 percent, reverse 20 years of sedentary heart stiffening in middle-aged adults, and keep brain arteries flexible.',
    pubmedLinks: [
      {
        label: 'Helgerud et al., Med Sci Sports Exerc (PMID: 17414804)',
        pmid: '17414804',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17414804/'
      },
      {
        label: 'Howden & Levine, Circulation (PMID: 29311053)',
        pmid: '29311053',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29311053/'
      },
      {
        label: 'Mandsager et al., JAMA Netw Open (PMID: 30347091)',
        pmid: '30347091',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30347091/'
      }
    ],
    levlScoreOptimal: '+5.9 LEVL',
    levlScoreBeginner: '+3.5 LEVL',
    curveKey: 'norwegian_4x4_cardiac_curve',
    curveSpec: {
      id: 'newsletter_modality_norwegian_4x4',
      tabLabel: '🫀 35m Heart-Rate & Stroke Curve',
      title: 'Left-Ventricular Stroke Volume Filling & VO₂ Max Stimulus During a 4×4 Session',
      subtitle: '4 × 4-Minute Bouts at 85 to 95% HRmax + 3-Minute Active Recovery (Helgerud et al., NTNU)',
      yAxisLabel: '% Max Heart Rate',
      yAxisTicks: ['95% Peak VO₂', '70% Active Rec', '55% Warm-Up'],
      xAxisLabels: ['0m', '6m (Warm)', '10m (#1)', '17m (#2)', '24m (#3)', '31m (#4)', '35m (Cool)'],
      colorScheme: 'rose_amber',
      phaseZones: [
        { x: 52, width: 78, label: 'WARM-UP', tint: 'slate' },
        { x: 130, width: 325, label: '4 × 4 MIN MAX STROKE VOLUME ZONE', tint: 'rose' },
        { x: 455, width: 70, label: 'COOL', tint: 'cyan' }
      ],
      solidCurve: {
        label: 'Norwegian 4×4 Heart Rate & Ventricular Stretch Profile (85 to 95% HRmax)',
        path: 'M 52,154 L 115,126 L 145,42 L 185,38 L 205,112 L 235,38 L 275,36 L 295,112 L 325,36 L 365,35 L 385,112 L 415,35 L 455,34 L 485,118 L 525,148',
        areaPath:
          'M 52,154 L 115,126 L 145,42 L 185,38 L 205,112 L 235,38 L 275,36 L 295,112 L 325,36 L 365,35 L 385,112 L 415,35 L 455,34 L 485,118 L 525,148 L 525,175 L 52,175 Z',
        peakHighlightPath: 'M 145,42 L 185,38 M 235,38 L 275,36 M 325,36 L 365,35 M 415,35 L 455,34'
      },
      secondaryCurve: {
        label: 'Steady Low-Intensity Walking Alone (Does Not Stretch Left Ventricle to Peak Volume)',
        path: 'M 52,154 C 130,132 260,128 390,128 C 450,128 490,136 525,148',
        style: 'dashed_warning'
      },
      nodes: [
        {
          x: 165,
          y: 40,
          curve: 'solid',
          badge: '🫀 Interval #1–#2: Ventricular Stretch',
          valueTag: '85–95% HRmax',
          mechanismDetail:
            'Holding 4 continuous minutes near 90 percent HRmax maximizes venous return and stretches the left ventricle far more effectively than 20-second sprints.'
        },
        {
          x: 295,
          y: 112,
          curve: 'solid',
          badge: '♻️ 3-Min Active Recovery',
          valueTag: '65–70% HRmax Shuttle',
          mechanismDetail:
            'Keeping legs moving at an easy conversational pace clears blood lactate through cardiac and slow-twitch MCT1 transporters before the next bout.'
        },
        {
          x: 435,
          y: 35,
          curve: 'solid',
          badge: '🏆 Interval #4: VO₂ Max & Vascular Adaptation',
          valueTag: '+10% Stroke Volume',
          mechanismDetail:
            'Eight weeks of 4x4 intervals increases stroke volume by 10 percent and VO2 max by 7.2 to 13 percent while improving endothelial shear elasticity.'
        }
      ],
      citation: {
        study: 'Helgerud et al. (2007) • Howden & Levine, Circulation (2018)',
        pmid: '17414804',
        url: 'https://pubmed.ncbi.nlm.nih.gov/17414804/',
        keyMetric: '+10% Cardiac Stroke Volume, +7.2% to +13% VO₂ Max & 20-Year Heart Stiffness Reversal'
      }
    },
    onsetPhases: [
      {
        phase: 'Phase 1: Plasma Volume & Endothelial Elasticity',
        window: 'Sessions 1 to 3 (Weeks 1 to 2)',
        detail: 'Blood plasma volume expands by roughly 10 to 12 percent and vascular nitric oxide responsiveness rises rapidly.'
      },
      {
        phase: 'Phase 2: Stroke Volume & VO₂ Max Surge',
        window: 'Weeks 4 to 8',
        detail: 'Clinical trials show +7.2 to +13 percent VO2 max gains and +10 percent more blood pumped per heartbeat.'
      },
      {
        phase: 'Phase 3: Structural Cardiac Rejuvenation',
        window: 'Months 6 to 24',
        detail: 'Paired with weekly Zone 2 base work, eccentric myocardial remodeling reverses up to 20 years of sedentary left-ventricular stiffening.'
      }
    ],
    vectorScores: [
      { vectorName: 'Heart Health', score: 99, effectStat: '+10% Stroke Volume & -20 Yr Heart Stiffness', color: '#f43f5e' },
      { vectorName: 'Cellular Longevity', score: 92, effectStat: '+69% Older-Adult Mitochondrial Capacity', color: '#a855f7' },
      { vectorName: 'Brain Longevity', score: 90, effectStat: 'Cerebrovascular Elasticity & BDNF Surge', color: '#06b6d4' },
      { vectorName: 'Metabolic Health', score: 88, effectStat: 'Rapid GLUT4 & Insulin Sensitivity Boost', color: '#10b981' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Progressive Aerobic Warm-Up',
        timingAndFrequency: 'Minutes 0 to 6 • Late Morning or Afternoon',
        optimalDoseBadge: '6–8 min @ 60–70% HRmax',
        beginnerDoseBadge: '8–10 min Easy Ramp-Up',
        optimalInstruction:
          'Warm up for 6 to 8 minutes on an indoor bike, rowing machine, incline treadmill, or uphill trail until your heart rate reaches 65 to 70 percent of max and breathing feels steady.',
        beginnerInstruction:
          'Warm up gently for 8 to 10 minutes on a stationary bike or brisk incline walk before your first hard effort.'
      },
      {
        stepNumber: 2,
        title: 'Four 4-Minute High-Output Intervals',
        timingAndFrequency: '4 Bouts • 1 to 2x / Week (Finish ≥4h Pre-Bed)',
        optimalDoseBadge: '4 × 4 min @ 85–95% HRmax',
        beginnerDoseBadge: '2 × 4 min @ 80–85% HRmax',
        optimalInstruction:
          'Push at a hard, sustainable pace (RPE 8 to 9 out of 10, able to say only 2 to 3 words at a time) so your heart rate reaches 85 to 95 percent of max by minute two and holds there through minute four.',
        beginnerInstruction:
          'Start with two 4-minute intervals at a challenging but controlled pace (80 to 85 percent HRmax), adding one interval every two weeks until you reach four.'
      },
      {
        stepNumber: 3,
        title: '3-Minute Active Recovery Between Bouts',
        timingAndFrequency: 'Between Every Interval • 3 Rounds',
        optimalDoseBadge: '3 min Easy Movement @ 60–70% HRmax',
        beginnerDoseBadge: '3–4 min Easy Walking / Spinning',
        optimalInstruction:
          'Do not stop moving completely. Pedal slowly or walk gently for 3 minutes at 60 to 70 percent HRmax so active muscles clear lactate and restore stroke volume before the next 4-minute block.',
        beginnerInstruction:
          'Take a full 3 to 4 minutes of slow pedaling or flat walking between bouts until breathing settles cleanly.'
      },
      {
        stepNumber: 4,
        title: '5-Minute Parasympathetic Cool-Down',
        timingAndFrequency: 'Final 5 Minutes • Plus 500 mg Electrolytes',
        optimalDoseBadge: '5 min Easy Pace + Slow Nasal Exhales',
        beginnerDoseBadge: '5 min Slow Walk + Water',
        optimalInstruction:
          'Cool down for 5 minutes at an easy pace using slow nasal breathing (4-second inhale, 6-second exhale) to trigger rapid heart-rate recovery and replenish fluids with 500 mg sodium.',
        beginnerInstruction:
          'Walk or spin easily for 5 minutes until your heart rate drops comfortably below 110 bpm, then hydrate.'
      }
    ],
    beginnerScalingNote:
      'If you have not done vigorous cardio recently, spend two weeks building a base of three 30-minute Zone 2 walks or rides, then introduce 2 x 4-minute intervals at 80 to 85 percent HRmax once per week before progressing to the full 4 x 4 format.',
    cautions:
      'Adults over 45 with cardiovascular risk factors, uncontrolled hypertension, chest discomfort, or a history of arrhythmia should obtain medical clearance before training above 85 percent of maximum heart rate. Finish sessions at least 4 hours before bedtime to protect deep slow-wave sleep.',
    disclaimer: 'Educational content only, not medical advice.'
  },

  closingParagraph:
    'From a single RNA splicing switch that cuts physical frailty by 44 percent without erasing cellular identity and a simple redox-targeted compound that clears senescent cells late in life, to transient heart-repairing mRNA, 72-human deep-sleep brain imaging, and a 100-day slow-motion epigenetic reset of 80-year-old blood cells to under 20, the science of organ rejuvenation is becoming measurably safer and more precise every week. While these therapies advance toward human clinics, protecting your deep slow-wave sleep architecture and expanding your cardiac stroke volume today keeps your brain and vascular plumbing operating in the resilient tier.',
  aboutLevlParagraph:
    'LEVL is the precision longevity operating system built to help you measure, schedule, and optimize the daily protocols that slow your pace of aging. Explore interactive biological telemetry curves, personalize your daily modality stack across all eight vectors of longevity, and track your real-time LEVL Pace of Aging Score at levlhealth.com.'
}

export const OUTPACE_AGING_ISSUES: OutpaceAgingIssue[] = [
  OUTPACE_AGING_ISSUE_02,
  OUTPACE_AGING_ISSUE_01
]

/**
 * Resolves a newsletter issue by shortSlug (`edition-2`, `edition-1`), full slug,
 * numeric ID (`2`, `02`, `1`, `01`), or common variants (`issue-2`, `week-2`, `latest`).
 */
export function getOutpaceAgingIssueBySlug(rawSlug?: string | null): OutpaceAgingIssue | null {
  if (!rawSlug) return OUTPACE_AGING_ISSUES[0]
  const clean = decodeURIComponent(rawSlug).trim().toLowerCase()
  if (clean === 'latest') return OUTPACE_AGING_ISSUES[0]

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

/**
 * Generates clean HTML & plain-text newsletter copy for 1-click pasting or uploading into Beehiiv.
 * Safe to call from both Server Route Handlers and Client Components.
 */
export function buildBeehiivRichHtmlAndText(issue: OutpaceAgingIssue) {
  const canonicalIssueUrl = `https://levlhealth.com/newsletter/${issue.shortSlug}`
  const htmlParts: string[] = []
  const textParts: string[] = []

  htmlParts.push(`<h1>${issue.title}</h1>`)
  htmlParts.push(
    `<p><strong>${issue.dateLabel} | Edition #${issue.issueNumber}</strong> • <a href="${canonicalIssueUrl}">Read Interactive Web Edition on LEVL →</a></p>`
  )
  htmlParts.push(`<p>${issue.levStateOfPlayParagraph}</p>`)
  htmlParts.push(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0; border-collapse: separate; border-spacing: 8px;">
      <tr>
        <td width="33%" valign="top" style="padding: 12px 14px; border: 1px solid #10b981; border-radius: 12px; background-color: #0b1322; color: #f8fafc;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #34d399;">Estimated LEV Date • Optimal (Top 1%)</div>
          <div style="font-size: 20px; font-weight: 900; margin-top: 6px; color: #ffffff;">October 2036</div>
          <div style="font-size: 11px; font-weight: 600; margin-top: 2px; color: #6ee7b7;">26 days closer this week</div>
        </td>
        <td width="33%" valign="top" style="padding: 12px 14px; border: 1px solid #06b6d4; border-radius: 12px; background-color: #0b1322; color: #f8fafc;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #22d3ee;">Estimated LEV Date • Active (Top 20%)</div>
          <div style="font-size: 20px; font-weight: 900; margin-top: 6px; color: #ffffff;">February 2042</div>
          <div style="font-size: 11px; font-weight: 600; margin-top: 2px; color: #67e8f9;">16 days closer this week</div>
        </td>
        <td width="33%" valign="top" style="padding: 12px 14px; border: 1px solid #a855f7; border-radius: 12px; background-color: #0b1322; color: #f8fafc;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #c084fc;">Current Pace of Aging (bio-yrs/yr)</div>
          <div style="font-size: 20px; font-weight: 900; margin-top: 6px; color: #ffffff;">0.67 <span style="font-size: 12px; font-weight: 600; color: #94a3b8;">Optimal vs 0.84 Active</span></div>
          <div style="font-size: 11px; font-weight: 600; margin-top: 2px; color: #d8b4fe;">-0.0035 yr/yr this week</div>
        </td>
      </tr>
    </table>`
  )
  htmlParts.push(`<p>${issue.introSummaryParagraph}</p>`)
  htmlParts.push(`<hr />`)

  textParts.push(`${issue.title}`)
  textParts.push(
    `${issue.dateLabel} | Edition #${issue.issueNumber} • Interactive Web Edition: ${canonicalIssueUrl}\n`
  )
  textParts.push(`${issue.levStateOfPlayParagraph}\n`)
  textParts.push(
    `• Estimated LEV Date • Optimal (Top 1%): October 2036 (26 days closer this week)\n• Estimated LEV Date • Active (Top 20%): February 2042 (16 days closer this week)\n• Current Pace of Aging: 0.67 Optimal vs 0.84 Active bio-yrs/yr (-0.0035 yr/yr this week)\n`
  )
  textParts.push(`${issue.introSummaryParagraph}\n`)
  textParts.push(`------------------------------------------------------------\n`)

  for (const s of issue.studies) {
    htmlParts.push(`<h2>${s.number}. ${s.headline}</h2>`)
    textParts.push(`${s.number}. ${s.headline}\n`)

    for (const p of s.paragraphs) {
      htmlParts.push(`<p>${p}</p>`)
      textParts.push(`${p}\n`)
    }

    htmlParts.push(
      `<p><em>[Insert Static Graph PNG: outpace_aging_${issue.shortSlug}_study_0${s.number}_${s.id}.png | Link image to: ${canonicalIssueUrl}#${s.id}]</em></p>`
    )
    textParts.push(
      `[Insert Static Graph PNG: outpace_aging_${issue.shortSlug}_study_0${s.number}_${s.id}.png -> ${canonicalIssueUrl}#${s.id}]\n`
    )

    htmlParts.push(`<p><strong>Limits:</strong> ${s.limits}</p>`)
    textParts.push(`Limits: ${s.limits}\n`)

    htmlParts.push(`<p><strong>Future Implications:</strong> ${s.futureImplications}</p>`)
    textParts.push(`Future Implications: ${s.futureImplications}\n`)

    htmlParts.push(`<p>Study link: <a href="${s.studyUrl}">${s.studyUrl}</a></p><hr />`)
    textParts.push(`Study link: ${s.studyUrl}\n------------------------------------------------------------\n`)
  }

  for (const item of [issue.protocolOfTheWeek, issue.modalityOfTheWeek]) {
    const headingPrefix =
      item.kind === 'protocol' ? 'Protocol of the Week' : 'Modality of the Week'
    htmlParts.push(`<h2>${headingPrefix}: ${item.name}</h2>`)
    htmlParts.push(`<p><strong>One-line promise:</strong> ${item.oneLinePromise}</p>`)
    htmlParts.push(
      `<p><strong>Why it is included this week:</strong> ${item.whyIncluded}<br />Source links: ${item.pubmedLinks
        .map(l => `<a href="${l.url}">${l.url}</a>`)
        .join(' and ')}</p>`
    )
    htmlParts.push(`<p><strong>Numbered Steps:</strong></p><ol>`)

    textParts.push(`${headingPrefix}: ${item.name}\n`)
    textParts.push(`One-line promise: ${item.oneLinePromise}\n`)
    textParts.push(
      `Why it is included this week: ${item.whyIncluded}\nSource links: ${item.pubmedLinks
        .map(l => l.url)
        .join(' and ')}\n`
    )
    textParts.push(`Numbered Steps:`)

    for (const step of item.steps) {
      htmlParts.push(
        `<li><strong>${step.title} (${step.timingAndFrequency}):</strong> ${step.optimalInstruction}</li>`
      )
      textParts.push(
        `${step.stepNumber}. ${step.title} (${step.timingAndFrequency}): ${step.optimalInstruction}`
      )
    }
    htmlParts.push(`</ol>`)
    textParts.push(``)

    htmlParts.push(`<p><strong>Beginner Scaling Note:</strong> ${item.beginnerScalingNote}</p>`)
    htmlParts.push(`<p><strong>Cautions:</strong> ${item.cautions}</p>`)
    htmlParts.push(
      `<p><em>[Insert Static Blueprint Card PNG: outpace_aging_${issue.shortSlug}_${item.kind}_${item.id}.png | Link image to: https://levlhealth.com/app${item.exploreDeepLink}]</em></p>`
    )
    htmlParts.push(
      `<p><a href="https://levlhealth.com/app${item.exploreDeepLink}"><strong>Try ${item.name} interactively in the LEVL app →</strong></a></p>`
    )
    htmlParts.push(`<p><em>${item.disclaimer}</em></p><hr />`)

    textParts.push(`Beginner Scaling Note: ${item.beginnerScalingNote}\n`)
    textParts.push(`Cautions: ${item.cautions}\n`)
    textParts.push(
      `[Insert Static Blueprint Card PNG: outpace_aging_${issue.shortSlug}_${item.kind}_${item.id}.png -> https://levlhealth.com/app${item.exploreDeepLink}]\n`
    )
    textParts.push(
      `Try ${item.name} interactively in the LEVL app: https://levlhealth.com/app${item.exploreDeepLink}\n`
    )
    textParts.push(`${item.disclaimer}\n------------------------------------------------------------\n`)
  }

  htmlParts.push(`<h2>Closing</h2>`)
  htmlParts.push(`<p>${issue.closingParagraph}</p>`)
  htmlParts.push(
    `<p><strong>About LEVL:</strong> ${issue.aboutLevlParagraph.replace(
      'levlhealth.com',
      '<a href="https://levlhealth.com">levlhealth.com</a>'
    )}</p>`
  )

  textParts.push(`Closing\n${issue.closingParagraph}\n`)
  textParts.push(`About LEVL: ${issue.aboutLevlParagraph}\n`)

  return {
    html: htmlParts.join('\n'),
    text: textParts.join('\n')
  }
}

