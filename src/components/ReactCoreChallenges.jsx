import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getAllReactCoreChallenges, getReactCoreChallengeBySlug } from '../challenges/react-core';
import ChallengeCard from './ChallengeCard';
import CodePlayground from './CodePlayground';
import '../App.css';

export default function ReactCoreChallenges() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const challenges = useMemo(() => getAllReactCoreChallenges(), []);

  const activeChallenge = slug ? getReactCoreChallengeBySlug(slug) : null;

  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [challenges, searchTerm, selectedDifficulty, selectedCategory]);

  if (activeChallenge) {
    return (
      <div className="challenge-view-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <div className="challenge-header" style={{ flexShrink: 0 }}>
          <button className="back-button" onClick={() => navigate('/react-core')}>
            ← Back to React Core Journey
          </button>
        </div>
        
        {/* Description above, scrollable like backend */}
        <div className="description-panel" style={{ 
          backgroundColor: '#1e1e1e', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          border: '1px solid #333', 
          flex: '0 0 auto',
          overflowY: 'auto',
          maxHeight: '35vh',
          margin: '0 20px 16px'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>
            {activeChallenge.title}
          </h2>
          <div className="description-markdown" style={{ color: '#ccc', lineHeight: '1.6' }}>
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '1.5rem', marginBottom: '0.8rem' }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '1.2rem', marginBottom: '0.8rem' }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: '1.1rem', color: '#fff', marginTop: '1rem', marginBottom: '0.6rem' }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: '1rem' }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: '0.4rem' }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ color: '#fff', fontWeight: 'bold' }} {...props} />,
                code: ({node, inline, className, children, ...props}) => {
                  return !inline ? (
                    <pre style={{ background: '#2d2d2d', padding: '12px', borderRadius: '6px', overflowX: 'auto', marginBottom: '1rem', border: '1px solid #444' }}>
                      <code className={className} {...props} style={{ fontFamily: 'monospace', color: '#9cdcfe', fontSize: '0.9rem', display: 'block' }}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={className} {...props} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '3px', fontFamily: 'monospace', color: '#e0e0e0', fontSize: '0.9rem' }}>
                      {children}
                    </code>
                  )
                },
                blockquote: ({node, ...props}) => (
                  <blockquote style={{ borderLeft: '4px solid #646cff', margin: '0 0 1rem 0', padding: '0.5rem 1rem', background: 'rgba(100, 108, 255, 0.1)', color: '#ddd', fontStyle: 'italic' }} {...props} />
                ),
                a: ({node, ...props}) => <a style={{ color: '#646cff', textDecoration: 'none' }} {...props} />
              }}
            >
              {activeChallenge.description}
            </ReactMarkdown>
          </div>
        </div>

        <div className="challenge-workspace" style={{ flex: 1, overflow: 'auto', padding: '0 20px 20px', minHeight: '60vh' }}>
          <div style={{ height: '100%', minHeight: '60vh', display: 'flex' }}>
            <CodePlayground
              initialCode={activeChallenge.initialCode}
              expectedTime={activeChallenge.expectedTime}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Core Journey</h1>
        <p style={{ color: '#ccc', maxWidth: 900 }}>
          Practice React 18 fundamentals: rendering, effects, memoization, refs, fragments, and
          concurrent features.
        </p>

        <div className="controls-container">
          <div className="search-wrapper">
            <label htmlFor="search">Search React Core</label>
            <input
              id="search"
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters-wrapper">
            <div className="filter-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All</option>
                <option value="easy">🟢 Easy</option>
                <option value="medium">🟡 Medium</option>
                <option value="hard">🔴 Hard</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value="rendering">Rendering</option>
                <option value="effects">Effects</option>
                <option value="performance">Performance</option>
                <option value="refs">Refs</option>
                <option value="concurrency">Concurrency</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <section className="challenge-list">
        <div className="difficulty-header">All React Core Challenges</div>
        <div className="grid">
          {filtered.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              section="react-core"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
