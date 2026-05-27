import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: '📊' },
    { id: 'apps', label: 'App Shield', icon: '🛡️' },
    { id: 'schedule', label: 'Scheduler', icon: '📅' },
    { id: 'history', label: 'History', icon: '📜' },
  ];

  return (
    <div className="w-80 h-full border-r border-slate-800 bg-slate-950/70 backdrop-blur-md flex flex-col justify-between p-6">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white font-extrabold text-lg">
            DB
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight leading-none">DistractionBlock</h2>
            <span className="text-xs text-slate-500 font-medium">Student Focus System</span>
          </div>
        </div>

        {/* Parent Profile */}
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-200 border border-slate-600/40">
            👨‍👩‍👦
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">Sarah Carter</p>
            <p className="text-xs text-indigo-400 font-medium truncate">Parent Account</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-l-4 border-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border-l-4 border-transparent'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border border-slate-800/80 text-center space-y-1">
          <p className="text-xs text-slate-500 font-medium">STUDENT DEVICE</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-200">iPad - Connected</span>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-600">DistractionBlock v1.2.0 • Premium Edition</p>
      </div>
    </div>
  );
};

export default Sidebar;
