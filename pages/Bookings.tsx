import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/UiComponents';
import { MOCK_BOOKINGS } from '../constants';
import { Booking, BookingStatus } from '../types';
import { MessageCircle, Check, X, Wand2, Clock, User, Scissors } from 'lucide-react';
import { generateWhatsAppMessage } from '../services/geminiService';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [msgType, setMsgType] = useState<'confirmation' | 'cancellation'>('confirmation');

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const openWhatsAppComposer = async (booking: Booking, type: 'confirmation' | 'cancellation') => {
    setSelectedBooking(booking);
    setMsgType(type);
    setWhatsappModalOpen(true);
    setIsGenerating(true);
    setGeneratedMessage("Thinking...");
    
    // AI Generation
    const msg = await generateWhatsAppMessage(booking.customerName, booking.serviceName, booking.time, type);
    setGeneratedMessage(msg);
    setIsGenerating(false);
  };

  const sendWhatsApp = () => {
    if (!selectedBooking) return;
    const url = `https://wa.me/91${selectedBooking.customerPhone}?text=${encodeURIComponent(generatedMessage)}`;
    window.open(url, '_blank');
    setWhatsappModalOpen(false);
  };

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Bookings & Schedule</h2>
          <p className="text-gray-400 mt-1">Manage appointments and customer communications.</p>
        </div>
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
           <button className="px-4 py-1.5 bg-white text-black rounded text-sm font-medium">List View</button>
           <button className="px-4 py-1.5 text-gray-400 hover:text-white text-sm font-medium">Calendar</button>
        </div>
      </header>

      {/* Kanban-ish Status Columns (Simplified to list for now) */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/50 text-xs uppercase tracking-wider text-gray-500 border-b border-zinc-800">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium">Chair</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-zinc-900/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-medium text-white">{booking.customerName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <User size={10} /> +91 {booking.customerPhone}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    <div className="flex items-center gap-2">
                       <Scissors size={14} className="text-gray-500" /> {booking.serviceName}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                     <div className="flex items-center gap-2">
                       <Clock size={14} className="text-gray-500" /> {booking.time} <span className="text-xs text-gray-600">{booking.date}</span>
                     </div>
                  </td>
                  <td className="p-4 text-gray-400">Chair {booking.chairId}</td>
                  <td className="p-4"><Badge status={booking.status} /></td>
                  <td className="p-4 font-mono font-bold">₹{booking.amount}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {booking.status === BookingStatus.PENDING && (
                        <>
                          <button onClick={() => handleStatusChange(booking.id, BookingStatus.CONFIRMED)} className="p-2 bg-green-900/30 text-green-400 rounded-md hover:bg-green-900/50" title="Confirm">
                            <Check size={16} />
                          </button>
                          <button onClick={() => handleStatusChange(booking.id, BookingStatus.CANCELLED)} className="p-2 bg-red-900/30 text-red-400 rounded-md hover:bg-red-900/50" title="Cancel">
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => openWhatsAppComposer(booking, 'confirmation')}
                        className="p-2 bg-zinc-800 text-white rounded-md hover:bg-green-600 transition-colors" 
                        title="Message on WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* WhatsApp Modal */}
      {whatsappModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border-green-900/50 shadow-[0_0_50px_rgba(20,255,100,0.1)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-xl flex items-center gap-2">
                <MessageCircle className="text-green-500" /> WhatsApp Customer
              </h3>
              <button onClick={() => setWhatsappModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
               <div className="flex gap-2 mb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Sending to:</span>
                  <span className="text-xs font-bold text-white">{selectedBooking.customerName}</span>
               </div>
               
               <div className="relative">
                 <textarea 
                    value={generatedMessage}
                    onChange={(e) => setGeneratedMessage(e.target.value)}
                    className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-gray-300 focus:border-green-500 focus:outline-none resize-none"
                    disabled={isGenerating}
                 />
                 {isGenerating && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 text-sm text-green-400">
                       <Wand2 className="animate-spin" size={16} /> AI Generating...
                    </div>
                 )}
               </div>

               <div className="flex justify-between items-center">
                 <button 
                   onClick={() => openWhatsAppComposer(selectedBooking, msgType)}
                   className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                   disabled={isGenerating}
                 >
                   <Wand2 size={12} /> Regenerate
                 </button>
                 <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setWhatsappModalOpen(false)}>Cancel</Button>
                    <Button onClick={sendWhatsApp} disabled={isGenerating} className="bg-green-600 hover:bg-green-500 text-white border-transparent">
                       Send Message
                    </Button>
                 </div>
               </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Bookings;
