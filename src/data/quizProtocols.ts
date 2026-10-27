export type QuizGoalId = 'sleep' | 'energy' | 'longevity';

export type SleepImprovementId =
  | 'falling_asleep'
  | 'staying_asleep'
  | 'waking_rested'
  | 'sleep_consistency'
  | 'maintain_good_sleep';

export type EnergyTimingId =
  | 'morning'
  | 'afternoon'
  | 'throughout_day'
  | 'during_exercise'
  | 'maintain_current_energy';

export type MotivationId =
  | 'present_with_loved_ones'
  | 'meaningful_work'
  | 'exercise_and_adventure'
  | 'feeling_better_daily'
  | 'capable_and_independent'
  | 'other';

export type TimeAllowanceId =
  | 'up_to_5m'
  | '5_to_15m'
  | '15_to_30m'
  | '30_to_60m'
  | '1_to_2h'
  | '2h_plus';

export type ApproachPreferenceId =
  | 'habits_first'
  | 'supplements'
  | 'combination'
  | 'exploring';

export type FlagshipProtocolSlug =
  | 'huberman-morning-circadian'
  | 'huberman-sleep-rescue'
  | 'huberman-stress-reset'
  | 'huberman-metabolic-walk'
  | 'dr-rhonda-patrick-micronutrient-senolytic'
  | 'peter-attia-centenarian-decathlon'
  | 'bryan-johnson-blueprint-flagship';

export interface ProtocolActionItem {
  title: string;
  timing: string;
  duration: string;
  detail: string;
  isCoreForShortTime?: boolean;
}

export interface FlagshipProtocolSpec {
  slug: FlagshipProtocolSlug;
  title: string;
  shortTitle: string;
  authorOrSource: string;
  categoryBadge: string;
  typicalTime: string;
  minimumViableTime: string;
  approachType: 'Habits-First ($0)' | 'Habits + Optional Supplements' | 'Micronutrients & Hormesis' | 'Exercise + Targeted Stack' | 'Comprehensive System';
  summary: string;
  clinicalMechanism: string;
  actions: ProtocolActionItem[];
  deconflictionNote: string;
}

