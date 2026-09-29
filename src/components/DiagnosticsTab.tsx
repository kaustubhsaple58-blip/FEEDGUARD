import React, { useState } from 'react';

export const DiagnosticsTab: React.FC = () => {
  const [showFliegModal, setShowFliegModal] = useState<boolean>(false);
  const [lacticRatio, setLacticRatio] = useState<number>(78);
  const [aceticRatio, setAceticRatio] = useState<number>(18);
  const [butyricRatio, setButyricRatio] = useState<number>(4);

  // Approximate Flieg score formula calculation:
  // Flieg score = 220 + (2 * DryMatter% - 15) - 40 * pH, or acid ratio based
  const calculatedFlieg = Math.min(100, Math.max(0, Math.round(lacticRatio * 1.1 - butyricRatio * 3.5)));

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
            Diagnostic Certificate
          </span>
          <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            Multi-Modal Specimen Fusion Report
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant font-label-md mt-1">
            LOT ID: #MH-PUN-2026-08942 • SPECIMEN: CORN SILAGE HYBRID 900M
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 border border-outline-variant rounded font-label-sm text-label-sm bg-surface-container-low hover:bg-surface-container text-primary flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => setShowFliegModal(true)}
          >
            <span className="material-symbols-outlined text-base">calculate</span>
            Flieg Index Calculator
          </button>
          <button
            className="px-3 py-1.5 border border-outline-variant rounded font-label-sm text-label-sm bg-surface-container-low hover:bg-surface-container text-primary flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => window.print()}
          >
            <span className="material-symbols-outlined text-base">print</span>
            Export PDF Protocol
          </button>
        </div>
      </div>

      {/* 4-Pane Diagnostic Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-label-sm text-label-sm">
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant space-y-1">
          <span className="text-outline uppercase text-[10px] tracking-wider">Moisture Content</span>
          <div className="text-headline-sm font-headline-sm text-primary tabular-nums">67.4%</div>
          <span className="text-emerald-700 font-semibold">Nominal Target (65-70%)</span>
        </div>
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant space-y-1">
          <span className="text-outline uppercase text-[10px] tracking-wider">Calibrated pH</span>
          <div className="text-headline-sm font-headline-sm text-primary tabular-nums">4.12</div>
          <span className="text-emerald-700 font-semibold">Stable Fermentation</span>
        </div>
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant space-y-1">
          <span className="text-outline uppercase text-[10px] tracking-wider">Flieg Score (Silage Index)</span>
          <div className="text-headline-sm font-headline-sm text-primary tabular-nums">88.5 / 100</div>
          <span className="text-emerald-700 font-semibold">Grade A: Outstanding</span>
        </div>
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant space-y-1">
          <span className="text-outline uppercase text-[10px] tracking-wider">Volatile Fatty Acid Est.</span>
          <div className="text-headline-sm font-headline-sm text-primary">Lactic &gt; Butyric</div>
          <span className="text-emerald-700 font-semibold">Butyric &lt; 0.1% DM</span>
        </div>
      </div>

      {/* Technical Telemetry Table */}
      <div className="overflow-x-auto border border-outline-variant rounded">
        <table className="w-full text-left font-body-sm text-body-sm border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant font-label-md text-label-sm uppercase tracking-wider text-on-surface-variant">
              <th className="p-3">Parameter Description</th>
              <th className="p-3">Sensor Source</th>
              <th className="p-3">Observed Value</th>
              <th className="p-3">Laboratory Reference Cap</th>
              <th className="p-3">Risk Assessment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-label-md text-label-sm">
            <tr className="hover:bg-surface-container-low transition-colors">
              <td className="p-3 font-semibold text-primary">Acrothecium / Aspergillus Mold</td>
              <td className="p-3 text-on-surface-variant">Edge CV Model (YOLOv8)</td>
              <td className="p-3 tabular-nums">&lt; 0.5% Area Coverage</td>
              <td className="p-3 text-outline">&lt; 5.0% Visual Threshold</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">NORMAL</span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low transition-colors">
              <td className="p-3 font-semibold text-primary">Fermentation pH Stability</td>
              <td className="p-3 text-on-surface-variant">Photometric Colorimeter L*a*b*</td>
              <td className="p-3 tabular-nums">4.12 ± 0.10</td>
              <td className="p-3 text-outline">3.80 - 4.20 Optimal</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">OPTIMAL</span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low transition-colors">
              <td className="p-3 font-semibold text-primary">Ambient Temperature Exposure</td>
              <td className="p-3 text-on-surface-variant">Integrated Pit Thermistor</td>
              <td className="p-3 tabular-nums">26.4 °C</td>
              <td className="p-3 text-outline">&lt; 32.0 °C Thermal Limit</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">PASS</span>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low transition-colors">
              <td className="p-3 font-semibold text-primary">Aflatoxin B1/M1 Direct Assay</td>
              <td className="p-3 text-on-surface-variant italic">Statutory Honest Boundary</td>
              <td className="p-3 text-on-surface-variant italic">Undetectable at Edge (Optical Limit)</td>
              <td className="p-3 text-outline">&lt; 20 ppb (Feed) / 0.5 ug/kg (Milk)</td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  REFERRED IF RISK &gt; 0.65
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Compliance Disclaimer Card */}
      <div className="p-4 rounded bg-surface-container-low border-l-4 border-slate-600 text-on-surface-variant font-body-sm text-body-sm space-y-1">
        <div className="font-semibold text-primary flex items-center gap-1 font-label-md text-label-md">
          <span className="material-symbols-outlined text-base">policy</span>
          Statutory Agricultural Compliance Notice (ISO/IEC 17025 Triage)
        </div>
        <p>
          FEEDGUARD AI is a decentralized pre-sorting and early-warning screening tool designed to empower rural cooperative field officers. It flags physiological indicators of silage decay, temperature spike, and fungal infestation. It does NOT supersede confirmatory wet-chemistry assays (HPLC, LC-MS/MS, ELISA) mandated by FSSAI for formal lot condemnations.
        </p>
      </div>

      {/* Flieg Score Calculator Modal */}
      {showFliegModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <h3 className="font-headline-sm text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">science</span>
                Flieg Index VFA Ratio Sandbox
              </h3>
              <button
                className="text-on-surface-variant hover:text-primary cursor-pointer"
                onClick={() => setShowFliegModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-body-sm text-on-surface-variant">
              The Flieg Silage Quality Index computes fermentation quality from the relative proportions of lactic, acetic, and butyric acids.
            </p>

            <div className="space-y-3 font-label-sm text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Lactic Acid Ratio:</span>
                  <span className="font-bold text-emerald-700">{lacticRatio}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="95"
                  value={lacticRatio}
                  onChange={(e) => setLacticRatio(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Acetic Acid Ratio:</span>
                  <span className="font-bold text-amber-700">{aceticRatio}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={aceticRatio}
                  onChange={(e) => setAceticRatio(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Butyric Acid Ratio (Deleterious):</span>
                  <span className="font-bold text-red-700">{butyricRatio}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={butyricRatio}
                  onChange={(e) => setButyricRatio(parseInt(e.target.value, 10))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded border border-outline-variant text-center">
              <div className="text-[10px] uppercase text-outline">Computed Flieg Score</div>
              <div className="text-headline-lg font-bold text-primary tabular-nums mt-0.5">
                {calculatedFlieg} / 100
              </div>
              <div className="text-xs font-semibold text-emerald-700 mt-1">
                {calculatedFlieg >= 81
                  ? 'Grade A: Very Good / Outstanding Silage'
                  : calculatedFlieg >= 61
                  ? 'Grade B: Good Silage'
                  : calculatedFlieg >= 41
                  ? 'Grade C: Moderate / Secondary Fermentation'
                  : 'Grade D: Poor / Putrefactive Silage'}
              </div>
            </div>

            <button
              className="w-full py-2 bg-primary-container text-white rounded font-label-sm font-semibold hover:bg-secondary cursor-pointer"
              onClick={() => setShowFliegModal(false)}
            >
              Apply to Diagnostic Context
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
