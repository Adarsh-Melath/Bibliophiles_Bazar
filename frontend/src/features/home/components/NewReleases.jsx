import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from 'lucide-react';
import { books } from '../data/books';

export function NewReleases() {
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);

  const isInView = useInView(headerRef, {
    once: true,
    margin: '-50px',
  });

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;

    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 bg-paper overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-16 border-b border-shelf/5 pb-10"
        >
          <div>
            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.4em] text-burgundy mb-4 block">Recent Acquisitions</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-shelf">
              Newly Catalogued
            </h2>
          </div>

          {/* Nav Controls */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-14 h-14 rounded-full border border-shelf/10 flex items-center justify-center text-shelf hover:border-burgundy hover:text-burgundy transition-all duration-300 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-14 h-14 rounded-full border border-shelf/10 flex items-center justify-center text-shelf hover:border-burgundy hover:text-burgundy transition-all duration-300 group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Carousel */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div
            ref={scrollContainerRef}
            className="flex gap-10 overflow-x-auto pb-16 pt-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {books?.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="min-w-[300px] w-[300px] snap-start"
              >
                <div className="group relative bg-white border border-shelf/5 p-6 rounded-sm shadow-soft hover:shadow-shelf transition-all duration-700 hover:-translate-y-2">
                  
                  {/* Archival Badge */}
                  <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-burgundy text-paper text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-lg">
                        Pre-Order
                    </div>
                  </div>

                  {/* Enhanced Cover Image */}
                  <div className="relative aspect-[2/3] mb-6 overflow-hidden shadow-shelf">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Quick Access Overlay */}
                    <div className="absolute inset-0 bg-shelf/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-paper text-shelf font-ui font-bold uppercase tracking-[0.2em] text-[10px] py-4 px-8 rounded-sm shadow-2xl flex items-center gap-2 hover:bg-burgundy hover:text-paper transition-all"
                      >
                        <ShoppingCart size={14} />
                        Acquire
                      </motion.button>
                    </div>
                  </div>

                  {/* Metadata Content */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-heading font-bold text-shelf text-xl leading-tight line-clamp-2 h-14 group-hover:text-burgundy transition-colors">
                        {book.title}
                        </h3>
                        <p className="font-heading font-medium text-shelf">
                            ₹{book.price}
                        </p>
                    </div>

                    <p className="font-body text-[11px] uppercase tracking-[0.15em] font-bold text-shelf/40 mb-4 h-5">
                      {book.author}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-shelf/5">
                      <div className="flex items-center gap-1.5 text-burgundy">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold text-shelf/60 uppercase tracking-widest leading-none pt-0.5">
                          {book.rating} / 5.0
                        </span>
                      </div>
                      
                      <div className="w-1.5 h-1.5 rounded-full bg-shelf/10"></div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}