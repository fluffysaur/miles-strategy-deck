import React from 'react';
import { Presentation, Sparkles, Layers } from 'lucide-react';

interface NavbarProps {
  activeTab: 'finder' | 'cheatsheet' | 'wallet' | 'heymax';
  setActiveTab: (tab: 'finder' | 'cheatsheet' | 'wallet' | 'heymax') => void;
  onEnterDeckMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onEnterDeckMode }) => {
  return (
    <header className="app-navbar">
      <div className="brand-section">
        <img
          src="/images/bobo-bubba-cover.jpg"
          alt="Bobo & Bubba"
          className="brand-logo"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="brand-text-wrap">
          <div className="brand-title">
            <span className="brand-title-full">Bobo &amp; Bubba Miles Strategy</span>
            <span className="brand-title-mobile">Bobo &amp; Bubba Miles</span>
          </div>
          <div className="brand-subtitle">Couple&apos;s 4.0 MPD Engine ✈️</div>
        </div>
      </div>

      {/* Desktop Navigation Tabs (Hidden on mobile via CSS) */}
      <nav className="desktop-nav-tabs">
        <button
          className={`chip-btn ${activeTab === 'finder' ? 'active' : ''}`}
          onClick={() => setActiveTab('finder')}
        >
          <Sparkles size={16} /> Best Card Finder
        </button>
        <button
          className={`chip-btn ${activeTab === 'cheatsheet' ? 'active' : ''}`}
          onClick={() => setActiveTab('cheatsheet')}
        >
          <Layers size={16} /> Cheatsheet
        </button>
        <button
          className={`chip-btn ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          💳 Card Wallet
        </button>
        <button
          className={`chip-btn ${activeTab === 'heymax' ? 'active' : ''}`}
          onClick={() => setActiveTab('heymax')}
        >
          🪄 HeyMax
        </button>
      </nav>

      <div className="nav-actions">
        <button
          className="mode-toggle-btn"
          onClick={onEnterDeckMode}
          title="Switch to Slide Presentation Deck"
          aria-label="Switch to Slide Deck Mode"
        >
          <Presentation size={18} />
          <span className="mode-toggle-label">Deck Mode</span>
        </button>
      </div>
    </header>
  );
};