export const FLAGSHIP_PROTOCOLS: Record<FlagshipProtocolSlug, FlagshipProtocolSpec> = {
  'huberman-morning-circadian': {
    slug: 'huberman-morning-circadian',
    title: 'Huberman Morning Circadian Stack',
    shortTitle: 'Morning Circadian Stack',
    authorOrSource: 'Dr. Andrew Huberman • Neuro-Circadian Operating System',
    categoryBadge: 'Circadian Phase-Lock & Energy',
    typicalTime: '10–15 mins/day',
    minimumViableTime: '5 mins/day (Outdoor sky exposure + hydration)',
    approachType: 'Habits-First ($0)',
    summary:
      'A zero-cost behavioral routine that anchors your master circadian clock (suprachiasmatic nucleus) within 30–60 minutes of waking—driving daytime alertness while setting a 16-hour timer for natural evening melatonin onset.',
    clinicalMechanism:
      'Morning outdoor photon flux stimulates melanopsin retinal ganglion cells to trigger a healthy morning cortisol peak, while delaying caffeine 90–120 minutes allows residual adenosine to clear so you avoid an afternoon crash.',
    actions: [
      {
        title: 'Morning Cellular Hydration + Electrolytes',
        timing: 'Upon waking',
        duration: '1 min',
        detail: 'Drink 16 oz (500 mL) water with a pinch of sea salt or electrolytes to restore nocturnal plasma volume.',
        isCoreForShortTime: true,
      },
      {
        title: 'Direct Outdoor Sunlight Viewing (10,000+ Lux)',
        timing: 'Within 30–60m of waking',
        duration: '5–15 mins',
        detail: 'Step outside without sunglasses (5–10m on clear mornings, 15m on overcast days) before looking at bright indoor screens.',
        isCoreForShortTime: true,
      },
      {
        title: '90–120 Minute Post-Wake Caffeine Delay',
        timing: 'First 90 mins awake',
        duration: '0 mins extra time',
        detail: 'Let endogenous cortisol and dopamine clear morning adenosine naturally before your first cup of coffee or tea.',
        isCoreForShortTime: true,
      },
    ],
    deconflictionNote:
      'Pairs cleanly with evening sleep routines and micronutrient stacks without overlapping tasks or stimulants.',
  },

  'huberman-sleep-rescue': {
    slug: 'huberman-sleep-rescue',
    title: 'Huberman Sleep Environment & Midnight Rescue',
    shortTitle: 'Sleep Environment & Midnight Rescue',
    authorOrSource: 'Dr. Andrew Huberman & Dr. Matthew Walker Synthesis',
    categoryBadge: 'Sleep Architecture & Recovery',
    typicalTime: '10–15 mins/day',
    minimumViableTime: '5 mins/day (Evening light dimming & thermal drop)',
    approachType: 'Habits + Optional Supplements',
    summary:
      'Optimizes your evening light environment, core body temperature drop, and autonomic calm so you fall asleep faster, stay asleep through the night, and spend more time in restorative slow-wave sleep.',
    clinicalMechanism:
      'Protecting dim-light melatonin onset (DLMO) 90 minutes before bed and dropping ambient bedroom temperature to ~65°F (18.3°C) triggers peripheral vasodilation and GABAergic slow-wave sleep entry.',
    actions: [
      {
        title: 'Sunset Light Inoculation',
        timing: 'Late afternoon / sunset',
        duration: '5 mins',
        detail: 'View low-angle evening sky light to partially protect retinal melanopsin sensitivity against indoor evening screens.',
        isCoreForShortTime: false,
      },
      {
        title: 'Overhead Blue-Light Dimming (<10 Lux)',
        timing: '60–90m before sleep',
        duration: '2 mins setup',
        detail: 'Switch off bright overhead LEDs in favor of low, warm lamps to prevent pineal melatonin suppression.',
        isCoreForShortTime: true,
      },
      {
        title: '65°F (18.3°C) Core Thermal Drop Sanctuary',
        timing: 'At bedtime',
        duration: '2 mins setup',
        detail: 'Cool the bedroom (or take a warm shower 60m before bed to accelerate core heat dumping) to initiate deep sleep phases.',
        isCoreForShortTime: true,
      },
      {
        title: '2 AM Eye-Movement & NSDR Sleep Rescue',
        timing: 'If waking mid-night',
        duration: '3–5 mins as needed',
        detail: 'Keep eyes closed and perform slow lateral eye movements with long exhales to quiet amygdala arousal and return to sleep.',
        isCoreForShortTime: true,
      },
    ],
    deconflictionNote:
      'Evening-only wind-down routine; zero overlap with morning circadian or daytime metabolic protocols.',
  },

  'huberman-stress-reset': {
    slug: 'huberman-stress-reset',
    title: 'Huberman Real-Time Stress Reset (Physiological Sigh)',
    shortTitle: 'Real-Time Autonomic Stress Reset',
    authorOrSource: 'Dr. Andrew Huberman • Stanford Respiration Trial',
    categoryBadge: '2–5 Min Autonomic Calm',
    typicalTime: '2–5 mins/day',
    minimumViableTime: '2 mins/day',
    approachType: 'Habits-First ($0)',
    summary:
      'The fastest clinically validated breathing protocol to downshift sympathetic fight-or-flight arousal, lower heart rate in real time, and prepare the nervous system for restful sleep or calm focus.',
    clinicalMechanism:
      'Two consecutive nasal inhales reinflate collapsed pulmonary alveoli to maximize CO2 offloading, while a long, slow oral exhale activates the vagus nerve and slows sinoatrial heart pacing.',
    actions: [
      {
        title: '5-Minute Cyclic Physiological Sighing',
        timing: 'Pre-bedtime or high-stress window',
        duration: '3–5 mins',
        detail: 'Take a deep nasal inhale, add a second sharp top-off nasal inhale, then exhale slowly through the mouth for twice as long.',
        isCoreForShortTime: true,
      },
      {
        title: '60-Second On-Demand Sympathetic Brake',
        timing: 'Before sleep or afternoon transition',
        duration: '1 min',
        detail: 'Perform 3–5 consecutive physiological sighs to immediately reduce racing thoughts or physical tension.',
        isCoreForShortTime: true,
      },
    ],
    deconflictionNote:
      'Ultra-compact 2–5 minute respiratory practice that complements any sleep or longevity stack.',
  },

  'huberman-metabolic-walk': {
    slug: 'huberman-metabolic-walk',
    title: 'Huberman Post-Meal Glycemic Control',
    shortTitle: 'Post-Meal Glycemic Walk',
    authorOrSource: 'Dr. Andrew Huberman & Dr. Casey Means Synthesis',
    categoryBadge: 'Metabolic Energy & Glucose Control',
    typicalTime: '10 mins/day',
    minimumViableTime: '5–10 mins/day',
    approachType: 'Habits-First ($0)',
    summary:
      'A simple, high-leverage movement habit after your largest daily meal that blunts post-meal blood glucose spikes by 22–30%, eliminating afternoon sluggishness and supporting long-term metabolic healthspan.',
    clinicalMechanism:
      'Light skeletal muscle contraction within 30 minutes of eating activates non-insulin-dependent GLUT4 glucose transporters, clearing circulating glucose directly into muscle tissue without an insulin crash.',
    actions: [
      {
        title: 'Fiber & Protein First Meal Sequencing',
        timing: 'At your main meal',
        duration: '0 mins extra time',
        detail: 'Start meals with greens, fiber, and protein before starches to slow gastric emptying and flatten the glucose curve.',
        isCoreForShortTime: true,
      },
      {
        title: '10-Minute Brisk Post-Prandial Walk (or Calf Raises)',
        timing: 'Within 30m of your largest meal',
        duration: '5–10 mins',
        detail: 'Take a brisk 10-minute walk outdoors (or perform 5 minutes of seated soleus pushups at your desk) to clear glucose and protect afternoon energy.',
        isCoreForShortTime: true,
      },
    ],
    deconflictionNote:
      'Scheduled around meals; never conflicts with morning light or evening sleep wind-down.',
  },

  'dr-rhonda-patrick-micronutrient-senolytic': {
    slug: 'dr-rhonda-patrick-micronutrient-senolytic',
    title: "Dr. Rhonda Patrick's Micronutrient, Thermal & Senolytic Protocol",
    shortTitle: 'Micronutrient & Cellular Defense Matrix',
    authorOrSource: 'Dr. Rhonda Patrick • FoundMyFitness Clinical Stack',
    categoryBadge: 'Cellular Longevity & Nrf2 Defense',
    typicalTime: '15–30 mins/day',
    minimumViableTime: '5 mins/day (Core micronutrient & Nrf2 matrix)',
    approachType: 'Micronutrients & Hormesis',
    summary:
      'An evidence-grounded cellular defense protocol targeting DNA repair, Omega-3 Index optimization (>8%), Nrf2 antioxidant pathway activation, and optional thermal/cardiorespiratory hormesis.',
    clinicalMechanism:
      'Addresses widespread subclinical micronutrient inadequacies (Vitamin D3, K2, Magnesium, EPA/DHA) that accelerate biological aging while activating endogenous glutathione and heat-shock protein (HSP70) repair.',
    actions: [
      {
        title: 'Foundational Lipid-Paired Micronutrient Matrix (D3 + K2 + Omega-3)',
        timing: 'With a fat-containing meal',
        duration: '2 mins',
        detail: 'Pair Vitamin D3 (2,000–4,000 IU), Vitamin K2 (MK-7), and high-purity EPA/DHA Omega-3s to target an Omega-3 Index >8%.',
        isCoreForShortTime: true,
      },
      {
        title: 'Sulforaphane / Cruciferous Nrf2 Activation',
        timing: 'With lunch or dinner',
        duration: '2 mins',
        detail: 'Incorporate broccoli sprouts or standardized sulforaphane to upregulate Phase II cellular detoxification and glutathione.',
        isCoreForShortTime: true,
      },
      {
        title: 'Vigorous Cardiorespiratory or Thermal Hormesis Session',
        timing: 'Afternoon (3–4x/week)',
        duration: '20 mins',
        detail: 'Perform 20 minutes of vigorous aerobic conditioning or sauna bathing (174°F+) to elevate Heat Shock Proteins (HSP70) and BDNF.',
        isCoreForShortTime: false,
      },
    ],
    deconflictionNote:
      'Daytime micronutrient and afternoon hormesis timing; leaves evening sleep GABA/autophagy pathways conflict-free.',
  },

  'peter-attia-centenarian-decathlon': {
    slug: 'peter-attia-centenarian-decathlon',
    title: "Dr. Peter Attia's Centenarian Decathlon Protocol",
    shortTitle: 'Centenarian Decathlon Protocol',
    authorOrSource: 'Dr. Peter Attia • Outlive Physical Longevity Framework',
    categoryBadge: 'VO2 Max, Strength & Healthspan',
    typicalTime: '45–60 mins/day',
    minimumViableTime: '30 mins/day',
    approachType: 'Exercise + Targeted Stack',
    summary:
      'The premier physical healthspan framework designed to build top-decile cardiorespiratory fitness (VO2 Max), preserve skeletal muscle mass and bone density, and sustain physical independence into your 80s and 90s.',
    clinicalMechanism:
      'Combines steady-state Zone 2 aerobic training (<2.0 mmol/L lactate) for mitochondrial biogenesis with weekly Norwegian 4x4 VO2 Max intervals and heavy axial/grip loading—the strongest clinical predictors of all-cause mortality reduction.',
    actions: [
      {
        title: 'Zone 2 Mitochondrial Base Conditioning',
        timing: '3–4 sessions/week',
        duration: '35–45 mins',
        detail: 'Steady-state aerobic pace (65–75% max heart rate, conversational nasal breathing) to build mitochondrial density and fat oxidation.',
        isCoreForShortTime: true,
      },
      {
        title: 'Centenarian Strength, Grip & Axial Stability',
        timing: '2–3 sessions/week (alternate days)',
        duration: '35–45 mins',
        detail: 'Focus on dead hang grip endurance, loaded carries, compound lower-body strength, and eyes-closed balance.',
        isCoreForShortTime: true,
      },
      {
        title: 'Norwegian 4x4 VO2 Max Peak Intervals',
        timing: '1 session/week',
        duration: '28 mins',
        detail: '4 rounds of 4 minutes at high aerobic output followed by 3 minutes active recovery to expand cardiac stroke volume.',
        isCoreForShortTime: false,
      },
      {
        title: 'Daily Creatine Monohydrate (5g) & Protein Pacing',
        timing: 'Morning or post-training',
        duration: '2 mins',
        detail: 'Replenish muscular and cerebral phosphocreatine ATP reserves and support myofibrillar protein synthesis.',
        isCoreForShortTime: true,
      },
    ],
    deconflictionNote:
      'Focuses on daytime physical training and ATP support; complements micronutrient or evening recovery protocols.',
  },

  'bryan-johnson-blueprint-flagship': {
    slug: 'bryan-johnson-blueprint-flagship',
    title: "Bryan Johnson's Project Blueprint Flagship Protocol",
    shortTitle: 'Blueprint Flagship Protocol',
    authorOrSource: 'Bryan Johnson • Adapted by LEVL Clinical Consensus',
    categoryBadge: 'Whole-Body Multi-System Stack',
    typicalTime: '60–90 mins/day',
    minimumViableTime: '60 mins/day',
    approachType: 'Comprehensive System',
    summary:
      'Extracts the highest-ROI clinical anchors from Project Blueprint—combining morning circadian light, a 45–60 minute daily multimodal workout circuit, high-polyphenol nutrition, and a strict 65°F evening sleep sanctuary.',
    clinicalMechanism:
      'Synchronizes circadian feeding, daily aerobic + resistance training, endothelial polyphenol support (EVOO), and structured evening parasympathetic wind-down while removing extreme fasting cutoffs that disrupt hormones.',
    actions: [
      {
        title: 'Morning Circadian Light + Hydration Launch',
        timing: 'Within 30m of waking',
        duration: '10–15 mins',
        detail: '10,000+ lux outdoor light exposure paired with cellular electrolyte hydration and 5g micronized creatine.',
        isCoreForShortTime: true,
      },
      {
        title: 'Blueprint Daily Multimodal Conditioning Circuit',
        timing: 'Morning or afternoon',
        duration: '45–60 mins',
        detail: 'Structured combination of posture/mobility, compound resistance training, Zone 2 endurance, and high-intensity intervals.',
        isCoreForShortTime: true,
      },
      {
        title: 'High-Polyphenol EVOO (15 mL) & Whole-Food Matrix',
        timing: 'With primary daytime meals',
        duration: '5 mins',
        detail: 'Include 1 tbsp extra virgin olive oil rich in oleocanthal alongside vegetables, legumes, and lean proteins.',
        isCoreForShortTime: true,
      },
      {
        title: '60-Minute Screen-Free Wind-Down & 65°F Sleep System',
        timing: 'Final hour before bed',
        duration: '15 mins active prep',
        detail: 'Consistent bedtime target (+/- 30m), dim evening lighting, and a cool, dark sleep environment for slow-wave recovery.',
        isCoreForShortTime: true,
      },
    ],
    deconflictionNote:
      'All-in daily architecture; LEVL automatically de-duplicates overlapping supplements when paired with secondary stacks.',
  },
};

