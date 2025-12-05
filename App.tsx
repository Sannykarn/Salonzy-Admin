import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Services from './pages/Services';

const App: React.FC = () => {
  // Simple auth state for demo purposes
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Protected Layout Wrapper
  const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;

    return (
      <div className="flex min-h-screen bg-black text-white font-sans">
        <Sidebar onLogout={handleLogout} />
        <main className="ml-64 flex-1 p-0 overflow-y-auto">
           {children}
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing onLogin={handleLogin} />
        } />
        
        <Route path="/dashboard" element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        } />

        <Route path="/bookings" element={
          <AdminLayout>
            <Bookings />
          </AdminLayout>
        } />

        <Route path="/services" element={
          <AdminLayout>
            <Services />
          </AdminLayout>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
