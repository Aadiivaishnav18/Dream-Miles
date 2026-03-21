import { useState } from "react";
import { Menu, X, Moon, ChevronRight } from "lucide-react";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden font-[DM_Sans]">

      {/* 🎬 Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="https://www.pexels.com/download/video/5457968/"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 🔝 Navbar */}
      <nav className="absolute top-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-3xl text-white tracking-wide">
            <span className="font-[Playfair_Display] italic">Dream</span>
            <span className="font-[Playfair_Display] italic text-primary">
              Miles
            </span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] uppercase tracking-[0.25em] text-white/80 font-medium">
            {["Home", "Destinations", "Packages", "Hotels", "Booking"].map(
              (item) => (
                <a key={item} href="#" className="hover:text-primary transition">
                  {item}
                </a>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <button className="p-2 rounded-full bg-white/10 border border-white/20">
              <Moon size={16} className="text-white" />
            </button>

            <button className="text-white text-sm px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition">
              Sign In
            </button>

            <button className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-xl z-40 flex flex-col items-center gap-6 py-10 text-white uppercase tracking-widest">
          {["Home", "Destinations", "Packages", "Hotels", "Booking"].map(
            (item) => (
              <a key={item} href="#" className="hover:text-primary transition">
                {item}
              </a>
            )
          )}
        </div>
      )}

      {/* 🌍 Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 -mt-10">

        {/* Heading */}
        <h1 className="font-[Playfair_Display] text-white font-semibold leading-tight text-5xl md:text-7xl lg:text-[95px] max-w-6xl">
          Explore The World With <br />
          <span className="text-primary font-bold">
            Dream Miles
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-white/80 max-w-2xl text-lg md:text-xl">
          Discover breathtaking destinations and plan unforgettable journeys
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 items-center">

          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            Explore Destinations
          </button>

          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            Book Now
          </button>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10">
          <div className="w-6 h-11 border border-white/40 rounded-full flex justify-center items-start p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* 🏷️ Bottom Tag */}
      <div className="absolute bottom-6 right-8 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs text-white">
        Made with ❤️ by Dream Miles
      </div>
    </div>
  );
};

export default Hero;