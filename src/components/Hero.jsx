import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden font-[DM_Sans]">

      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover scale-110"
          src="https://www.pexels.com/download/video/855633/"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 -mt-10">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-[Playfair_Display] text-white font-semibold leading-tight text-5xl md:text-7xl lg:text-[95px] max-w-6xl"
        >
          Explore The World With <br />
          <span className="text-[#4db2a4] font-bold">
            Dream Miles
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/80 max-w-2xl text-lg md:text-xl"
        >
          Discover breathtaking destinations and plan unforgettable journeys
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-6 items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/destinations")}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Explore Destinations
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/booking")}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;