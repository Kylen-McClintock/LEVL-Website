import React from 'react';

export function SupplementFacts() {
  return (
    <div className="absolute inset-0 z-20 bg-[var(--color-levl-bg)] text-white overflow-y-auto hide-scrollbar p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full bg-black border-2 border-white/20 p-6 shadow-2xl">
        <h2 className="text-4xl font-black mb-1 tracking-tighter">Supplement Facts</h2>
        <div className="flex justify-between text-sm border-b-4 border-white pb-1 mb-2 font-medium">
          <div className="flex flex-col">
            <span>Serving Size 3 Capsules</span>
            <span>Servings Per Container 30</span>
          </div>
        </div>

        <div className="flex justify-between text-xs font-bold border-b border-white pb-1 mb-2">
          <span>Amount Per Serving</span>
          <span>% Daily Value*</span>
        </div>

        <div className="space-y-0.5 text-sm font-medium">
          <FactRow name="Vitamin B6" amount="5.0 mg" dv="290%" />
          <FactRow name="Magnesium" sub="(as Magnesium Glycinate)" amount="70 mg" dv="15%" />
          <FactRow name="Zinc" sub="(as Zinc Citrate)" amount="8.0 mg" dv="70%" />
          <div className="border-t-4 border-white my-2" />
          <FactRow name="Valerian Root Extract" amount="300 mg" dv="†" />
          <FactRow name="Astragalus Root Extract" amount="300 mg" dv="†" />
          <FactRow name="Lemon Balm Extract" amount="250 mg" dv="†" />
          <FactRow name="L-Theanine" amount="200 mg" dv="†" />
          <FactRow name="L-Tryptophan" amount="100 mg" dv="†" />
          <FactRow name="Passion Flower Extract" amount="100 mg" dv="†" />
          <FactRow name="Hops Extract" amount="100 mg" dv="†" />
          <FactRow name="Apigenin" amount="50 mg" dv="†" />
          <FactRow name="Luteolin" amount="50 mg" dv="†" />
          <FactRow name="Lithium Orotate" amount="50 mg" dv="†" />
        </div>

        <div className="border-t-4 border-white mt-2 pt-2 mb-4">
          <p className="text-xs font-medium">† Daily Value (DV) not established.</p>
        </div>

        <p className="text-xs">
          <span className="font-bold">Other Ingredients:</span> Cellulose Capsule, Rice Flour, Magnesium Stearate (vegetable source).
        </p>
      </div>
    </div>
  );
}

function FactRow({ name, sub, amount, dv }: { name: string, sub?: string, amount: string, dv: string }) {
  return (
    <div className="flex justify-between items-end border-b border-white/30 pb-0.5">
      <div className="flex flex-col leading-tight">
        <span className="font-bold">{name}</span>
        {sub && <span className="text-[10px] text-white/70 ml-2">{sub}</span>}
      </div>
      <div className="flex gap-4 text-right">
        <span className="w-16">{amount}</span>
        <span className="w-10 font-bold">{dv}</span>
      </div>
    </div>
  );
}
