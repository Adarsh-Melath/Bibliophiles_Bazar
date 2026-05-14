import React, { memo, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { books } from '../data/books';

function HeroSectionComponent() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const featuredBook = useMemo(() => books[0], []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1], // Custom cinematic ease
      },
    },
  };

  return (
    <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-paper pt-32 pb-20 font-ui">

      {/* Cinematic Background Elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[15%] left-[5%] w-[40rem] h-[40rem] bg-gold/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[35rem] h-[35rem] bg-ink/[0.02] rounded-full blur-[120px]" />
      </motion.div>

      {/* Fine-line Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
      </div>

      <div className="section-container relative z-10 grid lg:grid-cols-2 gap-24 items-center">

        {/* TEXT CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-4 px-1 mb-10">
            <div className="h-[1px] w-12 bg-gold" />
            <span className="font-ui text-[10px] uppercase font-bold tracking-[0.5em] text-gold">Handpicked Collection • 2024</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl font-bold text-ink leading-[0.85] mb-10 tracking-tighter"
          >
            Curated For The <br />
            <span className="italic text-gold">Discerning.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-body text-xl md:text-2xl text-ink/40 mb-16 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            A digital sanctuary for those who seek immersion. Discover our 
            exclusive directory of timeless classics and modern manuscripts.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 justify-center lg:justify-start">
            <motion.button
              whileHover={{ y: -5, backgroundColor: '#1c1c1c', color: '#fff' }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-ink text-ink font-ui font-bold uppercase tracking-[0.3em] text-[10px] py-6 px-12 rounded-full transition-all duration-700 shadow-2xl shadow-ink/10"
            >
              Explore Collection
            </motion.button>

            <motion.button
              whileHover={{ y: -5, color: '#d4af37' }}
              whileTap={{ scale: 0.98 }}
              className="text-ink/60 font-ui font-bold uppercase tracking-[0.3em] text-[10px] py-6 px-4 transition-all duration-700 flex items-center gap-3"
            >
              Our Philosophy
              <div className="w-8 h-[1px] bg-gold" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* VISUAL COMPONENT */}
        <motion.div style={{ y: y2 }} className="relative h-[700px] hidden lg:block perspective-2000">

          {/* Focal Point Book */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -30, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0, x: "-50%", y: "-50%" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-1/2 left-1/2 z-20"
          >
            <div className="relative group preserve-3d">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 8, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-80 h-[500px] rounded-r-xl rounded-l-md shadow-[40px_40px_80px_rgba(28,28,28,0.2)] overflow-hidden border-l-[8px] border-white/20 transition-all duration-1000 relative preserve-3d group-hover:shadow-gold/10"
              >
                <img
                  src={featuredBook.coverUrl}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                
                {/* Book Spine Detail */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20" />
              </motion.div>
            </div>
          </motion.div>

          {/* Peripheral Books */}
          {[books[1], books[2], books[3]].map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 150, rotate: i * 15 - 20 }}
              whileInView={{
                opacity: 0.4,
                y: [0, i % 2 === 0 ? -40 : 40, 0],
                rotate: [i * 10 - 20, i * 10 - 10, i * 10 - 20],
              }}
              viewport={{ once: false }}
              transition={{
                opacity: { duration: 2, delay: i * 0.3 },
                y: { duration: 12 + i * 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 15 + i * 3, repeat: Infinity, ease: 'easeInOut' },
              }}
              className={`absolute w-52 h-72 rounded-r-lg rounded-l-md shadow-2xl overflow-hidden border-l-4 border-white/10 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-700 z-10
                ${i === 0
                  ? 'top-0 left-0'
                  : i === 1
                    ? 'bottom-0 right-0'
                    : 'top-40 right-[-10%]'
                }`}
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);