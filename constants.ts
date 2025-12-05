import { Service, Booking, BookingStatus, RevenueData } from './types';

export const FOUNDERS = "Piyush Verma & Abhishek Karn";
export const APP_NAME = "Salonzy";

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Premium Haircut', duration: 45, price: 499, category: 'Hair' },
  { id: '2', name: 'Beard Sculpting', duration: 30, price: 299, category: 'Beard' },
  { id: '3', name: 'Charcoal Facial', duration: 60, price: 1200, category: 'Facial' },
  { id: '4', name: 'Head Massage', duration: 20, price: 350, category: 'Massage' },
  { id: '5', name: 'Groom Package', duration: 120, price: 2500, category: 'Combo' },
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'B001', customerName: 'Rahul Sharma', customerPhone: '9876543210', serviceId: '1', serviceName: 'Premium Haircut', date: '2025-05-12', time: '10:00', status: BookingStatus.COMPLETED, amount: 499, chairId: 1 },
  { id: 'B002', customerName: 'Vikram Singh', customerPhone: '9123456789', serviceId: '2', serviceName: 'Beard Sculpting', date: '2025-05-12', time: '10:30', status: BookingStatus.CONFIRMED, amount: 299, chairId: 2 },
  { id: 'B003', customerName: 'Amit Patel', customerPhone: '9988776655', serviceId: '5', serviceName: 'Groom Package', date: '2025-05-12', time: '11:00', status: BookingStatus.PENDING, amount: 2500, chairId: 1 },
  { id: 'B004', customerName: 'Sneha Gupta', customerPhone: '8877665544', serviceId: '3', serviceName: 'Charcoal Facial', date: '2025-05-12', time: '12:00', status: BookingStatus.CONFIRMED, amount: 1200, chairId: 3 },
  { id: 'B005', customerName: 'Karan Johar', customerPhone: '7766554433', serviceId: '1', serviceName: 'Premium Haircut', date: '2025-05-12', time: '14:00', status: BookingStatus.CANCELLED, amount: 499, chairId: 2 },
];

export const REVENUE_DATA: RevenueData[] = [
  { name: 'Mon', revenue: 15000, expenses: 5000 },
  { name: 'Tue', revenue: 12000, expenses: 4500 },
  { name: 'Wed', revenue: 18000, expenses: 6000 },
  { name: 'Thu', revenue: 16000, expenses: 5500 },
  { name: 'Fri', revenue: 25000, expenses: 8000 },
  { name: 'Sat', revenue: 45000, expenses: 12000 },
  { name: 'Sun', revenue: 42000, expenses: 11000 },
];
