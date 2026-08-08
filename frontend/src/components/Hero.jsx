import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, DollarSign, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('search', destination);
    if (category) params.append('category', category);
    if (maxPrice) params.append('maxPrice', maxPrice);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
      {/* Background Image Carousel / Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Travel Hero Background"
          className="w-full h-full object-cover object-center scale-105 animate-pulse transition-transform duration-10000"
          style={{ animationDuration: '20s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold tracking-wider uppercase shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Premium Tour Packages & World-Class Journeys</span>
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Your Next Adventure <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Starts Here.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow">
            Discover breathtaking destinations, unforgettable experiences, and perfectly planned journeys with Dream Miles.
          </p>
        </motion.div>

        {/* Global Search Component Box */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/30 text-slate-800 text-left max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Field 1: Destination */}
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 focus-within:border-emerald-500 transition-colors">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Where to?
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Japan, Paris, Jaipur, Bali..."
                className="w-full bg-transparent text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Field 2: Travel Type / Category */}
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 focus-within:border-emerald-500 transition-colors">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-600" /> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Cultural">Cultural & Heritage</option>
                <option value="Honeymoon">Honeymoon & Romantic</option>
                <option value="Luxury">Luxury Escapes</option>
                <option value="Adventure">Alpine & Adventure</option>
                <option value="Beach">Beach & Island</option>
                <option value="Family">Family Vacations</option>
              </select>
            </div>

            {/* Field 3: Max Budget */}
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 focus-within:border-emerald-500 transition-colors">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Max Budget (₹)
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 80000"
                className="w-full bg-transparent text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Field 4: Travel Dates */}
            <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 focus-within:border-emerald-500 transition-colors">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Travel Date
              </label>
              <input
                type="date"
                className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              ✨ Over <span className="font-bold text-slate-800">500+</span> curated destinations worldwide
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/destinations')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors text-center"
              >
                Plan My Trip
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 hover:scale-105 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Explore Now
              </button>
            </div>
          </div>
        </motion.form>

        {/* Quick Stats Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-white text-center">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <p className="text-2xl font-black text-emerald-400">12+</p>
            <p className="text-xs text-slate-300 font-medium">Countries</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <p className="text-2xl font-black text-amber-400">25+</p>
            <p className="text-xs text-slate-300 font-medium">Destinations</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <p className="text-2xl font-black text-teal-400">100%</p>
            <p className="text-xs text-slate-300 font-medium">Verified Reviews</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <p className="text-2xl font-black text-emerald-400">24/7</p>
            <p className="text-xs text-slate-300 font-medium">Concierge Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};