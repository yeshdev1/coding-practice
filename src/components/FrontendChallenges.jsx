import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

// Easy Challenges
import CounterWithHistory from '../challenges/CounterWithHistory'
import TodoList from '../challenges/TodoList'
import ApiDataFetcher from '../challenges/ApiDataFetcher'
import SimpleFormValidation from '../challenges/SimpleFormValidation'
import ToggleButton from '../challenges/ToggleButton'
import CharacterCounter from '../challenges/CharacterCounter'
import ShowHidePassword from '../challenges/ShowHidePassword'
import Accordion from '../challenges/Accordion'
import LikeButton from '../challenges/LikeButton'
import ColorPicker from '../challenges/ColorPicker'
import ListFilter from '../challenges/ListFilter'
import SimplePagination from '../challenges/SimplePagination'
import DarkModeToggle from '../challenges/DarkModeToggle'
import TextMirror from '../challenges/TextMirror'

// Medium Challenges (Common Patterns)
import DebouncedSearchBar from '../challenges/DebouncedSearchBar'
import InfiniteScroll from '../challenges/InfiniteScroll'
import StarRating from '../challenges/StarRating'
import ModalSystem from '../challenges/ModalSystem'
import TrafficLight from '../challenges/TrafficLight'
import ProgressBar from '../challenges/ProgressBar'
import Carousel from '../challenges/Carousel'
import Stopwatch from '../challenges/Stopwatch'
import Tabs from '../challenges/Tabs'
import TicTacToe from '../challenges/TicTacToe'

// Medium Challenges (Specific Hooks)
import UseReducerCounter from '../challenges/UseReducerCounter'
import UseMemoList from '../challenges/UseMemoList'
import UseCallbackToolbar from '../challenges/UseCallbackToolbar'
import UseRefTimer from '../challenges/UseRefTimer'
import UseLayoutEffectTooltip from '../challenges/UseLayoutEffectTooltip'
import UseImperativeHandleModal from '../challenges/UseImperativeHandleModal'
import UseDeferredValueSearch from '../challenges/UseDeferredValueSearch'
import UseTransitionTabs from '../challenges/UseTransitionTabs'
import UseIdForm from '../challenges/UseIdForm'

// Medium Challenges (Timer/Intervals)
import AutoDismissAlerts from '../challenges/AutoDismissAlerts'
import CountdownTimer from '../challenges/CountdownTimer'


// Hard Challenges
import NestedComments from '../challenges/NestedComments'
import VirtualList from '../challenges/VirtualList'
import DragAndDropBoard from '../challenges/DragAndDropBoard'
import ContextFormBuilder from '../challenges/ContextFormBuilder'
import AdvancedCustomHooks from '../challenges/AdvancedCustomHooks'
import DeepUseEffect from '../challenges/DeepUseEffect'
import DeepUseReducer from '../challenges/DeepUseReducer'
import DeepContextPerformance from '../challenges/DeepContextPerformance'
import DeepRefLifecycle from '../challenges/DeepRefLifecycle'
import VirtualDomOptimization from '../challenges/VirtualDomOptimization'
import WorkerOffloading from '../challenges/WorkerOffloading'

// Expert Challenges
import CollaborativeSpreadsheet from '../challenges/CollaborativeSpreadsheet'
import MiniFigma from '../challenges/MiniFigma'
import BrowserIDE from '../challenges/BrowserIDE'
import OfflineChat from '../challenges/OfflineChat'


// Hard Challenges (Timer/Intervals)
import GameLoop from '../challenges/GameLoop'
import PacketThrottler from '../challenges/PacketThrottler'
import ChallengeCard from './ChallengeCard'

