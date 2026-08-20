import React, { useState } from 'react';
import { RotateCcw, Plus, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSpendTracker } from '../context/SpendTrackerContext';
import { useLadysCategory } from '../context/LadysCategoryContext';

export const CapTracker: React.FC = () => {
  const { items, currentPeriod, addSpend, resetAll, totalMonthlySpent, totalMonthlyCap } = useSpendTracker();
  const { categoryInfo } = useLadysCategory();
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});

  const handleCustomAdd = (id: string) => {
    const val = parseFloat(customAmounts[id]);
    if (!isNaN(val) && val > 0) {
      addSpend(id, val);
      setCustomAmounts(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all tracked card spends to $0 for this month?')) {
      resetAll();
    }
  };

  const fireCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
            Bobo &amp; Bubba Monthly Cap Tracker
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Period: <strong>{currentPeriod}</strong> • Target: Maximize 4.0 MPD without overflowing caps
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="chip-btn"
            onClick={fireCelebration}
            style={{ background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}
          >
            <Sparkles size={16} /> Celebrate
          </button>
          <button className="tracker-reset-btn" onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* Global Progress Banner */}
      <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total 4.0 MPD Tracked Spend</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>
              ${totalMonthlySpent.toFixed(2)} <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 500 }}>/ ${totalMonthlyCap.toLocaleString()} Total Cap</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Miles Earned</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803d' }}>
              +{(totalMonthlySpent * 4.0).toLocaleString()} Miles ✨
            </div>
          </div>
        </div>

        <div className="cap-progress-bar-bg">
          <div
            className="cap-progress-bar-fill"
            style={{ width: `${Math.min(100, (totalMonthlySpent / (totalMonthlyCap || 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* List of Cap Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {items.map((item) => {
          const pct = Math.round((item.currentSpend / item.capAmount) * 100);
          const remaining = Math.max(0, item.capAmount - item.currentSpend);
          const isOver = item.currentSpend > item.capAmount;
          const isFull = item.currentSpend >= item.capAmount;

          return (
            <div key={item.id} className="cap-card">
              <div className="cap-card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="cap-name">
                      {item.cardId === 'uob-ladys' ? `UOB Lady's Card (${categoryInfo.name})` : item.name}
                    </h3>
                    <span className={`tag ${item.holder === 'Bobo' ? 'tag-blue' : item.holder === 'Bubba' ? 'tag-pink' : 'tag-indigo'}`}>
                      {item.holder}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                    Remaining: <strong style={{ color: remaining === 0 ? '#dc2626' : '#15803d' }}>${remaining.toFixed(2)}</strong> of ${item.capAmount} cap
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isOver ? '#dc2626' : '#0f172a' }}>
                    ${item.currentSpend.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isFull ? '#dc2626' : '#0284c7' }}>
                    {pct}% Used
                  </div>
                </div>
              </div>

              <div className="cap-progress-bar-bg">
                <div
                  className={`cap-progress-bar-fill ${isFull ? 'warning' : ''}`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>

              {isFull && (
                <div style={{ padding: '6px 10px', background: '#fee2e2', borderRadius: '6px', color: '#991b1b', fontSize: '0.78rem', fontWeight: 600, marginBottom: '10px' }}>
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                  Monthly cap reached! Switch further spend to Citi PremierMiles or SC Journey (catch-all).
                </div>
              )}

              <div className="cap-controls">
                <div className="quick-add-group">
                  <span style={{ fontSize: '0.78rem', color: '#64748b', alignSelf: 'center', marginRight: '4px' }}>Quick Add:</span>
                  <button className="quick-add-btn" onClick={() => addSpend(item.id, 20)}>+$20</button>
                  <button className="quick-add-btn" onClick={() => addSpend(item.id, 50)}>+$50</button>
                  <button className="quick-add-btn" onClick={() => addSpend(item.id, 100)}>+$100</button>
                  <button className="quick-add-btn" onClick={() => addSpend(item.id, 250)}>+$250</button>
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="number"
                    placeholder="$ amount"
                    value={customAmounts[item.id] || ''}
                    onChange={(e) => setCustomAmounts({ ...customAmounts, [item.id]: e.target.value })}
                    style={{
                      width: '90px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.8rem'
                    }}
                  />
                  <button
                    className="quick-add-btn"
                    style={{ background: '#0284c7', color: 'white', borderColor: '#0284c7' }}
                    onClick={() => handleCustomAdd(item.id)}
                  >
                    <Plus size={14} style={{ verticalAlign: '-2px' }} /> Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
