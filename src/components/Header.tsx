import React from 'react';
import { TabId, UserRole, Language } from '../types';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  role,
  onRoleChange,
  language,
  onLanguageChange,
  onOpenNotifications,
}) => {
  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'tab-overview', label: '1. Overview', icon: 'dashboard' },
    { id: 'tab-arch', label: '2. 3-Tier Architecture', icon: 'account_tree' },
    { id: 'tab-scan', label: '3. Live Scan Triage', icon: 'center_focus_strong' },
    { id: 'tab-diagnostic', label: '4. Fusion Diagnostics', icon: 'analytics' },
    { id: 'tab-history', label: '5. Silage Trend Monitor', icon: 'history' },
    { id: 'tab-coop', label: '6. Regional Dashboard', icon: 'grid_view' },
    { id: 'tab-passport', label: '7. Batch Passport', icon: 'verified' },
    { id: 'tab-referral', label: '8. Lab Referral & Quarantine', icon: 'local_shipping' },
    { id: 'tab-honesty', label: '9. Honesty Matrix', icon: 'security' },
    { id: 'tab-tam', label: '10. TAM/SAM/SOM', icon: 'trending_up' },
    { id: 'tab-team', label: '11. SIH Team', icon: 'groups' },
    { id: 'tab-audit', label: '12. Audit & Sources', icon: 'fact_check' },
  ];

  return (
    <>
      {/* STATUTORY SCREENING BANNER */}
      <aside
        aria-label="Statutory Screening Notice"
        className="w-full bg-amber-500 text-slate-950 px-4 py-1.5 flex items-center justify-between border-b border-amber-600 font-label-md text-label-md shrink-0"
      >
        <div className="flex items-center gap-2 mx-auto text-xs sm:text-sm">
          <span className="material-symbols-outlined text-base">warning</span>
          <span className="font-bold tracking-tight">SIMULATED DEMO DATA — SCREENING SYSTEM ONLY.</span>
          <span className="hidden sm:inline">
            NOT A REPLACEMENT FOR LABORATORY TESTING. STATUTORY AGRICULTURAL SCREENING PROTOCOL ISO/IEC 17025 FIELD PRE-SORT.
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="hidden md:inline bg-amber-600 text-slate-950 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
            SIH 2026 EVAL
          </span>
        </div>
      </aside>

      {/* WEB HEADER */}
      <header className="w-full px-4 sm:px-6 flex justify-between items-center h-16 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onTabChange('tab-overview')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-primary-fixed shrink-0">
              <span className="material-symbols-outlined">biotech</span>
            </div>
            <div>
              <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">
                FEEDGUARD AI
              </span>
              <span className="hidden lg:inline-block ml-2 px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                v2.4 SIH-2026
              </span>
            </div>
          </button>

          <span className="hidden xl:inline border-l border-outline-variant pl-3 font-label-sm text-label-sm text-on-surface-variant">
            Silage &amp; Cattle Feed Triage Matrix
          </span>
        </div>

        {/* Active Role & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher */}
          <div className="flex items-center bg-surface-container-low rounded border border-outline-variant p-0.5 text-label-sm font-label-sm">
            <label className="sr-only" htmlFor="role-select">
              Select Role
            </label>
            <select
              className="bg-transparent border-0 py-1 pl-2 pr-6 text-on-surface font-label-sm text-label-sm focus:ring-0 cursor-pointer"
              id="role-select"
              value={role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
            >
              <option value="coop">Role: Cooperative Admin</option>
              <option value="vet">Role: Veterinary Officer</option>
              <option value="farmer">Role: Progressive Dairy Farmer</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest text-label-sm font-label-sm overflow-hidden">
            <button
              className={`px-2 py-1 font-semibold transition-colors ${
                language === 'en' ? 'text-primary bg-secondary-container' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
              onClick={() => onLanguageChange('en')}
            >
              EN
            </button>
            <button
              className={`px-2 py-1 transition-colors ${
                language === 'hi' ? 'text-primary bg-secondary-container font-semibold' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
              onClick={() => onLanguageChange('hi')}
            >
              हिंदी
            </button>
            <button
              className={`px-2 py-1 transition-colors ${
                language === 'mr' ? 'text-primary bg-secondary-container font-semibold' : 'hover:bg-surface-container text-on-surface-variant'
              }`}
              onClick={() => onLanguageChange('mr')}
            >
              मराठी
            </button>
          </div>

          {/* Icon Actions */}
          <div className="hidden sm:flex items-center gap-1 border-l border-outline-variant pl-3">
            <button
              className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded transition-colors duration-150"
              title="Notifications"
              onClick={onOpenNotifications}
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded transition-colors duration-150"
              onClick={() => onTabChange('tab-honesty')}
              title="Methodology Reference"
            >
              <span className="material-symbols-outlined">science</span>
            </button>
          </div>

          {/* Primary Action CTA */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-container text-white rounded font-body-md text-sm font-medium hover:bg-secondary active:scale-[0.98] transition-all duration-100 shadow-sm"
            onClick={() => onTabChange('tab-scan')}
          >
            <span className="material-symbols-outlined text-base">run_circle</span>
            <span>Run Assay</span>
          </button>
        </div>
      </header>

      {/* HORIZONTAL SUB-NAVIGATOR (All 12 Modules / Tabs) */}
      <nav
        aria-label="Module Navigation"
        className="w-full bg-surface-container-lowest border-b border-outline-variant px-4 sm:px-6 overflow-x-auto sticky top-16 z-30 shadow-xs"
      >
        <div className="flex items-center space-x-6 min-w-max h-11 text-body-sm font-body-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 pb-1 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'border-b-2 border-primary text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
