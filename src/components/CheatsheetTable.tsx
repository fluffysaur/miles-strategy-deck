import React, { useState, useMemo } from 'react';
import { Layers, Search, AlertCircle, Smartphone, Bus, Utensils, Coffee, ShoppingBag, Bike, Plane, Building2, ShoppingCart, CreditCard, Globe, AlertTriangle } from 'lucide-react';
import { CHEATSHEET_DATA } from '../data/cheatsheet';
import { CardBadge } from './CardBadge';
import { CardId } from '../types';

interface CheatsheetTableProps {
  onSelectCard: (cardId: CardId) => void;
}

export const CheatsheetTable: React.FC<CheatsheetTableProps> = ({ onSelectCard }) => {
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [tableSearch, setTableSearch] = useState<string>('');

  const renderIcon = (iconName: string, color: string) => {
    const props = { size: 18, color };
    switch (iconName) {
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Bus': return <Bus {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Bike': return <Bike {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'ShoppingCart': return <ShoppingCart {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'AlertTriangle': return <AlertTriangle {...props} />;
      default: return <CreditCard {...props} />;
    }
  };

  const filteredRows = useMemo(() => {
    return CHEATSHEET_DATA.filter((row) => {
      if (filterGroup !== 'all' && row.categoryGroup !== filterGroup) {
        return false;
      }
      if (tableSearch.trim() === '') return true;
      const q = tableSearch.toLowerCase();
      return (
        row.category.toLowerCase().includes(q) ||
        row.primaryCard.toLowerCase().includes(q) ||
        row.strategyNotes.toLowerCase().includes(q)
      );
    });
  }, [filterGroup, tableSearch]);

  return (
    <div className="table-card-wrapper">
      <div className="table-header-bar">
        <div className="table-title">
          <Layers style={{ color: '#0284c7' }} size={22} />
          <span>Strategy Decision Matrix</span>
        </div>

        <div className="table-filter-controls">
          <div className="matrix-search-box">
            <Search size={16} className="matrix-search-icon" />
            <input
              type="text"
              placeholder="Search category, card..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="matrix-search-input"
            />
          </div>

          <div className="matrix-chips-scroll">
            <button
              className={`chip-btn ${filterGroup === 'all' ? 'active' : ''}`}
              onClick={() => setFilterGroup('all')}
            >
              All ({CHEATSHEET_DATA.length})
            </button>
            <button
              className={`chip-btn ${filterGroup === 'everyday' ? 'active' : ''}`}
              onClick={() => setFilterGroup('everyday')}
            >
              <span className="chip-emoji">📱</span>
              <span>Everyday</span>
            </button>
            <button
              className={`chip-btn ${filterGroup === 'dining' ? 'active' : ''}`}
              onClick={() => setFilterGroup('dining')}
            >
              <span className="chip-emoji">🍽️</span>
              <span>Dining</span>
            </button>
            <button
              className={`chip-btn ${filterGroup === 'online' ? 'active' : ''}`}
              onClick={() => setFilterGroup('online')}
            >
              <span className="chip-emoji">🛍️</span>
              <span>Online</span>
            </button>
            <button
              className={`chip-btn ${filterGroup === 'travel' ? 'active' : ''}`}
              onClick={() => setFilterGroup('travel')}
            >
              <span className="chip-emoji">✈️</span>
              <span>Travel</span>
            </button>
            <button
              className={`chip-btn ${filterGroup === 'exclusions' ? 'active' : ''}`}
              onClick={() => setFilterGroup('exclusions')}
              style={{ color: '#ef4444' }}
            >
              <span className="chip-emoji">⚠️</span>
              <span>SMART$</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card List View (Visible on Mobile) */}
      <div className="matrix-mobile-cards">
        {filteredRows.map((row, idx) => (
          <div key={idx} className="matrix-card-item">
            <div className="matrix-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="td-icon-box" style={{ background: `${row.iconColor}15` }}>
                  {renderIcon(row.icon, row.iconColor)}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{row.category}</span>
              </div>
              <span className={`tag ${row.mpd >= 4.0 ? 'tag-green' : row.mpd >= 3.0 ? 'tag-blue' : 'tag-slate'}`}>
                {row.mpd.toFixed(1)} MPD
              </span>
            </div>

            <div className="matrix-card-body">
              <div className="matrix-card-row">
                <span className="matrix-card-lbl">Primary Card:</span>
                {row.primaryCards && row.primaryCards.length > 0 ? (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {row.primaryCards.map((c, cIdx) => (
                      <React.Fragment key={cIdx}>
                        {cIdx > 0 && <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>/</span>}
                        <CardBadge
                          cardId={c.cardId}
                          cardName={c.name}
                          size="sm"
                          onClick={() => onSelectCard(c.cardId)}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <CardBadge
                    cardId={row.cardId}
                    cardName={row.primaryCard}
                    size="sm"
                    onClick={() => onSelectCard(row.cardId)}
                  />
                )}
              </div>

              <div className="matrix-card-row">
                <span className="matrix-card-lbl">Monthly Cap:</span>
                <span className="tag tag-slate" style={{ fontSize: '0.72rem' }}>{row.monthlyCap}</span>
              </div>

              <div className="matrix-card-row">
                <span className="matrix-card-lbl">Rounding Block:</span>
                <span className={`tag ${row.rounding.includes('$5') ? 'tag-amber' : 'tag-green'}`} style={{ fontSize: '0.72rem' }}>
                  {row.rounding}
                </span>
              </div>

              <div className="matrix-card-notes">
                {row.categoryGroup === 'exclusions' && (
                  <AlertCircle size={14} style={{ color: '#ef4444', display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                )}
                {row.strategyNotes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Visible on Tablet/Desktop) */}
      <div className="table-responsive-container matrix-desktop-table">
        <table className="app-table">
          <thead>
            <tr>
              <th>Spend Category</th>
              <th>Primary Card</th>
              <th style={{ textAlign: 'center' }}>MPD</th>
              <th style={{ textAlign: 'center' }}>Monthly Cap</th>
              <th style={{ textAlign: 'center' }}>Rounding</th>
              <th>Strategy &amp; Traps</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div className="td-category">
                    <div className="td-icon-box" style={{ background: `${row.iconColor}15` }}>
                      {renderIcon(row.icon, row.iconColor)}
                    </div>
                    <span>{row.category}</span>
                  </div>
                </td>
                <td>
                  {row.primaryCards && row.primaryCards.length > 0 ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {row.primaryCards.map((c, cIdx) => (
                        <React.Fragment key={cIdx}>
                          {cIdx > 0 && <span style={{ color: '#94a3b8', fontWeight: 600 }}>/</span>}
                          <CardBadge
                            cardId={c.cardId}
                            cardName={c.name}
                            size="sm"
                            onClick={() => onSelectCard(c.cardId)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <CardBadge
                      cardId={row.cardId}
                      cardName={row.primaryCard}
                      size="sm"
                      onClick={() => onSelectCard(row.cardId)}
                    />
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`tag ${row.mpd >= 4.0 ? 'tag-green' : row.mpd >= 3.0 ? 'tag-blue' : 'tag-slate'}`}>
                    {row.mpd.toFixed(1)}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className="tag tag-slate">{row.monthlyCap}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`tag ${row.rounding.includes('$5') ? 'tag-amber' : 'tag-green'}`}>
                    {row.rounding}
                  </span>
                </td>
                <td style={{ color: '#334155', maxWidth: '340px' }}>
                  {row.categoryGroup === 'exclusions' && (
                    <AlertCircle size={14} style={{ color: '#ef4444', display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                  )}
                  {row.strategyNotes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
