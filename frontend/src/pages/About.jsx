import React from 'react';
import { Compass, Award, ShieldCheck, Heart, Globe, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Our Story & Mission</span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900">About Dream Miles</h1>
          <p className="text-base text-slate-600 leading-relaxed">
            "Turn Every Journey Into a Memory." Dream Miles is a modern full-stack travel platform dedicated to curating bespoke tour packages, luxury accommodations, and unforgettable global discovery experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Global Reach</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Connecting travelers with over 500+ curated destinations across 6 continents.</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Bespoke Quality</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Handcrafted itineraries with verified 4-star and 5-star accommodations.</p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">100% Trust</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Transparent pricing, instant confirmations, and 24/7 concierge assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
