import React from 'react';

export const ScissorsLogo: React.FC<{ size?: number, className?: string }> = ({ size = 48, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
       {/* Top Blade */}
       <svg 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         strokeWidth="1.5" 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         className="absolute top-0 left-0 w-full h-full scissor-blade-top text-white"
       >
          <circle cx="6" cy="6" r="3" />
          <path d="M8.12 8.12 12 12" />
          <path d="M20 4 8.12 15.88" />
       </svg>
       
       {/* Bottom Blade */}
       <svg 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         strokeWidth="1.5" 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         className="absolute top-0 left-0 w-full h-full scissor-blade-bottom text-white"
       >
          <circle cx="6" cy="18" r="3" />
          <path d="M14.8 14.8 20 20" />
          <path d="M8.12 15.88 12 12" />
       </svg>
       
       {/* Center Screw */}
       <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
    </div>
  );
};

export const BarberPole: React.FC = () => {
  return (
    <div className="h-full w-4 rounded-full overflow-hidden border border-zinc-700 relative bg-zinc-900 shadow-inner">
      <div className="absolute inset-0 barber-stripe opacity-20"></div>
    </div>
  );
};
