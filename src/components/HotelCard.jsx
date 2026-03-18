import React from 'react';
import { motion } from 'framer-motion';
import { FiWifi, FiCoffee, FiDroplet } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, index }) => {
  const facilityIcons = {
    'Free WiFi': FiWifi,
    'Swimming Pool': FiDroplet,
    'Restaurant': FiCoffee,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl bg-card shadow-lg hover:shadow-2xl transition-all duration-300"
      data-testid={`hotel-card-${hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full">
          {hotel.category}
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">${hotel.price}</div>
            <div className="text-xs text-muted-foreground">per night</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
          <p className="text-sm text-muted-foreground">{hotel.type}</p>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-3">
          {hotel.facilities.slice(0, 3).map((facility, idx) => {
            const Icon = facilityIcons[facility] || FiWifi;
            return (
              <div
                key={idx}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary/10 rounded-full"
              >
                <Icon className="text-primary text-sm" />
                <span className="text-xs text-foreground">{facility}</span>
              </div>
            );
          })}
        </div>

        <Link
          to="/booking"
          data-testid={`book-hotel-button-${hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          className="block w-full py-3 rounded-full bg-primary text-white font-semibold text-center hover:bg-primary/90 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

export default HotelCard;