/**
 * SALONZY DATABASE SERVICE
 * 
 * In Production: This file connects to the Laravel API which queries the MySQL database.
 * Current Environment: Simulating async DB calls with local data for the Admin Panel demo.
 * 
 * Database Schema (MySQL Representation):
 * - users (id, name, role, phone, password_hash)
 * - services (id, vendor_id, name, duration, price, category)
 * - bookings (id, customer_id, service_id, date, time, status, amount)
 * - customers (id, name, phone, email, last_visit)
 * - transactions (id, booking_id, amount, type, timestamp)
 */

import { Booking, Customer, Ticket, BookingStatus, Invoice } from '../types';
import { MOCK_BOOKINGS, MOCK_SERVICES } from '../constants';

// Simulated DB Latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class DatabaseService {
  private bookings: Booking[] = [...MOCK_BOOKINGS];
  private customers: Customer[] = [
    { id: 'C001', name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com', totalVisits: 12, lastVisit: '2025-05-10', ltv: 5400, status: 'Active' },
    { id: 'C002', name: 'Vikram Singh', phone: '9123456789', email: 'vikram@example.com', totalVisits: 5, lastVisit: '2025-04-22', ltv: 2100, status: 'Active' },
    { id: 'C003', name: 'Amit Patel', phone: '9988776655', totalVisits: 1, lastVisit: '2025-05-12', ltv: 2500, status: 'Inactive' },
    { id: 'C004', name: 'Sneha Gupta', phone: '8877665544', totalVisits: 8, lastVisit: '2025-05-01', ltv: 8900, status: 'Active' },
  ];
  private tickets: Ticket[] = [
    { id: 'T001', subject: 'Payment Issue', message: 'Razorpay settlement pending for Order #1234', status: 'In Progress', date: '2025-05-10' },
    { id: 'T002', subject: 'Update Service Menu', message: 'Need to add "Bridal Package" to my list', status: 'Resolved', date: '2025-05-08' },
  ];
  private invoices: Invoice[] = [];

  // --- BOOKINGS ---
  async getBookings(): Promise<Booking[]> {
    await delay(300); // Simulate network
    return this.bookings;
  }

  async getBookingsByDate(date: string): Promise<Booking[]> {
    await delay(200);
    return this.bookings.filter(b => b.date === date);
  }

  async addBooking(bookingData: Omit<Booking, 'id' | 'status' | 'amount' | 'serviceName' | 'chairId'>): Promise<Booking> {
    await delay(500);
    // Find service to get price and name
    const service = MOCK_SERVICES.find(s => s.id === bookingData.serviceId);
    
    const newBooking: Booking = {
      id: `B${Math.floor(Math.random() * 10000)}`,
      ...bookingData,
      serviceName: service?.name || 'Custom Service',
      amount: service?.price || 0,
      status: BookingStatus.PENDING,
      chairId: Math.floor(Math.random() * 5) + 1
    };
    
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  // --- CUSTOMERS ---
  async getCustomers(): Promise<Customer[]> {
    await delay(400);
    return this.customers;
  }

  async addCustomer(customer: Omit<Customer, 'id' | 'totalVisits' | 'lastVisit' | 'ltv' | 'status'>): Promise<Customer> {
    await delay(500);
    const newCustomer: Customer = {
      ...customer,
      id: `C${Math.floor(Math.random() * 1000)}`,
      totalVisits: 0,
      lastVisit: '-',
      ltv: 0,
      status: 'Active'
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  // --- INVOICES ---
  async createInvoice(invoiceData: Omit<Invoice, 'id'>): Promise<Invoice> {
    await delay(600);
    const newInvoice: Invoice = {
      id: `INV-${Math.floor(Math.random() * 10000)}`,
      ...invoiceData
    };
    this.invoices.push(newInvoice);
    console.log("Invoice Generated:", newInvoice);
    return newInvoice;
  }

  // --- SUPPORT ---
  async getTickets(): Promise<Ticket[]> {
    await delay(300);
    return this.tickets;
  }

  async createTicket(subject: string, message: string): Promise<Ticket> {
    await delay(500);
    const newTicket: Ticket = {
      id: `T${Math.floor(Math.random() * 1000)}`,
      subject,
      message,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  // --- AUTH ---
  async validateVendor(phone: string): Promise<boolean> {
    await delay(800);
    // Simple mock validation logic
    if (phone.length < 10) return false;
    return true;
  }

  async submitApplication(data: any): Promise<boolean> {
    await delay(2000); // Simulate processing
    console.log("Vendor Application Submitted to MySQL:", data);
    return true;
  }
}

export const db = new DatabaseService();