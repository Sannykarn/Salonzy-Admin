import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UiComponents';
import { MOCK_SERVICES } from '../constants';
import { Service } from '../types';
import { Plus, Trash2, Edit2, Clock } from 'lucide-react';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Services Menu</h2>
          <p className="text-gray-400 mt-1">Configure your offerings and pricing.</p>
        </div>
        <Button><Plus size={16} /> Add Service</Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="group hover:border-white/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1 block">{service.category}</span>
                <h3 className="font-serif font-bold text-xl text-white">{service.name}</h3>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-white bg-zinc-800 rounded"><Edit2 size={14} /></button>
                <button className="p-1.5 text-red-400 hover:text-red-300 bg-zinc-800 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1"><Clock size={14} /> {service.duration} mins</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>Available</span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
               <span className="text-2xl font-bold text-white">₹{service.price}</span>
               <label className="flex items-center gap-2 cursor-pointer">
                 <div className="w-10 h-5 bg-green-900 rounded-full relative">
                   <div className="w-3 h-3 bg-green-400 rounded-full absolute right-1 top-1"></div>
                 </div>
               </label>
            </div>
          </Card>
        ))}

        {/* Add New Placeholder */}
        <button className="border border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-zinc-500 hover:bg-zinc-900/30 transition-all min-h-[200px]">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
            <Plus size={24} />
          </div>
          <span className="font-medium">Add New Service</span>
        </button>
      </div>
    </div>
  );
};

export default Services;