export interface QuizAnswers {
  goals: QuizGoalId[];
  primaryGoal: QuizGoalId | null;
  // Step 2: Sleep
  sleepScore: number | null; // 0-10, null if untouched or sleep not selected
  sleepImprovements: SleepImprovementId[]; // up to 2, 'maintain_good_sleep' exclusive
  // Step 2: Energy
  energyScore: number | null; // 0-10, null if untouched or energy not selected
  energyTiming: EnergyTimingId | null;
  // Step 2: Longevity
  longevityHighInterestFromGoal: boolean;
  longevityPriorityScore: number | null; // 0-10 only asked when longevity was NOT selected in Step 1
  // Step 3: Personal Motivation
  motivations: MotivationId[]; // up to 2
  motivationOtherText: string;
  // Step 4: Practical Fit
  timeAllowance: TimeAllowanceId | null;
  approachPreference: ApproachPreferenceId | null;
}

export type DeepCellFramingPath = 1 | 2 | 3;

export interface MatchedDeepCellIngredient {
  name: string;
  dose: string;
  role: string;
  whyMatched: string;
}

export interface DeepCellRecommendation {
  eligible: boolean;
  framingPath: DeepCellFramingPath | null;
  isOptionalHabitsBadge: boolean;
  headline: string;
  rationale: string;
  matchedIngredients: MatchedDeepCellIngredient[];
}

