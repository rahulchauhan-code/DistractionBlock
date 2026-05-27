import React from 'react';
import { useFocus } from '../contexts/FocusContext';

const NotificationLog = () => {
  const { blockedNotifications, clearNotificationLog, isFocusModeActive } = useFocus();

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Live Activity</span>
          <h3 className="text-xl font-bold text-white mt-1">Notification Interceptions</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Real-time feed of alerts and notifications blocked on the student's device.
          </p>
        </div>

        {/* Clear Button */}
        {blockedNotifications.length > 0 && (
          <button
            onClick={clearNotificationLog}
            className="text-[10px] font-bold text-rose-400 hover:text-rose-350 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-all"
          >
            CLEAR FEED
          </button>
        )}
      </div>

      {/* Log Feed */}
      <div className="mt-6 flex-1 overflow-y-auto max-h-[300px] pr-2 space-y-3 custom-scrollbar">
        {blockedNotifications.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-8">
            <div className="text-4xl text-slate-700 animate-pulse">🔒</div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-500">No Blocked Alerts Yet</p>
              <p className="text-[11px] text-slate-650 max-w-[220px]">
                {isFocusModeActive
                  ? 'Waiting for student notifications to trigger blocking simulation...'
                  : 'Start Focus Lock to begin shielding the student device.'}
              </p>
            </div>
          </div>
        ) : (
          blockedNotifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-center space-x-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-900 shadow-sm relative group overflow-hidden transition-all duration-200 hover:border-slate-800"
            >
              {/* Highlight strip */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500"></div>

              {/* App Icon */}
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-base">
                {notif.icon}
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-200">{notif.app}</p>
                  <span className="text-[9px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                    BLOCKED
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{notif.message}</p>
              </div>

              {/* Timestamp */}
              <div className="text-[10px] font-mono text-slate-600">
                {notif.timestamp}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationLog;
