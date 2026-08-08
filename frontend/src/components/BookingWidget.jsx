import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Tag, Check, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';

export const BookingWidget = ({ pkg }) => {
  const [travelDate, setTravelDate] = useState(pkg?.availableDates?.[0] || '2026-09-10');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const { formatPrice } = useCurrency();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  // Price calculations
  const adultPrice = pkg.finalPrice || 50000;
  const childPrice = pkg.childPrice || Math.round(adultPrice * 0.7);
  const infantPrice = pkg.infantPrice || Math.round(adultPrice * 0.2);

  const adultTotal = adultPrice * adults;
  const childTotal = childPrice * children;
  const infantTotal = infantPrice * infants;
  const subtotal = adultTotal + childTotal + infantTotal;

  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.calculatedDiscount || 0;
  }

  const tax = Math.round((subtotal - discount) * 0.05); // 5% Tax
  const grandTotal = Math.round(subtotal - discount + tax);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    try {
      const { data } = await API.post('/coupons/validate', {
        code: couponCode,
        amount: subtotal,
      });

      if (data.success && data.data) {
        setAppliedCoupon(data.data);
        showSuccess(`Coupon "${data.data.code}" applied! Saved ${formatPrice(data.data.calculatedDiscount)}`);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Invalid or expired coupon code');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleProceedToCheckout = () => {
    const bookingPayload = {
      packageId: pkg._id,
      travelDate,
      travelers: { adults, children, infants },
      couponCode: appliedCoupon?.code || '',
      pricing: {
        basePrice: adultPrice,
        adultTotal,
        childTotal,
        infantTotal,
        subtotal,
        discount,
        tax,
        grandTotal,
      },
    };

    localStorage.setItem('dream_pending_booking', JSON.stringify(bookingPayload));
    navigate(`/checkout/${pkg._id}`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 sticky top-24 font-sans space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-2xl font-black text-slate-900">{formatPrice(adultPrice)}</span>
          <span className="text-xs text-slate-500 font-semibold"> / per person</span>
        </div>
        {pkg.price > pkg.finalPrice && (
          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
            Save {pkg.discountPercentage}%
          </span>
        )}
      </div>

      {/* Date Picker */}
      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Calendar className="w-4 h-4 text-emerald-600" /> Select Travel Date
        </label>
        <select
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {pkg.availableDates && pkg.availableDates.length > 0 ? (
            pkg.availableDates.map((d) => (
              <option key={d} value={d}>
                📅 {new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </option>
            ))
          ) : (
            <option value="2026-09-10">📅 Sep 10, 2026</option>
          )}
        </select>
      </div>

      {/* Traveler Counters */}
      <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Users className="w-4 h-4 text-emerald-600" /> Select Travelers
        </label>

        {/* Adults */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800">Adults (12+ yrs)</span>
            <span className="text-[10px] text-slate-400 block">{formatPrice(adultPrice)}</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200"
            >
              -
            </button>
            <span className="font-bold text-slate-900 w-4 text-center">{adults}</span>
            <button
              onClick={() => setAdults(adults + 1)}
              className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800">Children (2-11 yrs)</span>
            <span className="text-[10px] text-slate-400 block">{formatPrice(childPrice)}</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200"
            >
              -
            </button>
            <span className="font-bold text-slate-900 w-4 text-center">{children}</span>
            <button
              onClick={() => setChildren(children + 1)}
              className="w-6 h-6 rounded bg-slate-100 font-bold hover:bg-slate-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Coupon Application Box */}
      <form onSubmit={handleApplyCoupon} className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <Tag className="w-4 h-4 text-emerald-600" /> Apply Promo Coupon
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="e.g. WELCOME100"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase placeholder:normal-case focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={couponLoading}
            className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            {couponLoading ? 'Checking...' : 'Apply'}
          </button>
        </div>
        {appliedCoupon && (
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Coupon {appliedCoupon.code} applied!
          </p>
        )}
      </form>

      {/* Price Summary breakdown */}
      <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3">
        <div className="flex justify-between text-slate-600">
          <span>Adults ({adults} × {formatPrice(adultPrice)})</span>
          <span className="font-semibold">{formatPrice(adultTotal)}</span>
        </div>

        {children > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Children ({children} × {formatPrice(childPrice)})</span>
            <span className="font-semibold">{formatPrice(childTotal)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Coupon Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Taxes & Fees (5% GST)</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
          <span>Total Payable</span>
          <span className="text-emerald-600">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleProceedToCheckout}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        Instant confirmation • Free cancellation options
      </div>
    </div>
  );
};
