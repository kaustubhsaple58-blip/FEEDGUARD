import React, { useState } from 'react';
import { HistoricalLot } from '../types';
import { INITIAL_HISTORICAL_LOTS } from '../data/mockData';

export const TrendMonitorTab: React.FC = () => {
  const [lots, setLots] = useState<HistoricalLot[]>(INITIAL_HISTORICAL_LOTS);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDayIndex, setActiveDayIndex] = useState<number>(14);

  // 30 days curve simulation data points
  const daysData = [
    { day: 1, ph: 6.2, temp: 24, phase: 'Day 1: Aerobic Phase / Cellular Respiration' },
    { day: 3, ph: 5.6, temp: 31, phase: 'Day 3: Anaerobic Transition' },
    { day: 7, ph: 4.8, temp: 35, phase: 'Day 7: Fermentation Phase II (Enterobacteria)' },
    { day: 10, ph: 4.3, temp: 32, phase: 'Day 10: Lactic Acid Bacteria Proliferation' },
    { day: 14, ph: 4.1, temp: 27, phase: 'Day 14: Lactic Peak Phase (pH Stabilization)' },
    { day: 21, ph: 4.0, temp: 25, phase: 'Day 21: Anaerobic Plateau / Storage Stability' },
    { day: 30, ph: 4.0, temp: 24, phase: 'Day 30: Mature Silage (Fully Sealed)' },
  ];

  const handleDownloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Timestamp,Batch_ID,Silage_Type,pH,Moisture_Pct,Visual_Triage,Status\n' +
      lots
        .map(
          (l) =>
            `${l.timestamp},${l.batchCode},"${l.silageType}",${l.ph},${l.moisture},"${l.visualTriage}",${l.status}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'feedguard_telemetry_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLots = lots.filter((lot) => {
    const matchesType = selectedType === 'ALL' || lot.silageType.toLowerCase().includes(selectedType.toLowerCase());
    const matchesSearch =
      lot.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.silageType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.visualTriage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
            Longitudinal Telemetry
          </span>
          <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            Silage Pit Fermentation Trend Monitor
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Track 30-day pH maturation curves, temperature spikes, and lot stability across pit archives.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 bg-primary-container text-white rounded font-label-sm text-label-sm font-medium hover:bg-secondary flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            onClick={handleDownloadCSV}
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export Longitudinal Data (.CSV)
          </button>
        </div>
      </div>

      {/* Trend Graph with SVG curves & interactive hover inspection */}
      <div className="border border-outline-variant rounded p-5 bg-surface-container-low space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-label-md text-label-md font-bold text-primary">
              Pit #04 Fermentation Curve (Day 1 to Day 30)
            </span>
            <div className="text-xs font-label-sm text-on-surface-variant mt-0.5">
              Click any point to inspect day milestone telemetry
            </div>
          </div>
          <div className="flex items-center gap-4 font-label-sm text-label-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-emerald-700"></span> pH Level (Target: 3.8-4.2)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-amber-600 border-b border-dashed"></span> Core Temp (°C)
            </span>
          </div>
        </div>

        {/* Responsive chart canvas */}
        <div className="h-52 w-full relative flex items-end bg-surface-container-lowest p-2 rounded border border-outline-variant">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 150">
            {/* Grid lines */}
            <line stroke="#c1c8c2" strokeDasharray="3" strokeWidth="0.5" x1="0" x2="500" y1="20" y2="20" />
            <line stroke="#c1c8c2" strokeDasharray="3" strokeWidth="0.5" x1="0" x2="500" y1="65" y2="65" />
            <line stroke="#c1c8c2" strokeDasharray="3" strokeWidth="0.5" x1="0" x2="500" y1="110" y2="110" />

            {/* pH Curve (Dropping from 6.2 to 4.0 and leveling) */}
            <path
              d="M 10,25 Q 80,75 160,110 T 320,118 T 490,118"
              fill="none"
              stroke="#15803d"
              strokeWidth="3"
            />

            {/* Temperature Curve (Spikes then cools to ambient) */}
            <path
              d="M 10,105 Q 70,25 150,50 T 320,85 T 490,92"
              fill="none"
              stroke="#d97706"
              strokeDasharray="4"
              strokeWidth="2"
            />

            {/* Interactive Milestone Anchor Dots */}
            {daysData.map((d, i) => {
              const xPos = 10 + i * 80;
              // Approximate y positions on svg
              const yPh = i === 0 ? 25 : i === 1 ? 55 : i === 2 ? 85 : i === 3 ? 105 : 115;
              const isSelected = activeDayIndex === d.day;
              return (
                <g key={d.day} className="cursor-pointer" onClick={() => setActiveDayIndex(d.day)}>
                  <circle
                    cx={xPos}
                    cy={yPh}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#15803d' : '#86af99'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Milestone info banner */}
        {(() => {
          const milestone = daysData.find((d) => d.day === activeDayIndex) || daysData[4];
          return (
            <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-label-sm text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="font-bold text-primary">{milestone.phase}</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface-variant tabular-nums">
                <span>
                  Observed pH: <strong className="text-emerald-700">{milestone.ph.toFixed(2)}</strong>
                </span>
                <span>
                  Pit Core Temp: <strong className="text-amber-700">{milestone.temp}°C</strong>
                </span>
              </div>
            </div>
          );
        })()}

        <div className="flex justify-between font-label-sm text-label-sm text-outline px-1">
          <span>Day 1 (Ensilage)</span>
          <span>Day 7 (Phase II)</span>
          <span>Day 14 (Lactic Acid Peak)</span>
          <span>Day 21 (Anaerobic Plateau)</span>
          <span>Day 30 (Mature Silage)</span>
        </div>
      </div>

      {/* Historical Lot Records Table Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-label-md text-sm font-bold text-primary">Historical Silage Registry</span>
            <span className="text-xs font-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
              {filteredLots.length} Lots
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search batch or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2.5 py-1 text-xs border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2 py-1 text-xs border border-outline-variant rounded bg-surface-container-lowest focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Feed Types</option>
              <option value="Corn">Corn Silage</option>
              <option value="Napier">Napier Grass</option>
              <option value="Sorghum">Sorghum (Jowar)</option>
              <option value="Sugar Beet">Sugar Beet</option>
            </select>
          </div>
        </div>

        {/* Historical Lot Records Table */}
        <div className="overflow-x-auto border border-outline-variant rounded">
          <table className="w-full text-left font-body-sm text-body-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant font-label-md text-label-sm uppercase tracking-wider text-on-surface-variant">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Batch Code</th>
                <th className="p-3">Silage Type</th>
                <th className="p-3">pH</th>
                <th className="p-3">Moisture</th>
                <th className="p-3">Visual Triage</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-label-md text-label-sm">
              {filteredLots.map((lot) => (
                <tr key={lot.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3">{lot.timestamp}</td>
                  <td className="p-3 font-semibold text-primary">{lot.batchCode}</td>
                  <td className="p-3">{lot.silageType}</td>
                  <td
                    className={`p-3 tabular-nums font-semibold ${
                      lot.ph <= 4.2
                        ? 'text-emerald-700'
                        : lot.ph <= 4.8
                        ? 'text-amber-700'
                        : 'text-red-700'
                    }`}
                  >
                    {lot.ph.toFixed(2)}
                  </td>
                  <td className="p-3 tabular-nums">{lot.moisture}</td>
                  <td className="p-3">{lot.visualTriage}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        lot.status === 'RELEASED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lot.status === 'WARNING'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {lot.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
