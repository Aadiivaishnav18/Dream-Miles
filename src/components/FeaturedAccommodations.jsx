import React from 'react';
import { Wifi, Droplets, Utensils } from 'lucide-react';

const accommodations = [
  {
    id: 1,
    name: 'Azure Luxury Resort',
    type: 'Beachfront Villa',
    price: '$350',
    image: 'https://images.unsplash.com/photo-1544161515-436cefd1f16d?auto=format&fit=crop&w=800&q=80',
    amenities: [
      { label: 'Free WiFi', icon: <Wifi size={14} className="text-[#4db2a4]" /> },
      { label: 'Swimming Pool', icon: <Droplets size={14} className="text-[#4db2a4]" /> },
      { label: 'Restaurant', icon: <Utensils size={14} className="text-[#4db2a4]" /> },
    ],
  },
  {
    id: 2,
    name: 'Ocean View Suite',
    type: 'Luxury Hotel',
    price: '$280',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: [
      { label: 'Free WiFi', icon: <Wifi size={14} className="text-[#4db2a4]" /> },
      { label: 'Swimming Pool', icon: <Droplets size={14} className="text-[#4db2a4]" /> },
      { label: 'Restaurant', icon: <Utensils size={14} className="text-[#4db2a4]" /> },
    ],
  },
  {
    id: 3,
    name: 'Tropical Villa',
    type: 'Private Villa',
    price: '$420',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: [
      { label: 'Free WiFi', icon: <Wifi size={14} className="text-[#4db2a4]" /> },
      { label: 'Swimming Pool', icon: <Droplets size={14} className="text-[#4db2a4]" /> },
      { label: 'Restaurant', icon: <Utensils size={14} className="text-[#4db2a4]" /> },
    ],
  },
];

const AccommodationCard = ({ item }) => (
  <div className="group bg-white rounded-[2.2rem] overflow-hidden shadow-2xl shadow-gray-200/60 flex flex-col h-full border border-gray-100 transition-all duration-300 hover:shadow-teal-100/50 hover:-translate-y-1">

    {/* Image */}
    <div className="relative h-72 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Luxury Tag */}
      <div className="absolute top-5 left-5 bg-[#4db2a4] text-white px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-md">
        Luxury
      </div>

      {/* Price */}
      <div className="absolute bottom-5 right-5 w-[110px] h-[75px] bg-white/95 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center shadow-lg border border-white/20">
        <span className="text-[#4db2a4] text-2xl font-bold">{item.price}</span>
        <span className="text-[11px] text-gray-400">per night</span>
      </div>
    </div>


    <div className="p-7 flex flex-col flex-grow">

      <h3 className="text-[26px] font-serif font-bold text-gray-900 mb-1 group-hover:text-[#4db2a4] transition-colors">
        {item.name}
      </h3>

      <p className="text-gray-400 text-base mb-6">
        {item.type}
      </p>

      {/* Amenities */}
      <div className="flex flex-nowrap justify-between mb-6">
        {item.amenities.map((amenity, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f9f8] border border-teal-50"
          >
            {amenity.icon}
            <span className="text-[10px] font-semibold text-gray-600 uppercase">
              {amenity.label}
            </span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-auto">
        <button className="w-full bg-[#4db2a4] hover:bg-[#3d9185] text-white font-semibold py-3.5 rounded-[1.6rem] text-base transition-all duration-300 transform active:scale-95 shadow-md">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

const FeaturedAccommodations = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-6">

      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-5 text-gray-900">
            Featured Accommodations
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Discover our handpicked selection of luxury resorts and private villas for your next getaway.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {accommodations.map((item) => (
            <AccommodationCard key={item.id} item={item} />
          ))}
        </div>

      </section>
    </div>
  );
};

export default FeaturedAccommodations;