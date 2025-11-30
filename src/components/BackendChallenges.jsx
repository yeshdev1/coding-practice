import { useState, useMemo } from 'react'
import '../App.css'
import ChallengeCard from './ChallengeCard'
import BackendChallengeRunner from './BackendChallengeRunner'
import { backendChallenges } from '../challenges/backend/data'

export default function BackendChallenges() {
  const [activeChallengeId, setActiveChallengeId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedPLevel, setSelectedPLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const activeChallenge = useMemo(() => 
    backendChallenges.find(c => c.id === activeChallengeId), 
    [activeChallengeId]
  );

  const filteredChallenges = useMemo(() => {
    return backendChallenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty
      const matchesPLevel = selectedPLevel === 'all' || challenge.pLevel === selectedPLevel
      const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory
      return matchesSearch && matchesDifficulty && matchesPLevel && matchesCategory
    })
  }, [searchTerm, selectedDifficulty, selectedPLevel, selectedCategory])

  // Group challenges by difficulty for display based on filtered results
  const groupedChallenges = {
    easy: filteredChallenges.filter(c => c.difficulty === 'easy'),
    medium: filteredChallenges.filter(c => c.difficulty === 'medium'),
    hard: filteredChallenges.filter(c => c.difficulty === 'hard'),
    expert: filteredChallenges.filter(c => c.difficulty === 'expert'),
  }

  if (activeChallenge) {
    return (
      <div className="challenge-view-container">
        <div className="challenge-header">
           <button className="back-button" onClick={() => setActiveChallengeId(null)}>
            ← Back to Challenges
          </button>
        </div>
        <div className="challenge-workspace">
          <BackendChallengeRunner challenge={activeChallenge} />
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Backend Coding Challenges</h1>

        {/* Search and Filter Controls */}
        <div className="controls-container">
            {/* Search Bar */}
            <div className="search-wrapper">
                <label htmlFor="search">Search Challenges</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="filters-wrapper">
                <div className="filter-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                        id="difficulty"
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                        <option value="all">All Levels</option>
                        <option value="easy">🟢 Easy</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="hard">🔴 Hard</option>
                        <option value="expert">🟣 Expert</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="plevel">Priority Level</label>
                    <select
                        id="plevel"
                        value={selectedPLevel}
                        onChange={(e) => setSelectedPLevel(e.target.value)}
                    >
                        <option value="all">All Priorities</option>
                        <option value="p0">P0 - Must do</option>
                        <option value="p1">P1 - Should do</option>
                        <option value="p2">P2 - Good to do</option>
                        <option value="p3">P3 - Knowledge Upskiller</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="dsa">DSA</option>
                        <option value="core">Core BE</option>
                        <option value="systems">Systems</option>
                    </select>
                </div>
            </div>
        </div>
      </header>

      <main>
        <div className="challenge-list">
          
          {groupedChallenges.easy.length > 0 && (
            <section>
                <h2 className="difficulty-header easy">🟢 Easy (Foundational)</h2>
                <div className="grid">
                {groupedChallenges.easy.map((challenge) => (
                    <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    onClick={setActiveChallengeId} 
                    />
                ))}
                </div>
            </section>
          )}

          {groupedChallenges.medium.length > 0 && (
            <section>
                <h2 className="difficulty-header medium">🟡 Medium (Intermediate)</h2>
                <div className="grid">
                {groupedChallenges.medium.map((challenge) => (
                    <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    onClick={setActiveChallengeId} 
                    />
                ))}
                </div>
            </section>
          )}

          {groupedChallenges.hard.length > 0 && (
            <section>
                <h2 className="difficulty-header hard">🔴 Hard (Advanced)</h2>
                <div className="grid">
                {groupedChallenges.hard.map((challenge) => (
                    <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    onClick={setActiveChallengeId} 
                    />
                ))}
                </div>
            </section>
          )}

          {groupedChallenges.expert.length > 0 && (
            <section>
                <h2 className="difficulty-header expert">🟣 Expert (Mastery)</h2>
                <div className="grid">
                {groupedChallenges.expert.map((challenge) => (
                    <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    onClick={setActiveChallengeId} 
                    />
                ))}
                </div>
            </section>
          )}
          
           {filteredChallenges.length === 0 && (
             <div className="no-results">
               No challenges match your search criteria.
             </div>
           )}

        </div>
      </main>
    </div>
  )
}
