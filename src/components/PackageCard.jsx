import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PackageCard = ({ packageData, index, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary'
          : 'bg-card border border-border'
      }`}
      data-testid={`package-card-${packageData.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {featured && (
        <div className="absolute top-4 right-4 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
          POPULAR
        </div>
      )}

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-foreground">{packageData.name}</h3>
          <p className="text-muted-foreground">{packageData.duration}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-bold text-primary">${packageData.price}</span>
            <span className="text-muted-foreground">/person</span>
          </div>
        </div>

        <ul className="space-y-3">
          {packageData.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                <FiCheck className="text-primary text-sm" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/booking"
          data-testid={`book-package-button-${packageData.name.toLowerCase().replace(/\s+/g, '-')}`}
          className={`block w-full py-3.5 rounded-full font-semibold text-center transition-all ${
            featured
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
          }`}
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

export default PackageCard;