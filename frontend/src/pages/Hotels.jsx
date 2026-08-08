import React, { useEffect, useState } from 'react';
import { Hotel, Star, Wifi, Waves, ParkingSquare, Coffee, ShieldCheck, MapPin } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import API from '../api/axios';

export const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchHotels();
  }, [search]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/hotels?search=${search}`);
      if (data.success && data.data) {
        setHotels(data.data);
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Luxury Accommodations</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Featured Hotels & Resorts</h1>
          <p className="text-sm text-slate-500">
            Handpicked 4-star and 5-star palace hotels, jungle pool villas, and luxury city skyscrapers.
          </p>
        </div>

        {/* Hotels Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-slate-400">Loading hotels...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotels.map((h) => (
              <div key={h._id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img src={h.images?.[0]} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-400 font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {h.starRating} Star Hotel
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {h.location}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">{h.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{h.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {h.amenities?.map((amenity, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Price per night</span>
                    <span className="text-base font-black text-slate-900">{formatPrice(h.pricePerNight)}</span>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-600 transition-colors">
                    View Rooms
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
