import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Package, Globe, BookOpen, ChevronRight, TrendingUp } from 'lucide-react';
import API from '../api/axios';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ packages: [], destinations: [], countries: [], blogs: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ packages: [], destinations: [], countries: [], blogs: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [pkgRes, destRes, countryRes, blogRes] = await Promise.all([
          API.get(`/packages?search=${query}&limit=4`),
          API.get(`/destinations?search=${query}`),
          API.get(`/countries?search=${query}`),
          API.get(`/blog?search=${query}`),
        ]);

        setResults({
          packages: pkgRes.data.data?.packages || [],
          destinations: destRes.data.data || [],
          countries: countryRes.data.data || [],
          blogs: blogRes.data.data || [],
        });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden font-sans">
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries, destinations, tour packages, or blog articles..."
            className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 text-xs font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Popular Suggestions Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {!query && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 tracking-wider">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Jaipur', 'Paris Romantic', 'Bali Honeymoon', 'Dubai Luxury', 'Switzerland Alps', 'Japan Cherry Blossom'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && <div className="text-center py-8 text-xs font-semibold text-slate-400">Searching global travel database...</div>}

          {!loading && query && (
            <div className="space-y-6">
              {/* Tour Packages */}
              {results.packages.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-emerald-600" /> Tour Packages
                  </h4>
                  <div className="space-y-2">
                    {results.packages.map((pkg) => (
                      <div
                        key={pkg._id}
                        onClick={() => handleSelect(`/tours/${pkg.slug}`)}
                        className="p-3 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img src={pkg.coverImage} alt={pkg.title} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{pkg.title}</p>
                            <p className="text-[11px] text-slate-500">{pkg.days} Days • {pkg.destinationName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-emerald-600">₹{pkg.finalPrice?.toLocaleString()}</p>
                          <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations */}
              {results.destinations.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" /> Destinations
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {results.destinations.map((dest) => (
                      <div
                        key={dest._id}
                        onClick={() => handleSelect(`/destinations`)}
                        className="p-2.5 rounded-xl border border-slate-100 hover:bg-amber-50/50 cursor-pointer flex items-center gap-2"
                      >
                        <img src={dest.heroImage} alt={dest.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{dest.name}</p>
                          <p className="text-[10px] text-slate-500">{dest.countryName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries */}
              {results.countries.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-teal-600" /> Countries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.countries.map((c) => (
                      <button
                        key={c._id}
                        onClick={() => handleSelect(`/countries/${c.slug}`)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                      >
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs */}
              {results.blogs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> Travel Guides
                  </h4>
                  <div className="space-y-2">
                    {results.blogs.map((b) => (
                      <div
                        key={b._id}
                        onClick={() => handleSelect(`/blog/${b.slug}`)}
                        className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer text-xs font-bold text-slate-800 flex items-center justify-between"
                      >
                        <span>{b.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.packages.length === 0 &&
                results.destinations.length === 0 &&
                results.countries.length === 0 &&
                results.blogs.length === 0 && (
                  <div className="text-center py-8 text-xs font-medium text-slate-400">
                    No results found for "{query}". Try searching another keyword like "Goa", "Bali", "Paris", or "Honeymoon".
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
