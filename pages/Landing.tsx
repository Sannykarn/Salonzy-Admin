import React, { useState } from 'react';
import { ScissorsLogo, BarberPole } from '../components/Animations';
import { Button, Input, Card } from '../components/UiComponents';
import { ArrowRight, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { FOUNDERS } from '../constants';

const Landing: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'apply'>('login');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Navbar */}
      <header className="z-10 px-8 py-6 flex justify-between items-center border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <ScissorsLogo size={32} />
          <span className="font-serif text-2xl font-bold">Salonzy</span>
        </div>
        <div className="text-xs tracking-widest text-gray-400">VENDOR ACCESS ONLY</div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row z-10 max-w-7xl mx-auto w-full p-6 md:p-12 gap-12 items-center">
        
        {/* Left: Hero Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900/50 text-xs text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Launched 2025
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            The <span className="italic text-gray-400">Standard</span> for <br/>
            Modern Salons.
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl mx-auto md:mx-0">
            Streamline your operations with the most premium admin panel built for high-end salons. 
            Manage bookings, revenue, and customer relationships in style.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-white" /> WhatsApp Integration
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-white" /> Zero-Lag Scheduling
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-white" /> ₹ Invoicing
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle size={16} className="text-white" /> Financial Analytics
            </div>
          </div>
        </div>

        {/* Right: Login/Signup Card */}
        <div className="w-full max-w-md">
          <Card className="border-white/20 bg-black/80 backdrop-blur-md relative overflow-hidden">
             {/* Decorative Spinner */}
            <div className="absolute -top-10 -right-10 opacity-10">
               <ScissorsLogo size={150} />
            </div>

            <div className="flex gap-4 border-b border-zinc-800 mb-6 pb-2">
              <button 
                onClick={() => setActiveTab('login')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'login' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Vendor Login
              </button>
              <button 
                 onClick={() => setActiveTab('apply')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'apply' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Apply for Access
              </button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
                <Input label="Vendor ID / Phone" placeholder="e.g. 9876500000" type="text" />
                <Input label="Password" placeholder="••••••••" type="password" />
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-zinc-800 border-zinc-700" /> Remember me
                  </label>
                  <a href="#" className="hover:text-white">Reset Password?</a>
                </div>

                <Button type="submit" className="w-full group">
                  Access Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="mx-auto w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-2">
                  <Lock size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-serif font-bold">Exclusive Access</h3>
                <p className="text-sm text-gray-400">
                  Salonzy is currently invite-only. Contact our Super Admins to register your salon.
                </p>
                <Button variant="outline" className="w-full mt-4" onClick={() => window.location.href = `https://wa.me/919999999999`}>
                  <Smartphone size={16} /> Contact Admin via WhatsApp
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>

      <footer className="py-6 border-t border-white/5 text-center z-10">
        <p className="text-xs text-gray-600 font-mono tracking-widest uppercase">
          © 2025 Salonzy • Crafted by {FOUNDERS}
        </p>
      </footer>
    </div>
  );
};

export default Landing;
