import { MerchantLookup, LadysCategory } from '../types';

export const getMerchantsData = (category: LadysCategory = 'travel'): MerchantLookup[] => {
  const isTravel = category === 'travel';
  const isDining = category === 'dining';
  const isFashion = category === 'fashion';
  const isBeauty = category === 'beauty';
  const isFamily = category === 'family';
  const isTransport = category === 'transport';

  const merchants: MerchantLookup[] = [
    {
      name: 'Grab / GrabFood / GrabPay',
      category: 'Ride-hailing & Food Delivery',
      bestCard: 'Citi Rewards',
      cardId: 'citi-rewards',
      backupCard: isTransport || isDining ? "UOB PPV / UOB Lady's" : 'UOB PPV',
      mpd: 4.0,
      paymentMethod: 'In-App Card Payment',
      notes: isTransport
        ? "Online checkout on Citi Rewards earns 4.0 MPD. UOB Lady's (Transport) also earns 4.0 MPD."
        : 'Online transaction earns 4.0 MPD (10X Points) with fine $1 rounding.'
    },
    {
      name: 'Foodpanda / Pandamart',
      category: 'Food Delivery & Online Groceries',
      bestCard: 'Citi Rewards',
      cardId: 'citi-rewards',
      backupCard: isDining ? "UOB PPV / UOB Lady's" : 'UOB PPV',
      mpd: 4.0,
      paymentMethod: 'In-App Card Payment',
      notes: isDining
        ? "Online food on Citi Rewards (4.0 MPD, $1 rounding). UOB Lady's (Dining) also earns 4.0 MPD."
        : 'Online food and Pandamart orders earn 4.0 MPD with fine $1 rounding on Citi Rewards.'
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
      bestCard: isFashion ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isFashion ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isFashion
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: isFashion ? 'Citi Rewards (Online)' : "UOB Lady's (if Fashion selected)",
      mpd: 4.0,
      paymentMethod: isFashion ? 'Physical Card or Mobile Contactless' : 'Apple Pay / Google Pay Contactless',
      notes: isFashion
        ? "UOB Lady's (Fashion category) earns 4.0 MPD up to S$1,000 cap! Or mobile tap with UOB PPV."
        : 'Must tap mobile phone (Apple Pay / Google Pay). Spend in multiples of $5.'
    },
    {
      name: 'NTUC FairPrice / FairPrice Finest',
      category: 'Supermarket / Groceries',
      bestCard: isFamily ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isFamily ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isFamily
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'Citi PremierMiles (1.2 MPD)',
      mpd: 4.0,
      paymentMethod: isFamily ? 'Card Tap / Mobile Pay' : 'Apple Pay / Google Pay Mobile Contactless',
      notes: isFamily
        ? "UOB Lady's (Family category) earns 4.0 MPD at supermarkets up to S$1,000 cap! Or tap phone via UOB PPV."
        : 'Tap phone at counter. Not a SMART$ store, so 4.0 MPD is fully earned.'
    },
    {
      name: 'Sheng Siong Supermarket',
      category: 'Supermarket / Groceries',
      bestCard: isFamily ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isFamily ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isFamily
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'Citi PremierMiles',
      mpd: 4.0,
      paymentMethod: isFamily ? 'Card Tap / Mobile Pay' : 'Apple Pay / Google Pay Mobile Contactless',
      notes: isFamily
        ? "UOB Lady's (Family category) earns 4.0 MPD up to S$1,000 cap! Or tap phone via UOB PPV."
        : 'Mobile contactless tap earns 4.0 MPD. Check $5 rounding.'
    },
    {
      name: 'Cold Storage / CS Fresh / Jason’s Deli',
      category: 'Supermarket (SMART$ Warning)',
      bestCard: 'Citi PM / SC Journey',
      cardId: 'citi-premiermiles',
      bestCards: [
        { name: 'Citi PM', cardId: 'citi-premiermiles' },
        { name: 'SC Journey', cardId: 'sc-journey' }
      ],
      backupCard: 'SC Journey',
      mpd: 1.2,
      paymentMethod: 'Physical Card / Apple Pay',
      notes: 'SMART$ merchant! DO NOT use UOB cards (0 UNI$). Use Citi PM (1.2 MPD) or Citi Rewards via Amaze.',
      warning: 'SMART$ merchant! UOB earns 0 UNI$.'
    },
    {
      name: 'Giant Supermarket',
      category: 'Supermarket (SMART$ Warning)',
      bestCard: 'Citi PM / SC Journey',
      cardId: 'citi-premiermiles',
      bestCards: [
        { name: 'Citi PM', cardId: 'citi-premiermiles' },
        { name: 'SC Journey', cardId: 'sc-journey' }
      ],
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
      bestCards: [
        { name: 'Citi Rewards', cardId: 'citi-rewards' },
        { name: 'Citi PM', cardId: 'citi-premiermiles' }
      ],
      backupCard: 'Citi PM',
      mpd: 1.2,
      paymentMethod: 'Card Payment',
      notes: 'SMART$ merchant! Avoid UOB cards. Use Citi cards.',
      warning: 'SMART$ merchant! UOB earns 0 UNI$.'
    },
    {
      name: 'Watsons',
      category: 'Health & Beauty',
      bestCard: isBeauty ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isBeauty ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isBeauty
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'Citi Rewards',
      mpd: 4.0,
      paymentMethod: isBeauty ? 'Card / Mobile Tap' : 'Apple Pay / Google Pay',
      notes: isBeauty
        ? "Watsons is NOT SMART$! UOB Lady's (Beauty category) & UOB PPV both earn full 4.0 MPD!"
        : 'Watsons is NOT SMART$, so UOB PPV mobile contactless earns full 4.0 MPD!'
    },
    {
      name: 'SimplyGo (MRT & Public Buses)',
      category: 'Public Transport',
      bestCard: isTransport ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isTransport ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isTransport
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'KrisFlyer UOB (3.0 MPD)',
      mpd: 4.0,
      paymentMethod: 'SimplyGo Mobile Tap',
      notes: isTransport
        ? "UOB Lady's (Transport category) & UOB PPV both earn 4.0 MPD on SimplyGo. Monthly fares aggregated before rounding."
        : 'Monthly bus & MRT fares aggregate before applying the $5 rounding block.'
    },
    {
      name: 'Singapore Airlines (Flight Booking)',
      category: 'Airlines',
      bestCard: isTravel ? "UOB Lady's / KrisFlyer UOB" : 'KrisFlyer UOB',
      cardId: isTravel ? 'uob-ladys' : 'krisflyer-uob',
      bestCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'KrisFlyer UOB', cardId: 'krisflyer-uob' }
          ]
        : undefined,
      backupCard: isTravel ? 'HSBC Revo (4.0 MPD)' : 'HSBC Revo (up to $1k cap)',
      mpd: isTravel ? 4.0 : 3.0,
      paymentMethod: 'Online Booking',
      notes: isTravel
        ? "UOB Lady's (Travel category) earns 4.0 MPD up to S$1,000 cap! KrisFlyer UOB earns uncapped 3.0 MPD with direct KF deposit."
        : 'Uncapped 3.0 MPD on SQ flights + direct KrisFlyer deposit with 0 conversion fees.'
    },
    {
      name: 'Scoot (Flight Booking)',
      category: 'Airlines',
      bestCard: isTravel ? "UOB Lady's / KrisFlyer UOB" : 'KrisFlyer UOB',
      cardId: isTravel ? 'uob-ladys' : 'krisflyer-uob',
      bestCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'KrisFlyer UOB', cardId: 'krisflyer-uob' }
          ]
        : undefined,
      backupCard: isTravel ? 'HSBC Revo (4.0 MPD)' : 'HSBC Revo',
      mpd: isTravel ? 4.0 : 3.0,
      paymentMethod: 'Online Booking',
      notes: isTravel
        ? "UOB Lady's (Travel category) earns 4.0 MPD up to S$1,000 cap! KrisFlyer UOB earns 3.0 MPD + free Scoot seat selection & priority."
        : 'Uncapped 3.0 MPD + free Scoot seat selection & priority check-in.'
    },
    {
      name: 'Other Airlines (Cathay, ANA, Qatar, Emirates, EVA)',
      category: 'Airlines',
      bestCard: isTravel ? "UOB Lady's / HSBC Revo" : 'HSBC Revo / SC Journey',
      cardId: isTravel ? 'uob-ladys' : 'hsbc-revolution',
      bestCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ]
        : [
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' },
            { name: 'SC Journey', cardId: 'sc-journey' }
          ],
      backupCard: 'SC Journey (3.0 MPD FCY)',
      mpd: 4.0,
      paymentMethod: 'Online Booking',
      notes: isTravel
        ? "UOB Lady's (Travel category) and HSBC Revo both earn 4.0 MPD up to S$1,000/mo cap each ($2,000/mo combined travel capacity)."
        : 'HSBC Revo earns 4.0 MPD up to S$1,000 cap. For amounts >$1,000, split or use SC Journey.'
    },
    {
      name: 'Agoda / Booking.com / Expedia / Hotels.com',
      category: 'Hotels & Accommodation',
      bestCard: isTravel ? "UOB Lady's / HSBC Revo" : 'HSBC Revo',
      cardId: isTravel ? 'uob-ladys' : 'hsbc-revolution',
      bestCards: isTravel
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'HSBC Revo', cardId: 'hsbc-revolution' }
          ]
        : undefined,
      backupCard: 'Citi Rewards + Amaze',
      mpd: 4.0,
      paymentMethod: 'Online Checkout',
      notes: isTravel
        ? "UOB Lady's (Travel category) and HSBC Revo both earn 4.0 MPD up to S$1,000 cap each. Stack HeyMax portal for bonus Max Miles!"
        : 'Stack HeyMax portal for 4.0 MPD + extra Max Miles voucher cashback!'
    },
    {
      name: 'Klook / KKday / Trip.com',
      category: 'Travel & Attractions',
      bestCard: isTravel ? "UOB Lady's / HSBC Revo / Citi Rewards" : 'Citi Rewards / HSBC Revo',
      cardId: isTravel ? 'uob-ladys' : 'citi-rewards',
      bestCards: isTravel
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
      mpd: 4.0,
      paymentMethod: 'Online Checkout',
      notes: isTravel
        ? "4.0 MPD on online travel activities via UOB Lady's (Travel), HSBC Revo, or Citi Rewards. Stack HeyMax portal for bonus Max Miles."
        : '4.0 MPD on online travel activities. Stack HeyMax portal for bonus Max Miles.'
    },
    {
      name: 'Restaurants, Cafes & Fine Dining',
      category: 'Dining',
      bestCard: isDining ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isDining ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isDining
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: isDining ? 'KrisFlyer UOB (3.0 MPD)' : 'KrisFlyer UOB (3.0 MPD uncapped)',
      mpd: 4.0,
      paymentMethod: isDining ? 'Physical Card or Apple Pay' : 'Apple Pay / Google Pay Contactless',
      notes: isDining
        ? "UOB Lady's (Dining category selected) earns 4.0 MPD up to S$1,000 cap. UOB PPV mobile tap as secondary."
        : "Use UOB PPV mobile contactless tap (4.0 MPD, up to S$1,200 Bobo & Bubba cap). Or KrisFlyer UOB for uncapped 3.0 MPD. (UOB Lady's is set to Travel)."
    },
    {
      name: 'Starbucks / Coffee Bean / Toast Box',
      category: 'Cafes & Beverage',
      bestCard: isDining ? "UOB PPV / UOB Lady's" : 'UOB PPV',
      cardId: 'uob-preferred-platinum-visa',
      bestCards: isDining
        ? [
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
            { name: "UOB Lady's", cardId: 'uob-ladys' }
          ]
        : undefined,
      backupCard: isDining ? "UOB Lady's" : 'Citi Rewards',
      mpd: 4.0,
      paymentMethod: 'Apple Pay / Google Pay',
      notes: 'Mobile contactless tap at cashier. Keep transaction $\\ge$ $5 for rounding.'
    },
    {
      name: 'McDonald\'s / KFC / Subway / Fast Food',
      category: 'Fast Food',
      bestCard: 'UOB PPV / Citi Rewards',
      cardId: 'uob-preferred-platinum-visa',
      bestCards: [
        { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' },
        { name: 'Citi Rewards', cardId: 'citi-rewards' }
      ],
      backupCard: 'Citi Rewards (if mobile app order)',
      mpd: 4.0,
      paymentMethod: 'Apple Pay / In-App Ordering',
      notes: 'Mobile tap or in-app payment both earn 4.0 MPD.'
    },
    {
      name: 'Don Don Donki',
      category: 'Japanese Supermarket & Retail',
      bestCard: isFamily ? "UOB Lady's / UOB PPV" : 'UOB PPV',
      cardId: isFamily ? 'uob-ladys' : 'uob-preferred-platinum-visa',
      bestCards: isFamily
        ? [
            { name: "UOB Lady's", cardId: 'uob-ladys' },
            { name: 'UOB PPV', cardId: 'uob-preferred-platinum-visa' }
          ]
        : undefined,
      backupCard: 'Citi PremierMiles',
      mpd: 4.0,
      paymentMethod: 'Apple Pay / Google Pay',
      notes: isFamily
        ? "UOB Lady's (Family category) & UOB PPV mobile tap both earn 4.0 MPD."
        : 'Mobile contactless tap earns 4.0 MPD.'
    },
    {
      name: 'Overseas In-Person Spend (Japan, Europe, USA, etc.)',
      category: 'Foreign Currency Travel',
      bestCard: 'Citi Rewards (Amaze) / SC Journey',
      cardId: 'citi-rewards',
      bestCards: [
        { name: 'Citi Rewards (Amaze)', cardId: 'citi-rewards' },
        { name: 'SC Journey', cardId: 'sc-journey' }
      ],
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
      bestCard: 'Citi PM / SC Journey',
      cardId: 'citi-premiermiles',
      bestCards: [
        { name: 'Citi PM', cardId: 'citi-premiermiles' },
        { name: 'SC Journey', cardId: 'sc-journey' }
      ],
      backupCard: isTransport ? "UOB Lady's (Esso/SPC only)" : 'SC Journey',
      mpd: 1.2,
      paymentMethod: 'Card Payment',
      notes: 'Shell is a SMART$ merchant (avoid UOB!). For Esso/SPC, use Citi PM, SC Journey' + (isTransport ? " or UOB Lady's (Transport category)." : '.'),
      warning: 'Shell is SMART$ merchant! UOB earns 0 UNI$.'
    }
  ];

  return merchants;
};

export const MERCHANTS_DATA: MerchantLookup[] = getMerchantsData('travel');
