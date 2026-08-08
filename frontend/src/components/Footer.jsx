import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Send, Phone, Mail, MapPin, Shield, CreditCard, Award, Heart } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { showSuccess, showError } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showError('Please enter a valid email address');
      return;
    }
    showSuccess('Thank you for subscribing to Dream Miles Newsletter!');
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                DREAM<span className="text-emerald-500">MILES</span>
              </span>
            </Link>
            <p className="text-emerald-400 font-semibold italic text-sm">"Turn Every Journey Into a Memory."</p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Explore More. Travel Better. Dream Further. Dream Miles is a modern full-stack travel booking & destination discovery platform offering bespoke tour packages, luxury accommodations, and unforgettable journeys around the globe.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Destinations</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/destinations?country=India" className="hover:text-emerald-400 transition-colors">India (Rajasthan & Goa)</Link></li>
              <li><Link to="/destinations?country=France" className="hover:text-emerald-400 transition-colors">France (Paris & Riviera)</Link></li>
              <li><Link to="/destinations?country=Japan" className="hover:text-emerald-400 transition-colors">Japan (Tokyo & Kyoto)</Link></li>
              <li><Link to="/destinations?country=United Arab Emirates" className="hover:text-emerald-400 transition-colors">UAE (Dubai & Abu Dhabi)</Link></li>
              <li><Link to="/destinations?country=Switzerland" className="hover:text-emerald-400 transition-colors">Switzerland (Zurich & Alps)</Link></li>
              <li><Link to="/destinations?country=Indonesia" className="hover:text-emerald-400 transition-colors">Bali (Indonesia)</Link></li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Tour Packages</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/tours?category=Cultural" className="hover:text-emerald-400 transition-colors">Cultural Heritage Tours</Link></li>
              <li><Link to="/tours?category=Honeymoon" className="hover:text-emerald-400 transition-colors">Romantic Honeymoon</Link></li>
              <li><Link to="/tours?category=Luxury" className="hover:text-emerald-400 transition-colors">Luxury Escapes</Link></li>
              <li><Link to="/tours?category=Adventure" className="hover:text-emerald-400 transition-colors">Alpine & Desert Adventure</Link></li>
              <li><Link to="/tours?category=Beach" className="hover:text-emerald-400 transition-colors">Beach & Island Resorts</Link></li>
              <li><Link to="/tours?category=Family" className="hover:text-emerald-400 transition-colors">Family Vacations</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Stay Inspired</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get secret travel deals, exclusive coupons, and destination guides in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Dream Miles Travel Platform. Built with passion & excellence.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Support Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};