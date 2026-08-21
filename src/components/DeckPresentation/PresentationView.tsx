import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, ExternalLink, ShieldCheck, AlertTriangle, Table, Wallet, Sparkles, Wand2, Heart, CreditCard, Layers, Smartphone, Bus, Utensils, Coffee, ShoppingBag, Bike, Plane, Building2, ShoppingCart, Globe } from 'lucide-react';
import { HEYMAX_STEPS } from '../../data/heymax';
import { useLadysCategory } from '../../context/LadysCategoryContext';

interface PresentationViewProps {
  onExit: () => void;
  initialSlide?: number;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ onExit, initialSlide = 0 }) => {
  const { cardsData, cheatsheetData, categoryInfo } = useLadysCategory();
  const [currentSlide, setCurrentSlide] = useState<number>(initialSlide);
  const [cheatsheetFilter, setCheatsheetFilter] = useState<string>('all');
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isTouchingScrollable = useRef<boolean>(false);

  const slideTitles = [
    '1. Welcome ✨',
    '2. Our Card Portfolio 💳',
    '3. Citi Rewards Card 🛍️',
    '4. Citi PremierMiles Card ✈️',
    '5. UOB Preferred Visa 📱',
    `6. UOB Lady's Card ${categoryInfo.emoji}`,
    '7. KrisFlyer UOB Card 🛫',
    '8. HSBC Revolution Card 🏨',
    '9. SC Journey Card 🗺️',
    '10. HeyMax 🪄',
    '11. Cheatsheet 📊'
  ];

  const totalSlides = slideTitles.length;

  // Scroll to top of slide and inner scrollables when switching slides
  useEffect(() => {
    const slideContainer = document.querySelector('.presentation-container');
    if (slideContainer) slideContainer.scrollTop = 0;
    const activeSlide = document.querySelector('.slide');
    if (activeSlide) activeSlide.scrollTop = 0;
    const scrollables = document.querySelectorAll('.deck-scrollable, .portfolio-grid, .deck-matrix-grid, .deck-heymax-grid, .content-grid');
    scrollables.forEach((el) => { el.scrollTop = 0; });
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleCardClick = (cardId: string) => {
    const cardIdx = cardsData.findIndex((c) => c.id === cardId);
    if (cardIdx !== -1) {
      setCurrentSlide(cardIdx + 2);
    }
  };

  const renderIcon = (iconName: string, color: string) => {
    const props = { size: 16, color };
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

  // Touch Swipe handlers with scroll collision avoidance
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    isTouchingScrollable.current = !!target.closest('.deck-scrollable, table, .app-table, .deck-cheatsheet-scroll');
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only swipe if NOT inside a scrollable element and horizontal motion dominates
    if (!isTouchingScrollable.current && Math.abs(diffX) > 60 && Math.abs(diffX) > 2.2 * Math.abs(diffY)) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isTouchingScrollable.current = false;
  };

  const renderSlideContent = () => {
    // Slide 1: Welcome
    if (currentSlide === 0) {
      return (
        <div className="slide title-slide" id="slide-1" key={currentSlide}>
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

          <button
            className="start-tour-btn"
            onClick={nextSlide}
          >
            Start Strategy Tour <ArrowRight size={18} />
          </button>
        </div>
      );
    }

    // Slide 2: Card Portfolio Overview
    if (currentSlide === 1) {
      return (
        <div className="slide" id="slide-2" key={currentSlide}>
          <div className="slide-header">
            <div className="slide-title-wrap">
              <h2><Wallet style={{ color: '#0284c7' }} /> Our Card Portfolio</h2>
              <p>The 7 key credit cards powering our couple miles engine</p>
            </div>
          </div>

          <div className="portfolio-grid deck-scrollable">
            {cardsData.map((card, idx) => (
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
                <div className="port-card-info">
                  <div className="port-card-title-row">
                    <h4 className="port-card-name">{card.name}</h4>
                    <span className="rate-tag">{card.mpdNumeric >= 4 ? '4.0 MPD' : `${card.mpdNumeric.toFixed(1)} MPD`}</span>
                  </div>
                  <p className="port-card-desc">{card.tagline}</p>
                </div>
                <div className="port-card-arrow">
                  <ArrowRight size={15} />
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-bottom-links">
            <div className="port-feature-link" onClick={() => setCurrentSlide(9)}>
              <div className="port-feature-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>
                <Wand2 size={18} />
              </div>
              <div className="port-feature-text">
                <h4>
                  <span>HeyMax</span>
                  <ArrowRight size={14} />
                </h4>
                <p className="port-feature-desc">Triple-dip miles rewards on every online purchase</p>
              </div>
            </div>

            <div className="port-feature-link" onClick={() => setCurrentSlide(10)}>
              <div className="port-feature-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                <Layers size={18} />
              </div>
              <div className="port-feature-text">
                <h4>
                  <span>Cheatsheet</span>
                  <ArrowRight size={14} />
                </h4>
                <p className="port-feature-desc">Complete category-by-category decision matrix</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slides 3 to 9: Specific Cards
    if (currentSlide >= 2 && currentSlide <= 8) {
      const card = cardsData[currentSlide - 2];
      return (
        <div className="slide" id={`slide-${currentSlide + 1}`} key={currentSlide}>
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
              {card.bestCategories && card.bestCategories.length > 0 && (
                <div className="deck-card-best-for-box">
                  <div className="deck-best-for-header">
                    <Sparkles size={14} style={{ color: '#0284c7' }} />
                    <span>Best For Categories</span>
                  </div>
                  <div className="deck-best-for-chips">
                    {card.bestCategories.map((cat, idx) => (
                      <span key={idx} className="best-for-chip">
                        {cat}
                      </span>
                    ))}
                  </div>
                  {card.eligibleMccs && (
                    <div className="deck-card-mcc-row">
                      <span className="deck-mcc-lbl">MCCs:</span>
                      <span className="deck-mcc-val">{card.eligibleMccs}</span>
                    </div>
                  )}
                </div>
              )}
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
        <div className="slide" id="slide-10" key={currentSlide}>
          <div className="slide-header">
            <div className="slide-title-wrap">
              <button
                className="back-portfolio-btn"
                onClick={() => setCurrentSlide(1)}
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
              <h2><Wand2 style={{ color: '#0284c7' }} /> HeyMax</h2>
              <p>Triple-dip rewards: 4.0 MPD Card + Max Miles + Merchant Vouchers</p>
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

          <div className="deck-heymax-grid deck-scrollable">
            {HEYMAX_STEPS.map((s) => (
              <div key={s.step} className="deck-heymax-card">
                <div className="deck-heymax-card-top">
                  <span className="tag tag-blue" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>Step {s.step}</span>
                  <span className="deck-heymax-card-title">{s.title.replace(/^Step \d+:\s*/i, '')}</span>
                </div>
                <div className="deck-heymax-img-wrap">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="deck-heymax-img"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
                <p className="deck-heymax-desc">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Slide 11: Compact Strategy Cheatsheet Matrix
    if (currentSlide === 10) {
      const filteredCheatsheet = cheatsheetData.filter((r) => {
        if (cheatsheetFilter === 'all') return true;
        return r.categoryGroup === cheatsheetFilter;
      });

      return (
        <div className="slide" id="slide-11" key={currentSlide}>
          <div className="slide-header" style={{ marginBottom: '10px', paddingBottom: '8px' }}>
            <div className="slide-title-wrap">
              <button
                className="back-portfolio-btn"
                onClick={() => setCurrentSlide(1)}
              >
                <ArrowLeft size={14} /> Back to Portfolio
              </button>
              <h2><Table style={{ color: '#0284c7' }} /> Cheatsheet</h2>
            </div>
            <div className="matrix-chips-scroll" style={{ padding: 0 }}>
              <button
                className={`chip-btn ${cheatsheetFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCheatsheetFilter('all')}
                style={{ fontSize: '0.72rem', padding: '4px 10px' }}
              >
                All
              </button>
              <button
                className={`chip-btn ${cheatsheetFilter === 'everyday' ? 'active' : ''}`}
                onClick={() => setCheatsheetFilter('everyday')}
                style={{ fontSize: '0.72rem', padding: '4px 10px' }}
              >
                📱 Everyday
              </button>
              <button
                className={`chip-btn ${cheatsheetFilter === 'dining' ? 'active' : ''}`}
                onClick={() => setCheatsheetFilter('dining')}
                style={{ fontSize: '0.72rem', padding: '4px 10px' }}
              >
                🍽️ Dining
              </button>
              <button
                className={`chip-btn ${cheatsheetFilter === 'online' ? 'active' : ''}`}
                onClick={() => setCheatsheetFilter('online')}
                style={{ fontSize: '0.72rem', padding: '4px 10px' }}
              >
                🛍️ Online
              </button>
              <button
                className={`chip-btn ${cheatsheetFilter === 'travel' ? 'active' : ''}`}
                onClick={() => setCheatsheetFilter('travel')}
                style={{ fontSize: '0.72rem', padding: '4px 10px' }}
              >
                ✈️ Travel
              </button>
            </div>
          </div>

          {/* Clean Card-Based Decision Matrix */}
          <div
            className="deck-scrollable deck-cheatsheet-scroll"
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div className="deck-matrix-grid">
              {filteredCheatsheet.map((row, idx) => (
                <div key={idx} className="deck-matrix-card">
                  <div className="deck-matrix-card-header">
                    <div className="deck-matrix-card-cat">
                      <div className="td-icon-box" style={{ background: `${row.iconColor}15`, width: '28px', height: '28px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {renderIcon(row.icon, row.iconColor)}
                      </div>
                      <span className="deck-matrix-card-title">{row.category}</span>
                    </div>
                    <span className={`tag ${row.mpd >= 4.0 ? 'tag-green' : row.mpd >= 3.0 ? 'tag-blue' : 'tag-slate'}`} style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                      {row.mpd.toFixed(1)} MPD
                    </span>
                  </div>

                  <div className="deck-matrix-card-footer">
                    <div className="deck-matrix-cards-wrap">
                      <span className="deck-matrix-lbl">Best:</span>
                      {row.primaryCards && row.primaryCards.length > 0 ? (
                        row.primaryCards.map((c, cIdx) => (
                          <button
                            key={cIdx}
                            className="deck-card-pill-btn"
                            onClick={() => handleCardClick(c.cardId)}
                            title={`Jump to ${c.name} slide`}
                          >
                            {c.name}
                          </button>
                        ))
                      ) : (
                        <button
                          className="deck-card-pill-btn"
                          onClick={() => handleCardClick(row.cardId)}
                          title={`Jump to ${row.primaryCard} slide`}
                        >
                          {row.primaryCard}
                        </button>
                      )}
                    </div>

                    <div className="deck-matrix-cap-wrap">
                      <span className="deck-matrix-cap-text">{row.monthlyCap}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>DECK MODE</span>
        </div>

        <button className="exit-deck-btn" onClick={onExit}>
          <X size={16} /> Exit Deck
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
            {slideTitles.map((title, idx) => (
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
