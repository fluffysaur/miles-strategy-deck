import React, { useState, useMemo } from 'react';
import { Search, X, AlertTriangle } from 'lucide-react';
import { MERCHANTS_DATA } from '../data/merchants';
import { CardBadge } from './CardBadge';
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
      {/* Big Search Bar */}
      <div className="search-box-wrapper">
        <Search className="search-input-icon" size={22} />
        <input
          type="text"
          className="search-input"
          placeholder="Where are you spending? (e.g., Grab, Foodpanda, Shopee, Uniqlo...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear Search">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Chips with Spaced Emojis */}
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
          <span className="chip-emoji">🛍️</span>
          <span>Online Shopping</span>
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'dining' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('dining')}
        >
          <span className="chip-emoji">🍽️</span>
          <span>Dining &amp; Cafes</span>
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'transport' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('transport')}
        >
          <span className="chip-emoji">✈️</span>
          <span>Transport &amp; Travel</span>
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'groceries' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('groceries')}
        >
          <span className="chip-emoji">🛒</span>
          <span>Groceries</span>
        </button>
        <button
          className={`chip-btn ${selectedFilter === 'smart' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('smart')}
          style={{ borderColor: '#fca5a5' }}
        >
          <span className="chip-emoji">⚠️</span>
          <span>SMART$ Warnings</span>
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
                <div style={{ width: '100%' }}>
                  <div className="rec-badge">Best Card(s) to Use</div>
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    {merchant.bestCards && merchant.bestCards.length > 0 ? (
                      merchant.bestCards.map((c, cIdx) => (
                        <CardBadge
                          key={cIdx}
                          cardId={c.cardId}
                          cardName={c.name}
                          onClick={() => onSelectCard(c.cardId)}
                        />
                      ))
                    ) : (
                      <CardBadge
                        cardId={merchant.cardId}
                        cardName={merchant.bestCard}
                        onClick={() => onSelectCard(merchant.cardId)}
                      />
                    )}
                  </div>
                </div>
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
