import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

// Custom Brand Icons for Lucide v1.x (Handled for scaling)
const Facebook = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Instagram = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export function Footer() {
  const socialIcons = [
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
  ];

  const quickLinks = [
    'Home',
    'About Us',
    'Categories',
    'Best Sellers',
    'New Releases',
  ];

  const supportLinks = [
    'FAQ',
    'Shipping & Returns',
    'Track Order',
    'Privacy Policy',
    'Terms of Service',
  ];

  return (
    <footer className="bg-shelf border-t border-shelf-light pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-burgundy">
              <BookOpen size={28} />
              <span className="font-heading font-bold text-2xl tracking-tight text-paper">
                Bookshelf
              </span>
            </div>

            <p className="font-body text-paper/70 text-sm leading-relaxed">
              Your premium digital library. Discover, read, and immerse yourself
              in the world's greatest stories.
            </p>

            <div className="flex gap-4 pt-4">
              {socialIcons.map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-paper/5 border border-paper/10 flex items-center justify-center text-paper hover:bg-burgundy hover:border-burgundy transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-burgundy text-lg mb-6 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-ui text-xs uppercase tracking-widest font-medium text-paper/90 hover:text-burgundy transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-burgundy text-lg mb-6 tracking-wide">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-ui text-xs uppercase tracking-widest font-medium text-paper/90 hover:text-burgundy transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-burgundy text-lg mb-6 tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-3 font-ui text-xs uppercase tracking-widest font-medium text-paper/80">
              <li>123 Library Street</li>
              <li>Bookville, BK 12345</li>

              <li className="pt-2">
                <a
                  href="mailto:hello@bookshelf.com"
                  className="hover:text-burgundy transition-colors"
                >
                  hello@bookshelf.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-burgundy transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs uppercase tracking-widest text-paper/80">
            © {new Date().getFullYear()} Bookshelf. All rights reserved.
          </p>

          <div className="flex gap-6 font-ui text-xs uppercase tracking-widest text-paper/80">
            <a href="#" className="hover:text-burgundy">Privacy</a>
            <a href="#" className="hover:text-burgundy">Terms</a>
            <a href="#" className="hover:text-burgundy">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}