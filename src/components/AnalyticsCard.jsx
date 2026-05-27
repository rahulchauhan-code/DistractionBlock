import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const AnalyticsCard = () => {
  const { sessionHistory, blockedNotifications } = useFocus();

  // Calculations
  const completedSessions = sessionHistory.filter((s) => s.success).length;
  const totalFocusSec = sessionHistory
    .filter((s) => s.success)
    .reduce((acc, curr) => acc + curr.duration, 0);
  
  const totalFocusHours = (totalFocusSec / 3600).toFixed(1);
  const blockedCount = blockedNotifications.length;
  
  // Calculate success efficiency
  const totalSessions = sessionHistory.length;
  const focusEfficiency = totalSessions > 0 
    ? Math.round((completedSessions / totalSessions) * 100) 
    : 100;

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Overview Analytics</span>
        <h3 className="text-xl font-bold text-white mt-1">Activity Analytics</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Track session efficiency and blocked distractions statistics.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 flex-1">
        {/* Total Focus Hours */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 text-left relative overflow-hidden group">
          <span className="text-2xl">⏳</span>
          <h4 className="text-2xl font-black text-white mt-2">{totalFocusHours} hrs</h4>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Total Focus Time</p>
        </div>

        {/* Focus Efficiency Rate */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 text-left relative overflow-hidden group">
          <span className="text-2xl">📈</span>
          <h4 className="text-2xl font-black text-white mt-2">{focusEfficiency}%</h4>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Focus Efficiency</p>
        </div>

        {/* Sessions Completed */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 text-left relative overflow-hidden group">
          <span className="text-2xl">🏆</span>
          <h4 className="text-2xl font-black text-white mt-2">{completedSessions}</h4>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Completed Sessions</p>
        </div>

        {/* Notifications Blocked */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-900 text-left relative overflow-hidden group">
          <span className="text-2xl">🚫</span>
          <h4 className="text-2xl font-black text-rose-500 mt-2">{blockedCount}</h4>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Distractions Deflected</p>
        </div>
      </div>

      {/* Progress ring/mini banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/10 to-purple-950/10 border border-slate-800/80 flex items-center space-x-3 mt-4 text-left">
        <span className="text-xl">🏆</span>
        <div>
          <p className="text-xs font-bold text-slate-200">Excellent Focus Consistency</p>
          <p className="text-[10px] text-slate-400">Student is currently in the top 5% of this week's leaderboard.</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
