import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Package = () => {
  const packages = [
    {
      title: "Basic Package",
      price: "$499",
      duration: "3 Days / 2 Nights",
      features: [
        "Round-trip flights",
        "2-star accommodation",
        "Daily breakfast",
        "Airport transfers",
        "City tour",
      ],
    },
    {
      title: "Standard Package",
      price: "$899",
      duration: "5 Days / 4 Nights",
      popular: true,
      features: [
        "Round-trip flights",
        "4-star accommodation",
        "Breakfast & dinner",
        "Airport transfers",
        "Guided tours",
        "Travel insurance",
      ],
    },
    {
      title: "Luxury Package",
      price: "$1499",
      duration: "7 Days / 6 Nights",
      features: [
        "Business class flights",
        "5-star luxury resort",
        "All meals included",
        "Private chauffeur",
        "Exclusive experiences",
        "Spa treatments",
      ],
    },
  ];

  const benefits = [
    {
      icon: "✈️",
      title: "Seamless Travel",
      desc: "All flights and transfers included",
    },
    {
      icon: "🏨",
      title: "Premium Stay",
      desc: "Luxury handpicked stays",
    },
    {
      icon: "🗺️",
      title: "Expert Guides",
      desc: "Professional local guidance",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#020617] via-[#081120] to-black overflow-hidden">

      <Navbar />

      <section className="flex-1 py-24 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            Travel Packages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-5 mb-16 text-lg"
          >
            Choose the perfect package for your dream vacation
          </motion.p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">

            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                }}
                className={`relative w-full max-w-[320px] rounded-[30px] p-7 border overflow-hidden
                transition-all duration-500 group backdrop-blur-xl
                ${
                  pkg.popular
                    ? "bg-[#0f172a]/95 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                    : "bg-[#0f172a]/80 border-gray-700 shadow-2xl"
                }`}
              >

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-cyan-400 text-black text-xs px-4 py-1 rounded-full font-bold shadow-lg">
                    Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white">
                  {pkg.title}
                </h3>

                <p className="text-gray-400 mt-2 text-sm">
                  {pkg.duration}
                </p>

                <div className="mt-7">
                  <span className="text-4xl font-extrabold text-cyan-400">
                    {pkg.price}
                  </span>

                  <span className="text-gray-400 text-sm">
                    {" "} / person
                  </span>
                </div>

                <ul className="mt-7 space-y-4 text-left">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="bg-cyan-500/10 p-1.5 rounded-full">
                        <FiCheck className="text-cyan-400 text-sm" />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  className="mt-8 w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-cyan-400/40"
                >
                  Book Now
                </motion.button>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      <section className="pb-24 px-6">

        <div className="max-w-6xl mx-auto">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-3xl md:text-5xl font-bold text-white mb-14"
          >
            Why Choose Our Packages?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">

            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="relative bg-[#07111f]/90 border border-cyan-500/20 rounded-[24px]
                px-6 py-8 text-center overflow-hidden group shadow-xl
                max-w-[320px] mx-auto w-full"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="text-4xl mb-4"
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      <div className="bg-gradient-to-b from-[#081120] via-[#0b1729] to-black border-t border-gray-800">
        <Footer />
      </div>

    </div>
  );
};

export default Package;