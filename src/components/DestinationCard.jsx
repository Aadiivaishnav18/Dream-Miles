import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight } from 'react-icons/fi';

const DestinationCard = ({ destination, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl bg-card shadow-lg hover:shadow-2xl transition-all duration-300"
      data-testid={`destination-card-${destination.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full">
          <span className="text-sm font-bold text-foreground">${destination.price}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-1 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full">
          <FiStar className="text-accent fill-accent" />
          <span className="text-sm font-semibold text-foreground">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {destination.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {destination.description}
        </p>
        <Link
          to={`/destination/${destination.id}`}
          data-testid={`explore-button-${destination.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          className="inline-flex items-center space-x-2 text-primary font-semibold hover:underline"
        >
          <span>Explore</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default DestinationCard;