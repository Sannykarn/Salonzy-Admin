import React, { useState } from 'react';
import { ScissorsLogo } from '../components/Animations';
import { Button, Input, Card } from '../components/UiComponents';
import { ArrowRight, Lock, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { FOUNDERS } from '../constants';
import { db } from '../services/db';

const Landing: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'apply'>('login');
  
  // Login State
  const [loginData, setLoginData] = useState({ phone: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Signup State
  const [signupData, setSignupData] = useState({
    ownerName: '',
    salonName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // --- LOGIN LOGIC ---
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginError(''); 
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    if (!loginData.phone || !loginData.password) {
      setLoginError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (loginData.phone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number');
      setIsLoading(false);
      return;
    }

    const isValid = await db.validateVendor(loginData.phone);
    if (isValid) {
      onLogin();
    } else {
      setLoginError('Invalid credentials or account not approved.');
    }
    setIsLoading(false);
  };

  // --- SIGNUP LOGIC ---
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    // Clear specific error when user starts typing
    if (signupErrors[name]) {
        setSignupErrors({ ...signupErrors, [name]: '' });
    }
  };

  const validateSignup = () => {
    const errors: Record<string, string> = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!signupData.ownerName.trim()) errors.ownerName = "Owner Name is required";
    else if (signupData.ownerName.length < 3) errors.ownerName = "Name too short";

    if (!signupData.salonName.trim()) errors.salonName = "Salon Name is required";
    
    if (!signupData.phone.trim()) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(signupData.phone)) errors.phone = "Enter a valid 10-digit number";

    if (!signupData.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(signupData.email)) errors.email = "Enter a valid email address";

    if (!signupData.password) errors.password = "Password is required";
    else if (signupData.password.length < 6) errors.password = "Min 6 characters required";

    if (signupData.confirmPassword !== signupData.password) errors.confirmPassword = "Passwords do not match";

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsLoading(true);
    // Simulate API delay for signup
    setTimeout(() => {
        setIsLoading(false);
        setIsSignupSuccess(true);
    }, 1500);
  };

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
                onClick={() => { setActiveTab('login'); setLoginError(''); setIsSignupSuccess(false); }}
                className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'login' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Vendor Login
              </button>
              <button 
                 onClick={() => { setActiveTab('apply'); }}
                className={`flex-1 pb-2 text-sm font-medium transition-colors ${activeTab === 'apply' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Apply for Access
              </button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-red-900/20 border border-red-900 rounded-lg flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle size={14} /> {loginError}
                  </div>
                )}
                <Input 
                  label="Vendor Phone" 
                  name="phone"
                  placeholder="e.g. 9876543210" 
                  type="text" 
                  value={loginData.phone}
                  onChange={handleLoginChange}
                />
                <Input 
                  label="Password" 
                  name="password"
                  placeholder="••••••••" 
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded bg-zinc-800 border-zinc-700" /> Remember me
                  </label>
                  <a href="#" className="hover:text-white">Reset Password?</a>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full group">
                  {isLoading ? 'Verifying...' : (
                    <>Access Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </Button>
              </form>
            ) : (
                <>
                {isSignupSuccess ? (
                    <div className="text-center py-8 animate-[fadeIn_0.5s_ease-out]">
                        <div className="mx-auto w-16 h-16 bg-green-900/20 border border-green-900 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle size={32} className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-white mb-2">Application Sent!</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Your application for <strong>{signupData.salonName}</strong> has been received. Our Super Admins will verify your details and approve your account within 24 hours.
                        </p>
                        <Button variant="outline" onClick={() => { setActiveTab('login'); setIsSignupSuccess(false); setSignupData({...signupData, password: '', confirmPassword: ''}); }}>
                            Back to Login
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSignupSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Input 
                                    label="Owner Name" 
                                    name="ownerName"
                                    placeholder="Full Name"
                                    value={signupData.ownerName}
                                    onChange={handleSignupChange}
                                    className={signupErrors.ownerName ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {signupErrors.ownerName && <span className="text-[10px] text-red-400 mt-1 block">{signupErrors.ownerName}</span>}
                            </div>
                            <div>
                                <Input 
                                    label="Salon Name" 
                                    name="salonName"
                                    placeholder="Salon Name"
                                    value={signupData.salonName}
                                    onChange={handleSignupChange}
                                    className={signupErrors.salonName ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {signupErrors.salonName && <span className="text-[10px] text-red-400 mt-1 block">{signupErrors.salonName}</span>}
                            </div>
                        </div>
                        
                        <div>
                            <Input 
                                label="Phone Number" 
                                name="phone"
                                type="tel"
                                placeholder="10-digit mobile"
                                value={signupData.phone}
                                onChange={handleSignupChange}
                                className={signupErrors.phone ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {signupErrors.phone && <span className="text-[10px] text-red-400 mt-1 block">{signupErrors.phone}</span>}
                        </div>

                        <div>
                            <Input 
                                label="Email Address" 
                                name="email"
                                type="email"
                                placeholder="vendor@salonzy.com"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                className={signupErrors.email ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {signupErrors.email && <span className="text-[10px] text-red-400 mt-1 block">{signupErrors.email}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Input 
                                    label="Password" 
                                    name="password"
                                    type="password"
                                    placeholder="••••••"
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                    className={signupErrors.password ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {signupErrors.password && <span className="text-[10px] text-red-400 mt-1 block">{signupErrors.password}</span>}
                            </div>
                            <div>
                                <Input 
                                    label="Confirm" 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="••••••"
                                    value={signupData.confirmPassword}
                                    onChange={handleSignupChange}
                                    className={signupErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
                                />
                                {signupErrors.confirmPassword && <span className="text-[10px] text-red-400 mt-1 block">{signupErrors.confirmPassword}</span>}
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full mt-2 group">
                            {isLoading ? 'Submitting...' : (
                                <>Apply for Access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </Button>
                    </form>
                )}
                </>
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