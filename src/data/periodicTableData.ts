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
    { id: "genomic_instability", label: "Genomic Instability", description: "Accumulation of genetic damage over time." },
    { id: "telomere_attrition", label: "Telomere Attrition", description: "Shortening of protective caps on chromosomes." },
    { id: "epigenetic_alterations", label: "Epigenetic Alterations", description: "Changes in gene expression without altering DNA sequence." },
    { id: "loss_of_proteostasis", label: "Loss of Proteostasis", description: "Failure of protein folding and clearance mechanisms." },
    { id: "disabled_macroautophagy", label: "Disabled Macroautophagy", description: "Decline in the cell's ability to recycle waste." },
    { id: "deregulated_nutrient_sensing", label: "Deregulated Nutrient Sensing", description: "Imbalanced cellular response to nutrients." },
    { id: "mitochondrial_dysfunction", label: "Mitochondrial Dysfunction", description: "Reduced energy production and increased oxidative stress." },
    { id: "cellular_senescence", label: "Cellular Senescence", description: "Accumulation of 'zombie cells' that damage tissue." },
    { id: "stem_cell_exhaustion", label: "Stem Cell Exhaustion", description: "Decline in regenerative capacity of tissues." },
    { id: "altered_communication", label: "Altered Intercellular Communication", description: "Changes in signaling between cells, leading to inflammation." },
    { id: "chronic_inflammation", label: "Chronic Inflammation", description: "Persistent, low-grade inflammation ('inflammaging')." },
    { id: "dysbiosis", label: "Dysbiosis", description: "Imbalance in the gut microbiome." },
];

export const BENEFITS: Benefit[] = [
    { id: "energy", label: "Energy", description: "Enhances cellular energy production and physical vitality." },
    { id: "cognition", label: "Cognition", description: "Supports brain health, memory, and mental clarity." },
    { id: "focus", label: "Focus", description: "Improves concentration and sustained attention." },
    { id: "metabolism", label: "Metabolism", description: "Optimizes nutrient processing and metabolic flexibility." },
    { id: "immunity", label: "Immunity", description: "Strengthens immune defense and resilience." },
    { id: "recovery", label: "Recovery", description: "Aids in tissue repair and physical recovery." },
    { id: "calm", label: "Calm", description: "Promotes relaxation and stress resilience." },
    { id: "sleep", label: "Sleep", description: "Supports deep, restorative sleep cycles." },
];

