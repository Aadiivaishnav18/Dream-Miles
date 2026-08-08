import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

const RATES = {
  INR: { symbol: '₹', rate: 1, name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.0095, name: 'British Pound' },
  AED: { symbol: 'AED ', rate: 0.044, name: 'UAE Dirham' },
  JPY: { symbol: '¥', rate: 1.82, name: 'Japanese Yen' },
  AUD: { symbol: 'A$', rate: 0.018, name: 'Australian Dollar' },
  CAD: { symbol: 'C$', rate: 0.016, name: 'Canadian Dollar' },
  SGD: { symbol: 'S$', rate: 0.016, name: 'Singapore Dollar' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('dream_currency') || 'INR';
  });

  const changeCurrency = (code) => {
    if (RATES[code]) {
      setCurrency(code);
      localStorage.setItem('dream_currency', code);
    }
  };

  const formatPrice = (amountInINR) => {
    if (amountInINR === undefined || amountInINR === null) return '';
    const curr = RATES[currency] || RATES.INR;
    const converted = amountInINR * curr.rate;

    if (currency === 'JPY') {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }

    if (currency === 'INR') {
      return `${curr.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }

    return `${curr.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, currencies: RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
