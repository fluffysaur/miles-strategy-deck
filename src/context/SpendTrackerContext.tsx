import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CapTrackingItem } from '../types';

interface SpendTrackerContextType {
  items: CapTrackingItem[];
  currentPeriod: string;
  addSpend: (id: string, amount: number) => void;
  setSpend: (id: string, amount: number) => void;
  resetAll: () => void;
  totalMonthlySpent: number;
  totalMonthlyCap: number;
}

const STORAGE_KEY = 'bobo_bubba_miles_spend_tracker_v1';

const getCurrentPeriodLabel = (): string => {
  const now = new Date();
  return now.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const DEFAULT_ITEMS: CapTrackingItem[] = [
  {
    id: 'bobo-uob-ppv',
    name: 'Bobo UOB PPV (Mobile Contactless)',
    holder: 'Bobo',
    cardId: 'uob-preferred-platinum-visa',
    capAmount: 600,
    currentSpend: 0,
    period: getCurrentPeriodLabel()
  },
  {
    id: 'bubba-uob-ppv',
    name: 'Bubba UOB PPV (Mobile Contactless)',
    holder: 'Bubba',
    cardId: 'uob-preferred-platinum-visa',
    capAmount: 600,
    currentSpend: 0,
    period: getCurrentPeriodLabel()
  },
  {
    id: 'citi-rewards',
    name: 'Citi Rewards (Online Shopping / Food)',
    holder: 'Joint',
    cardId: 'citi-rewards',
    capAmount: 1000,
    currentSpend: 0,
    period: getCurrentPeriodLabel()
  },
  {
    id: 'uob-ladys',
    name: "UOB Lady's Card (Dining)",
    holder: 'Joint',
    cardId: 'uob-ladys',
    capAmount: 1000,
    currentSpend: 0,
    period: getCurrentPeriodLabel()
  },
  {
    id: 'hsbc-revolution',
    name: 'HSBC Revolution (Travel & Hotels)',
    holder: 'Joint',
    cardId: 'hsbc-revolution',
    capAmount: 1000,
    currentSpend: 0,
    period: getCurrentPeriodLabel()
  }
];

const SpendTrackerContext = createContext<SpendTrackerContextType | undefined>(undefined);

export const SpendTrackerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CapTrackingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ITEMS;
  });

  const [currentPeriod] = useState<string>(getCurrentPeriodLabel);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const addSpend = (id: string, amount: number) => {
    if (isNaN(amount) || amount <= 0) return;
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, currentSpend: Math.min(item.capAmount * 2, Number((item.currentSpend + amount).toFixed(2))) }
          : item
      )
    );
  };

  const setSpend = (id: string, amount: number) => {
    const validAmount = isNaN(amount) ? 0 : Math.max(0, amount);
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, currentSpend: Number(validAmount.toFixed(2)) } : item
      )
    );
  };

  const resetAll = () => {
    setItems(prev => prev.map(item => ({ ...item, currentSpend: 0 })));
  };

  const totalMonthlySpent = items.reduce((sum, item) => sum + item.currentSpend, 0);
  const totalMonthlyCap = items.reduce((sum, item) => sum + item.capAmount, 0);

  return (
    <SpendTrackerContext.Provider
      value={{
        items,
        currentPeriod,
        addSpend,
        setSpend,
        resetAll,
        totalMonthlySpent,
        totalMonthlyCap
      }}
    >
      {children}
    </SpendTrackerContext.Provider>
  );
};

export const useSpendTracker = (): SpendTrackerContextType => {
  const context = useContext(SpendTrackerContext);
  if (!context) {
    throw new Error('useSpendTracker must be used within a SpendTrackerProvider');
  }
  return context;
};
