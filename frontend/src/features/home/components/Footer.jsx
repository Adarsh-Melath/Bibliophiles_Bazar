import React, { memo } from 'react';
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

function FooterComponent() {
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
    <footer className="bg-ink border-t border-white/5 pt-24 pb-12 font-ui">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-gold">
                <BookOpen size={20} className="text-gold" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tighter text-white uppercase">
                BIBLIOPHILES
              </span>
            </div>

            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
              A curated digital sanctuary for the modern bibliophile. Immersion, 
              discovery, and the pursuit of timeless literature.
            </p>

            <div className="flex gap-5 pt-4">
              {socialIcons.map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all duration-500"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-ui font-bold text-gold text-[10px] uppercase tracking-[0.4em] mb-10">
              Directory
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-white transition-all duration-500"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-bold text-gold text-[10px] uppercase tracking-[0.4em] mb-10">
              Assistance
            </h4>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-white transition-all duration-500"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-bold text-gold text-[10px] uppercase tracking-[0.4em] mb-10">
              Connect
            </h4>
            <ul className="space-y-5 text-[11px] uppercase tracking-[0.2em] font-bold text-white/30">
              <li className="flex flex-col gap-1">
                <span className="text-white/10 text-[8px] tracking-[0.5em]">Location</span>
                <span className="text-white/60">Mayfair, London, UK</span>
              </li>

              <li className="flex flex-col gap-1 pt-2">
                <span className="text-white/10 text-[8px] tracking-[0.5em]">Inquiries</span>
                <a
                  href="mailto:hello@bibliophiles.com"
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  concierge@bibliophiles.com
                </a>
              </li>

              <li className="flex flex-col gap-1 pt-2">
                <span className="text-white/10 text-[8px] tracking-[0.5em]">Hotline</span>
                <a
                  href="tel:+1234567890"
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  +44 (20) 7946 0123
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
            © {new Date().getFullYear()} BIBLIOPHILES BAZAR. AN EDITORIAL COLLECTION.
          </p>

          <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);