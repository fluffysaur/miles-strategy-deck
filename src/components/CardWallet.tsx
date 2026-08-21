import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, RefreshCw, Info, Plane, Utensils, ShoppingBag, ShoppingCart, Car, Music } from 'lucide-react';
import { CardId, LadysCategory } from '../types';
import { useLadysCategory } from '../context/LadysCategoryContext';

interface CardWalletProps {
  onSelectCard: (cardId: CardId) => void;
}

export const CardWallet: React.FC<CardWalletProps> = ({ onSelectCard }) => {
  const { category, setCategory, categoryInfo, allCategories, cardsData } = useLadysCategory();
  const [justSwitched, setJustSwitched] = useState<boolean>(false);

  const handleCategoryChange = (newCat: LadysCategory) => {
    if (newCat !== category) {
      setCategory(newCat);
      setJustSwitched(true);
      setTimeout(() => setJustSwitched(false), 2000);
    }
  };

  const renderCategoryIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'Plane': return <Plane size={size} />;
      case 'Utensils': return <Utensils size={size} />;
      case 'ShoppingBag': return <ShoppingBag size={size} />;
      case 'Sparkles': return <Sparkles size={size} />;
      case 'ShoppingCart': return <ShoppingCart size={size} />;
      case 'Car': return <Car size={size} />;
      case 'Music': return <Music size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Our 7-Card Portfolio</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>The dedicated credit cards powering our couple miles engine</p>
        </div>
      </div>

      {/* UOB Lady's Category Selector Control Box */}
      <section className="ladys-category-section" aria-label="UOB Lady's Card Category Selector">
        <div className="ladys-category-header">
          <div className="ladys-category-title-group">
            <div className="ladys-category-icon-wrap">
              <span className="ladys-cat-active-emoji">{categoryInfo.emoji}</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 className="ladys-category-title">UOB Lady&apos;s Card Category</h3>
                <span className="ladys-category-live-pill">
                  <span className="live-dot" /> Live: {categoryInfo.name} {categoryInfo.emoji}
                </span>
              </div>
              <p className="ladys-category-subtitle">
                Select your active quarterly 4.0 MPD category. All card recommendations across the site update instantly!
              </p>
            </div>
          </div>

          <div className="ladys-category-badge-desktop">
            <span className="ladys-cap-pill">S$1,000 Cap • 4.0 MPD</span>
          </div>
        </div>

        {/* Category Option Buttons Grid */}
        <div className="ladys-category-grid">
          {allCategories.map((cat) => {
            const isSelected = cat.id === category;
            return (
              <button
                key={cat.id}
                type="button"
                className={`ladys-cat-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
                aria-pressed={isSelected}
              >
                <div className="ladys-cat-btn-top">
                  <span className="ladys-cat-btn-emoji">{cat.emoji}</span>
                  {isSelected ? (
                    <span className="ladys-cat-btn-check"><Check size={14} /></span>
                  ) : (
                    <span className="ladys-cat-btn-icon">{renderCategoryIcon(cat.icon, 14)}</span>
                  )}
                </div>
                <div className="ladys-cat-btn-content">
                  <span className="ladys-cat-btn-name">{cat.name}</span>
                  <span className="ladys-cat-btn-desc">{cat.shortDesc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details Bar */}
        <div className="ladys-category-footer">
          <div className="ladys-cat-footer-info">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Info size={16} style={{ color: '#ec4899', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>
                  Current Selection: {categoryInfo.name} ({categoryInfo.emoji})
                </span>
                <p style={{ color: '#475569', fontSize: '0.8rem', marginTop: '2px' }}>
                  {categoryInfo.detailedDesc} <span style={{ color: '#94a3b8' }}>({categoryInfo.mccs})</span>
                </p>
              </div>
            </div>
          </div>

          {justSwitched && (
            <div className="ladys-cat-switch-toast">
              <RefreshCw size={14} className="spin-slow" /> Recommendations Updated!
            </div>
          )}
        </div>
      </section>

      {/* 7-Card Grid */}
      <div className="cards-grid">
        {cardsData.map((card) => {
          const isLadys = card.id === 'uob-ladys';

          return (
            <div
              key={card.id}
              className={`wallet-card ${isLadys ? 'wallet-card-ladys' : ''}`}
              onClick={() => onSelectCard(card.id)}
            >
              <div className="wallet-card-img-wrap">
                <img
                  src={card.image}
                  alt={card.name}
                  className="wallet-card-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/240x150?text=${encodeURIComponent(card.shortName)}`;
                  }}
                />
                {isLadys && (
                  <div className="wallet-card-category-overlay">
                    <span>{categoryInfo.emoji} Category: {categoryInfo.name}</span>
                  </div>
                )}
              </div>

              <div className="wallet-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className="wallet-card-title">{card.shortName}</h3>
                    {isLadys && (
                      <span className="wallet-card-active-cat-label">
                        Active: <strong>{categoryInfo.name} {categoryInfo.emoji}</strong> (4.0 MPD)
                      </span>
                    )}
                  </div>
                  <span className="badge-mpd" style={{ background: card.accentGradient, fontSize: '0.78rem', padding: '4px 10px' }}>
                    {card.mpdNumeric >= 4.0 ? '4.0 MPD' : `${card.mpdNumeric.toFixed(1)} MPD`}
                  </span>
                </div>
                <p className="wallet-card-tagline">{card.tagline}</p>

                <div className="wallet-card-specs">
                  <div className="spec-row">
                    <span className="spec-label">Monthly Cap:</span>
                    <span className="spec-val">{card.monthlyCap}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Rounding:</span>
                    <span className="spec-val" style={{ color: card.roundingValue > 1 ? '#b45309' : '#15803d' }}>
                      {card.rounding}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Annual Fee:</span>
                    <span className="spec-val">{card.annualFee}</span>
                  </div>
                </div>

                {card.bestCategories && card.bestCategories.length > 0 && (
                  <div className="wallet-card-best-for">
                    <span className="wallet-best-for-lbl">Best for:</span>
                    <div className="wallet-best-for-chips">
                      {card.bestCategories.map((cat, idx) => (
                        <span key={idx} className="best-for-chip">
                          {cat}
                        </span>
                      ))}
                    </div>
                    {card.eligibleMccs && (
                      <div className="wallet-card-mcc-row">
                        <span className="wallet-mcc-lbl">Eligible MCCs:</span>
                        <span className="wallet-mcc-val">{card.eligibleMccs}</span>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', color: '#0284c7', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>View Full Strategy</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
