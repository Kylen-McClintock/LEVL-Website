export interface ActivateIngredient {
  elementNumber: string;
  symbol: string;
  name: string;
  subtitle?: string;
  specBadge: string;
  longevityBenefitShort: string;
  functionalBenefitShort: string;
  functionalCategories: string[];
  halls: string[];
  evidenceTag: "Strong" | "Moderate-Strong" | "Emerging";
  clinicalBenchmark: string;
  longevityMechanism: string;
  functionalBenefit: string;
  biochemicalMechanism: string;
  enhancedBenefitsWith: string[];
}

export interface ActivateTimelineItem {
  id: string;
  time: string;
  headline: string;
  stats: string[];
  points: string[];
  accentColor: string;
}

export interface ActivateComparisonRow {
  feature: string;
  tooltip: string;
  activate: string;
  otherLongevity: string;
  energyDrinks: string;
  nadIv: string;
}

export const ACTIVATE_FUNCTIONAL_CATEGORIES = [
  "Cellular Energy & NAD+",
  "Fasting & Metabolism",
  "Muscle & Brain",
  "Skin & Joint Longevity",
  "Morning Minerals",
  "Immune & Vascular",
] as const;

export const ACTIVATE_HALLMARKS = [
  "Autophagy",
  "Nutrient Sensing",
  "Mitochondrial Health",
  "Epigenetic Stability",
  "Genomic Stability",
  "Proteostasis",
  "Cellular Renewal",
  "Inflammatory Balance",
  "Intercellular Communication",
  "Stem Cell Vitality",
  "Telomere Preservation",
  "Microbiome Health",
] as const;

