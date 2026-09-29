import React from 'react';
import { TabId } from '../types';

interface FooterProps {
  onNavigate: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-8 px-4 sm:px-8 border-t border-outline-variant bg-surface-container-lowest max-w-7xl mx-auto flex flex-col gap-4 mt-12 font-body-sm text-body-sm shrink-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">
            FEEDGUARD AI
          </span>
          <span className="text-xs text-on-surface-variant font-label-md">
            • Smart India Hackathon 2026 Flagship System
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-label-sm text-label-sm text-on-surface-variant">
          <button
            className="hover:text-primary transition-colors cursor-pointer"
            onClick={() => onNavigate('tab-audit')}
          >
            ICAR Compliance Reference
          </button>
          <button
            className="hover:text-primary transition-colors cursor-pointer"
            onClick={() => onNavigate('tab-arch')}
          >
            Assay Methodology (NIR/Bio-Toxin)
          </button>
          <button
            className="hover:text-primary transition-colors cursor-pointer"
            onClick={() => onNavigate('tab-honesty')}
          >
            Statutory Agricultural Disclaimer
          </button>
          <button
            className="hover:text-primary transition-colors cursor-pointer"
            onClick={() => onNavigate('tab-team')}
          >
            Research &amp; Validation Whitepaper
          </button>
        </div>
      </div>
      <div className="pt-4 border-t border-outline-variant text-xs text-on-surface-variant font-label-sm flex flex-col md:flex-row justify-between gap-2">
        <p>
          © 2025-2026 FEEDGUARD AI Diagnostic Systems. Statutory Agricultural Screening Protocol ISO/IEC 17025 Compliant. Field Triage Only - Certified Veterinary Lab Verification Required for Official Lot Quarantine.
        </p>
        <div className="text-outline tabular-nums shrink-0">BUILD: SIH-26-PROD-REL-094</div>
      </div>
    </footer>
  );
};
