import React, { useState, useEffect } from 'react';
import { useFocus } from '../contexts/FocusContext';
import ProgressRing from './ProgressRing';
import CountdownTimer from './CountdownTimer';

const MOTIVATIONAL_QUOTES = [
  "Your focus determines your reality. — Qui-Gon Jinn",
  "Focus on being productive instead of busy. — Tim Ferriss",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Deep study unlocks deep potential. Focus today, lead tomorrow.",
  "Don't wish it were easier. Wish you were better. — Jim Rohn",
  "Success is the sum of small efforts, repeated day in and day out.",
  "You are capable of amazing things. Protect your time.",
];

const LockOverlay = () => {
  const { 
    isFocusModeActive, 
    countdownTimer, 
    maxDuration, 
    customSessionName, 
    blockedNotifications,
    rewardPoints,
    focusStreak 
  } = useFocus();

  const [quoteIndex, setQuoteIndex] = useState(0);

  // Cycle quotes
  useEffect(() => {
    if (!isFocusModeActive) return;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isFocusModeActive]);

  if (!isFocusModeActive) return null;

  // Calculate progress percent (0 to 100)
  const elapsedTime = maxDuration - countdownTimer;
  const progressPercent = maxDuration > 0 ? (elapsedTime / maxDuration) * 100 : 0;

  // Format countdown string
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get last 3 blocked notifications to overlay beautifully
  const recentBlocked = blockedNotifications.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-slate-950/95 overflow-hidden select-none select-none">
      
      {/* Background Neon Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none animate-pulse"></div>
      
      {/* Top Header Section */}
      <div className="w-full max-w-4xl flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
            🔒
          </div>
          <div className="text-left">
            <h1 className="text-base font-bold text-white tracking-wide uppercase leading-none m-0">Distraction Lock Active</h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase mt-1">Supervised Study Session</p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Shield Locked</span>
        </div>
      </div>

      {/* Middle Core Focus Area */}
      <div className="flex flex-col items-center justify-center space-y-6 z-10 max-w-lg w-full text-center">
        
        {/* Custom Current Goal Display */}
        <div className="space-y-1">
          <span className="text-xs text-indigo-400 font-bold tracking-wider uppercase">CURRENT FOCUS GOAL</span>
          <h2 className="text-2xl font-black text-white tracking-tight leading-none mt-1">{customSessionName || 'Study Session'}</h2>
        </div>

        {/* Ambient Ring & Timer Container */}
        <div className="relative flex items-center justify-center py-4">
          <ProgressRing progress={progressPercent} size={240} strokeWidth={8} />
          
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold tracking-tight text-white font-mono leading-none">
              {formatTime(countdownTimer)}
            </span>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-2">Time Remaining</span>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm min-h-[64px] flex items-center justify-center">
          <p className="text-sm font-medium text-slate-300 italic leading-relaxed">
            "{MOTIVATIONAL_QUOTES[quoteIndex]}"
          </p>
        </div>
      </div>

      {/* Bottom Interface Details - Rewards & Logs */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        
        {/* Active Stats Panel */}
        <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60 backdrop-blur-md flex justify-around items-center text-center">
          <div className="space-y-1">
            <span className="text-2xl">🔥</span>
            <h4 className="text-lg font-black text-white">{focusStreak} Days</h4>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Active Streak</p>
          </div>
          <div className="w-px h-10 bg-slate-800/80"></div>
          <div className="space-y-1">
            <span className="text-2xl">✨</span>
            <h4 className="text-lg font-black text-white">{rewardPoints} XP</h4>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Accumulated XP</p>
          </div>
          <div className="w-px h-10 bg-slate-800/80"></div>
          <div className="space-y-1">
            <span className="text-2xl">🎯</span>
            <h4 className="text-lg font-black text-indigo-400">+{Math.round(progressPercent)}%</h4>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">XP Accrued</p>
          </div>
        </div>

        {/* Live Interception Sub-feed */}
        <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60 backdrop-blur-md flex flex-col justify-between text-left h-[100px]">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Live Shield Events Intercepted</span>
          
          <div className="flex-1 overflow-y-auto space-y-1.5 mt-2 pr-1 select-none pointer-events-none">
            {recentBlocked.length === 0 ? (
              <div className="h-full flex items-center justify-start text-[11px] font-medium text-slate-600 italic">
                Shield is guarding in silence...
              </div>
            ) : (
              recentBlocked.map((notif) => (
                <div key={notif.id} className="flex items-center space-x-2 text-[10px] text-slate-400 bg-slate-950/40 p-1.5 border border-slate-900 rounded-lg">
                  <span className="text-indigo-400 font-bold bg-indigo-500/10 px-1 rounded uppercase text-[8px]">Shielded</span>
                  <span className="text-slate-500 font-bold">{notif.app}:</span>
                  <span className="truncate flex-1 font-medium">{notif.message}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default LockOverlay;