// Based on visual transcription of the user's periodic table
export const MOLECULES: Molecule[] = [
    // format: { id: "fullerene", name: "Fullerene", hallmarks: ["genomic_instability", "mitochondrial_dysfunction"], benefits: ["energy", "recovery"], description: "A Carbon-60 molecule known for its potent antioxidant properties." },
    // Row 1: Energy
    { id: "fullerene", name: "Fullerene", hallmarks: ["genomic_instability"], benefits: ["energy"], description: "Powerful antioxidant scavenging free radicals." },
    { id: "astragalus", name: "Astragalus Extract", hallmarks: ["telomere_attrition"], benefits: ["energy"], description: "Traditional herb supporting telomere length." },
    { id: "pterostilbene", name: "Pterostilbene", hallmarks: ["epigenetic_alterations"], benefits: ["energy"], description: "Analog of resveratrol with higher bioavailability." },
    { id: "rhodiola", name: "Rhodiola Rosea", hallmarks: ["loss_of_proteostasis"], benefits: ["energy"], description: "Adaptogen that combats fatigue and stress." },
    { id: "urolithin_a", name: "Urolithin A", hallmarks: ["disabled_macroautophagy"], benefits: ["energy"], description: "Activates mitophagy to renew mitochondria." },
    { id: "ca_akg", name: "Ca-AKG", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["energy"], description: "Key metabolite in the Krebs cycle for energy." },
    { id: "creatine", name: "Creatine", hallmarks: ["mitochondrial_dysfunction"], benefits: ["energy"], description: "Boosts ATP availability for muscle and brain." },
    { id: "fisetin", name: "Fisetin", hallmarks: ["cellular_senescence"], benefits: ["energy"], description: "Potent senolytic found in strawberries." },
    { id: "nmn", name: "NMN", hallmarks: ["stem_cell_exhaustion"], benefits: ["energy"], description: "Precursor to NAD+, essential for energy metabolism." },
    { id: "beet_root", name: "Beet Root Extract", hallmarks: ["altered_communication"], benefits: ["energy"], description: "Enhances blood flow and oxygen delivery." },
    { id: "boswellia", name: "Boswellia", hallmarks: ["chronic_inflammation"], benefits: ["energy"], description: "Reduces inflammation to support joint health." },
    { id: "probiotic_s_thermophilus", name: "Probiotic (S. thermophilus)", hallmarks: ["dysbiosis"], benefits: ["energy"], description: "Supports gut health and metabolic energy." },

    // Row 2: Cognition
    { id: "nac", name: "NAC", hallmarks: ["genomic_instability"], benefits: ["cognition"], description: "Precursor to glutathione, protecting neurons." },
    { id: "cycloastragenol", name: "Cycloastragenol", hallmarks: ["telomere_attrition"], benefits: ["cognition"], description: "Active compound in Astragalus." },
    { id: "polydatin", name: "Polydatin", hallmarks: ["epigenetic_alterations"], benefits: ["cognition"], description: "Precursor to resveratrol, supports brain health." },
    { id: "taurine", name: "Taurine", hallmarks: ["loss_of_proteostasis"], benefits: ["cognition"], description: "Supports neurotransmitter regulation." },
    { id: "trehalose", name: "Trehalose", hallmarks: ["disabled_macroautophagy"], benefits: ["cognition"], description: "Induces autophagy to clear cellular debris." },
    { id: "beta_hydroxybutyrate", name: "Beta-Hydroxybutyrate", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["cognition"], description: "Ketone body serving as brain fuel." },
    { id: "pqq", name: "PQQ", hallmarks: ["mitochondrial_dysfunction"], benefits: ["cognition"], description: "Stimulates mitochondrial biogenesis in the brain." },
    { id: "quercetin", name: "Quercetin", hallmarks: ["cellular_senescence"], benefits: ["cognition"], description: "Flavonoid supporting brain health and immunity." },
    { id: "tmg", name: "TMG", hallmarks: ["stem_cell_exhaustion"], benefits: ["cognition"], description: "Methyl donor supporting DNA synthesis." },
    { id: "apigenin", name: "Apigenin", hallmarks: ["altered_communication"], benefits: ["cognition"], description: "Flavonoid with neuroprotective effects." },
    { id: "ginger_extract", name: "Ginger Extract", hallmarks: ["chronic_inflammation"], benefits: ["cognition"], description: "Reduces oxidative stress in cognitive pathways." },
    { id: "prebiotic_inulin", name: "Prebiotic (Inulin)", hallmarks: ["dysbiosis"], benefits: ["cognition"], description: "Feeds gut bacteria beneficial for the brain." },

    // Row 3: Focus
    { id: "sulforaphane", name: "Sulforaphane", hallmarks: ["genomic_instability"], benefits: ["focus"], description: "Activates Nrf2 pathway for cellular defense." },
    { id: "astragaloside_iv", name: "Astragaloside IV", hallmarks: ["telomere_attrition"], benefits: ["focus"], description: "Potent compound for cellular protection." },
    { id: "l_theanine", name: "L-Theanine", hallmarks: ["epigenetic_alterations"], benefits: ["focus"], description: "Promotes relaxed alertness and focus." },
    { id: "egcg", name: "EGCG", hallmarks: ["loss_of_proteostasis"], benefits: ["focus"], description: "Green tea catchin supporting brain function." },
    { id: "curcumin", name: "Curcumin", hallmarks: ["disabled_macroautophagy"], benefits: ["focus"], description: "Anti-inflammatory improving mood and memory." },
    { id: "nicotinamide_riboside", name: "Nicotinamide Riboside (NR)", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["focus"], description: "Boosts NAD+ levels for mental clarity." },
    { id: "methylene_blue", name: "Methylene Blue", hallmarks: ["mitochondrial_dysfunction"], benefits: ["focus"], description: "Improves mitochondrial efficiency in neurons." },
    { id: "piperlongumine", name: "Piperlongumine", hallmarks: ["cellular_senescence"], benefits: ["focus"], description: "Senolytic agent clearing senescent cells." },
    { id: "ginseng", name: "Ginseng", hallmarks: ["stem_cell_exhaustion"], benefits: ["focus"], description: "Adaptogen enhancing mental performance." },
    { id: "bacopa_monnieri", name: "Bacopa Monnieri", hallmarks: ["altered_communication"], benefits: ["focus"], description: "Ayurvedic herb for memory and learning." },
    { id: "honokiol", name: "Honokiol", hallmarks: ["chronic_inflammation"], benefits: ["focus"], description: "Neuroprotective compound from magnolia bark." },
    { id: "probiotic_b_longum", name: "Probiotic (B. longum)", hallmarks: ["dysbiosis"], benefits: ["focus"], description: "Supports the gut-brain axis." },

    // Row 4: Metabolism
    { id: "ala", name: "ALA", hallmarks: ["genomic_instability"], benefits: ["metabolism"], description: "Alpha Lipoic Acid, master antioxidant." },
    { id: "gynostemma", name: "Gynostemma", hallmarks: ["telomere_attrition"], benefits: ["metabolism"], description: "Activates AMPK for metabolic balance." },
    { id: "milk_thistle", name: "Milk Thistle Extract", hallmarks: ["epigenetic_alterations"], benefits: ["metabolism"], description: "Supports liver function and detoxification." },
    { id: "spermidine", name: "Spermidine", hallmarks: ["loss_of_proteostasis"], benefits: ["metabolism"], description: "Induces autophagy essential for metabolism." },
    { id: "rapamycin", name: "Rapamycin", hallmarks: ["disabled_macroautophagy"], benefits: ["metabolism"], description: "mTOR inhibitor mimicking calorie restriction." },
    { id: "metformin", name: "Metformin", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["metabolism"], description: "Improves insulin sensitivity." },
    { id: "acetyl_l_carnitine", name: "Acetyl-L-Carnitine", hallmarks: ["mitochondrial_dysfunction"], benefits: ["metabolism"], description: "Transports fatty acids for energy." },
    { id: "berberine", name: "Berberine", hallmarks: ["cellular_senescence"], benefits: ["metabolism"], description: "Activates AMPK, mimicking exercise." },
    { id: "nmn_metabolism", name: "NMN", hallmarks: ["stem_cell_exhaustion"], benefits: ["metabolism"], description: "Supports NAD+ for metabolic health." },
    { id: "nigella_sativa", name: "Nigella Sativa", hallmarks: ["altered_communication"], benefits: ["metabolism"], description: "Black seed oil supporting glucose metabolism." },
    { id: "grape_seed", name: "Grape Seed Extract", hallmarks: ["chronic_inflammation"], benefits: ["metabolism"], description: "Supports circulation and reduces oxidation." },
    { id: "glucosamine", name: "Glucosamine", hallmarks: ["dysbiosis"], benefits: ["metabolism"], description: "Promotes joint health and mimics low-carb diet." },

    // Row 5: Immunity
    { id: "zinc", name: "Zinc", hallmarks: ["genomic_instability"], benefits: ["immunity"], description: "Essential mineral for immune function." },
    { id: "echinacea", name: "Echinacea", hallmarks: ["telomere_attrition"], benefits: ["immunity"], description: "Supports immune system response." },
    { id: "vitamin_c", name: "Vitamin C", hallmarks: ["epigenetic_alterations"], benefits: ["immunity"], description: "Antioxidant vital for immune cells." },
    { id: "lions_mane", name: "Lion's Mane", hallmarks: ["loss_of_proteostasis"], benefits: ["immunity"], description: "Mushroom supporting nerve and immune health." },
    { id: "chaga_mushroom", name: "Chaga Mushroom", hallmarks: ["disabled_macroautophagy"], benefits: ["immunity"], description: "Rich in antioxidants and immune modulation." },
    { id: "resveratrol", name: "Resveratrol", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["immunity"], description: "Supports immune and cardiovascular health." },
    { id: "astaxanthin", name: "Astaxanthin", hallmarks: ["mitochondrial_dysfunction"], benefits: ["immunity"], description: "Potent antioxidant protecting cell membranes." },
    { id: "senolytic_complex", name: "Senolytic Complex", hallmarks: ["cellular_senescence"], benefits: ["immunity"], description: "Blend of Fisetin + Pepper for clearing cells." },
    { id: "reishi_mushroom", name: "Reishi Mushroom", hallmarks: ["stem_cell_exhaustion"], benefits: ["immunity"], description: "Adaptogen boosting immune systems." },
    { id: "beta_glucans", name: "Beta-Glucans", hallmarks: ["altered_communication"], benefits: ["immunity"], description: "Primes immune cells for action." },
    { id: "tart_cherry", name: "Tart Cherry Extract", hallmarks: ["chronic_inflammation"], benefits: ["immunity"], description: "Reduces inflammation and aids sleep." },
    { id: "s_boulardii", name: "S. Boulardii", hallmarks: ["dysbiosis"], benefits: ["immunity"], description: "Probiotic yeast preventing gut infections." },

    // Row 6: Recovery
    { id: "glynac", name: "GlyNAC", hallmarks: ["genomic_instability"], benefits: ["recovery"], description: "Glycine + NAC boosting glutathione." },
    { id: "astragalus_recovery", name: "Astragalus", hallmarks: ["telomere_attrition"], benefits: ["recovery"], description: "Supports immune and physical recovery." },
    { id: "phosphatidylserine", name: "Phosphatidylserine", hallmarks: ["epigenetic_alterations"], benefits: ["recovery"], description: "Supports cortisol balance and recovery." },
    { id: "collagen", name: "Collagen", hallmarks: ["loss_of_proteostasis"], benefits: ["recovery"], description: "Building block for connective tissues." },
    { id: "urolithin_b", name: "Urolithin B", hallmarks: ["disabled_macroautophagy"], benefits: ["recovery"], description: "Supports muscle growth and repair." },
    { id: "glutathione", name: "Glutathione", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["recovery"], description: "Master antioxidant for detox and repair." },
    { id: "coq10", name: "CoQ10", hallmarks: ["mitochondrial_dysfunction"], benefits: ["recovery"], description: "Vital for cellular energy and recovery." },
    { id: "fisetin_recovery", name: "Fisetin", hallmarks: ["cellular_senescence"], benefits: ["recovery"], description: "Reduces inflammation aiding recovery." },
    { id: "bovine_colostrum", name: "Bovine Colostrum", hallmarks: ["stem_cell_exhaustion"], benefits: ["recovery"], description: "Rich in growth factors for tissue repair." },
    { id: "shilajit", name: "Shilajit", hallmarks: ["altered_communication"], benefits: ["recovery"], description: "Rich in minerals, boosts energy recovery." },
    { id: "artemisinin", name: "Artemisinin", hallmarks: ["chronic_inflammation"], benefits: ["recovery"], description: "Modulates immune response." },
    { id: "l_rhamnosus", name: "L. Rhamnosus", hallmarks: ["dysbiosis"], benefits: ["recovery"], description: "Probiotic aiding gut recovery." },

    // Row 7: Calm
    { id: "omega_3", name: "Omega-3", hallmarks: ["genomic_instability"], benefits: ["calm"], description: "Supports brain health and mood stability." },
    { id: "cacao", name: "Cacao", hallmarks: ["telomere_attrition"], benefits: ["calm"], description: "Contains theobromine for mood elevation." },
    { id: "5_htp", name: "5-HTP", hallmarks: ["epigenetic_alterations"], benefits: ["calm"], description: "Precursor to serotonin." },
    { id: "holy_basil", name: "Holy Basil (Tulsi)", hallmarks: ["loss_of_proteostasis"], benefits: ["calm"], description: "Adaptogen for stress relief." },
    { id: "tremella", name: "Tremella Mushroom", hallmarks: ["disabled_macroautophagy"], benefits: ["calm"], description: "Hydrating mushroom supporting neuroprotection." },
    { id: "inositol", name: "Inositol", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["calm"], description: "Supports neurotransmitter signaling." },
    { id: "tongkat_ali", name: "Tongkat Ali", hallmarks: ["mitochondrial_dysfunction"], benefits: ["calm"], description: "Balances stress hormones like cortisol." },
    { id: "lithium", name: "Lithium (Low Dose)", hallmarks: ["cellular_senescence"], benefits: ["calm"], description: "Neuroprotective trace mineral." },
    { id: "shatavari", name: "Shatavari", hallmarks: ["stem_cell_exhaustion"], benefits: ["calm"], description: "Adaptogen supporting hormonal balance." },
    { id: "magnesium_glycinate", name: "Magnesium Glycinate", hallmarks: ["altered_communication"], benefits: ["calm"], description: "Highly absorbable form for relaxation." },
    { id: "lemon_balm", name: "Lemon Balm", hallmarks: ["chronic_inflammation"], benefits: ["calm"], description: "Herb promoting calmness and reduced anxiety." },
    { id: "turkey_tail", name: "Turkey Tail Mushroom", hallmarks: ["dysbiosis"], benefits: ["calm"], description: "Supports gut-brain axis balance." },

    // Row 8: Sleep
    { id: "gaba", name: "GABA", hallmarks: ["genomic_instability"], benefits: ["sleep"], description: "Inhibitory neurotransmitter for relaxation." },
    { id: "gotu_kola", name: "Gotu Kola", hallmarks: ["telomere_attrition"], benefits: ["sleep"], description: "Herb that soothes the nervous system." },
    { id: "kava", name: "Kava", hallmarks: ["epigenetic_alterations"], benefits: ["sleep"], description: "Traditional root for deep relaxation." },
    { id: "magnolia_bark", name: "Magnolia Bark Extract", hallmarks: ["loss_of_proteostasis"], benefits: ["sleep"], description: "Modulates cortisol for better sleep." },
    { id: "tart_cherry_sleep", name: "Tart Cherry Extract", hallmarks: ["disabled_macroautophagy"], benefits: ["sleep"], description: "Natural source of melatonin." },
    { id: "zma", name: "ZMA (Zinc/Mag/B6)", hallmarks: ["deregulated_nutrient_sensing"], benefits: ["sleep"], description: "Synergistic blend for sleep quality." },
    { id: "l_tryptophan", name: "L-Tryptophan", hallmarks: ["mitochondrial_dysfunction"], benefits: ["sleep"], description: "Precursor to serotonin and melatonin." },
    { id: "hops_extract", name: "Hops Extract", hallmarks: ["cellular_senescence"], benefits: ["sleep"], description: "Promotes sedation and sleep onset." },
    { id: "skullcap", name: "Skullcap", hallmarks: ["stem_cell_exhaustion"], benefits: ["sleep"], description: "Calms the mind and induces sleep." },
    { id: "chamomile", name: "Chamomile", hallmarks: ["altered_communication"], benefits: ["sleep"], description: "Classic herb for relaxing into sleep." },
    { id: "polygala", name: "Polygala Tenuifolia", hallmarks: ["chronic_inflammation"], benefits: ["sleep"], description: "Supports sleep quality and memory." },
    { id: "l_rhamnosus_sleep", name: "Lactobacillus Rhamnosus", hallmarks: ["dysbiosis"], benefits: ["sleep"], description: "Psychobiotic reducing stress for sleep." },
];
