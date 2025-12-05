import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createSlug } from '../utils/slug';

export default function ChallengeCard({ challenge, onClick, section: explicitSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const audioCtxRef = React.useRef(null);
  const lastTickRef = React.useRef(0);
  const derivedSection = location.pathname.startsWith('/frontend')
    ? 'frontend'
    : location.pathname.startsWith('/css')
      ? 'css'
    : location.pathname.startsWith('/react-core')
      ? 'react-core'
      : 'backend';
  const section = explicitSection || derivedSection;
  
  const playTick = () => {
    const now = performance.now();
    // Debounce: only one tick per second across cards
    if (now - lastTickRef.current < 3000) return;
    lastTickRef.current = now;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 650;
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // fail silently; audio is non-critical
    }
  };
  
  const handleClick = () => {
    if (challenge.slug) {
      navigate(`/${section}/${challenge.slug}`);
    } else if (onClick) {
      // Fallback for challenges without slug (backward compatibility)
      onClick(challenge.id);
    }
  };

  return (
    <button 
      className={`challenge-card ${challenge.difficulty}`}
      onClick={handleClick}
      onMouseEnter={playTick}
      onFocus={playTick}
    >
      <span className="time-badge">{challenge.expectedTime}</span>
      <span className="plevel-badge">{challenge.pLevel.toUpperCase()}</span>
      {challenge.title}
    </button>
  )
}

