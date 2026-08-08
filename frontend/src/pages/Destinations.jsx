<<<<<<< HEAD:frontend/src/pages/Destinations.jsx
import React, { useState, useEffect } from 'react';
import { DestinationCard } from '../components/DestinationCard';
import { Search, MapPin, Compass } from 'lucide-react';
import API from '../api/axios';

export const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, [search, category]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const { data } = await API.get(`/destinations?${params.toString()}`);
      if (data.success && data.data) {
        setDestinations(data.data);
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Popular', 'Trending', 'Hidden Gem', 'Luxury', 'Honeymoon', 'Beach', 'Adventure'];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Title & Search Bar */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Global Destination Explorer</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">Explore Unforgettable Places</h1>
          <p className="text-sm text-slate-500">
            From regal palaces in Jaipur and romantic Parisian riverfronts to tropical Balinese sanctuaries.
          </p>

          {/* Search Box */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city or country (e.g. Jaipur, Japan, Paris)..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
              />
            </div>
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
            All Destinations
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

        {/* Grid Results */}
        {loading ? (
          <div className="text-center py-16 text-xs font-bold text-slate-400">Loading global destinations...</div>
        ) : destinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <DestinationCard key={d._id} destination={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto space-y-3">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search terms or filter selection.</p>
          </div>
        )}
      </div>
    </div>
  );
};
=======
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { destinationsData } from "../data/destinationsData";

const Destinations = () => {
  const [search, setSearch] = useState("");

  const filteredDestinations = destinationsData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#020617] via-[#081120] to-black overflow-hidden">

      <Navbar />

      <div className="flex-1 pt-28 px-6">

        <div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Explore Destinations 🌍
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Discover breathtaking travel experiences around the world
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-14"
        >
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-14 pr-5 py-4 rounded-full bg-[#111827]/90 backdrop-blur-xl border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-2xl"
            />
          </div>
        </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 pb-20">

  {filteredDestinations.map((dest, index) => (
    <motion.div
      key={dest.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
      }}
      viewport={{ once: true }}
      whileHover={{
        rotateX: -5,
        rotateY: 5,
        y: -8,
        scale: 1.02,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-[#0f172a]/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/10 shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 max-w-[350px] w-full mx-auto"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative h-44 overflow-hidden">

        <motion.img
          src={dest.image}
          alt={dest.name}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-black px-3 py-1 rounded-full font-bold text-xs shadow-lg">
          ${dest.price}
        </div>

        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-black px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold text-xs shadow-lg">
          <Star
            size={11}
            className="fill-orange-400 text-orange-400"
          />
          {dest.rating}
        </div>

      </div>

      <div className="p-5 flex flex-col justify-between min-h-[180px] relative z-10">

        <div>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-all duration-300">
            {dest.name}
          </h2>

          <p className="text-gray-400 leading-6 text-sm line-clamp-2">
            {dest.description}
          </p>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.96 }}
          className="mt-5 text-cyan-400 font-semibold flex items-center gap-2 text-sm transition-all"
        >
          Explore →
        </motion.button>

      </div>

      <div className="absolute -inset-[1px] rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/20 transition-all duration-500 pointer-events-none" />

    </motion.div>
  ))}

</div>

      </div>


      <div className="bg-gradient-to-b from-[#081120] via-[#0b1729] to-black border-t border-gray-800">
        <Footer />
      </div>

    </div>
  );
};

export default Destinations;
>>>>>>> e1e4f9a3bd27b84f363f72af77e3795b849ebe82:src/pages/Destinations.jsx
