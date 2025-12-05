import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import FrontendChallenges from './components/FrontendChallenges'
import BackendChallenges from './components/BackendChallenges'
import Home from './components/Home'

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const isFrontend = location.pathname.startsWith('/frontend')
  const isBackend = location.pathname.startsWith('/backend')

  return (
    <nav className="main-nav">
      <button 
        className={`nav-link ${isFrontend ? 'active' : ''}`}
        onClick={() => navigate('/frontend')}
      >
        Frontend
      </button>
      <button 
        className={`nav-link ${isBackend ? 'active' : ''}`}
        onClick={() => navigate('/backend')}
      >
        Backend
      </button>
    </nav>
  );
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // On initial load, if ?p=<path> is present (from 404 fallback), navigate there
  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const p = params.get('p')
    if (p) {
      const target = p.startsWith('/') ? p : `/${p}`
      // Replace to avoid polluting history
      navigate(target, { replace: true })
    }
  // we intentionally only react to location.search to avoid loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const showNav = location.pathname.startsWith('/frontend') || location.pathname.startsWith('/backend')

  return (
    <div className="app-layout">
      {showNav && <Navigation />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/frontend" element={<FrontendChallenges />} />
        <Route path="/frontend/:slug" element={<FrontendChallenges />} />
        <Route path="/backend" element={<BackendChallenges />} />
        <Route path="/backend/:slug" element={<BackendChallenges />} />
      </Routes>
    </div>
  )
}

export default App
