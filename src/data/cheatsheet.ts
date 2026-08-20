import { CheatsheetRow, LadysCategory } from '../types';

export const getCheatsheetData = (category: LadysCategory = 'travel'): CheatsheetRow[] => {
  const isTravel = category === 'travel';
  const isDining = category === 'dining';
  const isFashion = category === 'fashion';
  const isBeauty = category === 'beauty';
  const isFamily = category === 'family';
  const isTransport = category === 'transport';
  const isEntertainment = category === 'entertainment';

  const rows: CheatsheetRow[] = [
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
      primaryCard: isTransport ? "UOB PPV / Lady's (SimplyGo)" : 'UOB PPV (SimplyGo)',
      cardId: 'uob-preferred-platinum-visa',
      primaryCards: isTransport
        ? [
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
            { name: "UOB Lady's", cardId: 'uob-ladys' }
          ]
        : undefined,
      backupCard: 'KrisFlyer UOB',
      backupCardId: 'krisflyer-uob',
      mpd: 4.0,
      monthlyCap: isTransport ? 'S$600 (PPV) / S$1,000 (Lady\'s)' : 'S$600 (Shared)',
      rounding: 'S$5 agg.',
      strategyNotes: isTransport
        ? "UOB Lady's (Transport category) & UOB PPV both earn 4.0 MPD on SimplyGo. Monthly fares aggregated before rounding."
        : 'Monthly bus & MRT fares are aggregated before applying the S$5 rounding block.',
      categoryGroup: 'everyday'
    },
    {
      category: 'Restaurants & Fine Dining',
      icon: 'Utensils',
      iconColor: '#ec4899',
      primaryCard: isDining ? "UOB Lady's / HSBC Revo" : 'UOB PPV / HSBC Revo',
      cardId: isDining ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      primaryCards: isDining
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ]
        : [
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ],
      backupCard: 'KrisFlyer UOB (3.0 MPD)',
      backupCardId: 'krisflyer-uob',
      mpd: 4.0,
      monthlyCap: isDining ? 'S$1,000 / mo' : 'S$600 (PPV) / S$1,000 (Revo)',
      rounding: isDining ? 'S$5 / S$1' : 'S$5 / S$1',
      strategyNotes: isDining
        ? "Use UOB Lady's for dining category (4.0 MPD up to S$1,000). HSBC Revo as alternative online dining card."
        : "Tap phone via UOB PPV for 4.0 MPD (up to S$1,200 Bobo & Bubba cap). HSBC Revo for online dining. KF UOB for uncapped 3.0 MPD. (Lady's card set to Travel).",
      categoryGroup: 'dining'
    },
    {
      category: 'Cafes & Fast Food',
      icon: 'Coffee',
      iconColor: '#14b8a6',
      primaryCard: isDining ? "UOB PPV / Lady's" : 'UOB PPV',
      cardId: 'uob-preferred-platinum-visa',
      primaryCards: isDining
        ? [
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
            { name: "UOB Lady's", cardId: 'uob-ladys' }
          ]
        : undefined,
      backupCard: 'Citi Rewards',
      backupCardId: 'citi-rewards',
      mpd: 4.0,
      monthlyCap: isDining ? 'S$600 / S$1,000' : 'S$600 (Shared/Card)',
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
      backupCard: isDining ? "UOB PPV / UOB Lady's" : 'UOB PPV',
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
      primaryCard: isTravel ? "UOB Lady's / HSBC Revo" : 'HSBC Revo / KF UOB',
      cardId: isTravel ? 'uob-ladys' : 'hsbc-revolution',
      primaryCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ]
        : [
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' },
            { name: 'KrisFlyer UOB', cardId: 'krisflyer-uob' }
          ],
      backupCard: isTravel ? 'KrisFlyer UOB (3.0 MPD uncapped) / SC Journey' : 'SC Journey / Citi PM',
      backupCardId: isTravel ? 'krisflyer-uob' : 'sc-journey',
      mpd: 4.0,
      monthlyCap: isTravel ? 'S$1,000 each ($2,000 combined)' : 'S$1,000 (Revo)',
      rounding: 'S$1.00 / S$5.00',
      strategyNotes: isTravel
        ? "UOB Lady's (Travel category) and HSBC Revo both earn 4.0 MPD up to S$1,000 cap each ($2,000/mo travel capacity!). KF UOB for uncapped SQ/Scoot."
        : 'HSBC Revo for flights up to S$1,000. KF UOB for SQ/Scoot flights uncapped 3.0 MPD.',
      categoryGroup: 'travel'
    },
    {
      category: 'Hotels (Agoda, Expedia, Direct)',
      icon: 'Building2',
      iconColor: '#8b5cf6',
      primaryCard: isTravel ? "UOB Lady's / HSBC Revo" : 'HSBC Revo',
      cardId: isTravel ? 'uob-ladys' : 'hsbc-revolution',
      primaryCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ]
        : undefined,
      backupCard: 'Citi Rewards (Amaze)',
      backupCardId: 'citi-rewards',
      mpd: 4.0,
      monthlyCap: isTravel ? 'S$1,000 each ($2,000 combined)' : 'S$1,000 / mo',
      rounding: 'S$1.00 / S$5.00',
      strategyNotes: isTravel
        ? "Book online hotels via UOB Lady's (Travel category) or HSBC Revo (4.0 MPD up to S$1,000 cap each). Stack HeyMax portal for extra Max Miles!"
        : 'Book online hotels via HSBC Revo. Stack HeyMax portal for bonus Max Miles.',
      categoryGroup: 'travel'
    },
    {
      category: 'Travel Activities (Klook, KKday, Trip.com)',
      icon: 'Globe',
      iconColor: '#0ea5e9',
      primaryCard: isTravel ? "UOB Lady's / HSBC Revo / Citi Rewards" : 'Citi Rewards / HSBC Revo',
      cardId: isTravel ? 'uob-ladys' : 'citi-rewards',
      primaryCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' },
            { name: 'Citi Rewards', cardId: 'citi-rewards' }
          ]
        : [
            { name: 'Citi Rewards', cardId: 'citi-rewards' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ],
      backupCard: 'SC Journey (3.0 MPD)',
      backupCardId: 'sc-journey',
      mpd: 4.0,
      monthlyCap: 'S$1,000 / mo per card',
      rounding: 'S$1.00 / S$5.00',
      strategyNotes: isTravel
        ? "4.0 MPD on Klook/Trip.com using UOB Lady's (Travel), HSBC Revo, or Citi Rewards. Stack HeyMax for Max Miles."
        : 'Book via Citi Rewards or HSBC Revo for 4.0 MPD. Stack HeyMax portal for Max Miles.',
      categoryGroup: 'travel'
    },
    {
      category: 'Retail Fashion & Dept Stores (Uniqlo, Zara)',
      icon: 'ShoppingBag',
      iconColor: '#ec4899',
      primaryCard: isFashion ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isFashion ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      primaryCards: isFashion
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'Citi Rewards (Online)',
      backupCardId: 'citi-rewards',
      mpd: 4.0,
      monthlyCap: isFashion ? 'S$1,000 (Lady\'s) / S$600 (PPV)' : 'S$600 (Shared)',
      rounding: 'S$5.00 blocks',
      strategyNotes: isFashion
        ? "UOB Lady's (Fashion category) earns 4.0 MPD up to S$1,000 cap! UOB PPV mobile tap as secondary."
        : 'Tap mobile phone (Apple Pay / Google Pay) for 4.0 MPD. Citi Rewards for online fashion checkouts.',
      categoryGroup: 'everyday'
    },
    {
      category: 'Groceries (NTUC FairPrice, Sheng Siong)',
      icon: 'ShoppingCart',
      iconColor: '#10b981',
      primaryCard: isFamily ? "UOB Lady's / UOB PPV" : 'UOB PPV (Mobile Pay)',
      cardId: isFamily ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      primaryCards: isFamily
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'Citi PM (1.2 MPD)',
      backupCardId: 'citi-premiermiles',
      mpd: 4.0,
      monthlyCap: isFamily ? 'S$1,000 (Lady\'s) / S$600 (PPV)' : 'S$600 (Shared)',
      rounding: 'S$5.00 blocks',
      strategyNotes: isFamily
        ? "UOB Lady's (Family category) earns 4.0 MPD at supermarkets up to S$1,000 cap! Or tap phone via UOB PPV."
        : 'Tap phone at FairPrice/Sheng Siong. Check total spend is multiple of $5.',
      categoryGroup: 'everyday'
    },
    {
      category: 'Pharmacy & Wellness (Watsons, Spas)',
      icon: 'Sparkles',
      iconColor: '#06b6d4',
      primaryCard: isBeauty ? "UOB Lady's / UOB PPV" : 'UOB PPV / Citi Rewards',
      cardId: isBeauty ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      primaryCards: isBeauty
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : [
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
            { name: 'Citi Rewards', cardId: 'citi-rewards' }
          ],
      backupCard: 'Citi Rewards',
      backupCardId: 'citi-rewards',
      mpd: 4.0,
      monthlyCap: isBeauty ? 'S$1,000 (Lady\'s) / S$600 (PPV)' : 'S$600 / S$1,000',
      rounding: 'S$5.00 / S$1.00',
      strategyNotes: isBeauty
        ? "UOB Lady's (Beauty & Wellness category) earns 4.0 MPD at Watsons & salons up to S$1,000 cap!"
        : 'Watsons: UOB PPV mobile tap (4.0). Guardian: Citi Rewards online (avoid offline SMART$).',
      categoryGroup: 'everyday'
    },
    {
      category: 'Entertainment (Cinemas, SISTIC, Clubs)',
      icon: 'CreditCard',
      iconColor: '#8b5cf6',
      primaryCard: isEntertainment ? "UOB Lady's / UOB PPV" : 'UOB PPV / Citi Rewards',
      cardId: isEntertainment ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      primaryCards: isEntertainment
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : [
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
            { name: 'Citi Rewards', cardId: 'citi-rewards' }
          ],
      backupCard: 'Citi Rewards',
      backupCardId: 'citi-rewards',
      mpd: 4.0,
      monthlyCap: isEntertainment ? 'S$1,000 (Lady\'s) / S$600 (PPV)' : 'S$600 / S$1,000',
      rounding: 'S$5.00 / S$1.00',
      strategyNotes: isEntertainment
        ? "UOB Lady's (Entertainment category) earns 4.0 MPD on cinema tickets, concerts & clubs up to S$1,000/mo."
        : 'UOB PPV mobile tap at cinema counters or Citi Rewards for online ticket purchases (4.0 MPD).',
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

  return rows;
};

export const CHEATSHEET_DATA: CheatsheetRow[] = getCheatsheetData('travel');