export type RecommendationBlockType = 'protocol' | 'deepcell' | 'activate';

export interface PersonalizedPlanResult {
  summaryParagraph: string;
  motivationSentence: string | null;
  startHereProtocol: FlagshipProtocolSpec;
  startHereWhyItFits: string[];
  startHereTimeFitNote: string;
  startHereActionsToDisplay: ProtocolActionItem[];
  addNextProtocol: FlagshipProtocolSpec;
  addNextWhyItFits: string;
  deepCell: DeepCellRecommendation;
  includeActivate: boolean;
  orderedBlocks: RecommendationBlockType[];
  levlAppStartUrl: string;
  longevityReviewsStartUrl: string;
  levlAppAddNextUrl: string;
  longevityReviewsAddNextUrl: string;
}

export const GOAL_LABELS: Record<QuizGoalId, string> = {
  sleep: 'Better sleep',
  energy: 'More consistent energy',
  longevity: 'Long-term health and longevity',
};

export const SLEEP_IMPROVEMENT_LABELS: Record<SleepImprovementId, string> = {
  falling_asleep: 'Falling asleep',
  staying_asleep: 'Staying asleep',
  waking_rested: 'Waking rested',
  sleep_consistency: 'Sleep consistency',
  maintain_good_sleep: 'Maintain good sleep',
};

export const ENERGY_TIMING_LABELS: Record<EnergyTimingId, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  throughout_day: 'Throughout the day',
  during_exercise: 'During exercise',
  maintain_current_energy: 'Maintain current energy',
};

export const MOTIVATION_LABELS: Record<MotivationId, string> = {
  present_with_loved_ones: 'Being present with people I love',
  meaningful_work: 'Doing meaningful work',
  exercise_and_adventure: 'Enjoying exercise and adventure',
  feeling_better_daily: 'Feeling better day to day',
  capable_and_independent: 'Staying capable and independent as I age',
  other: 'Other',
};

export const TIME_ALLOWANCE_LABELS: Record<TimeAllowanceId, string> = {
  up_to_5m: 'Up to 5 minutes',
  '5_to_15m': '5–15 minutes',
  '15_to_30m': '15–30 minutes',
  '30_to_60m': '30–60 minutes',
  '1_to_2h': '1–2 hours',
  '2h_plus': '2+ hours',
};

export const TIME_ALLOWANCE_URL_TOKENS: Record<TimeAllowanceId, string> = {
  up_to_5m: '0-5m',
  '5_to_15m': '5-15m',
  '15_to_30m': '15-30m',
  '30_to_60m': '30-60m',
  '1_to_2h': '1-2h',
  '2h_plus': '2h+',
};

export const APPROACH_PREFERENCE_LABELS: Record<ApproachPreferenceId, string> = {
  habits_first: 'Habits and routines first',
  supplements: 'Open to supplements',
  combination: 'A combination',
  exploring: 'Show me the options',
};

/**
 * Selects the primary ("Start here") and complementary ("Add next") protocols
 * using the 7-Protocol Core Routing Table while de-conflicting multi-goal stacks.
 */
