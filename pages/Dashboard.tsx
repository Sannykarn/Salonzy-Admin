import React from 'react';
import { Card, Button } from '../components/UiComponents';
import { 
  Users, 
  IndianRupee, 
  CalendarCheck, 
  Scissors, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { REVENUE_DATA, MOCK_BOOKINGS } from '../constants';

const StatWidget: React.FC<{ title: string, value: string, icon: React.ElementType, sub: string, positive?: boolean }> = ({ title, value, icon: Icon, sub, positive = true }) => (
  <Card className="relative overflow-hidden group">
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
  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">Welcome back, Vendor. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button>+ New Walk-in</Button>
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
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-xl">Revenue Overview</h3>
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

        {/* Recent Activity */}
        <Card className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-serif font-bold text-xl">Recent Bookings</h3>
             <Button variant="ghost" className="text-xs">View All</Button>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {MOCK_BOOKINGS.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-gray-300">
                    {booking.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{booking.customerName}</p>
                    <p className="text-xs text-gray-500">{booking.serviceName} • {booking.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">₹{booking.amount}</p>
                  <p className={`text-[10px] uppercase font-bold tracking-wider ${
                    booking.status === 'Confirmed' ? 'text-green-500' :
                    booking.status === 'Pending' ? 'text-yellow-500' : 'text-gray-500'
                  }`}>{booking.status}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800">
             <Button variant="outline" className="w-full text-xs h-8">
               <ArrowUpRight size={14} /> Open Calendar
             </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
