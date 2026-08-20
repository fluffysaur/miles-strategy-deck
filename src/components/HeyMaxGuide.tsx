import React, { useState } from 'react';
import { Wand2, CheckCircle2, Zap, ExternalLink, Sparkles, ZoomIn, X, Gift, CreditCard, Layers } from 'lucide-react';
import { HEYMAX_STEPS, HEYMAX_KEY_PARTNERS } from '../data/heymax';

export const HeyMaxGuide: React.FC = () => {
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="heymax-page-container">
      {/* Hero Banner */}
      <div className="heymax-hero-banner">
        <div className="heymax-hero-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="heymax-icon-circle">
              <Wand2 size={24} />
            </div>
            <div>
              <h2 className="heymax-hero-title">HeyMax Stacking Guide</h2>
              <div className="heymax-hero-subtitle">Triple-dip miles rewards on every online purchase</div>
            </div>
          </div>

          <a
            href="https://heymax.ai"
            target="_blank"
            rel="noreferrer"
            className="heymax-visit-btn"
          >
            <Sparkles size={15} />
            <span>Open HeyMax.ai</span>
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="heymax-stats-row">
          <div className="heymax-stat-pill">
            <Gift size={14} style={{ color: '#38bdf8' }} />
            <span><strong>+1.0 to 10.0</strong> Max Miles / $1</span>
          </div>
          <div className="heymax-stat-pill">
            <CreditCard size={14} style={{ color: '#4ade80' }} />
            <span><strong>4.0 MPD</strong> Card Rewards Stacked</span>
          </div>
          <div className="heymax-stat-pill">
            <Layers size={14} style={{ color: '#f472b6' }} />
            <span><strong>25+ Airlines</strong> (1:1 &amp; S$0 Fee)</span>
          </div>
        </div>
      </div>

      {/* 3-Step Flow Cards */}
      <div className="heymax-steps-list">
        {HEYMAX_STEPS.map((step) => (
          <div key={step.step} className="heymax-step-card">
            <div className="heymax-step-content">
              <div className="heymax-step-badge-row">
                <span className="badge-step-number">
                  STEP {step.step}
                </span>
                <h3 className="heymax-step-title">{step.title.replace(/^Step \d+:\s*/i, '')}</h3>
              </div>

              <p className="heymax-step-description">{step.description}</p>

              <div className="heymax-step-tips">
                {step.tips.map((tip, idx) => (
                  <div key={idx} className="heymax-tip-item">
                    <CheckCircle2 size={16} className="heymax-tip-icon" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="heymax-step-img-box"
              onClick={() => setZoomImage({ src: step.image, title: step.title })}
              title="Click to view full image"
            >
              <img
                src={step.image}
                alt={step.title}
                className="heymax-step-img"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="heymax-img-zoom-hint">
                <ZoomIn size={14} />
                <span>Tap to enlarge</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Partners Grid */}
      <div className="heymax-partners-wrapper">
        <div className="heymax-partners-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <h3 className="heymax-partners-title">1:1 Transfer Partners (0 Conversion Fees)</h3>
          </div>

          <a
            href="https://heymax.ai"
            target="_blank"
            rel="noreferrer"
            className="heymax-partner-link"
          >
            Explore all 25+ partners <ExternalLink size={13} />
          </a>
        </div>

        <div className="heymax-partners-grid">
          {HEYMAX_KEY_PARTNERS.map((partner, idx) => (
            <div key={idx} className="heymax-partner-item">
              <span className="heymax-partner-name">{partner.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="tag tag-green">{partner.ratio}</span>
                <span className="tag tag-slate" style={{ fontSize: '0.68rem' }}>{partner.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {zoomImage && (
        <div className="heymax-lightbox-overlay" onClick={() => setZoomImage(null)}>
          <div className="heymax-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="heymax-lightbox-header">
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{zoomImage.title}</span>
              <button className="heymax-lightbox-close" onClick={() => setZoomImage(null)}>
                <X size={18} />
              </button>
            </div>
            <img src={zoomImage.src} alt={zoomImage.title} className="heymax-lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
};