function selectProtocols(answers: QuizAnswers): {
  startSlug: FlagshipProtocolSlug;
  nextSlug: FlagshipProtocolSlug;
} {
  const primary: QuizGoalId = answers.primaryGoal || answers.goals[0] || 'longevity';
  const time: TimeAllowanceId = answers.timeAllowance || '15_to_30m';
  const approach: ApproachPreferenceId = answers.approachPreference || 'combination';
  const hasSleep = answers.goals.includes('sleep');
  const hasEnergy = answers.goals.includes('energy');
  const hasLongevity =
    answers.goals.includes('longevity') || (answers.longevityPriorityScore ?? 0) >= 7;

  let startSlug: FlagshipProtocolSlug = 'huberman-morning-circadian';

  // High time commitment (1–2h or 2h+) unlocks the comprehensive Blueprint system
  if (time === '1_to_2h' || time === '2h_plus') {
    startSlug = 'bryan-johnson-blueprint-flagship';
  } else if (primary === 'sleep') {
    const wantsWakeOrConsistencyOnly =
      answers.sleepImprovements.length > 0 &&
      answers.sleepImprovements.every(
        (id) => id === 'waking_rested' || id === 'sleep_consistency' || id === 'maintain_good_sleep'
      );

    if (time === 'up_to_5m') {
      startSlug = 'huberman-stress-reset';
    } else if (approach === 'habits_first' && time === '15_to_30m' && wantsWakeOrConsistencyOnly) {
      startSlug = 'huberman-morning-circadian';
    } else {
      startSlug = 'huberman-sleep-rescue';
    }
  } else if (primary === 'energy') {
    if (time === '30_to_60m' && (answers.energyTiming === 'during_exercise' || hasLongevity)) {
      startSlug = 'peter-attia-centenarian-decathlon';
    } else if (time === 'up_to_5m') {
      startSlug =
        approach === 'supplements' || approach === 'combination'
          ? 'dr-rhonda-patrick-micronutrient-senolytic'
          : 'huberman-metabolic-walk';
    } else if (time === '5_to_15m') {
      if (answers.energyTiming === 'afternoon' && approach === 'habits_first') {
        startSlug = 'huberman-metabolic-walk';
      } else if (approach === 'supplements') {
        startSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
      } else {
        startSlug = 'huberman-morning-circadian';
      }
    } else {
      // 15-30m or 30-60m
      if (approach === 'supplements') {
        startSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
      } else if (answers.energyTiming === 'during_exercise' && time === '30_to_60m') {
        startSlug = 'peter-attia-centenarian-decathlon';
      } else {
        startSlug = 'huberman-morning-circadian';
      }
    }
  } else {
    // Primary === 'longevity'
    if (time === '30_to_60m') {
      startSlug = 'peter-attia-centenarian-decathlon';
    } else if (
      (time === 'up_to_5m' || time === '5_to_15m') &&
      approach === 'habits_first'
    ) {
      startSlug = 'huberman-metabolic-walk';
    } else if (time === '15_to_30m' && approach === 'habits_first') {
      startSlug = 'huberman-morning-circadian';
    } else {
      startSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
    }
  }

  // Determine complementary "Add Next" protocol using the pairing cheat sheet + secondary goals
  let nextSlug: FlagshipProtocolSlug;

  switch (startSlug) {
    case 'huberman-morning-circadian':
      if (hasSleep) {
        nextSlug = 'huberman-sleep-rescue';
      } else if (hasLongevity && approach !== 'habits_first') {
        nextSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
      } else {
        nextSlug = 'huberman-metabolic-walk';
      }
      break;
    case 'huberman-sleep-rescue':
      if (hasLongevity && (approach === 'supplements' || approach === 'combination')) {
        nextSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
      } else {
        nextSlug = 'huberman-morning-circadian';
      }
      break;
    case 'huberman-stress-reset':
      nextSlug = 'huberman-sleep-rescue';
      break;
    case 'huberman-metabolic-walk':
      if (hasSleep && !hasEnergy) {
        nextSlug = 'huberman-sleep-rescue';
      } else {
        nextSlug = 'huberman-morning-circadian';
      }
      break;
    case 'dr-rhonda-patrick-micronutrient-senolytic':
      if (hasSleep && primary !== 'sleep') {
        nextSlug = 'huberman-sleep-rescue';
      } else if (hasEnergy && time !== '30_to_60m') {
        nextSlug = 'huberman-morning-circadian';
      } else {
        nextSlug = 'peter-attia-centenarian-decathlon';
      }
      break;
    case 'peter-attia-centenarian-decathlon':
      if (hasSleep) {
        nextSlug = 'huberman-sleep-rescue';
      } else {
        nextSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
      }
      break;
    case 'bryan-johnson-blueprint-flagship':
    default:
      if (hasSleep && answers.sleepScore !== null && answers.sleepScore <= 6) {
        nextSlug = 'huberman-sleep-rescue';
      } else {
        nextSlug = 'dr-rhonda-patrick-micronutrient-senolytic';
      }
      break;
  }

  return { startSlug, nextSlug };
}

/**
 * Builds the DeepCell eligibility, framing path (1, 2, or 3), and dynamically matched ingredients.
 */
