import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { MapSection } from '../components/MapSection';
import { Compass, ShieldCheck, Award, Headphones, ArrowRight, Sparkles, Star, Tag, CheckCircle2 } from 'lucide-react';
import API from '../api/axios';

export const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, pkgRes, blogRes] = await Promise.all([
          API.get('/destinations?featured=true'),
          API.get('/packages?featured=true&limit=6'),
          API.get('/blog?featured=true&limit=3'),
        ]);

        setDestinations(destRes.data.data || []);
        setFeaturedPackages(pkgRes.data.data?.packages || []);
        setBlogs(blogRes.data.data || []);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { title: 'Cultural Heritage', icon: '🏛️', tag: 'Cultural', desc: 'Ancient forts, grand palaces, & royal history' },
    { title: 'Romantic Honeymoon', icon: '💖', tag: 'Honeymoon', desc: 'Private villas, lake cruises, & sunset views' },
    { title: 'Luxury Escapes', icon: '✨', tag: 'Luxury', desc: '5-star resorts, private suites, & concierge' },
    { title: 'Alpine & Adventure', icon: '🏔️', tag: 'Adventure', desc: 'Ski slopes, mountain summits, & dune safaris' },
    { title: 'Beach & Islands', icon: '🏝️', tag: 'Beach', desc: 'Turquoise ocean waves & tropical palm resorts' },
    { title: 'Family Vacations', icon: '👨‍👩‍👧‍👦', tag: 'Family', desc: 'Kid-friendly itineraries & theme park passes' },
  ];

  return (
    <div className="space-y-16 font-sans">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Destination Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Discover The World</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Trending Destinations</h2>
          </div>
          <Link
            to="/destinations"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>Explore All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0, 4).map((dest) => (
            <DestinationCard key={dest._id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 3. Package Categories */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Curated Travel Experiences</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Browse By Category</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => (
              <div
                key={c.tag}
                onClick={() => navigate(`/tours?category=${c.tag}`)}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-500 hover:shadow-xl cursor-pointer transition-all flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                  {c.icon}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Handcrafted Itineraries</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Popular Tour Packages</h2>
          </div>
          <Link
            to="/tours"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* 5. Interactive World Map */}
      <MapSection />

      {/* 6. Promotional Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl border border-emerald-800/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" /> Early Bird 2026 Special
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Get Up To <span className="text-amber-400">20% OFF</span> Your Next Dream Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use promo code <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/40">WELCOME100</span> at checkout for instant discounts across all Rajasthan, Bali, Dubai, and European tours!
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              to="/tours"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-xl hover:scale-105 transition-all text-center"
            >
              Claim Special Discount
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Dream Miles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">The Dream Miles Difference</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Why Travelers Trust Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">100% Verified Trips</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Handpicked 4-star & 5-star hotels with licensed local tour guides.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Best Price Guarantee</h3>
            <p className="text-xs text-slate-500 leading-relaxed">No hidden fees. Transparent price breakdown with free cancellation options.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Customized Itineraries</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Tailor-made itineraries crafted by certified travel architects.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">24/7 Concierge Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Dedicated travel managers assisting you every step of your journey.</p>
          </div>
        </div>
      </section>

      {/* 8. Travel Guides Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Travel Advice & Inspiration</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Latest Travel Guides</h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <div
              key={b._id}
              onClick={() => navigate(`/blog/${b.slug}`)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <img src={b.coverImage} alt={b.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6 space-y-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                  {b.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                <div className="text-[11px] font-bold text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>{b.readTime || '5 min read'}</span>
                  <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">Read Story →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