const challenges = [
    // P0 - Must do
    { id: 'counter', title: 'Counter with History', difficulty: 'easy', pLevel: 'p0', expectedTime: '20m', component: <CounterWithHistory />, slug: 'counter-with-history' },
    { id: 'todo', title: 'Todo List', difficulty: 'easy', pLevel: 'p0', expectedTime: '25m', component: <TodoList />, slug: 'todo-list' },
    { id: 'api', title: 'API Data Fetcher', difficulty: 'easy', pLevel: 'p0', expectedTime: '15m', component: <ApiDataFetcher />, slug: 'api-data-fetcher' },
    { id: 'form', title: 'Simple Form Validation', difficulty: 'easy', pLevel: 'p0', expectedTime: '30m', component: <SimpleFormValidation />, slug: 'simple-form-validation' },
    { id: 'toggle', title: 'Toggle Button', difficulty: 'easy', pLevel: 'p0', expectedTime: '10m', component: <ToggleButton />, slug: 'toggle-button' },
    { id: 'charcount', title: 'Character Counter', difficulty: 'easy', pLevel: 'p0', expectedTime: '15m', component: <CharacterCounter />, slug: 'character-counter' },
    { id: 'password', title: 'Show/Hide Password', difficulty: 'easy', pLevel: 'p0', expectedTime: '10m', component: <ShowHidePassword />, slug: 'show-hide-password' },
    { id: 'accordion', title: 'Accordion', difficulty: 'easy', pLevel: 'p0', expectedTime: '20m', component: <Accordion />, slug: 'accordion' },
    { id: 'like', title: 'Like Button', difficulty: 'easy', pLevel: 'p0', expectedTime: '15m', component: <LikeButton />, slug: 'like-button' },
    { id: 'color', title: 'Color Picker', difficulty: 'easy', pLevel: 'p0', expectedTime: '20m', component: <ColorPicker />, slug: 'color-picker' },
    { id: 'filter', title: 'List Filter', difficulty: 'easy', pLevel: 'p0', expectedTime: '20m', component: <ListFilter />, slug: 'list-filter' },
    { id: 'pagination', title: 'Simple Pagination', difficulty: 'easy', pLevel: 'p0', expectedTime: '25m', component: <SimplePagination />, slug: 'simple-pagination' },
    { id: 'darkmode', title: 'Dark Mode Toggle', difficulty: 'easy', pLevel: 'p0', expectedTime: '15m', component: <DarkModeToggle />, slug: 'dark-mode-toggle' },
    { id: 'mirror', title: 'Text Mirror', difficulty: 'easy', pLevel: 'p0', expectedTime: '10m', component: <TextMirror />, slug: 'text-mirror' },
    { id: 'search', title: 'Debounced Search Bar', difficulty: 'medium', pLevel: 'p0', expectedTime: '25m', component: <DebouncedSearchBar />, slug: 'debounced-search-bar' },
    { id: 'usereducer', title: 'Complex Counter (useReducer)', difficulty: 'medium', pLevel: 'p0', expectedTime: '20m', component: <UseReducerCounter />, slug: 'complex-counter-usereducer' },
    { id: 'usememo', title: 'Expensive List (useMemo)', difficulty: 'medium', pLevel: 'p0', expectedTime: '20m', component: <UseMemoList />, slug: 'expensive-list-usememo' },
    { id: 'usecallback', title: 'Toolbar Optimization (useCallback)', difficulty: 'medium', pLevel: 'p0', expectedTime: '20m', component: <UseCallbackToolbar />, slug: 'toolbar-optimization-usecallback' },
    { id: 'useref', title: 'Timer & DOM (useRef)', difficulty: 'medium', pLevel: 'p0', expectedTime: '25m', component: <UseRefTimer />, slug: 'timer-dom-useref' },
    { id: 'deepeffect', title: 'Deep useEffect Synchronization', difficulty: 'hard', pLevel: 'p0', expectedTime: '45m', component: <DeepUseEffect />, slug: 'deep-useeffect-synchronization' },
    { id: 'deepreducer', title: 'Full State Machine (useReducer)', difficulty: 'hard', pLevel: 'p0', expectedTime: '50m', component: <DeepUseReducer />, slug: 'full-state-machine-usereducer' },
    { id: 'builder', title: 'Context Form Builder', difficulty: 'hard', pLevel: 'p0', expectedTime: '60m', component: <ContextFormBuilder />, slug: 'context-form-builder' },

    // P1 - Should do
    { id: 'infinite', title: 'Infinite Scroll', difficulty: 'medium', pLevel: 'p1', expectedTime: '40m', component: <InfiniteScroll />, slug: 'infinite-scroll' },
    { id: 'star', title: 'Star Rating', difficulty: 'medium', pLevel: 'p1', expectedTime: '30m', component: <StarRating />, slug: 'star-rating' },
    { id: 'modal', title: 'Modal System', difficulty: 'medium', pLevel: 'p1', expectedTime: '35m', component: <ModalSystem />, slug: 'modal-system' },
    { id: 'traffic', title: 'Traffic Light', difficulty: 'medium', pLevel: 'p1', expectedTime: '25m', component: <TrafficLight />, slug: 'traffic-light' },
    { id: 'progress', title: 'Progress Bar', difficulty: 'medium', pLevel: 'p1', expectedTime: '20m', component: <ProgressBar />, slug: 'progress-bar' },
    { id: 'carousel', title: 'Image Carousel', difficulty: 'medium', pLevel: 'p1', expectedTime: '40m', component: <Carousel />, slug: 'image-carousel' },
    { id: 'stopwatch', title: 'Stopwatch', difficulty: 'medium', pLevel: 'p1', expectedTime: '25m', component: <Stopwatch />, slug: 'stopwatch' },
    { id: 'tabs', title: 'Tabs Component', difficulty: 'medium', pLevel: 'p1', expectedTime: '30m', component: <Tabs />, slug: 'tabs-component' },
    { id: 'alerts', title: 'Auto-Dismiss Alerts (Toast)', difficulty: 'medium', pLevel: 'p1', expectedTime: '35m', component: <AutoDismissAlerts />, slug: 'auto-dismiss-alerts-toast' },
    { id: 'countdown', title: 'Countdown Timer', difficulty: 'medium', pLevel: 'p1', expectedTime: '25m', component: <CountdownTimer />, slug: 'countdown-timer' },
    { id: 'uselayouteffect', title: 'Tooltip Positioning (useLayoutEffect)', difficulty: 'medium', pLevel: 'p1', expectedTime: '30m', component: <UseLayoutEffectTooltip />, slug: 'tooltip-positioning-uselayouteffect' },
    { id: 'virtual', title: 'Virtual List', difficulty: 'hard', pLevel: 'p1', expectedTime: '60m', component: <VirtualList />, slug: 'virtual-list' },
    { id: 'deepcontext', title: 'Context Performance Optimization', difficulty: 'hard', pLevel: 'p1', expectedTime: '50m', component: <DeepContextPerformance />, slug: 'context-performance-optimization' },
    { id: 'advhooks', title: 'Advanced Custom Hooks System', difficulty: 'hard', pLevel: 'p1', expectedTime: '55m', component: <AdvancedCustomHooks />, slug: 'advanced-custom-hooks-system' },

    // P2 - Good to do
    { id: 'tictactoe', title: 'Tic Tac Toe', difficulty: 'medium', pLevel: 'p2', expectedTime: '45m', component: <TicTacToe />, slug: 'tic-tac-toe' },
    { id: 'useimperativehandle', title: 'Modal API (useImperativeHandle)', difficulty: 'medium', pLevel: 'p2', expectedTime: '30m', component: <UseImperativeHandleModal />, slug: 'modal-api-useimperativehandle' },
    { id: 'usedeferredvalue', title: 'Responsive Search (useDeferredValue)', difficulty: 'medium', pLevel: 'p2', expectedTime: '25m', component: <UseDeferredValueSearch />, slug: 'responsive-search-usedeferredvalue' },
    { id: 'usetransition', title: 'Tab Transition (useTransition)', difficulty: 'medium', pLevel: 'p2', expectedTime: '25m', component: <UseTransitionTabs />, slug: 'tab-transition-usetransition' },
    { id: 'useid', title: 'Accessible Form (useId)', difficulty: 'medium', pLevel: 'p2', expectedTime: '20m', component: <UseIdForm />, slug: 'accessible-form-useid' },
    { id: 'comments', title: 'Nested Comments', difficulty: 'hard', pLevel: 'p2', expectedTime: '50m', component: <NestedComments />, slug: 'nested-comments' },
    { id: 'dnd', title: 'Drag and Drop Board', difficulty: 'hard', pLevel: 'p2', expectedTime: '60m', component: <DragAndDropBoard />, slug: 'drag-and-drop-board' },
    { id: 'deepref', title: 'Legacy Integration (Refs & Lifecycle)', difficulty: 'hard', pLevel: 'p2', expectedTime: '45m', component: <DeepRefLifecycle />, slug: 'legacy-integration-refs-lifecycle' },
    { id: 'vdom', title: 'Virtual DOM vs Direct DOM Optimization', difficulty: 'hard', pLevel: 'p2', expectedTime: '60m', component: <VirtualDomOptimization />, slug: 'virtual-dom-vs-direct-dom-optimization' },
    { id: 'worker', title: 'Worker Pool & Offloading', difficulty: 'hard', pLevel: 'p2', expectedTime: '60m', component: <WorkerOffloading />, slug: 'worker-pool-offloading' },
    { id: 'gameloop', title: 'High-Frequency Game Loop', difficulty: 'hard', pLevel: 'p2', expectedTime: '45m', component: <GameLoop />, slug: 'high-frequency-game-loop' },
    { id: 'throttler', title: 'Async Packet Throttler', difficulty: 'hard', pLevel: 'p2', expectedTime: '40m', component: <PacketThrottler />, slug: 'async-packet-throttler' },
    
    // Expert Challenges (P2)
    { id: 'spreadsheet', title: 'Collaborative Spreadsheet Engine', difficulty: 'expert', pLevel: 'p2', expectedTime: '90m+', component: <CollaborativeSpreadsheet />, slug: 'collaborative-spreadsheet-engine' },
    { id: 'minifigma', title: 'Mini Figma (Vector Editor)', difficulty: 'expert', pLevel: 'p2', expectedTime: '120m+', component: <MiniFigma />, slug: 'mini-figma-vector-editor' },
    { id: 'browseride', title: 'Browser IDE (File System)', difficulty: 'expert', pLevel: 'p2', expectedTime: '90m+', component: <BrowserIDE />, slug: 'browser-ide-file-system' },
    { id: 'offlinechat', title: 'Offline-First Chat App', difficulty: 'expert', pLevel: 'p2', expectedTime: '75m+', component: <OfflineChat />, slug: 'offline-first-chat-app' },
  ]

function FrontendChallenges() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedPLevel, setSelectedPLevel] = useState('all')

  // Find active challenge by slug
  const activeChallenge = useMemo(() => {
    if (!slug) return null
    return challenges.find(c => c.slug === slug)
  }, [slug])

  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty
      const matchesPLevel = selectedPLevel === 'all' || challenge.pLevel === selectedPLevel
      return matchesSearch && matchesDifficulty && matchesPLevel
    })
  }, [searchTerm, selectedDifficulty, selectedPLevel])

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
           <button className="back-button" onClick={() => navigate('/frontend')}>
            ← Back to Challenges
          </button>
        </div>
        <div className="challenge-workspace">
          {activeChallenge.component}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logos">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Frontend Coding Challenges</h1>

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


export default FrontendChallenges