export const activateContent = {
  name: "LIFESPAN+ Activate",
  tagline: "End Your Fast, Not Your Autophagy.",
  seoTitle: "LIFESPAN+ Activate | Fasting-Inspired Daytime Longevity Complex | LEVL Health",
  shortDescription:
    "Patented, fasting-inspired daytime longevity complex formulated to keep cellular renewal and autophagy pathways engaged—even with breakfast—while replenishing NAD+, mitochondrial ATP, and morning minerals without caffeine crashes.",

  heroBullets: [
    "Engages fasting-associated autophagy & cellular cleanup pathways—even alongside your first meal",
    "Replenishes intracellular NAD+, mitochondrial ATP, and clean morning minerals (0 mg caffeine)",
    "14 synergistic actives targeting all 12 Hallmarks of Aging, skin & joint health, and muscle & brain vitality",
  ],

  trustBadges: [
    "PhD-Formulated & Physician-Approved",
    "Guided by LEVL’s AI Synergy Engine",
    "14 Clinically Aligned Actives",
    "0 mg Caffeine • Zero Added Sugar",
    "GMP Certified & 3rd-Party Tested",
    "Ultra-High Purity • USA Formulated",
  ],

  clinicalClaims: [
    {
      metric: "+142%",
      title: "Clinically Shown to Raise NAD+",
      detail:
        "1,000 mg Nicotinamide Riboside (NR) increased intracellular NAD+ by ~142% in two weeks in healthy adults.",
      citation: "Conze et al., Scientific Reports (2019); Trammell et al., Nature Communications (2016)",
    },
    {
      metric: "+90%",
      title: "Synergistic NAD+ Elevation",
      detail:
        "NR paired with Pterostilbene sustained whole-blood NAD+ increases of up to ~90% over 30 days in a double-blind human trial.",
      citation: "Dellinger et al., npj Aging and Mechanisms of Disease / Nature (2017)",
      url: "https://www.nature.com/articles/s41514-017-0016-9",
    },
    {
      metric: "-9 mmHg",
      title: "Supports Healthy Blood Pressure",
      detail:
        "NR supplementation reduced systolic blood pressure by ~9 mmHg and arterial stiffness in 6 weeks among older adults.",
      citation: "Martens et al., Nature Communications (2018)",
    },
    {
      metric: "-12–23%",
      title: "Maintains Healthy Methylation",
      detail:
        "1.5 g Trimethylglycine (TMG) lowered plasma homocysteine by 12–23% in 6 weeks, protecting methyl donor pools alongside NAD+ precursors.",
      citation: "Olthof et al., American Journal of Clinical Nutrition (2003); McRae (2013)",
    },
    {
      metric: "+58%",
      title: "Replenishes Plasma Vitamin C",
      detail:
        "250 mg/day Vitamin C raised plasma ascorbate ~58% in 6 weeks, fueling prolyl/lysyl hydroxylases for collagen synthesis and TET epigenetics.",
      citation: "Levine et al., PNAS (1996)",
    },
    {
      metric: "16 Wks",
      title: "Enhances Antioxidant Defenses",
      detail:
        "1.5 g Taurine/day significantly improved systemic superoxide dismutase (SOD) antioxidant capacity in women aged 55–70 over 16 weeks.",
      citation: "Abud et al., Nutrition (2022); Singh et al., Science (2023)",
    },
  ],

  timeline: [
    {
      id: "today",
      time: "Today (Day 1)",
      headline: "Energy, Hydration & Mental Clarity",
      stats: [
        "0 mg Caffeine • Zero Jitters",
        "Fasting-Aligned Breakfast Ritual",
      ],
      points: [
        "Clean morning minerals (Magnesium Malate & Potassium Aspartate) restore cellular hydration and Krebs cycle ATP flux",
        "Sustained mental clarity and physical readiness without stimulant spikes or afternoon crashes",
        "Keeps fasting-associated autophagy signaling engaged even when taken alongside your first meal",
      ],
      accentColor: "var(--color-levl-cyan)",
    },
    {
      id: "2-weeks",
      time: "2 Weeks",
      headline: "NAD+ Replenishment & Metabolic Flexibility",
      stats: [
        "Up to +90–142% NAD+ Pathway Support",
        "Balanced Methylation Pool",
      ],
      points: [
        "NR + Pterostilbene synergy elevates intracellular NAD+ to fuel Sirtuin (SIRT1/SIRT3) repair enzymes",
        "TMG (Trimethylglycine) replenishes methyl groups and supports healthy homocysteine metabolism",
        "Phosphocreatine and Taurine buffers saturate muscle and neural tissues for smoother all-day stamina",
      ],
      accentColor: "#f59e0b",
    },
    {
      id: "1-month",
      time: "1 Month",
      headline: "Joint, Skin & Immune Resilience",
      stats: [
        "Collagen & Cartilage Matrix Support",
        "Enhanced Endurance & Recovery",
      ],
      points: [
        "Glycine, Sodium Ascorbate (Vitamin C), and Ca-AKG support dermal collagen synthesis and skin elasticity",
        "Vegan Glucosamine HCl cushions joint cartilage while inducing glycolytic hormesis and cellular cleanup",
        "Vitamin D3 (5,000 IU) and Taurine strengthen innate immune balance and accelerate post-training recovery",
      ],
      accentColor: "var(--color-levl-green)",
    },
    {
      id: "long-term",
      time: "Long Term (3–6+ Mos)",
      headline: "Slowed Pace of Aging & Organ Vitality",
      stats: [
        "All 12 Hallmarks of Aging Targeted",
        "Epigenetic & Vascular Longevity",
      ],
      points: [
        "Ca-AKG, NR, Pterostilbene, and EGCG work across all 12 Hallmarks of Aging to decelerate biological pace of aging",
        "Supports healthy blood pressure, endothelial nitric oxide signaling, and cardiovascular longevity",
        "Compounding DNA repair, proteostasis, and neuroprotection for better todays and more tomorrows",
      ],
      accentColor: "var(--color-levl-magenta)",
    },
  ] as ActivateTimelineItem[],

  ingredients: [
    {
      elementNumber: "01",
      symbol: "Tr",
      name: "Trehalose",
      subtitle: "(Fasting-Mimetic Disaccharide)",
      specBadge: "mTOR-Independent",
      longevityBenefitShort: "Autophagy & Protein Folding (Proteostasis)",
      functionalBenefitShort: "Fasting-Aligned Cellular Cleanup & Brain Clarity",
      functionalCategories: ["Fasting & Metabolism", "Muscle & Brain"],
      halls: ["Autophagy", "Proteostasis", "Nutrient Sensing", "Cellular Renewal"],
      evidenceTag: "Moderate-Strong",
      clinicalBenchmark: "Studied for TFEB lysosomal biogenesis & vascular/metabolic resilience",
      longevityMechanism:
        "Trehalose acts as an mTOR-independent autophagy inducer and chemical chaperone. It transiently modulates cellular glucose transport (SLC2A/GLUT), creating a localized pseudo-fasting signal that activates AMPK and triggers nuclear translocation of TFEB—the master regulator of lysosomal biogenesis and cellular cleanup—while stabilizing proteins against misfolding.",
      functionalBenefit:
        "Allows you to extend the cellular housekeeping benefits of your overnight fast into the morning—even when taken with breakfast—supporting neural clarity and metabolic resilience without severe caloric restriction.",
      biochemicalMechanism:
        "By mildly perturbing hepatocyte and neuronal glucose carrier flux, trehalose phosphorylates ULK1 at Ser317/Ser777 via AMPK without requiring mTORC1 suppression, while directly forming a protective hydration shell around vulnerable proteins.",
      enhancedBenefitsWith: ["EGCG (98%)", "Glucosamine HCl (Vegan)", "Pterostilbene", "Nicotinamide Riboside (NR)"],
    },
    {
      elementNumber: "02",
      symbol: "Eg",
      name: "EGCG (98%)",
      subtitle: "(Epigallocatechin Gallate • Green Tea Extract)",
      specBadge: "98% Standardized",
      longevityBenefitShort: "AMPK Activation, Senomorphic & Epigenetic Balance",
      functionalBenefitShort: "Metabolic Fat Oxidation & Calm Cognitive Focus",
      functionalCategories: ["Fasting & Metabolism", "Cellular Energy & NAD+", "Immune & Vascular"],
      halls: [
        "Autophagy",
        "Nutrient Sensing",
        "Cellular Renewal",
        "Epigenetic Stability",
        "Inflammatory Balance",
        "Microbiome Health",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "High-purity 98% standardized green tea polyphenol",
      longevityMechanism:
        "EGCG is a premier AMPK activator and senomorphic polyphenol. It suppresses hyperactive mTORC1 signaling, stimulates hepatic and vascular autophagy, inhibits DNA methyltransferases (DNMTs) to preserve epigenetic youthfulness, and dampens the toxic Senescence-Associated Secretory Phenotype (SASP).",
      functionalBenefit:
        "Supports daytime metabolic rate, insulin sensitivity, and substrate flexibility (shifting fuel utilization toward lipid oxidation) while promoting calm, jitter-free cognitive focus and prebiotic microbiome balance.",
      biochemicalMechanism:
        "Activates LKB1/AMPK signaling, inhibits NF-κB nuclear translocation, acts as an intracellular zinc ionophore, and remodels gut microbial diversity toward beneficial short-chain fatty acid (SCFA) producers.",
      enhancedBenefitsWith: ["Trehalose", "Pterostilbene", "Nicotinamide Riboside (NR)", "Vitamin C (as Sodium Ascorbate)"],
    },
    {
      elementNumber: "03",
      symbol: "D3",
      name: "Vitamin D3",
      subtitle: "(as Cholecalciferol • 125 mcg / 50 mg)",
      specBadge: "125 mcg (5,000 IU)",
      longevityBenefitShort: "Telomere Preservation & Epigenetic Gene Regulation",
      functionalBenefitShort: "Immune Resilience, Bone Density & Mood Support",
      functionalCategories: ["Immune & Vascular", "Muscle & Brain", "Skin & Joint Longevity"],
      halls: [
        "Telomere Preservation",
        "Epigenetic Stability",
        "Genomic Stability",
        "Inflammatory Balance",
        "Stem Cell Vitality",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "125 mcg (5,000 IU) cholecalciferol clinically studied for optimal serum 25(OH)D",
      longevityMechanism:
        "Acting as a secosteroid hormone across over 900 target genes via the Vitamin D Receptor (VDR), Vitamin D3 is associated in human randomized trials (including the VITAL telomere sub-study) with preserved leukocyte telomere length, reduced epigenetic aging drift, and balanced innate/adaptive immunity.",
      functionalBenefit:
        "Strengthens daytime immune defense, supports calcium/mineral absorption for skeletal and joint integrity, and maintains neuromuscular power and daytime mood stability.",
      biochemicalMechanism:
        "VDR heterodimerizes with RXR to regulate transcriptional programs governing antimicrobial peptides (cathelicidin), T-regulatory cell differentiation, and telomerase (hTERT) maintenance.",
      enhancedBenefitsWith: ["Magnesium Malate", "Calcium Alpha-Ketoglutarate (Ca-AKG)", "Vitamin C (as Sodium Ascorbate)"],
    },
    {
      elementNumber: "04",
      symbol: "NR",
      name: "Nicotinamide Riboside (NR)",
      subtitle: "(Direct Intracellular NAD+ Precursor)",
      specBadge: "NAD+ Precursor",
      longevityBenefitShort: "NAD+ Restoration, Sirtuin Activation & DNA Repair",
      functionalBenefitShort: "Sustained Mitochondrial ATP & Vascular Health",
      functionalCategories: ["Cellular Energy & NAD+", "Muscle & Brain", "Immune & Vascular"],
      halls: [
        "Mitochondrial Health",
        "Genomic Stability",
        "Epigenetic Stability",
        "Nutrient Sensing",
        "Stem Cell Vitality",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Clinically shown to raise NAD+ ~142% in 2 weeks & lower systolic BP ~9 mmHg in 6 weeks",
      longevityMechanism:
        "Intracellular NAD+ declines by up to 50% by middle age, starving Sirtuins (SIRT1–SIRT7) and PARP-1 DNA repair enzymes. NR bypasses the rate-limiting NAMPT bottleneck via NRK1/NRK2 kinases to directly replenish cellular NAD+—delivering clinic-level NAD+ restoration without painful, $600+ IV drips.",
      functionalBenefit:
        "Drives steady daytime mitochondrial ATP production, mental stamina, and healthy endothelial blood pressure regulation without relying on central nervous system stimulants.",
      biochemicalMechanism:
        "Phosphorylated by nicotinamide riboside kinases (NRK1/2) into NMN and converted by NMNAT into NAD+, fueling SIRT1 deacetylation of PGC-1α (mitochondrial biogenesis) and SIRT3 activation of mitochondrial antioxidant enzymes.",
      enhancedBenefitsWith: ["Pterostilbene", "Trimethylglycine (TMG)", "Magnesium Malate", "Calcium Alpha-Ketoglutarate (Ca-AKG)"],
    },
    {
      elementNumber: "05",
      symbol: "TMG",
      name: "Trimethylglycine (TMG)",
      subtitle: "(Betaine Anhydrous • Methyl Donor)",
      specBadge: "Methylation Partner",
      longevityBenefitShort: "Epigenetic Methylation & Homocysteine Clearance",
      functionalBenefitShort: "Methyl Balance with NR, Liver & Power Output",
      functionalCategories: ["Cellular Energy & NAD+", "Fasting & Metabolism", "Immune & Vascular"],
      halls: [
        "Epigenetic Stability",
        "Genomic Stability",
        "Intercellular Communication",
        "Mitochondrial Health",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "1.5 g TMG shown to lower homocysteine by 12–23% in 6 weeks",
      longevityMechanism:
        "As NAD+ precursors (like NR) are metabolized, nicotinamide is methylated by NNMT for clearance, which can deplete cellular methyl pools (SAMe). TMG donates methyl groups via BHMT to remethylate homocysteine into methionine, safeguarding S-adenosylmethionine (SAMe) for youthful DNA methylation and cardiovascular protection.",
      functionalBenefit:
        "Prevents methyl-depletion fatigue when boosting NAD+, supports healthy homocysteine and cardiovascular function, acts as a cellular osmolyte for hydration, and enhances muscular power output.",
      biochemicalMechanism:
        "Betaine-homocysteine S-methyltransferase (BHMT) transfers a methyl group from TMG to homocysteine, generating methionine and dimethylglycine (DMG) while preserving the SAMe:SAH methylation index.",
      enhancedBenefitsWith: ["Nicotinamide Riboside (NR)", "Glycine", "Creatine Monohydrate", "Pterostilbene"],
    },
    {
      elementNumber: "06",
      symbol: "Gly",
      name: "Glycine",
      subtitle: "(Rate-Limiting Collagen & Glutathione Amino Acid)",
      specBadge: "Collagen & GSH",
      longevityBenefitShort: "Glutathione Synthesis, Mitophagy & Epigenetic Youth",
      functionalBenefitShort: "Skin Collagen Elasticity, Metabolic & Glucose Control",
      functionalCategories: ["Skin & Joint Longevity", "Fasting & Metabolism", "Immune & Vascular"],
      halls: [
        "Proteostasis",
        "Mitochondrial Health",
        "Autophagy",
        "Epigenetic Stability",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Validated in ITP lifespan studies (+4–6% lifespan) & human GlyNAC trials",
      longevityMechanism:
        "Glycine is one of the few compounds validated by the NIA Interventions Testing Program (ITP) to extend mammalian lifespan. It serves as the rate-limiting substrate for intracellular glutathione (GSH) synthesis, acts as a methyl-group buffer via GNMT (mimicking methionine restriction), and reverses age-related mitochondrial defect in aging fibroblasts.",
      functionalBenefit:
        "Comprises every third residue (Gly-X-Y) of the triple-helix collagen structure—directly fueling skin firmness, dermal elasticity, and tendon/cartilage repair while blunting post-meal glucose spikes.",
      biochemicalMechanism:
        "Combines with gamma-glutamylcysteine via glutathione synthetase to form GSH; activates glycine-gated chloride channels on macrophages and endothelial cells to blunt inflammatory cytokine signaling.",
      enhancedBenefitsWith: ["Vitamin C (as Sodium Ascorbate)", "Calcium Alpha-Ketoglutarate (Ca-AKG)", "Glucosamine HCl (Vegan)", "Taurine"],
    },
    {
      elementNumber: "07",
      symbol: "Tau",
      name: "Taurine",
      subtitle: "(Semi-Essential Cytoprotective Amino Sulfonic Acid)",
      specBadge: "Cytoprotective",
      longevityBenefitShort: "Mitochondrial tRNA Fidelity & Senescence Reduction",
      functionalBenefitShort: "Endurance, Antioxidant Defense & Cellular Osmolyte",
      functionalCategories: ["Muscle & Brain", "Cellular Energy & NAD+", "Morning Minerals", "Immune & Vascular"],
      halls: [
        "Mitochondrial Health",
        "Cellular Renewal",
        "Stem Cell Vitality",
        "Genomic Stability",
        "Proteostasis",
        "Intercellular Communication",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Circulating taurine drops ~80% with age (Science, 2023); 1.5 g/day boosts human SOD antioxidant capacity",
      longevityMechanism:
        "Landmark research in Science (2023) revealed that blood taurine concentrations decline by ~80% across human aging, and restoring taurine extended healthy lifespan while reducing cellular senescence, DNA damage, telomerase deficiency, and mitochondrial dysfunction.",
      functionalBenefit:
        "Regulates intracellular calcium and electrolyte osmoregulation in cardiac and skeletal muscle, improves VO2 max and time-to-exhaustion, and protects retinal and neural tissues from oxidative stress.",
      biochemicalMechanism:
        "Conjugates with mitochondrial tRNAs (5-taurinomethyluridine modification) required for translating electron transport chain Complex I subunits, preventing mitochondrial ROS leakage.",
      enhancedBenefitsWith: ["Creatine Monohydrate", "Magnesium Malate", "Potassium Aspartate", "Glycine"],
    },
    {
      elementNumber: "08",
      symbol: "Pt",
      name: "Pterostilbene",
      subtitle: "(Dimethylated Blueberry Polyphenol • 80% Bioavailability)",
      specBadge: "SIRT1 Activator",
      longevityBenefitShort: "SIRT1 Sirtuin Activation & Nrf2 Detoxification",
      functionalBenefitShort: "Cognitive Sharpness, Vascular & Skin Photo-Protection",
      functionalCategories: ["Cellular Energy & NAD+", "Muscle & Brain", "Fasting & Metabolism", "Skin & Joint Longevity"],
      halls: [
        "Epigenetic Stability",
        "Nutrient Sensing",
        "Mitochondrial Health",
        "Autophagy",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Clinically paired with NR to raise human NAD+ up to ~90% in 30 days (Nature / npj Aging)",
      longevityMechanism:
        "A dimethylated structural analog of resveratrol with ~4x higher oral bioavailability (~80% vs ~20%) and a 7x longer half-life. While NR provides the NAD+ fuel, Pterostilbene allosterically activates SIRT1 and AMPK—creating the exact dual-engine synergy needed for epigenetic maintenance and mitochondrial biogenesis.",
      functionalBenefit:
        "Crosses the blood-brain barrier to support working memory, dopamine/acetylcholine signaling, and neuroprotection while shielding dermal collagen from UV-induced oxidative stress.",
      biochemicalMechanism:
        "Allosterically lowers the Michaelis constant (Km) of SIRT1 for acetylated substrates and NAD+, while dissociating Keap1-Nrf2 to upregulate heme oxygenase-1 (HO-1), SOD, and catalase.",
      enhancedBenefitsWith: ["Nicotinamide Riboside (NR)", "EGCG (98%)", "Trehalose", "Trimethylglycine (TMG)"],
    },
    {
      elementNumber: "09",
      symbol: "Vc",
      name: "Vitamin C (as Sodium Ascorbate)",
      subtitle: "(Non-Acidic Buffered Ascorbate + Trace Sodium)",
      specBadge: "Buffered Ascorbate",
      longevityBenefitShort: "TET Epigenetic Demethylation & Redox Recycling",
      functionalBenefitShort: "Collagen Cross-Linking, Immune & Gentle Hydration",
      functionalCategories: ["Skin & Joint Longevity", "Immune & Vascular", "Morning Minerals"],
      halls: [
        "Epigenetic Stability",
        "Genomic Stability",
        "Proteostasis",
        "Stem Cell Vitality",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "250 mg/day shown to raise plasma Vitamin C by ~58% in 6 weeks",
      longevityMechanism:
        "Beyond scavenging free radicals, Vitamin C is the obligatory cofactor that reduces Fe(III) back to catalytic Fe(II) inside 2-oxoglutarate-dependent dioxygenases—including the TET1–3 DNA demethylase enzymes and JmjC histone demethylases that Ca-AKG fuels to reverse epigenetic aging drift.",
      functionalBenefit:
        "Essential cofactor for prolyl and lysyl hydroxylase enzymes that stabilize triple-helix collagen in skin, blood vessels, and joints. Buffered as Sodium Ascorbate to be stomach-friendly while contributing gentle morning sodium.",
      biochemicalMechanism:
        "Donates electrons to maintain active-site ferrous iron (Fe2+) in TET demethylases and collagen hydroxylases, while regenerating oxidized alpha-tocopherol and tetrahydrobiopterin (BH4) for endothelial eNOS.",
      enhancedBenefitsWith: ["Calcium Alpha-Ketoglutarate (Ca-AKG)", "Glycine", "Glucosamine HCl (Vegan)", "EGCG (98%)"],
    },
    {
      elementNumber: "10",
      symbol: "Glc",
      name: "Glucosamine HCl (Vegan)",
      subtitle: "(Fermented Plant-Derived Amino Monosaccharide)",
      specBadge: "Vegan HCl",
      longevityBenefitShort: "Glycolytic Restriction Mimetic & Autophagy Induction",
      functionalBenefitShort: "Preventative Joint Cushioning, Mobility & Longevity",
      functionalCategories: ["Skin & Joint Longevity", "Fasting & Metabolism", "Immune & Vascular"],
      halls: [
        "Autophagy",
        "Nutrient Sensing",
        "Inflammatory Balance",
        "Mitochondrial Health",
        "Proteostasis",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Habitual use linked with 15–18% lower all-cause & CVD mortality in UK Biobank (466,000+ adults)",
      longevityMechanism:
        "Often overlooked as just a joint supplement, glucosamine is a potent fasting-mimetic molecule. It competitively inhibits glucokinase (hexokinase), mildly restricting glycolysis to activate AMPK, stimulate mitochondrial biogenesis, and induce mTOR-independent autophagy—explaining why large prospective human cohorts link habitual glucosamine use with significantly lower all-cause and cardiovascular mortality.",
      functionalBenefit:
        "Serves as the direct structural building block for glycosaminoglycans (GAGs), proteoglycans, and hyaluronic acid in articular cartilage and synovial fluid—providing proactive, preventative joint mobility and cushioning.",
      biochemicalMechanism:
        "Phosphorylated to glucosamine-6-phosphate, creating a mild energetic shift in the AMP:ATP ratio that activates AMPK/SIRT1 while suppressing NF-κB-driven matrix metalloproteinases (MMP-3, MMP-13) in chondrocytes.",
      enhancedBenefitsWith: ["Glycine", "Vitamin C (as Sodium Ascorbate)", "Trehalose", "Calcium Alpha-Ketoglutarate (Ca-AKG)"],
    },
    {
      elementNumber: "11",
      symbol: "Cr",
      name: "Creatine Monohydrate",
      subtitle: "(Cerebral & Muscular Phosphocreatine ATP Buffer)",
      specBadge: "ATP Buffer",
      longevityBenefitShort: "Cellular Bioenergetics, Neuroprotection & Anti-Sarcopenia",
      functionalBenefitShort: "Brain Processing Speed, Muscle Strength & Power",
      functionalCategories: ["Muscle & Brain", "Cellular Energy & NAD+"],
      halls: [
        "Mitochondrial Health",
        "Proteostasis",
        "Intercellular Communication",
        "Stem Cell Vitality",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Over 1,000 peer-reviewed human studies on muscular & cognitive ATP bioenergetics",
      longevityMechanism:
        "Preserving skeletal muscle mass, grip strength, and cognitive processing speed is one of the strongest predictors of human healthspan. Creatine forms intracellular phosphocreatine (PCr) to rapidly regenerate ATP from ADP via the creatine kinase shuttle, preventing mitochondrial permeability transition pore (mPTP) opening and oxidative neuronal stress.",
      functionalBenefit:
        "Fuels high-demand cognitive tasks (especially after sleep loss or mental fatigue) and preserves lean muscle mass and strength—counteracting the muscle catabolism risk of traditional fasting.",
      biochemicalMechanism:
        "Transfers a high-energy phosphate group from phosphocreatine to ADP to replenish ATP in milliseconds at myofibrillar and synaptic sites, while sparing endogenous SAMe methyl groups.",
      enhancedBenefitsWith: ["Taurine", "Magnesium Malate", "Trimethylglycine (TMG)", "Glycine"],
    },
    {
      elementNumber: "12",
      symbol: "MgM",
      name: "Magnesium Malate",
      subtitle: "(Chelated Magnesium + Bioenergetic Malate / Malic Acid)",
      specBadge: "Mg + Krebs Malate",
      longevityBenefitShort: "DNA Repair Cofactor (PARP/BER) & Mitochondrial Stability",
      functionalBenefitShort: "Malate Krebs Cycle Energy, Muscle Function & Minerals",
      functionalCategories: ["Morning Minerals", "Cellular Energy & NAD+", "Muscle & Brain"],
      halls: [
        "Mitochondrial Health",
        "Genomic Stability",
        "Nutrient Sensing",
        "Inflammatory Balance",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Dual-action chelate delivering elemental Magnesium + Tricarboxylic Acid (TCA) Malate",
      longevityMechanism:
        "Every molecule of ATP in the cell must be bound to a magnesium ion (Mg-ATP) to be biologically active, and DNA repair enzymes (PARP-1, base excision repair) require magnesium to fix daily genomic lesions. Meanwhile, the bound Malate (Malic Acid) is a direct intermediate of the mitochondrial Krebs cycle that drives the malate-aspartate NADH shuttle across the inner mitochondrial membrane.",
      functionalBenefit:
        "Unlike sedating evening forms of magnesium, Magnesium Malate is specifically chosen for daytime activation: Malate boosts mitochondrial ATP turnover, reduces muscular fatigue, and supports metabolic rate alongside clean morning mineral replenishment.",
      biochemicalMechanism:
        "Malate dehydrogenase oxidizes malate to oxaloacetate in the TCA cycle, generating NADH for Complex I of the electron transport chain while Mg2+ stabilizes ATP synthase and DNA polymerases.",
      enhancedBenefitsWith: ["Calcium Alpha-Ketoglutarate (Ca-AKG)", "Potassium Aspartate", "Nicotinamide Riboside (NR)", "Vitamin D3"],
    },
    {
      elementNumber: "13",
      symbol: "KAs",
      name: "Potassium Aspartate",
      subtitle: "(Intracellular Mineral + Malate-Aspartate Shuttle Cofactor)",
      specBadge: "Cellular Mineral",
      longevityBenefitShort: "Electrochemical Homeostasis & Vascular Endothelial Tone",
      functionalBenefitShort: "Morning Mineral Hydration, Nerve Impulse & Stamina",
      functionalCategories: ["Morning Minerals", "Cellular Energy & NAD+", "Immune & Vascular"],
      halls: [
        "Intercellular Communication",
        "Mitochondrial Health",
        "Inflammatory Balance",
      ],
      evidenceTag: "Moderate-Strong",
      clinicalBenchmark: "Chelated potassium-aspartate complex for intracellular mineral transport",
      longevityMechanism:
        "Potassium is the primary intracellular cation maintaining resting membrane potential, Na+/K+-ATPase pump efficiency, and healthy arterial compliance. Pairing Potassium with L-Aspartate complements Magnesium Malate to complete both halves of the mitochondrial Malate-Aspartate Shuttle—maximizing cytosolic-to-mitochondrial NADH transfer.",
      functionalBenefit:
        "Provides clean, non-bloating morning mineral hydration, supports crisp neuromuscular signaling and vascular blood flow, and helps prevent exercise-induced cramping or daytime sluggishness.",
      biochemicalMechanism:
        "Aspartate aminotransferase interconverts aspartate and oxaloacetate in the malate-aspartate shuttle to transport reducing equivalents into mitochondria, while K+ maintains cellular turgor and excitability.",
      enhancedBenefitsWith: ["Magnesium Malate", "Taurine", "Vitamin C (as Sodium Ascorbate)", "Creatine Monohydrate"],
    },
    {
      elementNumber: "14",
      symbol: "AKG",
      name: "Calcium Alpha-Ketoglutarate (Ca-AKG)",
      subtitle: "(Sustained-Delivery Krebs Cycle & Epigenetic Metabolite)",
      specBadge: "Epigenetic & Krebs",
      longevityBenefitShort: "TET Epigenetic Demethylation, Stem Cells & Pace of Aging",
      functionalBenefitShort: "Metabolic Flexibility, Amino Acid Synthesis & Bone/Skin",
      functionalCategories: [
        "Fasting & Metabolism",
        "Cellular Energy & NAD+",
        "Skin & Joint Longevity",
      ],
      halls: [
        "Epigenetic Stability",
        "Nutrient Sensing",
        "Mitochondrial Health",
        "Stem Cell Vitality",
        "Inflammatory Balance",
        "Autophagy",
      ],
      evidenceTag: "Strong",
      clinicalBenchmark: "Shown in Buck Institute research to compress morbidity, extend healthspan & lower biological age markers",
      longevityMechanism:
        "Blood alpha-ketoglutarate (AKG) levels drop ~10-fold between ages 40 and 80. Ca-AKG is a rate-determining Krebs cycle intermediate and the essential co-substrate for TET (Ten-Eleven Translocation) DNA demethylases and JmjC histone demethylases—working directly with Vitamin C to strip aberrant age-related methylation marks and slow biological pace of aging.",
      functionalBenefit:
        "Fuels mitochondrial ATP generation, serves as a nitrogen scavenger and precursor for glutamine/proline synthesis (supporting collagen and gut barrier integrity), and promotes metabolic flexibility.",
      biochemicalMechanism:
        "Inhibits ATP synthase subunit beta minimally to mimic caloric restriction (reducing mTOR signaling and SASP inflammation) while serving as the obligatory 2-oxoglutarate cofactor for TET1–3 and prolyl-4-hydroxylase.",
      enhancedBenefitsWith: ["Vitamin C (as Sodium Ascorbate)", "Nicotinamide Riboside (NR)", "Magnesium Malate", "Glycine"],
    },
  ] as ActivateIngredient[],

  comparisonTable: {
    caption:
      "Comparison of LIFESPAN+ Activate against other longevity powders, stimulant energy drinks, and clinic NAD+ IV drips",
    headers: [
      "Feature",
      "LIFESPAN+ Activate",
      "Other Longevity Powders",
      "Stimulant Energy Drinks",
      "$600+ NAD+ IV Clinics",
    ],
    rows: [
      {
        feature: "Comprehensive Hallmarks Coverage",
        tooltip:
          "Addresses all 12 cellular root causes (Hallmarks) of aging—including autophagy, NAD+ metabolism, epigenetics, proteostasis, and mitochondrial function.",
        activate: "Targets all 12 Hallmarks of Aging",
        otherLongevity: "4–6 pathways (often misses NAD+ or methylation)",
        energyDrinks: "Targets temporary symptoms of fatigue",
        nadIv: "Single pathway (extracellular NAD+)",
      },
      {
        feature: "Fasting-Aligned Autophagy",
        tooltip:
          "Contains mTOR-independent and AMPK-activating compounds (Trehalose, EGCG, Glucosamine, Pterostilbene) that keep cellular cleanup engaged even with breakfast.",
        activate: "Engages fasting pathways even with a meal",
        otherLongevity: "Rarely addresses meal-time autophagy",
        energyDrinks: "Spikes insulin or cortisol; halts autophagy",
        nadIv: "Requires 2–4 hr clinic drip; no oral ritual",
      },
      {
        feature: "Daytime Energy & Focus",
        tooltip:
          "Builds true cellular ATP and NAD+ via NR, Creatine, Magnesium Malate, and Taurine rather than masking fatigue with caffeine.",
        activate: "Steady cellular ATP & clear focus; zero crash",
        otherLongevity: "Minimal immediate daytime energy feel",
        energyDrinks: "Short-lived stimulant buzz, jitters & afternoon crash",
        nadIv: "Often causes acute chest tightness/nausea during drip",
      },
      {
        feature: "Stimulants & Sugar Profile",
        tooltip:
          "Formulated with 0 mg caffeine so it never disrupts evening sleep architecture or builds stimulant tolerance.",
        activate: "0 mg caffeine • No added sugar • Morning minerals",
        otherLongevity: "Varies (often lacks morning mineral chelates)",
        energyDrinks: "150–300 mg caffeine + artificial sweeteners",
        nadIv: "0 mg caffeine (invasive IV catheter required)",
      },
      {
        feature: "Methylation Balance Protection",
        tooltip:
          "Pairs Nicotinamide Riboside (NR) with Trimethylglycine (TMG) and Glycine so boosting NAD+ never depletes cellular methyl donor pools.",
        activate: "Built-in TMG + Glycine methyl support",
        otherLongevity: "Often omits methyl donors alongside NAD+ boosters",
        energyDrinks: "None",
        nadIv: "High-dose NAD+ load without methyl buffer",
      },
      {
        feature: "Skin, Joint, Muscle & Brain Matrix",
        tooltip:
          "Combines Creatine + Taurine for muscle/brain ATP with Glycine + Vitamin C + Vegan Glucosamine + Ca-AKG for collagen and cartilage resilience.",
        activate: "Full structural & neuromuscular matrix",
        otherLongevity: "Partial (usually lacks Creatine or NR)",
        energyDrinks: "Under-dosed 'pixie-dust' amino blends",
        nadIv: "None",
      },
      {
        feature: "Circadian & 24/7 Bio-Synchronized Strategy",
        tooltip:
          "Designed as the morning phase of LEVL's 24/7 system—complementing evening LIFESPAN+ DeepCell without ingredient overlap.",
        activate: "Morning pulsed activation + LEVL App tracking",
        otherLongevity: "Static formula; no circadian timing or app",
        energyDrinks: "Disrupts circadian adenosine & deep sleep",
        nadIv: "Episodic clinic visits ($600–$1,000+ per session)",
      },
      {
        feature: "Precision Formulation & Dosing",
        tooltip:
          "14 evidence-backed actives formulated by PhD researchers and MDs, guided by LEVL's AI Synergy Discovery Engine at clinically aligned doses.",
        activate: "14 clinically aligned actives • AI Synergy Engine",
        otherLongevity: "Generic blends; rarely screened for synergy",
        energyDrinks: "Under-dosed 'pixie-dust' proprietary blends",
        nadIv: "Single-compound infusion",
      },
      {
        feature: "Safety, Tolerability & Transparency",
        tooltip:
          "Synergistic formulation screened to minimize antagonistic effects, 3rd-party tested, with outcomes trackable in the LEVL Protocols App.",
        activate: "Non-jittery • Synergistic • Trackable in LEVL App",
        otherLongevity: "Variable bioavailability; no outcome tracking",
        energyDrinks: "Jitters, tolerance buildup & sleep disruption",
        nadIv: "Infusion discomfort, vein irritation & time burden",
      },
    ] as ActivateComparisonRow[],
  },

  benefitsByAge: [
    {
      id: "20s",
      label: "In your 20s",
      title: "Peak Bioenergetics, Brain Stamina & Proactive Preservation",
      description:
        "In your 20s, laying a foundation of cellular cleanup, optimal vitamin D3, and phosphocreatine/NAD+ bioenergetics compounds across decades—fueling high cognitive and athletic output without relying on heavy stimulant pre-workouts.",
      bodyChanges: [
        "High training & cognitive demands deplete ATP and intracellular minerals",
        "Heavy caffeine reliance masks fatigue and erodes deep sleep quality",
        "Early UV and metabolic oxidative stress begins in skin and vascular tissues",
      ],
      levlBenefits: [
        "Fuels clean muscular & cerebral ATP via Creatine, Taurine, and Magnesium Malate",
        "Extends morning autophagy without sacrificing the protein/calories needed for muscle growth",
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
        "In your 40s, plasma Alpha-Ketoglutarate (AKG) and Taurine drop sharply, epigenetic methylation marks drift, and joint cartilage recovery slows. Activate targets all 12 Hallmarks of Aging simultaneously.",
      bodyChanges: [
        "Endogenous AKG and Taurine pools decline significantly, slowing mitochondrial turnover",
        "Epigenetic alterations accelerate biological Pace of Aging (DunedinPACE)",
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
        "Age-related muscle loss (sarcopenia) makes caloric-restriction fasting counterproductive",
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
      label: "60+",
      title: "Comprehensive Cellular Renewal, Neuroprotection & Independence",
      description:
        "In your 60s and beyond, clearing senescent cellular debris, protecting neuronal proteostasis, and maintaining physical strength, bone density, and immune resilience are paramount for thriving healthspan.",
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
        "Traditional caloric fasting triggers autophagy (cellular cleanup) by depleting cellular glucose and raising the AMP:ATP ratio. LIFESPAN+ Activate combines mTOR-independent and glycolytic-modulating compounds—including Trehalose, EGCG (98%), Vegan Glucosamine HCl, and Pterostilbene—that transiently modulate cellular glucose transport and activate AMPK, SIRT1, and TFEB lysosomal pathways even when taken alongside your first meal. This lets you extend the cellular renewal benefits of your overnight fast without skipping breakfast or losing muscle mass.",
    },
    {
      question: "Why is Activate ideal for women, athletes, and people who don't want to fast?",
      answer:
        "While prolonged caloric restriction activates autophagy, it can also spike cortisol, disrupt thyroid and reproductive hormones in women, and accelerate skeletal muscle loss in athletes and older adults. Activate was specifically engineered to uncouple autophagy and longevity signaling from starvation—allowing you to fuel your body with protein and nutrients at breakfast while keeping cellular renewal pathways engaged.",
    },
    {
      question: "Does LIFESPAN+ Activate contain caffeine or stimulants?",
      answer:
        "No. Activate contains 0 mg of caffeine and zero central nervous system stimulants. Instead of borrowing energy from tomorrow by blocking adenosine receptors, Activate builds true cellular bioenergetics through Nicotinamide Riboside (NAD+ synthesis), Creatine Monohydrate (ATP buffering), Magnesium Malate (Krebs cycle malate flux), and Taurine. You can take it with or without your morning coffee or tea—and it will never disrupt your evening sleep.",
    },
    {
      question: "How does Activate compare to $600+ NAD+ IV drips?",
      answer:
        "Clinic NAD+ IV infusions typically cost $600 to $1,000+ per session, require sitting with an IV catheter for 2–4 hours, and infuse large extracellular NAD+ molecules that must be broken down before entering cells—often causing acute nausea or chest tightness. Activate uses Nicotinamide Riboside (NR) paired with Pterostilbene (clinically shown to raise human NAD+ by 90–142%) and Trimethylglycine (TMG) to directly elevate intracellular NAD+ every morning in 30 seconds at a fraction of the cost.",
    },
    {
      question: "Why did you include Trimethylglycine (TMG) alongside Nicotinamide Riboside (NR)?",
      answer:
        "When the body processes NAD+ precursors like NR, excess nicotinamide is methylated by the enzyme NNMT for excretion. Over time, unbuffered NAD+ supplementation can draw down your body's methyl donor pool (SAMe) and raise homocysteine. LEVL's AI Synergy Engine pairs NR with TMG (Betaine) and Glycine to replenish methyl groups, support healthy homocysteine levels, and protect epigenetic methylation balance.",
    },
    {
      question: "Why do you use Magnesium Malate and Potassium Aspartate for morning minerals?",
      answer:
        "Most electrolyte powders are simply high-sodium salt bombs designed for heavy sweating. For a daily longevity complex, we selected Magnesium Malate and Potassium Aspartate (alongside buffered Sodium Ascorbate and Ca-AKG) because Malate and Aspartate are direct intermediates of the mitochondrial Krebs cycle and the Malate-Aspartate NADH shuttle—supporting both intracellular mineral hydration and mitochondrial ATP production.",
    },
    {
      question: "How do LIFESPAN+ Activate and LIFESPAN+ DeepCell work together?",
      answer:
        "Aging biology follows a 24-hour circadian rhythm. LIFESPAN+ Activate is engineered for the morning (Sympathetic / Daytime Phase)—driving NAD+ synthesis, mitochondrial ATP, metabolic flexibility, and fasting-aligned autophagy with your first meal. LIFESPAN+ DeepCell is engineered for the evening (Parasympathetic / Nocturnal Phase)—optimizing slow-wave sleep architecture, glymphatic brain clearance, and overnight DNA repair with zero ingredient overlap.",
    },
    {
      question: "When will LIFESPAN+ Activate launch, and how do I join the beta cohort?",
      answer:
        "LIFESPAN+ Activate is currently in final pre-launch development and taste/stability optimization. By joining the Early Access Waitlist on this page—or completing the 60-Second Protocol Quiz—you'll secure priority notification for community beta-testing invitations, founding-member launch pricing, and immediate access to personalized behavioral protocols in the LEVL App.",
    },
  ],
};
