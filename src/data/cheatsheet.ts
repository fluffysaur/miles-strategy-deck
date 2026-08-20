import { CheatsheetRow } from '../types';

export const CHEATSHEET_DATA: CheatsheetRow[] = [
  {
    category: 'Mobile Contactless',
    icon: 'Smartphone',
    iconColor: '#6366f1',
    primaryCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi Rewards (Amaze)',
    backupCardId: 'citi-rewards',
    mpd: 4.0,
    monthlyCap: 'S$600 (Shared/Card)',
    rounding: 'S$5.00 blocks',
    strategyNotes: 'Tap phone via Apple/Google Pay in retail stores. Never tap physical card. Avoid SMART$ stores.',
    categoryGroup: 'everyday'
  },
  {
    category: 'Public Transport',
    icon: 'Bus',
    iconColor: '#f59e0b',
    primaryCard: 'UOB PPV (SimplyGo)',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'KrisFlyer UOB',
    backupCardId: 'krisflyer-uob',
    mpd: 4.0,
    monthlyCap: 'S$600 (Shared)',
    rounding: 'S$5 agg.',
    strategyNotes: 'Monthly bus & MRT fares are aggregated before applying the S$5 rounding block.',
    categoryGroup: 'everyday'
  },
  {
    category: 'Restaurants & Fine Dining',
    icon: 'Utensils',
    iconColor: '#ec4899',
    primaryCard: "UOB Lady's / HSBC Revo",
    cardId: 'uob-ladys',
    primaryCards: [
      { name: "UOB Lady's", cardId: 'uob-ladys' },
      { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
    ],
    backupCard: 'KrisFlyer UOB (3.0 MPD)',
    backupCardId: 'krisflyer-uob',
    mpd: 4.0,
    monthlyCap: 'S$1,000 / mo',
    rounding: 'S$5 / S$1',
    strategyNotes: "Use UOB Lady's for dining category. HSBC Revo as alternative online dining card.",
    categoryGroup: 'dining'
  },
  {
    category: 'Cafes & Fast Food',
    icon: 'Coffee',
    iconColor: '#14b8a6',
    primaryCard: 'UOB PPV / Lady\'s',
    cardId: 'uob-preferred-platinum-visa',
    primaryCards: [
      { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
      { name: "UOB Lady's", cardId: 'uob-ladys' }
    ],
    backupCard: 'Citi Rewards',
    backupCardId: 'citi-rewards',
    mpd: 4.0,
    monthlyCap: 'S$600 / S$1,000',
    rounding: 'S$5.00 blocks',
    strategyNotes: 'Mobile contactless tap at cashier. Ensure total meets $5 threshold for rounding.',
    categoryGroup: 'dining'
  },
  {
    category: 'Online Shopping (Shopee, Lazada)',
    icon: 'ShoppingBag',
    iconColor: '#0284c7',
    primaryCard: 'Citi Rewards',
    cardId: 'citi-rewards',
    backupCard: 'UOB PPV',
    backupCardId: 'uob-preferred-platinum-visa',
    mpd: 4.0,
    monthlyCap: 'S$1,000 / mo',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'Direct card checkout online. Fine S$1 rounding captures max miles on every dollar.',
    categoryGroup: 'online'
  },
  {
    category: 'Food Delivery (GrabFood, Foodpanda)',
    icon: 'Bike',
    iconColor: '#10b981',
    primaryCard: 'Citi Rewards',
    cardId: 'citi-rewards',
    backupCard: "UOB PPV / UOB Lady's",
    backupCardId: 'uob-preferred-platinum-visa',
    mpd: 4.0,
    monthlyCap: 'S$1,000 / mo',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'Save Citi Rewards in app wallet. S$1 rounding gives maximum miles on smaller delivery orders.',
    categoryGroup: 'online'
  },
  {
    category: 'Airlines & Flight Bookings',
    icon: 'Plane',
    iconColor: '#3b82f6',
    primaryCard: 'HSBC Revo / KF UOB',
    cardId: 'hsbc-revolution',
    primaryCards: [
      { name: 'HSBC Revo', cardId: 'hsbc-revolution' },
      { name: 'KrisFlyer UOB', cardId: 'krisflyer-uob' }
    ],
    backupCard: 'SC Journey / Citi PM',
    backupCardId: 'sc-journey',
    mpd: 4.0,
    monthlyCap: 'S$1,000 (Revo)',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'HSBC Revo for flights up to S$1,000. KF UOB for SQ/Scoot flights uncapped 3.0 MPD.',
    categoryGroup: 'travel'
  },
  {
    category: 'Hotels (Agoda, Expedia, Direct)',
    icon: 'Building2',
    iconColor: '#8b5cf6',
    primaryCard: 'HSBC Revo',
    cardId: 'hsbc-revolution',
    backupCard: 'Citi Rewards (Amaze)',
    backupCardId: 'citi-rewards',
    mpd: 4.0,
    monthlyCap: 'S$1,000 / mo',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'Book online hotels via HSBC Revo. Stack HeyMax portal for bonus Max Miles.',
    categoryGroup: 'travel'
  },
  {
    category: 'Groceries (NTUC FairPrice, Sheng Siong)',
    icon: 'ShoppingCart',
    iconColor: '#10b981',
    primaryCard: 'UOB PPV (Mobile Pay)',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi PM (1.2 MPD)',
    backupCardId: 'citi-premiermiles',
    mpd: 4.0,
    monthlyCap: 'S$600 (Shared)',
    rounding: 'S$5.00 blocks',
    strategyNotes: 'Tap phone at FairPrice/Sheng Siong. Check total spend is multiple of $5.',
    categoryGroup: 'everyday'
  },
  {
    category: 'General / Catch-All / Large Bills',
    icon: 'CreditCard',
    iconColor: '#64748b',
    primaryCard: 'Citi PremierMiles',
    cardId: 'citi-premiermiles',
    backupCard: 'SC Journey',
    backupCardId: 'sc-journey',
    mpd: 1.2,
    monthlyCap: 'Uncapped',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'Use when all 4.0 MPD caps are exhausted or for single transactions exceeding caps.',
    categoryGroup: 'general'
  },
  {
    category: 'Offline Foreign Currency (Overseas)',
    icon: 'Globe',
    iconColor: '#0ea5e9',
    primaryCard: 'Citi Rewards + Amaze',
    cardId: 'citi-rewards',
    backupCard: 'SC Journey (3.0 MPD)',
    backupCardId: 'sc-journey',
    mpd: 4.0,
    monthlyCap: 'S$1,000 / mo',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'Amaze converts offline foreign spend to online spend for Citi Rewards = 4.0 MPD + 0% bank FX!',
    categoryGroup: 'travel'
  },
  {
    category: 'SMART$ Merchants (Giant, Cold Storage, Shell)',
    icon: 'AlertTriangle',
    iconColor: '#ef4444',
    primaryCard: 'Citi Rewards / Citi PM',
    cardId: 'citi-rewards',
    primaryCards: [
      { name: 'Citi Rewards', cardId: 'citi-rewards' },
      { name: 'Citi PM', cardId: 'citi-premiermiles' }
    ],
    backupCard: 'Citi PremierMiles',
    backupCardId: 'citi-premiermiles',
    mpd: 1.2,
    monthlyCap: 'Uncapped',
    rounding: 'S$1.00 blocks',
    strategyNotes: 'NEVER use UOB cards here! SMART$ overrides UNI$ earning completely. Use Citi or SC.',
    categoryGroup: 'exclusions'
  }
];
