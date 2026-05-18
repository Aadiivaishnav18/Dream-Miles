import { useState, useEffect } from "react";
import { Menu, X, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/signout");
  };

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
     { name: "Hotels", path: "/accommodation" },
    { name: "Booking", path: "/booking" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

          <motion.h1
            whileHover={{ scale: 1.08, rotateX: 10, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/")}
            className="text-3xl text-white tracking-wide cursor-pointer"
          >
            <span className="font-[Playfair_Display]">Dream</span>
            <span className="font-[Playfair_Display] text-[#4db2a4]">
              Miles
            </span>
          </motion.h1>

          <div className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.25em] text-white/80 font-medium">
            {navLinks.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className="hover:text-[#4db2a4] transition"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {isLoggedIn && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/dashboard")}
                className="text-xs bg-[#4db2a4]/20 border border-[#4db2a4]/50 text-[#4db2a4] px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition"
              >
                Dashboard
              </motion.button>
            )}

            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="text-white bg-[#f28b82] text-sm px-5 py-2 rounded-xl hover:bg-[#e07b72] transition"
              >
                Logout
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

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

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
              className="hover:text-[#4db2a4] transition"
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-[#4db2a4]"
            >
              Dashboard
            </Link>
          )}
        </motion.div>
      )}
    </>
  );
};

export default Navbar;