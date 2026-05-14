import React, { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { books } from '../data/books';

function RecommendedForYouComponent() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className="py-32 bg-paper font-ui" ref={containerRef}>
      <div className="section-container">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-24"
        >
            <motion.div className="inline-flex items-center gap-4 px-1 mb-6">
                <div className="h-[1px] w-8 bg-gold" />
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Tailored Selections</span>
                <div className="h-[1px] w-8 bg-gold" />
            </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-ink mb-10 tracking-tighter">
            Recommended for your <span className="italic font-heading">Archive</span>
          </h2>

          <p className="font-body text-ink/40 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Based on your intellectual pursuits, these volumes may 
            offer significant value to your personal collection.
          </p>
        </motion.div>

        {/* Dynamic Shelf Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {books?.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group cursor-pointer"
            >

              {/* Specimen Presentation */}
              <div className="relative aspect-[3/4.5] mb-8 overflow-hidden rounded-sm shadow-xl shadow-ink/5 group-hover:shadow-2xl group-hover:shadow-ink/10 transition-all duration-700">

                <img
                  src={book.coverUrl}
                  alt={book.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />

                {/* Editorial Spine */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />

                {/* Primary Action Overlay */}
                <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-6">
                  <motion.button 
                    whileHover={{ y: -5, backgroundColor: '#d4af37' }}
                    className="w-full bg-white text-ink py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl transition-all duration-500"
                  >
                    Acquire Work
                  </motion.button>
                </div>

              </div>

              {/* Specimen Metadata */}
              <div className="space-y-4 px-1">
                <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">
                        {book.category}
                    </p>
                    <p className="text-lg font-bold text-ink/80">
                        ₹{book.price}
                    </p>
                </div>

                <h3 className="font-heading font-bold text-ink text-2xl line-clamp-1 group-hover:text-gold transition-all duration-500">
                  {book.title}
                </h3>

                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-ink/20">{book.author}</p>

                <div className="flex items-center gap-3 text-gold pt-6 border-t border-ink/5">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/20">
                    Grade {book.rating}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export const RecommendedForYou = memo(RecommendedForYouComponent);
