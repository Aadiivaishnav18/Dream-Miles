import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { Home } from '../pages/Home';
import { Destinations } from '../pages/Destinations';
import { DestinationDetail } from '../pages/DestinationDetail';
import { Countries } from '../pages/Countries';
import { CountryDetail } from '../pages/CountryDetail';
import { Tours } from '../pages/Tours';
import { PackageDetail } from '../pages/PackageDetail';
import { Checkout } from '../pages/Checkout';
import { BookingSuccess } from '../pages/BookingSuccess';
import { Hotels } from '../pages/Hotels';
import { Activities } from '../pages/Activities';
import { FlightsInfo } from '../pages/FlightsInfo';
import { Blog } from '../pages/Blog';
import { BlogDetail } from '../pages/BlogDetail';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { UserDashboard } from '../pages/UserDashboard';
import { AdminDashboard } from '../pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="pt-32 text-center text-xs font-bold text-slate-400">Verifying session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="pt-32 text-center text-xs font-bold text-slate-400">Verifying admin access...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  return children;
};

export const AppRoutes = ({ onOpenSearch }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destinations/:slug" element={<Destinations />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:slug" element={<CountryDetail />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:slug" element={<PackageDetail />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/flights" element={<FlightsInfo />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<UserDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User Routes */}
      <Route
        path="/checkout/:packageId"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-success/:id"
        element={
          <ProtectedRoute>
            <BookingSuccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
