import React, { useEffect, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  LogIn,
  ArrowRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

const navLinks = ['Home', 'Publishers'];


function NavbarComponent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    clearAuth();
    navigate('/login');
  }, [clearAuth, navigate]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key handler for search
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${isScrolled
          ? 'bg-paper/80 backdrop-blur-xl border-b border-ink/5 py-4 shadow-xl shadow-ink/5'
          : 'bg-transparent py-8'
          }`}
      >
        <div className="section-container flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg] shadow-lg">
              <BookOpen size={20} className="text-gold" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tighter text-ink uppercase hidden md:block">
              BIBLIOPHILES
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className={`font-ui text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${isScrolled ? 'text-ink/60' : 'text-ink/40'} group-hover:text-gold`}>
                  {link}
                </span>

                {hoveredLink === link && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-gold"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-8 text-ink">

            {/* Simple Expanding Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isScrolled ? 240 : 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden mr-4 pb-1"
                  >
                    <input
                      type="text"
                      placeholder="Search the collection..."
                      className="w-full bg-transparent border-b-2 border-ink/30 py-3 px-1 text-[11px] font-ui uppercase tracking-[0.2em] font-bold focus:outline-none focus:border-gold text-ink placeholder:text-ink/40 transition-colors duration-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.1, color: '#D4AF37' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 transition-all duration-700"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={22} />}
              </motion.button>
            </div>

            <div className="hidden md:flex items-center gap-4 border-l border-ink/10 pl-8">
              <button className="p-2 hover:text-gold transition-colors duration-500">
                <Heart size={20} />
              </button>

              <button className="p-2 hover:text-gold transition-colors duration-500 relative group">
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_#d4af37]" />
              </button>

              {user ? (
                <div className="flex items-center gap-6">
                  <Link to="/profile" className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center font-heading text-sm font-bold shadow-xl shadow-ink/20 transition-transform hover:scale-110">
                    {user?.name?.[0]}
                  </Link>
                  <button onClick={handleLogout} className="p-2 hover:text-velvet transition-colors duration-500">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-3 px-6 py-2.5 bg-ink text-white rounded-full hover:bg-gold hover:text-ink transition-all duration-500 text-[10px] font-ui font-bold uppercase tracking-[0.2em] shadow-xl shadow-ink/10">
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-ink hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="lg:hidden bg-paper border-t border-ink/5 overflow-hidden"
            >
              <div className="flex flex-col py-12 px-8 gap-8">

                {navLinks.map((link) => (
                  <Link
                    key={link}
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-ui text-ink/60 font-bold text-base uppercase tracking-[0.3em] cursor-pointer hover:text-gold transition-colors"
                  >
                    {link}
                  </Link>
                ))}

                <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-ink/5 text-ink/40">
                  <div className="flex flex-col items-center gap-2" onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}>
                    <Search size={22} className="cursor-pointer hover:text-gold" />
                    <span className="text-[8px] uppercase tracking-widest font-bold">Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Heart size={22} className="cursor-pointer hover:text-gold" />
                    <span className="text-[8px] uppercase tracking-widest font-bold">Wishlist</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ShoppingCart size={22} className="cursor-pointer hover:text-gold" />
                    <span className="text-[8px] uppercase tracking-widest font-bold">Cart</span>
                  </div>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2">
                    <User size={22} className="cursor-pointer hover:text-gold" />
                    <span className="text-[8px] uppercase tracking-widest font-bold">Profile</span>
                  </Link>
                </div>

                {user ? (
                  <button onClick={handleLogout} className="w-full py-4 bg-ink text-white rounded-full font-bold text-[11px] uppercase tracking-[0.3em] transition-all">
                    Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-ink text-white rounded-full text-center font-bold text-[11px] uppercase tracking-[0.3em] transition-all">
                    Sign In
                  </Link>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export const Navbar = memo(NavbarComponent);

