import React, { useState, useEffect } from 'react';

const ChallengeTimer = ({ initialTime = 0, isCountdown = false }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState(isCountdown ? 'countdown' : 'stopwatch');
  const [inputTime, setInputTime] = useState(initialTime / 60); // Input in minutes

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (mode === 'countdown') {
            return prevTime > 0 ? prevTime - 1 : 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    if (mode === 'countdown' && time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'countdown') {
      setTime(inputTime * 60);
    } else {
      setTime(0);
    }
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${(seconds % 60)}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'countdown') {
      setTime(inputTime * 60);
    } else {
      setTime(0);
    }
  };

  const handleInputChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    setInputTime(val);
    if (mode === 'countdown' && !isActive) {
      setTime(val * 60);
    }
  };

  return (
    <div className="challenge-timer">
      <div className="timer-display">
        {formatTime(time)}
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer} className={`timer-btn ${isActive ? 'stop' : 'start'}`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="timer-btn reset">
          Reset
        </button>
      </div>
      <div className="timer-settings">
        <label>
          <input 
            type="radio" 
            value="stopwatch" 
            checked={mode === 'stopwatch'} 
            onChange={() => handleModeChange('stopwatch')} 
          />
          Stopwatch
        </label>
        <label>
          <input 
            type="radio" 
            value="countdown" 
            checked={mode === 'countdown'} 
            onChange={() => handleModeChange('countdown')} 
          />
          Countdown
        </label>
      </div>
      {mode === 'countdown' && (
        <div className="countdown-input">
          <input 
            type="number" 
            value={inputTime} 
            onChange={handleInputChange} 
            disabled={isActive}
            min="1"
          />
          <span>min</span>
        </div>
      )}
    </div>
  );
};

export default ChallengeTimer;

