import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Weekend-ready practice</p>
          <h1>Ship-ready frontend & backend challenges</h1>
          <p className="lede">
            Stop tutorial-hopping. Build real features with briefs, requirements, and instant feedback across UI, CSS, React 18, and backend APIs.
          </p>
          <div className="hero-cta">
            <button className="btn primary" onClick={() => navigate('/frontend')}>
              Start a frontend challenge
            </button>
            <button className="btn ghost" onClick={() => navigate('/backend')}>
              Run a backend scenario
            </button>
          </div>
          <div className="hero-meta">
            <span>Realistic briefs</span>
            <span>Copy/paste friendly</span>
            <span>Timed runs optional</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="stat-chip">Featured</div>
          <h3>Reactive dashboard</h3>
          <p>Wire up API loading/error states, filters, and responsive cards with live preview.</p>
          <div className="pill-row">
            <span>React 18</span>
            <span>API calls</span>
            <span>State mgmt</span>
          </div>
          <button className="btn subtle" onClick={() => navigate('/react-core')}>
            Explore React Core
          </button>
        </div>
      </section>

      <section className="value">
        <div className="section-head">
          <h2>Why this beats tutorial fatigue</h2>
          <p>Hands-on tasks with specs, edge cases, and a playground that feels like production.</p>
        </div>
        <div className="value-grid">
          <div className="value-card">
            <h4>Real-world briefs</h4>
            <p>Each challenge reads like a ticket: acceptance criteria, constraints, and time guidance.</p>
          </div>
          <div className="value-card">
            <h4>Guided requirements</h4>
            <p>Checklists keep you honest on accessibility, loading/error states, and UX polish.</p>
          </div>
          <div className="value-card">
            <h4>Live playground</h4>
            <p>Edit, run, and preview in-app without setup. Copy your solution out when done.</p>
          </div>
          <div className="value-card">
            <h4>Level by track</h4>
            <p>Frontend, CSS polish, React Core fundamentals, and backend API exercises.</p>
          </div>
        </div>
      </section>

      <section className="tracks">
        <div className="section-head">
          <h2>Pick your track</h2>
          <p>Start where you’ll get the fastest win this weekend.</p>
        </div>
        <div className="track-grid">
          <div className="track-card" onClick={() => navigate('/frontend')}>
            <div className="track-badge">UI + DX</div>
            <h3>Frontend</h3>
            <p>Feature work with state, effects, data fetching, and UX details.</p>
            <span className="track-link">Jump in →</span>
          </div>
          <div className="track-card" onClick={() => navigate('/css')}>
            <div className="track-badge">Visual polish</div>
            <h3>CSS</h3>
            <p>Layout, gradients, animations, and component finishings.</p>
            <span className="track-link">Style it →</span>
          </div>
          <div className="track-card" onClick={() => navigate('/react-core')}>
            <div className="track-badge">Fundamentals</div>
            <h3>React Core</h3>
            <p>Hooks, rendering behavior, concurrency patterns, and data flows.</p>
            <span className="track-link">Level up →</span>
          </div>
          <div className="track-card" onClick={() => navigate('/backend')}>
            <div className="track-badge">APIs</div>
            <h3>Backend</h3>
            <p>REST endpoints, validation, pagination, and server logic drills.</p>
            <span className="track-link">Ship APIs →</span>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <h3>Take a challenge this weekend.</h3>
          <p>Start free, ship one feature in 30–60 minutes, and keep the code.</p>
        </div>
        <div className="banner-actions">
          <button className="btn primary" onClick={() => navigate('/frontend')}>
            Start now
          </button>
          <button className="btn ghost" onClick={() => navigate('/css')}>
            Explore CSS polish
          </button>
        </div>
      </section>
    </div>
  )
}
