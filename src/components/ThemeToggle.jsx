import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      data-testid="theme-toggle-button"
      className="relative w-14 h-7 rounded-full bg-primary/20 flex items-center justify-between px-1.5"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        animate={{
          x: theme === 'light' ? 0 : 24,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'light' ? (
          <FiSun className="text-white text-xs" />
        ) : (
          <FiMoon className="text-white text-xs" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;