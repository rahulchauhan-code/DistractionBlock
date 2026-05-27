import React, { useState, useEffect } from 'react';
import { FocusProvider, useFocus } from './contexts/FocusContext';
import ParentDashboard from './components/ParentDashboard';
import StudentView from './components/StudentView';

function AppContent() {
  const { 
    activePersona, 
    setActivePersona,
    syncId 
  } = useFocus();

  const [persona, setPersona] = useState(null); // Local router fallback

  // Keep Local Persona & Sync state aligned
  useEffect(() => {
    if (persona) {
      setActivePersona(persona);
    }
  }, [persona]);

  // Read persisted state on startup
  useEffect(() => {
    const persisted = localStorage.getItem('db_active_persona');
    if (persisted && localStorage.getItem('db_sync_id')) {
      setPersona(persisted);
    }
  }, []);

  return (
    <div className="relative">
      {persona === null ? (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
          
          {/* Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

          {/* Main Selector Card */}
          <div className="max-w-xl w-full text-center space-y-8 z-10 p-8 md:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-2xl relative">
            
            {/* Logo */}
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-3xl mx-auto font-extrabold text-white">
                🛡️
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white m-0">DistractionBlock</h1>
              <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                Parent Controlled Student Focus System. A premium dual-device cloud synchronization framework.
              </p>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Parent Option */}
              <button
                onClick={() => setPersona('parent')}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/20 hover:border-indigo-500/50 text-left transition-all duration-200 group flex flex-col justify-between h-[160px]"
              >
                <span className="text-3xl">👨‍👩‍👦</span>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Parent Console</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                    Trigger remote locks, block social media apps, schedule study times, and view logs.
                  </p>
                </div>
              </button>

              {/* Student Option */}
              <button
                onClick={() => setPersona('student')}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/20 hover:border-purple-500/50 text-left transition-all duration-200 group flex flex-col justify-between h-[160px]"
              >
                <span className="text-3xl">🎓</span>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Student View</h3>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                    Minimalist focus workstation. Instantly locks when focus mode is turned on.
                  </p>
                </div>
              </button>
            </div>

            {/* Pro Tips */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-left text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-400 text-xs">🌐 Multi-Device Sync instructions:</p>
              <p>1. Open this website on the student's device and select <strong>Student View</strong>.</p>
              <p>2. Copy the generated Connection ID displayed on their home dashboard.</p>
              <p>3. Open this website on your device, choose <strong>Parent Console</strong>, and paste the code to link them!</p>
            </div>

          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Top Persona Switcher Header */}
          <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 border border-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-3 shadow-lg shadow-black/40">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Role: {persona === 'parent' ? 'Parent Supervisor' : 'Student Hub'}
            </span>
            {syncId && (
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Cloud Connected
              </span>
            )}
            <div className="w-px h-3 bg-slate-800"></div>
            <button
              onClick={() => setPersona(persona === 'parent' ? 'student' : 'parent')}
              className="text-[9px] font-extrabold text-indigo-400 hover:text-indigo-350 bg-indigo-500/10 px-2 py-0.5 rounded-full transition-all"
            >
              SWITCH ROLE
            </button>
            <button
              onClick={() => setPersona(null)}
              className="text-[9px] font-extrabold text-slate-400 hover:text-slate-200 bg-slate-800/60 px-2 py-0.5 rounded-full transition-all"
            >
              HOME
            </button>
          </div>

          {/* Active View */}
          {persona === 'parent' ? <ParentDashboard /> : <StudentView />}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <FocusProvider>
      <AppContent />
    </FocusProvider>
  );
}

export default App;
