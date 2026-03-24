import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-28 bg-gradient-to-b from-white to-[#f8fafc] pt-20 pb-10 px-6 font-sans">
      <div className="absolute -top-10 left-0 w-full h-20 bg-white/80 backdrop-blur-md"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-serif font-bold text-[#4db2a4]">Dream</span>
              <span className="text-2xl font-serif font-bold text-[#f28b82]">Miles</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Discover breathtaking destinations and plan unforgettable journeys around the world.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4db2a4] hover:bg-[#4db2a4] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Company",
              links: ["About Us", "Our Team", "Careers", "Press"]
            },
            {
              title: "Destinations",
              links: ["Popular", "Europe", "Asia", "Americas"]
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"]
            }
          ].map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold text-lg mb-4 text-gray-900">
                {section.title}
              </h4>

              <ul className="space-y-3 text-gray-600 text-sm">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href="#" 
                      className="relative hover:text-[#4db2a4] transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-[#4db2a4] hover:after:w-full after:transition-all"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm border-t border-gray-200 pt-6">
          
          <div className="flex items-center gap-3 text-gray-600">
            <Mail size={16} className="text-gray-400" />
            <span>info@dreammiles.com</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Phone size={16} className="text-gray-400" />
            <span>+1 (123) 456-7890</span>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          
          <p>© 2026 Dream Miles. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Cookies</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;