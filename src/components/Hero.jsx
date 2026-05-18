import { useState, useEffect } from "react";
import { Menu, X, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    navigate("/signout");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
    { name: "Hotels", path: "/hotels" },
    { name: "Booking", path: "/booking" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden font-[DM_Sans]">

      {/* BACKGROUND VIDEO */}
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

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

          {/* LOGO (3D hover) */}
          <motion.h1
            whileHover={{ scale: 1.08, rotateX: 10, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/")}
            className="text-3xl text-white tracking-wide cursor-pointer"
          >
            <span className="font-[Playfair_Display]">Dream</span>
            <span className="font-[Playfair_Display] text-primary">Miles</span>
          </motion.h1>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.25em] text-white/80 font-medium">
            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to={item.path} className="hover:text-primary transition">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* RIGHT BUTTONS */}
          <div className="hidden lg:flex items-center gap-5">

            <motion.button
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="p-2 rounded-full bg-white/10 border border-white/20"
            >
              <Moon size={16} className="text-white" />
            </motion.button>

            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="text-white text-sm px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Sign Out
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
                className="text-white text-sm px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Sign In
              </motion.button>
            )}
          </div>

          {/* MOBILE ICON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-xl z-40 flex flex-col items-center gap-6 py-10 text-white uppercase tracking-widest"
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary transition"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}

      {/* HERO CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 -mt-10">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-[Playfair_Display] text-white font-semibold leading-tight text-5xl md:text-7xl lg:text-[95px] max-w-6xl"
        >
          Explore The World With <br />
          <span className="text-primary font-bold">Dream Miles</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/80 max-w-2xl text-lg md:text-xl"
        >
          Discover breathtaking destinations and plan unforgettable journeys
        </motion.p>

        {/* BUTTONS (3D tilt effect) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-6 items-center"
        >

          <motion.button
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/destinations")}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Explore Destinations
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotateX: -10, rotateY: 10 }}
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