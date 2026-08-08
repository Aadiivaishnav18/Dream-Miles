import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, User, Mail, Phone, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';

export const Checkout = () => {
  const { packageId } = useParams();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(() => {
    const saved = localStorage.getItem('dream_pending_booking');
    return saved ? JSON.parse(saved) : null;
  });

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Traveler form state
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState('Male');
  const [nationality, setNationality] = useState('Indian');

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  useEffect(() => {
    if (!user) {
      showError('Please sign in to complete your booking');
      navigate('/login');
      return;
    }

    const fetchPkg = async () => {
      try {
        const { data } = await API.get(`/packages`);
        const found = data.data?.packages?.find((p) => p._id === packageId);
        if (found) setPkg(found);
      } catch (err) {
        console.error('Checkout error:', err);
      }
    };
    fetchPkg();
  }, [packageId, user]);

  const handleCompleteBooking = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      showError('Please fill out all traveler contact details');
      return;
    }

    setLoading(true);
    try {
      // 1. Create Booking Record
      const { data: bookingRes } = await API.post('/bookings', {
        packageId,
        travelDate: bookingData?.travelDate || '2026-09-10',
        travelers: bookingData?.travelers || { adults: 1, children: 0, infants: 0 },
        travelerDetails: [{ fullName, email, phone, gender, nationality }],
        couponCode: bookingData?.couponCode || '',
        paymentMethod,
      });

      if (bookingRes.success && bookingRes.data) {
        const createdBooking = bookingRes.data;

        // 2. Create Payment Order
        const { data: paymentOrderRes } = await API.post('/payments/create-order', {
          bookingId: createdBooking.bookingId,
        });

        // 3. Verify Payment Simulation
        const { data: verifyRes } = await API.post('/payments/verify', {
          bookingId: createdBooking.bookingId,
          razorpayOrderId: paymentOrderRes.data?.orderId,
          razorpayPaymentId: `pay_${Math.random().toString(36).substring(2, 10)}`,
        });

        if (verifyRes.success) {
          showSuccess(`Booking #${createdBooking.bookingId} confirmed!`);
          localStorage.removeItem('dream_pending_booking');
          navigate(`/booking-success/${createdBooking.bookingId}`);
        }
      }
    } catch (err) {
      console.error('Booking completion error:', err);
      showError(err.response?.data?.message || 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pricing = bookingData?.pricing || { grandTotal: 50000 };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Secure Checkout</span>
          <h1 className="text-3xl font-black text-slate-900">Complete Your Reservation</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Main Form */}
          <form onSubmit={handleCompleteBooking} className="md:col-span-2 space-y-6">
            {/* Step 1: Lead Traveler Details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" /> Primary Traveler Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="As shown on Passport / ID"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="For booking voucher & tickets"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway Selection */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" /> Payment Gateway Selection
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setPaymentMethod('Razorpay')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'Razorpay'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-900">Razorpay (India)</p>
                    <p className="text-[10px] text-slate-500">UPI, GPay, PhonePe, Cards, NetBanking</p>
                  </div>
                  <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'Razorpay' ? 'text-emerald-600' : 'text-slate-300'}`} />
                </div>

                <div
                  onClick={() => setPaymentMethod('Stripe')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'Stripe'
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-900">Stripe (International)</p>
                    <p className="text-[10px] text-slate-500">Credit / Debit Cards Worldwide</p>
                  </div>
                  <CheckCircle2 className={`w-4 h-4 ${paymentMethod === 'Stripe' ? 'text-emerald-600' : 'text-slate-300'}`} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Encrypted Payment Architecture. Tokens generated securely.</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-sm shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Processing Payment...' : `Pay ${formatPrice(pricing.grandTotal)} & Confirm Booking`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Right Order Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 font-sans text-xs">
            <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">Booking Summary</h3>

            {pkg && (
              <div className="flex items-center gap-3">
                <img src={pkg.coverImage} alt={pkg.title} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="font-extrabold text-slate-900 line-clamp-1">{pkg.title}</p>
                  <p className="text-[11px] text-slate-500">{pkg.days}D / {pkg.nights}N • {pkg.destinationName}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 border-t border-b border-slate-100 py-3 text-slate-600">
              <div className="flex justify-between">
                <span>Travel Date:</span>
                <span className="font-bold text-slate-900">{bookingData?.travelDate || '2026-09-10'}</span>
              </div>
              <div className="flex justify-between">
                <span>Travelers:</span>
                <span className="font-bold text-slate-900">{bookingData?.travelers?.adults || 1} Adult(s)</span>
              </div>
            </div>

            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-black text-emerald-600 text-base">{formatPrice(pricing.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
