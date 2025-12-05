import React from 'react';

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  category: 'Hair' | 'Beard' | 'Facial' | 'Massage' | 'Combo';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalVisits: number;
  lastVisit: string;
  ltv: number; // Lifetime Value
  status: 'Active' | 'Inactive';
}

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: BookingStatus;
  amount: number;
  chairId: number;
}

export interface RevenueData {
  name: string;
  revenue: number;
  expenses: number;
}

export interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: 'Open' | 'Resolved' | 'In Progress';
  date: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ElementType;
}