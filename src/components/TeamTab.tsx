import React from 'react';

export const TeamTab: React.FC = () => {
  const members = [
    {
      initials: 'AK',
      name: 'Aarav Kulkarni',
      role: 'Team Lead & ML Architect',
      desc: 'YOLOv8 Edge Quantization, TFLite Pipeline & Bayesian Triage Engine.',
    },
    {
      initials: 'SP',
      name: 'Sneha Patil',
      role: 'Bio-Chemistry & Calibration',
      desc: 'CIE L*a*b* Colorimeter Calibration, Silage pH Standards & Flieg Scoring.',
    },
    {
      initials: 'RD',
      name: 'Rohan Deshmukh',
      role: 'Full Stack & Ledger Systems',
      desc: 'Batch QR Passport generation, Offline sync & Cooperative Dashboard.',
    },
    {
      initials: 'AP',
      name: 'Ananya Pawar',
      role: 'Hardware & Sensor Telemetry',
      desc: 'AS7265x NIR sensor prototyping & Silage Pit thermistor integration.',
    },
    {
      initials: 'TM',
      name: 'Tanmay More',
      role: 'Veterinary Protocol Liaison',
      desc: 'FSSAI Aflatoxin compliance, ISO 17025 lab escalation protocols.',
    },
    {
      initials: 'PZ',
      name: 'Pooja Zaware',
      role: 'Field Validation & UI/UX',
      desc: 'Multilingual farmer terminal UX (Marathi/Hindi), WCAG 2.1 compliance.',
    },
  ];

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div className="border-b border-outline-variant pb-4">
        <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
          Smart India Hackathon 2026
        </span>
        <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
          Team FEEDGUARD AI — Project Roster
        </h2>
        <p className="text-body-sm font-body-sm text-on-surface-variant font-label-md mt-1">
          INSTITUTE: Pune Institute of Computer Technology (PICT) • PS ID: SIH-26-AGRI-048
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-body-sm text-body-sm">
        {members.map((m) => (
          <div
            key={m.name}
            className="p-4 rounded border border-outline-variant bg-surface-container-lowest space-y-2 hover:border-secondary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded bg-primary-container text-white flex items-center justify-center font-bold">
              {m.initials}
            </div>
            <div className="font-bold text-primary font-headline-sm text-headline-sm">{m.name}</div>
            <div className="text-secondary font-label-sm text-label-sm font-semibold">{m.role}</div>
            <p className="text-on-surface-variant text-xs">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-surface-container-low rounded border border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-label-sm text-label-sm">
        <div>
          <span className="font-semibold text-primary">Faculty Mentor:</span> Prof. S. V. Gaikwad (Head, Agri-AI Research Lab, PICT)
        </div>
        <span className="text-emerald-700 font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-base">verified</span>
          Verified Institutional Endorsement
        </span>
      </div>
    </div>
  );
};
