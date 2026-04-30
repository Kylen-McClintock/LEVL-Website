import re

new_details = {
    "Vitamin B6": "Vitamin B6 is crucial for the biosynthesis of neurotransmitters, including serotonin and dopamine. It acts as a coenzyme in the conversion of L-Tryptophan to 5-HTP and then to serotonin/melatonin.",
    "Magnesium Glycinate": "Magnesium is essential for ATP stability and enzymatic function. The glycinate form provides glycine, an inhibitory neurotransmitter that promotes relaxation.",
    "Zinc (as Zinc Citrate)": "Zinc plays a critical role in DNA repair mechanisms and immune modulation. It supports SOD (Superoxide Dismutase) activity to combat oxidative stress.",
    "Valerian Root Extract": "Valerenic acid in Valerian root inhibits the breakdown of GABA, extending its calming effects on the nervous system.",
    "Astragalus Root Extract": "Astragalus contains cycloastragenol and astragaloside IV, compounds studied for their potential to activate telomerase and protect telomere length.",
    "Lemon Balm Extract": "Rosmarinic acid in Lemon Balm has been shown to increase GABA transaminase activity, helping to maintain higher GABA levels in the brain.",
    "L Theanine": "L-Theanine crosses the blood-brain barrier to promote alpha wave generation, associated with a state of 'relaxed wakefulness' conducive to falling asleep.",
    "L Tryptophan": "Precursor to 5-HTP and Serotonin. Provides raw substrate for the body's natural melatonin production pathways.",
    "Passion Flower Extract": "Contains flavonoids like chrysin which bind to benzodiazepine sites on GABA receptors, exerting mild anxiolytic effects.",
    "Hops Extract": "Humulone and lupulone in hops appear to enhance the activity of GABA, working synergistically with Valerian.",
    "Apigenin": "Apigenin inhibits CD38, potentially boosting NAD+ levels, and modulates GABA receptors for sleep induction.",
    "Luteolin": "Luteolin is a potent inhibitor of microglial activation and pro-inflammatory cytokines, supporting neuroprotection.",
    "Lithium Orotate": "Micro-dose lithium may support BDNF (Brain Derived Neurotrophic Factor) and autophagy pathways in neurons."
}

with open("src/content/productLongevity.ts", "r") as f:
    content = f.read()

# Replace the whyItMatters string for each ingredient
for name, detail in new_details.items():
    # Regex to match the object block and replace whyItMatters
    # We find name: "Name" and then whyItMatters: "..." inside that block
    pattern = re.compile(rf'(name:\s*"{re.escape(name)}".*?whyItMatters:\s*")(.*?)(")', re.DOTALL)
    content = pattern.sub(rf'\g<1>{detail}\g<3>', content)

with open("src/content/productLongevity.ts", "w") as f:
    f.write(content)
