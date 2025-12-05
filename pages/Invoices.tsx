import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UiComponents';
import { Plus, Trash2, Printer, CheckCircle, FileText } from 'lucide-react';
import { db } from '../services/db';
import { InvoiceItem } from '../types';

const Invoices: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, price: 0, total: 0 }
  ]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total if qty or price changes
        if (field === 'quantity' || field === 'price') {
            updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.price);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handleGenerate = async () => {
    if (!customerName || total === 0) return;
    
    const invoice = await db.createInvoice({
        customerName,
        customerPhone,
        date,
        items,
        subtotal,
        tax,
        total,
        status: 'Paid'
    });
    setGeneratedId(invoice.id);
    setIsGenerated(true);
  };

  const handleReset = () => {
      setCustomerName('');
      setCustomerPhone('');
      setItems([{ id: '1', description: '', quantity: 1, price: 0, total: 0 }]);
      setIsGenerated(false);
      setGeneratedId('');
  };

  if (isGenerated) {
      return (
          <div className="p-8 h-full flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
              <Card className="max-w-md w-full text-center py-12">
                  <div className="w-16 h-16 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-2">Invoice Generated!</h2>
                  <p className="text-gray-400 mb-6">Invoice ID: <span className="text-white font-mono">{generatedId}</span></p>
                  
                  <div className="space-y-3">
                      <Button className="w-full justify-center">
                          <Printer size={16} /> Print / Download PDF
                      </Button>
                      <Button variant="outline" className="w-full justify-center" onClick={handleReset}>
                          Create New Invoice
                      </Button>
                  </div>
              </Card>
          </div>
      );
  }

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header>
        <h2 className="text-3xl font-serif font-bold text-white">New Invoice</h2>
        <p className="text-gray-400 mt-1">Generate bills for services and products.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><FileText size={18}/> Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                        label="Customer Name" 
                        placeholder="e.g. Rahul Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <Input 
                        label="Phone (Optional)" 
                        placeholder="e.g. 9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                    <Input 
                        label="Invoice Date" 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Line Items</h3>
                    <Button variant="ghost" className="text-xs" onClick={handleAddItem}><Plus size={14}/> Add Item</Button>
                </div>
                
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex gap-3 items-end group">
                            <div className="flex-1">
                                <Input 
                                    placeholder="Service / Product Description" 
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                />
                            </div>
                            <div className="w-20">
                                <Input 
                                    type="number" 
                                    placeholder="Qty" 
                                    value={item.quantity}
                                    min={1}
                                    onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                                />
                            </div>
                            <div className="w-28">
                                <Input 
                                    type="number" 
                                    placeholder="Price" 
                                    value={item.price}
                                    min={0}
                                    onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                                />
                            </div>
                            <div className="w-24 pb-2.5 text-right font-mono text-gray-300">
                                ₹{item.total}
                            </div>
                            <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="pb-3 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
            <Card className="sticky top-6">
                <h3 className="font-serif font-bold text-xl mb-6">Summary</h3>
                
                <div className="space-y-3 text-sm border-b border-zinc-800 pb-4 mb-4">
                    <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Tax (18% GST)</span>
                        <span>₹{tax.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-white text-lg">Total</span>
                    <span className="font-bold text-white text-xl">₹{total.toFixed(2)}</span>
                </div>

                <Button className="w-full py-3 text-base" onClick={handleGenerate} disabled={total === 0 || !customerName}>
                    Generate Invoice
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Invoices;