import React from 'react';

export const HonestyMatrixTab: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded border border-outline-variant space-y-6">
      <div>
        <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
          Strict Scientific Integrity
        </span>
        <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
          The FEEDGUARD AI Honesty Matrix
        </h2>
        <p className="text-body-sm font-body-sm text-on-surface-variant max-w-3xl mt-1">
          Many AI pitch decks falsely claim that smartphone cameras can detect parts-per-billion chemical toxins. We explicitly demarcate physical optical limits versus certified laboratory science.
        </p>
      </div>

      {/* Honesty Comparison Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What We Detect */}
        <div className="p-5 rounded border border-emerald-300 bg-emerald-50/50 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-headline-sm font-headline-sm">
            <span className="material-symbols-outlined text-emerald-700">check_circle</span>
            What FEEDGUARD AI Accurately Triages
          </div>
          <ul className="space-y-2.5 font-body-sm text-body-sm text-emerald-950">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5 shrink-0">done</span>
              <span>
                <strong>Surface Fungal Bloom &amp; Mold Hyphae:</strong> Macroscopic identification of <em>Mucor</em>, <em>Penicillium</em>, and <em>Aspergillus</em> surface colonization via computer vision (88.4% mAP).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5 shrink-0">done</span>
              <span>
                <strong>Calibrated pH Acid Profile:</strong> Photometric CIE L*a*b* reading distinguishing lactic acid (&lt;4.2) from putrefactive butyric acid (&gt;5.0).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5 shrink-0">done</span>
              <span>
                <strong>Physical Aerobic Spoilage:</strong> Visual detection of heat damage, black caramelization, compaction defects, and leaf-vein deterioration.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-base mt-0.5 shrink-0">done</span>
              <span>
                <strong>Micro-Climate Hazard Prediction:</strong> Bayesian risk weighting based on ambient pit humidity and rain exposure.
              </span>
            </li>
          </ul>
        </div>

        {/* What We NEVER Detect (The Honest Boundary) */}
        <div className="p-5 rounded border border-red-300 bg-red-50/50 space-y-3">
          <div className="flex items-center gap-2 text-red-900 font-headline-sm font-headline-sm">
            <span className="material-symbols-outlined text-red-700">cancel</span>
            What An Optical Camera CANNOT Detect
          </div>
          <ul className="space-y-2.5 font-body-sm text-body-sm text-red-950">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-700 text-base mt-0.5 shrink-0">block</span>
              <span>
                <strong>Aflatoxin B1/M1 Molecules Directly:</strong> Chemical toxins are invisible in the visual spectrum at parts-per-billion (&lt;20 ppb). Anyone claiming pure-camera toxin detection is scientifically fraudulent.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-700 text-base mt-0.5 shrink-0">block</span>
              <span>
                <strong>Urea / Nitrogen Adulteration:</strong> Chemical feed adulterants require laboratory Kjeldahl titration or NIR spectrometry.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-700 text-base mt-0.5 shrink-0">block</span>
              <span>
                <strong>Heavy Metals (Lead, Arsenic, Cadmium):</strong> Requires Atomic Absorption Spectroscopy (AAS) or ICP-MS wet chemistry.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-700 text-base mt-0.5 shrink-0">block</span>
              <span>
                <strong>Official Quarantine Condemnation:</strong> FEEDGUARD AI triggers precautionary quarantine; formal destruction requires NABL test proof.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Research Reference Citations */}
      <div className="bg-surface-container-low p-5 rounded border border-outline-variant font-label-sm text-label-sm space-y-3">
        <div className="font-bold text-primary text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-base">library_books</span>
          Key Research Papers &amp; Datasets Grounding FEEDGUARD AI:
        </div>
        <ol className="list-decimal pl-5 space-y-1.5 text-on-surface-variant text-xs leading-relaxed">
          <li>
            Kung, L. et al. (2018). <em>Silage review: Interpretation of chemical, microbial, and organoleptic characteristics of silage.</em> Journal of Dairy Science, 101(5), 4020-4033.
          </li>
          <li>
            ICAR-Indian Grassland and Fodder Research Institute (IGFRI). <em>Vision 2050: Strategy for National Forage Deficit Mitigation.</em> Jhansi, UP.
          </li>
          <li>
            Food Safety and Standards Authority of India (FSSAI). <em>Operational Manual on Analysis of Foods: Mycotoxins in Milk and Feed Commodities (2021).</em>
          </li>
          <li>
            Agri-Silage-QA v1.2 Benchmark: 4,200 curated field specimens annotated across Western Maharashtra and Punjab dairy cooperatives.
          </li>
        </ol>
      </div>
    </div>
  );
};
