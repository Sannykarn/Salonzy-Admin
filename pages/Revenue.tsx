import React from 'react';
import { Card, Button } from '../components/UiComponents';
import { IndianRupee, TrendingDown, TrendingUp, Download, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { REVENUE_DATA } from '../constants';

const Revenue: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Revenue & Expenses</h2>
          <p className="text-gray-400 mt-1">Track your salon's financial performance.</p>
        </div>
        <Button variant="outline"><Download size={16} /> Export PDF</Button>
      </header>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-sm font-medium uppercase">Net Income</p>
               <h3 className="text-3xl font-serif font-bold text-white mt-2">₹1,24,500</h3>
             </div>
             <div className="p-2 bg-green-900/20 text-green-400 rounded-lg">
               <IndianRupee size={24} />
             </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
             <TrendingUp size={16} /> +18.2% vs last month
          </div>
        </Card>

        <Card className="border-zinc-800">
          <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-sm font-medium uppercase">Total Expenses</p>
               <h3 className="text-3xl font-serif font-bold text-white mt-2">₹42,300</h3>
             </div>
             <div className="p-2 bg-red-900/20 text-red-400 rounded-lg">
               <TrendingDown size={24} />
             </div>
          </div>
          <div className="mt-4 text-gray-500 text-sm">
             Rent, Utilities, Products
          </div>
        </Card>

        <Card className="border-zinc-800">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-gray-400 text-sm font-medium uppercase">Avg. Order Value</p>
               <h3 className="text-3xl font-serif font-bold text-white mt-2">₹850</h3>
             </div>
             <div className="p-2 bg-blue-900/20 text-blue-400 rounded-lg">
               <PieChart size={24} />
             </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
             <TrendingUp size={16} /> +5% vs last week
          </div>
        </Card>
      </div>

      {/* Main Bar Chart */}
      <Card className="h-[450px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif font-bold text-xl">Income vs Expenses (Weekly)</h3>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REVENUE_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#666" tickLine={false} axisLine={false} />
            <YAxis stroke="#666" tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
            <Tooltip 
              cursor={{fill: '#33333330'}}
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Bar dataKey="revenue" name="Revenue" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={40} />
            <Bar dataKey="expenses" name="Expenses" fill="#3f3f46" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Breakdown Table */}
      <Card>
        <h3 className="font-serif font-bold text-xl mb-4">Recent Transactions</h3>
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b border-zinc-800 uppercase text-xs">
            <tr>
              <th className="py-3 font-medium">Description</th>
              <th className="py-3 font-medium">Type</th>
              <th className="py-3 font-medium">Date</th>
              <th className="py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            <tr>
              <td className="py-3 text-white">Service Booking #B001</td>
              <td className="py-3 text-green-400">Income</td>
              <td className="py-3 text-gray-400">May 12, 2025</td>
              <td className="py-3 text-right font-bold text-white">+ ₹499</td>
            </tr>
            <tr>
              <td className="py-3 text-white">Product Restock (L'Oreal)</td>
              <td className="py-3 text-red-400">Expense</td>
              <td className="py-3 text-gray-400">May 11, 2025</td>
              <td className="py-3 text-right font-bold text-white">- ₹2,500</td>
            </tr>
            <tr>
              <td className="py-3 text-white">Service Booking #B003</td>
              <td className="py-3 text-green-400">Income</td>
              <td className="py-3 text-gray-400">May 10, 2025</td>
              <td className="py-3 text-right font-bold text-white">+ ₹2,500</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Revenue;