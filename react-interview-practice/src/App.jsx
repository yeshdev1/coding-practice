import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Easy Challenges
import CounterWithHistory from './challenges/CounterWithHistory'
import TodoList from './challenges/TodoList'
import ApiDataFetcher from './challenges/ApiDataFetcher'
import SimpleFormValidation from './challenges/SimpleFormValidation'

// Medium Challenges (Common Patterns)
import DebouncedSearchBar from './challenges/DebouncedSearchBar'
import InfiniteScroll from './challenges/InfiniteScroll'
import StarRating from './challenges/StarRating'
import ModalSystem from './challenges/ModalSystem'
import TrafficLight from './challenges/TrafficLight'
import ProgressBar from './challenges/ProgressBar'
import Carousel from './challenges/Carousel'
import Stopwatch from './challenges/Stopwatch'
import Tabs from './challenges/Tabs'
import TicTacToe from './challenges/TicTacToe'

// Medium Challenges (Specific Hooks)
import UseReducerCounter from './challenges/UseReducerCounter'
import UseMemoList from './challenges/UseMemoList'
import UseCallbackToolbar from './challenges/UseCallbackToolbar'
import UseRefTimer from './challenges/UseRefTimer'
import UseLayoutEffectTooltip from './challenges/UseLayoutEffectTooltip'
import UseImperativeHandleModal from './challenges/UseImperativeHandleModal'
import UseDeferredValueSearch from './challenges/UseDeferredValueSearch'
import UseTransitionTabs from './challenges/UseTransitionTabs'
import UseIdForm from './challenges/UseIdForm'

// Medium Challenges (Timer/Intervals)
import AutoDismissAlerts from './challenges/AutoDismissAlerts'
import CountdownTimer from './challenges/CountdownTimer'


// Hard Challenges
import NestedComments from './challenges/NestedComments'
import VirtualList from './challenges/VirtualList'
import DragAndDropBoard from './challenges/DragAndDropBoard'
import ContextFormBuilder from './challenges/ContextFormBuilder'
import AdvancedCustomHooks from './challenges/AdvancedCustomHooks'
import DeepUseEffect from './challenges/DeepUseEffect'
import DeepUseReducer from './challenges/DeepUseReducer'
import DeepContextPerformance from './challenges/DeepContextPerformance'
import DeepRefLifecycle from './challenges/DeepRefLifecycle'
import VirtualDomOptimization from './challenges/VirtualDomOptimization'
import WorkerOffloading from './challenges/WorkerOffloading'

// Expert Challenges
import CollaborativeSpreadsheet from './challenges/CollaborativeSpreadsheet'


// Hard Challenges (Timer/Intervals)
import GameLoop from './challenges/GameLoop'
import PacketThrottler from './challenges/PacketThrottler'