function buildDeepCellRecommendation(answers: QuizAnswers): DeepCellRecommendation {
  const sleepSelected = answers.goals.includes('sleep');
  const longevitySelected = answers.goals.includes('longevity');
  const longevitySliderQualifies = (answers.longevityPriorityScore ?? 0) >= 7;
  const qualifiesLongevity = longevitySelected || longevitySliderQualifies;

  const eligible = sleepSelected || qualifiesLongevity;
  if (!eligible) {
    return {
      eligible: false,
      framingPath: null,
      isOptionalHabitsBadge: false,
      headline: '',
      rationale: '',
      matchedIngredients: [],
    };
  }

  const isOptionalHabitsBadge = answers.approachPreference === 'habits_first';
  const sleepScore = answers.sleepScore;

  // Determine which of the 3 framing paths applies:
  // Path 1: Sleep selected, sleep quality 0–7
  // Path 2: Longevity interest qualifies, with sleep unselected or rated 8–10
  // Path 3: Sleep selected, sleep quality 8–10, without qualifying longevity interest
  let framingPath: DeepCellFramingPath;
  if (sleepSelected && (sleepScore === null || sleepScore <= 7)) {
    framingPath = 1;
  } else if (qualifiesLongevity) {
    framingPath = 2;
  } else {
    framingPath = 3;
  }

  if (framingPath === 1) {
    const selectedSleepLabels = answers.sleepImprovements.map(
      (id) => SLEEP_IMPROVEMENT_LABELS[id].toLowerCase()
    );
    const focusPhrase =
      selectedSleepLabels.length === 2
        ? `${selectedSleepLabels[0]} and ${selectedSleepLabels[1]}`
        : selectedSleepLabels[0] || 'more restorative sleep';

    const matchedIngredients: MatchedDeepCellIngredient[] = [];

    if (answers.sleepImprovements.includes('falling_asleep')) {
      matchedIngredients.push({
        name: 'L-Theanine (200 mg) & Passion Flower (250 mg)',
        dose: '450 mg combined',
        role: 'Quiets racing thoughts & alpha-wave calm',
        whyMatched:
          'Directly supports falling asleep by modulating GABA signaling and calming evening mental overactivity without sedative hangovers.',
      });
    }
    if (answers.sleepImprovements.includes('staying_asleep')) {
      matchedIngredients.push({
        name: 'Magnesium Glycinate (80 mg) & Lemon Balm (250 mg)',
        dose: '330 mg combined',
        role: 'Sustains uninterrupted sleep phases',
        whyMatched:
          'Helps reduce midnight awakenings and nocturnal restlessness by inhibiting GABA breakdown and relaxing nervous system tension.',
      });
    }
    if (answers.sleepImprovements.includes('waking_rested')) {
      matchedIngredients.push({
        name: 'Apigenin (50 mg) & Valerian Root (350 mg)',
        dose: '400 mg combined',
        role: 'Deep slow-wave sleep architecture',
        whyMatched:
          'Supports deeper slow-wave recovery phases without exogenous melatonin, helping you wake clear-headed rather than groggy.',
      });
    }
    if (answers.sleepImprovements.includes('sleep_consistency')) {
      matchedIngredients.push({
        name: 'L-Tryptophan (200 mg), Vitamin B6 (5 mg) & Zinc (10 mg)',
        dose: 'Endogenous cofactor triad',
        role: 'Natural circadian melatonin synthesis',
        whyMatched:
          'Provides the raw enzymatic cofactors your pineal gland uses to synthesize serotonin and melatonin on a consistent nightly rhythm.',
      });
    }

    // Ensure 3–4 matched ingredients are always displayed
    const defaults: MatchedDeepCellIngredient[] = [
      {
        name: 'Magnesium Glycinate',
        dose: '80 mg',
        role: 'GABA & nervous system relaxation',
        whyMatched:
          'Pairs glycine with bioavailable magnesium to help lower core evening tension and support uninterrupted sleep architecture.',
      },
      {
        name: 'L-Theanine',
        dose: '200 mg',
        role: 'Evening calm without grogginess',
        whyMatched:
          'Promotes calm alpha-wave focus before bed and reduces stress-related hyperarousal so you wake feeling refreshed.',
      },
      {
        name: 'Apigenin',
        dose: '50 mg',
        role: 'Slow-wave sleep & NAD+ preservation',
        whyMatched:
          'Chamomile-derived flavonoid that binds GABA-A receptors for gentle sleep onset while inhibiting CD38 to protect cellular NAD+.',
      },
      {
        name: 'L-Tryptophan + Vitamin B6',
        dose: '200 mg + 5 mg',
        role: 'Melatonin-free circadian support',
        whyMatched:
          'Supports your body’s own endogenous serotonin-to-melatonin pathway rather than overriding receptors with synthetic melatonin.',
      },
    ];

    for (const item of defaults) {
      if (matchedIngredients.length >= 4) break;
      if (!matchedIngredients.some((m) => m.name.includes(item.name))) {
        matchedIngredients.push(item);
      }
    }

    return {
      eligible: true,
      framingPath: 1,
      isOptionalHabitsBadge,
      headline: `LIFESPAN+ DeepCell — Melatonin-Free Nighttime Support for ${
        focusPhrase.charAt(0).toUpperCase() + focusPhrase.slice(1)
      }`,
      rationale: `Because you rated your recent sleep ${
        sleepScore !== null ? `${sleepScore}/10` : 'as an area to improve'
      } and want to focus on ${focusPhrase}, DeepCell is formulated to support natural sleep architecture without synthetic melatonin or heavy sedatives—pairing GABAergic calm with overnight cellular recovery cofactors.`,
      matchedIngredients: matchedIngredients.slice(0, 4),
    };
  }

  if (framingPath === 2) {
    const reportedGoodSleep = sleepSelected && sleepScore !== null && sleepScore >= 8;
    const sleepAck = reportedGoodSleep
      ? `You already reported strong sleep (${sleepScore}/10), so you don’t need a sleep-problem fix. Instead, DeepCell is relevant here for what happens at the cellular level during the night: `
      : `Because long-term healthspan is a high priority for you, it helps to utilize the night as the body’s primary window for cellular maintenance: `;

    return {
      eligible: true,
      framingPath: 2,
      isOptionalHabitsBadge,
      headline: 'LIFESPAN+ DeepCell — Nocturnal Cellular Longevity & Autophagy Formulation',
      rationale: `${sleepAck}DeepCell combines researched longevity compounds—including Spermidine, Apigenin, Luteolin, and micro-dosed Lithium Orotate—studied for their roles in nocturnal autophagy, NAD+ preservation, and genomic stability.`,
      matchedIngredients: [
        {
          name: 'Spermidine HCl',
          dose: '5 mg',
          role: 'Autophagy & cellular renewal',
          whyMatched:
            'Studied for activating macroautophagy—the overnight cellular housekeeping process that recycles damaged proteins and mitochondria.',
        },
        {
          name: 'Apigenin',
          dose: '50 mg',
          role: 'CD38 inhibition & NAD+ support',
          whyMatched:
            'Inhibits CD38, an enzyme that degrades cellular NAD+ as we age, helping preserve NAD+ availability for sirtuin repair pathways.',
        },
        {
          name: 'Luteolin',
          dose: '50 mg',
          role: 'Microglial & inflammatory balance',
          whyMatched:
            'Neuroprotective flavonoid studied for soothing nocturnal neuroinflammation and supporting healthy cellular aging.',
        },
        {
          name: 'Zinc Citrate (10 mg) & Magnesium Glycinate (80 mg)',
          dose: '90 mg combined',
          role: 'Genomic stability & DNA repair cofactors',
          whyMatched:
            'Essential mineral cofactors required by nocturnal DNA repair enzymes (such as PARP-1 and superoxide dismutase).',
        },
      ],
    };
  }

  // Framing Path 3: Sleep selected, sleep quality 8–10, without qualifying longevity interest
  return {
    eligible: true,
    framingPath: 3,
    isOptionalHabitsBadge: true, // Always framed as optional to explore in Path 3
    headline: 'LIFESPAN+ DeepCell — Optional Nighttime Maintenance & Sleep Optimization',
    rationale: `You reported strong sleep over the past two weeks (${sleepScore}/10). While behavioral consistency is your primary foundation, DeepCell is an optional melatonin-free nighttime formula you can explore to help maintain deep sleep efficiency and overnight recovery during high-stress or travel weeks.`,
    matchedIngredients: [
      {
        name: 'Magnesium Glycinate',
        dose: '80 mg',
        role: 'Nightly nervous system maintenance',
        whyMatched:
          'Supports consistent parasympathetic wind-down and overnight ATP recovery without altering natural hormone signaling.',
      },
      {
        name: 'L-Theanine',
        dose: '200 mg',
        role: 'Next-morning mental clarity',
        whyMatched:
          'Helps buffer occasional evening stress so your sleep quality stays resilient even after demanding days.',
      },
      {
        name: 'Apigenin',
        dose: '50 mg',
        role: 'Slow-wave sleep architecture',
        whyMatched:
          'Supports deep slow-wave sleep stages and overnight cellular renewal without morning drowsiness.',
      },
    ],
  };
}

