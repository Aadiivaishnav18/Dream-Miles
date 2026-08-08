import React, { useState, useEffect } from 'react';
import { ShieldCheck, Package, MapPin, Globe, Users, Calendar, DollarSign, Plus, Trash2, Edit3, CheckCircle2, XCircle, Tag, Star, Activity as ActivityIcon } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // Package Builder Form State
  const [showPackageBuilder, setShowPackageBuilder] = useState(false);
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgCategory, setPkgCategory] = useState('Cultural');
  const [pkgDays, setPkgDays] = useState(5);
  const [pkgNights, setPkgNights] = useState(4);
  const [pkgPrice, setPkgPrice] = useState(45000);
  const [pkgDiscount, setPkgDiscount] = useState(10);
  const [pkgCoverImage, setPkgCoverImage] = useState('https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80');
  const [pkgOverview, setPkgOverview] = useState('');
  const [pkgDestinationName, setPkgDestinationName] = useState('Jaipur');
  const [pkgCountryName, setPkgCountryName] = useState('India');

  // Dynamic Itinerary Days State
  const [itineraryDays, setItineraryDays] = useState([
    { day: 1, title: 'Arrival & Welcome Dinner', description: 'Airport pickup and hotel check in followed by traditional dinner.', meals: 'Breakfast & Dinner', hotel: '4-Star Heritage Stay', activities: ['Airport Pickup'] },
  ]);

  const { formatPrice } = useCurrency();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    setLoading(true);
    try {
      const [statsRes, pkgRes, bookingRes, userRes, couponRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/packages?limit=100'),
        API.get('/bookings/admin/all'),
        API.get('/admin/users'),
        API.get('/coupons'),
      ]);

      setStats(statsRes.data.data || {});
      setPackages(pkgRes.data.data?.packages || []);
      setBookings(bookingRes.data.data || []);
      setUsersList(userRes.data.data || []);
      setCoupons(couponRes.data.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItineraryDay = () => {
    const newDayNum = itineraryDays.length + 1;
    setItineraryDays([
      ...itineraryDays,
      { day: newDayNum, title: `Day ${newDayNum} Exploration`, description: 'Sightseeing and leisure activities.', meals: 'Breakfast included', hotel: '4-Star Accommodation', activities: [] },
    ]);
  };

  const handleRemoveItineraryDay = (index) => {
    setItineraryDays(itineraryDays.filter((_, i) => i !== index));
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    if (!pkgTitle || !pkgOverview) {
      showError('Please fill out package title and overview');
      return;
    }

    try {
      // Find default country & destination IDs or mock
      const destId = '65d1a2b3c4d5e6f7a8b9c0d1'; // fallback ID or first available
      const countryId = '65d1a2b3c4d5e6f7a8b9c0d2';

      const { data } = await API.post('/packages', {
        title: pkgTitle,
        destination: destId,
        destinationName: pkgDestinationName,
        country: countryId,
        countryName: pkgCountryName,
        category: pkgCategory,
        days: Number(pkgDays),
        nights: Number(pkgNights),
        price: Number(pkgPrice),
        discountPercentage: Number(pkgDiscount),
        coverImage: pkgCoverImage,
        overview: pkgOverview,
        itinerary: itineraryDays,
        highlights: ['5-Star Luxury Resort Stay', 'Private Chauffeur Transfers', 'Guided City Excursion'],
        inclusions: ['Breakfast & Dinner', 'Entry Monuments Tickets'],
        exclusions: ['Airfare', 'Personal Expenses'],
      });

      if (data.success) {
        showSuccess(`Package "${pkgTitle}" created successfully!`);
        setShowPackageBuilder(false);
        fetchAdminStats();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to create package');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete this tour package permanently?')) return;
    try {
      await API.delete(`/packages/${id}`);
      showSuccess('Package deleted');
      fetchAdminStats();
    } catch (err) {
      showError('Failed to delete package');
    }
  };

  const handleUserBlockToggle = async (userId, currentBlocked) => {
    try {
      await API.put(`/admin/users/${userId}/status`, { isBlocked: !currentBlocked });
      showSuccess('User status updated');
      fetchAdminStats();
    } catch (err) {
      showError('Failed to update user status');
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">Control Portal</span>
            </div>
            <h1 className="text-3xl font-black text-white">Dream Miles Admin Management</h1>
          </div>

          <button
            onClick={() => setShowPackageBuilder(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Package Builder
          </button>
        </div>

        {/* Top Stats Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <p className="text-2xl font-black text-emerald-400">{formatPrice(stats?.totalRevenue || 450000)}</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
            <p className="text-2xl font-black text-amber-400">{stats?.totalBookings || bookings.length}</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Packages</span>
            <p className="text-2xl font-black text-teal-400">{stats?.totalPackages || packages.length}</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Registered Users</span>
            <p className="text-2xl font-black text-indigo-400">{stats?.totalUsers || usersList.length}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto no-scrollbar pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Recent Bookings
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'packages' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Packages ({packages.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'users' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Users ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'coupons' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Coupons ({coupons.length})
          </button>
        </div>

        {/* Package Builder Modal */}
        {showPackageBuilder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-slate-900 w-full max-w-3xl rounded-3xl p-6 shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto space-y-6 text-xs text-white">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-black flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" /> Admin Package Builder
                </h3>
                <button onClick={() => setShowPackageBuilder(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreatePackage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Package Title *</label>
                    <input
                      type="text"
                      value={pkgTitle}
                      onChange={(e) => setPkgTitle(e.target.value)}
                      placeholder="e.g. Royal Rajasthan Palace Tour"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Category</label>
                    <select
                      value={pkgCategory}
                      onChange={(e) => setPkgCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white cursor-pointer"
                    >
                      <option value="Cultural">Cultural & Heritage</option>
                      <option value="Honeymoon">Honeymoon</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Beach">Beach</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Destination Name</label>
                    <input
                      type="text"
                      value={pkgDestinationName}
                      onChange={(e) => setPkgDestinationName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Country Name</label>
                    <input
                      type="text"
                      value={pkgCountryName}
                      onChange={(e) => setPkgCountryName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Base Price (₹)</label>
                    <input
                      type="number"
                      value={pkgPrice}
                      onChange={(e) => setPkgPrice(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Discount %</label>
                    <input
                      type="number"
                      value={pkgDiscount}
                      onChange={(e) => setPkgDiscount(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={pkgCoverImage}
                    onChange={(e) => setPkgCoverImage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Overview Description *</label>
                  <textarea
                    rows={3}
                    value={pkgOverview}
                    onChange={(e) => setPkgOverview(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-semibold text-white"
                  />
                </div>

                {/* Dynamic Itinerary Builder */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-400">Dynamic Multi-Day Itinerary ({itineraryDays.length} Days)</span>
                    <button
                      type="button"
                      onClick={handleAddItineraryDay}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Day
                    </button>
                  </div>

                  {itineraryDays.map((day, idx) => (
                    <div key={idx} className="p-3 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400">Day {day.day} Title:</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(idx)}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          Remove
                        </button>
                      </div>

                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const copy = [...itineraryDays];
                          copy[idx].title = e.target.value;
                          setItineraryDays(copy);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 font-semibold text-white"
                      />

                      <textarea
                        rows={2}
                        value={day.description}
                        onChange={(e) => {
                          const copy = [...itineraryDays];
                          copy[idx].description = e.target.value;
                          setItineraryDays(copy);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPackageBuilder(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">
                    Publish Tour Package
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 1: Bookings Overview */}
        {activeTab === 'overview' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 space-y-4">
            <h3 className="text-base font-extrabold text-white">Recent Customer Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="py-3 px-3">Booking ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Package Title</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-slate-200">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-700/30">
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">#{b.bookingId}</td>
                      <td className="py-3 px-3 font-semibold">{b.user?.name || 'Guest'}</td>
                      <td className="py-3 px-3 font-bold">{b.packageTitle}</td>
                      <td className="py-3 px-3 font-black text-amber-400">{formatPrice(b.pricing?.totalAmount)}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-700">
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-950 text-sky-300 border border-sky-700">
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Packages Management */}
        {activeTab === 'packages' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 space-y-4">
            <h3 className="text-base font-extrabold text-white">All Tour Packages Marketplace</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {packages.map((pkg) => (
                <div key={pkg._id} className="p-4 bg-slate-900 rounded-2xl border border-slate-700 space-y-2">
                  <img src={pkg.coverImage} alt={pkg.title} className="w-full h-28 object-cover rounded-xl" />
                  <h4 className="font-extrabold text-white line-clamp-1">{pkg.title}</h4>
                  <p className="text-slate-400">{pkg.days}D / {pkg.nights}N • {pkg.category}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="font-black text-emerald-400">{formatPrice(pkg.finalPrice)}</span>
                    <button
                      onClick={() => handleDeletePackage(pkg._id)}
                      className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Users Management */}
        {activeTab === 'users' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 space-y-4">
            <h3 className="text-base font-extrabold text-white">User Accounts & Roles</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Role</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {usersList.map((u) => (
                    <tr key={u._id}>
                      <td className="py-3 px-3 font-bold">{u.name}</td>
                      <td className="py-3 px-3 text-slate-300">{u.email}</td>
                      <td className="py-3 px-3 font-bold text-amber-400">{u.role}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.isBlocked ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
                        }`}>
                          {u.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleUserBlockToggle(u._id, u.isBlocked)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-[10px] font-bold text-white"
                        >
                          {u.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
