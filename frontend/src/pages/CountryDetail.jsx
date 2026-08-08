import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { Globe, MapPin, Calendar, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import API from '../api/axios';

export const CountryDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/countries/${slug}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching country:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [slug]);

  if (loading) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Loading country guide...</div>;
  }

  if (!data || !data.country) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Country not found.</div>;
  }

  const { country, destinations = [], packages = [] } = data;

  return (
    <div className="pt-20 pb-16 min-h-screen bg-slate-50 font-sans space-y-12">
      {/* Hero Banner */}
      <div className="relative h-[60vh] bg-slate-950 overflow-hidden">
        <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <span>{country.flag}</span> <span>{country.continent}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black">{country.name} Travel Guide</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">{country.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Facts Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Capital City</span>
            <span className="font-extrabold text-slate-900 text-sm">{country.capital}</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Currency</span>
            <span className="font-extrabold text-slate-900 text-sm">{country.currency} ({country.currencySymbol})</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Best Time To Visit</span>
            <span className="font-extrabold text-slate-900 text-sm">{country.bestTimeToVisit}</span>
          </div>
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Visa Requirements</span>
            <span className="font-extrabold text-emerald-600 text-sm">{country.visaInfo || 'e-Visa Available'}</span>
          </div>
        </div>

        {/* Popular Destinations */}
        {destinations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Popular Destinations in {country.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((d) => (
                <DestinationCard key={d._id} destination={d} />
              ))}
            </div>
          </div>
        )}

        {/* Tour Packages */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Curated Tour Packages in {country.name}</h2>
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-xs font-bold text-slate-400">
              No specific tour packages found for {country.name} yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
