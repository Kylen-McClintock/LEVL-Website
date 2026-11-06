export type BioCurveColorScheme =
  | 'cyan_emerald'
  | 'amber_cyan'
  | 'emerald_teal'
  | 'purple_cyan'
  | 'rose_amber'

export interface BioCurveNode {
  x: number
  y: number
  curve: 'solid' | 'secondary'
  badge: string
  valueTag: string
  mechanismDetail: string
}

export interface BioCurvePhaseZone {
  x: number
  width: number
  label: string
  tint: 'slate' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple'
}

export interface BioCurveThresholdLine {
  y: number
  label: string
  color: string
}

export interface BiologicalCurveSpec {
  id: string
  tabLabel: string
  title: string
  subtitle: string
  yAxisLabel: string
  yAxisTicks: [string, string, string] // Top (y=36), Mid (y=98), Bottom (y=158)
  xAxisLabels: string[]
  colorScheme: BioCurveColorScheme
  solidCurve: {
    label: string
    path: string
    areaPath: string
    peakHighlightPath?: string
  }
  secondaryCurve: {
    label: string
    path: string
    style: 'dashed_warning' | 'crossover_partner'
  }
  thresholdLine?: BioCurveThresholdLine
  phaseZones?: BioCurvePhaseZone[]
  nodes: BioCurveNode[]
  citation: {
    study: string
    pmid: string
    url: string
    keyMetric: string
  }
}

