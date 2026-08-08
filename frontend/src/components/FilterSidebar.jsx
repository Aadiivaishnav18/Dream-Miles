import React from 'react';
import { Filter, RotateCcw, DollarSign, Clock, Star, Compass } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const FilterSidebar = ({ filters, onFilterChange, onReset }) => {
  const { formatPrice } = useCurrency();

  const categories = [
    'Cultural',
    'Honeymoon',
    'Luxury',
    'Adventure',
    'Beach',
    'Family',
    'Trekking',
    'Wildlife',
  ];

  const difficulties = ['Easy', 'Moderate', 'Challenging'];

  return (
    <aside className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" /> Filter Packages
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Max Price Slider */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Max Price</span>
          <span className="text-slate-900 font-black">{formatPrice(filters.maxPrice || 200000)}</span>
        </label>
        <input
          type="range"
          min="10000"
          max="250000"
          step="5000"
          value={filters.maxPrice || 250000}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          className="w-full accent-emerald-600 cursor-pointer"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-emerald-600" /> Category
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-emerald-600">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onFilterChange('category', filters.category === cat ? '' : cat)}
                className="accent-emerald-600 cursor-pointer"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">Difficulty</label>
        <div className="flex flex-wrap gap-1.5">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => onFilterChange('difficulty', filters.difficulty === diff ? '' : diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filters.difficulty === diff
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" /> Rating
        </label>
        <div className="flex gap-2">
          {['4.8', '4.5', '4.0'].map((r) => (
            <button
              key={r}
              onClick={() => onFilterChange('rating', filters.rating === r ? '' : r)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filters.rating === r ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {r}+ ★
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