/**
 * Generates the complete PersonalizedPlanResult from user answers.
 * Every question affects the recommendation, explanation, or presentation.
 */
export function generatePersonalizedPlan(answers: QuizAnswers): PersonalizedPlanResult {
  const { startSlug, nextSlug } = selectProtocols(answers);
  const startHereProtocol = FLAGSHIP_PROTOCOLS[startSlug];
  const addNextProtocol = FLAGSHIP_PROTOCOLS[nextSlug];
  const deepCell = buildDeepCellRecommendation(answers);
  const includeActivate = answers.goals.includes('energy');

  // 1. Build personalized summary reflecting selected goals, reported experience, and motivation
  // Rule: Do NOT infer poor sleep when sleep was not assessed.
  const goalNames = answers.goals.map((g) => GOAL_LABELS[g].toLowerCase());
  const goalsPhrase =
    goalNames.length === 1
      ? goalNames[0]
      : goalNames.length === 2
      ? `${goalNames[0]} and ${goalNames[1]}`
      : `${goalNames[0]}, ${goalNames[1]}, and ${goalNames[2]}`;

  const primaryGoalLabel = answers.primaryGoal
    ? GOAL_LABELS[answers.primaryGoal].toLowerCase()
    : goalNames[0];

  const experienceParts: string[] = [];
  if (answers.goals.includes('sleep') && answers.sleepScore !== null) {
    const sleepFocus =
      answers.sleepImprovements.length > 0
        ? ` (focusing on ${answers.sleepImprovements
            .map((s) => SLEEP_IMPROVEMENT_LABELS[s].toLowerCase())
            .join(' and ')})`
        : '';
    experienceParts.push(`your recent sleep rating of ${answers.sleepScore}/10${sleepFocus}`);
  }
  if (answers.goals.includes('energy') && answers.energyScore !== null) {
    const energyWhen = answers.energyTiming
      ? ` with a priority on ${ENERGY_TIMING_LABELS[answers.energyTiming].toLowerCase()} energy`
      : '';
    experienceParts.push(`your daytime energy rating of ${answers.energyScore}/10${energyWhen}`);
  }
  if (answers.goals.includes('longevity')) {
    experienceParts.push('your high priority on long-term healthspan');
  } else if (answers.longevityPriorityScore !== null) {
    experienceParts.push(
      `your healthspan priority rating of ${answers.longevityPriorityScore}/10`
    );
  }

  const timeLabel = answers.timeAllowance
    ? TIME_ALLOWANCE_LABELS[answers.timeAllowance]
    : '15–30 minutes';
  const approachLabel = answers.approachPreference
    ? APPROACH_PREFERENCE_LABELS[answers.approachPreference].toLowerCase()
    : 'a balanced approach';

  const summaryParagraph =
    answers.goals.length > 1
      ? `You’re working on ${goalsPhrase}, with ${primaryGoalLabel} as your top priority right now. Based on ${experienceParts.join(
          ', '
        )}, and your preference for ${approachLabel} within ${timeLabel.toLowerCase()} most days, we’ve structured a focused starting plan that avoids overlapping tasks.`
      : `You’re focusing on ${goalsPhrase}. Based on ${experienceParts.join(
          ', '
        )}, and your preference for ${approachLabel} within ${timeLabel.toLowerCase()} most days, here is your practical starting plan.`;

  // 2. Build motivation sentence (omit if only "Other" was chosen and left blank)
  const motivationParts: string[] = [];
  for (const m of answers.motivations) {
    if (m === 'other') {
      const cleaned = answers.motivationOtherText.trim();
      if (cleaned.length > 0) {
        motivationParts.push(cleaned);
      }
    } else {
      motivationParts.push(MOTIVATION_LABELS[m].toLowerCase());
    }
  }

  const motivationSentence =
    motivationParts.length > 0
      ? `Why this plan matters: Building steady momentum here is designed to make more room for ${motivationParts.join(
          ' and '
        )}.`
      : null;

  // 3. Filter or size "Start here" actions to fit their additional time allowance
  const isVeryShortTime = answers.timeAllowance === 'up_to_5m';
  const startHereActionsToDisplay = isVeryShortTime
    ? startHereProtocol.actions.filter((a) => a.isCoreForShortTime)
    : startHereProtocol.actions;

  const startHereTimeFitNote =
    answers.timeAllowance === 'up_to_5m'
      ? `Sized for your up-to-5-minute daily window: Start with just the keystone actions below (${startHereProtocol.minimumViableTime}).`
      : answers.timeAllowance === '5_to_15m'
      ? `Fits comfortably inside your 5–15 minute daily investment (${startHereProtocol.typicalTime}).`
      : answers.timeAllowance === '1_to_2h' || answers.timeAllowance === '2h_plus'
      ? `Your ${timeLabel.toLowerCase()} allowance unlocks this comprehensive protocol (${startHereProtocol.typicalTime}) without needing to fill every spare minute.`
      : `Fits within your ${timeLabel.toLowerCase()} daily window (${startHereProtocol.typicalTime}), leaving breathing room in your schedule.`;

  // 4. Explain why the "Start here" protocol matches their specific answers
  const startHereWhyItFits: string[] = [];

  if (answers.primaryGoal === 'sleep' || (answers.goals.includes('sleep') && startSlug.includes('sleep'))) {
    const sleepFocusText =
      answers.sleepImprovements.length > 0
        ? answers.sleepImprovements.map((id) => SLEEP_IMPROVEMENT_LABELS[id].toLowerCase()).join(' & ')
        : 'overall sleep quality';
    startHereWhyItFits.push(
      `Directly targets your goal of ${sleepFocusText} using peer-reviewed circadian and thermal cues.`
    );
  }
  if (answers.goals.includes('energy')) {
    const timingText = answers.energyTiming
      ? ENERGY_TIMING_LABELS[answers.energyTiming].toLowerCase()
      : 'daytime';
    startHereWhyItFits.push(
      `Addresses your ${timingText} energy priority by stabilizing autonomic cortisol, adenosine clearance, or post-meal glycemic response.`
    );
  }
  if (answers.goals.includes('longevity') || (answers.longevityPriorityScore ?? 0) >= 7) {
    startHereWhyItFits.push(
      `Supports long-term healthspan across core biological aging pathways validated in human clinical trials.`
    );
  }
  startHereWhyItFits.push(
    `Aligned with your "${
      answers.approachPreference ? APPROACH_PREFERENCE_LABELS[answers.approachPreference] : 'practical'
    }" preference and ${timeLabel.toLowerCase()} daily time allowance.`
  );

  // 5. Explain why "Add next" complements "Start here"
  const addNextWhyItFits =
    answers.goals.length > 1
      ? `Once your starting routine feels automatic, layer in ${addNextProtocol.shortTitle} to round out your ${goalNames.join(
          ' + '
        )} goals. ${addNextProtocol.deconflictionNote}`
      : `When you want to expand beyond your initial routine, ${addNextProtocol.shortTitle} is the highest-synergy next step (${addNextProtocol.typicalTime}). ${addNextProtocol.deconflictionNote}`;

  // 6. Determine Recommendation Order strictly per spec:
  // - Habits first: Protocol -> DeepCell if eligible -> Activate if eligible
  // - Open to supplements: DeepCell if eligible -> Protocol -> Activate if eligible
  // - Combination: DeepCell if eligible -> Protocol -> Activate if eligible
  // - Exploring ("Show me the options"): Protocol -> DeepCell if eligible -> Activate if eligible
  // When DeepCell is not eligible, the protocol comes first.
  const orderedBlocks: RecommendationBlockType[] = [];
  const deepCellFirst =
    deepCell.eligible &&
    (answers.approachPreference === 'supplements' ||
      answers.approachPreference === 'combination');

  if (deepCellFirst) {
    orderedBlocks.push('deepcell');
    orderedBlocks.push('protocol');
  } else {
    orderedBlocks.push('protocol');
    if (deepCell.eligible) {
      orderedBlocks.push('deepcell');
    }
  }

  if (includeActivate) {
    orderedBlocks.push('activate');
  }

  // 7. Build privacy-safe URLs (ONLY canonical protocol slugs and time tier — zero health scores or motivations)
  const timeToken = encodeURIComponent(
    TIME_ALLOWANCE_URL_TOKENS[answers.timeAllowance || '15_to_30m']
  );
  const levlAppStartUrl = `https://2026-levl-protocols-app.vercel.app/protocols/${startSlug}?ref=levl_quiz&addNext=${nextSlug}&timeBudget=${timeToken}`;
  const longevityReviewsStartUrl = `https://www.longevityreviews.org/protocols/${startSlug}?ref=levl_quiz`;
  const levlAppAddNextUrl = `https://2026-levl-protocols-app.vercel.app/protocols/${nextSlug}?ref=levl_quiz&timeBudget=${timeToken}`;
  const longevityReviewsAddNextUrl = `https://www.longevityreviews.org/protocols/${nextSlug}?ref=levl_quiz`;

  return {
    summaryParagraph,
    motivationSentence,
    startHereProtocol,
    startHereWhyItFits,
    startHereTimeFitNote,
    startHereActionsToDisplay,
    addNextProtocol,
    addNextWhyItFits,
    deepCell,
    includeActivate,
    orderedBlocks,
    levlAppStartUrl,
    longevityReviewsStartUrl,
    levlAppAddNextUrl,
    longevityReviewsAddNextUrl,
  };
}