export const BIOLOGICAL_CURVES_REGISTRY: Record<string, BiologicalCurveSpec> = {
  // ============================================================================
  // 1. MORNING SUNLIGHT & CORTISOL AWAKENING RESPONSE (CAR)
  // ============================================================================
  morning_sunlight_car: {
    id: 'morning_sunlight_car',
    tabLabel: '☀️ 24h Cortisol (CAR)',
    title: 'Cortisol Across the 24-Hour Cycle (CAR) & Melatonin Timer',
    subtitle: 'Retinal ipRGC Melanopsin (~100,000 Lux·min) • SCN Master Clock Entrainment',
    yAxisLabel: 'Plasma Cortisol',
    yAxisTicks: ['22 µg/dL', '12 µg/dL', '3 µg/dL'],
    xAxisLabels: ['4a', '6a', '7a (Wake)', '8:30a', '12p', '3p', '6p', '10p'],
    colorScheme: 'amber_cyan',
    phaseZones: [
      { x: 52, width: 68, label: 'PRE-WAKE', tint: 'slate' },
      { x: 120, width: 115, label: 'CAR WINDOW (+50%)', tint: 'amber' },
      { x: 410, width: 120, label: 'MELATONIN LOCK', tint: 'cyan' }
    ],
    solidCurve: {
      label: 'Morning Sunlight (+50% CAR Peak → Clean PM Clearance)',
      path: 'M 52,162 C 75,160 98,150 120,108 C 142,58 162,28 188,26 C 218,24 255,78 310,122 C 365,152 440,164 525,168',
      areaPath: 'M 52,162 C 75,160 98,150 120,108 C 142,58 162,28 188,26 C 218,24 255,78 310,122 C 365,152 440,164 525,168 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 120,108 C 142,58 162,28 188,26 C 208,25 232,52 255,78'
    },
    secondaryCurve: {
      label: 'Skipped Morning Light (Blunted AM → Late-Shifted PM Tail)',
      path: 'M 52,162 C 75,160 98,152 120,125 C 145,96 172,84 205,86 C 258,90 320,106 390,118 C 445,128 490,134 525,138',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 120,
        y: 108,
        curve: 'solid',
        badge: '☀️ 7:00 AM Sunlight Anchor',
        valueTag: '100k Lux·min',
        mechanismDetail: 'Low-angle blue-yellow solar contrast hits retinal ipRGC melanopsin (OPN4), signaling the suprachiasmatic nucleus (SCN) to amplify the morning cortisol pulse by +50%.'
      },
      {
        x: 188,
        y: 26,
        curve: 'solid',
        badge: '⚡ 8:30 AM Peak (+90m Caffeine)',
        valueTag: '+50% CAR Peak',
        mechanismDetail: 'Stacking morning hydration, zone-2/resistance movement, and delayed caffeine (+90m post-wake) locks in peak daytime catecholamine drive, focus, and immune surveillance.'
      },
      {
        x: 390,
        y: 118,
        curve: 'secondary',
        badge: '⚠️ 4:30 PM Late-Shifted Tail',
        valueTag: 'Dysregulated',
        mechanismDetail: 'When morning outdoor light is missed (<500 Lux indoors), the CAR peak is blunted and cortisol remains abnormally elevated into the afternoon and evening ("tired but wired").'
      },
      {
        x: 525,
        y: 168,
        curve: 'solid',
        badge: '🌙 10:00 PM Melatonin Onset',
        valueTag: '+15h Timer',
        mechanismDetail: 'Morning ipRGC activation initiates a biological 14–16 hour countdown timer; steep evening cortisol clearance permits unimpeded pineal melatonin release.'
      }
    ],
    citation: {
      study: 'Wright et al., Current Biology (2013)',
      pmid: '23910656',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23910656/',
      keyMetric: '+50% CAR Peak & 2h Earlier Melatonin Onset'
    }
  },

  // ============================================================================
  // 2. CAFFEINE 90-MIN DELAY & ADENOSINE RECEPTOR WASHOUT
  // ============================================================================
  caffeine_adenosine_kinetics: {
    id: 'caffeine_adenosine_kinetics',
    tabLabel: '☕ 90m Adenosine Delay',
    title: 'Morning Adenosine Washout vs. A2A Receptor Blockade Crash',
    subtitle: 'Adenosine Deaminase Clearance • Competitive A1/A2A Receptor Antagonism',
    yAxisLabel: 'Cognitive Alertness',
    yAxisTicks: ['Peak Drive', 'Homeostasis', '2 PM Crash'],
    xAxisLabels: ['7a (Wake)', '8a', '8:30a (+90m)', '11a', '2p (Crash)', '5p', '9p'],
    colorScheme: 'cyan_emerald',
    phaseZones: [
      { x: 52, width: 118, label: '90m ADENOSINE WASHOUT', tint: 'emerald' },
      { x: 300, width: 110, label: '2 PM REBOUND ZONE', tint: 'rose' }
    ],
    solidCurve: {
      label: '90–120m Delayed Caffeine (Smooth All-Day Alertness)',
      path: 'M 52,132 C 85,112 125,85 170,62 C 215,34 265,32 335,48 C 405,68 465,115 525,148',
      areaPath: 'M 52,132 C 85,112 125,85 170,62 C 215,34 265,32 335,48 C 405,68 465,115 525,148 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 170,62 C 215,34 265,32 335,48'
    },
    secondaryCurve: {
      label: 'Immediate 7:00 AM Coffee (Adenosine Dam → 2 PM Avalanche Crash)',
      path: 'M 52,132 C 75,65 105,28 140,30 C 195,34 265,95 335,158 C 385,168 455,140 525,135',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 52,
        y: 132,
        curve: 'solid',
        badge: '🌅 7:00 AM Residual Adenosine',
        valueTag: 'Sleep Inertia',
        mechanismDetail: 'Upon waking, residual un-cleared adenosine remains in the basal forebrain. Morning cortisol and sunlight activate adenosine deaminase (ADA) to clear it naturally over 90 minutes.'
      },
      {
        x: 170,
        y: 62,
        curve: 'solid',
        badge: '☕ 8:30 AM Delayed First Cup',
        valueTag: '+90m Sweet Spot',
        mechanismDetail: 'Introducing caffeine after natural adenosine clearance antagonizes clean A2A receptors and sensitizes striatal D2/D3 dopamine receptors without trapping morning adenosine.'
      },
      {
        x: 335,
        y: 158,
        curve: 'secondary',
        badge: '💥 2:00 PM Avalanche Crash',
        valueTag: 'Receptor Flood',
        mechanismDetail: 'When coffee is consumed immediately at 7 AM, caffeine blocks A2A receptors while un-cleared adenosine pools behind the block. As caffeine detaches at 2 PM, adenosine floods receptors.'
      },
      {
        x: 335,
        y: 48,
        curve: 'solid',
        badge: '🔋 2:00 PM Sustained Focus',
        valueTag: 'Zero Rebound',
        mechanismDetail: 'Because morning adenosine was cleared prior to receptor blockade, afternoon alertness remains smooth and stable without requiring a late rescue espresso.'
      }
    ],
    citation: {
      study: 'Reichert et al., Psychopharmacology / Trends Cogn Sci (2022)',
      pmid: '35577463',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35577463/',
      keyMetric: 'Prevents A2A Adenosine Rebound & Afternoon Somnolence'
    }
  },

  // ============================================================================
  // 3. CAFFEINE HALF-LIFE & BEDTIME CUTOFF (SWS PRESERVATION)
  // ============================================================================
  caffeine_cutoff_half_life: {
    id: 'caffeine_cutoff_half_life',
    tabLabel: '🛑 10–12h Cutoff Decay',
    title: 'CYP1A2 Caffeine Half-Life (5–6h) & Slow-Wave Sleep Preservation',
    subtitle: '10–12 Hour Quarter-Life Clearance • NREM Stage 3 Delta EEG Integrity',
    yAxisLabel: 'Brain Caffeine (%)',
    yAxisTicks: ['100% Peak', '50% (t½)', '12% Safe'],
    xAxisLabels: ['8:30a', '11a (Cutoff)', '2p', '4p', '7p', '10p (Bed)', '1a (SWS)'],
    colorScheme: 'emerald_teal',
    thresholdLine: {
      y: 145,
      label: '🛡️ <15% Receptor Occupancy Threshold for Unimpaired Deep SWS',
      color: '#10b981'
    },
    solidCurve: {
      label: '10 AM–12 PM Cutoff (<12% Active at Bedtime • Full Deep Sleep)',
      path: 'M 52,32 C 105,30 140,42 185,78 C 245,115 315,142 415,158 C 465,164 500,168 525,170',
      areaPath: 'M 52,32 C 105,30 140,42 185,78 C 245,115 315,142 415,158 C 465,164 500,168 525,170 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: '3:00 PM Afternoon Coffee (38% Active at 11 PM • -20% Deep SWS)',
      path: 'M 52,65 C 145,105 210,122 255,34 C 315,42 365,78 415,104 C 465,124 500,136 525,142',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 52,
        y: 32,
        curve: 'solid',
        badge: '☕ 8:30–11:00 AM Window',
        valueTag: '100% Dose',
        mechanismDetail: 'Consuming all caffeine at least 10–12 hours before bedtime gives hepatic CYP1A2 enzymes two full half-lives (~5.5h each) to clear methylxanthines.'
      },
      {
        x: 255,
        y: 34,
        curve: 'secondary',
        badge: '🚨 3:00 PM Late Dose',
        valueTag: '200mg Spike',
        mechanismDetail: 'In the landmark Drake et al. trial, caffeine taken even 6 hours before bed reduced objectively measured total sleep time by >1 hour and crushed delta power.'
      },
      {
        x: 415,
        y: 104,
        curve: 'secondary',
        badge: '⚠️ 10:00 PM (38% Remaining)',
        valueTag: '-20% Deep SWS',
        mechanismDetail: 'Even if you fall asleep easily, 35–50% residual caffeine occupancy on cortical A1 receptors strips away NREM Stage 3 Slow-Wave Sleep and growth hormone release.'
      },
      {
        x: 415,
        y: 158,
        curve: 'solid',
        badge: '✅ 10:00 PM (<12% Cleared)',
        valueTag: 'Full Delta EEG',
        mechanismDetail: 'With <12% residual caffeine at bedtime, homeostatic sleep pressure (adenosine) drives maximal slow-wave delta amplitude and glymphatic clearance.'
      }
    ],
    citation: {
      study: 'Drake et al., Journal of Clinical Sleep Medicine (2013)',
      pmid: '24235903',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24235903/',
      keyMetric: 'Caffeine 6h Pre-Bed Strips >1h Sleep & NREM Delta Waves'
    }
  },

  // ============================================================================
  // 4. EVENING BLUE LIGHT BLOCKING & MELATONIN ONSET (DLMO)
  // ============================================================================
  evening_blue_light_melatonin: {
    id: 'evening_blue_light_melatonin',
    tabLabel: '👓 Evening Melatonin (DLMO)',
    title: 'Dim-Light Melatonin Onset (DLMO) vs. 480nm Blue-Light Suppression',
    subtitle: 'Pineal AANAT Enzyme Activation • Evening <10 Lux Melanopsin Protection',
    yAxisLabel: 'Pineal Melatonin',
    yAxisTicks: ['80 pg/mL', '40 pg/mL', '5 pg/mL'],
    xAxisLabels: ['6p', '8p (Glasses)', '9:30p (DLMO)', '11p', '2a (Peak)', '5a', '7a'],
    colorScheme: 'purple_cyan',
    phaseZones: [
      { x: 120, width: 130, label: 'DLMO LAUNCH WINDOW', tint: 'purple' },
      { x: 250, width: 190, label: 'NOCTURNAL MELATONIN WAVE', tint: 'cyan' }
    ],
    solidCurve: {
      label: 'Blue-Blockers + Dim Warm Light (<10 Lux • Full Melatonin Wave)',
      path: 'M 52,168 C 85,168 115,164 145,142 C 185,102 225,52 295,28 C 365,24 425,75 485,148 L 525,168',
      areaPath: 'M 52,168 C 85,168 115,164 145,142 C 185,102 225,52 295,28 C 365,24 425,75 485,148 L 525,168 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 205,78 C 240,42 268,29 295,28 C 335,26 375,45 415,78'
    },
    secondaryCurve: {
      label: 'Overhead LED / Screens (50–85% Melatonin Suppression + 90m Delay)',
      path: 'M 52,168 L 225,166 C 265,164 295,142 335,108 C 375,85 425,105 485,155 L 525,168',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 145,
        y: 142,
        curve: 'solid',
        badge: '👓 8:00 PM Blue-Blockers + Dimming',
        valueTag: '<10 Lux @ 480nm',
        mechanismDetail: 'Eliminating 450–490nm short-wavelength light 2–3 hours before bed stops retinal ipRGCs from sending inhibitory GABAergic "daytime" signals to the pineal gland.'
      },
      {
        x: 225,
        y: 166,
        curve: 'secondary',
        badge: '📱 9:30 PM Overhead LED / Screen',
        valueTag: '-85% Suppressed',
        mechanismDetail: 'Room light (>100 Lux) or unshielded screens before bed degrades pineal arylalkylamine N-acetyltransferase (AANAT), suppressing melatonin by 50–85% and delaying onset by 90 mins.'
      },
      {
        x: 295,
        y: 28,
        curve: 'solid',
        badge: '🌌 2:00 AM Peak Pineal Melatonin',
        valueTag: '80+ pg/mL',
        mechanismDetail: 'Beyond sleep timing, nocturnal melatonin acts as the brain’s primary mitochondrial antioxidant, scavenging free radicals during glymphatic clearance.'
      }
    ],
    citation: {
      study: 'Gooley et al., J Clin Endocrinol Metab (2011)',
      pmid: '21193540',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21193540/',
      keyMetric: 'Evening Room Light Suppresses Melatonin Duration by 90 Mins'
    }
  },

  // ============================================================================
  // 5. SLEEP THERMOREGULATION & CORE BODY TEMPERATURE DROP (-2.5°F)
  // ============================================================================
  sleep_thermoregulation_core_temp: {
    id: 'sleep_thermoregulation_core_temp',
    tabLabel: '❄️ -2.5°F Core Temp Drop',
    title: 'Nocturnal Core Body Temperature Drop (-2.5°F) & NREM Delta Gating',
    subtitle: 'POAH Warm-Sensitive Neurons • Glabrous Skin Vasodilation • 65–68°F Room',
    yAxisLabel: 'Core Body Temp',
    yAxisTicks: ['98.8°F', '97.6°F', '96.4°F'],
    xAxisLabels: ['7p', '9p (Warm Bath)', '10p (Bed)', '1a (Deep SWS)', '4a (Nadir)', '6a', '7:30a'],
    colorScheme: 'cyan_emerald',
    solidCurve: {
      label: '65°F Cool Room + Warm Shower Dump (-2.4°F Core Drop → Deep NREM)',
      path: 'M 52,42 C 85,38 110,32 135,38 C 165,62 195,98 245,132 C 305,158 355,164 395,160 C 445,142 485,88 525,52',
      areaPath: 'M 52,42 C 85,38 110,32 135,38 C 165,62 195,98 245,132 C 305,158 355,164 395,160 C 445,142 485,88 525,52 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Warm Bedroom >72°F / Late Meal (Trapped Core Heat • Shallow Sleep)',
      path: 'M 52,42 C 95,40 145,52 195,68 C 255,84 325,94 395,92 C 445,88 485,68 525,52',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 38,
        curve: 'solid',
        badge: '🚿 9:00 PM Warm Bath / Glycine',
        valueTag: 'Vasodilation',
        mechanismDetail: 'A warm shower or 3g Glycine dilates arteriovenous anastomoses (AVAs) in glabrous skin (palms & soles), rapidly dumping internal core heat upon stepping into a cool room.'
      },
      {
        x: 245,
        y: 132,
        curve: 'solid',
        badge: '🛌 11:30 PM NREM Delta Gate',
        valueTag: '-2.0°F Drop',
        mechanismDetail: 'Preoptic area of the hypothalamus (POAH) warm-sensitive neurons require a 2–3°F (1–1.5°C) drop in core temperature to initiate high-amplitude NREM Stage 3 delta waves.'
      },
      {
        x: 325,
        y: 94,
        curve: 'secondary',
        badge: '🌡️ >72°F Room / Late Digestion',
        valueTag: 'Micro-Arousals',
        mechanismDetail: 'Ambient heat >72°F or diet-induced thermogenesis from eating within 3h of bed blocks core cooling, elevating sleeping heart rate (+5–8 BPM) and fragmenting SWS.'
      },
      {
        x: 395,
        y: 160,
        curve: 'solid',
        badge: '❄️ 4:30 AM Temperature Minimum',
        valueTag: '96.4°F Nadir',
        mechanismDetail: 'Core temperature reaches its circadian minimum ~2 hours before natural waking, after which endogenous cortisol and thyroid hormones warm the body for wakefulness.'
      }
    ],
    citation: {
      study: 'Harding, Franks & Wisden, Frontiers in Neuroscience (2019)',
      pmid: '31001077',
      url: 'https://pubmed.ncbi.nlm.nih.gov/31001077/',
      keyMetric: '1–1.5°C Core Drop Required for NREM Slow-Wave Entry'
    }
  },

  // ============================================================================
  // 6. ALCOHOL & THC SLEEP ARCHITECTURE FRAGMENTATION
  // ============================================================================
  alcohol_thc_sleep_fragmentation: {
    id: 'alcohol_thc_sleep_fragmentation',
    tabLabel: '🍷 Sleep Architecture Rebound',
    title: 'Nocturnal Autonomic Rebound & REM / Slow-Wave Sleep Suppression',
    subtitle: 'GABAergic Sedation vs. Natural Sleep • Second-Half Sympathetic Tachycardia',
    yAxisLabel: 'REM & SWS Quality',
    yAxisTicks: ['100% Restorative', '50% Blunted', 'Fragmented'],
    xAxisLabels: ['10p (Bed)', '11:30p', '1a', '2:30a (Rebound)', '4a', '5:30a', '7a'],
    colorScheme: 'emerald_teal',
    solidCurve: {
      label: 'Unsedated Sleep (Intact NREM Delta & Early-Morning REM Richness)',
      path: 'M 52,95 C 95,42 145,28 205,34 C 265,40 325,32 395,28 C 445,26 490,45 525,75',
      areaPath: 'M 52,95 C 95,42 145,28 205,34 C 265,40 325,32 395,28 C 445,26 490,45 525,75 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Evening Alcohol / THC (First-Half Sedation → 2:30 AM Sympathetic Crash)',
      path: 'M 52,85 C 95,72 155,78 215,98 C 265,125 315,158 385,162 C 445,165 490,155 525,148',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 145,
        y: 28,
        curve: 'solid',
        badge: '🧠 11:30 PM Natural NREM SWS',
        valueTag: 'True Delta Waves',
        mechanismDetail: 'Natural sleep synchronizes thalamocortical spindles and slow waves during the first 3 hours, driving pituitary growth hormone secretion and immune memory.'
      },
      {
        x: 215,
        y: 98,
        curve: 'secondary',
        badge: '🧪 1:00 AM REM Suppression',
        valueTag: 'Sedation ≠ Sleep',
        mechanismDetail: 'Alcohol and THC sedate the prefrontal cortex via GABA-A / CB1 receptors, suppressing cholinergic REM dream states required for emotional memory consolidation.'
      },
      {
        x: 315,
        y: 158,
        curve: 'secondary',
        badge: '🚨 2:30 AM Aldehyde Rebound',
        valueTag: '+10 BPM HR / -35% HRV',
        mechanismDetail: 'As hepatic ADH metabolizes ethanol into acetaldehyde, a sympathetic glutamate rebound triggers tachycardia, night sweats, and micro-awakenings through dawn.'
      }
    ],
    citation: {
      study: 'Ebrahim et al., Alcohol Clin Exp Res (2013)',
      pmid: '23347102',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23347102/',
      keyMetric: 'Dose-Dependent REM Suppression & Second-Half Sympathetic Rebound'
    }
  },

  // ============================================================================
  // 7. COLD PLUNGE: +250% DOPAMINE & +530% NOREPINEPHRINE TRAJECTORY
  // ============================================================================
  cold_plunge_catecholamines: {
    id: 'cold_plunge_catecholamines',
    tabLabel: '⚡ Dopamine (+250%)',
    title: 'Neurochemical Catecholamine Trajectory (0–4 Hours Post-Plunge)',
    subtitle: 'Cutaneous TRPM8 Cold Receptors • Locus Coeruleus +530% NE & +250% Dopamine',
    yAxisLabel: 'Plasma Dopamine',
    yAxisTicks: ['+250% Peak', '+175%', '100% Base'],
    xAxisLabels: ['Pre', '0m (Plunge)', '+30m', '+60m', '+120m', '+180m', '+240m'],
    colorScheme: 'cyan_emerald',
    thresholdLine: {
      y: 138,
      label: '100% Homeostatic Dopamine Baseline (Zero Rebound Crash)',
      color: '#64748b'
    },
    solidCurve: {
      label: 'Cold Plunge 50–55°F (+250% Sustained Dopamine Plateau • No Crash)',
      path: 'M 52,138 L 95,138 C 118,105 142,42 185,30 C 245,20 325,28 395,52 C 450,72 490,105 525,128',
      areaPath: 'M 52,138 L 95,138 C 118,105 142,42 185,30 C 245,20 325,28 395,52 C 450,72 490,105 525,128 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 142,42 C 185,30 245,20 325,28 C 355,34 378,42 395,52'
    },
    secondaryCurve: {
      label: 'Fast Stimulant / High-Glycemic Spike (15m Peak → Sub-Baseline Trough)',
      path: 'M 52,138 L 95,138 C 108,75 118,24 132,24 C 148,24 165,155 195,165 C 245,172 335,152 525,140',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 95,
        y: 138,
        curve: 'solid',
        badge: '🧊 0m: 2–3 Mins @ 50°F (10°C)',
        valueTag: '+530% Norepinephrine',
        mechanismDetail: 'Cold water extracts heat 25× faster than air, firing TRPM8 thermoreceptors and triggering an immediate +530% locus coeruleus norepinephrine discharge.'
      },
      {
        x: 245,
        y: 24,
        curve: 'solid',
        badge: '📈 +60–180m: +250% Dopamine',
        valueTag: '3–4h Plateau',
        mechanismDetail: 'In Šrámek et al., cold immersion elevated plasma dopamine by 250%—crucially rising slowly and holding a multi-hour plateau that sharpens calm executive focus.'
      },
      {
        x: 195,
        y: 165,
        curve: 'secondary',
        badge: '📉 +45m Fast-Spike Crash',
        valueTag: '-30% Below Base',
        mechanismDetail: 'Un-earned dopamine spikes (sugar, nicotine, rapid scrolling) trigger acute D2 receptor internalization, dropping tonic dopamine BELOW baseline and causing cravings.'
      },
      {
        x: 525,
        y: 128,
        curve: 'solid',
        badge: '✅ +240m Smooth Homeostasis',
        valueTag: 'No Trough',
        mechanismDetail: 'Cold-induced catecholamines glide gently back to baseline after 3–4 hours without any post-session irritability or dopamine deficit.'
      }
    ],
    citation: {
      study: 'Šrámek et al., Eur J Appl Physiol (2000)',
      pmid: '10751106',
      url: 'https://pubmed.ncbi.nlm.nih.gov/10751106/',
      keyMetric: '+250% Dopamine & +530% Norepinephrine Sustained 3+ Hours'
    }
  },

  // ============================================================================
  // 8. COLD PLUNGE TAB 2: THE SØBERG PRINCIPLE (AFTERDROP & BROWN FAT)
  // ============================================================================
  cold_plunge_soberg_rewarm: {
    id: 'cold_plunge_soberg_rewarm',
    tabLabel: '🔥 Søberg Rewarm (BAT)',
    title: 'The Søberg Principle: Post-Plunge "Afterdrop" & UCP1 Brown Fat Recruitment',
    subtitle: 'Endogenous Shiver Thermogenesis • Muscular Succinate → BAT Uncoupling',
    yAxisLabel: 'UCP1 Thermogenesis',
    yAxisTicks: ['Peak UCP1 BAT', 'Baseline', 'Suppressed'],
    xAxisLabels: ['Pre', 'Plunge (3m)', 'Exit (+5m)', '+15m (Shiver)', '+30m', '+60m', '+90m'],
    colorScheme: 'amber_cyan',
    solidCurve: {
      label: 'Søberg Air-Dry & Natural Rewarm (Core Afterdrop → Maximal BAT Activation)',
      path: 'M 52,140 L 115,125 C 145,85 175,32 225,26 C 285,22 355,48 425,85 C 475,112 505,128 525,135',
      areaPath: 'M 52,140 L 115,125 C 145,85 175,32 225,26 C 285,22 355,48 425,85 C 475,112 505,128 525,135 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 175,32 C 225,26 285,22 355,48'
    },
    secondaryCurve: {
      label: 'Immediate Hot Shower / Sauna Post-Plunge (Halts Shiver & UCP1 Adaptation)',
      path: 'M 52,140 L 115,125 C 135,95 150,88 165,142 C 205,155 295,148 525,142',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 115,
        y: 125,
        curve: 'solid',
        badge: '🧊 Exit Plunge (End on Cold)',
        valueTag: 'Peripheral Cool',
        mechanismDetail: 'During immersion, peripheral vasoconstriction shunts warm blood to the core. Upon exiting, cooled blood from the limbs returns to the core ("the afterdrop").'
      },
      {
        x: 225,
        y: 26,
        curve: 'solid',
        badge: '🔥 +5–20m Shiver & Succinate',
        valueTag: 'Peak UCP1 BAT',
        mechanismDetail: 'Rewarming naturally via air-drying triggers micro-shivering; skeletal muscle secretes succinate, which binds SUCNR1 receptors on Brown Adipose Tissue (BAT) to burn glucose & lipids.'
      },
      {
        x: 165,
        y: 142,
        curve: 'secondary',
        badge: '🚿 Immediate Hot Shower',
        valueTag: 'Adaptation Blunted',
        mechanismDetail: 'Applying external heat immediately after cold immersion satisfies hypothalamic thermoreceptors, aborting endogenous shivering and brown-fat mitochondrial biogenesis.'
      }
    ],
    citation: {
      study: 'Søberg et al., Cell Reports Medicine (2021)',
      pmid: '34661208',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34661208/',
      keyMetric: '11 Mins/Week Cold + Natural Rewarm Boosts BAT & Insulin Sensitivity'
    }
  },

  // ============================================================================
  // 9. COLD vs. HYPERTROPHY INTERFERENCE WINDOW (0–6 HOURS POST-LIFT)
  // ============================================================================
  cold_hypertrophy_interference: {
    id: 'cold_hypertrophy_interference',
    tabLabel: '🏋️‍♂️ 6h Lifting Buffer',
    title: 'Post-Resistance Anabolic mTORC1 Wave vs. Cold Vasoconstriction Blunting',
    subtitle: 'IL-6 / Macrophage Satellite Cell Signaling • 4–6 Hour Hypertrophy Buffer',
    yAxisLabel: 'mTORC1 & MPS Flux',
    yAxisTicks: ['Max Anabolic', 'Moderate', 'Blunted'],
    xAxisLabels: ['Lift (0h)', '+1h', '+2h (Peak)', '+4h', '+6h (Safe Cold)', '+12h', '+24h'],
    colorScheme: 'purple_cyan',
    phaseZones: [
      { x: 52, width: 248, label: '0–4h PROTECTED ANABOLIC WINDOW (NO COLD)', tint: 'purple' },
      { x: 300, width: 225, label: '+6h SAFE COLD PLUNGE WINDOW', tint: 'cyan' }
    ],
    solidCurve: {
      label: 'Protected Post-Lift Window (Cold Before Lift or ≥6h After • 100% Hypertrophy)',
      path: 'M 52,145 C 85,72 125,28 175,26 C 235,24 295,52 365,78 C 435,102 485,118 525,128',
      areaPath: 'M 52,145 C 85,72 125,28 175,26 C 235,24 295,52 365,78 C 435,102 485,118 525,128 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Cold Plunge Immediately Post-Lift (Blunts mTORC1 / p70S6K & Ribosomal Biogenesis)',
      path: 'M 52,145 C 75,110 95,128 135,138 C 195,145 285,142 525,145',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 175,
        y: 26,
        curve: 'solid',
        badge: '💪 +1–4h Acute Inflammatory Signal',
        valueTag: 'Peak mTORC1',
        mechanismDetail: 'Mechanical tension triggers a transient, beneficial IL-6 and macrophage cascade that activates p70S6K, satellite cell fusion, and myofibrillar protein synthesis.'
      },
      {
        x: 135,
        y: 138,
        curve: 'secondary',
        badge: '⚠️ Immediate Post-Lift Plunge',
        valueTag: '-30% Hypertrophy',
        mechanismDetail: 'Cold water immersion within 0–4h of lifting causes arterial vasoconstriction, reducing amino acid delivery and suppressing p70S6K phosphorylation and satellite cell proliferation.'
      },
      {
        x: 365,
        y: 78,
        curve: 'solid',
        badge: '✅ +6h+ (or Pre-Lift) Cold Safe',
        valueTag: 'Zero Interference',
        mechanismDetail: 'Performing cold immersion BEFORE resistance training or waiting ≥4–6 hours afterward preserves 100% of strength and hypertrophy adaptations.'
      }
    ],
    citation: {
      study: 'Roberts, Raastad, Peake et al., Journal of Physiology (2015)',
      pmid: '26174323',
      url: 'https://pubmed.ncbi.nlm.nih.gov/26174323/',
      keyMetric: 'Immediate Post-Lift Cold Immersion Blunts Long-Term Hypertrophy'
    }
  },

  // ============================================================================
  // 10. SAUNA: CORE TEMP INFLECTION (+1.5°C), GROWTH HORMONE & 48H HSP70
  // ============================================================================
  sauna_hsp70_gh_cardio: {
    id: 'sauna_hsp70_gh_cardio',
    tabLabel: '🔥 GH & 48h HSP70 Wave',
    title: 'Hyperthermic Core Inflection (+1.5°C), Growth Hormone & 48h HSP70 Shield',
    subtitle: '20 Mins @ ≥174°F (79°C) • HSF-1 Chaperone Activation • Endothelial eNOS',
    yAxisLabel: 'GH & HSP70 Activity',
    yAxisTicks: ['2x–16x GH Peak', '+50% HSP70', 'Baseline'],
    xAxisLabels: ['0m', '10m', '20m (174°F+)', '+1h (GH)', '+6h', '+24h (HSP70)', '+48h'],
    colorScheme: 'rose_amber',
    solidCurve: {
      label: '20m @ ≥174°F (+1.5°C Core Inflection → Acute GH Surge + 48h HSP70)',
      path: 'M 52,155 C 85,145 125,85 168,28 C 215,24 265,55 345,68 C 415,78 475,95 525,115',
      areaPath: 'M 52,155 C 85,145 125,85 168,28 C 215,24 265,55 345,68 C 415,78 475,95 525,115 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 125,85 C 148,48 158,30 168,28 C 195,25 235,40 265,55'
    },
    secondaryCurve: {
      label: 'Sub-Threshold Session (<10m or <150°F Dry • Core Temp <100.5°F)',
      path: 'M 52,155 C 95,148 135,128 168,132 C 225,142 325,152 525,155',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 168,
        y: 28,
        curve: 'solid',
        badge: '🌡️ 20m @ 174°F+ (Core +1.5°C)',
        valueTag: '2x–16x HGH Pulse',
        mechanismDetail: 'Reaching ≥101.3°F (38.5°C) core temperature triggers a massive pituitary Growth Hormone release (200–1600% depending on cadence), Zone-2 cardiac output, and dynorphin release.'
      },
      {
        x: 345,
        y: 68,
        curve: 'solid',
        badge: '🛡️ +6–48h HSP70 Proteostasis',
        valueTag: '48h Cellular Shield',
        mechanismDetail: 'Heat Shock Factor 1 (HSF-1) upregulates HSP70 and HSP90 molecular chaperones for 48 hours, refolding damaged proteins and clearing neurotoxic amyloid/tau aggregates.'
      },
      {
        x: 168,
        y: 132,
        curve: 'secondary',
        badge: '⚠️ <11m Short Session',
        valueTag: 'Sub-Inflection',
        mechanismDetail: 'In the Kuopio KIHD study, sessions <11 minutes failed to fully activate endothelial eNOS shear stress and yielded significantly smaller mortality reductions than ≥19-minute bouts.'
      }
    ],
    citation: {
      study: 'Laukkanen et al., JAMA Internal Medicine (2015)',
      pmid: '25705824',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25705824/',
      keyMetric: '-50% Fatal CVD & -40% All-Cause Mortality (4–7x/wk, ≥19m)'
    }
  },

  // ============================================================================
  // 11. SAUNA TAB 2: KUOPIO DOSE-RESPONSE MORTALITY & DEMENTIA CURVE
  // ============================================================================
  sauna_frequency_mortality_curve: {
    id: 'sauna_frequency_mortality_curve',
    tabLabel: '📉 4–7x/Wk Longevity Curve',
    title: 'Kuopio Cohort Dose-Response: Weekly Sauna Frequency vs. Disease Risk',
    subtitle: '2,315-Person 20-Year Longitudinal Follow-Up (Laukkanen et al.)',
    yAxisLabel: 'Relative Hazard Risk',
    yAxisTicks: ['1.00 (Baseline)', '0.65 (-35%)', '0.34 (-66%)'],
    xAxisLabels: ['1x / Week', '2x / Week', '3x / Week', '4x / Week', '5–7x / Week'],
    colorScheme: 'emerald_teal',
    solidCurve: {
      label: 'Fatal Cardiovascular Mortality Risk (-27% @ 2–3x • -50% @ 4–7x/wk)',
      path: 'M 52,38 C 145,52 215,78 288,92 C 365,108 445,126 525,134',
      areaPath: 'M 52,38 C 145,52 215,78 288,92 C 365,108 445,126 525,134 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Alzheimer’s & Dementia Incidence (-22% @ 2–3x • -66% @ 4–7x/wk)',
      path: 'M 52,38 C 145,58 215,82 288,88 C 365,118 445,148 525,158',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 52,
        y: 38,
        curve: 'solid',
        badge: '1️⃣ 1x/Week Reference Baseline',
        valueTag: 'HR = 1.00',
        mechanismDetail: 'Used as the active reference group in the 20-year Kuopio Ischemic Heart Disease (KIHD) prospective study.'
      },
      {
        x: 288,
        y: 92,
        curve: 'solid',
        badge: '🔥 2–3x/Week Moderate Dose',
        valueTag: '-24% All-Cause / -27% CVD',
        mechanismDetail: '2–3 sessions per week reduces sudden cardiac death by 22%, fatal CHD by 23%, and all-cause mortality by 24%.'
      },
      {
        x: 525,
        y: 134,
        curve: 'solid',
        badge: '❤️ 4–7x/Week Cardiovascular Shield',
        valueTag: '-50% Fatal CVD / -40% All-Cause',
        mechanismDetail: '4–7 sessions per week improves arterial compliance, lowers hs-CRP, and cuts fatal cardiovascular mortality in half.'
      },
      {
        x: 525,
        y: 158,
        curve: 'secondary',
        badge: '🧠 4–7x/Week Neuroprotection',
        valueTag: '-66% Alzheimer’s Risk',
        mechanismDetail: 'Frequent hyperthermic conditioning upregulates BDNF and HSP70 chaperones, reducing Alzheimer’s disease incidence by 65% and all-cause dementia by 66%.'
      }
    ],
    citation: {
      study: 'Laukkanen et al., Age and Ageing (2017)',
      pmid: '27932366',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27932366/',
      keyMetric: '-66% Dementia & -50% CVD Mortality at 4–7 Sessions/Week'
    }
  },

  // ============================================================================
  // 12. NSDR / YOGA NIDRA: +65% STRIATAL DOPAMINE & THETA RESTORATION
  // ============================================================================
  nsdr_striatal_dopamine_reset: {
    id: 'nsdr_striatal_dopamine_reset',
    tabLabel: '🧠 +65% Dopamine Reset',
    title: '20-Min NSDR / Yoga Nidra: EEG Theta Shift & +65% Striatal Dopamine',
    subtitle: '11C-Raclopride PET Imaging • Ventral Striatum Reserve • Hippocampal Replay',
    yAxisLabel: 'Striatal Dopamine',
    yAxisTicks: ['+65% Peak', '+30%', 'Depleted Base'],
    xAxisLabels: ['0m (Beta)', '5m (Alpha)', '12m (Theta)', '20m (Peak)', '+1h Post', '+3h Post'],
    colorScheme: 'purple_cyan',
    solidCurve: {
      label: '20-Min Supine NSDR (+65% Striatal Dopamine Reserve & Afternoon Focus)',
      path: 'M 52,142 C 95,125 145,75 215,38 C 265,24 315,28 385,48 C 445,65 490,82 525,95',
      areaPath: 'M 52,142 C 95,125 145,75 215,38 C 265,24 315,28 385,48 C 445,65 490,82 525,95 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 185,52 C 215,38 265,24 315,28 C 345,32 368,40 385,48'
    },
    secondaryCurve: {
      label: 'Unrecovered Afternoon Slump / Scrolling (High Beta Stress & Dopamine Drain)',
      path: 'M 52,142 C 125,148 215,155 315,160 C 395,162 465,164 525,165',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 52,
        y: 142,
        curve: 'solid',
        badge: '⚡ 0m: High-Beta Prefrontal Fatigue',
        valueTag: '15–30 Hz EEG',
        mechanismDetail: 'Intense morning cognitive work or partial sleep debt depletes basal ganglia dopamine and locks the cortex in high-frequency Beta arousal.'
      },
      {
        x: 215,
        y: 38,
        curve: 'solid',
        badge: '🌊 12–20m: Theta Entrainment',
        valueTag: '+65% Dopamine',
        mechanismDetail: 'Rotating somatic attention across the sensory-motor homunculus while motionless shifts EEG to 4–7 Hz Theta and increases endogenous striatal dopamine release by 65%.'
      },
      {
        x: 385,
        y: 48,
        curve: 'solid',
        badge: '🚀 +1–3h Second-Wind Neuroplasticity',
        valueTag: '10× Neural Replay',
        mechanismDetail: 'Triggers sleep-like hippocampal-neocortical memory replay without afternoon sleep inertia or evening sleep pressure disruption.'
      }
    ],
    citation: {
      study: 'Kjaer et al., Cognitive Brain Research (2002)',
      pmid: '11958969',
      url: 'https://pubmed.ncbi.nlm.nih.gov/11958969/',
      keyMetric: '+65% Endogenous Ventral Striatum Dopamine Release on PET'
    }
  },

  // ============================================================================
  // 13. POST-MEAL GLUCOSE WALK / GLUT4 / ACARBOSE / BERBERINE
  // ============================================================================
  postprandial_glucose_walk: {
    id: 'postprandial_glucose_walk',
    tabLabel: '🚶‍♂️ Post-Meal Glucose Curve',
    title: 'Post-Prandial Glycemic Excursion (0–120 Mins) & Non-Insulin GLUT4 Uptake',
    subtitle: 'Skeletal Muscle AMPK / Ca²⁺ Contraction • -35% Glycemic Peak & Insulin Sparing',
    yAxisLabel: 'Blood Glucose',
    yAxisTicks: ['155 mg/dL', '110 mg/dL', '80 mg/dL'],
    xAxisLabels: ['Meal (0m)', '+15m (Walk)', '+30m', '+45m (Peak)', '+60m', '+90m', '+120m'],
    colorScheme: 'emerald_teal',
    thresholdLine: {
      y: 82,
      label: '🛡️ 110 mg/dL Endothelial Glycocalyx & Low-Glycation Ceiling',
      color: '#10b981'
    },
    solidCurve: {
      label: '10–15m Post-Meal Walk / GLUT4 Buffer (<110 mg/dL • Steady Energy)',
      path: 'M 52,135 C 85,130 115,108 155,92 C 195,78 245,84 305,106 C 365,125 445,132 525,135',
      areaPath: 'M 52,135 C 85,130 115,108 155,92 C 195,78 245,84 305,106 C 365,125 445,132 525,135 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 115,108 C 155,92 195,78 245,84'
    },
    secondaryCurve: {
      label: 'Sedentary Post-Meal Sitting (>150 mg/dL Spike → 90m Hypoglycemia Crash)',
      path: 'M 52,135 C 85,115 135,28 185,24 C 235,20 295,125 375,164 C 425,172 475,150 525,138',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 115,
        y: 108,
        curve: 'solid',
        badge: '🚶‍♂️ +15–20m Start 10m Walk',
        valueTag: 'GLUT4 Active',
        mechanismDetail: 'Initiating brisk walking or soleus contractions within 15–30m of eating activates intramuscular AMPK and CaMKII, moving GLUT4 transporters to the cell surface WITHOUT insulin.'
      },
      {
        x: 185,
        y: 24,
        curve: 'secondary',
        badge: '🚨 +45m Unbuffered Spike',
        valueTag: '150+ mg/dL',
        mechanismDetail: 'Sitting immediately after a carbohydrate meal forces a steep glycemic spike, generating vascular superoxide radicals and a compensatory pancreatic insulin surge.'
      },
      {
        x: 195,
        y: 80,
        curve: 'solid',
        badge: '✅ +45m Buffered Hill',
        valueTag: '-35% Peak AUC',
        mechanismDetail: 'Contracting quadriceps, glutes, and soleus fibers siphon circulating glucose directly into muscle glycogen/ATP, cutting insulin requirements by 40–60%.'
      },
      {
        x: 375,
        y: 164,
        curve: 'secondary',
        badge: '🥱 +90m Reactive Dip ("Food Coma")',
        valueTag: '<75 mg/dL Dip',
        mechanismDetail: 'Excess insulin from an unbuffered spike overshoots and drives blood glucose below baseline at 90 minutes, triggering afternoon brain fog, irritability, and sugar cravings.'
      }
    ],
    citation: {
      study: 'Buffey et al., Sports Medicine (2022) / Hamilton (2022)',
      pmid: '35147898',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35147898/',
      keyMetric: '-35% to -52% Postprandial Glucose Excursion & Insulin Blunting'
    }
  },

  // ============================================================================
  // 14. INTERMITTENT FASTING: THE METABOLIC SWITCH & AUTOPHAGY CROSSOVER
  // ============================================================================
  fasting_metabolic_switch_autophagy: {
    id: 'fasting_metabolic_switch_autophagy',
    tabLabel: '♻️ Metabolic Switch & Autophagy',
    title: 'The Metabolic Switch: Glycogen Depletion vs. BHB Ketones & AMPK Autophagy',
    subtitle: 'Hours 0 → 24+ Fasted • mTORC1 Suppression • ULK1 Autophagosome Flux',
    yAxisLabel: 'Metabolic Flux',
    yAxisTicks: ['Max Ketone / AMPK', 'Crossover (12–14h)', 'Basal / Depleted'],
    xAxisLabels: ['0h (Meal)', '4h', '8h', '12h (Switch)', '16h (16:8)', '20h', '24h+'],
    colorScheme: 'amber_cyan',
    phaseZones: [
      { x: 52, width: 175, label: 'FED / GLYCOGEN PHASE', tint: 'slate' },
      { x: 227, width: 115, label: 'METABOLIC SWITCH', tint: 'amber' },
      { x: 342, width: 185, label: 'KETOSIS & AUTOPHAGY SURGE', tint: 'cyan' }
    ],
    solidCurve: {
      label: 'BHB Ketones, Lipolysis & AMPK / ULK1 Autophagy Flux (Rising)',
      path: 'M 52,165 C 125,164 195,152 255,112 C 315,68 385,36 455,26 L 525,22',
      areaPath: 'M 52,165 C 125,164 195,152 255,112 C 315,68 385,36 455,26 L 525,22 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 315,68 C 385,36 455,26 525,22'
    },
    secondaryCurve: {
      label: 'Plasma Insulin, mTORC1 & Hepatic Glycogen Stores (Falling)',
      path: 'M 52,28 C 125,38 195,68 255,112 C 315,148 385,162 525,168',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 52,
        y: 28,
        curve: 'secondary',
        badge: '🍽️ 0–4h Post-Absorptive Phase',
        valueTag: 'Insulin & mTOR High',
        mechanismDetail: 'Elevated circulating insulin and leucine activate mTORC1 anabolic synthesis while inhibiting hormone-sensitive lipase (HSL) and autophagy.'
      },
      {
        x: 255,
        y: 112,
        curve: 'solid',
        badge: '🔀 12–14h The Metabolic Switch',
        valueTag: 'Glycogen Depleted',
        mechanismDetail: 'As ~100g of hepatic glycogen depletes and insulin reaches its fasting nadir, the body flips from glucose oxidation to adipose free fatty acid mobilization.'
      },
      {
        x: 342,
        y: 56,
        curve: 'solid',
        badge: '⚡ 16–18h BHB Ketones & AMPK',
        valueTag: 'BHB >0.5 mmol/L',
        mechanismDetail: 'Hepatic β-hydroxybutyrate (BHB) crosses 0.5 mmol/L—inhibiting the NLRP3 inflammasome, acting as an HDAC inhibitor, and triggering AMPK/ULK1 mitophagy.'
      },
      {
        x: 525,
        y: 22,
        curve: 'solid',
        badge: '🧬 24h+ Deep Autophagy & Stem Cells',
        valueTag: 'GKI <3.0 / +300% GH',
        mechanismDetail: 'Past 20–24h, intestinal and hematopoietic stem cell self-renewal pathways (PKA/IGF-1 suppression) and deep lysosomal proteostasis accelerate.'
      }
    ],
    citation: {
      study: 'de Cabo & Mattson, New England Journal of Medicine (2019)',
      pmid: '31881139',
      url: 'https://pubmed.ncbi.nlm.nih.gov/31881139/',
      keyMetric: '12–16h Glycogen-to-Ketone Switch & AMPK Autophagy Activation'
    }
  },

  // ============================================================================
  // 15. PROTEIN DISTRIBUTION & THE ~3.0g LEUCINE TRIGGER THRESHOLD
  // ============================================================================
  protein_leucine_mps_pulses: {
    id: 'protein_leucine_mps_pulses',
    tabLabel: '🥩 3g Leucine Trigger Pulses',
    title: 'Muscle Protein Synthesis (MPS) & The ~3.0g Leucine mTORC1 Threshold',
    subtitle: 'Sestrin2 Leucine Sensing • 3–4 Daily Boluses (35–50g) vs. Skewed Grazing',
    yAxisLabel: 'Myofibrillar MPS',
    yAxisTicks: ['Max MPS Pulse', '3g Leucine Line', 'Refractory Base'],
    xAxisLabels: ['8a (Meal 1)', '11a', '1p (Meal 2)', '4p', '7p (Meal 3)', '10p'],
    colorScheme: 'cyan_emerald',
    thresholdLine: {
      y: 86,
      label: '🎯 ~3.0g Leucine (~35–45g Protein) Sestrin2 / mTORC1 Trigger Threshold',
      color: '#f59e0b'
    },
    solidCurve: {
      label: 'Evenly Distributed Boluses (3 × 40–50g Protein = 3 Full MPS Waves)',
      path: 'M 52,148 C 72,145 88,32 112,32 C 138,32 155,148 195,148 C 225,148 248,34 275,34 C 302,34 325,148 365,148 C 395,148 418,30 445,30 C 472,30 495,145 525,148',
      areaPath: 'M 52,148 C 72,145 88,32 112,32 C 138,32 155,148 195,148 C 225,148 248,34 275,34 C 302,34 325,148 365,148 C 395,148 418,30 445,30 C 472,30 495,145 525,148 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Skewed Grazing (12g Breakfast + 18g Lunch + 80g Dinner = Only 1 Pulse)',
      path: 'M 52,148 C 75,148 92,115 112,115 C 135,115 165,148 215,148 C 245,148 258,104 275,104 C 295,104 335,148 375,148 C 405,148 422,28 445,28 C 472,28 495,145 525,148',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 112,
        y: 32,
        curve: 'solid',
        badge: '🍳 8:00 AM Pulse 1 (40g Protein)',
        valueTag: '3.2g Leucine',
        mechanismDetail: 'Breaks overnight catabolism by saturating intracellular Sestrin2 leucine sensors, firing the first maximal 3-hour myofibrillar protein synthesis wave.'
      },
      {
        x: 112,
        y: 115,
        curve: 'secondary',
        badge: '⚠️ 12g Protein Breakfast',
        valueTag: 'Sub-Threshold',
        mechanismDetail: 'Meals under ~25–30g protein (<2.5g leucine) fail to overcome age-related anabolic resistance, leaving morning mTORC1 un-triggered.'
      },
      {
        x: 275,
        y: 34,
        curve: 'solid',
        badge: '🥗 1:00 PM Pulse 2 (40g Protein)',
        valueTag: '+25% Daily MPS',
        mechanismDetail: 'After a 4–5 hour "muscle-full" refractory recovery window, a second ≥35g bolus triggers a second maximal anabolic pulse.'
      },
      {
        x: 445,
        y: 30,
        curve: 'solid',
        badge: '🥩 7:00 PM Pulse 3 (45g Protein)',
        valueTag: 'Nocturnal Repair',
        mechanismDetail: 'Provides sustained essential amino acids (EAAs) for overnight tissue remodeling, yielding +25% higher 24-hour muscle protein synthesis than dinner-skewed intake.'
      }
    ],
    citation: {
      study: 'Mamerow et al., Journal of Nutrition (2014)',
      pmid: '24477298',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24477298/',
      keyMetric: '+25% Higher 24-Hour Muscle Protein Synthesis vs. Skewed Intake'
    }
  },

  // ============================================================================
  // 16. ZONE 2 CARDIO: FAT OXIDATION DOME vs. 2.0 mmol/L BLOOD LACTATE
  // ============================================================================
  zone_2_lactate_fat_crossover: {
    id: 'zone_2_lactate_fat_crossover',
    tabLabel: '🔥 Fat Ox vs. 2.0 mmol/L Lactate',
    title: 'San-Millán Zone 2: Mitochondrial Fat Oxidation Peak vs. Blood Lactate',
    subtitle: 'Type I Slow-Twitch Recruitment • MCT1 Lactate Shuttle • CPT-1 Lipolysis',
    yAxisLabel: 'Fat Ox & Lactate',
    yAxisTicks: ['Peak Fat / 6 mmol', '2.0 mmol/L Ceiling', 'Resting (0.9 mmol)'],
    xAxisLabels: ['Rest', 'Zone 1', 'Zone 2 (Sweet Spot)', 'Zone 3 (Gray)', 'Zone 4', 'Zone 5'],
    colorScheme: 'emerald_teal',
    thresholdLine: {
      y: 108,
      label: '🧪 2.0 mmol/L Blood Lactate Ceiling (Maximal Type I Mitochondrial Output)',
      color: '#38bdf8'
    },
    phaseZones: [
      { x: 165, width: 125, label: 'ZONE 2 OPTIMAL DOME', tint: 'emerald' },
      { x: 290, width: 235, label: 'ZONE 3–5 GLYCOLYTIC SHIFT', tint: 'rose' }
    ],
    solidCurve: {
      label: 'Mitochondrial Fat Oxidation (g/min • Peaks in Zone 2, Plummets in Z3–Z5)',
      path: 'M 52,142 C 105,105 165,36 228,32 C 285,28 345,88 415,142 C 465,164 500,170 525,172',
      areaPath: 'M 52,142 C 105,105 165,36 228,32 C 285,28 345,88 415,142 C 465,164 500,170 525,172 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 165,36 C 195,30 228,32 275,38'
    },
    secondaryCurve: {
      label: 'Blood Lactate (mmol/L • Flat ≤2.0 in Zone 2, Exponential Spike in Z3–Z5)',
      path: 'M 52,155 C 115,152 175,142 228,112 C 295,82 385,48 525,22',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 228,
        y: 32,
        curve: 'solid',
        badge: '🔥 Zone 2 Peak Fat Oxidation',
        valueTag: '0.6–1.0 g/min Fat',
        mechanismDetail: 'Right at the top of Zone 2 (conversational nasal breathing), Type I slow-twitch muscle fibers maximize fatty acid transport via FAT/CD36 and CPT-1.'
      },
      {
        x: 228,
        y: 112,
        curve: 'secondary',
        badge: '🧪 1.7–2.0 mmol/L Lactate Balance',
        valueTag: 'MCT1 Shuttle',
        mechanismDetail: 'Lactate production equals clearance: MCT1 transporters shuttle lactate into Type I mitochondria to be oxidized as clean ATP fuel.'
      },
      {
        x: 345,
        y: 88,
        curve: 'solid',
        badge: '⚠️ Zone 3 "Gray Zone" Creep',
        valueTag: 'Lipolysis Inhibited',
        mechanismDetail: 'When intensity creeps into Zone 3 (>2.5 mmol/L lactate), rising H+ and glycolytic flux inhibit hormone-sensitive lipase and shut down mitochondrial fat oxidation.'
      }
    ],
    citation: {
      study: 'San-Millán & Brooks, Sports Medicine (2018)',
      pmid: '28623613',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28623613/',
      keyMetric: 'Zone 2 Maximizes FAT/CD36 Lipolysis & MCT1 Lactate Clearance'
    }
  },

  // ============================================================================
  // 17. NORWEGIAN 4x4 HIIT: 4-PEAK VO2 MAX STROKE VOLUME WAVE
  // ============================================================================
  norwegian_4x4_vo2_wave: {
    id: 'norwegian_4x4_vo2_wave',
    tabLabel: '❤️ 4×4 VO₂ Max Wave',
    title: 'Norwegian 4×4 Cardiac Stroke-Volume Wave (4m @ 90–95% / 3m @ 65%)',
    subtitle: 'Left Ventricular Eccentric Stretch • Overcoming the 90s Cardiac Lag',
    yAxisLabel: 'Heart Rate (% Max)',
    yAxisTicks: ['95% VO₂ Peak', '85% Zone 5', '65% Active Flush'],
    xAxisLabels: ['Warmup', 'Bout 1 (4m)', 'Rec 1', 'Bout 2 (4m)', 'Rec 2', 'Bout 3 (4m)', 'Rec 3', 'Bout 4 (4m)'],
    colorScheme: 'rose_amber',
    thresholdLine: {
      y: 56,
      label: '❤️ 88–95% HRmax VO₂ Peak Adaptation Zone (16 Mins Total Time-in-Zone)',
      color: '#f43f5e'
    },
    solidCurve: {
      label: 'Norwegian 4×4 (4 Mins Sustained @ 90–95% HRmax + 3 Mins @ 65% Flush)',
      path: 'M 52,145 L 85,115 L 112,36 L 148,32 L 178,118 L 205,118 L 232,34 L 268,30 L 298,116 L 325,116 L 352,32 L 388,28 L 418,114 L 445,114 L 472,30 L 512,26 L 525,95',
      areaPath: 'M 52,145 L 85,115 L 112,36 L 148,32 L 178,118 L 205,118 L 232,34 L 268,30 L 298,116 L 325,116 L 352,32 L 388,28 L 418,114 L 445,114 L 472,30 L 512,26 L 525,95 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Short 30s Sprint Intervals (Never Overcomes 90s Cardiac Lag to Reach Peak SV)',
      path: 'M 52,145 C 125,85 215,78 315,76 C 415,74 475,78 525,95',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 148,
        y: 32,
        curve: 'solid',
        badge: '⏱️ Why 4 Full Minutes?',
        valueTag: '90s Cardiac Lag',
        mechanismDetail: 'The heart takes ~90–120 seconds of hard work just to reach maximal stroke volume; minutes 2–4 hold the left ventricle at peak eccentric stretch.'
      },
      {
        x: 298,
        y: 116,
        curve: 'solid',
        badge: '🫁 3-Min Active Recovery (65%)',
        valueTag: 'Lactate Flush',
        mechanismDetail: 'Keeping HR at 60–70% (light pedaling/jogging) circulates blood through Type I fibers and the liver (Cori cycle) to clear lactate before the next bout.'
      },
      {
        x: 512,
        y: 26,
        curve: 'solid',
        badge: '🚀 Bout 4: Reversing Cardiac Aging',
        valueTag: '+18% VO₂ Max',
        mechanismDetail: 'In Levine et al. (Circulation 2018), Norwegian 4×4 training reversed 20 years of age-related left ventricular stiffening and increased VO₂ max by 18%.'
      }
    ],
    citation: {
      study: 'Howden, Sarma, Levine et al., Circulation (2018)',
      pmid: '29311053',
      url: 'https://pubmed.ncbi.nlm.nih.gov/29311053/',
      keyMetric: '+18% VO₂ Max & Reversal of 20 Years of Cardiac Stiffening'
    }
  },

  // ============================================================================
  // 18. STRENGTH, BFR & ISOMETRIC SHEAR STRESS
  // ============================================================================
  strength_bfr_isometric_recruitment: {
    id: 'strength_bfr_isometric_recruitment',
    tabLabel: '💪 Type II Fiber & eNOS',
    title: 'BFR (30-15-15-15) & High-Tension Fast-Twitch (Type II) Fiber Recruitment',
    subtitle: 'Venous Metabolite Pooling • Henneman’s Size Principle • +290% GH Surge',
    yAxisLabel: 'Type II Fiber Activation',
    yAxisTicks: ['100% Type II Max', '50% Mixed', 'Type I Only'],
    xAxisLabels: ['Set 1 (30r)', '30s Rest', 'Set 2 (15r)', '30s Rest', 'Set 3 (15r)', '30s Rest', 'Set 4 (15r)'],
    colorScheme: 'purple_cyan',
    solidCurve: {
      label: 'BFR (20–30% 1RM + Cuffs) or Heavy Failure (Full Type II Fiber Recruitment)',
      path: 'M 52,145 C 85,112 115,78 135,72 C 155,88 175,92 195,88 C 225,52 245,42 268,38 C 288,55 305,58 325,54 C 355,32 375,26 398,24 C 418,38 435,42 455,38 C 485,22 505,20 525,20',
      areaPath: 'M 52,145 C 85,112 115,78 135,72 C 155,88 175,92 195,88 C 225,52 245,42 268,38 C 288,55 305,58 325,54 C 355,32 375,26 398,24 C 418,38 435,42 455,38 C 485,22 505,20 525,20 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Light Load (20–30% 1RM) Without BFR or Failure (Stays in Type I Fibers)',
      path: 'M 52,145 C 125,125 215,122 315,118 C 415,115 475,114 525,112',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 72,
        curve: 'solid',
        badge: '🩸 Set 1 (30 Reps): Oxygen Depletion',
        valueTag: '40–70% LOP',
        mechanismDetail: 'The 30-rep primer set under venous occlusion exhausts local myoglobin oxygen in slow-twitch Type I fibers and traps lactate/H+ inside the limb.'
      },
      {
        x: 268,
        y: 38,
        curve: 'solid',
        badge: '⚡ Set 2–3: Early Type II Takeover',
        valueTag: 'Size Principle Bypass',
        mechanismDetail: 'Because 30-second occluded rests prevent metabolite washout, the nervous system is forced to recruit high-threshold Type II fast-twitch fibers despite light joint loads.'
      },
      {
        x: 525,
        y: 20,
        curve: 'solid',
        badge: '🚀 Set 4: Reperfusion eNOS & +290% GH',
        valueTag: 'mTORC1 + VEGF',
        mechanismDetail: 'Releasing the cuffs triggers a massive reactive hyperemia nitric oxide shear wave (-8.2 mmHg BP in isometrics), cellular swelling, and a +290% pituitary GH pulse.'
      }
    ],
    citation: {
      study: 'Edwards et al., BJSM (2023) / Loenneke et al. (2012)',
      pmid: '37491419',
      url: 'https://pubmed.ncbi.nlm.nih.gov/37491419/',
      keyMetric: 'Matches 80% 1RM Hypertrophy at 30% Load & #1 Modality for BP (-8.2 mmHg)'
    }
  },

  // ============================================================================
  // 19. ATTIA CENTENARIAN DECATHLON GLIDER CURVE (MARGINAL DECADE)
  // ============================================================================
  attia_centenarian_marginal_decade: {
    id: 'attia_centenarian_marginal_decade',
    tabLabel: '🏔️ Centenarian Glider',
    title: 'The Centenarian Decathlon Glider: 95th-Percentile Reserve Through Age 95',
    subtitle: 'Backcasting VO₂ Max & Fast-Twitch Strength Against the ~10%/Decade Aging Slope',
    yAxisLabel: 'VO₂ Max & Strength',
    yAxisTicks: ['Top 5% (50+ mL/kg)', 'Median (35 mL/kg)', '18 mL/kg Cutoff'],
    xAxisLabels: ['Age 35', 'Age 45', 'Age 55', 'Age 65', 'Age 75', 'Age 85', 'Age 95'],
    colorScheme: 'cyan_emerald',
    thresholdLine: {
      y: 124,
      label: '🛡️ ~18 mL/kg/min VO₂ Max & Grip Threshold for Independent Living',
      color: '#10b981'
    },
    solidCurve: {
      label: 'Centenarian Reserve Track (Top 5% @ Age 45 → Independent at Age 95)',
      path: 'M 52,48 C 95,30 135,24 175,26 C 245,32 325,54 415,78 C 465,92 500,104 525,110',
      areaPath: 'M 52,48 C 95,30 135,24 175,26 C 245,32 325,54 415,78 C 465,92 500,104 525,110 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 95,30 C 135,24 175,26 245,32'
    },
    secondaryCurve: {
      label: '50th-Percentile Average Track (Drops Below Autonomy Line at Age 76)',
      path: 'M 52,78 C 125,86 215,100 315,118 C 365,128 435,146 525,166',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 24,
        curve: 'solid',
        badge: '🏔️ Age 40–50: Build Top 5% Reserve',
        valueTag: '5.0× Survival Odds',
        mechanismDetail: 'Because VO₂ max and Type II muscle power inevitably decline ~8–12% per decade after 50, you must over-build capacity in midlife ("glider altitude").'
      },
      {
        x: 345,
        y: 124,
        curve: 'secondary',
        badge: '⚠️ Age 76: Average Crosses Line',
        valueTag: '<18 mL/kg/min',
        mechanismDetail: 'An average untrained adult crosses below ~18 mL/kg/min VO₂ max and critical eccentric quad/grip strength in their mid-70s, losing the ability to climb stairs or get off the floor.'
      },
      {
        x: 525,
        y: 110,
        curve: 'solid',
        badge: '🏆 Age 95: Marginal Decade Thriving',
        valueTag: 'Above Threshold',
        mechanismDetail: 'Starting from the 95th percentile keeps you comfortably above the independent living line in your 90s—carrying groceries, lifting a 30-lb grandchild, and preventing falls.'
      }
    ],
    citation: {
      study: 'Mandsager et al., JAMA Network Open (2018)',
      pmid: '30646252',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30646252/',
      keyMetric: '5.0× Lower All-Cause Mortality in Elite (Top 2.3%) vs. Low VO₂ Max'
    }
  },

  // ============================================================================
  // 20. RED & NIR PHOTOBIOMODULATION: ARNDT-SCHULZ BIPHASIC BELL CURVE
  // ============================================================================
  red_light_arndt_schulz_biphasic: {
    id: 'red_light_arndt_schulz_biphasic',
    tabLabel: '🔴 Biphasic Dose Window',
    title: 'The Arndt-Schulz Biphasic Fluence Curve (630–670nm & 830–850nm PBM)',
    subtitle: 'Cytochrome c Oxidase NO Photodissociation vs. Excess ROS Bio-Inhibition',
    yAxisLabel: 'Mitochondrial ATP Gain',
    yAxisTicks: ['+35% Peak ATP', '0% Baseline', '-20% Inhibited'],
    xAxisLabels: ['0 J/cm²', '3 J/cm²', '10 J/cm²', '20 J/cm² (Sweet Spot)', '35 J/cm²', '50 J/cm²', '70+ J/cm²'],
    colorScheme: 'rose_amber',
    thresholdLine: {
      y: 132,
      label: '0% Net Baseline (Above = Photobiostimulation • Below = ROS Bio-Inhibition)',
      color: '#64748b'
    },
    phaseZones: [
      { x: 52, width: 85, label: 'UNDER-DOSED', tint: 'slate' },
      { x: 137, width: 235, label: '10–35 J/cm² THERAPEUTIC SWEET SPOT', tint: 'emerald' },
      { x: 372, width: 155, label: '>50 J/cm² INHIBITION', tint: 'rose' }
    ],
    solidCurve: {
      label: 'Arndt-Schulz Biphasic Cellular Response (Peaks @ 15–30 J/cm²)',
      path: 'M 52,132 C 85,130 115,112 145,78 C 185,36 225,24 265,24 C 305,24 345,58 385,128 C 425,155 475,166 525,168',
      areaPath: 'M 52,132 C 85,130 115,112 145,78 C 185,36 225,24 265,24 C 305,24 345,58 385,128 C 425,155 475,166 525,168 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 165,58 C 195,32 225,24 265,24 C 295,24 325,42 355,78'
    },
    secondaryCurve: {
      label: '"More Is Better" Myth (Linear Assumption Fails Past 45–50 J/cm²)',
      path: 'M 52,132 L 525,22',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 95,
        y: 124,
        curve: 'solid',
        badge: '⚪ <5 J/cm² Sub-Threshold',
        valueTag: 'Too Far / Brief',
        mechanismDetail: 'Standing >36 inches from a panel or stopping after 1 minute delivers insufficient photon flux to dissociate inhibitory nitric oxide from Complex IV.'
      },
      {
        x: 265,
        y: 24,
        curve: 'solid',
        badge: '🟢 15–30 J/cm² Sweet Spot',
        valueTag: '+30% ATP & Collagen',
        mechanismDetail: 'Optimal photon fluence photodissociates NO from Cytochrome c Oxidase, restores mitochondrial membrane potential, and boosts TGF-β1 procollagen by +26–31%.'
      },
      {
        x: 455,
        y: 162,
        curve: 'solid',
        badge: '🔴 >50 J/cm² ROS Bio-Inhibition',
        valueTag: 'Over-Dosed',
        mechanismDetail: 'Camping 2 inches from a high-irradiance panel for >20 minutes over-reduces the electron transport chain, generating excessive superoxide ROS that reverses the benefit.'
      }
    ],
    citation: {
      study: 'Huang, Hamblin et al., Dose-Response (2009)',
      pmid: '19633771',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19633771/',
      keyMetric: 'Biphasic Arndt-Schulz Law: 10–35 J/cm² Optimal, >50 J/cm² Inhibitory'
    }
  },

  // ============================================================================
  // 21. BONE DENSITY: FROST'S MECHANOSTAT & PIEZO1 STRAIN THRESHOLD
  // ============================================================================
  bone_density_mechanostat_threshold: {
    id: 'bone_density_mechanostat_threshold',
    tabLabel: '🦴 Mechanostat (>4G)',
    title: 'Frost’s Mechanostat Curve: Osteocyte Piezo1 Strain Threshold (>4G / 85% 1RM)',
    subtitle: 'Sclerostin Inhibition • Wnt/β-Catenin Osteoblast Activation • LIFTMOR RCT',
    yAxisLabel: 'Bone Remodeling (BMD)',
    yAxisTicks: ['+3–5% Osteogenesis', '0% Maintenance', '-BMD Resorption'],
    xAxisLabels: ['Unloaded', 'Swim / Cycle', 'Walking (1.2G)', 'Jogging (2G)', '4G / 85% 1RM', 'LIFTMOR / Hops'],
    colorScheme: 'amber_cyan',
    thresholdLine: {
      y: 95,
      label: '⚡ ~1,500–2,000 µε (≥4G Impact or ≥80–85% 1RM) Piezo1 Osteogenic Threshold',
      color: '#f59e0b'
    },
    solidCurve: {
      label: 'Trabecular & Cortical Bone Formation Response Across Mechanical Strain',
      path: 'M 52,162 C 95,158 135,124 185,120 L 315,118 C 355,116 385,68 435,34 C 475,24 505,22 525,22',
      areaPath: 'M 52,162 C 95,158 135,124 185,120 L 315,118 C 355,116 385,68 435,34 C 475,24 505,22 525,22 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 365,92 C 395,58 435,34 525,22'
    },
    secondaryCurve: {
      label: 'Low-Impact Cardio Only (Remains Below Osteogenic Remodeling Threshold)',
      path: 'M 52,162 C 115,132 185,120 525,120',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 245,
        y: 119,
        curve: 'solid',
        badge: '🚶‍♂️ Walking / Cycling Plateau',
        valueTag: '500–1,000 µε',
        mechanismDetail: 'Everyday locomotion generates <1,000 microstrain (µε)—enough to prevent bed-rest bone loss, but insufficient to open osteocyte Piezo1 channels for new bone growth.'
      },
      {
        x: 385,
        y: 68,
        curve: 'solid',
        badge: '⚡ >4G / 85% 1RM Inflection',
        valueTag: '>1,500 µε Strain',
        mechanismDetail: 'Crossing ~1,500–2,000 µε via heavy axial loading (deadlifts/squats @ 85% 1RM) or stiff-legged impact hops suppresses sclerostin and unlocks Wnt/β-catenin osteoblasts.'
      },
      {
        x: 505,
        y: 22,
        curve: 'solid',
        badge: '🦴 LIFTMOR Protocol Gain',
        valueTag: '+2.9–4.1% Lumbar BMD',
        mechanismDetail: 'In the LIFTMOR RCT, just two 30-minute sessions/week of 5×5 @ >80–85% 1RM + impact drops reversed osteopenia/osteoporosis and increased femoral cortical thickness.'
      }
    ],
    citation: {
      study: 'Watson et al. (LIFTMOR Trial), J Bone Miner Res (2018)',
      pmid: '28975661',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28975661/',
      keyMetric: '+2.9% Lumbar Spine & +4.1% Femoral Neck Cortical BMD in 8 Months'
    }
  },

  // ============================================================================
  // 22. CYCLIC SIGHING (STANFORD DOUBLE-INHALE + EXTENDED EXHALE)
  // ============================================================================
  cyclic_sighing_vagal_brake: {
    id: 'cyclic_sighing_vagal_brake',
    tabLabel: '🫁 Double-Inhale & Vagal Drop',
    title: 'Stanford Cyclic Sighing: Alveolar Top-Off Pop & Sinoatrial Vagal Braking',
    subtitle: '2.5s Nasal Inhale + 1.5s Micro-Sigh → 6.0s Extended Mouth Exhale',
    yAxisLabel: 'Lung Vol & Vagal Brake',
    yAxisTicks: ['100% Alveolar Pop', '80% Primary Inhale', 'Max Vagal HR Drop'],
    xAxisLabels: ['0s', '2.5s (Inhale 1)', '4.0s (Top-Off)', '6.0s', '8.0s', '10.0s (Exhale End)'],
    colorScheme: 'cyan_emerald',
    solidCurve: {
      label: 'Alveolar Lung Inflation → Extended Exhale Baroreceptor Vagal Braking',
      path: 'M 52,155 C 85,115 125,68 168,64 C 195,62 215,24 245,24 C 315,24 415,125 525,162',
      areaPath: 'M 52,155 C 85,115 125,68 168,64 C 195,62 215,24 245,24 C 315,24 415,125 525,162 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 168,64 C 195,62 215,24 245,24'
    },
    secondaryCurve: {
      label: 'Instantaneous Heart Rate (Rises on Inhale → Steep Vagal Drop on 6s Exhale)',
      path: 'M 52,115 C 115,85 185,55 245,52 C 325,95 425,148 525,166',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 168,
        y: 64,
        curve: 'solid',
        badge: '🫁 2.5s Primary Nasal Inhale',
        valueTag: '80–85% Inflation',
        mechanismDetail: 'Fills primary lung volume via diaphragmatic descent while drawing paranasal nitric oxide into the lower airways.'
      },
      {
        x: 245,
        y: 24,
        curve: 'solid',
        badge: '💥 +1.5s Second "Top-Off" Pop',
        valueTag: '100% Alveolar Reset',
        mechanismDetail: 'The sharp secondary nasal micro-inhale pops open micro-collapsed alveoli (atelectasis), maximizing alveolar surface area to dump excess arterial CO₂.'
      },
      {
        x: 525,
        y: 166,
        curve: 'secondary',
        badge: '📉 6.0s Slow Exhale (Vagal Brake)',
        valueTag: '-8 to -12 BPM',
        mechanismDetail: 'As the diaphragm rises during the long exhale, intrathoracic pressure stimulates aortic baroreceptors to release vagal acetylcholine onto the sinoatrial node.'
      }
    ],
    citation: {
      study: 'Balban, Spiegel, Huberman et al., Cell Reports Medicine (2023)',
      pmid: '36630953',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36630953/',
      keyMetric: '#1 Ranked Practice for 24h Respiratory Rate Drop & Positive Affect'
    }
  },

  // ============================================================================
  // 23. COHERENT 5.5s BREATHING (0.1 Hz MAYER WAVE RESONANCE)
  // ============================================================================
  coherent_breathing_mayer_resonance: {
    id: 'coherent_breathing_mayer_resonance',
    tabLabel: '🌊 0.1 Hz HRV Resonance',
    title: '0.1 Hz Cardiorespiratory Phase-Locking (5.5s Inhale / 5.5s Exhale)',
    subtitle: 'Synchronizing Respiratory Sinus Arrhythmia (RSA) with 10s Mayer BP Wave',
    yAxisLabel: 'HRV Amplitude (BPM)',
    yAxisTicks: ['+15 BPM Peak', 'Mean HR', '-15 BPM Trough'],
    xAxisLabels: ['0s', '5.5s (In)', '11.0s (Out)', '16.5s (In)', '22.0s (Out)', '27.5s (In)', '33.0s'],
    colorScheme: 'emerald_teal',
    solidCurve: {
      label: '0.1 Hz Resonance Breathing (5.5s In / 5.5s Out • 4–10× HRV Gain)',
      path: 'M 52,98 C 85,24 115,24 148,98 C 180,168 210,168 242,98 C 275,24 305,24 336,98 C 368,168 398,168 430,98 C 462,24 492,24 525,98',
      areaPath: 'M 52,98 C 85,24 115,24 148,98 C 180,168 210,168 242,98 C 275,24 305,24 336,98 C 368,168 398,168 430,98 C 462,24 492,24 525,98 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Unpaced 15 Breaths/Min (Out-of-Phase Baroreflex • Flat HRV Amplitude)',
      path: 'M 52,98 C 125,82 215,112 315,86 C 415,110 475,88 525,98',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 100,
        y: 42,
        curve: 'solid',
        badge: '📈 5.5s Nasal Inhale (RSA Rise)',
        valueTag: 'Vagal Withdrawal',
        mechanismDetail: 'Smooth 5.5-second inhalation gently withdraws vagal brake, allowing heart rate to rise in phase with thoracic expansion.'
      },
      {
        x: 195,
        y: 152,
        curve: 'solid',
        badge: '📉 5.5s Nasal Exhale (RSA Drop)',
        valueTag: 'Baroreflex Surge',
        mechanismDetail: 'Smooth 5.5-second exhalation coincides with the 10-second endogenous Mayer blood-pressure wave, multiplying baroreceptor sensitivity.'
      },
      {
        x: 336,
        y: 98,
        curve: 'solid',
        badge: '✨ 0.1 Hz Phase-Lock Resonance',
        valueTag: '4–10× RMSSD HRV',
        mechanismDetail: 'At ~5.45 breaths/minute (0.091–0.1 Hz), respiratory and baroreflex loops achieve 0° phase lag, producing the highest possible HRV amplitude in human physiology.'
      }
    ],
    citation: {
      study: 'Lehrer & Gevirtz, Frontiers in Psychology (2014)',
      pmid: '25101026',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25101026/',
      keyMetric: 'Maximal Baroreflex Gain & RMSSD HRV Amplitude at ~0.1 Hz'
    }
  },

  // ============================================================================
  // 24. BOX BREATHING (4-4-4-4 SAMA VRITTI CO2 TOLERANCE)
  // ============================================================================
  box_breathing_co2_tolerance: {
    id: 'box_breathing_co2_tolerance',
    tabLabel: '⏹️ 4-4-4-4 Box Symmetry',
    title: 'Box Breathing (Sama Vritti 4-4-4-4) & Prefrontal CO₂ Vasodilation',
    subtitle: 'Symmetric Dual-Apnea Holds • Central Chemoreceptor Desensitization',
    yAxisLabel: 'Lung Vol & Cerebral O₂',
    yAxisTicks: ['Full Hold (4s)', '50% Midline', 'Empty Hold (4s)'],
    xAxisLabels: ['0s', '4s (Inhale)', '8s (Full Hold)', '12s (Exhale)', '16s (Empty Hold)', '20s (Next)'],
    colorScheme: 'cyan_emerald',
    solidCurve: {
      label: '4s Inhale → 4s Full Hold → 4s Exhale → 4s Empty Hold (3.75 Breaths/Min)',
      path: 'M 52,155 L 155,34 L 275,34 L 385,155 L 495,155 L 525,115',
      areaPath: 'M 52,155 L 155,34 L 275,34 L 385,155 L 495,155 L 525,115 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Arterial PCO₂ & Prefrontal Cerebral Blood Flow (Gentle Hypercapnic Rise)',
      path: 'M 52,135 C 145,115 245,65 365,55 C 445,48 495,42 525,45',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 215,
        y: 34,
        curve: 'solid',
        badge: '⏸️ 4s Full-Lung Retention',
        valueTag: 'Alveolar O₂ Exchange',
        mechanismDetail: 'Holding full lungs equalizes intra-alveolar pressure and distributes paranasal nitric oxide into lower pulmonary capillaries.'
      },
      {
        x: 440,
        y: 155,
        curve: 'solid',
        badge: '🧘‍♂️ 4s Empty-Lung Retention',
        valueTag: 'CO₂ Chemoreceptor Reset',
        mechanismDetail: 'Pausing on empty lungs mildly raises arterial PCO₂, training brainstem chemoreceptors not to trigger amygdala panic under high catecholamine stress.'
      },
      {
        x: 365,
        y: 55,
        curve: 'secondary',
        badge: '🧠 Cerebral Vasodilation',
        valueTag: '+Prefrontal Flow',
        mechanismDetail: 'Mild permissive hypercapnia dilates cerebral arterioles, increasing oxygen delivery to the prefrontal cortex (whereas stress hyperventilation constricts brain blood flow).'
      }
    ],
    citation: {
      study: 'Zaccaro et al., Frontiers in Human Neuroscience (2018)',
      pmid: '30245619',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30245619/',
      keyMetric: 'Enhances Alpha/Theta EEG Coherence & Stress Chemoreceptor Tolerance'
    }
  },

  // ============================================================================
  // 25. 4-7-8 RELAXING BREATHWORK (1:2 INHALE-TO-EXHALE SLEEP ONSET)
  // ============================================================================
  breathing_4_7_8_sleep_latency: {
    id: 'breathing_4_7_8_sleep_latency',
    tabLabel: '🌙 4-7-8 Vagal Sleep Wave',
    title: '4-7-8 Parasympathetic Sleep-Onset Wave (19-Second Cadence)',
    subtitle: '4s Nasal Inhale • 7s Apneic Diffusion Hold • 8s Pursed-Lip Vagal Exhale',
    yAxisLabel: 'Parasympathetic Tone',
    yAxisTicks: ['Peak Vagal Brake', 'Hold Plateau', 'Sympathetic'],
    xAxisLabels: ['0s', '4s (Inhale)', '8s', '11s (7s Hold End)', '15s', '19s (8s Exhale End)'],
    colorScheme: 'purple_cyan',
    solidCurve: {
      label: 'Parasympathetic Vagal Efferent Firing & Baroreceptor Stimulation',
      path: 'M 52,148 L 145,92 L 315,88 C 385,55 445,28 525,24',
      areaPath: 'M 52,148 L 145,92 L 315,88 C 385,55 445,28 525,24 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 315,88 C 385,55 445,28 525,24'
    },
    secondaryCurve: {
      label: 'Resting Heart Rate & Systolic BP (Drops -6 to -10 BPM Across 8s Exhale)',
      path: 'M 52,48 L 145,62 L 315,72 C 385,115 455,148 525,158',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 230,
        y: 90,
        curve: 'solid',
        badge: '⏳ 7-Second Apneic Hold',
        valueTag: 'CO₂ / O₂ Bohr Shift',
        mechanismDetail: 'The 7-second retention builds mild arterial CO₂, triggering the Bohr effect (hemoglobin releases O₂ more readily into tissues and myocardium).'
      },
      {
        x: 445,
        y: 34,
        curve: 'solid',
        badge: '💨 8-Second Audible Exhale',
        valueTag: '1:2 Vagal Ratio',
        mechanismDetail: 'Exhaling for twice the duration of inhalation sustains positive intrathoracic pressure, maximally firing aortic arch baroreceptors.'
      },
      {
        x: 525,
        y: 158,
        curve: 'secondary',
        badge: '🛌 -8 BPM Sleep-Onset Drop',
        valueTag: 'High-Freq HRV ↑',
        mechanismDetail: 'In Vierra et al. (2022), 4-7-8 breathing significantly elevated high-frequency parasympathetic HRV and reduced systolic blood pressure within 4–8 cycles.'
      }
    ],
    citation: {
      study: 'Vierra et al., Physiological Reports (2022)',
      pmid: '35822447',
      url: 'https://pubmed.ncbi.nlm.nih.gov/35822447/',
      keyMetric: 'Significant High-Frequency HRV Gain & Systolic BP Reduction'
    }
  },

  // ============================================================================
  // 26. CYCLIC HYPERVENTILATION (TUMMO / WIM HOF EPINEPHRINE & IL-10)
  // ============================================================================
  cyclic_hyperventilation_epinephrine_il10: {
    id: 'cyclic_hyperventilation_epinephrine_il10',
    tabLabel: '⚡ Epinephrine & +194% IL-10',
    title: 'Cyclic Hyperventilation & Retention: Alkalosis, Epinephrine & IL-10 Surge',
    subtitle: '30 Power Breaths (pH 7.65) → Empty-Lung Hypoxia → β2-Adrenergic Immune Shift',
    yAxisLabel: 'Epinephrine & IL-10',
    yAxisTicks: ['+194% IL-10 Peak', 'Epinephrine Spike', 'Baseline'],
    xAxisLabels: ['30 Breaths', '60s+ Hold', '15s Recovery', '+30m (Epi)', '+90m (IL-10)', '+3h (TNF-α ↓)'],
    colorScheme: 'amber_cyan',
    solidCurve: {
      label: 'Adrenal Epinephrine & Anti-Inflammatory IL-10 Surge (+194% • Kox PNAS)',
      path: 'M 52,148 C 95,115 145,42 195,28 C 255,22 325,26 415,42 C 465,55 500,72 525,85',
      areaPath: 'M 52,148 C 95,115 145,42 195,28 C 255,22 325,26 415,42 C 465,55 500,72 525,85 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 145,42 C 195,28 255,22 325,26'
    },
    secondaryCurve: {
      label: 'Pro-Inflammatory Cytokines TNF-α & IL-6 (Attenuated by -53%)',
      path: 'M 52,85 C 125,88 195,115 285,142 C 365,158 445,162 525,164',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 95,
        y: 115,
        curve: 'solid',
        badge: '💨 30 Deep Breaths (pH ~7.65)',
        valueTag: 'Hypocapnia',
        mechanismDetail: 'Blowing off arterial CO₂ raises blood pH into transient respiratory alkalosis (~7.65), silencing the brainstem chemoreceptor urge to breathe.'
      },
      {
        x: 195,
        y: 28,
        curve: 'solid',
        badge: '🫁 60–90s Empty-Lung Retention',
        valueTag: 'Epinephrine >2×',
        mechanismDetail: 'As SpO₂ dips into a brief hormetic hypoxic window (~65–75%), the adrenal medulla releases a surge of epinephrine Exceeding bungee-jump levels.'
      },
      {
        x: 325,
        y: 26,
        curve: 'solid',
        badge: '🛡️ +194% Anti-Inflammatory IL-10',
        valueTag: '-53% TNF-α / IL-6',
        mechanismDetail: 'Epinephrine binds β2-adrenergic receptors on innate immune leukocytes, boosting anti-inflammatory IL-10 by 194% and cutting pro-inflammatory TNF-α and IL-6 in half.'
      }
    ],
    citation: {
      study: 'Kox, Pickkers et al., PNAS (2014)',
      pmid: '24799686',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24799686/',
      keyMetric: '+194% Anti-Inflammatory IL-10 & -53% Pro-Inflammatory TNF-α'
    }
  },

  // ============================================================================
  // 27. IMST & ISOMETRIC HANDGRIP: ENDOTHELIAL eNOS & -9 mmHg SYSTOLIC BP
  // ============================================================================
  imst_handgrip_bp_reduction: {
    id: 'imst_handgrip_bp_reduction',
    tabLabel: '🫀 -9 mmHg Systolic BP',
    title: 'High-Resistance IMST & Isometric Shear Stress: 6-Week BP Reduction',
    subtitle: '30 Breaths/Day @ 75% PImax (5 Mins) • +45% Brachial Flow-Mediated Dilation',
    yAxisLabel: 'Systolic BP (mmHg)',
    yAxisTicks: ['136 mmHg', '127 mmHg (-9)', '120 mmHg'],
    xAxisLabels: ['Baseline', 'Week 1', 'Week 2', 'Week 4', 'Week 6 (-9 mmHg)', 'Week 8+ (Retained)'],
    colorScheme: 'emerald_teal',
    solidCurve: {
      label: '5-Min/Day High-Resistance IMST + Isometric Handgrip (-9 mmHg Systolic BP)',
      path: 'M 52,38 C 125,48 195,78 275,112 C 345,138 415,148 525,152',
      areaPath: 'M 52,38 C 125,48 195,78 275,112 C 345,138 415,148 525,152 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Endothelial Nitric Oxide (eNOS) & Flow-Mediated Dilation (+45% FMD)',
      path: 'M 52,148 C 125,132 195,95 275,62 C 345,38 415,28 525,24',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 52,
        y: 38,
        curve: 'solid',
        badge: '💨 30 Resistive Breaths (5 Mins)',
        valueTag: '75% PImax',
        mechanismDetail: 'High-resistance inspiratory loading generates large intrathoracic pressure swings that create pulsatile laminar shear stress across the vascular endothelium.'
      },
      {
        x: 275,
        y: 62,
        curve: 'secondary',
        badge: '🧪 +45% Endothelial FMD & eNOS',
        valueTag: 'ROS Superoxide ↓',
        mechanismDetail: 'Shear stress upregulates endothelial nitric oxide synthase (eNOS) and lowers NADPH oxidase superoxide scavenging of nitric oxide.'
      },
      {
        x: 415,
        y: 148,
        curve: 'solid',
        badge: '📉 Week 6: -9 mmHg Systolic Drop',
        valueTag: 'Outperforms 30m Walk',
        mechanismDetail: 'In Craighead & Seals (JAHA 2021), 5 mins/day of IMST lowered casual systolic BP by 9 mmHg—matching first-line antihypertensives and retaining 75% of the drop 6 weeks after stopping.'
      }
    ],
    citation: {
      study: 'Craighead, Seals et al., J Am Heart Assoc (2021)',
      pmid: '34184544',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34184544/',
      keyMetric: '-9 mmHg Systolic BP & +45% Endothelial Function in 6 Weeks'
    }
  },

  // ============================================================================
  // 28. PEPTIDE SECRETAGOGUES TAB 1: NOCTURNAL BIOMIMETIC PULSATILE GH WAVE
  // ============================================================================
  peptide_pulsatile_gh: {
    id: 'peptide_pulsatile_gh',
    tabLabel: '🌊 Biomimetic GH Pulse',
    title: 'Nocturnal Pulsatile GH Secretion vs. Post-Meal Insulin Blunting',
    subtitle: 'CJC-1295 (Mod GRF 1-29) + Ipamorelin • Fasted ≥2h Pre-Bed SWS Synergy',
    yAxisLabel: 'Plasma HGH (ng/mL)',
    yAxisTicks: ['Peak Pulse (3–5×)', 'Natural SWS Pulse', 'Suppressed (0)'],
    xAxisLabels: ['8p (Fasted)', '10p (SubQ Dose)', '11:30p (SWS Pulse 1)', '1:30a (Pulse 2)', '4a (Pulse 3)', '7a'],
    colorScheme: 'cyan_emerald',
    solidCurve: {
      label: 'Fasted ≥2h Pre-Bed Secretagogue (Amplifies Natural Biomimetic SWS Pulses)',
      path: 'M 52,162 L 135,158 C 165,148 188,24 215,24 C 242,24 265,148 295,148 C 322,148 342,68 365,68 C 388,68 412,152 442,152 C 462,152 478,108 495,108 L 525,162',
      areaPath: 'M 52,162 L 135,158 C 165,148 188,24 215,24 C 242,24 265,148 295,148 C 322,148 342,68 365,68 C 388,68 412,152 442,152 C 462,152 478,108 495,108 L 525,162 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 175,92 C 192,32 205,24 215,24 C 228,24 242,45 255,95'
    },
    secondaryCurve: {
      label: 'Dosed Within 2h of Carbs/Fats (Hyperinsulinemia Flatlines Pituitary GH Pulse)',
      path: 'M 52,162 L 135,160 C 175,158 205,136 225,136 C 255,136 315,158 525,164',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 158,
        curve: 'solid',
        badge: '💉 10:00 PM Fasted SubQ Dose',
        valueTag: '≥2h Post-Meal',
        mechanismDetail: 'GHRH (CJC-1295) + selective ghrelin mimetic (Ipamorelin) dual-key the anterior pituitary somatotrophs without spiking cortisol or prolactin.'
      },
      {
        x: 215,
        y: 24,
        curve: 'solid',
        badge: '🌊 11:30 PM SWS Biomimetic Pulse',
        valueTag: '3–5× Amplitude',
        mechanismDetail: 'Synchronizes with NREM Stage 3 Slow-Wave Sleep to amplify the body’s primary nocturnal GH pulse while preserving natural trough periods and IGF-1 feedback.'
      },
      {
        x: 225,
        y: 136,
        curve: 'secondary',
        badge: '⚠️ Insulin & FFA Somatostatin Block',
        valueTag: '-80% Blunted',
        mechanismDetail: 'Circulating insulin and free fatty acids from a late meal stimulate hypothalamic somatostatin, which acts as a hard brake on pituitary GH release.'
      }
    ],
    citation: {
      study: 'Teichman et al., J Clin Endocrinol Metab (2006)',
      pmid: '16352683',
      url: 'https://pubmed.ncbi.nlm.nih.gov/16352683/',
      keyMetric: '2–10× Pulsatile GH & IGF-1 Elevation With Preserved Circadian Troughs'
    }
  },

  // ============================================================================
  // 29. PEPTIDE CYCLING TAB 2: 8-WEEK ON / 4-WEEK OFF RECEPTOR SENSITIVITY
  // ============================================================================
  peptide_receptor_cycle: {
    id: 'peptide_receptor_cycle',
    tabLabel: '🔄 8-Wk On / 4-Wk Washout',
    title: 'Peptide Cycle Intelligence: Preventing Receptor Tachyphylaxis (8w On / 4w Off)',
    subtitle: 'GHRH / GHS-R1a Receptor Resensitization • 5-On / 2-Off Weekly Micro-Cycle',
    yAxisLabel: 'Receptor Sensitivity',
    yAxisTicks: ['100% Sensitive', '75% Active', '40% Desensitized'],
    xAxisLabels: ['Wk 1', 'Wk 4', 'Wk 8 (Cycle End)', 'Wk 10 (Washout)', 'Wk 12 (100% Reset)', 'Cycle 2'],
    colorScheme: 'purple_cyan',
    phaseZones: [
      { x: 52, width: 225, label: '8-WEEK ACTIVE ANABOLIC PHASE', tint: 'cyan' },
      { x: 277, width: 155, label: '4-WEEK RECEPTOR WASHOUT', tint: 'purple' },
      { x: 432, width: 95, label: 'CYCLE 2 READY', tint: 'emerald' }
    ],
    solidCurve: {
      label: 'Cycled Protocol (8 Wks On + 4 Wks Off • Restores 100% Receptor Density)',
      path: 'M 52,28 C 125,30 205,42 277,58 C 325,48 375,32 432,26 C 475,26 505,30 525,34',
      areaPath: 'M 52,28 C 125,30 205,42 277,58 C 325,48 375,32 432,26 C 475,26 505,30 525,34 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Continuous Uncycled Dosing (β-Arrestin Internalization & Diminishing ROI)',
      path: 'M 52,28 C 125,35 205,52 277,72 C 355,112 435,142 525,158',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 165,
        y: 36,
        curve: 'solid',
        badge: '🧬 Weeks 1–8: Peak Signaling',
        valueTag: '5-On / 2-Off',
        mechanismDetail: 'Pairing 5 days on / 2 days off weekly with an 8-to-12 week macro-cycle maintains high pituitary GHS-R1a and tissue angiogenesis receptor expression.'
      },
      {
        x: 277,
        y: 58,
        curve: 'solid',
        badge: '🔄 Week 8: Initiate 4-Wk Washout',
        valueTag: 'Receptor Reset',
        mechanismDetail: 'Stopping exogenous peptide stimulation at Week 8–12 prevents β-arrestin-mediated receptor internalization and allows endogenous feedback loops to normalize.'
      },
      {
        x: 432,
        y: 26,
        curve: 'solid',
        badge: '✨ Week 12: 100% Resensitized',
        valueTag: 'Full Potency',
        mechanismDetail: 'After a 4-week washout, cell-surface receptor density returns to 100% baseline sensitivity for the next therapeutic cycle.'
      }
    ],
    citation: {
      study: ' Alba et al., Endocrinology (2006) / Chang et al.',
      pmid: '16763060',
      url: 'https://pubmed.ncbi.nlm.nih.gov/16763060/',
      keyMetric: 'Pulsatile & Cycled Administration Prevents GHRH Receptor Downregulation'
    }
  },

  // ============================================================================
  // 30. SENOLYTIC "HIT-AND-RUN" PULSE (FISETIN + QUERCETIN MAYO PROTOCOL)
  // ============================================================================
  senolytic_hit_and_run_clearance: {
    id: 'senolytic_hit_and_run_clearance',
    tabLabel: '🧹 Senolytic Hit-and-Run',
    title: '"Hit-and-Run" Senolytic Pulse: Senescent Cell Apoptosis & Stem Renewal',
    subtitle: '2-Day High-Dose Fisetin (20mg/kg) + Quercetin • BCL-2 / PI3K SCAP Inhibition',
    yAxisLabel: 'Senescent Cell Burden',
    yAxisTicks: ['100% SASP Burden', '60% (-40% Cleared)', 'Progenitor Renewal'],
    xAxisLabels: ['Pre-Pulse', 'Day 1–2 (Pulse)', 'Day 5', 'Day 14', 'Day 21', 'Day 30 (Recovered)'],
    colorScheme: 'emerald_teal',
    phaseZones: [
      { x: 95, width: 95, label: '48h APOPTOSIS PULSE', tint: 'amber' },
      { x: 190, width: 335, label: '28-DAY PROGENITOR REGENERATION WINDOW', tint: 'emerald' }
    ],
    solidCurve: {
      label: 'Monthly 2-Day High-Dose Pulse (Crosses SCAP Threshold → -40% Zombie Cells)',
      path: 'M 52,42 L 105,42 C 135,48 165,125 215,138 C 285,148 395,146 525,135',
      areaPath: 'M 52,42 L 105,42 C 135,48 165,125 215,138 C 285,148 395,146 525,135 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Daily Low-Dose Micro-Dosing (Never Crosses Apoptosis Threshold)',
      path: 'M 52,42 C 175,45 325,48 525,52',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 65,
        curve: 'solid',
        badge: '💊 Day 1–2: High-Dose Pulse + EVOO',
        valueTag: 'SCAP Inhibition',
        mechanismDetail: 'Senescent ("zombie") cells rely on pro-survival Senescent Cell Anti-Apoptotic Pathways (SCAPs like BCL-2/BCL-xL). Only a concentrated high-dose pulse crosses the threshold to disable SCAPs.'
      },
      {
        x: 215,
        y: 138,
        curve: 'solid',
        badge: '🧹 Day 5–7: -35% to -50% Clearance',
        valueTag: 'SASP Silenced',
        mechanismDetail: 'Once SCAPs are transiently blocked for 24–48 hours, senescent cells undergo irreversible apoptosis and are cleared by macrophages, slashing inflammatory SASP cytokines.'
      },
      {
        x: 415,
        y: 142,
        curve: 'solid',
        badge: '🌱 Day 7–30: Stem Cell Repopulation',
        valueTag: '4–6 Wk Re-Accumulation',
        mechanismDetail: 'Because new senescent cells take 4–6 weeks to re-accumulate, the 28-day drug-free window allows healthy tissue stem cells to divide without off-target suppression.'
      }
    ],
    citation: {
      study: 'Kirkland & Tchkonia, Journal of Internal Medicine (2020)',
      pmid: '32686219',
      url: 'https://pubmed.ncbi.nlm.nih.gov/32686219/',
      keyMetric: 'Intermittent "Hit-and-Run" Dosing Clears Senescent Cells Safely'
    }
  },

  // ============================================================================
  // 31. NAD+ & SIRTUIN EPIGENETIC RESTORATION ACROSS AGING
  // ============================================================================
  nad_sirtuin_age_restoration: {
    id: 'nad_sirtuin_age_restoration',
    tabLabel: '🧬 NAD+ & Sirtuin Curve',
    title: 'Intracellular NAD+ Decline Across Aging & Precursor + SIRT1/3 Restoration',
    subtitle: 'CD38 / PARP1 Consumption vs. NMN/NR Salvage Pathway + TMG Methyl Support',
    yAxisLabel: 'Cellular NAD+ Pool',
    yAxisTicks: ['100% Youthful', '75% Restored', '50% Aged Decline'],
    xAxisLabels: ['Age 20', 'Age 30', 'Age 40 (Start)', 'Age 50', 'Age 60', 'Age 70'],
    colorScheme: 'purple_cyan',
    solidCurve: {
      label: 'NMN/NR + AMPK/SIRT1 Activators + TMG (Restores Youthful NAD+ Flux)',
      path: 'M 52,32 C 115,45 175,68 235,88 C 285,55 345,44 415,46 C 465,48 500,52 525,55',
      areaPath: 'M 52,32 C 115,45 175,68 235,88 C 285,55 345,44 415,46 C 465,48 500,52 525,55 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 235,88 C 285,55 345,44 415,46'
    },
    secondaryCurve: {
      label: 'Unmitigated Aging (CD38 Inflammation Consumes ~50% of NAD+ by Age 60)',
      path: 'M 52,32 C 145,58 245,92 345,125 C 425,148 485,158 525,164',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 235,
        y: 88,
        curve: 'solid',
        badge: '📉 Age 40–50: CD38 NAD+ Drain',
        valueTag: '-35% to -50% Drop',
        mechanismDetail: 'Chronic inflammasome activation upregulates CD38 ectoenzymes and PARP1 DNA-damage sensors, draining intracellular NAD+ needed by mitochondrial sirtuins.'
      },
      {
        x: 345,
        y: 44,
        curve: 'solid',
        badge: '⛽ NMN/NR Fuel + Sirtuin Pedal',
        valueTag: '+60–100% Blood NAD+',
        mechanismDetail: 'Replenishing the NAMPT salvage pathway with NMN/NR while activating AMPK/SIRT1 restores mitochondrial biogenesis (PGC-1α) and epigenetic histone deacetylation.'
      },
      {
        x: 465,
        y: 48,
        curve: 'solid',
        badge: '🛡️ TMG Methyl-Pool Protection',
        valueTag: 'Homocysteine Safe',
        mechanismDetail: 'Pairing NAD+ precursors with Trimethylglycine (TMG / Betaine) replenishes SAMe methyl groups consumed when excess nicotinamide is cleared via NNMT.'
      }
    ],
    citation: {
      study: 'Covarrubias, Verdin et al., Nat Rev Mol Cell Biol (2021)',
      pmid: '33353981',
      url: 'https://pubmed.ncbi.nlm.nih.gov/33353981/',
      keyMetric: 'Reverses ~50% Age-Related NAD+ Decline & Restores SIRT1/3 Mitophagy'
    }
  },

  // ============================================================================
  // 32. APOB CUMULATIVE ARTERIAL PLAQUE EXPOSURE ("PACK-YEARS OF APOB")
  // ============================================================================
  apob_cumulative_plaque_exposure: {
    id: 'apob_cumulative_plaque_exposure',
    tabLabel: '🩸 Cumulative ApoB Slope',
    title: 'Cumulative Arterial Lipoprotein Exposure ("ApoB Pack-Years") Across Life',
    subtitle: 'Area-Under-the-Curve (ApoB × Decades) vs. Clinical ASCVD Event Horizon',
    yAxisLabel: 'Coronary Plaque Burden',
    yAxisTicks: ['Event Horizon', 'Subclinical Plaque', 'Clean Endothelium'],
    xAxisLabels: ['Age 25', 'Age 35', 'Age 45 (Lower ApoB)', 'Age 55', 'Age 65', 'Age 75', 'Age 85'],
    colorScheme: 'cyan_emerald',
    thresholdLine: {
      y: 54,
      label: '🚨 Clinical ASCVD Event Horizon (Cumulative Plaque Rupture / MI Threshold)',
      color: '#f43f5e'
    },
    solidCurve: {
      label: 'Optimal ApoB (<60 mg/dL • Bends Cumulative Slope Below Event Horizon)',
      path: 'M 52,162 C 115,150 175,134 235,118 C 315,110 415,102 525,94',
      areaPath: 'M 52,162 C 115,150 175,134 235,118 C 315,110 415,102 525,94 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Untreated "Normal" ApoB (>105 mg/dL • Crosses Event Horizon at Age 62)',
      path: 'M 52,162 C 135,142 215,118 295,88 C 365,58 435,34 525,18',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 235,
        y: 118,
        curve: 'solid',
        badge: '🎯 Age 35–45: Lower ApoB <60 mg/dL',
        valueTag: 'Slope Flattened',
        mechanismDetail: 'Atherosclerosis is driven by the total number of ApoB-containing particles (LDL, VLDL, Lp(a)) multiplied by years of arterial wall exposure.'
      },
      {
        x: 375,
        y: 54,
        curve: 'secondary',
        badge: '🚨 Age 62: Crosses Event Horizon',
        valueTag: 'ApoB >105 mg/dL',
        mechanismDetail: 'Waiting until a 10-year Framingham risk calculator flags "high risk" in your 60s allows decades of subendothelial ApoB retention and calcification.'
      },
      {
        x: 525,
        y: 94,
        curve: 'solid',
        badge: '🛡️ Age 85: Zero Clinical ASCVD',
        valueTag: 'Below Threshold',
        mechanismDetail: 'Keeping ApoB in the 5th–10th percentile (<60 mg/dL via fiber/sterols, lipid management, and EPA/DHA) prevents cumulative plaque from ever reaching the clinical threshold.'
      }
    ],
    citation: {
      study: 'Ference et al., European Heart Journal (2017)',
      pmid: '28444290',
      url: 'https://pubmed.ncbi.nlm.nih.gov/28444290/',
      keyMetric: 'Plaque Burden Is Directly Proportional to Cumulative Lifetime ApoB Exposure'
    }
  },

  // ============================================================================
  // 33. GLYMPHATIC BRAIN FLUSH (+60% INTERSTITIAL EXPANSION IN NREM SWS)
  // ============================================================================
  glymphatic_brain_clearance_wave: {
    id: 'glymphatic_brain_clearance_wave',
    tabLabel: '🧠 +60% Glymphatic Flush',
    title: 'Nocturnal Glymphatic Convective Flush (+60% Glial Channel Expansion)',
    subtitle: 'Astrocyte AQP4 Water Channels • Lateral Side-Sleeping + NREM Delta Waves',
    yAxisLabel: 'CSF Amyloid Clearance',
    yAxisTicks: ['+60% Peak Flush', 'Moderate', 'Awake (10% Basal)'],
    xAxisLabels: ['Awake', '10p (Bed)', '11:30p (SWS 1)', '1:30a (SWS 2)', '3:30a', '5:30a', '7a'],
    colorScheme: 'purple_cyan',
    solidCurve: {
      label: 'Lateral Sleep + Nasal NO + Deep NREM Delta (+60% Interstitial Clearance)',
      path: 'M 52,160 L 115,155 C 145,112 175,26 215,24 C 255,22 295,45 345,78 C 405,115 465,145 525,158',
      areaPath: 'M 52,160 L 115,155 C 145,112 175,26 215,24 C 255,22 295,45 345,78 C 405,115 465,145 525,158 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 165,48 C 190,26 215,24 265,34'
    },
    secondaryCurve: {
      label: 'Supine / Mouth-Breathing / Fragmented Sleep (>50% Reduced Amyloid Washout)',
      path: 'M 52,160 L 115,158 C 155,142 195,108 235,106 C 295,104 385,138 525,160',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 52,
        y: 160,
        curve: 'solid',
        badge: '☀️ Awake: High Norepinephrine',
        valueTag: 'Channels Closed',
        mechanismDetail: 'During waking consciousness, tonic locus coeruleus norepinephrine swells cortical cells, restricting interstitial space to ~14% of brain volume.'
      },
      {
        x: 215,
        y: 24,
        curve: 'solid',
        badge: '🌊 11:30 PM NREM Delta + Lateral',
        valueTag: '+60% Interstitial Space',
        mechanismDetail: 'During synchronized NREM Stage 3 Delta waves in the lateral (side) sleeping posture, glial cells shrink by 60%, pumping CSF through AQP4 channels to flush β-amyloid and tau.'
      },
      {
        x: 235,
        y: 106,
        curve: 'secondary',
        badge: '⚠️ Supine / Mouth Breathing',
        valueTag: 'Impaired Drainage',
        mechanismDetail: 'Supine posture and oral breathing increase upper-airway resistance and jugular venous backpressure, blunting convective glymphatic CSF transport.'
      }
    ],
    citation: {
      study: 'Xie, Nedergaard et al., Science (2013) / Lee et al. (2015)',
      pmid: '24136970',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24136970/',
      keyMetric: '+60% Interstitial Space Expansion & 2× β-Amyloid Clearance in Deep SWS'
    }
  },

  // ============================================================================
  // 34. GUT MICROBIOME: STANFORD FERMENTED FOOD DIVERSITY vs. IL-6 CURVE
  // ============================================================================
  gut_microbiome_fermented_diversity: {
    id: 'gut_microbiome_fermented_diversity',
    tabLabel: '🦠 Diversity vs. IL-6 Drop',
    title: 'Stanford Fermented Food RCT: Microbiome Alpha-Diversity vs. Systemic IL-6',
    subtitle: '6 Servings/Day Fermented Foods + Akkermansia + Tributyrin Butyrate',
    yAxisLabel: 'Diversity & Cytokines',
    yAxisTicks: ['Peak Diversity', 'Baseline', '-19 Cytokines (IL-6)'],
    xAxisLabels: ['Baseline', 'Week 2', 'Week 4', 'Week 6', 'Week 8', 'Week 10 (Stanford RCT)'],
    colorScheme: 'emerald_teal',
    solidCurve: {
      label: 'Gut Microbiome Alpha-Diversity & Muc2 Mucin Barrier Thickness (Rising)',
      path: 'M 52,135 C 125,125 205,98 295,68 C 385,42 455,28 525,24',
      areaPath: 'M 52,135 C 125,125 205,98 295,68 C 385,42 455,28 525,24 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: '19 Inflammatory Cytokines Including IL-6, IL-12b & LPS Endotoxemia (Falling)',
      path: 'M 52,48 C 125,58 205,85 295,115 C 385,142 455,155 525,160',
      style: 'crossover_partner'
    },
    nodes: [
      {
        x: 165,
        y: 112,
        curve: 'solid',
        badge: '🥣 Weeks 1–4: Fermented Remodeling',
        valueTag: '6 Servings/Day',
        mechanismDetail: 'Live lactic acid bacteria and postbiotic metabolites from kefir, kimchi, sauerkraut, and yogurt remodel resident commensal taxa.'
      },
      {
        x: 345,
        y: 54,
        curve: 'solid',
        badge: '🛡️ Week 6–8: Mucin & Tight Junctions',
        valueTag: 'Akkermansia + Butyrate',
        mechanismDetail: 'Tributyrin (colonocyte fuel) and Akkermansia muciniphila stimulate goblet-cell Muc2 mucin renewal and seal ZO-1/Occludin tight junctions against LPS leak.'
      },
      {
        x: 525,
        y: 160,
        curve: 'secondary',
        badge: '📉 Week 10: -19 Inflammatory Cytokines',
        valueTag: 'IL-6 & IL-12b ↓',
        mechanismDetail: 'In Wastyk & Sonnenburg (Cell 2021), high-fermented intake monotonically increased microbial diversity and decreased 19 inflammatory proteins including IL-6.'
      }
    ],
    citation: {
      study: 'Wastyk, Sonnenburg et al., Cell (2021)',
      pmid: '34256014',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34256014/',
      keyMetric: 'Increased Microbiome Diversity & Reduced 19 Inflammatory Cytokines (IL-6)'
    }
  },

  // ============================================================================
  // 35. RETINAL MITOCHONDRIA: 670nm MORNING CIRCADIAN GATE vs. AFTERNOON
  // ============================================================================
  retinal_mitochondria_670nm_gate: {
    id: 'retinal_mitochondria_670nm_gate',
    tabLabel: '👁️ 8–11 AM 670nm Gate',
    title: 'Circadian-Gated Retinal Photoreceptor Sensitivity (Morning vs. Afternoon 670nm)',
    subtitle: '3 Mins @ 670nm (8 mW/cm²) • Cone Mitochondrial Complex IV ATP Recharge',
    yAxisLabel: 'Cone Contrast Gain (%)',
    yAxisTicks: ['+20% Peak Gain', '+10%', '0% Baseline'],
    xAxisLabels: ['Pre', '8–11 AM (3m Dose)', 'Day 1', 'Day 3', 'Day 5', 'Day 7 (Sustained)'],
    colorScheme: 'rose_amber',
    solidCurve: {
      label: 'Morning 8–11 AM 670nm Exposure (+17–22% Color Contrast Gain for 7 Days)',
      path: 'M 52,155 C 85,148 115,38 155,28 C 215,22 315,34 415,52 C 465,62 500,72 525,78',
      areaPath: 'M 52,155 C 85,148 115,38 155,28 C 215,22 315,34 415,52 C 465,62 500,72 525,78 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 115,38 C 155,28 215,22 315,34'
    },
    secondaryCurve: {
      label: 'Afternoon 12–5 PM 670nm Exposure (0% Contrast Gain • Circadian Gate Closed)',
      path: 'M 52,155 C 145,152 285,154 525,155',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 155,
        y: 28,
        curve: 'solid',
        badge: '🔴 8:00–11:00 AM Morning Gate',
        valueTag: '+17–22% Contrast',
        mechanismDetail: 'Retinal photoreceptors have the highest mitochondrial density in the body; their ATP production is circadian-gated and receptive to 670nm photons only in the morning.'
      },
      {
        x: 285,
        y: 154,
        curve: 'secondary',
        badge: '🚫 12:00–5:00 PM Afternoon Dose',
        valueTag: '0% Improvement',
        mechanismDetail: 'In Shinhmar & Jeffery (UCL 2021), identical 3-minute 670nm exposure in the afternoon yielded zero improvement in tritan or protan cone color contrast.'
      },
      {
        x: 525,
        y: 78,
        curve: 'solid',
        badge: '🔋 7-Day Mitochondrial Charge',
        valueTag: '1×/Wk Sufficient',
        mechanismDetail: 'A single 3-minute morning 670nm session recharges photoreceptor cytochrome c oxidase pumps for up to 1 full week.'
      }
    ],
    citation: {
      study: 'Shinhmar, Jeffery et al., Scientific Reports (2021)',
      pmid: '34819532',
      url: 'https://pubmed.ncbi.nlm.nih.gov/34819532/',
      keyMetric: '+17% to +22% Cone Contrast From Morning 670nm vs. 0% in Afternoon'
    }
  },

  // ============================================================================
  // 36. HAIR FOLLICLE ANAGEN REVIVAL (WNT/β-CATENIN vs. DHT MINIATURIZATION)
  // ============================================================================
  hair_follicle_anagen_revival: {
    id: 'hair_follicle_anagen_revival',
    tabLabel: '🌱 Anagen Follicle Curve',
    title: 'Follicular Dermal Papilla Remodeling: Wnt/β-Catenin vs. DHT Miniaturization',
    subtitle: '1.5mm Weekly Microneedling + 655nm LLLT + 5α-Reductase Attenuation',
    yAxisLabel: 'Terminal Hair Density',
    yAxisTicks: ['+35 Hairs/cm²', 'Baseline (0)', 'Miniaturized (-15)'],
    xAxisLabels: ['Week 0', 'Week 4 (Shed/Reset)', 'Week 8', 'Week 12 (Dhurat RCT)', 'Week 18', 'Week 24'],
    colorScheme: 'emerald_teal',
    solidCurve: {
      label: 'Microneedling + 655nm LLLT + Rosemary/Saw Palmetto (+35 Hairs/cm²)',
      path: 'M 52,118 C 95,122 135,112 185,88 C 255,58 335,38 425,28 L 525,22',
      areaPath: 'M 52,118 C 95,122 135,112 185,88 C 255,58 335,38 425,28 L 525,22 L 525,175 L 52,175 Z'
    },
    secondaryCurve: {
      label: 'Untreated DHT Follicular Miniaturization (Progressive Anagen Shortening)',
      path: 'M 52,118 C 145,126 265,140 395,154 L 525,164',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 112,
        curve: 'solid',
        badge: '🩸 Wk 1–4: PDGF/VEGF & Wnt Launch',
        valueTag: '1.5mm Dermastamp',
        mechanismDetail: 'Weekly 1.5mm micro-channels trigger platelet-derived growth factor (PDGF), VEGF angiogenesis, and Wnt3a/β-catenin stem cell signaling in the hair bulge.'
      },
      {
        x: 335,
        y: 38,
        curve: 'solid',
        badge: '📈 Wk 12: Telogen-to-Anagen Shift',
        valueTag: '4× Topical Alone',
        mechanismDetail: 'In Dhurat et al., adding weekly microneedling increased hair count 4× more than topical therapy alone (+91.4 vs +22.2 hairs) while 655nm LLLT boosts follicular ATP.'
      },
      {
        x: 525,
        y: 22,
        curve: 'solid',
        badge: '🛡️ Wk 24: Terminal Shaft Diameter',
        valueTag: 'DHT Shielded',
        mechanismDetail: 'Local 5α-reductase inhibition (Saw Palmetto / Pumpkin Seed / Rosemary carnosic acid) prevents DHT from re-miniaturizing newly recruited terminal follicles.'
      }
    ],
    citation: {
      study: 'Dhurat et al., International Journal of Trichology (2013)',
      pmid: '23960389',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23960389/',
      keyMetric: '4.1× Greater Hair Count Increase With Weekly 1.5mm Microneedling'
    }
  },

  // ============================================================================
  // 37. FULL-BODY LYMPHATIC FLUSH & MICROVASCULAR DECONGESTION
  // ============================================================================
  lymphatic_microvascular_flush: {
    id: 'lymphatic_microvascular_flush',
    tabLabel: '💧 4–6× Lymphatic Pump',
    title: 'Lymphatic Unidirectional Valve Pumping & Interstitial Edema Clearance',
    subtitle: 'Vertical G-Force Rebounding • Pneumatic Gradient • Contrast Vasomotion',
    yAxisLabel: 'Lymphatic Flow Rate',
    yAxisTicks: ['5× Peak Drainage', '2.5× Moderate', '1× Static Pool'],
    xAxisLabels: ['Static Sit', 'Dry Brush', 'Rebounding (±2G)', 'Pneumatic Boots', '+30m Post', '+2h Clear'],
    colorScheme: 'cyan_emerald',
    solidCurve: {
      label: 'Rebounding + Pneumatic Compression + Contrast Flush (4–6× Lymph Flow)',
      path: 'M 52,155 C 95,142 135,108 185,48 C 235,24 295,24 355,38 C 415,58 475,88 525,105',
      areaPath: 'M 52,155 C 95,142 135,108 185,48 C 235,24 295,24 355,38 C 415,58 475,88 525,105 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 185,48 C 235,24 295,24 355,38'
    },
    secondaryCurve: {
      label: 'Prolonged Static Sitting / Standing (Lower-Limb Interstitial Pooling)',
      path: 'M 52,155 C 165,158 315,162 525,165',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 135,
        y: 108,
        curve: 'solid',
        badge: '🪥 Centripetal Superficial Primer',
        valueTag: 'Subdermal Plexus',
        mechanismDetail: 'Centripetal dry brushing opens initial anchoring filaments in subdermal lymphatic capillaries toward axillary and inguinal nodes.'
      },
      {
        x: 235,
        y: 24,
        curve: 'solid',
        badge: '🚀 Rebounding (±2G Valve Cycle)',
        valueTag: '5× Lymph Flow',
        mechanismDetail: 'At the bottom of each bounce (+2G), pressure closes one-way lymphangion valves; at the apex (0G weightlessness), differential pressure sucks interstitial fluid upward.'
      },
      {
        x: 355,
        y: 38,
        curve: 'solid',
        badge: '🦵 Distal-to-Proximal Peristalsis',
        valueTag: '60–80 mmHg Gradient',
        mechanismDetail: 'Sequential pneumatic compression and hot/cold vascular contrast flush pooled lactate, cellular debris, and inflammatory cytokines into the thoracic duct.'
      }
    ],
    citation: {
      study: 'Zaleska et al., Lymphatic Research and Biology (2014)',
      pmid: '24865768',
      url: 'https://pubmed.ncbi.nlm.nih.gov/24865768/',
      keyMetric: '4–6× Interstitial Lymphatic Clearance & Rapid Edema Decongestion'
    }
  },

  // ============================================================================
  // 38. CREATINE MONOHYDRATE: MUSCLE PCr SATURATION (5g) & BRAIN ATP (10g)
  // ============================================================================
  creatine_atp_pcr_saturation: {
    id: 'creatine_atp_pcr_saturation',
    tabLabel: '⚡ 5g PCr & Brain ATP',
    title: 'Creatine Monohydrate: 5g Daily Muscle Saturation & 10g Cerebral ATP Shield',
    subtitle: 'SLC6A8 Creatine Transporter • Phosphocreatine (PCr) ATP Regeneration',
    yAxisLabel: 'Tissue PCr / ATP Pool',
    yAxisTicks: ['+20% Saturated', '+10% Loading', 'Baseline Pool'],
    xAxisLabels: ['Day 0', 'Day 7', 'Day 14', 'Day 21', 'Day 28 (5g/d)', 'Sleep Debt (10g)'],
    colorScheme: 'cyan_emerald',
    phaseZones: [
      { x: 52, width: 220, label: '5g/DAY MUSCLE SATURATION', tint: 'cyan' },
      { x: 350, width: 175, label: '10g BRAIN / SLEEP-DEBT SHIELD', tint: 'emerald' }
    ],
    solidCurve: {
      label: '5g Daily Monohydrate (+20% Muscle PCr & +14% Working Memory)',
      path: 'M 52,148 C 115,122 185,78 265,44 C 335,28 415,26 525,24',
      areaPath: 'M 52,148 C 115,122 185,78 265,44 C 335,28 415,26 525,24 L 525,175 L 52,175 Z',
      peakHighlightPath: 'M 265,44 C 335,28 415,26 525,24'
    },
    secondaryCurve: {
      label: 'Unsupplemented Baseline (Rapid ATP Drop Under High Load / Sleep Debt)',
      path: 'M 52,148 C 175,148 310,150 385,154 C 440,162 485,168 525,170',
      style: 'dashed_warning'
    },
    nodes: [
      {
        x: 115,
        y: 122,
        curve: 'solid',
        badge: '💧 5g Daily Micronized Dose',
        valueTag: '5g / Day',
        mechanismDetail: '5g daily of micronized creatine monohydrate enters skeletal myocytes via sodium-dependent SLC6A8 transporters without requiring a 20g GI-distressing loading phase.'
      },
      {
        x: 265,
        y: 44,
        curve: 'solid',
        badge: '💪 Day 21–28 Full PCr Saturation',
        valueTag: '+20% PCr Pool',
        mechanismDetail: 'Intramuscular phosphocreatine (PCr) stores reach 100% saturation (+20–25% above baseline), donating phosphate groups via creatine kinase to regenerate ATP during heavy sets (+8–14% power output).'
      },
      {
        x: 415,
        y: 160,
        curve: 'secondary',
        badge: '⚠️ Unbuffered Sleep-Debt Brain ATP Drop',
        valueTag: '-18% Brain ATP',
        mechanismDetail: 'Without supplemental creatine, sleep restriction or intense executive cognitive work rapidly depletes prefrontal phosphocreatine and drops brain pH.'
      },
      {
        x: 495,
        y: 25,
        curve: 'solid',
        badge: '🧠 10g Brain & Sleep-Deprivation Shield',
        valueTag: '+14% Memory',
        mechanismDetail: 'Higher daily or acute dosing (10g) crosses the blood-brain barrier to elevate cerebral PCr, reversing sleep-deprivation cognitive fatigue and improving working memory.'
      }
    ],
    citation: {
      study: 'Gordji-Nejad et al., Sci Rep (2024) & Kreider et al., JISSN (2017)',
      pmid: '38418464',
      url: 'https://pubmed.ncbi.nlm.nih.gov/38418464/',
      keyMetric: '5g/d Saturates Muscle PCr (+20%) & 10g Reverses Brain Fatigue'
    }
  }
}

