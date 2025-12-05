import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/UiComponents';
import { 
  Users, 
  IndianRupee, 
  CalendarCheck, 
  Scissors, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { REVENUE_DATA } from '../constants';
import { Booking } from '../types';
import { db } from '../services/db';
import Calendar from '../components/Calendar';
import { useNavigate } from 'react-router-dom';

const StatWidget: React.FC<{ title: string, value: string, icon: React.ElementType, sub: string, positive?: boolean }> = ({ title, value, icon: Icon, sub, positive = true }) => (
  <Card className="relative overflow-hidden group hover:border-zinc-600 transition-colors">
    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={80} />
    </div>
    <div className="flex flex-col gap-4 relative z-10">
      <div className="p-2 bg-zinc-800 w-fit rounded-lg text-white">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <p className="text-3xl font-serif font-bold text-white mt-1">{value}</p>
      </div>
      <div className={`text-xs flex items-center gap-1 ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
        <span>{sub}</span>
      </div>
    </div>
  </Card>
);

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('2025-05-12'); // Mock default date
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.getBookings();
      setBookings(data);
    };
    fetchData();
  }, []);

  // Filter bookings for the selected date
  const todaysBookings = bookings.filter(b => b.date === selectedDate);

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back, Vendor. Here's your overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/revenue')}>Revenue Report</Button>
          <Button onClick={() => navigate('/bookings')}>+ New Booking</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget title="Total Revenue" value="₹45,200" icon={IndianRupee} sub="+12% from yesterday" />
        <StatWidget title="Appointments" value="24" icon={CalendarCheck} sub="8 slots remaining" />
        <StatWidget title="Active Customers" value="156" icon={Users} sub="+5 new this week" />
        <StatWidget title="Top Service" value="Haircut" icon={Scissors} sub="40% of bookings" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-xl">Revenue Trends</h3>
            <select className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-gray-300 focus:outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#fff" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Calendar & Schedule */}
        <Card className="flex flex-col h-full bg-zinc-900/50 border-zinc-800">
          <div className="mb-6 border-b border-zinc-800 pb-4">
             <Calendar bookings={bookings} selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          </div>

          <div className="flex justify-between items-center mb-4">
             <h3 className="font-serif font-bold text-lg">Schedule <span className="text-gray-500 font-sans font-normal text-sm">({selectedDate})</span></h3>
             <Button variant="ghost" className="text-xs" onClick={() => navigate('/bookings')}>View All</Button>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1 pr-2 max-h-[250px] custom-scrollbar">
            {todaysBookings.length > 0 ? (
              todaysBookings.map((booking) => (
                <div key={booking.id} className="flex gap-3 items-start p-3 rounded-lg bg-black border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer" onClick={() => navigate('/bookings')}>
                   <div className="mt-1 text-gray-500">
                     <Clock size={14} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white">{booking.time}</span>
                        <Badge status={booking.status} />
                      </div>
                      <p className="text-sm font-medium text-gray-300 mt-1">{booking.customerName}</p>
                      <p className="text-xs text-gray-500">{booking.serviceName}</p>
                   </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No bookings for this date.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;