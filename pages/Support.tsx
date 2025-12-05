import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/UiComponents';
import { MessageSquare, HelpCircle, Send, FileText } from 'lucide-react';
import { db } from '../services/db';
import { Ticket } from '../types';

const Support: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await db.getTickets();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    const newTicket = await db.createTicket(subject, message);
    setTickets([newTicket, ...tickets]);
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className="p-8 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">Help & Support</h2>
          <p className="text-gray-400 mt-1">Get assistance from Salonzy Super Admins.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           Support Online
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white text-black rounded-lg">
              <MessageSquare size={20} />
            </div>
            <h3 className="font-serif font-bold text-xl">Create New Ticket</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
             <Input 
                label="Subject" 
                placeholder="Brief description of the issue..." 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
             />
             <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Message</label>
                <textarea 
                  className="bg-black border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-gray-600 min-h-[150px] resize-none"
                  placeholder="Describe your issue in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
             </div>
             <Button type="submit" disabled={isSubmitting} className="w-full">
               {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Ticket</>}
             </Button>
          </form>
        </Card>

        {/* Ticket History & FAQs */}
        <div className="space-y-6">
           <Card>
              <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                 <FileText size={18} /> Ticket History
              </h3>
              <div className="space-y-3">
                 {tickets.length > 0 ? (
                   tickets.map((ticket) => (
                     <div key={ticket.id} className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start">
                           <h4 className="font-medium text-white">{ticket.subject}</h4>
                           <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                              ticket.status === 'Resolved' ? 'border-green-800 bg-green-900/20 text-green-400' :
                              ticket.status === 'In Progress' ? 'border-yellow-800 bg-yellow-900/20 text-yellow-400' :
                              'border-blue-800 bg-blue-900/20 text-blue-400'
                           }`}>
                              {ticket.status}
                           </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{ticket.message}</p>
                        <p className="text-xs text-gray-600 mt-2">{ticket.date}</p>
                     </div>
                   ))
                 ) : (
                   <p className="text-gray-500 text-sm">No recent tickets.</p>
                 )}
              </div>
           </Card>

           <Card className="bg-zinc-900/30">
              <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                 <HelpCircle size={18} /> Quick FAQs
              </h3>
              <div className="space-y-4">
                 <div className="border-l-2 border-zinc-700 pl-3">
                    <p className="text-sm font-bold text-gray-300">How do I change service prices?</p>
                    <p className="text-xs text-gray-500 mt-1">Go to Services page, click Edit icon on the service card.</p>
                 </div>
                 <div className="border-l-2 border-zinc-700 pl-3">
                    <p className="text-sm font-bold text-gray-300">Where are my invoices?</p>
                    <p className="text-xs text-gray-500 mt-1">Check the Revenue page to download monthly reports.</p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;