import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dream_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('dream_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await API.get('/auth/me');
        if (data.success && data.data) {
          setUser(data.data);
          localStorage.setItem('dream_user', JSON.stringify(data.data));
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        // Clear stale user if unauthorized
        if (err.response?.status === 401) {
          localStorage.removeItem('dream_token');
          localStorage.removeItem('dream_user');
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    if (data.success && data.data) {
      const { token, user: userData } = data.data;
      localStorage.setItem('dream_token', token);
      localStorage.setItem('dream_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }
  };

  const register = async (name, email, password, phone) => {
    const { data } = await API.post('/auth/register', { name, email, password, phone });
    if (data.success && data.data) {
      const { token, user: userData } = data.data;
      localStorage.setItem('dream_token', token);
      localStorage.setItem('dream_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('dream_token');
      localStorage.removeItem('dream_user');
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    const { data } = await API.put('/auth/profile', profileData);
    if (data.success && data.data) {
      setUser(data.data);
      localStorage.setItem('dream_user', JSON.stringify(data.data));
      return data.data;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAdmin: user?.role === 'Admin' || user?.role === 'SuperAdmin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
