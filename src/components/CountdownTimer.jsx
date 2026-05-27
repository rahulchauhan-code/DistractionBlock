import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const CountdownTimer = () => {
  const { countdownTimer, maxDuration, isFocusModeActive } = useFocus();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = maxDuration > 0 ? ((maxDuration - countdownTimer) / maxDuration) * 100 : 0;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Active Session</span>
        <h3 className="text-xl font-bold text-white mt-1">Focus Timer</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Monitor the countdown of the active student focus session.
        </p>
      </div>

      {/* Main Countdown Display */}
      <div className="my-8 flex flex-col items-center justify-center space-y-3">
        <div className="px-6 py-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner flex items-center justify-center">
          <span className={`text-4xl font-extrabold font-mono tracking-wider ${isFocusModeActive ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`}>
            {formatTime(countdownTimer)}
          </span>
        </div>

        {/* Small Progress Status Pill */}
        <span className="text-[10px] font-bold text-slate-500 bg-slate-950/60 border border-slate-850 px-2.5 py-1 rounded-full uppercase tracking-wider">
          {isFocusModeActive ? `${Math.round(progress)}% Session Complete` : 'Awaiting lock...'}
        </span>
      </div>

      {/* Progress linear bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-slate-950 p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md shadow-purple-500/10 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
