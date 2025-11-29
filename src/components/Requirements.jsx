import React, { useState } from 'react';

export default function Requirements({ children, title = "Requirements" }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="instructions-card collapsible">
      <button 
        className="requirements-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="requirements-content">
            <ul>
                {children}
            </ul>
        </div>
      )}
    </div>
  );
}

