import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookingWidget } from '../components/BookingWidget';
import { ItineraryTimeline } from '../components/ItineraryTimeline';
import { ReviewSection } from '../components/ReviewSection';
import { PackageCard } from '../components/PackageCard';
import { MapPin, Clock, Users, Star, ShieldCheck, Check, X, Heart, Share2, Award, Info } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';

export const PackageDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { showSuccess, showInfo } = useNotification();

  useEffect(() => {
    fetchPackageDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPackageDetails = async () => {
    setLoading(true);
    try {
      const { data: resData } = await API.get(`/packages/${slug}`);
      if (resData.success && resData.data) {
        setData(resData.data);
        setActiveImage(resData.data.package?.coverImage);
      }
    } catch (err) {
      console.error('Error fetching package details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Loading tour package details...</div>;
  }

  if (!data || !data.package) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Tour package not found.</div>;
  }

  const { package: pkg, reviews = [], similarPackages = [] } = data;
  const isFav = isInWishlist(pkg._id);

  const handleWishlistToggle = async () => {
    const added = await toggleWishlist(pkg._id, pkg);
    if (added) showSuccess(`Added "${pkg.title}" to Wishlist!`);
    else showInfo('Removed from Wishlist');
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Package Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                {pkg.category}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {pkg.destinationName || pkg.countryName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{pkg.title}</h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
                isFav
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              <span>{isFav ? 'Saved' : 'Wishlist'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 shadow-lg">
            <img src={activeImage} alt={pkg.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {[pkg.coverImage, ...(pkg.gallery || [])].slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImage === img ? 'border-emerald-500 scale-95 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Facts Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Duration</span>
              <span className="font-extrabold text-slate-900">{pkg.days} Days / {pkg.nights} Nights</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Group Size</span>
              <span className="font-extrabold text-slate-900">Max {pkg.maxGroupSize || 12} People</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Rating</span>
              <span className="font-extrabold text-slate-900">{pkg.rating || 4.8} / 5.0 ({reviews.length} Reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Difficulty</span>
              <span className="font-extrabold text-slate-900">{pkg.difficulty || 'Easy'}</span>
            </div>
          </div>
        </div>

        {/* Main Content & Sticky Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Main Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900">Tour Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pkg.overview}</p>

              {pkg.highlights && pkg.highlights.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Tour Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-800 font-semibold">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Day-by-day Itinerary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <ItineraryTimeline itinerary={pkg.itinerary} />
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 text-emerald-700">
                  <Check className="w-4 h-4" /> What's Included
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {pkg.inclusions?.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 text-rose-700">
                  <X className="w-4 h-4" /> What's Excluded
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {pkg.exclusions?.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <ReviewSection packageId={pkg._id} reviews={reviews} onReviewAdded={fetchPackageDetails} />
            </div>
          </div>

          {/* Right Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget pkg={pkg} />
          </div>
        </div>

        {/* Similar Packages Carousel */}
        {similarPackages.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-2xl font-black text-slate-900">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPackages.slice(0, 3).map((p) => (
                <PackageCard key={p._id} pkg={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
