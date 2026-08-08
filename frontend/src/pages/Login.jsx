import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      showSuccess(`Welcome back, ${user.name}!`);
      if (user.role === 'Admin' || user.role === 'SuperAdmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    setEmail('admin@dreammiles.com');
    setPassword('Admin@123456');
  };

  const handleDemoUser = () => {
    setEmail('john@example.com');
    setPassword('User@123456');
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl space-y-6 text-slate-900">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-600/30">
            <Compass className="w-7 h-7 animate-spin" style={{ animationDuration: '30s' }} />
          </div>
          <h2 className="text-2xl font-black">Welcome Back</h2>
          <p className="text-xs text-slate-500">Sign in to manage your bookings and wishlist</p>
        </div>

        {/* Demo Quick Fill Badges */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
          <p className="font-extrabold text-emerald-900 text-[11px] uppercase tracking-wider">Quick Demo Login:</p>
          <div className="flex gap-2">
            <button
              onClick={handleDemoAdmin}
              type="button"
              className="px-2.5 py-1 bg-emerald-700 text-white rounded-lg font-bold text-[10px] hover:bg-emerald-800"
            >
              🔑 Fill Admin Credentials
            </button>
            <button
              onClick={handleDemoUser}
              type="button"
              className="px-2.5 py-1 bg-slate-800 text-white rounded-lg font-bold text-[10px] hover:bg-slate-900"
            >
              👤 Fill User Credentials
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@dreammiles.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};
