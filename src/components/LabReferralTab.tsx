import React, { useState } from 'react';
import { INITIAL_REFERRAL_CASES } from '../data/mockData';
import { ReferralCase } from '../types';

export const LabReferralTab: React.FC = () => {
  const [cases, setCases] = useState<ReferralCase[]>(INITIAL_REFERRAL_CASES);
  const [showDispatchModal, setShowDispatchModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    suspectedToxin: 'Aflatoxin B1 & High Putrefactive Butyrate',
    destinationFacility: 'MAFSU Veterinary College Laboratory, Shirwal',
    tat: '48 Hours (HPLC Confirmation)',
    ph: 5.75,
  });

  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: ReferralCase = {
      id: Date.now().toString(),
      referralId: `#REF-2026-00${cases.length + 42}`,
      suspectedToxin: formData.suspectedToxin,
      destinationFacility: formData.destinationFacility,
      lockStatus: 'LOT LOCKED',
      transitStatus: 'Dispatched (Cold Chain Pack)',
      tat: formData.tat,
      date: new Date().toISOString().split('T')[0],
      ph: formData.ph,
    };
    setCases([newCase, ...cases]);
    setShowDispatchModal(false);
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
            Tier 3 Escalation
          </span>
          <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
            Statutory Lab Referral &amp; Quarantine Tracker
          </h2>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Active chain of custody for high-risk specimens escalated to accredited veterinary toxicology facilities.
          </p>
        </div>
        <button
          className="px-3 py-1.5 bg-primary-container text-white rounded font-label-sm text-label-sm font-medium hover:bg-secondary flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
          onClick={() => setShowDispatchModal(true)}
        >
          <span className="material-symbols-outlined text-sm">local_shipping</span>
          Escalate Lot to Accredited Lab
        </button>
      </div>

      {/* Referrals Table */}
      <div className="overflow-x-auto border border-outline-variant rounded">
        <table className="w-full text-left font-body-sm text-body-sm border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant font-label-md text-label-sm uppercase tracking-wider text-on-surface-variant">
              <th className="p-3">Referral ID</th>
              <th className="p-3">Suspected Toxin / Anomaly</th>
              <th className="p-3">Destination Facility</th>
              <th className="p-3">Lock Status</th>
              <th className="p-3">Courier Transit</th>
              <th className="p-3">TAT Expectation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-label-md text-label-sm">
            {cases.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                <td className="p-3 font-semibold text-primary">{item.referralId}</td>
                <td className="p-3 text-red-700 font-medium">{item.suspectedToxin}</td>
                <td className="p-3">{item.destinationFacility}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      item.lockStatus === 'LOT LOCKED'
                        ? 'bg-red-100 text-red-800'
                        : item.lockStatus === 'FEEDING PAUSED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.lockStatus}
                  </span>
                </td>
                <td className="p-3">
                  {item.transitStatus.includes('Completed') ? (
                    <span className="text-emerald-700 font-bold">{item.transitStatus}</span>
                  ) : (
                    item.transitStatus
                  )}
                </td>
                <td className="p-3 text-outline">{item.tat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleCreateReferral}
            className="bg-surface-container-lowest border border-outline-variant rounded p-6 max-w-lg w-full space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <h3 className="font-headline-sm text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">local_shipping</span>
                Escalate Sample to ISO 17025 Facility
              </h3>
              <button
                type="button"
                className="text-on-surface-variant hover:text-primary cursor-pointer"
                onClick={() => setShowDispatchModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-sm">
              <div>
                <label className="block font-label-sm font-semibold mb-1 text-on-surface">
                  Suspected Contaminant / Indicator
                </label>
                <input
                  type="text"
                  required
                  value={formData.suspectedToxin}
                  onChange={(e) => setFormData({ ...formData, suspectedToxin: e.target.value })}
                  className="w-full px-3 py-1.5 border border-outline-variant rounded text-xs bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-label-sm font-semibold mb-1 text-on-surface">
                  Accredited Testing Facility
                </label>
                <select
                  value={formData.destinationFacility}
                  onChange={(e) => setFormData({ ...formData, destinationFacility: e.target.value })}
                  className="w-full px-3 py-1.5 border border-outline-variant rounded text-xs bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                >
                  <option value="MAFSU Veterinary College Laboratory, Shirwal">
                    MAFSU Veterinary College Laboratory, Shirwal
                  </option>
                  <option value="ICAR-NIVEDI Central Toxicology Cell, Bengaluru">
                    ICAR-NIVEDI Central Toxicology Cell, Bengaluru
                  </option>
                  <option value="State Animal Disease Diagnostic Lab, Pune">
                    State Animal Disease Diagnostic Lab, Pune
                  </option>
                  <option value="NABL Central Forage Testing Facility, Anand">
                    NABL Central Forage Testing Facility, Anand
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm font-semibold mb-1 text-on-surface">
                    Observed Field pH
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.ph}
                    onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-outline-variant rounded text-xs bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm font-semibold mb-1 text-on-surface">
                    Target Turnaround Time
                  </label>
                  <input
                    type="text"
                    value={formData.tat}
                    onChange={(e) => setFormData({ ...formData, tat: e.target.value })}
                    className="w-full px-3 py-1.5 border border-outline-variant rounded text-xs bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                className="px-3 py-1.5 border border-outline-variant rounded text-xs font-semibold hover:bg-surface-container cursor-pointer"
                onClick={() => setShowDispatchModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary-container text-white rounded text-xs font-semibold hover:bg-secondary cursor-pointer"
              >
                Generate Referral &amp; Lock Lot
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
