import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { Booking } from '../types';

interface CalendarProps {
  bookings: Booking[];
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

const Calendar: React.FC<CalendarProps> = ({ bookings, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025 mock start

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before start of month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Days of month
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      
      const dayBookings = bookings.filter(b => b.date === dateStr);
      const hasBookings = dayBookings.length > 0;
      
      // Determine dot color based on status mix
      const hasPending = dayBookings.some(b => b.status === 'Pending');
      const dotColor = hasPending ? 'bg-yellow-500' : 'bg-green-500';

      days.push(
        <button
          key={i}
          onClick={() => onDateSelect(dateStr)}
          className={`h-10 w-10 rounded-full flex flex-col items-center justify-center text-sm relative transition-all
            ${isSelected 
              ? 'bg-white text-black font-bold shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
              : 'text-gray-400 hover:text-white hover:bg-zinc-800'
            }`}
        >
          {i}
          {hasBookings && !isSelected && (
            <span className={`absolute bottom-1 w-1 h-1 rounded-full ${dotColor}`}></span>
          )}
        </button>
      );
    }
    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="font-serif font-bold text-lg text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-1">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-zinc-800 rounded text-gray-400 hover:text-white"><ChevronLeft size={16} /></button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-zinc-800 rounded text-gray-400 hover:text-white"><ChevronRight size={16} /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 text-center mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-[10px] font-bold text-gray-600 uppercase">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-y-2 justify-items-center">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;