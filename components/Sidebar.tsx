import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scissors, 
  Calendar, 
  Users, 
  IndianRupee, 
  LogOut,
  MessageSquare,
  FileText
} from 'lucide-react';
import { ScissorsLogo } from './Animations';
import { FOUNDERS } from '../constants';

const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', path: '/bookings', icon: Calendar },
    { name: 'Services', path: '/services', icon: Scissors },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Invoices', path: '/invoices', icon: FileText },
    { name: 'Revenue', path: '/revenue', icon: IndianRupee },
    { name: 'Support', path: '/support', icon: MessageSquare },
  ];

  return (
    <div className="h-screen w-64 bg-black border-r border-zinc-800 flex flex-col fixed left-0 top-0 z-50">
      {/* Brand */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-zinc-800">
        <ScissorsLogo size={32} />
        <div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-white">Salonzy</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-zinc-900'
                }`}
            >
              <item.icon size={18} className={isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <div className="mt-6 px-2 text-center">
          <p className="text-[10px] text-gray-600">Founded by</p>
          <p className="text-[10px] text-gray-500 font-medium">{FOUNDERS}</p>
          <p className="text-[10px] text-gray-700 mt-1">© 2025 Salonzy</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;