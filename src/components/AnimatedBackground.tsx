import React from 'react';

const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
    {/* Enhanced gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black"></div>
    
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-purple-950/10 to-cyan-950/20 animate-pulse"></div>
    
    {/* SVG effects layer */}
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Enhanced radial gradients */}
        <radialGradient id="enhancedGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="enhancedGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#059669" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="enhancedGlow3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="enhancedGlow4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#d97706" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        
        {/* Enhanced glow filter */}
        <filter id="enhancedGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="35" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="glow" />
          <feBlend in="SourceGraphic" in2="glow" mode="screen" />
        </filter>
        
        {/* Subtle rays filter */}
        <filter id="subtleRays" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      
      {/* Enhanced floating orbs with better colors */}
      <g filter="url(#enhancedGlow)">
        {/* Blue-cyan glow */}
        <circle cx="15%" cy="25%" r="280" fill="url(#enhancedGlow1)">
          <animate attributeName="cx" values="15%;75%;15%" dur="32s" repeatCount="indefinite" />
          <animate attributeName="cy" values="25%;65%;25%" dur="38s" repeatCount="indefinite" />
          <animate attributeName="r" values="280;320;280" dur="22s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.5;0.8" dur="16s" repeatCount="indefinite" />
        </circle>
        
        {/* Enhanced green glow */}
        <circle cx="85%" cy="75%" r="320" fill="url(#enhancedGlow2)">
          <animate attributeName="cx" values="85%;25%;85%" dur="36s" repeatCount="indefinite" />
          <animate attributeName="cy" values="75%;15%;75%" dur="34s" repeatCount="indefinite" />
          <animate attributeName="r" values="320;380;320" dur="28s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.4;0.7" dur="20s" repeatCount="indefinite" />
        </circle>
        
        {/* Purple glow */}
        <circle cx="60%" cy="20%" r="240" fill="url(#enhancedGlow3)">
          <animate attributeName="cx" values="60%;30%;60%" dur="30s" repeatCount="indefinite" />
          <animate attributeName="cy" values="20%;80%;20%" dur="40s" repeatCount="indefinite" />
          <animate attributeName="r" values="240;290;240" dur="24s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="18s" repeatCount="indefinite" />
        </circle>

        {/* Amber accent */}
        <circle cx="40%" cy="60%" r="180" fill="url(#enhancedGlow4)">
          <animate attributeName="cx" values="40%;70%;40%" dur="26s" repeatCount="indefinite" />
          <animate attributeName="cy" values="60%;30%;60%" dur="32s" repeatCount="indefinite" />
          <animate attributeName="r" values="180;220;180" dur="20s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="14s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Subtle light rays */}
      <g filter="url(#subtleRays)">
        <path d="M0,0 L100,100" stroke="#0ea5e9" strokeWidth="80" strokeLinecap="round" opacity="0.03">
          <animate attributeName="x1" values="0%;100%;0%" dur="25s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="30s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.03;0.08;0.03" dur="12s" repeatCount="indefinite" />
        </path>
        
        <path d="M100,0 L0,100" stroke="#10b981" strokeWidth="100" strokeLinecap="round" opacity="0.04">
          <animate attributeName="x1" values="100%;0%;100%" dur="28s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="35s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.04;0.09;0.04" dur="15s" repeatCount="indefinite" />
        </path>
      </g>
      
      {/* Floating particles */}
      <circle cx="50%" cy="50%" r="25" fill="#0ea5e9" fillOpacity="0.2" filter="url(#enhancedGlow)">
        <animate attributeName="cx" values="50%;85%;15%;50%" dur="20s" repeatCount="indefinite" />
        <animate attributeName="cy" values="50%;25%;75%;50%" dur="18s" repeatCount="indefinite" />
        <animate attributeName="r" values="25;40;25" dur="10s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="8s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="30%" cy="70%" r="20" fill="#10b981" fillOpacity="0.18" filter="url(#enhancedGlow)">
        <animate attributeName="cx" values="30%;75%;30%" dur="22s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70%;15%;70%" dur="26s" repeatCount="indefinite" />
        <animate attributeName="r" values="20;35;20" dur="12s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.18;0.35;0.18" dur="9s" repeatCount="indefinite" />
      </circle>
      
      {/* Bright accent stars */}
      <circle cx="80%" cy="30%" r="4" fill="#60a5fa" fillOpacity="0.8" filter="url(#enhancedGlow)">
        <animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="25%" cy="80%" r="3" fill="#34d399" fillOpacity="0.7" filter="url(#enhancedGlow)">
        <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.95;0.7" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export default AnimatedBackground;
