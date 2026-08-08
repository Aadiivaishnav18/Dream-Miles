import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PackageCard } from '../components/PackageCard';
import { MapPin, Star, Calendar, Sun, Shield, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import API from '../api/axios';

export const DestinationDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/destinations/${slug}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching destination:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Loading destination details...</div>;
  }

  if (!data || !data.destination) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Destination not found.</div>;
  }

  const { destination: dest, packages = [], hotels = [], activities = [] } = data;

  return (
    <div className="pt-20 pb-16 min-h-screen bg-slate-50 font-sans space-y-12">
      {/* Hero Banner */}
      <div className="relative h-[65vh] bg-slate-950 overflow-hidden">
        <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-emerald-400">
            <MapPin className="w-3.5 h-3.5" /> <span>{dest.countryName || 'Global'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black">{dest.name}</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">{dest.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Stats Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Best Time To Visit</span>
            <span className="font-extrabold text-slate-900 text-sm">{dest.bestTime || 'Oct - Mar'}</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Rating</span>
            <span className="font-extrabold text-amber-500 text-sm">★ {dest.rating || 4.8} / 5.0</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Average Budget</span>
            <span className="font-extrabold text-slate-900 text-sm">{formatPrice(dest.startingPrice || 39900)}</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Category</span>
            <span className="font-extrabold text-emerald-600 text-sm">{dest.categoryTag || 'Popular'}</span>
          </div>
        </div>

        {/* Tour Packages */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Tour Packages Including {dest.name}</h2>
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-xs font-bold text-slate-400">
              No packages found specifically for {dest.name}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
