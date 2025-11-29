import React from 'react'
import '../App.css'

export default function Home({ onSelect }) {
  return (
    <div className="home-container">
      <h1>Choose Your Path</h1>
      <div className="domain-cards">
        <div 
          className="domain-card frontend"
          onClick={() => onSelect('frontend')}
        >
          <h2>Frontend</h2>
          <p>Master React, Hooks, and UI/UX Patterns</p>
        </div>
        
        <div 
          className="domain-card backend"
          onClick={() => onSelect('backend')}
        >
          <h2>Backend</h2>
          <p>Build APIs, Server Logic, and Databases</p>
        </div>
      </div>
    </div>
  )
}
