import { LadysCategory, LadysCategoryInfo } from '../types';

export const LADYS_CATEGORIES: Record<LadysCategory, LadysCategoryInfo> = {
  travel: {
    id: 'travel',
    name: 'Travel',
    icon: 'Plane',
    emoji: '✈️',
    shortDesc: 'Airlines, Hotels, Agoda, Expedia, Klook & Travel Agencies',
    detailedDesc: '4.0 MPD on flight bookings, hotel reservations, OTAs (Agoda, Expedia, Klook, Trip.com), and overseas travel packages up to S$1,000/month.',
    examples: ['Singapore Airlines', 'Scoot', 'Agoda', 'Expedia', 'Booking.com', 'Klook', 'Trip.com'],
    mccs: 'MCC 3000-3350 (Airlines), 4511 (Airlines), 4722 (Travel Agencies), 7011 (Hotels)'
  },
  dining: {
    id: 'dining',
    name: 'Dining',
    icon: 'Utensils',
    emoji: '🍽️',
    shortDesc: 'Restaurants, Cafes, Bars, Fast Food & Food Delivery',
    detailedDesc: '4.0 MPD on all dining establishments, restaurants, cafes, bars, fast food, and food delivery platforms up to S$1,000/month.',
    examples: ['Restaurants', 'Cafes', 'Bars & Pubs', 'Fast Food', 'GrabFood', 'Foodpanda'],
    mccs: 'MCC 5812 (Restaurants & Dining Places), 5814 (Fast Food & Caterers)'
  },
  fashion: {
    id: 'fashion',
    name: 'Fashion',
    icon: 'ShoppingBag',
    emoji: '👗',
    shortDesc: 'Department Stores, Retail Clothing, Shoes & Bags',
    detailedDesc: '4.0 MPD at fashion boutiques, department stores, retail clothing, shoes, bags, and online fashion merchants up to S$1,000/month.',
    examples: ['Uniqlo', 'Zara', 'Takashimaya', 'Isetan', 'H&M', 'Nike', 'ASOS'],
    mccs: 'MCC 5311 (Dept Stores), 5611, 5621, 5631, 5641, 5651, 5655, 5661, 5691, 5699'
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: 'Sparkles',
    emoji: '💅',
    shortDesc: 'Pharmacies, Cosmetics, Spas, Salons & Massage',
    detailedDesc: '4.0 MPD at beauty & wellness establishments, pharmacies, cosmetics counters, hair salons, and spas up to S$1,000/month.',
    examples: ['Watsons', 'Sephora', 'Spas & Massages', 'Hair Salons', 'Aesthetics'],
    mccs: 'MCC 5912 (Drug Stores/Pharmacies), 5977 (Cosmetics), 7230 (Beauty Salons), 7297, 7298'
  },
  family: {
    id: 'family',
    name: 'Family (Groceries)',
    icon: 'ShoppingCart',
    emoji: '👶',
    shortDesc: 'Supermarkets, Groceries & Children’s Stores',
    detailedDesc: '4.0 MPD on supermarket groceries, dairy, baby care, and children’s specialty stores up to S$1,000/month.',
    examples: ['NTUC FairPrice', 'Sheng Siong', 'Don Don Donki', 'Mothercare', 'Baby Kingdom'],
    mccs: 'MCC 5411 (Grocery Stores & Supermarkets), 5641 (Children & Infants Wear)'
  },
  transport: {
    id: 'transport',
    name: 'Transport',
    icon: 'Car',
    emoji: '🚗',
    shortDesc: 'Public Transport, Taxis, Ride-Hailing & Petrol',
    detailedDesc: '4.0 MPD on public transport (SimplyGo), ride-hailing (Grab, Gojek, CDG Zig, TADA), and petrol stations up to S$1,000/month.',
    examples: ['SimplyGo MRT/Bus', 'Grab Rides', 'Gojek', 'CDG Zig', 'Esso', 'SPC Petrol'],
    mccs: 'MCC 4111 (Commuter Transport), 4121 (Taxicabs/Rides), 4789, 5541, 5542 (Service Stations)'
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'Music',
    emoji: '🎟️',
    shortDesc: 'Bars, Clubs, Cinemas, Ticketing & Streaming',
    detailedDesc: '4.0 MPD at cinemas, concert ticketing, theaters, bars, lounges, and online entertainment subscriptions up to S$1,000/month.',
    examples: ['Golden Village', 'Shaw Theatres', 'SISTIC', 'Ticketmaster', 'Clubs & Lounges', 'Netflix'],
    mccs: 'MCC 7832 (Motion Picture Theatres), 7922 (Theatrical Producers), 7929, 7991, 7996, 7998'
  }
};

export const LADYS_CATEGORIES_LIST: LadysCategoryInfo[] = Object.values(LADYS_CATEGORIES);
