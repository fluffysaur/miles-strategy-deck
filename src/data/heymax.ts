import { HeyMaxStep } from "../types";

export const HEYMAX_STEPS: HeyMaxStep[] = [
    {
        step: 1,
        title: "Step 1: Check HeyMax Before Buying",
        description: "Before paying for anything, search the merchant on HeyMax.",
        icon: "Search",
        image: "/images/heymax-step1.jpg",
        tips: [
            "Search direct merchants (Shopee, Lazada, Apple, Nike, Sephora, Klook, Agoda)",
            "Check current Max Miles earn rate (typically 1.0 to 10.0 Max Miles per $1)",
            "Look for HeyMax instant voucher purchase deals",
        ],
    },
    {
        step: 2,
        title: "Step 2: Pay with 4.0 MPD Credit Card",
        description: "Complete the transaction or voucher purchase using the recommended credit card.",
        icon: "CreditCard",
        image: "/images/heymax-step2.jpg",
        tips: [
            "Citi Rewards: Perfect for online voucher purchases and direct website checkouts (MCC 5311/5814)",
            "UOB PPV: Works when paying online with selected portals",
            "HSBC Revo: Best for online travel, airlines, and hotel bookings",
        ],
    },
    {
        step: 3,
        title: "Step 3: Stack with Max Miles + Vouchers",
        description:
            "Enjoy multi-layered stacking for up to 8.0 - 14.0 MPD total miles on the exact same dollar spent!",
        icon: "Layers",
        image: "/images/heymax-step3.jpg",
        tips: [
            "Layer 1: Credit Card 4.0 MPD base rewards (UNI$ / Citi Points / HSBC Reward Points)",
            "Layer 2: HeyMax Max Miles (e.g. +3.5 Max Miles/$1)",
            "Layer 3: In-app store vouchers and discounts (Shopee coins / shop cashback)",
            "Max Miles convert 1:1 to 25+ airline & hotel partners with ZERO conversion fees and NO expiry!",
        ],
    },
];

export const HEYMAX_KEY_PARTNERS = [
    { name: "Singapore Airlines KrisFlyer", ratio: "1:1", fee: "S$0 Fee" },
    { name: "Cathay Pacific Asia Miles", ratio: "1:1", fee: "S$0 Fee" },
    { name: "Qatar Airways Privilege Club", ratio: "1:1", fee: "S$0 Fee" },
    { name: "Air France / KLM Flying Blue", ratio: "1:1", fee: "S$0 Fee" },
    { name: "British Airways Executive Club", ratio: "1:1", fee: "S$0 Fee" },
    { name: "Marriott Bonvoy", ratio: "1:1", fee: "S$0 Fee" },
    { name: "World of Hyatt", ratio: "1:1", fee: "S$0 Fee" },
    { name: "Turkish Airlines Miles&Smiles", ratio: "1:1", fee: "S$0 Fee" },
];