// ============================================================================
// INTELLIGENT RESOLVERS FOR APPLETS, MODALITIES, AND PROTOCOLS
// ============================================================================

const APPLET_KEY_TO_CURVES: Record<string, string[]> = {
  morning_sunlight: ['morning_sunlight_car', 'caffeine_adenosine_kinetics'],
  red_light_mask: ['red_light_arndt_schulz_biphasic'],
  cold_plunge: ['cold_plunge_catecholamines', 'cold_plunge_soberg_rewarm', 'cold_hypertrophy_interference'],
  sauna: ['sauna_hsp70_gh_cardio', 'sauna_frequency_mortality_curve'],
  glucose_walk: ['postprandial_glucose_walk'],
  zone_2_cardio: ['zone_2_lactate_fat_crossover', 'attia_centenarian_marginal_decade'],
  hiit_norwegian_4x4: ['norwegian_4x4_vo2_wave', 'attia_centenarian_marginal_decade'],
  strength_bfr: ['strength_bfr_isometric_recruitment', 'bone_density_mechanostat_threshold', 'imst_handgrip_bp_reduction'],
  cyclic_sighing: ['cyclic_sighing_vagal_brake'],
  box_breathing: ['box_breathing_co2_tolerance'],
  breathing_4_7_8: ['breathing_4_7_8_sleep_latency'],
  coherent_breathing: ['coherent_breathing_mayer_resonance'],
  cyclic_hyperventilation: ['cyclic_hyperventilation_epinephrine_il10'],
  yoga_nidra: ['nsdr_striatal_dopamine_reset'],
  fasting: ['fasting_metabolic_switch_autophagy', 'postprandial_glucose_walk'],
  peptide_reconstitution: ['peptide_pulsatile_gh', 'peptide_receptor_cycle']
}

