import React, { useMemo } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const EMOJIS = ['💖', '✨', '🛫', '⭐', '☁️', '🌸', '🪄', '💳'];

export const CuteParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: Math.round(Math.random() * 95),
      duration: Math.round(10 + Math.random() * 14),
      delay: Math.round(Math.random() * 10),
      size: Math.round(14 + Math.random() * 12),
      opacity: Number((0.15 + Math.random() * 0.2).toFixed(2))
    }));
  }, []);

  return (
    <div className="cute-particles-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}px`,
            opacity: p.opacity
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default CuteParticles;
