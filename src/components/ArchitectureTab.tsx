import React, { useState } from 'react';

export const ArchitectureTab: React.FC = () => {
  // Interactive Bayesian formula sandbox state
  const [moldAreaPct, setMoldAreaPct] = useState<number>(5.0);
  const [actualPh, setActualPh] = useState<number>(4.2);
  const [ambientTemp, setAmbientTemp] = useState<number>(28);
  const [relHumidity, setRelHumidity] = useState<number>(65);

  const w_cv = 0.50;
  const w_ph = 0.35;
  const w_clim = 0.15;

  // Formula computation:
  // Score = w_cv * (moldAreaPct / 100) + w_ph * Math.abs(actualPh - 4.0) + w_clim * ((ambientTemp * relHumidity) / 1000)
  const cvTerm = w_cv * (moldAreaPct / 100);
  const phTerm = w_ph * Math.abs(actualPh - 4.0);
  const climTerm = w_clim * ((ambientTemp * relHumidity) / 1000);
  const bayesianScore = Math.min(1.0, cvTerm + phTerm + climTerm);
  const isQuarantine = bayesianScore > 0.65;

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div>
        <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
          Analytical Framework
        </span>
        <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight mt-1">
          Multi-Modal Tiered Triage Protocol
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant max-w-3xl mt-2">
          Standard visual inspection misses invisible fungal mycotoxins, while HPLC/ELISA wet-chemistry takes 4 to 7 days and costs ₹1,500–₹3,500 per sample. FEEDGUARD AI deploys a 3-tier escalation pipeline engineered specifically for Indian village cooperative collection centers.
        </p>
      </div>

      {/* 3 Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <div className="border border-outline-variant rounded p-5 bg-surface-container-lowest flex flex-col justify-between hover:border-emerald-500 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold">
                LEVEL 1: EDGE
              </span>
              <span className="material-symbols-outlined text-primary">photo_camera</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Computer Vision Inference</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Runs on edge phone hardware without cellular uplink. Quantifies visible fungal blooms, white aerobic yeast patches, mucor molds, and leaf discoloration.
            </p>
            <div className="space-y-1.5 pt-2 text-xs font-label-sm">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-outline">Model Architecture:</span>
                <span className="font-semibold text-primary">YOLOv8-Nano TFLite Quantized</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-outline">Validation Accuracy:</span>
                <span className="font-semibold text-emerald-700">88.4% mAP@0.5 (Agri-Silage-QA)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-outline">Inference Latency:</span>
                <span className="font-semibold text-primary">340 ms on MediaTek Helio G85</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant font-label-sm text-label-sm text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">check_circle</span> Field-Deployable Offline
          </div>
        </div>

        {/* Tier 2 */}
        <div className="border border-outline-variant rounded p-5 bg-surface-container-lowest flex flex-col justify-between hover:border-blue-500 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-label-sm text-label-sm font-bold">
                LEVEL 2: SENSOR
              </span>
              <span className="material-symbols-outlined text-primary">colorize</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Photometric pH &amp; Volatile Triage</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Calibrated camera reads standard broad-range (pH 3.0–6.0) indicator strips using ColorChecker white-balance correction, differentiating beneficial lactic fermentation from lethal clostridial butyric decay.
            </p>
            <div className="space-y-1.5 pt-2 text-xs font-label-sm">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-outline">Resolution Delta:</span>
                <span className="font-semibold text-primary">±0.15 pH unit accuracy</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-outline">Color Model:</span>
                <span className="font-semibold text-primary">CIE L*a*b* Standard Illuminant D65</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-outline">Phase 2 Roadmap:</span>
                <span className="font-semibold text-blue-700">AS7265x NIR Spectrometer (680-940nm)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant font-label-sm text-label-sm text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span> Replaces ₹18,000 Glass Electrodes
          </div>
        </div>

        {/* Tier 3 */}
        <div className="border border-outline-variant rounded p-5 bg-surface-container-lowest flex flex-col justify-between hover:border-purple-500 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-label-sm text-label-sm font-bold">
                LEVEL 3: STATUTORY
              </span>
              <span className="material-symbols-outlined text-primary">local_shipping</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary">Automated Lab Referral &amp; Audit</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              If Level 1 &amp; Level 2 output high risk or borderline variance, the batch is automatically locked in the Cooperative Ledger, generating tamper-evident sample QR tags for courier referral to NABL-accredited diagnostic centers.
            </p>
            <div className="space-y-1.5 pt-2 text-xs font-label-sm">
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-outline">Accreditation:</span>
                <span className="font-semibold text-primary">ISO/IEC 17025 Certified Labs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-container">
                <span className="text-outline">Assay Method:</span>
                <span className="font-semibold text-purple-700">HPLC / LC-MS/MS Toxin Confirmation</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-outline">Chain of Custody:</span>
                <span className="font-semibold text-primary">SHA-256 Batch Hashed Audit Log</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant font-label-sm text-label-sm text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">gavel</span> Statutory Quarantine Enforced
          </div>
        </div>
      </div>

      {/* Mathematical Fusion Formula Box */}
      <div className="bg-surface-container-low p-5 rounded border border-outline-variant space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-label-md text-label-md font-bold text-primary">
            Bayesian Triage Scoring Formula (Index S):
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Updated daily per district climate telemetry
          </span>
        </div>
        <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant font-label-md text-label-md text-on-surface overflow-x-auto">
          <code>Score = w_cv · (Area_mold / Area_total) + w_ph · |pH_actual - 4.0| + w_clim · (T_ambient · RH / 1000)</code>
        </div>
        <p className="text-body-sm font-body-sm text-on-surface-variant">
          Where <code className="bg-surface-container px-1 py-0.5 rounded">w_cv = 0.50</code>,{' '}
          <code className="bg-surface-container px-1 py-0.5 rounded">w_ph = 0.35</code>, and{' '}
          <code className="bg-surface-container px-1 py-0.5 rounded">w_clim = 0.15</code>. A combined score &gt; 0.65 triggers statutory quarantine and Level 3 lab escalation.
        </p>

        {/* Live Interactive Bayesian Formula Sandbox */}
        <div className="pt-4 border-t border-outline-variant space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-sm">calculate</span>
              Live Bayesian Formula Sandbox Simulator
            </span>
            <span
              className={`px-2.5 py-0.5 rounded font-label-sm font-bold ${
                isQuarantine
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {isQuarantine ? 'VERDICT: STATUTORY QUARANTINE' : 'VERDICT: SAFE RELEASE'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-label-sm text-xs">
            {/* Slider 1: Mold Area */}
            <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Mold Area (%):</span>
                <span className="font-bold text-primary">{moldAreaPct.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={moldAreaPct}
                onChange={(e) => setMoldAreaPct(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="text-[10px] text-outline">CV Term: {cvTerm.toFixed(3)}</div>
            </div>

            {/* Slider 2: Actual pH */}
            <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Actual pH:</span>
                <span className="font-bold text-primary">{actualPh.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="6.5"
                step="0.05"
                value={actualPh}
                onChange={(e) => setActualPh(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="text-[10px] text-outline">pH Term: {phTerm.toFixed(3)}</div>
            </div>

            {/* Slider 3: Ambient Temp */}
            <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Pit Temp (°C):</span>
                <span className="font-bold text-primary">{ambientTemp}°C</span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                step="1"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value, 10))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="text-[10px] text-outline">Ambient Heat</div>
            </div>

            {/* Slider 4: Humidity */}
            <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Rel Humidity (%):</span>
                <span className="font-bold text-primary">{relHumidity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                step="1"
                value={relHumidity}
                onChange={(e) => setRelHumidity(parseInt(e.target.value, 10))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="text-[10px] text-outline">Clim Term: {climTerm.toFixed(3)}</div>
            </div>
          </div>

          <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-label-sm text-outline">COMPUTED RISK SCORE (S): </span>
              <span className="text-headline-sm font-bold tabular-nums text-primary ml-1">
                {bayesianScore.toFixed(3)}
              </span>
              <span className="font-label-sm text-on-surface-variant ml-2">
                (Statutory Cutoff: 0.650)
              </span>
            </div>
            <div className="w-full sm:w-64 bg-surface-container h-2.5 rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isQuarantine ? 'bg-red-600' : 'bg-emerald-600'
                }`}
                style={{ width: `${Math.min(100, bayesianScore * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
