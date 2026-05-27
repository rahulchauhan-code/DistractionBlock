import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const AppBlockingGrid = () => {
  const { appsList, toggleAppBlocking, isFocusModeActive } = useFocus();

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div>
        <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Shield Settings</span>
        <h3 className="text-xl font-bold text-white mt-1">App Shield Grid</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Configure which applications and notification feeds are blocked during study sessions.
        </p>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-2 gap-3 mt-6 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
        {appsList.map((app) => (
          <button
            key={app.id}
            onClick={() => toggleAppBlocking(app.id)}
            className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-200 ${
              app.blocked
                ? 'bg-gradient-to-tr from-purple-950/20 to-indigo-950/20 border-indigo-900/65 shadow-md shadow-indigo-950/10'
                : 'bg-slate-950/40 border-slate-900 hover:border-slate-850 hover:bg-slate-900/10'
            }`}
          >
            {/* Left Detail */}
            <div className="flex items-center space-x-3 text-left">
              <span className="text-2xl bg-slate-950/60 w-9 h-9 rounded-xl border border-slate-900 flex items-center justify-center">
                {app.icon}
              </span>
              <div>
                <p className="text-xs font-bold text-slate-200 leading-none">{app.name}</p>
                <span className="text-[9px] text-slate-500 font-semibold uppercase mt-1 inline-block">
                  {app.category}
                </span>
              </div>
            </div>

            {/* Right Status Switch Indicator */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${
                  app.blocked ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${
                    app.blocked ? 'translate-x-4' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Status Warning Banner */}
      {isFocusModeActive && (
        <div className="p-3 rounded-2xl bg-indigo-950/10 border border-indigo-900/20 text-left text-[10px] text-slate-400 font-medium mt-4">
          ⚠️ Apps cannot be unshielded while Focus Lock is active.
        </div>
      )}
    </div>
  );
};

export default AppBlockingGrid;
