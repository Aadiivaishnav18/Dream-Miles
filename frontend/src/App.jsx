import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { NotificationProvider } from './context/NotificationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CurrencyProvider>
            <NotificationProvider>
              <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
                <Navbar onOpenSearch={() => setSearchOpen(true)} />
                <main className="flex-1">
                  <AppRoutes onOpenSearch={() => setSearchOpen(true)} />
                </main>
                <Footer />
                <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
              </div>
            </NotificationProvider>
          </CurrencyProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}