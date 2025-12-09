export type Category = "hallmark" | "benefit" | "molecule";

export interface Hallmark {
    id: string;
    label: string;
    description: string;
}

export interface Benefit {
    id: string;
    label: string;
    description: string;
}

export interface Molecule {
    id: string;
    name: string;
    description: string;
    hallmarks: string[]; // IDs of hallmarks
    benefits: string[]; // IDs of benefits
}

export const HALLMARKS: Hallmark[] = [
    { id: "genomic_instability", label: "Genomic Instability", description: "The accumulation of genetic damage/mutations over time. This instability disrupts cellular function and can lead to malfunctioning cells or cancer." },
    { id: "telomere_attrition", label: "Telomere Attrition", description: "The shortening of the protective caps (telomeres) on chromosomes with each cell division. Eventually, cells stop dividing and become senescent." },
    { id: "epigenetic_alterations", label: "Epigenetic Alterations", description: "Changes in gene expression markers (like DNA methylation) that occur with age, causing cells to lose their identity and function improperly." },
    { id: "loss_of_proteostasis", label: "Loss of Proteostasis", description: "A decline in the cell's ability to maintain protein quality. Misfolded or damaged proteins aggregate, causing toxicity." },
    { id: "disabled_macroautophagy", label: "Disabled Macroautophagy", description: "A failure of the cell's recycling system (autophagy) to clear out damaged organelles and proteins, leading to cellular 'trash' accumulation." },
    { id: "deregulated_nutrient_sensing", label: "Deregulated Nutrient Sensing", description: "Cells lose the ability to properly sense fuel availability (glucose, insulin), leading to metabolic inefficiency and fat accumulation." },
    { id: "mitochondrial_dysfunction", label: "Mitochondrial Dysfunction", description: "The power plants of the cell become less efficient, producing less energy (ATP) and more damaging free radicals (oxidative stress)." },
    { id: "cellular_senescence", label: "Cellular Senescence", description: "Cells stop dividing but refuse to die, lingering as 'zombie cells' that secrete inflammatory signals (SASP) and damage neighbors." },
    { id: "stem_cell_exhaustion", label: "Stem Cell Exhaustion", description: "The depletion of the body's regenerative reserve. Stem cells lose the ability to divide and repair tissue damage." },
    { id: "altered_communication", label: "Altered Intercellular Communication", description: "Disrupted signaling between cells, often shifting towards a chronic inflammatory state ('inflammaging') that spreads dysfunction." },
    { id: "chronic_inflammation", label: "Chronic Inflammation", description: "A persistent, low-grade immune response that damages tissues over time, driven by senescent cells and immune system aging." },
    { id: "dysbiosis", label: "Dysbiosis", description: "An imbalance in the gut microbiome composition, compromising the gut barrier and driving systemic inflammation." },
];

export const BENEFITS: Benefit[] = [
    { id: "energy", label: "Energy", description: "Enhances mitochondrial efficiency and ATP production to combat fatigue and improve cellular endurance." },
    { id: "cognition", label: "Cognition", description: "Supports neuroplasticity, memory retention, and processing speed by protecting neurons and optimizing signaling." },
    { id: "focus", label: "Focus", description: "Promotes sustained attention and mental clarity by modulating neurotransmitters like dopamine and acetylcholine." },
    { id: "metabolism", label: "Metabolism", description: "Optimizes nutrient partitioning, insulin sensitivity, and metabolic rate to support healthy body composition." },
    { id: "immunity", label: "Immunity", description: "Strengthens both innate and adaptive immune defenses, improving resilience against pathogens and stress." },
    { id: "recovery", label: "Recovery", description: "Accelerates tissue repair and reduces downtime by enhancing protein synthesis and dampening excessive inflammation." },
    { id: "calm", label: "Calm", description: "Modulates the stress response (HPA axis) and boosts GABAergic activity to promote relaxation without sedation." },
    { id: "sleep", label: "Sleep", description: "Supports the circadian rhythm and sleep architecture, promoting deeper, more restorative cycles of rest." },
];

