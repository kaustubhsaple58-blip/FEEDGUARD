import React, { useState } from 'react';
import { TabId, UserRole, Language } from './types';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { ArchitectureTab } from './components/ArchitectureTab';
import { LiveScanTab } from './components/LiveScanTab';
import { DiagnosticsTab } from './components/DiagnosticsTab';
import { TrendMonitorTab } from './components/TrendMonitorTab';
import { RegionalDashboardTab } from './components/RegionalDashboardTab';
import { BatchPassportTab } from './components/BatchPassportTab';
import { LabReferralTab } from './components/LabReferralTab';
import { HonestyMatrixTab } from './components/HonestyMatrixTab';
import { TamSamSomTab } from './components/TamSamSomTab';
import { TeamTab } from './components/TeamTab';
import { AuditTab } from './components/AuditTab';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('tab-overview');
  const [role, setRole] = useState<UserRole>('coop');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedScanSample, setSelectedScanSample] = useState<'A' | 'B' | null>('A');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [roleToast, setRoleToast] = useState<string | null>(null);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    let msg = '';
    if (newRole === 'farmer') {
      msg = 'Switched to Progressive Dairy Farmer View: Simplified safety indicators & actionable localized advisories enabled.';
    } else if (newRole === 'vet') {
      msg = 'Switched to Veterinary Officer View: Full toxicology triage parameter overrides & lab dispatch enabled.';
    } else {
      msg = 'Switched to Cooperative Admin View: Regional risk maps, bulk lot ledger & quarantine authorizations enabled.';
    }
    setRoleToast(msg);
    setTimeout(() => setRoleToast(null), 4000);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    let msg = '';
    if (lang === 'hi') {
      msg = 'हिंदी भाषा मोड: फीडगार्ड एआई - सिलेज एवं चारा सुरक्षा जांच प्रणाली (सक्रिय)';
    } else if (lang === 'mr') {
      msg = 'मराठी भाषा मोड: फीडगार्ड एआय - जनावरांच्या सायलेज व खाद्याची गुणवत्ता तपासणी प्रणाली (सक्रिय)';
    } else {
      msg = 'English Language Mode Active.';
    }
    setRoleToast(msg);
    setTimeout(() => setRoleToast(null), 3000);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Banner, Navigation & Subnav */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        role={role}
        onRoleChange={handleRoleChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Role / Language Context Advisory Toast */}
      {roleToast && (
        <div className="fixed bottom-6 right-6 max-w-md bg-primary-container text-white p-4 rounded shadow-2xl z-50 border border-secondary-container flex items-start gap-3 transition-all animate-bounce">
          <span className="material-symbols-outlined text-secondary-container shrink-0 mt-0.5">info</span>
          <div className="text-xs font-medium leading-relaxed">{roleToast}</div>
          <button
            onClick={() => setRoleToast(null)}
            className="text-white/70 hover:text-white cursor-pointer ml-auto"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* MAIN DYNAMIC CONTENT CANVAS */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'tab-overview' && (
          <OverviewTab
            onNavigate={handleTabChange}
            onSelectSample={(s) => setSelectedScanSample(s)}
          />
        )}

        {activeTab === 'tab-arch' && <ArchitectureTab />}

        {activeTab === 'tab-scan' && (
          <LiveScanTab
            initialSample={selectedScanSample}
            onNavigate={handleTabChange}
          />
        )}

        {activeTab === 'tab-diagnostic' && <DiagnosticsTab />}

        {activeTab === 'tab-history' && <TrendMonitorTab />}

        {activeTab === 'tab-coop' && <RegionalDashboardTab />}

        {activeTab === 'tab-passport' && <BatchPassportTab />}

        {activeTab === 'tab-referral' && <LabReferralTab />}

        {activeTab === 'tab-honesty' && <HonestyMatrixTab />}

        {activeTab === 'tab-tam' && <TamSamSomTab />}

        {activeTab === 'tab-team' && <TeamTab />}

        {activeTab === 'tab-audit' && <AuditTab />}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleTabChange} />

      {/* Notifications Drawer / Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <h3 className="font-headline-sm text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">notifications</span>
                System Notifications &amp; Alerts
              </h3>
              <button
                className="text-on-surface-variant hover:text-primary cursor-pointer"
                onClick={() => setShowNotifications(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2.5 font-label-sm text-xs">
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-950 space-y-1">
                <div className="font-bold flex items-center justify-between">
                  <span>CRITICAL QUARANTINE ESCALATION</span>
                  <span className="text-[10px] text-red-700">12 min ago</span>
                </div>
                <p className="text-on-surface-variant">
                  Lot #SAN-LOT-1029 locked at Sangli Hub due to clostridial pH 5.82 spike. Dispatched to MAFSU laboratory.
                </p>
              </div>

              <div className="p-3 rounded bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                <div className="font-bold flex items-center justify-between">
                  <span>SECONDARY AEROBIC WARNING</span>
                  <span className="text-[10px] text-amber-700">1 hr ago</span>
                </div>
                <p className="text-on-surface-variant">
                  Karad Rural reports average pit face temperature 34°C. Fast feed-out advisory broadcasted to 18 farmers.
                </p>
              </div>

              <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                <div className="font-bold flex items-center justify-between">
                  <span>LOT AUTHORIZATION ISSUED</span>
                  <span className="text-[10px] text-emerald-700">2 hrs ago</span>
                </div>
                <p className="text-on-surface-variant">
                  Batch #PUN-LOT-4412 passed Level 1 &amp; Level 2 triage. QR Passport generated for Shivaji Agro FPO.
                </p>
              </div>
            </div>

            <button
              className="w-full py-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant text-primary rounded font-label-sm font-semibold cursor-pointer"
              onClick={() => setShowNotifications(false)}
            >
              Dismiss Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
