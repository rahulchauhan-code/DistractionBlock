import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const RewardCard = () => {
  const { rewardPoints, focusStreak } = useFocus();

  // Achievement Badges
  const badges = [
    { name: 'First Focus', desc: 'Complete 1st session', icon: '🎯', unlocked: rewardPoints >= 100 },
    { name: 'Streak Star', desc: 'Maintain 3+ days streak', icon: '🔥', unlocked: focusStreak >= 3 },
    { name: 'Knowledge Seeker', desc: 'Reach 300+ XP', icon: '📚', unlocked: rewardPoints >= 300 },
    { name: 'Deep Scholar', desc: 'Reach 500+ XP', icon: '👑', unlocked: rewardPoints >= 500 },
  ];

  // Level calculation (e.g. 1 level per 200 XP)
  const currentLevel = Math.floor(rewardPoints / 200) + 1;
  const xpInCurrentLevel = rewardPoints % 200;
  const percentToNextLevel = (xpInCurrentLevel / 200) * 100;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">Gamification Rewards</span>
        <h3 className="text-xl font-bold text-white mt-1">XP & Achievements</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Unlock rewards, level up, and maintain streaks for staying focused.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Streak Counter */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-3xl">🔥</span>
          <h4 className="text-2xl font-black text-white mt-2">{focusStreak} Days</h4>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Focus Streak</p>
        </div>

        {/* Total XP Points */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-3xl">✨</span>
          <h4 className="text-2xl font-black text-white mt-2">{rewardPoints} XP</h4>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Total Rewards</p>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-350">Level {currentLevel} Student</span>
          <span className="font-mono text-indigo-400">{xpInCurrentLevel}/200 XP to Lvl {currentLevel + 1}</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-900 p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20 transition-all duration-500"
            style={{ width: `${percentToNextLevel}%` }}
          ></div>
        </div>
      </div>

      {/* Achievement Badges Grid */}
      <div className="mt-6 space-y-3 flex-1">
        <h4 className="text-xs font-bold text-slate-400 text-left">Academic Badges Unlocked</h4>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-center space-x-3 transition-all duration-200 ${
                badge.unlocked
                  ? 'bg-slate-950/80 border-slate-800'
                  : 'bg-slate-950/30 border-slate-900/50 opacity-40'
              }`}
            >
              <div className="text-xl bg-slate-900/80 w-9 h-9 rounded-xl flex items-center justify-center border border-slate-850">
                {badge.icon}
              </div>
              <div className="text-left min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-200 truncate">{badge.name}</p>
                <p className="text-[9px] text-slate-500 truncate leading-snug">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
