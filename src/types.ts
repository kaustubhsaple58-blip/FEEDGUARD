export type TabId =
  | 'tab-overview'
  | 'tab-arch'
  | 'tab-scan'
  | 'tab-diagnostic'
  | 'tab-history'
  | 'tab-coop'
  | 'tab-passport'
  | 'tab-referral'
  | 'tab-honesty'
  | 'tab-tam'
  | 'tab-team'
  | 'tab-audit';

export type UserRole = 'coop' | 'vet' | 'farmer';
export type Language = 'en' | 'hi' | 'mr';

export interface SpecimenTelemetry {
  id: string;
  name: string;
  type: string;
  ph: number;
  moldPct: number;
  moisturePct: number;
  acidQuality: string;
  riskProbability: number;
  verdict: 'PASS' | 'WARNING' | 'QUARANTINE';
  verdictLabel: string;
  verdictDescription: string;
  ambientTemp: number;
  fliegScore: number;
}

export interface HistoricalLot {
  id: string;
  timestamp: string;
  batchCode: string;
  silageType: string;
  ph: number;
  moisture: string;
  visualTriage: string;
  status: 'RELEASED' | 'WARNING' | 'QUARANTINED';
}

export interface ReferralCase {
  id: string;
  referralId: string;
  suspectedToxin: string;
  destinationFacility: string;
  lockStatus: 'LOT LOCKED' | 'FEEDING PAUSED' | 'RESOLVED (CLEARED)';
  transitStatus: string;
  tat: string;
  date: string;
  ph: number;
}

export interface RegionalHub {
  id: string;
  name: string;
  district: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  scansToday: number;
  quarantines: number;
  avgPh: number;
  statusNote: string;
  xPct: number;
  yPct: number;
}
