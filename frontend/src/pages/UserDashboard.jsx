import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Heart, MessageSquare, Settings, LogOut, FileText, XCircle, CheckCircle2, Shield, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNotification } from '../context/NotificationContext';
import { InvoiceModal } from '../components/InvoiceModal';
import API from '../api/axios';

export const UserDashboard = () => {
  const { user, logout, updateProfile } = useAuth();
  const { wishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { showSuccess, showError } = useNotification();

  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Profile Edit Form State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/bookings/my');
      if (data.success && data.data) {
        setBookings(data.data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const { data } = await API.put(`/bookings/${bookingId}/cancel`, {
        reason: 'Cancelled via User Dashboard',
      });
      if (data.success) {
        showSuccess('Booking cancelled successfully');
        fetchUserBookings();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name, phone, avatar });
      showSuccess('Profile updated successfully!');
    } catch (err) {
      showError('Failed to update profile');
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-500/20"
            />
            <div>
              <h1 className="text-2xl font-black text-slate-900">{user?.name}</h1>
              <p className="text-xs text-slate-500">{user?.email} • {user?.phone || 'No phone set'}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Verified Traveler Account
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Menu */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-colors ${
                activeTab === 'bookings' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" /> My Bookings ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-colors ${
                activeTab === 'wishlist' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" /> My Wishlist ({wishlist.length})
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-colors ${
                activeTab === 'profile' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" /> Account Settings
            </button>
          </div>

          {/* Main Tab Panel */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">My Tour Reservations</h3>
                {loading ? (
                  <div className="text-center py-12 text-xs font-bold text-slate-400">Loading bookings...</div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <div key={b._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-slate-400">Booking Reference</span>
                            <span className="text-sm font-black text-emerald-600 block">#{b.bookingId}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              b.bookingStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {b.bookingStatus}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              b.paymentStatus === 'Paid' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {b.paymentStatus}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <img src={b.coverImage || b.tourPackage?.coverImage} alt={b.packageTitle} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-black text-slate-900">{b.packageTitle}</h4>
                            <p className="text-slate-500 font-semibold flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {b.destinationName}
                            </p>
                            <p className="text-slate-500">Travel Date: <span className="font-bold text-slate-800">{b.travelDate}</span></p>
                            <p className="text-slate-500">Travelers: {b.travelers?.adults || 1} Adult(s)</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Amount Paid</span>
                            <span className="text-base font-black text-slate-900">{formatPrice(b.pricing?.totalAmount)}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedInvoice(b)}
                              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5" /> Invoice
                            </button>

                            {b.bookingStatus !== 'Cancelled' && (
                              <button
                                onClick={() => handleCancelBooking(b.bookingId)}
                                className="px-3 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl font-bold flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-xs font-bold text-slate-400 space-y-2">
                    <p>No bookings found yet.</p>
                    <Link to="/tours" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
                      Explore Tour Packages
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900">Saved Wishlist ({wishlist.length})</h3>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((w) => (
                      <div key={w._id} className="bg-white rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                        <img src={w.tourPackage?.coverImage} alt="Saved" className="w-full h-32 rounded-xl object-cover" />
                        <h4 className="font-bold text-slate-900">{w.tourPackage?.title || 'Saved Package'}</h4>
                        <Link to={`/tours/${w.tourPackage?.slug}`} className="block text-center py-2 bg-emerald-600 text-white rounded-xl font-bold">
                          View Package
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-xs font-bold text-slate-400">
                    Your wishlist is currently empty.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
                <h3 className="text-sm font-extrabold text-slate-900">Edit Profile & Security</h3>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Avatar Image URL</label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900"
                  />
                </div>

                <button type="submit" className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500">
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {selectedInvoice && <InvoiceModal booking={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}
    </div>
  );
};
