import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createSlug } from '../utils/slug';

export default function ChallengeCard({ challenge, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const section = location.pathname.startsWith('/frontend') ? 'frontend' : 'backend';
  
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

