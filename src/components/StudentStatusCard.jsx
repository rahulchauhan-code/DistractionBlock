import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const StudentStatusCard = () => {
  const { isFocusModeActive, countdownTimer, maxDuration, customSessionName, rewardPoints, focusStreak } = useFocus();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = maxDuration > 0 ? ((maxDuration - countdownTimer) / maxDuration) * 100 : 0;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Student Status</span>
        <h3 className="text-xl font-bold text-white mt-1">iPad Mini Pro</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Monitor current student activity and synchronization details.
        </p>
      </div>

      <div className="my-6 space-y-4">
        {/* Device Active Status */}
        <div className="flex justify-between items-center bg-slate-950/60 p-3.5 rounded-2xl border border-slate-900">
          <span className="text-xs font-semibold text-slate-400">Device Status</span>
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isFocusModeActive ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className={`text-xs font-bold ${isFocusModeActive ? 'text-indigo-400' : 'text-emerald-400'} uppercase`}>
              {isFocusModeActive ? '🛡️ Focus Mode Locked' : '● Idle / Standby'}
            </span>
          </div>
        </div>

        {/* Focus Goals details if active */}
        {isFocusModeActive ? (
          <div className="p-4 rounded-2xl bg-indigo-950/10 border border-indigo-900/20 text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
              <span>Goal: {customSessionName}</span>
              <span className="font-mono">{formatTime(countdownTimer)}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-400">All notifications blocked. Fullscreen Focus locked.</p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/30 border border-slate-900/50 text-left">
            <p className="text-xs text-slate-500 italic">No active focus session on Student device. Screen is unlocked.</p>
          </div>
        )}
      </div>

      {/* Rewards overview */}
      <div className="flex justify-around items-center bg-slate-950/30 border border-slate-900 py-3 rounded-2xl">
        <div className="text-center">
          <span className="text-base">🔥</span>
          <p className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">Streak</p>
          <p className="text-xs font-bold text-slate-200">{focusStreak} Days</p>
        </div>
        <div className="w-px h-6 bg-slate-850"></div>
        <div className="text-center">
          <span className="text-base">✨</span>
          <p className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">XP Balance</p>
          <p className="text-xs font-bold text-slate-200">{rewardPoints} XP</p>
        </div>
      </div>
    </div>
  );
};

export default StudentStatusCard;
