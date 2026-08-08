import React from 'react';
import { Compass, Printer, Download, X, CheckCircle2 } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export const InvoiceModal = ({ booking, onClose }) => {
  const { formatPrice } = useCurrency();

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200">
        {/* Modal Action Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Official Tax Invoice</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div className="p-8 space-y-6" id="printable-invoice">
          {/* Header Branding */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xl font-black text-slate-900">DREAM<span className="text-emerald-600">MILES</span></span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Turn Every Journey Into a Memory.</p>
              <p className="text-[11px] text-slate-400">GSTIN: 07AAAAA0000A1Z5 • Reg: DM-INTL-2026</p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full">
                PAID & CONFIRMED
              </span>
              <p className="text-xs font-extrabold text-slate-900">Invoice #: {booking.bookingId}</p>
              <p className="text-xs text-slate-500">Date: {new Date(booking.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer & Booking Summary */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div>
              <p className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Customer Details</p>
              <p className="font-bold text-slate-900">{booking.travelerDetails?.[0]?.fullName || booking.user?.name || 'Customer'}</p>
              <p className="text-slate-600">{booking.travelerDetails?.[0]?.email || booking.user?.email}</p>
              <p className="text-slate-600">{booking.travelerDetails?.[0]?.phone || '+91 98765 43210'}</p>
            </div>
            <div>
              <p className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px] mb-1">Tour Package & Travel Date</p>
              <p className="font-bold text-slate-900">{booking.packageTitle || booking.tourPackage?.title}</p>
              <p className="text-slate-600">Travel Date: {booking.travelDate}</p>
              <p className="text-slate-600">Travelers: {booking.travelers?.adults || 1} Adult(s), {booking.travelers?.children || 0} Child(ren)</p>
            </div>
          </div>

          {/* Detailed Itemized Table */}
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-400 font-extrabold uppercase text-[10px]">
                <th className="py-2">Description</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3">
                  <span className="font-bold text-slate-900 block">{booking.packageTitle || 'Tour Package Base Fee'}</span>
                  <span className="text-[10px] text-slate-500">Includes stays, meals, guide, and private transport</span>
                </td>
                <td className="py-3 text-center font-bold">{booking.travelers?.adults || 1}</td>
                <td className="py-3 text-right font-bold">{formatPrice(booking.pricing?.adultTotal || booking.pricing?.totalAmount || 50000)}</td>
              </tr>

              {booking.pricing?.childTotal > 0 && (
                <tr>
                  <td className="py-3">Child Traveler Fee</td>
                  <td className="py-3 text-center font-bold">{booking.travelers?.children}</td>
                  <td className="py-3 text-right font-bold">{formatPrice(booking.pricing.childTotal)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Calculation Breakdown */}
          <div className="border-t border-slate-200 pt-4 space-y-1.5 text-xs text-right max-w-xs ml-auto">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold">{formatPrice(booking.pricing?.adultTotal || booking.pricing?.totalAmount)}</span>
            </div>
            {booking.pricing?.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount (Coupon {booking.pricing.couponCode})</span>
                <span>-{formatPrice(booking.pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Taxes (5% GST)</span>
              <span className="font-bold">{formatPrice(booking.pricing?.tax || 0)}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="text-emerald-600">{formatPrice(booking.pricing?.totalAmount || 50000)}</span>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-6 border-t border-slate-100 text-[10px] text-slate-400 text-center space-y-1">
            <p className="font-bold text-slate-600">Thank you for choosing Dream Miles!</p>
            <p>This is a computer-generated tax invoice and requires no physical signature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