// 12 Hallmarks x 8 Benefits = 96 Cells.
// Flattened array of molecules based on user input (row-major order assumed).
export const MOLECULES: Molecule[] = [
    // 1
    {
        id: "fullerene",
        name: "Fullerene",
        description: "Potent free radical scavenger that protects lipids and membranes from oxidative damage.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["energy", "recovery", "cognition"]
    },
    // 2
    {
        id: "nac",
        name: "NAC",
        description: "Precursor to glutathione that supports detoxification, antioxidant defense, and respiratory health.",
        hallmarks: ["loss_of_proteostasis", "mitochondrial_dysfunction", "genomic_instability", "chronic_inflammation"],
        benefits: ["recovery", "immunity", "energy"]
    },
    // 3
    {
        id: "sulforaphane",
        name: "Sulforaphane",
        description: "Broccoli-derived Nrf2 activator that boosts cellular detox and cytoprotective enzymes.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "chronic_inflammation", "cellular_senescence"],
        benefits: ["metabolism", "immunity", "recovery"]
    },
    // 4
    {
        id: "ala",
        name: "ALA",
        description: "Mitochondrial cofactor and antioxidant that improves glucose handling and nerve health.",
        hallmarks: ["mitochondrial_dysfunction", "deregulated_nutrient_sensing", "loss_of_proteostasis", "chronic_inflammation"],
        benefits: ["energy", "metabolism", "recovery"]
    },
    // 5
    {
        id: "zinc",
        name: "Zinc",
        description: "Essential mineral for DNA repair, antioxidant enzymes, and immune cell function.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["immunity", "recovery", "metabolism"]
    },
    // 6
    {
        id: "glynac",
        name: "GlyNAC",
        description: "Glycine plus NAC to restore glutathione and improve mitochondrial and metabolic health.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["energy", "recovery", "metabolism"]
    },
    // 7
    {
        id: "omega_3",
        name: "Omega-3",
        description: "EPA/DHA fatty acids that resolve inflammation and support cardiovascular and brain function.",
        hallmarks: ["chronic_inflammation", "altered_communication", "mitochondrial_dysfunction", "loss_of_proteostasis"],
        benefits: ["cognition", "immunity", "recovery", "metabolism"]
    },
    // 8
    {
        id: "gaba",
        name: "GABA",
        description: "Inhibitory neurotransmitter that calms the nervous system and eases sleep onset.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep"]
    },
    // 9
    {
        id: "astragalus_extract",
        name: "Astragalus Extract",
        description: "Adaptogenic root that supports immunity, stress resilience, and healthy aging.",
        hallmarks: ["telomere_attrition", "stem_cell_exhaustion", "chronic_inflammation", "cellular_senescence"],
        benefits: ["immunity", "recovery", "energy"]
    },
    // 10
    {
        id: "cycloastragenol",
        name: "Cycloastragenol",
        description: "Purified astragalus triterpenoid associated with telomerase activation and cellular longevity.",
        hallmarks: ["telomere_attrition", "stem_cell_exhaustion", "genomic_instability", "cellular_senescence"],
        benefits: ["recovery", "energy"]
    },
    // 11
    {
        id: "astragaloside_iv",
        name: "Astragaloside IV",
        description: "Astragalus saponin with immune, vascular, and telomere-supportive effects.",
        hallmarks: ["telomere_attrition", "stem_cell_exhaustion", "chronic_inflammation", "cellular_senescence"],
        benefits: ["immunity", "recovery", "energy"]
    },
    // 12
    {
        id: "gynostemma",
        name: "Gynostemma",
        description: "Adaptogen sometimes called “southern ginseng” that activates AMPK and supports metabolic health.",
        hallmarks: ["deregulated_nutrient_sensing", "mitochondrial_dysfunction", "chronic_inflammation", "cellular_senescence"],
        benefits: ["metabolism", "energy", "recovery"]
    },
    // 13
    {
        id: "echinacea",
        name: "Echinacea",
        description: "Immune-modulating herb often used to support upper respiratory defenses.",
        hallmarks: ["dysbiosis", "chronic_inflammation", "altered_communication", "stem_cell_exhaustion"],
        benefits: ["immunity", "recovery"]
    },
    // 14
    {
        id: "astragalus_whole",
        name: "Astragalus",
        description: "Whole astragalus root providing broad immune and vitality support.",
        hallmarks: ["telomere_attrition", "stem_cell_exhaustion", "chronic_inflammation", "cellular_senescence"],
        benefits: ["immunity", "energy", "recovery"]
    },
    // 15
    {
        id: "cacao",
        name: "Cacao",
        description: "Polyphenol-rich cocoa that supports vascular health, mood, and cognitive performance.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "mitochondrial_dysfunction", "altered_communication"],
        benefits: ["cognition", "focus", "energy"]
    },
    // 16
    {
        id: "gotu_kola",
        name: "Gotu Kola",
        description: "Tonic herb that supports microcirculation, collagen synthesis, and cognitive function.",
        hallmarks: ["loss_of_proteostasis", "stem_cell_exhaustion", "altered_communication", "chronic_inflammation"],
        benefits: ["cognition", "recovery", "metabolism"]
    },
    // 17
    {
        id: "pterostilbene",
        name: "Pterostilbene",
        description: "Lipophilic resveratrol analog with antioxidant and sirtuin-activating properties.",
        hallmarks: ["epigenetic_alterations", "mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation"],
        benefits: ["cognition", "metabolism", "recovery"]
    },
    // 18
    {
        id: "polydatin",
        name: "Polydatin",
        description: "Glucoside form of resveratrol that provides antioxidant and cardiometabolic support.",
        hallmarks: ["epigenetic_alterations", "mitochondrial_dysfunction", "chronic_inflammation", "loss_of_proteostasis"],
        benefits: ["metabolism", "recovery", "energy"]
    },
    // 19
    {
        id: "l_theanine",
        name: "L-Theanine",
        description: "Green tea amino acid that promotes relaxed alertness and smoother focus.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "focus", "sleep"]
    },
    // 20
    {
        id: "milk_thistle_extract",
        name: "Milk Thistle Extract",
        description: "Silymarin-rich liver protectant that enhances detox and antioxidant capacity.",
        hallmarks: ["loss_of_proteostasis", "mitochondrial_dysfunction", "chronic_inflammation", "genomic_instability"],
        benefits: ["recovery", "metabolism", "immunity"]
    },
    // 21
    {
        id: "vitamin_c",
        name: "Vitamin C",
        description: "Water-soluble antioxidant essential for collagen, immunity, and redox balance.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["immunity", "recovery", "energy"]
    },
    // 22
    {
        id: "phosphatidylserine",
        name: "Phosphatidylserine",
        description: "Phospholipid that supports neuronal membranes, stress resilience, and memory.",
        hallmarks: ["altered_communication", "mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation"],
        benefits: ["cognition", "focus", "calm"]
    },
    // 23
    {
        id: "5_htp",
        name: "5-HTP",
        description: "Serotonin precursor that supports mood, sleep quality, and appetite regulation.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["sleep", "calm"]
    },
    // 24
    {
        id: "kava",
        name: "Kava",
        description: "Root extract with strong calming effects that reduces anxiety and muscle tension.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep"]
    },
    // 25
    {
        id: "rhodiola_rosea",
        name: "Rhodiola Rosea",
        description: "Adaptogen that improves stress resilience, energy, and mental performance.",
        hallmarks: ["mitochondrial_dysfunction", "deregulated_nutrient_sensing", "altered_communication", "chronic_inflammation"],
        benefits: ["energy", "focus", "cognition"]
    },
    // 26
    {
        id: "taurine",
        name: "Taurine",
        description: "Amino acid that supports mitochondrial function, calcium handling, and metabolic health.",
        hallmarks: ["mitochondrial_dysfunction", "genomic_instability", "telomere_attrition", "cellular_senescence"],
        benefits: ["energy", "metabolism", "recovery"]
    },
    // 27
    {
        id: "egcg",
        name: "EGCG",
        description: "Green tea catechin that activates autophagy and supports cardiometabolic and brain health.",
        hallmarks: ["loss_of_proteostasis", "disabled_macroautophagy", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["metabolism", "cognition", "recovery"]
    },
    // 28
    {
        id: "spermidine",
        name: "Spermidine",
        description: "Polyamine that induces autophagy and is linked to cardiovascular and brain health.",
        hallmarks: ["disabled_macroautophagy", "loss_of_proteostasis", "mitochondrial_dysfunction", "cellular_senescence"],
        benefits: ["cognition", "metabolism", "recovery"]
    },
    // 29
    {
        id: "lions_mane",
        name: "Lion's Mane",
        description: "Mushroom that promotes nerve growth factor and supports memory and mood.",
        hallmarks: ["altered_communication", "loss_of_proteostasis", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["cognition", "focus", "calm"]
    },
    // 30
    {
        id: "collagen",
        name: "Collagen",
        description: "Structural protein that supports joints, skin elasticity, and connective tissue repair.",
        hallmarks: ["loss_of_proteostasis", "stem_cell_exhaustion", "cellular_senescence", "chronic_inflammation"],
        benefits: ["recovery", "metabolism", "sleep"]
    },
    // 31
    {
        id: "holy_basil",
        name: "Holy Basil (Tulsi)",
        description: "Adaptogen that lowers stress reactivity and supports glycemic and immune balance.",
        hallmarks: ["chronic_inflammation", "deregulated_nutrient_sensing", "altered_communication", "cellular_senescence"],
        benefits: ["calm", "metabolism", "immunity"]
    },
    // 32
    {
        id: "magnolia_bark_extract",
        name: "Magnolia Bark Extract",
        description: "Calming, anti-inflammatory bark used for anxiety and sleep support.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence", "loss_of_proteostasis"],
        benefits: ["calm", "sleep", "recovery"]
    },
    // 33
    {
        id: "urolithin_a",
        name: "Urolithin A",
        description: "Gut-derived metabolite that enhances mitophagy and muscle function.",
        hallmarks: ["disabled_macroautophagy", "mitochondrial_dysfunction", "loss_of_proteostasis", "cellular_senescence"],
        benefits: ["energy", "recovery", "metabolism"]
    },
    // 34
    {
        id: "trehalose",
        name: "Trehalose",
        description: "Autophagy-inducing sugar that stabilizes proteins and supports cellular cleanup.",
        hallmarks: ["loss_of_proteostasis", "disabled_macroautophagy", "mitochondrial_dysfunction", "cellular_senescence"],
        benefits: ["recovery", "cognition", "metabolism"]
    },
    // 35
    {
        id: "curcumin",
        name: "Curcumin",
        description: "Turmeric polyphenol that strongly reduces inflammation and oxidative damage.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "genomic_instability", "cellular_senescence"],
        benefits: ["recovery", "immunity", "metabolism"]
    },
    // 36
    {
        id: "rapamycin",
        name: "Rapamycin",
        description: "mTOR inhibitor that shifts cells from growth to repair and extends lifespan in animals.",
        hallmarks: ["deregulated_nutrient_sensing", "disabled_macroautophagy", "cellular_senescence", "loss_of_proteostasis"],
        benefits: ["metabolism", "immunity", "recovery"]
    },
    // 37
    {
        id: "chaga_mushroom",
        name: "Chaga Mushroom",
        description: "Antioxidant mushroom that supports immune function and reduces oxidative stress.",
        hallmarks: ["chronic_inflammation", "dysbiosis", "loss_of_proteostasis", "altered_communication"],
        benefits: ["immunity", "recovery"]
    },
    // 38
    {
        id: "urolithin_b",
        name: "Urolithin B",
        description: "Related metabolite with anabolic and mitophagy-supporting effects on muscle tissue.",
        hallmarks: ["disabled_macroautophagy", "mitochondrial_dysfunction", "loss_of_proteostasis", "stem_cell_exhaustion"],
        benefits: ["recovery", "energy", "metabolism"]
    },
    // 39
    {
        id: "tremella_mushroom",
        name: "Tremella Mushroom",
        description: "Hydrating mushroom that supports skin, collagen, and immune balance.",
        hallmarks: ["loss_of_proteostasis", "stem_cell_exhaustion", "chronic_inflammation", "dysbiosis"],
        benefits: ["recovery", "immunity"]
    },
    // 40
    {
        id: "tart_cherry_extract",
        name: "Tart Cherry Extract",
        description: "Polyphenol-rich extract that reduces soreness and improves sleep quality.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "altered_communication", "cellular_senescence"],
        benefits: ["recovery", "sleep", "calm"]
    },
    // 41
    {
        id: "ca_akg",
        name: "Ca-AKG",
        description: "Calcium alpha-ketoglutarate supporting mitochondrial metabolism and epigenetic balance.",
        hallmarks: ["deregulated_nutrient_sensing", "mitochondrial_dysfunction", "epigenetic_alterations", "chronic_inflammation"],
        benefits: ["energy", "metabolism", "recovery"]
    },
    // 42
    {
        id: "beta_hydroxybutyrate",
        name: "Beta-Hydroxybutyrate",
        description: "Ketone body used as clean fuel that supports mitochondria and brain energy.",
        hallmarks: ["deregulated_nutrient_sensing", "mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation"],
        benefits: ["energy", "cognition", "metabolism"]
    },
    // 43
    {
        id: "nr",
        name: "Nicotinamide Riboside (NR)",
        description: "NAD precursor that restores cellular NAD and supports repair and energy pathways.",
        hallmarks: ["mitochondrial_dysfunction", "genomic_instability", "epigenetic_alterations", "deregulated_nutrient_sensing"],
        benefits: ["energy", "metabolism", "recovery"]
    },
    // 44
    {
        id: "metformin",
        name: "Metformin",
        description: "Insulin sensitizer that activates AMPK and mimics caloric-restriction-like signaling.",
        hallmarks: ["deregulated_nutrient_sensing", "mitochondrial_dysfunction", "chronic_inflammation", "cellular_senescence"],
        benefits: ["metabolism", "energy", "recovery"]
    },
    // 45
    {
        id: "resveratrol",
        name: "Resveratrol",
        description: "Polyphenol that activates sirtuins and supports vascular and metabolic health.",
        hallmarks: ["epigenetic_alterations", "deregulated_nutrient_sensing", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["metabolism", "cognition", "recovery"]
    },
    // 46
    {
        id: "glutathione",
        name: "Glutathione",
        description: "Master intracellular antioxidant that protects proteins, DNA, and mitochondria.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["recovery", "energy", "immunity"]
    },
    // 47
    {
        id: "inositol",
        name: "Inositol",
        description: "Sugar-like molecule that supports mood, sleep, and insulin signaling.",
        hallmarks: ["deregulated_nutrient_sensing", "altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep", "metabolism"]
    },
    // 48
    {
        id: "zma",
        name: "ZMA (Zinc/Mag/B6)",
        description: "Mineral and vitamin combo that supports hormone balance, recovery, and sleep.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "chronic_inflammation", "altered_communication"],
        benefits: ["sleep", "recovery", "energy"]
    },
    // 49
    {
        id: "creatine",
        name: "Creatine",
        description: "High-energy phosphate buffer that enhances muscle power and brain energy.",
        hallmarks: ["mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["energy", "recovery", "cognition"]
    },
    // 50
    {
        id: "pqq",
        name: "PQQ",
        description: "Redox cofactor that stimulates mitochondrial biogenesis and antioxidant defenses.",
        hallmarks: ["mitochondrial_dysfunction", "loss_of_proteostasis", "genomic_instability", "chronic_inflammation"],
        benefits: ["energy", "cognition", "recovery"]
    },
    // 51
    {
        id: "methylene_blue",
        name: "Methylene Blue",
        description: "Redox dye that improves electron transport and brain energy at low doses.",
        hallmarks: ["mitochondrial_dysfunction", "loss_of_proteostasis", "genomic_instability", "chronic_inflammation"],
        benefits: ["cognition", "focus", "energy"]
    },
    // 52
    {
        id: "acetyl_l_carnitine",
        name: "Acetyl-L-Carnitine",
        description: "Carnitine form that ferries fats into mitochondria and supports mood and cognition.",
        hallmarks: ["mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation", "altered_communication"],
        benefits: ["energy", "cognition", "recovery"]
    },
    // 53
    {
        id: "astaxanthin",
        name: "Astaxanthin",
        description: "Strong carotenoid antioxidant that protects membranes, eyes, and skin.",
        hallmarks: ["genomic_instability", "loss_of_proteostasis", "mitochondrial_dysfunction", "chronic_inflammation"],
        benefits: ["recovery", "energy", "immunity"]
    },
    // 54
    {
        id: "coq10",
        name: "CoQ10",
        description: "Electron carrier in mitochondria that supports ATP production and heart health.",
        hallmarks: ["mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation", "genomic_instability"],
        benefits: ["energy", "recovery", "metabolism"]
    },
    // 55
    {
        id: "tongkat_ali",
        name: "Tongkat Ali",
        description: "Root extract that supports testosterone, motivation, and physical performance.",
        hallmarks: ["deregulated_nutrient_sensing", "altered_communication", "stem_cell_exhaustion", "chronic_inflammation"],
        benefits: ["energy", "focus", "metabolism"]
    },
    // 56
    {
        id: "l_tryptophan",
        name: "L-Tryptophan",
        description: "Amino acid precursor to serotonin and melatonin for mood and sleep.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["sleep", "calm"]
    },
    // 57
    {
        id: "fisetin",
        name: "Fisetin",
        description: "Flavonoid with senolytic and antioxidant properties that clears aged cells.",
        hallmarks: ["cellular_senescence", "chronic_inflammation", "stem_cell_exhaustion", "loss_of_proteostasis"],
        benefits: ["recovery", "immunity", "cognition"]
    },
    // 58
    {
        id: "quercetin",
        name: "Quercetin",
        description: "Broad flavonoid antioxidant with senolytic and vascular support effects.",
        hallmarks: ["cellular_senescence", "chronic_inflammation", "genomic_instability", "loss_of_proteostasis"],
        benefits: ["recovery", "immunity", "metabolism"]
    },
    // 59
    {
        id: "piperlongumine",
        name: "Piperlongumine",
        description: "Plant alkaloid studied as a senolytic that stresses senescent cells more than healthy ones.",
        hallmarks: ["cellular_senescence", "chronic_inflammation", "loss_of_proteostasis", "stem_cell_exhaustion"],
        benefits: ["recovery", "immunity"]
    },
    // 60
    {
        id: "berberine",
        name: "Berberine",
        description: "AMPK-activating alkaloid that supports glucose control and metabolic health.",
        hallmarks: ["deregulated_nutrient_sensing", "mitochondrial_dysfunction", "chronic_inflammation", "dysbiosis"],
        benefits: ["metabolism", "energy", "immunity"]
    },
    // 61
    {
        id: "senolytic_complex",
        name: "Senolytic Complex",
        description: "Combination stack targeting clearance or suppression of senescent cells.",
        hallmarks: ["cellular_senescence", "chronic_inflammation", "stem_cell_exhaustion", "altered_communication"],
        benefits: ["recovery", "immunity", "metabolism"]
    },
    // 62 (Fisetin 2nd)
    {
        id: "fisetin_2",
        name: "Fisetin",
        description: "Flavonoid with senolytic and antioxidant properties that clears aged cells.",
        hallmarks: ["cellular_senescence", "chronic_inflammation", "stem_cell_exhaustion", "loss_of_proteostasis"],
        benefits: ["recovery", "immunity", "cognition"]
    },
    // 63
    {
        id: "lithium",
        name: "Lithium (Low Dose)",
        description: "Trace mineral dosing that supports neuroprotection and mood stability.",
        hallmarks: ["altered_communication", "cellular_senescence", "chronic_inflammation", "loss_of_proteostasis"],
        benefits: ["cognition", "calm", "sleep"]
    },
    // 64
    {
        id: "hops_extract",
        name: "Hops Extract",
        description: "Bitter flower extract with GABAergic effects that ease tension and improve sleep.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["sleep", "calm"]
    },
    // 65
    {
        id: "nmn_2",
        name: "NMN",
        description: "NAD precursor that raises cellular NAD to support repair and metabolism.",
        hallmarks: ["mitochondrial_dysfunction", "genomic_instability", "epigenetic_alterations", "deregulated_nutrient_sensing"],
        benefits: ["energy", "metabolism", "recovery"]
    },
    // 66
    {
        id: "tmg",
        name: "TMG",
        description: "Methyl donor that supports homocysteine clearance and DNA methylation balance.",
        hallmarks: ["epigenetic_alterations", "deregulated_nutrient_sensing", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["metabolism", "recovery"]
    },
    // 67
    {
        id: "ginseng",
        name: "Ginseng",
        description: "Classic adaptogen that boosts physical energy, resilience, and immune function.",
        hallmarks: ["deregulated_nutrient_sensing", "mitochondrial_dysfunction", "chronic_inflammation", "altered_communication"],
        benefits: ["energy", "focus", "immunity"]
    },
    // 68 (NMN 2nd)
    {
        id: "nmn_3",
        name: "NMN",
        description: "NAD precursor that raises cellular NAD to support repair and metabolism.",
        hallmarks: ["mitochondrial_dysfunction", "genomic_instability", "epigenetic_alterations", "deregulated_nutrient_sensing"],
        benefits: ["energy", "metabolism", "recovery"]
    },
    // 69
    {
        id: "reishi_mushroom",
        name: "Reishi Mushroom",
        description: "Immune-modulating mushroom that calms the nervous system and supports longevity.",
        hallmarks: ["dysbiosis", "chronic_inflammation", "altered_communication", "stem_cell_exhaustion"],
        benefits: ["immunity", "calm", "sleep"]
    },
    // 70
    {
        id: "bovine_colostrum",
        name: "Bovine Colostrum",
        description: "Growth-factor-rich first milk that supports gut barrier and immune defense.",
        hallmarks: ["dysbiosis", "stem_cell_exhaustion", "altered_communication", "chronic_inflammation"],
        benefits: ["immunity", "recovery", "metabolism"]
    },
    // 71
    {
        id: "shatavari",
        name: "Shatavari",
        description: "Ayurvedic root supporting female hormone balance, resilience, and digestion.",
        hallmarks: ["deregulated_nutrient_sensing", "altered_communication", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["calm", "metabolism", "immunity"]
    },
    // 72
    {
        id: "skullcap",
        name: "Skullcap",
        description: "Calming herb used to reduce anxiety and promote deeper sleep.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep"]
    },
    // 73
    {
        id: "beet_root_extract",
        name: "Beet Root Extract",
        description: "Nitrate-rich extract that boosts nitric oxide and blood flow.",
        hallmarks: ["mitochondrial_dysfunction", "altered_communication", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["energy", "recovery", "metabolism"]
    },
    // 74
    {
        id: "apigenin",
        name: "Apigenin",
        description: "Flavone from chamomile and celery with anti-inflammatory and autophagy-supporting effects.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "disabled_macroautophagy", "cellular_senescence"],
        benefits: ["calm", "recovery", "cognition"]
    },
    // 75
    {
        id: "bacopa_monnieri",
        name: "Bacopa Monnieri",
        description: "Nootropic herb that improves memory consolidation and stress resilience.",
        hallmarks: ["altered_communication", "mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation"],
        benefits: ["cognition", "focus", "calm"]
    },
    // 76
    {
        id: "nigella_sativa",
        name: "Nigella Sativa",
        description: "Black seed extract with anti-inflammatory and metabolic benefits.",
        hallmarks: ["chronic_inflammation", "deregulated_nutrient_sensing", "dysbiosis", "loss_of_proteostasis"],
        benefits: ["metabolism", "immunity", "recovery"]
    },
    // 77
    {
        id: "beta_glucans",
        name: "Beta-Glucans",
        description: "Soluble fibers that prime innate immunity and support metabolic health.",
        hallmarks: ["dysbiosis", "chronic_inflammation", "altered_communication", "stem_cell_exhaustion"],
        benefits: ["immunity", "recovery", "metabolism"]
    },
    // 78
    {
        id: "shilajit",
        name: "Shilajit",
        description: "Mineral-rich resin that supports mitochondrial function, testosterone, and recovery.",
        hallmarks: ["mitochondrial_dysfunction", "deregulated_nutrient_sensing", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["energy", "recovery", "metabolism"]
    },
    // 79
    {
        id: "magnesium_glycinate",
        name: "Magnesium Glycinate",
        description: "Highly absorbable magnesium that relaxes muscles and supports sleep and stress resilience.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep", "recovery"]
    },
    // 80
    {
        id: "chamomile",
        name: "Chamomile",
        description: "Gentle herb that calms the nervous system and supports sleep onset.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep"]
    },
    // 81
    {
        id: "boswellia",
        name: "Boswellia",
        description: "Resin extract that reduces joint and systemic inflammation.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "stem_cell_exhaustion", "cellular_senescence"],
        benefits: ["recovery", "metabolism", "sleep"]
    },
    // 82
    {
        id: "ginger_extract",
        name: "Ginger Extract",
        description: "Root extract that supports digestion, circulation, and anti-inflammatory signaling.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "altered_communication", "dysbiosis"],
        benefits: ["recovery", "metabolism", "immunity"]
    },
    // 83
    {
        id: "honokiol",
        name: "Honokiol",
        description: "Magnolia constituent with anti-inflammatory, neuroprotective, and anxiolytic effects.",
        hallmarks: ["chronic_inflammation", "mitochondrial_dysfunction", "altered_communication", "loss_of_proteostasis"],
        benefits: ["calm", "cognition", "recovery"]
    },
    // 84
    {
        id: "grape_seed_extract",
        name: "Grape Seed Extract",
        description: "Proanthocyanidin-rich extract that supports vascular health and antioxidant protection.",
        hallmarks: ["chronic_inflammation", "genomic_instability", "loss_of_proteostasis", "altered_communication"],
        benefits: ["recovery", "cognition", "metabolism"]
    },
    // 85
    {
        id: "tart_cherry_extract_2",
        name: "Tart Cherry Extract",
        description: "Same anti-inflammatory and sleep-supportive profile as earlier listing.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "altered_communication", "cellular_senescence"],
        benefits: ["recovery", "sleep", "calm"]
    },
    // 86
    {
        id: "artemisinin",
        name: "Artemisinin",
        description: "Sesquiterpene lactone with antiparasitic and experimental autophagy and anticancer roles.",
        hallmarks: ["chronic_inflammation", "loss_of_proteostasis", "disabled_macroautophagy", "cellular_senescence"],
        benefits: ["immunity", "recovery"]
    },
    // 87
    {
        id: "lemon_balm",
        name: "Lemon Balm",
        description: "Herb that reduces nervous tension and supports sleep and digestion.",
        hallmarks: ["altered_communication", "chronic_inflammation", "cellular_senescence"],
        benefits: ["calm", "sleep"]
    },
    // 88
    {
        id: "polygala_tenuifolia",
        name: "Polygala Tenuifolia",
        description: "Nootropic root that supports BDNF, mood, and memory.",
        hallmarks: ["altered_communication", "mitochondrial_dysfunction", "loss_of_proteostasis", "chronic_inflammation"],
        benefits: ["cognition", "focus", "calm"]
    },
    // 89
    {
        id: "probiotic_s_thermophilus",
        name: "Probiotic (S. thermophilus)",
        description: "Yogurt starter strain that supports lactose digestion and gut barrier health.",
        hallmarks: ["dysbiosis", "altered_communication", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["immunity", "metabolism", "recovery"]
    },
    // 90
    {
        id: "prebiotic_inulin",
        name: "Prebiotic (Inulin)",
        description: "Fermentable fiber that feeds beneficial microbes and improves metabolic markers.",
        hallmarks: ["dysbiosis", "chronic_inflammation", "altered_communication", "deregulated_nutrient_sensing"],
        benefits: ["metabolism", "immunity", "recovery"]
    },
    // 91
    {
        id: "probiotic_b_longum",
        name: "Probiotic (B. longum)",
        description: "Commensal strain that supports gut health, immunity, and mood.",
        hallmarks: ["dysbiosis", "altered_communication", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["immunity", "calm", "cognition"]
    },
    // 92
    {
        id: "glucosamine",
        name: "Glucosamine",
        description: "Joint nutrient that supports cartilage matrix and reduces degeneration.",
        hallmarks: ["loss_of_proteostasis", "stem_cell_exhaustion", "cellular_senescence", "chronic_inflammation"],
        benefits: ["recovery", "metabolism"]
    },
    // 93
    {
        id: "s_boulardii",
        name: "S. Boulardii",
        description: "Probiotic yeast used to stabilize the gut during stress or antibiotic use.",
        hallmarks: ["dysbiosis", "chronic_inflammation", "altered_communication", "stem_cell_exhaustion"],
        benefits: ["immunity", "recovery", "metabolism"]
    },
    // 94
    {
        id: "l_rhamnosus",
        name: "L. Rhamnosus",
        description: "Probiotic strain that supports gut barrier and mood via gut–brain signaling.",
        hallmarks: ["dysbiosis", "altered_communication", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["immunity", "calm", "cognition"]
    },
    // 95
    {
        id: "turkey_tail_mushroom",
        name: "Turkey Tail Mushroom",
        description: "Polysaccharide-rich mushroom used for immune modulation and gut support.",
        hallmarks: ["dysbiosis", "chronic_inflammation", "altered_communication", "stem_cell_exhaustion"],
        benefits: ["immunity", "recovery"]
    },
    // 96
    {
        id: "l_rhamnosus_2",
        name: "Lactobacillus Rhamnosus",
        description: "Same species-level probiotic as above, second appearance in the grid.",
        hallmarks: ["dysbiosis", "altered_communication", "chronic_inflammation", "stem_cell_exhaustion"],
        benefits: ["immunity", "calm", "cognition"]
    }
];
