import React, { useState, useRef } from 'react';
import './Stopwatch.css'; // Import the CSS file

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  const handleStart = () => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    if (isActive) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="stopwatch">
    <div className='out'>
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap}>Lap</button>
        </div>
      </div>
      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