export function getBiologicalCurvesForApplet(
  appletKey?: string | null,
  modalityName?: string | null
): BiologicalCurveSpec[] {
  const key = (appletKey || '').trim().toLowerCase()
  if (key && APPLET_KEY_TO_CURVES[key]) {
    return APPLET_KEY_TO_CURVES[key]
      .map(id => BIOLOGICAL_CURVES_REGISTRY[id])
      .filter(Boolean)
  }
  return getBiologicalCurvesForModality(appletKey, modalityName)
}

export function getBiologicalCurvesForProtocol(
  protocolId?: string | null,
  protocolName?: string | null
): BiologicalCurveSpec[] {
  const text = `${protocolId || ''} ${protocolName || ''}`.toLowerCase()

  if (text.includes('huberman') || text.includes('morning_routine') || text.includes('morning routine')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.morning_sunlight_car,
      BIOLOGICAL_CURVES_REGISTRY.caffeine_adenosine_kinetics,
      BIOLOGICAL_CURVES_REGISTRY.cold_plunge_catecholamines
    ]
  }
  if (text.includes('sleep') || text.includes('walker') || text.includes('wind_down') || text.includes('circadian')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.sleep_thermoregulation_core_temp,
      BIOLOGICAL_CURVES_REGISTRY.evening_blue_light_melatonin,
      BIOLOGICAL_CURVES_REGISTRY.caffeine_cutoff_half_life
    ]
  }
  if (text.includes('glymphatic')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.glymphatic_brain_clearance_wave,
      BIOLOGICAL_CURVES_REGISTRY.sleep_thermoregulation_core_temp
    ]
  }
  if (text.includes('gut') || text.includes('microbiome') || text.includes('mucin')) {
    return [BIOLOGICAL_CURVES_REGISTRY.gut_microbiome_fermented_diversity]
  }
  if (text.includes('retinal') || text.includes('vision') || text.includes('eye') || text.includes('670')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.retinal_mitochondria_670nm_gate,
      BIOLOGICAL_CURVES_REGISTRY.red_light_arndt_schulz_biphasic
    ]
  }
  if (text.includes('arterial') || text.includes('endothelial') || text.includes('blood_pressure') || text.includes('imst')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.imst_handgrip_bp_reduction,
      BIOLOGICAL_CURVES_REGISTRY.apob_cumulative_plaque_exposure
    ]
  }
  if (text.includes('bone') || text.includes('trabecular') || text.includes('liftmor') || text.includes('osteopenia')) {
    return [BIOLOGICAL_CURVES_REGISTRY.bone_density_mechanostat_threshold]
  }
  if (text.includes('hair') || text.includes('follicular') || text.includes('anagen') || text.includes('scalp')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.hair_follicle_anagen_revival,
      BIOLOGICAL_CURVES_REGISTRY.red_light_arndt_schulz_biphasic
    ]
  }
  if (text.includes('lymph') || text.includes('microvascular') || text.includes('decongestion')) {
    return [BIOLOGICAL_CURVES_REGISTRY.lymphatic_microvascular_flush]
  }
  if (text.includes('metabolic') || text.includes('glucose') || text.includes('glycemic') || text.includes('insulin')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.postprandial_glucose_walk,
      BIOLOGICAL_CURVES_REGISTRY.fasting_metabolic_switch_autophagy
    ]
  }
  if (text.includes('sinclair') || text.includes('epigenetic') || text.includes('nad') || text.includes('sirtuin')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.nad_sirtuin_age_restoration,
      BIOLOGICAL_CURVES_REGISTRY.senolytic_hit_and_run_clearance
    ]
  }
  if (text.includes('senolytic') || text.includes('longo') || text.includes('mayo') || text.includes('fisetin')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.senolytic_hit_and_run_clearance,
      BIOLOGICAL_CURVES_REGISTRY.fasting_metabolic_switch_autophagy
    ]
  }
  if (text.includes('peptide') || text.includes('bpc') || text.includes('cjc') || text.includes('ipamorelin') || text.includes('wolverine') || text.includes('tissue_repair')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.peptide_pulsatile_gh,
      BIOLOGICAL_CURVES_REGISTRY.peptide_receptor_cycle
    ]
  }
  if (text.includes('attia') || text.includes('centenarian') || text.includes('vo2') || text.includes('nordic') || text.includes('norwegian')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.attia_centenarian_marginal_decade,
      BIOLOGICAL_CURVES_REGISTRY.zone_2_lactate_fat_crossover,
      BIOLOGICAL_CURVES_REGISTRY.norwegian_4x4_vo2_wave
    ]
  }
  if (text.includes('patrick') || text.includes('rhonda') || text.includes('sauna') || text.includes('thermal')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.sauna_hsp70_gh_cardio,
      BIOLOGICAL_CURVES_REGISTRY.sauna_frequency_mortality_curve
    ]
  }
  if (text.includes('blueprint') || text.includes('bryan_johnson') || text.includes('bryan johnson')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.sleep_thermoregulation_core_temp,
      BIOLOGICAL_CURVES_REGISTRY.morning_sunlight_car,
      BIOLOGICAL_CURVES_REGISTRY.postprandial_glucose_walk
    ]
  }
  if (text.includes('wim_hof') || text.includes('wim hof') || text.includes('autonomic') || text.includes('breath')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.cyclic_hyperventilation_epinephrine_il10,
      BIOLOGICAL_CURVES_REGISTRY.cold_plunge_catecholamines
    ]
  }
  if (text.includes('dermal') || text.includes('skin')) {
    return [BIOLOGICAL_CURVES_REGISTRY.red_light_arndt_schulz_biphasic]
  }

  return [
    BIOLOGICAL_CURVES_REGISTRY.morning_sunlight_car,
    BIOLOGICAL_CURVES_REGISTRY.attia_centenarian_marginal_decade
  ]
}

