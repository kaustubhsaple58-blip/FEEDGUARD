import React from 'react';
import { TabId } from '../types';

interface OverviewTabProps {
  onNavigate: (tab: TabId) => void;
  onSelectSample: (sample: 'A' | 'B') => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigate, onSelectSample }) => {
  return (
    <div className="space-y-6">
      {/* Hero Metric Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: India Milk Yield */}
        <div className="bg-surface-container-lowest p-5 rounded border border-outline-variant relative transition-all hover:border-primary/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="font-label-md text-label-md">INDIA ANNUAL MILK YIELD</span>
            <span className="material-symbols-outlined text-secondary">water_drop</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-primary tabular-nums">230.58 MT</div>
          <div className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            #1 Worldwide (24% of global supply)
          </div>
          <div className="font-label-sm text-label-sm text-outline mt-2 pt-2 border-t border-outline-variant">
            Source: BAHS 2023, DAHD, Ministry of Fisheries, AH&amp;D
          </div>
        </div>

        {/* Metric 2: Fodder Deficit */}
        <div className="bg-surface-container-lowest p-5 rounded border border-outline-variant relative transition-all hover:border-amber-600/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="font-label-md text-label-md">NATIONAL FODDER DEFICIT</span>
            <span className="material-symbols-outlined text-amber-600">warning</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-amber-700 tabular-nums">11.24% / 23.4%</div>
          <div className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            11.24% Green Fodder | 23.4% Dry Residue Deficit
          </div>
          <div className="font-label-sm text-label-sm text-outline mt-2 pt-2 border-t border-outline-variant">
            Source: ICAR-IGFRI Vision 2050 Report
          </div>
        </div>

        {/* Metric 3: Forage Storage Loss */}
        <div className="bg-surface-container-lowest p-5 rounded border border-outline-variant relative transition-all hover:border-error/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="font-label-md text-label-md">POST-HARVEST FORAGE LOSS</span>
            <span className="material-symbols-outlined text-error">trending_down</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-error tabular-nums">25.0%</div>
          <div className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            Due to secondary fermentation &amp; anaerobic breach
          </div>
          <div className="font-label-sm text-label-sm text-outline mt-2 pt-2 border-t border-outline-variant">
            Source: FAO Silage Production Guidelines
          </div>
        </div>

        {/* Metric 4: Toxin Tolerance */}
        <div className="bg-surface-container-lowest p-5 rounded border border-outline-variant relative transition-all hover:border-primary/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="font-label-md text-label-md">FSSAI AFLATOXIN M1 CAP</span>
            <span className="material-symbols-outlined text-primary">gavel</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-primary tabular-nums">0.5 μg/kg</div>
          <div className="text-body-sm font-body-sm text-on-surface-variant mt-1">
            Permissible milk contamination statutory threshold
          </div>
          <div className="font-label-sm text-label-sm text-outline mt-2 pt-2 border-t border-outline-variant">
            Source: FSSAI Milk &amp; Milk Products Reg. 2011
          </div>
        </div>
      </div>

      {/* Flagship System Introduction Banner */}
      <div className="bg-surface-container-lowest rounded border border-outline-variant p-6 flex flex-col lg:flex-row gap-6 items-center">
        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold">
            <span className="material-symbols-outlined text-sm">shield</span>
            Smart India Hackathon 2026 Entry — Problem Code: SIH-26-AGRI-048
          </div>
          <h1 className="text-headline-xl font-headline-xl text-primary tracking-tight">
            Decentralized Feed Safety &amp; Anaerobic Silage Triage Engine
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            FEEDGUARD AI bridges the high-risk 72-hour validation gap in rural dairy procurement. By coupling edge-calibrated mobile macro-lens fungal inspection with photometric chemical pH colorimetry, field inspectors instantly isolate hazardous aerobic spoilage, clostridial putrefaction, and mycotoxigenic hazards before feed enters the dairy cold chain.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="px-4 py-2 bg-primary-container hover:bg-secondary text-white rounded font-body-md font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              onClick={() => {
                onSelectSample('A');
                onNavigate('tab-scan');
              }}
            >
              <span className="material-symbols-outlined">center_focus_strong</span>
              Launch Triage Demo (Sample A vs B)
            </button>
            <button
              className="px-4 py-2 border border-outline-variant bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-body-md font-medium flex items-center gap-2 transition-colors cursor-pointer"
              onClick={() => onNavigate('tab-arch')}
            >
              <span className="material-symbols-outlined">schema</span>
              Examine 3-Tier Multi-Modal Protocol
            </button>
            <button
              className="px-4 py-2 border border-amber-300 bg-amber-50 text-amber-900 rounded font-body-md font-medium flex items-center gap-2 hover:bg-amber-100 transition-colors cursor-pointer"
              onClick={() => onNavigate('tab-honesty')}
            >
              <span className="material-symbols-outlined text-amber-700">verified_user</span>
              Scientific Honesty Matrix
            </button>
          </div>
        </div>

        {/* Micro Laboratory Workflow Visualizer */}
        <div className="w-full lg:w-96 bg-surface-container-low p-4 rounded border border-outline-variant space-y-3 shrink-0">
          <div className="text-xs font-label-md font-semibold text-on-surface-variant uppercase tracking-wider flex items-center justify-between">
            <span>Workflow Status Matrix</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="space-y-2">
            <div
              className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant flex items-center gap-3 cursor-pointer hover:border-emerald-500 transition-colors"
              onClick={() => onNavigate('tab-scan')}
            >
              <div className="w-7 h-7 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-label-md text-xs font-bold">
                L1
              </div>
              <div className="text-xs">
                <div className="font-semibold text-primary">Surface Hyphae Vision (YOLOv8 Edge)</div>
                <div className="text-on-surface-variant font-label-sm">88.4% mAP@0.5 • Sub-400ms Local Inference</div>
              </div>
            </div>
            <div
              className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant flex items-center gap-3 cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => onNavigate('tab-scan')}
            >
              <div className="w-7 h-7 rounded bg-blue-100 text-blue-800 flex items-center justify-center font-label-md text-xs font-bold">
                L2
              </div>
              <div className="text-xs">
                <div className="font-semibold text-primary">Photometric pH Strip Calibration</div>
                <div className="text-on-surface-variant font-label-sm">ΔE*ab colorimetric correction (Lactic vs Butyric)</div>
              </div>
            </div>
            <div
              className="p-2.5 rounded bg-surface-container-lowest border border-outline-variant flex items-center gap-3 cursor-pointer hover:border-purple-500 transition-colors"
              onClick={() => onNavigate('tab-referral')}
            >
              <div className="w-7 h-7 rounded bg-purple-100 text-purple-800 flex items-center justify-center font-label-md text-xs font-bold">
                L3
              </div>
              <div className="text-xs">
                <div className="font-semibold text-primary">ISO 17025 Accredited Referral</div>
                <div className="text-on-surface-variant font-label-sm">HPLC/ELISA confirmation for borderline batches</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Specimen Cards for Live Trial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-label-sm font-bold">SPECIMEN PRESET A</span>
              <span className="text-xs font-label-md text-emerald-700">Flieg Score: 88.5</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary mt-2">Optimal Corn Silage</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Uniform lactic fermentation, olive-golden compaction, 0.4% mycelium coverage, pH 4.10. Authorized for high-yielding milch cattle.
            </p>
          </div>
          <button
            className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded font-label-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            onClick={() => {
              onSelectSample('A');
              onNavigate('tab-scan');
            }}
          >
            <span className="material-symbols-outlined text-sm">play_circle</span>
            Inspect Specimen A in Triage Viewport
          </button>
        </div>

        <div className="p-5 rounded border border-red-200 bg-red-50/40 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-label-sm font-bold">SPECIMEN PRESET B</span>
              <span className="text-xs font-label-md text-red-700">Flieg Score: 22.0</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-red-950 mt-2">Spoiled / Clostridial Feed</h3>
            <p className="text-body-sm text-on-surface-variant mt-1">
              Severe aerobic secondary breach, 28.6% white Mucor hyphae, black slime putrefaction, pH 5.80. Triggers statutory quarantine.
            </p>
          </div>
          <button
            className="w-full py-2 bg-red-800 hover:bg-red-900 text-white rounded font-label-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            onClick={() => {
              onSelectSample('B');
              onNavigate('tab-scan');
            }}
          >
            <span className="material-symbols-outlined text-sm">warning</span>
            Inspect Specimen B in Triage Viewport
          </button>
        </div>
      </div>
    </div>
  );
};
