import React, { useState } from 'react';

export const BatchPassportTab: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const simulateVerification = () => {
    setIsVerifying(true);
    setVerificationResult(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult('CRYPTOGRAPHICALLY VALIDATED • LEDGER BLOCK #849201 • ZERO CONTAMINATION RISK');
    }, 800);
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
            Immutable Provenance
          </span>
          <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            Batch Quality Passport #FG-2026-08942
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant font-label-md mt-1 break-all">
            CRYPTOGRAPHIC HASH: 9f8a3c8e4125b2a09c214d0234a9b... [SHA-256]
          </p>
        </div>
        <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-label-md text-label-md font-bold self-start">
          VERIFIED SECURE LOT
        </span>
      </div>

      {/* Passport Body: Two Columns (Credentials & QR Code) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 font-body-sm text-body-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-label-sm text-label-sm">
            <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
              <span className="text-outline uppercase text-[10px]">Producing Farmer / FPO</span>
              <div className="font-bold text-primary mt-0.5">Shivaji Agro FPO (Baramati)</div>
              <div className="text-on-surface-variant text-[11px]">Member ID: MH-PUN-FPO-881</div>
            </div>

            <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
              <span className="text-outline uppercase text-[10px]">Triage Officer</span>
              <div className="font-bold text-primary mt-0.5">Dr. R. Kulkarni (B.V.Sc)</div>
              <div className="text-on-surface-variant text-[11px]">Cert ID: VET-MAH-2021-094</div>
            </div>

            <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
              <span className="text-outline uppercase text-[10px]">Moisture &amp; pH Level</span>
              <div className="font-bold text-primary mt-0.5">67.4% Moisture | pH 4.12</div>
              <div className="text-emerald-700 text-[11px]">Optimal Anaerobic Stability</div>
            </div>

            <div className="p-3 bg-surface-container-low rounded border border-outline-variant">
              <span className="text-outline uppercase text-[10px]">Statutory Safe Life</span>
              <div className="font-bold text-primary mt-0.5">14 Days Post-Opening</div>
              <div className="text-on-surface-variant text-[11px]">Store under sealed polythene</div>
            </div>
          </div>

          <div className="p-4 bg-surface-container-low rounded border border-outline-variant space-y-2">
            <span className="font-label-md text-label-md font-bold text-primary">
              Federation Milk Procurement Warranty
            </span>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              This lot conforms to Level-1 (CV hyphae check &lt;1%) and Level-2 (Calibrated pH &lt; 4.2). Silage certified free of clostridial putrefaction at the time of unsealing. Approved for cooperative bulk chilling center feeding networks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              className="px-4 py-2 bg-primary-container text-white rounded font-label-sm font-semibold hover:bg-secondary transition-colors cursor-pointer flex items-center gap-1.5"
              onClick={simulateVerification}
              disabled={isVerifying}
            >
              <span className="material-symbols-outlined text-sm">verified_user</span>
              {isVerifying ? 'Authenticating Ledger...' : 'Authenticate Proof of Triage'}
            </button>
            <button
              className="px-3 py-2 border border-outline-variant bg-surface-container-low hover:bg-surface-container text-primary rounded font-label-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print Field Dispatch Tag
            </button>
          </div>

          {verificationResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-950 font-label-sm text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-base">check_circle</span>
              <span className="font-semibold">{verificationResult}</span>
            </div>
          )}
        </div>

        {/* QR Verification Graphic */}
        <div className="border border-outline-variant rounded p-5 bg-surface-container-low flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-44 h-44 bg-white p-3 rounded border border-slate-300 flex items-center justify-center shadow-inner">
            {/* High-Fidelity SVG QR Representation */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <rect fill="white" height="100" width="100" />
              {/* Corner 1 */}
              <rect fill="#012d1d" height="30" width="30" x="5" y="5" />
              <rect fill="white" height="20" width="20" x="10" y="10" />
              <rect fill="#012d1d" height="10" width="10" x="15" y="15" />
              {/* Corner 2 */}
              <rect fill="#012d1d" height="30" width="30" x="65" y="5" />
              <rect fill="white" height="20" width="20" x="70" y="10" />
              <rect fill="#012d1d" height="10" width="10" x="75" y="15" />
              {/* Corner 3 */}
              <rect fill="#012d1d" height="30" width="30" x="5" y="65" />
              <rect fill="white" height="20" width="20" x="10" y="70" />
              <rect fill="#012d1d" height="10" width="10" x="15" y="75" />
              {/* Data Blocks Mock */}
              <rect fill="#012d1d" height="6" width="6" x="42" y="10" />
              <rect fill="#012d1d" height="6" width="6" x="52" y="10" />
              <rect fill="#012d1d" height="6" width="6" x="42" y="24" />
              <rect fill="#012d1d" height="6" width="6" x="52" y="24" />
              <rect fill="#012d1d" height="16" width="16" x="42" y="42" />
              <rect fill="#012d1d" height="6" width="6" x="65" y="45" />
              <rect fill="#012d1d" height="6" width="6" x="75" y="55" />
              <rect fill="#012d1d" height="6" width="6" x="85" y="45" />
              <rect fill="#012d1d" height="8" width="8" x="45" y="70" />
              <rect fill="#012d1d" height="8" width="8" x="65" y="70" />
              <rect fill="#012d1d" height="10" width="10" x="80" y="80" />
            </svg>
          </div>
          <div className="font-label-sm text-label-sm">
            <div className="font-bold text-primary">Scan via Cooperative Handheld</div>
            <div className="text-outline text-[11px]">Instant Village Gate Verification</div>
          </div>
        </div>
      </div>
    </div>
  );
};
