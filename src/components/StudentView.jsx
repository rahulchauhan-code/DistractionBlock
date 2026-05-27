import React, { useEffect, useState } from 'react';
import { useFocus } from '../contexts/FocusContext';
import LockOverlay from './LockOverlay';

const StudentView = () => {
  const { 
    rewardPoints, 
    focusStreak, 
    sessionHistory, 
    appsList, 
    syncId, 
    generateCloudSync,
    isCloudSyncing 
  } = useFocus();

  const [copied, setCopied] = useState(false);

  // Auto-generate Sync ID on mount if missing
  useEffect(() => {
    if (!syncId) {
      generateCloudSync();
    }
  }, [syncId]);

  // Calculations
  const currentLevel = Math.floor(rewardPoints / 200) + 1;
  const xpInCurrentLevel = rewardPoints % 200;
  const percentToNextLevel = (xpInCurrentLevel / 200) * 100;

  // Unlocked Badges
  const badges = [
    { name: 'First Focus', desc: 'Complete 1st session', icon: '🎯', unlocked: rewardPoints >= 100 },
    { name: 'Streak Star', desc: 'Maintain 3+ days streak', icon: '🔥', unlocked: focusStreak >= 3 },
    { name: 'Knowledge Seeker', desc: 'Reach 300+ XP', icon: '📚', unlocked: rewardPoints >= 300 },
    { name: 'Deep Scholar', desc: 'Reach 500+ XP', icon: '👑', unlocked: rewardPoints >= 500 },
  ];

  const handleCopyCode = () => {
    if (!syncId) return;
    navigator.clipboard.writeText(syncId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden pb-12">
      {/* Immersive Fullscreen Lock Screen Trigger */}
      <LockOverlay />

      {/* Top Navbar */}
      <header className="px-8 py-5 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
            🎓
          </div>
          <div className="text-left">
            <h1 className="text-base font-bold text-white tracking-tight leading-none m-0">Student Focus Hub</h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase mt-1">Supervised Learning Mode</p>
          </div>
        </div>

        {/* Sync Indicator */}
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
            {syncId ? 'Cloud Sync Active' : 'Connecting to Cloud...'}
          </span>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-6xl w-full mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 text-left">
        
        {/* Left Side: Profile Banner & Level Up */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile card */}
          <div className="p-6 rounded-3xl bg-slate-905 bg-slate-900/40 border border-slate-800 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center md:space-x-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            {/* Avatar block */}
            <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-4xl border border-indigo-500 shadow-lg shadow-indigo-600/10">
              🦁
            </div>

            <div className="flex-1 mt-4 md:mt-0 space-y-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-3">
                <h2 className="text-xl font-bold text-white leading-none m-0">Leo Carter</h2>
                <span className="px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/25 text-[9px] font-bold text-indigo-400 uppercase">
                  Class 8 Student
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Ready for study? When Focus Lock is turned on by your parent, this device becomes a dedicated focus environment.
              </p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md relative overflow-hidden space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-350">Level {currentLevel} Focus Scholar</span>
              <span className="font-mono text-indigo-400">{xpInCurrentLevel}/200 XP to Lvl {currentLevel + 1}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-900 p-0.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md transition-all duration-500"
                style={{ width: `${percentToNextLevel}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500">Earn +100 XP for every completed focus session! Maintain streaks to unlock special avatars.</p>
          </div>

          {/* Study Achievements Badges */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md relative overflow-hidden space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Academic Badge Milestones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-center space-x-4 transition-all duration-200 ${
                    badge.unlocked
                      ? 'bg-slate-950/70 border-slate-800'
                      : 'bg-slate-950/20 border-slate-900/40 opacity-40'
                  }`}
                >
                  <div className="text-2xl bg-slate-900/80 w-11 h-11 rounded-xl flex items-center justify-center border border-slate-800">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <p className="text-xs font-bold text-slate-200">{badge.name}</p>
                      {badge.unlocked && (
                        <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1 rounded font-bold uppercase">UNLOCKED</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Stats Widget Column */}
        <div className="space-y-6">
          
          {/* Cloud Sync ID Display widget */}
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-purple-950/10 to-indigo-950/10 border border-indigo-900/30 backdrop-blur-md relative overflow-hidden space-y-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none"></div>
            
            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">📱 Parent Supervision ID</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Provide this ID to your parent's device to link and remote control this screen.
              </p>
            </div>

            {syncId ? (
              <div className="space-y-3">
                {/* Code display */}
                <div 
                  onClick={handleCopyCode}
                  className="bg-slate-950/90 border border-slate-800 hover:border-indigo-500/30 p-3 rounded-2xl flex items-center justify-between cursor-pointer group transition-all"
                >
                  <span className="text-xs font-mono font-bold text-indigo-300 truncate pr-2">
                    {syncId}
                  </span>
                  <button className="text-[9px] font-bold text-indigo-400 bg-indigo-500/10 group-hover:bg-indigo-500/20 px-2.5 py-1 rounded-xl transition-all uppercase whitespace-nowrap">
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Link Active & Guarding</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"></span>
                <span className="text-xs font-bold text-purple-400 uppercase">
                  {isCloudSyncing ? 'Creating cloud ID...' : 'Awaiting Connection...'}
                </span>
              </div>
            )}
          </div>

          {/* Streak details */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md relative overflow-hidden text-center space-y-3">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none"></div>
            <span className="text-4xl">🔥</span>
            <h4 className="text-3xl font-black text-white">{focusStreak} Days</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">Study Streak</p>
            <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto leading-relaxed mt-2">
              Study daily to increase your multiplier and claim special bonuses!
            </p>
          </div>

          {/* App Shield Grid overview */}
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md relative overflow-hidden space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Device Shielding</h4>
            
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {appsList.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-900/80">
                  <div className="flex items-center space-x-2 text-xs">
                    <span>{app.icon}</span>
                    <span className="font-bold text-slate-330">{app.name}</span>
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    app.blocked 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {app.blocked ? 'Shielded' : 'Allowed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default StudentView;
