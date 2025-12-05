import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createSlug } from '../utils/slug';

export default function ChallengeCard({ challenge, onClick, section: explicitSection }) {
  const navigate = useNavigate();
  const location = useLocation();
  const derivedSection = location.pathname.startsWith('/frontend')
    ? 'frontend'
    : location.pathname.startsWith('/css')
      ? 'css'
    : location.pathname.startsWith('/react-core')
      ? 'react-core'
      : 'backend';
  const section = explicitSection || derivedSection;

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
    >
      <span className="time-badge">{challenge.expectedTime}</span>
      <span className="plevel-badge">{challenge.pLevel.toUpperCase()}</span>
      {challenge.title}
    </button>
  )
}

