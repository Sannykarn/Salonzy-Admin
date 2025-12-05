import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }> = ({ 
  className = '', 
  variant = 'primary', 
  children, 
  ...props 
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border border-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{label}</label>}
      <input 
        className={`bg-black border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-gray-600 ${className}`}
        {...props}
      />
    </div>
  );
};

export const Badge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    Confirmed: "bg-green-900/30 text-green-400 border-green-800",
    Pending: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
    Completed: "bg-blue-900/30 text-blue-400 border-blue-800",
    Cancelled: "bg-red-900/30 text-red-400 border-red-800",
  };
  
  const defaultStyle = "bg-gray-800 text-gray-300 border-gray-700";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};
