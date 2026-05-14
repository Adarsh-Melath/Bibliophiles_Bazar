import React, { useState, useRef, useCallback, useMemo, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShoppingCart, BookOpen } from 'lucide-react';
import { books } from '../data/books';

function BookOfTheMonthComponent() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });

  const book = useMemo(() => books[4], []); // Project Hail Mary

  // 3D Tilt Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <section className="py-40 bg-paper relative overflow-hidden font-ui">
      {/* Decorative Editorial Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/[0.02] transform translate-x-1/4 -skew-x-12" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-24"
        >
          <motion.div className="inline-flex items-center gap-4 px-1 mb-8">
            <div className="h-[1px] w-8 bg-gold" />
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-gold">The Monthly Specimen</span>
            <div className="h-[1px] w-8 bg-gold" />
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-bold text-ink mb-6 tracking-tighter">
            Featured <span className="italic font-heading">Selection</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-32 items-center max-w-7xl mx-auto">
          {/* 3D Book Presentation */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative perspective-2000 w-full max-w-lg mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              animate={{ rotateX, rotateY }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 20
              }}
              className="w-full aspect-[3/4.5] relative transform-style-3d shadow-[50px_50px_100px_rgba(28,28,28,0.15)] rounded-r-xl rounded-l-md overflow-hidden border-l-[10px] border-white/20"
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />

              {/* Enhanced Spine & Glare */}
              <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
            </motion.div>

            {/* Natural Casting Shadow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[110%] h-20 bg-ink/10 blur-[80px] rounded-[100%] z-0" />
          </motion.div>

          {/* Editorial Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1 border border-gold/20 bg-gold/5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <p className="text-[10px] text-gold font-bold uppercase tracking-[0.2em]">
                    {book.category}
                </p>
              </div>

              <h3 className="text-6xl md:text-8xl font-bold text-ink leading-[0.9] tracking-tighter">
                {book.title}
              </h3>

              <p className="font-heading text-2xl text-ink/30 italic">
                A work by {book.author}
              </p>
            </div>

            <div className="flex items-center gap-6 border-y border-ink/5 py-8">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(book.rating) ? 'currentColor' : 'none'}
                    className="mr-1"
                  />
                ))}
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/20 border-l border-ink/10 pl-6">
                ARCHIVAL RATING: {book.rating}
              </span>
            </div>

            <p className="font-body text-ink/50 leading-[2] text-lg lg:text-xl max-w-xl">
              {book.description}
            </p>

            <div className="flex items-center gap-6">
              <div className="text-5xl font-bold text-ink">
                {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                }).format(book.price)}
              </div>
              <div className="h-10 w-[1px] bg-ink/10" />
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-ink/20">Initial Offering</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <motion.button
                whileHover={{ y: -5, backgroundColor: '#d4af37', color: '#fff' }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-4 bg-ink text-white font-ui font-bold uppercase tracking-[0.3em] text-[11px] py-6 px-12 rounded-full transition-all duration-700 shadow-2xl shadow-ink/10 group"
              >
                <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                Acquire Work
              </motion.button>

              <motion.button
                whileHover={{ y: -5, borderColor: '#1c1c1c', color: '#1c1c1c' }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-4 border-2 border-ink/10 text-ink/40 font-ui font-bold uppercase tracking-[0.3em] text-[11px] py-6 px-12 rounded-full transition-all duration-700 group"
              >
                <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
                Examine Preview
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const BookOfTheMonth = memo(BookOfTheMonthComponent);