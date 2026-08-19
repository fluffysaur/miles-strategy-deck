import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, AlertTriangle, ArrowRight, ShieldAlert, CreditCard, CheckCircle2 } from 'lucide-react';
import { MERCHANTS_DATA } from '../data/merchants';
import { CARDS_DATA } from '../data/cards';
import { CardId } from '../types';

interface CardFinderProps {
  onSelectCard: (cardId: CardId) => void;
}

export const CardFinder: React.FC<CardFinderProps> = ({ onSelectCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredMerchants = useMemo(() => {
    return MERCHANTS_DATA.filter((m) => {
      const matchesQuery =
        searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.bestCard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.notes.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesQuery) return false;

      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'online')
        return m.category.toLowerCase().includes('online') || m.category.toLowerCase().includes('delivery');
      if (selectedFilter === 'dining')
        return m.category.toLowerCase().includes('dining') || m.category.toLowerCase().includes('cafe') || m.category.toLowerCase().includes('food');
      if (selectedFilter === 'transport')
        return m.category.toLowerCase().includes('transport') || m.category.toLowerCase().includes('airlines') || m.category.toLowerCase().includes('travel');
      if (selectedFilter === 'groceries')
        return m.category.toLowerCase().includes('supermarket') || m.category.toLowerCase().includes('groceries');
      if (selectedFilter === 'smart')
        return m.warning !== undefined;

      return true;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <section className="hero-finder-section">
      {/* Quick Summary Ribbon */}
      <div className="summary-ribbon">
        <div className="ribbon-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Sparkles size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Max Earn Rate</span>
            <span className="stat-value" style={{ color: '#0284c7' }}>4.0 MPD</span>
          </div>
        </div>

        <div className="ribbon-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#dcfce7', color: '#15803d' }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Couple Card Rack</span>
            <span className="stat-value">{CARDS_DATA.length} Power Cards</span>
          </div>
        </div>

        <div className="ribbon-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Contactless Cap</span>
            <span className="stat-value">S$1,200/mo (Dual)</span>
          </div>
        </div>

        <div className="ribbon-stat-card">
          <div className="stat-icon-wrap" style={{ background: '#fee2e2', color: '#b91c1c' }}>
            <ShieldAlert size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">SMART$ Stores</span>
            <span className="stat-value" style={{ color: '#b91c1c' }}>Avoid UOB</span>
          </div>
        </div>
      </div>

      {/* Big Search Bar */}
      <div className="search-box-wrapper">
        <Search className="search-input-icon" size={22} />
        <input
          type="text"
          className="search-input"
          placeholder="Where are you spending? (e.g., Grab, Shopee, Uniqlo, Agoda, FairPrice, SimplyGo...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="quick-chips-wrapper">
        <button
          className={`chip-btn ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('all')}
        >
          All Places ({MERCHANTS_DATA.length})
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'online' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('online')}
        >
          🛍️ Online Shopping
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'dining' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('dining')}
        >
          🍽️ Dining &amp; Cafes
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'transport' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('transport')}
        >
          ✈️ Transport &amp; Travel
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'groceries' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('groceries')}
        >
          🛒 Groceries
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'smart' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('smart')}
          style={{ borderColor: '#fca5a5' }}
        >
          ⚠️ SMART$ Warnings
        </button>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {filteredMerchants.map((merchant, idx) => (
          <div key={idx} className="merchant-card">
            <div>
              <div className="merchant-header">
                <div>
                  <h3 className="merchant-title">{merchant.name}</h3>
                  <div className="merchant-category">{merchant.category}</div>
                </div>
                <span className={`tag ${merchant.mpd >= 4 ? 'tag-green' : merchant.mpd >= 3 ? 'tag-blue' : 'tag-amber'}`}>
                  {merchant.mpd.toFixed(1)} MPD
                </span>
              </div>

              <div className="merchant-rec">
                <div>
                  <div className="rec-badge">Best Card to Use</div>
                  <div className="rec-card-name">{merchant.bestCard}</div>
                </div>
                <button
                  onClick={() => onSelectCard(merchant.cardId)}
                  style={{ marginLeft: 'auto', color: '#0284c7', display: 'flex', alignItems: 'center' }}
                  title="View Card Specs"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <p className="merchant-notes">{merchant.notes}</p>
            </div>

            {merchant.warning && (
              <div className="merchant-warning">
                <AlertTriangle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                {merchant.warning}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredMerchants.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: '#ffffff', borderRadius: '16px' }}>
          <p style={{ fontWeight: 700, color: '#64748b', fontSize: '1.1rem' }}>No merchants found matching &quot;{searchQuery}&quot;</p>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '6px' }}>
            Try searching a category like <em>Dining</em>, <em>Travel</em>, or <em>Contactless</em>.
          </p>
        </div>
      )}
    </section>
  );
};
