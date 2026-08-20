import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { LadysCategory, LadysCategoryInfo, CardData, CheatsheetRow, MerchantLookup } from '../types';
import { LADYS_CATEGORIES, LADYS_CATEGORIES_LIST } from '../data/ladysCategories';
import { getCardsData } from '../data/cards';
import { getCheatsheetData } from '../data/cheatsheet';
import { getMerchantsData } from '../data/merchants';

interface LadysCategoryContextType {
  category: LadysCategory;
  setCategory: (category: LadysCategory) => void;
  categoryInfo: LadysCategoryInfo;
  allCategories: LadysCategoryInfo[];
  cardsData: CardData[];
  cheatsheetData: CheatsheetRow[];
  merchantsData: MerchantLookup[];
}

const STORAGE_KEY = 'bobo_bubba_ladys_category';
const DEFAULT_CATEGORY: LadysCategory = 'travel';

const LadysCategoryContext = createContext<LadysCategoryContextType | undefined>(undefined);

export const LadysCategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [category, setCategoryState] = useState<LadysCategory>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in LADYS_CATEGORIES) {
        return saved as LadysCategory;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CATEGORY;
  });

  const setCategory = (newCategory: LadysCategory) => {
    if (newCategory in LADYS_CATEGORIES) {
      setCategoryState(newCategory);
      try {
        localStorage.setItem(STORAGE_KEY, newCategory);
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, category);
    } catch {
      // Ignore
    }
  }, [category]);

  const categoryInfo = LADYS_CATEGORIES[category] || LADYS_CATEGORIES.travel;
  const allCategories = LADYS_CATEGORIES_LIST;

  const cardsData = useMemo(() => getCardsData(category), [category]);
  const cheatsheetData = useMemo(() => getCheatsheetData(category), [category]);
  const merchantsData = useMemo(() => getMerchantsData(category), [category]);

  return (
    <LadysCategoryContext.Provider
      value={{
        category,
        setCategory,
        categoryInfo,
        allCategories,
        cardsData,
        cheatsheetData,
        merchantsData
      }}
    >
      {children}
    </LadysCategoryContext.Provider>
  );
};

export const useLadysCategory = (): LadysCategoryContextType => {
  const context = useContext(LadysCategoryContext);
  if (!context) {
    throw new Error('useLadysCategory must be used within a LadysCategoryProvider');
  }
  return context;
};
