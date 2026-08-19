import React from 'react';
import { Wand2, CheckCircle2, Zap, ExternalLink, Sparkles } from 'lucide-react';
import { HEYMAX_STEPS, HEYMAX_KEY_PARTNERS } from '../data/heymax';

export const HeyMaxGuide: React.FC = () => {
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
              <h2 className="heymax-hero-title">HeyMax Max Miles Optimization</h2>
              <div className="heymax-hero-subtitle">Triple-dip rewards on every online purchase</div>
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
        <p className="heymax-hero-desc">
          Stack <strong>Max Miles</strong> on top of your 4.0 MPD credit card rewards without spending an extra cent. Convert Max Miles 1:1 to 25+ airline programs with <strong>0 conversion fees</strong>.
        </p>
      </div>

      {/* 3-Step Flow Cards */}
      <div className="heymax-steps-list">
        {HEYMAX_STEPS.map((step) => (
          <div key={step.step} className="heymax-step-card">
            <div className="heymax-step-content">
              <div className="heymax-step-badge-row">
                <span className="badge-mpd" style={{ background: '#0284c7', fontSize: '0.75rem', padding: '3px 10px' }}>
                  STEP {step.step}
                </span>
                <h3 className="heymax-step-title">{step.title}</h3>
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

            <div className="heymax-step-img-box">
              <img
                src={step.image}
                alt={step.title}
                className="heymax-step-img"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Partners Grid */}
      <div className="heymax-partners-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <h3 className="heymax-partners-title" style={{ margin: 0 }}>
            <Zap size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <span>Direct 1:1 Airline &amp; Hotel Partners (0 Fee)</span>
          </h3>

          <a
            href="https://heymax.ai"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '0.82rem', color: '#0284c7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Visit heymax.ai <ExternalLink size={14} />
          </a>
        </div>

        <div className="heymax-partners-grid">
          {HEYMAX_KEY_PARTNERS.map((partner, idx) => (
            <div key={idx} className="heymax-partner-item">
              <span className="heymax-partner-name">{partner.name}</span>
              <span className="tag tag-green">{partner.ratio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
