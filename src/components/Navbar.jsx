import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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

    // Hotels ko homepage section se link kar diya
    { name: "Hotels", path: "/home#hotels" },

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

          {/* LOGO */}
          <h1
            className="text-3xl text-white tracking-wide select-none cursor-default"
          >
            <span className="font-[Playfair_Display]">
              Dream
            </span>

            <span className="font-[Playfair_Display] text-[#4db2a4]">
              Miles
            </span>
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.25em] text-white/80 font-medium">
            {navLinks.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className="hover:text-[#4db2a4] transition duration-300"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP BUTTONS */}
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

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 right-0 h-screen w-[75%] bg-black/95 backdrop-blur-xl z-50 flex flex-col items-start px-8 py-10 gap-7 text-white uppercase tracking-widest shadow-2xl"
        >

          {/* CLOSE BUTTON */}
          <button
            className="self-end"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={30} />
          </button>

          {/* NAV LINKS */}
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-[#4db2a4] transition text-lg"
            >
              {item.name}
            </Link>
          ))}

          {/* DASHBOARD */}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-[#4db2a4] text-lg"
            >
              Dashboard
            </Link>
          )}

          {/* LOGOUT BUTTON MOBILE */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="bg-[#f28b82] px-5 py-3 rounded-xl text-white text-sm hover:bg-[#e07b72] transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="border border-white/20 px-5 py-3 rounded-xl text-sm hover:bg-white/10 transition"
            >
              Sign In
            </button>
          )}
        </motion.div>
      )}
    </>
  );
};

export default Navbar;