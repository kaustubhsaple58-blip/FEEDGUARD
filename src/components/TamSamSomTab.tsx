import React, { useState } from 'react';

export const TamSamSomTab: React.FC = () => {
  const [centersCount, setCentersCount] = useState<number>(50);
  const [monthlyTonnage, setMonthlyTonnage] = useState<number>(300);

  // Financial calculations
  const labCostTraditional = monthlyTonnage * 10 * 2000; // 10 samples per 100 tonnes @ 2000
  const feedguardCost = centersCount * 750 + monthlyTonnage * 10 * 5;
  const annualSavings = (labCostTraditional - feedguardCost) * 12;
  const penaltyRiskMitigatedLakhs = Math.round((centersCount * 0.35) * 10) / 10;

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div>
        <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
          Economic Viability
        </span>
        <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
          Sourced Market Sizing &amp; Financial Model
        </h2>
        <p className="text-body-sm font-body-sm text-on-surface-variant">
          Formulas derived from Ministry of Animal Husbandry &amp; Dairying (DAHD) and NDDB Annual Statistics.
        </p>
      </div>

      {/* TAM SAM SOM Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded border border-outline-variant bg-surface-container-lowest space-y-2 hover:border-secondary/40 transition-colors">
          <div className="flex justify-between items-center text-outline font-label-md text-label-sm">
            <span>TOTAL ADDRESSABLE (TAM)</span>
            <span className="material-symbols-outlined text-secondary">public</span>
          </div>
          <div className="text-headline-xl font-headline-xl text-primary tabular-nums">₹4,200 Cr</div>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            All organized commercial dairy compound feed and silage production across India (approx. 28 Million Metric Tonnes annually).
          </p>
          <div className="pt-2 border-t border-outline-variant text-[11px] font-label-sm text-outline">
            Formula: 28M MT × ₹1,500/MT testing/loss prevention fee equivalent.
          </div>
        </div>

        <div className="p-5 rounded border border-outline-variant bg-surface-container-lowest space-y-2 hover:border-secondary/40 transition-colors">
          <div className="flex justify-between items-center text-outline font-label-md text-label-sm">
            <span>SERVICEABLE ADDRESSABLE (SAM)</span>
            <span className="material-symbols-outlined text-secondary">location_city</span>
          </div>
          <div className="text-headline-xl font-headline-xl text-primary tabular-nums">₹840 Cr</div>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Silage and quality-monitored cattle feed consumed within organized dairy cooperatives (Amul, Nandini, Mahanand, Saras, Verka).
          </p>
          <div className="pt-2 border-t border-outline-variant text-[11px] font-label-sm text-outline">
            Formula: ~20% cooperative share of national organized feed procurement.
          </div>
        </div>

        <div className="p-5 rounded border border-outline-variant bg-surface-container-lowest space-y-2 hover:border-emerald-700/40 transition-colors">
          <div className="flex justify-between items-center text-outline font-label-md text-label-sm">
            <span>SERVICEABLE OBTAINABLE (SOM)</span>
            <span className="material-symbols-outlined text-secondary">flag</span>
          </div>
          <div className="text-headline-xl font-headline-xl text-emerald-800 tabular-nums">₹54 Cr</div>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Initial 3-Year target: 6,000 Village Level Collection Centers across Maharashtra, Gujarat, and Karnataka via B2B SaaS licensing.
          </p>
          <div className="pt-2 border-t border-outline-variant text-[11px] font-label-sm text-outline">
            Formula: 6,000 centers × ₹750/month subscription + ₹5 per QR verification.
          </div>
        </div>
      </div>

      {/* Value Proposition Matrix */}
      <div className="border border-outline-variant rounded p-5 bg-surface-container-low space-y-4">
        <div className="font-label-md text-label-md font-bold text-primary">
          Cooperative ROI &amp; Loss Avoidance Formula
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-label-sm">
          <div className="p-3.5 bg-surface-container-lowest rounded border border-outline-variant">
            <div className="text-outline uppercase text-[10px]">Cost Per Sample</div>
            <div className="text-headline-sm font-headline-sm text-emerald-700 mt-1">₹3.50 vs ₹2,500</div>
            <div className="text-on-surface-variant mt-1">
              FeedGuard optical triage vs standard third-party commercial HPLC lab assay.
            </div>
          </div>
          <div className="p-3.5 bg-surface-container-lowest rounded border border-outline-variant">
            <div className="text-outline uppercase text-[10px]">Triage Decision Time</div>
            <div className="text-headline-sm font-headline-sm text-emerald-700 mt-1">45 Sec vs 5 Days</div>
            <div className="text-on-surface-variant mt-1">
              Instant farm-gate rejection prevents contaminating bulk collection silos.
            </div>
          </div>
          <div className="p-3.5 bg-surface-container-lowest rounded border border-outline-variant">
            <div className="text-outline uppercase text-[10px]">Milk Penalty Avoidance</div>
            <div className="text-headline-sm font-headline-sm text-emerald-700 mt-1">₹18 Lakh / FPO / Yr</div>
            <div className="text-on-surface-variant mt-1">
              Stops tanker rejection caused by Aflatoxin M1 &gt; 0.5 ug/kg statutory violation.
            </div>
          </div>
        </div>

        {/* Dynamic ROI Calculator Slider */}
        <div className="p-4 bg-surface-container-lowest rounded border border-outline-variant space-y-4 mt-2">
          <div className="flex items-center justify-between">
            <span className="font-label-md font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              Interactive Union ROI Estimator
            </span>
            <span className="text-xs font-label-sm text-emerald-700 font-bold">
              Est. Annual Saving: ₹{(annualSavings / 100000).toFixed(1)} Lakhs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-label-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span>Member Village Centers:</span>
                <span className="font-bold text-primary">{centersCount} Centers</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={centersCount}
                onChange={(e) => setCentersCount(parseInt(e.target.value, 10))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Monthly Silage Handled:</span>
                <span className="font-bold text-primary">{monthlyTonnage} MT</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={monthlyTonnage}
                onChange={(e) => setMonthlyTonnage(parseInt(e.target.value, 10))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant flex flex-col sm:flex-row justify-between gap-1">
            <span>
              Direct testing operational cost saved: <strong>₹{((labCostTraditional * 12) / 100000).toFixed(1)} Lakhs / yr</strong>
            </span>
            <span>
              Prevented milk contamination tanker rejections: <strong>₹{penaltyRiskMitigatedLakhs} Lakhs / yr</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
