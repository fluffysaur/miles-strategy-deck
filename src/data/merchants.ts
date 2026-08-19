import { MerchantLookup } from '../types';

export const MERCHANTS_DATA: MerchantLookup[] = [
  {
    name: 'Grab / GrabFood / GrabPay',
    category: 'Ride-hailing & Food Delivery',
    bestCard: 'Citi Rewards',
    cardId: 'citi-rewards',
    backupCard: 'UOB PPV',
    mpd: 4.0,
    paymentMethod: 'In-App Card Payment',
    notes: 'Online transaction earns 4.0 MPD (10X Points) with fine $1 rounding.'
  },
  {
    name: 'Shopee / ShopeePay',
    category: 'Online Shopping',
    bestCard: 'Citi Rewards',
    cardId: 'citi-rewards',
    backupCard: 'UOB PPV',
    mpd: 4.0,
    paymentMethod: 'In-App / Web Checkout',
    notes: 'Direct online checkout earns 4.0 MPD. Stack HeyMax portal for extra Max Miles!'
  },
  {
    name: 'Lazada / RedMart',
    category: 'Online Shopping & Groceries',
    bestCard: 'Citi Rewards',
    cardId: 'citi-rewards',
    backupCard: 'UOB PPV',
    mpd: 4.0,
    paymentMethod: 'Online Checkout',
    notes: 'Earns 4.0 MPD on Citi Rewards. Stack HeyMax for Max Miles vouchers.'
  },
  {
    name: 'Uniqlo / Zara / H&M / Retail Fashion',
    category: 'Physical Retail Fashion',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: "UOB Lady's (if Fashion selected)",
    mpd: 4.0,
    paymentMethod: 'Apple Pay / Google Pay Contactless',
    notes: 'Must tap mobile phone (Apple Pay / Google Pay). Spend in multiples of $5.'
  },
  {
    name: 'NTUC FairPrice / FairPrice Finest',
    category: 'Supermarket / Groceries',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi PremierMiles (1.2 MPD)',
    mpd: 4.0,
    paymentMethod: 'Apple Pay / Google Pay Mobile Contactless',
    notes: 'Tap phone at counter. Not a SMART$ store, so 4.0 MPD is fully earned.'
  },
  {
    name: 'Sheng Siong Supermarket',
    category: 'Supermarket / Groceries',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi PremierMiles',
    mpd: 4.0,
    paymentMethod: 'Apple Pay / Google Pay Mobile Contactless',
    notes: 'Mobile contactless tap earns 4.0 MPD. Check $5 rounding.'
  },
  {
    name: 'Cold Storage / CS Fresh / Jason’s Deli',
    category: 'Supermarket (SMART$ Warning)',
    bestCard: 'Citi Rewards (via Amaze / Online) / Citi PM',
    cardId: 'citi-premiermiles',
    backupCard: 'SC Journey',
    mpd: 1.2,
    paymentMethod: 'Physical Card / Apple Pay',
    notes: 'SMART$ merchant! DO NOT use UOB cards (0 UNI$). Use Citi PM (1.2 MPD) or Citi Rewards via Amaze.',
    warning: 'SMART$ merchant! UOB earns 0 UNI$.'
  },
  {
    name: 'Giant Supermarket',
    category: 'Supermarket (SMART$ Warning)',
    bestCard: 'Citi PremierMiles',
    cardId: 'citi-premiermiles',
    backupCard: 'SC Journey',
    mpd: 1.2,
    paymentMethod: 'Card Payment',
    notes: 'SMART$ merchant! Avoid UOB cards. Use Citi PM or SC Journey.',
    warning: 'SMART$ merchant! UOB earns 0 UNI$.'
  },
  {
    name: 'Guardian Pharmacy',
    category: 'Health & Beauty (SMART$ Warning)',
    bestCard: 'Citi Rewards / Citi PM',
    cardId: 'citi-rewards',
    backupCard: 'Citi PM',
    mpd: 1.2,
    paymentMethod: 'Card Payment',
    notes: 'SMART$ merchant! Avoid UOB cards. Use Citi cards.',
    warning: 'SMART$ merchant! UOB earns 0 UNI$.'
  },
  {
    name: 'Watsons',
    category: 'Health & Beauty',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi Rewards',
    mpd: 4.0,
    paymentMethod: 'Apple Pay / Google Pay',
    notes: 'Watsons is NOT SMART$, so UOB PPV mobile contactless earns full 4.0 MPD!'
  },
  {
    name: 'SimplyGo (MRT & Public Buses)',
    category: 'Public Transport',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'KrisFlyer UOB (3.0 MPD)',
    mpd: 4.0,
    paymentMethod: 'SimplyGo Mobile Tap',
    notes: 'Monthly bus & MRT fares aggregate before applying the $5 rounding block.'
  },
  {
    name: 'Singapore Airlines (Flight Booking)',
    category: 'Airlines',
    bestCard: 'KrisFlyer UOB',
    cardId: 'krisflyer-uob',
    backupCard: 'HSBC Revo (up to $1k cap)',
    mpd: 3.0,
    paymentMethod: 'Online Booking',
    notes: 'Uncapped 3.0 MPD on SQ flights + direct KrisFlyer deposit with 0 conversion fees.'
  },
  {
    name: 'Scoot (Flight Booking)',
    category: 'Airlines',
    bestCard: 'KrisFlyer UOB',
    cardId: 'krisflyer-uob',
    backupCard: 'HSBC Revo',
    mpd: 3.0,
    paymentMethod: 'Online Booking',
    notes: 'Uncapped 3.0 MPD + free Scoot seat selection & priority check-in.'
  },
  {
    name: 'Other Airlines (Cathay, ANA, Qatar, Emirates, EVA)',
    category: 'Airlines',
    bestCard: 'HSBC Revo',
    cardId: 'hsbc-revolution',
    backupCard: 'SC Journey (3.0 MPD FCY)',
    mpd: 4.0,
    paymentMethod: 'Online Booking',
    notes: 'HSBC Revo earns 4.0 MPD up to S$1,000 cap. For amounts >$1,000, split or use SC Journey.'
  },
  {
    name: 'Agoda / Booking.com / Expedia / Hotels.com',
    category: 'Hotels & Accommodation',
    bestCard: 'HSBC Revo',
    cardId: 'hsbc-revolution',
    backupCard: 'Citi Rewards + Amaze',
    mpd: 4.0,
    paymentMethod: 'Online Checkout',
    notes: 'Stack HeyMax portal for 4.0 MPD + extra Max Miles voucher cashback!'
  },
  {
    name: 'Klook / KKday / Trip.com',
    category: 'Travel & Attractions',
    bestCard: 'Citi Rewards / HSBC Revo',
    cardId: 'citi-rewards',
    backupCard: 'HSBC Revolution',
    mpd: 4.0,
    paymentMethod: 'Online Checkout',
    notes: '4.0 MPD on online travel activities. Stack HeyMax portal for bonus Max Miles.'
  },
  {
    name: 'Restaurants, Cafes & Fine Dining',
    category: 'Dining',
    bestCard: "UOB Lady's Card",
    cardId: 'uob-ladys',
    backupCard: 'UOB PPV (if mobile tap available)',
    mpd: 4.0,
    paymentMethod: 'Physical Card or Apple Pay',
    notes: "UOB Lady's (Dining category selected) earns 4.0 MPD up to S$1,000 cap."
  },
  {
    name: 'Starbucks / Coffee Bean / Toast Box',
    category: 'Cafes & Beverage',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: "UOB Lady's",
    mpd: 4.0,
    paymentMethod: 'Apple Pay / Google Pay',
    notes: 'Mobile contactless tap at cashier. Keep transaction $\\ge$ $5 for rounding.'
  },
  {
    name: 'McDonald\'s / KFC / Subway / Fast Food',
    category: 'Fast Food',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi Rewards (if mobile app order)',
    mpd: 4.0,
    paymentMethod: 'Apple Pay / In-App Ordering',
    notes: 'Mobile tap or in-app payment both earn 4.0 MPD.'
  },
  {
    name: 'Don Don Donki',
    category: 'Japanese Supermarket & Retail',
    bestCard: 'UOB PPV',
    cardId: 'uob-preferred-platinum-visa',
    backupCard: 'Citi PremierMiles',
    mpd: 4.0,
    paymentMethod: 'Apple Pay / Google Pay',
    notes: 'Mobile contactless tap earns 4.0 MPD.'
  },
  {
    name: 'Overseas In-Person Spend (Japan, Europe, USA, etc.)',
    category: 'Foreign Currency Travel',
    bestCard: 'Citi Rewards + Instarem Amaze',
    cardId: 'citi-rewards',
    backupCard: 'SC Journey (3.0 MPD direct)',
    mpd: 4.0,
    paymentMethod: 'Amaze Physical Card / Amaze Apple Pay',
    notes: 'Amaze converts foreign offline spend to online spend for Citi Rewards (4.0 MPD + 0% bank FX fee).'
  },
  {
    name: 'Taobao',
    category: 'Online Shopping',
    bestCard: 'Citi Rewards',
    cardId: 'citi-rewards',
    backupCard: 'Citi PM',
    mpd: 4.0,
    paymentMethod: 'In-App Card Checkout',
    notes: 'Direct checkout on Citi Rewards earns 4.0 MPD.'
  },
  {
    name: 'Shell / Esso / SPC Petrol',
    category: 'Petrol & Fuel (Watch SMART$)',
    bestCard: 'Citi PremierMiles / SC Journey',
    cardId: 'citi-premiermiles',
    backupCard: 'SC Journey',
    mpd: 1.2,
    paymentMethod: 'Card Payment',
    notes: 'Shell is a SMART$ merchant (avoid UOB!). For Esso/SPC, use Citi PM or SC Journey.',
    warning: 'Shell is SMART$ merchant! UOB earns 0 UNI$.'
  }
];
