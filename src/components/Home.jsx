import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <h1>Choose Your Path</h1>
      <div className="domain-cards">
        <div 
          className="domain-card frontend"
          onClick={() => navigate('/frontend')}
        >
          <h2>Frontend</h2>
          <p>Master React, Hooks, and UI/UX Patterns</p>
        </div>
        
        <div 
          className="domain-card reactcore"
          onClick={() => navigate('/react-core')}
        >
          <h2>React Core</h2>
          <p>React 18 fundamentals: rendering, hooks, concurrency</p>
        </div>
        
        <div 
          className="domain-card backend"
          onClick={() => navigate('/backend')}
        >
          <h2>Backend</h2>
          <p>Build APIs, Server Logic, and Databases</p>
        </div>
      </div>
    </div>
  )
}
