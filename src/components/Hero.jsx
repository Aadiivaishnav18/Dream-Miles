import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden" data-testid="hero-section">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1619108686237-66720cffacad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjB0cm9waWNhbCUyMGJlYWNoJTIwYWVyaWFsJTIwdmlldyUyMHR1cnF1b2lzZSUyMG9jZWFufGVufDB8fHx8MTc3Mzc3NDY0OXww&ixlib=rb-4.1.0&q=85')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
            data-testid="hero-title"
          >
            Explore The World With <span className="text-primary">Dream Miles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
            data-testid="hero-subtitle"
          >
            Discover breathtaking destinations and plan unforgettable journeys
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/destinations"
              data-testid="explore-destinations-button"
              className="group px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center space-x-2 hover:scale-105"
            >
              <span>Explore Destinations</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/booking"
              data-testid="book-now-button"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;