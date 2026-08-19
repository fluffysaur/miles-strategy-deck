import React from 'react';
import { X, ExternalLink, ShieldCheck, AlertTriangle, Gift, Sparkles } from 'lucide-react';
import { CardData } from '../types';

interface CardDetailModalProps {
  card: CardData | null;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>

        <div className="modal-header-banner">
          <div className="modal-header-content">
            <img
              src={card.image}
              alt={card.name}
              className="modal-card-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/240x150?text=${encodeURIComponent(card.shortName)}`;
              }}
            />
            <div className="modal-header-text">
              <div className="modal-title-row">
                <h2 className="modal-card-name">{card.name}</h2>
                <span className="badge-mpd" style={{ background: card.accentGradient }}>
                  {card.mpdNumeric >= 4.0 ? '4.0 MPD' : `${card.mpdNumeric.toFixed(1)} MPD`}
                </span>
              </div>
              <p className="modal-card-tagline">{card.tagline}</p>
            </div>
          </div>
        </div>

        <div className="modal-body-content">
          {/* Key Specs Grid */}
          <div className="modal-specs-grid">
            <div className="modal-spec-item">
              <div className="modal-spec-lbl">MONTHLY CAP</div>
              <div className="modal-spec-val">{card.monthlyCap}</div>
            </div>
            <div className="modal-spec-item">
              <div className="modal-spec-lbl">ROUNDING BLOCK</div>
              <div className="modal-spec-val" style={{ color: card.roundingValue > 1 ? '#b45309' : '#15803d' }}>
                {card.rounding}
              </div>
            </div>
            <div className="modal-spec-item">
              <div className="modal-spec-lbl">ANNUAL FEE</div>
              <div className="modal-spec-val">{card.annualFee}</div>
            </div>
            <div className="modal-spec-item">
              <div className="modal-spec-lbl">POINTS EXPIRY</div>
              <div className="modal-spec-val">{card.expiry}</div>
            </div>
            <div className="modal-spec-item">
              <div className="modal-spec-lbl">TRANSFER FEE</div>
              <div className="modal-spec-val">{card.transferFee}</div>
            </div>
            <div className="modal-spec-item">
              <div className="modal-spec-lbl">PARTNERS</div>
              <div className="modal-spec-val" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>{card.transferPartners}</div>
            </div>
          </div>

          {/* Primary Strategy */}
          <div className="info-box">
            <h4><Sparkles size={16} style={{ color: '#0284c7' }} /> Primary Strategy</h4>
            <p>{card.primaryUse}</p>
          </div>

          {/* Perks */}
          <div className="info-box perk-box">
            <h4><ShieldCheck size={16} /> Key Strengths &amp; Optimizations</h4>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {card.perks.map((perk, idx) => (
                <li key={idx}>{perk}</li>
              ))}
            </ul>
          </div>

          {/* Catches / Warnings */}
          <div className="info-box alert-box">
            <h4><AlertTriangle size={16} /> Traps &amp; Things to Watch</h4>
            <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {card.catches.map((catchItem, idx) => (
                <li key={idx}>{catchItem}</li>
              ))}
            </ul>
          </div>

          {/* Sign up bonus / Lounge */}
          {card.signUpBonus && (
            <div className="info-box" style={{ background: '#fefce8', borderColor: '#fef08a' }}>
              <h4 style={{ color: '#854d0e' }}><Gift size={16} /> Sign-Up Bonus</h4>
              <p style={{ color: '#713f12' }}>{card.signUpBonus}</p>
            </div>
          )}

          {/* Footer review link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <a
              href={card.milelionReviewUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#0284c7',
                fontWeight: 700,
                fontSize: '0.84rem'
              }}
            >
              Read full review on MileLion <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
