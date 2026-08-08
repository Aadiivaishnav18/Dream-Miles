import React, { useState, useEffect } from 'react';
import { DestinationCard } from '../components/DestinationCard';
import { Search, MapPin, Compass } from 'lucide-react';
import API from '../api/axios';

export const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, [search, category]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const { data } = await API.get(`/destinations?${params.toString()}`);
      if (data.success && data.data) {
        setDestinations(data.data);
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Popular', 'Trending', 'Hidden Gem', 'Luxury', 'Honeymoon', 'Beach', 'Adventure'];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Title & Search Bar */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Global Destination Explorer</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Explore Unforgettable Places</h1>
          <p className="text-sm text-slate-500">
            From regal palaces in Jaipur and romantic Parisian riverfronts to tropical Balinese sanctuaries.
          </p>

          {/* Search Box */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city or country (e.g. Jaipur, Japan, Paris)..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              category === '' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Destinations
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                category === c ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid Results */}
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-slate-400">Loading global destinations...</div>
        ) : destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d._id} destination={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto space-y-3">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search terms or filter selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};