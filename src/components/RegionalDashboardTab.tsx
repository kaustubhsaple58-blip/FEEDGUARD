import React, { useState } from 'react';
import { REGIONAL_HUBS } from '../data/mockData';
import { RegionalHub } from '../types';

export const RegionalDashboardTab: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<RegionalHub | null>(REGIONAL_HUBS[0]);

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
            Federation Surveillance
          </span>
          <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            Cooperative Regional Risk Matrix
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            District Federation View: Western Maharashtra Milk Union Network (Pune, Kolhapur, Sangli, Satara)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm font-semibold">
            Active Hubs: 42 Village Societies
          </span>
        </div>
      </div>

      {/* Cooperative Metrics Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-label-md text-label-sm">
        <div className="p-4 rounded border border-outline-variant bg-surface-container-lowest hover:border-emerald-600/40 transition-colors">
          <div className="text-outline uppercase text-[10px]">Triage Scans Today</div>
          <div className="text-headline-lg font-headline-lg text-primary tabular-nums">1,482</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">92.4% Safe Distribution</div>
        </div>

        <div className="p-4 rounded border border-outline-variant bg-surface-container-lowest hover:border-amber-600/40 transition-colors">
          <div className="text-outline uppercase text-[10px]">Active Quarantines</div>
          <div className="text-headline-lg font-headline-lg text-amber-700 tabular-nums">18 Lots</div>
          <div className="text-xs text-on-surface-variant mt-1">Escalated to NABL District Labs</div>
        </div>

        <div className="p-4 rounded border border-outline-variant bg-surface-container-lowest hover:border-secondary/40 transition-colors">
          <div className="text-outline uppercase text-[10px]">Estimated Cattle Protected</div>
          <div className="text-headline-lg font-headline-lg text-primary tabular-nums">28,400+</div>
          <div className="text-xs text-secondary font-semibold mt-1">Prevented Aflatoxin Carry-Over</div>
        </div>
      </div>

      {/* Geographic District Map & Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Map Visualizer */}
        <div className="lg:col-span-7 rounded border border-outline-variant p-4 bg-surface-container-low space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md font-bold text-primary">
              District Geotagged Spoilage Clusters
            </span>
            <span className="font-label-sm text-label-sm text-outline">
              Click node pins to view telemetry
            </span>
          </div>

          <div className="h-72 sm:h-80 w-full rounded bg-emerald-950/10 border border-outline-variant relative overflow-hidden flex items-center justify-center p-4 select-none">
            {/* Vector Map representation of Western Maharashtra dairy belt */}
            <svg className="w-full h-full opacity-60" viewBox="0 0 400 200">
              <path
                d="M 40,40 L 150,20 L 260,35 L 340,60 L 370,140 L 290,180 L 140,170 L 60,120 Z"
                fill="#c1ecd4"
                stroke="#2c694e"
                strokeWidth="1.5"
              />
              <line stroke="#717973" strokeDasharray="3" x1="150" x2="180" y1="20" y2="175" />
              <line stroke="#717973" strokeDasharray="3" x1="260" x2="240" y1="35" y2="178" />
            </svg>

            {/* Interactive Node Pins */}
            {REGIONAL_HUBS.map((hub) => {
              const isSelected = selectedHub?.id === hub.id;
              const isHigh = hub.riskLevel === 'HIGH';
              const isMod = hub.riskLevel === 'MODERATE';

              return (
                <div
                  key={hub.id}
                  className="absolute cursor-pointer transition-transform hover:scale-110"
                  style={{ left: `${hub.xPct}%`, top: `${hub.yPct}%` }}
                  onClick={() => setSelectedHub(hub)}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-3.5 h-3.5 rounded-full inline-block shadow-md ${
                        isHigh
                          ? 'bg-red-600 ring-4 ring-red-200 animate-pulse'
                          : isMod
                          ? 'bg-amber-500 ring-4 ring-amber-200'
                          : 'bg-emerald-600 ring-4 ring-emerald-200'
                      } ${isSelected ? 'ring-6' : ''}`}
                    ></span>
                    <span className="mt-1 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-800 shadow-sm border border-slate-200 whitespace-nowrap">
                      {hub.name.split(' ')[0]} ({hub.riskLevel})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-label-sm text-on-surface-variant pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Safe (&lt;5% Risk)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Caution (Secondary Fermentation)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Quarantine (High Fungal / pH &gt; 5.2)
            </span>
          </div>

          {/* Selected District Telemetry Sub-panel */}
          {selectedHub && (
            <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant space-y-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary font-headline-sm text-sm">
                  {selectedHub.name} ({selectedHub.district})
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedHub.riskLevel === 'HIGH'
                      ? 'bg-red-100 text-red-800'
                      : selectedHub.riskLevel === 'MODERATE'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {selectedHub.riskLevel} SURVEILLANCE TIER
                </span>
              </div>
              <p className="text-body-sm text-on-surface-variant text-xs">{selectedHub.statusNote}</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-label-sm pt-1">
                <div className="p-1.5 bg-surface-container-low rounded">
                  <span className="text-outline text-[10px] block">Today's Tests</span>
                  <strong className="text-primary">{selectedHub.scansToday}</strong>
                </div>
                <div className="p-1.5 bg-surface-container-low rounded">
                  <span className="text-outline text-[10px] block">Active Quarantines</span>
                  <strong className="text-amber-700">{selectedHub.quarantines}</strong>
                </div>
                <div className="p-1.5 bg-surface-container-low rounded">
                  <span className="text-outline text-[10px] block">District Mean pH</span>
                  <strong className="text-emerald-700">{selectedHub.avgPh.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Village Level Risk Leaderboard */}
        <div className="lg:col-span-5 border border-outline-variant rounded p-4 bg-surface-container-lowest space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md font-bold text-primary">
              Village Cooperative Risk Index
            </span>
            <span className="font-label-sm text-label-sm text-outline">Past 7 Days</span>
          </div>

          <div className="space-y-2 font-label-sm text-label-sm">
            <div className="p-2.5 rounded bg-red-50 border border-red-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-red-900">Shirol Taluka (Kolhapur)</div>
                <div className="text-[11px] text-red-700">14.2% Mold Incidence • Heavy Rain Infiltration</div>
              </div>
              <span className="px-2 py-0.5 bg-red-600 text-white rounded text-xs font-bold shrink-0">
                HIGH RISK
              </span>
            </div>

            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-900">Karad Rural (Satara)</div>
                <div className="text-[11px] text-amber-800">6.8% Borderline pH • Inadequate Compaction</div>
              </div>
              <span className="px-2 py-0.5 bg-amber-500 text-slate-900 rounded text-xs font-bold shrink-0">
                MODERATE
              </span>
            </div>

            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-emerald-900">Baramati Dairy Center (Pune)</div>
                <div className="text-[11px] text-emerald-700">1.2% Risk • Optimal Lactic Fermentation</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-bold shrink-0">
                EXCELLENT
              </span>
            </div>

            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-emerald-900">Walwa Cooperative (Sangli)</div>
                <div className="text-[11px] text-emerald-700">2.0% Risk • High Standard Ensiling</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-xs font-bold shrink-0">
                EXCELLENT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
