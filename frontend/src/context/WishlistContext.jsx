import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      // Local storage fallback for guest users
      const saved = localStorage.getItem('dream_guest_wishlist');
      if (saved) setWishlist(JSON.parse(saved));
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/wishlist');
      if (data.success && data.data) {
        setWishlist(data.data);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (packageId) => {
    return wishlist.some(
      (item) => (item.tourPackage?._id || item.tourPackage || item._id) === packageId || item === packageId
    );
  };

  const toggleWishlist = async (packageId, pkgObj = null) => {
    if (user) {
      try {
        const { data } = await API.post('/wishlist/toggle', { packageId });
        fetchWishlist();
        return data.data?.inWishlist;
      } catch (err) {
        console.error('Wishlist toggle error:', err);
      }
    } else {
      // Local storage for guests
      let updated;
      if (isInWishlist(packageId)) {
        updated = wishlist.filter((item) => (item._id || item) !== packageId);
      } else {
        const newItem = pkgObj || { _id: packageId, tourPackage: { _id: packageId } };
        updated = [...wishlist, newItem];
      }
      setWishlist(updated);
      localStorage.setItem('dream_guest_wishlist', JSON.stringify(updated));
      return !isInWishlist(packageId);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, isInWishlist, toggleWishlist, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
