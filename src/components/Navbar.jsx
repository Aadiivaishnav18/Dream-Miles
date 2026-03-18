import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('dream-miles-user');
    setIsLoggedIn(!!loggedIn);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('dream-miles-user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'DESTINATIONS', path: '/destinations' },
    { name: 'PACKAGES', path: '/packages' },
    { name: 'HOTELS', path: '/hotels' },
    { name: 'BOOKING', path: '/booking' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Dream<span className="text-secondary">Miles</span>
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className={`text-sm font-medium tracking-widest transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  data-testid="dashboard-button"
                  className="px-6 py-2.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  data-testid="logout-button"
                  className="px-6 py-2.5 rounded-full bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors flex items-center space-x-2"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  data-testid="signin-button"
                  className="px-6 py-2.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  data-testid="signup-button"
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
              className="text-2xl text-foreground"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm font-medium tracking-widest transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-6 py-3 rounded-full bg-primary/10 text-primary font-medium text-center"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 rounded-full bg-secondary text-white font-medium flex items-center justify-center space-x-2"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-6 py-3 rounded-full bg-primary/10 text-primary font-medium text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-6 py-3 rounded-full bg-primary text-white font-medium text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;