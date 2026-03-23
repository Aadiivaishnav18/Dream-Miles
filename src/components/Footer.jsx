import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-serif font-bold text-[#4db2a4]">Dream</span>
              <span className="text-3xl font-serif font-bold text-[#f28b82]">Miles</span>
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-sm">
              Discover breathtaking destinations and plan unforgettable journeys around the world.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-11 h-11 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#4db2a4] shadow-sm hover:bg-[#4db2a4] hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-gray-900">Company</h4>
            <ul className="space-y-4 text-gray-600 text-base">
              <li><a href="#" className="hover:text-[#4db2a4]">About Us</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Our Team</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Careers</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-gray-900">Destinations</h4>
            <ul className="space-y-4 text-gray-600 text-base">
              <li><a href="#" className="hover:text-[#4db2a4]">Popular</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Europe</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Asia</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Americas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-6 text-gray-900">Support</h4>
            <ul className="space-y-4 text-gray-600 text-base">
              <li><a href="#" className="hover:text-[#4db2a4]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#4db2a4]">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mb-14">
          <h4 className="font-serif font-bold text-xl mb-5 text-gray-900">Contact</h4>
          <div className="space-y-4 text-base">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={18} className="text-gray-400" />
              <span>info@dreammiles.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={18} className="text-gray-400" />
              <span>+1 (123) 456-7890</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-5 text-base text-gray-500">
          <p>© 2026 Dream Miles Travel Agency. All Rights Reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
            <a href="#" className="hover:text-gray-700">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;