export interface ActivateIngredient {
  name: string;
  dose: string;
  function: string;
  daytimeBenefits: string[];
  halls: string[];
  evidenceTag: string;
  whyItMatters: string;
  daytimeBenefitDetail: string;
  daytimeMechanism: string;
  enhancedBenefitsWith: string[];
}

export interface ActivateComparisonRow {
  feature: string;
  tooltip: string;
  levl: boolean | string;
  generic: boolean | string;
  single: boolean | string;
  diy: boolean | string;
}

export const activateContent = {
  title: "LIFESPAN+ Activate",
  shortDescription:
    "A patented-pathway, fasting-inspired morning longevity complex designed to keep cellular autophagy engaged—even with breakfast—while fueling steady NAD+ energy, cognition, and all 12 Hallmarks of Aging.",

  heroBullets: [
    "Engages fasting-induced autophagy pathways—even with a meal",
    "Steady cellular NAD+ & ATP energy with 0 mg caffeine and zero crash",
    "14 active ingredients targeting all 12 Hallmarks of Aging, skin, joints, muscle & brain",
  ],

  purchaseOptions: {
    trustRow: [
      "PhD-Formulated & Physician-Approved",
      "Guided by LEVL's AI Synergy Engine",
      "GMP Certified & 3rd-Party Tested",
      "Clinically Effective Doses • 0 mg Caffeine",
    ],
    disclaimer:
      "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
  },

  ingredients: [
    {
      name: "Trehalose",
      dose: "Autophagy Activator",
      function: "Activates mTOR-independent TFEB cellular cleanup—even with a meal.",
      daytimeBenefits: ["Fasting-Mimetic Autophagy", "Muscle & Brain Performance"],
      halls: ["Autophagy", "Cellular Renewal", "Metabolic Health"],
      evidenceTag: "Strong (Preclinical & Human Translational)",
      whyItMatters:
        "Trehalose is a naturally occurring disaccharide that triggers TFEB nuclear translocation and macroautophagy independently of mTOR—allowing your cells to clear damaged proteins and organelles without requiring prolonged starvation.",
      daytimeBenefitDetail:
        "Extends the cellular renewal benefits of your overnight fast right through breakfast, supporting neuronal proteostasis and clean metabolic energy without glycation spikes.",
      daytimeMechanism:
        "Transiently modulates cellular SLC2A (GLUT) hexose transport at the membrane to mimic a fasting signal, activating AMPK -> ULK1 -> TFEB lysosomal biogenesis.",
      enhancedBenefitsWith: [
        "EGCG (98%)",
        "Glucosamine HCl (Vegan)",
        "Pterostilbene",
      ],
    },
    {
      name: "EGCG (98%)",
      dose: "Green Tea Extract",
      function: "Activates AMPK fasting pathways, metabolic fat oxidation, and epigenetic stability.",
      daytimeBenefits: ["Fasting-Mimetic Autophagy", "Cellular Energy & NAD+"],
      halls: [
        "Autophagy",
        "Metabolic Health",
        "Inflammatory Balance",
        "Mitochondrial Health",
      ],
      evidenceTag: "Strong (Human RCTs)",
      whyItMatters:
        "Ultra-pure 98% Epigallocatechin Gallate directly activates AMPK (the master cellular energy sensor), suppresses senescent-cell SASP inflammation, and modulates DNA methyltransferases to protect epigenetic youth.",
      daytimeBenefitDetail:
        "Promotes metabolic flexibility, calm mental clarity, and vascular endothelial function without caffeine jitters.",
      daytimeMechanism:
        "Elevates cytosolic AMP:ATP signaling to phosphorylate AMPK-alpha, inhibiting mTORC1 and upregulating Nrf2 antioxidant response elements.",
      enhancedBenefitsWith: [
        "Trehalose",
        "Pterostilbene",
        "Nicotinamide Riboside (NR)",
      ],
    },
    {
      name: "Vitamin D3 (as Cholecalciferol)",
      dose: "125 mcg (5,000 IU)",
      function: "Supports telomere preservation, immune resilience, and skeletal longevity.",
      daytimeBenefits: ["Skin & Joint Longevity", "Morning Minerals"],
      halls: [
        "Telomere Preservation",
        "Genomic Stability",
        "Inflammatory Balance",
        "Stem Cell Vitality",
      ],
      evidenceTag: "Strong (Large Human RCTs)",
      whyItMatters:
        "Acting as a secosteroid hormone across 2,000+ genes, clinical Vitamin D3 supplementation is associated with preserved leukocyte telomere length, balanced innate/adaptive immunity, and reduced biological age drift.",
      daytimeBenefitDetail:
        "Anchors morning circadian immune readiness, bone mineral density, and neuromuscular strength.",
      daytimeMechanism:
        "Binds nuclear Vitamin D Receptors (VDR) to regulate antimicrobial peptides, suppress NF-kB inflammatory cascades, and optimize calcium/magnesium transport.",
      enhancedBenefitsWith: [
        "Magnesium Malate",
        "Calcium Alpha-Ketoglutarate (Ca-AKG)",
      ],
    },
    {
      name: "Nicotinamide Riboside (NR)",
      dose: "NAD+ Precursor",
      function: "Clinically shown to boost cellular NAD+ by up to 142% for DNA repair and ATP.",
      daytimeBenefits: ["Cellular Energy & NAD+", "Muscle & Brain Performance"],
      halls: [
        "Mitochondrial Health",
        "Genomic Stability",
        "Cellular Renewal",
        "Stem Cell Vitality",
      ],
      evidenceTag: "Strong (Multiple Human RCTs)",
      whyItMatters:
        "Intracellular NAD+ drops by up to 50% by middle age. NR enters cells directly via nucleoside transporters to replenish NAD+ (+90% to +142% in human trials), fueling SIRT1–SIRT7 longevity sirtuins and PARP1 DNA repair.",
      daytimeBenefitDetail:
        "Delivers steady mitochondrial ATP production and cognitive stamina—providing the cellular benefits of $600+ NAD+ IV drips in a 30-second morning scoop.",
      daytimeMechanism:
        "Phosphorylated by NRK1/2 into NMN and adenylated by NMNAT1–3 into NAD+, driving mitochondrial oxidative phosphorylation andPGC-1alpha biogenesis.",
      enhancedBenefitsWith: [
        "Pterostilbene",
        "Trimethylglycine (TMG)",
        "Calcium Alpha-Ketoglutarate (Ca-AKG)",
      ],
    },
    {
      name: "Trimethylglycine (TMG)",
      dose: "Methyl Donor",
      function: "Protects methylation balance alongside NR and supports healthy homocysteine.",
      daytimeBenefits: ["Cellular Energy & NAD+", "Muscle & Brain Performance"],
      halls: ["Genomic Stability", "Metabolic Health", "Inflammatory Balance"],
      evidenceTag: "Strong (Human Meta-Analyses)",
      whyItMatters:
        "Metabolizing NAD+ precursors consumes methyl groups. TMG (Betaine) donates three methyl groups to regenerate SAMe and remethylate homocysteine into methionine—preventing methyl depletion and lowering homocysteine by 12–23% in human studies.",
      daytimeBenefitDetail:
        "Supports hepatic lipid metabolism, vascular endothelial health, and cellular hydration osmolality.",
      daytimeMechanism:
        "Serves as the methyl donor for Betaine-Homocysteine Methyltransferase (BHMT), maintaining cellular SAM:SAH methylation ratios.",
      enhancedBenefitsWith: [
        "Nicotinamide Riboside (NR)",
        "Glycine",
        "Creatine Monohydrate",
      ],
    },
    {
      name: "Glycine",
      dose: "Collagen & GSH",
      function: "Fuels dermal collagen synthesis, glutathione antioxidant defense, and mitophagy.",
      daytimeBenefits: ["Skin & Joint Longevity", "Fasting-Mimetic Autophagy"],
      halls: [
        "Cellular Renewal",
        "Autophagy",
        "Mitochondrial Health",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong (Human RCTs & Lifespan Studies)",
      whyItMatters:
        "Glycine makes up every third amino acid in human collagen and is the rate-limiting substrate for intracellular glutathione (GSH) synthesis. In NIH Interventions Testing Program studies, glycine significantly extended mammalian lifespan.",
      daytimeBenefitDetail:
        "Supports skin elasticity, fine-line reduction, cartilage matrix repair, and metabolic insulin sensitivity.",
      daytimeMechanism:
        "Combines with gamma-glutamylcysteine via glutathione synthetase to restore GSH redox buffering while buffering excess methionine via GNMT.",
      enhancedBenefitsWith: [
        "Vitamin C (as Sodium Ascorbate)",
        "Glucosamine HCl (Vegan)",
        "Calcium Alpha-Ketoglutarate (Ca-AKG)",
      ],
    },
    {
      name: "Taurine",
      dose: "Mitochondrial Amino",
      function: "Counteracts age-related taurine decline to protect mitochondria, heart, and brain.",
      daytimeBenefits: [
        "Muscle & Brain Performance",
        "Cellular Energy & NAD+",
        "Morning Minerals",
      ],
      halls: [
        "Mitochondrial Health",
        "Stem Cell Vitality",
        "Telomere Preservation",
        "Cellular Renewal",
      ],
      evidenceTag: "Strong (Science 2023 & Human RCTs)",
      whyItMatters:
        "Circulating taurine drops by ~80% over the human lifespan. Landmark research in Science demonstrated that restoring taurine rejuvenates stem cells, reduces cellular senescence, and extends healthy lifespan.",
      daytimeBenefitDetail:
        "Optimizes cardiac contractility, muscular endurance, bile acid metabolism, and calm neurotransmission.",
      daytimeMechanism:
        "Conjugates mitochondrial tRNAs (5-taurinomethyluridine) required for translating electron transport chain Complex I proteins, preventing superoxide leakage.",
      enhancedBenefitsWith: [
        "Creatine Monohydrate",
        "Magnesium Malate",
        "Potassium Aspartate",
      ],
    },
    {
      name: "Pterostilbene",
      dose: "SIRT1 Polyphenol",
      function: "Bioavailable methylated polyphenol (~80% oral bioavailability) that activates SIRT1.",
      daytimeBenefits: ["Fasting-Mimetic Autophagy", "Cellular Energy & NAD+"],
      halls: [
        "Autophagy",
        "Mitochondrial Health",
        "Genomic Stability",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong (Nature npj Aging Human RCT)",
      whyItMatters:
        "With two methoxy groups giving it ~4x greater oral bioavailability than resveratrol, Pterostilbene pairs synergistically with NR—clinically shown in Nature npj Aging to sustain a 90% increase in human cellular NAD+.",
      daytimeBenefitDetail:
        "Crosses the blood-brain barrier to support cognitive sharpness, neuroprotection, and vascular elasticity.",
      daytimeMechanism:
        "Allosterically activates SIRT1 deacetylase (using NAD+ supplied by NR) to deacetylate PGC-1alpha and FOXO3a longevity transcription factors.",
      enhancedBenefitsWith: [
        "Nicotinamide Riboside (NR)",
        "EGCG (98%)",
        "Trehalose",
      ],
    },
    {
      name: "Vitamin C (as Sodium Ascorbate)",
      dose: "Buffered Cofactor",
      function: "Essential cofactor for TET epigenetic demethylation and collagen cross-linking.",
      daytimeBenefits: ["Skin & Joint Longevity", "Morning Minerals"],
      halls: ["Genomic Stability", "Stem Cell Vitality", "Inflammatory Balance"],
      evidenceTag: "Strong (Human RCTs)",
      whyItMatters:
        "Beyond free-radical scavenging, Ascorbate is the obligatory electron donor that recycles Fe2+ in TET DNA demethylases and prolyl/lysyl hydroxylases—working directly with Ca-AKG to reverse age-related epigenetic drift.",
      daytimeBenefitDetail:
        "Stomach-friendly buffered Sodium Ascorbate supports dermal collagen density, immune defense, and gentle morning sodium replenishment.",
      daytimeMechanism:
        "Reduces active-site Fe3+ back to Fe2+ in 2-oxoglutarate-dependent dioxygenases (TET1–3, JmjC, and prolyl-4-hydroxylase).",
      enhancedBenefitsWith: [
        "Calcium Alpha-Ketoglutarate (Ca-AKG)",
        "Glycine",
        "Glucosamine HCl (Vegan)",
      ],
    },
    {
      name: "Glucosamine HCl (Vegan)",
      dose: "Joints & Autophagy",
      function: "Mimics low-carb glycolytic signaling to induce autophagy while cushioning joints.",
      daytimeBenefits: ["Skin & Joint Longevity", "Fasting-Mimetic Autophagy"],
      halls: ["Autophagy", "Metabolic Health", "Inflammatory Balance"],
      evidenceTag: "Strong (Human RCTs & UK Biobank Cohort)",
      whyItMatters:
        "Glucosamine competitively inhibits glucokinase to mimic a low-carbohydrate cellular state—triggering AMPK and mitochondrial biogenesis. Large prospective human cohorts link regular glucosamine use with significantly lower all-cause mortality.",
      daytimeBenefitDetail:
        "Provides the foundational glycosaminoglycan building blocks for articular cartilage cushioning, joint mobility, and skin hyaluronic acid.",
      daytimeMechanism:
        "Enters the hexosamine biosynthetic pathway to synthesize proteoglycans while transiently reducing glycolytic flux to activate AMPK-mediated autophagy.",
      enhancedBenefitsWith: [
        "Glycine",
        "Vitamin C (as Sodium Ascorbate)",
        "Trehalose",
      ],
    },
    {
      name: "Creatine Monohydrate",
      dose: "ATP Phosphagen",
      function: "Rapidly recycles ADP back into ATP in high-demand brain and skeletal muscle tissue.",
      daytimeBenefits: ["Muscle & Brain Performance", "Cellular Energy & NAD+"],
      halls: ["Mitochondrial Health", "Cellular Renewal", "Metabolic Health"],
      evidenceTag: "Gold-Standard (1,000+ Human RCTs)",
      whyItMatters:
        "Preserving lean skeletal muscle and cognitive processing speed are two of the strongest predictors of human healthspan. Creatine buffers intracellular ATP pools and protects against age-related sarcopenia and mental fatigue.",
      daytimeBenefitDetail:
        "Enhances working memory, executive focus, and physical strength output without stimulants.",
      daytimeMechanism:
        "Creatine kinase transfers a high-energy phosphate group from phosphocreatine to ADP, instantaneously regenerating ATP during peak cognitive or muscular demand.",
      enhancedBenefitsWith: [
        "Taurine",
        "Magnesium Malate",
        "Trimethylglycine (TMG)",
      ],
    },
    {
      name: "Magnesium Malate",
      dose: "Krebs Malate + Mg",
      function: "Pairs bioavailable Magnesium with Malate to drive Krebs cycle ATP and DNA repair.",
      daytimeBenefits: ["Morning Minerals", "Cellular Energy & NAD+", "Muscle & Brain Performance"],
      halls: ["Genomic Stability", "Mitochondrial Health", "Metabolic Health"],
      evidenceTag: "Strong (Human Clinical Studies)",
      whyItMatters:
        "Magnesium is a required cofactor for over 600 enzymatic reactions—including every ATP-utilizing enzyme (Mg-ATP) and DNA repair polymerases. Binding Magnesium to Malate (malic acid) feeds directly into the mitochondrial Krebs cycle.",
      daytimeBenefitDetail:
        "Boosts daytime cellular energy, muscle contraction/relaxation, and metabolic efficiency without GI distress.",
      daytimeMechanism:
        "Malate dehydrogenase oxidizes malate to oxaloacetate in the tricarboxylic acid (TCA) cycle, generating NADH for Complex I oxidative phosphorylation.",
      enhancedBenefitsWith: [
        "Potassium Aspartate",
        "Creatine Monohydrate",
        "Vitamin D3 (as Cholecalciferol)",
      ],
    },
    {
      name: "Potassium Aspartate",
      dose: "Cellular Mineral",
      function: "Completes the Malate-Aspartate NADH shuttle while supporting intracellular hydration.",
      daytimeBenefits: ["Morning Minerals", "Cellular Energy & NAD+"],
      halls: ["Mitochondrial Health", "Inflammatory Balance", "Metabolic Health"],
      evidenceTag: "Moderate-Strong (Human Bioenergetic Trials)",
      whyItMatters:
        "Potassium is the primary intracellular cation maintaining membrane potential and vascular compliance. Pairing Potassium with Aspartate complements Magnesium Malate to complete the mitochondrial Malate-Aspartate NADH shuttle.",
      daytimeBenefitDetail:
        "Supports crisp neuromuscular signaling, healthy blood pressure, and clean morning mineral hydration.",
      daytimeMechanism:
        "Transports cytosolic NADH reducing equivalents across the inner mitochondrial membrane via the malate-aspartate shuttle for aerobic ATP synthesis.",
      enhancedBenefitsWith: [
        "Magnesium Malate",
        "Taurine",
        "Vitamin C (as Sodium Ascorbate)",
      ],
    },
    {
      name: "Calcium Alpha-Ketoglutarate (Ca-AKG)",
      dose: "Epigenetic & Krebs",
      function: "Rate-determining Krebs metabolite and TET cofactor shown to slow pace of aging.",
      daytimeBenefits: [
        "Fasting-Mimetic Autophagy",
        "Cellular Energy & NAD+",
        "Skin & Joint Longevity",
      ],
      halls: [
        "Autophagy",
        "Mitochondrial Health",
        "Stem Cell Vitality",
        "Cellular Renewal",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong (Buck Institute & Human Aging Clock Data)",
      whyItMatters:
        "Plasma AKG levels drop ~10-fold between ages 40 and 80. Ca-AKG fuels the Krebs cycle, mimics caloric restriction by gently modulating mTOR/ATP synthase, and serves as the essential co-substrate for TET epigenetic demethylases.",
      daytimeBenefitDetail:
        "Supports biological age deceleration, amino acid/collagen synthesis, and metabolic flexibility.",
      daytimeMechanism:
        "Acts as the obligatory 2-oxoglutarate co-substrate for TET1–3 DNA demethylases and JmjC histone demethylases when paired with Vitamin C.",
      enhancedBenefitsWith: [
        "Vitamin C (as Sodium Ascorbate)",
        "Nicotinamide Riboside (NR)",
        "Glycine",
      ],
    },
  ] as ActivateIngredient[],

  comparisonTable: {
    headers: [
      "Feature",
      "LIFESPAN+ Activate",
      "Longevity Powders",
      "Energy Drinks",
      "NAD+ IV Clinics",
    ],
    rows: [
      {
        feature: "Targets All 12 Hallmarks of Aging",
        tooltip:
          "Addresses autophagy, NAD+, epigenetics, proteostasis, telomeres, stem cells, and mitochondrial health in one formula.",
        levl: true,
        generic: "4–6 Hallmarks",
        single: false,
        diy: "Partial",
      },
      {
        feature: "Fasting-Mimetic Autophagy (With a Meal)",
        tooltip:
          "Combines Trehalose, EGCG, Glucosamine, and Pterostilbene to keep cellular cleanup engaged even with breakfast.",
        levl: true,
        generic: false,
        single: false,
        diy: false,
      },
      {
        feature: "Steady Cellular ATP & NAD+ (0 mg Caffeine)",
        tooltip:
          "Builds true cellular energy via NR, Creatine, Magnesium Malate, and Taurine without stimulant crashes or sleep disruption.",
        levl: true,
        generic: true,
        single: "200mg+ Caffeine",
        diy: "2–4 Hr IV Drip",
      },
      {
        feature: "Built-In Methylation Protection (TMG + Glycine)",
        tooltip:
          "Prevents methyl donor depletion and supports healthy homocysteine when elevating NAD+ with Nicotinamide Riboside.",
        levl: true,
        generic: false,
        single: false,
        diy: false,
      },
      {
        feature: "Skin, Joint, Muscle & Brain Matrix",
        tooltip:
          "Includes Creatine + Taurine for muscle/brain ATP and Glycine + Vitamin C + Vegan Glucosamine + Ca-AKG for collagen & joints.",
        levl: true,
        generic: "Partial",
        single: false,
        diy: false,
      },
      {
        feature: "Krebs Cycle Malate & Morning Minerals",
        tooltip:
          "Uses Magnesium Malate, Potassium Aspartate, and Sodium Ascorbate to power the mitochondrial NADH shuttle.",
        levl: true,
        generic: "Basic Salts",
        single: "High Sugar/Salt",
        diy: false,
      },
      {
        feature: "Guided by LEVL AI Synergy Engine",
        tooltip:
          "Formulated by PhD researchers and MDs to maximize multi-pathway synergy and screen out antagonistic interactions.",
        levl: true,
        generic: false,
        single: false,
        diy: false,
      },
      {
        feature: "Monthly Cost / Convenience",
        tooltip:
          "Replaces 14 separate bottles ($318+/mo) and invasive clinic NAD+ IV drips ($600–$1,000+ per session) in 1 daily scoop.",
        levl: "1 Daily Scoop",
        generic: "$90–$140/mo",
        single: "$90+/mo",
        diy: "$600+/session",
      },
    ] as ActivateComparisonRow[],
  },

  benefitsByAge: [
    {
      id: "20s",
      label: "In your 20s",
      title: "Peak Bioenergetics, Brain Stamina & Proactive Preservation",
      description:
        "In your 20s, laying a foundation of cellular cleanup, optimal vitamin D3, and phosphocreatine/NAD+ bioenergetics compounds across decades—fueling high cognitive and athletic output without heavy stimulants.",
      bodyChanges: [
        "High training & cognitive demands deplete ATP and intracellular minerals",
        "Heavy caffeine reliance masks fatigue and erodes deep sleep quality",
        "Early UV and metabolic oxidative stress begins in skin and vascular tissues",
      ],
      levlBenefits: [
        "Fuels clean muscular & cerebral ATP via Creatine, Taurine, and Magnesium Malate",
        "Extends morning autophagy without sacrificing the protein needed for muscle growth",
        "Protects collagen, telomeres, and antioxidant defenses early with Glycine, Vitamin C & D3",
      ],
    },
    {
      id: "30s",
      label: "In your 30s",
      title: "Countering Early NAD+ Decline & Sustaining All-Day Drive",
      description:
        "During your 30s, intracellular NAD+ and basal autophagy efficiency begin their measurable decline, while career and family stress demand steady daytime focus and metabolic resilience.",
      bodyChanges: [
        "Cellular NAD+ and endogenous collagen synthesis begin dropping ~1–1.5% per year",
        "Post-meal glucose dips and afternoon brain fog become more frequent",
        "Strict intermittent fasting can elevate cortisol or disrupt hormone balance",
      ],
      levlBenefits: [
        "Replenishes NAD+ with NR + Pterostilbene while protecting methylation via TMG",
        "Keeps fasting-aligned cellular renewal engaged even alongside a nourishing breakfast",
        "Supports dermal collagen elasticity and preventative joint mobility with Glycine & Glucosamine",
      ],
    },
    {
      id: "40s",
      label: "In your 40s",
      title: "Decelerating Pace of Aging, Epigenetic Drift & Joint Wear",
      description:
        "In your 40s, plasma Alpha-Ketoglutarate (AKG) and Taurine drop sharply, epigenetic methylation marks drift, and joint recovery slows. Activate targets all 12 Hallmarks of Aging simultaneously.",
      bodyChanges: [
        "Endogenous AKG and Taurine pools decline significantly, slowing mitochondrial turnover",
        "Epigenetic alterations accelerate biological Pace of Aging",
        "Early joint stiffness and slower recovery between workouts appear",
      ],
      levlBenefits: [
        "Pairs Ca-AKG + Vitamin C to support TET epigenetic demethylation and slow pace of aging",
        "Delivers Vegan Glucosamine HCl + Glycine to cushion joints and induce cellular autophagy",
        "Restores clean daytime energy and metabolic flexibility via EGCG, NR, and Magnesium Malate",
      ],
    },
    {
      id: "50s",
      label: "In your 50s",
      title: "Mitochondrial Rejuvenation, Vascular Health & Muscle Retention",
      description:
        "By your 50s, intracellular NAD+ has fallen by nearly half, homocysteine and arterial stiffness tend to rise, and preserving lean skeletal muscle becomes critical for metabolic health.",
      bodyChanges: [
        "Up to 50% decline in cellular NAD+ impairs Sirtuin DNA repair and mitochondrial output",
        "Age-related muscle loss makes caloric-restriction fasting counterproductive",
        "Systolic blood pressure, homocysteine, and systemic inflammaging increase",
      ],
      levlBenefits: [
        "Restores NAD+ and supports healthy blood pressure & homocysteine with NR + TMG + Taurine",
        "Delivers fasting-mimetic autophagy WITHOUT the muscle loss of caloric restriction",
        "Supports muscle & cognitive strength with Creatine Monohydrate and bioenergetic Malate",
      ],
    },
    {
      id: "60s",
      label: "In your 60s+",
      title: "Comprehensive Cellular Renewal, Neuroprotection & Independence",
      description:
        "In your 60s and beyond, clearing senescent cellular debris, protecting neuronal proteostasis, and maintaining physical strength, bone density, and immune resilience are paramount.",
      bodyChanges: [
        "Impaired macroautophagy and loss of proteostasis allow cellular debris to accumulate",
        "80% drop in circulating Taurine and 10-fold drop in AKG compromise stem cell vitality",
        "Cartilage thinning, bone mineral loss, and immunosenescence accelerate",
      ],
      levlBenefits: [
        "Activates multi-pathway autophagy and proteostasis via Trehalose, EGCG, and Glucosamine",
        "Replenishes critical longevity metabolites (NR, Ca-AKG, Taurine, Glycine, Vitamin D3)",
        "Supports cognitive sharpness, joint mobility, and cardiovascular vitality every morning",
      ],
    },
  ],

  faqs: [
    {
      question: "How does LIFESPAN+ Activate support fasting pathways even with a meal?",
      answer:
        "Traditional caloric fasting triggers autophagy (cellular cleanup) by depleting cellular glucose and raising the AMP:ATP ratio. LIFESPAN+ Activate combines mTOR-independent and glycolytic-modulating compounds—including Trehalose, EGCG (98%), Vegan Glucosamine HCl, and Pterostilbene—that transiently modulate cellular glucose transport and activate AMPK, SIRT1, and TFEB lysosomal pathways even when taken alongside your first meal.",
    },
    {
      question: "Why is Activate ideal for women, athletes, and people who don't want to fast?",
      answer:
        "While prolonged caloric restriction activates autophagy, it can also spike cortisol, disrupt thyroid and reproductive hormones, and accelerate skeletal muscle loss in athletes and older adults. Activate uncouples autophagy signaling from starvation—allowing you to eat a nourishing, protein-rich breakfast while keeping cellular renewal pathways engaged.",
    },
    {
      question: "Does LIFESPAN+ Activate contain caffeine or stimulants?",
      answer:
        "No. Activate contains 0 mg of caffeine and zero central nervous system stimulants. It builds true cellular energy through Nicotinamide Riboside (NAD+ synthesis), Creatine Monohydrate (ATP buffering), Magnesium Malate (Krebs cycle malate flux), and Taurine. You can take it with or without morning coffee, and it will never disrupt your evening sleep.",
    },
    {
      question: "How does Activate compare to $600+ NAD+ IV drips?",
      answer:
        "Clinic NAD+ IV infusions cost $600–$1,000+ per session, require sitting with an IV catheter for 2–4 hours, and infuse extracellular NAD+ that must be broken down before entering cells. Activate uses Nicotinamide Riboside (NR) paired with Pterostilbene (clinically shown to raise human NAD+ by 90–142%) and Trimethylglycine (TMG) to directly elevate intracellular NAD+ every morning in 30 seconds.",
    },
    {
      question: "Why did you include Trimethylglycine (TMG) alongside Nicotinamide Riboside (NR)?",
      answer:
        "When the body processes NAD+ precursors like NR, excess nicotinamide is methylated for excretion, which can draw down your cellular methyl pool (SAMe) and raise homocysteine. LEVL's AI Synergy Engine pairs NR with TMG and Glycine to replenish methyl groups and support healthy homocysteine levels.",
    },
    {
      question: "Why do you use Magnesium Malate and Potassium Aspartate for morning minerals?",
      answer:
        "Instead of loading the formula with high-sodium table salt, we use Magnesium Malate and Potassium Aspartate (alongside buffered Sodium Ascorbate and Ca-AKG) because Malate and Aspartate are direct intermediates of the mitochondrial Krebs cycle and Malate-Aspartate NADH shuttle—supporting both intracellular mineral hydration and ATP generation.",
    },
    {
      question: "How do LIFESPAN+ Activate and LIFESPAN+ DeepCell work together?",
      answer:
        "Aging biology follows a 24-hour circadian rhythm. LIFESPAN+ Activate is engineered for the morning (driving NAD+ synthesis, mitochondrial ATP, and fasting-aligned autophagy with breakfast), while LIFESPAN+ DeepCell is engineered for the evening (optimizing deep sleep architecture, glymphatic brain clearance, and overnight cellular repair) with zero ingredient overlap.",
    },
  ],
};
