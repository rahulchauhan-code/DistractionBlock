import React, { useState } from 'react';
import { useFocus } from '../contexts/FocusContext';
import Sidebar from './Sidebar';
import FocusToggle from './FocusToggle';
import StudentStatusCard from './StudentStatusCard';
import CountdownTimer from './CountdownTimer';
import Scheduler from './Scheduler';
import NotificationLog from './NotificationLog';
import RewardCard from './RewardCard';
import AnalyticsCard from './AnalyticsCard';
import AppBlockingGrid from './AppBlockingGrid';
import SessionHistory from './SessionHistory';

const ParentDashboard = () => {
  const { 
    syncId, 
    isCloudSyncing, 
    cloudError, 
    connectToCloudSync, 
    disconnectCloudSync 
  } = useFocus();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputCode, setInputCode] = useState('');

  const handleLinkDevice = async (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    await connectToCloudSync(inputCode.trim());
  };

  // If not linked yet, show the premium Link Device portal
  if (!syncId) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

        {/* Link Portal Card */}
        <div className="max-w-md w-full text-center space-y-6 z-10 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-2xl relative">
          
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg mx-auto text-2xl">
              🔒
            </div>
            <h2 className="text-xl font-black text-white tracking-tight leading-none mt-2">Link Student Device</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed mt-1">
              Enter the unique Connection ID displayed on the student's Focus Hub screen to establish supervision.
            </p>
          </div>

          <form onSubmit={handleLinkDevice} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block pl-1">
                Parent Supervision ID
              </label>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste student's Connection ID here"
                className="w-full bg-slate-950 border border-slate-850 px-4 py-3 text-slate-200 text-xs rounded-xl focus:outline-none focus:border-indigo-500/50 font-mono"
                disabled={isCloudSyncing}
              />
            </div>

            <button
              type="submit"
              disabled={isCloudSyncing || !inputCode.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-550 border border-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition-all disabled:opacity-40 shadow-lg shadow-indigo-600/10 flex items-center justify-center space-x-2"
            >
              <span>{isCloudSyncing ? 'LINKING DEVICE...' : 'LINK & INITIATE CONTROL'}</span>
            </button>
          </form>

          {cloudError && (
            <p className="text-[10px] font-semibold text-rose-500">{cloudError}</p>
          )}

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-left text-[11px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-400 text-xs">💡 Quick Setup Guide:</p>
            <p>1. Open another device (or another browser window) and select <strong>Student View</strong>.</p>
            <p>2. Copy the Connection ID from the <strong>Parent Supervision ID</strong> card on that screen.</p>
            <p>3. Paste it in the input box above to connect instantly!</p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="px-8 py-5 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md flex items-center justify-between z-20">
          <div className="text-left">
            <h1 className="text-xl font-bold text-white tracking-tight leading-none m-0">Parent Supervision Console</h1>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Supervising: Student Device</p>
          </div>
          
          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Connection Code</span>
              <span className="text-xs font-mono font-bold text-indigo-400">{syncId.slice(0, 13)}...</span>
            </div>
            
            <button
              onClick={disconnectCloudSync}
              className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl hover:bg-rose-500/20 transition-all uppercase"
            >
              UNLINK
            </button>
          </div>
        </header>

        {/* Dynamic Workspace Tabs */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-950/20 custom-scrollbar">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Core Hero Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="h-[380px]">
                  <FocusToggle />
                </div>
                <div className="h-[380px]">
                  <StudentStatusCard />
                </div>
                <div className="h-[380px]">
                  <CountdownTimer />
                </div>
              </div>

              {/* Analytics & Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[380px]">
                  <AnalyticsCard />
                </div>
                <div className="h-[380px]">
                  <RewardCard />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apps' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full items-stretch">
              <div className="h-[460px]">
                <AppBlockingGrid />
              </div>
              <div className="h-[460px]">
                <NotificationLog />
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="h-[400px]">
                <Scheduler />
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 text-left space-y-4">
                <h3 className="text-lg font-bold text-white">Scheduler Instructions</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The automated study scheduler allows you to specify start and end times during which Focus Lock is triggered automatically. 
                </p>
                <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                  <li>Ensure the repeat days match the active study schedules.</li>
                  <li>Focus Lock triggers instantly on the student device when the start time is hit.</li>
                  <li>XP and streak rewards are automatically accrued for successful completion of scheduled sessions.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="h-[420px]">
                <SessionHistory />
              </div>
              <div className="h-[420px]">
                <NotificationLog />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
