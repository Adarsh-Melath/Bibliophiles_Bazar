import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShoppingCart, BookOpen } from 'lucide-react';
import { books } from '../data/books';

export function BookOfTheMonth() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });

  const book = books[4]; // Project Hail Mary

  // 3D Tilt Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="py-32 bg-paper relative overflow-hidden">
      {/* Decorative Arch */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-shelf/[0.02] rounded-l-full transform translate-x-1/4" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.4em] text-burgundy mb-4 block">Current Selection</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-shelf mb-6">
            Specimen of the Month
          </h2>
          <div className="w-20 h-0.5 bg-burgundy/30 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* 3D Book Presentation */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative perspective-1000 w-full max-w-md mx-auto aspect-[2/4] lg:aspect-[3/4.5]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              animate={{ rotateX, rotateY }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 25
              }}
              className="w-full h-full relative transform-style-3d shadow-shelf rounded-r-lg rounded-l-sm overflow-hidden"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />

              {/* Enhanced Book Spine Component */}
              <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[2px] bg-white/10" />

              {/* Archival Glare Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
            </motion.div>

            {/* Natural Casting Shadow */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-shelf/20 blur-2xl rounded-[100%] z-0" />
          </motion.div>

          {/* Archival Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 border border-burgundy/20 bg-burgundy/5 rounded-sm">
                <p className="font-ui text-[10px] text-burgundy font-bold uppercase tracking-widest leading-none">
                    {book.category}
                </p>
              </div>

              <h3 className="font-heading text-5xl md:text-6xl font-bold text-shelf leading-[1.1] tracking-tight">
                {book.title}
              </h3>

              <p className="font-body text-2xl text-shelf/40 italic font-medium">
                authored by {book.author}
              </p>
            </div>

            <div className="flex items-center gap-4 border-y border-shelf/5 py-6">
              <div className="flex text-burgundy/80">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(book.rating) ? 'currentColor' : 'none'}
                    className="mr-0.5"
                  />
                ))}
              </div>

              <span className="font-ui font-bold text-[11px] uppercase tracking-widest text-shelf/60">
                Critical Rating: {book.rating} / 5.0
              </span>
            </div>

            <p className="font-body text-shelf/60 leading-[1.8] text-lg lg:text-xl font-medium max-w-lg">
              {book.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="font-ui text-[10px] uppercase font-bold text-shelf/30 self-center">Investment</span>
              <div className="font-heading text-4xl font-bold text-shelf">
                {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                }).format(book.price)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-8">
              <motion.button
                whileHover={{ y: -4, backgroundColor: 'var(--burgundy)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-shelf text-paper font-ui font-bold uppercase tracking-[0.2em] text-[11px] py-5 px-10 rounded-sm transition-all duration-300 shadow-shelf"
              >
                <ShoppingCart size={16} />
                Acquire Specimen
              </motion.button>

              <motion.button
                whileHover={{ y: -4, borderColor: 'var(--shelf)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 border border-shelf/15 text-shelf font-ui font-bold uppercase tracking-[0.2em] text-[11px] py-5 px-10 rounded-sm transition-all duration-300"
              >
                <BookOpen size={16} />
                Examine Preview
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}