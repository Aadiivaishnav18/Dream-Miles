import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageCard } from '../components/PackageCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Search, SlidersHorizontal, Package, ArrowUpDown } from 'lucide-react';
import API from '../api/axios';

export const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    difficulty: '',
    rating: '',
  });

  useEffect(() => {
    fetchPackages();
  }, [search, sort, filters]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (sort) params.append('sort', sort);
      if (filters.category) params.append('category', filters.category);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.rating) params.append('rating', filters.rating);

      const { data } = await API.get(`/packages?${params.toString()}`);
      if (data.success && data.data) {
        setPackages(data.data.packages || []);
        setTotal(data.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Error fetching tour packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSearch('');
    setFilters({ category: '', maxPrice: '', difficulty: '', rating: '' });
    setSort('newest');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Curated Tour Marketplace</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Explore Tour Packages ({total})</h1>
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search packages..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Rating: Highest</option>
              <option value="popularity">Popularity</option>
            </select>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden col-span-1">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
            </div>
          )}

          {/* Package Cards Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20 text-xs font-bold text-slate-400">Loading tour packages...</div>
            ) : packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <PackageCard key={pkg._id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-3">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No packages match your filters</h3>
                <p className="text-xs text-slate-400">Try resetting filters or searching another destination.</p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
