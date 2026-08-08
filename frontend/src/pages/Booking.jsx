import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiUsers,
} from 'react-icons/fi';

import Footer from '../components/Footer';
import { destinationsData } from '../data/destinationsData';
import { packagesData } from '../data/packagesData';

const Booking = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    travelers: '1',
    package: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('booking-data');

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'booking-data',
      JSON.stringify(formData)
    );
  }, [formData]);

  const selectedPackage = packagesData.find(
    (pkg) => pkg.name === formData.package
  );

  const totalPrice = selectedPackage
    ? Number(selectedPackage.price) *
      Number(formData.travelers)
    : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {

      const existingBookings =
        JSON.parse(localStorage.getItem('bookings')) || [];

      const newBooking = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        travelDate: formData.travelDate,
        travelers: formData.travelers,
        package: formData.package,
        totalPrice,
        bookedAt: new Date().toLocaleString(),
      };

      existingBookings.push(newBooking);

      localStorage.setItem(
        'bookings',
        JSON.stringify(existingBookings)
      );

      setLoading(false);

      setSubmitted(true);

      alert(
        `🎉 Your trip to ${formData.destination} has been booked successfully.`
      );

    }, 1800);
  };

  const handleReset = () => {

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      travelDate: '',
      travelers: '1',
      package: '',
    });

    setSubmitted(false);

    localStorage.removeItem('booking-data');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-between">

        <div className="flex items-center justify-center px-5 pt-32 pb-16">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl"
          >

            <div className="text-center">

              <div className="text-6xl mb-4">
                ✈️
              </div>

              <h2 className="text-3xl font-bold mb-2">
                Trip Booked
              </h2>

              <p className="text-gray-400 text-sm mb-8">
                Your booking has been confirmed successfully.
              </p>

            </div>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">
                  Destination
                </span>

                <span>
                  {formData.destination}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">
                  Travel Date
                </span>

                <span>
                  {formData.travelDate}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">
                  Travelers
                </span>

                <span>
                  {formData.travelers}
                </span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">
                  Package
                </span>

                <span>
                  {formData.package}
                </span>
              </div>

              <div className="flex justify-between pt-2 text-lg font-semibold">
                <span>
                  Total
                </span>

                <span className="text-primary">
                  ${totalPrice}
                </span>
              </div>

            </div>

            <button
              onClick={handleReset}
              className="w-full mt-8 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-all"
            >
              Book Another Trip
            </button>

          </motion.div>

        </div>

        <Footer />

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden flex flex-col justify-between">

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 pt-24 pb-16 px-5">

        <div className="max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Book Your Journey
            </h1>

            <p className="text-gray-400 text-sm md:text-base">
              Fast booking with premium travel experience
            </p>

          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                  <FiUser />
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                  <FiMail />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                  <FiPhone />
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                  <FiMapPin />
                  Destination
                </label>

                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
                >

                  <option value="">
                    Select
                  </option>

                  {destinationsData.map((dest) => (
                    <option
                      key={dest.id}
                      value={dest.name}
                      className="bg-[#050816]"
                    >
                      {dest.name}
                    </option>
                  ))}

                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                  <FiCalendar />
                  Travel Date
                </label>

                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                  <FiUsers />
                  Travelers
                </label>

                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
                />
              </div>

            </div>

            <div className="mt-5">

              <label className="text-sm text-gray-300 mb-2 block">
                Select Package
              </label>

              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 rounded-xl bg-black/30 border border-white/10 focus:border-primary outline-none text-sm"
              >

                <option value="">
                  Choose Package
                </option>

                {packagesData.map((pkg) => (
                  <option
                    key={pkg.id}
                    value={pkg.name}
                    className="bg-[#050816]"
                  >
                    {pkg.name} - ${pkg.price}
                  </option>
                ))}

              </select>

            </div>

            <div className="mt-6 bg-black/20 rounded-2xl border border-white/10 p-5">

              <div className="flex justify-between items-center text-sm mb-3">

                <span className="text-gray-400">
                  Selected Package
                </span>

                <span>
                  {formData.package || 'Not Selected'}
                </span>

              </div>

              <div className="flex justify-between items-center text-sm mb-3">

                <span className="text-gray-400">
                  Travelers
                </span>

                <span>
                  {formData.travelers}
                </span>

              </div>

              <div className="flex justify-between items-center text-lg font-semibold">

                <span>
                  Total Price
                </span>

                <span className="text-primary">
                  ${totalPrice}
                </span>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-6 rounded-xl bg-primary font-medium hover:opacity-90 transition-all"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>

          </motion.form>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Booking;