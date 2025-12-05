import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/UiComponents';
import { Search, UserPlus, Phone, Mail, Calendar } from 'lucide-react';
import { db } from '../services/db';
import { Customer } from '../types';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await db.getCustomers();
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Customer Database</h2>
          <p className="text-gray-400 mt-1">View and manage your loyal clientele.</p>
        </div>
        <Button><UserPlus size={16} /> Add Customer</Button>
      </header>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <Input 
          placeholder="Search by name or phone number..." 
          className="pl-10 bg-zinc-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:border-zinc-600 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xl font-serif font-bold text-white">
                {customer.name.charAt(0)}
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${customer.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {customer.status}
              </span>
            </div>

            <h3 className="font-bold text-lg text-white mb-1">{customer.name}</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
                <Phone size={14} /> +91 {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
                <Mail size={14} /> {customer.email || 'No email provided'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
               <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total Visits</p>
                  <p className="text-lg font-bold text-white">{customer.totalVisits}</p>
               </div>
               <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Lifetime Value</p>
                  <p className="text-lg font-bold text-white">₹{customer.ltv}</p>
               </div>
            </div>
            
            <div className="mt-4 pt-2 text-xs text-gray-500 flex items-center gap-1">
              <Calendar size={12} /> Last Visit: {customer.lastVisit}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;