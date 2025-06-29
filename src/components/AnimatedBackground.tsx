import React from 'react';

const AnimatedBackground: React.FC = () => (
  <svg
    className="fixed inset-0 w-full h-full pointer-events-none"
    style={{ zIndex: 0 }}
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      {/* Radial gradients for glowing effects */}
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
      
      <radialGradient id="glow2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </radialGradient>
      
      <radialGradient id="glow3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
      
      {/* Light leak effect filter */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="glow" />
        <feBlend in="SourceGraphic" in2="glow" mode="screen" />
      </filter>
      
      {/* Light ray filter */}
      <filter id="rays" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>
    
    {/* Background gradient overlay */}
    <rect x="0" y="0" width="100%" height="100%" fill="url(#glow1)" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.6;0.4" dur="15s" repeatCount="indefinite" />
    </rect>
    
    {/* Large glowing orbs */}
    <g filter="url(#glow)">
      {/* Cyan glow */}
      <circle cx="20%" cy="30%" r="300" fill="url(#glow1)">
        <animate attributeName="cx" values="20%;70%;20%" dur="35s" repeatCount="indefinite" />
        <animate attributeName="cy" values="30%;60%;30%" dur="40s" repeatCount="indefinite" />
        <animate attributeName="r" values="300;350;300" dur="25s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.6;0.8" dur="15s" repeatCount="indefinite" />
      </circle>
      
      {/* Green glow */}
      <circle cx="80%" cy="70%" r="350" fill="url(#glow2)">
        <animate attributeName="cx" values="80%;30%;80%" dur="40s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70%;20%;70%" dur="37s" repeatCount="indefinite" />
        <animate attributeName="r" values="350;400;350" dur="30s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.5;0.7" dur="18s" repeatCount="indefinite" />
      </circle>
      
      {/* Purple glow */}
      <circle cx="65%" cy="25%" r="250" fill="url(#glow3)">
        <animate attributeName="cx" values="65%;25%;65%" dur="38s" repeatCount="indefinite" />
        <animate attributeName="cy" values="25%;75%;25%" dur="42s" repeatCount="indefinite" />
        <animate attributeName="r" values="250;300;250" dur="22s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.8;0.6" dur="20s" repeatCount="indefinite" />
      </circle>
    </g>
    
    {/* Light leak rays */}
    <g filter="url(#rays)">
      <path d="M0,0 L100,100" stroke="#22d3ee" strokeWidth="100" strokeLinecap="round" opacity="0.05">
        <animate attributeName="x1" values="0%;100%;0%" dur="20s" repeatCount="indefinite" />
        <animate attributeName="y1" values="0%;100%;0%" dur="25s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.05;0.1;0.05" dur="10s" repeatCount="indefinite" />
      </path>
      
      <path d="M100,0 L0,100" stroke="#22c55e" strokeWidth="120" strokeLinecap="round" opacity="0.05">
        <animate attributeName="x1" values="100%;0%;100%" dur="22s" repeatCount="indefinite" />
        <animate attributeName="y1" values="0%;100%;0%" dur="28s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.05;0.08;0.05" dur="12s" repeatCount="indefinite" />
      </path>
    </g>
    
    {/* Smaller highlight elements */}
    <circle cx="50%" cy="50%" r="40" fill="#22d3ee" fillOpacity="0.15" filter="url(#glow)">
      <animate attributeName="cx" values="50%;80%;20%;50%" dur="18s" repeatCount="indefinite" />
      <animate attributeName="cy" values="50%;30%;70%;50%" dur="15s" repeatCount="indefinite" />
      <animate attributeName="r" values="40;60;40" dur="12s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.15;0.25;0.15" dur="8s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="25%" cy="60%" r="35" fill="#22c55e" fillOpacity="0.12" filter="url(#glow)">
      <animate attributeName="cx" values="25%;70%;25%" dur="19s" repeatCount="indefinite" />
      <animate attributeName="cy" values="60%;20%;60%" dur="23s" repeatCount="indefinite" />
      <animate attributeName="r" values="35;50;35" dur="14s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.12;0.2;0.12" dur="9s" repeatCount="indefinite" />
    </circle>
    
    {/* Lens flare effect */}
    <circle cx="75%" cy="25%" r="5" fill="white" fillOpacity="0.7" filter="url(#glow)">
      <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0.9;0.7" dur="4s" repeatCount="indefinite" />
    </circle>
    
    <circle cx="30%" cy="70%" r="3" fill="white" fillOpacity="0.5" filter="url(#glow)">
      <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default AnimatedBackground;
