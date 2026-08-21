import React from 'react';
import { Sparkles, Layers, CreditCard, Wand2 } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'finder' | 'cheatsheet' | 'wallet' | 'heymax';
  setActiveTab: (tab: 'finder' | 'cheatsheet' | 'wallet' | 'heymax') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-item ${activeTab === 'finder' ? 'active' : ''}`}
        onClick={() => setActiveTab('finder')}
      >
        <Sparkles size={20} />
        <span>Finder</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'cheatsheet' ? 'active' : ''}`}
        onClick={() => setActiveTab('cheatsheet')}
      >
        <Layers size={20} />
        <span>Cheatsheet</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'wallet' ? 'active' : ''}`}
        onClick={() => setActiveTab('wallet')}
      >
        <CreditCard size={20} />
        <span>Wallet</span>
      </button>

      <button
        className={`bottom-nav-item ${activeTab === 'heymax' ? 'active' : ''}`}
        onClick={() => setActiveTab('heymax')}
      >
        <Wand2 size={20} />
        <span>HeyMax</span>
      </button>
    </nav>
  );
};
