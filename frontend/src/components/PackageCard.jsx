import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNotification } from '../context/NotificationContext';
import { motion } from 'framer-motion';

export const PackageCard = ({ pkg }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { showSuccess, showInfo } = useNotification();

  const isFav = isInWishlist(pkg._id);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = await toggleWishlist(pkg._id, pkg);
    if (added) {
      showSuccess(`Added "${pkg.title}" to Wishlist!`);
    } else {
      showInfo(`Removed from Wishlist`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-100 flex flex-col justify-between group font-sans"
    >
      <div>
        {/* Image & Badges Overlay */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          <img
            src={pkg.coverImage}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              {pkg.category}
            </span>
            {pkg.discountPercentage > 0 && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-md">
                {pkg.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isFav
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-110'
                : 'bg-slate-900/60 text-white hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {pkg.days}D / {pkg.nights}N
              </span>
              <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                Max {pkg.maxGroupSize || 12}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-amber-500/90 text-slate-950 px-2 py-1 rounded-lg font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              {pkg.rating || 4.8}
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5 space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {pkg.countryName || 'International'} • {pkg.destinationName}
          </div>

          <h3 className="text-base font-extrabold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {pkg.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {pkg.overview}
          </p>

          {/* Highlights Pills */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pkg.highlights.slice(0, 2).map((h, idx) => (
                <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md truncate max-w-[200px]">
                  ✓ {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & CTA */}
      <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Starting from</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900">{formatPrice(pkg.finalPrice)}</span>
            {pkg.price > pkg.finalPrice && (
              <span className="text-xs text-slate-400 line-through font-semibold">{formatPrice(pkg.price)}</span>
            )}
          </div>
        </div>

        <Link
          to={`/tours/${pkg.slug}`}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 group-hover:bg-emerald-600"
        >
          <span>View Tour</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};
