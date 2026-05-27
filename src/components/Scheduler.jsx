import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const Scheduler = () => {
  const { schedulerState, setSchedulerState } = useFocus();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    setSchedulerState((prev) => {
      const activeDays = prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day];
      return { ...prev, days: activeDays };
    });
  };

  const handleToggleScheduler = () => {
    setSchedulerState((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleTimeChange = (field, value) => {
    setSchedulerState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Automation</span>
          <h3 className="text-xl font-bold text-white mt-1">Study Scheduler</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Automate screen locks during designated study sessions.
          </p>
        </div>

        {/* Master Active Switch */}
        <button
          onClick={handleToggleScheduler}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            schedulerState.enabled
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/5'
              : 'bg-slate-950/80 border border-slate-800 text-slate-500'
          }`}
        >
          {schedulerState.enabled ? '● SCHEDULE ACTIVE' : '○ SCHEDULE DISABLED'}
        </button>
      </div>

      <div className="mt-6 space-y-6 flex-1">
        {/* Time Window Config */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">Start Time</label>
            <input
              type="time"
              disabled={!schedulerState.enabled}
              value={schedulerState.startTime}
              onChange={(e) => handleTimeChange('startTime', e.target.value)}
              className="w-full bg-slate-950/85 border border-slate-800/80 focus:border-purple-500/40 rounded-xl px-4 py-3 text-slate-200 font-semibold text-sm focus:outline-none transition-all disabled:opacity-40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">End Time</label>
            <input
              type="time"
              disabled={!schedulerState.enabled}
              value={schedulerState.endTime}
              onChange={(e) => handleTimeChange('endTime', e.target.value)}
              className="w-full bg-slate-950/85 border border-slate-800/80 focus:border-purple-500/40 rounded-xl px-4 py-3 text-slate-200 font-semibold text-sm focus:outline-none transition-all disabled:opacity-40"
            />
          </div>
        </div>

        {/* Days Select Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400">Repeat Days</label>
          <div className="grid grid-cols-4 gap-2">
            {daysOfWeek.map((day) => {
              const isSelected = schedulerState.days.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  disabled={!schedulerState.enabled}
                  onClick={() => toggleDay(day)}
                  className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all border truncate ${
                    isSelected
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-950/40 border-slate-850 text-slate-500 hover:text-slate-400 hover:border-slate-800'
                  } disabled:opacity-40`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scheduler Quick Status Banner */}
        {schedulerState.enabled && schedulerState.days.length > 0 && (
          <div className="p-4 rounded-2xl bg-indigo-950/10 border border-indigo-900/20 flex items-center space-x-3 mt-4">
            <span className="text-xl">📅</span>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold text-indigo-300">Lock automatically triggers at {schedulerState.startTime}</p>
              <p className="text-[10px] text-slate-400">Repeats every {schedulerState.days.map(d => d.slice(0,3)).join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduler;
