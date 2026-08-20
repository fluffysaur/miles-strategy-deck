import React from 'react';
import { CreditCard } from 'lucide-react';
import { CARDS_DATA } from '../data/cards';
import { CardId } from '../types';

interface CardBadgeProps {
  cardId?: CardId | string;
  cardName?: string;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export const CardBadge: React.FC<CardBadgeProps> = ({
  cardId,
  cardName,
  onClick,
  size = 'md',
}) => {
  const card = CARDS_DATA.find((c) => c.id === cardId || c.shortName === cardName || c.name === cardName);
  const displayName = cardName || card?.shortName || card?.name || 'Card';

  return (
    <button
      type="button"
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      className={`card-visual-badge ${size === 'sm' ? 'badge-sm' : ''}`}
      style={{
        borderColor: card ? `${card.accentColor}40` : '#e2e8f0',
      }}
      title={`View ${displayName} specs`}
    >
      {card?.image ? (
        <img
          src={card.image}
          alt={displayName}
          className="badge-card-thumb"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      ) : (
        <CreditCard size={size === 'sm' ? 12 : 14} className="badge-card-icon" />
      )}
      <span className="badge-card-text">{displayName}</span>
    </button>
  );
};
