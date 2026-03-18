import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/' },
        { name: 'Our Team', path: '/' },
        { name: 'Careers', path: '/' },
        { name: 'Press', path: '/' },
      ],
    },
    {
      title: 'Destinations',
      links: [
        { name: 'Popular', path: '/destinations' },
        { name: 'Europe', path: '/destinations' },
        { name: 'Asia', path: '/destinations' },
        { name: 'Americas', path: '/destinations' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/' },
        { name: 'Contact Us', path: '/' },
        { name: 'Privacy Policy', path: '/' },
        { name: 'Terms of Service', path: '/' },
      ],
    },
  ];

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Dream<span className="text-secondary">Miles</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover breathtaking destinations and plan unforgettable journeys around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-facebook"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-twitter"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-instagram"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-linkedin"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@dreammiles.com"
                data-testid="contact-email"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <MdEmail className="text-lg" />
                <span>info@dreammiles.com</span>
              </a>
              <a
                href="tel:+11234567890"
                data-testid="contact-phone"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <MdPhone className="text-lg" />
                <span>+1 (123) 456-7890</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2026 Dream Miles Travel Agency. All Rights Reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;