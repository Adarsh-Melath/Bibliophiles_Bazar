import React, { useRef, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from 'lucide-react';
import { books } from '../data/books';

function NewReleasesComponent() {
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);

  const isInView = useInView(headerRef, {
    once: true,
    margin: '-50px',
  });

  const scroll = useCallback((direction) => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;

    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="py-32 bg-paper overflow-hidden font-ui">
      <div className="section-container">

        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-end justify-between mb-24 border-b border-ink/5 pb-12"
        >
          <div>
            <motion.div className="inline-flex items-center gap-4 px-1 mb-6">
              <div className="h-[1px] w-8 bg-gold" />
              <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Latest Acquisitions</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-ink tracking-tighter">
              Newly <span className="italic font-heading">Catalogued</span>
            </h2>
          </div>

          {/* Nav Controls */}
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-16 h-16 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-all duration-500 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-16 h-16 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-all duration-500 group"
            >
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Carousel */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div
            ref={scrollContainerRef}
            className="flex gap-12 overflow-x-auto pb-20 pt-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {books?.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="min-w-[320px] w-[320px] snap-start"
              >
                <div className="group relative bg-transparent transition-all duration-700">

                  {/* Pre-Order Tag */}
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-ink text-white text-[9px] uppercase font-bold tracking-[0.3em] px-4 py-2 rounded-full shadow-2xl">
                      Pre-Order
                    </div>
                  </div>

                  {/* Cover Presentation */}
                  <div className="relative aspect-[3/4.5] mb-8 overflow-hidden rounded-sm shadow-xl shadow-ink/5 group-hover:shadow-2xl group-hover:shadow-ink/10 transition-all duration-700">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    />

                    {/* Quick Access Overlay */}
                    <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                      <motion.button
                        whileHover={{ y: -5, backgroundColor: '#d4af37' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-ink font-ui font-bold uppercase tracking-[0.3em] text-[10px] py-5 px-10 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-500"
                      >
                        <ShoppingCart size={16} />
                        Acquire
                      </motion.button>
                    </div>
                    
                    {/* Editorial Spine */}
                    <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>

                  {/* Metadata Content */}
                  <div className="space-y-4 px-2">
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-ink text-2xl leading-tight line-clamp-1 group-hover:text-gold transition-colors duration-500">
                        {book.title}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-ink/30">
                        {book.author}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-ink/5">
                      <div className="text-lg font-bold text-ink">
                        ₹{book.price}
                      </div>
                      
                      <div className="flex items-center gap-2 text-gold">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold text-ink/20 uppercase tracking-[0.2em]">
                          {book.rating}
                        </span>
                      </div>
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

export const NewReleases = memo(NewReleasesComponent);