function App() {
  const [activeChallenge, setActiveChallenge] = useState(null)

  const challenges = [
    // Easy
    { id: 'counter', title: 'Counter with History', difficulty: 'easy', component: <CounterWithHistory /> },
    { id: 'todo', title: 'Todo List', difficulty: 'easy', component: <TodoList /> },
    { id: 'api', title: 'API Data Fetcher', difficulty: 'easy', component: <ApiDataFetcher /> },
    { id: 'form', title: 'Simple Form Validation', difficulty: 'easy', component: <SimpleFormValidation /> },
    
    // Medium - Patterns
    { id: 'search', title: 'Debounced Search Bar', difficulty: 'medium', component: <DebouncedSearchBar /> },
    { id: 'infinite', title: 'Infinite Scroll', difficulty: 'medium', component: <InfiniteScroll /> },
    { id: 'star', title: 'Star Rating', difficulty: 'medium', component: <StarRating /> },
    { id: 'modal', title: 'Modal System', difficulty: 'medium', component: <ModalSystem /> },
    { id: 'traffic', title: 'Traffic Light', difficulty: 'medium', component: <TrafficLight /> },
    { id: 'progress', title: 'Progress Bar', difficulty: 'medium', component: <ProgressBar /> },
    { id: 'carousel', title: 'Image Carousel', difficulty: 'medium', component: <Carousel /> },
    { id: 'stopwatch', title: 'Stopwatch', difficulty: 'medium', component: <Stopwatch /> },
    { id: 'tabs', title: 'Tabs Component', difficulty: 'medium', component: <Tabs /> },
    { id: 'tictactoe', title: 'Tic Tac Toe', difficulty: 'medium', component: <TicTacToe /> },

    // Medium - Hooks
    { id: 'usereducer', title: 'Complex Counter (useReducer)', difficulty: 'medium', component: <UseReducerCounter /> },
    { id: 'usememo', title: 'Expensive List (useMemo)', difficulty: 'medium', component: <UseMemoList /> },
    { id: 'usecallback', title: 'Toolbar Optimization (useCallback)', difficulty: 'medium', component: <UseCallbackToolbar /> },
    { id: 'useref', title: 'Timer & DOM (useRef)', difficulty: 'medium', component: <UseRefTimer /> },
    { id: 'uselayouteffect', title: 'Tooltip Positioning (useLayoutEffect)', difficulty: 'medium', component: <UseLayoutEffectTooltip /> },
    { id: 'useimperativehandle', title: 'Modal API (useImperativeHandle)', difficulty: 'medium', component: <UseImperativeHandleModal /> },
    { id: 'usedeferredvalue', title: 'Responsive Search (useDeferredValue)', difficulty: 'medium', component: <UseDeferredValueSearch /> },
    { id: 'usetransition', title: 'Tab Transition (useTransition)', difficulty: 'medium', component: <UseTransitionTabs /> },
    { id: 'useid', title: 'Accessible Form (useId)', difficulty: 'medium', component: <UseIdForm /> },

    // Medium - Timers
    { id: 'alerts', title: 'Auto-Dismiss Alerts (Toast)', difficulty: 'medium', component: <AutoDismissAlerts /> },
    { id: 'countdown', title: 'Countdown Timer', difficulty: 'medium', component: <CountdownTimer /> },


    // Hard
    { id: 'comments', title: 'Nested Comments', difficulty: 'hard', component: <NestedComments /> },
    { id: 'virtual', title: 'Virtual List', difficulty: 'hard', component: <VirtualList /> },
    { id: 'dnd', title: 'Drag and Drop Board', difficulty: 'hard', component: <DragAndDropBoard /> },
    { id: 'builder', title: 'Context Form Builder', difficulty: 'hard', component: <ContextFormBuilder /> },
    { id: 'advhooks', title: 'Advanced Custom Hooks System', difficulty: 'hard', component: <AdvancedCustomHooks /> },
    { id: 'deepeffect', title: 'Deep useEffect Synchronization', difficulty: 'hard', component: <DeepUseEffect /> },
    { id: 'deepreducer', title: 'Full State Machine (useReducer)', difficulty: 'hard', component: <DeepUseReducer /> },
    { id: 'deepcontext', title: 'Context Performance Optimization', difficulty: 'hard', component: <DeepContextPerformance /> },
    { id: 'deepref', title: 'Legacy Integration (Refs & Lifecycle)', difficulty: 'hard', component: <DeepRefLifecycle /> },
    { id: 'vdom', title: 'Virtual DOM vs Direct DOM Optimization', difficulty: 'hard', component: <VirtualDomOptimization /> },
    { id: 'worker', title: 'Worker Pool & Offloading', difficulty: 'hard', component: <WorkerOffloading /> },

    // Hard - Timers
    { id: 'gameloop', title: 'High-Frequency Game Loop', difficulty: 'hard', component: <GameLoop /> },
    { id: 'throttler', title: 'Async Packet Throttler', difficulty: 'hard', component: <PacketThrottler /> },

    // Expert
    { id: 'spreadsheet', title: 'Collaborative Spreadsheet Engine', difficulty: 'expert', component: <CollaborativeSpreadsheet /> },
  ]

  // Group challenges by difficulty
  const groupedChallenges = {
    easy: challenges.filter(c => c.difficulty === 'easy'),
    medium: challenges.filter(c => c.difficulty === 'medium'),
    hard: challenges.filter(c => c.difficulty === 'hard'),
    expert: challenges.filter(c => c.difficulty === 'expert'),
  }

  if (activeChallenge) {
    return (
      <div className="challenge-view-container">
        <div className="challenge-header">
           <button className="back-button" onClick={() => setActiveChallenge(null)}>
            ← Back to Challenges
          </button>
        </div>
        <div className="challenge-workspace">
          {challenges.find(c => c.id === activeChallenge)?.component}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header>
        <div className="logos">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Frontend Coding Challenges</h1>
      </header>

      <main>
        <div className="challenge-list">
          
          <section>
            <h2 className="difficulty-header easy">🟢 Easy (Foundational)</h2>
            <div className="grid">
              {groupedChallenges.easy.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge} 
                  onClick={setActiveChallenge} 
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="difficulty-header medium">🟡 Medium (Intermediate)</h2>
            <div className="grid">
              {groupedChallenges.medium.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge} 
                  onClick={setActiveChallenge} 
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="difficulty-header hard">🔴 Hard (Advanced)</h2>
            <div className="grid">
              {groupedChallenges.hard.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge} 
                  onClick={setActiveChallenge} 
                />
              ))}
            </div>
          </section>

           <section>
            <h2 className="difficulty-header expert">🟣 Expert (Mastery)</h2>
            <div className="grid">
              {groupedChallenges.expert.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge} 
                  onClick={setActiveChallenge} 
                />
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

function ChallengeCard({ challenge, onClick }) {
  return (
    <button 
      className={`challenge-card ${challenge.difficulty}`}
      onClick={() => onClick(challenge.id)}
    >
      {challenge.title}
    </button>
  )
}

export default App
