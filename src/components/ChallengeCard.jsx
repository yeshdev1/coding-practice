import React from 'react';

export default function ChallengeCard({ challenge, onClick }) {
  return (
    <button 
      className={`challenge-card ${challenge.difficulty}`}
      onClick={() => onClick(challenge.id)}
    >
      <span className="time-badge">{challenge.expectedTime}</span>
      <span className="plevel-badge">{challenge.pLevel.toUpperCase()}</span>
      {challenge.title}
    </button>
  )
}

