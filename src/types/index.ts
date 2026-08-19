export type CardId =
  | 'citi-rewards'
  | 'citi-premiermiles'
  | 'uob-preferred-platinum-visa'
  | 'uob-ladys'
  | 'krisflyer-uob'
  | 'hsbc-revolution'
  | 'sc-journey';

export interface CardData {
  id: CardId;
  name: string;
  shortName: string;
  bank: string;
  tagline: string;
  image: string;
  mpd: string;
  mpdNumeric: number;
  monthlyCap: string;
  monthlyCapValue?: number; // per card
  capType: 'calendar_month' | 'statement_month' | 'uncapped';
  dualCap?: boolean; // Bobo & Bubba dual card holders
  rounding: string;
  roundingValue: number;
  annualFee: string;
  expiry: string;
  transferFee: string;
  transferPartners: string;
  primaryUse: string;
  signUpBonus?: string;
  loungeAccess?: string;
  perks: string[];
  catches: string[];
  milelionReviewUrl: string;
  accentColor: string;
  accentGradient: string;
}

export interface CheatsheetCardLink {
  name: string;
  cardId: CardId;
}

export interface CheatsheetRow {
  category: string;
  icon: string;
  iconColor: string;
  primaryCard: string;
  cardId: CardId;
  primaryCards?: CheatsheetCardLink[];
  backupCard?: string;
  backupCardId?: CardId;
  mpd: number;
  monthlyCap: string;
  rounding: string;
  strategyNotes: string;
  categoryGroup: 'everyday' | 'dining' | 'online' | 'travel' | 'general' | 'exclusions';
}

export interface MerchantLookup {
  name: string;
  category: string;
  bestCard: string;
  cardId: CardId;
  backupCard?: string;
  mpd: number;
  paymentMethod: string;
  notes: string;
  warning?: string;
}

export interface CapTrackingItem {
  id: string;
  name: string;
  holder: 'Bobo' | 'Bubba' | 'Joint';
  cardId: CardId;
  capAmount: number;
  currentSpend: number;
  period: string; // e.g. "Aug 2026"
}

export interface HeyMaxStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  tips: string[];
}
