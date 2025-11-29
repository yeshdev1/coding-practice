import { useState } from 'react'
import './App.css'
import FrontendChallenges from './components/FrontendChallenges'
import BackendChallenges from './components/BackendChallenges'
import Home from './components/Home'

function Navigation({ currentView, setView }) {
  return (
    <nav className="main-nav">
      <button 
        className={`nav-link ${currentView === 'frontend' ? 'active' : ''}`}
        onClick={() => setView('frontend')}
      >
        Frontend
      </button>
      <button 
        className={`nav-link ${currentView === 'backend' ? 'active' : ''}`}
        onClick={() => setView('backend')}
      >
        Backend
      </button>
    </nav>
  );
}

function App() {
  const [view, setView] = useState('home') // 'home', 'frontend', 'backend'

  return (
    <div className="app-layout">
      {view !== 'home' && <Navigation currentView={view} setView={setView} />}
      
      {view === 'home' && <Home onSelect={setView} />}
      {view === 'frontend' && <FrontendChallenges />}
      {view === 'backend' && <BackendChallenges />}
    </div>
  )
}

export default App
