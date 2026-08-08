import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Droplets,
  Utensils,
  Dumbbell,
  Coffee,
  Car,
  Briefcase,
} from "lucide-react";

const accommodations = [
  {
    id: 1,
    name: "Azure Luxury Resort",
    type: "Beachfront Villa",
    price: "$350",
    category: "Luxury",
    image:
      "https://images.pexels.com/photos/14630857/pexels-photo-14630857.jpeg",
    amenities: [
      { label: "Free WiFi", icon: <Wifi size={14} /> },
      { label: "Swimming Pool", icon: <Droplets size={14} /> },
      { label: "Restaurant", icon: <Utensils size={14} /> },
    ],
  },
  {
    id: 2,
    name: "Ocean View Suite",
    type: "Luxury Hotel",
    price: "$280",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: [
      { label: "Free WiFi", icon: <Wifi size={14} /> },
      { label: "Swimming Pool", icon: <Droplets size={14} /> },
      { label: "Restaurant", icon: <Utensils size={14} /> },
    ],
  },
  {
    id: 3,
    name: "Tropical Villa",
    type: "Private Villa",
    price: "$420",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: [
      { label: "Free WiFi", icon: <Wifi size={14} /> },
      { label: "Swimming Pool", icon: <Droplets size={14} /> },
      { label: "Restaurant", icon: <Utensils size={14} /> },
    ],
  },
  {
    id: 4,
    name: "Grand Plaza Hotel",
    type: "City Center Hotel",
    price: "$120",
    category: "Standard",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    amenities: [
      { label: "Free WiFi", icon: <Wifi size={14} /> },
      { label: "Restaurant", icon: <Utensils size={14} /> },
      { label: "Gym", icon: <Dumbbell size={14} /> },
    ],
  },
  {
    id: 5,
    name: "Comfort Inn",
    type: "Standard Hotel",
    price: "$95",
    category: "Standard",
    image:
      "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg",
    amenities: [
      { label: "Free WiFi", icon: <Wifi size={14} /> },
      { label: "Breakfast Included", icon: <Coffee size={14} /> },
      { label: "Parking", icon: <Car size={14} /> },
    ],
  },
  {
    id: 6,
    name: "Urban Stay",
    type: "Business Hotel",
    price: "$110",
    category: "Standard",
    image:
      "https://images.pexels.com/photos/33596159/pexels-photo-33596159.jpeg",
    amenities: [
      { label: "Free WiFi", icon: <Wifi size={14} /> },
      { label: "Restaurant", icon: <Utensils size={14} /> },
      { label: "Meeting Rooms", icon: <Briefcase size={14} /> },
    ],
  },
];

const AccommodationCard = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-[230px] overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* CATEGORY BADGE */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold shadow-md backdrop-blur-md ${
            item.category === "Luxury"
              ? "bg-teal-400/90 text-white"
              : "bg-white/80 text-teal-600"
          }`}
        >
          {item.category}
        </div>

        {/* PRICE BADGE */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-center">
          <div className="text-[#4db2a4] font-bold text-lg">
            {item.price}
          </div>
          <div className="text-[10px] text-gray-500">per night</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-[#4db2a4] transition">
          {item.name}
        </h3>

        <p className="text-gray-400 text-sm mb-4">{item.type}</p>

        {/* AMENITIES */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.amenities.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f4fbfa] border border-teal-100 text-[10px] text-gray-700 font-medium"
            >
              <span className="text-[#4db2a4]">{a.icon}</span>
              {a.label}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button className="mt-auto w-full bg-[#4db2a4] hover:bg-[#3d9185] text-white font-semibold py-3 rounded-xl transition">
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

const FeaturedAccommodations = () => {
  return (
    <div className="min-h-screen bg-[#f8fafb] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Featured Accommodations
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover handpicked luxury resorts and premium stays for your perfect trip.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {accommodations.map((item) => (
            <AccommodationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedAccommodations;