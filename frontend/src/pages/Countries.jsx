import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import API from '../api/axios';

export const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, [search, continent]);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (continent) params.append('continent', continent);

      const { data } = await API.get(`/countries?${params.toString()}`);
      if (data.success && data.data) {
        setCountries(data.data);
      }
    } catch (err) {
      console.error('Error fetching countries:', err);
    } finally {
      setLoading(false);
    }
  };

  const continents = ['Asia', 'Europe', 'Middle East', 'North America', 'South America', 'Africa', 'Oceania'];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">World Countries Directory</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Explore Countries Around The Globe</h1>
          <p className="text-sm text-slate-500">
            Comprehensive country guides with visa rules, best time to visit, currencies, and verified tour packages.
          </p>

          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country or capital (e.g. India, Japan, France, Paris)..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
          </div>
        </div>

        {/* Continent Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          <button
            onClick={() => setContinent('')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              continent === '' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Continents
          </button>
          {continents.map((cont) => (
            <button
              key={cont}
              onClick={() => setContinent(cont)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                continent === cont ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cont}
            </button>
          ))}
        </div>

        {/* Countries Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-slate-400">Loading countries...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-extrabold flex items-center gap-1.5">
                      <span>{c.flag}</span>
                      <span>{c.continent}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <span>{c.flag}</span> {c.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{c.shortDescription}</p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100 text-slate-600">
                      <div><span className="font-bold text-slate-400">Capital:</span> {c.capital}</div>
                      <div><span className="font-bold text-slate-400">Currency:</span> {c.currency} ({c.currencySymbol})</div>
                      <div><span className="font-bold text-slate-400">Best Time:</span> {c.bestTimeToVisit}</div>
                      <div><span className="font-bold text-slate-400">Timezone:</span> {c.timezone}</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Explore Packages</span>
                  <Link
                    to={`/countries/${c.slug}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-1"
                  >
                    View Country <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
