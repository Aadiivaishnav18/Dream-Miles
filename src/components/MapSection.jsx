import React from "react";
import { motion } from "framer-motion";

const MapSection = () => {
  return (
     <section className="py-16 bg-[#f8f8f8] overflow-hidden">
  <div className="max-w-5xl mx-auto px-4 text-center pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-gray-900 mb-3">
            Explore Our Destinations
          </h2>

          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Discover where your next unforgettable journey begins.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-[1.8rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white"
        >
          <iframe
            src="https://www.google.com/maps?q=20,0&z=2&output=embed"
            className="w-full h-[320px] md:h-[420px] border-0"
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;