// src/components/DashboardView.jsx

import React from "react";
import { motion } from "framer-motion";
import { User, Globe, MapPin, Gift, Hotel } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardView = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6 md:py-10 text-left">

      {/* Heading */}
      <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wide font-[Playfair_Display] mb-3">
        Welcome back!
      </h2>

      <p className="text-gray-300 text-base mb-12 opacity-80">
        Manage your bookings and plan your next adventure
      </p>

      {/* Main Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >

        {/* Profile Card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 rounded-3xl flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-[#4db2a4]/5 via-transparent to-transparent" />

          <div className="relative z-10 w-full">

            <div className="w-20 h-20 bg-[#4db2a4]/10 rounded-full flex items-center justify-center border border-[#4db2a4]/30 mx-auto mb-5">
              <User className="text-[#4db2a4]" size={34} />
            </div>

            <h3 className="text-white text-2xl font-bold tracking-wide">
              {userData.name}
            </h3>

            <p className="text-gray-400 text-sm mt-2 flex items-center justify-center gap-2 opacity-80">
              ✉ {userData.email}
            </p>
          </div>

          <div className="relative z-10 w-full space-y-4 mt-10">

            <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 px-5 py-4 rounded-2xl">
              <span className="text-gray-400 text-sm">
                Total Bookings
              </span>

              <span className="text-[#4db2a4] text-xl font-bold">
                {userData.totalBookings}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white/[0.03] border border-white/5 px-5 py-4 rounded-2xl">
              <span className="text-gray-400 text-sm">
                Member Since
              </span>

              <span className="text-white font-semibold tracking-wide">
                {userData.memberSince}
              </span>
            </div>

          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-2 bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 rounded-3xl flex flex-col justify-center items-center shadow-2xl relative min-h-[320px] overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />

          <h3 className="relative z-10 text-white text-2xl font-bold tracking-wide absolute top-8 left-8">
            Your Bookings
          </h3>

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm mt-10">

            <div className="w-20 h-20 bg-[#4db2a4]/10 rounded-full flex items-center justify-center mb-5 border border-[#4db2a4]/20">
              <Globe className="text-[#4db2a4]" size={36} />
            </div>

            <p className="text-gray-200 font-semibold text-xl">
              No bookings yet.
            </p>

            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Start planning your next adventure today and explore beautiful destinations around the world.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/booking")}
              className="mt-7 bg-[#4db2a4] hover:bg-[#3ca193] text-slate-900 font-bold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-300 shadow-lg shadow-[#4db2a4]/20"
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full mt-14"
      >

        <h3 className="text-white text-2xl font-bold tracking-wide mb-7 px-1">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            {
              title: "Explore Destinations",
              desc: "Discover amazing countries",
              icon: MapPin,
              color: "text-emerald-400",
              path: "/destinations",
            },

            {
              title: "View Packages",
              desc: "Find travel packages",
              icon: Gift,
              color: "text-amber-400",
              path: "/packages",
            },

            {
              title: "Browse Hotels",
              desc: "Luxury accommodations",
              icon: Hotel,
              color: "text-indigo-400",
              path: "/hotels",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-3xl cursor-pointer transition-all duration-300 shadow-2xl flex gap-5 items-center group hover:border-[#4db2a4]/30"
            >

              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#4db2a4]/30 transition-all duration-300">
                <item.icon className={item.color} size={24} />
              </div>

              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-[#4db2a4] transition">
                  {item.title}
                </h4>

                <p className="text-gray-400 text-sm mt-1 opacity-80">
                  {item.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardView;