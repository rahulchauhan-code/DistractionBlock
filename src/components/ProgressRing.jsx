import React from 'react';

const ProgressRing = ({ progress, size = 200, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* SVG Ring */}
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(30, 41, 59, 0.5)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle with Gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" /> {/* Purple-500 */}
            <stop offset="50%" stopColor="#6366f1" /> {/* Indigo-500 */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue-500 */}
          </linearGradient>
        </defs>
      </svg>
      
      {/* Glowing Overlay Behind Ring */}
      <div 
        className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 blur-md pointer-events-none border border-slate-800/20"
      ></div>
    </div>
  );
};

export default ProgressRing;
