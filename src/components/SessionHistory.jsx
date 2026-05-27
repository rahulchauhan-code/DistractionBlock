import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const SessionHistory = () => {
  const { sessionHistory } = useFocus();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} mins`;
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">History Logs</span>
        <h3 className="text-xl font-bold text-white mt-1">Session History</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Review the list of previous study sessions and focus efficiency logs.
        </p>
      </div>

      {/* History List */}
      <div className="mt-6 flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-3 custom-scrollbar">
        {sessionHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-8">
            <span className="text-3xl text-slate-700">📜</span>
            <p className="text-xs font-semibold text-slate-500">No session logs found</p>
          </div>
        ) : (
          sessionHistory.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-slate-850 transition-all duration-200"
            >
              {/* Left Details */}
              <div className="flex items-center space-x-3 text-left">
                <span className="text-xl">
                  {session.success ? '🏆' : '⚠️'}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-200 leading-none">{session.label}</p>
                  <span className="text-[9px] text-slate-500 font-semibold mt-1 inline-block">
                    {session.date} • {formatDuration(session.duration)}
                  </span>
                </div>
              </div>

              {/* Right Reward/Status Details */}
              <div className="text-right">
                {session.success ? (
                  <div>
                    <span className="text-xs font-bold text-emerald-400 font-mono">+{session.xpEarned} XP</span>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">COMPLETED</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-bold text-rose-500 font-mono">0 XP</span>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">CANCELLED</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionHistory;
