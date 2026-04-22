import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

const navLinks = ['Home', 'Categories', 'New Releases', 'Publishers'];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null); // ✅ fixed
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-paper/80 backdrop-blur-md border-b border-shelf/5 shadow-soft py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-burgundy cursor-pointer">
          <BookOpen size={28} />
          <span className="font-heading font-bold text-2xl tracking-tight text-shelf">
            Bookshelf
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link}
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="font-ui text-xs uppercase tracking-widest font-semibold text-shelf/70 hover:text-burgundy transition-colors">
                {link}
              </span>

              {hoveredLink === link && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-burgundy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-5 text-shelf">

          {/* Search */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="overflow-hidden mr-2"
                >
                  <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full bg-paper/50 border border-shelf/10 rounded-full py-1.5 px-4 text-[10px] font-ui uppercase tracking-wider focus:outline-none focus:border-burgundy text-shelf placeholder:text-shelf/30 backdrop-blur-sm"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-burgundy rounded-full hover:bg-shelf/5 transition-colors"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={20} />}
            </motion.button>
          </div>

          <button className="p-2 hover:text-burgundy rounded-full hover:bg-shelf/5">
            <Heart size={20} />
          </button>

          <button className="p-2 hover:text-burgundy rounded-full hover:bg-shelf/5 relative">
            <ShoppingCart size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-burgundy rounded-full" />
          </button>

          <Link to="/profile" className="p-2 hover:text-burgundy rounded-full hover:bg-shelf/5">
            <User size={20} />
          </Link>

          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-1.5 border border-shelf/10 rounded-full hover:bg-burgundy/5 transition-all text-xs font-ui font-bold uppercase tracking-widest">
              <LogOut size={16} className="text-burgundy" />
              Log Out
            </button>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-1.5 bg-shelf text-paper rounded-full hover:bg-burgundy transition-all text-xs font-ui font-bold uppercase tracking-widest shadow-soft">
              <LogIn size={16} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-shelf"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-paper border-t border-shelf/10 overflow-hidden"
          >
            <div className="flex flex-col py-6 px-6 gap-5">

              {navLinks.map((link) => (
                <span
                  key={link}
                  className="font-ui text-shelf font-semibold text-sm uppercase tracking-widest cursor-pointer hover:text-burgundy"
                >
                  {link}
                </span>
              ))}

              <div className="flex gap-6 mt-4 pt-6 border-t border-shelf/10 text-shelf">
                <Search size={22} className="cursor-pointer hover:text-burgundy" />
                <Heart size={22} className="cursor-pointer hover:text-burgundy" />
                <ShoppingCart size={22} className="cursor-pointer hover:text-burgundy" />
                <Link to="/profile">
                  <User size={22} className="cursor-pointer hover:text-burgundy" />
                </Link>
                {user ? (
                  <button onClick={handleLogout} className="flex items-center gap-2 text-burgundy font-bold text-xs uppercase tracking-widest">
                    <LogOut size={18} />
                    Log Out
                  </button>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 text-shelf font-bold text-xs uppercase tracking-widest">
                    <LogIn size={18} />
                    Login
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}