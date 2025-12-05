import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UiComponents';
import { MOCK_SERVICES } from '../constants';
import { Service } from '../types';
import { Plus, Trash2, Edit2, Clock, X, Layers } from 'lucide-react';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [categories, setCategories] = useState<string[]>(['Hair', 'Beard', 'Facial', 'Massage', 'Combo']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      const formattedName = newCategoryName.trim();
      // Capitalize first letter
      const finalName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
      
      if (!categories.includes(finalName)) {
        setCategories([...categories, finalName]);
        setActiveCategory(finalName); // Automatically switch to the new category
      }
      setNewCategoryName('');
      setIsCategoryModalOpen(false);
    }
  };

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Services Menu</h2>
          <p className="text-gray-400 mt-1">Configure your offerings, pricing, and categories.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsCategoryModalOpen(true)} className="border-zinc-700 hover:bg-zinc-800">
            <Layers size={16} /> New Category
          </Button>
          <Button><Plus size={16} /> Add Service</Button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-zinc-800 custom-scrollbar">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'All' 
              ? 'bg-white text-black' 
              : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          All Services
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-white text-black' 
                : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="group hover:border-white/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1 block">{service.category}</span>
                <h3 className="font-serif font-bold text-xl text-white">{service.name}</h3>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-white bg-zinc-800 rounded transition-colors"><Edit2 size={14} /></button>
                <button className="p-1.5 text-red-400 hover:text-red-300 bg-zinc-800 rounded transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-1"><Clock size={14} /> {service.duration} mins</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="text-green-400 text-xs font-medium px-2 py-0.5 bg-green-900/20 rounded">Active</span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
               <span className="text-2xl font-bold text-white">₹{service.price}</span>
               <label className="flex items-center gap-2 cursor-pointer" title="Toggle Availability">
                 <div className="w-10 h-5 bg-green-900 rounded-full relative transition-colors">
                   <div className="w-3 h-3 bg-green-400 rounded-full absolute right-1 top-1 shadow-sm"></div>
                 </div>
               </label>
            </div>
          </Card>
        ))}

        {/* Add New Placeholder Card */}
        <button className="border border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-zinc-500 hover:bg-zinc-900/30 transition-all min-h-[200px] group">
          <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center mb-3 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Add Service to {activeCategory === 'All' ? 'List' : activeCategory}</span>
        </button>
      </div>

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <Card className="w-full max-w-sm border-zinc-700 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-xl">Add New Category</h3>
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <Input 
                label="Category Name"
                placeholder="e.g. Bridal, Spa, Nail Art"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex-1" 
                  onClick={() => setIsCategoryModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={!newCategoryName.trim()}
                >
                  Save Category
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Services;