import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CARDS_DATA } from '../data/cards';
import { CardId } from '../types';

interface CardWalletProps {
  onSelectCard: (cardId: CardId) => void;
}

export const CardWallet: React.FC<CardWalletProps> = ({ onSelectCard }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Our 7-Card Portfolio</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>The dedicated credit cards powering our couple miles engine</p>
        </div>
      </div>

      <div className="cards-grid">
        {CARDS_DATA.map((card) => (
          <div
            key={card.id}
            className="wallet-card"
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
            </div>

            <div className="wallet-card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <h3 className="wallet-card-title">{card.shortName}</h3>
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

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', color: '#0284c7', fontSize: '0.85rem', fontWeight: 700 }}>
                <span>View Full Strategy</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
