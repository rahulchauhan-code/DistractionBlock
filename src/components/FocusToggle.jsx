import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const FocusToggle = () => {
  const { isFocusModeActive, toggleFocusMode, customSessionName, setCustomSessionName, maxDuration, setTimerDuration } = useFocus();

  const handleToggle = () => {
    toggleFocusMode();
  };

  const durations = [15, 25, 45, 60];

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="space-y-6 relative z-10">
        <div>
          <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Focus Control</span>
          <h3 className="text-xl font-bold text-white mt-1">Master Focus Mode</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Instantly lock the student's screen into an immersive focus space.
          </p>
        </div>

        {/* Custom Session Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400">Session Goal / Subject</label>
          <input
            type="text"
            disabled={isFocusModeActive}
            value={customSessionName}
            onChange={(e) => setCustomSessionName(e.target.value)}
            placeholder="e.g. Science Revision"
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500/60 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:outline-none transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Set Duration Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400">Duration (Minutes)</label>
          <div className="grid grid-cols-4 gap-2">
            {durations.map((mins) => (
              <button
                key={mins}
                disabled={isFocusModeActive}
                onClick={() => setTimerDuration(mins)}
                className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                  maxDuration === mins * 60
                    ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggler Trigger */}
      <div className="mt-8 relative z-10">
        <button
          onClick={handleToggle}
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 relative group overflow-hidden ${
            isFocusModeActive
              ? 'bg-gradient-to-r from-red-600 to-rose-600 border border-rose-500 text-white shadow-xl shadow-rose-600/20'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 border border-indigo-500 text-white shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.01]'
          }`}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-center space-x-2">
            {isFocusModeActive ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                <span>STOP FOCUS LOCK</span>
              </>
            ) : (
              <>
                <span>⚡ START FOCUS LOCK</span>
              </>
            )}
          </div>
        </button>

        <p className="text-[10px] text-center text-slate-500 mt-3 font-medium">
          {isFocusModeActive
            ? 'STUDENT SCREEN IS LOCKED. PRESS RED TO CANCEL EARLY.'
            : 'CLICKS TO INSTANTLY LOCK STUDENT SCREEN.'}
        </p>
      </div>
    </div>
  );
};

export default FocusToggle;
