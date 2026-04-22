import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { books } from '../data/books';

export function RecommendedForYou() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 bg-paper" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-shelf/5 rounded-full mb-6">
                <Star size={12} className="text-burgundy fill-burgundy" />
                <span className="font-ui text-[10px] uppercase font-bold tracking-[0.3em] text-shelf/60">Tailored Selections</span>
            </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-shelf mb-6">
            Recommended for your Archive
          </h2>

          <p className="font-body text-shelf/50 max-w-2xl mx-auto text-lg">
            Based on your intellectual pursuits and shelf history, 
            these volumes may offer significant value to your personal collection.
          </p>
        </motion.div>

        {/* Dynamic Shelf Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {books?.map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >

              {/* Enhanced Specimen Presentation */}
              <div className="relative aspect-[3/4.5] mb-6 overflow-hidden shadow-shelf border-l-4 border-paper/10 transition-all duration-700 group-hover:shadow-2xl">

                <img
                  src={book.coverUrl}
                  alt={book.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />

                {/* Archival Overlay */}
                <div className="absolute inset-0 bg-shelf/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Primary Action Button */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-shelf/90 to-transparent">
                  <button className="library-button w-full bg-paper text-shelf hover:bg-burgundy hover:text-paper py-4 rounded-sm text-[10px] shadow-2xl">
                    <ShoppingCart size={14} className="mr-1" />
                    Acquire Item
                  </button>
                </div>

              </div>

              {/* Specimen Metadata */}
              <div className="space-y-3 px-1">
                <div className="flex justify-between items-baseline">
                    <p className="text-[10px] font-bold text-burgundy uppercase tracking-[0.2em]">
                    {book.category}
                    </p>
                    <p className="font-heading font-medium text-shelf/80">
                        ₹{book.price}
                    </p>
                </div>

                <h3 className="font-heading font-bold text-shelf text-xl line-clamp-1 group-hover:text-burgundy transition-colors duration-300">
                  {book.title}
                </h3>

                <p className="font-body text-[11px] uppercase tracking-widest font-bold text-shelf/30">{book.author}</p>

                <div className="flex items-center gap-1.5 text-shelf/40 pt-2 border-t border-shelf/5">
                  <Star size={10} className="text-burgundy fill-burgundy" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] pt-0.5">
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