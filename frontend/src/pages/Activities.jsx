import React, { useEffect, useState } from 'react';
import { Compass, Clock, Star, ArrowUpRight, Award } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import API from '../api/axios';

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/activities');
      if (data.success && data.data) {
        setActivities(data.data);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Adventure & Local Tours</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Popular Activities & Experiences</h1>
          <p className="text-sm text-slate-500">
            Desert safaris, hot air balloon rides, scuba diving, and guided palace walking tours.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-slate-400">Loading activities...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((a) => (
              <div key={a._id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img src={a.images?.[0]} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> {a.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-extrabold text-slate-900">{a.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{a.description}</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" /> {a.rating || 4.8} ({a.reviewsCount || 42} reviews)
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Price per person</span>
                    <span className="text-base font-black text-slate-900">{formatPrice(a.price)}</span>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-1">
                    Book Activity <ArrowUpRight className="w-3.5 h-3.5" />
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
