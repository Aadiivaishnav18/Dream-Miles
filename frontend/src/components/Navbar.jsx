<<<<<<< HEAD:frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Compass, Search, Heart, User, Menu, X, LogOut, ShieldCheck, Globe, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

export const Navbar = ({ onOpenSearch }) => {
  const { user, logout, isAdmin } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { currency, changeCurrency, currencies } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tours', path: '/tours' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Activities', path: '/activities' },
    { name: 'Flights', path: '/flights' },
    { name: 'Travel Guides', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg border-b border-emerald-900/10 py-3'
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <span className={`text-xl font-extrabold tracking-tight font-sans ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              DREAM<span className="text-emerald-500">MILES</span>
            </span>
            <p className={`text-[10px] tracking-widest font-medium uppercase ${isScrolled ? 'text-emerald-700' : 'text-emerald-300'}`}>
              Travel Better
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-emerald-500 font-bold'
                    : isScrolled
                    ? 'text-slate-700 hover:text-emerald-600'
                    : 'text-slate-100 hover:text-emerald-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
                isScrolled
                  ? 'border-slate-300 text-slate-700 hover:border-emerald-500 bg-white'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-slate-100 py-1.5 z-50 text-slate-800">
                <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">Select Currency</div>
                {Object.keys(currencies).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeCurrency(code);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                      currency === code ? 'font-bold text-emerald-600 bg-emerald-50/60' : ''
                    }`}
                  >
                    <span>{currencies[code].name}</span>
                    <span className="font-mono text-slate-400">{currencies[code].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className={`p-2 rounded-xl border transition-all ${
              isScrolled
                ? 'border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            title="Search Destinations & Packages"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className={`relative p-2 rounded-xl border transition-all ${
              isScrolled
                ? 'border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            title="View Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* User Auth Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:ring-2 hover:ring-emerald-500 transition-all"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/50"
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-md">
                      {user.role}
                    </span>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <User className="w-4 h-4" /> User Dashboard
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" /> Admin Portal
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                  isScrolled
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/30 hover:shadow-lg hover:scale-105 transition-all"
              >
                Explore Now
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border ${
              isScrolled ? 'border-slate-200 text-slate-700' : 'border-white/30 text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 py-6 px-6 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-200 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {!user && (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
=======
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signout");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },

    // Hotels ko homepage section se link kar diya
    { name: "Hotels", path: "/home#hotels" },

    { name: "Booking", path: "/booking" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

          {/* LOGO */}
          <h1
            className="text-3xl text-white tracking-wide select-none cursor-default"
          >
            <span className="font-[Playfair_Display]">
              Dream
            </span>

            <span className="font-[Playfair_Display] text-[#4db2a4]">
              Miles
            </span>
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.25em] text-white/80 font-medium">
            {navLinks.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className="hover:text-[#4db2a4] transition duration-300"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden lg:flex items-center gap-5">

            {isLoggedIn && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/dashboard")}
                className="text-xs bg-[#4db2a4]/20 border border-[#4db2a4]/50 text-[#4db2a4] px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition"
              >
                Dashboard
              </motion.button>
            )}

            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="text-white bg-[#f28b82] text-sm px-5 py-2 rounded-xl hover:bg-[#e07b72] transition"
              >
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
                className="text-white text-sm px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Sign In
              </motion.button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 h-screen w-[75%] bg-black/95 backdrop-blur-xl z-50 flex flex-col items-start px-8 py-10 gap-7 text-white uppercase tracking-widest shadow-2xl"
        >

          {/* CLOSE BUTTON */}
          <button
            className="self-end"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={30} />
          </button>

          {/* NAV LINKS */}
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#4db2a4] transition text-lg"
            >
              {item.name}
            </Link>
          ))}

          {/* DASHBOARD */}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-[#4db2a4] text-lg"
            >
              Dashboard
            </Link>
          )}

          {/* LOGOUT BUTTON MOBILE */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-[#f28b82] px-5 py-3 rounded-xl text-white text-sm hover:bg-[#e07b72] transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="border border-white/20 px-5 py-3 rounded-xl text-sm hover:bg-white/10 transition"
            >
              Sign In
            </button>
          )}
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
>>>>>>> e1e4f9a3bd27b84f363f72af77e3795b849ebe82:src/components/Navbar.jsx