export function getBiologicalCurvesForModality(
  modalityId?: string | null,
  modalityName?: string | null,
  category?: string | null
): BiologicalCurveSpec[] {
  const text = `${modalityId || ''} ${modalityName || ''} ${category || ''}`.toLowerCase()

  // 1. Morning Sunlight / Bright Light / Dawn
  if (
    text.includes('sunlight') ||
    text.includes('10,000 lux') ||
    text.includes('10000_lux') ||
    text.includes('bright_light') ||
    text.includes('bright-light') ||
    text.includes('morning_light') ||
    text.includes('dawn')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.morning_sunlight_car,
      BIOLOGICAL_CURVES_REGISTRY.caffeine_adenosine_kinetics
    ]
  }

  // 2. Caffeine / Coffee / Yerba Mate / Adenosine
  if (text.includes('caffeine') || text.includes('coffee') || text.includes('yerba') || text.includes('espresso')) {
    if (text.includes('cutoff') || text.includes('bedtime') || text.includes('review')) {
      return [
        BIOLOGICAL_CURVES_REGISTRY.caffeine_cutoff_half_life,
        BIOLOGICAL_CURVES_REGISTRY.caffeine_adenosine_kinetics
      ]
    }
    return [
      BIOLOGICAL_CURVES_REGISTRY.caffeine_adenosine_kinetics,
      BIOLOGICAL_CURVES_REGISTRY.caffeine_cutoff_half_life
    ]
  }

  // 3. Evening Blue Light / Candlelight / Dimming
  if (
    text.includes('blue_light') ||
    text.includes('blue-light') ||
    text.includes('blue light') ||
    text.includes('candle') ||
    text.includes('dimming') ||
    text.includes('melatonin')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.evening_blue_light_melatonin,
      BIOLOGICAL_CURVES_REGISTRY.sleep_thermoregulation_core_temp
    ]
  }

  // 4. Alcohol / THC / Cannabis Sleep Avoidance
  if (text.includes('alcohol') || text.includes('thc') || text.includes('cannabis') || text.includes('benzodiazepine')) {
    return [BIOLOGICAL_CURVES_REGISTRY.alcohol_thc_sleep_fragmentation]
  }

  // 5. Cold Plunge / Cold Exposure / Søberg
  if (
    text.includes('cold_plunge') ||
    text.includes('cold-water') ||
    text.includes('cold_water') ||
    text.includes('cold plunge') ||
    text.includes('cold_exposure') ||
    text.includes('cold-exposure') ||
    text.includes('cryo') ||
    text.includes('thermogenesis')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.cold_plunge_catecholamines,
      BIOLOGICAL_CURVES_REGISTRY.cold_plunge_soberg_rewarm,
      BIOLOGICAL_CURVES_REGISTRY.cold_hypertrophy_interference
    ]
  }

  // 6. Sauna / Heat / Hyperthermia
  if (text.includes('sauna') || text.includes('hypertherm') || text.includes('heat_shock')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.sauna_hsp70_gh_cardio,
      BIOLOGICAL_CURVES_REGISTRY.sauna_frequency_mortality_curve
    ]
  }

  // 7. Retinal 670nm / 20-20-20 / Carotenoid Vision
  if (text.includes('670nm') || text.includes('retinal') || text.includes('ciliary') || text.includes('20-20-20') || text.includes('lutein') || text.includes('zeaxanthin')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.retinal_mitochondria_670nm_gate,
      BIOLOGICAL_CURVES_REGISTRY.red_light_arndt_schulz_biphasic
    ]
  }

  // 8. Hair Follicle / Microneedling / Scalp 655nm / Rosemary / Saw Palmetto
  if (
    text.includes('dermastamp') ||
    text.includes('microneedl') ||
    text.includes('scalp') ||
    text.includes('rosemary') ||
    text.includes('saw_palmetto') ||
    text.includes('saw-palmetto') ||
    text.includes('anagen') ||
    text.includes('655nm')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.hair_follicle_anagen_revival,
      BIOLOGICAL_CURVES_REGISTRY.red_light_arndt_schulz_biphasic
    ]
  }

  // 9. Red Light / Photobiomodulation / NIR / TPBM
  if (
    text.includes('red_light') ||
    text.includes('red-light') ||
    text.includes('photobiomodulation') ||
    text.includes('tpbm') ||
    text.includes('lllt') ||
    text.includes('near-infrared') ||
    text.includes('near_infrared')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.red_light_arndt_schulz_biphasic]
  }

  // 10. Glymphatic / Lateral Sleep / 40Hz Gamma / Mouth Tape
  if (
    text.includes('glymphatic') ||
    text.includes('lateral_sleep') ||
    text.includes('lateral-sleep') ||
    text.includes('40hz') ||
    text.includes('40_hz') ||
    text.includes('mouth_tape') ||
    text.includes('mouth-tape')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.glymphatic_brain_clearance_wave,
      BIOLOGICAL_CURVES_REGISTRY.sleep_thermoregulation_core_temp
    ]
  }

  // 11. Sleep / Cool Bedroom / Magnesium / Apigenin / Glycine / L-Theanine
  if (
    text.includes('cool_bedroom') ||
    text.includes('cool-bedroom') ||
    text.includes('sleep_architecture') ||
    text.includes('sleep-optimization') ||
    text.includes('heat_release') ||
    text.includes('apigenin') ||
    text.includes('magnesium') ||
    text.includes('glycine') ||
    text.includes('theanine') ||
    text.includes('cbti') ||
    text.includes('sleep')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.sleep_thermoregulation_core_temp,
      BIOLOGICAL_CURVES_REGISTRY.evening_blue_light_melatonin
    ]
  }

  // 12. Breathwork Modalities
  if (text.includes('sigh')) {
    return [BIOLOGICAL_CURVES_REGISTRY.cyclic_sighing_vagal_brake]
  }
  if (text.includes('4_7_8') || text.includes('4-7-8')) {
    return [BIOLOGICAL_CURVES_REGISTRY.breathing_4_7_8_sleep_latency]
  }
  if (text.includes('box_breathing') || text.includes('box-breathing') || text.includes('box breathing')) {
    return [BIOLOGICAL_CURVES_REGISTRY.box_breathing_co2_tolerance]
  }
  if (text.includes('coherent')) {
    return [BIOLOGICAL_CURVES_REGISTRY.coherent_breathing_mayer_resonance]
  }
  if (text.includes('hyperventilation') || text.includes('wim_hof') || text.includes('tummo')) {
    return [BIOLOGICAL_CURVES_REGISTRY.cyclic_hyperventilation_epinephrine_il10]
  }
  if (text.includes('imst') || text.includes('inspiratory') || text.includes('handgrip')) {
    return [BIOLOGICAL_CURVES_REGISTRY.imst_handgrip_bp_reduction]
  }
  if (text.includes('exhale_emphasis') || text.includes('breath')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.cyclic_sighing_vagal_brake,
      BIOLOGICAL_CURVES_REGISTRY.coherent_breathing_mayer_resonance
    ]
  }

  // 13. NSDR / Yoga Nidra / Meditation / Hypnosis
  if (
    text.includes('nsdr') ||
    text.includes('yoga_nidra') ||
    text.includes('yoga-nidra') ||
    text.includes('meditation') ||
    text.includes('hypnosis') ||
    text.includes('reflection')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.nsdr_striatal_dopamine_reset]
  }

  // 14. Post-Meal Walk / Glucose / Acarbose / Berberine / CGM / Apple Cider Vinegar / Air Squats
  if (
    text.includes('glucose') ||
    text.includes('acarbose') ||
    text.includes('berberine') ||
    text.includes('air_squat') ||
    text.includes('air-squat') ||
    text.includes('lighter_lunch') ||
    text.includes('vinegar') ||
    text.includes('cgm') ||
    text.includes('metformin') ||
    text.includes('soleus')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.postprandial_glucose_walk,
      BIOLOGICAL_CURVES_REGISTRY.fasting_metabolic_switch_autophagy
    ]
  }

  // 15. Fasting / Ketones / Autophagy / Spermidine
  if (
    text.includes('fasting') ||
    text.includes('bone_broth') ||
    text.includes('bone-broth') ||
    text.includes('ketone') ||
    text.includes('autophagy') ||
    text.includes('trf') ||
    text.includes('etrf')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.fasting_metabolic_switch_autophagy,
      BIOLOGICAL_CURVES_REGISTRY.postprandial_glucose_walk
    ]
  }

  // 16A. Creatine Monohydrate (Muscle PCr Saturation & Brain ATP Shield)
  if (text.includes('creatine')) {
    return [BIOLOGICAL_CURVES_REGISTRY.creatine_atp_pcr_saturation]
  }

  // 16B. Protein / Leucine / Collagen / Amino Acids
  if (
    text.includes('protein') ||
    text.includes('leucine') ||
    text.includes('whey') ||
    text.includes('eaa') ||
    text.includes('collagen')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.protein_leucine_mps_pulses]
  }

  // 17. Gut Microbiome / Fermented Foods / Akkermansia / Tributyrin / Zinc Carnosine / Fiber
  if (
    text.includes('fermented') ||
    text.includes('akkermansia') ||
    text.includes('tributyrin') ||
    text.includes('butyrate') ||
    text.includes('carnosine') ||
    text.includes('probiotic') ||
    text.includes('microbiome') ||
    text.includes('super_veggie') ||
    text.includes('nut_pudding')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.gut_microbiome_fermented_diversity,
      BIOLOGICAL_CURVES_REGISTRY.postprandial_glucose_walk
    ]
  }

  // 18. Zone 2 Cardio / Aerobic / Rucking / Continuous Cardio
  if (
    text.includes('zone_2') ||
    text.includes('zone-2') ||
    text.includes('zone 2') ||
    text.includes('continuous_cardio') ||
    text.includes('continuous-cardio') ||
    text.includes('rucking') ||
    text.includes('maf')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.zone_2_lactate_fat_crossover,
      BIOLOGICAL_CURVES_REGISTRY.attia_centenarian_marginal_decade
    ]
  }

  // 19. Norwegian 4x4 / HIIT / VO2 Max / Assault Bike / Sprints / Cooper Test
  if (
    text.includes('4x4') ||
    text.includes('hiit') ||
    text.includes('vo2') ||
    text.includes('assault_bike') ||
    text.includes('assault-bike') ||
    text.includes('cooper') ||
    text.includes('sprint') ||
    text.includes('ewot')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.norwegian_4x4_vo2_wave,
      BIOLOGICAL_CURVES_REGISTRY.attia_centenarian_marginal_decade
    ]
  }

  // 20. Bone Density / LIFTMOR / Impact Hops / Vibration / MCHA / Boron / Vitamin D3+K2
  if (
    text.includes('liftmor') ||
    text.includes('impact_hop') ||
    text.includes('impact-hop') ||
    text.includes('mcha') ||
    text.includes('liov') ||
    text.includes('vibration') ||
    text.includes('bone') ||
    text.includes('dexa')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.bone_density_mechanostat_threshold]
  }

  // 21. Lymphatic / Compression Boots / Rebounding / Dry Brushing / Contrast Flush
  if (
    text.includes('compression_boot') ||
    text.includes('compression-boot') ||
    text.includes('pneumatic') ||
    text.includes('rebounding') ||
    text.includes('dry_brush') ||
    text.includes('dry-brush') ||
    text.includes('contrast_flush') ||
    text.includes('contrast-flush') ||
    text.includes('lymph')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.lymphatic_microvascular_flush]
  }

  // 22. Resistance Training / BFR / Centenarian Strength / Squat / Bench / Chinup
  if (
    text.includes('bfr') ||
    text.includes('centenarian') ||
    text.includes('squat') ||
    text.includes('bench_press') ||
    text.includes('bench-press') ||
    text.includes('chinup') ||
    text.includes('deadlift') ||
    text.includes('compound_work') ||
    text.includes('failure_extension') ||
    text.includes('between_set') ||
    text.includes('resistance') ||
    text.includes('workout') ||
    text.includes('curl') ||
    text.includes('chest_isolation') ||
    text.includes('hanging')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.strength_bfr_isometric_recruitment,
      BIOLOGICAL_CURVES_REGISTRY.attia_centenarian_marginal_decade,
      BIOLOGICAL_CURVES_REGISTRY.cold_hypertrophy_interference
    ]
  }

  // 23. Peptides (CJC-1295, Ipamorelin, Tesamorelin, BPC-157, TB-500, GHK-Cu, Epithalon, AOD-9604, Semax, Selank, Thymosin)
  if (
    text.includes('peptide') ||
    text.includes('cjc') ||
    text.includes('ipamorelin') ||
    text.includes('tesamorelin') ||
    text.includes('bpc') ||
    text.includes('tb_500') ||
    text.includes('tb-500') ||
    text.includes('tb500') ||
    text.includes('aod9604') ||
    text.includes('ghk') ||
    text.includes('epithalon') ||
    text.includes('semax') ||
    text.includes('selank') ||
    text.includes('subq')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.peptide_pulsatile_gh,
      BIOLOGICAL_CURVES_REGISTRY.peptide_receptor_cycle
    ]
  }

  // 24. Senolytics (Fisetin, Quercetin, Spermidine, Rapamycin)
  if (
    text.includes('fisetin') ||
    text.includes('quercetin') ||
    text.includes('senolytic') ||
    text.includes('spermidine') ||
    text.includes('rapamycin')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.senolytic_hit_and_run_clearance]
  }

  // 25. NAD+ / Sirtuins / Mitochondrial Bioenergetics (NMN, NR, Resveratrol, AKG, CoQ10, ALA, Urolithin A, Methylene Blue, MTHFR)
  if (
    text.includes('nmn') ||
    text.includes('nicotinamide') ||
    text.includes('resveratrol') ||
    text.includes('tmg') ||
    text.includes('akg') ||
    text.includes('ketoglutarate') ||
    text.includes('coq10') ||
    text.includes('ubiquinol') ||
    text.includes('lipoic') ||
    text.includes('ala') ||
    text.includes('urolithin') ||
    text.includes('mthfr') ||
    text.includes('methylation')
  ) {
    return [BIOLOGICAL_CURVES_REGISTRY.nad_sirtuin_age_restoration]
  }

  // 26. Cardiovascular / Lipids / ApoB / Endothelial NO (ApoB, CAC, Bergamot, Garlic, Cocoa Flavanols, Omega-3, ABPM)
  if (
    text.includes('apob') ||
    text.includes('lipid') ||
    text.includes('cac') ||
    text.includes('calcium-scan') ||
    text.includes('bergamot') ||
    text.includes('omega') ||
    text.includes('epa') ||
    text.includes('statin') ||
    text.includes('ezetimibe')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.apob_cumulative_plaque_exposure,
      BIOLOGICAL_CURVES_REGISTRY.imst_handgrip_bp_reduction
    ]
  }
  if (
    text.includes('garlic') ||
    text.includes('cocoa') ||
    text.includes('flavanol') ||
    text.includes('blood-pressure') ||
    text.includes('blood_pressure') ||
    text.includes('abpm') ||
    text.includes('nitric')
  ) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.imst_handgrip_bp_reduction,
      BIOLOGICAL_CURVES_REGISTRY.apob_cumulative_plaque_exposure
    ]
  }

  // 27. Nootropics & Stress Adaptogens (Alpha-GPC, Ashwagandha, Rhodiola, Bacopa, Lion's Mane)
  if (text.includes('ashwagandha') || text.includes('cortisol') || text.includes('rhodiola')) {
    return [BIOLOGICAL_CURVES_REGISTRY.morning_sunlight_car]
  }
  if (text.includes('alpha_gpc') || text.includes('alpha-gpc') || text.includes('bacopa') || text.includes('nootropic')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.caffeine_adenosine_kinetics,
      BIOLOGICAL_CURVES_REGISTRY.nsdr_striatal_dopamine_reset
    ]
  }

  // Fallback by broad category so every modality in Geek Mode has a relevant biological curve
  if (text.includes('cardio') || text.includes('fitness') || text.includes('exercise')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.zone_2_lactate_fat_crossover,
      BIOLOGICAL_CURVES_REGISTRY.attia_centenarian_marginal_decade
    ]
  }
  if (text.includes('nutrition') || text.includes('metabolic')) {
    return [
      BIOLOGICAL_CURVES_REGISTRY.postprandial_glucose_walk,
      BIOLOGICAL_CURVES_REGISTRY.protein_leucine_mps_pulses
    ]
  }

  return [BIOLOGICAL_CURVES_REGISTRY.nad_sirtuin_age_restoration]
}
