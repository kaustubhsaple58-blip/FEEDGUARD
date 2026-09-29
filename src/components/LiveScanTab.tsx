import React, { useState, useRef, useEffect } from 'react';
import { TabId } from '../types';

interface LiveScanTabProps {
  initialSample?: 'A' | 'B' | null;
  onNavigate: (tab: TabId) => void;
}

export const LiveScanTab: React.FC<LiveScanTabProps> = ({ initialSample, onNavigate }) => {
  const [selectedSample, setSelectedSample] = useState<'A' | 'B' | 'custom' | null>(initialSample || 'A');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanLaserPos, setScanLaserPos] = useState<number>(0);
  const [customImage, setCustomImage] = useState<string | null>(null);

  // Telemetry & Sensor States
  const [phValue, setPhValue] = useState<number>(4.1);
  const [moldPct, setMoldPct] = useState<number>(0.4);
  const [acidQuality, setAcidQuality] = useState<string>('Lactic Acid Dominant (>75%)');
  const [riskProb, setRiskProb] = useState<number>(4.2);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize when initialSample changes from parent
  useEffect(() => {
    if (initialSample) {
      applyPreset(initialSample);
    }
  }, [initialSample]);

  const applyPreset = (type: 'A' | 'B') => {
    setSelectedSample(type);
    setCustomImage(null);
    if (type === 'A') {
      setPhValue(4.1);
      setMoldPct(0.4);
      setAcidQuality('Lactic Acid Dominant (>75%)');
      setRiskProb(4.2);
    } else {
      setPhValue(5.8);
      setMoldPct(28.6);
      setAcidQuality('Butyric / Putrefactive (>40%)');
      setRiskProb(89.4);
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
        setSelectedSample('custom');
        setPhValue(4.4);
        setMoldPct(3.8);
        setAcidQuality('Mixed Lactic/Acetic (60%)');
        setRiskProb(14.5);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLaserScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanLaserPos(0);

    let pos = 0;
    const interval = setInterval(() => {
      pos += 3;
      if (pos >= 100) {
        clearInterval(interval);
        setIsScanning(false);
      } else {
        setScanLaserPos(pos);
      }
    }, 20);
  };

  const handlePhSliderChange = (newVal: number) => {
    setPhValue(newVal);
    // Dynamically adjust inferred risk based on pH
    if (newVal <= 4.2) {
      setAcidQuality('Lactic Acid Dominant (>75%)');
      setRiskProb(Math.max(2.0, (newVal - 3.8) * 10));
    } else if (newVal > 4.2 && newVal <= 4.8) {
      setAcidQuality('Acetic / Secondary Deterioration');
      setRiskProb(Math.min(45.0, 15 + (newVal - 4.2) * 45));
    } else {
      setAcidQuality('Butyric / Putrefactive (>40%)');
      setRiskProb(Math.min(96.0, 55 + (newVal - 4.8) * 30));
    }
  };

  const resetViewport = () => {
    setSelectedSample(null);
    setCustomImage(null);
    setPhValue(4.1);
    setMoldPct(0.0);
    setRiskProb(0.0);
  };

  // Determine Triage Category
  const isQuarantine = phValue > 5.0 || moldPct > 15 || riskProb > 65;
  const isWarning = !isQuarantine && (phValue > 4.3 || moldPct > 5 || riskProb > 25);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Diagnostic Camera Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded border border-outline-variant p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant pb-3 gap-2">
            <div>
              <h2 className="text-headline-sm font-headline-sm text-primary">
                Optical Silage &amp; Specimen Triage Terminal
              </h2>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Simulated optical sensor pipeline calibrated to 1080p macroscopic depth
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-bold ${
                  selectedSample === 'A'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedSample === 'B'
                    ? 'bg-red-100 text-red-800'
                    : selectedSample === 'custom'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {selectedSample === 'A'
                  ? 'Loaded: Specimen A (Clean)'
                  : selectedSample === 'B'
                  ? 'Loaded: Specimen B (Spoiled)'
                  : selectedSample === 'custom'
                  ? 'Loaded: Custom Specimen'
                  : 'Idle'}
              </span>
            </div>
          </div>

          {/* Prepared Scenario Fast Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-label-sm font-label-sm">
            <span className="self-center font-semibold text-on-surface-variant">PRESET SPECIMENS:</span>
            <button
              className={`px-3 py-1.5 rounded border text-primary font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                selectedSample === 'A'
                  ? 'bg-emerald-50 border-emerald-600 font-bold'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant'
              }`}
              onClick={() => applyPreset('A')}
            >
              <span className="material-symbols-outlined text-sm text-emerald-700">check_circle</span>
              Sample A: High-Grade Corn Silage (pH 4.1)
            </button>

            <button
              className={`px-3 py-1.5 rounded border text-primary font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                selectedSample === 'B'
                  ? 'bg-red-50 border-red-600 font-bold'
                  : 'bg-surface-container-low hover:bg-surface-container border-outline-variant'
              }`}
              onClick={() => applyPreset('B')}
            >
              <span className="material-symbols-outlined text-sm text-red-600">warning</span>
              Sample B: Spoilage &amp; Mycotoxin Hazard (pH 5.8)
            </button>

            <button
              className="px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container border border-outline-variant text-on-surface font-medium flex items-center gap-1 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Upload Custom Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCustomUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Camera Screen / Viewport Simulation */}
          <div
            className="relative w-full h-80 sm:h-96 rounded bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center select-none"
            id="camera-viewport"
          >
            {/* Grid Reticle Calibration Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Technical HUD Corner Markers */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400 pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400 pointer-events-none"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none"></div>

            {/* Sensor Telemetry Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded text-white font-label-sm text-[11px] space-y-0.5 pointer-events-none z-10 border border-white/10">
              <div>FPS: 29.8 | EXPOSURE: 1/120s</div>
              <div>SPECTRAL CHANNEL: RGB-D OPTICAL</div>
              <div
                className={`font-bold ${
                  selectedSample === 'B'
                    ? 'text-red-400'
                    : selectedSample === 'A'
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }`}
              >
                {selectedSample === 'A'
                  ? 'SAMPLE A: HIGH-GRADE CORN SILAGE'
                  : selectedSample === 'B'
                  ? 'SAMPLE B: MYCOTOXIN HAZARD DETECTED'
                  : selectedSample === 'custom'
                  ? 'CUSTOM SPECIMEN: EVALUATING'
                  : 'READY TO SCAN'}
              </div>
            </div>

            {/* DYNAMIC VISUAL CONTENT INSIDE SIMULATOR */}
            {!selectedSample && (
              <div className="text-center text-slate-400 p-6">
                <span className="material-symbols-outlined text-5xl mb-2 text-slate-500">filter_center_focus</span>
                <p className="text-body-md text-sm">Select Sample A / B above, or capture specimen image</p>
                <p className="text-xs font-label-sm text-slate-500 mt-1">
                  Calibrated for green forage, maize silage, and compound cattle cake
                </p>
              </div>
            )}

            {/* SIMULATED SAMPLE A (Good) */}
            {selectedSample === 'A' && (
              <div className="absolute inset-0 w-full h-full bg-[#3d4218] flex items-center justify-center">
                <div className="w-full h-full opacity-70 bg-[radial-gradient(#858e38_2px,transparent_2px)] [background-size:16px_16px] flex items-center justify-center">
                  <div className="text-center text-white/90 p-4 bg-black/50 backdrop-blur-xs rounded border border-white/10">
                    <div className="font-label-lg font-bold text-emerald-300">BENEFICIAL LACTIC SILAGE</div>
                    <div className="text-xs font-label-md mt-1">Golden-Olive Coloration • Uniform Lactic Compaction</div>
                  </div>
                </div>
                {/* Green Safety Reticle */}
                <div className="absolute inset-16 border-2 border-dashed border-emerald-400/70 rounded pointer-events-none flex items-start justify-end p-2">
                  <span className="bg-emerald-600 text-white font-label-sm px-1.5 py-0.5 rounded text-[10px] shadow-sm">
                    CV NORMAL: 98.4% CONF
                  </span>
                </div>
              </div>
            )}

            {/* SIMULATED SAMPLE B (Bad / Mold) */}
            {selectedSample === 'B' && (
              <div className="absolute inset-0 w-full h-full bg-[#27261a] flex items-center justify-center">
                <div className="w-full h-full bg-[radial-gradient(#5a5e3e_2px,transparent_2px)] [background-size:16px_16px] relative overflow-hidden">
                  {/* White Mucor Clusters */}
                  <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/70 rounded-full blur-md animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-amber-100/60 rounded-full blur-md"></div>
                  {/* Dark Putrefaction Spot */}
                  <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-black/85 rounded-full blur-sm"></div>

                  {/* Bounding Box 1 */}
                  <div className="absolute top-16 left-24 border-2 border-red-500 rounded p-1 shadow-lg bg-red-950/20">
                    <span className="bg-red-600 text-white font-label-sm text-[10px] px-1 py-0.5 rounded">
                      Penicillium / Mucor Hyphae (94.2%)
                    </span>
                  </div>
                  {/* Bounding Box 2 */}
                  <div className="absolute bottom-14 right-16 border-2 border-amber-500 rounded p-1 shadow-lg bg-amber-950/20">
                    <span className="bg-amber-600 text-white font-label-sm text-[10px] px-1 py-0.5 rounded">
                      Clostridial Putrefaction (89.1%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Uploaded Image */}
            {selectedSample === 'custom' && customImage && (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                <img src={customImage} alt="User Specimen" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-12 border-2 border-dashed border-blue-400/80 rounded pointer-events-none p-2 flex justify-between items-start">
                  <span className="bg-blue-600 text-white font-label-sm px-1.5 py-0.5 rounded text-[10px]">
                    ANALYZING USER SPECIMEN
                  </span>
                </div>
              </div>
            )}

            {/* Inference Scanning Line Animation */}
            {isScanning && (
              <div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_16px_#34d399] z-20 transition-all pointer-events-none"
                style={{ top: `${scanLaserPos}%` }}
              ></div>
            )}
          </div>

          {/* Hardware Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 bg-primary-container text-white rounded font-body-md font-medium hover:bg-secondary flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                onClick={triggerLaserScan}
                disabled={isScanning}
              >
                <span className="material-symbols-outlined">play_arrow</span>
                {isScanning ? 'Inference in Progress...' : 'Run CV Diagnostic Inference'}
              </button>
              <button
                className="px-3 py-2 border border-outline-variant bg-surface-container-lowest text-on-surface rounded font-body-md font-medium hover:bg-surface-container flex items-center gap-1 transition-colors cursor-pointer"
                onClick={resetViewport}
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                Reset
              </button>
            </div>
            <div className="text-xs font-label-sm text-outline">
              Simulated Edge Device: Raspberry Pi 5 / Android Cortex-A76
            </div>
          </div>
        </div>

        {/* Right: Real-time Telemetry & Photometric Strip Input (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Chemical pH Strip Reader Module */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">colorize</span>
                Level 2 Photometric Strip Reader
              </span>
              <span
                className={`font-label-sm text-label-sm px-2 py-0.5 rounded font-bold ${
                  phValue <= 4.2
                    ? 'bg-emerald-100 text-emerald-800'
                    : phValue <= 4.8
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {phValue <= 4.2
                  ? 'Stable Lactic'
                  : phValue <= 4.8
                  ? 'Warning Decay'
                  : 'Hazardous Butyric'}
              </span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Align sample test strip with reference CIE L*a*b* standard pad.
            </p>

            {/* Interactive pH Slider Simulator */}
            <div className="space-y-2">
              <div className="flex justify-between font-label-sm text-label-sm">
                <span>Observed pH Level:</span>
                <span
                  className={`font-bold ${
                    phValue <= 4.2
                      ? 'text-emerald-700'
                      : phValue <= 4.8
                      ? 'text-amber-700'
                      : 'text-red-700'
                  }`}
                >
                  pH {phValue.toFixed(2)}{' '}
                  {phValue <= 4.2
                    ? '(Optimum Fermentation)'
                    : phValue <= 4.8
                    ? '(Secondary Decay)'
                    : '(Clostridial Putrefaction)'}
                </span>
              </div>
              <input
                className="w-full accent-primary cursor-pointer"
                id="ph-slider"
                max="7.0"
                min="3.0"
                step="0.1"
                type="range"
                value={phValue}
                onChange={(e) => handlePhSliderChange(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-label-sm text-outline">
                <span className="text-emerald-700 font-semibold">3.8 - 4.2 (Lactic Optimum)</span>
                <span className="text-amber-600 font-semibold">4.5 - 5.0 (Aerobic Decay)</span>
                <span className="text-red-600 font-semibold">5.5+ (Clostridial Putrefaction)</span>
              </div>
            </div>

            {/* Color Swatch Indicator */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-label-sm">
              <div
                className={`p-2 rounded bg-amber-400 text-amber-950 border border-amber-500 font-semibold transition-all cursor-pointer ${
                  phValue <= 3.8 ? 'ring-2 ring-primary scale-105' : 'opacity-85'
                }`}
                onClick={() => handlePhSliderChange(3.6)}
              >
                pH 3.5
              </div>
              <div
                className={`p-2 rounded bg-lime-400 text-lime-950 border border-lime-500 font-semibold transition-all cursor-pointer ${
                  phValue > 3.8 && phValue <= 4.2 ? 'ring-2 ring-primary scale-105' : 'opacity-85'
                }`}
                onClick={() => handlePhSliderChange(4.1)}
              >
                pH 4.0
              </div>
              <div
                className={`p-2 rounded bg-emerald-500 text-white border border-emerald-600 font-semibold transition-all cursor-pointer ${
                  phValue > 4.2 && phValue <= 5.0 ? 'ring-2 ring-primary scale-105' : 'opacity-85'
                }`}
                onClick={() => handlePhSliderChange(4.6)}
              >
                pH 4.5
              </div>
              <div
                className={`p-2 rounded bg-teal-700 text-white border border-teal-800 font-semibold transition-all cursor-pointer ${
                  phValue > 5.0 ? 'ring-2 ring-primary scale-105' : 'opacity-85'
                }`}
                onClick={() => handlePhSliderChange(5.8)}
              >
                pH 5.5+
              </div>
            </div>
          </div>

          {/* Quality Scoring Panel */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-5 space-y-4">
            <h3 className="font-label-md text-label-md font-bold text-primary flex items-center justify-between">
              <span>Dynamic Triage Verdict</span>
              <span
                className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-bold border ${
                  isQuarantine
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : isWarning
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                {isQuarantine
                  ? 'HAZARD: QUARANTINE'
                  : isWarning
                  ? 'WARNING: MONITOR CLOSELY'
                  : 'PASS: SAFE FEED'}
              </span>
            </h3>

            {/* Metric Progress Bars */}
            <div className="space-y-3 font-label-sm text-label-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-on-surface-variant">Fungal Mycelium Coverage:</span>
                  <span
                    className={`font-bold ${
                      moldPct > 10 ? 'text-red-700' : 'text-primary'
                    }`}
                  >
                    {moldPct.toFixed(1)}% {moldPct <= 1.0 ? '(Nominal)' : '(Hazardous Spores)'}
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      moldPct > 10 ? 'bg-red-600' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(4, moldPct * 2.5))}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-on-surface-variant">Fermentative Acid Quality:</span>
                  <span
                    className={`font-bold ${
                      phValue <= 4.2
                        ? 'text-emerald-700'
                        : phValue <= 4.8
                        ? 'text-amber-700'
                        : 'text-red-700'
                    }`}
                  >
                    {acidQuality}
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      phValue <= 4.2
                        ? 'bg-emerald-600'
                        : phValue <= 4.8
                        ? 'bg-amber-500'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${phValue <= 4.2 ? 85 : phValue <= 4.8 ? 55 : 30}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-on-surface-variant">Est. Spoilage Probability:</span>
                  <span
                    className={`font-bold ${
                      riskProb > 50 ? 'text-red-700' : 'text-primary'
                    }`}
                  >
                    {riskProb.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      riskProb > 50 ? 'bg-red-600' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(4, riskProb))}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Contextual Statutory Action Prompt */}
            <div
              className={`p-3 rounded border text-body-sm font-body-sm flex items-start gap-2 ${
                isQuarantine
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : isWarning
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg shrink-0 ${
                  isQuarantine
                    ? 'text-red-700'
                    : isWarning
                    ? 'text-amber-700'
                    : 'text-emerald-700'
                }`}
              >
                {isQuarantine ? 'error' : isWarning ? 'warning' : 'task_alt'}
              </span>
              <div>
                {isQuarantine ? (
                  <>
                    <span className="font-semibold">Statutory Quarantine Enacted:</span> Severe secondary aerobic spoilage detected. Clostridial and Aspergillus risk. Lot locked from dairy dispatch; escalated to Tier-3 lab testing.
                  </>
                ) : isWarning ? (
                  <>
                    <span className="font-semibold">Aerobic Deterioration Warning:</span> Moderate pH elevation. Advise rapid silo face feed-out (&gt;20 cm/day) and discard top surface crust.
                  </>
                ) : (
                  <>
                    <span className="font-semibold">Lot Authorized for Feeding:</span> Excellent anaerobic fermentation observed. No secondary fungal proliferation detected. Safe for high-yielding milch cattle.
                  </>
                )}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                className="flex-1 px-3 py-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-primary rounded font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                onClick={() => onNavigate('tab-diagnostic')}
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                View Fusion Engine Matrix
              </button>
              <button
                className="flex-1 px-3 py-2 bg-primary-container text-white rounded font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer hover:bg-secondary"
                onClick={() => onNavigate('tab-passport')}
              >
                <span className="material-symbols-outlined text-sm">qr_code</span>
                Generate Passport
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
