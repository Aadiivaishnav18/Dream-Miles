import React from "react";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    country: "India",
    description:
      "https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg.",
    price: "$1899",
    rating: "4.9",
    image:
      "https://images.pexels.com/photos/9179927/pexels-photo-9179927.jpeg",
  },
  {
    id: 2,
    country: "Italy",
    description:
      "Discover art, history, and culinary excellence in the heart of Europe.",
    price: "$1799",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    country: "Australia",
    description:
      "Explore diverse landscapes from coral reefs to the outback.",
    price: "$1599",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    country: "Japan",
    description:
      "Experience the perfect blend of ancient tradition and cutting-edge technology.",
    price: "$1499",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    country: "London",
    description:
      "Experience London’s culture, history, and vibrant city life.",
    price: "$1399",
    rating: "4.5",
    image:
      "https://images.pexels.com/photos/2611465/pexels-photo-2611465.jpeg",
  },
  {
    id: 6,
    country: "Switzerland",
    description:
      "Discover Switzerland’s lakes, mountains, and charming villages.",
    price: "$1299",
    rating: "4.4",
    image:
      "https://images.pexels.com/photos/2026454/pexels-photo-2026454.jpeg",
  },
];

const TravelLanding = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <header className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          From pristine beaches to majestic mountains, explore destinations that will take your breath away
        </p>
      </header>

      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Popular Destinations
          </h2>
          <p className="text-gray-500">
            Explore our handpicked collection of dream destinations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                rotateX: 8,
                rotateY: -8,
                scale: 1.03,
                y: -10,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={dest.image}
                  alt={dest.country}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {dest.price}
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                  <span className="text-orange-400">★</span> {dest.rating}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-teal-600 transition">
                  {dest.country}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {dest.description}
                </p>
                <button className="flex items-center text-teal-600 font-semibold text-sm hover:gap-2 transition-all">
                  Explore <span className="ml-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TravelLanding;