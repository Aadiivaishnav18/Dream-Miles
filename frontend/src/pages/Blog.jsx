import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Clock, ArrowRight } from 'lucide-react';
import API from '../api/axios';

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [search, category]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const { data } = await API.get(`/blog?${params.toString()}`);
      if (data.success && data.data) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Travel Tips', 'Destinations', 'Packing', 'Culture', 'Budget Travel', 'Safety'];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Travel Guides & Stories</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Dream Miles Travel Magazine</h1>
          <p className="text-sm text-slate-500">
            Expert packing advice, visa tips, destination highlights, and secret budget hacks.
          </p>

          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search travel articles (e.g. Packing, Sakura, Europe)..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
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
            All Articles
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

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-slate-400">Loading travel guides...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <div
                key={b._id}
                onClick={() => navigate(`/blog/${b.slug}`)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <img src={b.coverImage} alt={b.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-6 space-y-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      {b.category}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-[11px] font-bold text-slate-400 flex items-center justify-between">
                  <span>{b.readTime || '5 min read'}</span>
                  <span className="text-emerald-600 font-extrabold flex items-center gap-1">Read Guide →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
