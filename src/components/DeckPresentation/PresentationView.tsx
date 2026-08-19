import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, ExternalLink, ShieldCheck, AlertTriangle, Table, Wallet, Sparkles, Wand2, Heart, CreditCard, Layers } from 'lucide-react';
import { CARDS_DATA } from '../../data/cards';
import { CHEATSHEET_DATA } from '../../data/cheatsheet';
import { HEYMAX_STEPS } from '../../data/heymax';

interface PresentationViewProps {
  onExit: () => void;
  initialSlide?: number;
}

const SLIDE_TITLES = [
  '1. Welcome ✨',
  '2. Our Card Portfolio 💳',
  '3. Citi Rewards Card 🛍️',
  '4. Citi PremierMiles Card ✈️',
  '5. UOB Preferred Visa 📱',
  "6. UOB Lady's Card 🍽️",
  '7. KrisFlyer UOB Card 🛫',
  '8. HSBC Revolution Card 🏨',
  '9. SC Journey Card 🗺️',
  '10. HeyMax Guide 🪄',
  '11. Strategy Cheatsheet 📊'
];

export const PresentationView: React.FC<PresentationViewProps> = ({ onExit, initialSlide = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = SLIDE_TITLES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onExit();
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const renderSlideContent = () => {
    // Slide 1: Welcome
    if (currentSlide === 0) {
      return (
        <div className="slide title-slide" id="slide-1">
          <div className="title-mascot-wrap">
            <img
              src="/images/bobo-bubba-cover.jpg"
              alt="Bobo & Bubba"
              className="title-mascot-img"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div className="title-mascot-badge">
              <span>✈️ Travel Duo</span>
            </div>
          </div>

          <h1>Bobo &amp; Bubba Miles Strategy! ✨</h1>
          <p className="title-sub">
            Our couple game plan to maximize 4.0 MPD rewards, harvest sign-up bonuses, and fly first-class around the world together! 🛫💖
          </p>

          <div className="tag-group">
            <span className="hero-tag tag-cute-pink">
              <Heart className="heart-pulse" size={15} fill="#ec4899" color="#ec4899" />
              Bobo &amp; Bubba Edition
            </span>
            <span className="hero-tag tag-cute-blue">
              <CreditCard size={15} color="#0284c7" />
              7-Card Engine
            </span>
            <span className="hero-tag tag-cute-green">
              <Sparkles size={15} color="#10b981" />
              HeyMax Optimized
            </span>
            <span className="hero-tag tag-cute-amber">
              <ShieldCheck size={15} color="#b45309" />
              100% Rounding Safe
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="start-tour-btn"
              onClick={nextSlide}
            >
              Start Strategy Tour <ArrowRight size={18} />
            </button>
            <button
              className="exit-deck-btn"
              onClick={onExit}
              style={{ fontSize: '0.92rem', padding: '10px 22px' }}
            >
              Open Web App Hub
            </button>
          </div>
        </div>
      );
    }

    // Slide 2: Card Portfolio Overview
    if (currentSlide === 1) {
      return (
        <div className="slide" id="slide-2">
          <div className="slide-header">
            <div className="slide-title-wrap">
              <h2><Wallet style={{ color: '#0284c7' }} /> Our Card Portfolio</h2>
              <p>The 7 key credit cards powering our couple miles engine</p>
            </div>
            <button className="chip-btn" onClick={() => setCurrentSlide(10)} style={{ color: '#0284c7', fontWeight: 700 }}>
              <Table size={16} /> Cheatsheet Matrix
            </button>
          </div>

          <div className="portfolio-grid">
            {CARDS_DATA.map((card, idx) => (
              <div
                key={card.id}
                onClick={() => setCurrentSlide(idx + 2)}
                className="port-card"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="port-card-img"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x120?text=' + encodeURIComponent(card.shortName); }}
                />
                <h4>
                  <span>{card.shortName}</span>
                  <ArrowRight size={14} style={{ color: '#94a3b8' }} />
                </h4>
                <p>{card.tagline.slice(0, 48)}...</p>
                <span className="rate-tag">{card.mpdNumeric >= 4 ? '4.0 MPD' : `${card.mpdNumeric} MPD`}</span>
              </div>
            ))}
          </div>

          <div className="portfolio-bottom-links">
            <div className="port-feature-link" onClick={() => setCurrentSlide(9)}>
              <div className="port-feature-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                <Wand2 size={20} />
              </div>
              <div className="port-feature-text">
                <h4>
                  <span>HeyMax Stacking Guide</span>
                  <ArrowRight size={14} />
                </h4>
                <p>Triple-dip miles rewards on every online purchase</p>
              </div>
            </div>

            <div className="port-feature-link" onClick={() => setCurrentSlide(10)}>
              <div className="port-feature-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Layers size={20} />
              </div>
              <div className="port-feature-text">
                <h4>
                  <span>Full Strategy Cheatsheet</span>
                  <ArrowRight size={14} />
                </h4>
                <p>Complete category-by-category decision matrix</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slides 3 to 9: Specific Cards
    if (currentSlide >= 2 && currentSlide <= 8) {
      const card = CARDS_DATA[currentSlide - 2];
      return (
        <div className="slide" id={`slide-${currentSlide + 1}`}>
          <div className="slide-header">
            <div className="slide-title-wrap">
              <button
                className="back-portfolio-btn"
                onClick={() => setCurrentSlide(1)}
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
              <h2>{card.name}</h2>
              <p>{card.tagline}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a
                href={card.milelionReviewUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f0f9ff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #bae6fd' }}
              >
                Milelion Review <ExternalLink size={14} />
              </a>
              <span className="badge-mpd" style={{ background: card.accentGradient }}>
                {card.mpdNumeric >= 4.0 ? '4.0 MPD' : `${card.mpdNumeric.toFixed(1)} MPD`}
              </span>
            </div>
          </div>

          <div className="content-grid">
            <div className="left-panel">
              <div className="card-preview">
                <img
                  src={card.image}
                  alt={card.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/240x150?text=${encodeURIComponent(card.shortName)}`; }}
                />
              </div>
              <div className="card-meta">
                <div className="meta-row">
                  <span className="meta-lbl">Earn Rate:</span>
                  <span className="meta-val val-green">{card.mpd}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Monthly Cap:</span>
                  <span className="meta-val">{card.monthlyCap}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Rounding:</span>
                  <span className="meta-val" style={{ color: card.roundingValue > 1 ? '#b45309' : '#15803d' }}>
                    {card.rounding}
                  </span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Annual Fee:</span>
                  <span className="meta-val">{card.annualFee}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Expiry:</span>
                  <span className="meta-val">{card.expiry}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Transfer Fee:</span>
                  <span className="meta-val">{card.transferFee}</span>
                </div>
              </div>
            </div>

            <div className="right-panel">
              <div className="info-box">
                <h4><Sparkles size={16} style={{ color: '#0284c7' }} /> Primary Use</h4>
                {card.primaryUse}
              </div>
              <div className="info-box perk-box">
                <h4><ShieldCheck size={16} /> Key Strengths</h4>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {card.perks.slice(0, 3).map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="info-box alert-box">
                <h4><AlertTriangle size={16} /> Traps to Avoid</h4>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {card.catches.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slide 10: HeyMax Optimization Guide
    if (currentSlide === 9) {
      return (
        <div className="slide" id="slide-10">
          <div className="slide-header">
            <div className="slide-title-wrap">
              <button
                className="back-portfolio-btn"
                onClick={() => setCurrentSlide(1)}
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
              <h2><Wand2 style={{ color: '#0284c7' }} /> HeyMax Optimization Guide</h2>
              <p>Triple-dip miles rewards on every single online purchase</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a
                href="https://heymax.ai"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f0f9ff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #bae6fd' }}
              >
                heymax.ai <ExternalLink size={14} />
              </a>
              <span className="badge-mpd">+Max Miles</span>
            </div>
          </div>

          <div className="heymax-steps-grid">
            {HEYMAX_STEPS.map((s) => (
              <div key={s.step} className="heymax-step-card">
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="tag tag-blue" style={{ fontSize: '0.74rem' }}>Step {s.step}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4338ca' }}>{s.title}</span>
                </div>
                <img
                  src={s.image}
                  alt={s.title}
                  className="heymax-step-img"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <p style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.35, marginTop: '6px' }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Slide 11: Cheatsheet Table
    if (currentSlide === 10) {
      return (
        <div className="slide" id="slide-11">
          <div className="slide-header">
            <div className="slide-title-wrap">
              <button
                className="back-portfolio-btn"
                onClick={() => setCurrentSlide(1)}
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
              <h2><Table style={{ color: '#0284c7' }} /> Strategy Cheatsheet</h2>
              <p>Quick decision matrix for everyday couples spending</p>
            </div>
          </div>

          <div style={{ maxHeight: '380px', overflowY: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Spend Category</th>
                  <th>Primary Card</th>
                  <th style={{ textAlign: 'center' }}>MPD</th>
                  <th style={{ textAlign: 'center' }}>Monthly Cap</th>
                  <th style={{ textAlign: 'center' }}>Rounding</th>
                  <th>Strategy &amp; Notes</th>
                </tr>
              </thead>
              <tbody>
                {CHEATSHEET_DATA.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{row.category}</td>
                    <td style={{ fontWeight: 700, color: '#0284c7' }}>
                      {row.primaryCards && row.primaryCards.length > 0 ? (
                        row.primaryCards.map((c, cIdx) => (
                          <span key={cIdx}>
                            {cIdx > 0 && ' / '}
                            {c.name}
                          </span>
                        ))
                      ) : (
                        row.primaryCard
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}><span className="tag tag-green">{row.mpd.toFixed(1)}</span></td>
                    <td style={{ textAlign: 'center' }}><span className="tag tag-slate">{row.monthlyCap}</span></td>
                    <td style={{ textAlign: 'center' }}><span className={`tag ${row.rounding.includes('$5') ? 'tag-amber' : 'tag-green'}`}>{row.rounding}</span></td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>{row.strategyNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="deck-view-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="deck-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>PRESENTATION MODE</span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>(Use ← → Arrow Keys or Swipe)</span>
        </div>

        <button className="exit-deck-btn" onClick={onExit}>
          <X size={16} /> Exit Deck Mode
        </button>
      </div>

      <div className="deck-slide-viewport">
        <div className="presentation-container">
          {renderSlideContent()}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="controls">
        <button className="nav-btn" onClick={prevSlide} disabled={currentSlide === 0}>
          <ArrowLeft size={16} /> Previous
        </button>

        <div className="slide-indicator-wrap">
          <div className="slide-dots">
            {SLIDE_TITLES.map((title, idx) => (
              <div key={idx} className="slide-dot-wrap">
                <button
                  className={`slide-dot ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={title}
                />
                <div className="slide-dot-tooltip">{title}</div>
              </div>
            ))}
          </div>
          <span className="slide-counter-badge">Slide {currentSlide + 1} of {totalSlides}</span>
        </div>

        <button className="nav-btn" onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
