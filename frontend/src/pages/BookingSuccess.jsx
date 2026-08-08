import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Download, Printer, ArrowRight, ShieldCheck, Calendar, MapPin, FileText } from 'lucide-react';
import { InvoiceModal } from '../components/InvoiceModal';
import { useCurrency } from '../context/CurrencyContext';
import API from '../api/axios';

export const BookingSuccess = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await API.get(`/bookings/${id}`);
        if (data.success && data.data) {
          setBooking(data.data);
        }
      } catch (err) {
        console.error('Error loading booking confirmation:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  if (loading) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Loading booking confirmation...</div>;
  }

  if (!booking) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Booking details unavailable.</div>;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Booking Confirmed!</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Your Journey is All Set</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We have sent a confirmation email & booking voucher to <span className="font-bold text-slate-800">{booking.travelerDetails?.[0]?.email || 'your email'}</span>.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg text-left space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Booking Reference</span>
              <span className="text-base font-black text-emerald-600">#{booking.bookingId}</span>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-full text-[11px]">
              {booking.paymentStatus === 'Paid' ? 'PAID IN FULL' : 'CONFIRMED'}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">{booking.packageTitle || 'Tour Package'}</h4>
            <p className="text-slate-500">Destination: {booking.destinationName}</p>
            <p className="text-slate-500">Travel Date: {booking.travelDate}</p>
            <p className="text-slate-500">Travelers: {booking.travelers?.adults || 1} Adult(s)</p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-extrabold">
            <span className="text-slate-600">Total Paid:</span>
            <span className="text-slate-900 text-base">{formatPrice(booking.pricing?.totalAmount)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setShowInvoice(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" /> Download Official Invoice
          </button>
          <Link
            to="/dashboard/bookings"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <span>View My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {showInvoice && <InvoiceModal booking={booking} onClose={() => setShowInvoice(false)} />}
    </div>
  );
};
