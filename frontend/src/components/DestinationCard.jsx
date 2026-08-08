import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Compass } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { motion } from 'framer-motion';

export const DestinationCard = ({ destination }) => {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl aspect-[4/5] group font-sans cursor-pointer"
    >
      <Link to={`/destinations`}>
        {/* Hero Image */}
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-400 border border-amber-400/30">
            {destination.categoryTag || 'Popular'}
          </span>
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            {destination.rating || 4.8}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            {destination.countryName || 'Global'}
          </div>

          <h3 className="text-2xl font-black tracking-tight drop-shadow-md group-hover:text-emerald-400 transition-colors">
            {destination.name}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {destination.shortDescription}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-white/20 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">From</span>
              <span className="font-extrabold text-white text-sm">{formatPrice(destination.startingPrice || 49900)}</span>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-emerald-600 backdrop-blur-md text-white font-bold text-[11px] transition-colors">
              Explore →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
